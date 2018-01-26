<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        @include('partials.head')
    </head>

    <body>
    	<div id="content">
    		@yield('content')
    	</div>

    	@include('partials.tail')
    </body>
</html>
