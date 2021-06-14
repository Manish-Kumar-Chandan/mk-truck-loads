var dataSet = [
    [ "Peterbilt Co", "Cars" , "Sydney", "Melbourne" ,  "2011/04/25", "$320,800", " <i class='p-1 border rounded-circle bg-primary text-dark fa fa-check'></i> "],
    [ "Peterbilt Co", "Cars" , "Sydney", "Melbourne" ,  "2011/04/25", "$320,800", " <i class='p-1 border rounded-circle bg-primary text-dark fa fa-check'></i> "],
    [ "Peterbilt Co", "Cars" , "Sydney", "Melbourne" ,  "2011/04/25", "$320,800", " <i class='p-1 border rounded-circle bg-primary text-dark fa fa-times'></i>  "],
    [ "Peterbilt Co", "Cars" , "Sydney", "Melbourne" ,  "2011/04/25", "$320,800", " <i class='p-1 border rounded-circle bg-primary text-dark fa fa-check'></i> "],
    [ "Peterbilt Co", "Cars" , "Sydney", "Melbourne" ,  "2011/04/25", "$320,800", " <i class='p-1 border rounded-circle bg-primary text-dark fa fa-times'></i>  "],


];

$(document).ready(function () {
    $('#passbook').DataTable({
        data: dataSet,
        
        columns: [
            { title: "Company" },
            { title: "shipment" },
            { title: "pickup" },
            { title: "Delivery" },
            {title :'Date'},
            {title: 'price' },
            {title :'status'}
        ]
    });
});