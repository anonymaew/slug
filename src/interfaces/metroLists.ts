export interface MetroRoute {
  id: number;
  name: string;
  fullName: string;
}

export interface MetroRouteDetail {
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
  heading: number;
  position: Position;
  prevPosition?: Position;
}
