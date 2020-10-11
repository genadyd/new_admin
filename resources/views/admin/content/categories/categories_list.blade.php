<section id="categories_list_container">
    @if(isset($list['categories'])&&count($list['categories'])>0)
    @include('admin.content.categories.categories_list_control_panel')
    @include('admin.content.categories.categories_table')
    @include('admin.content.categories.padginaton')
    @else
        @include('admin.content.categories.category_delete_modal')
        @include('admin.content.categories.categories_list_control_panel')
        @include('admin.content.categories.categories_table')
        @include('admin.content.categories.padginaton')
    @endif
</section>

