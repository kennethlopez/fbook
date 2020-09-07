<template>
	<div class="multiline-text">
		<span class="placeholder" @click="focusOnInput">{{ displayPlaceholder }}</span>
		<div :id="id" class="multiline-text-input" contenteditable="true" @keyup="typing"></div>
	</div>
</template>

<script>
	import { actions } from '../store';

	export default {
		name: 'MultilineText',
		props: {
			placeholder: String,
			uid: Number
		},
		data() {
			return {
				id: Vue.Constants.MULTILINE_TEXT_ID_PREFIX + this.uid,
				textContent: ""
			}
		},
		computed: {
			displayPlaceholder() {
				return this.textContent.length > 0 ? "" : this.placeholder;
			}
		},
		methods: {
			typing(event) {
				this.textContent = event.target.textContent;

				this.updateState();
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
			},
			updateState() {
				let multilineTexts = this.$store.state.multilineTexts;
				let uid = this.uid;
				let id = this.id;
				let textContent = this.textContent;

				let multilineText = {
					uid: uid,
					id: id,
					text: textContent
				};

				multilineTexts[uid] = multilineText;
			
				this.$store.commit(actions.UPDATE_MULTILINE_TEXTS, multilineTexts);
			}
		}
	}
</script>