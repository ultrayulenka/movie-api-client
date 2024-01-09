import type { NextApiRequest, NextApiResponse } from "next";
import { Cookies } from "react-cookie";
import { getClientApiInstance } from "../../../../utils/api";
import { Review } from "../../../../types";

export default async (req: NextApiRequest, res: NextApiResponse<Review>) => {
  const { id } = req.query;
  const { rate, text } = req.body;
  const cookies = new Cookies(req.headers.cookie);
  const api = getClientApiInstance(cookies);
  const requestUrl = `/movies/${id}/reviews`;

  try {
    const apiResponse = await api.post<Review>(requestUrl, { rate, text });
    const review = apiResponse.data;

    res.statusCode = 200;
    res.json(review);
  } catch (error) {
    res.statusCode = error?.response?.data?.statusCode || 500;
    res.statusMessage =
      error?.response?.data?.message || "Something gone wrong";
    res.end();
  }
};