$(document).ready(function () {

  //Button Click jQuery 
  $('#registerButton').click(submitForm);
  $('#cancelButton').click(clearForm);
  $('input').change(textChanged)

  function textChanged() {
    $(this).css("border", "1px solid #ced4da");
  }

  function submitForm() {
    let myForm = {};
    if (validateForm() == false) {
      alert('Please fill required values');
      return;
    }

    myForm.firstName = $('#firstName').val();
    myForm.lastName = $('#lastName').val();
    myForm.fullName = myForm.firstName + " " + myForm.lastName;
    myForm.email = $('#email').val();
    myForm.address = $('#address').val();
    myForm.address2 = $('#address2').val();
    myForm.password = $('#password').val();
    myForm.city = $('#city').val();
    myForm.state = $('#state').val();
    myForm.zip = $('#zip').val();
    myForm.checkout = $('#checkout').prop("checked");

    //JS object to JSON 
    let myformJSON = JSON.stringify(myForm);

    console.log('JSON created ', myformJSON);

    $('#result').html(myformJSON);
  }

  function validateForm() {
    let retValue = true;

    if ($('#firstName').val() == "") {
      $('#firstName').css("border", "1px solid red");
      retValue = false;
    }
    if ($('#lastName').val() == "") {
      $('#lastName').css("border", "1px solid red");
      retValue = false;
    }
    if ($('#email').val() == "") {
      $('#email').css("border", "1px solid red");
      retValue = false;
    }
    if ($('#password').val() == "") {
      $('#password').css("border", "1px solid red");
      retValue = false;
    }
    return retValue;
  }

  function clearForm() {
    $('#firstName').val("");
    $('#lastName').val("");
    $('#email').val("");
    $('#address').val("");
    $('#address2').val("");
    $('#password').val("");
    $('#city').val("");
    $('#state').val("Choose...");
    $('#zip').val("");
    $('#checkout').val("");

    $('#result').html("");
  }


  function readSharePoint(restAPIUrl) {
    return $.ajax(
      {
        url: restAPIUrl,
        method: "GET",
        headers: { "Accept": "application/json; odata=nometadata" }
      }
    );
  }

});



