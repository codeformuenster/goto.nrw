import model from './Model.js'
import map from './ViewMap.js'
import $ from 'jquery'
window.$ = $;

class App {
  static run() {
    map.init()
    var startButton = $('#redraw')
    startButton.click(map.redraw)
  }
}

export default App
