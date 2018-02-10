var JekyllPWA = JekyllPWA || {};

JekyllPWA.Posts = {
    init: function () {
        this.initMentions();
        this.initAnotherFunction();
    },

    initMentions: function () {
        const page = document.getElementById('page-path').value;
        const webmention = "https://webmention.io/api/mentions?target=";
        const request = webmention + page;

            fetch(request)
            .then(response => response.json())
            .then(data => {
                if(data.links.length == 0){
                console.log('no mentions yet');
                }
                else{
                document.querySelector('.post-webmentions').removeAttribute('hidden');
                data.links.forEach(function(mention){
                    var tmpl = document.getElementById('mention-tmpl').content.cloneNode(true);

                    tmpl.querySelector('.mention-reply-content').innerHTML = mention.data.content;
                    tmpl.querySelector('.mention-reply-author').innerText = mention.data.author.name;
                    tmpl.querySelector('.mention-reply-link').setAttribute('href',mention.source);
                    tmpl.querySelector('.mention-reply-link').innerText = mention.data.author.url;
                    document.getElementById('webmentions-container').appendChild(tmpl);
                });
                }
                console.log(data)
            });
    },

    initAnotherFunction: function() {
      // this function does nothing. Do something with it if you want.
      console.log('party?')
    }
};

(function () {
    JekyllPWA.Posts.init();
})();