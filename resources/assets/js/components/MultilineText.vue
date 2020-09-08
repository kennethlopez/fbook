<template>
	<div class="multiline-text">
		<span class="placeholder" @click="focusOnInput">{{ displayPlaceholder }}</span>
		<div :id="id" class="multiline-text-input" contenteditable="true" @keydown="typing" @keyup="typing"></div>
	</div>
</template>

<script>
	export default {
		props: {
			placeholder: String,
			content: String,
		},
		data() {
			return {
				id: Vue.Constants.MULTILINE_TEXT_ID_PREFIX + this._uid,
				textContent: ""
			}
		},
		mounted() {
			let editable = document.getElementById(this.id);

			if(this.content && this.content.length > 0) {
				editable.innerText = this.content;
				this.textContent = this.content;
			}
		},
		computed: {
			displayPlaceholder() {
				return this.textContent.length > 0 ? "" : this.placeholder;
			}
		},
		methods: {
			typing(event) {
				let text = event.target.innerText

				if (text.length == 1 && event.target.innerHTML == '<br>') {
					text = ""
				}

				this.textContent = text

				this.$emit('text-change', text);
			},
			focusOnInput(event) {
				let children = event.target.parentNode.children;
				let child;

				for (let i = 0; i < children.length; i++) {
					child = children[i];

					if (child.id === this.id) {
						child.focus();
						break;
					}
				}
			}
		}
	}
</script>