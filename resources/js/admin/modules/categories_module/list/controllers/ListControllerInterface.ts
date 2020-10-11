interface ListControllerInterface{
    regularPage(page:number):void
    getAllList?() : void
    sortByDate?():void
    includeDeleted?():void
    onlyDeleted?():void
    changePerPageNum?(e:any):void
    formOpenClose?():void
    searchInput?(e:any):void
}
// export default ListControllerInterface
