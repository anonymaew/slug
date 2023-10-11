import dynamic from 'next/dynamic';
import { useEffect, useMemo, useState } from 'react';

import MetroSelector from '../components/metroSelector';
import MetroStopDetail from '../components/metroStopDetail';
import { Bus, RouteDetail, StopDetail } from '../interfaces/metroLists';
import getMetroLists from '../lib/metro/getMetroList';

const MetroPage = (props: { routes: RouteDetail[] }) => {
  const MetroMap = useMemo(
    () =>
      dynamic(() => import("../components/metroMap"), {
        loading: () => <p>Loading...</p>,
        ssr: false,
      }),
    []
  );

  const [selectedRoutes, setSelectedRoutes] = useState<number[]>([
    2, 3, 5, 6, 7
  ]);
  const [buses, setBuses] = useState<Bus[]>([]);
  const [stopFocus, setStopFocus] = useState<string>();
  const [stopDetail, setStopDetail] = useState<StopDetail>();

  useEffect(() => {
    const getBuses = async () => {
      const busesQuery = selectedRoutes
        .map((routeIndex) => props.routes[routeIndex].name)
        .join(",");
      const busesResponse = await fetch(`/api/metro/bus?ids=${busesQuery}`);
      const busesData = await busesResponse.json();
      setBuses((prevBus) => {
        const newBus = busesData.map((bus: Bus): Bus => {
          const prevBusItem = prevBus.find(
            (prevBusItem) => prevBusItem.id === bus.id
          );
          if (prevBusItem) bus.prevPosition = prevBusItem.position;
          const route = props.routes.find(
            (route) => route.name === bus.route
          );
          if (route) bus.route = route.name;
          return bus;
        });
        return newBus;
      });
    };

    getBuses();
    const interval = setInterval(async () => await getBuses(), 5000);
    return () => clearInterval(interval);
  }, [selectedRoutes, props.routes]);

  useEffect(() => {
    if (!stopFocus) return setStopDetail(undefined);
    const getStopDetail = async () => {
      const stopDetailResponse = await fetch(`/api/metro/stop?id=${stopFocus}`);
      const stopDetailData = await stopDetailResponse.json();
      setStopDetail(stopDetailData);
    };

    getStopDetail();
    const interval = setInterval(async () => await getStopDetail(), 20000);
    return () => clearInterval(interval);
  }, [stopFocus]);

  return (
    <div>
      <MetroSelector
        data={props.routes}
        selectedRoutes={selectedRoutes}
        setSelectedRoutes={setSelectedRoutes}
      />
      <MetroMap
        selectedRoutes={selectedRoutes}
        routesDetail={props.routes}
        buses={buses}
        stopFocus={stopFocus}
        setStopFocus={setStopFocus}
      />
      {stopDetail !== undefined && (
        <MetroStopDetail
          routes={props.routes}
          stopDetail={stopDetail}
          setStopFocus={setStopFocus}
        />
      )}
    </div>
  );
};

export const getStaticProps = async () => {
  const routes = await getMetroLists();
  return {
    props: {
      routes,
    },
  };
};

export default MetroPage;
