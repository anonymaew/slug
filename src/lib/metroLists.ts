import { MetroRouteDetail } from '../interfaces/metroLists';

const metroLists = async (): Promise<MetroRouteDetail[]> => {
  const routesResponse = await fetch("https://cruzmetro.com/Region/0/Routes");
  const routesData = await routesResponse.json();
  return Promise.all(
    routesData.map(async (item: any): Promise<MetroRouteDetail> => {
      const id = item.ID;
      const stopResponse = await fetch(
        `https://cruzmetro.com/Route/${id}/Directions`
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
        `https://cruzmetro.com/Route/${id}/Waypoints`
      );
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

export default metroLists;
