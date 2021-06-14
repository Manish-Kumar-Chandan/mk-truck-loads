function format(d) {
    
    return `
      <div class="row">
          <div class="col-sm-6 text-left">
            <img src="/public/assets/images/gallery/work-7.jpg" height="250" class="w-100"> 
          </div>
          <div class="col-sm-6 text-left">
          <div class="media p-3">
          <img src="/public/assets/images/avatar.png" alt="Image" class="mr-3 mt-3 rounded-circle" style="width:30px;">
          <div class="media-body">
              <h4>Bryan </h4>
              <p>Nice Work by Web Developers</p>
          </div>
          </div>
          </div>
      </div>
    `;
}

$(document).ready(function () {
    var table = $('#feedback').DataTable({
        "ajax": '/public/assets/js/feedback.json',
        "columns": [
            {
                "class": 'details-control',
                "orderable": false,
                "data": null,
                "defaultContent": ''
            },
            { "data": "name" },
            { "data": "email" },
            { "data": "role" },
            { "data": "phone" },
            { "data": "ratings" }

        ]
    });

    // Add event listener for opening and closing details
    $('#feedback tbody').on('click', 'td.details-control', function () {
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