import { NextApiRequest, NextApiResponse } from "next";
import { Cookies } from "react-cookie";
import { getClientApiInstance } from "../../utils/api";
import cookie from "cookie";

type LoginData = {
  email: string;
  username?: string;
};

export default async (req: NextApiRequest, res: NextApiResponse<LoginData>) => {
  const cookies = new Cookies(req.headers.cookie);
  const api = getClientApiInstance(cookies);
  const { email, password } = req.body;
  try {
    const apiResponse = await api.post<{
      token: string;
    }>("/auth/signin", { email, password });
    const token = apiResponse.data.token;
    
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("token", token, {
        httpOnly: true,
        maxAge: 60 * 60 * 60,
        path: "/",
      })
    );
    res.statusCode = 200;
    res.json({ email });
  } catch (error) {
    res.statusCode = error?.response?.data?.statusCode || 500;
    res.statusMessage = error?.response?.data?.message || 'Something gone wrong';
    res.end();
  }
};
