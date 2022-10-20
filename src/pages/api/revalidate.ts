import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<{
    code: number;
    message: string;
  }>
) => {
  const requestBody = req.body;
  if (req.method === "POST")
    if (requestBody !== undefined && requestBody !== null)
      if (requestBody.SECRET !== undefined && requestBody.SECRET !== null)
        if (requestBody.SECRET === process.env.SECRET)
          try {
            await Promise.all([
              res.revalidate("/dining"),
              res.revalidate("/metro"),
            ]);
            return res.status(200).json({
              code: 200,
              message: "Revalidation successful",
            });
          } catch {
            return res.status(500).json({
              code: 500,
              message: "Revalidation failed",
            });
          }
  return res.status(403).json({
    code: 403,
    message: "Forbidden",
  });
};
export default handler;
