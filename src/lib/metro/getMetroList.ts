import { promises as fs } from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';

import { RouteDetail } from '../../interfaces/metroLists';

type RouteResponse = {
  rt: string;
  rtnm: string;
};

type WaypointResponse = {
  typ: 'W';
  lat: number;
  lon: number;
}

type StopResponse = {
  typ: 'S';
  stpid: string;
  stpnm: string;
  lat: number;
  lon: number;
}

const getMetroLists = async (): Promise<RouteDetail[]> => {
  const routesResponse = await fetch(`https://rt.scmetro.org/bustime/api/v3/getroutes?key=${process.env.APIKEY}&format=json`);
  const routesJSON = await routesResponse.json();
  const routesData: RouteResponse[] = routesJSON['bustime-response']['routes'];
  return Promise.all(
    routesData
      .map(async (route): Promise<RouteDetail> => {
        const waypointResponse = await fetch(`https://rt.scmetro.org/bustime/api/v3/getpatterns?key=${process.env.APIKEY}&rt=${route.rt}&format=json`);
        const waypointJSON = await waypointResponse.json();
        const waypointData: (WaypointResponse | StopResponse)[] =
          waypointJSON['bustime-response']['ptr'][0]['pt'];

        const stops = waypointData
          .filter((point: WaypointResponse | StopResponse): point is StopResponse => point.typ === 'S')
          .map((stop: StopResponse) => ({
            id: stop.stpid,
            name: stop.stpnm.split(' ').slice(0, -1).join(' '),
            position: {
              lat: stop.lat,
              lon: stop.lon,
            },
          }));
        const waypoints = waypointData
          .filter((point: WaypointResponse | StopResponse): point is WaypointResponse => point.typ === 'W')
          .map((point: WaypointResponse) => ({
            lat: point.lat,
            lon: point.lon,
          }));

        return {
          name: route.rt,
          fullName: route.rtnm,
          stops,
          waypoints,
        };
      })
  );
};

export default getMetroLists;
