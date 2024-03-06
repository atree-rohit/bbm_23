@extends('layouts.blank')

@section('title', 'Data')

@section('content')
    <new-data />
@endsection

@push('scripts')
    @vite('resources/js/pages/new_data.js')
@endpush
