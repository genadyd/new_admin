class ListBuilder implements ListBuilderInterface {

    build(list: any): string {
        let listHtml = ''
        list.forEach((item: any, key: number) => {
            if (item.to_render) listHtml += this.listHtmlBuild(item, key)
        })
        return listHtml
    }

    protected listHtmlBuild(item: any, key: number) {
        let deleted = item.deleted_at ? ' deleted' : ''
        let textFieldsNum = item.text_fields?item.text_fields.length:0
        let listHtml = ''
        listHtml += `<div class="one_item one_cat${deleted} " data-id="${item.id}" data-key="${key}">` +
            `<div class="one_cat_header row align-items-center py-1 mx-0 py-lg-2 border-bottom justify-content-between">` +
            `<div class="id_field col-1">${item.id}</div>` +
            `<div class="name_field col-5 col-lg-2">${item.name}</div>` +
            `<div class="heading_field col-2  d-none d-lg-block">${item.heading}</div>` +
            `<div class="text_fields_field col-2 d-none d-lg-table-cell">${textFieldsNum}</div>` +
            `<div class="controls_field col-6 col-lg-2  d-flex px-0 justify-content-end align-items-center">` +
            `<span title="add into" class="material-icons add_into_this">add</span>`

        if (item.children_count && item.children_count > 0) {
            listHtml += '<span title="list view" class="material-icons view_list">expand_more</span>'
        }
        listHtml += `<button type="button" class="info_button ml-0" data-toggle="modal" data-target="#categoryInfoModal">` +
            `<span class="material-icons info">info</span>` +
            `</button>` +
            `<span class="material-icons edit ml-1">create</span>`
        if (item.deleted_at) {
            listHtml += `<button type="button" class="category_restore_button item_restore_button btn p-0 ml-1" >` +
                `<span class="material-icons restore" title="restore">restore</span>` +
                `</button>`
        } else {

            listHtml += `<button type="button" class="category_delete_button item_delete_button btn p-0 ml-1" data-toggle="modal" data-target="#itemDeleteModal">` +
                `<span class="material-icons delete" title="delete">delete</span>` +
                `</button>`
        }

        listHtml += `</div></div>
          <div class="one_cat_body pr-3 mb-1"></div></div>`
        return listHtml
    }


}

export default ListBuilder


