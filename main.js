var budgetController = (function() {

	// TODO

})();

var viewController = (function() {

	// TODO

})();

var appController = (function(budgetCtrl, viewCtrl) {

	document.querySelector('.add_button').addEventListener('click', function() {
		console.log('Button was clicked!');
	});

})(budgetController, viewController);
