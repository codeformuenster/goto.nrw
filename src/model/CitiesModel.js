import AbstractObservableModel from "./AbstractListenerModel.js";

class CitiesModel extends AbstractObservableModel {
  constructor() {
    super()
  }

  sortBy(sortCredentials) {
    return this.data.sort(function(a, b) {
      return a.publicTransport - b.publicTransport
    })
  }
}

export default CitiesModel;
