 var dbName = "klientmesto8";
      var dbVersion = 4;
      var klDB = {};
      var indexedDB = window.indexedDB || window.webkitIndexedDB ||
        window.mozIndexedDB;

      if ('webkitIndexedDB' in window) {
        //   window.IDBTransaction = window.webkitIDBTransaction;
        window.IDBKeyRange = window.webkitIDBKeyRange;
      }

      klDB.indexedDB = {};
      klDB.indexedDB.db = null;

      $(document).bind('pageinit', function() {
        console.log("-- lets start the party --");
        klDB.indexedDB.open();
        $("#addMestos").click(function() {
          addMestos();
        });
		$("#addMestoizvestaj").click(function() {
          addMestoizvestaj();
        });
			$("#addItem2").click(function() {
          addTodo2();
        });
		$("#showl").click(function() {
         showl();
        });
		$("#snimljen").click(function() {
         snimljen();
        });
		$("#addMestoisaradnik").click(function() {
          addMestoisaradnik();
        });
		$("#showtit").click(function() {showtit()});
		$("#showtrenutno").click(function() {showtrenutno()});
		$("#showourmesto").click(function() {showourmesto()});
		$("#ormarmesto").click(function() {ormarmesto()});
		$("#ormari").click(function() {ormari()});
		$("#saradnik").click(function() {saradnik()});
        $("#selectMesto").click(function() {selMesto()});
		$("#selectopis").click(function() {opis()});
		$("#selektmesto").click(function() {selektMesto()});
		$("#selektovati").click(function() {selektovati()});
		$("#selektovatikljuc").click(function() {selektovatiKljuc()});
		$("#select-native-key").click(function() {showKey()});
		$("#select-native-nalogstore").click(function() {showMesto()});
      });
    $(document).on('change', '#select-choice-saradnikteren', function(){   
    var dirNamesaradnik = $.mobile.path.get( $( this ).attr( "#select-choice-saradnikteren" ) );
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
	$(document).on('change', '#select-choice-INTERNIBROJ', function(){   
    var dirName = $.mobile.path.get( $( this ).attr( "#select-choice-INTERNIBROJ" ) );
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
	$(document).on('change', '#checkboxkont', function(){ 
	$("input[name*=checkboxkont-]:checked").each(function () {
    var selektovanocheckboxkont = $("input[name*=checkboxkont-]:checked").val();
	$("#statuscheckboxkont").val(selektovanocheckboxkont);
	document.querySelector("#statuscheckboxkont").innerHTML = selektovanocheckboxkont;
                        });
						});
		$(document).on('change', '#checkboxsalji', function(){ 
	$("input[name*=checkboxsalji-]:checked").each(function () {
    var selektovanocheckboxsalji = $("input[name*=checkboxsalji-]:checked").val();
	$("#statuscheckboxsalji").val(selektovanocheckboxsalji);
	document.querySelector("#statuscheckboxsalji").innerHTML = selektovanocheckboxsalji;
                        });
						});
	$(document).on('change', '#tabela', function(){   
    var dirNameSATI = $.mobile.path.get( $( this ).attr( "#select-custom-SATI" ) );
	var selektovanooutteren = document.getElementById("teren");
	$("#testSATI").val(selektovanoSATI);
    $( "#mySATI" ).text( String( dirNameSATI ) );	
	$( "#mySATI" ).html(selektovanoSATI);
	      document.querySelector("#outteren").innerHTML = selektovanooutteren;
		$("#btSATI").click(function(){
        $("#tesSATI").val(selektovanoSATI);});
    });
	$(document).on('change', '#checkboxprihvacen', function(){ 
	$("input[name=checkbox-prihvacen]:checked").each(function () {
    var selektovanoprihvacen = $("input[name=checkbox-prihvacen]:checked").val();
	$("#statusprihvacen").val(selektovanoprihvacen);
	document.querySelector("#statusprihvacen").innerHTML = selektovanoprihvacen;
                        });
						});
      klDB.indexedDB.onerror = function(e) {
        console.log(e);
      };

      klDB.indexedDB.open = function() {
        var request = indexedDB.open(dbName, dbVersion);

        request.onsuccess = function(e) {
          console.log ("success our DB: " + dbName + " is open and ready for work");
          klDB.indexedDB.db = e.target.result;
          klDB.indexedDB.getSvaMesta();
		  klDB.indexedDB.getSnimljen();
        }
        
        request.onupgradeneeded = function(e) {
          klDB.indexedDB.db = e.target.result;
          var db = klDB.indexedDB.db;
          console.log ("Going to upgrade our DB from version: "+ e.oldVersion + " to " + e.newVersion);

            try {
              if (db.objectStoreNames && db.objectStoreNames.contains("nalogstore")) {
                db.deleteObjectStore("nalogstore");
              }
            }
            catch (err) {
              console.log("got err in objectStoreNames:" + err);
            }
            var store = db.createObjectStore("nalogstore",
                {keyPath: "id", autoIncrement:true});
			var interkeyIndex = store.createIndex("by_interkey", "interkey", {unique: true});
			var datumnalogIndex = store.createIndex("by_datumnalog", "datumnalog");
			var datumnalogIzvestaj = store.createIndex("by_di", "di");
            store.put({ter: "", tm: "", interkey: "1", t: "", datumnalog: "2014-07-03", tm: "Nis"});
			store.put({ter: "", tm: "", interkey: "2", t: "", datumnalog: "2014-07-03", tm: "Leskovac"});
			console.log("-- onupgradeneeded store:"+ JSON.stringify(store));
          }
       
        request.onfailure = function(e) {
          console.error("could not open our DB! Err:"+e);  
        }
        
        request.onerror = function(e) {
          console.error("Well... How should I put it? We have some issues with our DB! Err:"+e);
        }
      };
		klDB.indexedDB.addMestos = function(ter, tm, todointerkey, t, tododatumnalog, dat, tmes, tsat, mg, rad, pod, pod2, pod3, voz, m, r, o, boxa, pov, rads, pods, pods2, pods3, vozs, ms, rs, os, boxas, povs, lica, uzroksn, opisdogadjaja, stalo) {
        var db = klDB.indexedDB.db;
        var trans = klDB.indexedDB.db.transaction("nalogstore", "readwrite");
        var store = trans.objectStore("nalogstore");


        var request = store.put({
		  "ter": ter,
		  "tm": tm,
          "interkey": todointerkey,
		  "t": t,
		  "datumnalog": tododatumnalog,
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
		  "povs": povs,
		  "lica": lica,
		  "uzroksn": uzroksn, 
		  "opisdogadjaja": opisdogadjaja, 
		  "stalo": stalo
        });

        request.onsuccess = function(e) {
          klDB.indexedDB.getSvaMesta();
		  
        };

        request.onerror = function(e) {
          console.error("Error Adding an item: ", e);
        };
      };
	  klDB.indexedDB.addMestoizvestaj = function(di, kom, chprvi, raz, kontaktizves, srodstvo, chdra) {
        var db = klDB.indexedDB.db;
        var trans = klDB.indexedDB.db.transaction("nalogstore", "readwrite");
        var store = trans.objectStore("nalogstore");


        var request = store.put({
		  "di": di,
		  "kom": kom,
          "chprvi": chprvi,
		  "raz": raz,
		  "kontaktizves": kontaktizves,
		  "srodstvo": srodstvo,
		  "chdr": dr
		  });
	    request.onsuccess = function(e) {
          klDB.indexedDB.getSvakiIzv();
		  
        };

        request.onerror = function(e) {
          console.error("Error Adding an item: ", e);
        };
      };
		  
      klDB.indexedDB.addMestoisaradnik = function(todointerkey, tododatumnalog, saradnik, test) {
        var db = klDB.indexedDB.db;
        var trans = klDB.indexedDB.db.transaction("nalogstore", "readwrite");
        var store = trans.objectStore("nalogstore");


        var request = store.put({
          "interkey": todointerkey,
		  "datumnalog": tododatumnalog,
		  "saradnik": saradnik,
		  "test": test,
          "isbn": 10
        });

        request.onsuccess = function(e) {
          klDB.indexedDB.getSvaMesta();
        };

        request.onerror = function(e) {
          console.error("Error Adding an item: ", e);
        };
      };
			 klDB.indexedDB.addTodo2 = function(interkey) {
        var db = klDB.indexedDB.db;
        var trans = klDB.indexedDB.db.transaction("nalogstore", "readwrite");
        var store = trans.objectStore("nalogstore");
		var index = store.index("by_interkey");

		var request = index.get("3");
		request.onsuccess = function() {
		var matching = request.result;
		if (matching !== undefined) {
		// A match was found.
		var interkey = matching.interkey;
		$("#izvadi").click(function(){
        $("#izvadjeno").val(interkey);
  });
		//report(matching.isbn, matching.interkey, matching.datumnalog);
		} else {
		// No match was found.
		report(null);
		}
		};

        request.onerror = function(e) {
          console.error("Error Adding an item: ", e);
        };
      };

      klDB.indexedDB.deleteTodo = function(id) {
        var db = klDB.indexedDB.db;
        var trans = db.transaction("nalogstore", "readwrite");
        var store = trans.objectStore("nalogstore");

        var request = store.delete(id);

         request.onsuccess = function(e) {
          klDB.indexedDB.getSvaMesta();
        };

        request.onerror = function(e) {
          console.error("Error deleteing: ", e);
        };
      };

      klDB.indexedDB.getSvaMesta = function() {
        var ln = document.getElementById("listanaloga");
        ln.innerHTML = "";

        var db = klDB.indexedDB.db;
        var trans = db.transaction("nalogstore", "readwrite");
        var store = trans.objectStore("nalogstore");

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

        cursorRequest.onerror = klDB.indexedDB.onerror;
      };
	  klDB.indexedDB.getSvakiIzv = function() {
        var liz = document.getElementById("listaizvestaja");
        liz.innerHTML = "";

        var db = klDB.indexedDB.db;
        var trans = db.transaction("nalogstore", "readwrite");
        var store = trans.objectStore("nalogstore");

        // Get everything in the store;
        var keyRange = IDBKeyRange.lowerBound(0);
        var cursorRequest = store.openCursor(keyRange);

        cursorRequest.onsuccess = function(e) {
          var result = e.target.result;
          if(!!result == false)
            return;

          renderIzvestaj(result.value);
          result.continue();
        };

        cursorRequest.onerror = klDB.indexedDB.onerror;
      };
	  klDB.indexedDB.izmeni = function(internibroj){
	  var ot = document.getElementById("outtabela");

        var db = klDB.indexedDB.db;
        var trans = db.transaction("nalogstore", "readwrite");
        var store = trans.objectStore("nalogstore");

        // Get everything in the store;
		var indexot = store.index("by_interkey");
		var requestot = indexot.openCursor(IDBKeyRange.only(internibroj));
         
        requestot.onsuccess = function(e) {
          var resultot = e.target.resultot;
          if(!!resultot == false)
            return;
		outtestinternibrojout = document.createElement("input"); 
		outtestinternibrojout.type = text;
		outtestinternibrojout.name = outtestinternibrojout;
		outtestinternibrojout.id = outtestinternibrojout;
		outtestinternibrojout.className = "outtestinternibrojout";
		ot.appendChild(outtestinternibrojout);
          resultot.continue();
        };

        resultot.onerror = klDB.indexedDB.onerror;
	  };
      klDB.indexedDB.getSnimljen = function() {
        var sn = document.getElementById("todosnimljen");
        sn.innerHTML = "";
		
        var db = klDB.indexedDB.db;
        var trans = db.transaction("nalogstore", "readwrite");
        var store = trans.objectStore("nalogstore");

        // Get everything in the store;
        var indexot = store.index("by_interkey");
		var requestot = indexot.openCursor(IDBKeyRange.only(internibroj));
        
        cursorRequest.onsuccess = function(e) {
          var result = e.target.result;
          if(!!result == false)
            return;

          renderBroj(result.value);
          result.continue();
        };

        cursorRequest.onerror = klDB.indexedDB.onerror;
      };
      klDB.indexedDB.getSaradnik = function() {
        var gs = document.getElementById("getsaradnik");
        gs.innerHTML = "";

        var db = klDB.indexedDB.db;
        var trans = db.transaction("nalogstore", "readwrite");
        var store = trans.objectStore("nalogstore");

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

        cursorRequest.onerror = klDB.indexedDB.onerror;
      };
      function renderTodo(row) {
        var ln = document.getElementById("listanaloga");
		var izdbr = document.getElementById("izdbroj");
		var select = document.createElement("select");
		var option = document.createElement("option");
        var li = document.createElement("li");
        var a = document.createElement("a");
		var button = document.createElement("button");
		var p1 = document.createTextNode(row.ter + ", ");
		var p2 = document.createTextNode(row.tm + ", ");
        var t = document.createTextNode(row.interkey + ", ");
		var p3 = document.createTextNode(row.t + ", ");
		 var p4 = document.createTextNode(row.datumnalog + ", ");
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
		var p29 = document.createTextNode(row.lica + ", ");
		var p30 = document.createTextNode(row.uzroksn + ", ");
		var p31 = document.createTextNode(row.opisdogadjaja + ", ");
		var p32 = document.createTextNode(row.stalo + ", ");
        a.addEventListener("click", function() {
          klDB.indexedDB.deleteTodo(row.interkey);
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
		li.appendChild(p29);
		li.appendChild(p30);
		li.appendChild(p31);
		li.appendChild(p32);
		jQuery.each(function(){
		option.appendChild(t);});
        ln.appendChild(li);
		select.appendChild(option);
		izdbr.appendChild(select);
        // And lets create the new il item with its markup
        $("#listanaloga").trigger('create'); 
      }
	  function renderizvestaj(row) {
        var liz = document.getElementById("listaizvestaja");
		var izdbr = document.getElementById("izvbroj");
		var select = document.createElement("select");
		var option = document.createElement("option");
        var li = document.createElement("li");
        var a = document.createElement("a");
		var button = document.createElement("button");
		var p1 = document.createTextNode(row.di + ", ");
		li.appendChild(p1);
		liz.appendChild(li);
		select.appendChild(option);
		izdbr.appendChild(select);
        // And lets create the new il item with its markup
        $("#listaizvestaja").trigger('create'); 
      }
	function renderBroj(row) {
        var brojevi = document.getElementById("outtestinternibrojout");
        var div = document.createElement("div");
        var a = document.createElement("a");
		var p30 = document.createTextNode(row.interkey);
		a.setAttribute("href", "#");
        a.setAttribute("data-iconpos", "notext");
        a.setAttribute("data-role", "button");
        a.setAttribute("data-icon", "delete"); 
        a.setAttribute("data-inline", "true");
		div.appendChild(p30);
        brojevi.appendChild(div)
         $("#outtestinternibrojout").trigger('create'); 
      }
	  function addMestos() {
	    var ter = document.getElementById("teren");
		var tm = document.getElementById("testmesto");
        var interkey = document.getElementById("testinternibroj");
		var t = document.getElementById("test");
		var datumnalog = document.getElementById("date");
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
		var lica = document.getElementById("lica");
		var uzroksn = document.getElementById("uzroksn");
		var opisdogadjaja = document.getElementById("opisdogadjaja");
		var stalo = document.getElementById("stalo");
		if (interkey.value.length > 0) {
          klDB.indexedDB.addMestos(ter.value, tm.value, interkey.value, t.value, datumnalog.value, dat.value, tmes.value, tsat.value, mg.value, rad.value, pod.value, pod2.value, pod3.value, voz.value, m.value, r.value, o.value, boxa.value, pov.value, rads.value, pods.value, pods2.value, pods3.value, vozs.value, ms.value, rs.value, os.value, boxas.value, povs.value, lica.value, uzroksn.value, opisdogadjaja.value, stalo.value);
		  interkey.value = "";
		  datumnalog.value = "";
		  tm.value = "";
		  t.value = "";
        };
		
      }
	  function addMestoizvestaj() {
	    var di = document.getElementById("datizvestaja");
		var kom = document.getElementById("textizv");
		var chprvi = document.getElementById("statuscheckboxskont");
        var raz = document.getElementById("razgovor");
		var kontaktizves = document.getElementById("kontakt");
		var srodstvo = document.getElementById("srodstvo");
		var chdr = document.getElementById("statuscheckboxsalji");
		if (di.value.length > 0) {
		klDB.indexedDB.addMestoizvestaj(di.value, kom.value, chprvi.value, raz.value, kontaktizves.value, srodstvo.value, chdr.value);
		 };}
      function addMestoisaradnik() {
        var interkey = document.getElementById("testinternibroj");
		var datumnalog = document.getElementById("date");
		var saradnik = document.getElementById("povreda");
        if (interkey.value.length > 0) {
          klDB.indexedDB.addMesto(interkey.value, datumnalog.value, saradnik.value);
          interkey.value = "";
		  datumnalog.value = "";
		  saradnik.value = "";
        };
      }

    function addTodo2() {
          klDB.indexedDB.addTodo2();
      }
	  function snimljen() {klDB.indexedDB.getSnimljen();}
      // use it in case you wish to work on specific 'set' of data
	  function ormarmesto() {
        document.getElementById("ourormar").innerHTML = "";   
		document.getElementById("out").innerHTML = "";
        var request = window.indexedDB.open(dbName);
        request.onsuccess = function(event) {
          // Enumerate the entire object store.
          var db = klDB.indexedDB.db;
          var trans = db.transaction("nalogstore", "readonly");
          var request = trans.objectStore("nalogstore").openCursor();
          var a = document.createElement("a");
		  var as = document.createElement("a");
          request.onsuccess = function(event) {
            var cursor = request.result || event.result;
            // If cursor is null then we've completed the enumeration.
            if (!cursor) {
              document.getElementById("ourormar").appendChild(a);
			  document.getElementById("out").appendChild(as);
              return;
            }
			a.textContent = cursor.value.interkey;
			as.textContent = cursor.value.ter;
			 a.addEventListener("click", function() {
          klDB.indexedDB.izmeni(cursor.value.interkey);
        }, true);
        // some fun with jquery mobile data attributes
        a.setAttribute("href", "#outtabela");
        a.setAttribute("data-iconpos", "notext");
        a.setAttribute("data-role", "button");
        a.setAttribute("data-icon", "save"); 
        a.setAttribute("data-inline", "true");
		as.setAttribute("href", "#outtabela");
        as.setAttribute("data-iconpos", "notext");
        as.setAttribute("data-role", "button");
        as.setAttribute("data-icon", "save"); 
        as.setAttribute("data-inline", "true");
		  //as.setAttribute("class", "as");
            cursor.continue();
          }
        }                    
      }
      function showl() {
        document.getElementById("l").innerHTML = "" ;   
        var request = window.indexedDB.open(dbName);
        request.onsuccess = function(event) {
          // Enumerate the entire object store.
          var db = klDB.indexedDB.db;
          var trans = db.transaction("nalogstore", "readonly");
          var request = trans.objectStore("nalogstore").openCursor();
          var ul = document.createElement("ul");
          request.onsuccess = function(event) {
            var cursor = request.result || event.result;
            // If cursor is null then we've completed the enumeration.
            if (!cursor) {
              document.getElementById("l").appendChild(ul);
              return;
            }
            var li = document.createElement("li");
            li.textContent = "key: " + cursor.key + " => Todo text: " + cursor.value.interkey + cursor.value.datumnalog + cursor.value.tm + cursor.value.t + cursor.value.m + cursor.value.r + cursor.value.o + cursor.value.pov;
            ul.appendChild(li);
            cursor.continue();
          }
        }                    
      }
	        function showindex() {  
		document.getElementById("datumnal").innerHTML = "" ;  
		document.getElementById("interni").innerHTML = "" ;  
		document.getElementById("ter").innerHTML = "" ;  
		document.getElementById("mgid").innerHTML = "" ;  
		document.getElementById("podid").innerHTML = "" ;  
		document.getElementById("podsid").innerHTML = "" ;  
        var request = window.indexedDB.open(dbName);
        request.onsuccess = function(event) {
          // Enumerate the entire object store.
          var db = klDB.indexedDB.db;
          var trans = db.transaction("nalogstore", "readonly");
          var request = trans.objectStore("nalogstore").openCursor();
          var ul = document.createElement("ul");
		  var a = document.createElement("a");
		  var datumnal = document.createElement("a");
		  var interni = document.createElement("a");
		   var mgid = document.createElement("a");
		    var podid = document.createElement("a");
			 var podsid = document.createElement("a");
          request.onsuccess = function(event) {
            var cursor = request.result || event.result;
            // If cursor is null then we've completed the enumeration.
            if (!cursor) {
			  document.getElementById("ter").appendChild(a);
			  document.getElementById("datumnal").appendChild(datumnal);
			  document.getElementById("interni").appendChild(interni);
			  document.getElementById("mgid").appendChild(mgid);
			  document.getElementById("podid").appendChild(podid);
			  document.getElementById("podsid").appendChild(podsid);
              return;
            }
			a.textContent = cursor.value.ter;
			 a.setAttribute("href", "saradnici.html");
			datumnal.textContent = cursor.value.datumnalog;
			interni.textContent = cursor.value.interkey;
			interni.setAttribute("href", "#outtabela");
			mgid.textContent = cursor.value.mg;
			podid.textContent = cursor.value.pod;
			podsid.textContent = cursor.value.pods;
			 var kljucic = document.createElement("li");
            kljucic.textContent = cursor.key;
            var li = document.createElement("li");
            li.textContent = "key: " + cursor.key + " " + cursor.value.interkey + " " + cursor.value.datumnalog + " " + cursor.value.pod + " " + cursor.value.pods + " " + cursor.value.ter;
            ul.appendChild(li);
			ul.appendChild(kljucic);
            cursor.continue();
          }
        }                    
      }
	  function showKey() {
        document.getElementById("select-native-key").innerHTML = "" ;   
        var request = window.indexedDB.open(dbName);
        request.onsuccess = function(event) {
          // Enumerate the entire object store.
          var db = klDB.indexedDB.db;
          var trans = db.transaction("nalogstore", "readwrite");
          var request = trans.objectStore("nalogstore").openCursor();
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
        document.getElementById("select-native-nalogstore").innerHTML = "" ;   
        var request = window.indexedDB.open(dbName);
        request.onsuccess = function(event) {
          // Enumerate the entire object store.
          var db = klDB.indexedDB.db;
          var trans = db.transaction("nalogstore", "readonly");
          var request = trans.objectStore("nalogstore").openCursor();
          var select = document.createElement("select");
          request.onsuccess = function(event) {
            var cursor = request.result || event.result;
            // If cursor is null then we've completed the enumeration.
            if (!cursor) {
              document.getElementById("select-native-nalogstore").appendChild(select);
              return;
            }
            var option = document.createElement("option");
            option.textContent = cursor.value.interkey;
            select.appendChild(option);
            cursor.continue();
          }
        }                    
      }
	   function showtit() {
        document.getElementById("ourtit").innerHTML = "" ;   
        var request = window.indexedDB.open(dbName);
        request.onsuccess = function(event) {
          // Enumerate the entire object store.
          var db = klDB.indexedDB.db;
          var trans = db.transaction("nalogstore", "readonly");
          var store = trans.objectStore("nalogstore")
		  var indexa = store.index("by_datumnalog");
		  var ul = document.createElement("ul");
		  var request = indexa.openCursor(IDBKeyRange.only("2014-07-03"));
          
          request.onsuccess = function(event) {
            var cursor = request.result || event.result;
            // If cursor is null then we've completed the enumeration.
            if (!cursor) {
              document.getElementById("ourtit").appendChild(ul);
              return;
            }
            var li = document.createElement("li");
            li.textContent = "key: " + cursor.key + " => tit: " + cursor.value.id + cursor.value.interkey + cursor.value.datumnalog;
            ul.appendChild(li);
            cursor.continue();
          }
        }                    
      }
	  function showtrenutno() {
        document.getElementById("ourtrenutno").innerHTML = "" ;   
        var request = window.indexedDB.open(dbName);
        request.onsuccess = function(event) {
          // Enumerate the entire object store.
          var db = klDB.indexedDB.db;
          var trans = db.transaction("nalogstore", "readonly");
          var store = trans.objectStore("nalogstore")
		  var indexa = store.index("by_interkey");
		  var ul = document.createElement("ul");
		  var prom =  document.querySelector("#proba").innerHTML;
		  var request = indexa.openCursor(IDBKeyRange.only(prom));
          
          request.onsuccess = function(event) {
            var cursor = request.result || event.result;
            // If cursor is null then we've completed the enumeration.
            if (!cursor) {
              document.getElementById("ourtrenutno").appendChild(ul);
              return;
            }
            var li = document.createElement("li");
            li.textContent = "key: " + cursor.key + " => tit: " + cursor.value.id + cursor.value.interkey + cursor.value.datumnalog;
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
          var db = klDB.indexedDB.db;
          var trans = db.transaction("mesto", "readonly");
          var store = trans.objectStore("nalogstore")
		  var indexa = store.index("by_interkey");
		  var ul = document.createElement("ul");
		  var request = indexa.openCursor(IDBKeyRange.only("1"));
          
          request.onsuccess = function(event) {
            var cursor = request.result || event.result;
            // If cursor is null then we've completed the enumeration.
            if (!cursor) {
              document.getElementById("ourMesto").appendChild(ul);
              return;
            }
            var li = document.createElement("li");
            li.textContent = "key: " + cursor.key + " => tit: " + cursor.value.id + cursor.value.interkey + cursor.value.datumnalog;
            ul.appendChild(li);
            cursor.continue();
          }
        }                    
      }
	  function ormari() {
        document.getElementById("ourormari").innerHTML = "" ;   
        var request = window.indexedDB.open(dbName);
        request.onsuccess = function(event) {
          // Enumerate the entire object store.
          var db = klDB.indexedDB.db;
          var trans = db.transaction("nalogstore", "readonly");
          var store = trans.objectStore("nalogstore")
		  var indexa = store.index("by_interkey");
		  var ul = document.createElement("ul");
		  var request = indexa.openCursor(IDBKeyRange.only("1"));
          
          request.onsuccess = function(event) {
            var cursor = request.result || event.result;
            // If cursor is null then we've completed the enumeration.
            if (!cursor) {
              document.getElementById("ourormari").appendChild(ul);
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
          var db = klDB.indexedDB.db;
          var trans = db.transaction("nalogstore", "readonly");
          var store = trans.objectStore("nalogstore")
		  var indexa = store.index("by_interkey");
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
          var db = klDB.indexedDB.db;
          var trans = db.transaction("nalogstore", "readonly");
          var store = trans.objectStore("nalogstore")
		  var indexa = store.index("by_interkey");
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
            li.textContent = "key: " + cursor.key + " => tit: " + cursor.value.id + cursor.value.interkey + cursor.value.datumnalog;
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
          var db = klDB.indexedDB.db;
          var trans = db.transaction("nalogstore", "readonly");
          var store = trans.objectStore("nalogstore")
		  var indexa = store.index("by_interkey");
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
            li.textContent = cursor.value.datumnalog;
            ul.appendChild(li);
            cursor.continue();
          }
        }                    
      }
	  function selektMesto() {
        document.getElementById("selektMesto").innerHTML = "" ;   
        var request = window.indexedDB.open(dbName);
        request.onsuccess = function(event) {
          // Enumerate the entire object store.
          var db = klDB.indexedDB.db;
          var trans = db.transaction("nalogstore", "readonly");
          var store = trans.objectStore("nalogstore")
		  var indexa = store.index("by_interkey");
		  var select = document.createElement("select");
		  var grad = "Nis";
		  var request = indexa.openCursor(IDBKeyRange.only(1));
          
          request.onsuccess = function(event) {
            var cursor = request.result || event.result;
            // If cursor is null then we've completed the enumeration.
            if (!cursor) {
              document.getElementById("selektMesto").appendChild(select);
              return;
            }
            var option = document.createElement("option");
			
            option.textContent = "key: " + cursor.key + " => tit: " + cursor.value.id + cursor.value.interkey + cursor.value.datumnalog;
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
          var db = klDB.indexedDB.db;
          var trans = db.transaction("nalogstore", "readonly");
          var store = trans.objectStore("nalogstore")
		  var indexa = store.index("by_interkey");
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
            option.textContent = "key: " + cursor.key + " => tit: " + cursor.value.id + cursor.value.interkey + cursor.value.datumnalog;
            select.appendChild(option);
			var grad2 = "Aleksinac";
		    var request2 = indexa.openCursor(IDBKeyRange.only(grad2));
			request2.onsuccess = function(event) {
            var cursor = request.result || event.result;
            // If cursor is null then we've completed the enumeration.
            var option = document.createElement("option");
            option.textContent = "key: " + cursor.key + " => tit: " + cursor.value.id + cursor.value.interkey + cursor.value.datumnalog;
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
          var db = klDB.indexedDB.db;
          var trans = db.transaction("nalogstore", "readonly");
          var store = trans.objectStore("nalogstore")
		  var indexa = store.index("by_interkey");
		  var kljuck = document.createElement("kljuck");
		  var klj = "";
		  var request = indexa.openCursor(IDBKeyRange.upperBound("klj"));
          
          request.onsuccess = function(event) {
            var cursor = request.result || event.result;
            // If cursor is null then we've completed the enumeration.
            if (!cursor) {
              document.getElementById("selektovatiKljuc").appendChild(div);
              return;
            }
            var option = document.createElement("option");
            option.textContent = cursor.key;
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
          var db = klDB.indexedDB.db;
          var trans = db.transaction("nalogstore", "readonly");
          var store = trans.objectStore("nalogstore")
		  var indexa = store.index("by_interkey");
		  var ul = document.createElement("ul");
		  var request = indexa.openCursor(IDBKeyRange.only(result.value.interkey));
          
          request.onsuccess = function(event) {
            var cursor = request.result || event.result;
            // If cursor is null then we've completed the enumeration.
            if (!cursor) {
              document.getElementById("osnpret").appendChild(ul);
              return;
            }
            var li = document.createElement("li");
            li.textContent = "key: " + cursor.key + " => broj: " + cursor.value.interkey + " datum: " + cursor.value.datumnalog + " , nalogstore: " + cursor.value.mg + cursor.value.pod + cursor.value.pods;            ul.appendChild(li);
            cursor.continue();
          }
        }                    
      }