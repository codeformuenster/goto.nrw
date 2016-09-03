class DataObserver {
  constructor() {
    this.listerners = []
  }

  addListener(listener) {
    this.listeners.push(listener)
  }

  updateData()
}
