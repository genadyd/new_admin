class StateCreator {
    public create(stateObject: any) {
        const obj = {
            ...stateObject,
            getCallback: {
                callback: false,
                defaultCallback: () => {
                },
                context: this,
                params: []
            },
            setCallback: {
                callback: false,
                defaultCallback: () => {
                },
                context: this,
                params: []
            }
        }
        return this.stateProxy(obj)
    }

    stateProxy(obj: any): any {
        return new Proxy(obj, {
            get: (target, key) => {
                if (key != 'getCallback') {
                    if (target.getCallback.callback) target.getCallback.callback()
                    else {
                        try {
                            target.getCallback.defaultCallback()
                        } catch (e) {
                            console.error("Please set the defaultCallback function," +
                                " use 'setHandlerDefaultCallback' " +
                                " or add param 'callback' if you use func.'getStateElementValue'")
                        }
                    }
                }
                if (key != 'getCallback') return target[key]
            },
            set: (target, key, value) => {
                target[key] = value
                if (key != 'setCallback') {
                    if (target.setCallback.callback) target.setCallback.callback(target)
                    else {
                        target.setCallback.defaultCallback(target)
                    }
                }


                return true
            }
        })
    }
}

export default StateCreator
