import { NextApiRequest, NextApiResponse } from 'next';

import { StopDetail } from '../../../interfaces/metroLists';

type StopResponse = {
  stpid: string;
  rt: string;
  prdctdn: string;
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<StopDetail>
) => {
  const { id } = req.query as { id: string };
  const stopResponse = await fetch(`https://rt.scmetro.org/bustime/api/v3/getpredictions?key=${process.env.APIKEY}&stpid=${id}&format=json`);
  const stopJSON = await stopResponse.json();
  const stopData: StopResponse[] = stopJSON['bustime-response']['prd'] || [];
  const arrivals = stopData.map((stop) => ({
    bus: {
      id: '',
      route: stop.rt,
      position: {
        lat: 0,
        lon: 0,
      },
    },
    minutes: parseInt(stop.prdctdn) || 0,
  }));

  return res.status(200).json({
    id,
    arrivals
  });
};

export default handler;
