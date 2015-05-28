 var dbName = "klientmesto5";
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
		$("#addMestoisaradnik").click(function() {
          addMestoisaradnik();
        });
		$("#showauthor").click(function() {showauthor()});
		$("#showindex").click(function() {showindex()});
		$("#showsaradnikbg").click(function() {showsaradnikbg()});
		$("#showourmesto").click(function() {showourmesto()});
		$("#regalmesto").click(function() {regalmesto()});
		$("#regali").click(function() {regali()});
		$("#saradnik").click(function() {saradnik()});
        $("#selectMesto").click(function() {selMesto()});
		$("#selectopis").click(function() {opis()});
		$("#selektovatimesto").click(function() {selektovatiMesto()});
		$("#selektovati").click(function() {selektovati()});
		$("#selektovatikljuc").click(function() {selektovatiKljuc()});
		$("#select-native-key").click(function() {showKey()});
		$("#select-native-mesto").click(function() {showMesto()});
      });
    $(document).on('change', '#select-custom-saradnikteren', function(){   
    var dirNamesaradnik = $.mobile.path.get( $( this ).attr( "#select-custom-saradnikteren" ) );
	var selektovanosaradnik = $(this).find("option:selected").text();
	$("#teren").val(selektovanosaradnik).trigger("refresh");});
	$(document).on('change', '#checkbox-prihvacen', function(){   
    var dirNameprihvacen = $.mobile.path.get( $( this ).attr( "#checkbox-prihvacen" ) );
	var selektovanoprihvacen = $(this).find("input:checkbox[name='checkbox-prihvacen']:checked").text();
    $( "#myprihvacen" ).text( String( dirNameprihvacen ) );	
	$( "#myprihvacen" ).html(selektovanoprihvacen);
	      document.querySelector("#statusprihvacen").innerHTML = selektovanoprihvacen;
		$("#btprihvacen").click(function(){
        $("#tesprihvacen").val(selektovanoprihvacen);});
    });
		$(document).on('change', '#select-custom-mESTO', function(){   
    var dirName = $.mobile.path.get( $( this ).attr( "#select-custom-mESTO" ) );
	var selektovanomESTO = $(this).find("option:selected").text();
	$("#testmesto").val(selektovanomESTO);
    $( "#mymesto" ).text( String( dirName ) );	
	$( "#mymesto" ).html(selektovanomESTO);
	      document.querySelector("#statusmESTO").innerHTML = selektovanomESTO;
		$("#btmESTO").click(function(){
        $("#tesmESTO").val(selektovanomESTO);});
    });
	$(document).on('change', '#select-custom-INTERNIBROJ', function(){   
    var dirName = $.mobile.path.get( $( this ).attr( "#select-custom-INTERNIBROJ" ) );
	var selektovanointernibroj = $(this).find("option:selected").text();
	 $("#testinternibroj").val(selektovanointernibroj);
    $( "#myinternibroj" ).text( String( dirName ) );	
	$( "#myinternibroj" ).html(selektovanointernibroj);
	      document.querySelector("#statusinternibroj").innerHTML = selektovanointernibroj;
		$("#btinternibroj").click(function(){
        $("#tesinternibroj").val(selektovanointernibroj);});
    });
			$(document).on('change', '#select-custom-ibr', function(){   
    var dirName = $.mobile.path.get( $( this ).attr( "#select-custom-ibr" ) );
	var selektovanokljuc = $(this).find("option:selected").text();
	$("#test").val(selektovanokljuc);
    $( "#mykljuc" ).text( String( dirName ) );	
	$( "#myibr" ).html(selektovanokljuc);
	      document.querySelector("#status").innerHTML = selektovanokljuc;
		$("#bt").click(function(){
        $("#tes").val(selektovanokljuc);});
    });  
	$(document).on('change', '#select-custom-mth', function(){   
    var dirNamemesec = $.mobile.path.get( $( this ).attr( "#select-custom-mth" ) );
	var selektovanomth = $(this).find("option:selected").text();
	$("#mth").val(selektovanomth);
    $( "#mymes" ).text( String( dirNamemesec ) );	
	$( "#mymes" ).html(selektovanomth);
	      document.querySelector("#statusmes").innerHTML = selektovanomth;
		$("#btmes").click(function(){
        $("#tesmes").val(selektovanomth);});
    });
	$(document).on('change', '#select-custom-SATI', function(){   
    var dirNameSATI = $.mobile.path.get( $( this ).attr( "#select-custom-SATI" ) );
	var selektovanoSATI = $(this).find("option:selected").text();
	$("#testSATI").val(selektovanoSATI);
    $( "#mySATI" ).text( String( dirNameSATI ) );	
	$( "#mySATI" ).html(selektovanoSATI);
	      document.querySelector("#statusSATI").innerHTML = selektovanoSATI;
		$("#btSATI").click(function(){
        $("#tesSATI").val(selektovanoSATI);});
    });
	$(document).on('change', '#radio', function(){ 
	$("input[name*=radio-choice-]:checked").each(function () {
    var selektovanoradio = $("input[name*=radio-choice-]:checked").val();
	$("#statusradio").val(selektovanoradio);
	document.querySelector("#statusradior").innerHTML = selektovanoradio;
                        });
						});
	$(document).on('change', '#checkboxvoz', function(){ 
	$("input[name*=checkboxvoz-]:checked").each(function () {
    var selektovanocheckboxvoz = $("input[name*=checkboxvoz-]:checked").val();
	$("#statuscheckboxvoz").val(selektovanocheckboxvoz);
	document.querySelector("#statuscheckboxvoza").innerHTML = selektovanocheckboxvoz;
                        });
						});
	$(document).on('change', '#checkboxak', function(){ 
	$("input[name*=checkboxa-]:checked").each(function () {
    var selektovanocheckboxa = $("input[name*=checkboxa-]:checked").val();
		 $("#selektovanocheckboxa").val(selektovanocheckboxa);
                        });
						});
	$(document).on('change', '#radios', function(){ 
	$("input[name*=radio-choices-]:checked").each(function () {
    var selektovanoradios = $("input[name*=radio-choices-]:checked").val();
	$("#statusradios").val(selektovanoradios);
	document.querySelector("#statusradiors").innerHTML = selektovanoradios;
                        });
						});
	$(document).on('change', '#checkboxvozs', function(){ 
	$("input[name*=checkboxvozs-]:checked").each(function () {
    var selektovanocheckboxvozs = $("input[name*=checkboxvozs-]:checked").val();
	$("#statuscheckboxvozs").val(selektovanocheckboxvozs);
	document.querySelector("#statuscheckboxvozas").innerHTML = selektovanocheckboxvozs;
                        });
						});
	$(document).on('change', '#checkboxaks', function(){ 
	$("input[name*=checkboxas-]:checked").each(function () {
    var selektovanocheckboxas = $("input[name*=checkboxas-]:checked").val();
		 $("#selektovanocheckboxas").val(selektovanocheckboxas);
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
                {keyPath: "id", autoIncrement:true});
			var titleIndex = store.createIndex("by_title", "title", {unique: true});
			var authorIndex = store.createIndex("by_author", "author");
            store.put({title: "1", author: "2014-07-03", tm: "Nis"});
			store.put({title: "2", author: "2014-07-03", tm: "Leskovac"});
			console.log("-- onupgradeneeded store:"+ JSON.stringify(store));
          }
       
        request.onfailure = function(e) {
          console.error("could not open our DB! Err:"+e);  
        }
        
        request.onerror = function(e) {
          console.error("Well... How should I put it? We have some issues with our DB! Err:"+e);
        }
      };
		todoDB.indexedDB.addMesto = function(ter, tm, todoTitle, t, todoAuthor, dat, tmes, tsat, mg, rad, pod, pod2, pod3, voz, m, r, o, boxa, pov, rads, pods, pods2, pods3, vozs, ms, rs, os, boxas, povs) {
        var db = todoDB.indexedDB.db;
        var trans = todoDB.indexedDB.db.transaction("mesto", "readwrite");
        var store = trans.objectStore("mesto");


        var request = store.put({
		  "ter": ter,
		  "tm": tm,
          "title": todoTitle,
		  "t": t,
		  "author": todoAuthor,
		  "dat": dat,
		  "tmes": tmes,
		  "tsat": tsat,
		  "mg": mg,
		  "rad": rad,
		  "pod": pod,
		  "pod2": pod2,
		  "pod3": pod3,
		  "voz": voz,
		  "m": m,
		  "r": r,
		  "o": o,
		  "boxa": boxa,
		  "pov": pov,
		  "rads": rads,
		  "pods": pods,
		  "pods2": pods2,
		  "pods3": pods3,
		  "vozs": vozs,
		  "ms": ms,
		  "rs": rs,
		  "os": os,
		  "boxas": boxas,
		  "povs": povs
        });

        request.onsuccess = function(e) {
          todoDB.indexedDB.getSvaMesta();
		  
        };

        request.onerror = function(e) {
          console.error("Error Adding an item: ", e);
        };
      };
      todoDB.indexedDB.addMestoisaradnik = function(todoTitle, todoAuthor, saradnik, test) {
        var db = todoDB.indexedDB.db;
        var trans = todoDB.indexedDB.db.transaction("mesto", "readwrite");
        var store = trans.objectStore("mesto");


        var request = store.put({
          "title": todoTitle,
		  "author": todoAuthor,
		  "saradnik": saradnik,
		  "test": test,
          "isbn": 10
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

        var request = store.delete(title.value);

         request.onsuccess = function(e) {
          todoDB.indexedDB.getSvaMesta();
        };

        request.onerror = function(e) {
          console.error("Error deleteing: ", e);
        };
      };

      todoDB.indexedDB.getSvaMesta = function() {
        var todos = document.getElementById("todoItems");
        todos.innerHTML = "";

        var db = todoDB.indexedDB.db;
        var trans = db.transaction("mesto", "readwrite");
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
      todoDB.indexedDB.getSaradnik = function() {
        var todos = document.getElementById("todoItems");
        todos.innerHTML = "";

        var db = todoDB.indexedDB.db;
        var trans = db.transaction("mesto", "readwrite");
        var store = trans.objectStore("mesto");

        // Get everything in the store;
        var keyRange = IDBKeyRange.lowerBound(0);
        var cursorRequest = store.openCursor(keyRange);

        cursorRequest.onsuccess = function(e) {
          var result = e.target.result;
          if(!!result == false)
            return;

		  var str = jQuery.param( result.value.ter );
         $( "#results" ).text( str );
          result.continue();
        };

        cursorRequest.onerror = todoDB.indexedDB.onerror;
      };
      function renderTodo(row) {
        var todos = document.getElementById("todoItems");
		var izdbr = document.getElementById("izdbroj");
		var select = document.createElement("select");
		var option = document.createElement("option");
        var li = document.createElement("li");
        var a = document.createElement("a");
		var button = document.createElement("button");
		var p1 = document.createTextNode(row.ter + ", ");
		var p2 = document.createTextNode(row.tm + ", ");
        var t = document.createTextNode(row.title + ", ");
		var p3 = document.createTextNode(row.t + ", ");
		 var p4 = document.createTextNode(row.author + ", ");
		 var p5 = document.createTextNode(row.dat + ", ");
		var p6 = document.createTextNode(row.tmes + ", ");
		 var p7 = document.createTextNode(row.tsat + ", ");
		 var p8 = document.createTextNode(row.mg + ", ");
		 var p9 = document.createTextNode(row.rad + ", ");
		var p10 = document.createTextNode(row.pod + ", ");
		var p11 = document.createTextNode(row.pod2 + ", ");
		var p12 = document.createTextNode(row.pod3 + ", ");
		var p13 = document.createTextNode(row.voz + ", ");
		var p14 = document.createTextNode(row.m + ", ");
		var p15 = document.createTextNode(row.r + ", ");
		var p16 = document.createTextNode(row.o + ", ");
		var p17 = document.createTextNode(row.boxa + ", ");
		var p18 = document.createTextNode(row.pov + ", ");
		 var p19 = document.createTextNode(row.rads + ", ");
		var p20 = document.createTextNode(row.pods + ", ");
		var p21 = document.createTextNode(row.pods2 + ", ");
		var p22 = document.createTextNode(row.pods3 + ", ");
		var p23 = document.createTextNode(row.vozs + ", ");
		var p24 = document.createTextNode(row.ms + ", ");
		var p25 = document.createTextNode(row.rs + ", ");
		var p26 = document.createTextNode(row.os + ", ");
		var p27 = document.createTextNode(row.boxas + ", ");
		var p28 = document.createTextNode(row.povs + ", ");
        a.addEventListener("click", function() {
          todoDB.indexedDB.deleteTodo(row.title);
        }, true);
		button.addEventListener("click", function() {
          todoDB.indexedDB.showindex();
        }, true);
        // some fun with jquery mobile data attributes
        a.setAttribute("href", "#");
        a.setAttribute("data-iconpos", "notext");
        a.setAttribute("data-role", "button");
        a.setAttribute("data-icon", "delete"); 
        a.setAttribute("data-inline", "true");
        li.appendChild(button);
        li.appendChild(a);
        li.appendChild(t);
		li.appendChild(p1);
		li.appendChild(p2);
		li.appendChild(p3);
		li.appendChild(p4);
		li.appendChild(p5);
		li.appendChild(p6);
		li.appendChild(p7);
		li.appendChild(p8);
		li.appendChild(p9);
		li.appendChild(p10);
		li.appendChild(p11);
		li.appendChild(p12);
		li.appendChild(p13);
		li.appendChild(p14);
		li.appendChild(p15);
		li.appendChild(p16);
		li.appendChild(p17);
		li.appendChild(p18);
		li.appendChild(p19);
		li.appendChild(p20);
		li.appendChild(p21);
		li.appendChild(p22);
		li.appendChild(p23);
		li.appendChild(p24);
		li.appendChild(p25);
		li.appendChild(p26);
		li.appendChild(p27);
		li.appendChild(p28);
		option.appendChild(t);
        todos.appendChild(li);
		select.appendChild(option);
		izdbr.appendChild(select);
        // And lets create the new il item with its markup
        $("#todoItems").trigger('create'); 
      }
	function renderBroj(row) {
        var brojevi = document.getElementById("idbroj");
        var li = document.createElement("li");
        var a = document.createElement("a");
		var p30 = document.createTextNode(row.title + ", ");
		a.setAttribute("href", "#");
        a.setAttribute("data-iconpos", "notext");
        a.setAttribute("data-role", "button");
        a.setAttribute("data-icon", "delete"); 
        a.setAttribute("data-inline", "true");
		li.appendChild(p30);
        brojevi.appendChild(li)
         $("#idbroj").trigger('create'); 
      }
	  function addMesto() {
	    var ter = document.getElementById("teren");
		var tm = document.getElementById("testmesto");
        var title = document.getElementById("testinternibroj");
		var t = document.getElementById("test");
		var author = document.getElementById("date");
		var dat = document.getElementById("date2");
		var tmes = document.getElementById("mth");
		var tsat = document.getElementById("testSATI");
		var mg = document.getElementById("mestog");
		var rad = document.getElementById("statusradio");
		var pod = document.getElementById("podaci");
		var pod2 = document.getElementById("podaci2");
		var pod3 = document.getElementById("podaci3");
		var voz = document.getElementById("statuscheckboxvoz");
		var m = document.getElementById("marka");
		var r = document.getElementById("regbr");
		var o = document.getElementById("oz");
		var boxa = document.getElementById("selektovanocheckboxa");
		var pov = document.getElementById("povreda");
		var rads = document.getElementById("statusradios");
		var pods = document.getElementById("podacis");
		var pods2 = document.getElementById("podacis2");
		var pods3 = document.getElementById("podacis3");
		var vozs = document.getElementById("statuscheckboxvozs");
		var ms = document.getElementById("markas");
		var rs = document.getElementById("regbrs");
		var os = document.getElementById("ozs");
		var boxas = document.getElementById("selektovanocheckboxas");
		var povs = document.getElementById("povredas");
        if (title.value.length > 0) {
          todoDB.indexedDB.addMesto(ter.value, tm.value, title.value, t.value, author.value, dat.value, tmes.value, tsat.value, mg.value, rad.value, pod.value, pod2.value, pod3.value, voz.value, m.value, r.value, o.value, boxa.value, pov.value, rads.value, pods.value, pods2.value, pods3.value, vozs.value, ms.value, rs.value, os.value, boxas.value, povs.value);
		  title.value = "";
		  author.value = "";
		  tm.value = "";
		  t.value = "";
        };
		
      }
      function addMestoisaradnik() {
        var title = document.getElementById("testinternibroj");
		var author = document.getElementById("date");
		var saradnik = document.getElementById("povreda");
        if (title.value.length > 0) {
          todoDB.indexedDB.addMesto(title.value, author.value, saradnik.value);
          title.value = "";
		  author.value = "";
		  saradnik.value = "";
        };
      }

    function addTodo2() {
          todoDB.indexedDB.addTodo2();
      }
      // use it in case you wish to work on specific 'set' of data
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
            li.textContent = "key: " + cursor.key + " => Todo text: " + cursor.value.title + cursor.value.author + cursor.value.tm + cursor.value.t + cursor.value.m + cursor.value.r + cursor.value.o + cursor.value.pov;
            ul.appendChild(li);
            cursor.continue();
          }
        }                    
      }
	        function showindex() {
        document.getElementById("ourindex").innerHTML = "" ;   
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
              document.getElementById("ourindex").appendChild(ul);
              return;
            }
            var li = document.createElement("li");
            li.textContent = "key: " + cursor.key + " " + cursor.value.title + " " + cursor.value.author + " " + cursor.value.pod + " " + cursor.value.pods + " " + cursor.value.ter;
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
		  var request = indexa.openCursor(IDBKeyRange.only("2014-07-03"));
          
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
	  function showsaradnikbg() {
        document.getElementById("oursaradnikBg").innerHTML = "" ;   
        var request = window.indexedDB.open(dbName);
        request.onsuccess = function(event) {
          // Enumerate the entire object store.
          var db = todoDB.indexedDB.db;
          var trans = db.transaction("mesto", "readonly");
          var store = trans.objectStore("mesto")
		  var indexa = store.index("by_title");
		  var ul = document.createElement("ul");
		  var request = indexa.openCursor(IDBKeyRange.only("Beograd"));
          
          request.onsuccess = function(event) {
            var cursor = request.result || event.result;
            // If cursor is null then we've completed the enumeration.
            if (!cursor) {
              document.getElementById("oursaradnikBg").appendChild(ul);
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
	  function opis() {
        document.getElementById("selectopis").innerHTML = "" ;   
        var request = window.indexedDB.open(dbName);
        request.onsuccess = function(event) {
          // Enumerate the entire object store.
          var db = todoDB.indexedDB.db;
          var trans = db.transaction("mesto", "readonly");
          var store = trans.objectStore("mesto")
		  var indexa = store.index("by_title");
		  var ul = document.createElement("ul");
		  var grad = document.querySelector("#uzmigrad").innerHTML; 
		  var request = indexa.openCursor(IDBKeyRange.only(grad));
          
          request.onsuccess = function(event) {
            var cursor = request.result || event.result;
            // If cursor is null then we've completed the enumeration.
            if (!cursor) {
              document.getElementById("selectopis").appendChild(ul);
              return;
            }
            var li = document.createElement("li");
            li.textContent = cursor.value.author;
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
	  function selektovati() {
        document.getElementById("selektovati").innerHTML = "" ;   
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
              document.getElementById("selektovati").appendChild(select);
              return;
            }
            var option = document.createElement("option");
            option.textContent = "key: " + cursor.key + " => tit: " + cursor.value.isbn + cursor.value.title + cursor.value.author;
            select.appendChild(option);
			var grad2 = "Aleksinac";
		    var request2 = indexa.openCursor(IDBKeyRange.only(grad2));
			request2.onsuccess = function(event) {
            var cursor = request.result || event.result;
            // If cursor is null then we've completed the enumeration.
            var option = document.createElement("option");
            option.textContent = "key: " + cursor.key + " => tit: " + cursor.value.isbn + cursor.value.title + cursor.value.author;
            select.appendChild(option);
            cursor.continue();
          }
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
		  var kljuck = document.createElement("kljuck");
		  var klj = "1";
		  var request = indexa.openCursor(IDBKeyRange.upperBound("1"));
          
          request.onsuccess = function(event) {
            var cursor = request.result || event.result;
            // If cursor is null then we've completed the enumeration.
            if (!cursor) {
              document.getElementById("selektovatiKljuc").appendChild(div);
              return;
            }
            var option = document.createElement("option");
            option.textContent = "key: " + cursor.key + " => tit: " + cursor.value.isbn + cursor.value.title + cursor.value.author;
            kljuck.appendChild(option);
            cursor.continue();
          }
        }                    
      }
	   function pretraga(){
        document.getElementById("osnpret").innerHTML = "" ;   
        var request = window.indexedDB.open(dbName);
        request.onsuccess = function(event) {
          // Enumerate the entire object store.
          var db = todoDB.indexedDB.db;
          var trans = db.transaction("mesto", "readonly");
          var store = trans.objectStore("mesto")
		  var indexa = store.index("by_title");
		  var ul = document.createElement("ul");
		  var request = indexa.openCursor(IDBKeyRange.only(title.value));
          
          request.onsuccess = function(event) {
            var cursor = request.result || event.result;
            // If cursor is null then we've completed the enumeration.
            if (!cursor) {
              document.getElementById("osnpret").appendChild(ul);
              return;
            }
            var li = document.createElement("li");
            li.textContent = "key: " + cursor.key + " => broj: " + cursor.value.title + " datum: " + cursor.value.author + " , mesto: " + cursor.value.mg + cursor.value.pod + cursor.value.pods;            ul.appendChild(li);
            cursor.continue();
          }
        }                    
      }