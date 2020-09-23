import ListApiInterface from "../list_api/ListApiInterface";
import RegularPaginationBuilder from "../html_pagination_builder/RegularPaginationBuilder";

class RegularRender implements ListRenderInterface{
    private api
    private tableContainer:HTMLElement|null = document.getElementById('categories_list_container')
    constructor(api:ListApiInterface) {
        this.api = api.getList()
    }
    /*
       * get items HTML and put it into page table box
       * */
    listRender(builder:ListBuilderInterface):void{
        this.api.then((data)=>{
            let listHtml:any = ''
            data.categories.forEach((item:any, key:number)=>{
                listHtml += builder.builder(item, key)
            })
            this.append(listHtml)
            const paginationHtml = this.paginationRender(new RegularPaginationBuilder(),data)
            this.paginationAppend(paginationHtml)
        })
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
    paginationRender(builder:PaginationBuilderInterface, data:any):string {
            const objectToBuilder = {
                start_page : +data.start_button_num,
                current_page : +data.current_page,
                last_page : +data.last_page,
                buttons_num : +data.pages_num
            }
            if (objectToBuilder.current_page == objectToBuilder.last_page ) { /*if last page*/
                objectToBuilder.start_page = objectToBuilder.current_page - 2
                objectToBuilder.buttons_num = objectToBuilder.last_page
            } else if (objectToBuilder.current_page > 1 && objectToBuilder.current_page < objectToBuilder.last_page) {
                objectToBuilder.start_page = objectToBuilder.current_page - 1
                objectToBuilder.buttons_num = objectToBuilder.current_page+1
            } else {
                objectToBuilder.start_page = 1
            }
            const paginationHtml = builder.build(objectToBuilder)
        return paginationHtml;
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
