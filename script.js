const header = document.getElementsByTagName("h1")[0];
const button = document.getElementById("btn");


function changeColor() {
	header.style.color = "aqua";
}


button.addEventListener("click",changeColor);

