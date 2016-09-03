import DataObserver from './model/DataObserver.js'
import CitiesModel from './model/CitiesModel.js'
import AjaxCaller from './model/AjaxCaller.js'

class App {
  static run() {
    console.log("Starting App")
    var dataObserver = new DataObserver()
    var citiesModel = new CitiesModel()

    dataObserver.addListener(citiesModel)
    AjaxCaller.getFreshData(dataObserver)

    setTimeout(function() {
      console.log(citiesModel.sortBy(["publicTransport"]))
    }, 3000)
  }
}

export default App
