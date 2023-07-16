@extends('layouts.app')

@section('title', 'Home')

@section('content')
    <h1>Home</h1>
    <home> </home>
@endsection

@push('scripts')
    @vite('resources/js/pages/home.js')
@endpush