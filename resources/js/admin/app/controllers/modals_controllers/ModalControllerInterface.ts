interface ModalControllerInterface{
    closeModal():void
    renderModal(modalData:any):void
    confirmModal(renderFunc?:any):void
    setListRenderFunction?(func:any):void
}
