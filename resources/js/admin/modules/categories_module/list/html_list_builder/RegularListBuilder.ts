class RegularListBuilder implements ListBuilderInterface{
    builder(item:any,key?:number){
        return '<tr>' +
            '<td scope="row">' + item.id + '</td>' +
            '<td>' + item.name + '</td>' +
            '<td>' + item.description + '</td>' +
            '<td class="cat_controls">controls</td>' +
            '</tr>'
    }
}
export default RegularListBuilder
