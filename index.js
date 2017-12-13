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
let mealsId = 0;
let deliveryId = 0;
let employerId = 0;
class Customer
{
  constructor(name, employer)
  {

    this.name = name;
    console.log(name, employer)
    this.id = ++customerId;
    // this.employerId = employer.id;
    store.customers.push(this);
    if(employer)
    {
      this.employerId = employer.id;
    }
  }

    // totalSpent()
    // {
    //
    // }
}

class Meal
{
  constructor(title, price)
  {

    this.title = title;
    this.price = price;
    this.id = ++mealsId;
    store.meals.push(this);

  }
}

class Delivery
{
  constructor(meal, customer)
  {
    this.mealId = meal.id;
    this.customerId = customer.id;
    this.deliveryId = ++deliveryId;
    store.deliveries.push(this);
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
  // employees()
  // {
  //   store.deliveries.filter(
  //     employee => this.id === employee.
  //   )
  // }
}
