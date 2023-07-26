@php
    $path = request()->path();
    $links = [
        [
            "id" => 1,
            "label" => "Home",
            "link" => "/"
        ],[
            "id" => 2,
            "label" => "About us",
            "link" => "/about"
        ],[
            "id" => 3,
            "label" => "Data",
            "link" => "/data"            
        ],[
            "id" => 4,
            "label" => "How to Participate",
            "link" => "/participate"
        ],[
            "id" => 6,
            "label" => "Resources",
            "link" => "/resources"
        ],[
            "id" => 6,
            "label" => "Calendar",
            "link" => "/calendar"
        ]
    ];
    if(auth()->user()){
        $links[] = [
            "id" => 7,
            "label" => "Logout",
            "link" => "/logout"
        ];
    }
    $current_path = "/";
    foreach($links as $link){
        if(str_replace("/", "", $link["link"]) == $path){
            $current_path = $link["link"];
        }
    }
    if($current_path == "/"){
        if($path == "register" || $path == "logout"){
            $current_path = "/login";
        }
    }    
@endphp
<nav>

    
    <div class="logo">
        <img src="./img/bbm_logo.png" alt="">
    </div>
    <ul class="navigation">
        @foreach($links as $link)
        <li @if($current_path == $link['link']) class='active' @endif>
            <a href="{{$link['link']}}">
                <span>{{$link["label"]}}</span>
            </a>
        </li>
        @endforeach
    </ul>
</nav>