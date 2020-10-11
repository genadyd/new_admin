abstract class AbstractState implements StatesInterface {
    protected listState: any

    fill(insertedArray: object, stateFieldName: string) {
        this.listState[stateFieldName] = insertedArray
        // callback(...params)
    }

    getState(stateFieldName: string) {
        return this.listState[stateFieldName]
    }

    setState(stateFieldName: string, newValue: any) {
        this.listState[stateFieldName] = newValue
        // callback(...params)
    }

    getAllState() {
        return this.listState
    }

    findIndexOfItemsByItemId(stateFieldName: string, id: number){
        const list = this.listState[stateFieldName]
        let res:number = 0
        for(let ind in list){
            if(list[ind].id === id){
                res = +ind
                break
            }
        }
        return res
    }
}



export default AbstractState
