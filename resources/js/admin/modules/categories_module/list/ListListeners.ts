import ListPagination from "./ListPagination";

class ListListeners {
    private listContainer = document.getElementById('categories_list_container')
    private pagination = new ListPagination()

    constructor() {
        this.pageSwitch()
        this.sortByDate()
    }

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
                        this.pagination.page(targ)
                    }
                }

            })
        }
    }
    sortByDate = () => {
        if (this.listContainer) {
            const sortByDateInput = this.listContainer.querySelector('#categories_control_panel #sort_by_date')
            if (sortByDateInput) {
                sortByDateInput.addEventListener('click', (e) => {
                    this.pagination.sortByDate()
                })
            }

        }
    }
}

export default ListListeners
