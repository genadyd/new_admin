
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
        if(daletedDataArea) daletedDataArea.innerHTML= modalData.deleted_at ?`<small>${modalData.deleted_at}</small>`:''

        /* set title*/
        const titleArea = this.modalContainer.querySelector('.modal_data_container .title .text')
        if(titleArea) titleArea.innerHTML= modalData.title

        /* set heading*/
        const headingArea = this.modalContainer.querySelector('.modal_data_container .heading .text')
        if(headingArea) headingArea.innerHTML= modalData.heading

        /* set description*/
        const descriptionArea = this.modalContainer.querySelector('.modal_data_container .description .text')
        if(descriptionArea) descriptionArea.innerHTML= modalData.description
        this.renderTextFields(modalData.text_fields)
    }
    private renderTextFields(modalDataTextFields:any):void|boolean{
        const textFieldsArea:any = this.modalContainer.querySelector('.modal_texts_fields_area')
        if(modalDataTextFields.length === 0) {
            textFieldsArea.innerHTML = ''
            return false
        }

        let heading = `<h5 class="font-weight-bold">Text fields:</h5><hr/>`
        let html = modalDataTextFields.reduce((acc:any,item:any)=>{
           return acc+=`<div class="one_text p-1">
                      <div class="title_heading text_field_heading font-weight-bold">Title:</div>
                        <div class="text_title_area">${item.title}</div><hr/>`+
                      `<div class="description_heading text_field_heading font-weight-bold">Description:</div>
                        <div class="text_field_description_area">${item.description}</div><hr/>`+
                      `<div class="text_heading text_field_heading font-weight-bold">Text:</div>
                        <div class="text_field_text">${item.text}</div></div>`
        },'')
        if(textFieldsArea) {
            textFieldsArea.innerHTML = heading + html
        }
    }
    confirmModal(){

    }
}
export default InfoModalController
