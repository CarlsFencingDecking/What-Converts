/**
 * @NApiVersion 2.x
 * @NScriptType ClientScript
 */
define(['N/currentRecord', 'N/https', 'N/log', 'N/url'], function(currentRecord, https, log, url) {

   
    function getWhatConverts(context) {
        var cr = context.currentRecord;

        function getIdFromURL() {
            var url = window.location.href;
            var params = new URLSearchParams(url.split('?')[1]); // Parse query string
            return params.get('wc'); // Get the value of the 'id' parameter
        }


        var wcRecord = getIdFromURL();

        if(!Object.is(wcRecord, null)){
            cr.setValue({fieldId: 'custentity_gc_new_contact_wc', value: wcRecord})
        }
    }



    function pageInit(context){
        var cr = context.currentRecord;

        try{
            getWhatConverts(context)
        }catch(e){
            console.log(e);
        }
    }



    return {
        pageInit: pageInit,
    };
});
