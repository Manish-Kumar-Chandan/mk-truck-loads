function format(d) {
    var trs = '';
    $.each($(d.shipments), function (key, value) {
        trs += '<tr><td>' + value.Id + '</td><td>' + value.category + '</td><td>' + value.pickup + '</td><td>' + value.delivery + '</td><td>' + value.price + '</td><td>' + value.date + '</td><td><a href="shipment/'+ value.details +'"><i class="fa fa-eye"></i></a> </td></tr>';
    })
    // `d` is the original data object for the row
    return '<table class="table table-border table-hover">' +
        '<thead>' +
        '<th>Id</th>' +
        '<th>Categry</th>' +
        '<th>Pick up</th>' +
        '<th>Delivery</th>' +
        '<th>price</th>' +
        '<th>Date</th>' +
        '<th>Details</th>' +

        '</thead><tbody>' +

        trs +
        '</tbody></table>';
}

$(document).ready(function () {
    var table = $('#shippers').DataTable({
        "ajax": '/public/assets/js/shippers.json',
        "columns": [
            {
                "class": 'details-control',
                "orderable": false,
                "data": null,
                "defaultContent": ''
            },
            { "data": "name" },
            { "data": "email" },
            { "data": "address" },
            { "data": "phone" },
            { "data": "earning" },
            {"data": "action"}

        ]
    });

    // Add event listener for opening and closing details
    $('#shippers tbody').on('click', 'td.details-control', function () {
        var tr = $(this).closest('tr');
        var row = table.row(tr);

        if (row.child.isShown()) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        }
        else {
            // Open this row
            row.child(format(row.data())).show();
            tr.addClass('shown');
        }
    });
});