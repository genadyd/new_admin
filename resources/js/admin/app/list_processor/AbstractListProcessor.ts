import StateManagerInterface from "../state_manager/StateManagerInterface";

abstract class AbstractListProcessor {
    protected stateManager: StateManagerInterface

    constructor(stateManager: StateManagerInterface) {
        this.stateManager = stateManager
    }
    abstract getList():any
    protected onlyDeleted(list: any[]) {
        if (this.stateManager.getState('only_deleted')) {
            return list.filter((val: any) => val.deleted_at)
        }
        return list
    }

    protected abstract searchItems(list: any[]):any[]

    protected renderPerPage(list: any[]) {
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

    protected includeDeleted(list: any[]) {
        if (!this.stateManager.getState('include_deleted')) {
            return list.filter((val: any) => !val.deleted_at)
        }
        return list
    }

    protected sortByField([...list]: any[]) {
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

export default AbstractListProcessor
