class AbstractListenerModel {
  constructor() {
    this.data = {}
  }

  updateData(data) {
    console.log(data);
    this.data = data
  }
}

export default AbstractListenerModel;
