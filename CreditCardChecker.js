// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3];
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3];
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];
// Invalid Credit Cards withouth a manufactu
const mystery6 = [7, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];
const mystery7 = [1, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5, mystery6, mystery7];


// Add your functions below:
// This function follows the Luhn algorithm to check weather a credit card number if valid or invalid. The methodology can be seen here: https://content.codecademy.com/PRO/independent-practice-projects/credit-card-checker/diagrams/cc%20validator%20diagram%201.svg

const validateCred = arr => {
  // following the algorithm the card is reversed in revArr
  let revArr = [];
  let checkArr = [];
  for(let i=arr.length-1; i>=0; i--) {
    revArr.push(arr[i]);
  };
  // everyother value starting with the second value is then doubled, if the doubled value is greater than 9, 9 is subtracted. All the values are then added to the checkArr to be used in the next function 
  for(let i=0; i<revArr.length; i++) {
    if(i % 2 === 0) {
      checkArr.push(revArr[i]);
    } else if (i % 2 !==0) {
      revArrDub = revArr[i] * 2;
      if (revArrDub > 9) {
        revArrDub = revArrDub - 9;
      }
      checkArr.push(revArrDub);
    }
  }

// this function reduces the card numbers and check to see if the total is divisible by 10, if it is the card is valid.
  const checkArrTotal = checkArr.reduce((total, amount) => total + amount) % 10;
  if (checkArrTotal === 0) {
    return 'valid';
  } else {
    return 'invalid';
  }
}

//this function allows to check multiple credit cards that are stored in an object.
const findInvalidCards = arr => {
  let checkedCards = [];
  arr.forEach(item => checkedCards.push(validateCred(item)));
  return checkedCards;
}

// checks which companies might be printing invalid credit cards and returns an array of these companies. If the credit card does not match the criteria of a credit card company, than a message with the card number is added to the array.
const idInvalidCardCompanies = arr => {
  let checkedCardsCompanies = [];
  arr.forEach(item => {
    if (item[0] === 3 && checkedCardsCompanies.includes('Amex (American Express)') === false) {
      checkedCardsCompanies.push('Amex (American Express)');
    } else if (item[0] === 4 && checkedCardsCompanies.includes('Visa') === false) {
      checkedCardsCompanies.push('Visa')
    } else if (item[0] === 5 && checkedCardsCompanies.includes('Mastercard') === false) {
      checkedCardsCompanies.push('Mastercard');
    } else if (item[0] === 6 && checkedCardsCompanies.includes('Discover') === false) {
      checkedCardsCompanies.push('Discover');
    } else if (item[0] > 6 || item[0] < 3) {
      checkedCardsCompanies.push(`${item.join('')}, no company found`);
    }
  });
  console.log(checkedCardsCompanies);
};

idInvalidCardCompanies(batch)