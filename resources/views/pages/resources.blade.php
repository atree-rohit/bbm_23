@extends('layouts.app')

@section('title', 'Resources')

@section('content')
    <resources />
@endsection

@push('scripts')
    @vite('resources/js/pages/resources.js')
@endpush