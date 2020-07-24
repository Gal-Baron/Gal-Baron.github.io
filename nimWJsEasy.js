var numValueA = document.getElementById("numA");
var numValueB = document.getElementById("numB");
var numValueC = document.getElementById("numC");
var isGameStart = numValueA.getAttribute("value");
var letter;
var chosenButton;
var originalAmount;
var numOfEmptyPiles = 0;
var player = 1;
var a_amount;
var b_amount;
var winningDict = [];
var winningDictSqr = [];
var random;

if(isGameStart == "-1"){ //calculate random pile sizes only at the start.
	random = Math.floor(Math.random() * 20) + 4;
	var goldenRatio = (1 + Math.sqrt(5)) / 2;
	var a = (Math.floor(goldenRatio * random)).toString();
	var b = (Math.floor(Math.pow(goldenRatio, 2) * random) - 1).toString();
	var c = Math.min(parseInt(a), parseInt(b)).toString();
	var cur;

	numValueA.textContent = a;
	numValueB.textContent = b;
	numValueC.textContent = a + " and " + b;

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

	if (letter == "a"){
		amount = numValueA.getAttribute("value");
		a_amount = amount;
	} else if(letter == "b"){
		amount = numValueB.getAttribute("value");
		b_amount = amount;
	} else{
		a = parseInt(numValueA.getAttribute("value"), 10);
		b = parseInt(numValueB.getAttribute("value"), 10);
		a_amount = a;
		b_amount = b;
		amount = Math.min(a, b);
	}
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
			chosenButton = document.getElementById("buttonBoth");
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
	var first = parseInt(numValueA.getAttribute("value"), 10);
	var second = parseInt(numValueB.getAttribute("value"), 10);
	//check if input is not valid
	if(!isValidInput(numInput, originalAmountNum)){
		document.getElementById("invalid").innerHTML = "invalid number please try again";
	} else{
		setNewNumber(first, second, originalAmountNum, numInput);//when input is valid
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
function setNewNumber(aAmountNum,bAmountNum,originalAmountNum, numInput){
	var newAmount = originalAmountNum - numInput;
	var numValue;
	switch(letter){
		case "a":
			a = newAmount.toString();
			aAmountNum = newAmount;
			numValueA.textContent = a;
			numValueA.setAttribute("value", a);
			numValueC.textContent = a + " and " + b;
			break;
		case "b":
			b = newAmount.toString();
			bAmountNum = newAmount;
			numValueB.textContent = b;
			numValueB.setAttribute("value", b);
			numValueC.textContent = a + " and " + b;
			break;
		default:
			aAmountNum -= numInput;
			bAmountNum -= numInput;
			a = (aAmountNum).toString();
			b = (bAmountNum).toString();
			numValueA.textContent = a;
			numValueA.setAttribute("value", a);
			numValueB.textContent = b;
			numValueB.setAttribute("value", b);
			numValueC.textContent = a + " and " + b;
			break;
	}

	//check if pile is empty
	if (newAmount == 0 || aAmountNum == 0 && bAmountNum == 0) {
		if (aAmountNum == 0 && bAmountNum == 0){
			if (player == 1){
				window.location = "win.html";
			} else {
				window.location = "lose.html";
			}
		} else if(letter == "a" || letter == "b"){
			setButtonByLetter(letter);
			removeEmptyPile(chosenButton, numValue);
			setButtonByLetter("c");
			removeEmptyPile(chosenButton, numValue);
		} else {
			setButtonByLetter(letter);
			removeEmptyPile(chosenButton, numValue);
			if (aAmountNum == 0){
				setButtonByLetter("a");
				removeEmptyPile(chosenButton, numValue);
			}
			if (bAmountNum == 0){
				setButtonByLetter("b");
				removeEmptyPile(chosenButton, numValue);
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
	document.getElementById("buttonBoth").setAttribute("onclick","");
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
	pcMove(first, second);
	returnClickOption();//returns the player the option to choose a pile
}

//returns the player the option to choose a pile
function returnClickOption(){
	document.getElementById("buttonA").setAttribute("onclick","getValueA()");
	document.getElementById("buttonB").setAttribute("onclick","getValueB()");
	document.getElementById("buttonBoth").setAttribute("onclick","getValueC()");
}

function pcMove(first, second) {
	if (first == second) {
		letter = "c";
		setNewNumber(first, second, second, second);
	} 
	else if (first == 0) {
		letter = "b";
		setNewNumber(first, second, second, second);
	}
	else if (second == 0) {
		letter = "a";
		setNewNumber(first, second, first, first);
	} else {
		var letters = ["a", "b", "c"];
		var third = Math.min(first, second);
		var nums = [first, second, third];
		var number = 0;
		for (var i = 2; i >= 0; i--){
			if (nums[i] > 0){
				letter = letters[i];
				number = nums[i];
				break;
			}
		}

		var randomAmount = Math.floor(Math.random() * number) + 1;
		orignal = first;
		if (letter == "b") orignal = second;
		setNewNumber(first,second, orignal, randomAmount);
	}

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


