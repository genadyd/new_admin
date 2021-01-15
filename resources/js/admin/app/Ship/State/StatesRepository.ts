class StatesRepository{
    private static REPOSITORY :any
    constructor() {
        if(!StatesRepository.REPOSITORY){
            StatesRepository.REPOSITORY = {}
        }
    }

    public getRepContainer(stateName:string):any|boolean {
        let resState: any = {}
        if (StatesRepository.REPOSITORY[stateName]) {
            {
                for (let key in StatesRepository.REPOSITORY[stateName]){
                    if (!['getCallback', 'setCallback'].includes(key)) {
                        resState[key] = StatesRepository.REPOSITORY[stateName][key]
                    }
                }
            }
        }
        return resState
    }

    public setRepContainer(stateName:string, state:any){
        try{
            StatesRepository.REPOSITORY[stateName] = state
            return true
        }catch (e) {
            return false
        }
    }
    public mountDefaultCallbackForSet(repContainerName:string, callbackFunc:any){
        StatesRepository.REPOSITORY[repContainerName].setCallback = {
            ...StatesRepository.REPOSITORY[repContainerName].setCallback,
            defaultCallback:callbackFunc
        }
    }
    public mountDefaultCallbackForGet(repContainerName:string, callbackFunc:any){
        StatesRepository.REPOSITORY[repContainerName].getCallback = {
            ...StatesRepository.REPOSITORY[repContainerName].getCallback,
            defaultCallback:callbackFunc

        }
    }
    public setStateElement(repContainerName:string|any,stateElementName:string, value:any, callbackFunc?:any){
        if(callbackFunc && typeof callbackFunc == 'function'){
            StatesRepository.REPOSITORY[repContainerName].setCallback = {
                ...StatesRepository.REPOSITORY[repContainerName].setCallback,
                callback:callbackFunc
            }
        }else{
            StatesRepository.REPOSITORY[repContainerName].setCallback = {
                ...StatesRepository.REPOSITORY[repContainerName].setCallback,
                callback:false
            }
        }
        StatesRepository.REPOSITORY[repContainerName][stateElementName] = value
    }
    public getStateElement(repContainerName:any,stateElementName:string, callbackFunc?:any){
        return StatesRepository.REPOSITORY[repContainerName][stateElementName]
    }

}
export default StatesRepository
