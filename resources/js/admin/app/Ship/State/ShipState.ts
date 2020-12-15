import StateCreator from "./StateCreator";
import StatesRepository from "./StatesRepository";

class ShipState implements ShipStateInterface{
    private creator:any = new StateCreator()
    private repo:any = new StatesRepository()
    /*
    * public method for create state proxy object
    * and add it into StatesRepository
    * #Attr
    *  @StateName:string - name of container in repository for save the State
    *  @StateInitObject:Object - init state object
    * */
    public createMainState(stateName:string, stateInitObject:any){
         const statePoxedObject = this.creator.create(stateInitObject) /*state proxy*/
         this.repo.setRepContainer(stateName, statePoxedObject) /*state save into rep.*/
    }
    /*
    * public method for get state proxy container
    * @stateName:string  - name of container in repository
    * */
    public getMainState(stateName:string){
         return this.repo.getRepContainer(stateName)
    }
    public setStateElementValue(containerName:string, stateElementName:string, value:any, callback?:any){
           this.repo.setStateElement(containerName, stateElementName, value, callback)
    }
    public getStateElementValue(containerName:string, stateElementName:string):any{
        return this.repo.getStateElement(containerName,stateElementName)
    }

    public setHandlerDefaultCallback(containerName:string,handlerType:any, callback:any=()=>{}){
        let funcName = `mountDefaultCallbackFor${handlerType.charAt(0).toUpperCase()+handlerType.slice(1)}`
        if( this.repo[funcName] && typeof this.repo[funcName] ==='function')
        this.repo[funcName](containerName, callback)
    }
 }
 export default ShipState
