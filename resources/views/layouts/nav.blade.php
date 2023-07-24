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
            "id" => 5,
            "label" => "Registration",
            "link" => "/registration"
        ],[
            "id" => 6,
            "label" => "Resources",
            "link" => "/resources"
        ],[
            "id" => 7,
            "label" => "Calendar",
            "link" => "/calendar"
        ]
    ];
    if(auth()->user()){
        $links[] = [
            "id" => 8,
            "label" => "Logout",
            "link" => "/logout"
        ];
    } else {
        $links[] = [
            "id" => 8,
            "label" => "Login",
            "link" => "/login"
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