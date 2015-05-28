 var dbName = "mesta6;
      var dbVersion = 4;
      var mestaDB = {};
      var indexedDB = window.indexedDB || window.webkitIndexedDB ||
        window.mozIndexedDB;

      if ('webkitIndexedDB' in window) {
        //   window.IDBTransaction = window.webkitIDBTransaction;
        window.IDBKeyRange = window.webkitIDBKeyRange;
      }

      mestaDB.indexedDB = {};
      mestaDB.indexedDB.db = null;

      $(document).bind('pageinit', function() {
        console.log("-- lets start the party --");
        mestaDB.indexedDB.open();
        $("#addmesta").click(function() {
          addmesta();
        });
			$("#addItem2").click(function() {
          addTodo2();
        });
		$("#showAll").click(function() {
         showAll();
        });
		$("#showauthor").click(function() {showauthor()});
		$("#showourmesta").click(function() {showourmesta()});
        $("#selectmesta").click(function() {selmesta()});
		$("#selektovatimesta").click(function() {selektovatimesta()});
		$("#selektovatikljuc").click(function() {selektovatiKljuc()});
		$("#select-native-key").click(function() {showKey()});
		$("#select-native-mesta").click(function() {showmesta()});
      });
	  $(document).on('pagebeforeshow', '#saradnici', function(){    
    // Add a new select element  
    //var selektovatimesta = $("#selektovatimesta").selektovatimesta.text();
    $('<select>').attr({'name':'select-choice-kljuc','id':'select-choice-kljuc','data-native-menu':'false'}).appendTo('[data-role="content"]');
    $('<option>').html('Select option!').appendTo('#select-choice-kljuc');
    $('<option>').attr({'value':'1'}).html('Value 1').appendTo('#select-choice-kljuc');
    $('<option>').attr({'value':'2'}).html('').appendTo('#select-choice-kljuc');    
    // Enhance new select element
    $('select').selectmenu();
      
    
});
      mestaDB.indexedDB.onerror = function(e) {
        console.log(e);
      };

      mestaDB.indexedDB.open = function() {
        var request = indexedDB.open(dbName, dbVersion);

        request.onsuccess = function(e) {
          console.log ("success our DB: " + dbName + " is open and ready for work");
          mestaDB.indexedDB.db = e.target.result;
          mestaDB.indexedDB.getSvaMesta();
        }
        
        request.onupgradeneeded = function(e) {
          mestaDB.indexedDB.db = e.target.result;
          var db = mestaDB.indexedDB.db;
          console.log ("Going to upgrade our DB from version: "+ e.oldVersion + " to " + e.newVersion);

            try {
              if (db.objectStoreNames && db.objectStoreNames.contains("mesta")) {
                db.deleteObjectStore("mesta");
              }
            }
            catch (err) {
              console.log("got err in objectStoreNames:" + err);
            }
            var store = db.createObjectStore("mesta",
                {keyPath: "isbn"});
			var mestaIndex = store.createIndex("by_mesta", "mesta", {unique: true});
			var authorIndex = store.createIndex("by_author", "author");
            store.put({mesta: "Aleksinac", author: "Fred", isbn: 1});
			store.put({mesta: "Krusevac", author: "Fred", isbn: 2});
			store.put({mesta: "Leskovac", author: "Barney", isbn: 3});
			store.put({mesta: "Nis", author: "Barney", isbn: 4});
			store.put({mesta: "Pirot", author: "Barney", isbn: 5});
			store.put({mesta: "Prokuplje", author: "Barney", isbn: 6});
			store.put({mesta: "Vranje", author: "Barney", isbn: 7});
			store.put({mesta: "Zrenjanin", author: "Barney", isbn: 8});
			console.log("-- onupgradeneeded store:"+ JSON.stringify(store));
          }
       
        request.onfailure = function(e) {
          console.error("could not open our DB! Err:"+e);  
        }
        
        request.onerror = function(e) {
          console.error("Well... How should I put it? We have some issues with our DB! Err:"+e);
        }
      };

      mestaDB.indexedDB.addmesta = function(mesta, todoAuthor) {
        var db = mestaDB.indexedDB.db;
        var trans = mestaDB.indexedDB.db.transaction("mesta", "readwrite");
        var store = trans.objectStore("mesta");


        var request = store.put({
          "mesta": mesta,
		  "author": todoAuthor,
          "isbn": 9
        });

        request.onsuccess = function(e) {
          mestaDB.indexedDB.getSvaMesta();
        };

        request.onerror = function(e) {
          console.error("Error Adding an item: ", e);
        };
      };
			 mestaDB.indexedDB.addTodo2 = function(mesta) {
        var db = mestaDB.indexedDB.db;
        var trans = mestaDB.indexedDB.db.transaction("mesta", "readwrite");
        var store = trans.objectStore("mesta");
		var index = store.index("by_mesta");

		var request = index.get("Bedrock Nights");
		request.onsuccess = function() {
		var matching = request.result;
		if (matching !== undefined) {
		// A match was found.
		var mesta = matching.mesta;
		$("#izvadi").click(function(){
        $("#izvadjeno").val(mesta);
  });
		//report(matching.isbn, matching.mesta, matching.author);
		} else {
		// No match was found.
		report(null);
		}
		};

        request.onerror = function(e) {
          console.error("Error Adding an item: ", e);
        };
      };

      mestaDB.indexedDB.deleteTodo = function(id) {
        var db = mestaDB.indexedDB.db;
        var trans = db.transaction("mesta", "readwrite");
        var store = trans.objectStore("mesta");

        var request = store.delete(id);

        request.onsuccess = function(e) {
          mestaDB.indexedDB.getSvaMesta();
        };

        request.onerror = function(e) {
          console.error("Error deleteing: ", e);
        };
      };

      mestaDB.indexedDB.getSvaMesta = function() {
        var todos = document.getElementById("todoItems");
        todos.innerHTML = "";

        var db = mestaDB.indexedDB.db;
        var trans = db.transaction("mesta", "readwrite");
        var store = trans.objectStore("mesta");

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

        cursorRequest.onerror = mestaDB.indexedDB.onerror;
      };

      function renderTodo(row) {
        var todos = document.getElementById("todoItems");
        var li = document.createElement("li");
        var a = document.createElement("a");
        var t = document.createTextNode(row.mesta);
		 var p = document.createTextNode(row.author);

        a.addEventListener("click", function() {
          mestaDB.indexedDB.deleteTodo(row.mesta);
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
      function addmesta() {
        var mesta = document.getElementById("mesta");
		var author = document.getElementById("author");
        if (mesta.value.length > 0) {
          mestaDB.indexedDB.addTodo(mesta.value, author.value);
          mesta.value = "";
		  author.value = "";
        };
      }

    function addTodo2() {
          mestaDB.indexedDB.addTodo2();
      }
      // use it in case you wish to work on specific 'set' of data
      function showAll() {
        document.getElementById("ourList").innerHTML = "" ;   
        var request = window.indexedDB.open(dbName);
        request.onsuccess = function(event) {
          // Enumerate the entire object store.
          var db = mestaDB.indexedDB.db;
          var trans = db.transaction("mesta", "readwrite");
          var request = trans.objectStore("mesta").openCursor();
          var ul = document.createElement("ul");
          request.onsuccess = function(event) {
            var cursor = request.result || event.result;
            // If cursor is null then we've completed the enumeration.
            if (!cursor) {
              document.getElementById("ourList").appendChild(ul);
              return;
            }
            var li = document.createElement("li");
            li.textContent = "key: " + cursor.key + " => Todo text: " + cursor.value.mesta + cursor.value.author;
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
          var db = mestaDB.indexedDB.db;
          var trans = db.transaction("mesta", "readwrite");
          var request = trans.objectStore("mesta").openCursor();
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
	  function showmesta() {
        document.getElementById("select-native-mesta").innerHTML = "" ;   
        var request = window.indexedDB.open(dbName);
        request.onsuccess = function(event) {
          // Enumerate the entire object store.
          var db = mestaDB.indexedDB.db;
          var trans = db.transaction("mesta", "readonly");
          var request = trans.objectStore("mesta").openCursor();
          var select = document.createElement("select");
          request.onsuccess = function(event) {
            var cursor = request.result || event.result;
            // If cursor is null then we've completed the enumeration.
            if (!cursor) {
              document.getElementById("select-native-mesta").appendChild(select);
              return;
            }
            var option = document.createElement("option");
            option.textContent = cursor.value.mesta;
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
          var db = mestaDB.indexedDB.db;
          var trans = db.transaction("mesta", "readonly");
          var store = trans.objectStore("mesta")
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
            li.textContent = "key: " + cursor.key + " => tit: " + cursor.value.isbn + cursor.value.mesta + cursor.value.author;
            ul.appendChild(li);
            cursor.continue();
          }
        }                    
      }
	  function showourmesta() {
        document.getElementById("ourmesta").innerHTML = "" ;   
        var request = window.indexedDB.open(dbName);
        request.onsuccess = function(event) {
          // Enumerate the entire object store.
          var db = mestaDB.indexedDB.db;
          var trans = db.transaction("mesta", "readonly");
          var store = trans.objectStore("mesta")
		  var indexa = store.index("by_mesta");
		  var ul = document.createElement("ul");
		  var request = indexa.openCursor(IDBKeyRange.only("Nis"));
          
          request.onsuccess = function(event) {
            var cursor = request.result || event.result;
            // If cursor is null then we've completed the enumeration.
            if (!cursor) {
              document.getElementById("ourmesta").appendChild(ul);
              return;
            }
            var li = document.createElement("li");
            li.textContent = "key: " + cursor.key + " => tit: " + cursor.value.isbn + cursor.value.mesta + cursor.value.author;
            ul.appendChild(li);
            cursor.continue();
          }
        }                    
      }
	  function selmesta() {
        document.getElementById("selectmesta").innerHTML = "" ;   
        var request = window.indexedDB.open(dbName);
        request.onsuccess = function(event) {
          // Enumerate the entire object store.
          var db = mestaDB.indexedDB.db;
          var trans = db.transaction("mesta", "readonly");
          var store = trans.objectStore("mesta")
		  var indexa = store.index("by_mesta");
		  var ul = document.createElement("ul");
		  var grad = "Nis";
		  var request = indexa.openCursor(IDBKeyRange.only(grad));
          
          request.onsuccess = function(event) {
            var cursor = request.result || event.result;
            // If cursor is null then we've completed the enumeration.
            if (!cursor) {
              document.getElementById("selectmesta").appendChild(ul);
              return;
            }
            var li = document.createElement("li");
            li.textContent = "key: " + cursor.key + " => tit: " + cursor.value.isbn + cursor.value.mesta + cursor.value.author;
            ul.appendChild(li);
            cursor.continue();
          }
        }                    
      }
	  function selektovatimesta() {
        document.getElementById("selektovatimesta").innerHTML = "" ;   
        var request = window.indexedDB.open(dbName);
        request.onsuccess = function(event) {
          // Enumerate the entire object store.
          var db = mestaDB.indexedDB.db;
          var trans = db.transaction("mesta", "readonly");
          var store = trans.objectStore("mesta")
		  var indexa = store.index("by_mesta");
		  var select = document.createElement("select");
		  var grad = "Nis";
		  var request = indexa.openCursor(IDBKeyRange.only(grad));
          
          request.onsuccess = function(event) {
            var cursor = request.result || event.result;
            // If cursor is null then we've completed the enumeration.
            if (!cursor) {
              document.getElementById("selektovatimesta").appendChild(select);
              return;
            }
            var option = document.createElement("option");
            option.textContent = "key: " + cursor.key + " => tit: " + cursor.value.isbn + cursor.value.mesta + cursor.value.author;
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
          var db = mestaDB.indexedDB.db;
          var trans = db.transaction("mesta", "readonly");
          var store = trans.objectStore("mesta")
		  var indexa = store.index("by_mesta");
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
            option.textContent = "key: " + cursor.key + " => tit: " + cursor.value.isbn + cursor.value.mesta + cursor.value.author;
            select.appendChild(option);
            cursor.continue();
          }
        }                    
      }