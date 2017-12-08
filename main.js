var budgetController = (function () {

	// TODO

})();

var viewController = (function () {

	var DOMStr = {
		item_type: '.item_type',
		item_description: '.item_description',
		item_value: '.item_value'
	};

	var getInput = function () {
		return {
			item_type: document.querySelector(DOMStr.item_type).value,
			item_description: document.querySelector(DOMStr.item_description).value,
			item_value: document.querySelector(DOMStr.item_value).value
		};
	};

	return {
		getInputPublic: function () {
			return getInput();
		}
	};

})();

var appController = (function (budgetCtrl, viewCtrl) {

	var kv_add_item = function () {
		// Get the input data
		var user_input = viewCtrl.getInputPublic();
		// Add data to budgetController
		// Add data to viewController
		// Calculate
		// Display the result to the view
	};

	document.querySelector('.add_button').addEventListener('click', kv_add_item);

	document.addEventListener('keypress', function (e) {
		if (e.keyCode === 13 || e.which === 13) {
			kv_add_item();
		}
	});

})(budgetController, viewController);
