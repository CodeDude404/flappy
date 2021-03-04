function log(messsage) {
	console.log(messsage)
}

//Initalize
var PLAYER_SIZE = 20;
var CANVAS = document.getElementById("myCanvas");
var SCORE_TEXT = document.getElementById("score");
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

//Game Functions
//Initlaizer function
function setUpNewGame() {
	OBSTICLES = [];
	SCROLL_SPEED = 2;
	SCORE = 0;
	SCORE_TEXT.textContent = "Score: " + SCORE;
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
	DRAW_OBSTICLES()
	//check if the game is over an if so display a gamover message
	if (GameOVER) {
		CTX.font = "30px Arial";
		CTX.fillText("Press space to begin", 50, 50);
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
	CTX.fillStyle = "orange";
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

		if (Math.abs(obs.x - PLAYER.x) < PLAYER_SIZE && PLAYER.y + PLAYER_SIZE > obs.y && PLAYER.y < obs.height + obs.y) {
			GameOVER = true
		} 
		
		if (obs.x < 0) {
			SCORE++;
			SCORE_TEXT.textContent = "Score: " + SCORE;
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

		if (GameOVER) {
			setUpNewGame();
			GameOVER = false;
		}

		else {
			PLAYER.y_velocity = -4;
		}
	}

	else {
		console.log("Space key not pressed.");
	}
}

);
//Run the game
//start a new game
setUpNewGame();
//set the interval to update the frame
setInterval(frameUpdate, 10);