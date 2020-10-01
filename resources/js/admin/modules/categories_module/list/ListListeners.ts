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
}

export default ListListeners
