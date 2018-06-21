console.log("Pagina lista");




var SERVICE_URL = "https://jsonplaceholder.typicode.com";
var API_KEY = "AIzaSyBZHTLXxztyPsT7KR8tD7g1inySI5cU7qQ";
var YOUTUBE_URL = "https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyBZHTLXxztyPsT7KR8tD7g1inySI5cU7qQ&q=cut";

jQuery(document).ready(function($) {
        console.log("READY")
        console.log("arguments", arguments)



        $("#loadingBar").hide();
        $("#usersTable").hide();

        $("#searchbtn").click(function() {
            console.log("Click");
            getUsers();
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

            $tableBody.html("");
            $.each(arrayData, function(index, user) {
                console.log(index, user)
                    //Creo una nuova riga
                var newRow = jQuery("<tr/>");
                //Inserisco dei tag <td>VALORE<td/>
                newRow.append("<td>" + user.id + "<td/>") //ID
                newRow.append("<td>" + user.name + "<td/>") //NAME
                newRow.append("<td>" + user.email + "<td/>") //EMAIL
                newRow.append("<td>" + user.username + "<td/>") //USERNAME
                    //Appendo la riga alla tabello
                $tableBody.append(newRow);

            })

            setTimeout(function() {
                $("#loadingBar").fadeOut(2000)
                $("#usersTable").fadeIn(4000)
            })
        }





















    }) //Fine Ready