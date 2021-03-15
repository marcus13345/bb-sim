const humanNames = require('human-names');

function combinations(arr) {
	// if(!arr2) return combinations(arr1, arr1);
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

class House {
	day = 0;

	people = [];

	constructor() {
		for(let i = 0; i < 14; i ++) {
			this.people.push(new Person());
		}

		for(const person of this.people) {
			console.log(person.name);
		}
	}

	executeDay() {
		this.day ++;
		// if(this.day === 1) {
		// 	// first day!
		// }

		for(const [a, b] of combinations(this.people)) {
			console.log("" + a, "" + b)
		}


	}
}


class Person {
	gender;
	name;

	relationships;

	constructor() {
		this.gender = Math.random() > 0.5 ? 'male' : 'female';

		if (this.gender === 'female') this.name = humanNames.femaleRandomEn();
		if (this.gender === 'male') this.name = humanNames.maleRandomEn();
	}

	toString() {
		return this.name;
	}
}


const house = new House();
// while(house.people.length !== 1) {
	house.executeDay();
// }