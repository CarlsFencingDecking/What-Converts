/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 */
define(['N/record', 'N/log', 'N/search', 'N/ui/serverWidget', 'N/url'], function(record, log, search, serverWidget, url) {
    function afterSubmit(context) {

        if(context.type === context.UserEventType.CREATE){
            var newRecord = context.newRecord;
            var internalid = newRecord.id;
            var recordType = newRecord.type;
            var form = context.form;

            try{

                var whatConverts = newRecord.getValue({fieldId: 'custentity_gc_new_contact_wc'});
                if(whatConverts !== ''){
                    var leadRecord = record.load({
                        type: "customrecord_gc_what_converts_leads",
                        id: whatConverts
                    });

                    leadRecord.setValue({fieldId: 'custrecord_gc_wc_create_contact', value: internalid});
                    leadRecord.save();
                    
                }

            }catch(e){
                log.error('error', e);
                
            }

            
            
         

        }

    }

    return {
        afterSubmit: afterSubmit
    };
});
