var budgetController = (function () {

	// TODO

})();

var viewController = (function () {

	var DOMStr = {
		item_type: '.item_type',
		item_description: '.item_description',
		item_value: '.item_value',
		add_button: '.add_button'
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
		},
		getDOMStringsPublic: function () {
			return DOMStr;
		}
	};

})();

var appController = (function (budgetCtrl, viewCtrl) {

	var DOMStr = viewCtrl.getDOMStringsPublic();

	var kv_add_item = function () {
		// Get the input data
		var user_input = viewCtrl.getInputPublic();
		console.log(user_input);
		// Add data to budgetController
		// Add data to viewController
		// Calculate
		// Display the result to the view
	};

	document.querySelector(DOMStr.add_button).addEventListener('click', kv_add_item);

	document.addEventListener('keypress', function (e) {
		if (e.keyCode === 13 || e.which === 13) {
			kv_add_item();
		}
	});

})(budgetController, viewController);
