import { NextApiRequest, NextApiResponse } from "next";
import { Cookies } from "react-cookie";
import { getClientApiInstance } from "../../../utils/api";
import { User } from "../../../types";

export default async (req: NextApiRequest, res: NextApiResponse<User>) => {
  const cookies = new Cookies(req.headers.cookie);
  const api = getClientApiInstance(cookies);
  const { name } = req.body;
  const { id } = req.query;
  try {
    const apiResponse = await api.patch<User>(`/users/${id}`, {
      name
    });
    const user = apiResponse.data;

    res.statusCode = 200;
    res.json(user);
  } catch (error) {
    res.statusCode = error?.response?.data?.statusCode || 500;
    res.statusMessage =
      error?.response?.data?.message || "Something gone wrong";
    res.end();
  }
};
