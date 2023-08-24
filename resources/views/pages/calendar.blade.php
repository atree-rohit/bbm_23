@extends('layouts.app')

@section('title', 'Calendar')

@section('content')
    <h1>Calendar</h1>
    <div class="container border border-info text-center">
        <iframe src="https://calendar.google.com/calendar/embed?src=vd3kpusnt1pjs0s2b5dd4okn74%40group.calendar.google.com&amp;ctz=Asia%2FKolkata" style="border: 0" width="800" height="600" frameborder="0" scrolling="no"></iframe>
    </div>
@endsection

@push('scripts')

@endpush