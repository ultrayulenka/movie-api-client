import { Formidable, PersistentFile } from "formidable";
import * as fs from "fs";
import { Movie } from "../types";
import { getClientApiInstance } from "../utils/api";
import { cookies } from "next/headers";

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

const handler = async (requestUrl: string, req: Request): Promise<Movie> => {
  const api = getClientApiInstance(cookies());

  try {
    const data: {
      fields: unknown;
      files: unknown;
    } = await new Promise((resolve, reject) => {
      const form = new Formidable();

      form.parse(req, (err, fields, files) => {
        if (err) reject({ err });
        resolve({ fields, files });
      });
    });
    const fields = data.fields as IFields;
    const files = data.files as IFiles;
    const formData = constructFormData(fields, files);
    const fetch = req.method === "POST" ? api.post<Movie> : api.patch<Movie>;

    const apiResponse = await fetch(requestUrl, formData);
    const movie = apiResponse.data;

    return movie;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

export { handler };
