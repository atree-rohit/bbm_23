<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
		<meta charset="utf-8">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Big Butterfly Month - @yield('title')</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
        @vite('resources/css/app.css')
        @vite('resources/js/app.js')
        @yield('style')
        @stack('scripts')
    </head>
    <body>
        <div class="app-container">
            @include('layouts.nav')
            <div id="app">
                <nav></nav>
                @yield('content')
            </div>
        </div>
    </body>
</html>