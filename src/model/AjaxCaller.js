import $ from 'jquery'

var dataUrl = "/data.json"

export default class AjaxCaller {
  static getFreshData(observer) {
    $.ajax({
      url: dataUrl,
      success: function(data) {
        if (typeof data == "string")
          data = JSON.parse(data);
        observer.updateData(data)
      }
    })
  }
}
