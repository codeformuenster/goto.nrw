import DataObserver from './model/DataObserver.js'
import CitiesModel from './model/CitiesModel.js'
import AjaxCaller from './model/AjaxCaller.js'

var dataObserver = new DataObserver()
var citiesModel = new CitiesModel()

var map = L.map('map').setView([51.517, 7.602914], 7);
var layerURL = 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png'; // OSM Maps at the moment.
var iLayer, iLayerGood, iLayerSemi, iLayerBad;

class App {
  static run() {
    console.log("Starting App")

    dataObserver.addListener(citiesModel)
    AjaxCaller.getFreshData(dataObserver)

    App.map()
    App.sort()
  }

  static sort() {
    var list = document.getElementById("draggable");
    Sortable.create(list,{
        onUpdate: function (evt){
            console.log('onUpdate.foo:', [evt.item, evt.from]);
            var child;
            var input = [];

            var i = $('.sortable')[0].children;

            for (var j = 0; j < i.length; j++) {
                child = i[j].id;
                input.push(child);
            }
            console.log(input);
            citiesModel.sortBy(input)
            if (iLayerGood) {
              map.removeLayer(iLayerGood)
              map.removeLayer(iLayerSemi)
              map.removeLayer(iLayerBad)
            }
            $.getJSON("/KreiseNRW.json", function(areas) {
              var selectedFeatures = []
              var selectedFeatures2nd = []
              var badFeatures = []
              citiesModel.data.forEach(function(city, index) {
                areas.features.forEach(function(county) {
                  if (county.properties.id == city.id && index < 3) {
                    selectedFeatures.push(county)
                  }
                  if (county.properties.id == city.id && index >= 3 && index < 50) {
                    selectedFeatures2nd.push(county)
                  }
                  if (county.properties.id == city.id && index >= 50) {
                    badFeatures.push(county)
                  }
                })
              })

              var onEachFeatureFunc = function (feature, layer) {
                layer.bindPopup(feature.properties.GEN);
              };

              areas.features = selectedFeatures
              iLayerGood = L.geoJson(areas, {
                style: {
                  "color": "#00E148"
                },
                onEachFeature: onEachFeatureFunc
              })
              iLayerGood.addTo(map);

              areas.features = selectedFeatures2nd
              iLayerSemi = L.geoJson(areas, {
                style: {

                  "color": "#AAA1A7"

                },
                onEachFeature: onEachFeatureFunc

              })
              iLayerSemi.addTo(map);

              areas.features = badFeatures
              iLayerBad = L.geoJson(areas, {
                style: {
                  "color": "#FF0500"
                },
                onEachFeature: onEachFeatureFunc
              })
              iLayerBad.addTo(map);
            })
        }
    }); // That's all.
        $(document).ready(function() {

            $('.modal-trigger').leanModal();


        });
  }

  static map() {
    L.tileLayer(layerURL, {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
      maxZoom: 18,
    }).addTo(map);

  }
}

export default App
