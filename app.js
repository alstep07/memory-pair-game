const main = document.querySelector(".main");

const game = {
	count: 0,
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
	winGame() {
		if (this.count === 6) {
			setTimeout(function () {
				alert("You win!");
			}, 800);
		}
	},
	startNewGame() {
		this.getRandomIds().forEach((id) => createCard(id));
	},
};

function closePair(arr) {
	setTimeout(function () {
		arr.forEach((card) => card.classList.toggle("card-active"));
		arr.length = 0;
	}, 500);
}

function removePair(arr) {
	setTimeout(function () {
		arr.forEach((card) => (card.style.visibility = "hidden"));
		arr.length = 0;
		game.addCount();
		game.winGame();
	}, 500);
}

function turnCards(arr) {
	if (arr[0] !== arr[1] && arr[0].id === arr[1].id) {
		removePair(arr);
	} else {
		closePair(arr);
	}
}

function checkTurn(card) {
	if (game.currentPair.indexOf(card) === -1 && game.currentPair.length < 2) {
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

game.startNewGame();
