import model from './Model.js'
import $ from 'jquery'
window.$ = $;

class App {
  static run() {
    window.setTimeout(function() {
      console.log(model.getAllData())
    }, 10000);
    //set Map
    var startButton = $('#redraw')
    startButton.click()
  }
}

export default App
