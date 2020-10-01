{{--{{dd($list)}}--}}
<nav class="cat_list_nav" aria-label="Page navigation example">
    <ul class="pagination">
{{--        <li class="page-item">--}}
{{--            <a class="page-link" page_num="{{1}}" href="#" aria-label="Previous">--}}
{{--                <span aria-hidden="true">&laquo;</span>--}}
{{--            </a>--}}
{{--        </li>--}}
{{--        @for($i = $list['start_button_num']; $i<($list['start_button_num']+$list['pages_num']);$i++)--}}
{{--        <li class="page-item @if($i===1) current @endif"><a class="page-link" page_num="{{$i}}" href="#">{{$i}}</a></li>--}}
{{--        @endfor--}}
{{--        <li class="page-item">--}}
{{--            <a class="page-link"  page_num="{{$list['last_page']}}" href="#" aria-label="Next">--}}
{{--                <span aria-hidden="true">&raquo;</span>--}}
{{--            </a>--}}
{{--        </li>--}}
    </ul>
</nav>
