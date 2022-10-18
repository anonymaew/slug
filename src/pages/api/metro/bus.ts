import { NextApiRequest, NextApiResponse } from 'next';

import { Bus } from '../../../interfaces/metroLists';

const handler = async (req: NextApiRequest, res: NextApiResponse<Bus[]>) => {
  const { ids } = req.query as { ids: string };
  const id_list = ids.split(",");

  const buses = (
    await Promise.all(
      id_list.map(async (id): Promise<Bus[]> => {
        const busesResponse = await fetch(
          `https://cruzmetro.com/Route/${id}/Vehicles`
        );
        const busesData = await busesResponse.json();
        return busesData.map((busData: any) => {
          return {
            id: busData.ID,
            route: id,
            name: "",
            position: {
              lat: busData.Latitude,
              lng: busData.Longitude,
            },
          };
        });
      })
    )
  ).flat();
  return res.status(200).json(buses);
};

export default handler;
