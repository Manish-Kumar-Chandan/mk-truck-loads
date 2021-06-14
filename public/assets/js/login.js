console.log(Controller)

$('#login-form').on('submit', (e) => {
    e.preventDefault();

    const email = $('#email');
    const password = $('#password');
    const role = $('#role');
    const remember = $('#remember')

    $('.login-button').attr('disabled', true);
    $('.login-button').text('loading...');

    const loginFormData = {
        "email": email.val(),
        "password": password.val(),
        "role": role.val(),
        "remember": remember.prop('checked')
    }

    $.ajax({
        url: '/login',
        method: 'POST',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        data: loginFormData
    }).done((response) => {
        if (response.step && response.user) {
            if (response.step === 1) {
                window.location.href = `/register-carrier/fleet/${response.user}`
            } else if (response.step === 2) {
                window.location.href = `/register-carrier/alerts/${response.user}`
            } else if (response.step === 3) {
                window.location.href = `/register-carrier/subscribe/${response.user}`
            }
        } else {
            window.location.href =  '/home'                
        }
    }).fail((err) => {
        $('.login-button').attr('disabled', false);
        $('.login-button').text('Log In');

        let response = (err.responseJSON)
        Controller.errorMessages(response.error)
    
    })
})