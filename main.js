document.addEventListener('DOMContentLoaded', () => {
	// The button elements
	const calculateButton = document.getElementById('calculateBtn');
	const resetButton = document.getElementById('resetBtn');
	// https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById
	// Used document.getElementById() to access the HTML elements by their id

	// Attach event listeners
	calculateButton.addEventListener('click', calculate);
	resetButton.addEventListener('click', resetForm);
	// Wrapped the event listener attachment inside the DOMContentLoaded event so that the JavaScript code runs only after the DOM has fully loaded
});

// Calculate function
function calculate() {
	// Get the input values
	const price = document.getElementById('price').value;
	const benchmarkSelect = document.getElementById('benchmark');
	const benchmark = parseFloat(benchmarkSelect.value);
	const icon = benchmarkSelect.options[benchmarkSelect.selectedIndex].getAttribute('data-icon');

	const resultBox = document.getElementById('result-box');
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

	// I used innerHTML to dynamically update the contents of the result box

	const quantity = Math.floor(price / benchmark); // Calculate the number of items
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/floor
	// I used Math.floor() to calculate how many times the benchmark price fits into the entered amount. Math.floor() rounds down the number to the nearest integer, ensuring we get a whole number that represents the quantity of the benchmark item.
	
	// Display the quantity and icons
	// Currently using emojis but in the future will add illustrations (svg or png?)
	const iconsHtml = icon.repeat(quantity);
	resultBox.innerHTML = `<span>Quantity: ${quantity}</span><br><span>${iconsHtml}</span>`;
}
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for
// Used for loop to generate the right number of icons based on the calculated quantity, and then used innerHTML to display those icons in the result box

// Reset form inputs and result display
function resetForm() {
	document.getElementById('price').value = '';
	document.getElementById('benchmark').selectedIndex = 0;
	document.getElementById('result-box').innerHTML = '';
}
// For the reset functionality, I used the resetForm() function to clear the input fields and reset the result box. Unsure whether if it should be this <button onclick="resetForm()">Reset</button> or not?