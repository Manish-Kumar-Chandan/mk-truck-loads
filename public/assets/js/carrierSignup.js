$("#signup-form").on('submit',function (e) {
    e.preventDefault();

    const firtsName = $('#first_name');
    const lastName = $('#last_name');
    const email = $('#email');
    const password = $('#password');
    const confirmPassword = $('#confirm_password');
    const phone = $('#phone');
    const address = $('#address');
    const type = $('#type');

    if(password.val() !== confirmPassword.val()) {
       return  alert('Password not Matched!');
    }

    if(phone.val().match(/^[1-9]+[0-9]*$/) === null) {
        return alert('Invalid Phone!')
    }

    $('.signup-button').text('Loading...');
    $('.signup-button').attr('disabled', true);

    const signupFormData =  {
        "firstName": firtsName.val(),
        "lastName": lastName.val(),
        "email": email.val(),
        "password": password.val(),
        "phone": phone.val(),
        "type": type.val(),
        "address": address.val(),
        "role": "Shipper"
    }

})