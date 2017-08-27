$(document).ready(function() {
    // Initial array of movies
    var movies = ["The Matrix", "The Notebook", "Mr. Nobody", "The Lion King"];
    var topics = ["rat", "cat", "dog", "kitten", "rabbit", "snake", "parrot", "human", "tiger", "zebra"];
    var animationURL = [];
    var gifURL = [];

    renderButtons();

    // Function for dumping the JSON content for each button into the div
    function calculateMovieInfo(data) {

        event.preventDefault();
        for (index = 0; index < 10; index++) {
            animationURL[index]=(data.data[index].images.original_still.url);
            gifURL[index]=(data.data[index].images.original.url);
        }
        console.log("success got data images", animationURL);
        console.log("success got data gifs", gifURL);
    }

    function displayAnimations() {
        var name = $(this).attr("data-name");
        var getAnimations = $.get("https://api.giphy.com/v1/gifs/search?q=" + name + "&api_key=b3d3b1b7595041b088718a0cc64b8d63&limit=10");
        getAnimations.done(function(data) {
            calculateMovieInfo(data);
            for (index = 0; index < 10; index++) {
              $("#animations").append("<div class='images' name='" + index + "'><img src='" + animationURL[index] + "'/></div>");
            }   
        });   
    }

    $(document).on('click', ".images", function(){
      $(this).removeClass('images');
      $(this).addClass('gifs');
      $(this).html("<img src='" + gifURL[parseInt($(this).attr("name"))] + "'/>");
    });
    $(document).on('click', ".gifs", function(){
      $(this).removeClass('gifs');
      $(this).addClass('images');
      $(this).html("<img src='" + animationURL[parseInt($(this).attr("name"))] + "'/>");
    });


    function renderButtons() {

        // Deleting the buttons prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();

        // Looping through the array of movies
        for (var i = 0; i < movies.length; i++) {

            // Then dynamicaly generating buttons for each movie in the array
            // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
            var a = $("<button>");
            // Adding a class of movie to our button
            a.addClass("movie");
            // Adding a data-attribute
            a.attr("data-name", movies[i]);
            // Providing the initial button text
            a.text(movies[i]);
            // Adding the button to the buttons-view div
            $("#buttons-view").append(a);
        }
    }

    // This function handles events where one button is clicked
    $("#add-movie").on("click", function(event) {
        event.preventDefault();
        var movie = $("#movie-input").val().trim();
        movie = movie.split(' ').join('+');

        // The movie from the textbox is then added to our array
        movies.push(movie);

        // Calling renderButtons which handles the processing of our movie array
        renderButtons();

        // displayMovieInfo(getAnimations);
    });

    // Generic function for displaying the movieInfo

    // $("#").click(displayAnimations);
    $(document).on('click', '.movie', displayAnimations);


    // Calling the renderButtons function to display the intial buttons
    renderButtons();
});
