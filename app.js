const main = document.querySelector(".main");
const frontImgSrc = "./img/front.png";
const ids = [0,1,2,3,4,5];

function getRandomIds(arr){
	return [...arr,...arr].sort(function(){return 0.5 - Math.random()});
}

function tryMatch(){
	
}

function createCard(id) {
	const card = document.createElement("div");
	const front = document.createElement("div");
	const back = document.createElement("div");
	const frontImg = document.createElement("img");
	const backImg = document.createElement("img");

	front.append(frontImg);
	back.append(backImg);
	card.append(front, back);

	frontImg.setAttribute("src", frontImgSrc);
	backImg.setAttribute("src", `./img/${id}.png`);

	front.classList.add("card__front");
	back.classList.add("card__back");
	frontImg.classList.add("card__img");
	backImg.classList.add("card__img");
	card.classList.add("card");

	card.addEventListener("click", function () {
		card.classList.toggle("card-active");
	});

	main.append(card);
}

getRandomIds(ids).forEach(id => createCard(id));
