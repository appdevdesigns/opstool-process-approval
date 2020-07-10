
steal(
	// List your Controller's dependencies here:
	//        'opstools/ProcessApproval/models/Projects.js',
	//        'appdev/widgets/ad_delete_ios/ad_delete_ios.js',
	// '//opstools/ProcessApproval/views/ApprovalWorkspace/ApprovalWorkspace.ejs',
	function () {
		System.import('appdev').then(function () {
			steal.import('appdev/ad',
							'appdev/control/control',
							'OpsPortal/classes/OpsButtonBusy').then(function () {

					// Namespacing conventions:
					// AD.Control.extend('[application].[controller]', [{ static },] {instance} );
					AD.Control.extend('opstools.ProcessApproval.ApprovalWorkspace', {


						init: function (element, options) {
							var _this = this;
							options = AD.defaults({
								// templateDOM: '//opstools/ProcessApproval/views/ApprovalWorkspace/ApprovalWorkspace.ejs'
							}, options);
							this.options = options;

							// Call parent init
							this._super(element, options);


							this.transaction = null;
							this.buttons = {};

							this.data = {};
							this.data.listTransactions = null;
							
							// gather which person the user is & pass off to Controllers
							AD.comm.service.get({ url: '/fcf_activities/activityreport/whoami' })
							.fail(function(err) {
								console.error('!!!! FCFActivities: error getting /whoami', err);
							})
							.then(function(data) {

								if (data) {

									self.whoami = data;

								} else {

									console.warn('... FCFActivities: /whoami did not find an entry!');
								}


							});

							this.initDOM();

						},


						buttonsEnable: function () {

							for (var b in this.buttons) {
								this.buttons[b].enable();
							}
						},



						buttonsDisable: function () {

							for (var b in this.buttons) {
								this.buttons[b].disable();
							}
						},



						embeddTemplate: function (sel, templateInfo) {


							// compile template data
							var data = templateInfo.viewData || {};
							if (templateInfo.data) {
								data.data = templateInfo.data;
							}

							var $el = this.element.find(sel);

							// #fix: new Steal + CanJS path differences:
							// make sure path is relative from root:
							//   path:  /path/to/view.ejs
							// so make sure has beginning '/'
							if (templateInfo.view[0] != '/') {
								templateInfo.view = '/'+templateInfo.view;
							} else {

								// and not '//':
								if (templateInfo.view[1] == '/') {
									templateInfo.view = templateInfo.view.replace('//', '/');
								}
							}

							try {
								console.log(templateInfo.view);
								// $el.html(can.view(templateInfo.view, data));
								// AD.lang.label.translate($el);
								can.view(templateInfo.view, data, function(frag){
									$el.html(frag);
									AD.lang.label.translate($el);

									// find any embedded AD.op.images 
									$el.find('[ap-op-image]').each(function(i, el){
										new AD.op.Image(el);
									});
								})


							} catch (e) {

								// This is most likely a template reference error.
								AD.error.log('Error displaying template:' + templateInfo.view, { error: e });

								var displayData = data.data || data;
								var errorDisplay = [
									'Error displaying provided object template (' + templateInfo.view + ')',
									'Here is the raw data:'
								];

								for (var d in displayData.attr()) {
									errorDisplay.push(d + ' : ' + displayData[d]);
								}

								$el.html(errorDisplay.join('<br>'));
							}

						},



						initDOM: function () {

							// this.element.html(can.view(this.options.templateDOM, {} ));
							this.dom = {};
							this.dom.instructions = this.element.find('.pa-instructionsPanel');
							this.dom.allDone = this.element.find('.pa-allDonePanel');

							this.element.find('.mockup').remove();

							this.dom.approvalForm = this.element.find('.pa-approvalForm');

							// clear the templates:
							this.element.find('.pa-approvalForm-objTemplate').html(' ');
							this.element.find('.pa-approvalForm-relatedTemplate').html(' ');

							// convert to template
							var template = this.domToTemplate(this.dom.approvalForm);
							can.view.ejs('PA_ApprovalForm', template);

							// clear the form
							this.dom.approvalForm.html();
							this.showDOM('instructions');
						},
                        
                        formValidate: function(values) {

    						var isValid = true;  // so optimistic

    						// image needs to be set:
    						isValid = isValid && (values.caption != '');
    						isValid = isValid && (values.caption_govt != '');
    						isValid = isValid && (values.date != '');
    						isValid = isValid && (values.caption.length < 240);
    						isValid = isValid && (values.taggedPeople.length > 0);

    						return isValid;
    					},
                        
                        formErrors: function(values) {

                            var errors = [];

                            if (values.caption == '') {
                                errors.push('A caption is required.');
                            }

                            if (values.caption.length > 240) {
                                errors.push('Caption is too long.');
                            }

                            if (values.date == '') {
                                errors.push('A date is required.');
                            }

                            if (values.caption_govt == '') {
                                errors.push('A location is required.');
                            }

                            if (values.taggedPeople.length == 0) {
                                errors.push('At least one person should be tagged in this photo.');
                            }

                            return errors;
                        },




    					/**
    					 * formValues
    					 *
    					 * returns an object hash of the current form values:
    					 */
    					formValues: function() {

    						var values = $("#approvalForm").serializeArray();
    						// console.log('... values:', values);
    						var valuesObj = {};
    						values.forEach(function(val) {
    							valuesObj[val.name] = val.value;
    						});


    						// compile the taggedPeople:
    						var taggedPeople = [];
    						var listTags = $('#peopleTags').selectivity('data');

    						// console.log('listTags:', listTags);
    						listTags.forEach(function(tag) {
    							taggedPeople.push(tag.id);
    						})

    						valuesObj.taggedPeople = taggedPeople;

    						return valuesObj;
    					},


						showDOM: function (panel) {

							for (var p in this.dom) {
								if (p == panel) {
									this.dom[p].show();
								} else {
									this.dom[p].hide();
								}
							}
						},



						setList: function (list) {
							var _this = this;

							this.data.listTransactions = list;
							this.data.listTransactions.bind('length', function () {

								// if the list is empty (length == 0)
								if (_this.data.listTransactions.attr('length') == 0) {

									// now show the 'AllDone' panel:
									_this.showDOM('allDone');
								}
							})
						},
                        
                        setPeopleProject: function(people) {
                            this.data.peopleProject = people;
                        },
                        
                        setPeopleFCF: function(people) {
                            this.data.peopleFCF = people;
                        },
                        
                        /**
                         * setTeam()
                         *
                         * called by the main controller when a team was selected (step 1 in our process)
                         *
                         * This routine gathers all the team members for the selected team
                         *
                         * @param {Team} a model object representing the selected Team
                         */
                        setTeam: function() {
                            var options = [
									{
										id: "MyProject",
										text: "My Project's Volunteers",
										submenu: {
											items: this.data.peopleProject
										}
									},
									{
										id: "FCFVolunteers",
										text: "All FCF Volunteers",
										submenu: {
											items: this.data.peopleFCF
										}
									}
								];
                            var valueString = $('#peopleTags').attr('people-list');
                            var valueList = valueString.split(",");
                            var value = [];
                            this.data.peopleFCF.map(function(option) {
                                if (valueList.indexOf(option.text) > -1) {
                                    value.push(option.id);
                                } 
                            });
                            var label = 
                            $('#peopleTags').selectivity({
                                items: options,
                                value: value,
                                multiple: true,
                                placeholder: "Tag people in photo",
                                positionDropdown: function(dropdownEl, selectEl) {
                                    dropdownEl.style.width = selectEl.offsetWidth/2 + "px";
                                    var topPos = 0;
                                    var el = selectEl.offsetParent;
                                    while (el) {
                                        topPos = topPos + el.offsetTop;
                                        el = el.offsetParent;
                                    }
                                    dropdownEl.style.top = (selectEl.clientHeight + selectEl.offsetTop + topPos - window.scrollY) + "px";
                                    var contain = document.getElementsByClassName("selectivity-results-container");
                                    for (var i = 0; i < contain.length; i++) {
                                        contain[i].style.maxHeight = "22em";
                                    }
                                },
                                templates: {
                                    resultItem: function(item) {
                                        var html = '<div class="selectivity-result-item" style="border-bottom: 1px solid #CCC;" data-item-id="' + item.id + '">';
                                        if (item.avatar) {
                                            html += '<img style="margin-right: 10px; width:50px; height:50px; object-fit:cover; border-radius:100%;" src="'+item.avatar+'">';
                                        }
                                        html += item.text;
                                        html += '</div>';
                                        return html;
                                    }
                                }
                            });
                        },
                        
						setTransaction: function (transaction) {
							var _this = this;

							console.warn('*** ApprovalTransaction: received a transaction:', transaction);
							this.transaction = transaction;


							this.dom.approvalForm.html(can.view('PA_ApprovalForm', { transaction: this.transaction }));

							this.embeddTemplate('.pa-approvalForm-objTemplate', this.transaction.objectData.form);
							this.embeddTemplate('.pa-approvalForm-relatedTemplate', this.transaction.objectData.relatedInfo);

							this.form = new AD.op.Form(this.element.find('.pa-approvalForm-objTemplate'));

							// for each of my buttons (referenced by pa-status values)
							['approved', 'rejected'].forEach(function (status) {
								_this.buttons[status] = new AD.op.ButtonBusy(_this.element.find('[pa-status="' + status + '"]'));
							})

							this.showDOM('approvalForm');
						},

                        '.pa-approvalform-edit click': function ($el, ev) {
                            var _this = this;
                            
                            document.getElementById("charCountApproval").innerHTML = 240 - document.getElementById("captionTextArea").value.length;
                            
                            var detailViews = document.querySelectorAll('.dataView').forEach(function(view) {
                                view.style.display = "none";
                            });
                            var editViews = document.querySelectorAll('.dataEdit').forEach(function(view) {
                                view.style.display = "";
                            });
                            
                            var approvalButtons = document.querySelectorAll('.hideOnEdit').forEach(function(button) {
                                button.style.display = "none";
                            });

                            var approvalButtons = document.querySelectorAll('.showOnEdit').forEach(function(button) {
                                button.style.display = "";
                            });
                            
                            var selectivity = document.querySelector('#peopleTags');
                            
                            this.setTeam();
                            
                        },

                        '.pa-approvalform-cancel click': function ($el, ev) {
                            var _this = this;
                            
                            var detailViews = document.querySelectorAll('.dataView').forEach(function(view) {
                                view.style.display = "";
                            });
                            var editViews = document.querySelectorAll('.dataEdit').forEach(function(view) {
                                view.style.display = "none";
                            });
                            
                            var approvalButtons = document.querySelectorAll('.hideOnEdit').forEach(function(button) {
                                button.style.display = "";
                            });

                            var approvalButtons = document.querySelectorAll('.showOnEdit').forEach(function(button) {
                                button.style.display = "none";
                            });
                        },

                        '.pa-approvalform-save click': function ($el, ev) {
                            var _this = this;
                            var valuesObj = _this.formValues();
                            if (this.formValidate(valuesObj)) {
                                
                                $el.attr('disabled', true);
                                var dfd = AD.sal.Deferred();
                                var ActivityImage = AD.Model.get('opstools.FCFActivities.ActivityImage');
                                ActivityImage.findAll({ id: valuesObj.id })
    							.fail(function(err) {
    								console.error(err);
    							})
    							.then(function(image) {
    								var image = image[0];
                                    image.attr(valuesObj);
                                    image.save()
                                        .fail(function(err) {
                                            //// TODO: how do we handle Errors?

                                            console.error(err);
                                            dfd.reject(err);
                                        })
                                        .then(function(data) {
                                            console.log(' ... returnedData:', data);
                                            
                                            var status = "approved";
                							
                							// NOTE: objectData can be quite large, and in some situations can clog the url parsers
                							// so we don't send this info back, which is ok, since the server prevents us from updating
                							// this field anyway.
                							_this.transaction.attr('objectData', {}); // don't send this back
                							_this.transaction.attr('status', status);							
                							// this.transaction.attr('updatedValues', newValues);
                							_this.transaction.save()
                								.fail(function (err) {
                									console.error(err);
                									// _this.buttons[status].ready();
                									// _this.buttonsEnable();
                								})
                								.then(function (updatedTrans) {
                									console.log('... transaction saved!');
                                                    dfd.resolve();
                								})
                							ev.preventDefault();
                                            
                                        })

    							});
                            } else {
                                var errors = this.formErrors(valuesObj);

                                if (errors.length > 0) {

                                    bootbox.dialog({
                                        message: 'Please fix these problems before trying again:<br>' + errors.join('<br>'),
                                        title: 'Invalid Form Data',
                                        buttons: {
                                            main: {
                                                label: 'OK',
                                                className: "btn-primary",
                                                callback: function() { }
                                            }
                                        }
                                    });


                                } else {

                                    bootbox.dialog({
                                        message: 'something isn\'t right about this form, but I can\'t tell you what. Just make sure everything is properly filled out and try again.',
                                        title: 'Invalid Form Data',
                                        buttons: {
                                            main: {
                                                label: 'OK',
                                                className: "btn-primary",
                                                callback: function() { }
                                            }
                                        }
                                    });

                                }

                            }
                        },

						'.pa-approvalform-submit click': function ($el, ev) {
							var _this = this;

							this.buttonsDisable();

							var status = $el.attr('pa-status');
							
							var comment = {
								fixPhoto: false,
								fixCaption: false,
								fixLocation: false,
								fixDate: false,
								customMessage: "",
								deniedBy: {}
							};
							if (status == "rejected" && this.transaction.callback == "fcf.activities.image") {
								console.log(this);
								
								if (document.getElementById('rejectPhoto').checked) {
									comment.fixPhoto = true;
								}
								if (document.getElementById('rejectLocation').checked) {
									comment.fixLocation = true;
								}
								if (document.getElementById('rejectCaption').checked) {
									comment.fixCaption = true;
								}
								if (document.getElementById('rejectDate').checked) {
									comment.fixDate = true;
								}
								if (document.getElementById('rejectCustom').value != "") {
									comment.customMessage = document.getElementById('rejectCustom').value.trim();
								}
								
								comment.deniedBy = self.whoami;
								
								if (comment.fixPhoto || comment.fixLocation || comment.fixCaption || comment.fixDate) {
									this.transaction.attr('comment', JSON.stringify(comment));
									$('#denyPhoto').modal("hide");
								} else {
									alert("Please check one of the boxes above.");
									_this.buttons[status].ready();
									_this.buttonsEnable();
									return false;
								}
							}

							this.buttons[status].busy();

							var newValues = this.form.values();

							// NOTE: objectData can be quite large, and in some situations can clog the url parsers
							// so we don't send this info back, which is ok, since the server prevents us from updating
							// this field anyway.
							this.transaction.attr('objectData', {}); // don't send this back
							this.transaction.attr('status', status);							
							// this.transaction.attr('updatedValues', newValues);
							this.transaction.save()
								.fail(function (err) {
									console.error(err);
									_this.buttons[status].ready();
									_this.buttonsEnable();
								})
								.then(function (updatedTrans) {
									console.log('... transaction saved!');
								})
							ev.preventDefault();
						}


					});
				});
		});

	});