
class ListStore{
   private listState:any = {
       categories:[],
       current_page:1,
       per_page:6,
       include_deleted: false,
       only_deleted:false,
       sort_by_date_desc:false,
       search_string:''
   }

   public fillCategories = (categoriesArray:any, callback:any=()=>{}, params:any[]=[])=>{
       this.listState.categories = categoriesArray
       callback(...params)
   }
   /*
   * get
   * */
   public getState=(stateField:string):any=>this.listState[stateField]
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
