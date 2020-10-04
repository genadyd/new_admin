<div id="categories_control_panel" class="row py-2 px-0 mx-0 align-items-center border-bottom">
    <div class="custom-control custom-checkbox col-2">
        <input type="checkbox" class="custom-control-input" id="include_deleted">
        <label class="custom-control-label" for="include_deleted">
            <small>Include Deleted</small></label>
    </div>
    <div class="custom-control custom-checkbox col-2">
        <input type="checkbox" class="custom-control-input" id="just_deleted">
        <label class="custom-control-label" for="just_deleted">
            <small>Only Deleted</small></label>
    </div>
    <div class="custom-control custom-checkbox col-2">
        <input type="checkbox" class="custom-control-input" id="sort_by_date">
        <label class="custom-control-label" for="sort_by_date">
            <small>Sort by Date</small></label>
    </div>
    <div class="col-2 d-flex justify-content-start align-items-center">
        <input type="number" min="0" class="form-control  mr-4" id="per_page" value="Mark" required>
        <label  for="per_page" class="m-0">
            <small>Items Per Page</small>
        </label>
    </div>
    <div class="col-2 d-flex justify-content-center align-items-center" id="categories_search_button">
            <span class="material-icons">search</span>
            <small>search</small>
    </div>
    <div class="col-2 d-flex justify-content-end align-items-center p-0">
        <button type="button" id="add_new_category_form_open" class="btn btn-outline"><small>add category</small></button>
    </div>
</div>
