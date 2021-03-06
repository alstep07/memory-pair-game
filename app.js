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
		turnCard(card);
		makeMove(game.currentPair, card);
	}
});

function makeMove(openedCards, card) {
	if (checkPair(openedCards, card)) {
		openedCards.push(card);
		if (openedCards.length === 2) {
			checkMatch(openedCards);
			game.addMove();
		}
	} else {
		turnCard(card);
	}
}

function checkPair(openedCards, card) {
	return !openedCards.includes(card) && openedCards.length < 2;
}

function checkMatch(openedCards) {
	if (openedCards[0].id === openedCards[1].id) {
		removePair(openedCards);
	} else {
		closePair(openedCards);
	}
}

function closePair(openedCards) {
	setTimeout(function () {
		openedCards.forEach((card) => turnCard(card));
		openedCards.length = 0;
	}, CARD_DELAY);
}

function removePair(openedCards) {
	setTimeout(function () {
		openedCards.forEach((card) => removeCard(card));
		openedCards.length = 0;
		game.addCount();
		game.showMenu();
	}, CARD_DELAY);
}

function turnCard(card) {
	card.classList.toggle("card-active");
}

function removeCard(card) {
	card.classList.toggle("card-hidden");
}

function createMenu(title) {
	main.innerHTML = `<div class="menu">
    					<h1 class="menu__title">${title}</h1>
    					<button class="menu__btn">New Game</button>
					</div>`;
	const startBtn = document.querySelector(".menu__btn");
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
