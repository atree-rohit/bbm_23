@extends('layouts.app')

@section('title', 'About')

@section('content')
    <about />
@endsection

@push('scripts')
@vite('resources/js/pages/about.js')
@endpush