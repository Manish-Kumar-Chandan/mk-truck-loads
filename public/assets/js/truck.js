jQuery(() => {

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
    
    $('#add-truck-form').on('submit', async (e) => {
        e.preventDefault();
        let empty = true;
        const truckName = $('#truckName').val();
        const truckNumber = $('#truckNumber').val();
        const phone = $('#phoneNo').val();
        const email = $('#emailId').val();
        const company = $('#company').val();
        const date = $('#datepicker').val();
        const comment = $('#comments').val();
        const name = $('#name').val();
        var file = $('#file')[0].files[0];
        var pattern = new RegExp(/^[a-zA-Z0-9]+$/);
        console.log("this is ",name,truckName,truckNumber,file,phone,email,company,date,comment)
        $('#add-truck-form input').each(function () {
            if ($(this).val() !== '') {
                empty = false;
            }
        });

        if (empty) {
            return alert('Please fill all field')
        }
        let validTruckNumber = pattern.test(truckNumber);
        if(!validTruckNumber){
            return alert('Please fill valid truck number')
        }

        if(truckNumber.length <= 5){
            return alert('Please enter truck number more then 6 word')
        }
        // if(phone.match('/^[a-z0-9]+$/i')){

        // }
        var formData = new FormData();
        formData.append('myfile', file);
        formData.append('truckName', truckName);
        formData.append('truckNumber', truckNumber);
        formData.append('name', name);
        formData.append('comment', comment);
        formData.append('date', date);
        formData.append('company', company); 
        formData.append('email', email); 
        formData.append('phone', phone); 

        console.log("this is update profile",file,formData);
        $('.add-truck-info').attr('disabled', true);
        $('.add-truck-info').text('adding ...');

        Controller.addTruckData(formData)
      
    })

    $('#edit-truck-form').on('submit', async (e) => {
        e.preventDefault();
        let empty = true;
        const truckName = $('#truckName1').val();
        const truckNumber = $('#truckNumber1').val();
        var file = $('#file')[0].files[0];

        console.log("this is edit truck ",truckName,truckNumber,file)
        $('#edit-truck-form input').each(function () {
            if ($(this).val() !== '') {
                empty = false;
            }
        });

        if (empty) {
            return alert('Please Select the image')
        }
        
        var formData = new FormData();
        formData.append('myfile', file);
        formData.append('truckName', truckName);
        formData.append('truckNumber', truckNumber);
       
        console.log("this is update profile",file,formData);
        $('.edit-truck-info').attr('disabled', true);
        $('.edit-truck-info').text('updating ...');

        Controller.EditTruckData(formData)
      
    })
})