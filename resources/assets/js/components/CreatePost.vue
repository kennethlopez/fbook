<template>
	<div>
		<div class="card">
			<div class="card-body">
				<div class="row">
					<div class="col-1">
						<a :href="href" v-if="user.profile && user.profile.avatar_status == 1">
							<img :src="user.profile.avatar" :alt="user.name" class="user-avatar-nav">
						</a>

						<a :href="href" v-else>
							<div class="user-avatar-nav"></div>
						</a>
					</div>

					<div class="col">
						<multiline-text :placeholder="placeholder" @text-change="textChange"/>
					</div>
				</div>

				<hr>

				<div class="row">
					<div class="col">
						<button type="button" class="btn btn-primary w-100" @click="post" :disabled="postDisabled">Post</button>
					</div>
				</div>
			</div>

			<div v-if="posting" class="posting" id="posting">
				<div class="label">
					<h3 >Posting...</h3>
				</div>
			</div>
		</div>

		
		<div v-for="post in posts" class="card post">
			<div class="card-body">
				<div class="row">
					<div class="col-md-11 post-header">
						<a :href="href" v-if=" user.profile && user.profile.avatar_status == 1">
							<img :src="user.profile.avatar" :alt="user.name" class="user-avatar-nav">
						</a>

						<a :href="href" v-else>
							<div class="user-avatar-nav"></div>
						</a>
						
						<div>
							<span class="post-user-name">{{ user.name }}</span>
							<span class="created-at"></span>
						</div>
					</div>

					<div class="col-md-1">
						<ul class="navbar-nav ml-auto">
							<li class="nav-item dropdown">
								<a class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
									<span class="caret"></span>
		                        </a>

								<div class="dropdown-menu" aria-labelledby="navbarDropdown">
									<span class="dropdown-item" data-target="#post" data-toggle="modal" @click="editPost(post)">Edit Post</span>	
									<span class="dropdown-item" @click="deletePost(post)">Delete Post</span>
								</div>
							</li>
						</ul>
					</div>
				</div>

				<div class="row">
					<div class="col">
						<div class="post-content">{{ post.content }}</div>
					</div>					
				</div>	
			</div>
		</div>

		<div class="modal fade" id="post" role="dialog" aria-labelledby="confirmFormLabel" aria-hidden="true" v-if="selectedPost != null">
		  <div class="modal-dialog">
		    <div class="modal-content">
		      <div class="modal-header">
		        <h4 class="modal-title">
		          Edit Post
		        </h4>
		        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
		      </div>

		      <div class="modal-body">
		        <multiline-text :key="modalKey" :content="selectedPost.content" :placeholder="placeholder" @text-change="editPostTextChange"/>
		      </div>

				<button type="button" class="btn btn-primary w-100" @click="save" :disabled="saveDisabled">Save</button>		      
		    </div>
		  </div>
		</div>
	</div>
</template>

<script>
	import MultilineText from '../components/MultilineText.vue';
	import {mapGetters} from 'vuex'

	export default {
		components: {
			MultilineText,
		},
		props: {
			userInfo: String
		},
		data() {
			let user = JSON.parse(this.userInfo);
			this.postContent = "";

			return {
				user: user,
				placeholder: "What's on your mind, " + user.name + "?",
				href: "/profile/" + user.name,
				postDisabled: true,
				saveDisabled: true,
				selectedPost: null,
				modalKey: 1
			}
		},
		mounted() {
			let param = {
				token: this.user.token,
			};

			this.$store.dispatch('fetchPosts', param);
		},
		computed: {
			posting() {
				return this.createPostStatus == Vue.Constants.CreatePostStatus.PENDING ? true : false
			},
            ...mapGetters([
                'posts',
                'createPostStatus'
            ])
        },
		methods: {
			post() {
				let post = {
					token: this.user.token,
					content: this.postContent,
				};

				this.$store.dispatch('createPost', post);
			},
			save() {
				let post = {
					token: this.user.token,
					content: this.postContent,
					id: this.selectedPost.id,
				}

				this.$store.dispatch('updatePost', post);
			},
			textChange(text) {
				this.postContent = text
				this.postDisabled = text.length > 0 ? false : true
			},
			deletePost(post) {
				this.$store.dispatch('deletePost', post);
			},
			editPost(post) {
				this.selectedPost = post;

				if (this.selectedPost.content != this.postContent) {
					this.modalKey++;
				}
			},
			editPostTextChange(text) {
				this.postContent = text
				this.saveDisabled = text.length > 0 && text !== this.selectedPost.content ? false : true
			}
		}
	}
</script>