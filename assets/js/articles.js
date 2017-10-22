$(document).ready(function() {

  var $grid;

  function triggerIsotope() {
    // don't proceed if $grid has not been selected
    if ( !$grid ) {
      return;
    }
    // init Isotope
    $grid.isotope({
      // options
      itemSelector: '.preview',
      layoutMode: 'packery'
    });

  }
  // trigger Isotope on document ready
  $(function(){
    $grid = $('.article-list');
    triggerIsotope();
  });

  // trigger Isotope when fonts have loaded
  WebFont.load({
    custom: {
      families: ['frictionlessdata']
    },
    active: function () {
      triggerIsotope();
    },
    inactive: function () {
      triggerIsotope();
    },
    classes: false
  })

  // filter items on button click
  $('.filter-button-group').on( 'click', 'button', function() {
    var filterValue = $(this).attr('data-filter');
    $grid.isotope({ filter: filterValue });
  });
  // change active class on buttons
  $('.filter-button-group').each( function( i, buttonGroup ) {
    var $buttonGroup = $( buttonGroup );
    $buttonGroup.on( 'click', 'button', function() {
      $buttonGroup.find('.selected').removeClass('selected');
      $( this ).addClass('selected');
    });
  });

});
