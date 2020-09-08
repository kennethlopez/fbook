let actions = {
    createPost({commit}, post) {
        commit('UPDATE_CREATE_POST_STATUS', Vue.Constants.CreatePostStatus.PENDING)

        axios.post('/api/posts', post)
            .then(res => {
                commit('CREATE_POST', res.data)
                commit('UPDATE_CREATE_POST_STATUS', Vue.Constants.CreatePostStatus.DONE)
            }).catch(err => {
                commit('UPDATE_CREATE_POST_STATUS', Vue.Constants.CreatePostStatus.ERROR)
                console.log(err)
            })
    },
    fetchPosts({commit}, param) {
        axios.get('/api/posts', { params: param })
            .then(res => {
                commit('FETCH_POSTS', res.data)
            }).catch(err => {
                console.log(err)
            })
    },
    updatePost({commit}, post) {
        commit('UPDATE_CREATE_POST_STATUS', Vue.Constants.CreatePostStatus.PENDING)

        axios.post(`/api/posts/${post.id}/update`, post)
            .then(res => {
                commit('UPDATE_POST', res.data);
                commit('UPDATE_CREATE_POST_STATUS', Vue.Constants.CreatePostStatus.DONE)
            }).catch(err => {
                commit('UPDATE_CREATE_POST_STATUS', Vue.Constants.CreatePostStatus.ERROR)
                console.log(err)
            })
    },
    deletePost({commit}, post) {
        axios.delete(`/api/posts/${post.id}`)
            .then(res => {
                if (res.data === 'ok')
                    commit('DELETE_POST', post)
            }).catch(err => {
                console.log(err)
            })
    },
    updateCreatePostStatus({commit}, status) {
        commit('UPDATE_CREATE_POST_STATUS', status)
    },
}

export default actions