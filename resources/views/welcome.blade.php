<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Big Butterfly Month</title>
        @vite('resources/css/app.css')
    </head>
    <body>
        <div id="app" />
        @vite('resources/js/app.js')+
        <script>
            window.page = @json($page);
        </script>
    </body>
</html>