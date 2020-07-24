var numValueA = document.getElementById("numA");
var numValueB = document.getElementById("numB");
var numValueC = document.getElementById("numC");
var isGameStart = numValueA.getAttribute("value");
var letter;
var chosenButton;
var originalAmount;
var numOfEmptyPiles = 0;
var player = 1;

if(isGameStart == "-1"){ //calculate random pile sizes only at the start.
	var a = (Math.floor(Math.random() * 100) + 1).toString();
	var b = (Math.floor(Math.random() * 100) + 1).toString();
	var c = (Math.floor(Math.random() * 100) + 1).toString();

	numValueA.textContent = a;
	numValueB.textContent = b;
	numValueC.textContent = c;

	numValueA.setAttribute("value", a);
	numValueB.setAttribute("value", b);
	numValueC.setAttribute("value", c);
}

function getValueA(){
	letter = "a";
	getValue(letter);
}

function getValueB(){
	letter = "b";
	getValue(letter);
}

function getValueC(){
	letter = "c";
	getValue(letter);
}

function getValue(letter){
	switch(letter){
		case "a":
			amount = numValueA.getAttribute("value");
			break;
		case "b":
			amount = numValueB.getAttribute("value");
			break;
		default:
			amount = numValueC.getAttribute("value");
			break;
	}

	//setButtonByLetter(letter);
	originalAmount = amount;
	writeAmount(letter);
}

function setButtonByLetter(letter){
	switch(letter){
		case "a":
			chosenButton = document.getElementById("buttonA");
			break;
		case "b":
			chosenButton = document.getElementById("buttonB");
			break;
		default:
			chosenButton = document.getElementById("buttonC");
			break;
	}
}

//asks the player how many matches he chooses
function writeAmount(letter){
	deleteForNextStep();
	var questionsNode = document.getElementById("question");
	var textNode = document.createTextNode("How many matches do you choose to take?");
	var bracket = document.createTextNode("(between 1 to "+originalAmount+")");
	var br = document.createElement("br");
	questionsNode.appendChild(textNode);
	questionsNode.appendChild(br);
	questionsNode.appendChild(bracket);

	var newText = document.createElement("INPUT");
	newText.setAttribute("type", "text");
	newText.setAttribute("id", "textInput");
	newText.setAttribute("class", "textField");
	document.getElementById("textLine").appendChild(newText);

	var submit = document.createElement("a");
	submit.innerHTML = "submit";
	submit.setAttribute("class", "button");
	submit.setAttribute("onclick", "playersMove()");
	document.getElementById("submitButton").appendChild(submit);
}

//read input from player
function playersMove(){
	player = 1;
	var input = document.getElementById("textInput").value;
	var numInput = parseInt(input, 10);
	var originalAmountNum = parseInt(originalAmount, 10);
	//check if input is not valid
	if(!isValidInput(numInput, originalAmountNum)){
		document.getElementById("invalid").innerHTML = "invalid number please try again";
	} else{
		setNewNumber(originalAmountNum, numInput);//when input is valid
		deleteForNextStep();
		createPcTurnButton();
	} 
}

//check if user enterd valid input
function isValidInput(numInput, originalAmountNum){
	if(numInput >= 1 && numInput <= originalAmountNum){
		return true;
	}
	return false;
}
//calculates and sets the new amount of the pile
function setNewNumber(originalAmountNum, numInput){
	var newAmount = originalAmountNum - numInput;
	var numValue;
	switch(letter){
		case "a":
			a = newAmount.toString();
			numValueA.textContent = a;
			numValueA.setAttribute("value", a);
			numValue = numValueA;
			break;
		case "b":
			b = newAmount.toString();
			numValueB.textContent = b;
			numValueB.setAttribute("value", b);
			numValue = numValueB;
			break;
		default:
			c = newAmount.toString();
			numValueC.textContent = c;
			numValueC.setAttribute("value", c);
			numValue = numValueC;
			break;
	}

	//check if pile is empty
	setButtonByLetter(letter);
	if (newAmount == 0){
		numOfEmptyPiles +=1;
		removeEmptyPile(chosenButton, numValue);
		if (numOfEmptyPiles == 3){
			if (player == 1){
				window.location = "win.html";
			} else{
				window.location = "lose.html";
			}
			
		}
	}
}

//delete any node that is not needed for computers turn
function deleteForNextStep(){
	document.getElementById("invalid").innerHTML ="";
	var parentTextNode = document.getElementById("question");
	parentTextNode.innerHTML ="";

	var parentInputNode = document.getElementById("textLine");
	parentInputNode.innerHTML ="";

	var parentSubmit = document.getElementById("submitButton");
	parentSubmit.innerHTML = "";

	document.getElementById("buttonA").setAttribute("onclick","");
	document.getElementById("buttonB").setAttribute("onclick","");
	document.getElementById("buttonC").setAttribute("onclick","");
}

//adds a button that allows the player to move on to pc's turn
function createPcTurnButton(){
	var submit = document.createElement("a");
	submit.innerHTML = "press for computer's turn";
	submit.setAttribute("class", "button");
	submit.setAttribute("onclick", "computersTurn()");
	document.getElementById("submitButton").appendChild(submit);
}

//pc's turn
function computersTurn(){
	player = 0;
	removeComputersButton();
	var first = parseInt(numValueA.getAttribute("value"), 10);
	var second = parseInt(numValueB.getAttribute("value"), 10);
	var third = parseInt(numValueC.getAttribute("value"), 10);
	var nums = [first, second, third];
	pcRandomMove(nums);
	
	returnClickOption();//returns the player the option to choose a pile
}

//returns the player the option to choose a pile
function returnClickOption(){
	document.getElementById("buttonA").setAttribute("onclick","getValueA()");
	document.getElementById("buttonB").setAttribute("onclick","getValueB()");
	document.getElementById("buttonC").setAttribute("onclick","getValueC()");
}

//pc plays randomly
function pcRandomMove(nums){
	var letters = ["a", "b", "c"];
	var number = 0;

	for (var i = 2; i >= 0; i--){
		if (nums[i] > 0){
			letter = letters[i];
			number = nums[i];
			break;
		}
	}

	var randomAmount = Math.floor(Math.random() * number);
	setNewNumber(randomAmount, 0);
}

//removes the button of the empty pile
function removeEmptyPile(chosenButton, numValue){
	chosenButton.setAttribute("class", "");
	chosenButton.innerHTML = "";
}

//removes the button that allows pc to play
function removeComputersButton(){
	document.getElementById("submitButton").innerHTML = "";
}


