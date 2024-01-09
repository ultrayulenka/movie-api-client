import { Formidable, PersistentFile } from "formidable";
import type { NextApiRequest, NextApiResponse } from "next";
import { Cookies } from "react-cookie";
import { getClientApiInstance } from "../../../utils/api";
import { Movie } from "../../../types";
import * as fs from "fs";
import { handler } from "../../../services/movies";

export default async (req: NextApiRequest, res: NextApiResponse<Movie>) => {
  try {
    const movie = await handler("movies", req);

    res.statusCode = 200;
    res.json(movie);
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
