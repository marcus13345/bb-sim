const humanNames = require('human-names');
const uuid = require('uuid');
const chalk = require('chalk');

console.clear();

function randomDist() {
	let u = 0, v = 0;
	while(u === 0) u = Math.random(); // Converting [0,1) to (0,1)
	while(v === 0) v = Math.random();
	return Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
}

function combinations(arr) {
	let pairs = [];

	for(const [i, itemA] of Object.entries(arr)) {
		for(let j = parseInt(i) + 1; j < arr.length; j ++) {
			const itemB = arr[j];
			pairs.push([
				itemA, itemB
			]);
		}
	}

	return pairs;
}

function testRandom(randomFn, samples, bounds) {
	const realOne = randomFn();
	let buckets = {};
	for(let i = -bounds; i <= bounds; i ++) {
		buckets[i] = 0;
	}
	for(let i = 0; i < samples; i ++) buckets[randomFn()] ++;
	for(let i = -bounds; i <= bounds; i ++) {
		const bar = `${('' + i).padStart(4)}| ${'#'.repeat((buckets[i] / (samples)) * 1000)}`;
		if(i === realOne) {
			console.log(chalk.greenBright(bar));
		} else console.log(bar);
	}
}

class House {
	day = 0;

	people = [];

	constructor() {
		for(let i = 0; i < 14; i ++) {
			this.people.push(Person.create());
		}

		// for(const person of this.people) {
		// 	console.log(person.name);
		// }
	}

	executeDay() {
		this.day ++;
		// if(this.day === 1) {
		// 	// first day!
		// }

		const people = this.people.map(Person.fromId);
		const pairs = combinations(people);

		for(const [p1, p2] of pairs) {
			if(Math.random() < 0.5) p1.talkTo(p2);
			else p2.talkTo(p1);
		}


	}
}

class Conversation {
	personA = null;
	personB = null;

	state = 1;

	constructor(a, b) {
		this.personA = a;
		this.personB = b;
	}

	get over() {
		return this.state === 0;
	}

	converse() {
		const rand = () => Math.round(randomDist() * 5);



		// setTimeout(this.converse.bind(this), 1000);
	}

}

class Person {
	gender;
	name;

	relationships = {};

	static database = new Map();

	static fromId(id) {
		return Person.database.get(id);
	}

	static create() {
		const person = new Person();
		Person.database.set(person.id, person);
		return person.id;
	}

	constructor() {
		this.gender = Math.random() > 0.5 ? 'male' : 'female';

		if (this.gender === 'female') this.name = humanNames.femaleRandomEn();
		if (this.gender === 'male') this.name = humanNames.maleRandomEn();

		this.id = uuid.v4();
	}

	destroy() {
		Person.database.delete(this.id);
	}

	toString() {
		return this.name;
	}

	talkTo(other) {
		// sanity convert id to person
		if(typeof other === 'string') other = Person.fromId(other);

		// if no relationship present, create it.
		if(!(other.id in this.relationships))
			this.relationships[other.id] = 0;

		const conversation = new Conversation(this, other);

		while(!conversation.over) {
			const sentiments = conversation.converse();
		}

	}
}


setInterval(() => {
	testRandom(() => randomDist() * 5, 10 ** 6, 17);
}, 5000)


// const house = new House();
// // while(house.people.length !== 1) {
// 	house.executeDay();
// // }
