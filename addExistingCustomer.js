/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 * @NModuleScope SameAccount
 */
define(['N/ui/serverWidget', 'N/log', 'N/search', 'N/redirect', 'N/record'], function (ui, log, search, redirect, record) {

    function onRequest(context) {
        if (context.request.method === 'GET') {
            var number = context.request.parameters.number;
            var address = context.request.parameters.address;
            var whatConverts = context.request.parameters.wc;

            var form = ui.createForm({ title: 'Select a Customer' });

            var customerGroup = form.addFieldGroup({
                id: 'custpage_customer_group',
                label: 'Customer Details'
            });


            var customerInfoLabel = form.addField({
                id: 'custpage_existing_info',
                type: ui.FieldType.TEXT,
                label: 'Customer Info',
                container: 'custpage_customer_group' 
            });

            customerInfoLabel.updateDisplayType({ displayType: ui.FieldDisplayType.INLINE });
            customerInfoLabel.updateBreakType({ breakType: ui.FieldBreakType.STARTCOL });

            
            log.debug('WhatConverts ID', whatConverts);
            var filters;

            if(number === undefined || number === null || number === ''){
                address = JSON.parse(address);
                var street = address[0].street;
                var zip = address[0].zip;
                var streettwo = address[0].streettwo;
                var fullAddress = address[0].full;

                var filters = [
                    ['address', 'contains', [street, zip, streettwo]], 'AND', 
                    ['isinactive', 'is', false]                  
                ];

                customerInfoLabel.defaultValue = fullAddress;

            }else {
                log.debug('Number', number);
                filters = [['phone', 'is', number], 'AND',  ['isinactive', 'is', false]]
                customerInfoLabel.defaultValue = number;
            }

            
            

            var hiddenField = form.addField({
                id: 'custpage_whatconverts',
                type: ui.FieldType.TEXT,
                label: 'WhatConverts ID'
            });

            hiddenField.defaultValue = whatConverts;
            hiddenField.updateDisplayType({ displayType: ui.FieldDisplayType.HIDDEN });


            var selectField = form.addField({
                id: 'custpage_customer_select',
                type: ui.FieldType.SELECT,
                label: 'Matching Customers',
                container: 'custpage_customer_group' 
            }); 

            selectField.addSelectOption({
                value: '',
                text: 'Select a Customer'
            });

            if (number || address) {
                try {

                    var customerSearch = search.create({
                        type: search.Type.CUSTOMER,
                        filters: filters,
                        columns: ['internalid', 'entityid', 'email', 'phone']
                    });

                    var resultSet = customerSearch.run();
                    var results = resultSet.getRange({ start: 0, end: 20 });

                    if (results.length > 0) {
                        results.forEach(function (result) {
                            var customerId = result.getValue({ name: 'internalid' });
                            var customerName = result.getValue({ name: 'entityid' }) || 'Unknown Name';
                            var customerEmail = result.getValue({ name: 'email' }) || 'No Email';
                            var phone = result.getValue({ name: 'phone' }) || 'No Email';

                            var displayText = customerName + ' (' + customerEmail + ')  ' + phone;
                            log.debug('Adding Customer:', displayText);

                            selectField.addSelectOption({
                                value: customerId,
                                text: displayText
                            });
                        });

                        log.debug('Total Customers Found', results.length);
                    } else {
                        log.debug('No customers found with this phone number.');
                    }
                } catch (error) {
                    log.error('Error searching for customers', error);
                }
            }

            form.addSubmitButton({ label: 'Submit' });
            context.response.writePage(form);

        } else if (context.request.method === 'POST') {
            var selectedCustomerId = context.request.parameters.custpage_customer_select;
            var whatConverts = context.request.parameters.custpage_whatconverts; // Retrieve from hidden field

            log.debug('Selected Customer ID', selectedCustomerId);
            log.debug('WhatConverts ID (from POST)', whatConverts);

            if (selectedCustomerId) {
                context.response.write('Customer Selected: ' + selectedCustomerId + ', WhatConverts ID: ' + whatConverts);


                var leadRecord = record.load({
                    type: "customrecord_gc_what_converts_leads",
                    id: whatConverts
                });

                leadRecord.setValue({fieldId: 'custrecord_gc_wc_create_contact', value: selectedCustomerId});
                leadRecord.save();

                redirect.toRecord({
                    type: 'customrecord_gc_what_converts_leads',
                    id: whatConverts
                });

                
            } else {
                context.response.write('No customer selected.');
            }
        }
    }

    return {
        onRequest: onRequest,
    };
});
