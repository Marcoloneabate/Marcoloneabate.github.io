console.log("Pagina lista");




var SERVICE_URL = "https://jsonplaceholder.typicode.com";
var API_KEY = "AIzaSyBZHTLXxztyPsT7KR8tD7g1inySI5cU7qQ";
var YOUTUBE_URL = "https://www.googleapis.com/youtube/v3/search?part=snippet&key=" + API_KEY + "&q=";

jQuery(document).ready(function($) {
        console.log("READY")
        console.log("arguments", arguments)



        $("#loadingBar").hide();
        $("#usersTable").hide();

        $("#searchbtn").click(function() {
            console.log("Click", event);
            // getUsers();
            var search = $("#searchInput").val();
            getVideos(search);
        })



        $("#searchInput").keypress(function(event) {
                console.log("tasto premuto", event.key, event.keyCode)
                if (event.keyCode === 13) {
                    var search = $(this).val();
                    getVideos(search);
                }

            })
            .focus(function(event) {
                // $(this).addClass("inputFocus")

                console.log("Focus")
                $(this).parents("#searchRow").addClass("full")
            })
            .blur(function() {
                $(this).parents("#searchRow").removeClass("full")
                    // $(this).removeClass("inputFocus");
            })







        function getUsers() {
            $("#loadingBar").fadeIn(1000);
            $("#emptyContent").fadeOut(1000);
            $.getJSON(SERVICE_URL + "/users", function(response) {
                var users = response;
                console.log("USERS", users);
                fillTable(users);
            })
        }


        function fillTable(arrayData) {
            var $tableBody = $("#usersTable tbody");

            $tableBody.empty(); //ripulisco il body della tabella
            // $tableBody.html("");un altro modo per ripulire il body della tabella
            $.each(arrayData, function(index, video) {
                console.log(index, video)
                    //Creo una nuova riga
                var newRow = jQuery("<tr/>");

                newRow.append("<td>" + video.id.videoId + "<td/>")
                newRow.append("<td>" + video.snippet.title + "<td/>")
                newRow.append("<td><img src='" + video.snippet.thumbnails.default.url + "'/><td/>")

                //Appendo la riga alla tabella
                $tableBody.append(newRow);

            })

            setTimeout(function() {
                $("#loadingBar").fadeOut(2000)
                $("#usersTable").fadeIn(4000)
            })
        }








        function getVideos(search) {

            $("#loadingBar").fadeIn(1000);
            $("#emptyContent").fadeOut(1000);
            $.getJSON(YOUTUBE_URL + search, function(response) {
                var videos = response.items;
                console.log("VIDEOS", videos);
                fillTable(videos);
            })
        }



































    }) //Fine Ready