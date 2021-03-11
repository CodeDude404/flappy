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
var PLAYERcolor = "orange";
var immortal = false;

//Game Functions
//Initlaizer function
function setUpNewGame() {
	OBSTICLES = [];
	SCROLL_SPEED = 2;
	SCORE = 0;
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
		CTX.fillText("Score: " + SCORE + " High: " + high + " Speed: " + Math.round((SCROLL_SPEED + Number.EPSILON) * 100) / 100, 10, 30)

		CTX.fillText("Don't Touch the Obstacles v1.0", CANVAS.width - 280, 30)
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
	CTX.beginPath();
	CTX.rect(PLAYER.x, PLAYER.y, PLAYER_SIZE, PLAYER_SIZE);
	CTX.fillStyle = PLAYERcolor;
	CTX.fill();
}

function spawnObs() {
	var obs = {
		x: CANVAS.width, //CANVAS.width
		y: Math.random() * GROUND_LEVEL,
		height: Math.random() * 100 + PLAYER_SIZE
	};


	OBSTICLES.push(obs);
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
		}

		if (obs.x < 0) {
			SCORE++;
			OBSTICLES.splice(length, 1);
		}
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

var convert = new converter;


function SaveCodes() {
	var scoreBin = convert.toBinaryfromNum(SCORE);
	var highBin = convert.toBinaryfromNum(high);

	document.getElementById("save1").innerHTML = "Save code 1: " + scoreBin
	document.getElementById("save2").innerHTML = "Save code 2: " + highBin
}


function LoadCodes() {

	if (document.getElementById("code1").value === "immortal1234") {
		immortal = true;
		document.getElementById("code1").value === "immortal1234";
	} else {
		SCORE = convert.fromBinarytoNum(document.getElementById("code1").value)
		high = convert.fromBinarytoNum(document.getElementById("code2").value)
	}
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


		var x = document.getElementById("colorPlayer").value;

		if (x === "orange") {
			PLAYERcolor = "orange"
		} else if (x === "red") {
			PLAYERcolor = "red"
		} else if (x === "black") {
			PLAYERcolor = "black"
		}


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
setUpNewGame();
//set the interval to update the frame
setInterval(frameUpdate, 10);