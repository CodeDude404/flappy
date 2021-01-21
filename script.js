const header1 = document.getElementsByTagName("h1")[2];
const button = document.createElementById("btn");


function changeColor() {
	header1.style.color = "blue"
}

button.addEventListener("click", changeColor)





