<div id="side_panel" class="fixed-top ">
    <div class="main_menu d-flex flex-column justify-content-start align-items-center show">
        @foreach($main_menu as $menu)
        <div class="menu_element main_settings @if($menu['selected']) selected  @endif" menu_id="{{$menu['id']}}" menu_name="{{ $menu['name'] }}" >
            <span class="material-icons">{{ $menu['icon_name'] }}</span>
            <small>{{ $menu['title'] }}</small>
        </div>
        @endforeach
    </div>
    <div class="submenu_panel position-absolute @if(Request::getPathInfo()!='/admin') show  @endif h-100">
        <div class="submenu_inner d-flex flex-column my-4 mx-auto w-75 justify-content-start align-items-center" >
            @foreach($main_menu as $menu)
                <div class="sub_container w-100 @if($menu['selected']) show  @endif" parent_id="{{$menu['id']}}">
                    <div class="sub_header text-uppercase py-1">{{$menu['title']}}</div>
                    <div class="sub_body w-100 pt-3">
                        @foreach($menu['children'] as $s_m)
                            <div class="one_sub" menu_id="{{$s_m['id']}}" menu_name="{{$s_m['name']}}">
                                <a @if($s_m['selected']) class="selected"  @endif href="{{ route($s_m['url']) }}">{{$s_m['title']}}</a>
                             </div>

                        @endforeach
                    </div>
                </div>
            @endforeach
        </div>
    </div>
</div>

{{--
  back element for sidebat open
--}}
<div id="side_bar_back" class="d-none d-lg-flex">
    <div class="main_menu_back show"></div>
    <div class="sub_menu_back @if(Request::getPathInfo()!='/admin') show @endif"></div>
</div>
