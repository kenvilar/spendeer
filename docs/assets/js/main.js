var budgetController = (function () {

	var Expense = function (id, description, value) {
		this.id = id;
		this.description = description;
		this.value = value;
		this.percentage = -1;
	};


	Expense.prototype.calcPercentage = function (total_income) {
		if (total_income > 0) {
			this.percentage = Math.round((this.value / total_income) * 100);
		}
	};

	Expense.prototype.getPercentage = function () {
		return this.percentage;
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
		budget: 0, //or net income
		percentage: 0
	};

	var calculateTotal = function (type) {
		var all_items, sum;

		sum = 0;

		all_items = data.storeAll[type];

		all_items.forEach(function (currValue) {
			sum = sum + currValue.value;
		});

		if (type === 'income') {
			data.total['incomes'] = sum;
		} else if (type === 'expense') {
			data.total['expenses'] = sum;
		}
	};

	var calculateNetIncome = function () {
		var net_income;
		net_income = data.total.incomes - data.total.expenses;

		data.budget = net_income;
	};

	var calculatePercentage = function () {
		var percentage;
		percentage = data.total.expenses / data.total.incomes;
		percentage = Math.round(percentage * 100);

		if (data.total.incomes > 0) {
			data.percentage = percentage;
		} else {
			data.percentage = 0;
		}
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
			calculateTotal('income');
			calculateTotal('expense');

			calculateNetIncome();

			calculatePercentage();
		},
		getAllPublicData: function () {
			return {
				total_income: data.total.incomes,
				total_expense: data.total.expenses,
				budget: data.budget,
				percentage: data.percentage
			};
		},
		calcPercentagePublic: function () {
			/*
			[0, 'asd', 2]
			[1, 'asd', 4]

			* */
			var values = data.storeAll['expense'];
			values.forEach(function (el) {
				el.calcPercentage(data.total.incomes);
			});
		},
		getPercentagePublic: function () {
			var get_percent;
			get_percent = data.storeAll.expense.map(function (el) {
				return el.getPercentage();
			});
			return get_percent;
		},
		deleteItem: function (type, id) {
			var ids, indx;

			ids = data.storeAll[type].map(function (i) {
				return i.id;
			});

			indx = ids.indexOf(id);

			if (indx !== -1) {
				data.storeAll[type].splice(indx, 1);
			}
		},
		displayAllData: function () {
			return data;
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
		expenseListContainer: '.expenses_list',
		netIncome: '.spendeer_value',
		total_income: '.spendeer_income--value',
		total_expense: '.spendeer_expenses--value',
		total_percentage: '.spendeer_expenses--percentage',
		list_container: '.list_of_incomes_and_expenses',
		each_expense_percentage: '.display_percentage',
		month_and_year: '.spendeer_title--month-year'
	};

	var getInput = function () {
		return {
			item_type: document.querySelector(DOMStr.item_type).value,
			item_description: document.querySelector(DOMStr.item_description).value,
			item_value: parseFloat(document.querySelector(DOMStr.item_value).value)
		};
	};

	var numWithCommas = function (num) {
		var new_num = num.toString().split(".");
		new_num[0] = new_num[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

		return new_num.join(".");
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
			newHtmlString = newHtmlString.replace('%value%', numWithCommas(obj.value.toFixed(2)));

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
			fieldsArr.forEach(function (currentValue) {
				currentValue.value = '';
			});
			fieldsArr[0].focus();
		},
		displayBudget: function (obj) {
			document.querySelector(DOMStr.netIncome).textContent = '+ ' + numWithCommas(obj.budget.toFixed(2));
			document.querySelector(DOMStr.total_income).textContent = '+ ' + numWithCommas(obj.total_income.toFixed(2));
			document.querySelector(DOMStr.total_expense).textContent = '- ' + numWithCommas(obj.total_expense.toFixed(2));

			if (obj.percentage > 0) {
				document.querySelector(DOMStr.total_percentage).textContent = obj.percentage + '%';
			}
		},
		displayPercentage: function (percentage) {
			var node_list = document.querySelectorAll(DOMStr.each_expense_percentage);

			var new_node = function (list, callback) {
				for (var i = 0; i < list.length; i++) {
					callback(list[i], i);
				}
			};

			new_node(node_list, function (curr_el, index) {
				if (percentage[index] > 0) {
					curr_el.textContent = percentage[index] + '%';
				} else {
					curr_el.textContent = '---';
				}
			});

			/*node_list.forEach(function (t, index) {
				if (percentage[index] > 0) {
					t.textContent = percentage[index] + '%';
				} else {
					t.textContent = '';
				}
			});*/
		},
		displayMonthAndYear: function () {
			var now, month, year, monthNames;

			monthNames = [
				"January", "February", "March", "April", "May", "June", "July", "August", "September", "October",
				"November", "December"
			];


			now = new Date();
			month = now.getMonth();
			year = now.getFullYear();

			document.querySelector(DOMStr.month_and_year).textContent = monthNames[month] + ' ' + year;
		},
		deleteItemView: function (dom_id) {
			var element = document.getElementById(dom_id);
			element.parentNode.removeChild(element);
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

		document.querySelector(DOMStr.list_container).addEventListener('click', kv_delete_item);
	};

	var calc = function () {
		// Calculate
		var data;

		budgetCtrl.calculatePublic();

		data = budgetCtrl.getAllPublicData();
		// Display the result to the view

		return data;
	};

	var updatePercentage = function () {
		budgetCtrl.calcPercentagePublic();

		var percentage = budgetCtrl.getPercentagePublic();

		viewCtrl.displayPercentage(percentage);
	};


	var kv_add_item = function () {
		// Get the input data
		var user_input = viewCtrl.getInputPublic();

		if (!isNaN(user_input.item_value) && user_input.item_value > 0 && user_input.item_description !== '') {
			// Add data to budgetController
			var new_data = budgetCtrl.addItemPublic(user_input.item_type, user_input.item_description, user_input.item_value);

			// Add data to viewController
			viewCtrl.addListItem(new_data, user_input.item_type);

			// Clear all input fields
			viewCtrl.clearInputFields();

			// Calculate, display the result to the view
			var all_data = calc();
			viewCtrl.displayBudget(all_data);

			// Update the percentage
			updatePercentage();
		}
	};

	var kv_delete_item = function (e) {
		var section_id, split_id, budget_type, budget_type_id;

		section_id = e.target.parentNode.parentNode.parentNode.parentNode.id;

		if (section_id) {
			split_id = section_id.split('-');
			budget_type = split_id[0];
			budget_type_id = parseInt(split_id[1]);

			/*
			Pseudocode
			1. Delete the item with ID in budetCtrl
			2. Delete the item with ID in viewCtrl
			3. Update the data
			4. Update the percentage
			*/

			// 1.)
			budgetCtrl.deleteItem(budget_type, budget_type_id);

			// 2.)
			viewCtrl.deleteItemView(section_id);

			// 3.)
			var all_data = calc();
			viewCtrl.displayBudget(all_data);

			// 4.)
			updatePercentage();
		}
	};

	return {
		initPublic: function () {
			viewCtrl.displayMonthAndYear();
			viewCtrl.displayBudget({
				total_income: 0,
				total_expense: 0,
				budget: 0,
				percentage: 0
			});
			init();
		}
	};

})(budgetController, viewController);

appController.initPublic();
