interface ShipStateInterface{
    createMainState(stateName:string, stateInitObject:any):any
    getMainState(stateName:string):any
    setHandlerDefaultCallback(stateName:string, handlerType:string,callback:any):void
    setStateElementValue(containerName:string, stateElementName:string, value:any, callback?:any):void
    getStateElementValue(containerName:string, stateElementName:string):any
}
