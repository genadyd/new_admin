class RegularListBuilder implements ListBuilderInterface{
    builder(item:any,key?:number){
        if(item.text_field_num ==null)item.text_field_num=0
        let is_new =''
        if(item.deleted_at) {
            return '<tr class="one_cat deleted" '+is_new+'" data-id="'+ item.id +'">' +
                '<td scope="row">' + (key) + '</td>' +
                '<td>' + item.id + '</td>' +
                '<td>' + item.name + '</td>' +
                '<td>' + item.heading + '</td>' +
                '<td><span class="badge badge-pill badge-primary">'+item.text_field_num+'</span></td>' +
                '<td class="cat_controls d-flex justify-content-around align-items-center">' +
                '<span class="material-icons info">info</span>' +
                '<span class="material-icons edit">create</span>' +
                '<button type="button" class="category_restore_button btn p-0" data-toggle="modal" data-target="#categoryDeleteModal">' +
                ' <span class="material-icons restore" title="restore">restore</span>' +
                '</button>' +
                '</td>' +
                '</tr>'
        }
        if(item.is_new) is_new = ' new'
        return '<tr class="one_cat'+is_new+'" data-id="'+ item.id +'">' +
            '<td scope="row">' + (key) + '</td>' +
            '<td>' + item.id + '</td>' +
            '<td>' + item.name + '</td>' +
            '<td>' + item.heading + '</td>' +
            '<td><span class="badge badge-pill badge-primary">'+item.text_field_num+'</span></td>' +
            '<td class="cat_controls d-flex justify-content-around align-items-center">' +
            '<span class="material-icons info">info</span>' +
            '<span class="material-icons edit">create</span>' +
            '<button type="button" class="category_delete_button btn p-0" data-toggle="modal" data-target="#categoryDeleteModal">' +
            ' <span class="material-icons delete" title="delete">delete</span>' +
            '</button>' +
            '</td>' +
            '</tr>'
    }
}
export default RegularListBuilder
