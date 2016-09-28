import L from 'leaflet'
import $ from 'jquery'

import model from './Model.js'

var map = L.map('map').setView([51.517, 7.602914], 7);
var layerURL = 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png'; // OSM Maps at the moment.

var allAreas = model.getAllData()

var layers = []
var drawnLayers = []

var onEachFeatureFunc = function (feature, layer) {
  layer.bindPopup(feature.properties.GEN);
}

function addLayer(features, color) {
  layers.push(L.geoJson(features, {
    style: {
      "color": color
    },
    onEachFeature: onEachFeatureFunc
  }))
}

function setLayers() {
  var greenFeatures = allAreas.features.filter(function(area){ return area.weight >= 1.7 })
  var redFeatures = allAreas.features.filter(function(area){ return area.weight < 1.7 })

  allAreas.features = greenFeatures
  addLayer(allAreas, "#00E148")

  allAreas.features = redFeatures
  addLayer(allAreas, "#FF0500")
}

function drawFeatures() {
  layers.forEach(function (layer) {
    layer.addTo(map)
    drawnLayers.push(layer)
  })
}

export default (function() {
  return {
    init: function() {
      L.tileLayer(layerURL, {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
        maxZoom: 18,
      }).addTo(map);
    },

    redraw: function() {
      allAreas = model.getAllData()
      setLayers()
      drawFeatures()
    }
  }
})()
