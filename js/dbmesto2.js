 var dbName = "gradovi2";
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
        $("#addMesto").click(function() {
          addMesto();
        });
			$("#addItem2").click(function() {
          addTodo2();
        });
		$("#showAll").click(function() {
         showAll();
        });
		$("#showauthor").click(function() {showauthor()});
		$("#showourmesto").click(function() {showourmesto()});
        $("#selectMesto").click(function() {selMesto()});
		$("#selektovatimesto").click(function() {selektovatiMesto()});
		$("#selektovatikljuc").click(function() {selektovatiKljuc()});
		$("#select-native-key").click(function() {showKey()});
		$("#select-native-mesto").click(function() {showMesto()});
      });
	  $(document).on('pagebeforeshow', '#saradnici', function(){    
    // Add a new select element  
    //var selektovatimesto = $("#selektovatimesto").selektovatiMesto.text();
    $('<select>').attr({'name':'select-choice-kljuc','id':'select-choice-kljuc','data-native-menu':'false'}).appendTo('[data-role="content"]');
    $('<option>').html('Select option!').appendTo('#select-choice-kljuc');
    $('<option>').attr({'value':'1'}).html('Value 1').appendTo('#select-choice-kljuc');
    $('<option>').attr({'value':'2'}).html('').appendTo('#select-choice-kljuc');    
    // Enhance new select element
    $('select').selectmenu();
      
    
});
      todoDB.indexedDB.onerror = function(e) {
        console.log(e);
      };

      todoDB.indexedDB.open = function() {
        var request = indexedDB.open(dbName, dbVersion);

        request.onsuccess = function(e) {
          console.log ("success our DB: " + dbName + " is open and ready for work");
          todoDB.indexedDB.db = e.target.result;
          todoDB.indexedDB.getSvaMesta();
        }
        
        request.onupgradeneeded = function(e) {
          todoDB.indexedDB.db = e.target.result;
          var db = todoDB.indexedDB.db;
          console.log ("Going to upgrade our DB from version: "+ e.oldVersion + " to " + e.newVersion);

            try {
              if (db.objectStoreNames && db.objectStoreNames.contains("mesto")) {
                db.deleteObjectStore("mesto");
              }
            }
            catch (err) {
              console.log("got err in objectStoreNames:" + err);
            }
            var store = db.createObjectStore("mesto",
                {keyPath: "isbn"});
			var titleIndex = store.createIndex("by_title", "title", {unique: true});
			var authorIndex = store.createIndex("by_author", "author");
            store.put({title: "Aleksinac", author: "Advokatska kancelarija", isbn: 1});
			store.put({title: "Krusevac", author: "Advokatska kancelarija", isbn: 2});
			store.put({title: "Leskovac", author: "Advokatska kancelarija", isbn: 3});
			store.put({title: "Nis", author: "Agencija", isbn: 4});
			store.put({title: "Pirot", author: "Advokatska kancelarija", isbn: 5});
			store.put({title: "Prokuplje", author: "Advokatska kancelarija", isbn: 6});
			store.put({title: "Vranje", author: "Advokatska kancelarija", isbn: 7});
			store.put({title: "Zrenjanin", author: "Advokatska kancelarija", isbn: 8});
			console.log("-- onupgradeneeded store:"+ JSON.stringify(store));
          }
       
        request.onfailure = function(e) {
          console.error("could not open our DB! Err:"+e);  
        }
        
        request.onerror = function(e) {
          console.error("Well... How should I put it? We have some issues with our DB! Err:"+e);
        }
      };

      todoDB.indexedDB.addTodo = function(todoTitle, todoAuthor) {
        var db = todoDB.indexedDB.db;
        var trans = todoDB.indexedDB.db.transaction("mesto", "readwrite");
        var store = trans.objectStore("mesto");


        var request = store.put({
          "title": todoTitle,
		  "author": todoAuthor,
          "isbn": 9
        });

        request.onsuccess = function(e) {
          todoDB.indexedDB.getSvaMesta();
        };

        request.onerror = function(e) {
          console.error("Error Adding an item: ", e);
        };
      };
			 todoDB.indexedDB.addTodo2 = function(title) {
        var db = todoDB.indexedDB.db;
        var trans = todoDB.indexedDB.db.transaction("mesto", "readwrite");
        var store = trans.objectStore("mesto");
		var index = store.index("by_title");

		var request = index.get("Bedrock Nights");
		request.onsuccess = function() {
		var matching = request.result;
		if (matching !== undefined) {
		// A match was found.
		var title = matching.title;
		$("#izvadi").click(function(){
        $("#izvadjeno").val(title);
  });
		//report(matching.isbn, matching.title, matching.author);
		} else {
		// No match was found.
		report(null);
		}
		};

        request.onerror = function(e) {
          console.error("Error Adding an item: ", e);
        };
      };

      todoDB.indexedDB.deleteTodo = function(id) {
        var db = todoDB.indexedDB.db;
        var trans = db.transaction("mesto", "readwrite");
        var store = trans.objectStore("mesto");

        var request = store.delete(id);

        request.onsuccess = function(e) {
          todoDB.indexedDB.getSvaMesta();
        };

        request.onerror = function(e) {
          console.error("Error deleteing: ", e);
        };
      };

      todoDB.indexedDB.getSvaMesta = function() {
        var todos = document.getElementById("todoItems");
        //todos.innerHTML = "";

        var db = todoDB.indexedDB.db;
        var trans = db.transaction("mesto", "readonly");
        var store = trans.objectStore("mesto");

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
        var t = document.createTextNode(row.title);
		 var p = document.createTextNode(row.author);

        a.addEventListener("click", function() {
          todoDB.indexedDB.deleteTodo(row.title);
        }, false);
        // some fun with jquery mobile data attributes
        a.setAttribute("href", "#");
        a.setAttribute("data-iconpos", "notext");
        a.setAttribute("data-role", "button");
        a.setAttribute("data-icon", "delete"); 
        a.setAttribute("data-inline", "true");
        
        li.appendChild(a);
        li.appendChild(t);
		li.appendChild(p);
        todos.appendChild(li)
        // And lets create the new il item with its markup
        $("#todoItems").trigger('create'); 
      }

      // Add an item only if we have more then zero letters
      function addMesto() {
        var title = document.getElementById("mesto");
		var author = document.getElementById("author");
        if (title.value.length > 0) {
          todoDB.indexedDB.addTodo(title.value, author.value);
          title.value = "";
		  author.value = "";
        };
      }

    function addTodo2() {
          todoDB.indexedDB.addTodo2();
      }
	  function regalmesto() {
        document.getElementById("ourregal").innerHTML = "" ;   
        var request = window.indexedDB.open(dbName);
        request.onsuccess = function(event) {
          // Enumerate the entire object store.
          var db = todoDB.indexedDB.db;
          var trans = db.transaction("mesto", "readonly");
          var request = trans.objectStore("mesto").openCursor();
          var ul = document.createElement("ul");
          request.onsuccess = function(event) {
            var cursor = request.result || event.result;
            // If cursor is null then we've completed the enumeration.
            if (!cursor) {
              document.getElementById("ourregal").appendChild(ul);
              return;
            }
            var li = document.createElement("li");
			li.textContent = cursor.value.title;
			ul.appendChild(li);
            cursor.continue();
          }
        }                    
      }
      // use it in case you wish to work on specific 'set' of data
      function showAll() {
        document.getElementById("ourList").innerHTML = "" ;   
        var request = window.indexedDB.open(dbName);
        request.onsuccess = function(event) {
          // Enumerate the entire object store.
          var db = todoDB.indexedDB.db;
          var trans = db.transaction("mesto", "readonly");
          var request = trans.objectStore("mesto").openCursor();
          var ul = document.createElement("ul");
          request.onsuccess = function(event) {
            var cursor = request.result || event.result;
            // If cursor is null then we've completed the enumeration.
            if (!cursor) {
              document.getElementById("ourList").appendChild(ul);
              return;
            }
            var li = document.createElement("li");
            li.textContent = "key: " + cursor.key + " => Todo text: " + cursor.value.title + cursor.value.author;
            ul.appendChild(li);
            cursor.continue();
          }
        }                    
      }
	  function showKey() {
        document.getElementById("select-native-key").innerHTML = "" ;   
        var request = window.indexedDB.open(dbName);
        request.onsuccess = function(event) {
          // Enumerate the entire object store.
          var db = todoDB.indexedDB.db;
          var trans = db.transaction("mesto", "readwrite");
          var request = trans.objectStore("mesto").openCursor();
          var select = document.createElement("select");
          request.onsuccess = function(event) {
            var cursor = request.result || event.result;
            // If cursor is null then we've completed the enumeration.
            if (!cursor) {
              document.getElementById("select-native-key").appendChild(select);
              return;
            }
            var option = document.createElement("option");
            option.textContent = cursor.key;
            select.appendChild(option);
            cursor.continue();
          }
        }                    
      }
	  function showMesto() {
        document.getElementById("select-native-mesto").innerHTML = "" ;   
        var request = window.indexedDB.open(dbName);
        request.onsuccess = function(event) {
          // Enumerate the entire object store.
          var db = todoDB.indexedDB.db;
          var trans = db.transaction("mesto", "readonly");
          var request = trans.objectStore("mesto").openCursor();
          var select = document.createElement("select");
          request.onsuccess = function(event) {
            var cursor = request.result || event.result;
            // If cursor is null then we've completed the enumeration.
            if (!cursor) {
              document.getElementById("select-native-mesto").appendChild(select);
              return;
            }
            var option = document.createElement("option");
            option.textContent = cursor.value.title;
            select.appendChild(option);
            cursor.continue();
          }
        }                    
      }
	   function showauthor() {
        document.getElementById("ourAuthor").innerHTML = "" ;   
        var request = window.indexedDB.open(dbName);
        request.onsuccess = function(event) {
          // Enumerate the entire object store.
          var db = todoDB.indexedDB.db;
          var trans = db.transaction("mesto", "readonly");
          var store = trans.objectStore("mesto")
		  var indexa = store.index("by_author");
		  var ul = document.createElement("ul");
		  var request = indexa.openCursor(IDBKeyRange.only("Fred"));
          
          request.onsuccess = function(event) {
            var cursor = request.result || event.result;
            // If cursor is null then we've completed the enumeration.
            if (!cursor) {
              document.getElementById("ourAuthor").appendChild(ul);
              return;
            }
            var li = document.createElement("li");
            li.textContent = "key: " + cursor.key + " => tit: " + cursor.value.isbn + cursor.value.title + cursor.value.author;
            ul.appendChild(li);
            cursor.continue();
          }
        }                    
      }
	  function showourmesto() {
        document.getElementById("ourMesto").innerHTML = "" ;   
        var request = window.indexedDB.open(dbName);
        request.onsuccess = function(event) {
          // Enumerate the entire object store.
          var db = todoDB.indexedDB.db;
          var trans = db.transaction("mesto", "readonly");
          var store = trans.objectStore("mesto")
		  var indexa = store.index("by_title");
		  var ul = document.createElement("ul");
		  var request = indexa.openCursor(IDBKeyRange.only("Nis"));
          
          request.onsuccess = function(event) {
            var cursor = request.result || event.result;
            // If cursor is null then we've completed the enumeration.
            if (!cursor) {
              document.getElementById("ourMesto").appendChild(ul);
              return;
            }
            var li = document.createElement("li");
            li.textContent = "key: " + cursor.key + " => tit: " + cursor.value.isbn + cursor.value.title + cursor.value.author;
            ul.appendChild(li);
            cursor.continue();
          }
        }                    
      }
	  function regali() {
        document.getElementById("ourRegali").innerHTML = "" ;   
        var request = window.indexedDB.open(dbName);
        request.onsuccess = function(event) {
          // Enumerate the entire object store.
          var db = todoDB.indexedDB.db;
          var trans = db.transaction("mesto", "readonly");
          var store = trans.objectStore("mesto")
		  var indexa = store.index("by_title");
		  var ul = document.createElement("ul");
		  var request = indexa.openCursor(IDBKeyRange.only("Nis"));
          
          request.onsuccess = function(event) {
            var cursor = request.result || event.result;
            // If cursor is null then we've completed the enumeration.
            if (!cursor) {
              document.getElementById("ourRegali").appendChild(ul);
              return;
            }
            var li = document.createElement("li");
            li.textContent = cursor.value.saradnik;
            ul.appendChild(li);
            cursor.continue();
          }
        }                    
      }
	  	  function saradnik() {
        document.getElementById("ourSaradnik").innerHTML = "" ;   
        var request = window.indexedDB.open(dbName);
        request.onsuccess = function(event) {
          // Enumerate the entire object store.
          var db = todoDB.indexedDB.db;
          var trans = db.transaction("mesto", "readonly");
          var store = trans.objectStore("mesto")
		  var indexa = store.index("by_title");
		  var ul = document.createElement("ul");
		  var request = indexa.openCursor(IDBKeyRange.only("Nis"));
          
          request.onsuccess = function(event) {
            var cursor = request.result || event.result;
            // If cursor is null then we've completed the enumeration.
            if (!cursor) {
              document.getElementById("ourSaradnik").appendChild(ul);
              return;
            }
            var li = document.createElement("li");
            li.textContent = cursor.value.saradnik;
            ul.appendChild(li);
            cursor.continue();
          }
        }                    
      }
	  function selMesto() {
        document.getElementById("selectMesto").innerHTML = "" ;   
        var request = window.indexedDB.open(dbName);
        request.onsuccess = function(event) {
          // Enumerate the entire object store.
          var db = todoDB.indexedDB.db;
          var trans = db.transaction("mesto", "readonly");
          var store = trans.objectStore("mesto")
		  var indexa = store.index("by_title");
		  var ul = document.createElement("ul");
		  var grad = "Nis";
		  var request = indexa.openCursor(IDBKeyRange.only(grad));
          
          request.onsuccess = function(event) {
            var cursor = request.result || event.result;
            // If cursor is null then we've completed the enumeration.
            if (!cursor) {
              document.getElementById("selectMesto").appendChild(ul);
              return;
            }
            var li = document.createElement("li");
            li.textContent = "key: " + cursor.key + " => tit: " + cursor.value.isbn + cursor.value.title + cursor.value.author;
            ul.appendChild(li);
            cursor.continue();
          }
        }                    
      }
	  function selektovatiMesto() {
        document.getElementById("selektovatiMesto").innerHTML = "" ;   
        var request = window.indexedDB.open(dbName);
        request.onsuccess = function(event) {
          // Enumerate the entire object store.
          var db = todoDB.indexedDB.db;
          var trans = db.transaction("mesto", "readonly");
          var store = trans.objectStore("mesto")
		  var indexa = store.index("by_title");
		  var select = document.createElement("select");
		  var grad = "Nis";
		  var request = indexa.openCursor(IDBKeyRange.only(grad));
          
          request.onsuccess = function(event) {
            var cursor = request.result || event.result;
            // If cursor is null then we've completed the enumeration.
            if (!cursor) {
              document.getElementById("selektovatiMesto").appendChild(select);
              return;
            }
            var option = document.createElement("option");
            option.textContent = "key: " + cursor.key + " => tit: " + cursor.value.isbn + cursor.value.title + cursor.value.author;
            select.appendChild(option);
            cursor.continue();
          }
        }                    
      }
	  function selektovatiKljuc() {
        document.getElementById("selektovatiKljuc").innerHTML = "" ;   
        var request = window.indexedDB.open(dbName);
        request.onsuccess = function(event) {
          // Enumerate the entire object store.
          var db = todoDB.indexedDB.db;
          var trans = db.transaction("mesto", "readonly");
          var store = trans.objectStore("mesto")
		  var indexa = store.index("by_title");
		  var select = document.createElement("select");
		  var klj = "1";
		  var request = indexa.openCursor(IDBKeyRange.upperBound("Nis"));
          
          request.onsuccess = function(event) {
            var cursor = request.result || event.result;
            // If cursor is null then we've completed the enumeration.
            if (!cursor) {
              document.getElementById("selektovatiKljuc").appendChild(select);
              return;
            }
            var option = document.createElement("option");
            option.textContent = "key: " + cursor.key + " => tit: " + cursor.value.isbn + cursor.value.title + cursor.value.author;
            select.appendChild(option);
            cursor.continue();
          }
        }                    
      }