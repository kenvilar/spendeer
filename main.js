var budgetController = (function () {

	var Expense = function (id, description, value) {
		this.id = id;
		this.description = description;
		this.value = value;
	};

	var Income = function (id, description, value) {
		this.id = id;
		this.description = description;
		this.value = value;
	};

	var data = {
		storeAll: {
			expense: [],
			income: []
		},
		total: {
			expenses: 0,
			incomes: 0
		}
	};

	return {
		addItemPublic: function (type, description, value) {
			var new_item, id, expOrIncArray;

			expOrIncArray = data.storeAll[type];

			id = expOrIncArray[expOrIncArray.length - 1].id + 1;

			if (type === 'income') {
				new_item = Income(id, description, value);
			} else if (type === 'expense') {
				new_item = Expense(id, description, value);
			}

			data.storeAll[type].push(new_item);

			return new_item;
		}
	};

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

	var init = function () {
		var DOMStr = viewCtrl.getDOMStringsPublic();

		document.querySelector(DOMStr.add_button).addEventListener('click', kv_add_item);

		document.addEventListener('keypress', function (e) {
			if (e.keyCode === 13 || e.which === 13) {
				kv_add_item();
			}
		});
	};


	var kv_add_item = function () {
		// Get the input data
		var user_input = viewCtrl.getInputPublic();
		// Add data to budgetController
		var new_data = budgetCtrl.addItemPublic(user_input.item_type, user_input.item_description, user_input.item_value);
		// Add data to viewController
		// Calculate
		// Display the result to the view
	};

	return {
		initPublic: function () {
			init();
		}
	};

})(budgetController, viewController);

appController.initPublic();
