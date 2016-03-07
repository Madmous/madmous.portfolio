//Problem: Hints are shown even when form is valid
//Solution: Hide and show them at appropriate times
var $password = $('#password');
var $confirmPassword = $('#confirm_password');
var $username = $('#username');

//Hide hints
$('form span').hide();

function isUsernamePresent() {
  'use strict';
  return $username.val().length > 0;
}

function isPasswordValid(){
  'use strict';
  return $password.val().length > 8;
}

function arePasswordsMatching(){
  'use strict';
  return $password.val() === $confirmPassword.val();
}

function canSubmit(){
  'use strict';
  return isPasswordValid() && arePasswordsMatching() && isUsernamePresent();
}

function passwordEvent(){
  'use strict';
  //Find out if password is valid  
    //Hide hint if valid
    //else show hint
  if (isPasswordValid()){
    $password.next().hide();
  }
  else{
    $password.next().show();
  }
}

function confirmPasswordEvent(){
  'use strict';
  if (arePasswordsMatching()){
  //Find out if password and confirmation match
    //Hide hint if match
    //else show hint 

    $confirmPassword.next().hide();
  }
  else{
    $confirmPassword.next().show();
  }
}

function enableSubmitEvent(){
  'use strict';
  $('#submit').prop('disabled', !canSubmit());
}

//When event happens on password input
$password.focus(passwordEvent).keyup(passwordEvent).keyup(confirmPasswordEvent).keyup(enableSubmitEvent);


//When event happens on confirmation input
$confirmPassword.focus(confirmPasswordEvent).keyup(confirmPasswordEvent).keyup(enableSubmitEvent);


enableSubmitEvent();