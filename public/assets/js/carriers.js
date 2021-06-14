function format(d) {
    var trs = '';
    trs += `
        <div class="row">
            <div class="col-md-8">
                <div class="row">
                    
                    <div class="col-6">
                    <div class="card mb-2 shadow">
                        <div class="card-body">
                        <h5>Trailers</h5>
                        <div class="clearfix mb-2">
                            <span class="float-left">Drop Deck</span>
                            <span class="float-right">
                                <span class="text-dark bg-primary rounded-circle p-1 pl-1-5 pr-1-5">${d.trailers['drop Deck']}</span>
                            </span>
                        </div>
                        <div class="clearfix mb-2">
                            <span class="float-left">Flat Top</span>
                            <span class="float-right">
                                <span class="text-dark bg-primary rounded-circle p-1 pl-1-5 pr-1-5">${d.trailers['flat Top']}</span>
                            </span>
                        </div>
                        <div class="clearfix mb-2">
                            <span class="float-left">Curtain Sider</span>
                            <span class="float-right">
                                <span class="text-dark bg-primary rounded-circle p-1 pl-1-5 pr-1-5">${d.trailers['curtain Sider']}
                                </span>
                            </span>
                        </div>
                        <div class="clearfix mb-2">
                            <span class="float-left">Deck Widner</span>
                            <span class="float-right">
                                <span class="text-dark bg-primary rounded-circle p-1 pl-1-5 pr-1-5">${d.trailers['deck Widner']}
                                </span>
                            </span>
                        </div>
                        <div class="clearfix mb-2">
                            <span class="float-left">Low Loader</span>
                            <span class="float-right">
                                <span class="text-dark bg-primary rounded-circle p-1 pl-1-5 pr-1-5">${d.trailers['low Loader']}</span>
                            </span>
                        </div>
                        <div class="clearfix mb-2">
                            <span class="float-left">Car Carrier</span>
                            <span class="float-right"><span class="text-dark bg-primary rounded-circle p-1 pl-1-5 pr-1-5">${d.trailers['car Carrier']}</span>
                            </span>
                        </div>
                        <div class="clearfix mb-2">
                            <span class="float-left">Dolly</span>
                            <span class="float-right"><span class="text-dark bg-primary rounded-circle p-1 pl-1-5 pr-1-5">${d.trailers['dolly']}</span>
                            </span>
                        </div>
                        <div class="clearfix mb-2">
                            <span class="float-left">Refrigerated</span>
                            <span class="float-right"><span class="text-dark bg-primary rounded-circle p-1 pl-1-5 pr-1-5">${d.trailers['refrigerated']}</span>
                            </span>
                        </div>
                        <div class="clearfix mb-2">
                            <span class="float-left">Side Loader</span>
                            <span class="float-right"><span class="text-dark bg-primary rounded-circle p-1 pl-1-5 pr-1-5">${d.trailers['side Loader']}</span>
                            </span>
                        </div>
                        <div class="clearfix mb-2">
                            <span class="float-left">Skel</span>
                            <span class="float-right"><span class="text-dark bg-primary rounded-circle p-1 pl-1-5 pr-1-5">${d.trailers['skel']}</span>
                            </span>
                        </div>
                        <div class="clearfix mb-2">
                            <span class="float-left">Mega Tilt</span>
                            <span class="float-right"><span class="text-dark bg-primary rounded-circle p-1 pl-1-5 pr-1-5">${d.trailers['mega Tilt']}</span>
                            </span>
                        </div>
                        <div class="clearfix mb-2">
                            <span class="float-left">Platform</span>
                            <span class="float-right"><span class="text-dark bg-primary rounded-circle p-1 pl-1-5 pr-1-5">${d.trailers['platform']}</span>
                            </span>
                        </div>
                        <div class="clearfix mb-2">
                            <span class="float-left">Walking Floor</span>
                            <span class="float-right"><span class="text-dark bg-primary rounded-circle p-1 pl-1-5 pr-1-5">${d.trailers['walking Floor']}</span>
                            </span>
                        </div>
                        <div class="clearfix mb-2">
                            <span class="float-left">Live Stock</span>
                            <span class="float-right"><span class="text-dark bg-primary rounded-circle p-1 pl-1-5 pr-1-5">${d.trailers['live Stock']}</span>
                            </span>
                        </div>
                        <div class="clearfix mb-2">
                            <span class="float-left">Grain Trailer</span>
                            <span class="float-right"><span class="text-dark bg-primary rounded-circle p-1 pl-1-5 pr-1-5">${d.trailers['grain Trailer']}</span>
                            </span>
                        </div>
                        <div class="clearfix mb-2">
                            <span class="float-left">Tipper</span>
                            <span class="float-right"><span class="text-dark bg-primary rounded-circle p-1 pl-1-5 pr-1-5">${d.trailers['tipper']}</span>
                            </span>
                        </div>
                        <div class="clearfix mb-2">
                            <span class="float-left">Extendable</span>
                            <span class="float-right"><span class="text-dark bg-primary rounded-circle p-1 pl-1-5 pr-1-5">${d.trailers['extendable']}</span>
                            </span>
                        </div>
                        <div class="clearfix mb-2">
                            <span class="float-left">Side Tipper</span>
                            <span class="float-right"><span class="text-dark bg-primary rounded-circle p-1 pl-1-5 pr-1-5">${d.trailers['side Tipper']}</span>
                            </span>
                        </div>
                        <div class="clearfix mb-2">
                            <span class="float-left">Tanker</span>
                            <span class="float-right"><span class="text-dark bg-primary rounded-circle p-1 pl-1-5 pr-1-5">${d.trailers['tanker']}</span>
                            </span>
                        </div>
                        <div class="clearfix mb-2">
                            <span class="float-left">Dog Trailer</span>
                            <span class="float-right"><span class="text-dark bg-primary rounded-circle p-1 pl-1-5 pr-1-5">${d.trailers['dog Trailer']}</span>
                            </span>
                        </div>
                        <div class="clearfix mb-2">
                            <span class="float-left">Horse Float</span>
                            <span class="float-right"><span class="text-dark bg-primary rounded-circle p-1 pl-1-5 pr-1-5">${d.trailers['horse Float']}</span>
                            </span>
                        </div>
                        <div class="clearfix mb-2">
                            <span class="float-left">Logging</span>
                            <span class="float-right"><span class="text-dark bg-primary rounded-circle p-1 pl-1-5 pr-1-5">${d.trailers['logging']}</span>
                            </span>
                        </div>
                        <div class="clearfix mb-2">
                            <span class="float-left">Pole Jinker</span>
                            <span class="float-right"><span class="text-dark bg-primary rounded-circle p-1 pl-1-5 pr-1-5">${d.trailers['pole Jinker']}</span>
                            </span>
                        </div>
                        <div class="clearfix mb-2">
                            <span class="float-left">Pig Trailer</span>
                            <span class="float-right"><span class="text-dark bg-primary rounded-circle p-1 pl-1-5 pr-1-5">${d.trailers['flat Top']}</span>
                            </span>
                        </div>
                        </div>
                        </div>
                    </div>
                   
                    <div class="col-6">
                    <div class="card mb-2 shadow">
                        <div class="card-body">
                        <h5>Trucks</h5>
                        <div class="clearfix mb-2">
                            <span class="float-left">Prime Mover</span>
                            <span class="float-right"><span class="text-dark bg-primary rounded-circle p-1 pl-1-5 pr-1-5">${d.trucks['prime mover']}</span>
                            </span>
                        </div>
                        <div class="clearfix mb-2">
                            <span class="float-left">Crane Truck</span>
                            <span class="float-right"><span class="text-dark bg-primary rounded-circle p-1 pl-1-5 pr-1-5">${d.trucks['crane']}</span>
                            </span>
                        </div>
                        <div class="clearfix mb-2">
                            <span class="float-left">Titt Tray</span>
                            <span class="float-right"><span class="text-dark bg-primary rounded-circle p-1 pl-1-5 pr-1-5">${d.trucks['tilt Tray']}</span>
                            </span>
                        </div>
                        <div class="clearfix mb-2">
                            <span class="float-left">Rigid Beavrtail</span>
                            <span class="float-right"><span class="text-dark bg-primary rounded-circle p-1 pl-1-5 pr-1-5">${d.trucks['rigid Beavrtail']}</span>
                            </span>
                        </div>
                        <div class="clearfix mb-2">
                            <span class="float-left">Rigid Flat Top</span>
                            <span class="float-right"><span class="text-dark bg-primary rounded-circle p-1 pl-1-5 pr-1-5">${d.trucks['rigid Flat Top']}</span>
                            </span>
                        </div>
                        <div class="clearfix mb-2">
                            <span class="float-left">Rigid Pantech</span>
                            <span class="float-right"><span class="text-dark bg-primary rounded-circle p-1 pl-1-5 pr-1-5">${d.trucks['rigid Pantech']}</span>
                            </span>
                        </div>
                        <div class="clearfix mb-2">
                            <span class="float-left">Rigid With Tailgator</span>
                            <span class="float-right"><span class="text-dark bg-primary rounded-circle p-1 pl-1-5 pr-1-5">${d.trucks['rigid With Tailgator']}</span>
                            </span>
                        </div>
                        <div class="clearfix mb-2">
                            <span class="float-left">Retrevier Tow Truck</span>
                            <span class="float-right"><span class="text-dark bg-primary rounded-circle p-1 pl-1-5 pr-1-5">${d.trucks['retrevier Tow Truck']}</span>
                            </span>
                        </div>
     
                        </div>
                    </div>
                    
                    <div class="card mb-2 shadow">
                        <div class="card-body">
                        <h5>Configrations</h5>
                        <div class="clearfix mb-2">
                            <span class="float-left">B-Double</span>
                            <span class="float-right"><span class="text-dark bg-primary rounded-circle p-1 pl-1-5 pr-1-5">${d.configrations['b-double']}</span>
                            </span>
                        </div>
                        <div class="clearfix mb-2">
                            <span class="float-left">Road Train</span>
                            <span class="float-right"><span class="text-dark bg-primary rounded-circle p-1 pl-1-5 pr-1-5">${d.configrations['road train']}</span>
                            </span>
                        </div>
    
                        </div>
                    </div>
                    
                    <div class="card mb-2 shadow">
                        <div class="card-body">
                        <h5>Other</h5>
                        <div class="clearfix mb-2">
                            <span class="float-left">Pilot</span>
                            <span class="float-right"><span class="text-dark bg-primary rounded-circle p-1 pl-1-5 pr-1-5">${d.other['pilot']}</span>
                            </span>
                        </div>
                        <div class="clearfix mb-2">
                            <span class="float-left">Hotshot</span>
                            <span class="float-right"><span class="text-dark bg-primary rounded-circle p-1 pl-1-5 pr-1-5">${d.other['hotshot']}</span>
                            </span>
                        </div>
                        <div class="clearfix mb-2">
                            <span class="float-left">UTE</span>
                            <span class="float-right"><span class="text-dark bg-primary rounded-circle p-1 pl-1-5 pr-1-5">${d.other['UTE']}</span>
                            </span>
                        </div>
                        <div class="clearfix mb-2">
                            <span class="float-left">Depot Facilities</span>
                            <span class="float-right"><span class="text-dark bg-primary rounded-circle p-1 pl-1-5 pr-1-5">${d.other['depot Facilities']}</span>
                            </span>
                        </div>
                        <div class="clearfix mb-2">
                            <span class="float-left">Bobtail Operator</span>
                            <span class="float-right"><span class="text-dark bg-primary rounded-circle p-1 pl-1-5 pr-1-5">${d.other['bobtail Operator']}</span>
                            </span>
                        </div>
                        <div class="clearfix mb-2">
                            <span class="float-left">Drive Hire</span>
                            <span class="float-right"><span class="text-dark bg-primary rounded-circle p-1 pl-1-5 pr-1-5">${d.other['drive Hire']}</span>
                            </span>
                        </div>
                        <div class="clearfix mb-2">
                            <span class="float-left">Trade Plates</span>
                            <span class="float-right"><span class="text-dark bg-primary rounded-circle p-1 pl-1-5 pr-1-5">${d.other['trade Plates']}</span>
                            </span>
                        </div>
                        </div>
                    </div>
                        

                    </div>


                </div>
            </div>
            <div class="col-md-4">
                <div class="card mb-2 shadow">
                    <div class="card-body">
                        <h5>Details</h5>
                        <div class="clearfix mb-2">
                            <span class="float-left">Total Jobs Done</span>
                            <span class="float-right">${d.jobs}
                            </span>
                        </div>

                        <div class="clearfix mb-2">
                        <span class="float-left">Joined  on Date</span>
                        <span class="float-right">${d['joined date']}
                        </span>
                        </div>
                        <div class="clearfix mb-2">
                        <span class="float-left">Subscription Pack</span>
                        <span class="float-right">${d['subscription']}
                        </span>
                    </div>   
                </div>      
        </div>


            </div>

        </div> 
    `

    return trs
}

$(document).ready(function () {
    var table = $('#carrier').DataTable({
        "ajax": '/public/assets/js/carriers.json',

        "columns": [
            {
                "class": 'details-control',
                "orderable": false,
                "data": null,
                "defaultContent": ''
            },
            { "data": "name" },
            { "data": "email" },
            { "data": "company" },
            { "data": "address" },
            { "data": "phone" },
            { "data": "action" }
        ]
    });

    // Add event listener for opening and closing details
    $('#carrier tbody').on('click', 'td.details-control', function () {
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