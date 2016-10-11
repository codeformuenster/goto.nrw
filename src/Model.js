import $ from 'jquery'

var allAreas = []

function calculateWeight () {
  if (allAreas.features)
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

export default (function () {
  $.getJSON("/KreiseNRW.json", function(areas) {
    allAreas = areas

    $.getJSON('/data.json', function(data) {
      allAreas.features.forEach(function(area) {
        data.forEach(function(dataForCity) {
          if (dataForCity.id == area.properties.id)
            area.properties.gotoData = dataForCity
        })
      })
    })
  })

  return {
    getAllData: function() {
      calculateWeight()
      return allAreas
    }
  }
})()
