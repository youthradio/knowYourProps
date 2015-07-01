$("body").on("click", '#query', function(e){
  e.preventDefault()
  var address = $("#street_number").val() + " " +  $("#street").val() + " " + $("#city").val() + " " + $("#state").val()
  $("#results").empty()
  lookup(address);
})

function lookup(address) {
  var el = $('#results');
  $.ajax({
      url: "https://www.googleapis.com/civicinfo/v2/voterinfo?address=" + address + "&electionId=4100&fields=pollingLocations&key=AIzaSyBTp6cKpC72dHC6vwrtAdXvfOjSq1j8GIM"
  }).done(function(data){
      var polling_location = data.pollingLocations
    if (typeof polling_location == "undefined"){
      $('#results').html('<span class="round alert label">No data available for this address at this time. Try again later.</span>');
    }else{
      var el = $('#results');
      var html = new EJS({url: "https://youthradio.org/innovationlab/knowyourprops/js/templates/polling_loc.ejs"}).render(polling_location[0]);
      el.append(html)
    }
  }).error(function(e){
     el.append('<span class="round alert label">Error while trying to fetch polling place</span>');
  })
}
