import AbstractObservableModel from "./AbstractListenerModel.js";

class CitiesModel extends AbstractObservableModel {
  constructor() {
    super()
  }

  sortBy(sortCredentials) {

    for (var i = sortCredentials.length; i > 0;  i-- ) {
      this.data.sort(function(a, b) {
        if (a[sortCredentials[i]])
          return a[sortCredentials[i]] - a[sortCredentials[i]]

        return 0
      })
    }

    console.log(this.data)
    return this.data
  }
}

export default CitiesModel;
