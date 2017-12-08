var budgetController = (function () {

	// TODO

})();

var viewController = (function () {

	// TODO

})();

var appController = (function (budgetCtrl, viewCtrl) {

	var kv_add_item = function () {
		// Get the input data
		// Add data to budgetController
		// Add data to viewController
		// Calculate
		// Display the result to the view
		console.log('Item was added successfully!');
	};

	document.querySelector('.add_button').addEventListener('click', kv_add_item);

	document.addEventListener('keypress', function (e) {
		if (e.keyCode === 13 || e.which === 13) {
			kv_add_item();
		}
	});

})(budgetController, viewController);
