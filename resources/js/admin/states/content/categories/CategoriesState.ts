import AbstractState from "../../AbstractState";

class CategoriesState extends AbstractState implements StatesInterface{
    protected listState ={
        categories:[],
        current_page:1,
        per_page:6,
        include_deleted: false,
        only_deleted:false,
        sort_by_date_desc:false,
        search_string:''
    }
}
export default CategoriesState
