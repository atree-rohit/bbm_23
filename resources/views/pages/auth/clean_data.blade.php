@extends('layouts.app')

@section('title', 'Clean Data')

@section('style')
@endsection

@section('content')
    <clean-data />
@endsection

@push('scripts')
    @vite('resources/js/pages/clean_data.js')
@endpush