<!doctype html>
<html lang="{{ config('app.locale') }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="{{ asset('institute/images/icon/favicon.ico') }}" rel="shortcut icon">
    <meta http-equiv="refresh" content="{{ config('session.lifetime') * 60 }}">
    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Styles -->
    
    <link href="{{ asset('institute/css/app.css') }}" rel="stylesheet">
    <link href="{{ mix('css/app.css') }}" rel="stylesheet">
</head>
<body class="main">
    <div id="app"></div>
    
    <script src="{{ mix('js/app.js')}}" defer></script>
    <script src="{{ asset('institute/js/app.js')}}"></script>
</body>
</html>
