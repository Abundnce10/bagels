

$(document).ready(function() {

	// Establish variables //
	var answer = Math.floor(Math.random() * 9000 + 1000);
	var guesses = 0;
	var responses = "Blank blank";

	var exact = "Fermi";
	var similar = "Pica";

	// Notify user of how their guess compares to the answer
	function addToHistory(response) {

		html_response = "<p class='response'>" + response + "</p>";

		$('#history').append(html_response);

	}


	// Determine whether the guess was correct
	function guessCorrect(guess, answer) {

		// convert to Strings
		var g = guess.toString().split('');
		var a = answer.toString().split('');

		var response = guess.toString() + ": ";
		var counter_exact = 0;
		var counter_similar = 0;

		// check digits for exact matches
		for (i = 0; i < g.length; i++) {
	
			if (g[i] === a[i]) {
				
				response += (exact + " ");
				counter_exact += 1;
				g[i] = "x";
				a[i] = "y";

			}

		}

		// check for a correct guess
		if (counter_exact === 4) {
			alert("You won!\nIt took you " + guesses.toString() + " guesses.\nNice job!")

		// provide button to start a new game

		/////////////////////////////////////
		}

		// check for correct numbers in wrong order
		for (i = 0; i < g.length; i++) {

			for (j = 0; j < a.length; j++) {

				if (g[i] === a[j]) {

					response += (similar + " ");
					counter_similar += 1;
					g[i] = "x";
					a[j] = "y";

				}

			}	

		}

		// if everything is wrong
		if (counter_exact === 0 && counter_similar === 0) {

			response += "Bagels";

		}
		

		// return response
		return response;

	}


	// when user submits a guess
	$('#submit').click(function(e) {

		// prevent page from reloading
		e.preventDefault();

		// convert guess to number
		var guess = parseInt($(':text').val());

		// remove guess from input field
		$('#guess').val("");

		// verify
		if (guess >= 1000 && guess <= 9999) {

			// increment guess counter
			guesses += 1;

			// determine whether guess was correct
			var response = guessCorrect(guess, answer);

			// call addToHistory function
			addToHistory(response);

		} else {

			alert("Please provide a 4-digit number within the range of 1000 and 9999");

		}

		// console.log
		//console.log("Answer: " + answer.toString());



	});

});




/*

// Establish variables //
var answer = Math.floor(Math.random() * 9000 + 1000);
var play = prompt("Do you want to play the Picca Picca game? (Y/N)").toLowerCase();

var guesses = [];
var responses = "";

var exact = "Picca ";
var similar = "Fermi ";

var low_range = 1000;
var high_range = 9999;

var guess_prompt = "The secret number lies between 1000 and 9999. Take a guess";


///// Guess Loop /////
while (play.charAt(0) === "y") {

	// convert guess into integer
	var guess = parseInt(prompt(guess_prompt.concat(responses)),10);

	// validate guess was integer within range
	if (typeof guess === "number" && guess >= 1000 && guess <= 9999) {
		
		var temp_resp = guess.toString();
		var counter_exact = 0;
		var counter_similar = 0;

		// check digits for exact matches
		for (i = 0; i < 4; i++) {
	
			if (guess[i] === answer[i]) {
				
				temp_resp.concat(exact);
				counter_exact += 1;

			}

		}

		// check for correct guess
		if (counter_exact === answer.length) {

			alert("You won!");
			play = "Finished";

		}

		// check for correct numbers in wrong order
		for (i = 0; i < 4; i++) {

			for (j = 0; j < 4; j++) {

				if (guess[i] === answer[j]) {

					temp_resp.concat(similar);
					counter_similar += 1;

				}

			}	

		}

		temp_resp.concat("\n Guessssss");
		responses.concat(temp_resp);



	
	}


}

*/