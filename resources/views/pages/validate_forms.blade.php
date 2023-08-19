@extends('layouts.app')

@section('title', 'Validate Forms')

@section('content')
    <validate-forms />
@endsection

@push('scripts')
@vite('resources/js/pages/validate_forms.js')
@endpush