import dynamic from 'next/dynamic';
import { useEffect, useMemo, useRef, useState } from 'react';

import MetroSelector from '../components/metroSelector';
import MetroStopDetail from '../components/metroStopDetail';
import { Bus, MetroRouteDetail, StopDetail } from '../interfaces/metroLists';
import MainLayout from '../layouts/main';
import metroLists from '../lib/metroLists';

const MetroPage = (props: { routes: MetroRouteDetail[] }) => {
  const MetroMap = useMemo(
    () =>
      dynamic(() => import("../components/metroMap"), {
        loading: () => <p>Loading...</p>,
        ssr: false,
      }),
    []
  );

  // useEffect(() => {
  //   //download props.routes json
  //   const string = JSON.stringify(props.routes);
  //   var blob = new Blob([string], { type: "application/json" });
  //   var url = URL.createObjectURL(blob);
  //   var a = document.createElement("a");
  //   a.download = "routes.json";
  //   a.href = url;
  //   a.textContent = "Download routes.json";
  //   a.click();
  // }, []);

  const [selectedRoutes, setSelectedRoutes] = useState<number[]>([
    1, 2, 4, 5, 6,
  ]);
  const [buses, setBuses] = useState<Bus[]>([]);
  const [stopFocus, setStopFocus] = useState<number>();
  const [stopDetail, setStopDetail] = useState<StopDetail>();

  useEffect(() => {
    const getBuses = async () => {
      const busesQuery = selectedRoutes
        .map((routeIndex) => props.routes[routeIndex].id)
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
            (route) => route.id === parseInt(bus.route)
          );
          if (route) bus.name = route.name;
          return bus;
        });
        return newBus;
      });
    };

    getBuses();
    const interval = setInterval(async () => await getBuses(), 5000);
    return () => clearInterval(interval);
  }, [selectedRoutes]);

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
        metroRoutesDetail={props.routes}
        metroBuses={buses}
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
  const routes = await metroLists();
  return {
    props: {
      routes,
    },
  };
};

export default MetroPage;
