export function randInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

export function randIntNot(min, max, not) {
	let number = Math.floor(Math.random() * (max - min + 1) + min);
	if (number != not) {
		return number;
	} else {
		return randIntNot(min, max, not);
	}
}
