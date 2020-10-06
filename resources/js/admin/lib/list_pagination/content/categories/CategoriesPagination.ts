import AbstractPagination from "../../AbstractPagination";
import PagitationInterface from "../../PagitationInterface";

class CategoriesPagination extends AbstractPagination implements PagitationInterface{
    public constructor(store:any) {
        super(store);
    }
    public setListItemsNumberMaxParam=(list:any)=>{
        const perPageInput:any =  document.getElementById('per_page')
        if(perPageInput) {
            let len:number = list.length
            perPageInput.setAttribute('max', len)
            if(this.store.getState('per_page')>len){
                perPageInput.value = len
            }else{
                perPageInput.value = this.store.getState('per_page')
            }
        }
    }
}
export default CategoriesPagination
