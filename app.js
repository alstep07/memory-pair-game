const main = document.querySelector(".main");

const game = {
	count: 0,
	currentPair: [],
	ids: [0, 1, 2, 3, 4, 5],
	frontImgSrc: "./img/front.png",
	plus: function () {
		this.count++;
	},
	winGame: function () {
		if (this.count === 6) {
			setTimeout(function () {
				alert("You win!");
			}, 500);
		}
	},
};

startNewGame();

function closePair(arr) {
	setTimeout(function () {
		arr.forEach((card) => card.classList.toggle("card-active"));
		arr.length = 0;
	}, 700);
}

function removePair(arr) {
	setTimeout(function () {
		arr.forEach((card) => (card.style.visibility = "hidden"));
		arr.length = 0;
		game.plus();
		game.winGame();
	}, 300);
}

function getRandomIds(arr) {
	return [...arr, ...arr].sort(function () {
		return 0.5 - Math.random();
	});
}

function turnCards(arr) {
	if (arr.length === 2 && arr[0] !== arr[1]) {
		if (arr[0].id === arr[1].id) {
			removePair(arr);
		} else {
			closePair(arr);
		}
	}
}

function startNewGame() {
	getRandomIds(game.ids).forEach((id) => createCard(id));
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

	frontImg.setAttribute("src", game.frontImgSrc);
	backImg.setAttribute("src", `./img/${id}.png`);
	card.setAttribute("id", id);

	front.classList.add("card__front");
	back.classList.add("card__back");
	frontImg.classList.add("card__img");
	backImg.classList.add("card__img");
	card.classList.add("card");

	card.addEventListener("click", function () {
		card.classList.toggle("card-active");
		game.currentPair.push(card);
		turnCards(game.currentPair);
	});

	main.append(card);
}
