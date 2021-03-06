var dbName = "klient1";
        var dbVersion = 4;
        var klientDB = {};
        var indexedDB = window.indexedDB || window.webkitIndexedDB ||
            window.mozIndexedDB;

        if ('webkitIndexedDB' in window) {
            //   window.IDBTransaction = window.webkitIDBTransaction;
            window.IDBKeyRange = window.webkitIDBKeyRange;
        }

        klientDB.indexedDB = {};
        klientDB.indexedDB.db = null;

        $(document).bind('pageinit', function () {
                    console.log("-- lets start the party --");
                    klientDB.indexedDB.open();
					//$("select").change(displayVals);
					$("#addklient").click(function() {
          addklient();
        });
                    $("#radioo").click(function () {
                        addRadioo();
                    });
                    $("#checkvoz").click(function () {
                        addCheckvoz();
                    });
                    $("#markaregoz").click(function () {
                        addMarkaregoz();
                    });
                    $("#checkpov").click(function () {
                        addCheckpov();
                    });
                    $('input#mestog').on('input', function (e) {
                        //alert('Changed!')
                    });
					$("#showauthor").click(function () {
                            showauthor()
                        });
                    $("#showAll").click(function () {
                            showAll();
                        });

                    
});
$(document).on('change', '#checkbox-prihvacen', function(){   
    var dirNameprihvacen = $.mobile.path.get( $( this ).attr( "#checkbox-prihvacen" ) );
	var selektovanoprihvacen = $(this).find("input:checkbox[name='checkbox-prihvacen']:checked").text();
    $( "#myprihvacen" ).text( String( dirNameprihvacen ) );	
	$( "#myprihvacen" ).html(selektovanoprihvacen);
	      document.querySelector("#statusprihvacen").innerHTML = selektovanoprihvacen;
		$("#btprihvacen").click(function(){
        $("#tesprihvacen").val(selektovanoprihvacen);});
    });
$(document).on('change', '#select-custom-saradnik', function(){   
    var dirNamesaradnik = $.mobile.path.get( $( this ).attr( "#select-custom-saradnik" ) );
	var selektovanosaradnik = $(this).find("option:selected").text();
	$("#testsaradnik").val(selektovanosaradnik);
    $( "#mysaradnik" ).text( String( dirNamesaradnik ) );	
	$( "#mysaradnik" ).html(selektovanosaradnik);
	      document.querySelector("#statussaradnik").innerHTML = selektovanosaradnik;
		$("#btsaradnik").click(function(){
        $("#tessaradnik").val(selektovanosaradnik);});
    });
		$(document).on('change', '#select-custom-mESTO', function(){   
    var dirName = $.mobile.path.get( $( this ).attr( "#select-custom-mESTO" ) );
	var selektovanomESTO = $(this).find("option:selected").text();
	$("#testmESTO").val(selektovanomESTO);
    $( "#mymESTO" ).text( String( dirName ) );	
	$( "#mymESTO" ).html(selektovanomESTO);
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
	$(document).on('change', '#select-custom-mesec', function(){   
    var dirNamemesec = $.mobile.path.get( $( this ).attr( "#select-custom-mesec" ) );
	var selektovanomesec = $(this).find("option:selected").text();
	$("#testmesec").val(selektovanomesec);
    $( "#mymesec" ).text( String( dirNamemesec ) );	
	$( "#mymesec" ).html(selektovanomesec);
	      document.querySelector("#statusmesec").innerHTML = selektovanomesec;
		$("#btmesec").click(function(){
        $("#tesmesec").val(selektovanomesec);});
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
	document.querySelector("#statusradio").innerHTML = selektovanoradio;
                        });
						});
	$(document).on('change', '#checkboxvoz', function(){ 
	$("input[name*=checkboxvoz-]:checked").each(function () {
    var selektovanocheckboxvoz = $("input[name*=checkboxvoz-]:checked").val();
	document.querySelector("#statuscheckboxvoz").innerHTML = selektovanocheckboxvoz;
                        });
						});
					klientDB.indexedDB.onerror = function (e) {
                        console.log(e);
                    };
                    klientDB.indexedDB.open = function () {
                        var request = indexedDB.open(dbName, dbVersion);

                        request.onsuccess = function (e) {
                            console.log("success our DB: " + dbName + " is open and ready for work");
                            klientDB.indexedDB.db = e.target.result;
                            klientDB.indexedDB.getAllklientItems();
                        }

                        request.onupgradeneeded = function (e) {
                            klientDB.indexedDB.db = e.target.result;
                            var db = klientDB.indexedDB.db;
                            console.log("Going to upgrade our DB from version: " + e.oldVersion + " to " + e.newVersion);

                            try {
                                if (db.objectStoreNames && db.objectStoreNames.contains("klientos")) {
                                    db.deleteObjectStore("klientos");
                                }
                            } catch (err) {
                                console.log("got err in objectStoreNames:" + err);
                            }
                            var store = db.createObjectStore("klientos", {
                                keyPath: "isbn"
                            });
                            var klienttitleIndex = store.createIndex("by_klienttitle", "klienttitle", {
                                unique: true
                            });
                            var authorIndex = store.createIndex("by_author", "author");
                            store.put({
                                klienttitle: "Quarry Memories",
                                author: "Fred",
                                podaci: "",
                                klientoradio: "",
                                klientcheck: "",
                                klientmarka: "",
                                klientregbr: "",
                                klientoz: "",
                                klientpovreda: "",
                                isbn: 123456
                            });
                            store.put({
                                klienttitle: "Water Buffaloes",
                                author: "Fred",
                                podaci2: "",
                                klientoradio: "",
                                klientcheck: "",
                                klientmarka: "",
                                klientregbr: "",
                                klientoz: "",
                                klientpovreda: "",
                                isbn: 234567
                            });
                            store.put({
                                klienttitle: "Bedrock Nights",
                                author: "Barney",
                                podaci3: "",
                                klientoradio: "",
                                klientcheck: "",
                                klientmarka: "",
                                klientregbr: "",
                                klientoz: "",
                                klientpovreda: "",
                                isbn: 345678
                            });
                            console.log("-- onupgradeneeded store:" + JSON.stringify(store));
                        }

                        request.onfailure = function (e) {
                            console.error("could not open our DB! Err:" + e);
                        }

                        request.onerror = function (e) {
                            console.error("Well... How should I put it? We have some issues with our DB! Err:" + e);
                        }
                    };
					
                    klientDB.indexedDB.addklient = function (klientTitle, klientAuthor, klientPodaci, klientPodaci2, klientPodaci3, klientoradio, klientcheck, klientmarka, klientregbr, klientoz, klientpovreda) {
                        var db = klientDB.indexedDB.db;
                        var trans = klientDB.indexedDB.db.transaction("klientos", "readwrite");
                        var store = trans.objectStore("klientos");
						var request = store.put({
                            "klienttitle": klientTitle,
                            "author": klientAuthor,
                            "podaci": klientPodaci,
                            "podaci2": klientPodaci2,
                            "podaci3": klientPodaci3,
                            "klientoradio": klientoradio,
                            "klientcheck": klientcheck,
                            "klientmarka": klientmarka,
                            "klientregbr": klientregbr,
                            "klientoz": klientoz,
                            "klientpovreda": klientpovreda,
                            "isbn": 445456
                        });

                        request.onsuccess = function (e) {
                            klientDB.indexedDB.getAllklientItems();
                        };

                        request.onerror = function (e) {
                            console.error("Error Adding an item: ", e);
                        };
                    };

                    klientDB.indexedDB.deleteklient = function (id) {
                        var db = klientDB.indexedDB.db;
                        var trans = db.transaction("klientos", "readwrite");
                        var store = trans.objectStore("klientos");

                        var request = store.delete(id);

                        request.onsuccess = function (e) {
                            klientDB.indexedDB.getAllklientItems();
                        };

                        request.onerror = function (e) {
                            console.error("Error deleteing: ", e);
                        };
                    };

                    klientDB.indexedDB.getAllklientItems = function () {
                        var klients = document.getElementById("klientItems");
                        klients.innerHTML = " ";

                        var db = klientDB.indexedDB.db;
                        var trans = db.transaction("klientos", "readonly");
                        var store = trans.objectStore("klientos");

                        // Get everything in the store;
                        var keyRange = IDBKeyRange.lowerBound(0);
                        var cursorRequest = store.openCursor(keyRange);

                        cursorRequest.onsuccess = function (e) {
                            var result = e.target.result;
                            if (!!result == false)
                                return;

                            renderklient(result.value);
                            result.continue();
                        };

                        cursorRequest.onerror = klientDB.indexedDB.onerror;
                    };

                    function renderklient(row) {
                        var klients = document.getElementById("klientItems");
                        var li = document.createElement("li");
                        var a = document.createElement("a");
                        var t = document.createTextNode(row.klienttitle);
                        var p = document.createTextNode(row.author);
                        var t1 = document.createTextNode(row.podaci);
                        var t2 = document.createTextNode(row.podaci2);
                        var t3 = document.createTextNode(row.podaci3);
                        var p2 = document.createTextNode(row.klientoradio);
                        var p4 = document.createTextNode(row.klientcheck);
                        var p5 = document.createTextNode(row.klientmarka);
                        var p6 = document.createTextNode(row.klientregbr);
                        var p7 = document.createTextNode(row.klientoz);
                        var p8 = document.createTextNode(row.klientpovreda);

                        a.addEventListener("click", function () {
                            klientDB.indexedDB.deleteklient(row.klienttitle);
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
                        li.appendChild(t3);
                        li.appendChild(p);
                        li.appendChild(p2);
                        li.appendChild(p4);
                        li.appendChild(p5);
                        li.appendChild(p6);
                        li.appendChild(p7);
                        li.appendChild(p8);
                        klients.appendChild(li)
                            // And lets create the new il item with its markup
                        $("#klientItems").trigger('create');
                    }

                    // Add an item only if we have more then zero letters
                    function addklient() {
						var klienttitle = document.getElementById("klienttitle");
                        var author = document.getElementById("author");
                        var podaci = document.getElementById("podaci");
                        var podaci2 = document.getElementById("podaci2");
                        var podaci3 = document.getElementById("podaci3");
						var klientoradio = document.getElementById("statusradio");
						var klientcheck = document.getElementById("statuscheckboxvoz");
                        var klientmarka = document.getElementById("marka");
                        var klientregbr = document.getElementById("regbr");
                        var klientoz = document.getElementById("oz");
                        var klientpovreda = document.getElementById("povreda");
                        klientDB.indexedDB.addklient(klienttitle.value, author.value, podaci.value, podaci2.value, podaci3.value, klientoradio.value, klientcheck.value, klientmarka.value, klientregbr.value, klientoz.value, klientpovreda.value);
                        klienttitle.value = "";
                        author.value = "";
                    }

                    function addklient2() {
                        var klienttitle = document.getElementById("klient");
                        var author = document.getElementById("author");
                        if (klienttitle.value.length > 0) {
                            klientDB.indexedDB.addklient(klienttitle.value, author.value);
                            klienttitle.value = "";
                            author.value = "";
                        };
                    }

                    // use it in case you wish to work on specific 'set' of data
                    function showAll() {
                        document.getElementById("ourList").innerHTML = "";
                        var request = window.indexedDB.open(dbName);
                        request.onsuccess = function (event) {
                            // Enumerate the entire object store.
                            var db = klientDB.indexedDB.db;
                            var trans = db.transaction("klientos", "readonly");
                            var request = trans.objectStore("klientos").openCursor();
                            var ul = document.createElement("ul");
                            request.onsuccess = function (event) {
                                var cursor = request.result || event.result;
                                // If cursor is null then we've completed the enumeration.
                                if (!cursor) {
                                    document.getElementById("ourList").appendChild(ul);
                                    return;
                                }
                                var li = document.createElement("li");
                                li.textContent = "key: " + cursor.key + " => klient text: " + cursor.value.klienttitle + cursor.value.author + cursor.value.podaci + cursor.value.podaci2 + cursor.value.podaci3 + cursor.value.klientoradio, cursor.value.klientcheck, cursor.value.klientmarka, cursor.value.klientregbr, cursor.value.klientoz, cursor.value.klientpovreda;
                                ul.appendChild(li);
                                cursor.continue();
                            }
                        }
                    }

                    function showauthor() {
                        document.getElementById("ourAuthor").innerHTML = "";
                        var request = window.indexedDB.open(dbName);
                        request.onsuccess = function (event) {
                            // Enumerate the entire object store.
                            var db = klientDB.indexedDB.db;
                            var trans = db.transaction("klientos", "readonly");
                            var store = trans.objectStore("klientos")
                            var indexa = store.index("by_author");
                            var ul = document.createElement("ul");
                            var request = indexa.openCursor(IDBKeyRange.only("Fred"));

                            request.onsuccess = function (event) {
                                var cursor = request.result || event.result;
                                // If cursor is null then we've completed the enumeration.
                                if (!cursor) {
                                    document.getElementById("ourAuthor").appendChild(ul);
                                    return;
                                }
                                var li = document.createElement("li");
                                li.textContent = "key: " + cursor.key + " => tit: " + cursor.value.isbn + cursor.value.klienttitle + cursor.value.author;
                                ul.appendChild(li);
                                cursor.continue();
                            }
                        }
                    }