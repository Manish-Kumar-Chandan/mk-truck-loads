jQuery(() => {
        
    // Truck
    const primeMover = $('#prime_mover');
    const craneTruck = $('#crane_truck');
    const tiltTray = $('#tilt_tray');
    const regidBeavertail = $('#rigid_beavertail');
    const regidFlattop = $('#rigid_flat_top');
    const regidPantech = $('#rigid_pantech');
    const regidWithTailgator = $('#rigid_with_tailgator');
    const retriverTowTruck = $('#retrevier_tow_truck');
    // Trailer 
    const dropDeck = $('#drop_deck');
    const flatTop = $('#flat_top');
    const curtainSlider = $('#curtain_sider');
    const deckWinder = $('#deck_widner');
    const lowLoader = $('#low_loader');
    const carCarrier = $('#car_carrier');
    const dolly = $('#dolly');
    const refrigrated = $('#refrigerated');
    const sideLoader = $('#side_loader');
    const skel = $('#skel');
    const megaTilt = $('#mega_tilt');
    const platform = $('#platform');
    const wakingFloor = $('#walking_floor');
    const liveStock = $('#live_stock');
    const grainTrailer = $('#grain_trailer');
    const tipper = $('#tipper');
    const extendable = $('#extendable');
    const sideTipper = $('#side_tipper');
    const tanker = $('#tanker');
    const dogTrailer = $('#dog_trailer');
    const horseFloat = $('#horse_float');
    const logging = $('#logging');
    const poleJinker = $('#pole_jinker');
    const pigTrailer = $('#pig_trailer');

    // Configrations 
    const bDouble = $('#b_double');
    const roadTrain = $('#road_train');

    // Other
    const pilot = $('#pilot');
    const hotshot = $('#hotshot');
    const ute = $('#ute');
    const depotFacilities = $('#depot_facilities');
    const bobtailOperator = $('#bobtail_operator');
    const driveHire = $('#drive_hire');
    const tradePlates = $('#trade_plates');
    const updatedPassword = $('#newPassword');
    const email = $('#email');

    $('#carrier-fleet-form').on('submit', (e) => {
        e.preventDefault();
        let empty = true;

        $('#carrier-fleet-form input').each(function () {
            if ($(this).val() !== '') {
                empty = false;
            }
        });

        if (empty) {
            return alert('Please Select One')
        }

        var fleetData = {
            primeMover: primeMover.val(),
            craneTruck: craneTruck.val(),
            tiltTray: tiltTray.val(),
            regidBeavertail: regidBeavertail.val(),
            regidFlattop: regidFlattop.val(),
            regidPantech: regidPantech.val(),
            regidWithTailgator: regidWithTailgator.val(),
            retriverTowTruck: retriverTowTruck.val(),
            dropDeck: dropDeck.val(),
            flatTop: flatTop.val(),
            curtainSlider: curtainSlider.val(),
            deckWinder: deckWinder.val(),
            lowLoader: lowLoader.val(),
            carCarrier: carCarrier.val(),
            dolly: dolly.val(),
            refrigrated: refrigrated.val(),
            sideLoader: sideLoader.val(),
            skel: skel.val(),
            megaTilt: megaTilt.val(),
            platform: platform.val(),
            wakingFloor: wakingFloor.val(),
            liveStock: liveStock.val(),
            grainTrailer: grainTrailer.val(),
            tipper: tipper.val(),
            extendable: extendable.val(),
            sideTipper: sideTipper.val(),
            tanker: tanker.val(),
            dogTrailer: dogTrailer.val(),
            horseFloat: horseFloat.val(),
            logging: logging.val(),
            poleJinker: poleJinker.val(),
            pigTrailer: pigTrailer.val(),
            bDouble: bDouble.val(),
            roadTrain: roadTrain.val(),
            pilot: pilot.val(),
            hotshot: hotshot.val(),
            ute: ute.val(),
            depotFacilities: depotFacilities.val(),
            bobtailOperator: bobtailOperator.val(),
            driveHire: driveHire.val(),
            tradePlates: tradePlates.val()

        }

        
        $('.fleet-button').attr('disabled', true);
        $('.fleet-button').text('Loading ...');

        Controller.updateCarrierFleet(fleetData)
    })




    //this function are use for update password
    $('#carrier-password-form').on('submit', (e) => {
        e.preventDefault();
        console.log('-------updated password',updatedPassword.val())
        let empty = true;


        $('#carrier-password-form input').each(function () {
            if ($(this).val() !== '') {
                empty = false;
            }
        });

        if (empty) {
            return alert('Please enter the password')
        }

        var passwordData = {
            password:updatedPassword.val(),
            email: email.val()
        }

        console.log(passwordData);
        $('.Password-button').attr('disabled', true);
        $('.Password-button').text('updating ...');

        Controller.updatePassword(passwordData)
    })
})



