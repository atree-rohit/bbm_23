<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
		<meta charset="utf-8">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Big Butterfly Month - @yield('title')</title>
        @vite('resources/css/app.css')
        @vite('resources/js/app.js')
        @stack('scripts')
    </head>
    <body>
        <div class="container">
            @include('layouts.nav')
            <div id="app">
                <nav></nav>
                @yield('content')
            </div>
        </div>
    </body>
</html>