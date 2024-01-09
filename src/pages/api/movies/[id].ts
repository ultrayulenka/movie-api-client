import { Formidable, PersistentFile } from "formidable";
import type { NextApiRequest, NextApiResponse } from "next";
import { Cookies } from "react-cookie";
import { getClientApiInstance } from "../../../utils/api";
import { Movie } from "../../../types";
import * as fs from "fs";
import { handler } from "../../../services/movies";

interface IFields {
  name: string[];
}

interface IFiles {
  files: PersistentFile[];
}

const srcToFile = (src: string) => fs.readFileSync(src);

const constructFormData = (fields: IFields, files: IFiles): FormData => {
  const formData = new FormData();

  for (const key of Object.keys(fields)) {
    formData.append(key, fields[key][0]);
  }

  for (const key of Object.keys(files)) {
    const buffer = srcToFile(files[key][0].filepath);
    const blob = new Blob([buffer]);
    formData.append(key, blob);
  }

  return formData;
};

export default async (req: NextApiRequest, res: NextApiResponse<Movie>) => {
  const { id } = req.query;
  const cookies = new Cookies(req.headers.cookie);
  const api = getClientApiInstance(cookies);
  const requestUrl = `/movies/${id}`;

  try {
    if (req.method === "PATCH") {
      const movie = await handler(requestUrl, req);

      res.statusCode = 200;
      res.json(movie);
    }

    if (req.method === "DELETE") {
      await api.delete(requestUrl);

      res.statusCode = 200;
      res.end();
    }
  } catch (error) {
    res.statusCode = error?.response?.data?.statusCode || 500;
    res.statusMessage =
      error?.response?.data?.message || "Something gone wrong";
    res.end();
  }
};

export const config = {
  api: {
    bodyParser: false,
  },
};
