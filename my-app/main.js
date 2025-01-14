import "./style.css";
import { Feature, Map, View } from "ol/index.js";
import { OSM, Vector as VectorSource } from "ol/source.js";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer.js";
import { useGeographic } from "ol/proj.js";
import Style from "ol/style/Style";
import Circle from 'ol/geom/Circle';
import { Fill } from 'ol/style';

useGeographic();

const locations = {
  UnionCityCA: { coords: [-122.018266, 37.598998], color: "red", occurences: 2 },
  NorthbrookIL: { coords: [-87.836202, 42.127520], color: "blue", occurences: 1 },
  PasadenaCA: { coords: [-118.131809, 34.184581], color: "green", occurences: 1 },
  FolsomCA: { coords: [-121.147826, 38.674677], color: "purple", occurences: 1 },
};

const features = Object.entries(locations).map(([key, { coords, color, occurences }]) => {
  let radius = 0.1 * occurences;
  const circle = new Circle(coords, radius);
  const feature = new Feature(circle);
  feature.setStyle(
    new Style({
      fill: new Fill({ color: `${color}` }),
    })
  );

  return feature;
});

const map = new Map({
  target: "map",
  layers: [
    new TileLayer({
      source: new OSM(),
    }),
    new VectorLayer({
      source: new VectorSource({
        features
      }),
    }),
  ],
  view: new View({
    //center of USA
    center: [-102.01149, 38.833824],
    zoom: 6,
  }),
});
