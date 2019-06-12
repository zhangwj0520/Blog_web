class EventEmitter {
    constructor() {
        this.listeners = {}
    }

    addEventListener(eventType, callback) {
        if (!(eventType in this.listeners)) {
            this.listeners[eventType] = [callback]
        } else {
            this.listeners[eventType].push(callback)
        }
    }

    removeEventListener(eventType, callback) {
        let callbackList = this.listeners[eventType]
        if (!callbackList) {
            return
        } else {
            this.listeners[eventType] = callbackList.filter(
                (thisCallback) => callback !== thisCallback,
            )
        }
    }

    dispatchEvent(event) {
        let callbackList = this.listeners[event.type]
        if (!callbackList) {
            return
        } else {
            callbackList.forEach((callback) => {
                callback(event)
            })
        }
    }
}

class Signal extends EventEmitter {
    constructor() {
        super()
        this.listeners = {
            abort: [() => {
                this.aborted = true
            }],
        }
        this.aborted = false
        this.onabort = null
    }
}

export class AbortController {
    constructor() {
        this.signal = new Signal()
    }

    abort() {
        let event = new Event('abort')
        this.signal.dispatchEvent(event)
    }
}
