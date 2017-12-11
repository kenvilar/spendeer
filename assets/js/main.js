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
		},
		budget: 0,
		percentage: 0
	};

	var calculateTotal = function (type) {
		var all_items, sum;

		sum = 0;

		all_items = data.storeAll[type];

		all_items.forEach(function (currValue, index, arr) {
			sum = sum + currValue.value;
		});

		data.total[type] = sum;
	};

	var calculateNetWorth = function (income, expense) {
		var net_worth;
		net_worth = income - expense;

		return net_worth;
	};

	var calculatePercentage = function (total_expense, total_income) {
		var percentage;
		percentage = total_expense / total_income;
		percentage = Math.round(percentage * 100);

		return percentage;
	};

	return {
		addItemPublic: function (type, description, value) {
			var new_item, id, expOrIncArray;

			expOrIncArray = data.storeAll[type];

			if (expOrIncArray.length > 0) {
				id = expOrIncArray[expOrIncArray.length - 1].id + 1;
			} else {
				id = 0;
			}

			if (type === 'income') {
				new_item = new Income(id, description, value);
			} else if (type === 'expense') {
				new_item = new Expense(id, description, value);
			}

			data.storeAll[type].push(new_item);

			return new_item;
		},
		calculatePublic: function () {
			var total_income, total_expense;

			total_income = calculateTotal('income');
			total_expense = calculateTotal('expense');

			data.budget = calculateNetWorth(total_income, total_expense);

			data.percentage = calculatePercentage(total_expense, total_income);
		},
		displayAllData: function () {
			console.log(data);
		}
	};

})();

var viewController = (function () {

	var DOMStr = {
		item_type: '.item_type',
		item_description: '.item_description',
		item_value: '.item_value',
		add_button: '.add_button',
		incomeListContainer: '.income_list',
		expenseListContainer: '.expenses_list'
	};

	var getInput = function () {
		return {
			item_type: document.querySelector(DOMStr.item_type).value,
			item_description: document.querySelector(DOMStr.item_description).value,
			item_value: parseFloat(document.querySelector(DOMStr.item_value).value)
		};
	};

	return {
		getInputPublic: function () {
			return getInput();
		},
		addListItem: function (obj, type) {
			/*PseudoCode*/
			/*
			1. Create HTML string with dummy var
			2. Replace the dummy var with real data
			3. Insert the created HTML into the DOM
			*/
			// 1. )
			var html, newHtmlString, el;

			if (type === 'income') {
				el = DOMStr.incomeListContainer;

				html = '<div class="item clearfix" id="income-%id%">\n' +
					'                            <div class="display_description">%description%</div>\n' +
					'                            <div class="right clearfix">\n' +
					'                                <div class="display_value">+ %value%</div>\n' +
					'                                <div class="display_delete">\n' +
					'                                    <button class="display_delete--btn">\n' +
					'                                        <i class="ion-ios-close-outline"></i>\n' +
					'                                    </button>\n' +
					'                                </div>\n' +
					'                            </div>\n' +
					'                        </div>';
			} else if (type === 'expense') {
				el = DOMStr.expenseListContainer;

				html = '<div class="item clearfix" id="expense-%id%">\n' +
					'                            <div class="display_description">%description%</div>\n' +
					'                            <div class="right clearfix">\n' +
					'                                <div class="display_value">- %value%</div>\n' +
					'                                <div class="display_percentage">10%</div>\n' +
					'                                <div class="display_delete">\n' +
					'                                    <button class="display_delete--btn">\n' +
					'                                        <i class="ion-ios-close-outline"></i>\n' +
					'                                    </button>\n' +
					'                                </div>\n' +
					'                            </div>\n' +
					'                        </div>';
			}

			// 2. )
			newHtmlString = html.replace('%id%', obj.id);
			newHtmlString = newHtmlString.replace('%description%', obj.description);
			newHtmlString = newHtmlString.replace('%value%', obj.value);

			// 3. )
			document.querySelector(el).insertAdjacentHTML('beforeend', newHtmlString);
		},
		clearInputFields: function () {
			// It needs to convert this list to an array
			var allInputFields = document.querySelectorAll(DOMStr.item_description + ', ' + DOMStr.item_value);
			var fieldsArr = Array.prototype.slice.call(allInputFields);
			/*for (var i = 0; i < fieldsArr.length; i++) {
				fieldsArr[i].value = '';
			}*/
			fieldsArr.forEach(function (currentValue, index, array) {
				currentValue.value = '';
			});
			fieldsArr[0].focus();
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

	var calc = function () {
		// Calculate
		budgetCtrl.calculatePublic();
		// Display the result to the view
	};


	var kv_add_item = function () {
		// Get the input data
		var user_input = viewCtrl.getInputPublic();
		console.log(user_input);

		if (!isNaN(user_input.item_value) && user_input.item_value > 0 && user_input.item_description !== '') {
			// Add data to budgetController
			var new_data = budgetCtrl.addItemPublic(user_input.item_type, user_input.item_description, user_input.item_value);
			// Add data to viewController
			viewCtrl.addListItem(new_data, user_input.item_type);
			// Clear all input fields
			viewCtrl.clearInputFields();
			// Calculate, display the result to the view
			calc();
		}
	};

	return {
		initPublic: function () {
			init();
		}
	};

})(budgetController, viewController);

appController.initPublic();
