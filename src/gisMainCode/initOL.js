import $ from "jquery";
import Map from "ol/Map";
import TileWMS from "ol/source/TileWMS";
import Tile from "ol/layer/Tile";
import View from "ol/View";
import VectorSource from "ol/source/Vector";
import WMTS from "ol/source/WMTS";
import WMTStilegrid from "ol/tilegrid/WMTS";
import VectorLayer from "ol/layer/Vector";
import GeoJSON from "ol/format/GeoJSON";
import Style from "ol/style/Style";
import Circle from "ol/style/Circle";
import Fill from "ol/style/Fill";
import Icon from "ol/style/Icon";
import Stroke from "ol/style/Stroke";
import Text from "ol/style/Text";
import Heatmap from "ol/layer/Heatmap";
import Projection from "ol/proj/Projection";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import OSM from "ol/source/OSM";

var map;
var mapUrl = "http://122.112.180.112:8080/";

// 常信
var baseUrl = mapUrl + "geoserver/gwc/service/wmts";
var gridNames = [
    "EPSG:4326:10",
    "EPSG:4326:11",
    "EPSG:4326:12",
    "EPSG:4326:13",
    "EPSG:4326:14",
    "EPSG:4326:15",
    "EPSG:4326:16",
    "EPSG:4326:17",
    "EPSG:4326:18",
    "EPSG:4326:19"
];
var resolutions = [
    6.866455078125e-4,
    3.4332275390625e-4,
    1.71661376953125e-4,
    8.58306884765625e-5,
    4.291534423828125e-5,
    2.1457672119140625e-5,
    1.0728836059570312e-5,
    5.364418029785156e-6,
    2.682209014892578e-6,
    1.341104507446289e-6
];
var extent = [
    112.28028012283869,
    36.834406880342726,
    112.28885847634137,
    36.84746840699927
];

var hd910Layer;
var groundBorder;
var groundBuilding;
var riskLevel;
var heatmap;
var WMTSLayer;


var olLayer = {
    hd910Layer: {
        layer: "hd910Layer",
        style: new Style({
            stroke: new Stroke({
                color: "#0378a6",
                width: 2
            })
        })
    },
    groundBorder: {
        layer: "groundside",
        style: new Style({
            stroke: new Stroke({
                color: "#de761c",
                width: 4
            })
        })
    },
    groundBuilding: {
        layer: "groundbuilding",
        style: new Style({
            image: new Circle({
                radius: 4,
                fill: new Fill({
                    color: "#de5461"
                    // 0378a6
                })
            }),
            fill: new Fill({
                color: "#3661de"
            })
        })
    },
    riskground: {
        layer: "riskground",
        style: function (e) {

        }
    },
    riskunderground: {
        layer: "riskunderground",
        style: function (e) {

        }
    },

};

function clearAllLayer() {
    try {
        map.removeLayer(hd910Layer);
        map.removeLayer(groundBorder);
        map.removeLayer(groundBuilding);
        map.removeLayer(heatmap);
        map.removeLayer(riskLevel);
        map.removeLayer(WMTSLayer);
    } catch (e) {
        console.log(e);
    }
}

export default {
    olMap: function (target) {
        map = new Map({
            // 设置地图图层
            layers: [
                new Tile({
                    source: new TileWMS({
                        url: mapUrl + "geoserver/MaJunYv/wms",
                        params: {
                            LAYERS: "MaJunYv:ShanXiprovinceArea",
                            TILED: false
                        },
                        serverType: "geoserver",
                        projection: "EPSG:4326"
                    })
                })
            ],
            view: new View({
                center: [112.271442858, 36.8324869206], //常信
                //center: [112.253985551, 36.785539781], //马军峪
                zoom: 16,
                projection: "EPSG:4326"
            }),
            target: target,
            logo: false
        });
        return map;
    },
    viewFlyTo: function (cood) {
        var view = new View({
            center: [cood.lng, cood.lat],
            zoom: cood.zoom, // 定义地图显示层级为2
            projection: "EPSG:4326"
        });
        map.setView(view);
    },
    loadLayer: function (layers) {
        let result;
        clearAllLayer();

        function loadAjax(layerName, callBackFunction) {
            $.ajax({
                url:
                    mapUrl +
                    "geoserver/MaJunYv/ows?service=WFS" +
                    "&version=1.0.0" +
                    "&request=GetFeature" +
                    "&typeName=MaJunYv%3A" +
                    layerName +
                    "&maxFeatures=5000" +
                    "&outputFormat=application%2Fjson",
                cache: false,
                async: false,
                success: callBackFunction
            });
        }

        function loadWMTSLayer() {
            var gridsetName = "EPSG:4326";
            var style = "";
            var format = "image/png";
            var layerName = "MaJunYv:majunyv_Raster";

            var projection = new Projection({
                code: "EPSG:4326",
                units: "degrees",
                axisOrientation: "neu"
            });
            var baseParams = [
                "VERSION",
                "LAYER",
                "STYLE",
                "TILEMATRIX",
                "TILEMATRIXSET",
                "SERVICE",
                "FORMAT"
            ];

            var params = {
                VERSION: "1.0.0",
                LAYER: layerName,
                STYLE: style,
                TILEMATRIX: gridNames,
                TILEMATRIXSET: gridsetName,
                SERVICE: "WMTS",
                FORMAT: format
            };

            function constructSource() {
                var url = baseUrl + "?";
                for (var param in params) {
                    if (baseParams.indexOf(param.toUpperCase()) < 0) {
                        url = url + param + "=" + params[param] + "&";
                    }
                }
                url = url.slice(0, -1);
                return new WMTS({
                    url: url,
                    layer: params["LAYER"],
                    matrixSet: params["TILEMATRIXSET"],
                    format: params["FORMAT"],
                    projection: projection,
                    tileGrid: new WMTStilegrid({
                        tileSize: [256, 256],
                        extent: extent,
                        origin: [-180.0, 90.0],
                        resolutions: resolutions,
                        matrixIds: params["TILEMATRIX"]
                    }),
                    style: params["STYLE"],
                    wrapX: true
                });
            }

            return new Tile({
                source: constructSource()
            });
        }

        function loadGeojsonLayer(obj) {
            let layerName = obj.layer;
            let style = obj.style;
            let layer = new VectorLayer({
                source: new VectorSource({
                    format: new GeoJSON({
                        geometryName: "the_geom"
                    }),
                    url:
                        mapUrl +
                        "geoserver/MaJunYv/ows?service=WFS" +
                        "&version=1.0.0" +
                        "&request=GetFeature" +
                        "&typeName=MaJunYv%3A" + layerName +
                        "&maxFeatures=5000" +
                        "&outputFormat=application%2Fjson"
                }),
                style: style
            });
            return layer;
        }

        function loadRisk(layerName) {
            var heatmapSource = new VectorSource();
            var heatData = {
                type: "FeatureCollection",
                features: []
            };
            var riskSource = new VectorSource();

            function heat(heatData) {
                heatmapSource.clear();
                //矢量图层 获取gejson数据
                heatmapSource.addFeatures(
                    new GeoJSON().readFeatures(heatData, {
                        dataProjection: "EPSG:4326",
                        featureProjection: "EPSG:4326"
                    })
                );
            }

            function setFeatureStyle(feature, location, png) {
                var image = new Image(200, 200);
                image.src = png;
                feature.setStyle(
                    new Style({
                        text: new Text({
                            font: 19 + "px Calibri,sans-serif",
                            text: location,
                            fill: new Fill({
                                color: "#FFA200"
                            }),
                            offsetY: 40
                        }),
                        image: new Icon({
                            img: image,
                            imgSize: [127, 127],
                            scale: 1 //图标缩放比例
                        })
                    })
                );
            }

            loadAjax(layerName, function (data) {
                var fea = data.features;
                let heatMapData = [];
                for (var i = 0; i < fea.length; i++) {
                    var pointcode = fea[i].properties.pointcode;
                    var featureName = fea[i].properties.location;
                    var featureId = "risklocat" + (i * 1 + 1);
                    var feature = new Feature({
                        geometry: new Point([
                            fea[i].properties.point_x,
                            fea[i].properties.point_y
                        ]),
                        name: featureName
                    });
                    heatMapData.push({
                        type: "Point",
                        coordinates: [fea[i].properties.point_x, fea[i].properties.point_y],
                        count: Number(3) * 100
                    });
                    // 向图形添加相关信息
                    feature.f = featureId;
                    feature.values_.point_x = fea[i].properties.point_x;
                    feature.values_.point_y = fea[i].properties.point_y;
                    feature.values_.pointcode = pointcode;
                    feature.values_.location = featureName;

                    var url = require("../assets/ppp.png");
                    setFeatureStyle(feature, featureName, url);
                    riskSource.addFeatures([feature]);
                }
                heatData.features = [];
                heatData.features = heatMapData;
                heat(heatData);
            });
            return {
                riskLevel: new VectorLayer({
                    source: riskSource
                }),
                heatmap: new Heatmap({
                    source: heatmapSource,
                    blur: 20,
                    radius: 20
                })
            };
        }

        for (let i = 0; i < layers.length; i++) {
            switch (layers[i]) {
                case "hd910Layer":
                    hd910Layer = loadGeojsonLayer(olLayer.hd910Layer);
                    map.addLayer(hd910Layer);
                    break;
                case "groundBorder":
                    groundBorder = loadGeojsonLayer(olLayer.groundBorder);
                    map.addLayer(groundBorder);
                    break;
                case "groundBuilding":
                    groundBuilding = loadGeojsonLayer(olLayer.groundBuilding);
                    map.addLayer(groundBuilding);
                    break;
                case "WMTSLayer":
                    WMTSLayer = loadWMTSLayer();
                    map.addLayer(WMTSLayer);
                    break;
                case "riskground":
                    result = loadRisk("riskground");
                    riskLevel = result.riskLevel;
                    heatmap = result.heatmap;
                    map.addLayer(riskLevel);
                    map.addLayer(heatmap);
                    break;
                case "riskunderground":
                    result = loadRisk("riskunderground");
                    riskLevel = result.riskLevel;
                    heatmap = result.heatmap;
                    map.addLayer(riskLevel);
                    map.addLayer(heatmap);
                    break;
            }
        }
    }
}