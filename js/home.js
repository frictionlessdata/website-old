$(document).ready(function(){
  $.adaptiveBackground.run({
    yiqThreshold: 200
  });

  // open menu on loading home page
  var API = $("#menu").data( "mmenu" );
  API.open();
});
