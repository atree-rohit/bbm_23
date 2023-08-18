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
        ],
        // [
        //     "id" => 5,
        //     "label" => "Butterfly Counts",
        //     "link" => "/butterfly-counts"
        // ],
        [
            "id" => 6,
            "label" => "Resources",
            "link" => "/resources"
        ],[
            "id" => 7,
            "label" => "Calendar",
            "link" => "/calendar"
        ],
        [
            "id" => 8,
            "label" => ".",
            "link" => "/login"
        ]
    ];
    if(auth()->user()){
        $auth_links = [
            [
                "id" => 0,
                "label" => "Manage Users",
                "link" => "/manage-users"
            ],[
                "id" => 1,
                "label" => "Butterfly Counts",
                "link" => "/butterfly-counts"
            ],[
                "id" => 2,
                "label" => "Logout",
                "link" => "/logout"
            ]
        ];
    }
    $current_path = "/";
    foreach($links as $link){
        if(str_replace("/", "", $link["link"]) == $path){
            $current_path = $link["link"];
        }
    }
    if($current_path == "/"){
        if($path == "register" || $path == "register" || $path == "manage-users" || $path == "logout"){
            $current_path = "auth";
        }
    }
@endphp

<nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container-fluid">
        <a class="navbar-brand" href="#">
            <img src="./img/bbm_logo.png" alt="" height="50">
        </a>
        <button class="navbar-toggler ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                @foreach($links as $link)
                    <li class="nav-item text-end">
                        <a class="nav-link @if($current_path == $link['link']) active @endif" aria-current="page" href="{{$link['link']}}">
                            {{$link["label"]}}
                        </a>
                    </li>
                @endforeach
                @if(auth()->user())
                    <li class="nav-item dropdown text-end">
                        <a class="nav-link dropdown-toggle @if($current_path == 'auth') active @endif" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {{auth()->user()->name}}
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                            @foreach($auth_links as $link)
                                <li><a class="dropdown-item" href="{{$link['link']}}">{{$link['label']}}</a></li>
                            @endforeach
                        </ul>
                    </li>
                @endif
        </ul>
      </div>
    </div>
  </nav>