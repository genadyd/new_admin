import RegularPaginationBuilder from "../html_pagination_builder/RegularPaginationBuilder"
import CategoriesPagination from "../../../../lib/list_pagination/content/categories/CategoriesPagination";
import PagitationInterface from "../../../../lib/list_pagination/PagitationInterface";


class RegularRender implements ListRenderInterface {
    private store
    private pagination: PagitationInterface;
    private tableContainer: HTMLElement | null = document.getElementById('categories_list_container')

    constructor(store: any) {
        this.store = store
        this.pagination = new CategoriesPagination(this.store)
    }

    /*
       * get items HTML and put it into page table box
       * */
    listRender(builder: ListBuilderInterface): void {
        let categoriesList = this.store.getState('categories')
        categoriesList = this.pagination.searchItems(categoriesList)
        categoriesList = this.pagination.includeDeleted(categoriesList)
        categoriesList = this.pagination.sortByData(categoriesList)
        categoriesList = this.pagination.onlyDeleted(categoriesList)
        const perPageNum = this.store.getState('per_page') || 0
        const perPage = perPageNum != 0 ? perPageNum : categoriesList.length
        let currentPage = this.store.getState('current_page')
        const lastPage = Math.ceil(categoriesList.length / perPage)

        if (currentPage > lastPage) {
            this.store.setState('current_page', lastPage)
            currentPage = lastPage
        }
        const offset = currentPage * perPage - (perPage - 1)
        const limit = currentPage * perPage

        let listHtml: any = ''

        // categoriesList = this.pagination.searchItems(categoriesList)
        // categoriesList = this.pagination.includeDeleted(categoriesList)
        // categoriesList = this.pagination.sortByData(categoriesList)
        // categoriesList = this.pagination.onlyDeleted(categoriesList)
        this.pagination.setListItemsNumberMaxParam([...categoriesList])

        categoriesList.forEach((item: any, key: number) => {
            if (key >= (offset - 1) && key <= limit - 1) {
                listHtml += builder.builder(item, key + 1)
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
                if (tableBody) {
                    tableBody.innerHTML = listHtml
                }
            } catch (e) {
                console.error('Append error')
            }
        }
    }

    paginationRender(builder: PaginationBuilderInterface, list: any[]): string {
        const objectToBuilder = this.pagination.paginationRender(list)
        return builder.build(objectToBuilder)

    }

    paginationAppend(paginationHtml: string) {
        if (this.tableContainer) {
            try {
                const paginationBox: any = this.tableContainer.querySelector('ul.pagination')
                if (paginationBox) {
                    paginationBox.innerHTML = paginationHtml
                }
            } catch (e) {
                console.error('Append error')
            }
        }
    }
}

export default RegularRender
