type store ={ [index:string]:[]|number|boolean }
class ListStore{
   private listState:store = {
       categories:[],
       current_page:1,
       per_page:6,
       include_deleted: false,
       only_deleted:false,
       sort_by_date_desc:false,
   }

   public fillCategories = (categoriesArray:any, callback:any=()=>{}, params:any[]=[])=>{
       this.listState.categories = categoriesArray
       callback(...params)
   }
   /*
   * get
   * */
   public getState=(stateField:string):number|boolean|[]=>this.listState[stateField]
    /*
    *
    * set
    * */
   public setState=(stateField:string, stateValue:number|boolean , callback:any=()=>{}, params:any[]=[]):void=>{
       this.listState[stateField] = stateValue
       callback(...params)
   }
   /*
   * get all
   * */
   public getAllState = ()=>this.listState
}
export default ListStore
