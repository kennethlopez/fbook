<template>
	<div class="card">
		<div class="card-body">
			<div class="row">
				<div class="col-1">
					<a :href="href" v-if=" user.profile && user.profile.avatar_status == 1">
						<img :src="user.profile.avatar" :alt="user.name" class="user-avatar-nav">
					</a>

					<a :href="href" v-else>
						<div class="user-avatar-nav"></div>
					</a>
				</div>

				<div class="col">
					<MultilineText :placeholder="placeholder" :uid="uid"/>
				</div>
			</div>

			<hr>

			<div class="row">
				<div class="col">
					<button type="button" class="btn btn-primary w-100" @click="post">Post</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import MultilineText from "../components/MultilineText.vue";

	export default {
		components: {
			MultilineText
		},
		props: {
			userInfo: String
		},
		data() {
			let user = JSON.parse(this.userInfo);
			let placeholder = "What's on your mind, " + user.name + "?";
			let href = "/profile/" + user.name;
			let uid = this._uid;

			return {
				user: user,
				placeholder: placeholder,
				href: href,
				uid: uid
			}
		},
		methods: {
			post() {
				let post = {
					token: this.user.token,
					content: this.$store.state.multilineTexts[this.uid].text
				};

				axios.post('/api/posts', post)
				.then(res => {
					console.log("axios.post result:", res);
				}).catch(err => {
					console.log(err);
				});
			}
		}
	}
</script>