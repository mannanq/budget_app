// BUDGET Controller
var budgetController = (function() {
  // some code
})();

// UI Controller
var UIController = (function() {
  // defining key classes in an object for easy acess
  var DOMstrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputBtn: '.add__btn'
  };

  // Get values and put them in the global scope

  return {
    getValues: function() {
      // return values in an object for easy access
      return {
        type: document.querySelector(DOMstrings.inputType).value, // will be either "inc" or "exp"
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value
      };
    },
    getDOMstrings: function() {
      return DOMstrings;
    }
  };
})();

//GLOBAL Controller
var controller = (function(budgetCtrl, UICtrl) {
  // get access to the DOMstrings var from the UI controller

  var DOM = UICtrl.getDOMstrings();
  // click event listener
  document.querySelector(DOM.inputBtn).addEventListener('click', function() {
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
    console.log(UIController.getValues());
    // 2. Add new item to the budget controller
    // 3. Add new item to the UI
    // 4. calculate budget
    // 5. Update budget in the UI
  };
})(budgetController, UIController);
