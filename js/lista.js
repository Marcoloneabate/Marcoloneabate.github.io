console.log("Pagina lista");




var SERVICE_URL = "https://jsonplaceholder.typicode.com";
var API_KEY = "AIzaSyBZHTLXxztyPsT7KR8tD7g1inySI5cU7qQ";
var YOUTUBE_URL = "https://www.googleapis.com/youtube/v3/search";

jQuery(document).ready(function($) {
        console.log("READY")
        console.log("arguments", arguments)



        $("#loadingBar").hide();
        $("#usersTable").hide();

        $("#searchbtn").click(function() {
            console.log("Click", event);
            // getUsers();
            var search = $("#searchInput").val();
            var limit = $("#numberInput").val();
            getVideos(search, limit);

        })





        $("#searchInput").keypress(function(event) {
                console.log("tasto premuto", event.key, event.keyCode)
                if (event.keyCode === 13) {
                    var search = $(this).val();
                    var limit = $("#numberInput").val();
                    getVideos(search, limit);
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
                var newRow = jQuery("<tr/>").addClass("videoRow")
                    .data("videoData", video)
                    .data("videoId", video.id.videoId);

                newRow.append("<td class='videoId'>" + video.id.videoId + "<td/>");
                newRow.append("<td>" + video.snippet.title + "<td/>");
                newRow.append("<td><img src='" + video.snippet.thumbnails.default.url + "'/><td/>")

                //Appendo la riga alla tabella
                $tableBody.append(newRow);

            })


            $(".videoRow").click(function(event) {
                var $clickedRow = $(this);

                var isSelected = $clickedRow.hasClass("activeVideoRow")
                $(".videoRow").removeClass("activeVideoRow");

                if (!isSelected)
                    $clickedRow.addClass("activeVideoRow");

                var videoId = $clickedRow.data("videoId");
                var video = $clickedRow.data("videoData");

                console.log(videoId, video, $clickedRow)

                openModal(video);
            });



            setTimeout(function() {
                $("#loadingBar").fadeOut(2000)
                $("#usersTable").fadeIn(4000)
            })
        }




        function getVideos(search, limit) {

            $("#loadingBar").fadeIn(1000);
            $("#emptyContent").fadeOut(1000);
            $.getJSON(
                YOUTUBE_URL, {
                    "part": "snippet",
                    "key": API_KEY,
                    "maxResults": limit || 10,
                    "q": search
                },
                function(response) {
                    var videos = response.items;
                    var found = videos.length;
                    var total = response.pageInfo.totalResults;
                    $("#found").text(found);
                    $("#total").text(total);

                    console.log("VIDEOS", videos);
                    fillTable(videos);
                })
        }






        function openModal(video) {

            var videoUrl = "https://www.youtube.com/embed/+video.id.videoId";
            $("#videoModal").find("iframe").attr("src", videoUrl)
            $("#videoModalTitle").text(video.snippet.title)
            $("#videoDescription").text(video.snippet.description)
            $("#videoModal").modal("show");
        }





























    }) //Fine Ready