class AbstractObservableModel {
  constructor() {
    this.data = {}
  }

  updateData(data) {
    this.data = data
  }
}

export default AbstractObservableModel;
