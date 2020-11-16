
abstract class AbstractStateManager /*implements ListInterface*/ {
    protected state:any
    constructor(state:any) {
        this.state = state
    }
    public setState(stateFieldName: string, data: any) {
        this.state[stateFieldName] = data
    }

    public getState(stateFieldName: string) {
        return this.state[stateFieldName]
    }
}

export default AbstractStateManager
