jQuery(() => {
    const windowWidth = window.innerWidth;

    if(windowWidth > 991) {
        $('.full-width').css('display','block');
    } else {
        $('.small-width').css('display','block');
    }

    

})