type stor ={ [index:string]:[]|number|boolean }
class ListStor{
   private listState:stor = {
       current_page:1,
       per_page:6,
       not_deleted:true,
       deleted:false,
       sort_by_date_desc:false,
   }
   /*
   * get
   * */
   public getState=(stateField:string):number|boolean|[]=>this.listState[stateField]
    /*
    *
    * set
    * */
   public setState=(stateField:string, stateValue:number|boolean):void=>{
       this.listState[stateField] = stateValue
   }
   /*
   * get all
   * */
   public getAllState = ()=>this.listState
}
export default ListStor
