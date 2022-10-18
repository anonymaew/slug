import { NextApiRequest, NextApiResponse } from 'next';

import { MetroRouteDetail } from '../../../../../interfaces/metroLists';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<MetroRouteDetail>
) => {
  const { routeId } = req.query as { routeId: string };

  const stopResponse = await fetch(
    `https://cruzmetro.com/Route/${routeId}/Directions`
  );
  const stopData = await stopResponse.json();
  const stops = stopData[0].Stops.map((item: any) => {
    return {
      id: item.ID,
      name: item.Name,
      position: {
        lat: item.Latitude,
        lng: item.Longitude,
      },
    };
  });

  const waypointResponse = await fetch(
    `https://cruzmetro.com/Route/${routeId}/Waypoints`
  );
  const waypointData = await waypointResponse.json();
  const waypoints = waypointData[0].map((item: any) => {
    return {
      lat: item.Latitude,
      lng: item.Longitude,
    };
  });

  return res.status(200).json({
    stops,
    waypoints,
  });
};

export default handler;
