window.Vue = require('vue');

import Constants from "../plugins/Constants";

Vue.use(Constants);

let state = {
    posts: [],
    createPostStatus: Vue.Constants.CreatePostStatus.NONE,
}

export default state