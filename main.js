document.addEventListener('DOMContentLoaded', () => {
	let initInteraction = () => {
		let modal = document.getElementById('resultModal');
		let openButton = document.getElementById('calculateBtn');
		let resultBox = document.getElementById('result-box');
		let closeButton = modal.querySelector('.close-btn');
	
		openButton.onclick = () => {
			calculate(); // calculation before opening the modal
			modal.showModal();
		};

		closeButton.onclick = () => {
			modal.close();
		};

		modal.onclick = (event) => {
			if (event.target === modal) {
				modal.close();
			}
		};
	};

// Calculate function
let calculate= () => {
	// Get the input values
	let price = document.getElementById('price').value;
	let benchmarkSelect = document.getElementById('benchmark');
	let benchmark = parseFloat(benchmarkSelect.value);
	let icon = benchmarkSelect.options[benchmarkSelect.selectedIndex].getAttribute('data-icon');

	let resultBox = document.getElementById('result-box');
	resultBox.innerHTML = '';  // Clear previous results
	resultBox.classList.remove('empty-state');

	// Validation
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/isNaN 
	// Used isNaN() to check if the user input for the price is a valid number
	if (!price || isNaN(price) || price <= 0) {
		resultBox.textContent = 'Please enter a valid price.';
		return;
	}

	if (price < benchmark) {
		resultBox.textContent = `Your price is too low for this item. Please enter a higher amount (at least $${benchmark}).`;
		return;
	}
	// Used template literals (backticks `) for string interpolation

	let quantity = Math.floor(price / benchmark); // Calculate the number of items
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/floor
	// I used Math.floor() to calculate how many times the benchmark price fits into the entered amount. Math.floor() rounds down the number to the nearest integer, ensuring we get a whole number that represents the quantity of the benchmark item.
	
	// Display the quantity and icons
	// Currently using emojis but in the future will add illustrations (svg or png?)
	let iconsHtml = icon.repeat(quantity);
	resultBox.innerHTML = `<span>Quantity: ${quantity}</span><br><span>${iconsHtml}</span>`;	
	};

initInteraction();
});

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for
// Used for loop to generate the right number of icons based on the calculated quantity, and then used innerHTML to display those icons in the result box
