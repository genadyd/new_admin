
class InfoModalController implements ModalControllerInterface{
    private modalContainer:any
    private token:string|null
    constructor() {
        this.modalContainer = document.getElementById('categoryInfoModal')
        const tokenElem = document.querySelector('[name=csrf-token]')
        this.token = tokenElem? tokenElem.getAttribute('content') : ''
        this.closeModal()
    }
    closeModal(){
        const modalsCloseButtons = this.modalContainer.querySelectorAll('.close_button')
        modalsCloseButtons.forEach((button:any)=>{
            button.addEventListener('click',()=>{
                const infoActiveRows = document.querySelectorAll('.info_active')
                infoActiveRows.forEach((item:any)=>{
                    item.classList.remove('info_active')
                })
            })
        })

    }
    renderModal(modalData:any){
        /*set name*/
        const modalNameArea = this.modalContainer.querySelector('#categoryInfoModalName')
        if(modalNameArea) modalNameArea.innerHTML= modalData.name

        /*set data created*/
        const createdDataArea = this.modalContainer.querySelector('.modal-body .created_time .date')
        if(createdDataArea) createdDataArea.innerHTML= `<small>${modalData.created_at}</small>`

        /* set data updated*/
        const updatedDataArea = this.modalContainer.querySelector('.modal-body .updated_time .date')
        if(updatedDataArea) updatedDataArea.innerHTML= `<small>${modalData.updated_at}</small>`

        /* set data deleted*/
        const daletedDataArea = this.modalContainer.querySelector('.modal-body .deleted_time .date')
        if(daletedDataArea) daletedDataArea.innerHTML= modalData.deleted_at?`<small>${modalData.deleted_at}</small>`:''

        /* set title*/
        const titleArea = this.modalContainer.querySelector('.modal_data_container .title .text')
        if(titleArea) titleArea.innerHTML= modalData.title

        /* set heading*/
        const headingArea = this.modalContainer.querySelector('.modal_data_container .heading .text')
        if(headingArea) headingArea.innerHTML= modalData.heading

        /* set description*/
        const descriptionArea = this.modalContainer.querySelector('.modal_data_container .description .text')
        if(descriptionArea) descriptionArea.innerHTML= modalData.description

    }
    confirmModal(){

    }
}
export default InfoModalController
