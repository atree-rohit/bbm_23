@extends('layouts.app')

@section('title', 'Logout')

@section('style')
@endsection

@section('content')
    <logout />
@endsection

@push('scripts')
    @vite('resources/js/pages/logout.js')
@endpush