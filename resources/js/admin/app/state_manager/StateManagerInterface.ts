interface StateManagerInterface {
    setState(stateFieldName: string, data: any): void

    getState(stateFieldName: string): any

    getList(): any
}
export default StateManagerInterface
