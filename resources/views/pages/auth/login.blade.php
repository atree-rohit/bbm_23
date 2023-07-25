@extends('layouts.app')

@section('title', 'Login')

@section('style')
@endsection

@section('content')
    <login />
@endsection

@push('scripts')
    @vite('resources/js/pages/login.js')
@endpush