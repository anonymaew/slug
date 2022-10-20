export interface MetroRouteDetail {
  id: number;
  name: string;
  fullName: string;
  stops: MetroStop[];
  waypoints: Position[];
}

export interface MetroStop {
  id: number;
  name: string;
  position: Position;
}

export interface Position {
  lat: number;
  lng: number;
}

export interface Bus {
  id: number;
  route: string;
  name: string;
  position: Position;
  prevPosition?: Position;
}
export interface StopDetail {
  id: number;
  arrivals: {
    bus: Bus;
    minutes: number;
  }[];
}
