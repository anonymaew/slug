import dynamic from 'next/dynamic';
import { useEffect, useMemo, useRef, useState } from 'react';

import MetroSelector from '../components/metroSelector';
import { Bus, MetroRoute, MetroRouteDetail } from '../interfaces/metroLists';
import MainLayout from '../layouts/main';

const MetroPage = () => {
  const MetroMap = useMemo(
    () =>
      dynamic(() => import("../components/metroMap"), {
        loading: () => <p>Loading...</p>,
        ssr: false,
      }),
    []
  );

  const [routes, setRoutes] = useState<MetroRoute[]>([]);
  const [selectedRoutes, setSelectedRoutes] = useState<number[]>([]);
  const [routesDetail, setRoutesDetail] = useState<MetroRouteDetail[]>();
  const [buses, setBuses] = useState<Bus[]>([]);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/metro/routes");
      const data = await res.json();
      setRoutes(data);
      setSelectedRoutes([1, 2, 4, 5, 6]);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      setRoutesDetail([]);
      if (selectedRoutes && routes && routes.length > 0) {
        const routesDetailPromise = selectedRoutes
          .map((routeIndex) => routes[routeIndex].id)
          .map(async (routeId): Promise<MetroRouteDetail> => {
            const res = await fetch(`/api/metro/route/${routeId}/detail`);
            const data = await res.json();
            return data;
          });
        const routesDetail = await Promise.all(routesDetailPromise);

        setRoutesDetail(routesDetail);
      }
    })();
  }, [selectedRoutes]);

  useEffect(() => {
    const getBuses = async () => {
      if (selectedRoutes && routes && routes.length > 0) {
        const busesDataPromise = selectedRoutes
          .map((routeIndex) => routes[routeIndex])
          .map(async (route): Promise<Bus[]> => {
            const busResult = await fetch(
              `/api/metro/route/${route.id}/bus?shortName=${route.name}`
            );
            const busData = await busResult.json();
            return busData;
          });
        const busesData = (await Promise.all(busesDataPromise)).flat();
        setBuses((prevBus) => {
          const newBus = busesData.map((bus: Bus) => {
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
  }, [selectedRoutes]);

  return (
    <div>
      <MetroSelector
        data={routes}
        selectedRoutes={selectedRoutes}
        setSelectedRoutes={setSelectedRoutes}
      />
      <MetroMap metroRoutesDetail={routesDetail} metroBuses={buses} />
    </div>
  );
};

export default MetroPage;
