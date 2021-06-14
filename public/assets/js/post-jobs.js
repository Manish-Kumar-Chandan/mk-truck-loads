var dataSet = [
];

$(document).ready(function () {

    let url = '';

    if (role === 'Shipper') {
        url = '/get-shipper-posts'
    } else  if (role === 'Carrier'){
        url = '/get-carrier-jobs'
    }

    
    $.ajax({
        url: url,
        method: 'POST',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {userId: userId}
    }).done((response) => { 
        if(role === 'Shipper') {
            dataSet = response.data;
        } else if (role === 'Carrier') {

            console.log(response)

            dataSet = response.data
        }


            $('#team').DataTable({
                data: dataSet,
                columns: [
                    { title: "Category" },
                    { title: "Pickup" },
                    { title: "Delivery" },
                    { title: 'Status' },
                    { title: 'Details'}
                ]
            });

    }).fail((err) => {
        console.log(err)
    })

    
});