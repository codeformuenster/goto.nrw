class DataObserver {
  constructor() {
    this.listeners = []
    this.data = {}
  }

  addListener(listener) {
    this.listeners.push(listener)
  }

  updateData(data) {
    console.log("observer")
    this.data = data
    this.signal()
  }

  signal() {
    this.listeners.forEach((listener) => {
      listener.updateData(this.data)
    })
  }
}

export default DataObserver
