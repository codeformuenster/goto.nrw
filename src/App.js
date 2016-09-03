import DataObserver from './model/DataObserver.js'
import AjaxCaller from './model/AjaxCaller.js'

class App {
  static run() {
    console.log("Starting App")
    var dataObserver = new DataObserver()
    AjaxCaller.getFreshData(dataObserver)
  }
}

export default App
