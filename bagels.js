
$(document).ready(function() {

	// Show game options
	$("#wrapper").hide();
	$("#difficulty").show();

	// User chooses a difficulty level
	$(".difficulty").click(function() {

		var difficulty = $(this).html();

		// Hide buttons and show game layout
		$("#difficulty").hide();
		$("#wrapper").show();

		// Begin game loop, use difficulty as param
		game(difficulty);

	})


	// Game Loop
	function game(difficulty_level) {

		// Establish difficulty-specific variables
		// EASY
		if (difficulty_level === "Easy") {
			var answer = Math.floor(Math.random() * 900 + 100);
			var min_range = 100;
			var max_range = 999;
			var error_msg = "Please provide an integer within the range of "+min_range+" and "+max_range+" (inclusive)";
			$('#wrapper').prepend("<h3>The secret number lies between "+min_range+" and "+max_range+". Take a guess!</h3>");

			// MEDIUM
		} else if (difficulty_level === "Medium") {
			var answer = Math.floor(Math.random() * 9000 + 1000);
			var min_range = 1000;
			var max_range = 9999;
			var error_msg = "Please provide an integer within the range of "+min_range+" and "+max_range+" (inclusive)";
			$('#wrapper').prepend("<h3>The secret number lies between "+min_range+" and "+max_range+". Take a guess!</h3>");

			// Hard
		} else {
			var answer = Math.floor(Math.random() * 90000 + 10000);
			var min_range = 10000;
			var max_range = 99999;
			var error_msg = "Please provide an integer within the range of "+min_range+" and "+max_range+" (inclusive)";
			$('#wrapper').prepend("<h3>The secret number lies between "+min_range+" and "+max_range+". Take a guess!</h3>");
		}

		//Establish remainding variables
		var guesses = 0;
		var exact = "Fermi";
		var similar = "Pica";


		// Notify user of how their guess compares to the answer
		function addToHistory(response) {
			html_response = "<p class='response'>" + response + "</p>";
			$('#history').prepend(html_response);
		}


		// Determine whether the guess was correct
		function guessCorrect(guess, answer) {

			// convert to Strings
			var g = guess.toString().split('');
			var a = answer.toString().split('');
			var length = g.length;

			var response = guess.toString() + ": ";
			var counter_exact = 0;
			var counter_similar = 0;

			// check digits for exact matches
			// if correct, remove from array
			for (i = 0; i < length; i++) {	
				if (g[i] === a[i]) {					
					response += (exact + " ");
					counter_exact += 1;
					g[i] = "x";
					a[i] = "y";
				}
			}


			// check for a correct guess
			if (counter_exact === length) {
				alert("You won!\nIt took you " + guesses.toString() + " guesses.\nNice job!")
			// provide button to start a new game

			/////////////////////////////////////
			}


			// check for correct numbers in wrong order
			// use array length since some numbers may have been guessed correctly
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
			if (guess >= min_range && guess <= max_range) {

				// increment guess counter
				guesses += 1;

				// determine whether guess was correct
				var response = guessCorrect(guess, answer);

				// call addToHistory function
				addToHistory(response);

			} else {

				alert(error_msg);

			}


		});

	}


});
