var dataSet = [
    ["Tiger", "tiger@gmail.com", "Transport Incharge", "$320,800", "<a><i class='fas fa-marker'  data-toggle='modal' data-target='#team-Modal'></i><i class='ml-2 fa fa-trash'></i></a>"],
    ["Nixon","nixon@gmailcom", "Transport Incharge", "$320,800", "<a><i class='fas fa-marker'  data-toggle='modal' data-target='#team-Modal'></i><i class='ml-2 fa fa-trash'></i></a>"],
    ["Lion","lion@gmail.com", "Shipper Incharge", "$32,800", "<a><i class='fas fa-marker'  data-toggle='modal' data-target='#team-Modal'></i><i class='ml-2 fa fa-trash'></i></a>"],
    ["Danny","Danny@gmail.com", "Transport Incharge", "$320,800", "<a><i class='fas fa-marker'  data-toggle='modal' data-target='#team-Modal'></i><i class='ml-2 fa fa-trash'></i></a>"],
    ["Sharpy","sharpy@gmail.com", "shipper Incharge", "$1320,800", "<a><i class='fas fa-marker'  data-toggle='modal' data-target='#team-Modal'></i><i class='ml-2 fa fa-trash'></i></a>"],
    ["Addy","addy@gmail.com", "Transport Incharge", "$320,800", "<a><i class='fas fa-marker'  data-toggle='modal' data-target='#team-Modal'></i><i class='ml-2 fa fa-trash'></i></a>"],
    ["Rex","rex@gmail.com", "Transport Incharge", "$920,800", "<a><i class='fas fa-marker'  data-toggle='modal' data-target='#team-Modal'></i><i class='ml-2 fa fa-trash'></i></a>"],
    ["Rommy","rommy@gmail.com", "shipper Incharge", "$20,800", "<a><i class='fas fa-marker'  data-toggle='modal' data-target='#team-Modal'></i><i class='ml-2 fa fa-trash'></i></a>"],
    ["Shergill","shergill@gmail.com", "Transport Incharge", "$320,800", "<a><i class='fas fa-marker'  data-toggle='modal' data-target='#team-Modal'></i><i class='ml-2 fa fa-trash'></i></a>"],
    ["Typoon","typoon@gmail.com", "Transport Incharge", "$820,800", "<a><i class='fas fa-marker'  data-toggle='modal' data-target='#team-Modal'></i><i class='ml-2 fa fa-trash'></i></a>"],
    ["Tiger", "tiger@gmail.com", "Transport Incharge", "$320,800", "<a><i class='fas fa-marker'  data-toggle='modal' data-target='#team-Modal'></i><i class='ml-2 fa fa-trash'></i></a>"],
    ["Nixon","nixon@gmailcom", "Transport Incharge", "$320,800", "<a><i class='fas fa-marker'  data-toggle='modal' data-target='#team-Modal'></i><i class='ml-2 fa fa-trash'></i></a>"],
    ["Lion","lion@gmail.com", "Shipper Incharge", "$32,800", "<a><i class='fas fa-marker'  data-toggle='modal' data-target='#team-Modal'></i><i class='ml-2 fa fa-trash'></i></a>"],
    ["Danny","Danny@gmail.com", "Transport Incharge", "$320,800", "<a><i class='fas fa-marker'  data-toggle='modal' data-target='#team-Modal'></i><i class='ml-2 fa fa-trash'></i></a>"],
    ["Sharpy","sharpy@gmail.com", "shipper Incharge", "$1320,800", "<a><i class='fas fa-marker'  data-toggle='modal' data-target='#team-Modal'></i><i class='ml-2 fa fa-trash'></i></a>"],
    ["Addy","addy@gmail.com", "Transport Incharge", "$320,800", "<a><i class='fas fa-marker'  data-toggle='modal' data-target='#team-Modal'></i><i class='ml-2 fa fa-trash'></i></a>"],
    ["Rex","rex@gmail.com", "Transport Incharge", "$920,800", "<a><i class='fas fa-marker'  data-toggle='modal' data-target='#team-Modal'></i><i class='ml-2 fa fa-trash'></i></a>"],
    ["Rommy","rommy@gmail.com", "shipper Incharge", "$20,800", "<a><i class='fas fa-marker'  data-toggle='modal' data-target='#team-Modal'></i><i class='ml-2 fa fa-trash'></i></a>"],
    ["Shergill","shergill@gmail.com", "Transport Incharge", "$320,800", "<a><i class='fas fa-marker'  data-toggle='modal' data-target='#team-Modal'></i><i class='ml-2 fa fa-trash'></i></a>"],
    ["Typoon","typoon@gmail.com", "Transport Incharge", "$820,800", "<a><i class='fas fa-marker'  data-toggle='modal' data-target='#team-Modal'></i><i class='ml-2 fa fa-trash'></i></a>"],

];

$(document).ready(function () {
    $('#team').DataTable({
        data: dataSet,
        
        columns: [
            { title: "Name" },
            {title: "Email"},
            { title: "Role" },
            { title: "Salary" },
            {title: 'Action' }
        ]
    });
});