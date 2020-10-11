interface StatesInterface{
    // private State:any
    fill(insertedArray:any[],stateFieldName:string,callback?:any,params?:any[]):void
    getState(stateFieldName:string):any|null
    setState(stateFieldName:string, newValue:any, callback?:any, params?:any[]):void
    findIndexOfItemsByItemId(stateFieldName:string , id:number):number
    getAllState():any
}

