@extends('layouts.app')

@section('title', 'Register')

@section('content')
    <register />
@endsection

@push('scripts')
    @vite('resources/js/pages/register.js')
@endpush