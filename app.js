// BUDGET Controller
var budgetController = (function() {
  // Function constructors for expense and income

  var Expense = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var Income = function(id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  // Data structure
  var data = {
    allItems: {
      exp: [],
      inc: []
    },
    totals: {
      exp: 0,
      inc: 0
    }
  };

  return {
    addItem: function(type, des, val) {
      var newItem, ID;

      if (data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        ID = 0;
      }

      if (type === 'exp') {
        newItem = new Expense(ID, des, val);
      } else if (type === 'inc') {
        newItem = new Income(ID, des, val);
      }

      data.allItems[type].push(newItem);
    },
    testDataArray: function() {
      return data;
    }
  };
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
        type: document.querySelector(DOMstrings.inputType).value, // Note: will be either "inc" or "exp"
        description: document.querySelector(DOMstrings.inputDescription).value, // For the description of the budget item
        value: document.querySelector(DOMstrings.inputValue).value // Value of the budget item
      };
    },
    // also return the DOM values so they can be accessible by other modules
    getDOMstrings: function() {
      return DOMstrings;
    }
  };
})();

//GLOBAL Controller
var controller = (function(budgetCtrl, UICtrl) {
  // Refactor event listeners into a single function for clean code:

  var setUpEventListeners = function() {
    // get access to the DOMstrings var from the UI controller

    var DOM = UICtrl.getDOMstrings();

    // click event listener if "check" button is clicked
    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

    // "enter" key event listener if "enter" key is pressed by user while adding a budget item

    document.addEventListener('keypress', function(e) {
      // Only listen if "return/enter" key is pressed ("keyCode" item 13 for new broswers. For old browsers, "which" item in the event Object is 13)
      if (e.keyCode === 13 || e.which === 13) {
        ctrlAddItem();
      }
    });
  };

  // Function to add item

  var ctrlAddItem = function() {
    var input, newItem;

    // 1. Get field input values
    input = UICtrl.getValues();

    // 2. Add new item to the budget controller
    newItem = budgetCtrl.addItem(input.type, input.description, input.value);

    // 3. Add new item to the UI

    // 4. calculate budget
    // 5. Update budget in the UI
  };

  return {
    init: function() {
      console.log('Application has started');
      setUpEventListeners();
    }
  };
})(budgetController, UIController);

controller.init();
