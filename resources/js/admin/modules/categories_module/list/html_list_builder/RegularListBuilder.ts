class RegularListBuilder implements ListBuilderInterface{
    builder(item:any,key?:number){
        if(item.text_field_num ==null)item.text_field_num=0
        let deleted = '', is_new =''
        if(item.deleted_at) deleted = ' deleted'
        if(item.is_new) is_new = ' new'
        return '<tr class="one_cat'+deleted+''+is_new+'" data-id="'+ item.id +'">' +
            '<td scope="row">' + (key) + '</td>' +
            '<td>' + item.id + '</td>' +
            '<td>' + item.name + '</td>' +
            '<td>' + item.heading + '</td>' +
            '<td><span class="badge badge-pill badge-primary">'+item.text_field_num+'</span></td>' +
            '<td class="cat_controls d-flex justify-content-between align-items-center">' +
            '<span class="material-icons">create</span>' +
            '<span class="material-icons">delete</span>' +
            '<span class="material-icons">create</span>' +
            '<span class="material-icons">info</span>' +
            '</td>' +
            '</tr>'
    }
}
export default RegularListBuilder
