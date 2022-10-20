import { NextApiRequest, NextApiResponse } from 'next';

import { StopDetail } from '../../../interfaces/metroLists';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<StopDetail>
) => {
  const { id } = req.query as { id: string };
  const stopResponse = await fetch(`https://cruzmetro.com/Stop/${id}/Arrivals`);
  const stopData = await stopResponse.json();
  return res.status(200).json({
    id: parseInt(id, 10),
    arrivals: stopData
      .map((arrivals: any) => {
        return arrivals.Arrivals.map((item: any) => {
          return {
            bus: {
              id: item.VehicleID,
              route: item.RouteID,
              name: item.RouteName.split("-")[0],
              position: {
                lat: 0,
                lng: 0,
              },
            },
            minutes: item.Minutes,
          };
        });
      })
      .flat(),
  });
};

export default handler;
