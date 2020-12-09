
abstract class AbstractListProcessor {
    protected state:any

    constructor(state:any) {
        this.state = state
    }
    abstract getList():any
    protected onlyDeleted(list: any[]) {
        if (this.state.only_deleted) {
            return list.filter((val: any) => val.deleted_at)
        }
        return list
    }

    protected abstract searchItems(list: any[]):any[]

    protected renderPerPage(list: any[]) {
        if (list.length > 0) {
            const perPageNum = this.state.per_page || 0
            const perPage = perPageNum != 0 ? perPageNum : list.length

            let currentPage = this.state.current_page
            const lastPage = Math.ceil(list.length / perPage)
            if (currentPage > lastPage) {
                this.state.current_page= lastPage
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
        if (!this.state.include_deleted) {
            return list.filter((val: any) => !val.deleted_at)
        }
        return list
    }

    protected sortByField([...list]: any[]) {
        const {field, direction} = this.state.sort_by
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
    protected checkItemIfReallyHasChildren(list:any[]):any[]{
        if(!this.state.include_deleted) {
            const listCopy = JSON.parse(JSON.stringify(list))
            listCopy.forEach((item: any) => {
               if(item.children_count > 0){
                   let filteredList = this.state.list.filter((el: any) => el.parent === item.id && el.deleted_at)
                   if(filteredList.length === item.children_count) item.children_count = 0
               }
            })
            return listCopy
        }
       return list
    }
}


export default AbstractListProcessor
