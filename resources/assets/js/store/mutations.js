let mutations = {
    CREATE_POST(state, post) {
        state.posts.unshift(post);
    },
    FETCH_POSTS(state, posts) {
        return state.posts = posts
    },
    UPDATE_POST(state, post) {
        let index = state.posts.findIndex(item => item.id === post.id)
        state.posts.splice(index, 1)
        state.posts.splice(index, 0, post)
    },
    DELETE_POST(state, post) {
        let index = state.posts.findIndex(item => item.id === post.id)
        state.posts.splice(index, 1)
    },
    UPDATE_CREATE_POST_STATUS(state, status) {
        state.createPostStatus = status
    }
}
export default mutations