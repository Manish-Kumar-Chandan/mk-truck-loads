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

    $('#profile-pic-form').on('submit', async (e) => {
        e.preventDefault();
        let empty = true;
        $('#profile-pic-form input').each(function () {
            if ($(this).val() !== '') {
                empty = false;
            }
        });

        if (empty) {
            return alert('Please Select the image')
        }
        var file = $('#file')[0].files[0];
        var formData = new FormData();
        formData.append('myfile', file);
        
       
        console.log("this is update profile",file,formData);
        $('.add-profile-pic').attr('disabled', true);
        $('.add-profile-pic').text('adding ...');

        Controller.addProfilePic(formData)
      
    })
})