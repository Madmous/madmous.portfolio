var $name = $('#name');
var $email = $('#email');
var $message = $('#message');
var $address = $('#address');
var $nameError = $('#name-error');
var $emailError = $('#email-error');
var $messageError = $('#message-error');
var $nameWarning = $('#name-warning');
var $emailWarning = $('#email-warning');
var $messageWarning = $('#message-warning');

$('form span').hide();

function isNamePresent() {
  'use strict';
  return $name.val().length > 0;
}

function isEmailValid(){
  'use strict';
  return $email.val().length > 0;
}

function isMessageValid(){
  'use strict';
  return $message.val().length > 8;
}

function isAddressValid(){
  'use strict';
  return $address.val().length > 0;
}

function canSubmit(){
  'use strict';
  return isNamePresent() && isEmailValid() && isMessageValid() && !isAddressValid();
}

function nameEvent(){
  'use strict';
  if (isNamePresent()){
    $nameError.hide();
    $nameWarning.hide();
    $name.css('border','3px solid green');
  }
  else{
    $name.css('border','3px solid black');
    $nameError.show();
    $nameWarning.show();
  }
}

function emailEvent(){
  'use strict';
  if (isEmailValid()){
    $emailError.hide();
    $emailWarning.hide();
    $email.css('border','3px solid green');
  }
  else{
    $email.css('border','3px solid black');
    $emailError.show();
    $emailWarning.show();
  }
}

function messageEvent(){
  'use strict';
  if (isMessageValid()){
    $messageError.hide();
    $messageWarning.hide();
    $message.css('border','3px solid green');
  }
  else{
    $message.css('border','3px solid black');
    $messageError.show();
    $messageWarning.show();
  }
}

function addressEvent(){
  'use strict';
  if (isAddressValid()){
    $address.css('border','3px solid black');
  }
  else{
    $address.css('border','3px solid black');
  }
}


function enableSubmitEvent(){
  'use strict';
  $('#submit').prop('disabled', !canSubmit());
}

function submitColor(){
  'use strict';
  if (canSubmit()){
    $('#submit').css('background-color','rgba(0, 149, 233, 1)');
    $('#submit').css('color','white');
    $('#submit').css('border','1px solid white');
  }
  else{
    $('#submit').css('background-color','#CCCCCC');
    $('#submit').css('color','black');
  }
}

$name.focus(nameEvent).keyup(nameEvent).keyup(enableSubmitEvent).keyup(submitColor);
$email.focus(emailEvent).keyup(emailEvent).keyup(enableSubmitEvent).keyup(submitColor);
$message.focus(messageEvent).keyup(messageEvent).keyup(enableSubmitEvent).keyup(submitColor);
$address.focus(addressEvent).keyup(addressEvent).keyup(enableSubmitEvent).keyup(submitColor);

enableSubmitEvent();
submitColor();

$(function() {
  'use strict';
  // Get the form.
  var form = $('#ajax-contact');
  // Get the messages div.
  var formMessages = $('.form-messages');
  // Set up an event listener for the contact form.
  $(form).submit(function(e) {
    // Stop the browser from submitting the form.
    e.preventDefault();
    // Serialize the form data.
    var formData = $(form).serialize();
    // Submit the form using AJAX.
    $.ajax({
      type: 'POST',
      url: $(form).attr('action'),
      data: formData
    })
    .done(function(response) {
      // Make sure that the formMessages div has the 'success' class.
      $(formMessages).removeClass('error');
      $(formMessages).addClass('success');
      // Set the message text.
      $(formMessages).text(response);
      // Clear the form.
      $('#name').val('');
      $('#email').val('');
      $('#message').val('');
    })
    .fail(function(data) {
      // Make sure that the formMessages div has the 'error' class.
      $(formMessages).removeClass('success');
      $(formMessages).addClass('error');

      // Set the message text.
      if (data.responseText !== '') {
        $(formMessages).text(data.responseText);
      } else {
        $(formMessages).text('Oops! An error occured and your message could not be sent.');
      }
    });
  });
});
