import $ from 'jquery'

var allAreas = []

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
    getAllData: function() { return allAreas }
  }
})()
