@extends('layouts.app')

@section('title', 'Butterfly Counts')

@section('content')
    <butterfly-counts />
@endsection

@push('scripts')
    @vite('resources/js/pages/butterfly_counts.js')
@endpush