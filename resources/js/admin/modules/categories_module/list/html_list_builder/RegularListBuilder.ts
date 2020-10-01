class RegularListBuilder implements ListBuilderInterface{
    builder(item:any,key?:number){
        return '<tr>' +
            '<td scope="row">' + (key) + '</td>' +
            '<td>' + item.id + '</td>' +
            '<td>' + item.name + '</td>' +
            '<td>' + item.heading + '</td>' +
            '<td class="cat_controls">controls</td>' +
            '</tr>'
    }
}
export default RegularListBuilder
