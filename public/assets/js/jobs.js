jQuery(() => {
    var quotes = []

$.ajax({
    type: 'GET',
    url: '/get-quotes',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    }

}).done((response) => {
    quotes = []
    quotes = response.data;
    console.log(quotes)
    if(role === 'Carrier') {
        getSelectedQuotes()
    } else if (role === 'Shipper') {
        embedCards(quotes);  
    }
    

}).fail((err) => {
    let response = (err.responseJSON)
    console.log(response)
})

function getSelectedQuotes() {
    if(quotes.length < 0) {
        alert('No Quotes')
    }

    $.ajax({
        type: 'POST',
        url: '/get-selected-quote',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {}
    
    }).done((response) => {
        console.log(response); 
        let selectedQuotes = response.data;
        

        if (selectedQuotes.length <= 0) {
            return embedCards(quotes)
        }

        let getPromise = new Promise((resolve, reject) => {
            for (let i=0 ; i< quotes.length; i++) {
                for (j =0 ; j< selectedQuotes.length ; j++) {
                    if (quotes[i]._id === selectedQuotes[j].quote)  {
                        quotes[i].added = true
                    }
                }
                if (i === quotes.length -1) {
                    resolve(true)
                }
            }
        })

        if(getPromise) {
            embedCards(quotes)
        }
        
        
    }).fail((err) => {
        let response = (err.responseJSON)
        console.log(response)
        alert(response.msg)
    })
    
}


var clickedQuoteId = '';

function embedCards(data) {
    for (let i=0 ; i< data.length; i++) {

        let card = `
        <div class="card ">
            <div class="card-header  ">
                <div class="row">
                    <div class="col-md-9">
                        <div class="row ">
                            <div class="col-md-6 mb-2 ">
                                <img src="${data[i].image}" class="h-12 w-100">
                            </div>
                            <div class="col-md-6 mb-2">
                                <h4 class="mt-0 header-title text-capitalize" >${data[i].title} <span class="small">(${data[i].type})</span>
                                </h4>
                                <div>
                                    <img class="mr-2" height="15" src="/public/assets/icons/placeholder.svg">
                                    ${data[i].pickup}
                                </div>
                                <div>
                                    <img class="mr-2" height="15" src="/public/assets/icons/placeholder-red.svg">
                                    ${data[i].deliver}
                                </div>
                            </div>

                        </div>
                    </div>
                    <div class="col-md-3 mb-2">
                        <span class="text-capitalize">${data[i].userId.firstName}</span><i
                            class="fa fa-user ml-2 mr-2 border border-primary rounded-circle p-1"></i><br>
                        <span class="small"><b class="">Date</b> ${data[i].createdAt.split('T')[0]}</span> <br>
                        <span class=""><b class="font-weight-bolder">$</b> ${data[i].budget}</span> <br>
                        ${data[i].added ? '<a type="button" class="btn btn-sm p-1 mt-3 btn-primary text-dark"> Applied</a> ' : `${role === 'Carrier' ?  `<a type="button" class="btn btn-sm p-1 mt-3 btn-primary text-dark bid-button" quote="${ data[i]._id}" data-toggle="modal" data-target="#myModal" > Bid </a> ` : ''  }`}    
                        <a type="button" class="btn btn-sm p-1 mt-3 btn-primary text-dark preview-button"
                            data-toggle="collapse" href="#collapse-${i}">Details</a>
                    </div>

                </div>
            </div>
            <div id="collapse-${i}" class="collapse" data-parent="#accordion">
                <div class="card-body">
                    <div class="row">
                        <div class="col-xl-6">
                            <h2 class="bg-light p-2">Job Details</h2>
                            <div class="row">
                                <div class="col-md-6">

                                    <div class="mt-2 mb-2">
                                        <div class="small text-capitalize">Name ${data[i].userId.firstName} ${data[i].userId.lastName}</div>
                                        <div class="small">Joined On ${data[i].userId.createdAt.split('T')[0]}</div>
                                    </div>

                                </div>
                                <div class="col-md-6 ">
                                    <div class="mt-2 mb-2">
                                        <div class="small">Id ${data[i]._id} </div>
                                        <div class="small">Listed On ${data[i].createdAt.split('T')[0]}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">

                                    <div class="mt-2 mb-2">
                                        <div class="small">
                                            <img class="mr-2" height="15" src="/public/assets/icons/placeholder.svg">
                                            ${data[i].pickup}
                                        </div>
                                        <div class="small">
                                            <img class="mr-2" height="15" src="/public/assets/icons/placeholder-red.svg">
                                            ${data[i].deliver}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12">
                                    <div class="mt-2 mb-2">
                                        <div class="small">Available ${data[i].availibility} </div>
                                        <div class="small">On Date ${data[i].date ?  data[i].date.split('T')[0] : '-'}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-6">
                            <div id="map${i}" class="map"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div> `

        
        $('#accordion').append(card);
        getMap(i, data[i].pickupLocations, data[i].deliverLocations)
    }

    
    if(role === 'Shipper') {
        $('.bid-button').hide()
    } 

    $('.bid-button').on('click', function(e) {
        e.preventDefault();
    
        clickedQuoteId = ($(this).attr('quote'))
    })
    
}

function getMap(i, pickup, deliver) {
    $(`#map${i}`).css('height', '300px');

            var directionsRenderer = new google.maps.DirectionsRenderer();
            var directionsService = new google.maps.DirectionsService();
            var map = new google.maps.Map(document.getElementById(`map${i}`), {
                zoom: 14
            });


            directionsRenderer.setMap(map);
            calculateAndDisplayRoute(directionsService, directionsRenderer);

            function calculateAndDisplayRoute(directionsService, directionsRenderer) {

                var selectedMode = 'DRIVING';
                directionsService.route(
                    {
                        origin: {
                            lat: pickup.lat,
                            lng: pickup.lng
                        },
                        // Haight.
                        destination: {
                            lat: deliver.lat,
                            lng: deliver.lng
                        },

                        travelMode: google.maps.TravelMode[selectedMode]
                    },

                    function (response, status) {
                        if (status == "OK") {
                            directionsRenderer.setDirections(response);
                        } else {
                            window.alert("Directions request failed due to " + status);
                        }
                    }
                );
            }
}

$('#time').attr('min', new Date().toISOString().split('T')[0])

$('#bid-form').on('submit', (e) => {
    e.preventDefault();

    let bid = $('#bid');
    let time = $('#time');
    let proposal = $('#proposal');
    let quote = clickedQuoteId;

    if (bid < 0 || bid === '' || !time || !proposal) {
        alert('Please fill Out Details First')
    }

    $('#myModal').modal('hide')

    let data = {
        bid: bid.val(),
        time: time.val(),
        proposal: proposal.val(),
        quote: quote
    }

    $.ajax({
        type: 'POST',
        url: '/do-bid',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        data: data

    }).done((response) => {
        quotes = [];
        window.location.href= "/jobs"
    
    }).fail((err) => {
        let response = (err.responseJSON)
        console.log(response)
        alert(response.msg)
    })

})



})