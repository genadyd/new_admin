
<section id="category_form_container" class="pb-5">
    <form id="category_form">
        <div class="category_data">
            <div class="form-row mt-2">
                <div class="col-lg-6 col-12 mt-3 input_block">
                    <label for="category_name">Name</label>
                    <input type="text" id="category_name" name="category_name" class="form-control "
                           placeholder="category name" pattern="simpleString" validation>
                    <div class="error_alert">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
                </div>
                <div class=" col-lg-6 col-12 mt-3 input_block">
                    <label for="category_url">Url</label>
                    <input type="text" id="category_url" name="category_url" class="form-control"
                           placeholder="category url" pattern="innerUrl" validation>
                    <div class="error_alert">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
                </div>
                <div class="col-12 col-lg-6 mt-3 input_block">
                    <label for="category_title">Title</label>
                    <input type="text" id="category_title" name="category_title" class="form-control"
                           placeholder="category title" pattern="simpleString" validation>
                    <div class="error_alert">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
                </div>
                <div class="col-12 col-lg-6 mt-3 input_block">
                    <label for="category_title">Heading</label>
                    <input type="text" id="category_heading" name="category_heading" class="form-control"
                           placeholder="category heading" pattern="simpleString" validation>
                    <div class="error_alert">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
                </div>
                <div class="col-12 mt-3 input_block">
                    <label for="category_description">Description</label>
                    <textarea class="form-control" name="category_description" id="category_description"
                              rows="4" pattern="longText" validation></textarea>
                    <div class="error_alert">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
                </div>
            </div>
            <input type="hidden" name="parent_id" class="parent_id" value="0">
        </div>
        <hr>
        <div class="catTextFieldsContainer" class="mt-4">
            {{--categories text fields --}}
            <div class="text_field_form">
                <div class="text_fields_heading">
                    <h4>Text fields</h4>
                </div>
              @include('.admin.content.categories.text_field')
            </div>
            {{---------------------------------------}}
        </div>
    </form>
    <div class="button_area mt-3 d-flex justify-content-between">
        <button id="category_form_submit" class="btn" type="button" disabled>Submit</button>
        <button id="add_text_field" class="btn btn-outline-warning" type="button">Add Text Field</button>
    </div>
</section>

