import $ from 'jquery'

var dataUrl = "/data.json"

export default class AjaxCaller {
  static getFreshData(observer) {
    $.ajax({
      url: dataUrl,
      success: function(data) {
        data = JSON.parse(data);
        console.log("got data:", data)
        observer.updateData(data)
      }
    })
  }
}
