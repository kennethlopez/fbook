let Constants = {
  //  install
  install(Vue, options) {
    //  create global Constants
    Vue.Constants = {
    	MULTILINE_TEXT_ID_PREFIX: "multiline-text",

    	CreatePostStatus: {
    		NONE: 0,
    		PENDING: 1,
    		DONE: 2,
    		ERROR: 3
    	}
    };
  }
};

export default Constants;