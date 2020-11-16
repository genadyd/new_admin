<div id="categories_control_panel" class="row py-2 px-0 mx-0 align-items-center border-bottom list_control_panel">
    <div class="custom-control custom-checkbox col-2">
        <input type="checkbox" class="custom-control-input" id="include_deleted">
        <label class="custom-control-label" for="include_deleted">
            <small>Include Deleted</small></label>
    </div>
    <div class="custom-control custom-checkbox col-2">
        <input type="checkbox" class="custom-control-input" id="only_deleted">
        <label class="custom-control-label" for="only_deleted">
            <small>Only Deleted</small></label>
    </div>
    <div class="col-3 d-flex justify-content-start align-items-center">
        <input type="number" min="0" class="form-control h-25  mr-2" id="per_page" value="Mark" required>
        <label  for="per_page" class="m-0">
            <small>Items Per Page</small>
        </label>
    </div>
    <div class="col-3 d-flex justify-content-center align-items-center p-0" id="categories_search_button">
        <input type="text" class="form-control h-25  m-0" id="items_search_input" placeholder="search">
    </div>

    <div class="col-2 d-flex justify-content-end align-items-center p-0">
        <button type="button" id="add_new_form_open" class="btn btn-outline"><small>add category</small></button>
    </div>
</div>
