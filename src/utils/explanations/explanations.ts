import { Module } from "../types";

export type RecapExplanations = {
  [K in Module]?: RecapContent;
};

type RecapContent = {
  codeExample: string;
  overallExplanation: string;
  content: RecapContentSection[];
};

type RecapContentSection = {
  section: string;
  explanation: string;
  example: string;
};

export const explanations: RecapExplanations = {
  variables: {
    overallExplanation:
      "In JavaScript, variables are used to store and manage data. They are essential for holding values that can be manipulated and referenced throughout your code. Here is an in-depth overview of common variable-related actions with explanations and code examples:",

    content: [
      {
        section: "Declaration",
        explanation:
          "Creating a variable and specifying its name. The variable is initialized but not assigned a value. Declaration is often the first step in creating a variable.",
        example: "let myVariable;",
      },
      {
        section: "Initialization",
        explanation:
          "Assigning an initial value to a declared variable. This step can be combined with declaration or done separately.",
        example: "let myVariable = 42;",
      },
      {
        section: "Reassignment",
        explanation:
          "Changing the value of an existing variable. Variables in JavaScript are mutable, allowing for their values to be updated during the execution of your code.",
        example: "myVariable = 'Hello, World!';",
      },
      {
        section: "Scope",
        explanation:
          "Defining the context in which a variable is accessible. JavaScript has various scopes, including global and function scope. Variables defined inside a function are only accessible within that function.",
        example: "function myFunction() {\n  let localVariable = 'I am local';\n}",
      },
      {
        section: "Constant",
        explanation:
          "Declaring a variable that cannot be re-assigned. Constants are useful for values that should remain constant throughout the execution of your program.",
        example: "const pi = 3.14;",
      },
      {
        section: "Hoisting",
        explanation:
          "Variables declared with 'var' are moved to the top of their scope during the execution phase. This behavior can sometimes lead to unexpected results and is one reason why 'let' and 'const' were introduced.",
        example:
          "console.log(hoistedVariable); // Outputs: undefined\nvar hoistedVariable = 'I am hoisted';",
      },
      {
        section: "Template Literal",
        explanation:
          "Creating a string with embedded expressions using backticks (`). Template literals provide a more readable and concise way to work with strings in JavaScript.",
        example:
          "let name = 'John';\nlet greeting = `Hello, ${name}!`;\n// greeting is 'Hello, John!'",
      },
      {
        section: "Destructuring",
        explanation:
          "Extracting values from arrays or objects and assigning them to variables. Destructuring allows for convenient assignment and access to values within complex data structures.",
        example:
          "let person = { name: 'Alice', age: 30 };\nlet { name, age } = person;\n// name is 'Alice', age is 30",
      },
      {
        section: "Global Object Property",
        explanation:
          "Creating a property on the global object (not recommended). Variables created without 'var', 'let', or 'const' are automatically assigned to the global object. It's generally better to use 'var', 'let', or 'const' to avoid global namespace pollution.",
        example:
          "globalVariable = 'I am global';\nconsole.log(globalVariable); // Outputs: 'I am global'",
      },
    ],

    codeExample:
      "let count = 0;\nconsole.log('Initial Count:', count);\n// Outputs: Initial Count: 0\n\ncount = 10;\nconsole.log('Updated Count:', count);\n// Outputs: Updated Count: 10",
  },

  arrays: {
    overallExplanation:
      "JavaScript arrays are used to store multiple values in a single variable. They are a type of object with properties and methods specifically designed for working with ordered lists of values. Here is an overview of common array methods with explanations and code examples:",

    content: [
      {
        section: "push",
        explanation:
          "Adds one or more elements to the end of an array and returns the new length of the array.",
        example:
          "let fruits = ['apple', 'banana'];\nfruits.push('orange');\n// fruits is now ['apple', 'banana', 'orange']",
      },
      {
        section: "pop",
        explanation: "Removes the last element from an array and returns that element.",
        example:
          "let fruits = ['apple', 'banana', 'orange'];\nlet lastFruit = fruits.pop();\n// lastFruit is 'orange', fruits is now ['apple', 'banana']",
      },
      {
        section: "shift",
        explanation: "Removes the first element from an array and returns that element.",
        example:
          "let fruits = ['apple', 'banana', 'orange'];\nlet firstFruit = fruits.shift();\n// firstFruit is 'apple', fruits is now ['banana', 'orange']",
      },
      {
        section: "unshift",
        explanation:
          "Adds one or more elements to the beginning of an array and returns the new length of the array.",
        example:
          "let fruits = ['banana', 'orange'];\nfruits.unshift('apple');\n// fruits is now ['apple', 'banana', 'orange']",
      },
      {
        section: "splice",
        explanation:
          "Changes the contents of an array by removing or replacing existing elements and/or adding new elements.",
        example:
          "let fruits = ['apple', 'banana', 'orange'];\nfruits.splice(1, 1, 'grape', 'kiwi');\n// fruits is now ['apple', 'grape', 'kiwi', 'orange']",
      },
      {
        section: "slice",
        explanation:
          "Returns a shallow copy of a portion of an array into a new array object selected from begin to end (end not included).",
        example:
          "let fruits = ['apple', 'banana', 'orange'];\nlet citrus = fruits.slice(1, 3);\n// citrus is ['banana', 'orange'], fruits remains unchanged",
      },
      {
        section: "concat",
        explanation:
          "Returns a new array comprised of this array joined with other array(s) and/or value(s).",
        example:
          "let fruits = ['apple', 'banana'];\nlet moreFruits = fruits.concat('orange', 'kiwi');\n// moreFruits is ['apple', 'banana', 'orange', 'kiwi'], fruits remains unchanged",
      },
      {
        section: "indexOf",
        explanation:
          "Returns the first index at which a given element can be found in the array, or -1 if it is not present.",
        example:
          "let fruits = ['apple', 'banana', 'orange'];\nlet index = fruits.indexOf('banana');\n// index is 1",
      },
      {
        section: "forEach",
        explanation: "Executes a provided function once for each array element.",
        example:
          "let fruits = ['apple', 'banana', 'orange'];\nfruits.forEach(function(fruit) {\n  console.log(fruit);\n});\n// Outputs: 'apple', 'banana', 'orange'",
      },
    ],

    codeExample:
      "let numbers = [];\nconsole.log('Empty Array:', numbers);\n// Outputs: Empty Array: []\n\nnumbers.push(42);\nconsole.log('Array Length:', numbers.length);\n// Outputs: Array Length: 1\n\nnumbers.push(99);\nconsole.log('Updated Array:', numbers);\n// Outputs: Updated Array: [42, 99]",
  },
  functions: {
    overallExplanation:
      "Functions in JavaScript are blocks of reusable code that can be defined and invoked throughout your program. They allow you to organize code into modular and manageable units. Here is an overview of common function-related actions with explanations and code examples:",

    content: [
      {
        section: "Function Declaration",
        explanation:
          "Creating a named function that can be called by its name. Function declarations are hoisted and can be called before they are defined in the code.",
        example: "function greet(name) {\n  return `Hello, ${name}!`;\n}",
      },
      {
        section: "Function Expression",
        explanation:
          "Creating a function as part of an expression. Function expressions can be anonymous or named, and they are not hoisted.",
        example: "const greet = function(name) {\n  return `Hello, ${name}!`;\n};",
      },
      {
        section: "Arrow Function",
        explanation:
          "A concise way to write functions using the arrow (=>) syntax. Arrow functions do not have their own 'this' context and are useful for short, single-expression functions.",
        example: "const greet = (name) => `Hello, ${name}!`;",
      },
      {
        section: "Function Invocation",
        explanation:
          "Calling a function to execute its code. Functions can be invoked with or without arguments.",
        example: "let result = greet('John');\n// result is 'Hello, John!'",
      },
      {
        section: "Return Statement",
        explanation:
          "Returning a value from a function. The 'return' statement ends the function's execution and provides a result back to the caller.",
        example: "function add(a, b) {\n  return a + b;\n}\nlet sum = add(3, 5);\n// sum is 8",
      },
      {
        section: "Parameters",
        explanation:
          "Named variables in a function's signature used to receive values passed during the function invocation. Parameters act as placeholders for arguments.",
        example: "function multiply(x, y) {\n  return x * y;\n}",
      },
      {
        section: "Default Parameters",
        explanation:
          "Assigning default values to function parameters. If an argument is not provided during invocation, the default value is used.",
        example: "function power(base, exponent = 2) {\n  return Math.pow(base, exponent);\n}",
      },
      {
        section: "Rest Parameter",
        explanation:
          "Collecting multiple arguments into a single array-like object within a function. The rest parameter is denoted by three dots (...).",
        example:
          "function sumAll(...numbers) {\n  return numbers.reduce((sum, num) => sum + num, 0);\n}",
      },
      {
        section: "Callback Function",
        explanation:
          "A function passed as an argument to another function and invoked inside that function. Callbacks are commonly used in asynchronous operations.",
        example:
          "function fetchData(callback) {\n  // ... asynchronous operation\n  callback(data);\n}",
      },
    ],

    codeExample: "const result = greet('Alice');\nconsole.log(result);\n// Outputs: Hello, Alice!",
  },
};
