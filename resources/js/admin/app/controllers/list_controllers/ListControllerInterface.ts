import ListControlsControllerInterface from "./list_controls_controller/ListControlsControllerInterface";

interface ListControllerInterface {
    addNewItemToList(newItemObject: any): void
    getControlsController(listControlsController: ListControlsControllerInterface): void
    renderList():void
}
export default ListControllerInterface
