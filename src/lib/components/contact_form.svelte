<script lang="ts">
	let nameInput: HTMLInputElement;
	let emailInput: HTMLInputElement;
	let messageInput: HTMLTextAreaElement;

	let nameValue: string;
	let emailValue: string;
	let messageValue: string;

	let valid = false;

	function handleInput() {
		valid =
			nameInput.validity.valid && emailInput.validity.valid && messageInput.validity.valid;
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
			<label class="label" for="form_name" style:visibility={nameValue ? 'visible' : 'hidden'}
				>Name
			</label>
			<input
				bind:value={nameValue}
				bind:this={nameInput}
				on:input={handleInput}
				class="input"
				id="form_name"
				type="text"
				required
				placeholder="Name"
				name="name"
			/>
		</div>
		<div class="form-component">
			<label
				class="label"
				for="form_email"
				style:visibility={emailValue ? 'visible' : 'hidden'}
				>Email
			</label>
			<input
				bind:value={emailValue}
				bind:this={emailInput}
				on:input={handleInput}
				class="input"
				id="form_email"
				type="email"
				required
				placeholder="Email"
				name="email"
			/>
		</div>
		<div class="form-component">
			<label
				style:visibility={messageValue ? 'visible' : 'hidden'}
				class="label"
				for="form_content"
				>Your Message
			</label>
			<textarea
				bind:value={messageValue}
				bind:this={messageInput}
				on:input={handleInput}
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
		<input
			class="submit"
			type="submit"
			value="Send"
			class:submit-valid={valid}
			class:submit-invalid={!valid}
			disabled={!valid}
		/>
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
		height: 33vh;
		margin: auto;
		width: max-content;
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

	.form-component {
		display: flex;
		flex-direction: column;
	}

	#form_content {
		font-size: 14px;
		height: 10vh;
		padding-top: 8px;
		resize: none;
	}

	.submit {
		align-self: center;
		padding: 2px 24px;
		cursor: pointer;
		margin-top: 10px;
		height: 40px;
		color: rgba(200, 200, 200);
		background-color: rgba(0, 0, 0, 0.2);
		border-radius: 24px;
	}

	.submit-invalid {
		border: 2px solid rgba(255, 0, 0, 0.5);
	}

	.submit-invalid:hover {
		box-shadow: rgba(255, 0, 0, 0.8) 0 0 10px 0;
	}

	.submit-valid {
		border: 2px solid var(--primary-color);
	}

	.submit-valid:hover {
		box-shadow: var(--primary-color) 0 0 10px 0;
	}

	.submit:disabled {
		cursor: not-allowed;
		color: rgba(200, 200, 200, 0.5);
	}

	label {
		align-self: flex-start;
		margin-left: 5px;
		transition: linear 0.5s;
	}
</style>
