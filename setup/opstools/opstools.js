/**
 * This file specifies any default Ops Portal Tool Definitions 
 * provided by this modlue.
 *  
 */
module.exports = [

    { 
        key:'process.approval', 
        permissions:'adcore.admin, adcore.developer, process.approval.tool.view', 
        icon:'fa-check-square', 
        controller:'ProcessApproval',
        label:'opp.toolProcessApproval',
        context:'opsportal',
        isController:true, 
        options:{}, 
        version:'0' 
    }

];
