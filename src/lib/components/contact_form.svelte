<script lang="ts">
	import { onMount } from 'svelte';

	let activeInput: HTMLInputElement;

	let labelName: HTMLLabelElement, labelEmail: HTMLLabelElement, labelMessage: HTMLLabelElement;
	let inputName: HTMLInputElement,
		inputEmail: HTMLInputElement,
		inputMessage: HTMLTextAreaElement;

	function handleInput(
		event: Event & {
			currentTarget: (EventTarget & HTMLInputElement) | HTMLTextAreaElement;
		}
	): void {
		for (const label of [labelName, labelEmail, labelMessage]) {
			if (label.htmlFor === event.currentTarget.id) {
				show_label(label, event.currentTarget);
			}
		}
	}

	function show_label(
		label: HTMLLabelElement,
		input: HTMLInputElement | HTMLTextAreaElement
	): void {
		if (input.value) {
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
</script>

<div id="formulaire">
	<form
		id="form"
		method="post"
		enctype="text/plain"
		action="mailto:loganwi322@gmail.com?subject=Email sent via the portfolio"
	>
		<div class="form-component">
			<label class="label" for="form_name" bind:this={labelName}>Name</label>
			<input
				bind:this={inputName}
				on:input={(event) => handleInput(event)}
				class="input"
				id="form_name"
				type="text"
				required
				placeholder="Name"
				name="name"
			/>
		</div>
		<div class="form-component">
			<label class="label" for="form_email" bind:this={labelEmail}>Email</label>
			<input
				bind:this={inputEmail}
				on:input={(event) => handleInput(event)}
				class="input"
				id="form_email"
				type="email"
				required
				placeholder="Email"
				name="email"
			/>
		</div>
		<div class="form-component">
			<label class="label" for="form_content" bind:this={labelMessage}>Your Message</label>
			<textarea
				bind:this={inputMessage}
				on:input={(event) => handleInput(event)}
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
		<div>
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
		justify-content: space-between;
		height: 30vh;
		margin: auto;
		width: max-content;
		align-items: end;
	}

	.form-component {
		display: flex;
	}

	.input {
		font-family: var(--main-font);
		background-color: rgba(0, 0, 0, 0.3);
		border: 2px solid #252525;
		border-radius: 8px;
		color: rgb(200, 200, 200);
		font-size: 15px;
		height: 30px;
		min-width: 200px;
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
		font-size: 15px;
		margin: 9px 0 0 7px;
		opacity: 0;
		position: absolute;
	}

	:global(.active_label) {
		animation: labelAppears 0.7s forwards;
	}

	:global(.hidden_label) {
		animation: labelDisappears 0.7s forwards;
	}

	@keyframes labelAppears {
		0% {
			transform: translate(0);
		}

		50% {
			transform: translate(-150%);
		}

		100% {
			opacity: 1;
			transform: translate(-130%);
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
