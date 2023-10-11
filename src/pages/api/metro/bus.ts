import { NextApiRequest, NextApiResponse } from 'next';

import { Bus } from '../../../interfaces/metroLists';

type BusResponse = {
  vid: string;
  rt: string;
  lat: string;
  lon: string;
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Bus[]>) => {
  const { ids } = req.query as { ids: string };
  const idsArray = ids.split(',');
  const idArrays = idsArray.reduce((acc: string[][], id) => {
    if (acc[acc.length - 1].length < 10) {
      acc[acc.length - 1].push(id);
    } else {
      acc.push([id]);
    }
    return acc;
  }, [[]]);

  const buses = await Promise.all(
    idArrays.map(async (idArray) => {
      const idArrayString = idArray.join(',');
      const busesResponse = await fetch(`https://rt.scmetro.org/bustime/api/v3/getvehicles?rt=${idArrayString}&key=${process.env.APIKEY}&format=json`);
      const busesJSON = await busesResponse.json();
      const busesData: BusResponse[] =
        busesJSON['bustime-response']['vehicle'];
      return busesData.map((busData) => {
        return {
          id: busData.vid,
          route: busData.rt,
          position: {
            lat: parseFloat(busData.lat),
            lon: parseFloat(busData.lon),
          },
        };
      });
    })
  )
  return res.status(200).json(buses.flat());
};

export default handler;
