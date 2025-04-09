document.addEventListener('DOMContentLoaded', () => {
	let initInteraction = () => {
		let resultModal = document.getElementById('resultModal');
		// If modal is the better option for the error state (below)
		// let errorModal = document.getElementById('errorModal');
		let errorMessage = document.getElementById('error-message');
		let calculateButton = document.getElementById('calculateBtn');

		let closeButtons = document.querySelectorAll('.close-btn');

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
			// isNaN(price) to check if a value is not a number
			// Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/isNaN

			// If modal is the better option for the error state (below)
			// if (!price || isNaN(price) || price <= 0) {
			// 	document.getElementById('error-message').textContent = 'Please enter a valid price.';
			// 	errorModal.showModal();
			// 	return;
			// }

			if (price < benchmark) {
				errorMessage.textContent = `Your price is too low for this item. Enter at least $${benchmark}.`;
				return;
			}

			// If modal is the better option for the error state (below)
			// if (price < benchmark) {
			// 	document.getElementById('error-message').textContent = `Your price is too low for this item. Please enter a higher amount (at least $${benchmark}).`;
			// 	errorModal.showModal();
			// 	return;
			// }
			
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