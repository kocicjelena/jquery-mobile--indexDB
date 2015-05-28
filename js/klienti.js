var dbName = "klienti";
      var dbVersion = 4;
      var todoDB = {};
      var indexedDB = window.indexedDB || window.webkitIndexedDB ||
        window.mozIndexedDB;

      if ('webkitIndexedDB' in window) {
        //   window.IDBTransaction = window.webkitIDBTransaction;
        window.IDBKeyRange = window.webkitIDBKeyRange;
      }

      todoDB.indexedDB = {};
      todoDB.indexedDB.db = null;

      $(document).bind('pageinit', function() {
        console.log("-- lets start the party --");
        todoDB.indexedDB.open();
        $("#addItem").click(function() {
          addTodo();
        });
      });

      todoDB.indexedDB.onerror = function(e) {
        console.log(e);
      };

      todoDB.indexedDB.open = function() {
        var request = indexedDB.open(dbName, dbVersion);

        request.onsuccess = function(e) {
          console.log ("success our DB: " + dbName + " is open and ready for work");
          todoDB.indexedDB.db = e.target.result;
          todoDB.indexedDB.getAllTodoItems();
        }
        
        request.onupgradeneeded = function(e) {
          todoDB.indexedDB.db = e.target.result;
          var db = todoDB.indexedDB.db;
          console.log ("Going to upgrade our DB from version: "+ e.oldVersion + " to " + e.newVersion);

            try {
              if (db.objectStoreNames && db.objectStoreNames.contains("todo")) {
                db.deleteObjectStore("todo");
              }
            }
            catch (err) {
              console.log("got err in objectStoreNames:" + err);
            }
            var store = db.createObjectStore("todo",
                {keyPath: "kljuc"});
            console.log("-- onupgradeneeded store:"+ JSON.stringify(store));
			var kljuc = store.createIndex("by_todoText", "todoText", {
                                unique: true
                            });
          }
       
        request.onfailure = function(e) {
          console.error("could not open our DB! Err:"+e);  
        }
        
        request.onerror = function(e) {
          console.error("Well... How should I put it? We have some issues with our DB! Err:"+e);
        }
      };

      todoDB.indexedDB.addTodo = function(todoText, mestog, kljuc) {
        var db = todoDB.indexedDB.db;
        var trans = todoDB.indexedDB.db.transaction("todo", "readwrite");
        var store = trans.objectStore("todo");

        var data = {
          "text": todoText,
          "mestog": mestog,
		  "kljuc": kljuc
        };

        var request = store.put(data);

        request.onsuccess = function(e) {
          todoDB.indexedDB.getAllTodoItems();
        };

        request.onerror = function(e) {
          console.error("Error Adding an item: ", e);
        };
      };

      todoDB.indexedDB.deleteTodo = function(id) {
        var db = todoDB.indexedDB.db;
        var trans = db.transaction("todo", "readwrite");
        var store = trans.objectStore("todo");

        var request = store.delete(id);

        request.onsuccess = function(e) {
          todoDB.indexedDB.getAllTodoItems();
        };

        request.onerror = function(e) {
          console.error("Error deleteing: ", e);
        };
      };

      todoDB.indexedDB.getAllTodoItems = function() {
        var todos = document.getElementById("todoItems");
        todos.innerHTML = "";

        var db = todoDB.indexedDB.db;
        var trans = db.transaction("todo", "readonly");
        var store = trans.objectStore("todo");

        // Get everything in the store;
        var keyRange = IDBKeyRange.lowerBound(0);
        var cursorRequest = store.openCursor(keyRange);

        cursorRequest.onsuccess = function(e) {
          var result = e.target.result;
          if(!!result == false)
            return;

          renderTodo(result.value);
          result.continue();
        };

        cursorRequest.onerror = todoDB.indexedDB.onerror;
      };

      function renderTodo(row) {
        var todos = document.getElementById("todoItems");
        var li = document.createElement("li");
        var a = document.createElement("a");
        var t = document.createTextNode(row.text);
		var t1 = document.createTextNode(row.mestog);
		var t2 = document.createTextNode(row.podaci);

        a.addEventListener("click", function() {
          todoDB.indexedDB.deleteTodo(row.timeStamp);
        }, false);
        // some fun with jquery mobile data attributes
        a.setAttribute("href", "#");
        a.setAttribute("data-iconpos", "notext");
        a.setAttribute("data-role", "button");
        a.setAttribute("data-icon", "delete"); 
        a.setAttribute("data-inline", "true");
        
        li.appendChild(a);
        li.appendChild(t);
		li.appendChild(t1);
		li.appendChild(t2);
        todos.appendChild(li)
        // And lets create the new il item with its markup
        $("#todoItems").trigger('create'); 
      }

      // Add an item only if we have more then zero letters
      function addTodo() {
        var todo = document.getElementById("todo");
		var mestog = document.getElementById("mestog");
		var podaci = document.getElementById("podaci");
        if (todo.value.length > 0) {
          todoDB.indexedDB.addTodo(todo.value, mestog.value);
          todo.value = "";
        }  
      }

    
      // use it in case you wish to work on specific 'set' of data
      function showAll() {
        document.getElementById("ourList").innerHTML = "" ;   
        var request = window.indexedDB.open(dbName);
        request.onsuccess = function(event) {
          // Enumerate the entire object store.
          var db = todoDB.indexedDB.db;
          var trans = db.transaction("todo", "readonly");
          var request = trans.objectStore("todo").openCursor();
          var ul = document.createElement("ul");
          request.onsuccess = function(event) {
            var cursor = request.result || event.result;
            // If cursor is null then we've completed the enumeration.
            if (!cursor) {
              document.getElementById("ourList").appendChild(ul);
              return;
            }
            var li = document.createElement("li");
            li.textContent = "key: " + cursor.key + " => Todo text: " + cursor.value.text + cursor.value.mestog;
            ul.appendChild(li);
            cursor.continue();
          }
        }                    
      }