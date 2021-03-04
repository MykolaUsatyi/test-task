// 1) Write a function to format phone number
// format('380677443021') // =>  '+38 (067) 744-30-21'

function formatPhoneNumber(phoneNumberString) {
  const cleaned = phoneNumberString.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{2})(\d{3})(\d{3})(\d{2})(\d{2})$/);

  if (match) {
    return '+' + match[1] + ' (' + match[2] + ') ' + match[3] + '-' + match[4] + '-' + match[5];
  }

  return null;
}

//console.log(formatPhoneNumber('  38067 74 43021'));
//console.log(formatPhoneNumber('380980242632'));

//=============================================//
// 2) Write a function to check is date valid
// isValid('2000, 2, 29') // true
// isValid(2001, 2, 29) // false

function validateDate(y, m, d) {
  const selectedDate = `${y}/${m}/${d}`;

  if (selectedDate === '') {
    return false;
  }

  const regExp = /^(\d{4})(\/|-)(\d{1,2})(\/|-)(\d{1,2})$/;
  const dateArray = selectedDate.match(regExp);

  if (dateArray === null) {
    return false;
  }

  let year = dateArray[1];
  let month = dateArray[3];
  let day = dateArray[5];

  if (month < 1 || month > 12) {
    return false;
  } else if (day < 1 || day > 31) {
    return false;
  } else if ((month == 4 || month == 6 || month == 9 || month == 11) && day == 31) {
    return false;
  } else if (month == 2) {
    const isLeapYear = (year % 4 === 0 && (year % 100 !== 0 || year % 400 == 0));
    if (day > 29 || (day == 29 && !isLeapYear)) {
      return false;
    }
  }
  return true;
}

// console.log(validateDate(2000, 2, 29));
// console.log(validateDate(2000, 0, 29));
// console.log(validateDate(2021, 2, 18));
// console.log(validateDate(2021, 10, 45));

//==================================================//
// 3) Write a function to find the longest match of non-repetitive characters
//   in a string.
// 1213212 => 321
// 1243121 => 4312
// ababacsabzab => csabz

const findLongestMatchString = function(string) {
  let longestSubstring = '';
  let currentString = '';

  for (let i = 0; i < string.length; i++) {
    let foundIndex = currentString.indexOf(string[i]);

    if (foundIndex > -1) {
      if (longestSubstring.length < currentString.length)
        longestSubstring = currentString;
      currentString = currentString.slice(foundIndex + 1);
    }

    currentString += string[i];
  }
  return longestSubstring.length < currentString.length ? currentString : longestSubstring;
};

// console.log(findLongestMatchString("ababacsabzab"));

//==================================================//
// 4) Write a function to print numbers in array with some period using setTimeout,
//    console.log and "for" loop (do not use arrow functions)
//   var periodicIterator = function (array, time) {
//      // your code
//   }
//   periodicIterator([3,2,4], 100);
//   // 100 ms left
//   2
//   // 100 ms left
//   4

const periodicIterator = function(array, time) {
  for (let item = 0; item < array.length; item++) {
    setTimeout(function() {
      console.log(array[item]);
    }, time);
  }
};

// console.log(periodicIterator([3,2,4], 100));

//==================================================//
// 5) Implement a singleton object
//   function MySingleton(){
//          // your code
//   }
//   MySingleton.prototype.download = function(url){  };
// var a = MySingleton();
// var b = new MySingleton();
// var c = new MySingleton();
// var d = MySingleton();
// console.log(a===b); // true
// console.log(b===c); // true
// console.log(c===d); // true
// console.log(a===d); // true

function MySingleton() {
  if (MySingleton.instance) {
    return MySingleton.instance;
  }
  if (!(this instanceof MySingleton)) {
    return new MySingleton();
  }
  MySingleton.instance = this;
}

// var a = MySingleton();
// var b = new MySingleton();
// var c = new MySingleton();
// var d = MySingleton();
// console.log(a===b); // true
// console.log(b===c); // true
// console.log(c===d); // true
// console.log(a===d); // true


//==================================================//
// 6) Implement bind function yourself (do not use spread operator "...")
//   var myBind = function(thisArg, target, arg1, arg2, arg3, ...){
//       // your code
//   };

var myBind = function(thisArg, target) {
  const rest = [].slice.call(arguments, 2);

  return function() {
    const args = [].slice.call(arguments);
    const combinedArgs = rest.concat(args);

    return target.apply(thisArg, combinedArgs);
  };
};

/* var user = 'admin:';
var log = {
  error: myBind(console, console.log, '[Error]', user),
  warning: myBind(console, console.log, '[Warning]', user)
};
log.error('File not found!'); // [Error] admin: File not found!
log.warning('No timezone set!'); // [Warning] admin: No timezone set! */


//==================================================//
// 7) Implement apply function yourself (do not use eval)
// var myApply = function(thisArg, target, args){
//       // your code
//   };

var myApply = function(thisArg, target, args) {
  return target.call(thisArg, ...args);
};

// myApply(console, console.log, ['[Error]', 'admin:', 'File not found!']); // [Error] admin: File not found!
