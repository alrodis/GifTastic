// Overall goal for code below:
// -Display buttons of animals
// -If user adds an animal via text box, then new button is added for that animal
// -Clicking on a button will bring in 10 giphs of that animal
// -Giphs displayed on page will be still images
// -When user clicks on still image, the image will animate
// -When user clicks on animated image, it will go back to a still image
$(document).ready(function(){

// create an array of animal names for initial button content on page
var animals = ["cat", "dog", "chicken", "cow", "pig", "beaver", "peacock", "goat", "horse", "crab"];

//function to render buttons on the page based upon animals in the array
function renderButtons () {

	$("#animalButtons").empty();
	for (var i = 0; i < animals.length; i++) {
		var a = $("<button>");
		a.addClass("animals");
		// a.addClass("btn-group btn-group-lg");
		a.attr("data-name", animals[i]);
		a.text(animals[i]);
		$("#animalButtons").append(a);
		//console.log(a);
	

		// in the intial building process...below is a test of an on click event to see if anything happens when clicking rendered buttons
		// function alertAnimalName() {
		// 	var animalName = $(this).attr("data-name");
		// 	alert(animalName);
		// }
		// $(document).on("click", ".animals", alertAnimalName);

		// Upon clicking of animal button, call to giphy api is made, which then retuns results to the html page
		a.on("click", function(){
			$("#add-animals").empty();
			console.log("animal button click successful!");
			//pretty sure something is up with this line below, on click does not work
			// tried var animalName = $(this).data("name"); which doesn't work either
			var animalName = $(this).attr("data-name");
			console.log(animalName);

			var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +animalName+"&api_key=MzRMOL6VCOPWmGq3DnuBMaCmRmfI9nDH&limit=10";
			console.log(queryURL);

			$.ajax({url:queryURL, method: "GET"})
			.done(function(response){
				console.log(response);
				for (var j = 0; j < response.data.length; j++) {
					var animalDiv = $("<div>");
					var p = $("<p>").text("Rating: "+response.data[j].rating);
					var animalImage = $("<img>");
					animalImage.addClass("gif");
					animalImage.attr("src", response.data[j].images.fixed_height_still.url);
					var still = response.data[j].images.fixed_height.url
					var animate = response.data[j].images.fixed_height_still.url
					animalImage.attr("data-still", still);
					animalImage.attr("data-animate", animate);
					animalImage.attr("data-state", "still");
					animalDiv.append(p);
					animalDiv.append(animalImage);
					// $("#add-animals").empty();
					$("#add-animals").prepend(animalDiv);

			$(".gif").on("click", function() {
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

				}
			})
		})
	}
}


//when user adds a new animal, this function will render a new button and push that new animal to the array
$("#addAnimal").on("click", function(event){
	event.preventDefault();
	var animal = $("#animal-input").val().trim();
	console.log("New animal button added = " + animal);
	animals.push(animal);
	renderButtons();
});

renderButtons();

});