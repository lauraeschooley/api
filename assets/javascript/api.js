$(document).ready(function () {

    var topics = ["Big Bang Theory", "Friends", "Hell's Kitchen", "Superstore", "Grey's Anatomy", "This is Us", "Masterchef", "NCIS", "Ellen's Game of Games"];

    function buttonRender() {

        $("#buttonsDiv").empty();

        for (var i = 0; i < topics.length; i++) {

            var buttonDiv = $("<button>");

            buttonDiv.addClass("newButton");

            buttonDiv.text(topics[i]);

            buttonDiv.attr("data-show", topics[i]);

            console.log(topics);

            $("#buttonsDiv").append(buttonDiv);

    
        }

    };

    $(document).on("click", ".newButton", function () {

        var show = $(this).attr("data-show");

        var apiUrl = "https://api.giphy.com/v1/gifs/search?q=" + show + "&api_key=IxgigUz8rbK554ocMJWW0e2o70pqWQjz&limit=10";

        $.ajax({
            url: apiUrl,
            method: "GET"
        }).then(function (response) {
            console.log(response);

            var results = response.data;

            $("#gifArea").empty();

            for (var i = 0; i < results.length; i++) {

                var imgDiv = $("<div>");

                var gifImg = $("<img>");

                gifImg.addClass("gif");

                gifImg.attr("src", results[i].images.fixed_height.url);

                gifImg.attr("data-still", results[i].images.fixed_height_still.url);

                gifImg.attr("data-animate", results[i].images.fixed_height.url);

                gifImg.attr("data-state", "animate");


                var ratingDiv = $("<p>");

                ratingDiv.text("Rating: " + results[i].rating);

                imgDiv.append(gifImg);

                imgDiv.append(ratingDiv);

                $("#gifArea").append(imgDiv);

               // createButton();

            };

        })

    });

    $(document).on("click", ".gif", function () {
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        var state = $(this).attr("data-state");
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });


    function createButton() {
        var searchButton = $("<button>"); 

        searchButton.addClass("searchShowButton");

        var newButton = $("#searchBox").val();

        console.log(newButton);

        topics.push(newButton);


        $("#buttonsDiv").empty();
        
        console.log(topics);
        buttonRender();


    }

    $( "#search" ).on("click", function(e) {

        e.preventDefault();

        createButton(); 
       
      });

   


    buttonRender();

});