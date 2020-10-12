class InfoModalRender {
    private modalContainer: any
    private data: any

    constructor(data: any, modalContainer: any) {
        this.data = data
        this.modalContainer = modalContainer
    }

    public render() {
        this.headerRender()
        this.datesBoxRender()
        this.modalBodyRender()
    }

    private headerRender() {
        const headingContainer = this.modalContainer.querySelector('#categoryInfoModalTitle');
        headingContainer.innerHTML = this.data.heading
    }

    private datesBoxRender() {
        const headingContainer = this.modalContainer.querySelector('.dates_info_list');
        headingContainer.querySelector('.created_time .date').innerHTML = `<small>${this.data.created_at}</small>`
        headingContainer.querySelector('.updated_time .date').innerHTML = `<small>${this.data.updated_at}</small>`
        headingContainer.querySelector('.deleted_time .date').innerHTML = `<small>${this.data.deleted_at ? this.data.deleted_at:'not deleted'}</small>`
    }
    private modalBodyRender(){
        const modalDataContainer = this.modalContainer.querySelector('.modal_data_container')
        modalDataContainer.querySelector('.title .text').innerText =this.data.title
        modalDataContainer.querySelector('.heading .text').innerText =this.data.heading
        modalDataContainer.querySelector('.description .text').innerText =this.data.description
    }
}

export default InfoModalRender
