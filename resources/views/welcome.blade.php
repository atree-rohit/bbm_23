@extends('layouts.app')

@section('title', 'Home')

@section('content')
    <home />
@endsection

@push('scripts')
    @vite('resources/js/pages/home.js')
@endpush