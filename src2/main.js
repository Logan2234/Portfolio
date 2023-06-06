/* eslint-disable indent */
import {
	backgroundInit,
	toggleColor,
	toggleGravity,
	move,
	createParticle,
	removeParticle
} from './modules/background.js';

let help_displayed = false;
let play_animation = true;

function init() {
	// Adding event listener for the label of inputs
	let inputs = document.getElementsByClassName('input');

	for (let i = 0; i < inputs.length - 1; i++) {
		inputs[i].addEventListener('input', show_label, false);
	}
}

function find_label(id) {
	let labels = document.getElementsByTagName('label');
	for (let label of labels) {
		if (label.htmlFor == id) {
			return label;
		}
	}
	return null;
}

function show_label() {
	let curr_input = document.activeElement;
	let id = curr_input.id;
	let label = find_label(id);
	if (curr_input.value) {
		if (label) {
			label.classList.remove('hidden_label');
			label.classList.add('active_label');
			label.style.display = 'block';
		}
	} else {
		if (label) {
			label.classList.remove('active_label');
			label.classList.add('hidden_label');
			setTimeout(() => {
				label.style.display = 'none';
			}, 700);
		}
	}
}

window.addEventListener('load', init, false);
