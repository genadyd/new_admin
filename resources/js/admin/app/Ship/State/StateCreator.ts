/*
* class for build module state container
* and add it into states repository
* Methods:
*  private @create
*  private @stateProxy
*
*
* */
import StatesRepository from "./StatesRepository";

class StateCreator {
    private readonly poxedObject;
    private repo:any = new StatesRepository()
    constructor(private stateObject:any, private stateContainerName:string) {
        this.poxedObject = this.stateProxy()
        this.createMainState()
    }

    /*
    * private method for build module state init object.
    * use @stateProxy method
    * @stateObject:object - basic state object for init state
    *
    * @return:object
    * */
    private addCallbackFunction() {
        return {
            ...this.stateObject,
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
    }
    /*
    * proxying module state object
    * @obj:object
    * @return:ProxyObject
    *
    * */
    private stateProxy(): ProxyConstructor {
        const obj:any = this.addCallbackFunction()
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
    /*
* private method set proxy object into repository
* and add it into StatesRepository
*  @return:void
* */
    private createMainState(){
        this.repo.setRepContainer(this.stateContainerName, this.poxedObject)
    }
}
export default StateCreator
