// Customer class:
// new Customer() — initialized with both name, and an instance of an employer; returns a JavaScript object
// ?\that has attributes of id, employerId, and name
// meals() - returns all of the meals that a customer has had delivered
// deliveries() — returns all of the deliveries that customer has received
// totalSpent() - returns the total amount that the customer has spent, as a function of the cost of the meals he has had delivered

// Meal class:
// new Meal() — initialized with title and price; returns an object that has attributes oftitle, price, and id
// deliveries() - returns all of the deliveries that delivered the particular meal.
// customers() - returns all of the customers who have had the meal delivered.
// byPrice() - A class method that orders the meals by their price. Use the static keyword to write a class method.

// Delivery class:
// new Delivery() — initialized with meal and customer; returns an object that has attributes of mealId, customerId, and id
// meal() - returns the meal associated with the delivery
// customer() - returns the customer associated with the delivery

// Employer class:
// new Employer() — initialized with name; returns an object that has attributes of name and id
// employees() - returns a list of customers employed by the employer
// deliveries() - returns a list of deliveries ordered by the employer's employees
// meals() - returns a list of meals ordered by the employer's employees. The method is to not return the same meal multiple times.
// mealTotals() - returns a JavaScript object displaying each respective meal id ordered by the employer's employees. The keys of the
// JavaScript object are the meal ids and associated with each meal id is a value. For example, employerOne.mealTotals() returning an object of {1: 4, 2: 3} would mean that the meal with id of 1 was ordered by employerOne's employees four times, and the meal
// with id of 2 was ordered by employerOne's employees three times.

let store = {customers: [], employers: [], meals: [], deliveries:[]}

let customerId = 0;
let mealId = 0;
let deliveryId = 0;
let employerId = 0;
class Customer
{
  constructor(name, employer)
  {

    this.name = name;
    this.id = ++customerId;
    // this.employerId = employer.id;
    if(employer)
    {
      this.employerId = employer.id;
    }
    store.customers.push(this);
  }

  deliveries() {
    return store.deliveries.filter( function (delivery) {
      return delivery.customerId === this.id
    }.bind(this))
}

// Coule iterate through deliveries above instead
  meals() {
    return this.deliveries().map ( function (delivery) {
      return store.meals.find ( function (meal) {
        return meal.id === delivery.mealId
      })
    })
  }

  totalSpent(){
    return this.meals().reduce(function(a, meal) {
      return a + meal.price;
    }, 0)
  }

}

class Meal
{
  constructor(title, price)
  {

    this.title = title;
    this.price = price;
    this.id = ++mealId;
    store.meals.push(this);

  }

  deliveries () {
    return store.deliveries.filter(function(delivery) {
      return delivery.mealId === this.id
    }.bind(this))
  }

  customers () {
    return this.deliveries().map(function(delivery) {
      return store.customers.find(function(customer) {
        return customer.id === delivery.customerId
      })
    })
  }

  static byPrice () {
    return store.meals.sort(function(meal1, meal2) {
      return  meal2.price - meal1.price
    })
  }
}

class Delivery
{
  constructor(meal, customer)
  {
    if (meal) {
      this.mealId = meal.id;
    }
    if (customer) {
      this.customerId = customer.id;
    }

    this.id = ++deliveryId;
    store.deliveries.push(this);
  }

  customer() {
    return store.customers.find(function(customer) {
      return customer.id === this.customerId
    }.bind(this))
  }

  meal() {
    return store.meals.find(function(meal) {
      return meal.id === this.mealId
    }.bind(this))
  }
}

class Employer
{
  constructor(name)
  {
    this.name = name;
    this.id = ++employerId;
    store.employers.push(this);

  }
// lea

  employees() {
    return store.customers.filter(function(customer) {
      return customer.employerId === this.id
    }.bind(this))
  }

  deliveries() {
    let all =this.employees().map(function(employee) {
      return store.deliveries.filter(function(delivery) {
        return delivery.customerId === employee.id
      })
    })
    return [].concat.apply([], all)
  }


  meals() {
    let result = []
    // gets all the meals and saves it to a variable
    let all = this.deliveries().map(function(delivery) {
      return store.meals.find(function(meal) {
        return delivery.mealId === meal.id
      })
    })

    //checks for uniqueness
    for (let i = 0; i < all.length-1; i++) {
      for (let j = i + 1; j < all.length; j++) {
        if (all[i] === all[j]) {
          delete all[j]
        }
      }
    }

    //filters only truthy values after deletion above
    return all.filter(function(element) {
      if (element) {
        return element
      }
    })
  }

  mealTotals() {
    let all = this.deliveries().map(function(delivery) {
      return store.meals.filter(function(meal) {
        return delivery.mealId === meal.id
      })
    })

    let flatten = [].concat.apply([], all)

    let hash = flatten.reduce(function (allMeals, meal) {
      if (meal.id in allMeals) {
        allMeals[meal.id]++;
      } else {
        allMeals[meal.id] = 1;
      }
      return allMeals;
    }, {});
    return hash
  }

}
