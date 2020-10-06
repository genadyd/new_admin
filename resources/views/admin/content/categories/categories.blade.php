@extends('admin.layouts.main')

@section('content')
{{--    <h3>Categories Settings</h3>--}}
    @include('admin.content.categories.content_switch')
    @include('admin.content.categories.category_form')
    @include('admin.content.categories.categories_list')

@endsection
