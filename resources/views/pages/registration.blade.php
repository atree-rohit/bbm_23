@extends('layouts.app')

@section('title', 'Registration')

@section('content')
    <h1>Registration</h1>
@endsection

@push('scripts')
    @vite('resources/js/pages/register.js')
@endpush