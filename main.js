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

		// inputt must be added in order to choose benchmark and calculate total
		// using parseFloat to turn string into a number 
		// Source: https://developer.mozilla.org/en-US/docs/Web/API/Element/input_event
		priceInput.addEventListener('input', () => {
			const price = parseFloat(priceInput.value);
			if (!isNaN(price) && price > 0) {
				benchmarkSelect.disabled = false;
			} else {
				benchmarkSelect.disabled = true;
				calculateButton.disabled = true;
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

				errorMessage.textContent = '';
			
			if (!price || isNaN(price) || price <= 0) {
				errorMessage.textContent = 'Please enter a valid price.';
				return;
 			}

			if (price < benchmark) {
				errorMessage.textContent = `Your price is too low for this item. Enter at least $${benchmark}.`;
				return;
			}
			
			// Quantity calculation
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