@extends('layouts.app')

@section('title', 'Privacy Policy')

@section('content')
    <privacy-policy />
@endsection

@push('scripts')
    @vite('resources/js/pages/privacy.js')
@endpush
