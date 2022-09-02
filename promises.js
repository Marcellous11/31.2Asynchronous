numList = document.querySelector('#numList');
cardList = document.querySelector('#cardList');
stack = document.querySelector('#stack');
btn = document.querySelector('button');

function numberFacts() {
	let res = axios.get('http://numbersapi.com/1..5?');
	res.then((res) => {
		for (let num in res.data) {
			let li = document.createElement('li');
			li.innerHTML = res.data[num];
			numList.append(li);
		}
		return axios.get('http://numbersapi.com/7').then((res) => {
			let li = document.createElement('li');
			li.innerHTML = res.data;
			numList.append(li);
		});
	});
}

function deckOfCards() {
	let res = axios.get('http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');

	res
		.then((res) => {
			console.log('DECK', res);
			return axios.get(`http://deckofcardsapi.com/api/deck/${res.data.deck_id}/draw/?count=1`);
		})
		.then((data) => {
			let li = document.createElement('li');
			for (card in data.data.cards) {
				value = data.data.cards[card]['value'];
				suit = data.data.cards[card]['suit'];
				console.log(`${value} of ${suit} `);
				li.innerHTML = `${value} of ${suit} `;
				cardList.append(li);
			}
			return axios.get(`http://deckofcardsapi.com/api/deck/new/draw/?count1`);
		})
		.then((val) => {
			console.log(val.data);
			deck_id = val.data.deck_id;
			card = val.data.cards[0];
			console.log(` ${card['value']} of ${card['suit']}`);
			return axios.get(`http://deckofcardsapi.com/api/deck/${deck_id}/draw/?count1`);
		})
		.then((val) => {
			card = val.data.cards[0];
			console.log(` ${card['value']} of ${card['suit']}`);
		});
}

numberFacts();
deckOfCards();

function getRndInteger(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

// let resp = axios.get('http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');

// function drawCards(e) {
// 	e.preventDefault();
// 	resp
// 		.then((resp) => {
// 			console.log(resp.data);
// 			return axios.get(`http://deckofcardsapi.com/api/deck/${resp.data.deck_id}/draw/?count1`);
// 		})
// 		.then((resp) => {
// 			console.log(resp.data.cards[0].image);
// 			card = document.createElement('div');
// 			card.classList.add('card');
// 			card.style.backgroundImage = `url(${resp.data.cards[0].image})`;
// 			card.style.transform = `rotate(${getRndInteger(-60, 60)}deg)`;
// 			card.style.transformOrigin = `${getRndInteger(40, 60)}% ${getRndInteger(40, 60)}%`;
// 			console.log(getRndInteger(-60, 60));
// 			stack.append(card);
// 			console.log(resp);
// 		})
// 		.catch((err) => {
// 			btn.innerHTML = 'OUT OF CARDS!!!';
// 			btn.style.backgroundColor = 'red';
// 		});
// }

// btn.addEventListener('click', drawCards);

//   REMEBER: the deck variable is a promise and has to be initalized in the function! Thats how this workds

let URL = 'http://deckofcardsapi.com/api/deck';
let deck = axios.get(`${URL}/new/shuffle/?deck_count=1`);
async function drawCardsPart2(e) {
	e.preventDefault();
	let pDeck = await deck;

	try {
		let apiCardInfo = await axios.get(`${URL}/${pDeck.data.deck_id}/draw/?count1`);
		// console.log(deck.data.deck_id);
		card = document.createElement('div');
		card.classList.add('card');
		card.style.backgroundImage = `url(${apiCardInfo.data.cards[0].image})`;
		card.style.transform = `rotate(${getRndInteger(-60, 60)}deg)`;
		card.style.transformOrigin = `${getRndInteger(40, 60)}% ${getRndInteger(40, 60)}%`;
		stack.append(card);
	} catch (e) {
		btn.innerHTML = 'OUT OF CARDS!!!';
		btn.style.backgroundColor = 'red';
	}
}

btn.addEventListener('click', drawCardsPart2);
