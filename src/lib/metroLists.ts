import { promises as fs } from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';

import { MetroRouteDetail } from '../interfaces/metroLists';

const metroListsFromWeb = async (): Promise<MetroRouteDetail[]> => {
  const routesResponse = await fetch("https://cruzmetro.com/Region/0/Routes");
  const routesData = await routesResponse.json();
  return Promise.all(
    routesData.map(async (item: any): Promise<MetroRouteDetail> => {
      const id = item.ID;
      const responses = await Promise.all([
        fetch(`https://cruzmetro.com/Route/${id}/Directions`),
        fetch(`https://cruzmetro.com/Route/${id}/Waypoints`),
      ]);
      const stopResponse = responses[0];
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

      const waypointResponse = responses[1];
      const waypointData = await waypointResponse.json();
      const waypoints = waypointData[0].map((item: any) => {
        return {
          lat: item.Latitude,
          lng: item.Longitude,
        };
      });

      return {
        id,
        name: item.ShortName,
        fullName: item.Name,
        stops,
        waypoints,
      };
    })
  );
};

const metroLists = async () => {
  const jsonPath = path.join(process.cwd(), "/src/lib/metro.json");
  const content = await fs.readFile(jsonPath, "utf-8");
  return JSON.parse(content);
};

export default metroLists;
