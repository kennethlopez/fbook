<template>
	<div>
		<div v-for="post in posts">
			<div>{{ post.content }}</div>
			<hr/>
		</div>
	</div>
</template>

<script>
	import {mapGetters} from 'vuex'

	export default {
		props: {
			userInfo: String
		},
		data() {
			console.log("asdasd");
		},
        mounted() {
        	let user = JSON.parse(this.userInfo);
        	let param = {
				token: this.user.token,
			};

			console.log("component mounte");
            this.$store.dispatch('fetchPosts', param);
        },
        computed: {
            ...mapGetters([
                'posts'
            ])
        }
    }	
</script>