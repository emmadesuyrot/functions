document.addEventListener('DOMContentLoaded', () => {
	let initInteraction = () => {
		let resultModal = document.getElementById('resultModal');
		// If modal is the better option for the error state (below)
		// let errorModal = document.getElementById('errorModal');
		let errorMessage = document.getElementById('error-message');
		let calculateButton = document.getElementById('calculateBtn');
		let closeButtons = document.querySelectorAll('.close-btn');
		const priceInput = document.getElementById('price');
		const benchmarkSelect = document.getElementById('benchmark');
		const tryAgainBtn = document.getElementById('tryAgainBtn');

		if (tryAgainBtn) {
			tryAgainBtn.addEventListener('click', () => {
				resultModal.close();

				// Reset input and select
				// Setting it to an empty string (''), to reset the input fields, so that there are no leftover data
				priceInput.value = '';
				benchmarkSelect.value = '';

				// Disable calculate button + benchmark select again
				benchmarkSelect.disabled = true;
				calculateButton.disabled = true;
			});
			}

		// inputt must be added in order to choose benchmark and calculate total
		// using parseFloat to turn string into a number 
		// Source: https://developer.mozilla.org/en-US/docs/Web/API/Element/input_event
		const benchmarkLabel = document.querySelector('.benchmark-title');	
		priceInput.addEventListener('input', () => {
			const price = parseFloat(priceInput.value);
			if (!isNaN(price) && price > 0) {
				benchmarkSelect.disabled = false;
				benchmarkLabel.classList.remove('disabled'); // /benchmark-title ref

			} else {
				benchmarkSelect.disabled = true;
				calculateButton.disabled = true;
				benchmarkLabel.classList.add('disabled');
			}
		});

		// Adding the Select Benchmark as the default and disable the calculateButton 
		benchmarkSelect.addEventListener('change', () => {
			if (benchmarkSelect.value !== "") {
				calculateButton.disabled = false;
			} else {
				calculateButton.disabled = true;
			}
		});

		// Once benchmark is selected user can click/tap calculate
		benchmarkSelect.addEventListener('change', () => {
			if (benchmarkSelect.value) {
				calculateButton.disabled = false;
			} else {
				calculateButton.disabled = true;
			}
		});


		calculateButton.onclick = () => {
				const price = document.getElementById('price').value;
				const benchmarkSelect = document.getElementById('benchmark');
				const benchmark = parseFloat(benchmarkSelect.value);
				// parseFloat() to converts string input into a number
				// Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseFloat
				const selectedOption = benchmarkSelect.options[benchmarkSelect.selectedIndex];
				const icon = selectedOption.getAttribute('data-icon');
				// getAttribute to retrieve values from HTML attributes
				// Source: https://developer.mozilla.org/en-US/docs/Web/API/Element/getAttribute
				const itemName = selectedOption.textContent;
				const resultBox = document.getElementById('result-box');
				const itemTitle = selectedOption.getAttribute('title');
				resultBox.innerHTML = '';

			// if price is less than or half 
			if (price < benchmark && price > 0) {
				const percentage = Math.floor((price / benchmark) * 100);
				const selectedOption = benchmarkSelect.options[benchmarkSelect.selectedIndex];
				const itemName = selectedOption.textContent;
				const icon = selectedOption.getAttribute('data-icon');
				const itemTitle = selectedOption.getAttribute('title');
			
				// personal modal message 
				// Used 'switch' to check if the price is less than the benchmark and display a specific message based on the selected benchmark
				// source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch
				let message = '';
				let partialMessage = '';
				switch (benchmark) {
					case 3:
						message = `Your wallet’s too slow for this metro ride 🚇💔`;
						partialMessage = `You can afford <strong>${percentage}%</strong> enjoy the rats, not the ride 🚇🐀`;
						break;
					case 3.50:
						message = `Your wallet’s still stuck in the bus lane, not the bike lane 🚲💸`;
						partialMessage = `You can afford <strong>${percentage}%</strong> hope your feet are ready for this ‘luxury walk’ 🚶‍♂️👟`;
						break;
					case 5:
						message = `Babe, your wallet’s too sleepy for this coffee ☕️💸`;
						partialMessage = `You’re <strong>${percentage}%</strong> closer to this coffee, hope you like the lid ☕️🖤`;
						break;
					case 10:
						message = `Math says no, but emotionally, you’ve totally got this beer 🍺🧮`;
						partialMessage = `You’re <strong>${percentage}%</strong> closer to the beer, enjoy the empty glass 🍺🍻`;
						break;
					case 12:
						message = `Your budget's too mild for this chipotle bowl 🌯🔥`;
						partialMessage = `Congrats, you’ve got <strong>${percentage}%</strong> of the chipotle bowl! Enjoy the lettuce...`;
						break;
					case 15:
						message = `Your wallet’s not sized right for this Uniqlo mini t-shirt 👕💔`;
						partialMessage = `You've got <strong>${percentage}%</strong> of the Uniqlo mini t-shirt—just the label for now 👕🔖`;
						break;
					case 20:
						message = `Oops, Your Wallet's Too Sober for This Cocktail 🍹💸`;
						partialMessage = `You can afford about <strong>${percentage}%</strong> of it. Guess it’s just a sip 🍹💸`;
						break;
					case 80:
						message = `When you’re all about courtside dreams, but not courtside funds 🏀💔`;
						partialMessage = `You've got <strong>${percentage}%</strong> of the ticket... Guess that’s a VIP view of the parking lot 🏀🚗`;
						break;
					case 500:
						message = `When your dreams are big, but your wallet’s tiny 🚁💔`;
						partialMessage = `You can afford about <strong>${percentage}%</strong> of it, but if you wait long enough, some billionaire will offer you a ride to “network” 🚁💸`;
						break;
					default:
						message = `You can’t fully afford this item ${icon} ${itemName}.`;
						partialMessage = `You can afford about <strong>${percentage}%</strong> of it.`;
				}
			
				// result
				// removed message for now <p>${message}</p> might not be needed
				resultBox.innerHTML = `
					
					<p>${partialMessage}</p>
				`;
				
				resultModal.showModal();
				return;
			}
			
			// quantity calculation
			const quantity = Math.floor(price / benchmark);

			let iconsDisplay = quantity <= 10 ? icon.repeat(quantity) : ''; 
			// to repeat a string (icon) based on a number
			// Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/repeat
			let resultText = `You can buy <strong>${quantity}</strong> ${icon} ${itemName}.`;
			// ${} to insert them into a sentence
			if (itemTitle) {
				resultText += `<br><em class="item-title">(${itemTitle})</em>`;
			}

			resultBox.innerHTML = `
				<p>${resultText}</p>
				<p class="icons">${iconsDisplay}</p>
			`;

		resultModal.showModal();
	};
		// Used template literals (backticks `) for string interpolation
		// Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals

		closeButtons.forEach(button => {
			button.onclick = () => {
				button.closest('dialog').close();
			};
		});

		document.querySelectorAll('dialog').forEach(modal => {
			modal.onclick = (event) => {
				if (event.target === modal) {
					modal.close();
				}
			};
		});
	};

	initInteraction();
});

document.addEventListener('DOMContentLoaded', () => {
	let initInteraction = () => {
		// Modal
		let infoModal = document.getElementById('infoModal');
		let infoBtn = document.getElementById('infoBtn');
		let closeButtons = document.querySelectorAll('.close-btn');

		// Info button click event to open modal
		// similar to previous modal but modal contains info from <dialog id="infoModal" class="modal">
		infoBtn.onclick = () => {
			infoModal.showModal();
		};

		closeButtons.forEach(button => {
			button.onclick = () => {
				button.closest('dialog').close();
			};
		});

		// close modal when clicking outside the modal
		document.querySelectorAll('dialog').forEach(modal => {
			modal.onclick = (event) => {
				if (event.target === modal) {
					modal.close();
 				}
			};
		});
	};

	initInteraction();
});