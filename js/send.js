$( document ).ajaxSend(function( event, request, settings ) {
  $( "#msg" ).append( "<li>Starting request at " + settings.url + "</li>" );
});