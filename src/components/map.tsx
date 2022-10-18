import 'leaflet/dist/leaflet.css';

import L from 'leaflet';
import React, { useEffect } from 'react';
import {
    CircleMarker, MapContainer, Marker, Polyline, TileLayer, ZoomControl
} from 'react-leaflet';
import { LeafletTrackingMarker } from 'react-leaflet-tracking-marker';

import { Bus, MetroRouteDetail } from '../interfaces/metroLists';

const Map = (props: {
  metroRouteDetail: MetroRouteDetail | undefined;
  metroBuses: Bus[];
}) => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen">
      <MapContainer
        center={[36.9755889, -122.037674]}
        zoom={14}
        zoomControl={false}
        className="h-screen"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="Map from <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> | Available at <a href='https://github.com/anonymaew/ucsc-dining-menu'>GitHub</a>| Made by <a href='https://napatsc.com'>Napat Srichan</a>"
        />
        <ZoomControl position="bottomleft" />
        <Polyline
          pathOptions={{
            color: "#075985",
            weight: 8,
          }}
          positions={
            props.metroRouteDetail?.waypoints.map((waypoint) => [
              waypoint.lat,
              waypoint.lng,
            ]) || []
          }
        />
        <Polyline
          pathOptions={{
            color: "#38bdf8",
            weight: 4,
          }}
          positions={
            props.metroRouteDetail?.waypoints.map((waypoint) => [
              waypoint.lat,
              waypoint.lng,
            ]) || []
          }
        />
        {props.metroRouteDetail?.stops.map((stopItem) => (
          <CircleMarker
            key={stopItem.id}
            center={[stopItem.position.lat, stopItem.position.lng]}
            pathOptions={{
              fillColor: "#34d399",
              fillOpacity: 1,
              color: "#065f46",
              weight: 2,
            }}
            radius={6}
          />
        ))}
        {props.metroBuses.map((busItem) => (
          <LeafletTrackingMarker
            key={busItem.id}
            position={[busItem.position.lat, busItem.position.lng]}
            previousPosition={
              busItem.prevPosition
                ? [busItem.prevPosition.lat, busItem.prevPosition.lng]
                : undefined
            }
            duration={5000}
            icon={
              new L.Icon({
                iconUrl: "/bus.svg",
                iconSize: [32, 32],
                iconAnchor: [16, 16],
              })
            }
            rotationAngle={0}
            zIndexOffset={10}
          />
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;
