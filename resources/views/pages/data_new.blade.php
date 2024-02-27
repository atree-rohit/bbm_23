@extends('layouts.app')

@section('title', 'Species Pages')

@section('content')
    <species-pages />
@endsection

@push('scripts')
    @vite('resources/js/pages/species_pages.js')
@endpush
