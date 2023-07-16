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
    $current_path = "/";
    foreach($links as $link){
        if(str_replace("/", "", $link["link"]) == $path){
            $current_path = $link["link"];
        }
    }
    // dd($path, $current_path);
@endphp
<nav>

    
    <div class="logo">
        <img src="./img/bbm_logo.png" alt="">
    </div>
    <ul>
        @foreach($links as $link)
        <li @if($current_path == $link['link']) class='active' @endif>
            <a href="{{$link['link']}}">
                {{$link["label"]}}
            </a>
        </li>
        @endforeach
    </ul>
</nav>