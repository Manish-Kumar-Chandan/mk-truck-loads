

$('#availibility').on('change',(e)=>{
    value = (e.target.value);
    if (value === 'AVAILABLE FROM') {
        $('.date').css('display','block');
        $('#date').attr('required', true);
    } else {
        $('.date').css('display','none');
        $('#date').attr('required', false);
    }
});


$('#date').on('change', ()=>{
    var dateValue = $('#date').val();
    var ToDate = new Date();

    if (new Date(dateValue).getTime() < ToDate.getTime()) {
          alert("The Date must be Bigger or Equal to today date");
          return false;
     }

    return true;
})


$('#file').on('change', (e) => {
    if (e.target.files && e.target.files[0]) {
        const reader = new FileReader();
        
        reader.onload = function (e) {
            $('#preview').attr('src', e.target.result);
        }
        
        $('.preview-container').css('display','block');
        reader.readAsDataURL(e.target.files[0]);
    }
})


$('#pallets').on('change', (e) => {
    const value = e.target.value;

    if( value  === '3') {
        
        $('.pallets-size-container').css('display','none');
    } else {
        $('.pallets-size-container').css('display','block');

    }
})


$('#trucks').on('change', (e) => {
    const value = e.target.value;
    if(value === '1') {
        $('.moterhome').css('display','block');
        $('.trailers').css('display','none');

    } else {
        $('.moterhome').css('display','none');
        $('.trailers').css('display','block');

    }
})



$('#machine').on('change', (e) => {
    const value = e.target.value;

    if(value === '3') {
        $('.construction').css('display','block');
        $('.machine').css('display','none');
    } else {
        $('.construction').css('display','none');
        $('.machine').css('display','block');

    }
})


$('#quote-form').on('submit', async (e) => {
    e.preventDefault();
    // console.log(e)
    $('.submit').attr('disabled', true);
    $('.submit')[0].innerHTML = 'Loading..';
    
    const title = $('#title').val();
    const collection = $('.collection').val();
    const deliver = $('.deliver').val();
    const availibility = $('#availibility').val();
    const description = $('#description').val();
    const budget = $('#budget').val();

    if(collection === deliver) {
        $('.submit').attr('disabled', false);
        $('.submit')[0].innerHTML = 'Get a Quote';
        return alert('Please Enter Different Collection and Deliver Suburbs');
    }

    var file = $('#file')[0].files[0];

    var formData = new FormData();
    formData.append('myfile', file);
    formData.append('pickup', collection)
    formData.append('title', title)
    formData.append('deliver', deliver);
    formData.append('availibility', availibility);
    formData.append('description', description);
    formData.append('budget', budget);
    formData.append('type',page);

    if (availibility === 'AVAILABLE FROM') {
        const date =  $('#date').val();
        formData.append('date', date)
    }

    const values =  await car();

    Object.keys(values).forEach((key) => {
        formData.append(key, values[key])
    })


    $.ajax({
        type: 'POST',
        url: '/get-a-quote',
        data: formData,
        processData: false,
        contentType: false,
        
     }).done((response) => {
        $('.submit')[0].innerHTML = 'Get a Quote';
        $('.submit').attr('disabled', false);


        window.location.href = '/jobs' 
    }).fail((err) => {
        let response = (err.responseJSON)
        let errorMessage = 'Unknown Error Occurs';

       switch(response.error) {
           case 'IS_EMPTY':
               errorMessage = 'All Fields Are Mandatory'
               break;
            case 'INVALID_SUBURB':
                errorMessage = 'Suburb is Invalid';
                break;
            case 'INTERNAL_SERVER':
                errorMessage = 'Internal Server error'
                break;

        }   
        $('.submit')[0].innerHTML = 'Get a Quote';

        alert(errorMessage);     
    })
})  


function car() {
    const length = $('#length');
    const width = $('#width');
    const height = $('#height');
    const weight = $('#weight');


    return {
        "length": length.val(),
        "width": width.val(),
        "height": height.val(),
        "weight": weight.val()
    }
}