/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 */

define(['N/record', 'N/ui/serverWidget', 'N/search'], function (record, serverWidget, search) {

    function beforeLoad(context) {
        if (context.type === context.UserEventType.VIEW) {

            var newRecord = context.newRecord;
            var internalid = context.newRecord.id;
            var form = context.form;

            var report = newRecord.getValue({
                fieldId: 'custrecord_gc_wc_report'
            });

            var parsedReport;
            try {
                parsedReport = JSON.parse(report);
            } catch (e) {
                parsedReport = [];
            }

            var formatted = '';
            if (Array.isArray(parsedReport)) {
                parsedReport.forEach(function (entry, index) {
                    formatted += 'Lead ' + (index + 1) + ':\n';
                    formatted += 'Name: ' + entry.name + '\n';
                    formatted += 'ID: ' + entry.id + '\n';
                    formatted += 'Type: ' + entry.type + '\n';
                    if (entry.report) {
                        for (var key in entry.report) {
                            if (entry.report.hasOwnProperty(key)) {
                                formatted += key + ': ' + entry.report[key] + '\n';
                            }
                        }
                    }
                    formatted += '\n';
                });
            } else {
                formatted = 'Invalid report data.';
            }

            var alert_report = form.addField({
                id: 'custpage_inline',
                type: serverWidget.FieldType.INLINEHTML,
                label: 'ALERT'
            });

            alert_report.defaultValue = '<script>alert(' + JSON.stringify(formatted) + ');</script>';
        }
    }

    return {
        beforeLoad: beforeLoad
    };
});
