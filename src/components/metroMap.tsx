import 'leaflet/dist/leaflet.css';

import L, { divIcon } from 'leaflet';
import { renderToHTML } from 'next/dist/server/render';
import React, { Fragment, useEffect } from 'react';
import { render } from 'react-dom';
import { renderToString } from 'react-dom/server';
import {
    CircleMarker, MapContainer, Marker, Polyline, TileLayer, ZoomControl
} from 'react-leaflet';
import { LeafletTrackingMarker } from 'react-leaflet-tracking-marker';

import { Bus, MetroRouteDetail } from '../interfaces/metroLists';

const MetroMap = (props: {
  metroRoutesDetail: MetroRouteDetail[] | undefined;
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
          attribution="Map from <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a></br/>Available at <a href='https://github.com/anonymaew/ucsc-dining-menu'>GitHub</a> | Made by <a href='https://napatsc.com'>Napat Srichan</a>"
        />
        <ZoomControl position="bottomleft" />
        {props.metroRoutesDetail?.map((metroRouteDetail, index) => {
          return (
            <Fragment key={index}>
              <Polyline
                pathOptions={{
                  color: "#075985",
                  weight: 8,
                }}
                positions={
                  metroRouteDetail.waypoints.map((waypoint) => [
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
                  metroRouteDetail.waypoints.map((waypoint) => [
                    waypoint.lat,
                    waypoint.lng,
                  ]) || []
                }
              />
              {metroRouteDetail.stops.map((stopItem) => (
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
            </Fragment>
          );
        })}
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
              new L.DivIcon({
                className: "bus-icon",
                html: renderToString(
                  <div className="w-8 text-sm font-bold text-center text-indigo-900 align-middle bg-indigo-100 border-4 border-indigo-900 rounded-full aspect-square">
                    {busItem.name}
                  </div>
                ),
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

export default MetroMap;
