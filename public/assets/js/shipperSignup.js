$("#signup-form").on('submit',function (e) {
    e.preventDefault();

    const username = $('#username');
    const firtsName = $('#first_name');
    const lastName = $('#last_name');
    const email = $('#email');
    const password = $('#password');
    const cPassword = $('#cpassword');
    const phone = $('#phone');
    const address = $('#address');
    const type = $('#type');

    if(phone.val().match(/^[1-9]+[0-9]*$/) === null) {
        return alert('Invalid Phone!')
    }

    if (password.val() !== cPassword.val()) {
        return alert('Password Not Matched')
    }

    $('.signup-button').text('Loading...');
    $('.signup-button').attr('disabled', true);

    const signupFormData =  {
        "username": username.val(),
        "firstName": firtsName.val(),
        "lastName": lastName.val(),
        "email": email.val(),
        "password": password.val(),
        "phone": phone.val(),
        "type": type.val(),
        "address": address.val(),
        "role": "Shipper"
    }


    Controller.shipperSignup(signupFormData);
})