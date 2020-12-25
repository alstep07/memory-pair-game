const main = document.querySelector(".main");
const CARD_DELAY = 500;
const PAIRS_QUANTITY = 6;
const game = {
	count: 0,
	moves: 0,
	currentPair: [],
	frontImgSrc: "./img/front.png",
	cardIds: [0, 1, 2, 3, 4, 5],
	getRandomIds() {
		return [...this.cardIds, ...this.cardIds].sort(
			() => 0.5 - Math.random()
		);
	},
	addCount() {
		this.count++;
	},
	resetGame() {
		this.count = 0;
		this.moves = 0;
	},
	addMove() {
		this.moves++;
	},
	showMenu() {
		if (this.count === PAIRS_QUANTITY) {
			createMenu(`You won in ${this.moves} moves!`);
		}
	},
	startNewGame() {
		main.innerHTML = "";
		this.resetGame();
		this.getRandomIds().forEach(
			(id) => (main.innerHTML += createCard(this, id))
		);
	},
};

createMenu("Memory Pairs Game");

main.addEventListener("click", function ({ target }) {
	let card = target.closest(".card");
	if (card) {
		turnPair(game.currentPair, card);
	}
});

function turnPair(openedCards, card) {
	if (checkTurn(openedCards, card)) {
		openedCards.push(card);
		if (openedCards.length === 2) {
			checkMatch(openedCards);
			game.addMove();
		}
	} else {
		turnCard(card);
	}
}

function checkTurn(openedCards, card) {
	return !openedCards.includes(card) && openedCards.length < 2;
}

function checkMatch(openedCards) {
	console.log(openedCards)
	if (openedCards[0] === openedCards[1]) {
		removePair(openedCards);
	} else {
		closePair(openedCards);
	}
}

function closePair(openedCards) {
	openedCards.forEach((card) => turnCard(card));
	openedCards.length = 0;
}

function removePair(openedCards) {
	openedCards.forEach((card) => removeCard(card));
	openedCards.length = 0;
	game.addCount();
	game.showMenu();
}

function turnCard(card) {
	card.classList.toggle("card-active");
}

function removeCard(card) {
	card.style.visibility = "hidden";
}

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

function createCard(game, id) {
	const card = `<div id=${id} class="card">
    <div class="card__flipper">
        <div class="card__front">
            <img src=${game.frontImgSrc} alt="" class="card__img">
        </div>
        <div class="card__back">
            <img src="./img/${id}.png" alt="" class="card__img">
        </div>
    </div>
</div>`;

	return card;
}
