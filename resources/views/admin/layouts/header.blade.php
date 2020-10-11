
<div id="header_back"></div>

<nav id="main_navbar" class="navbar fixed-top">
    <div class="nav_bar_inner d-flex row vw-100">
{{--        left navbar side --}}
        <div class="col-3 col-lg-5 d-flex justify-content-start align-items-center">
                <div class="open_close_menu d-flex ">
                    <span class="material-icons more_vert">more_vert</span>
                    <span class="material-icons">menu</span>
                </div>
            <div class="mobile_search_open d-lg-none d-sm-flex ">
                <span class="material-icons">search</span>
            </div>
            <div  class="search_box input-group pl-md-2 pl-xl-4 d-none d-lg-flex">
                <input class="main_search form-control rounded-pill" id="main_search" name="search" type="text">
                <span class="material-icons">search</span>
            </div>

        </div>
        <div class="col-lg-2 col-6 ">
            <a class="logo_area d-flex justify-content-center text-uppercase" href="{{ $server_ip }}/admin">
               Geditor
            </a>
        </div>
        <div class="col-lg-5 col-3 d-flex justify-content-end align-items-center">

            <a class="d-none d-lg-inline-block mr-2" href="@if ( str_contains(Request::fullUrl(), 'localhost')||str_contains(Request::fullUrl(), '192') ) /new_admin/public/logout

            @else /logout  @endif " onclick=" document.getElementById('logout-form').submit(); return false;" >
                <small>logout</small>
            </a>
            <form id="logout-form" action="@if ( str_contains(Request::fullUrl(), 'localhost')||str_contains(Request::fullUrl(), '192') ) /new_admin/public/logout

            @else /logout  @endif" method="POST" class="d-none">{{ csrf_field() }}></form>
            <div class="avatar_area">
                <img class="rounded-circle" src="{{ $server_ip }}/img/admin/istockphoto-1174511173-1024x1024.jpg" alt="">
            </div>
        </div>
    </div>
</nav>
<div class="mobile_search_box position-fixed w-100 align-items-center">
    <input class="main_search form-control rounded-pill" id="main_mobile_search" name="search" type="text">
    <span class="material-icons position-absolute">search</span>
</div>


