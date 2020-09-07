<template>
	<div class="multiline-text">
		<span class="placeholder" @click="focusOnInput">{{ displayPlaceholder }}</span>
		<div :id="id" class="multiline-text-input" contenteditable="true" @keydown="typing" @keyup="typing"></div>
	</div>
</template>

<script>
	export default {
		name: 'MultilineText',
		props: {
			textChangeListener: Function,
			placeholder: String,
			uid: Number
		},
		data() {
			return {
				id: Vue.Constants.MULTILINE_TEXT_ID_PREFIX + this.uid,
				textContent: "",
			}
		},
		computed: {
			displayPlaceholder() {
				return this.textContent.length > 0 ? "" : this.placeholder;
			}
		},
		methods: {
			typing(event) {
				let content = event.target.textContent;

				this.textContent = content;

				if(this.textChangeListener) {
					this.textChangeListener(content);					
				}
				
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