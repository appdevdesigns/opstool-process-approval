/**
 * This file specifies any default Ops Portal Tool Definitions 
 * provided by this modlue.
 *  
 */
module.exports = [

    { 
        key:'process.approval', 
        permissions:'process.approval.tool.view', 
        icon:'fa-check-square', 
        controller:'ProcessApproval',
        label:'Process Approval',
        // context:'opsportal',
        isController:true, 
        options:{}, 
        version:'0' 
    }

];
