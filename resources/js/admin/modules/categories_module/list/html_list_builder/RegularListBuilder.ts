class RegularListBuilder implements ListBuilderInterface{
    builder(item:any,key?:number){
        if(item.text_field_num ==null)item.text_field_num=0
        let deleted = '';
        if(item.deleted_at) deleted = 'deleted'
        return '<tr class="'+deleted+'">' +
            '<td scope="row">' + (key) + '</td>' +
            '<td>' + item.id + '</td>' +
            '<td>' + item.name + '</td>' +
            '<td>' + item.heading + '</td>' +
            '<td><span class="badge badge-pill badge-primary">'+item.text_field_num+'</span></td>' +
            '<td class="cat_controls">controls</td>' +
            '</tr>'
    }
}
export default RegularListBuilder
