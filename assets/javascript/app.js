// Overall goal for code below:
// display buttons of animals
// is user adds an animal in text box, then new button is added for that animal
// clicking on a button will bring in 10 giphs of that animal
// giphs displayed on page will be still images
// when user clicks on still image, the image will animate
// when user clicks on animated image, it will go back to a still image


$(document).ready(function(){

// create an array of animal names for initial button content on page
var animals = ["cat", "dog", "chicken", "cow", "pig", "canary", "peacock", "goat", "horse", "crab"];



function renderButtons () {
	$("#animalButtons").empty();
	for (var i = 0; i < animals.length; i++) {
		var a = $("<button>");
		a.addClass("animals");
		a.attr("data-name", animals[i]);
		a.text(animals[i]);
		$("#animalButtons").append(a);
		console.log(a);
	}
}

// // testing on click event to see if anything happens when clicking rendered buttons
// function alertAnimalName() {
// 	var animalName = $(this).attr("data-name");
// 	alert(animalName);
// }
// $(document).on("click", ".animals", alertAnimalName);

// upon clicking of button, call to giphy api is made and then retuns results to page
// this is not working below, but I did get it to work in class exercises 
$("button").on("click", function(){
	var animalName = $(this).attr("data-name");
	console.log(animalName);

	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +animalName+"&api_key=MzRMOL6VCOPWmGq3DnuBMaCmRmfI9nDH&limit=10";
	console.log(queryURL);

	$.ajax({url:queryURL, method: "GET"})
	.done(function(response){
		console.log(response);
		for (var j = 0; j < response.data.length; i++) {
			var animalDiv = $("<div>");
			var p = $("<p>").text("Rating: "+response.data[j].rating);
			var animalImage = $("<img>");
			animalImage.attr("src", response.data[j].images.fixed_height.url);
			animalDiv.append(p);
			animalDiv.append(animalImage);
			$("#add-animals").prepend(animalDiv);
		}
	})
})

// below is when user adds a new animal and clicks submit,
// a new button for the animal input will render a new button and 
// also be added to the animals array
$("#addAnimal").on("click", function(event){
	event.preventDefault();
	var animal = $("#animal-input").val().trim();
	console.log("New animal button added = " + animal);
	animals.push(animal);
	renderButtons();
});

// need to change the state of image from still to animated and back again when user clicks on image
// I had gotten this to work with a class exercise, and it should be the same logic here
// although, I'm not sure how to get multiple versions of the same image from giphy (still vs animated)
// code from class exercise
// <body>
//   <img src="https://media1.giphy.com/media/3o85xkQpyMlnBkpB9C/200_s.gif" data-still="https://media1.giphy.com/media/3o85xkQpyMlnBkpB9C/200_s.gif" data-animate="https://media1.giphy.com/media/3o85xkQpyMlnBkpB9C/200.gif" data-state="still" class="gif">
//   <img src="https://media2.giphy.com/media/8rFQp4kHXJ0gU/200_s.gif" data-still="https://media2.giphy.com/media/8rFQp4kHXJ0gU/200_s.gif" data-animate="https://media2.giphy.com/media/8rFQp4kHXJ0gU/200.gif" data-state="still" class="gif">
//   <img src="https://media3.giphy.com/media/W6LbnBigDe4ZG/200_s.gif" data-still="https://media3.giphy.com/media/W6LbnBigDe4ZG/200_s.gif" data-animate="https://media3.giphy.com/media/W6LbnBigDe4ZG/200.gif" data-state="still" class="gif">
//   <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
//   <script type="text/javascript">
// </body>  

// $(".gif").on("click", function() {
//       // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
//       var state = $(this).attr("data-state");
//       // If the clicked image's state is still, update its src attribute to what its data-animate value is.
//       // Then, set the image's data-state to animate
//       // Else set src to the data-still value
//       if (state === "still") {
//         $(this).attr("src", $(this).attr("data-animate"));
//         $(this).attr("data-state", "animate");
//       } else {
//         $(this).attr("src", $(this).attr("data-still"));
//         $(this).attr("data-state", "still");
//       }
//     });


renderButtons();


























});