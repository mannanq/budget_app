// BUDGET Controller
var budgetController = (function() {
  // some code
})();

// UI Controller
var UIController = (function() {
  // some code
})();

//GLOBAL Controller
var controller = (function(budgetCtrl, UICtrl) {
  // click event listener
  document.querySelector('.add__btn').addEventListener('click', function() {
    ctrlAddItem();
  });

  // "enter" key event listener

  document.addEventListener('keypress', function(e) {
    // Only listen if "return/enter" key is pressed (keyCode 13 or for old broswers, which item in the event Object is 13)

    if (e.keyCode === 13 || e.which === 13) {
      ctrlAddItem();
    }
  });

  // Function to add item

  var ctrlAddItem = function() {
    // 1. Get field input values
    // 2. Add new item to the budget controller
    // 3. Add new item to the UI
    // 4. calculate budget
    // 5. Update budget in the UI
    console.log('connected!');
  };
})(budgetController, UIController);
