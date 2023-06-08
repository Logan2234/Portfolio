<script lang="ts">
	// function find_label(id) {
	// 	let labels = document.getElementsByTagName('label');
	// 	for (let label of labels) {
	// 		if (label.htmlFor == id) {
	// 			return label;
	// 		}
	// 	}
	// 	return null;
	// }

	// function show_label() {
	// 	let curr_input = document.activeElement;
	// 	let id = curr_input.id;
	// 	let label = find_label(id);
	// 	if (curr_input.value) {
	// 		if (label) {
	// 			label.classList.remove('hidden_label');
	// 			label.classList.add('active_label');
	// 			label.style.display = 'block';
	// 		}
	// 	} else {
	// 		if (label) {
	// 			label.classList.remove('active_label');
	// 			label.classList.add('hidden_label');
	// 			setTimeout(() => {
	// 				label.style.display = 'none';
	// 			}, 700);
	// 		}
	// 	}
	// }
</script>

<div id="formulaire">
	<form
		id="form"
		method="post"
		enctype="text/plain"
		action="mailto:loganwi322@gmail.com?subject=Email sent via the portfolio"
	>
		<div class="form_component">
			<label for="form_name">Name</label>
			<input
				class="input"
				id="form_name"
				type="text"
				required
				placeholder="Name"
				name="name"
			/>
		</div>
		<div class="form_component">
			<label for="form_email">Email</label><input
				class="input"
				id="form_email"
				type="email"
				required
				placeholder="Email"
				name="email"
			/>
		</div>
		<div class="form_component">
			<label for="form_content">Your Message</label><textarea
				class="input"
				id="form_content"
				placeholder="Your Message"
				required
				maxlength="2000"
				minlength="20"
				name="content"
				spellcheck="true"
			/>
		</div>
		<div class="form_component">
			<input id="submit" class="input" type="submit" required value="Send" />
		</div>
	</form>
</div>

<style>
	#formulaire {
		padding-bottom: 70px;
	}

	#form {
		display: flex;
		flex-direction: column;
		margin: auto;
		width: fit-content;
		align-items: end;
	}

	.input {
		font-family: var(--main-font);
		background-color: rgba(0, 0, 0, 0.3);
		border: 2px solid #252525;
		border-radius: 8px;
		color: rgb(200, 200, 200);
		font-size: 15px;
		height: 30px;
		margin: 10px 0;
		min-width: 200px;
		padding: 0;
		padding-left: 5px;
		width: 30vw;
	}

	.input:invalid {
		border-color: rgba(197, 70, 70, 0.7);
	}

	.input:valid {
		border-color: rgba(70, 197, 123, 0.7);
	}

	.input:focus {
		outline: none;
	}

	::placeholder {
		color: rgb(200, 200, 200);
	}

	#form_content {
		font-size: 14px;
		height: 10vh;
		padding-top: 8px;
		resize: none;
	}

	#submit {
		border: #808080 3px outset;
		width: 15vw;
	}

	#submit:active {
		border-style: inset;
	}

	label {
		display: none;
		font-size: 15px;
		margin-top: 12px;
		opacity: 0;
		padding: 7px;
		position: absolute;
	}

	.active_label {
		animation: labelAppears 0.7s forwards;
	}

	.hidden_label {
		animation: labelDisappears 0.7s forwards;
	}

	@keyframes labelAppears {
		0% {
			transform: translate(0);
		}

		50% {
			transform: translate(-130%);
		}

		100% {
			opacity: 1;
			transform: translate(-110%);
		}
	}

	@keyframes labelDisappears {
		0% {
			opacity: 1;
			transform: translate(-110%);
		}

		30% {
			transform: translate(-130%);
		}

		100% {
			opacity: 0;
			transform: translate(0);
		}
	}
</style>
