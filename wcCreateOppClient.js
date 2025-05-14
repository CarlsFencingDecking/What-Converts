/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 */
define(['N/currentRecord', 'N/https', 'N/log'], function(currentRecord, https, log) {

   
    function pageInit(context) {
        var cr = context.currentRecord;
        var inputFieldClass = document.querySelectorAll('.uir-field-input')[3];
        var contactId;
        if(!Object.is(inputFieldClass.children[0], undefined)){
            var contactAnchor = inputFieldClass.children[0].href;

            function getContactId() {
                var url = contactAnchor;
                var params = new URLSearchParams(url.split('?')[1]); // Parse query string
                return params.get('id'); // Get the value of the 'id' parameter
            }
    
            contactId = getContactId();
            console.log(contactId, 'contact id')
        }
        
    }


    try{

        function findExistingCustomer(){

            function getIdFromURL() {
                var url = window.location.href;
                var params = new URLSearchParams(url.split('?')[1]); // Parse query string
                return params.get('id'); // Get the value of the 'id' parameter
            }
    
            var id = getIdFromURL();
            console.log(id, 'id');



            function findCustomModule() {
                // Create the modal overlay
                var modalOverlay = document.createElement('div');
                modalOverlay.style.position = 'fixed';
                modalOverlay.style.top = '0';
                modalOverlay.style.left = '0';
                modalOverlay.style.width = '100%';
                modalOverlay.style.height = '100%';
                modalOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
                modalOverlay.style.zIndex = '9999';
                modalOverlay.style.display = 'flex';
                modalOverlay.style.alignItems = 'center';
                modalOverlay.style.justifyContent = 'center';
                
                // Create the modal box
                var modalBox = document.createElement('div');
                modalBox.style.backgroundColor = 'white';
                modalBox.style.padding = '20px';
                modalBox.style.borderRadius = '5px';
                modalBox.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
                modalBox.style.textAlign = 'center';
                modalBox.style.maxWidth = '400px';
                modalBox.style.width = '80%';
                
                // Add the message to the modal
                var modalMessage = document.createElement('p');
                modalMessage.textContent = 'Find Existing Customer';
                modalBox.appendChild(modalMessage);
                
                // Create the buttons
                var buttonContainer = document.createElement('div');
                buttonContainer.style.marginTop = '20px';
                buttonContainer.style.display = 'flex';
                buttonContainer.style.flexDirection = 'column';

                /*

                var byName = document.createElement('button');
                byName.textContent = 'Find By Name'
                byName.style.marginRight = '10px';
                byName.style.padding = '10px 20px';
                byName.style.fontSize = '16px';
                byName.style.cursor = 'pointer';

                */

                
    

                var numberFind = document.querySelectorAll('.uir-field');
                var number;
                numberFind.forEach(function(n, x){
                    var fieldId = n.parentElement.getAttribute('data-field-name');
                    if(Object.is(fieldId, 'custrecord_gc_wc_lead_contact_number')){
                        number = n.innerText;
                        function formatPhoneNumber(phoneNumber) {
                            phoneNumber = phoneNumber.replace(/\D/g, ""); // Remove non-numeric characters
                            if (phoneNumber.length === 11 && phoneNumber.startsWith("1")) {
                                phoneNumber = phoneNumber.substring(1); // Remove the country code if it's "1"
                            }
                            return "(" + phoneNumber.substring(0, 3) + ") " + phoneNumber.substring(3, 6) + "-" + phoneNumber.substring(6);
                        }

                        number = formatPhoneNumber(number)
                        
                    }
                });

                var numberIs = document.createElement('input');
                numberIs.type = 'text'
                numberIs.value = number;
                numberIs.style.marginRight = '10px';
                numberIs.style.padding = '10px 20px';
                numberIs.style.fontSize = '16px';


                var byNumber = document.createElement('button');
                byNumber.textContent = 'Find By Phone Number';
                byNumber.style.marginRight = '10px';
                byNumber.style.marginBottom = '20px';
                byNumber.style.padding = '10px 20px';
                byNumber.style.fontSize = '16px';
                byNumber.style.cursor = 'pointer';

                var addressDiv = document.createElement('div');
                var addressText = document.createElement('div');
                addressText.innerText = 'Address Lookup';
                var address = document.createElement('gmp-place-autocomplete');
                address.placeholder = 'Enter Address'
                address.type = 'text'
                address.setAttribute('input', 'address'); 
                address.setAttribute('placeholder', 'address'); 
                address.style.marginRight = '10px';

                addressDiv.appendChild(addressText)
                addressDiv.appendChild(address)
  

                var byAddress = document.createElement('button');
                byAddress.textContent = 'Find By Address'
                byAddress.style.marginRight = '10px';
                byAddress.style.padding = '10px 20px';
                byAddress.style.fontSize = '16px';
                byAddress.style.cursor = 'pointer';

                var googleMapScript = document.createElement('script');
                googleMapScript.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyA3eEp53_Qq8w74WrnFpVTPeUTUmRy17eg&libraries=places&v=weekly";
                googleMapScript.setAttribute('defer','');
                var head = document.getElementsByTagName('head');
                head[0].appendChild(googleMapScript);

                
                var addressInfo = [];
                address.addEventListener('gmp-select', function (event) {
                    var placePrediction = event.placePrediction;
                
                    if (placePrediction) {
                        try {
                            var place = placePrediction.toPlace(); // Convert prediction to place object
                            addressInfo = [];
                            place.fetchFields({ fields: ['displayName', 'addressComponents', 'formattedAddress'] })
                                .then(function () {
                                    var components = place.addressComponents;
                                    var formattedAddress = place.formattedAddress
                                    console.log(formattedAddress)
                                    var zip;
                                    var streetNumber;
                                    var route;
                                    components.forEach(function(c, x){

                                        console.log(c)

                                        if(Object.is(c.Eg[0], 'postal_code')){
                                            zip = c.Fg;
                                        }

                                        if(Object.is(c.Eg[0], 'street_number')){
                                            streetNumber = c.Fg;
                                        }

                                        if(Object.is(c.Eg[0], 'route')){
                                            route = c.Fg;
                                        }

                                    });

                                    addressInfo.push(
                                        {
                                            street: place.displayName,
                                            zip: zip,
                                            streettwo: streetNumber+" "+route,
                                            full: formattedAddress
                                        }
                                    )
                                })
                                .catch(function (error) {
                                    console.error('Error fetching place details:', error);
                                });
                
                        } catch (error) {
                            console.error('Error processing placePrediction:', error);
                        }
                    }
                });

                byAddress.onclick = function(){
                    window.location.href = "https://533330.app.netsuite.com/app/site/hosting/scriptlet.nl?script=5976&deploy=1&address="+JSON.stringify(addressInfo)+"&wc="+id;
                }


                
                var cancelButton = document.createElement('button');
                cancelButton.textContent = 'Cancel';
                cancelButton.style.marginRight = '10px';
                cancelButton.style.marginTop = '10px';
                cancelButton.style.padding = '10px 20px';
                cancelButton.style.fontSize = '16px';
                cancelButton.style.cursor = 'pointer';
        
                
                
                // Append buttons to the container
                //buttonContainer.appendChild(byName);
                buttonContainer.appendChild(numberIs);
                buttonContainer.appendChild(byNumber);
                buttonContainer.appendChild(addressDiv)
                buttonContainer.appendChild(byAddress)
                buttonContainer.appendChild(cancelButton);
                
                // Append everything to the modal
                modalBox.appendChild(buttonContainer);
                modalOverlay.appendChild(modalBox);
                
                // Append the modal to the body
                document.body.appendChild(modalOverlay);

                byNumber.onclick = function(){

                    var currentNumber = numberIs.value;

                    function formatPhoneNumber(phoneNumber) {
                        phoneNumber = phoneNumber.replace(/\D/g, ""); // Remove non-numeric characters
                        if (phoneNumber.length === 11 && phoneNumber.startsWith("1")) {
                            phoneNumber = phoneNumber.substring(1); // Remove the country code if it's "1"
                        }
                        return "(" + phoneNumber.substring(0, 3) + ") " + phoneNumber.substring(3, 6) + "-" + phoneNumber.substring(6);
                    }

                    var sendNumber = formatPhoneNumber(currentNumber);
                    console.log(sendNumber)
                    
                    window.location.href = "https://533330.app.netsuite.com/app/site/hosting/scriptlet.nl?script=5976&deploy=1&number="+sendNumber+"&wc="+id;
                    
                }

                cancelButton.onclick = function(){
                    document.body.removeChild(modalOverlay);
                }
            }


            findCustomModule()
        }

    }catch(e){
        console.log(e, e,message)
        log.error(e, e,message)
    }

    

    function wcCreateOpp() {

        var inputFieldClass = document.querySelectorAll('.uir-field-input')[3];
        var contactId;
        if(!Object.is(inputFieldClass.children[0], undefined)){
            var contactAnchor = inputFieldClass.children[0].href;

            function getContactId() {
                var url = contactAnchor;
                var params = new URLSearchParams(url.split('?')[1]); // Parse query string
                return params.get('id'); // Get the value of the 'id' parameter
            }
    
            contactId = getContactId();
            console.log(contactId, 'contact id')
        }
        


        

        function getIdFromURL() {
            var url = window.location.href;
            var params = new URLSearchParams(url.split('?')[1]); // Parse query string
            return params.get('id'); // Get the value of the 'id' parameter
        }

        var id = getIdFromURL();
        console.log(id, 'id');


        if(!Object.is(contactId, undefined)){
            window.location.href = 'https://533330.app.netsuite.com/app/accounting/transactions/opprtnty.nl?wc='+id+'&contact='+contactId
        }else if(Object.is(contactId, undefined)){
            window.location.href = 'https://533330.app.netsuite.com/app/accounting/transactions/opprtnty.nl?wc='+id;
        }

        
    }


    function wcCreateContact(){

        function getIdFromURL() {
            var url = window.location.href;
            var params = new URLSearchParams(url.split('?')[1]); // Parse query string
            return params.get('id'); // Get the value of the 'id' parameter
        }

        var id = getIdFromURL();
        open("https://533330.app.netsuite.com/app/common/entity/custjob.nl?target=main:custrecord_gc_wc_create_contact&label=Create+Contact&wc="+id);

        function showCustomConfirm(message, callback) {
            // Create the modal overlay
            var modalOverlay = document.createElement('div');
            modalOverlay.style.position = 'fixed';
            modalOverlay.style.top = '0';
            modalOverlay.style.left = '0';
            modalOverlay.style.width = '100%';
            modalOverlay.style.height = '100%';
            modalOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
            modalOverlay.style.zIndex = '9999';
            modalOverlay.style.display = 'flex';
            modalOverlay.style.alignItems = 'center';
            modalOverlay.style.justifyContent = 'center';
            
            // Create the modal box
            var modalBox = document.createElement('div');
            modalBox.style.backgroundColor = 'white';
            modalBox.style.padding = '20px';
            modalBox.style.borderRadius = '5px';
            modalBox.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
            modalBox.style.textAlign = 'center';
            modalBox.style.maxWidth = '400px';
            modalBox.style.width = '80%';
            
            // Add the message to the modal
            var modalMessage = document.createElement('p');
            modalMessage.textContent = message;
            modalBox.appendChild(modalMessage);
            
            // Create the buttons
            var buttonContainer = document.createElement('div');
            buttonContainer.style.marginTop = '20px';
            
            var okButton = document.createElement('button');
            okButton.textContent = 'Update Record';
            okButton.style.marginRight = '10px';
            okButton.style.padding = '10px 20px';
            okButton.style.fontSize = '16px';
            okButton.style.cursor = 'pointer';
            okButton.addEventListener('click', function() {
                callback(true); // User clicked OK
                document.body.removeChild(modalOverlay);
            });
            
            var cancelButton = document.createElement('button');
            cancelButton.textContent = 'Cancel';
            cancelButton.style.padding = '10px 20px';
            cancelButton.style.fontSize = '16px';
            cancelButton.style.cursor = 'pointer';
            cancelButton.addEventListener('click', function() {
                callback(false); // User clicked Cancel
                document.body.removeChild(modalOverlay);
            });
            
            // Append buttons to the container
            buttonContainer.appendChild(okButton);
            buttonContainer.appendChild(cancelButton);
            
            // Append everything to the modal
            modalBox.appendChild(buttonContainer);
            modalOverlay.appendChild(modalBox);
            
            // Append the modal to the body
            document.body.appendChild(modalOverlay);
        }

        setTimeout(function(){

            showCustomConfirm('Please Update Record With New Contact', function(response) {
                if (response) {
                    var currentUrl = window.location.href+'&update=true'
                    console.log(currentUrl)
                    location.href = currentUrl
                } else if(!response){
                    alert('If you cancel the process of creating a new contact, this record will not be updated. If you have successfully created a new contact and want to continue, you must refresh the page to see the updates reflected in this record. Without refreshing, the current record will not show the newly created contact.')
                }
            });

        }, 500);

      
    }


    function closeRecord(){
        var _gccheck_fields = confirm('Before Closing, Ensure That Field Is Properly Filled Out');
        if(_gccheck_fields){
            window.location.href = 'https://533330.app.netsuite.com/app/center/card.nl?sc=-29&whence='
        }
    }

    return {
        pageInit: pageInit,
        wcCreateOpp: wcCreateOpp,
        wcCreateContact: wcCreateContact,
        findExistingCustomer:findExistingCustomer,
        closeRecord: closeRecord
    };
});
