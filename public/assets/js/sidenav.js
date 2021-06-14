var isOpen = false;

    $('#side-menu').css('display', 'none');
    function openNavController() {
        if (isOpen === true) {
            closeNav();
            $('#side-menu').css('display', 'none');
            $('#side-menu-small').css('display', 'block');

        } else {
            openNav()
            $('#side-menu-small').css('display', 'none');
            $('#side-menu').css('display', 'block');

        }
        isOpen = !isOpen;
    }

    function openNav() {
        document.getElementById("mySidenav").style.width = "250px";
        document.getElementById("main").style.marginLeft = "250px";
    }

    function closeNav() {
        document.getElementById("mySidenav").style.width = "70px";
        document.getElementById("main").style.marginLeft = "70px";
    }