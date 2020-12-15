
class ShipListFilters {
    public  onlyDeleted(list:any, onlyDeleted:boolean):any{
        if (onlyDeleted) {
            return list.filter((val: any) => val.deleted_at)
        }
        return list
    }
    public  includeDeleted(list:any, includeDeleted:boolean):any{
        if (!includeDeleted) {
            return list.filter((val: any) => !val.deleted_at)
        }
        return list
    }
    public  renderPerPage(list:any,perPage:number, currentPage:number):any{
        if (list.length > 0) {
            perPage = perPage === 0 ? list.length:perPage
            /*?!?!?! set last page will do in concrete list ?!?!?!*/
            // const lastPage = Math.ceil(list.length / perPage)
            // if (currentPage > lastPage) {
            //     this.state.current_page= lastPage
            //     currentPage = lastPage
            // }
            const offset = currentPage * perPage - perPage
            const limit = currentPage * perPage

            list.forEach((item:any, key:number) => {
                item.to_render = key >= offset && key < limit;
            })
        }
        return list
    }
    public sortByField(list:any, fieldsNames:any):any{
        const {field, direction} = fieldsNames
        if (direction === 'asc') {
            list.sort((a:any, b:any) => {
                if (a[field] > b[field]) return 1
                if (a[field] < b[field]) return -1
                return 0
            })
        } else {
            list.sort((a:any, b:any) => {
                if (a[field] > b[field]) return -1
                if (a[field] < b[field]) return 1
                return 0
            })
        }
        return list
    }
    public listSearch(list:any,searchString:string,fieldsNamesList:string[]){
        let listRes: any[] = []
        list =JSON.parse( JSON.stringify(list)); /*deep list copy*/
        const pattern = new RegExp((searchString), "g")
        list.forEach((item: any) => {
            let foundField:any = fieldsNamesList.filter((field) => pattern.test(item[field]))
            if (foundField) {
                    item[foundField] = item[foundField].replace(pattern, `<span class="founded">${searchString}</span>`)
                listRes.push(item)
            }
        })
        return listRes
    }


}
export default ShipListFilters
