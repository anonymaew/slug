import { NextApiRequest, NextApiResponse } from 'next';

import getDiningList from '../../../lib/getDiningList';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { date: unixtime } = req.query as { date: string };
    const date = new Date(parseInt(unixtime, 10));
    console.log(date.toDateString());
    const result = await getDiningList(date);
    res.status(200).json(result);
  } catch {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default handler;
