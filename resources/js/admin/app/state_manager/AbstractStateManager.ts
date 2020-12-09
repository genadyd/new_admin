
abstract class AbstractStateManager /*implements ListInterface*/ {
    protected state: any

   protected constructor() {

    }

    public setState(stateFieldName: string, data: any) {
        this.state[stateFieldName] = data
    }

    public getState(stateFieldName: string) {
        return this.state[stateFieldName]
    }

    protected abstract setStateProxy(state:any): any
    protected abstract fillState():void;
}




export default AbstractStateManager
