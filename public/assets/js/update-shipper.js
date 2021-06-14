jQuery(() => {

$("#update-shipper-form").on('submit',function (e) {
    e.preventDefault();


    const firtsName = $('#first_name');
    const lastName = $('#last_name');
    const email = $('#email');
    const phone = $('#phone');
    const address = $('#address');
    const type = $('#type');


    $('.signup-button').text('Loading...');
    $('.signup-button').attr('disabled', true);

    const signupFormData =  {
        "firstName": firtsName.val(),
        "lastName": lastName.val(),
        "email": email.val(),
        "phone": phone.val(),
        "type": type.val(),
        "address": address.val(),
        "role": "Shipper"
    }

    
    Controller.updateShipper(signupFormData)
})

})
