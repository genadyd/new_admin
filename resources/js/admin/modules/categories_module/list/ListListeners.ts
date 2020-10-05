import ListController from "./ListController";

class ListListeners {
    private listContainer = document.getElementById('categories_list_container')
    private listController = new ListController()

    constructor() {
        this.getList()
        this.pageSwitch()
        this.sortByDate()
        this.includeDeleted()
        this.onlyDeleted()
        this.changePerPageNum()
        this.formOpenClose()
        this.categoriesSearch()
    }
    getList=()=>{
       this.listController.getAllList()
    }
/*
* pagination exequte
* */
    pageSwitch = (): void => {
        if (this.listContainer) {
            this.listContainer.addEventListener('click', (e: any) => {
                let targ = e.target
                if (targ) {
                    if (targ.matches('a.page-link') || targ.matches('a.page-link span')) {
                        if (targ.matches('a.page-link span')) {
                            targ = targ.closest('a.page-link')
                        }
                        e.preventDefault()
                        try {
                            let pageNum = targ.getAttribute('page_num')

                            this.listController.regularPage(pageNum)
                        }catch (error){
                             console.error('Expected attrribute "page_num" in target Button')
                        }

                    }
                }

            })
        }
    }
    /*
    * sorting by date
    * */
    sortByDate = () => {
        if (this.listContainer) {
            const sortByDateInput = this.listContainer.querySelector('#categories_control_panel #sort_by_date')
            if (sortByDateInput) {
                sortByDateInput.addEventListener('click', () => {
                    this.listController.sortByDate()
                })
            }

        }
    }
    /*
    * show hide deleted items
    * */
    includeDeleted = () => {
        if (this.listContainer) {
            const sortByDateInput = this.listContainer.querySelector('#categories_control_panel #include_deleted')
            if (sortByDateInput) {
                sortByDateInput.addEventListener('click', () => {
                    this.listController.includeDeleted()
                })
            }

        }
    }
    /*
    * only deleted ****************
    * */
    onlyDeleted = () => {
        if (this.listContainer) {
            const sortByDateInput = this.listContainer.querySelector('#categories_control_panel #just_deleted')
            if (sortByDateInput) {
                sortByDateInput.addEventListener('click', (e) => {
                    const checkBox:any = e.target
                    if(checkBox) {
                            this.listController.onlyDeleted()
                    }
                })
            }

        }
    }
    /*
    * change per page num
    * */
    changePerPageNum(){
        const perPageInput = document.getElementById('per_page')
        if(perPageInput){
            perPageInput.oninput = (e:any)=>{
                this.listController.changePerPageNum(e)
            }
        }
    }
    /*
    * form open close
    * */
    formOpenClose(){
        const addNewButton = document.getElementById('add_new_category_form_open')
        if(addNewButton) {
            addNewButton.onclick = (() => {
                this.listController.formOpenClose()
            })
        }
    }
    /*
    *
    * search by name or heading ============
    * */
    categoriesSearch(){
        const searchInput = document.getElementById('categories_search_input')
        if(searchInput){
            searchInput.oninput = (e)=>{
                this.listController.searchInput(e)
            }
        }
    }
}
export default ListListeners
