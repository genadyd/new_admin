import StateManagerInterface from "../../app/state_manager/StateManagerInterface";

class ListProcessor {
    private stateManager: StateManagerInterface

    constructor(stateManager: StateManagerInterface) {
        this.stateManager = stateManager
    }

    public getList() {

        let list = [...this.stateManager.getState('list')]
        list = this.searchItems(list)
        list = this.sortByField(list)
        list = this.includeDeleted(list)
        list = this.onlyDeleted(list)
        list = this.renderPerPage(list)

        return list
    }

    private onlyDeleted(list: any[]) {
        if (this.stateManager.getState('only_deleted')) {
            return list.filter((val: any) => val.deleted_at)
        }
        return list
    }

    private searchItems(list: any[]) {
        const searchString = this.stateManager.getState('search_string')
        /* strip slashes */
        for( let item of list) {
            item.name = item.name.replace(/(<([^>]+)>)/gi, "")
            item.heading = item.heading.replace(/(<([^>]+)>)/gi, "")
        }
        if (searchString) {
            let listRes: any[]
            const pattern = new RegExp((searchString), "g")
            listRes = [...list].filter((val: any) => {
                return pattern.test(val.heading) || pattern.test(val.name)
            })
            listRes.forEach((item: any) => {
                item.name = item.name.replace(searchString, `<span class="finded">${searchString}</span>`)
                item.heading = item.heading.replace(searchString, `<span class="finded">${searchString}</span>`)
            })
            list = listRes
        }
        return list
    }

    private renderPerPage(list: any[]) {
        if (list.length > 0) {
            const perPageNum = this.stateManager.getState('per_page') || 0
            const perPage = perPageNum != 0 ? perPageNum : list.length
            let currentPage = this.stateManager.getState('current_page')
            const lastPage = Math.ceil(list.length / perPage)
            if (currentPage > lastPage) {
                this.stateManager.setState('current_page', lastPage)
                currentPage = lastPage
            }
            const offset = currentPage * perPage - perPage
            const limit = currentPage * perPage
            list.forEach((item, key) => {
                item.to_render = key >= offset && key < limit;
            })
        }
        return list
    }

    private includeDeleted(list: any[]) {
        if (!this.stateManager.getState('include_deleted')) {
            return list.filter((val: any) => !val.deleted_at)
        }
        return list
    }

    private sortByField([...list]: any[]) {
        const {field, direction} = this.stateManager.getState('sort_by')
        if (direction === 'asc') {
             list.sort((a, b) => {
                if (a[field] > b[field]) return 1
                if (a[field] < b[field]) return -1
                return 0
            })
        } else {
            list.sort((a, b) => {
                if (a[field] > b[field]) return -1
                if (a[field] < b[field]) return 1
                return 0
            })
        }
        return list
    }
}

export default ListProcessor
