/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 * @NModuleScope SameAccount
 * @ScriptFileName whatconverts_webhook_su.js
 */
define(['N/config', 'N/search', 'N/record'],
    /**
     * @param {config} config
     * @param {search} search
     * @param {record} record
    **/
    function(config, search, record)
    {
        // Define the debug title
        var strDebugTitle = 'whatconverts_webhook_su';
    
        // Define global variables
        var nWhatconvertsWebhookFields = {
            "trigger": { "wtc_id": "trigger", "ns_id": "" },
            "lead_id": { "wtc_id": "lead_id", "ns_id": "custrecord_gc_wc_lead_id" },
            "user_id": { "wtc_id": "user_id", "ns_id": "" },
            "lead_type": { "wtc_id": "lead_type", "ns_id": "custrecord_gc_wc_lead_type" },
            "lead_status": { "wtc_id": "lead_status", "ns_id": "custrecord_gc_wc_lead_status" },
            "lead_analysis": {
                "Keyword Detection": { "wtc_id": "Keyword Detection", "ns_id": "" },
                "Lead Summary": { "wtc_id": "Lead Summary", "ns_id": "" },
                "Intent Detection": { "wtc_id": "Intent Detection", "ns_id": "" },
                "Sentiment Detection": { "wtc_id": "Sentiment Detection", "ns_id": "" },
                "Topic Detection": { "wtc_id": "Topic Detection", "ns_id": "" },
            },
            "event_category": { "wtc_id": "event_category", "ns_id": "" },
            "event_action": { "wtc_id": "event_action", "ns_id": "" },
            "event_label": { "wtc_id": "event_label", "ns_id": "" },
            "form_name": { "wtc_id": "form_name", "ns_id": "" },
            "city": { "wtc_id": "city", "ns_id": "custrecord_gc_wc_lead_caller_city" },
            "state": { "wtc_id": "state", "ns_id": "" },
            "zip": { "wtc_id": "zip", "ns_id": "custrecord_gc_wc_lead_zip" },
            "country": { "wtc_id": "country", "ns_id": "" },
            "message": { "wtc_id": "message", "ns_id": "" },
            "call_status": { "wtc_id": "call_status", "ns_id": "custrecord_gc_wc_lead_call_status" },
            "phone_name": { "wtc_id": "phone_name", "ns_id": "custrecord_gc_phone_title" },
            "call_duration": { "wtc_id": "call_duration", "ns_id": "custrecord_gc_wc_lead_call_duration" },
            "call_duration_seconds": { "wtc_id": "call_duration_seconds", "ns_id": "" },
            "tracking_number": { "wtc_id": "tracking_number", "ns_id": "custrecord_gc_wc_lead_tracking_number" },
            "destination_number": { "wtc_id": "destination_number", "ns_id": "custrecord_gc_wc_destination_number" },
            "caller_number": { "wtc_id": "caller_number", "ns_id": "" },
            "caller_name": { "wtc_id": "caller_name", "ns_id": "" },
            "caller_city": { "wtc_id": "caller_city", "ns_id": "custrecord_gc_wc_lead_caller_city" },
            "caller_state": { "wtc_id": "caller_state", "ns_id": "" },
            "caller_zip": { "wtc_id": "caller_zip", "ns_id": "custrecord_gc_wc_lead_zip" },
            "caller_country": { "wtc_id": "caller_country", "ns_id": "" },
            "answer_status": { "wtc_id": "answer_status", "ns_id": "" },
            "line_type": { "wtc_id": "line_type", "ns_id": "custrecord_gc_wc_lead_call_line_type" },
            "recording": { "wtc_id": "recording", "ns_id": "" },
            "play_recording": { "wtc_id": "play_recording", "ns_id": "custrecord_gc_wc_lead_call_recording" },
            "voicemail": { "wtc_id": "voicemail", "ns_id": "" },
            "play_voicemail": { "wtc_id": "play_voicemail", "ns_id": "" },
            "call_transcription": { "wtc_id": "call_transcription", "ns_id": "" },
            "voicemail_transcription": { "wtc_id": "voicemail_transcription", "ns_id": "" },
            "transaction_id": { "wtc_id": "transaction_id", "ns_id": "" },
            "transaction_tax": { "wtc_id": "transaction_tax", "ns_id": "" },
            "transaction_shipping": { "wtc_id": "transaction_shipping", "ns_id": "" },
            "chat_status": { "wtc_id": "chat_status", "ns_id": "" },
            "category": { "wtc_id": "category", "ns_id": "" },
            "action": { "wtc_id": "action", "ns_id": "" },
            "sender_name": { "wtc_id": "sender_name", "ns_id": "" },
            "email_subject": { "wtc_id": "email_subject", "ns_id": "" },
            "email_message": { "wtc_id": "email_message", "ns_id": "" },
            "additional_fields": {
                "menu_1": { "wtc_id": "menu_1", "ns_id": "" },
                "full_name": { "wtc_id": "full_name", "ns_id": "custrecord_gc_wc_lead_contact_name" },
                "email_address": { "wtc_id": "email_address", "ns_id": "custrecord_gc_wc_email" },
                "subject": { "wtc_id": "subject", "ns_id": "" },
                "message": { "wtc_id": "message", "ns_id": "" },
                "City*": { "wtc_id": "City*", "ns_id": "custrecord_gc_wc_lead_caller_city" },
                "Description of Work to be Completed": { "wtc_id": "Description of Work to be Completed", "ns_id": "custrecord_gc_wc_desc_work" },
                "What are you looking for?*": { "wtc_id": "What are you looking for?*", "ns_id": "custrecord_gc_wc_desc_work" },
                "*": { "wtc_id": "*", "ns_id": "custrecord_gc_wc_desc_work" },
                "Email Address*": { "wtc_id": "Email Address*", "ns_id": "custrecord_gc_wc_email" },
                "E-mail": { "wtc_id": "E-mail", "ns_id": "custrecord_gc_wc_email" },
                "E-mail*": { "wtc_id": "E-mail*", "ns_id": "custrecord_gc_wc_email" },
                "First Name*": { "wtc_id": "First Name*", "ns_id": "custrecord_gc_wc_lead_contact_name" },
                "First Name": { "wtc_id": "First Name", "ns_id": "custrecord_gc_wc_lead_contact_name" },
                "Last Name*": { "wtc_id": "Last Name*", "ns_id": "custrecord_gc_wc_lead_contact_name" },
                "Last Name": { "wtc_id": "Last Name", "ns_id": "custrecord_gc_wc_lead_contact_name" },
                "Phone Number*": { "wtc_id": "Phone Number*", "ns_id": "custrecord_gc_wc_lead_contact_number" },
                "Phone Number": { "wtc_id": "Phone Number", "ns_id": "custrecord_gc_wc_lead_contact_number" },
                "phone": { "wtc_id": "phone", "ns_id": "custrecord_gc_wc_lead_contact_number" },
                "Phone No*": { "wtc_id": "Phone No*", "ns_id": "custrecord_gc_wc_lead_contact_number" },
                "Project Time Frame*": { "wtc_id": "Project Time Frame*", "ns_id": "custrecord_gc_wc_time_frame" },
                "Select Time Frame for Project*": { "wtc_id": "Select Time Frame for Project*", "ns_id": "custrecord_gc_wc_time_frame" },
                "Select Time Frame for Project": { "wtc_id": "Select Time Frame for Project", "ns_id": "custrecord_gc_wc_time_frame" },
                "Street Address*": { "wtc_id": "Street Address*", "ns_id": "custrecord_gc_wc_address" },
                "Zipcode*": { "wtc_id": "Zipcode*", "ns_id": "custrecord_gc_wc_lead_zip" },
                "Zipcode": { "wtc_id": "Zipcode", "ns_id": "custrecord_gc_wc_lead_zip" },
                "appointment_time": { "wtc_id": "appointment_time", "ns_id": "" },
                "axvobj8891": { "wtc_id": "axvobj8891", "ns_id": "" },
                "projectselect": { "wtc_id": "projectselect", "ns_id": "custrecord_gc_wc_project_type" },
                "Who were you referred by?": { "wtc_id": "Who were you referred by?", "ns_id": "custrecord_gc_wc_lead_reference" },
            },
            "mapped_fields": {
                "Contact Name": { "wtc_id": "Contact Name", "ns_id": "custrecord_gc_wc_lead_contact_name" },
                "Email Address": { "wtc_id": "Email Address", "ns_id": "custrecord_gc_wc_email" },
                "Phone Number": { "wtc_id": "Phone Number", "ns_id": "custrecord_gc_wc_lead_contact_number" },
            },
            "date_created": { "wtc_id": "date_created", "ns_id": "custrecord_gc_wc_date" },
            "quotable": { "wtc_id": "quotable", "ns_id": "" },
            "quote_value": { "wtc_id": "quote_value", "ns_id": "" },
            "sales_value": { "wtc_id": "sales_value", "ns_id": "" },
            "spotted_keywords": { "wtc_id": "spotted_keywords", "ns_id": "" },
            "lead_score": { "wtc_id": "lead_score", "ns_id": "" },
            "lead_state": { "wtc_id": "lead_state", "ns_id": "" },
            "profile": { "wtc_id": "profile", "ns_id": "" },
            "profile_id": { "wtc_id": "profile_id", "ns_id": "" },
            "account": { "wtc_id": "account", "ns_id": "" },
            "account_id": { "wtc_id": "account_id", "ns_id": "" },
            "lead_url": { "wtc_id": "lead_url", "ns_id": "custrecord_gc_wc_lead_url" },
            "landing_url": { "wtc_id": "landing_url", "ns_id": "custrecord_gc_wc_landing_url" },
            "operating_system": { "wtc_id": "operating_system", "ns_id": "" },
            "browser": { "wtc_id": "browser", "ns_id": "" },
            "device_type": { "wtc_id": "device_type", "ns_id": "" },
            "device_make": { "wtc_id": "device_make", "ns_id": "" },
            "lead_source": { "wtc_id": "lead_source", "ns_id": "custrecord_gc_wc_lead_source" },
            "lead_medium": { "wtc_id": "lead_medium", "ns_id": "custrecord_gc_wc_medium" },
            "lead_campaign": { "wtc_id": "lead_campaign", "ns_id": "custrecord_gc_wc_lead_camp" },
            "lead_content": { "wtc_id": "lead_content", "ns_id": "custrecord_mb_utm_content" },
            "phone_name": { "wtc_id": "phone_name", "ns_id": "custrecord_gc_phone_title" },
            "lead_keyword": { "wtc_id": "lead_keyword", "ns_id": "custrecord_gc_wc_keyword" },
            "ip_address": { "wtc_id": "ip_address", "ns_id": "" },
            "notes": { "wtc_id": "notes", "ns_id": "" },
            "contact_name": { "wtc_id": "contact_name", "ns_id": "custrecord_gc_wc_lead_contact_name" },
            "contact_company_name": { "wtc_id": "contact_company_name", "ns_id": "" },
            "contact_email_address": { "wtc_id": "contact_email_address", "ns_id": "custrecord_gc_wc_email" },
            "contact_phone_number": { "wtc_id": "contact_phone_number", "ns_id": "custrecord_gc_wc_lead_contact_number" },
            "email_address": { "wtc_id": "email_address", "ns_id": "custrecord_gc_wc_email" },
            "phone_number": { "wtc_id": "phone_number", "ns_id": "custrecord_gc_wc_lead_contact_number" },
            "field_mappings": {
                "Company Name": { "wtc_id": "Company Name", "ns_id": "" },
                "Contact Person": { "wtc_id": "Contact Person", "ns_id": "" },
                "Email": { "wtc_id": "Email", "ns_id": "custrecord_gc_wc_email" },
                "Phone Number": { "wtc_id": "Phone Number", "ns_id": "custrecord_gc_wc_lead_contact_number" },
            },
            "gclid": { "wtc_id": "gclid", "ns_id": "" },
            "msclkid": { "wtc_id": "msclkid", "ns_id": "" },
            "unbounce_page_id": { "wtc_id": "unbounce_page_id", "ns_id": "" },
            "unbounce_variant_id": { "wtc_id": "unbounce_variant_id", "ns_id": "" },
            "unbounce_visitor_id": { "wtc_id": "unbounce_visitor_id", "ns_id": "" },
            "salesforce_user_id": { "wtc_id": "salesforce_user_id", "ns_id": "" },
            "roistat_visit_id": { "wtc_id": "roistat_visit_id", "ns_id": "" },
            "hubspot_visitor_id": { "wtc_id": "hubspot_visitor_id", "ns_id": "" },
            "facebook_browser_id": { "wtc_id": "facebook_browser_id", "ns_id": "" },
            "facebook_click_id": { "wtc_id": "facebook_click_id", "ns_id": "" },
            "google_analytics_client_id": { "wtc_id": "google_analytics_client_id", "ns_id": "" },
            "google_analytics_session_id": { "wtc_id": "google_analytics_session_id", "ns_id": "" },
            "vwo_account_id": { "wtc_id": "vwo_account_id", "ns_id": "" },
            "vwo_experiment_id": { "wtc_id": "vwo_experiment_id", "ns_id": "" },
            "vwo_variant_id": { "wtc_id": "vwo_variant_id", "ns_id": "" },
            "vwo_user_id": { "wtc_id": "vwo_user_id", "ns_id": "" },
            "duplicate": { "wtc_id": "duplicate", "ns_id": "" },
            "spam": { "wtc_id": "spam", "ns_id": "" },
            "whatconverts_for_customer_fields": {
                "id": { "wtc_id": "id", "ns_id": "" },
                "contact_name": { "wtc_id": "contact_name", "ns_id": "custrecord_gc_wc_lead_contact_name" },
                "date_created": { "wtc_id": "date_created", "ns_id": "custrecord_gc_wc_date" },
                "today": { "wtc_id": "today", "ns_id": "" },
                "lead_type": { "wtc_id": "lead_type", "ns_id": "custrecord_gc_wc_lead_type" },
                "contact_email_address": { "wtc_id": "contact_email_address", "ns_id": "custrecord_gc_wc_email" },
                "contact_phone_number": { "wtc_id": "contact_phone_number", "ns_id": "custrecord_gc_wc_lead_contact_number" },
                "lead_status": { "wtc_id": "lead_status", "ns_id": "custrecord_gc_wc_lead_status" },
                "lead_source": { "wtc_id": "lead_source", "ns_id": "custrecord_gc_wc_lead_source" },
                "phone_name": { "wtc_id": "phone_name", "ns_id": "custrecord_gc_phone_title" },
                "lead_content": { "wtc_id": "lead_content", "ns_id": "custrecord_mb_utm_content" },
                "lead_medium": { "wtc_id": "lead_medium", "ns_id": "custrecord_gc_wc_medium" },
                "lead_url": { "wtc_id": "lead_url", "ns_id": "custrecord_gc_wc_lead_url" },
                "landing_url": { "wtc_id": "landing_url", "ns_id": "custrecord_gc_wc_landing_url" },
                "lead_campaign": { "wtc_id": "lead_campaign", "ns_id": "custrecord_gc_wc_lead_camp" },
                "street_address": { "wtc_id": "street_address", "ns_id": "custrecord_gc_wc_address" },
            }
        };
        
        /**
         * Definition of the Suitelet script trigger point.
         *
         * @param {Object} context
         * @param {ServerRequest} context.request - Encapsulation of the incoming request
         * @param {ServerResponse} context.response - Encapsulation of the Suitelet response
         * @Since 2015.2
        **/
        function onRequest(context)
        {  
            // Update debug title for logging purposes
            strDebugTitle = 'whatconverts_webhook_su (onRequest)';
            try
            {
                // Log the start of execution
                log.debug({title: strDebugTitle, details: '=============== START ===============' });
    
                // Extract request and response objects from the context
                var request = context.request;
                var response = context.response;
                var nResponsePOSTData = request.body; // Extract POST data from the request body
    
                // Check if the request method is POST
                if (request.method === 'POST')
                {
                    // Update debug title for POST-specific logic
                    strDebugTitle = 'whatconverts_webhook_su (onRequest) (POST)';
    
                    // If POST data exists, process it
                    if (isThereValue(nResponsePOSTData))
                    {
                        // Parse the JSON data from the POST request
                        var nWhatconvertsLeadData = JSON.parse(nResponsePOSTData.toString());
                        log.debug({ title: strDebugTitle, details: "nWhatconvertsLeadData ("+Object.keys(nWhatconvertsLeadData).length+") : "+JSON.stringify(nWhatconvertsLeadData) });
    
                        // Check if the parsed data has properties
                        if (Object.keys(nWhatconvertsLeadData).length > 0)
                        {
                            // Load user preferences to retrieve date format
                            var nUserObjRecord = config.load({ type: config.Type.USER_PREFERENCES });
                            var nDateFormat = nUserObjRecord.getValue({ fieldId: "DATEFORMAT" });
                            log.debug({title: strDebugTitle, details: "nDateFormat : "+nDateFormat });
    
                            var nWhatconvertsLeadType = nWhatconvertsLeadData["lead_type"];
                            var nWhatConvertsLeadObjectData = {};
                            var objWhatconvertsLeadRecord = "";
                            if (nWhatconvertsLeadData["trigger"] === "new" || nWhatconvertsLeadData["trigger"] === "update") // Handle 'new' trigger to create a new record OR 'update' trigger to update an existing record
                            {
                                var nExistingWhatconvertsLeadRecord = getExistingWhatconvertsLeadRecord(nWhatconvertsLeadData["lead_id"], nWhatconvertsLeadData["lead_type"]);
                                log.debug({title: strDebugTitle, details: "nExistingWhatconvertsLeadRecord : "+JSON.stringify(nExistingWhatconvertsLeadRecord) });
                                if ((nExistingWhatconvertsLeadRecord.flg === true) && (isThereValue(nExistingWhatconvertsLeadRecord.recId))) // If the record exists, load and update it
                                {
                                    objWhatconvertsLeadRecord = record.load({ type: "customrecord_gc_what_converts_leads", id: nExistingWhatconvertsLeadRecord.recId, isDynamic: true });
                                    objWhatconvertsLeadRecord.setValue("custrecord_wc_lead_last_update_timestamp", new Date(nWhatconvertsLeadData["date_created"]));
                                    objWhatconvertsLeadRecord.setValue("custrecord_gc_wc_json_data", JSON.stringify(nWhatconvertsLeadData));
                                    objWhatconvertsLeadRecord.setValue("custrecord_wc_lead_is_updated", true);
                                }
                                else // If the record doesn't exist, create a new one
                                {
                                    objWhatconvertsLeadRecord = record.create({ type: "customrecord_gc_what_converts_leads", isDynamic: true });
                                    objWhatconvertsLeadRecord.setValue("name", isThereValue(getFormatDateTime(nWhatconvertsLeadData["date_created"])) ? getFormatDateTime(nWhatconvertsLeadData["date_created"]) : nWhatconvertsLeadData["date_created"]);
                                    objWhatconvertsLeadRecord.setValue("custrecord_gc_wc_json_data", JSON.stringify(nWhatconvertsLeadData));
                                }
                            }
                            if(isThereValue(objWhatconvertsLeadRecord))
                            {
                                for(var nWhatconvertsFieldID in nWhatconvertsLeadData)
                                {
                                    log.debug({title: strDebugTitle, details: "typeof ["+nWhatconvertsFieldID+"] : "+typeof nWhatconvertsLeadData[nWhatconvertsFieldID]+" || value : "+nWhatconvertsLeadData[nWhatconvertsFieldID]+" || isThereValue : "+isThereValue(nWhatconvertsLeadData[nWhatconvertsFieldID]) });
                                    if(typeof nWhatconvertsLeadData[nWhatconvertsFieldID] == "object")
                                    {
                                        if(Array.isArray(nWhatconvertsLeadData[nWhatconvertsFieldID]))
                                        {
                                            if(nWhatconvertsLeadData[nWhatconvertsFieldID].length > 0) {
                                                log.debug({ title: strDebugTitle, details: nWhatconvertsFieldID+" || nWhatconvertsFieldID ("+nWhatconvertsLeadData[nWhatconvertsFieldID].length+") : "+JSON.stringify(nWhatconvertsLeadData[nWhatconvertsFieldID]) });
                                            }
                                        }
                                        else if(isThereValue(nWhatconvertsLeadData[nWhatconvertsFieldID]))
                                        {
                                            log.debug({ title: strDebugTitle, details: "object ("+Object.keys(nWhatconvertsLeadData[nWhatconvertsFieldID]).length+") : "+JSON.stringify(nWhatconvertsLeadData[nWhatconvertsFieldID]) });
                                            if(Object.keys(nWhatconvertsLeadData[nWhatconvertsFieldID]).length > 0)
                                            {
                                                for(var nWhatconvertsSubFieldID in nWhatconvertsLeadData[nWhatconvertsFieldID])
                                                {
                                                    if(isThereValue(nWhatconvertsLeadData[nWhatconvertsFieldID][nWhatconvertsSubFieldID]))
                                                    {
                                                        if(nWhatconvertsWebhookFields[nWhatconvertsFieldID][nWhatconvertsSubFieldID])
                                                        {
                                                            if(isThereValue(nWhatconvertsWebhookFields[nWhatconvertsFieldID][nWhatconvertsSubFieldID]["ns_id"]))
                                                            {
                                                                var nWhatconvertsLeadRecordObjField = objWhatconvertsLeadRecord.getField({ fieldId: nWhatconvertsWebhookFields[nWhatconvertsFieldID][nWhatconvertsSubFieldID]["ns_id"] });
                                                                log.debug({ title: strDebugTitle, details: "("+nWhatconvertsFieldID+") nWhatconvertsLeadRecordObjField : "+JSON.stringify(nWhatconvertsLeadRecordObjField) });
                                                                if(isThereValue(nWhatconvertsLeadRecordObjField))
                                                                {
                                                                    if(nWhatconvertsLeadRecordObjField.type == "select")
                                                                    {
                                                                        var nObjFieldOptions = nWhatconvertsLeadRecordObjField.getSelectOptions({ filter : nWhatconvertsLeadData[nWhatconvertsFieldID][nWhatconvertsSubFieldID], operator : "contains" });
                                                                        log.debug({ title: strDebugTitle, details: "("+nWhatconvertsFieldID+") nObjFieldOptions ("+nObjFieldOptions.length+") : "+JSON.stringify(nObjFieldOptions) });
                                                                        if(nObjFieldOptions.length > 0) {
                                                                            log.debug({title: strDebugTitle, details: "setValue({ fieldId: "+nWhatconvertsLeadRecordObjField.id+", value: "+nObjFieldOptions[0].value+" })" });
                                                                            objWhatconvertsLeadRecord.setValue(nWhatconvertsLeadRecordObjField.id, nObjFieldOptions[0].value);
                                                                        }
                                                                    }
                                                                    else if(nWhatconvertsLeadRecordObjField.type == "date")
                                                                    {
                                                                        var nDateFieldValue = getJSDateFormat(nWhatconvertsLeadData[nWhatconvertsFieldID][nWhatconvertsSubFieldID], nDateFormat);
                                                                        if(isThereValue(nDateFieldValue)) {
                                                                            log.debug({title: strDebugTitle, details: "setText({ fieldId: "+nWhatconvertsLeadRecordObjField.id+", text: "+nDateFieldValue+" })" });
                                                                            objWhatconvertsLeadRecord.setText(nWhatconvertsLeadRecordObjField.id, nDateFieldValue);
                                                                        }
                                                                    }
                                                                    else if(nWhatconvertsLeadRecordObjField.type == "timeofday") {
                                                                        log.debug({title: strDebugTitle, details: "setText({ fieldId: "+nWhatconvertsLeadRecordObjField.id+", text: "+nWhatconvertsLeadData[nWhatconvertsFieldID][nWhatconvertsSubFieldID]+" })" });
                                                                        objWhatconvertsLeadRecord.setText(nWhatconvertsLeadRecordObjField.id, nWhatconvertsLeadData[nWhatconvertsFieldID][nWhatconvertsSubFieldID]);
                                                                    } else {
                                                                        log.debug({title: strDebugTitle, details: "setValue({ fieldId: "+nWhatconvertsLeadRecordObjField.id+", value: "+nWhatconvertsLeadData[nWhatconvertsFieldID][nWhatconvertsSubFieldID]+" })" });
                                                                        objWhatconvertsLeadRecord.setValue(nWhatconvertsLeadRecordObjField.id, nWhatconvertsLeadData[nWhatconvertsFieldID][nWhatconvertsSubFieldID]);
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    else if(isThereValue(nWhatconvertsLeadData[nWhatconvertsFieldID]))
                                    {
                                        if(nWhatconvertsWebhookFields[nWhatconvertsFieldID])
                                        {
                                            if(isThereValue(nWhatconvertsWebhookFields[nWhatconvertsFieldID]["ns_id"]))
                                            {
                                                var nWhatconvertsLeadRecordObjField = objWhatconvertsLeadRecord.getField({ fieldId: nWhatconvertsWebhookFields[nWhatconvertsFieldID]["ns_id"] });
                                                log.debug({ title: strDebugTitle, details: "("+nWhatconvertsFieldID+") nWhatconvertsLeadRecordObjField : "+JSON.stringify(nWhatconvertsLeadRecordObjField) });
                                                if(isThereValue(nWhatconvertsLeadRecordObjField))
                                                {
                                                    if(nWhatconvertsLeadRecordObjField.type == "select")
                                                    {
                                                        var nObjFieldOptions = nWhatconvertsLeadRecordObjField.getSelectOptions({ filter : nWhatconvertsLeadData[nWhatconvertsFieldID], operator : "contains" });
                                                        log.debug({ title: strDebugTitle, details: "("+nWhatconvertsFieldID+") nObjFieldOptions ("+nObjFieldOptions.length+") : "+JSON.stringify(nObjFieldOptions) });
                                                        if(nObjFieldOptions.length > 0) {
                                                            log.debug({title: strDebugTitle, details: "setValue({ fieldId: "+nWhatconvertsLeadRecordObjField.id+", value: "+nObjFieldOptions[0].value+" })" });
                                                            objWhatconvertsLeadRecord.setValue(nWhatconvertsLeadRecordObjField.id, nObjFieldOptions[0].value);
                                                        }
                                                    }
                                                    else if(nWhatconvertsLeadRecordObjField.type == "date")
                                                    {
                                                        var nDateFieldValue = getJSDateFormat(nWhatconvertsLeadData[nWhatconvertsFieldID], nDateFormat);
                                                        if(isThereValue(nDateFieldValue)) {
                                                            log.debug({title: strDebugTitle, details: "setText({ fieldId: "+nWhatconvertsLeadRecordObjField.id+", text: "+nDateFieldValue+" })" });
                                                            objWhatconvertsLeadRecord.setText(nWhatconvertsLeadRecordObjField.id, nDateFieldValue);
                                                        }
                                                    }
                                                    else if(nWhatconvertsLeadRecordObjField.type == "timeofday") {
                                                        log.debug({title: strDebugTitle, details: "setText({ fieldId: "+nWhatconvertsLeadRecordObjField.id+", text: "+nWhatconvertsLeadData[nWhatconvertsFieldID]+" })" });
                                                        objWhatconvertsLeadRecord.setText(nWhatconvertsLeadRecordObjField.id, nWhatconvertsLeadData[nWhatconvertsFieldID]);
                                                    }
                                                    else
                                                    {
                                                        if((nWhatconvertsFieldID == "date_created") && (nWhatconvertsLeadRecordObjField.id == "custrecord_gc_wc_date"))
                                                        {
                                                            var nDateFieldValue = getJSDateFormat(nWhatconvertsLeadData[nWhatconvertsFieldID], nDateFormat);
                                                            if(isThereValue(nDateFieldValue)) {
                                                                log.debug({title: strDebugTitle, details: "setText({ fieldId: "+nWhatconvertsLeadRecordObjField.id+", text: "+nDateFieldValue+" })" });
                                                                objWhatconvertsLeadRecord.setText(nWhatconvertsLeadRecordObjField.id, nDateFieldValue);
                                                            }
                                                        } else {
                                                            log.debug({title: strDebugTitle, details: "setValue({ fieldId: "+nWhatconvertsLeadRecordObjField.id+", value: "+nWhatconvertsLeadData[nWhatconvertsFieldID]+" })" });
                                                            objWhatconvertsLeadRecord.setValue(nWhatconvertsLeadRecordObjField.id, nWhatconvertsLeadData[nWhatconvertsFieldID]);
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
    
                                // Create Object For Customer record
                                if(Object.keys(nWhatconvertsWebhookFields["whatconverts_for_customer_fields"]).length > 0)
                                {
                                    for(var nWhatconvertsForCustomerFieldID in nWhatconvertsWebhookFields["whatconverts_for_customer_fields"])
                                    {
                                        if(nWhatconvertsForCustomerFieldID == "today") {
                                            nWhatConvertsLeadObjectData[nWhatconvertsForCustomerFieldID] = getCurrentDate();
                                        }
                                        else if(isThereValue(nWhatconvertsWebhookFields["whatconverts_for_customer_fields"][nWhatconvertsForCustomerFieldID]["ns_id"])) {
                                            nWhatConvertsLeadObjectData[nWhatconvertsForCustomerFieldID] = objWhatconvertsLeadRecord.getValue(nWhatconvertsWebhookFields["whatconverts_for_customer_fields"][nWhatconvertsForCustomerFieldID]["ns_id"]);
                                        }
                                    }
                                }
    
                                // Save the record if it was created or updated.
                                var nWhatconvertsLeadRecordID = objWhatconvertsLeadRecord.save();
                                log.debug({ title: strDebugTitle, details: "nWhatconvertsLeadRecordID : "+nWhatconvertsLeadRecordID });
                                if(isThereValue(nWhatconvertsLeadRecordID)) {
                                    nWhatConvertsLeadObjectData["id"] = nWhatconvertsLeadRecordID;
                                }
                            }
    
                            // Update WhatConverts and respective Customer
                            if(Object.keys(nWhatConvertsLeadObjectData).length > 0)
                            {
                                log.debug({ title: strDebugTitle, details: "nWhatConvertsLeadObjectData ("+Object.keys(nWhatConvertsLeadObjectData).length+") : "+JSON.stringify(nWhatConvertsLeadObjectData) });
                                var nUpdatedWhatConvertsAndCustomerRecord = updateWhatConvertsAndCustomerRecord(nWhatConvertsLeadObjectData);
                                log.debug({ title: strDebugTitle, details: "nUpdatedWhatConvertsAndCustomerRecord : "+JSON.stringify(nUpdatedWhatConvertsAndCustomerRecord) });
                                if(nUpdatedWhatConvertsAndCustomerRecord["customer"].length > 0)
                                {
                                    var nLookupWhatConvertsLeadFields = search.lookupFields({ type: "customrecord_gc_what_converts_leads", id: nWhatConvertsLeadObjectData["id"], columns: ["custrecord_gc_wc_lead_customer_record"] });
                                    log.debug({ title: strDebugTitle, details: "nLookupWhatConvertsLeadFields : "+JSON.stringify(nLookupWhatConvertsLeadFields) });
                                    if(nLookupWhatConvertsLeadFields["custrecord_gc_wc_lead_customer_record"])
                                    {
                                        var nCustomerWhatConvertsLeadRecordIDs = nLookupWhatConvertsLeadFields["custrecord_gc_wc_lead_customer_record"].value;
                                        if(isThereValue(nCustomerWhatConvertsLeadRecordIDs))
                                        {
                                            var nCustomerWhatConvertsLeadRecordIDValues = nCustomerWhatConvertsLeadRecordIDs.toString().split(",");
                                            var nCustomerWhatConvertsLeadRecordIDsData = nUpdatedWhatConvertsAndCustomerRecord["customer"];
                                            nCustomerWhatConvertsLeadRecordIDsData = nCustomerWhatConvertsLeadRecordIDsData.concat(nCustomerWhatConvertsLeadRecordIDValues);
                                            log.debug({ title: strDebugTitle, details: "nCustomerWhatConvertsLeadRecordIDsData ("+nCustomerWhatConvertsLeadRecordIDsData.length+") : "+JSON.stringify(nCustomerWhatConvertsLeadRecordIDsData) });
                                            var nSubmittedWhatConvertsLeadRecordID = record.submitFields({
                                                type: "customrecord_gc_what_converts_leads",
                                                id: nWhatConvertsLeadObjectData["id"],
                                                values: {
                                                    "custrecord_gc_wc_lead_customer_record": nUpdatedWhatConvertsAndCustomerRecord["customer"],
                                                    "custrecord_gc_email_dup": nUpdatedWhatConvertsAndCustomerRecord["email_dup"],
                                                    "custrecord_gc_lead_contact_rec_update": true
                                                }
                                            });
                                            log.debug({ title: strDebugTitle, details: "nSubmittedWhatConvertsLeadRecordID : "+nSubmittedWhatConvertsLeadRecordID });
                                        }
                                    }
                                    else
                                    {
                                        var nSubmittedWhatConvertsLeadRecordID = record.submitFields({
                                            type: "customrecord_gc_what_converts_leads",
                                            id: nWhatConvertsLeadObjectData["id"],
                                            values: {
                                                "custrecord_gc_wc_lead_customer_record": nUpdatedWhatConvertsAndCustomerRecord["customer"],
                                                "custrecord_gc_email_dup": nUpdatedWhatConvertsAndCustomerRecord["email_dup"],
                                                "custrecord_gc_lead_contact_rec_update": true
                                            }
                                        });
                                        log.debug({ title: strDebugTitle, details: "nSubmittedWhatConvertsLeadRecordID : "+nSubmittedWhatConvertsLeadRecordID });
                                    }
                                }
                            }
                        }
                    }
                }
    
                // Log the end of execution
                log.debug({title: strDebugTitle, details: '================ END ================' });
            }
            catch (err) { // Catch and log any errors that occur during execution
                log.error({ title: strDebugTitle+" Error", details: JSON.stringify({ error: { code: err.name, message: err.message } }) });
            }
        }
        
        /**
         * Retrieves an existing "WhatConverts Lead" record based on lead ID and type.
         * Returns an object with a flag and the record ID if found.
         *
         * @param {string} nWhatconvertsLeadID - ID of the lead from the webhook
         * @param {string} nWhatconvertsLeadType - Type of the lead
         * @returns {Object} - Object containing flag (found or not) and record ID
         **/
        function getExistingWhatconvertsLeadRecord(nWhatconvertsLeadID, nWhatconvertsLeadType)
        {
            var rtnData = { "flg": false, "recId": "" };
            try
            {
                var nWhatconvertsLeadsSearchResults = search.create({
                    type: "customrecord_gc_what_converts_leads",
                    filters: [
                        ["custrecord_gc_wc_lead_id", "is", nWhatconvertsLeadID], 
                        "AND", 
                        ["custrecord_gc_wc_lead_type", "is", nWhatconvertsLeadType]
                    ],
                    columns: [
                        search.createColumn({name: "internalid", label: "Internal ID"}),
                        search.createColumn({name: "name", label: "Name"}),
                        search.createColumn({name: "created", sort: search.Sort.DESC, label: "Date Created"})
                    ]
                }).run().getRange({start:0, end:1000});
                log.debug({ title: strDebugTitle, details: "nWhatconvertsLeadsSearchResults : "+nWhatconvertsLeadsSearchResults.length });
    
                // If at least one result is found, update the return data
                if (nWhatconvertsLeadsSearchResults.length > 0)
                {
                    rtnData["flg"] = true;
                    rtnData["recId"] = nWhatconvertsLeadsSearchResults[0].getValue({ name: "internalid" });
                }
            }
            catch (err) { // Catch and log any errors that occur during the search
                log.error({ title: strDebugTitle+" (getExistingWhatconvertsLeadRecord) Error", details: JSON.stringify({ error: { code: err.name, message: err.message } }) });
            }
            return rtnData;
        }
    
        /**
         * Function to update customer records based on WhatConverts lead data.
         * @param {Object} nWhatConvertsLeadObjectData - The lead data from WhatConverts.
         * @returns {Object} Contains updated customer records and a flag for duplicate email detection.
         * @description
         *   - Filters and retrieves customer records based on email or phone from the lead data.
         *   - Updates customer records with WhatConverts information if lead status is unique.
         *   - Logs errors and handles edge cases for missing data.
         */
        function updateWhatConvertsAndCustomerRecord(nWhatConvertsLeadObjectData)
        {
            var rtnData = { "customer": [], "email_dup": false };
            try
            {
                var nFilters = [];
                if(nWhatConvertsLeadObjectData["lead_type"] == "Web Form")
                {
                    if(isThereValue(nWhatConvertsLeadObjectData["contact_email_address"]))
                    {
                        nFilters.push(["email", "is", nWhatConvertsLeadObjectData["contact_email_address"]]);
                        nFilters.push("AND");
                        nFilters.push(["isinactive", "is", "F"]);
                    }
                }
                else if(nWhatConvertsLeadObjectData["lead_type"] == "Phone Call")
                {
                    if(isThereValue(nWhatConvertsLeadObjectData["contact_phone_number"]))
                    {
                        var mFilters = []
                        var nFormatPhoneNumbers = getFormatPhoneNumbers(nWhatConvertsLeadObjectData["contact_phone_number"]);
                        log.debug({ title: strDebugTitle, details: "nFormatPhoneNumbers ("+nFormatPhoneNumbers.length+") : "+JSON.stringify(nFormatPhoneNumbers) });
                        if(nFormatPhoneNumbers.length > 0)
                        {
                            for(var ftr=0; ftr<nFormatPhoneNumbers.length; ftr++)
                            {
                                if(nFormatPhoneNumbers.length == 1) {
                                    mFilters.push(["phone", "contains", nFormatPhoneNumbers[ftr]]);
                                }
                                else
                                {
                                    if(ftr == nFormatPhoneNumbers.length-1) {
                                        mFilters.push(["phone", "contains", nFormatPhoneNumbers[ftr]]);
                                    } else {
                                        mFilters.push(["phone", "contains", nFormatPhoneNumbers[ftr]]);
                                        mFilters.push("OR");
                                    }
                                }
                            }
                        }
                        if(mFilters.length > 0)
                        {
                            nFilters.push(mFilters);
                            nFilters.push("AND");
                            nFilters.push(["isinactive", "is", "F"]);
                        }
                    }
                }
                else if((isThereValue(nWhatConvertsLeadObjectData["contact_email_address"])) || (isThereValue(nWhatConvertsLeadObjectData["contact_phone_number"])))
                {
                    if(isThereValue(nWhatConvertsLeadObjectData["contact_email_address"]))
                    {
                        nFilters.push(["email", "is", nWhatConvertsLeadObjectData["contact_email_address"]]);
                        nFilters.push("AND");
                        nFilters.push(["isinactive", "is", "F"]);
                    }
                    else if(isThereValue(nWhatConvertsLeadObjectData["contact_phone_number"]))
                    {
                        var mFilters = []
                        var nFormatPhoneNumbers = getFormatPhoneNumbers(nWhatConvertsLeadObjectData["contact_phone_number"]);
                        log.debug({ title: strDebugTitle, details: "nFormatPhoneNumbers ("+nFormatPhoneNumbers.length+") : "+JSON.stringify(nFormatPhoneNumbers) });
                        if(nFormatPhoneNumbers.length > 0)
                        {
                            for(var ftr=0; ftr<nFormatPhoneNumbers.length; ftr++)
                            {
                                if(nFormatPhoneNumbers.length == 1) {
                                    mFilters.push(["phone", "contains", nFormatPhoneNumbers[ftr]]);
                                }
                                else
                                {
                                    if(ftr == nFormatPhoneNumbers.length-1) {
                                        mFilters.push(["phone", "contains", nFormatPhoneNumbers[ftr]]);
                                    } else {
                                        mFilters.push(["phone", "contains", nFormatPhoneNumbers[ftr]]);
                                        mFilters.push("OR");
                                    }
                                }
                            }
                        }
                        if(mFilters.length > 0)
                        {
                            nFilters.push(mFilters);
                            nFilters.push("AND");
                            nFilters.push(["isinactive", "is", "F"]);
                        }
                    }
                }
                log.debug({ title: strDebugTitle, details: "nFilters ("+nFilters.length+") : "+JSON.stringify(nFilters) });
                if(nFilters.length > 0)
                {
                    var nCustomerSearchResults = search.create({
                        type: "customer",
                        filters: nFilters,
                        columns: [ "internalid", "stage", "entityid", "email", "phone", "isinactive", "custentity_gc_what_converts_info"]
                    }).run().getRange({start:0,end:1000});
                    log.debug({ title: strDebugTitle, details: "nCustomerSearchResults ("+nCustomerSearchResults.length+") : "+JSON.stringify(nCustomerSearchResults) });
                    if(nCustomerSearchResults.length > 0)
                    {
                        for(var index in nCustomerSearchResults)
                        {
                            var nRecordID = nCustomerSearchResults[index].getValue(nCustomerSearchResults[index].columns[0]);
                            var nRecordType = nCustomerSearchResults[index].getValue(nCustomerSearchResults[index].columns[1]);
                            var nExWhatconvertsRecords = nCustomerSearchResults[index].getValue(nCustomerSearchResults[index].columns[6]);
                            if(isThereValue(nRecordID) && isThereValue(nRecordType))
                            {
                                if(nWhatConvertsLeadObjectData["lead_type"] == "Web Form" /*&& nWhatConvertsLeadObjectData["lead_status"] == "Unique"*/)
                                {
                                    var nSubmittedCustomerRecordID = record.submitFields({
                                        type: nRecordType.toString().toLowerCase(),
                                        id: nRecordID,
                                        values: {
                                            "custentity_gc_what_converts_info": nExWhatconvertsRecords,
                                            "custentity_ajc_utm_campaign_source": isThereValue(nWhatConvertsLeadObjectData["lead_source"]) ? nWhatConvertsLeadObjectData["lead_source"] : null,
                                            "custentity_ajc_utm_campaign_medium": isThereValue(nWhatConvertsLeadObjectData["lead_medium"]) ? nWhatConvertsLeadObjectData["lead_source"] : null,
                                            "custentity_mb_lead_url": isThereValue(nWhatConvertsLeadObjectData["lead_url"]) ? nWhatConvertsLeadObjectData["lead_url"] : null,
                                            "custentity_mb_landing_page_url": isThereValue(nWhatConvertsLeadObjectData["landing_url"]) ? nWhatConvertsLeadObjectData["landing_url"] : null,
                                            "custentity_ajc_utm_name": isThereValue(nWhatConvertsLeadObjectData["lead_campaign"]) ? nWhatConvertsLeadObjectData["lead_campaign"] : null
                                        }
                                    });
                                    log.debug({ title: strDebugTitle, details: "("+index+") nSubmittedCustomerRecordID : "+nSubmittedCustomerRecordID });
                                    if(isThereValue(nSubmittedCustomerRecordID)) {
                                        rtnData["customer"].push(nSubmittedCustomerRecordID);
                                    }
                                }
                                else if(nWhatConvertsLeadObjectData["lead_type"] == "Phone Call" /*&& nWhatConvertsLeadObjectData["lead_status"] == "Unique"*/  )
                                {
                                    var nSubmittedCustomerRecordID = record.submitFields({
                                        type: nRecordType.toString().toLowerCase(),
                                        id: nRecordID,
                                        values: {
                                            "custentity_gc_what_converts_info": nExWhatconvertsRecords,
                                            "custentity_mb_call_tracking_name": isThereValue(nWhatConvertsLeadObjectData["street_address"]) ? nWhatConvertsLeadObjectData["street_address"] : null
                                        }
                                    });
                                    log.debug({ title: strDebugTitle, details: "("+index+") nSubmittedCustomerRecordID : "+nSubmittedCustomerRecordID });
                                    if(isThereValue(nSubmittedCustomerRecordID)) {
                                        rtnData["customer"].push(nSubmittedCustomerRecordID);
                                    }
                                }
                                else if(nWhatConvertsLeadObjectData["lead_status"] == "Unique")
                                {
                                    var nSubmittedCustomerRecordID = record.submitFields({
                                        type: nRecordType.toString().toLowerCase(),
                                        id: nRecordID,
                                        values: {
                                            "custentity_gc_what_converts_info": nExWhatconvertsRecords
                                        }
                                    });
                                    log.debug({ title: strDebugTitle, details: "("+index+") nSubmittedCustomerRecordID : "+nSubmittedCustomerRecordID });
                                    if(isThereValue(nSubmittedCustomerRecordID)) {
                                        rtnData["customer"].push(nSubmittedCustomerRecordID);
                                    }
                                }  
                            }
                        }
                        if(nCustomerSearchResults.length > 1) {
                            rtnData["email_dup"] = true;
                        }
                    }
                }
            }
            catch (err) { // Catch and log any errors during formatting
                log.error({ title: strDebugTitle+" (updateWhatConvertsAndCustomerRecord) Error", details: JSON.stringify({ error: { code: err.name, message: err.message } }) });
            }
            return rtnData;
        }
    
        /**
         * Function to format phone numbers into various standardized formats.
         * @param {string} nPhoneNumber - The phone number to be formatted.
         * @returns {Array} An array containing formatted phone numbers:
         *   [Original, Without country code, US format, International format]
         * @description
         *   - Formats the phone number by removing the country code and restructuring it.
         *   - Returns multiple versions including original, formatted US, and international formats.
         *   - Logs errors if any issues occur during formatting.
         */
        function getFormatPhoneNumbers(nPhoneNumber)
        {
            var rtnData = [];
            try
            {
                var nPhoneNumber1 = nPhoneNumber;
                var nPhoneNumber2 = nPhoneNumber.replaceAll('+1', '')
                var p = nPhoneNumber2.split('');
                var nPhoneNumber3 = '('+p[0]+p[1]+p[2]+') '+p[3]+p[4]+p[5]+'-'+p[6]+p[7]+p[8]+p[9];
                var nPhoneNumber4 = '+1 '+nPhoneNumber3;
                rtnData.push(nPhoneNumber1);
                rtnData.push(nPhoneNumber2);
                rtnData.push(nPhoneNumber3);
                rtnData.push(nPhoneNumber4);
            }
            catch (err) { // Catch and log any errors during formatting
                log.error({ title: strDebugTitle+" (getFormatPhoneNumbers) Error", details: JSON.stringify({ error: { code: err.name, message: err.message } }) });
            }
            return rtnData;
        }
        
        /**
         * Formats a date-time string into a user-friendly format.
         *
         * @param {string} nDateTime - Original date-time string
         * @returns {string} - Formatted date-time string
         **/
        function getFormatDateTime(nDateTime)
        {
            var rtnData = "";
            try
            {
                var nDate = new Date(nDateTime);
                var nOptions = {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    timeZone: 'America/New_York',
                    timeZoneName: 'short'
                };
                rtnData = nDate.toLocaleString('en-US', nOptions);
            }
            catch (err) { // Catch and log any errors during formatting
                log.error({ title: strDebugTitle+" (getFormatDateTime) Error", details: JSON.stringify({ error: { code: err.name, message: err.message } }) });
            }
            return rtnData;
        }
        
        /**
         * Function to get the current date in MM/DD/YYYY format.
         * @returns {string} The current date as a formatted string.
         * @description
         *   - Retrieves the current UTC date.
         *   - Formats the date components to always have two digits for month and day.
         *   - Handles any errors and logs them if formatting fails.
         */
        function getCurrentDate()
        {
            var rtnData = "";
            try
            {
                var nToday = new Date();
                var nMonth = (nToday.getUTCMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
                var nDay = nToday.getUTCDate().toString().padStart(2, '0');
                var nYear = nToday.getUTCFullYear();
                rtnData = nMonth + '/' + nDay + '/' + nYear;
            }
            catch (err) { // Catch and log any errors during formatting
                log.error({ title: strDebugTitle+" (getCurrentDate) Error", details: JSON.stringify({ error: { code: err.name, message: err.message } }) });
            }
            return rtnData;
        }
    
        /**
         * Converts a date string into the NetSuite user's preferred format.
         *
         * @param {string} nDate - Date string in ISO format
         * @param {string} nDateFormat - User's preferred date format
         * @returns {string} - Formatted date string
         **/
        function getJSDateFormat(nDate, nDateFormat)
        {
            var rtnData = "";
            try
            {
                var nStrDate = nDate.toString().split("T")[0]; //YYYY-MM-DD
                var nSplitDate = nStrDate.split("-");
                var nYYYY = nSplitDate[0];
                var nMM = nSplitDate[1];
                var nDD = nSplitDate[2];
                
                // Various date formats based on user preferences
                if(nDateFormat == "M/D/YYYY" || nDateFormat == "MM/DD/YYYY") {
                    rtnData = nMM+"/"+nDD+"/"+nYYYY;
                }
                if(nDateFormat == "D/M/YYYY" || nDateFormat == "DD/MM/YYYY") {
                    rtnData = nDD+"/"+nMM+"/"+nYYYY;
                }
                if(nDateFormat == "D-Mon-YYYY" || nDateFormat == "DD-Mon-YYYY")
                {
                    var nMonths = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                    rtnData = nDD+"-"+nMonths[Number(nMM)]+"-"+nYYYY;
                }
                if(nDateFormat == "D.M.YYYY" || nDateFormat == "DD.MM.YYYY") {
                    rtnData = nDD+"."+nMM+"."+nYYYY;
                }
                if(nDateFormat == "D-MONTH-YYYY" || nDateFormat == "DD-MONTH-YYYY")
                {
                    var nMonths = ['', 'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE','JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
                    rtnData = nDD+"-"+nMonths[Number(nMM)]+"-"+nYYYY;
                }
                if(nDateFormat == "D MONTH, YYYY" || nDateFormat == "DD MONTH, YYYY")
                {
                    var nMonths = ['', 'JANUARY,', 'FEBRUARY,', 'MARCH,', 'APRIL,', 'MAY,', 'JUNE,','JULY,', 'AUGUST,', 'SEPTEMBER,', 'OCTOBER,', 'NOVEMBER,', 'DECEMBER,'];
                    rtnData = nDD+" "+nMonths[Number(nMM)]+", "+nYYYY;
                }
                if(nDateFormat == "YYYY/M/D" || nDateFormat == "YYYY/MM/DD") {
                    rtnData = nYYYY+"/"+nMM+"/"+nDD;
                }
                if(nDateFormat == "YYYY-M-D" || nDateFormat == "YYYY-MM-DD") {
                    rtnData = nStrDate;
                }
            }
            catch(err) { // Catch and log any errors during formatting
                log.error({ title: strDebugTitle+" (getJSDateFormat) Error", details: JSON.stringify({ error: { code: err.name, message: err.message } }) });
            }
            return rtnData;
        }
    
        /**
         * Checks if a value exists
         *
         * @param {any} value - The value to check
         * @returns {Boolean} - True if value exists, false otherwise
         */
        function isThereValue(value)
        {
            if (value != null && value != 'null' && value != '' && value != undefined && value != 'undefined' && value != 'NaN' && value != ' ') {
                return true;
            } else if (typeof value == "number" && value == 0) {
                return true;
            } else {
                return false;
            }
        }
        return {
            onRequest: onRequest
        };
    });