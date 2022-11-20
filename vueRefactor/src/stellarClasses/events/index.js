import { DispatcherEvent } from './DispatcherEvent'

export class SOEvent {
  constructor() {
    this.events = {};
  }

  dispatch(eventName, soID, data) {
    const event = this.events[eventName];
    if (event) {
      event.fire(soID,data);
    }
  }

  on(eventName, soID, callback,context) {
    let event = this.events[eventName];
    if (!event) {
      event = new DispatcherEvent(eventName);
      this.events[eventName] = event;
    }
    event.registerCallback(callback,soID,context);
  }

  off(eventName, soID, callback) {
    const event = this.events[eventName];
    if (event && event.callbacks.indexOf(callback) > -1) {
      event.unregisterCallback(callback,soID);
      if (event.callbacks.length === 0) {
        delete this.events[eventName];
      }
    }
  }
}