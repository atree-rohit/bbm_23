@extends('layouts.app')

@section('title', 'Manage Users')

@section('style')
@endsection

@section('content')
    <manage-users />
@endsection

@push('scripts')
    @vite('resources/js/pages/manage_users.js')
@endpush