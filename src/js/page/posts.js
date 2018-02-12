var JekyllPWA = JekyllPWA || {};
var mentions = [];

JekyllPWA.Posts = {
    init: function () {
        this.initDisplayMentions();
        this.initCreateMentionsStore();
        this.initStoreMentions();
        
    },

    initDisplayMentions: function () {
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
                    mentions.push({id: mention.id, source: mention.source, target: mention.target, content: mention.data.content, author: mention.data.author.name, url: mention.data.author.url});
                });
                }
                console.log(data)
            });
    },

    initCreateMentionsStore: function() {
        //Thing we'll need
        const pageID = document.getElementById('page-id').value; //md5 hash of {{ page.id }} - needed for indexedDB Store

        let indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;

        // Create IndexedDB Store for each article. 
        var open = indexedDB.open("Mentions", 1);
        // Create the schema
        open.onupgradeneeded = function() {
        let db = open.result;

        //Key path is the MD5 hash of the value of the {{ post.id }} variable in Jekyll. 
        const mentionStore = db.createObjectStore(pageID, {keyPath: "id"});
        const mentionIndex = store.createIndex(pageID + "-index", "id");
        };
    },

    initStoreMentions: function() {
        const pageID = document.getElementById('page-id').value; //md5 hash of {{ page.id }} - needed for indexedDB Store

        mentions.forEach(function(el){
            var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
            var openStorage = window.indexedDB.open("Mentions", 1);

            openStorage.onsuccess = function(event){
                db = openStorage.result;
                var transaction = db.transaction([pageID], "readwrite");
                var objectStore = transaction.objectStore(pageID);
    
                transaction = db.transaction([pageID], "readwrite");
                objectStore = transaction.objectStore(pageID);
                objectStoreRequest = objectStore.put({id: el.id, source: el.source, target: el.target, content: el.content, author: el.author, url: el.author});
                objectStoreRequest.oncomplete = function (e) {
                    console.log("asd");
                }
            }
        })

    }
};

(function () {
    JekyllPWA.Posts.init();
})();