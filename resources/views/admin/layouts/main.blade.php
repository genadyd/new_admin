<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="keywords" content="{{ $keywoards }}">
    <meta name="author" content="Genady Dorodny">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link href='http://fonts.googleapis.com/css?family=Lato&subset=latin,latin-ext' rel='stylesheet' type='text/css'>
    <link href='http://fonts.googleapis.com/css?family=Abel&subset=latin,latin-ext' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">

    <link rel="stylesheet" href="{{ $server_ip }}/css/admin/app.css">
    <link rel="stylesheet" href="{{ $css }}">
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js" integrity="sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8shuf57BaghqFfPlYxofvL8/KUEfYiJOMMV+rV" crossorigin="anonymous"></script>
    <script src="{{ $server_ip }}/ckeditor/ckeditor.js"></script>
    <meta name="description" content="{{ $description }}">
    <title>{{ $title }}</title>
</head>
<body >
   <div id="page-wrapper"  class="min-vh-100">
       @include('admin.layouts.header')
       <div id="page_container" class="d-flex justify-content-md-between justify-content-center">
           @include('admin.layouts.side_panel')

           <div id="content_container" class=" flex-fill px-4 py-2 mx-2 mx-lg-4 my-2 my-lg-4">
             @yield('content')
           </div>
       </div>
   </div>
   <script async src="{{ $server_ip }}/js/admin/app.js" ></script>
   <script async src="{{ $js }}" ></script>
{{--   <script src="{{ $server_ip }}/js/admin/ckeditor.js"></script>--}}
</body>
</html>
