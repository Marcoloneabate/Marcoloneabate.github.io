console.log("start");

jQuery(document).ready(
    function() {
        console.log("2 ready")

        var lista = jQuery("#mialista")


        var homeMenu = jQuery("#mainMenu .active a").text("Home")
        console.log(homeMenu);

        jQuery("#btnCreateBox").on("click", createBox)





        function createBox() {
            var $newBox = jQuery("<div class='box'><h2>CIAO SONO BOX</h2></div>")

            var theClass = getColor();
            console.log("Il nuovo colore è ", theClass);

            $newBox
                .addClass("")
                .text("CIAOOOO")
                .appendTo(".titolo");


            // $newBox.clone().text("BOX 3").appendTo(".titolo");

        }
        //createBox();


        function getColor() {
            var num = Math.round(Math.random());
            if (num == 0) { return "blue"; } else {
                return "orange";
            }

        }













    }
)