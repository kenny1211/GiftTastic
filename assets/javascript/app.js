// initial topics array
var topics = ["Rick and Morty", "Spongebob", "Adventure Time", "Futurama", "Archer", "Mike Tyson Mysteries"]

// create buttons for topics
function renderButtons() {

  $("#buttons-view").empty();

  for (var i = 0; i < topics.length; i++) {
    var button = $("<button>");

    button
      .addClass("topic-button btn btn-light my-1 mx-1")
      .text(topics[i])
      .attr("data-name", topics[i]);

    $("#buttons-view").prepend(button);

  }
}

// when user submits a topic, add a buttton
$("#topic-submit").on("click", function (event) {

  event.preventDefault();
  var newTopic = $("#topic-input").val().trim();
  topics.push(newTopic);

  renderButtons();
});

// start page off with topics in the array
renderButtons();

// giphy ajax to display gifs

function displayGif() {

  var topic = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=wnzJLmU6k26dNhx3iyrjaHVglKHxEmQb&limit=10";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);

    // loop through response and print gifs to HTML
    var response = response.data;

    for (var i = 0; i < response.length; i++) {

     
      var divGif = $("<div>");
      var stillGif =response[i].images.fixed_height_still.url;
      var aniGif = response[i].images.fixed_height.url;
      var rating = "<div class='ratings'>Rated: " + response[i].rating + "</div";
      var img = $("<img>");

      img
        .addClass("gif")
        .attr("src", stillGif)
        .attr("data-still", stillGif)
        .attr("data-animate", aniGif)
        .attr("data-state", "still");

      divGif.append(img, rating);
      
      $("#gif-view").prepend(divGif);

    };

// animate gifs on click, vice versa
    $(".gif").on("click", function() {
   
      var state = $(this).attr("data-state");
     
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });

  });

}

// bind click event to buttons to display gifs
$(document).on("click", ".topic-button", displayGif);