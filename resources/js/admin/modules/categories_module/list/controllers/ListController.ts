import RegularRender from "../renders/list_render/RegularRender";
import RegularListBuilder from "../html_builders/html_list_builder/RegularListBuilder";
import CategoriesApi from "../../../../api/CategoriesApi";
import CategoriesStateObj from "../../../../states/content/categories/CategoriesState";
import AbstractListController from "./AbstractListController";

class ListController extends AbstractListController implements ListControllerInterface{

    public getAllList = () => {
        const formData = {
            action: {},
            'X-CSRF-TOKEN': this.token ? this.token.getAttribute('content') : ''
        }
        const Api = new CategoriesApi('/admin/categories/get_list', 'POST', {formData: JSON.stringify(formData)})
        const promise: any = Api.exeq()
        promise.then((data: object) => {
                this.store.fill(data, 'categories')
                this.regularPage(1)
                const perPageInput: any = document.getElementById('per_page')
                if (perPageInput) {
                    perPageInput.value = this.store.getState('per_page')
                }
            }
        )
    }


    public sortByDate = () => {
        this.store.setState('sort_by_date_desc', !this.store.getState('sort_by_date_desc'))
        const curentPage = this.store.getState('current_page')
        this.regularPage(curentPage)
    }

    public includeDeleted = (): void => {
        this.store.setState('include_deleted',
            !this.store.getState('include_deleted'))
        const curentPage = this.store.getState('current_page')
        this.regularPage(curentPage)

    }

    public onlyDeleted(): void {
        const includeDeletedElement: any = document.getElementById('include_deleted')
        if (includeDeletedElement && !includeDeletedElement.checked) {
            includeDeletedElement.click()
        }
        this.store.setState('only_deleted',
            !this.store.getState('only_deleted'))
        const curentPage = this.store.getState('current_page')
        this.regularPage(curentPage)
    }

    public changePerPageNum(event: any) {
        let newVal = event.target.value
        this.store.setState('per_page', +newVal)
        const curentPage = this.store.getState('current_page')
        this.regularPage(curentPage)
    }

    public formOpenClose() {
        const radioButton = document.getElementById('form_open_close')
        if (radioButton) {
            radioButton.checked = true
        }
    }

    public searchInput(event: any) {
        const target = event.target;
        let inputValue = target.value
        this.store.setState('search_string', inputValue)
        this.regularPage(1)
    }

    public addNewCategoryToList(categoryObject: any) {
        const categories = this.store.getState('categories')
        categoryObject['is_new'] = true
        categories.push(categoryObject)
        const lastPage = Math.ceil(categories.length / +this.store.getState('per_page'))

        this.regularPage(lastPage)
    }

}

export default ListController
