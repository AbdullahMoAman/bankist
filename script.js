'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Abdullah Mohammed',
  movements: [200, 455.23, -306.5, 2500, -642.21, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2025-11-18T21:31:17.178Z',
    '2025-12-23T07:42:02.383Z',
    '2025-01-28T09:15:04.904Z',
    '2025-04-01T10:17:24.185Z',
    '2025-11-28T14:11:59.604Z',
    '2025-11-29T17:01:17.194Z',
    '2026-01-02T23:36:17.929Z',
    '2026-02-03T10:51:36.790Z',
  ],
  currency: 'JPY', // JPY Japanees
  locale: 'de-DE', // de-DE, ja-JP

  //   EUR
  // de-DE
};

const account2 = {
  owner: 'Saleh Aman',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2024-11-01T13:15:33.035Z',
    '2024-11-30T09:48:16.867Z',
    '2024-12-25T06:04:23.907Z',
    '2025-01-25T14:18:46.235Z',
    '2025-11-03T16:33:06.386Z',
    '2025-11-05T14:43:26.374Z',
    '2026-03-19T18:49:59.371Z',
    '2026-03-20T12:01:20.894Z',
  ],
  currency: 'EUR',
  locale: 'de-DE',
};

const account3 = {
  owner: 'Khadeja Smeer',
  movements: [3500, 5000, -150, 7290, -310, -100, 7400, -90],
  interestRate: 1.2,
  pin: 3333,

  movementsDates: [
    '2024-11-01T13:15:33.035Z',
    '2024-11-30T09:48:16.867Z',
    '2024-12-25T06:04:23.907Z',
    '2025-01-25T14:18:46.235Z',
    '2025-11-09T16:33:06.386Z',
    '2025-11-10T14:43:26.374Z',
    '2026-03-19T18:49:59.371Z',
    '2026-03-20T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2, account3];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');
//
//
//
//
// Build bankist website from scratch again, PART 2 !!!

// Funcions
// 1

const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);
  console.log(daysPassed);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yestarday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  return new Intl.DateTimeFormat(locale).format(date);

  // const day = `${date.getDate()}`.padStart(2, 0);
  // const month = `${date.getMonth() + 1}`.padStart(2, 0);
  // const year = date.getFullYear();
  // return `${day}/${month}/${year}`;
};

// 2
const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

// 1 - create username

const createUserNames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

createUserNames(accounts);

// 2- Display movements

const displayMovements = function (acc, sort = false) {
  // to clear any elements declared before
  containerMovements.innerHTML = '';

  const combinedMovsDates = acc.movements.map((mov, i) => ({
    movements: mov,
    movementsDates: acc.movementsDates.at(i),
  }));
  console.log(combinedMovsDates);
  if (sort) combinedMovsDates.sort((a, b) => a.movements - b.movements);
  // const movs = sort
  //   ? acc.movements.slice().sort((a, b) => a - b)
  //   : acc.movements;

  combinedMovsDates.forEach(function (obj, i) {
    const { movements, movementsDates } = obj;
    const type = movements > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(movementsDates);
    const displayDate = formatMovementDate(date, acc.locale);

    const formattedMov = formatCur(movements, acc.locale, acc.currency);

    const html = `
    <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
            i + 1
          } ${type}</div>
    <div class="movements__date">${displayDate}</div>
          <div class="movements__value">${formattedMov}</div>
        </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// 3- Display Balance :
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, cur) => acc + cur, 0);
  labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
};

// 4- Display Summary :
const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, cur) => acc + cur, 0);

  labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency);

  const outcome = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, cur) => acc + cur, 0);

  labelSumOut.textContent = formatCur(
    Math.abs(outcome),
    acc.locale,
    acc.currency,
  );

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter(int => int >= 1)
    .reduce((acc, int) => acc + int, 0);

  labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency);
};

const updateUI = function (account) {
  displayMovements(account);
  calcDisplayBalance(account);
  calcDisplaySummary(account);
};

const startLogOutTimer = () => {
  const tick = () => {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    // In each call, print the remaining time to UI
    labelTimer.textContent = `${min}:${sec}`;

    // When it reach 0, stop timer and log out user
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = 'Log in to get started';
      containerApp.style.opacity = 0;
    }

    // Increase 1s
    time--;
  };

  // Set time to 5 minutes
  let time = 90;

  tick();
  // Call the timer every second
  const timer = setInterval(tick, 1000);
  return timer;
};

//
let currentAccount, timer;

// FAKE ALWAYS LOGIED IN
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

//
btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value,
  );
  console.log(currentAccount);

  // if-else statement
  if (currentAccount?.pin === +inputLoginPin.value) {
    // 1- Display welcoming message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;

    // 2- Display UI
    containerApp.style.opacity = 100;

    // 3- Create current date and time

    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: '2-digit',
      year: 'numeric',
    };
    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options,
    ).format(now);
    // const now = new Date();
    // const day = `${now.getDate()}`.padStart(2, 0);
    // const month = `${now.getMonth() + 1}`.padStart(2, 0);
    // const year = now.getFullYear();
    // const hour = `${now.getHours()}`.padStart(2, 0);
    // const min = `${now.getMinutes()}`.padStart(2, 0);

    // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;

    // 4- Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';

    // 5- Lose focus on the input fields
    inputLoginPin.blur();
    inputLoginUsername.blur();

    // 6- Display the UI
    updateUI(currentAccount);

    // 7- If another user logs in and has a timer clear it and start new one
    if (timer) clearInterval(timer);
    timer = startLogOutTimer();
  }
});

btnTransfer.addEventListener('click', function (e) {
  // Prevent for from submitting
  e.preventDefault();

  // Define the variables
  const amount = +inputTransferAmount.value;
  const recevierAcc = accounts.find(
    acc => inputTransferTo.value === acc.username,
  );

  // Clear input fields
  inputTransferAmount.value = inputTransferTo.value = '';

  // if-else condition
  if (
    amount > 0 &&
    recevierAcc &&
    currentAccount.balance >= amount &&
    recevierAcc?.username != currentAccount.username
  ) {
    recevierAcc.movements.push(amount);
    currentAccount.movements.push(-amount);

    // add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    recevierAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);

    // Reset timer
    clearInterval(timer);
    timer = startLogOutTimer();
  }
});

btnClose.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  // if-else statement
  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    // Define the variable
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username,
    );
    console.log(index);

    // Delete the account
    accounts.splice(index, 1);

    // Hide the UI
    containerApp.style.opacity = 0;

    // Clear input fields
    inputCloseUsername.value = inputClosePin.value = '';

    // Clear the welcoming message
    labelWelcome.textContent = `Log in to get started`;
  }
});

btnLoan.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov > amount * 0.1)) {
    setTimeout(() => {
      // Add movements
      currentAccount.movements.push(amount);

      // Add loan date
      currentAccount.movementsDates.push(new Date().toISOString());

      // Update UI
      updateUI(currentAccount);

      // Reset timer
      clearInterval(timer);
      timer = startLogOutTimer();
    }, 3000);
  }
  // Clear input field
  inputLoanAmount.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);

  sorted = !sorted;
});
//
// Experminting API with numbers
const num = 3884764.23;
const options = {
  style: 'currency',
  // unit: 'mile-per-hour',
  currency: 'USD',
};
console.log('USD:  ', new Intl.NumberFormat('en-US', options).format(num));
console.log('EUR:  ', new Intl.NumberFormat('de-DE', options).format(num));
console.log('JPY:  ', new Intl.NumberFormat('ja-JP', options).format(num));

// setinterval
// setInterval(() => {
//   const now = new Date();
//   const hour = now.getHours();
//   const minute = `${now.getMinutes()}`.padStart(2, 0);
//   const second = `${now.getSeconds()}`.padStart(2, 0);
//   const all = `${hour}:${minute}:${second}`;
//   console.log(all);
// }, 1000);

/////////////////////////////////////////////////
// LECTURES

// Base 10 - 0 to 9. 1/10 = 0.1. 3/10 = 3.3333333
// Binary bas 2 - 0 to 1

// console.log(0.1 + 0.2);

// Conversion
// console.log(Number('23'));
// console.log(+'23');

// Parsing
// It takes a second argument, we write the base
// console.log(+parseInt('26px', 10));
// console.log(+parseInt('rem26', 10)); // the numbers have to be first

// console.log(Number.parseFloat('  2.7rem  '));

// Check if the value NaN
// console.log(Number.isNaN('23'));
// console.log(Number.isNaN(+'23x'));

// // But the best way for checking if the value is a number or not the finite mothod
// console.log(Number.isFinite('23'));
// console.log(Number.isFinite(23));

// Math.trunc - to display the Integer number insted of Decimal numbers
// Math.random() * 6 - to generate a random numbers between 0 and 6
const randomInt = (min, max) =>
  Math.trunc(Math.random() * (max - min) + 1) + min;

// console.log(randomInt(10, 20));
// console.log(randomInt(0, 3));

// Rounding integers
// console.log(Math.round(23.7));
// console.log(Math.round(23.2));

// Make both of them down
// console.log(Math.ceil(23.7));
// console.log(Math.ceil(23.2));

// This method removes the decimal part and it's better than trunc, because the ability of dealing with positive and nagetive numbers
// console.log(Math.floor(23.2));
// console.log(Math.floor('23.2'));

// Rounding decimals
// console.log(+(2.7).toFixed(0));
// console.log((2.787).toFixed(2));

// Remainders
// console.log(5 % 2); // 2 * 2 = 4 + 1 << this is the remainder or RE
// console.log(5 / 2);

// console.log(8 % 3);
// console.log(8 % 4); // 2 * 4 = 8 RE 0

// console.log(10 % 3); // 3 * 3 = 9 RE 1
// console.log(10 / 3);

// console.log(7 % 2);

// const isEven = n => n % 2 === 0;
// console.log(isEven(8));
// console.log(isEven(23));
// console.log(isEven(514));

// labelBalance.addEventListener('click', function () {
//   [...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
//     if (i % 2 === 0) row.style.backgroundColor = 'gray';
//   });
// });

// const now = new Date();
// console.log(now);
// console.log(new Date('December 28, 2018'));
// console.log(new Date(account1.movementsDates[0]));

// // Writing dates and time manually
// console.log(new Date(2025, 11, 9, 8, 15, 10));

// console.log(new Date(0));

// Working with dates
// const future = new Date(2037, 10, 19, 15, 23);
// console.log(future);
// console.log(future.getFullYear());
// console.log(future.getMonth());
// // get.date = means the day of the month
// console.log(future.getDate());
// // get.day = means the day of the week
// console.log(future.getDay());
// console.log(future.getHours());
// console.log(future.getMinutes());
// console.log(future.getSeconds());
// console.log(future.toISOString());
// console.log(future.getTime());

// future.setFullYear(2026);
// console.log(future);

// const future = new Date(2037, 10, 19, 15, 23);
// console.log(+future);

// const calcDaysPassed = (date1, date2) =>
//   Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);
// const days1 = calcDaysPassed(new Date(2037, 10, 19), new Date(2037, 10, 10));
// console.log(days1);

// const num = 203442.48;

// const optionsNum = {
//   style: 'currency', // 'unit', 'percent', 'currency'. But we have to spicify the currency
//   unit: 'celsius',
//   currency: 'EUR',
// };
// console.log('US:', new Intl.NumberFormat('en-US', optionsNum).format(num));
// console.log('Germany:', new Intl.NumberFormat('de-DE', optionsNum).format(num));
// console.log('Syria:', new Intl.NumberFormat('ar-SY', optionsNum).format(num));
// console.log(
//   navigator.language,
//   new Intl.NumberFormat(navigator.language, optionsNum).format(num)
// );

// const ingredients = ['olive', 'spinach'];

// // setTimeout
// const pizzaTimer = setTimeout(
//   (ing1, ing2) => console.log(`Here is your pizza with ${ing1} and ${ing2}`),
//   3000,
//   ...ingredients,
// );

// if (ingredients.includes('spinach')) clearTimeout(pizzaTimer);

// // setInterval
// setInterval(() => {
//   const now = new Date();
//   const hour = `${now.getHours()}`;
//   const minute = `${now.getMinutes()}`;
//   const second = now.getSeconds();
//   // console.log(`${hour}:${minute}:${second}`);
// }, 1000);

// // All these methods do type cooartion
// console.log(Math.trunc('24.6'));

// //  يقربها لاقرب عشر
// console.log(Math.round(24.3));
// console.log(Math.round(24.7));

// // يخليها اكبر في كل الأحوال دام فيها كسر حتى لو كان اقل من 5
// console.log(Math.ceil(24.3));
// console.log(Math.ceil(24.7));

// // يخليها اصغر في كل الأحوال عكس اللي قبله
// // Here floor method is better, cause it can deals with both positive and negative numbers
// console.log(Math.trunc(-24.3));
// console.log(Math.floor(-24.7));

// console.log((2.365).toFixed(2));
