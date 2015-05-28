 <script>
	  $( document ).on( "pagecreate", function() {
    var nextId = 1;
    $("#dodajizvestaj").click(function() {
        nextId++;
        var content = "<div data-role='collapsible' id='postavka" + nextId + "'><h3>datum " + nextId + "</h3><p></p></div>";
        $( "#postavka" ).append( content ).collapsibleset( "refresh" );
    });
    $( "#pregledizvestaja" ).click(function() {
        $("#postavka").children(":last").collapsible( "pregledizvestaja" );
    });
    $( "#zatvoripregled" ).click(function() {
        $( "#postavka" ).children( ":last" ).collapsible( "zatvoripregled" );
    });
});
</script>
<script>
      var count = 0;
      $("#izvestaj").live("pagecreate", function(event) {
        $("#numlist").listview({create: function(event, ui) {
          $("#dodajBtn").bind("click", function(event, ui) {
		  var telzakontakt = document.getElementById("#telzakontakt");
            var str = "<li><a href='#'>" + telzakontakt + (++count) + "</a></li>";
            $("#numlist").append(str);
            $("#numlist").listview("refresh");
          });
          $("#obrisiBtn").bind("click", function(event, ui) {
            if (--count < 0) {
              count = 0;
              return;
            }
            $("#numlist").find("li").last().remove();
            $("#numlist").listview("refresh");
          });
        }});
      });
    </script>