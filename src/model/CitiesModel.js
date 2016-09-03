import AbstractObservableModel from "./AbstractListenerModel.js";

class CitiesModel extends AbstractObservableModel {
  constructor() {
    super()
  }

  sortBy(sortCredentials) {

    for (var i = sortCredentials.length; i > 0;  i-- ) {
      var weight = 0.2
      this.data.forEach(function(city) {
        if (!city.weight)
          city.weight = 0

        city.weight += city[sortCredentials] * weight
        weight += 0.2
      })
    }

    this.data.sort(function(a, b) {
      return a.weight - b.weight
    })
    return this.data
  }
}

export default CitiesModel;
