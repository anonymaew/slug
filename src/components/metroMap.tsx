import 'leaflet/dist/leaflet.css';

import L, { divIcon } from 'leaflet';
import { renderToHTML } from 'next/dist/server/render';
import React, { Dispatch, Fragment, SetStateAction, useEffect } from 'react';
import { renderToString } from 'react-dom/server';
import {
    CircleMarker, MapContainer, Marker, Polyline, TileLayer, ZoomControl
} from 'react-leaflet';
import { LeafletTrackingMarker } from 'react-leaflet-tracking-marker';

import { Bus, RouteDetail } from '../interfaces/metroLists';

const MetroMap = (props: {
  selectedRoutes: number[];
  routesDetail: RouteDetail[];
  buses: Bus[];
  stopFocus: string | undefined;
  setStopFocus: Dispatch<SetStateAction<string | undefined>>;
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
          attribution="Map from <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> | Live data from <a href='https://rt.scmetro.org'>Santa Cruz Metro</a><p style='text-align:right;'>Available at <a href='https://github.com/anonymaew/ucsc-dining-menu'>GitHub</a> | Made by <a href='https://napatsc.com'>Napat Srichan</a></p>"
        />
        {props.routesDetail
          .filter((_, index) => props.selectedRoutes.includes(index))
          .map((routeDetail, index) => {
            return (
              <Fragment key={index}>
                <Polyline
                  pathOptions={{
                    color: "#075985",
                    weight: 8,
                  }}
                  positions={
                    routeDetail.waypoints.map((waypoint) => [
                      waypoint.lat,
                      waypoint.lon,
                    ]) || []
                  }
                />
                <Polyline
                  pathOptions={{
                    color: "#e0e7ff",
                    weight: 4,
                  }}
                  positions={
                    routeDetail.waypoints.map((waypoint) => [
                      waypoint.lat,
                      waypoint.lon,
                    ]) || []
                  }
                />
              </Fragment>
            );
          })}
        {props.routesDetail
          .filter((_, index) => props.selectedRoutes.includes(index))
          .flatMap((routeDetail) => routeDetail.stops)
          .reduce((acc, stop) => {
            if (acc.some((stop2) => stop2.id === stop.id)) return acc;
            else return [...acc, stop];
          }, [] as typeof props.routesDetail[0]["stops"])
          .map((stopItem) => (
            <CircleMarker
              key={stopItem.id}
              center={[stopItem.position.lat, stopItem.position.lon]}
              pathOptions={{
                fillColor:
                  props.stopFocus === stopItem.id ? "#fbbf24" : "#818cf8",
                fillOpacity: 1,
                color: props.stopFocus === stopItem.id ? "#78350f" : "#075985",
                weight: 2,
              }}
              radius={8}
              eventHandlers={{
                click: (e) => {
                  props.setStopFocus(stopItem.id);
                },
              }}
            />
          ))}
        {props.buses.map((busItem) => (
          <Fragment key={busItem.id}>
            <LeafletTrackingMarker
              position={[busItem.position.lat, busItem.position.lon]}
              previousPosition={
                busItem.prevPosition
                  ? [busItem.prevPosition.lat, busItem.prevPosition.lon]
                  : undefined
              }
              duration={5000}
              icon={
                new L.DivIcon({
                  className: "bus-icon",
                  html: renderToString(
                    <div className="relative w-8 aspect-square">
                      <div className="absolute w-full h-full bg-indigo-500 rounded-full animate-ping"></div>
                      <div className="absolute w-full h-full -rotate-45 bg-indigo-100 border-4 border-indigo-900 rounded-t-full rounded-bl-full"></div>
                    </div>
                  ),
                  iconSize: [32, 32],
                  iconAnchor: [16, 16],
                })
              }
              rotationOrigin="center center"
              zIndexOffset={10}
            />
            <LeafletTrackingMarker
              position={[busItem.position.lat, busItem.position.lon]}
              previousPosition={
                busItem.prevPosition
                  ? [busItem.prevPosition.lat, busItem.prevPosition.lon]
                  : undefined
              }
              duration={5000}
              icon={
                new L.DivIcon({
                  className: "bus-icon-text",
                  html: renderToString(
                    <div className="w-8 pt-2 text-xs font-black text-center text-indigo-900 aspect-square">
                      {busItem.route}
                    </div>
                  ),
                  iconSize: [32, 32],
                  iconAnchor: [16, 16],
                })
              }
              rotationAngle={0}
              zIndexOffset={10}
            />
          </Fragment>
        ))}
      </MapContainer>
    </div>
  );
};

export default MetroMap;
