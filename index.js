import 'ol/ol.css';
import {Map, View} from 'ol';
import {fromLonLat} from "ol/proj";
import TileLayer from 'ol/layer/Tile';
import VectorTileLayer from 'ol/layer/VectorTile';
import VectorTileSource from 'ol/source/VectorTile';
import {createXYZ} from 'ol/tilegrid';
import MVT from 'ol/format/MVT';
import XYZ from 'ol/source/XYZ';
import OSM from 'ol/source/OSM';

const osm_layer = new TileLayer({
    source: new OSM()
});

const map_box_layer = new TileLayer({
    source: new XYZ({
        url: 'https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}?access_token=' + process.env.MAPBOX_KEY
    })
});

const vector_tiles_layer = new VectorTileLayer({
    //extent: [12570321.543690529,-5412608.225382536,17711534.667873237,-1030958.0541402507],
    source: new VectorTileSource ({
        tilePixelRatio: 1, // oversampling when > 1
        tileGrid: createXYZ({maxZoom: 19}),
        format: new MVT(),
        url: 'https://basemaps.arcgis.com/v1/arcgis/rest/services/World_Basemap/VectorTileServer/tile/{z}/{y}/{x}.pbf'
    })
});

const map = new Map({

    target: 'map',
    view: new View({
        center: fromLonLat([146.0, -33.0]),
        zoom: 4
    }),
    layers: [
        // map_box_layer,
        // osm_layer,
        vector_tiles_layer,
    ]
});