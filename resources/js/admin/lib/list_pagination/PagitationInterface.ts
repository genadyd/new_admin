interface PagitationInterface{
    listRender(html_builder:any):void /*render list use Builder*/
    includeDeleted(list:any):any /*list with Deletet Items*/
    sortByData(list:any):any /*List array reverse*/
    onlyDeleted(list:any):any /*display just deleted items*/
    searchItems(list:any):any /*find items by search string and display it*/
    setListItemsNumberMaxParam(list:any):void
    paginationRender(list:any):any /*build pagination string buttons*/
}
export default PagitationInterface
