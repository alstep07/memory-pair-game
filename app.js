const main = document.querySelector(".main");
const cards = [
	{ src: "./img/js.png" },
	{ src: "./img/react.png" },
	{ src: "./img/html.png" },
	{ src: "./img/css.png" },
	{ src: "./img/ts.png" },
	{ src: "./img/git.png" },
];

const container = document.createDocumentFragment();

function render(image) {
	const frontImgSrc = "./img/kottans.png";
	const card = document.createElement("div");
	const front = document.createElement("div");
	const back = document.createElement("div");
	const frontImg = document.createElement("img");
	const backImg = document.createElement("img");

	front.append(frontImg);
	back.append(backImg);
	card.append(front, back);

	frontImg.setAttribute("src", frontImgSrc);
	backImg.setAttribute("src", image.src);

	front.classList.add("card__front");
	back.classList.add("card__back");
	frontImg.classList.add("card__img");
	backImg.classList.add("card__img");
	card.classList.add("card");

	card.addEventListener("click", function () {
		card.classList.toggle("card-active");
	});

	return card;
}

cards.forEach(card => container.append(render(card)));
cards.forEach(card => container.append(render(card)));

main.append(container);
