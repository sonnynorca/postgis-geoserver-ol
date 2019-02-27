import 'ol/ol.css';
import 'ol-layerswitcher/src/ol-layerswitcher.css';

import Map from 'ol/Map';
import View from 'ol/View';
import { transform } from 'ol/proj';
import LayerGroup from 'ol/layer/Group';
import LayerImage from 'ol/layer/Image';
import LayerTile from 'ol/layer/Tile';
import SourceImageArcGISRest from 'ol/source/ImageArcGISRest';
import SourceOSM from 'ol/source/OSM';
import SourceStamen from 'ol/source/Stamen';
import ImageWMS from 'ol/source/ImageWMS.js';
import LayerSwitcher from 'ol-layerswitcher';

var map = new Map({
    target: 'map',
    layers: [
        new LayerGroup({
            'title': 'Base maps',
            layers: [
                new LayerGroup({
                    title: 'Water color with labels',
                    type: 'base',
                    combine: true,
                    visible: false,
                    layers: [
                        new LayerTile({
                            source: new SourceStamen({
                                layer: 'watercolor'
                            })
                        }),
                        new LayerTile({
                            source: new SourceStamen({
                                layer: 'terrain-labels'
                            })
                        })
                    ]
                }),
                new LayerTile({
                    title: 'Water color',
                    type: 'base',
                    visible: false,
                    source: new SourceStamen({
                        layer: 'watercolor'
                    })
                }),
                new LayerTile({
                    title: 'OSM',
                    type: 'base',
                    visible: true,
                    source: new SourceOSM()
                })
            ]
        }),
        new LayerGroup({
            title: 'Overlays',
            layers: [
                 new LayerImage({
                      title: 'Schools',
                      source: new ImageWMS({
                      url: 'http://localhost:8080/geoserver/webmap_school/wms',
                      params: {'LAYERS': 'webmap_school:schools'},
                      ratio: 1,
                      serverType: 'geoserver'
                    })
                  }),
                new LayerImage({
                      title: 'Institutional Area ',
                      source: new ImageWMS({
                      url: 'http://localhost:8080/geoserver/webmap-landuse/wms',
                      params: {'LAYERS': 'webmap-landuse:institutional'},
                      ratio: 1,
                      serverType: 'geoserver'
                    })
                })
            ]
        })
    ],
    view: new View({
        center: transform([125.5406, 8.9475], 'EPSG:4326', 'EPSG:3857'),
        zoom: 6
    })
});

var layerSwitcher = new LayerSwitcher();
map.addControl(layerSwitcher);