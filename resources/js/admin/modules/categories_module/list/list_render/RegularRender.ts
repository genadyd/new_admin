import RegularPaginationBuilder from "../html_pagination_builder/RegularPaginationBuilder"


class RegularRender implements ListRenderInterface{
    private store
    private tableContainer:HTMLElement|null = document.getElementById('categories_list_container')
    constructor(store:any) {
        this.store = store
    }
    /*
       * get items HTML and put it into page table box
       * */
    listRender(builder:ListBuilderInterface):void{
            let categoriesList = this.store.getState('categories')
            const perPageNum = this.store.getState('per_page')||0
            const perPage = perPageNum !=0 ? perPageNum:categoriesList.length
            const currentPage = this.store.getState('current_page')
            const offset = currentPage * perPage-(perPage-1)
            const limit = currentPage * perPage
            let listHtml:any = ''
            categoriesList = this.includeDeleted(categoriesList)
            categoriesList = this.sortByData(categoriesList)
            categoriesList = this.onlyDeleted(categoriesList)
            categoriesList = this.includeDeleted(categoriesList)
            categoriesList.forEach((item:any, key:number)=>{
                if(key>=(offset-1) && key<=limit-1) {
                    listHtml += builder.builder(item, key+1)
                }
            })
            this.append(listHtml)
            const paginationHtml = this.paginationRender(new RegularPaginationBuilder(), categoriesList)
            this.paginationAppend(paginationHtml)

    }

    private append = (listHtml: any) => {
        if (this.tableContainer) {
            try {
                const tableBody: any = this.tableContainer.querySelector('table tbody')
                if(tableBody) {
                    tableBody.innerHTML=listHtml
                }
            } catch (e) {
                  console.error('Append error')
            }
        }
    }
    private includeDeleted = (list:any[])=>{
        if(!this.store.getState('include_deleted')){
            list = list.filter((val:any)=> !val.deleted_at )
        }
        return list;
    }
    private sortByData = (list:any[])=>{
        if(this.store.getState('sort_by_date_desc')){
            list = [...list]
            list.reverse();
        }
        return list;
    }
    private onlyDeleted = (list:any[])=>{

        if( this.store.getState('only_deleted') ){
            list = list.filter((val:any)=> val.deleted_at )
        }

        return list;
    }
    paginationRender(builder:PaginationBuilderInterface, list:any[]):string {
        const data = this.store.getAllState()
        const lastPage = Math.ceil(list.length / data.per_page)
            const objectToBuilder = {
                start_page : 1,
                current_page : +data.current_page,
                last_page : +lastPage,
                buttons_num : 3
            }
            if (objectToBuilder.current_page == objectToBuilder.last_page) { /*if last page*/
                if(objectToBuilder.last_page>2) {
                    objectToBuilder.start_page = objectToBuilder.current_page - 2
                    objectToBuilder.buttons_num = objectToBuilder.last_page
                }else{
                    objectToBuilder.buttons_num = 0
                }
            } else if (objectToBuilder.current_page > 1 && objectToBuilder.current_page < objectToBuilder.last_page) {
                objectToBuilder.start_page = objectToBuilder.current_page - 1
                objectToBuilder.buttons_num = objectToBuilder.current_page+1
            } else {
                objectToBuilder.start_page = 1
            }
            return  builder.build(objectToBuilder)

    }
    paginationAppend(paginationHtml:string){
        if (this.tableContainer) {
            try {
                const paginationBox: any = this.tableContainer.querySelector('ul.pagination')
                if(paginationBox) {
                    paginationBox.innerHTML=paginationHtml
                }
            } catch (e) {
                console.error('Append error')
            }
        }
    }
}
export default RegularRender
