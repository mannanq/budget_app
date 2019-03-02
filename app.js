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

  // this function is called by the "calculateBudget" function (public method -- see line 89)
  var calculateTotal = function(type) {
    /* the method gets the type as an argument (inc or exp). 
    we define a cariable called sum and set it equal to 0. 
    */
    var sum = 0;

    /* for bottom code, example: data.allItems['inc'].forEach... 
    this adds up all elements in the income array and finds their sum 
    (simple for loop to calculate sum of items in an array)
*/
    data.allItems[type].forEach(function(e) {
      sum += e.value;
    });

    // Then just assign the sum to the respective item in the totals (see data structure lines 37-48 below)
    data.totals[type] = sum;
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
    },
    budget: 0,
    percentage: 0
  };

  // budget controller

  return {
    addItem: function(type, des, val) {
      var newItem, ID;

      // Giving an item an id:

      /* Initially, if there's no item in either array of the "allItems" property, it will throw an error because there's no item yet and hence no id! */

      // Check if there's an item already in the array:

      if (data.allItems[type].length > 0) {
        /* We want an easy ID, like 0, 1, 2, 3... and so on.

       Say we already have 2 items in "exp" with IDs 0 and 1 resp. Third item we add should have ID of 2
       data.allItems['exp'][data.allItems['exp'].length - 1].id = 1 i.e. ID of the second item in the "exp" array(We're using ".id" bc the newItem created is an Object based on the constructor function!). Just add 1 to it and gives you 2. This will ensure the new item will always have an ID of the last item + 1     
       */

        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        // If there's no item, then ID of the first item added is "0"

        ID = 0;
      }

      // Check the "type" of the item being added

      if (type === 'exp') {
        // if the type is "exp", create an object of the type "Expense" (defined above in lines 5-9) called "newItem".

        newItem = new Expense(ID, des, val);
      } else if (type === 'inc') {
        // if the type is "inc", create an object of the type "Income" (defined above in lines 11-15) called "newItem".

        newItem = new Income(ID, des, val);
      }

      // After checking the "type", add the item to the respective array of the "allItems" property in the data object

      data.allItems[type].push(newItem);

      return newItem;
    },

    // Public Method for calculating budget items:

    calculateBudget: function() {
      // calculate total income and expenses
      calculateTotal('inc');
      calculateTotal('exp');

      // calculate total budget: Income - Expense

      data.budget = data.totals.inc - data.totals.exp;

      // calculate percentage
      // In case the value of income is 0:
      if (data.totals.inc > 0) {
        data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
      } else {
        /* if value of income is 0, then just assign -1 to percentage. Otherwise JS will assign infinity to it.
        example: (900 / 0) * 100 = Infinity */

        data.percentage = -1;
      }
    },
    // Public method "getBudget" so GLOBAL controller has access to budget values

    getBudget: function() {
      return {
        budget: data.budget,
        totalIncome: data.totals.inc,
        totalExpenses: data.totals.exp,
        percent: data.percentage
      };
    },
    testDataArray: function() {
      console.log(data);
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
    inputBtn: '.add__btn',
    expenseItem: '.expenses__list',
    incomeList: '.income__list'
  };

  // Get values and put them in the global scope

  return {
    getValues: function() {
      // return values in an object for easy access
      return {
        type: document.querySelector(DOMstrings.inputType).value, // Note: will be either "inc" or "exp"
        description: document.querySelector(DOMstrings.inputDescription).value, // For the description of the budget item
        value: parseFloat(
          document.querySelector(DOMstrings.inputValue).value
        ) /* Value of the budget item. parseFloat to get the floating point value of item. It'll be in form of a string otherwise. Can't do calculations with that! */
      };
    },
    // also return the DOM values so they can be accessible by other modules
    getDOMstrings: function() {
      return DOMstrings;
    },

    addListItem: function(obj, type) {
      var html, element, newHtml;

      // create HTML placeholder text

      if (type === 'inc') {
        element = DOMstrings.incomeList;
        html =
          '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else if (type === 'exp') {
        element = DOMstrings.expenseItem;
        html =
          '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }
      // replace placeholder values with actual data

      newHtml = html.replace('%id%', obj.id);
      newHtml = newHtml.replace('%description%', obj.description);
      newHtml = newHtml.replace('%value%', obj.value);
      // Insert HTML into DOM

      document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
    },

    // method to clear user input fields after an item has been entered

    clearFields: function() {
      var fields, fieldsArray;

      // Select fields you want to clear i.e. in our case, description and value field
      fields = document.querySelectorAll(
        DOMstrings.inputDescription + ', ' + DOMstrings.inputValue
      );

      /* Important: "querySelectorAll" method gives back a Nodelist. Instead of clearing their values individually,
      we want to write a loop (DRY). In order to have access to array methods, we can convert the Nodelist into an array . So use ".call()" method to use an Array method (slice) on the fields list
      for example: fields will look like: 
      
      [input.add__description, input.add__value]

      This is a NodeList. In ES6, this can be converted into an array using : Array.from(fields)

      We can then loop over it

      In older version of JS, it'd be Array.prototype.slice.call(fields)

      Edit to above: Turns out, you can use forEach method on a Nodelist. Nonetheless, I converted it to an array anyway
      */

      fieldsArray = Array.from(fields);

      fieldsArray.forEach(function(cur) {
        cur.value = '';
      });

      // set focus back to the description box so user can enter another item
      fieldsArray[0].focus();
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
      /* Only listen if "return/enter" key is pressed ("keyCode" item 13 for new broswers. For old browsers, "which" item in the event Object is 13) */

      if (e.keyCode === 13 || e.which === 13) {
        ctrlAddItem();
      }
    });
  };

  // Function to add item

  var ctrlAddItem = function() {
    var input, newItem;

    /* 1. Get field input values from UI control by invoking ".getValues()" method. Remember, that method returns the "type", "description" and "value" of the item entered. (See lines 71-73 from the code above) */

    input = UICtrl.getValues();

    var updateBudget = function() {
      // 1. calculate budget

      budgetCtrl.calculateBudget();
      // 2. return the budget

      var budget = budgetCtrl.getBudget();
      // 3. display budget in UI

      console.log(budget);
    };

    // Only if the fields (description or value) have not been left empty or item does not have value of 0, then proceed.

    if (input.description !== '' && !isNaN(input.value) && input.value > 0) {
      /* 2. Add this input i.e. new item we got from the UI controller (line 112) to the budget controller module by invoking the ".addItem()" method from "budgetController" module. Remember, that method takes "type", "description" and "value" as arguments! (See line 32 of the code above) */

      newItem = budgetCtrl.addItem(input.type, input.description, input.value);

      // 3. Add new item to the UI

      UICtrl.addListItem(newItem, input.type);

      // 4. Clear fields

      UICtrl.clearFields();

      // 5. update Budget (separated this into another method (see above))

      updateBudget();
    }
  };

  return {
    init: function() {
      console.log('Application has started');
      setUpEventListeners();
    }
  };
})(budgetController, UIController);

controller.init();
