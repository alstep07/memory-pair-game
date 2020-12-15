const main = document.querySelector(".main");
const frontImgSrc = "./img/front.png";
const ids = [0,1,2,3,4,5];
let openCards = [];

startNewGame();

function closeCards (arr) {
	arr.forEach(card => card.classList.toggle('card-active'));
	arr.length = 0;
}

function removePair(arr){
	arr.forEach(item => item.style.visibility="hidden");
			arr.length = 0;
}

function getRandomIds(arr){
	return [...arr,...arr].sort(function(){return 0.5 - Math.random()});
}

function turnCards(arr){
	if (arr.length === 2) {
		if (arr[0].id === arr[1].id) {
			setTimeout(function(){removePair(arr)},500);
		} else {
			setTimeout(function(){closeCards(arr);}, 700);
		}
	}
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
	card.setAttribute("id", id);

	front.classList.add("card__front");
	back.classList.add("card__back");
	frontImg.classList.add("card__img");
	backImg.classList.add("card__img");
	card.classList.add("card");

	card.addEventListener("click", function () {
		card.classList.toggle("card-active");
		openCards.push(card);
		turnCards(openCards);
	});

	main.append(card);
}

function startNewGame(){
	getRandomIds(ids).forEach(id => createCard(id));
}
