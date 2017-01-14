function makeid(length = 5) {
	var text = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	for (var i = 0; i < length; i++)
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	return text;
}

/**
 * EventManager handles all events
 * @export
 * @class EventManager
 */
export default class EventManager {
	question(payload) {
		payload.id = makeid();
		otsimo.customevent('game:question', payload);
	}

	session(totalWrongAttempt, difficulty) {
		// totalWrongAttempt: attempts before user gives the right answer.
		// difficulty: is the quantity of the videos in the question.
		otsimo.customevent('game:session', {
			word: word,
			wrong: totalWrongAttempt,
			difficulty: difficulty
		});
	}

}
