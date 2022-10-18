import dynamic from 'next/dynamic';
import { useEffect, useMemo, useRef, useState } from 'react';

import MetroSelector from '../components/metroSelector';
import { Bus, MetroRoute, MetroRouteDetail } from '../interfaces/metroLists';
import MainLayout from '../layouts/main';

const MetroPage = () => {
  const Map = useMemo(
    () =>
      dynamic(() => import("../components/map"), {
        loading: () => <p>Loading...</p>,
        ssr: false,
      }),
    []
  );

  const [routes, setRoutes] = useState<MetroRoute[]>([]);
  const [route, setRoute] = useState<MetroRoute>();
  const [routeDetail, setRouteDetail] = useState<MetroRouteDetail>();
  const [buses, setBuses] = useState<Bus[]>([]);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/metro/routes");
      const data = await res.json();
      setRoutes(data);
      setRoute(data[1]);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (route) {
        const detailResult = await fetch(`/api/metro/route/${route.id}/detail`);
        const detailData = await detailResult.json();
        setRouteDetail(detailData);
      }
    })();
  }, [route]);

  useEffect(() => {
    const getBuses = async () => {
      if (route) {
        const busResult = await fetch(`/api/metro/route/${route.id}/bus`);
        const busData = await busResult.json();
        setBuses((prevBus) => {
          const newBus = busData.map((bus: Bus) => {
            const prevBusItem = prevBus.find(
              (prevBusItem) => prevBusItem.id === bus.id
            );
            if (prevBusItem) bus.prevPosition = prevBusItem.position;
            return bus;
          });
          return newBus;
        });
      }
    };
    getBuses();
    const interval = setInterval(async () => await getBuses(), 5000);
    return () => clearInterval(interval);
  }, [route]);

  return (
    <div>
      <MetroSelector data={routes} route={route} setRoute={setRoute} />
      <Map metroRouteDetail={routeDetail} metroBuses={buses} />
    </div>
  );
};

export default MetroPage;
