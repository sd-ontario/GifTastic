var topics = ["Charizard", "Blastoise", "Venasaur", "Rapidash", "Crobat", "Jigglypuff", "Arcanine", "Mew"];
        //
        
        //

        function displayGifs(){
            var gif = $(this).attr("dataName");
            var key = "IIbqkfiPQ5Devwbzdgg86ZupbtClJehx";
            var queryURL = "https://api.giphy.com/v1/gifs/search?api_key="+key+"&q="+gif+"&limit=10&offset=0&rating=G&lang=en";

            $.ajax({
                url:queryURL,
                method: "GET"
            }).then(function(response){

                console.log(response);
                showGifs(response);
                
                
            })
            
        }

        function showGifs(response){
            $("#gifs").empty();
            for(i=0;i<response.data.length;i++){
                var rating = "<div class='ratings'> Rating: " + (response.data[i].rating) + " </div>";
                var image = rating + '<img src= "' + response.data[i].images.fixed_height_still.url + 
                    '" data-still=" ' + response.data[i].images.fixed_height_still.url + 
                    ' "data-animate="' + response.data[i].images.fixed_height.url + '"data-state="still" class="movImage">';

                image = '<div id="frame">' + image + '</div>';
                $('#gifs').append(image);
            }
            $('.movImage').on('click', function(){
                var state = $(this).attr('data-state');
                if (state == 'still'){
                    $(this).attr('src', $(this).attr('data-animate'));
                    $(this).attr('data-state', 'animate');
                }else{
                    $(this).attr('src', $(this).attr('data-still'));
                    $(this).attr('data-state', 'still');
                }
            })

        }



        function renderButtons(){

            $("#buttonsView").empty();

            for(i=0; i<topics.length; i++){
            var a = $("<button>");

            a.addClass("gifButton");

            a.attr("dataName", topics[i]);

            a.text(topics[i]);

            $("#buttonsView").append(a);
            }


        }
        
        $("#addGif").on('click', function(event){
            event.preventDefault();
            var tag = $("#gifSearch").val().trim();
            
            topics.push(tag);

            $("#gifSearch").val("");

            renderButtons();

        })

        $(document).on('click', '.gifButton', displayGifs);

        renderButtons();
    