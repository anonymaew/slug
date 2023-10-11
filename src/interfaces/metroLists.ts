export interface RouteDetail {
  name: string;
  fullName: string;
  stops: Stop[];
  waypoints: Position[];
}

export interface Stop {
  id: string;
  name: string;
  position: Position;
}

export interface Position {
  lat: number;
  lon: number;
}

export interface Bus {
  id: string;
  route: string;
  position: Position;
  prevPosition?: Position;
}

export interface StopDetail {
  id: string;
  arrivals: {
    bus: Bus;
    minutes: number;
  }[];
}
