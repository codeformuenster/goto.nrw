var map = L.map('map').setView([51.517, 7.602914], 7);
var layerURL = 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png'; // OSM Maps at the moment.
var iLayer, iLayerGood, iLayerSemi, iLayerBad;

var grayLayer;
var layers = []
var grayFeatures = [] // 52 shades of nrw
grayFeatures = allAreas
addLayer(grayFeatures, '#AAA1A7')
drawFeatures()

var onEachFeatureFunc = function (feature, layer) {
  layer.bindPopup(feature.properties.GEN);
};

function addLayer(features, color) {
  layers.push(L.geoJson(features, {
    style: {
      "color": color
    },
    onEachFeature: onEachFeatureFunc
  }))
}

function drawFeatures() {
  layers.forEach(function (layer) {
    layer.addTo(map)
  })
}

function setLayers() {
  var allFeatures = allAreas.features

  var greenFeatures = allAreas.features.filter(function(area){ return area.weight >= 1.7 })
  var redFeatures = allAreas.features.filter(function(area){ return area.weight < 1.7 })

  allAreas.features = greenFeatures
  addLayer(allAreas, "#00E148")

  allAreas.features = redFeatures
  addLayer(allAreas, "#FF0500")

  drawFeatures()
}

static map() {
  L.tileLayer(layerURL, {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
    maxZoom: 18,
  }).addTo(map);

}

function () {
  allAreas.features.forEach(function(area) {
    var weight = 0;
    var maxWeight = 0;
    ['publicTransport', 'security', 'leisure', 'culture', 'education', 'jobs'].forEach(function(someString) {
      maxWeight = area.properties.gotoData[someString]
      weight += ($('#' + someString).val()/10) * area.properties.gotoData[someString]
    })
    area.weight = weight / maxWeight
  })
}
