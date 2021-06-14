jQuery(() => {
        const address = $('#address');
        const business = $('#business_name');
        const username = $('#username');
        const firstName = $('#first_name');
        const lastName = $('#last_name');
        const email = $('#email');
        const password = $('#password');
        const cPassword = $('#cpassword');
        const phone = $('#phone');
        const type = $('#type');
        const role = 'Carrier';

        $('#carrier-profile-form').on('submit', (e) => {
            e.preventDefault();
            
            if(password.val() !== cPassword.val()) {
                return alert('Password Not Matched!')
            }

            profile = {
                username: username.val(),
                address : address.val(),
                business : business.val(),
                firstName : firstName.val(),
                lastName : lastName.val(),
                email : email.val(),
                password : password.val(),
                phone : phone.val(), 
                type: type.val(),
                role: role
            }

            $('.signup-button').attr('disabled', true);
            $('.signup-button').text('Loading ...');

            Controller.carrierSignup(profile)
        })

})