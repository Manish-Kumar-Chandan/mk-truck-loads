jQuery(() => {
    const address = $('#address');
        const business = $('#business_name');
        const firstName = $('#first_name');
        const lastName = $('#last_name');
        const email = $('#email');
        const phone = $('#phone');
        const type = $('#type');

        $('#carrier-profile-form').on('submit', (e) => {
            e.preventDefault();
            
            profile = {
                address : address.val(),
                business : business.val(),
                firstName : firstName.val(),
                lastName : lastName.val(),
                email : email.val(),
                phone : phone.val(), 
                type: type.val(),
            }

            $('.signup-button').attr('disabled', true);
            $('.signup-button').text('Loading ...');

            Controller.updateCarrierProfile(profile);
        })
 
        
})