import CategoriesApi from "../../../api/CategoriesApi";
import ListStor from "./ListStor";

class ListPagination {
    private tableContainer = document.getElementById('categories_list_container')
    private stor = new ListStor()
    page = (button:any) => {
        if (button) {
            const pageNum = button.getAttribute('page_num')
            this.stor.setState('current_page',pageNum)
            this.getListFromApi()
        }
    }
    private getListFromApi=()=>{
        const token = document.querySelector('[name=csrf-token]')
        const formData = {
            action: {
                type: 'get_offset_limit',
                current_page: this.stor.getState('current_page')
            },
            'X-CSRF-TOKEN': token ? token.getAttribute('content') : ''
        }
        const Api = new CategoriesApi('/admin/categories/get_list', 'POST', {formData: JSON.stringify(formData)})
        const promise: any = Api.exeq()
        promise.then((data: any) => {
            this.appendList(this.tableBuilder(data))
            this.appendPagination(this.paginationBuilder(data))
        })
    }
    private tableBuilder = (data: any): string => {
        let htmlTable = ''
        data.categories.forEach((item: any) => {
            htmlTable += this.getOneCategoryHtml(item)
        })
        return htmlTable
    }

    private getOneCategoryHtml = (item:any)=>{
        return '<tr>' +
            '<td scope="row">' + item.id + '</td>' +
            '<td>' + item.name + '</td>' +
            '<td>' + item.description + '</td>' +
            '<td class="cat_controls">controls</td>' +
            '</tr>'
    }
    private paginationBuilder = (data: any): string => {
        let start_page = +data.start_button_num,
            current_page = +data.current_page,
            last_page = +data.last_page,
            buttons_num = +data.pages_num
        if (current_page == last_page ) { /*if last page*/
            start_page = current_page - 2
            buttons_num = last_page
        } else if (current_page > 1 && current_page < last_page) {
            start_page = current_page - 1
            buttons_num = current_page+1
        } else {
            start_page = 1
        }
        let navHtml = '<ul class="pagination">' +
            '<li class="page-item">' +
            '<a class="page-link" page_num="1" href="#" aria-label="Previous">' +
            '<span aria-hidden="true">«</span>' +
            '</a>' +
            '</li>'
        //===============================
        for (let i = start_page; i <= buttons_num; i++) {
            navHtml += '<li class="page-item">' +
                '<a class="page-link" page_num="' + i + '" href="#">' + i + '</a></li>'
        }
        //========================================
        navHtml += '<li class="page-item">' +
            '<a class="page-link" page_num="'+last_page+'" href="#" aria-label="Next">' +
            '<span aria-hidden="true">»</span>' +
            '</a>' +
            '</li>' +
            '</ul>'
        return navHtml
    }
    private appendList = (listHtml: string) => {
        if (this.tableContainer) {
            const tableBody = this.tableContainer.querySelector('table tbody')
            if (!tableBody) return
            tableBody.innerHTML = listHtml
        }
    }
    private appendPagination = (navHtml:string)=>{
        if (this.tableContainer) {
         const navElement = this.tableContainer.querySelector('nav.cat_list_nav')
            if(!navElement)return
            navElement.innerHTML = navHtml
        }
    }
}

export default ListPagination