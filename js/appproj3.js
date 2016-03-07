//Problem: No user interaction causes no change to application
//Solution: When user interacts cause changes appropriately
var color = $('.selected').css('background-color');
var $canvas = $('canvas');
var context = $canvas[0].getContext('2d');
var lastEvent;
var mouseDown = false;

//When clicking on control list items
$('.controls').on('click', 'li' ,function(){
  'use strict';
  //Deselect sibling elements
  $(this).siblings().removeClass('selected');
  //Select clicked element
  $(this).addClass('selected');
  //cache current color
  color = $(this).css('background-color');
});
  


//update the new color span
function changeColor(){
  'use strict';
  var r = $('#red').val();
  var g = $('#green').val();
  var b = $('#blue').val();
  $('#newColor').css('background-color',
    'rgb(' + r + ',' + g + ',' + b + ')');
}

//When "New Color" is pressed
$('#revealColorSelect').click(function(){
  'use strict';
  //Show color select or hide the color select.
  changeColor();
  $('#colorSelect').toggle();
});

//When color sliders change
$('input[type=range]').change(changeColor);


//When "Add Color" is pressed
$('#addNewColor').click(function(){
  'use strict';
  var $newColor = $('<li></li>');
  $newColor.css('background-color' , $('#newColor').css('background-color'));
  //Append the color to the controls ul
  $('.controls ul').append($newColor);
  //Select the new color
  $newColor.click();
});
  
//On mouse events on the canvas
$canvas.mousedown(function(e){
  'use strict';
  lastEvent = e;
  mouseDown = true;
}).mousemove(function(e){
  'use strict';
    //Draw lines
    if (mouseDown){
      context.beginPath();
      context.moveTo(lastEvent.offsetX,lastEvent.offsetY);
      context.lineTo(e.offsetX,e.offsetY);
      context.strokeStyle = color;
      context.stroke();
      lastEvent = e;
    }
}).mouseup(function(){
  'use strict';
  mouseDown = false;
}).mouseleave(function(){
  'use strict';
  $canvas.mouseup();
});