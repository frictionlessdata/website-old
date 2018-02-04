$(document).ready(function() {

  // convert signup labels into placeholders
  $("#mc_embed_signup form :input").each(function(index, elem) {
     var eId = $(elem).attr("id");
     var label = null;
     if (eId && (label = $(elem).parents("form").find("label[for="+eId+"]")).length == 1) {
       $(elem).attr("placeholder", $(label).html());
       $(label).addClass("text-hide");
     }
  });

});
