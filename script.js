let bg = document.querySelector(".bg");

let fireCar = document.querySelector(".fireCar");
let fire = document.querySelector(".fire");
let apple = document.querySelector(".apple");
let wood = document.querySelector(".wood");
let house = document.querySelector(".house");

let water = document.querySelector(".water");

let score = document.querySelector(".score");
let dialog = document.querySelector(".dialog");

house.onclick = function() {
		dialog.innerHTML = "Деревня в опасности!";

		dialog.style.opacity = "1";
		dialog.style.color = "#fff";

		dialog.style.top = "380px";
		dialog.style.left = "600px";

		dialog.style.width = "500px";

		setTimeout(function(){
			dialog.innerHTML = "Тебе нужно погасить пожар. " + " Используй пробел для тушения.";
			setTimeout(function(){
				dialog.innerHTML = "Не смей сбивать яблоки.";
				setTimeout(function(){
					dialog.style.opacity = "0";
					game();
				}, 2500);
			}, 4000);
		}, 2500);
}

function game() {

	house.onclick = function(){}

	fireCar.style.animation = "ride 4s linear 0s infinite";

	function getRand(max,min){
		let ranNum = Math.floor(Math.random() * (max - min + 1)) + min;
		return ranNum;
	}

	house.style.animation = "saturMove 5s linear 0s infinite";

	setInterval(function(){
		let fireOrApple = getRand(2,0);
		let woodOrHouse = getRand(1,0);

		if ( fireOrApple == 0 ){
			fire.style.display = "inline-block";
			apple.style.display = "none";
		}
		if ( fireOrApple == 1 || fireOrApple == 2) {
			fire.style.display = "none";
			apple.style.display = "inline-block";
		}

		if ( woodOrHouse == 0 ){
			wood.style.display = "inline-block";
			house.style.display = "none";
		}
		if ( woodOrHouse == 1 ){
			wood.style.display = "none";
			house.style.display = "inline-block";

			apple.style.display = "none";
		}
	}, 5000);

	setInterval(function(){
		score.innerHTML++;
	}, 2000);

	function extinguish() {
		water.style.display = "inline-block";
		water.style.animation = "fly 1s linear";
		setTimeout(function dis(){water.style.display = "none"}, 1000);
	}

	document.addEventListener("keydown", extinguish);

	setInterval(function(){
		let carLeft = parseInt(window.getComputedStyle(fireCar).getPropertyValue("left"));

		let waterLeft = parseInt(window.getComputedStyle(water).getPropertyValue("left"));
		let fireLeft = parseInt(window.getComputedStyle(fire).getPropertyValue("left"));
		let appleLeft = parseInt(window.getComputedStyle(apple).getPropertyValue("left"));

		if (waterLeft > fireLeft - 50 && waterLeft < fireLeft + 50 && waterLeft > 50){
			fire.style.display = "none";
			water.style.left = "50px";
		}
		if (waterLeft > appleLeft - 50 && waterLeft < appleLeft + 50 && waterLeft > 50 && apple.style.display == "inline-block"){
			apple.style.display = "none";

			score.innerHTML = score.innerHTML - 20;
		}
		if (carLeft > fireLeft - 120){
			dialog.innerHTML = "Вы проиграли.";
			setTimeout(function(){
				dialog.style.opacity = "0";
			}, 1000);

			score.innerHTML = "0";

			dialog.style.opacity = "1";
			dialog.style.color = "red";

			dialog.style.left = "450px";
		}

	},1);

}