<section id="categories_list_container">
    @if(count($list['categories'])>0)
    @include('admin.content.categories.categories_list_control_panel')
    @include('admin.content.categories.categories_table')
    @include('admin.content.categories.padginaton')
    @endif
</section>

