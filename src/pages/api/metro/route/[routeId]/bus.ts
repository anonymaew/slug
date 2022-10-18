import { NextApiRequest, NextApiResponse } from 'next';

import { Bus } from '../../../../../interfaces/metroLists';

const handler = async (req: NextApiRequest, res: NextApiResponse<Bus[]>) => {
  const { routeId } = req.query as { routeId: string };

  const response = await fetch(
    `https://cruzmetro.com/Route/${routeId}/Vehicles`
  );
  const data = await response.json();
  const result = data.map((item: any) => {
    return {
      id: item.ID,
      heading: item.Heading,
      position: {
        lat: item.Latitude,
        lng: item.Longitude,
      },
    };
  });
  return res.status(200).json(result);
};

export default handler;
