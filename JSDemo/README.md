# javaScript Programming Language 

Grammer/Syntax 
Statements 
Variables 
Data Types
Assignments 
Operators (Assignment operators and Comparison operators)
Conditional Statements
Looping 
Functions 
Classes 
Object Oriented 
JSON 

Variables can be declared in two ways in JS 

using var and using let (keywords)
Examle: var varName;
        var number1=45;
        let number2=56;

Data Types
number : any number
string - Text
null: empty 
undefined 
array (collection )
object 
bool/boolean

Operators: number: +, /, *, -, %(mod)-- Arthemetic operators 
10%3 = 1

  Arrays are collections 

  var names = ["Tesfaye", "Dereje", "Amsalu", "Berhan", "Bety"];

  Accessing array is as follows
  names[0] => "Tesfaye"
  names[4]=> "Bety"


Conditional Statement 

if statement 

Syntax: 
if (condition1){
//Block Statements if condition1 is true
}else { //optional statement if condition1 is false
 //when condition1 false stateement goes here
}

condition1 is an expression that can be evaluated to true or false
ex a > 10 
> greater than 
<  lessthan
>= greater or equal 
<=  less or equal 
==  equal (two values are equal if they are equal by value)
!= not equal 
=== similar (if two values are the same by value and type)

Diff between === and == is 
let a = "10";//string
let b=10;// number 

a == b  True
a === b  False

Switch Statement (Reading assignment )

Looping 

For Loop  
For Each 
While loop 
do while loop 

For Loop Syntax
for(initilize; condition ; action){
  //Repeating statement 
}

for (let i =0; i<10;  i = i + 1){
  console.log('value of i is ', i);
}


function is a block statement that can be reused 

Syntax: 

function functionName (param) {
// block of staments 
}

to use a function 

functionName(param1);

JavaScript object can be declared like below,

let myForm = {};
myForm.firstName = ""



I highly recommend 
Data Structure and Algorithm (in JS)


