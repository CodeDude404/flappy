class converter {
	toBinaryfromNum(number) {
		number = parseInt(number)

		// convert to binary
		return number.toString(2)

	}

	fromBinarytoNum(bin) {
		return parseInt(bin, 2)
	}
}

//Initalize
var PLAYER_SIZE = 20;
var CANVAS = document.getElementById("myCanvas");

CANVAS.width = window.innerWidth;
CANVAS.height = window.innerHeight - 50;


var CTX = CANVAS.getContext("2d");
var GROUND_LEVEL = CANVAS.height - 50;
var SCORE = 0;
var OBSTICLES;
var SCROLL_SPEED;
var PLAYER;
var GameOVER;
var OBSTICLE_COOLDOWN_TIME = 40;
var OBSTICLE_SPAWNER = OBSTICLE_COOLDOWN_TIME;
var obs = [];

var high = 0;
var not_paused_speed = 0
var paused = false;
var PLAYERcolor = "white";
var immortal = false;
var gold = 0;
var unicornEnabled = false;

//Game Functions
//Initlaizer function
function setUpNewGame() {
	OBSTICLES = [];
	SCROLL_SPEED = 2;
	GameOVER = true;
	
	SCORE = 0; //make the score 0

	PLAYER = {
		x: CANVAS.width / 4, //Set the player x corrodnate to the canvas width 	divided by 4
		y: GROUND_LEVEL - PLAYER_SIZE, //Set the player y corrodnate of the	ground minus the size of the player so that the player is not in the 	ground
		y_velocity: 0 //Set the up and down speed to 0
	}

		;
}

//make a function to update the frame
function frameUpdate() {
	if (GameOVER === false) {
		updateGameState();
	}

	else { }

	drawGame();
	if (immortal === true) {
		gold = 0
	}
}

//make a function to draw the game
function drawGame() {
	drawBackground();
	drawPlayer();

	CTX.fillStyle = "orange"
	DRAW_OBSTICLES()


	if (high < SCORE) {
		high = SCORE
	}
	//check if the game is over an if so display a gamover message
	if (GameOVER) {
		CTX.font = "30px Arial";
		CTX.fillStyle = "orange"
		CTX.fillText("Press space or tap the screen to begin", 50, 60);
		CTX.font = "20px Arial";
		CTX.fillText("Don't Touch the Obstacles v1.0", CANVAS.width - 280, 30)
		CTX.fillText("Score: " + SCORE + " High: " + high + " Speed: " + Math.round((SCROLL_SPEED + Number.EPSILON) * 100) / 100, 10, 30)

	}

	else {
		CTX.font = "20px Arial";
		CTX.fillStyle = "orange"
		if (immortal === true) {
			CTX.fillText("IMMORTAL CHEAT")
			CTX.fillText("Don't Touch the Obstacles v1.0", CANVAS.width - 280, 30)
		} else {
			CTX.fillText("Score: " + SCORE + " High: " + high + " Speed: " + Math.round((SCROLL_SPEED + Number.EPSILON) * 100) / 100, 10, 30)
			CTX.fillText("Don't Touch the Obstacles v1.0", CANVAS.width - 280, 30)
		}
	}
}

function drawBackground() {
	//sky
	CTX.beginPath();
	CTX.rect(0, 0, CANVAS.width, CANVAS.height);
	CTX.fillStyle = "blue";
	CTX.fill();
	//ground
	CTX.beginPath();
	CTX.rect(0, GROUND_LEVEL, CANVAS.width, CANVAS.height - GROUND_LEVEL);
	CTX.fillStyle = "green";
	CTX.fill();
}

function drawPlayer() {

	if (unicornEnabled === false) {
		CTX.beginPath();
		CTX.rect(PLAYER.x, PLAYER.y, PLAYER_SIZE, PLAYER_SIZE);
		CTX.fillStyle = PLAYERcolor;
		CTX.fill();
	} else if (unicornEnabled === true) {
		var grd = CTX.createLinearGradient(0, 0, 20, 0);
		grd.addColorStop(0, "red");
		grd.addColorStop(0.01, "orange");
		grd.addColorStop(0.02, "yellow");
		grd.addColorStop(0.03, "green");
		grd.addColorStop(0.04, "blue");
		grd.addColorStop(0.05, "purple");
		grd.addColorStop(0.06, "pink");
		CTX.fillStyle = grd;
		CTX.fillRect(PLAYER.x, PLAYER.y, PLAYER_SIZE, PLAYER_SIZE);
	}
}

function spawnObs() {
	var obs = {
		x: CANVAS.width, //CANVAS.width
		y: Math.random() * GROUND_LEVEL,
		height: Math.random() * 100 + PLAYER_SIZE
	};

	if (obs.x in OBSTICLES) {
		spawnObs()
		return
	} if (obs.y in OBSTICLES) {
		spawnObs()
		return
	} else {
		OBSTICLES.push(obs);
	}


	
}


function updateGameState() {
	PLAYER.y += PLAYER.y_velocity;


	if (PLAYER.y >= GROUND_LEVEL - PLAYER_SIZE) {
		PLAYER.y = GROUND_LEVEL - PLAYER_SIZE;
		PLAYER.y_velocity = 0;
	}

	else if (PLAYER.y <= 0) {
		PLAYER.y_velocity = 0.1;
		PLAYER.y = 0;
	}

	else {
		PLAYER.y_velocity += 0.1;
	}

	OBSTICLE_SPAWNER -= 1;

	if (OBSTICLE_SPAWNER < 1) {
		OBSTICLE_SPAWNER = (OBSTICLE_COOLDOWN_TIME + (Math.floor(Math.random() * 50))) //mabye add math.floor
		spawnObs()
	}
	//update obs postition and check for collision
	var length = OBSTICLES.length;

	while (length--) {
		var obs = OBSTICLES[length];
		obs.x -= SCROLL_SPEED;

		if (Math.abs(obs.x - PLAYER.x) < PLAYER_SIZE && PLAYER.y + PLAYER_SIZE > obs.y && PLAYER.y < obs.height + obs.y && paused == false && immortal == false) {
			GameOVER = true
			Save()
			gold = Number(gold) + Number(Math.round(SCORE / 5))
			document.getElementById("goldCounter").innerHTML = "<i class=\"fas fa-coins fa-2x\"></i> <b>" + gold + "</b>"

		}

		if (obs.x < 0) {
			SCORE++;
			OBSTICLES.splice(length, 1);
			SCROLL_SPEED += 0.01
		}
	}


}

function ActivateCode() {
	var codeInput = document.getElementById("code").value;

	if (codeInput === "2*dJG5^dAR") {
		immortal = true
		logs.innerHTML = ">> Used a code to make player immortal!" + logs.innerHTML
	} else if (codeInput === "!qgHVG64z%") {
		PLAYERcolor = "#ff2e69";
		logs.innerHTML = ">> Used a code to make player color #ff2e69." + logs.innerHTML
	}
}


function DRAW_OBSTICLES() {
	var length = OBSTICLES.length;

	while (length--) {
		var obs = OBSTICLES[length]
		CTX.beginPath()
		CTX.rect(obs.x, obs.y, PLAYER_SIZE, obs.height);
		CTX.fillStyle = "brown";
		CTX.fill()
	}

}

//event listener
document.addEventListener("keydown", function (event) {
	if (event.code == "Space") {
		console.log("Space key pressed.");

		if (paused === false) {
			if (GameOVER) {
				setUpNewGame();
				GameOVER = false;
			}

			else {
				PLAYER.y_velocity = -4;
			}
		} else { }
	}

	else {
		console.log("Space key not pressed.");
	}
}

);


var currentPlayerY = 0;
var yelocity = 0;
var menu = document.getElementById("pauseMenu")
var scoreTxt = document.getElementById("score")
var highTXT = document.getElementById("high")
var logs = document.getElementById("logs")

var convert = new converter;

function Save() {
	if (typeof (Storage) !== "undefined") {
		// Store
		localStorage.setItem("score", SCORE);
		localStorage.setItem("highscore", high)
		localStorage.setItem("gold", gold)
		// Retrieve
		logs.innerHTML = ">> Save sucessful <br>" + logs.innerHTML
	} else {
		logs.innerHTML = ">> Save unsupported <br>" + logs.innerHTML
	}
}


function Load() {
	if (typeof (Storage) !== "undefined") {
		// Retrieve
		SCORE = localStorage.getItem("score");
		high = localStorage.getItem("highscore")
		gold = Number(localStorage.getItem("gold"))

		highTXT.innerHTML = "High-score: " + high;
		scoreTxt.innerHTML = "Score: " + SCORE;

		if (localStorage.getItem("RedCube") === "owned") {
			document.getElementById("redCube").innerHTML = "<button type=\"button\" class=\"btn btn-success\" onclick=\"js:equipRed()\">Equip</button>"
		}

		if (localStorage.getItem("OrangeCube") === "owned") {
			document.getElementById("orangeCube").innerHTML = "<button type=\"button\" class=\"btn btn-success\" onclick=\"js:equipOrange()\">Equip</button>"
		}

		if (localStorage.getItem("YellowCube") === "owned") {
			document.getElementById("yellowCube").innerHTML = "<button type=\"button\" class=\"btn btn-success\" onclick=\"js:equipYellow()\">Equip</button>"
		}

		if (localStorage.getItem("GreenCube") === "owned") {
			document.getElementById("greenCube").innerHTML = "<button type=\"button\" class=\"btn btn-success\" onclick=\"js:equipGreen()\">Equip</button>"
		}

		if (localStorage.getItem("BlueCube") === "owned") {
			document.getElementById("blueCube").innerHTML = "<button type=\"button\" class=\"btn btn-success\" onclick=\"js:equipBlue()\">Equip</button>"
		}
		if (localStorage.getItem("PurpleCube") === "owned") {
			document.getElementById("purpleCube").innerHTML = "<button type=\"button\" class=\"btn btn-success\" onclick=\"js:equipPurple()\">Equip</button>"
		}			
		if (localStorage.getItem("BlackCube") === "owned") {
			document.getElementById("blackCube").innerHTML = "<button type=\"button\" class=\"btn btn-success\" onclick=\"js:equipBlack()\">Equip</button>"
		}	
		logs.innerHTML = ">> Load sucessful <br>" + logs.innerHTML
	} else {
		logs.innerHTML = ">> Load unsupported <br>" + logs.innerHTML
	}
}


function RESET() {
	var con = confirm("Reset your game progress (this cannot be undone)")

	if (con === true) {
		localStorage.clear();
		console.log("cleared")
	}
}


function buyRedCube() {
	if (gold >= 20) {
		if (typeof (Storage) !== "undefined") {
			gold -= 20
			// Store
			localStorage.setItem("RedCube", "owned");
			// Retrieve
			logs.innerHTML = ">> Bought Red Cube <br>" + logs.innerHTML
		}

		document.getElementById("redCube").innerHTML = "<button type=\"button\" class=\"btn btn-success\" onclick=\"js:equipRed()\">Equip</button>"
	} else {
		logs.innerHTML = ">> Insufficient recources <br>" + logs.innerHTML
	}
}

function buyOrangeCube() {
	if (gold >= 30) {
		if (typeof (Storage) !== "undefined") {
			gold -= 30
			// Store
			localStorage.setItem("OrangeCube", "owned");
			// Retrieve
			logs.innerHTML = ">> Bought Orange Cube <br>" + logs.innerHTML
		}

		document.getElementById("orangeCube").innerHTML = "<button type=\"button\" class=\"btn btn-success\" onclick=\"js:equipOrange()\">Equip</button>"
	} else {
		logs.innerHTML = ">> Insufficient recources <br>" + logs.innerHTML
	}
}


function buyYellowCube() {
	if (gold >= 40) {
		if (typeof (Storage) !== "undefined") {
			gold -= 40
			// Store
			localStorage.setItem("YellowCube", "owned");
			// Retrieve
			logs.innerHTML = ">> Bought Yellow Cube <br>" + logs.innerHTML
		}

		document.getElementById("yellowCube").innerHTML = "<button type=\"button\" class=\"btn btn-success\" onclick=\"js:equipYellow()\">Equip</button>"
	} else {
		logs.innerHTML = ">> Insufficient recources <br>" + logs.innerHTML
	}
}

function buyGreenCube() {
	if (gold >= 50) {
		if (typeof (Storage) !== "undefined") {
			gold -= 50
			// Store
			localStorage.setItem("GreenCube", "owned");
			// Retrieve
			logs.innerHTML = ">> Bought Green Cube <br>" + logs.innerHTML
		}

		document.getElementById("greenCube").innerHTML = "<button type=\"button\" class=\"btn btn-success\" onclick=\"js:equipGreen()\">Equip</button>"
	} else {
		logs.innerHTML = ">> Insufficient recources <br>" + logs.innerHTML
	}
}

function buyBlueCube() {
	if (gold >= 60) {
		if (typeof (Storage) !== "undefined") {
			gold -= 60
			// Store
			localStorage.setItem("BlueCube", "owned");
			// Retrieve
			logs.innerHTML = ">> Bought Blue Cube <br>" + logs.innerHTML
		}

		document.getElementById("blueCube").innerHTML = "<button type=\"button\" class=\"btn btn-success\" onclick=\"js:equipBlue()\">Equip</button>"
	} else {
		logs.innerHTML = ">> Insufficient recources <br>" + logs.innerHTML
	}
}

function buyPurpleCube() {
	if (gold >= 70) {
		if (typeof (Storage) !== "undefined") {
			gold -= 70
			// Store
			localStorage.setItem("PurpleCube", "owned");
			// Retrieve
			logs.innerHTML = ">> Bought Purple Cube <br>" + logs.innerHTML
		}

		document.getElementById("purpleCube").innerHTML = "<button type=\"button\" class=\"btn btn-success\" onclick=\"js:equipPurple()\">Equip</button>"
	} else {
		logs.innerHTML = ">> Insufficient recources <br>" + logs.innerHTML
	}
}

function buyBlackCube() {
	if (gold >= 80000000) {
		if (typeof (Storage) !== "undefined") {
			gold -= 80000000
			// Store
			localStorage.setItem("BlackCube", "owned");
			// Retrieve
			logs.innerHTML = ">> Bought Black Cube <br>" + logs.innerHTML
		}

		document.getElementById("blackCube").innerHTML = "<button type=\"button\" class=\"btn btn-success\" onclick=\"js:equipBlack()\">Equip</button>"
	} else {
		logs.innerHTML = ">> Insufficient recources <br>" + logs.innerHTML
	}
}

function equipWhite() {
	PLAYERcolor = "white"
	logs.innerHTML = ">> Equipped White Cube <br>" + logs.innerHTML
}

function equipRed() {
	PLAYERcolor = "red"
	logs.innerHTML = ">> Equipped Red Cube <br>" + logs.innerHTML
}

function equipOrange(){
	PLAYERcolor = "orange"
	logs.innerHTML = ">> Equipped Orange Cube <br>" + logs.innerHTML
}

function equipYellow(){
	PLAYERcolor = "yellow"
	logs.innerHTML = ">> Equipped Yellow Cube <br>" + logs.innerHTML
}

function equipGreen(){
	PLAYERcolor = "green"
	logs.innerHTML = ">> Equipped Green Cube <br>" + logs.innerHTML
}

function equipBlue(){
	PLAYERcolor = "blue"
	logs.innerHTML = ">> Equipped Blue Cube <br>" + logs.innerHTML
}

function equipPurple(){
	PLAYERcolor = "purple"
	logs.innerHTML = ">> Equipped Purple Cube <br>" + logs.innerHTML
}

function equipBlack(){
	PLAYERcolor = "black"
	logs.innerHTML = ">> Equipped Black Cube <br>" + logs.innerHTML
}

function PausePlay() {

	if (paused === false) {
		not_paused_speed = SCROLL_SPEED;
		SCROLL_SPEED = 0;
		currentPlayerY = PLAYER.y

		paused = true
		menu.className = "container"
		CANVAS.style.display = "none"
		scoreTxt.innerHTML = "Score: " + SCORE;
		highTXT.innerHTML = "High-score: " + high;






	} else {
		SCROLL_SPEED = not_paused_speed;
		PLAYER.y = currentPlayerY;
		yelocity = PLAYER.y_velocity
		PLAYER.y_velocity = 0

		paused = false
		CANVAS.style.display = ""
		menu.className = "container hidden"



	}

}


function game() {
	GameOVER = true;

}


var el = document.getElementById('myCanvas')
var clickHandler = function () {
	if (paused === false) {
		if (GameOVER) {
			setUpNewGame();
			GameOVER = false;
		}

		else {
			PLAYER.y_velocity = -4;
		}
	} else { }
}




el.addEventListener('click', clickHandler)



//Run the game
//start a new game
Load()
document.getElementById("goldCounter").innerHTML = "<i class=\"fas fa-coins fa-2x\"></i> <b>" + gold + "</b>"

setUpNewGame();

//set the interval to update the frame
setInterval(frameUpdate, 10);