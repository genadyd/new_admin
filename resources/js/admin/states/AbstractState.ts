abstract class AbstractState implements StatesInterface{
    protected listState:any
    fill(insertedArray:object,stateFieldName:string){
        this.listState[stateFieldName] = insertedArray
        // callback(...params)
    }
    getState(stateFieldName:string){
        return this.listState[stateFieldName]
    }
    setState(stateFieldName:string, newValue:any){
        this.listState[stateFieldName] = newValue
        // callback(...params)
    }
    getAllState(){
        return this.listState
    }

}
export default AbstractState
