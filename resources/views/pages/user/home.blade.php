@extends('layouts.app')

@section('template_title')
    {{ Auth::user()->name }}'s Homepage
@endsection

@section('template_fastload_css')
@endsection

@section('content')

    <div class="container">
        <div class="row">
            <div class="col-12 col-lg-8 offset-lg-2">

                <!-- @include('panels.welcome-panel') -->
                @include('partials.posts')

            </div>
        </div>
    </div>

@endsection

@section('footer_scripts')
@endsection
