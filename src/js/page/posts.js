var JekyllPWA = JekyllPWA || {};
var mentions = [];

//Things we need
const page = document.getElementById('page-path').value;
const webmention = "https://webmention.io/api/mentions?target=";
const pageID = document.getElementById('page-id').value; //md5 hash of {{ page.id }} - needed for indexedDB Store
const request = webmention + page;
var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;



JekyllPWA.Posts = {
    init: function () {
        this.initCreateMentionsStore();
        //this.initCheckForStoredMentions();
        this.initDisplayMentions();
    },

    initCreateMentionsStore: function() {
        // Create IndexedDB Store for each article. 
        var open = indexedDB.open("Mentions", 1);
        // Create the schema
        open.onupgradeneeded = function() {
        let db = open.result;

        //Key path is the MD5 hash of the value of the {{ post.id }} variable in Jekyll. 
        var mentionStore = db.createObjectStore(pageID, {keyPath: "id"});
        var index = mentionStore.createIndex("mentions", "id");
        };
    },

    initCheckForStoredMentions: function() {
        var openStorage = window.indexedDB.open( "Mentions", 1 );
        
        openStorage.onsuccess = function(event){
            db = openStorage.result;

            var transaction = db.transaction([ pageID ], "readwrite" );
            var objectStore = transaction.objectStore( pageID );
            var objectStoreRequest = objectStore.getAll();

            objectStoreRequest.onsuccess = function(event) {
                var mentionsOffline = objectStoreRequest.result;
                
                if (mentionsOffline.length >= mentions.length) {
                    mentions = [];
                    mentionsOffline.forEach(function(mention) {
                        mentions.push({id: mention.id, source: mention.source, target: mention.target, content: mention.content, author: mention.author, url: mention.url, fromID: "yeah"});
                    });
                }
            };
        };
    },

    initDisplayMentions: function () {
        fetch(request)
        .then(response => response.json())
        .then(data => {
            if(data.links.length == 0){
                console.log('no mentions yet');
            }
            else{
                //show the mentions container
                document.querySelector('.post-webmentions').removeAttribute('hidden');
                data.links.forEach(function(mention){

                    // render the template
                    var tmpl = document.getElementById('mention-tmpl').content.cloneNode(true);
                    tmpl.querySelector('.mention-reply-content').innerHTML = mention.data.content;
                    tmpl.querySelector('.mention-reply-author').innerText = mention.data.author.name;
                    tmpl.querySelector('.mention-reply-link').setAttribute('href',mention.source);
                    tmpl.querySelector('.mention-reply-link').innerText = mention.data.author.url;
                    document.getElementById('webmentions-container').appendChild(tmpl);

                    // push the data we want from the request into the array
                    mentions.push({id: mention.id, source: mention.source, target: mention.target, content: mention.data.content, author: mention.data.author.name, url: mention.data.author.url});
                });
            }
        })
        .then(function(){
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
        });
    }    
};

(function () {
    JekyllPWA.Posts.init();
})();