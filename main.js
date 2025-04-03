document.addEventListener('DOMContentLoaded', () => {
	let initInteraction = () => {
		let resultModal = document.getElementById('resultModal');
		let errorModal = document.getElementById('errorModal');
		let calculateButton = document.getElementById('calculateBtn');

		let closeButtons = document.querySelectorAll('.close-btn');

		calculateButton.onclick = () => {
				const price = document.getElementById('price').value;
				const benchmark = parseFloat(document.getElementById('benchmark').value);
				const resultBox = document.getElementById('result-box');
				resultBox.innerHTML = '';
			
			if (!price || isNaN(price) || price <= 0) {
				document.getElementById('error-message').textContent = 'Please enter a valid price.';
				errorModal.showModal();
				return;
			}

			if (price < benchmark) {
				document.getElementById('error-message').textContent = `Your price is too low for this item. Please enter a higher amount (at least $${benchmark}).`;
				errorModal.showModal();
				return;
			}

			resultBox.innerHTML = `You can buy ${Math.floor(price / benchmark)} items.`;
				resultModal.showModal();
		};
		// Used template literals (backticks `) for string interpolation

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