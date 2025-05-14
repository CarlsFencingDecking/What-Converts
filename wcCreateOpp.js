/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 */
define(['N/ui/serverWidget', 'N/runtime', 'N/url', 'N/record'], 
    function(serverWidget, runtime, url, record) {
    
        function beforeLoad(context) {
            
            if (context.type !== context.UserEventType.VIEW) return;        
    
                var form = context.form;
        
        
                form.addButton({
                    id: 'custpage_gc_create_opp',
                    label: 'Create Opportunity',
                    functionName: "wcCreateOpp"
                });
        
                form.addButton({
                    id: 'custpage_gc_create_customer',
                    label: 'Create Contact',
                    functionName: "wcCreateContact"
                });

                form.addButton({
                    id: 'custpage_gc_find_exist_cust',
                    label: 'Find Existing Customer',
                    functionName: "findExistingCustomer"
                });
        
                form.clientScriptModulePath = "./wcCreateOppClient.js";
                
            
            
    
            
        }
    
        return {
            beforeLoad: beforeLoad
        };
    });
    