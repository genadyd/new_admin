
interface ListItemsControlsEventsControllerInterface {
    getRenderFunc(fn:any, contect:any):void

    /*
    * @itemDelete -- set item to 'deleted' status
    * */
    itemDelete():void

    /*
    * @itemUpdate --- open item form for update the item (by item id)
    * */
    itemUpdate():void

    /*
   * @itemInfo --- open modal with item info
   * */
    // itemInfo():void

    /*
    * @addChild --- open item's form with parent_id param for add children item
    * */
    addChild?():void

    /*
   * @getTextFields ---  modal open with text elements info
   * */
    getTextFields?():void
}
export default ListItemsControlsEventsControllerInterface
