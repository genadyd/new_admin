interface ListRenderInterface {

    /*
    * get items HTML and put it into page table box
    * */
    listRender(listBuilder:ListBuilderInterface):void


    /*
    * get pagination Html And put it into paginations box
    * */
    paginationRender(paginationBuilder:PaginationBuilderInterface, data:any):void
}
