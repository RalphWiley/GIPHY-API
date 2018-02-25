$(document).ready(function() {

  var tvShow = ['South Park', 'Adventure Time', 'Gravity Falls', 'Archer', 'The Simpsons', 'Family Guy', 'Futurama', 'Animaniacs', 'Scooby-Doo', 'Robot Chicken', 'Dragonball Z', 'Rick and Morty'];
  var apiKey = '&api_key=QXo3379NXV9n5vKQ8dx1awsJBHiMgJVQ';

  function renderButtons() {
    $('#TVbuttons').empty();
    for (var i = 0; i < tvShow.length; i++) {
      var buttons = $('<button>');
      buttons.addClass('btn btn-primary character-btn mr-1 mb-1');
      buttons.attr({
        'data-name': tvShow[i],
        type: 'button'
      });
      buttons.text(tvShow[i]);
      $('#TVbuttons').append(buttons);
    }
  }

  // function to call the api whenever button is clicked
  function displayTVGifs() {
    $('#shows').empty();
    // console.log('one');
    var animatedTV = $(this).attr('data-name');
    var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + animatedTV + apiKey + '&limit=10';

    $.ajax({
      url: queryURL,
      method: 'GET'
    }).then(function(response) {
      console.log(response);
      var results = response.data
      for (var i = 0; i < results.length; i++) {

        var imageURL = response.data[i].images.fixed_height_still.url;
        var imageStill = response.data[i].images.fixed_height_still.url;
        var imageAnimate = response.data[i].images.fixed_height.url;
        var rating = response.data[i].rating;

        var newDiv = $('<div>');
        var ratingP = $('<span>');
        ratingP.addClass('caption');
        ratingP.text('Rating: ' + rating);
        var charImage = $('<img>');
        charImage.attr({
          'src': imageURL,
          'alt': 'TV Show',
          'data-still': imageStill,
          'data-animate': imageAnimate,
          'data-state': 'still'
        });
        charImage.addClass('mr-2 gif');
        newDiv.addClass('item mr-1 mt-1');

        newDiv.append(charImage);
        newDiv.append(ratingP)
        $('#shows').append(newDiv);
      }
    });
  }


  $('#addShow').on('click', function(event) {
    event.preventDefault();
    var tv = $('#showInput').val().trim();
    console.log(tv);
    if (tv.length > 0) {
      tvShow.push(tv);
      renderButtons();

    };
  });


  $(document).on('click', '.character-btn', displayTVGifs);


  $(document).on('click', '.gif', function() {

    var state = $(this).attr('data-state');
    if (state === 'still') {
      $(this).attr('src', $(this).attr('data-animate'));
      $(this).attr('data-state', 'animate');
    } else {
      $(this).attr('src', $(this).attr('data-still'));
      $(this).attr('data-state', 'still');
    }
  });


  renderButtons();
});
