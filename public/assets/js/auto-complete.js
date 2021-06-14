var availableTags = [];
    


$(function () {    

    $.ajax({
        url: '/get-cities',
        method: 'GET',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
    }).done((response) => {
        availableTags = response.cities;  


        $("#pickup-auto-complete").autocomplete({
            minLength:2,
            source: availableTags
        });
    
        $("#delivery-auto-complete").autocomplete({
            minLength:2,
            source: availableTags
        });
    }).fail((err) => {
        let response = (err.responseJSON)
        console.log(response)
        
    })
    

   


});
