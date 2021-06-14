jQuery(() => {
    const mobileAlerts = $('#mobile-alert');
    const emailAlerts = $('#email-alert');

    $('#carrier-alert-form').on('submit', (e) => {
        e.preventDefault();
       
        let alerts = {
            userId: userId,
            mobile: mobileAlerts[0].checked,
            email: emailAlerts[0].checked
        }

        Controller.carrierAlert(alerts)
    })

})