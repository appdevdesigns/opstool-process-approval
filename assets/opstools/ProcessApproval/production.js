steal.has("stealconfig.js","opstools/ProcessApproval/models/base/PARequest.js","opstools/ProcessApproval/models/PARequest.js","opstools/ProcessApproval/controllers/PendingTransactions.js","OpsPortal/classes/OpsButtonBusy.js","opstools/ProcessApproval/controllers/ApprovalWorkspace.js","opstools/ProcessApproval/views/ProcessApproval/ProcessApproval.ejs","opstools/ProcessApproval/controllers/ProcessApproval.js","/site/labels/opstool-ProcessApproval.js","opstools/ProcessApproval/ProcessApproval.js");
steal({id:"OpsPortal/production.js",waits:!0,has:"appdev/loading.css appdev/ad.js can/util/can.js can/util/attr/attr.js can/event/event.js can/util/array/each.js can/util/inserted/inserted.js can/util/jquery/jquery.js can/util/util.js can/util/bind/bind.js can/map/bubble.js can/util/string/string.js can/construct/construct.js can/util/batch/batch.js can/map/map.js can/list/list.js can/util/string/deparam/deparam.js can/route/route.js can/control/control.js can/control/route/route.js can/model/model.js can/view/view.js can/compute/compute.js can/view/scope/scope.js can/view/elements.js can/view/callbacks/callbacks.js can/view/scanner.js can/view/node_lists/node_lists.js can/view/parser/parser.js can/view/live/live.js can/view/render.js can/view/bindings/bindings.js can/view/mustache/mustache.js can/observe/observe.js can/component/component.js can/can.js can/view/ejs/ejs.js can/construct/super/super.js js/OpenAjax.js appdev/comm/hub.js appdev/sal/web-jquery.js appdev/comm/pending.js appdev/widgets/ad_ui_reauth/ad_ui_reauth.css appdev/widgets/ad_icon_busy/ad_icon_busy.css appdev/widgets/ad_icon_busy/ad_icon_busy.js appdev/widgets/ad_ui_reauth/reauth_local.ejs appdev/widgets/ad_ui_reauth/reauth_cas.ejs appdev/widgets/ad_ui_reauth/ad_ui_reauth.js appdev/auth/reauth.js appdev/comm/service.js appdev/error/log.js appdev/util/uuid.js js/async.js appdev/util/async.js appdev/util/string.js appdev/config/config.js appdev/util/uiScrollbarSize.js appdev/config/data.js appdev/comm/error.js appdev/comm/socket.js appdev/model/model.js appdev/labels/lang.js appdev/labels/label.js appdev/UIController.js appdev/control/control.js appdev/appdev.js OpsPortal/classes/OpsTool.js OpsPortal/classes/OpsWidget.js".split(" ")});
steal({id:"opstools/ProcessApproval/production.css",waits:!0,has:["opstools/ProcessApproval/ProcessApproval.css"]});steal.pushPending();
steal.config({map:{"*":{"jquery/jquery.js":"jquery"}},paths:{jquery:"js/jquery.min.js","jquery-ui.js":"js/jquery-ui.min.js","bootstrap.js":"js/bootstrap/js/bootstrap.min.js","bootstrap.css":"js/bootstrap/css/bootstrap.min.css","bootstrap-datetimepicker.js":"js/bootstrap/js/bootstrap-datetimepicker.min.js","bootstrap-datetimepicker.css":"styles/bootstrap-datetimepicker.min.css","font-awesome.css":"styles/font-awesome.css","GenericList.js":"js/GenericList.js","dropzone.js":"js/dropzone/dropzone.min.js",
"dropzone.css":"js/dropzone/dropzone.min.css","bootstrap-table.js":"js/bootstraptable/bootstrap-table.js","bootstrap-table.css":"js/bootstraptable/bootstrap-table.css","bootstrapValidator.js":"js/bootstrapValidator.min.js","bootstrapValidator.css":"styles/bootstrapValidator.min.css","bootbox.js":"js/bootbox.min.js","FilteredBootstrapTable.js":"OpsPortal/controllers/FilteredBootstrapTable.js","OpsButtonBusy.js":"OpsPortal/classes/OpsButtonBusy.js","selectivity.js":"js/selectivity/selectivity-full.min.js",
"selectivity.css":"js/selectivity/selectivity-full.min.css","typeahead.js":"js/typeahead.jquery.min.js","moment.js":"js/moment.min.js"},shim:{jquery:{exports:"jQuery",packaged:!1,ignore:!0},"js/dependencies/sails.io.js":{packaged:!1,ignore:!0},"site/labels/appdev.js":{packaged:!1,ignore:!0},"jquery-ui.js":{packaged:!1},"bootstrap.js":{packaged:!1},"bootstrap.css":{packaged:!1},"bootstrap-datetimepicker.js":{packaged:!1},"bootstrap-datetimepicker.css":{packaged:!1},"font-awesome.css":{packaged:!1},
"js/jquery.sidr.min.js":{packaged:!1},"dropzone.js":{packaged:!1},"dropzone.css":{packaged:!1},"bootstrap-table.js":{packaged:!1},"bootstrap-table.css":{packaged:!1},"bootstrapValidator.js":{packaged:!1},"bootstrapValidator.css":{packaged:!1},"bootbox.js":{packaged:!1},"opsportal/requirements.js":{packaged:!1,ignore:!0},"opsportal/config":{ignore:!0},"site/labels/OpsPortal.js":{packaged:!1,ignore:!0},"site/labels/opstool-RBAC.js":{packaged:!1,ignore:!0},"selectivity.js":{packaged:!1},"selectivity.css":{packaged:!1},
"site/labels/opstool-FCFActivities.js":{packaged:!1,ignore:!0},"typeahead.js":{packaged:!1,ignore:!0},"site/login-done":{packaged:!1},"moment.js":{packaged:!1},"site/labels/opstool-MPDReport.js":{packaged:!1,ignore:!0},"site/labels/opstools-ProcessApproval.js":{packaged:!1,ignore:!0}},amd:!1});steal.executed("stealconfig.js");
steal("appdev").then(function(){AD.Model.Base.extend("opstools.ProcessApproval.PARequest",{findAll:"GET /opstool-process-approval/parequest",findOne:"GET /opstool-process-approval/parequest/{id}",create:"POST /opstool-process-approval/parequest",update:"PUT /opstool-process-approval/parequest/{id}",destroy:"DELETE /opstool-process-approval/parequest/{id}",describe:function(){return{actionKey:"string",userID:"string",callback:"string",status:"string",objectData:"json"}},fieldId:"id",fieldLabel:"actionKey"},
{})});steal.executed("opstools/ProcessApproval/models/base/PARequest.js");steal("appdev","opstools/ProcessApproval/models/base/PARequest.js").then(function(){AD.Model.extend("opstools.ProcessApproval.PARequest",{useSockets:!0},{lock:function(){return AD.comm.socket.get({url:"/opstool-process-approval/parequest/lock/"+this.getID()})},unlock:function(){return AD.comm.socket.get({url:"/opstool-process-approval/parequest/unlock/"+this.getID()})}})});steal.executed("opstools/ProcessApproval/models/PARequest.js");
steal("appdev","OpsPortal/classes/OpsWidget.js","opstools/ProcessApproval/models/PARequest.js",function(){AD.Control.extend("opstools.ProcessApproval.PendingTransactions",{init:function(a,b){var c=this;this.options=b=AD.defaults({eventItemSelected:"hey.got.one"},b);this._super(a,b);this.initDOM();this.data={};this.data.listTransactions=null;this.data.selectedRequest=null;this.PARequest=AD.Model.get("opstools.ProcessApproval.PARequest");this.PARequest.on("updated",function(a,b){if("pending"!=b.status){var e=
c.data.listTransactions.indexOf(b);-1<e&&(c.data.listTransactions.splice(e,1),c.data.selectedRequest&&c.data.selectedRequest.getID()==b.getID()&&(c.data.selectedRequest=null,c.data.listTransactions.attr("length")<=e&&(e=c.data.listTransactions.attr("length")-1),0<=e&&(e=c.element.find("li")[e],c.selectLI($(e)))))}});this.PARequest.on("messaged",function(a,b){var e=c.element.find('[parequest-id="'+b.id+'"]');b.data.locked?e.addClass("parequest-locked"):e.removeClass("parequest-locked");console.log("... parequest.messaged:",
b)})},initDOM:function(){this.dom={};this.dom.list=this.element.find("ul.op-list");var a=this.domToTemplate(this.dom.list);can.view.ejs("PendingTransactions_List",a);this.dom.list.html("");this.dom.ListWidget=new AD.op.Widget(this.element)},resize:function(a){this.dom.ListWidget.resize({height:a})},selectLI:function(a){this.data.selectedRequest&&this.data.selectedRequest.unlock();this.element.find(".active").removeClass("active");a.addClass("active");a=a.data("item");this.data.selectedRequest=a;this.data.selectedRequest.lock();
this.element.trigger(this.options.eventItemSelected,a)},setList:function(a){this.data.listTransactions=a;this.dom.list.html(can.view("PendingTransactions_List",{items:a,data:this.data}))},"li click":function(a,b){a.hasClass("parequest-locked")||this.selectLI(a);b.preventDefault()}})});steal.executed("opstools/ProcessApproval/controllers/PendingTransactions.js");
steal("appdev",function(){"undefined"==typeof AD.op&&(AD.op={});AD.op.ButtonBusy=can.Control.extend({},{init:function(a,b){this.options=b=AD.defaults({selectorIcon:".fa",classBusy:"fa-spinner",shouldDisable:true,onClick:function(){}},b);this._super(a,b);this.dom={};this.dom.icon=null;this.busyClass=this.options.classBusy+" fa-pulse";this.initDOM()},busy:function(a){this.dom.icon.addClass(this.busyClass);(a||this.options.shouldDisable)&&this.disable()},disable:function(){this.element.attr("disabled",
"disabled");this.element.addClass("disabled")},enable:function(){this.element.removeAttr("disabled");this.element.removeClass("disabled")},initDOM:function(){var a=this;this.dom.icon=this.element.find(this.options.selectorIcon);this.dom.icon.length==0?console.warn("**** Opsportal.ButtonBusy did not find icon using selector["+this.options.selectorIcon+"]"):this.dom.icon.click(function(b){a.options.onClick(b)})},ready:function(){this.dom.icon.removeClass(this.busyClass);this.enable()}})});steal.executed("OpsPortal/classes/OpsButtonBusy.js");
steal("appdev","OpsPortal/classes/OpsButtonBusy.js",function(){AD.Control.extend("opstools.ProcessApproval.ApprovalWorkspace",{init:function(a,b){this.options=b=AD.defaults({},b);this._super(a,b);this.transaction=null;this.buttons={};this.data={};this.data.listTransactions=null;this.initDOM()},buttonsEnable:function(){for(var a in this.buttons)this.buttons[a].enable()},buttonsDisable:function(){for(var a in this.buttons)this.buttons[a].disable()},embeddTemplate:function(a,b){var c=b.viewData||{};
b.data&&(c.data=b.data);var d=this.element.find(a);try{d.html(can.view(b.view,c))}catch(g){AD.error.log("Error displaying template:"+b.view,{error:g});var c=c.data||c,e=["Error displaying provided object template ("+b.view+")","Here is the raw data:"],f;for(f in c.attr())e.push(f+" : "+c[f]);d.html(e.join("<br>"))}},initDOM:function(){this.dom={};this.dom.instructions=this.element.find(".pa-instructionsPanel");this.dom.allDone=this.element.find(".pa-allDonePanel");this.element.find(".mockup").remove();
this.dom.approvalForm=this.element.find(".pa-approvalForm");this.element.find(".pa-approvalForm-objTemplate").html(" ");this.element.find(".pa-approvalForm-relatedTemplate").html(" ");var a=this.domToTemplate(this.dom.approvalForm);can.view.ejs("PA_ApprovalForm",a);this.dom.approvalForm.html();this.showDOM("instructions")},showDOM:function(a){for(var b in this.dom)b==a?this.dom[b].show():this.dom[b].hide()},setList:function(a){var b=this;this.data.listTransactions=a;this.data.listTransactions.bind("length",
function(){0==b.data.listTransactions.attr("length")&&b.showDOM("allDone")})},setTransaction:function(a){var b=this;console.warn("*** ApprovalTransaction: received a transaction:",a);this.transaction=a;this.dom.approvalForm.html(can.view("PA_ApprovalForm",{transaction:this.transaction}));this.embeddTemplate(".pa-approvalForm-objTemplate",this.transaction.objectData.form);this.embeddTemplate(".pa-approvalForm-relatedTemplate",this.transaction.objectData.relatedInfo);["approved","rejected"].forEach(function(a){b.buttons[a]=
new AD.op.ButtonBusy(b.element.find('[pa-status="'+a+'"]'))});this.showDOM("approvalForm")},".pa-approvalform-submit click":function(a,b){var c=this;this.buttonsDisable();var d=a.attr("pa-status");this.buttons[d].busy();this.transaction.attr("status",d);this.transaction.save().fail(function(a){console.error(a);c.buttons[d].ready();c.buttonsEnable()}).then(function(){console.log("... transaction saved!")});b.preventDefault()}})});steal.executed("opstools/ProcessApproval/controllers/ApprovalWorkspace.js");
steal("can/view","can/view/ejs",function(a){return a.view.preloadStringRenderer("opstools_ProcessApproval_views_ProcessApproval_ProcessApproval_ejs",a.EJS(function(b,c){with(c)with(b){var d=[];d.push('\n      <\!-- Widget --\>  \n            <div class=\'col-xs-2 op-container hris-user-widget\'>\n                <\!--Left bar--\>\n                <div  class="op-container op-widget sticky pa-pendingtransactions" >\n                    <div class="op-widget-masthead">\n                        <h3><strong>Pending Transactions</strong></h3>\n                        <p>Choose one of the pending transactions to review</p>\n                    </div>        \n                    <div class="op-widget-body">\n                      <ul class="op-list">\n                          \n                          <li mockup-show="new-activity" class="op-container active mockup">\n                            <span class="icon"><i class="fa fa-calendar fa-fw"></i></span>\n                            <div><strong>New Activity</strong><br>\n                                      "Current Activity Name"\n                                      by "person submitted by"\n                                      date: 10 August 1990\n                            </div>\n                          </li>\n                          <\!-- \n                          items.forEach(function(item) { \n                            var menuData = item.objectData.menu; \n                            if (!menuData) {\n                              menuData = item.objectData.objectData.menu;\n                            }\n                            var active = \'\';\n                            if (data.selectedRequest && data.selectedRequest.getID() == item.getID() ) {\n                              active = \' active \';\n                            }\n                          --\>\n                            <li mockup-show="new-activity" class="op-container [[= active ]]" parequest-id="[[= item.getID() ]]" obj-embed="item" >\n                              <span class="icon"><i class="fa [[= menuData.icon ]] fa-fw"></i></span>\n                              <div><strong>[[= menuData.action.key ]]</strong><br>\n                                        "[[= menuData.instanceRef ]]" <br>\n                                        by "[[= menuData.createdBy ]]"<br>\n                                        date: [[= menuData.date ]]\n                              </div>\n                            </li>\n                          <\!--\n                          });\n                          --\>\n                          <li mockup-show="new-image" class="op-container mockup">\n                            <span class="icon"><i class="fa fa-calendar fa-fw"></i></span>\n                            <div><strong>New Image</strong><br>\n                                      "Current Activity Name"\n                                      by "person submitted by"\n                                      date: 10 August 1990\n                            </div>\n                          </li>\n                      </ul>\n                    </div>\n                    <\!--<div class="op-widget-footer">\n                        <a class="op-toggle" href="#" title="appDev Designs"><img ');
d.push(a.view.txt(2,"img","src",this,function(){var a=[];a.push('src="');a.push('../../../assets/images/appdev_logo_white.png"');return a.join("")}));d.push(" ");d.push(a.view.txt(2,"img","style",this,function(){var a=[];a.push('style="');a.push('width: 70px; height: auto;"');return a.join("")}));d.push(' /></a>\n                    </div> --\>\n                </div>\n                <\!--/Left bar--\>\n                \n            </div>\n            <\!-- Main stage area --\>\n            <div class=\'col-xs-10 op-container op-stage pa-approvalworkspace\'>\n                <\!-- Instructions Panel --\>\n                <div class="mockup-display new-activity opsportal-content-area pa-instructionsPanel">\n                       <p> Select an entry on the right to begin editing. </p>            \n                </div>\n                \n                <\!-- AllDone Panel --\>\n                <div class="mockup-display new-activity opsportal-content-area pa-allDonePanel">\n                       <p> That\'s it!  You\'re all done. </p>            \n                </div>\n                <\!--Form Activity Area--\>\n                <div id="apprv-activity" class="mockup-display new-activity opsportal-content-area pa-approvalForm">\n                      <div class="op-container">\n                          <div class="workspace col-lg-9 off-botm20">\n                              <h4>[[= transaction.objectData.menu.action.key ]]</h4> \n                              <div class="op-container op-block-border pa-approvalForm-objTemplate">\n                \n                                 \n                                   <div id="opsportal-activityName" class="off-botm20">\n                                       <div class="form-group">\n                                          <label class="lbl-title">Activity Name<br><span>Please use a name everyone associated with the activity will organize</span></label>\n                                          <input type="text" class="form-control" id="exampleInputEmail1" placeholder="Activity Name">\n                                       </div>\n                                  \n                         \n                   \n                                       <div class="form-inline">\n                                        <div class="form-group">\n                                          <label for="exampleInputName2">Start Date:</label>\n                                          <input type="date" class="form-control" id="startDate" placeholder="">\n                                        </div>\n                                        <div class="form-group">\n                                          <label for="exampleInputEmail2">End Date:</label>\n                                          <input type="date" class="form-control" id="Enddate" placeholder="">\n                                        </div>\n                                      </div>  \n                                  </div> \n                                 \n                    \n                                  \n                                  <div id="opsportal-objective"  class="off-botm20">\n                                      <label class="lbl-title">Team Objectives<br><span>Every Activity must meet at least one objective. Please choose all that apply:</span></label>\n                                      <div class="checkbox">\n                                        <label><input type="checkbox" value="">Objective 1</label><br>\n                                        <label><input type="checkbox" value="">Objective 2</label><br>\n                                        <label><input type="checkbox" value="">Objective 3</label><br>\n                                      </div>\n                                  </div>                    \n                                  \n                                  <div id="opsportal-description">\n                                    <label class="lbl-title">Description<br><span>Please describe this activity using the team objective as guideline:</span></label>\n                                      <textarea class="form-control" rows="5"',
a.view.pending({scope:this}),">");d.push('</textarea>\n                                  </div>                \n                              </div>\n                              <h4 class="mockup" >Comments:</h4>\n                              <div class="op-container op-block-border off-botm10 mockup">\n                              <\!-- transaction.comments.forEach(function(comment){ --\>\n                                  <p>[[= comment.comment ]]</p>\n                              <\!-- }) --\>\n                              </div>\n                              <textarea class="form-control mockup" rows="5"',
a.view.pending({scope:this}),">");d.push('Admin Comments</textarea>\n                            \n                              <div class="op-container op-block nomargintop">\n                                  <button class="btn btn-success float-right pa-approvalform-submit" pa-status="approved" ><i class="fa"></i>Accept</button>\n                                  <button class="btn btn-info  float-right offset-15 pa-approvalform-submit mockup" pa-status="requesting" >Request</button>\n                                  <button class="btn btn-warning float-right  offset-15 pa-approvalform-submit" pa-status="rejected"><i class="fa fa-hand-paper-o"></i>Deny</button>\n                              </div>    \n                                             \n                          </div>\n                          \n                          <div class="col-lg-3">\n                              <div class="op-container op-block-border pa-approvalForm-relatedTemplate">\n                                  <h4>Submitted By:</h4>\n                                  <div class="row op-container">\n                                    <div class="col-xs-6 col-sm-3 col-lg-6 nopadR">\n                                          <img class="img-responsive" ');
d.push(a.view.txt(2,"img","src",this,function(){var a=[];a.push('src="');a.push('//images/opsportal/default-avatar.png"');return a.join("")}));d.push(' alt="Responsive image" >\n                                      </div>\n                                      <div class="col-xs-6 col-sm-9 col-lg-6 nopadR">\n                                           <h2 class="nomargintop">Nick Fury</h2>\n                                           <p>Team(s):</p>\n                                           <p>team a</p>\n                                           <p>team b</p>\n                                           <p>team c</p>\n                                      </div>                        \n                                  </div>\n                                  <div class="op-container">\n                                    <h4 class="off-botm20">Created On: 12 Dec 2015</h4>\n                                      <div class="op-container off-botm20">\n                                          <label class="lbl-title"><strong>Under Team:</strong></label>\n                                          <p><span><strong>Team Name</strong></span><br>team description can be longer than you might think here.</p>\n                                      </div>\n                                      <div class="op-container">\n                                          <label class="lbl-title"><strong>Under Project:</strong></label>\n                                          <p><span><strong>Project Name</strong></span><br>project description can be longer than you might think here.</p>\n                                      </div>                        \n                                  </div>\n                              </div>       \n                          </div>\n                            \n                      </div>    \n                </div>\n                <\!--/Form Activity Area--\>\n                <\!--Image Area--\>\n                <div id="apprv-image" class="mockup-display new-image opsportal-content-area mockup" ');
d.push(a.view.txt(2,"div","style",this,function(){var a=[];a.push('style="');a.push('display:none"');return a.join("")}));d.push('>\n                      <div class="op-container">\n                          <div class="workspace col-lg-9 off-botm20">\n                            <h4>New Image</h4> \n                              <div class="op-container op-block-border">\n                \n                                 <\!--Image Name--\>\n                                   <div id="opsportal-activityName" class="off-botm20">\n                                       <div class="form-group">\n                                          <label class="lbl-title">Image</label>\n                                          <div class="op-container off-botm20">\n                                            <img class="img-responsive" ');
d.push(a.view.txt(2,"img","src",this,function(){var a=[];a.push('src="');a.push('images/opsportal/love-map.jpg"');return a.join("")}));d.push(' alt="R,desponsive image" >                              \n                                          </div>\n                                        </div>\n                                        <div class="form-horizontal">\n                                         <\!--Caption--\> \n                                         <div class="form-group">\n                                            <label class="col-sm-1 nopadL control-label lbl-title">Caption:</label>\n                                            <div class="col-sm-11">\n                                              <input type="text" class="form-control" id="caption">\n                                            </div>\n                                         </div>\n                                         <\!--/Caption--\>\n                                         <\!--Date--\>\n                                         <div class="row">\n                                           <div class="col-sm-12">\n                                              <label class="col-sm-1 control-label nopadL lbl-title">Date:</label>\n                                              <div class="col-sm-11">\n                                                <div class="row">\n                                                  <div class="col-sm-3">\n                                                    <input type="date" class="col-xs-2 form-control" id="caption">\n                                                  </div>\n                                                </div>\n                                              </div>\n                                           </div>\n                                         </div>\n                                         <\!--/Date--\>\n                                       </div>\n                                  </div> \n                                  <\!--/Image Name--\>\n                                  <\!--People in Photo--\>                  \n                                  <div id="opsportal-description">\n                                    <label class="lbl-title">People in photo:</label>\n                                      <div class="op-container op-block-border off-botm20">\n                                        <div class="row" ');
d.push(a.view.txt(2,"div","style",this,function(){var a=[];a.push('style="');a.push('margin:0;"');return a.join("")}));d.push('>\n                                          <\!--List of people with closed button--\>\n                                          <div class="alert people alert-dismissible">\n                                            <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>\n                                            <strong>Person 1</strong>\n                                          </div>\n                                          <div class="alert people alert-dismissible">\n                                            <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>\n                                            <strong>Person 2</strong>\n                                          </div>\n                                          <div class="alert people alert-dismissible">\n                                            <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>\n                                            <strong>Person 3</strong>\n                                          </div>\n                                          <div class="alert people alert-dismissible">\n                                            <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>\n                                            <strong>Person 4</strong>\n                                          </div>                                                                                      \n                                          <\!--/End here--\>\n                                        </div>\n                                      </div>\n                                  </div>\n                                  <\!--/People in Photo--\>                  \n                              </div>\n                              <h4>Comments:</h4>\n                              <div class="op-container op-block-border off-botm10">\n                                  <p>previous comment 1</p>\n                                  <p>previous comment 2</p>\n                                  <p>previous comment 3</p>\n                              </div>\n                            <textarea class="form-control" rows="5"',
a.view.pending({scope:this}),">");d.push('Admin Comments</textarea>\n                              <\!--Action Buttons--\>\n                              <div class="op-container op-block nomargintop">\n                                  <button class="btn btn-success float-right" type="submit">Accept</button>\n                                  <button class="btn btn-info  float-right offset-15" type="submit">Request</button>\n                                  <button class="btn btn-warning float-right  offset-15" type="submit"><i class="fa fa-hand-paper-o"></i>Deny</button>\n                              </div>    \n                              <\!--/Action Buttons--\>                \n                          </div>\n                          <\!--Submitted By Area--\>\n                          <div id="submittedby" class="col-lg-3">\n                              <div class="op-container op-block-border">\n                                  <h4>Submitted By:</h4>\n                                  <\!--Avatar & Team--\>\n                                  <div class="row op-container">\n                                    <div class="col-xs-6 col-sm-3 col-lg-6 nopadR">\n                                          <img class="img-responsive" ');
d.push(a.view.txt(2,"img","src",this,function(){var a=[];a.push('src="');a.push('images/opsportal/default-avatar.png"');return a.join("")}));d.push(' alt="Responsive image" >\n                                      </div>\n                                      <div class="col-xs-6 col-sm-9 col-lg-6 nopadR">\n                                           <h2 class="nomargintop">Nick Fury</h2>\n                                           <p>Team(s):</p>\n                                           <p>team a</p>\n                                           <p>team b</p>\n                                           <p>team c</p>\n                                      </div>                        \n                                  </div>\n                                  <\!--/Avatar & Team--\>\n                                  <div class="op-container">\n                                    <h4 class="off-botm20">Created On: 12 Dec 2015</h4>\n                                      <div class="op-container off-botm20">\n                                          <label class="lbl-title"><strong>Under Team:</strong></label>\n                                          <p><span><strong>Team Name</strong></span><br>team description can be longer than you might think here.</p>\n                                      </div>\n                                      <div class="op-container">\n                                          <label class="lbl-title"><strong>Under Project:</strong></label>\n                                          <p><span><strong>Project Name</strong></span><br>project description can be longer than you might think here.</p>\n                                      </div>                        \n                                  </div>\n                              </div>       \n                          </div>\n                          <\!--/Submitted By Area--\>    \n                      </div>    \n                </div>\n                <\!--/Image Area--\>\n                \n                \n                \n                \n                \n                \n            </div>\n        ');
return d.join("")}}))});steal.executed("opstools/ProcessApproval/views/ProcessApproval/ProcessApproval.ejs");
steal("appdev","//OpsPortal/classes/OpsTool.js","opstools/ProcessApproval/controllers/PendingTransactions.js","opstools/ProcessApproval/controllers/ApprovalWorkspace.js","//opstools/ProcessApproval/views/ProcessApproval/ProcessApproval.ejs",function(){AD.Control.OpsTool.extend("ProcessApproval",{CONST:{ITEM_SELECTED:"Transaction.Selected"},init:function(a,b){this.options=b=AD.defaults({templateDOM:"//opstools/ProcessApproval/views/ProcessApproval/ProcessApproval.ejs",resize_notification:"ProcessApproval.resize",
tool:null},b);this._super(a,b);this.data={};this.data.list=null;this.initDOM();this.initControllers();this.initEvents();this.loadListData()},loadListData:function(){var a=this;this.PARequest=AD.Model.get("opstools.ProcessApproval.PARequest");this.PARequest.findAll({status:"pending"}).fail(function(a){console.error("!!! Dang.  something went wrong:",a)}).then(function(b){a.controllers.PendingTransactions.setList(b);a.controllers.ApprovalWorkspace.setList(b);a.data.list=b;console.log("... here is our list of pending transactions:",
b)});this.PARequest.on("stale",function(){var b={status:"pending"},c=[];a.data.list.forEach(function(a){c.push(a.getID())});0<c.length&&(b.id={"!":c});a.PARequest.findAll(b).fail(function(a){console.error("!!! Dang.  something went wrong:",a)}).then(function(b){b.forEach(function(b){a.data.list.push(b)})})})},initControllers:function(){this.controllers={};this.controllers.PendingTransactions=new (AD.Control.get("opstools.ProcessApproval.PendingTransactions"))(this.element.find(".pa-pendingtransactions"),
{eventItemSelected:this.CONST.ITEM_SELECTED});this.controllers.ApprovalWorkspace=new (AD.Control.get("opstools.ProcessApproval.ApprovalWorkspace"))(this.element.find(".pa-approvalworkspace"),{})},initDOM:function(){this.element.html(can.view(this.options.templateDOM,{}))},initEvents:function(){var a=this;this.controllers.PendingTransactions.element.on(this.CONST.ITEM_SELECTED,function(b,c){console.log(" ... Transaction Selected : ",c);a.controllers.ApprovalWorkspace.setTransaction(c)})},resize:function(a){this._super(a);
this.controllers.PendingTransactions.resize(a.height)}})});steal.executed("opstools/ProcessApproval/controllers/ProcessApproval.js");steal.executed("/site/labels/opstool-ProcessApproval.js");steal("//opstools/ProcessApproval/controllers/ProcessApproval.js","//opstools/ProcessApproval/ProcessApproval.css","/site/labels/opstool-ProcessApproval.js").then(function(){});steal.executed("opstools/ProcessApproval/ProcessApproval.js");steal.popPending();
