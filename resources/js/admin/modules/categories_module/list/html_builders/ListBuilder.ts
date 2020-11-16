class ListBuilder implements ListBuilderInterface{

    build(list: any):string {
        let listHtml = ''
        list.forEach((item:any, key:number)=>{
            if(item.to_render) {
                if (item.text_field_num == null) item.text_field_num = 0
                let is_new = ''
                if (item.deleted_at) {
                    listHtml += '<tr class="one_cat deleted" ' + is_new + '" data-id="' + item.id + '">' +
                        '<td class="item_num">' + (key+1) + '</td>' +
                        '<td class="item_id">' + item.id + '</td>' +
                        '<td class="item_name">' + item.name + '</td>' +
                        '<td class="item_heading">' + item.heading + '</td>' +
                        '<td class="item_text_field_num"><span class="badge badge-pill badge-primary">' + item.text_field_num + '</span></td>' +
                        '<td class="cat_controls item_controls d-flex justify-content-around align-items-center">' +
                        '<button type="button" class="info_button" data-toggle="modal" data-target="#categoryInfoModal">' +
                        '<span class="material-icons info">info</span>' +
                        '</button>' +
                        '<span class="material-icons edit">create</span>' +
                        '<button type="button" class="category_restore_button btn p-0" >' +
                        ' <span class="material-icons restore" title="restore">restore</span>' +
                        '</button>' +
                        '</td>' +
                        '</tr>'
                } else {
                    if (item.is_new) is_new = ' new'
                    listHtml += '<tr class="one_cat' + is_new + '" data-id="' + item.id + '">' +
                        '<td class="item_num">' + (key+1) + '</td>' +
                        '<td class="item_id">' + item.id + '</td>' +
                        '<td class="item_name">' + item.name + '</td>' +
                        '<td class="item_heading">' + item.heading + '</td>' +
                        '<td class="item_text_field_num"><span class="badge badge-pill badge-primary">' + item.text_field_num + '</span></td>' +
                        '<td class="cat_controls item_controls d-flex justify-content-around align-items-center">' +
                        '<button type="button" class="info_button" data-toggle="modal" data-target="#categoryInfoModal">' +
                        '<span class="material-icons info">info</span>' +
                        '</button>' +
                        '<span class="material-icons edit">create</span>' +
                        '<button type="button" class="category_delete_button item_delete_button btn p-0" data-toggle="modal" data-target="#itemDeleteModal">' +
                        ' <span class="material-icons delete" title="delete">delete</span>' +
                        '</button>' +
                        '</td>' +
                        '</tr>'
                }
            }
    })

    return listHtml
    }
}
export default ListBuilder


