var JekyllPWA = JekyllPWA || {};

JekyllPWA.Home = {
    init: function () {
        this.initHello();
        this.initAnotherFunction();
    },

    initHello: function () {
        console.log('hello.');
    },

    initAnotherFunction: function() {
      // this function does nothing. Do something with it if you want.
    }
};

(function () {
    JekyllPWA.Home.init();
})();
