<div class="modal fade" id="categoryInfoModal" tabindex="-1" role="dialog" aria-labelledby="categoryInfoModalTitle"
     aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="categoryInfoModalTitle">Modal title</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <ul class="list-group list-group-flush dates_info_list">
                    <li class="list-group-item created_time d-flex justify-content-between align-items-center"><span>Created:</span><span
                            class="date"></span></li>
                    <li class="list-group-item updated_time d-flex justify-content-between align-items-center"><span>Updated:</span><span
                            class="date"></span></li>
                    <li class="list-group-item deleted_time d-flex justify-content-between align-items-center"><span>Deleted:</span><span
                            class="date"></span></li>
                </ul>
                <div class="modal_data_container">
                    <div class="title mt-2">
                        <span>Title:</span>
                        <span class="text ml-2"></span>
                    </div>
                    <div class="heading mt-2">
                        <span>Heading:</span>
                        <span class="text ml-2"></span>
                    </div>
                    <div class="description mt-2">
                        <span>Description:</span>
                        <p class="text ml-2"></p>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
{{--                <button type="button" class="btn btn-primary">Save changes</button>--}}
            </div>
        </div>
    </div>
</div>
