// DispatcherEvent used from https://blog.k.io/atech/creating-a-simple-custom-event-system-in-javascript
export class DispatcherEvent {
  constructor(eventName) {
    this.eventName = eventName;
    this.callbacks = [];
  }

  registerCallback(callback,soID) {
    this.callbacks.push({callback,soID});
  }

  unregisterCallback(callback,soID) {
    const index = this.callbacks.findIndex(obj =>
      obj.callback === callback && obj.soID === soID);
    if (index > -1) {
      this.callbacks.splice(index, 1);
    }
  }

  fire(soID,data) {
    const callbacks = this.callbacks.slice(0);
    callbacks.forEach((callback) => {
      if(callback.soID === soID){
        callback.callback(data);
      }
    });
  }
}