import PagitationInterface from "./PagitationInterface";

abstract class AbstractPagination implements PagitationInterface{
    protected store
   protected constructor(store:any){
       this.store = store
    }
    listRender(html_builder:any){

    }
    includeDeleted(list:any){
        if(!this.store.getState('include_deleted')){
            list = list.filter((val:any)=> !val.deleted_at )
        }
        return list;
    }
    sortByData(list:any){
        if(this.store.getState('sort_by_date_desc')){
            list = [...list]
            list.reverse();
        }
        return list;
    }
    onlyDeleted(list:any){
        if( this.store.getState('only_deleted') ){
            list = list.filter((val:any)=> val.deleted_at )
        }
        return list;
    }
    searchItems(list:any){
        const searchString = this.store.getState('search_string')
        /*
           strip slashas
            */

        list.forEach((item:any) => {
            item.name = item.name.replace(/(<([^>]+)>)/gi, "")
            item.heading = item.heading.replace(/(<([^>]+)>)/gi, "")
        })
        if(searchString){
            const pattern = new RegExp(searchString)
            list = list.filter((val:any)=>{
                return pattern.test(val.heading)||pattern.test(val.name)
            })
            list.forEach((item:any, key:number) => {
                list[key].name =  item.name.replace(searchString, `<span class="finded">${searchString}</span>`)
                list[key].heading =  item.heading.replace(searchString, `<span class="finded">${searchString}</span>`)
            })
        }
        return list;
    }
    paginationRender(list:any): any {
        const data = this.store.getAllState()
        const lastPage = Math.ceil(list.length / data.per_page)
        const objectToBuilder = {
            start_page : 1,
            current_page : +data.current_page,
            last_page : +lastPage,
            buttons_num : lastPage<3? lastPage:3
        }
        if (objectToBuilder.current_page == objectToBuilder.last_page) { /*if last page*/
            if(objectToBuilder.last_page>2) {
                objectToBuilder.start_page = objectToBuilder.current_page - 2
                objectToBuilder.buttons_num = objectToBuilder.last_page
            }else if(objectToBuilder.last_page == 2){
                objectToBuilder.start_page = objectToBuilder.current_page - 1
                objectToBuilder.buttons_num = objectToBuilder.last_page
            } else{
                objectToBuilder.buttons_num = 0
            }
        } else if (objectToBuilder.current_page > 1 && objectToBuilder.current_page < objectToBuilder.last_page) {
            objectToBuilder.start_page = objectToBuilder.current_page - 1
            objectToBuilder.buttons_num = objectToBuilder.current_page+1
        } else {
            objectToBuilder.start_page = 1
        }
       return objectToBuilder
    }
    abstract setListItemsNumberMaxParam(list:any):void
}
export default AbstractPagination
