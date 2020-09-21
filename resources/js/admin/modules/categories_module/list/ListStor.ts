type stor ={ [index:string]:number|boolean }
class ListStor{
   private listState:stor = {
       current_page:1,
       per_page:6,
       not_deleted:true,
       deleted:false,
       sort_by_date_desc:false,
   }
   public getState=(stateField:string)=>this.listState[stateField]
   public setState=(stateField:string, stateValue:number|boolean)=>{
       this.listState[stateField] = stateValue
   }
}
export default ListStor
