var JekyllPWA = JekyllPWA || {};

JekyllPWA.Home = {
    init: function () {
        this.initHello();
        this.initAnotherFunction();
    },

    initHello: function () {
      console.log('my twitter account is https://twitter.com/jshvgt');
      console.log('---------------');
      console.log('my public github account is https://github.com/dumaurier');
      console.log('---------------');
      console.log('my private github account is https://github.com/joshvogt');
      console.log('---------------');
      console.log('my codepen account is https://codepen.io/josh_vogt/');
      console.log('---------------');
      console.log('you can email me at joshvogt@gmail.com');
    },

    initAnotherFunction: function() {
      // this function does nothing. Do something with it if you want.
    }
};

(function () {
    JekyllPWA.Home.init();
})();
