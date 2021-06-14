jQuery(() => {
    var stripe = Stripe('pk_test_C3rKbGzGRLmv1IvUb9fLt1mz00TPgDolJM');
    var elements = stripe.elements();

    var style = {
        base: {
            color: "#32325d",
        }
    };

    let plan = '';
    let expiration = '';

    var card = elements.create("card", { style: style });
    card.mount("#card-element");

    function addDays(date, days) {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    $('.plans').on('change', function()  {
        plan = $(this).val();

        if (plan === 'FREE') {
            expiration = (addDays(new Date, 7));
        } else if (plan === '79') {
            expiration = (addDays(new Date, 30));
            $('.stripe-container').show();

        } else if (plan === '250') {
            expiration = (addDays(new Date, 90));
            $('.stripe-container').show();

        } else if (plan === '500') {
            expiration = (addDays(new Date, 180));
            $('.stripe-container').show();

        } else if (plan === '750') {
            expiration = (addDays(new Date, 365));
            $('.stripe-container').show();

        }

    })


    $('#card-element').on('change', function (event) {
        var displayError = document.getElementById('card-errors');
        if (event.error) {
            displayError.textContent = event.error.message;
        } else {
            displayError.textContent = '';
        }
    });


    var form = document.getElementById('payment-form');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        if(plan === '') {
            return alert('Please Choose a Plan')
        } else if (plan === ' Free') {
            return alert('Please Select a Valid Plan')
        }
        
        stripe.createToken(card).then(function (result) {
            if (result.error) {
                // Inform the customer that there was an error.
                var errorElement = document.getElementById('card-errors');
                errorElement.textContent = result.error.message;
            } else {
                // Send the token to your server.
                stripeTokenHandler(result.token);
            }
        });

    });

    const stripeTokenHandler = (token) => {

        const data = {
            token: token ? token.id : '',
            plan: plan,
            expiration: expiration
        }

        console.log(data)

        $.ajax({
            url: '/update-carrier-subscription',
            method: 'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data: data
        }).done((response) => {
            console.log(response)
            alert('Subscription Updated Successfully!');
            window.location.href = '/profile'
        }).fail((err) => {
            console.log(err)
            

            let response = (err.responseJSON)
            errorsMessages(response.error)

        })
    }
})