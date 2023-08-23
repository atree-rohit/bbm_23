@extends('layouts.app')

@section('title', 'Butterfly Counts')

@section('manifest')
    <link rel="manifest" href="/manifest.json">
@endsection
@section('content')
    <butterfly-counts />
@endsection

@push('scripts')
    @vite('resources/js/pages/butterfly_counts.js?v=0')
@endpush