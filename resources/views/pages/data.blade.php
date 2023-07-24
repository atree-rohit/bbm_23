@extends('layouts.app')

@section('title', 'Data')

@section('content')
    <data-component />
@endsection

@push('scripts')
@vite('resources/js/pages/data.js')
@endpush