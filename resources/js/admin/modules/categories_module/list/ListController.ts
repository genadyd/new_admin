
import ListStor from "./ListStor";
import RegularRender from "./list_render/RegularRender";
import RegularListApi from "./list_api/RegularListApi";
import RegularListBuilder from "./html_list_builder/RegularListBuilder";

class ListController {
    private stor = new ListStor()


    regularPage = (pageNum: number) => {
        this.stor.setState('current_page', pageNum)
        const render = new RegularRender(new RegularListApi(this.stor.getAllState()))
        render.listRender(new RegularListBuilder())
    }

    public sortByDate=()=>{
        this.stor.setState('sort_by_date_desc',!this.stor.getState('sort_by_date_desc'))
        const currentPageButton = document.querySelector('ul.pagination li.current a')
        let currentPage = 1
        if(currentPageButton){
            let pageNum = currentPageButton.getAttribute('page_num')
            if(pageNum) {
                currentPage = parseInt(pageNum)
            }
            this.stor.setState('current_page',currentPage)
            const render = new RegularRender(new RegularListApi(this.stor.getAllState()))
            render.listRender(new RegularListBuilder())
        }
    }



    public includeDeleted():void{
        this.stor.setState('deleted',!this.stor.getState('deleted'))
        const currentPageButton = document.querySelector('ul.pagination li.current a')
        let currentPage =1
        if(currentPageButton){
            let pageNum = currentPageButton.getAttribute('page_num')
            if(pageNum) {
                currentPage = parseInt(pageNum)
            }
            this.stor.setState('current_page',currentPage)
            const render = new RegularRender(new RegularListApi(this.stor.getAllState()))
            render.listRender(new RegularListBuilder())
        }
    }
    // public justDeleted(isChecked:boolean):void{
    //
    //     // this.actionType = isChecked?'just_deleted':'get_offset_limit'
    //     // this.getListFromApi()
    // }
}

export default ListController
