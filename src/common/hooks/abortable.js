/**
 * @LastEditors: zhang weijie
 * @Date: 2019-06-01 07:10:29
 * @LastEditTime: 2019-06-04 14:29:14
 * @Description:
 **/
class Emitter {
    constructor() {
        Object.defineProperty(this, 'listeners', { value: {}, writable: true, configurable: true });
    }
    addEventListener(type, callback) {
        if (!(type in this.listeners)) {
            this.listeners[type] = [];
        }
        this.listeners[type].push(callback);
    }
    removeEventListener(type, callback) {
        if (!(type in this.listeners)) {
            return;
        }
        const stack = this.listeners[type];
        for (let i = 0, l = stack.length; i < l; i++) {
            if (stack[i] === callback) {
                stack.splice(i, 1);
                return;
            }
        }
    }
    dispatchEvent(event) {
        if (!(event.type in this.listeners)) {
            return;
        }
        const debounce = callback => {
            setTimeout(() => callback.call(this, event));
        };
        const stack = this.listeners[event.type];
        for (let i = 0, l = stack.length; i < l; i++) {
            debounce(stack[i]);
        }
        return !event.defaultPrevented;
    }
}

export class AbortSignal extends Emitter {
    constructor() {
        super();
        // Some versions of babel does not transpile super() correctly for IE <= 10, if the parent
        // constructor has failed to run, then "this.listeners" will still be undefined and then we call
        // the parent constructor directly instead as a workaround. For general details, see babel bug:
        // https://github.com/babel/babel/issues/3041
        // This hack was added as a fix for the issue described here:
        // https://github.com/Financial-Times/polyfill-library/pull/59#issuecomment-477558042
        if (!this.listeners) {
            Emitter.call(this);
        }

        // Compared to assignment, Object.defineProperty makes properties non-enumerable by default and
        // we want Object.keys(new AbortController().signal) to be [] for compat with the native impl
        Object.defineProperty(this, 'aborted', { value: false, writable: true, configurable: true });
        Object.defineProperty(this, 'onabort', { value: null, writable: true, configurable: true });
    }
    toString() {
        return '[object AbortSignal]';
    }
    dispatchEvent(event) {
        if (event.type === 'abort') {
            this.aborted = true;
            if (typeof this.onabort === 'function') {
                this.onabort.call(this, event);
            }
        }

        super.dispatchEvent(event);
    }
}

export class AbortController {
    constructor() {
        // Compared to assignment, Object.defineProperty makes properties non-enumerable by default and
        // we want Object.keys(new AbortController()) to be [] for compat with the native impl
        Object.defineProperty(this, 'signal', { value: new AbortSignal(), writable: true, configurable: true });
    }
    abort() {
        let event;
        try {
            event = new Event('abort');
        } catch (e) {
            if (typeof document !== 'undefined') {
                if (!document.createEvent) {
                    // For Internet Explorer 8:
                    event = document.createEventObject();
                    event.type = 'abort';
                } else {
                    // For Internet Explorer 11:
                    event = document.createEvent('Event');
                    event.initEvent('abort', false, false);
                }
            } else {
                // Fallback where document isn't available:
                event = {
                    type: 'abort',
                    bubbles: false,
                    cancelable: false
                };
            }
        }
        this.signal.dispatchEvent(event);
    }
    toString() {
        return '[object AbortController]';
    }
}

export default AbortController;