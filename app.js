const main = document.querySelector(".main");
const game = {
	count: 0,
	moves: 0,
	currentPair: [],
	frontImgSrc: "./img/front.png",
	getRandomIds() {
		let ids = [0, 1, 2, 3, 4, 5];
		return [...ids, ...ids].sort(function () {
			return 0.5 - Math.random();
		});
	},
	addCount() {
		this.count++;
	},
	resetCount() {
		this.count = 0;
	},
	addMove() {
		this.moves++;
	},
	winGame() {
		if (this.count === 6) {
			createMenu(`You won in ${this.moves / 2} moves!`);
		}
	},
	startNewGame() {
		main.innerHTML = "";
		this.resetCount();
		this.getRandomIds().forEach((id) => createCard(id));
	},
};

createMenu("Memory Pairs Game");

function createMenu(title) {
	main.innerHTML = "";
	const startMenu = document.createElement("div");
	const startHeader = document.createElement("h1");
	const startBtn = document.createElement("button");
	startHeader.textContent = title;
	startBtn.textContent = "New Game";

	startMenu.classList.add("menu");
	startHeader.classList.add("menu__title");
	startBtn.classList.add("menu__btn");

	startMenu.append(startHeader, startBtn);
	main.append(startMenu);
	startBtn.addEventListener("click", function () {
		game.startNewGame();
	});
}

function closePair(arr) {
	setTimeout(function () {
		arr.forEach((card) => card.classList.toggle("card-active"));
		arr.length = 0;
	}, 500);
}

function removePair(arr) {
	arr.forEach((card) => (card.style.visibility = "hidden"));
	arr.length = 0;
	game.addCount();
	game.winGame();
}

function turnCards(arr) {
	if (arr[0] !== arr[1] && arr[0].id === arr[1].id) {
		removePair(arr);
		console.log(arr[1]);
	}
	closePair(arr);
}

function checkTurn(card) {
	if (game.currentPair.indexOf(card) === -1 && game.currentPair.length < 2) {
		game.addMove();
		game.currentPair.push(card);
		turnCards(game.currentPair);
	} else {
		card.classList.toggle("card-active");
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
		checkTurn(card);
	});

	main.append(card);
}
