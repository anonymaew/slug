import { NextApiRequest, NextApiResponse } from 'next';

import { MetroRoute } from '../../../interfaces/metroLists';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<MetroRoute[]>
) => {
  const response = await fetch("https://cruzmetro.com/Region/0/Routes");
  const data = await response.json();

  const result = data.map((item: any) => {
    return {
      id: item.ID,
      name: item.ShortName,
      fullName: item.Name,
    };
  });
  return res.status(200).json(result);
};

export default handler;
