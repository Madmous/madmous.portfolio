function isCheked() {
  'use strict';
  $('#test').click(function() {
    {
      if ($('#test').prop('checked')) {
        $('nav').css('left','0');
        $('.page').css('left','189px');
        $('.page').css('pointer-events','none');
        $('header').css('left','189px');
        $('main').css('overflow','hidden');
        $('.page').css('-webkit-filter','blur(3px)');
      } 
      else{
        $('nav').css('left','-100%');
        $('.page').css('left','0');
        $('.page').css('pointer-events','auto');
        $('header').css('left','0');
        $('main').css('overflow','visible');
        $('.page').css('-webkit-filter','none');
        
      }
    }
  });
}

$(function () {
  'use strict';
  isCheked();
});

$(function () {
  'use strict';
  var $window = $(window), isActive = false;

  function onResize() {
      if (!isActive && $window.width() > 759) {
        isActive = true;
        $('#test').prop('checked', false);
        $('nav').css('left','-100%');
        $('.page').css('left','0');
        $('.page').css('pointer-events','auto');
        $('header').css('left','0');
        $('main').css('overflow","visible');
        $('.page').css('-webkit-filter','none');
      } 
      else {
        
        // stop the dropdown
        //$(".page").css("-webkit-filter","blur(3px)");
        isActive = false;
      }
  }

  $window.resize(onResize);
  // call once on start up
  onResize();
});