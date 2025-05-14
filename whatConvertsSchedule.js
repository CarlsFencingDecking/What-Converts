/**
 * @NApiVersion 2.x
 * @NScriptType ScheduledScript
 */
define(['N/https', 'N/log', 'N/encode', 'N/search', 'N/record', 'N/ui/serverWidget'], function(https, log, encode, search, record, ui) {

    function execute(context) {

        try {

            function getEmptyString() {
                return String();
            }
            const ES = getEmptyString();

            var what_converts_credentials = record.load({
                type: 'customrecord_gc_wc_api_cred',
                id: 1
            });

            var apiUrl = what_converts_credentials.getValue({fieldId: 'custrecord_gc_api_url'});
            var token = what_converts_credentials.getValue({fieldId: 'custrecord_gc_wc_token'});
            var secret = what_converts_credentials.getValue({fieldId: 'custrecord_gc_wc_secret'});

            var credentials = token + ':' + secret;
            var encodedCredentials = encode.convert({
                string: credentials,
                inputEncoding: encode.Encoding.UTF_8,
                outputEncoding: encode.Encoding.BASE_64
            });

            var allLeads = [];
            var pageNumber = 1;
            var leadsPerPage = 25;
            var totalPages = 1;
            var totalLeadsFetched = 0;
            var maxLeadsToFetch = 500; 
            
            
            function getLocalIsoString() {
                var now = new Date();
                var year = now.getFullYear();
                var month = String(now.getMonth() + 1).padStart(2, '0');
                var day = String(now.getDate()).padStart(2, '0');
                var hours = String(now.getHours()).padStart(2, '0');
                var minutes = String(now.getMinutes()).padStart(2, '0');
                var seconds = String(now.getSeconds()).padStart(2, '0');

                return year + '-' + month + '-' + day + 'T' + hours + ':' + minutes + ':' + seconds + 'Z';
            }
            
            var startDate = getLocalIsoString().split('T')[0];
            log.debug('start date', startDate)
            
            // API headers
            var headers = {
                'Authorization': 'Basic ' + encodedCredentials,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            };
            
            while (pageNumber <= totalPages && totalLeadsFetched < maxLeadsToFetch) {
                var response = https.get({
                    url: apiUrl + '?page_number=' + pageNumber + 
                            '&leads_per_page=' + leadsPerPage + 
                            '&start_date=' + startDate, 
                    headers: headers
                });
    
            
                var leadsData = JSON.parse(response.body);
            
                if (leadsData && Array.isArray(leadsData.leads)) {
          
                    var todaysLeads = leadsData.leads.filter(function(lead) {
                        if (lead.date_created) {  
                            var leadDate = lead.date_created.split('T')[0]; 
                            return leadDate === startDate;  
                        } else {
                            return false;  
                        }
                    });
            
                    allLeads = allLeads.concat(todaysLeads);
                    totalLeadsFetched = allLeads.length;
                    pageNumber++;
                    totalPages = leadsData.total_pages;
                } else {
                    log.error({
                        title: 'API Response Format Error',
                        details: 'Unexpected response format or missing leads data.'
                    });
                    break;
                }
            
                if (totalLeadsFetched >= maxLeadsToFetch) {
                    log.debug({
                        title: 'Max Leads Fetched',
                        details: 'Reached the limit of ' + maxLeadsToFetch + ' leads'
                    });
                    break;
                }
            }

          

            var leadDetails = allLeads.map(function(lead) {
                return {
                    LeadID: lead.lead_id || null,
                    AccountID: lead.account_id || null,
                    ProfileID: lead.profile_id || null,
                    Profile: lead.profile || null,
                    UserID: lead.user_id || null,
                    LeadType: lead.lead_type || null,
                    LeadStatus: lead.lead_status || null,
                    DateCreated: lead.date_created || null,
                    Quotable: lead.quotable || null,
                    SpottedKeywords: lead.spotted_keywords || null,
                    LeadScore: lead.lead_score || null,
                    LeadState: lead.lead_state || null,
                    LeadSource: lead.lead_source || null,
                    LeadMedium: lead.lead_medium || null,
                    LeadCampaign: lead.lead_campaign || null,
                    LeadContent: lead.lead_content || null,
                    LeadKeyword: lead.lead_keyword || null,
                    LeadURL: lead.lead_url || null,
                    LandingURL: lead.landing_url || null,
                    OperatingSystem: lead.operating_system || null,
                    Browser: lead.browser || null,
                    DeviceType: lead.device_type || null,
                    DeviceMake: lead.device_make || null,
                    Spam: lead.spam || null,
                    Duplicate: lead.duplicate || null,
                    TrackingNumber: lead.tracking_number || null,
                    DestinationNumber: lead.destination_number || null,
                    CallerCountry: lead.caller_country || null,
                    CallerState: lead.caller_state || null,
                    CallerZip: lead.caller_zip || null,
                    CallerName: lead.caller_name || null,
                    CallDuration: lead.call_duration || null,
                    CallDurationSeconds: lead.call_duration_seconds || null,
                    CallerCity: lead.caller_city || null,
                    AnswerStatus: lead.answer_status || null,
                    CallStatus: lead.call_status || null,
                    LineType: lead.line_type || null,
                    CallerNumber: lead.caller_number || null,
                    PhoneName: lead.phone_name || null,
                    Message: lead.message || null,
                    IPAddress: lead.ip_address || null,
                    Notes: lead.notes || null,
                    ContactName: lead.contact_name || null,
                    ContactCompanyName: lead.contact_company_name || null,
                    ContactEmailAddress: lead.contact_email_address || null,
                    ContactPhoneNumber: lead.contact_phone_number || null,
                    EmailAddress: lead.email_address || null,
                    PhoneNumber: lead.phone_number || null,
                    Gclid: lead.gclid || null,
                    Msclkid: lead.msclkid || null,
                    UnbouncePageID: lead.unbounce_page_id || null,
                    UnbounceVariantID: lead.unbounce_variant_id || null,
                    UnbounceVisitorID: lead.unbounce_visitor_id || null,
                    SalesforceUserID: lead.salesforce_user_id || null,
                    RoistatVisitID: lead.roistat_visit_id || null,
                    HubspotVisitorID: lead.hubspot_visitor_id || null,
                    FacebookBrowserID: lead.facebook_browser_id || null,
                    FacebookClickID: lead.facebook_click_id || null,
                    VwoAccountID: lead.vwo_account_id || null,
                    VwoExperimentID: lead.vwo_experiment_id || null,
                    VwoVariantID: lead.vwo_variant_id || null,
                    VwoUserID: lead.vwo_user_id || null,
                    GoogleAnalyticsClientID: lead.google_analytics_client_id || null,
                    LeadAnalysis: lead.lead_analysis || null,
                    AdditionalFields: lead.additional_fields || null,
                    FieldMappings: lead.field_mappings || null,
                    CustomerJourney: lead.customer_journey || null,
                    Recording: lead.recording || null,
                    PlayRecording: lead.play_recording || null,
                    Voicemail: lead.voicemail || null,
                    PlayVoicemail: lead.play_voicemail || null,
                    CallTranscription: lead.call_transcription || null,
                    VoicemailTranscription: lead.voicemail_transcription,
                    FormName: lead.form_name || null
                };
            });

            log.debug('leads from '+startDate, leadDetails.length)
            var submissions = [];
            leadDetails.forEach(function(lead , x){

                if(lead.LeadType == 'Web Form'){
                    var additional_fields = lead.AdditionalFields;
                    var additional_fields_keys = Object.keys(additional_fields);
                    var additional_fields_values = Object.values(additional_fields);

                    var obj = {};
                    additional_fields_keys.forEach(function(a, i){
                        var cleanedKey;
                        if(a === '*'){
                            cleanedKey = 'Job'
                        }else {
                            cleanedKey = a.replaceAll('*', '').replaceAll('Phone No', 'Phone').replaceAll('Email Address', "Email").replaceAll('E-mail', "Email")
                            .replaceAll('Phone Number', 'Phone').replaceAll('What are you looking for?', 'Job').replaceAll('Description of Work to be Completed', 'Job')
                            .replaceAll('Project Time Frame', 'Time').replaceAll('Street Address', 'Street').replaceAll('Zipcode', 'Zip').replaceAll('First Name', 'First')
                            .replaceAll('Last Name', 'Last').replaceAll('Ask us any questions or send us a message', 'Job')
                        }

                        obj[cleanedKey] = additional_fields_values[i];
                        
                    });

                    obj.lead_source   = lead.LeadSource;
                    obj.lead_campaign = lead.LeadCampaign;
                    obj.lead_medium   = lead.LeadMedium;
                    obj.lead_url      = lead.LeadURL;
                    obj.landing_url   = lead.LandingURL;
                    obj.lead_keyword  = lead.LeadKeyword;
                    obj.form_name     = lead.FormName;
                    
                    submissions.push(obj);
                }

                
            });

            


            var returned_emails = [];
            var what_converts_report = [];
            var global_unmatched;
            submissions.forEach(function(what_converts, x){

                global_unmatched = what_converts;

                var customerSearch = search.create({
                    type: search.Type.CUSTOMER,
                    filters: [
                        ['email', 'is', what_converts.Email],
                    ],
                    columns: ['internalid', 'entityid', 'email', 'firstname', 'lastname']
                });
        
                var results = customerSearch.run().getRange({ start: 0, end: 100 });

                
                results.forEach(function(c, i){
                    var soft_lead_email = c.getValue('email');
                    var internalid = c.getValue('internalid');
                    var soft_lead = c.getValue('entityid');

                    returned_emails.push(
                        {
                            email: soft_lead_email,
                            id: internalid,
                        }
                    )

                    if(soft_lead_email === what_converts.Email){
                        
                        try{

                            var customerRecord = record.load({
                                type: record.Type.CUSTOMER,
                                id: internalid
                            });


                            customerRecord.setValue({fieldId: 'custentity_ajc_utm_campaign_source', value: what_converts.lead_source });
                            customerRecord.setValue({fieldId: 'custentity_ajc_utm_name', value: what_converts.lead_campaign });
                            customerRecord.setValue({fieldId: 'custentity_ajc_utm_campaign_medium', value: what_converts.lead_medium });
                            customerRecord.setValue({fieldId: 'custentity_mb_landing_page_url', value: what_converts.landing_url });
                            customerRecord.setValue({fieldId: 'custentity_mb_lead_url', value: what_converts.lead_url });
                            customerRecord.setValue({fieldId: 'custentity_ajc_utm_campaign_term', value: what_converts.lead_keyword });

                            what_converts_report.push(
                                {
                                    name: soft_lead,
                                    id: internalid,
                                    report: what_converts,
                                    type: 'Updated Lead Data'

                                }
                            )

                            var customerUpdated = customerRecord.save({
                                enableSourcing: false,
                                ignoreMandatoryFields: true
                            });

                            log.debug('UTM Data Update: '+soft_lead, customerUpdated)

                        }catch(e){
                            log.error(e.message, e)
                        }

                        

                        
                    }
                });

                
            });

            if(returned_emails.length !== 0){

                var returnedEmailList = returned_emails.map(function(e) {
                    return e.email.toLowerCase().trim();
                });
                
                // Filter only the submissions NOT in returned emails
                var unmatchedLeads = submissions.filter(function(submission) {
                    var email = (submission.Email || '').toLowerCase().trim();
                    return email && !returnedEmailList.includes(email);
                });

                
    
                unmatchedLeads.forEach(function(unmatched, x){

                    global_unmatched = unmatched;
    
                    var customerSearch = search.create({
                        type: search.Type.CUSTOMER,
                        filters: [
                            ['firstname', 'is', unmatched.First],
                            'AND',
                            ['lastname', 'is', unmatched.Last]
                        ],
                        columns: ['internalid', 'entityid']
                    });
            
                    var results = customerSearch.run().getRange({ start: 0, end: 100 });
                    var middle = ES;
                    if(results.length > 0){
                        middle = results.length+1;
                    }
                    var newLead = record.create({
                        type: record.Type.LEAD,
                        isDynamic: false,
                    });
    
                    //SET TO SOFT PIZZO LEAD - CLOSED WON
    
                    newLead.setValue({
                        fieldId: 'entitystatus',
                        value: '28'
                    });
                    
                    newLead.setValue({
                        fieldId: 'subsidiary',
                        value: '2'
                    });
    
                    newLead.setValue({
                        fieldId: 'customform',
                        value: '382'
                    });
    
                    newLead.setValue({
                        fieldId: 'custentity_gc_web_lead_generated',
                        value: true
                    });
    
    
    
    
                    //CUSTOMER BASIC INFO
    
                    newLead.setValue({
                        fieldId: 'firstname',
                        value: unmatched.First
                    });
    
                    newLead.setValue({
                        fieldId: 'middlename',
                        value: middle
                    });
    
                    newLead.setValue({
                        fieldId: 'lastname',
                        value: unmatched.Last
                    });
    
    
                    newLead.setValue({
                        fieldId: 'email',
                        value: unmatched.Email
                    });
    
    
                    newLead.setValue({
                        fieldId: 'phone',
                        value: unmatched.Phone
                    });
    
                    newLead.setValue({
                        fieldId: 'custentity_ajc_utm_campaign_source',
                        value: unmatched.lead_source
                    });
    
                    newLead.setValue({
                        fieldId: 'custentity_ajc_utm_campaign_medium',
                        value: unmatched.lead_medium
                    });
    
                    newLead.setValue({
                        fieldId: 'custentity_ajc_utm_name',
                        value: unmatched.lead_campaign
                    });
    
                    newLead.setValue({
                        fieldId: 'custentity_mb_lead_url',
                        value: unmatched.lead_url
                    });
    
                    newLead.setValue({
                        fieldId: 'custentity_mb_landing_page_url',
                        value: unmatched.landing_url
                    });
    
                    newLead.setValue({
                        fieldId: 'custentity_ajc_utm_campaign_term',
                        value: unmatched.lead_keyword
                    });
    
                    //WEB FORM DATA
    
                    newLead.setValue({
                        fieldId: 'custentity_ajc_lead_web_form',
                        value: unmatched.form_name
                    });
    
    
                    var projectMatch = [
                        {id: 1, text: 'Fencing'},
                        {id: 2, text: 'Decking & Railings'},
                        {id: 4, text: 'Pergolas'},
                        {id: 6, text: 'Windows & Doors'},
                        {id: 7, text: 'Gutters & Leaders'},
                        {id: 8, text: 'Designer Structures'},
                        {id: 10, text: 'Storm Damage Repair'},
                        {id: 14, text: 'Other'},
                    ];
    
                    if(unmatched.projectselect){
    
                        try{
    
                            var projectFieldId;
                            projectMatch.forEach(function(p, x){
                                if(p.text === unmatched.projectselect){
                                    projectFieldId = p.id;
                                }else {
                                    projectFieldId = 14;
                                }
                            });
    
                            newLead.setValue({
                                fieldId: 'custentity_ajc_proj_of_interest',
                                value: projectFieldId
                            });
    
    
                        }catch(e){
                            log.error(e.message, e)
                        }
    
                    }
    
    
                    var buyingTimeFrame = [
                        {id: 1, text: 'Next 30 Days'},
                        {id: 2, text: '1-3 Months'},
                        {id: 3, text: '3-6 Months'},
                        {id: 4, text: '6-12 Months'},
                        {id: 5, text: 'Other'},
                    ];
    
                    if(unmatched.Time){
    
                        try{
    
                            var buyingTimeFieldId;
                            buyingTimeFrame.forEach(function(p, x){
                                if(p.text === unmatched.Time){
                                    buyingTimeFieldId = p.id;
                                }else {
                                    buyingTimeFieldId = 5;
                                }
                            });
    
                            newLead.setValue({
                                fieldId: 'custentity_ajc_buying_timeframe',
                                value: buyingTimeFieldId
                            });
    
                        }catch(e){
                            log.error(e.message, e)
                        }
                        
                    }
    
                    if(unmatched.Zip){
    
                        try{
    
                            function lookupZipZone(zipCode) {
                                var zipSearch = search.create({
                                    type: 'customrecord_zip_zne',
                                    filters: [['name', 'is', zipCode]],
                                    columns: ['internalid']
                                });
                        
                                var result = zipSearch.run().getRange({ start: 0, end: 1 });
                        
                                if (result.length > 0) {
                                    return result[0].getValue('internalid'); // Return internal ID of the matched record
                                }
                        
                                return null; // Not found
                            }
    
                            if(unmatched.Zip){
    
                                var zoneId = lookupZipZone(unmatched.Zip);
    
                                newLead.setValue({
                                    fieldId: 'custentity_zip_col',
                                    value: zoneId
                                });
    
                            }
    
                            
    
                        }catch(e){
                            log.error('zip search: '+e.message, e)
                        }
    
                    }
    
                    if(unmatched.Street){
                        try{
    
                            newLead.insertLine({
                                sublistId: 'addressbook',
                                line: 0
                            });
                        
                            // Set default shipping and billing flags
                            newLead.setSublistValue({
                                sublistId: 'addressbook',
                                fieldId: 'defaultshipping',
                                line: 0,
                                value: true
                            });
                        
                            newLead.setSublistValue({
                                sublistId: 'addressbook',
                                fieldId: 'defaultbilling',
                                line: 0,
                                value: true
                            });
                        
                            // Get the subrecord for address fields
                            var addressSubrecord = newLead.getSublistSubrecord({
                                sublistId: 'addressbook',
                                fieldId: 'addressbookaddress',
                                line: 0
                            });
                        
                            // Set address values
                            addressSubrecord.setValue({
                                fieldId: 'addr1',
                                value: unmatched.Street
                            });
                        
                            addressSubrecord.setValue({
                                fieldId: 'city',
                                value: unmatched.City
                            });
                        
                            addressSubrecord.setValue({
                                fieldId: 'country',
                                value: 'US'
                            });
                        
                            addressSubrecord.setValue({
                                fieldId: 'state',
                                value: 'NJ'
                            });
                        
                            addressSubrecord.setValue({
                                fieldId: 'zip',
                                value: unmatched.Zip
                            });
    
                        }catch(e){
                            log.error('set address: '+e.message, e)
                        }
                    }
    
    
                    var newLeadID = newLead.save({
                        enableSourcing: true,
                        ignoreMandatoryFields: true
                    });

                    what_converts_report.push(
                        {
                            name: unmatched.First+' '+unmatched.Last,
                            id: newLeadID,
                            report: unmatched,
                            type: 'New Lead Generated'
                        }
                    )

                    
    
                
    
                    if(unmatched.Job){
    
                        try{
                            var note = record.create({
                                type: record.Type.NOTE,
                                isDynamic: true
                            });
                            
                            note.setValue({
                                fieldId: 'title',
                                value: unmatched.projectselect
                            });
                            
                            note.setValue({
                                fieldId: 'note',
                                value: unmatched.Job
                            });
    
                            
                            note.setValue({
                                fieldId: 'entity',
                                value: newLeadID
                            });
    
                   
                            
                            note.save();
    
                        }catch(e){
                            log.error(e.message, e)
                        }
    
                    }
    
                    log.debug('New Lead: '+unmatched.First+" "+unmatched.Last, newLeadID)
    
    
                    
                });

            }

            try{

                var newRecord = record.create({
                    type: 'customrecord_gc_what_converts_report'
                });
                

                newRecord.setValue({fieldId: 'name', value: startDate });
                newRecord.setValue({fieldId: 'custrecord_gc_wc_report', value: JSON.stringify(what_converts_report) });

                newRecord.save();

            }catch(e){
                log.error('wc report: '+e.message, e)
            }

            



        } catch (error) {

            try{

                log.debug('failed to create or update, updating wc record', global_unmatched)

                var what_converts_records = search.create({
                    type: 'customrecord_gc_what_converts_leads',
                    filters: [
                        ['custrecord_gc_wc_email', 'is', global_unmatched.Email],
                    ],
                    columns: [
                        search.createColumn({
                            name: 'internalid',
                            sort: search.Sort.DESC
                        })
                    ]
                });

                var results = what_converts_records.run().getRange({ start: 0, end: 1 });

                results.forEach(function(r, x){
                    var id = r.getValue('internalid');

                    var what_converts_record_update = record.load({
                        type: 'customrecord_gc_what_converts_leads',
                        id: id
                    });

                    what_converts_record_update.setValue({fieldId: 'custrecord_gc_wc_lead_update_fail', value: true});
                    what_converts_record_update.save();

                    log.debug('wc record updated to failed status', id)

                });
    

            }catch(e){
                log.error('failed record update: '+e.message, e)
            }


            


            log.error({
                title: error.message,
                details: error
            });

        }
        
    }

    return {
        execute: execute
    };

});
