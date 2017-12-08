var budgetController = (function () {

	// TODO

})();

var viewController = (function () {

	// TODO

})();

var appController = (function (budgetCtrl, viewCtrl) {

	document.querySelector('.add_button').addEventListener('click', function () {
		// Get the input data
		// Add data to budgetController
		// Add data to viewController
		// Calculate
		// Display the result to the view
		console.log('Button was clicked!');
	});

	document.addEventListener('keypress', function (e) {
		if (e.keyCode === 13 || e.which === 13) {
			console.log('You hit Enter key!');
		} else {
			console.log('Please hit Enter key!');
		}
	});

})(budgetController, viewController);
