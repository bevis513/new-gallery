if (typeof _yuitest_coverage == "undefined"){
    _yuitest_coverage = {};
    _yuitest_coverline = function(src, line){
        var coverage = _yuitest_coverage[src];
        if (!coverage.lines[line]){
            coverage.calledLines++;
        }
        coverage.lines[line]++;
    };
    _yuitest_coverfunc = function(src, name, line){
        var coverage = _yuitest_coverage[src],
            funcId = name + ":" + line;
        if (!coverage.functions[funcId]){
            coverage.calledFunctions++;
        }
        coverage.functions[funcId]++;
    };
}
_yuitest_coverage["build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js",
    code: []
};
_yuitest_coverage["build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js"].code=["YUI.add('gallery-datatable-celleditor-popup', function (Y, NAME) {","","/**"," This module defines an extension of View that includes a BASE Y.DataTable.BaseCellPopupEditor View class definition"," cell \"pop-up\" editor.  This view class includes an editor with HTML inserted into an Overlay widget directly over"," the TD cell.  Positioning, event management, creation/destruction and attribute changes are managed by this class.",""," ##### Configuration",""," Y.DataTable.BaseCellPopupEditor by itself just creates an empty Overlay container, and really isn't meant to be used"," that way.  The view class includes a number of [attributes](#attrs) that are the key to defining a workable popup editor"," and it's behaviors.",""," The Y.DataTable.BaseCellPopupEditor View class communicates with the DataTable via the gallery-datatable-editable"," module, which sets up invocation and rendering of this View and establishes listeners for View events, thus the"," DataTable serves as a Controller.",""," Since the generic View class permits ad-hoc attributes, the implementer can pass many properties in during instantiation"," that will become available as run-time View attributes.",""," ##### View Construction / Rendering",""," HTML content that will be set to the Overlay's `bodyContent` is setup via the [templateObject](#attr_templateObject) and"," it's `html` property.  The base view class uses the YUI Template module, and specifically the Template.Micro module to"," build out the HTML (Handlebars format is also available).  For many use cases you won't need a fancy \"template\", and"," in fact your templateObject.html may not include any \"template parameters\" at all -- which is perfectly fine.",""," ##### Editing / Validation",""," This editor view creates the template'ed content, and attaches the [_inputClass](#property__classInput) wherever the"," implementer assigns the class tag.  The editor can also be configured to listen to the base view's [editorCreated](#event_editorCreated)"," in order to attach or configure a Widget or another UI component within the View container.",""," Key listeners are provided to detect changes to the first Node within the container with [_inputClass](#property__classInput)"," set.  These keylisteners can be used prohibit invalid keystrokes (via the [keyFiltering](#attr_keyFiltering) setting) and"," to allow validation upon a \"save\" entry (keyboard RTN stroke) where a [validator](#attr_validator) can be prescribed to"," allow/disallow changes based upon the overall \"value\" of the INPUT control.",""," If the implementer has connected a Widget to this View, the widget should be configured by it's own \"selection\" mechanism"," to either call this View's [saveEditor](#event_saveEditor) or[cancelEditor](#event_cancelEditor) methods to ensure proper"," saving / closing of the Overlay.",""," ##### Navigation"," The editor provides the capability to navigate from TD cell via key listeners on the following key"," combinations;"," * CTRL-arrow keys"," * TAB goes to RIGHT, SHIFT-TAB goes to left"," * ESC cancels editing"," * RTN saves cell",""," Key navigation can be disabled via the [inputKeys](#attr_inputKeys) attribute set to `false`.",""," When a \"key navigation\" request is received it is passed to the [keyDir](#attr_keyDir) as a change"," in [row,col] that implementers can listen to \"change\" events on, to reposition and open editing on the"," new relative cell.  (NOTE: This view does not reposition, it simply fires a `keyDirChange` event.",""," ##### Events"," Several events are fired by this View;  which can be listened for and acted upon to achieve differing results."," For example, the Y.DataTable.EditorOptions.inlineAC (inline autocompletion editor) listens for the"," [editorCreated](#event_editorCreated) event and once received, it configures the autocomplete plugin onto the"," INPUT node.",""," ##### Pre-Built Popup Editors",""," This Module includes several pre-defined editor configurations which are stored within the Y.DataTable.EditorOptions"," namespace (presently there are popup editors for \"textbox\", \"textarea\", \"checkbox\", \"radio\", \"dropdown\", \"autocomplete\","," \"calendar\", \"date\", \"number\").  New popup editors can be created and added to this namespace at runtime,"," and by defining the `BaseViewClass:Y.DataTable.BaseCellPopupEditor` property.",""," This Y.DataTable.BaseCellinlineEditor class is similar to (and compatible with ) the Y.DataTable.BaseCellPopupEditor"," in another gallery module.  Note that since the \"inline\" editor uses a simple INPUT[type=text] Node instead of an"," Overlay the codeline is quite a bit simpler.",""," The pre-built configuration options are stored in an Object variable Y.DataTable.EditorOptions within"," the DataTable namespace.  The gallery-datatable-editable module uses the Y.DataTable.EditorOptions to"," create required editor View instances.",""," For example, the pre-built configuration object for the [number](Y.DataTable.EditorOptions.number.html) popup editor"," is stored as `Y.DataTable.EditorOptions.number`.",""," To configure an editor on-the-fly (i.e within a DataTable column definition) just include the configuration object options"," within DT's column `editorConfig` object, which is Y.merge'ed with the pre-built configs;","","        // Column definition ... disabling keyfiltering and setting a CSS class","        { key:'firstName',","          editor:\"text\", editorConfig:{ className:'align-right', keyFiltering:null }","        }",""," ###### KNOWN ISSUES:"," <ul>"," <li>In-cell key navigation with scrolling DT's can put the View out of the DT limits, no bounds checking is currently done!</li>"," <li>Some problems have been encountered after \"datatable.destroy()\" and then immediate re-building of the same DT without a page refresh.</li>"," </ul>",""," @module gallery-datatable-celleditor-popup"," @class Y.DataTable.BaseCellPopupEditor"," @extends Y.View"," @author Todd Smith"," @since 3.8.0"," **/","var KEYC_ESC = 27,","    KEYC_RTN = 13,","    KEYC_TAB = 9,","    KEYC_UP  = 38,","    KEYC_DOWN  = 40,","    KEYC_RIGHT  = 39,","    KEYC_LEFT  = 37;","","Y.DataTable.BaseCellPopupEditor =  Y.Base.create('celleditor',Y.View,[],{","","    /**","     * Defines the HTML content \"template\" for the containing Overlay of this editor,","     * this property is also set by default to the attribute","     * @property template","     * @type String","     * @default See Code","     * @static","     */","    template:       '<div class=\"yui3-widget yui3-overlay {classOverlay}\" tabindex=\"1\"></div>',","","    /**","     * Defines the HTML content \"template\" for BUTTON elements that are added to the Overlay","     * via the overlayButtons attribute.","     * @property btnTemplate","     * @type String","     * @default See Code","     * @static","     */","    btnTemplate:    '<button class=\"yui3-button {classButton}\" data-button={name}>{value}</button>',","","    /**","     * Placeholder property for the Overlay that is created by this View","     * @property overlay","     * @type Widget","     * @default null","     * @static","     */","    overlay:        null,","","//--------------------  Static CSS class names  ---------------------------","","","    /**","     * CSS classname to identify the input HTML node within the View container","     * @property _classInput","     * @type String","     * @default 'yui3-datatable-editor-input'","     * @protected","     * @static","     */","    _classInput:    'yui3-datatable-editor-input',","","    /**","     * CSS classname to identify the individual input collection HTML nodes within","     * the View container","     * @property _classItem","     * @type String","     * @default 'yui3-datatable-editor-input-item'","     * @protected","     * @static","     */","    _classItem:     'yui3-datatable-editor-input-item',","","    /**","     * CSS classname for the Overlay content within the View container","     * @property _classOverlay","     * @type String","     * @default 'yui3-datatable-editor-overlay'","     * @protected","     * @static","     */","    _classOverlay:  'yui3-datatable-editor-overlay',","","    /**","     * CSS classname used for Overlay BUTTON elements within the View container","     * @property _classOverlayBtn","     * @type String","     * @default 'yui3-datatable-editor-overlay-button'","     * @protected","     * @static","     */","    _classOverlayBtn:  'yui3-datatable-editor-overlay-button',","","    /**","     * CSS classname to identify the individual input collection HTML nodes within","     * the View container","     * @property _classEditing","     * @type String","     * @default 'editing'","     * @protected","     * @static","     */","    _classEditing:  'editing',","","    /**","     * Placeholder for the created Input element contained within the Overlay and","     * View container","     * @property _inputNode","     * @type Node","     * @default null","     * @protected","     * @static","     */","    _inputNode:     null,","","    /**","     * Placeholder for listener handles created from this View","     * @property _subscr","     * @type Array of {EventHandles}","     * @default []","     * @protected","     * @static","     */","    _subscr:        [],","","//======================   LIFECYCLE METHODS   ===========================","","    /**","     * Creates the View instance and sets the container and bindings","     * @method initializer","     * @chainable","     * @return {*}","     * @protected","     */","    initializer: function(){","        this._createUI();","        this._bindUI();","        return this;","    },","","    /**","     * @method destructor","     * @protected","     */","    destructor: function(){","        this.cancelEditor();","        this._unbindUI();","        this.fire('editorDestroyed');","    },","","    /**","     * Event fired when the cell editor View is destroyed.","     *","     * Implementers can listen for this event to check if any sub-components / widgets, etc.. they","     * had created as part of this View need to be destroyed or listener unbound.","     *","     * @event editorDestroyed","     */","","    /**","     * Method that publishes the custom events and sets bindings for key handling and","     * positioning changes","     * @method _bindUI","     * @private","     */","    _bindUI:  function(){","","        this.publish({","            editorSave: {","                defaultFn:   this._defEditorSaveFn,","                emitFacade:  true,","                preventable: true","            },","            editorCancel: {","                defaultFn:   this._defEditorCancelFn,","                emitFacade:  true,","                preventable: true","            },","            editorCreated: {emitFacade:  true, preventable: true },","            editorDestroyed: {emitFacade:  true, preventable: true }","        });","","        // Set a key listener on inputnode","        if(this._inputNode ) {","            this._subscr.push( this._inputNode.on('keydown',this._onKeyDown, this)  );","            this._subscr.push( this._inputNode.on('keypress',this._onKeyPress, this)  );","","         // add bubble target","         //   if(this._inputNode && this.overlay) {","         //       this._inputNode.addTarget(this.overlay);","         //       this.overlay.addTarget(this._inputNode);","         //   }","","        }","","        // This is here to support \"scrolling\" of the underlying DT ...","        this._subscr.push( this.on('xyChange',this._setEditorXY) );","      //  this.on('xyChange',this._setEditorXY);","","    },","","","    /**","     * Creates this View's container, including instantiating the Overlay widget within","     * the container, incorporating user-supplied overlay configs, creating buttons and","     * creating the internal HTML content within the Overlay (using a Template-based","     * method)","     *","     * @method _createUI","     * @return {Y.Overlay} Overlay instance for this View","     * @private","     */","    _createUI: function(){","       var ocfg  = this.get('overlayConfig'),","           tobj  = this.get('templateObject'),","           overlay;","","        //","        //  Create containing Overlay","        //","        overlay = this._createOverlay();","","        //","        //  Add buttons in the Overlay footer section","        //  (we aren't using overlay, so have to add these manually ...)","        //","        if( ocfg && ocfg.buttons ) {","            this._createOverlayButtons(overlay);","        }","","        if( tobj && Y.Lang.isObject(tobj) ) {","            this._createTemplateContent(overlay);","        }","","        //","        this._inputNode = overlay.get('contentBox').one('.'+this._classInput);","","        // render it, save it and leave ...","        this.overlay = overlay;","        overlay.render();","","        this.fire('editorCreated',{","            inputNode:  this._inputNode,","            container:  overlay","        });","","        this.set('container',overlay);","","        this.overlay = overlay;","","    },","","    /**","     * View event fired when the inline editor has been initialized and ready for usage.","     * This event can be listened to in order to add additional content or widgets, etc onto","     * the View's container.","     *","     * @event editorCreated","     * @param {Object} rtn Returned object","     *  @param {Node} rtn.inputNode The created INPUT[text] node, if any","     *  @param {Object} rtn.container The View container / Overlay instance","     */","","    /**","     * Detaches the listeners that were set on this view, any widgets that were created","     * and on the View's Overlay instance.","     * @method _unbindUI","     * @private","     */","    _unbindUI: function(){","","        Y.Array.each(this._subscr,function(e){","            if(e && e.detach) {","                e.detach();","            }","        });","        this._subscr = null;","","        if(this.widget) {","            this.widget.destroy({remove:true});","        }","","        if(this.overlay) {","            this.overlay.destroy({remove:true});","            this.overlay = null;","        }","","    },","","//======================   PUBLIC METHODS   ===========================","","    /**","     * Method that displays the editor configured for the input TD node, this is done","     * in lieu of a `render` method for this View.  If no `td` is provided then the","     * last configured [cell](#attr_cell) attribute's `td` property is used.","     *","     * @method showEditor","     * @param {Node} tar Target TD cell that editing takes place on","     * @public","     */","    showEditor: function(td){","","        td = td || this.get('cell').td;","","        var cell   = this.get('cell'),","            td_xy  = td.getXY(),","            off_xy = this.get('offsetXY'),","            td_w   = +(td.getComputedStyle('width').replace(/px/,'')),","            oVal   = (this._isZeroOr(cell.value)) ? cell.value : this.get('value');","            //(rec && coln) ? rec.get(coln) : null;","","    // Decorate the TD target and show the Overlay","        td.addClass(this._classEditing);","        this.overlay.show();","","        // clear up browser \"selected\" stuff","        this._clearDOMSelection();","","    //","    //  Position and resize the Overlay and input ...","    //","        if(off_xy) {","            td_xy[0] += off_xy[0];","            td_xy[1] += off_xy[1];","        }","","        this.overlay.set('xy',td_xy);","","        td_w = this.get('inputWidth') || td_w;","        if(this._inputNode) {","            this._inputNode.setStyle('width', td_w );","        }","","        this._set('visible',true);","        this._set('hidden',false);","","    // Set the initial display \"value\" in INPUT ... (mostly for text)","        this._setInputValue(oVal);","","        this.fire('editorShow',{","            td:         td,","            cell:       cell,","            inputNode:  this._inputNode,","            value:      oVal //cell.value || this.get('value')","        });","","    },","","    /**","     * Event fired when the cell editor is displayed and becomes visible.","     *","     * Implementers may listen for this event if they have configured complex View's, that include","     * other widgets or components, to update their UI upon displaying of the view.","     *","     * @event editorShow","     * @param {Object} rtn Returned object","     * @param {Node} rtn.inputNode The editor's INPUT / TEXTAREA Node","     * @param {String|Number|Date} rtn.value The current \"value\" setting","     * @param {Object} rtn.cell object","     *  @param {Node} rtn.cell.td TD Node undergoing editing","     *  @param {String} rtn.cell.recClientId The active record's \"clientId\" attribute setting","     *  @param {String} rtn.cell.colKey The active column's key or name setting","     */","","","    /**","     * Called when the user has requested to cancel, and abort any changes to the DT cell,","     * usually signified by a keyboard ESC or \"Cancel\" button, etc..","     *","     * @method cancelEditor","     * @public","     */","    cancelEditor: function(){","        this.fire(\"editorCancel\",{","            td:         this.get('cell').td,","            cell:       this.get('cell'),","            oldValue:   this.get('lastValue')","        });","    },","","    /**","     * Fired when editing is cancelled (without saving) on this cell editor","     * @event editorCancel","     * @param {Object} rtn Returned object","     *  @param {Node} rtn.td TD Node for the edited cell","     *  @param {Object} rtn.cell Current cell object","     *  @param {String|Number|Date} rtn.oldValue Data value of this cell prior to editing","     */","","    /**","     * Saves the View's `value` setting (usually after keyboard RTN or other means) and fires the","     * [editorSave](#event_editorSave) event so consumers (i.e. DataTable) can make final changes to the","     * Model or dataset.","     *","     * Thank you to **Satyam** for his guidance on configuring the event publishing, defaultFn related to this","     * technique!","     *","     * @method saveEditor","     * @param val {String|Number|Date} Value to save to the current editor's [value](#attr_value) attribute","     * @public","     */","    saveEditor: function(val){","        var cell = this.get('cell'),","            savefn;","","        val = (val !== undefined && val !== null) ? val : this.get('value') ||  this._inputNode.get('value');","","        //","        // If a valid record exists and we found the updated \"value\" from this View,","        //   then apply the changed \"value\" to the record (Model) attribute ...","        //","        if( val !== undefined && val !== null ) {","","            // If a \"save\" function was defined, run thru it and update the \"value\" setting","            savefn = this.get('saveFn');","            val = (savefn) ? savefn.call(this,val) : val;","","            if(val === undefined) {","                //val = this.get('lastValue');","                this.cancelEditor();","                return;","            }","","            // set the 'lastValue' attribute prior to updating value in View","            if(val) {","                this.set('lastValue',this.get('value'));","            }","","            // set this editor's value ATTR","           // this.set('value',val);","            this.fire(\"editorSave\",{","                td:         cell.td,","                cell:       cell,","                oldValue:   this.get('lastValue'),","                newValue:   val","            });","","        }","","    },","","    /**","     * Event that is fired when the user has finished editing the View's cell contents (signified by either","     * a keyboard RTN entry or \"Save\" button, etc...).","     *","     * This event is intended to be the PRIMARY means for implementers to know that the editing has been","     * completed and validated.  Consumers (i.e. DataTable) should listen to this event and process it's results","     * to save to the Model and or dataset for the DT.","     *","     * @event editorSave","     * @param {Object} rtn Returned object","     *  @param {Node} rtn.td TD Node for the edited cell","     *  @param {Object} rtn.cell Current cell object","     *  @param {String|Number|Date} rtn.oldValue Data value of this cell prior to editing","     *  @param {String|Number|Date} rtn.newValue Data value of this cell after editing","     */","","    /**","     * Hides the current editor View instance.  If the optional `hideMe` param is true this View will","     * be temporarily \"hidden\" (used for scrolling DT's when the TD is scrolled off/on to the page)","     *","     * @method hideEditor","     * @param keep {Boolean} Keep visible set to true/false","     * @public","     */","    hideEditor: function(hideMe){","        var cell;","        if(this.overlay) {","            this.overlay.hide();","        }","","        cell = this.get('cell');","        if(cell && cell.td) {","            cell.td.removeClass(this._classEditing);","        }","","        if(hideMe===true) {","            this._set('hidden',true);","        }","        this._set('visible',false);","","        this.fire('editorHide');","    },","","    /**","     * Fired when the active cell editor is hidden","     * @event editorHide","     */","","","//======================   PRIVATE METHODS   ===========================","","    /**","     * The defaultFn for the `editorSave` event","     * @method _defEditorSaveFn","     * @param e {EventFacade} For editorSave event","     * @private","     */","    _defEditorSaveFn: function(e){","        this.set('value', e.newValue);","        this.hideEditor();","    },","","    /**","     * The defaultFn for the `editorCancel` event","     * @method _defEditorCancelFn","     * @private","     */","    _defEditorCancelFn: function(){","        this.hideEditor();","    },","","    /**","     * Method that creates the Editor's Overlay instance and populates the base content.","     * @method _createOverlay","     * @return {Y.Overlay}","     * @private","     */","    _createOverlay: function(){","        var ocfg  = this.get('overlayConfig'),","            html,overlay;","    //","    //  Create the Overlay","    //","        html = Y.Lang.sub(this.get('template'),{","            classOverlay:   this._classOverlay+' '","        });","","        // Merge the user-supplied Config object with some defaults","        if(this.get('overlayWidth')) {","            ocfg.width = this.get('overlayWidth');","        }","","        ocfg = Y.merge(ocfg,{","            contentBox: Y.Node.create(html),","            bodyContent: ' ',","            zIndex:     99,","            visible:    false,","            render:     true","        });","","        // Create the Overlay, plugin the drag-drop","        overlay = new Y.Overlay(ocfg);","        if(Y.Plugin.Drag) {","            overlay.plug(Y.Plugin.Drag);","        }","        overlay.hide();","","        // Set the inputNode property ... point to INPUT or TEXTAREA, SELECT, etc..","        this._inputNode = overlay.get('contentBox').one('.'+this._classInput);","","        return overlay;","    },","","","    /**","     * Method creates a footer section within the Overlay and adds the buttons entered","     * as the \"buttons\" config property of \"overlayConfig\".","     *","     * @method _createOverlayButtons","     * @param {Widget} overlay","     * @private","     */","    _createOverlayButtons: function(overlay){","        var ov_cfg  = this.get('overlayConfig'),","            ov_btns = ov_cfg.buttons, // value, action","            ov_cbox = overlay.get('contentBox'),","            ov_ftr  = ov_cbox.appendChild(Y.Node.create('<div class=\"yui3-widget-ft\"></div>')),","            btn_html, btn_node;","","        // Loop over all Buttons in the configs, creating them one at a time","        //  button config is expected to have {name,value,action} members","        Y.Array.each(ov_btns, function(btn){","","            // build the button HTML ...","            btn_html = Y.Lang.sub(this.btnTemplate,{","                classButton: this._classOverlayBtn + ( (btn.name) ? '-' + btn.name : ''),","                name:        btn.name || 'btn',","                value:       btn.value || 'unknown label'","            });","","            // create the BUTTON, appending to footer section of the Overlay ...","            btn_node = ov_ftr.appendChild( Y.Node.create(btn_html) );","","            // and add it's click handler ...","            if(btn_node && btn.action && Y.Lang.isFunction(btn.action) ) {","                this._subscr.push( btn_node.on('click', Y.bind( btn.action,this) )  );","            }","","        },this);","","    },","","    /**","     * Method used to process the [templateObject](#attr_templateObject) attribute and generate the","     * Overlay's `bodyContent`.  This method uses the `Y.Template` module to prepare the HTML, which","     * is passed in via [templateObject](#attr_templateObject)'s `html` property.","     *","     * This method uses the `Y.Template.Micro` module by default to process the template.  Implementers","     * can pass in any different Y.Template supported-template engine via the [templateEngine](#attr_templateEngine)","     * attribute (i.e. `templateEngine: Y.Handlebars`) but will have to modify the `html` property of templateObject","     * appropriately for that engine.","     *","     * Implementers can pass in \"options\" and other properties to the [templateObject](#attr_templateObject) ATTR and","     * this function will normalize the `this.options` to an Object with keys {value,text,title,raw} which can be","     * used more directly within HTML construction.","     *","     * The templateObject ATTR `options` property can be either an Array or an Object, this function converts and","     * normalizes the content to an output Array as `this.options` within the template definitions.","     *","     * @method _createTemplateContent","     * @param overlay {Widget} Overlay instance for this View","     * @private","     */","    _createTemplateContent: function(overlay) {","        var tmplObj  = Y.merge(this.get('templateObject')),","            ename    = this.get('name'),","            tmplOpts = this.get( ename + 'Options') || tmplObj.options,","            tmplEng,tmicro,compiledHTML,robj,html;","","        // use a Template \"engine\" if defined, otherwise Template.Micro","        tmplEng  = this.get('templateEngine');","        tmicro   = new Y.Template(tmplEng);","","","        // check for template-type strings ...","        html = tmplObj.html;","","","        if( /<%|\\{\\{/.test(html) ) {","            //","            //  Setup template object properties","            //","            tmplObj.classInput = this._classInput;","            tmplObj.propValue  = this.get('propValue') || tmplObj.propValue || 'value';","            tmplObj.propText   = this.get('propText') || tmplObj.propText || 'text';","            tmplObj.propTitle  = this.get('propTitle') || tmplObj.propTitle;","","            //","            //  Typecheck for the template \"options\", if an Object hash, then convert to","            //   an array.","            //","","            // Normalize options array to {value: text: title: format}","            if(Y.Lang.isArray(tmplOpts)) {","                tmplObj.options = [];","                Y.Array.each(tmplOpts,function(r){","                    robj = {};","                    if(Y.Lang.isObject(r)) {","                        robj = {","                            value: r[tmplObj.propValue],","                            text: r[tmplObj.propText],","                            title: (tmplObj.propTitle) ? r[tmplObj.propTitle] || tmplObj.propTitle : null,","                            raw: r","                        };","                    } else {","                        robj = {value:r, text:r, title:null, raw:r};","                    }","                    tmplObj.options.push(robj);","                },this);","","            } else if ( Y.Lang.isObject(tmplOpts) ) {","                tmplOpts = Y.merge(tmplOpts);","                tmplObj.options = [];","                Y.Object.each(tmplOpts,function(v,k,obj){","                    if(this._isZeroOr(v) && this._isZeroOr(k)) {","                        robj = {","                            value: (Y.Lang.isString(k) && /^\\d*$/.test(k) ) ? +k : k,","                            text: v,","                            title: (tmplObj.propTitle) ? tmplObj.propTitle : null,","                            raw: obj","                        };","                        tmplObj.options.push( robj );","                    }","                },this);","            }","","            //","            //  Run thru and compile the template and execute it and set the HTML to the Overlay's \"body\"","            //","            compiledHTML = tmicro.compile(tmplObj.html);","            if(compiledHTML) {","                html = compiledHTML(tmplObj);","            }","","        }","","        //","        //  Set the html for the Overlay ...","        //    if no Template tags are present, it just puts templateObject.html inside","        //","        if(html) {","            overlay.set('bodyContent', html );","        }","","    },","","    /**","     * This method can be used to quickly reset the current View editor's position,","     *  used for scrollable DataTables.","     * @method _setEditorXY","     * @param e {EventFacade} The xy attribute change event facade","     * @private","     */","    _setEditorXY: function(e) {","        if(this.overlay && e.newVal) {","            this.overlay.set('xy', e.newVal);","        }","    },","","    /**","     * Provides a method to process keydown entries and validate or prevent invalid inputs.","     * This method is meant to be overrideable by implementers.","     *","     * @method _onKeyPress","     * @param e {EventFacade} Key press event object","     * @public","     */","    _onKeyPress: function(e) {","        var keyc    = e.keyCode,","            inp     = e.target || this._inputNode,","            value   = inp.get('value'),","            keyfilt = this.get('keyFiltering'),","         //   keyvald = this.get('keyValidator'),","            kchar   = String.fromCharCode(keyc),","            flagRE  = true,","            krtn;","","        //","        // If RTN, then prevent and save ...","        //","        if(keyc === KEYC_RTN) {","            e.preventDefault();","            this.saveEditor(value);","        }","","        //","        // Check key filtering validation ... either a RegExp or a user-function","        //","        if(keyfilt instanceof RegExp) {","            flagRE = (!kchar.match(keyfilt)) ? false : flagRE;","        } else if (Y.Lang.isFunction(keyfilt)) {","            krtn = keyfilt.call(this,e);","            flagRE = (krtn) ? true : false;","        }","","        // If key filtering returned false, prevent continuing","        if(!flagRE) {","            e.preventDefault();","        }","","    },","","","    /**","     * Key listener for the INPUT inline editor, \"keydown\" is checked for non-printing key","     *  strokes, navigation or ESC","     *","     * @method _onKeyDown","     * @param e {EventFacade} Keydown event facade","     * @private","     */","    _onKeyDown : function(e){","        var keyc    = e.keyCode,","            dir;","","        switch(keyc) {","","            case KEYC_ESC:","                e.preventDefault();","                this.cancelEditor();","                break;","","            case KEYC_UP:","                dir = (e.ctrlKey) ? [-1,0] : null;","                break;","","            case KEYC_DOWN:","                dir = (e.ctrlKey) ? [1,0] : null;","                break;","","            case KEYC_LEFT:","                dir = (e.ctrlKey) ? [0,-1] : null;","                break;","","            case KEYC_RIGHT:","                dir = (e.ctrlKey) ? [0,1] : null;","                break;","","            case KEYC_TAB: // tab","                dir = (e.shiftKey) ? [0,-1] : [0,1] ;","                break;","        }","","        //","        //  If dir is non-falsey, a navigation direction was set ...","        //","        if(dir) {","            // set the key direction movement","            if(this.get('inputKeys')===true) {","                this._set('keyDir',dir);","            }","            e.preventDefault();","        }","","    },","","    /**","     * Utility method that checks if a value (include ZERO!!) is defined and","     * not null  (there's probably a much better way to do this)","     *","     * @method _isZeroOr","     * @param v {Number|String} Value to check","     * @return {Boolean} True if value is defined, not null, and possibly zero","     * @private","     */","    _isZeroOr : function(v) {","        return (v !== undefined && v !== null) ? true : false;","    },","","    /**","     * Listener to mouseleave event that closes the active editor","     * @method _mouseLeave","     * @private","     */","    _mouseLeave: function(){","        this.cancelEditor();","    },","","    /**","     * @method _setInputValue","     * @param {Number|String|Date} val","     * @return {*}","     * @private","     */","    _setInputValue: function(val) {","        var prepFn;","        val = val || this.get('cell').value || this.get('value');","","        if(!val) {","            return;","        }","","        prepFn = this.get('prepFn');","        val = (prepFn) ? prepFn.call(this,val) : val;","","        if(this._inputNode){","            this._inputNode.set('value',val);","        }","","        return val;","    },","","    /**","     * Helper method to clear DOM \"selected\" text or ranges","     * NOTE: could probably do this with CSS `user-select: none;`, but anyway ...","     * @method _clearDOMSelection","     * @private","     */","    _clearDOMSelection: function(){","        var sel = (Y.config.win.getSelection) ? Y.config.win.getSelection()","            : (Y.config.doc.selection) ? Y.config.doc.selection : null;","","        if ( sel && sel.empty ) {","            sel.empty();","        }    // works on chrome","","        if ( sel && sel.removeAllRanges ) {","            sel.removeAllRanges();","        }    // works on FireFox","    }","","},{","    ATTRS:{","","        /**","         * Name for this View, this is useful because the `name` attribute is prefixed to the","         *  'Options' string for some Views (i.e. a cell editor named 'myRadio' will have a defined","         *  set of options available of 'myRadioOptions'","         *","         * @attribute name","         * @type String","         * @default null","         */","        name: {","            value:      null,","            validator:  Y.Lang.isString","        },","","        /**","         * Defines the Overlay's HTML template for the overall View (not recommended to change this!!)","         * NOTE: This the Overlay structure template **and not** the bodyContent template for the Overlay,","         * it is not recommended you change this attr.","         *","         * Please see the [templateObject](#attr_templateObject) attribute to define the HTML for your View!","         *","         * @attribute template","         * @type String","         * @private","         * @default","         */","        template:{","            valueFn:  function(){ return this.template; },","            validator:  Y.Lang.isString","        },","","        /**","         * Additional config parameters for the Overlay to be used in constructing the Editor.","         * These configs are merged with the defaults required by the Editor.","         *","         * @attribute overlayConfig","         * @type Object","         * @default {}","         */","        overlayConfig:{","            value:      {},","            validator:  Y.Lang.isObject","        },","","","        /**","         * Specifies a width attribute style to set the `_classInput` Node element to upon rendering.","         * @attribute inputWidth","         * @type String|Number","         * @default null","         */","        inputWidth: {","            value:  null","        },","","        /**","         * Defines the `width` parameter to set the Overlay widget to upon rendering, can also be overridden","         * by setting `overlayConfig.width`.","         * @attribute overlayWidth","         * @type String|Number","         * @default null","         */","        overlayWidth:{","            value:  null","        },","","        /**","         * A flag to indicate if cell-to-cell navigation should be implemented (currently setup for CTRL-arrow","         * key, TAB and Shift-TAB) capability","         * @attribute inputKeys","         * @type Boolean","         * @default true","         */","        inputKeys:{","            value:      true,","            validator:  Y.Lang.isBoolean","        },","","        /**","         * Defines the type of template engine that will be used to parse Templates, (via Y.Template).","         * Typically this would be set to `Y.Template.Micro` or `Y.Handlebars`","         *","         * NOTE: If you use Y.Handlebars (or any other YUI template engine) you MUST include it in your YUI.use","         * loader statement (\"template\" is included in this module's `requires` by default)","         *","         * @attribute templateEngine","         * @type Object","         * @default Y.Template.Micro","         */","        templateEngine: {","            value:  Y.Template.Micro","        },","","        /**","         * This attribute is used to define the HTML content that will be created / generated and inserted within","         * this View's Y.Overlay.   The attribute definitions include an object with the following recognizable","         * properties: `html, xxxOptions, propValue, propText, propTitle`","         *","         * Note that xxxOptions matches the `name` attribute (i.e. the editor \"name\" you include on your column","         * definitions), where xxx is replaced with the name.  For \"radio\" it is `radioOptions`, for \"select\" it is","         * `selectOptions`, \"checkbox\" it is `checkboxOptions`, etc...","         *","         * The method [_createTemplateContent](#method__createTemplateContent) uses this attribute and processes the","         * template using the `html` and other properties to generate the HTML.  It then inserts the compiled HTML into","         * the Overlay's `bodyContent`.","","         * @example","         *","         *      templateObject: {","         *          // set the template definition","         *          html: '<select class=\"myselect\">'","         *             +  '<% Y.Array.each( data.options, function(r){ %>'","         *             +  '<option value=\"<%= r.value %>\" <% (r.title) ? \\'title=\"r.title\"\\' :  %>>'","         *             +  '<%= r.text %></option>'","         *             +  '<% },this); %>'","         *             +  '</select>'","         *          options: states   // [ {value:'AZ', text:'Arizona}, {value:'DE', text:'Delaware' } ]","         *      }","         *","         * @attribute templateObject","         * @type Object","         * @default null","         */","        templateObject: {","            value:  null","        },","","        /**","         * A cell reference object populated by the calling DataTable, contains the following key properties:","         *   `{td,value,recClientId,colKey}`","         * @attribute cell","         * @type Object","         * @default {}","         */","        cell: {","            value:  {}","        },","","        /**","         * Maintains a reference back to the calling DataTable instance (not really used yet)","         * @attribute hostDT","         * @type Y.DataTable","         * @default null","         */","        hostDT : {","            value:  null,","            validator:  function(v) { return v instanceof Y.DataTable; }","        },","","        /**","         * Value that was saved in the Editor View and returned to the record","         *","         * @attribute value","         * @type {String|Number|Date}","         * @default null","         */","        value: {","            value:  null","        },","","        /**","         * Value that was contained in the cell when the Editor View was initiated","         *","         * @attribute lastValue","         * @type {String|Number|Date}","         * @default null","         */","        lastValue:{","            value:  null","        },","","        /**","         * Function to execute on the \"data\" contents just prior to displaying in the Editor's main view","         * (i.e. typically used for pre-formatting Date information from JS to mm/dd/YYYY format)","         *","         * This function will receive one argument \"value\" which is the data value from the record, and","         *  the function runs in Editor scope.","         *","         * @attribute prepFn","         * @type Function","         * @default null","         */","        prepFn:{","            value:      null,","            validator:  Y.Lang.isFunction","        },","","        /**","         * Function to execute when Editing is complete, prior to \"saving\" the data to the Record (Model)","         *","         * This function will receive one argument \"value\" which is the data value from the INPUT or Widget, and","         *  the function runs in Editor scope.","         *","         * @attribute saveFn","         * @type Function","         * @default null","         */","        saveFn:{","            value:      null,","            validator:  Y.Lang.isFunction","        },","","        /**","         * Tracks navigation changes during keyboard input as relative [row,col] changes from the currently","         * active cell TD.","         *","         * @attribute keyDir","         * @type Array as [row,col] from current TD","         * @readOnly","         * @default []","         */","        keyDir: {","            value:      [],","            readOnly:   true,","            validator:  Y.Lang.isArray","        },","","        /**","         * Setting for checking the visibility status of this Editor","         * @attribute visible","         * @type Boolean","         * @default false","         * @readOnly","         */","        visible: {","            value:      false,","            readOnly:   true,","            validator:  Y.Lang.isBoolean","        },","","        /**","         * Setting to check if the editor is \"still open\" but just hidden, created in order to support","         * scrolling datatables when an editor scrolls out of open window.","         *","         * @attribute hidden","         * @type Boolean","         * @default false","         * @readOnly","         */","        hidden: {","            value:      false,","            readOnly:   true,","            validator:  Y.Lang.isBoolean","        },","","        /**","         * Sets an offset of the XY coordinates that will be used for positioning the Overlay upon","         * displaying the editor View","         * @attribute offsetXY","         * @type Array","         * @default [0,0]","         */","        offsetXY :{","            value: [0,0],","            validator:  Y.Lang.isArray","        },","","        /**","         * XY coordinate position of the View container Overlay for this editor","         * @attribute xy","         * @type Array","         * @default null","         */","        xy : {","            value:      null,","            validator:  Y.Lang.isArray","        },","","        /**","         * Provides a keystroke filtering capability to restrict input into the editing area checked during the","         * \"keypress\" event.  This attribute is set to either a RegEx or a function that confirms if the keystroke","         * was valid for this editor.  (TRUE meaning valid, FALSE meaning invalid)","         *","         * If a function is provided, the single argument is the keystroke event facade `e` and if","         * the keystroke is valid it should return true, otherwise if invalid false;","         *","         *  @example","         *      /\\d/            // for numeric digit-only input","         *      /\\d|\\-|\\./      // for floating point numeric input","         *      /\\d|\\//         // for Date field entry in MM/DD/YYYY format","         *","         * @attribute keyFiltering","         * @type {RegExp|Function}","         * @default null","         */","        keyFiltering:  {","            value:  null","        },","","        /**","         * Provides the capability to validate the final saved value after editing is finished.","         * This attribute can be set to either a RegEx or a function, that operates on the entire","         * \"value\" setting of the editor input (whereas [keyFiltering](#attr_keyFilter) performs","         * validation checks on each key input).","         *","         * If a function is provided, the single argument is the value setting of the editor.","         * the keystroke is valid it should return true, otherwise if invalid false;","         *","         *  @example","         *      /\\d/            // for numeric digit-only input","         *      /\\d|\\-|\\.|\\+/   // for floating point numeric input","         *      /\\d|\\//         // for Date field entry in MM/DD/YYYY format","         *","         * @attribute validator","         * @type {RegExp|Function}","         * @default null","         */","        validator: {","            value:      null","        }","","        /**","          Concept for user-prescribed key mappings ... still incomplete","","            keyNav:{","","               keydown:  {","                    left:  [ {ctrlKey:37}, {shiftKey:9}","                    right: [ {ctrlKey:39","                    up:    [ 38","                    down:  [ 40","                    save:  [ 13","                    cancel: [27","               },","","               mouse: {","                   open : [click, focus]","                   close : [ blur ]","               }","            }","","         */","","","    }","});","","","//====================================================================================================================","//                   P O P U P    C E L L    E D I T O R    D E F I N I T I O N S","//====================================================================================================================","","","/**"," ### Popup Cell Editor \"text\""," This View configuration is used to setup a basic textbox type popup cell editor.",""," ##### Basic Usage","        // Column definition","        { key:'firstName', editor:\"text\"}","","        // Column definition ... disabling inputKeys navigation and setting offsetXY","        { key:'firstName',","          editor:\"text\", editorConfig:{ inputKeys:false, offsetXY: [5,7] }","        }",""," ##### Standard Configuration"," This editor creates a simple INPUT[text] internally within the popup Editor View container positioned"," directly over the TD element.",""," The configuration {Object} for this cell editor View is predefined as;","","        Y.DataTable.EditorOptions.text = {","            BaseViewClass:  Y.DataTable.BaseCellPopupEditor,","            name:           'text',","            templateObject: {","                // Template.Micro setup","                html: '<input type=\"text\" title=\"inline cell editor\" class=\"<%= this.classInput %>\"  />'","            },","            inputKeys:      true,","            after:{","                editorShow : function(o){","                    o.inputNode.focus();","                }","            }","        };",""," **PLEASE NOTE:** All other attributes from the `BaseViewClass` apply and can be included within the"," `editorConfig` object.",""," @class Y.DataTable.EditorOptions.text"," @since 3.8.0"," @public"," **/","Y.DataTable.EditorOptions.text = {","    BaseViewClass:  Y.DataTable.BaseCellPopupEditor,","    name:           'text',","","    templateObject: {","        html: '<input type=\"text\" title=\"inline cell editor\" class=\"<%= this.classInput %>\"  />'","    },","","    inputKeys:      true,","","    after:{","        editorShow : function(o){","            o.inputNode.focus();","        }","    }","","};","","/**"," ### Popup Cell Editor \"textarea\""," This View configuration is used to setup an editor referenced as \"textarea\" as a popup-type cell editor.",""," ##### Basic Usage:","        // Column definition","        { key:'experience', editor:\"textarea\"}","","        // Column definition ... disabling inputKeys navigation and setting offsetXY","        { key:'firstName',","          editor:\"JobDescription\", editorConfig:{","             // disables the buttons below the TEXTAREA","             overlayConfig:{ buttons: null }","          }","        }",""," ##### Standard Configuration"," This editor creates a simple TEXTAREA internally within the popup Editor View container positioned"," directly over the TD element.",""," The configuration {Object} for this cell editor View is predefined as;","","        Y.DataTable.EditorOptions.textarea = {","            BaseViewClass:  Y.DataTable.BaseCellPopupEditor,","            name:           'textarea',","","            // Template.Micro setup","            templateObject:{","                    html: '<textarea title=\"inline cell editor\" class=\"<%= this.classInput %>\"></textarea>'","                },","","            // allow inter-cell navigation","            inputKeys: true,","","            // setup two buttons \"Save\" and \"Cancel\" for the containing overlay","            overlayConfig:{","                buttons:   [","                    { name:'save', value: 'Save',","                        action:function(){","                            var val = (this._inputNode) ? this._inputNode.get('value') : null;","                            this.saveEditor(val);","                        }","                    },","                    { name:'cancel', value: 'Cancel',","                        action:function(){","                            this.cancelEditor();","                        }","                    }","                ]","            },","","            after:{","                // focus the TEXTAREA on display","                editorShow : function(o){","                    o.inputNode.focus();","                }","            }","        };",""," **PLEASE NOTE:** All other attributes from the `BaseViewClass` apply and can be included within the"," `editorConfig` object.",""," @class Y.DataTable.EditorOptions.textarea"," @since 3.8.0"," @public"," **/","Y.DataTable.EditorOptions.textarea = {","    BaseViewClass:  Y.DataTable.BaseCellPopupEditor,","    name:           'textarea',","    templateObject:{","        html: '<textarea title=\"inline cell editor\" class=\"<%= this.classInput %>\"></textarea>'","    },","","    inputKeys: true,","    // setup two buttons \"Save\" and \"Cancel\" for the containing overlay","    overlayConfig:{","        buttons:   [","            { name:'save', value: 'Save',","                action:function(){","                    var val = (this._inputNode) ? this._inputNode.get('value') : null;","                    this.saveEditor(val);","                    //this.fire('editorSave',val);","","                }","            },","            { name:'cancel', value: 'Cancel',","                action:function(){","                    this.cancelEditor();","                }","            }","        ]","    },","","    after:{","        editorShow : function(o){","            o.inputNode.focus();","           // o.inputNode.select();","        }","    }","","};","","","/**"," ### Popup Cell Editor \"number\""," This View configuration is used to setup a basic numeric editor as a popup-type cell editor."," A `saveFn` is prescribed that handles validation and converting the input text to numeric format.",""," ##### Basic Usage","        // Column definition","        { key:'salary', editor:\"number\" }","","        // Column definition ... disabling keyfiltering and setting a CSS class","        { key:'firstName',","          editor:\"text\", editorConfig:{ className:'align-right', keyFiltering:null }","        }",""," ##### Standard Configuration"," This editor creates a simple INPUT[text] internally within the popup Editor View container positioned"," directly over the TD element. Configuration is almost identical to [text](/api/classes/Y.DataTable.EditorOptions.text.html#index)"," editor except for the pre-selection of contents and conversion of saved value to numeric format in saveFn.",""," The configuration {Object} for this cell editor View is predefined as;","","        Y.DataTable.EditorOptions.number = {","            BaseViewClass:  Y.DataTable.BaseCellPopupEditor,","            name:           'number',","            templateObject:{","                // Template.Micro template","                html: '<input type=\"text\" title=\"inline cell editor\" class=\"<%= this.classInput %>\"  />'","            },","            inputKeys: true,","","            // only permit digit, '.' and '-' keys in the input, reject others ...","            keyFiltering:   /\\.|\\d|\\-/,","","            // Set a flaoting point number validation RegEx expression","            validator:  /^\\s*(\\+|-)?((\\d+(\\.\\d+)?)|(\\.\\d+))\\s*$/,","","            // Function to call after numeric editing is complete, prior to saving to DataTable ...","            //  i.e. checks validation against ad-hoc attribute \"validationRegExp\" (if it exists)","            //       and converts the value to numeric (or undefined if fails regexp);","            saveFn: function(v){","                var vre = this.get('validator'),","                    value;","                if(vre instanceof RegExp) {","                    value = (vre.test(v)) ? +v : undefined;","                } else {","                    value = +v;","                }","                return value;","            },","","            // Set an after listener to this View's instance","            after: {","","                //---------","                // After this view is displayed,","                //   focus and \"select\" all content of the input (for quick typeover)","                //---------","                editorShow : function(o){","                    // initially set focus / select entire INPUT","                    o.inputNode.focus();","                    o.inputNode.select();","                }","            }","        };",""," **PLEASE NOTE:** All other attributes from the `BaseViewClass` apply and can be included within the"," `editorConfig` object.",""," @class Y.DataTable.EditorOptions.number"," @since 3.8.0"," @public"," **/","Y.DataTable.EditorOptions.number = {","    BaseViewClass:  Y.DataTable.BaseCellPopupEditor,","    name:           'number',","","    templateObject:{","        html: '<input type=\"text\" title=\"inline cell editor\" class=\"<%= this.classInput %>\"  />'","    },","","    inputKeys:      true,","","    /**","     * A validation regular expression object used to check validity of the input floating point number.","     * This can be defined by the user to accept other numeric input, or set to \"null\" to disable regex checks.","     *","     * @attribute validator","     * @type RegExp","     * @default /^\\s*(\\+|-)?((\\d+(\\.\\d+)?)|(\\.\\d+))\\s*$/","     */","    validator:  /^\\s*(\\+|-)?((\\d+(\\.\\d+)?)|(\\.\\d+))\\s*$/,","","    keyFiltering:   /\\.|\\d|\\-/,","","    // Function to call after numeric editing is complete, prior to saving to DataTable ...","    //  i.e. checks validation against ad-hoc attribute \"validationRegExp\" (if it exists)","    //       and converts the value to numeric (or undefined if fails regexp);","    saveFn: function(v){","        var vre = this.get('validator'),","            value;","        if(vre instanceof RegExp) {","            value = (vre.test(v)) ? +v : undefined;","        } else {","            value = +v;","        }","        return value;","    },","","    // Set an after listener to this View's instance","    after: {","","        //---------","        // After this view is displayed,","        //   focus and \"select\" all content of the input (for quick typeover)","        //---------","        editorShow : function(o){","            // initially set focus / select entire INPUT","            o.inputNode.focus();","            o.inputNode.select();","        }","    }","};","","/**"," ### Popup Cell Editor \"date\""," This View configuration is used to setup a bare-bones date editor as a popup-type cell editor."," Configuration is setup with both `prepFn` and `saveFn` to convert the Date object.",""," ##### Basic Usage","        // Column definition","        { key:'firstName', editor:\"date\"}","","        // Column definition ... with user-defined dateFormat and disabling keyfiltering","        { key:'firstName',","          editor:\"text\", editorConfig:{ dateFormat: '%Y-%m-%d', keyFiltering:null }","        }",""," ##### Standard Configuration"," This editor creates a simple INPUT[text] internally within the popup Editor View container positioned"," directly over the TD element.  Additionally, if a \"dateFormat\" editorOption is provided the value of"," the INPUT will be pre-processed with that format.  On save, the value of the input is parsed back to"," a Date object for the DT.",""," The configuration {Object} for this cell editor View is predefined as;","","        Y.DataTable.EditorOptions.date = {","            BaseViewClass:  Y.DataTable.BaseCellPopupEditor,","            name:           'date',","","            // Template.Micro setup","            templateObject: {","                html: '<input type=\"text\" title=\"inline cell editor\" class=\"<%= this.classInput %>\"  />'","            },","","            inputKeys:  true,","            inputWidth: 75,   // width of the INPUT[text]","","            // only allow keyboard input of digits or '/' or '-' within the editor ...","            keyFiltering:   /\\/|\\d|\\-/,","","            // Function to call prior to displaying editor, to put a human-readable Date into","            //  the INPUT box initially ...","            prepFn: function(v){","                var dfmt = this.get('dateFormat') || \"%D\";","                return Y.DataType.Date.format(v,{format:dfmt});","            },","","            // Function to call after Date editing is complete, prior to saving to DataTable ...","            //  i.e. converts back to \"Date\" format that DT expects ...","            saveFn: function(v){","                return Y.DataType.Date.parse(v) || undefined;","            }","        };",""," **PLEASE NOTE:** All other attributes from the `BaseViewClass` apply and can be included within the"," `editorConfig` object.",""," @class Y.DataTable.EditorOptions.date"," @since 3.8.0"," @public"," **/","Y.DataTable.EditorOptions.date = {","    BaseViewClass:  Y.DataTable.BaseCellPopupEditor,","    name:           'date',","    templateObject: {","        html: '<input type=\"text\" title=\"inline cell editor\" class=\"<%= this.classInput %>\"  />'","    },","","    inputKeys:  true,","    inputWidth: 75,","","    // only allow keyboard input of digits or '/' or '-' within the editor ...","    keyFiltering:   /\\/|\\d|\\-/,","","    // Function to call prior to displaying editor, to put a human-readable Date into","    //  the INPUT box initially ...","    prepFn: function(v){","        var dfmt = this.get('dateFormat') || \"%D\";","        return Y.DataType.Date.format(v,{format:dfmt});","    },","","    // Function to call after Date editing is complete, prior to saving to DataTable ...","    //  i.e. converts back to \"Date\" format that DT expects ...","    saveFn: function(v){","        return Y.DataType.Date.parse(v) || undefined;","    }","};","","","/**"," ### Popup Cell Editor \"calendar\""," This View configuration is used to setup an editor View as a \"calendar\" popup cell editor that"," includes a Y.Calendar widget incorporated within the View container.",""," ##### Basic Usage","        // Column definition","        { key:'startDate', editor:\"calendar\" }","","        // Column definition ...","        { key:'birthdate', label:'Employee DOB', formatter:\"shortDate\",","          editor:\"calendar\", editorConfig:{","             inputKeys:false,","          }","        }",""," ##### Standard Configuration"," This editor includes (a) an INPUT[text] and (b) Y.Calendar widget instance all within the same Overlay content.",""," *Configuration for this View is considerably more complex compared to other Views, requiring additional functions"," and listener functions to setup the Y.Calendar widget and to account for widget actions and events.*",""," The configuration {Object} for this cell editor View is predefined as;","","        Y.DataTable.EditorOptions.calendar = {","            BaseViewClass:  Y.DataTable.BaseCellPopupEditor,","            name:           'calendar',","            inputKeys:      true,","","            templateObject: {","                html: 'Enter Date: &nbsp; <input type=\"text\" title=\"inline cell editor\" class=\"<%= this.classInput %>\"  />'","                    + '<br/><div class=\"yui3-dt-editor-calendar\"></div>'","            },","","            // setup two buttons \"Save\" and \"Cancel\" for the containing overlay","            overlayConfig:{","                buttons:   [","                    { name:'save', value: 'Save',","                        action:function(){","                            var val = (this._inputNode) ? this._inputNode.get('value') : null;","                            this.saveEditor(val);","                        }","                    },","                    { name:'cancel', value: 'Cancel',","                        action:function(){ this.cancelEditor(); }","                    }","                ]","            },","","            inputWidth: 75,   // set the INPUT[type=text] field width in the Overlay","","            // only allow keyboard input of digits or '/' or '-' within the editor ...","            keyFiltering:   /\\/|\\d|\\-/,","","            // Function to call prior to displaying editor, to put a human-readable Date into","            //  the INPUT box initially ...","            prepFn: function(v){","                var dfmt = this.get('dateFormat') || \"%D\" || \"%m/%d/%Y\";","                return Y.DataType.Date.format(v,{format:dfmt});","            },","","            // Function to call after Date editing is complete, prior to saving to DataTable ...","            //  i.e. converts back to \"Date\" format that DT expects ...","            saveFn: function(v){","                return Y.DataType.Date.parse(v) || undefined;","            },","","            //","            // cell editor View instance event listeners ...","            //","            after: {","","                //-------","                // After this View is created,","                //    create the Calendar widget ...","                //-------","                editorCreated: function(){","                    var calNode = this.overlay.get('contentBox').one('.yui3-dt-editor-calendar'),","                        calWidget,","","                        // Define a basic config object for Y.Calendar ...","                        calConfig = {","                            // don't define a srcNode in here, because we are creating the node ...","                            height: '215px',","                            width:  '200px',","                            showPrevMonth: true,","                            showNextMonth: true,","","                            // Setup this Calendar widget instance's event listeners ...","                            after: {","","                                //-------","                                // After a \"selection\" is made in the widget,","                                //   updates the Editor's INPUT box on a widget date selection ...","                                //-------","                                selectionChange : function(o){","                                    var newDate = o.newSelection[0],","                                        editor  = this.editor, //this.get('editor'),","                                        prepFn  = editor.get('prepFn'),","                                        inpn    = editor._inputNode;","                                    inpn.set('value', (prepFn) ? prepFn.call(this,newDate) : newDate );","                                },","","                                //-------","                                // After a date is clicked in the widget,","                                //   save the Date","                                //-------","                                dateClick: function(o){","                                    var newDate = o.date,","                                        editor  = this.editor;","                                    editor.saveEditor(newDate);","                                }","                            }","                        },","","                        // Pass in user options via calendarConfig","                        userCalConfig = this.get('calendarConfig') || {};","","                    //","                    //  If the srcNode exists, and Y.Calendar library is available ... create the Widget","                    //","                    if(calNode && Y.Calendar) {","                        // combine the base configs with user configs","                        calConfig = Y.merge(calConfig,userCalConfig);","","                        calConfig.srcNode = calNode;","                        calWidget = new Y.Calendar(calConfig).render();","","                        // Attach a plugin to the Widget instance, if it is available","                        if(Y.Plugin.Calendar && Y.Plugin.Calendar.JumpNav) {","                            this.plug( Y.Plugin.Calendar.JumpNav, {","                                yearStart: 1988, yearEnd:   2021","                            });","                        }","","                    }","","                    //","                    //  Set a property on the Calendar widget instance to trackback to this editor view,","                    //  AND also attach the Widget instance to this view","                    //","                    calWidget.editor = this;","                    this.widget = calWidget;","","                },","","                //-------","                // After this View is destroyed,","                //    we need to destroy the Calendar widget instance ...","                //-------","                editorDestroyed: function(){","                    if(this.widget) {","                        this.widget.destroy({remove:true});","                    }","                },","","                //-------","                // After this View is displayed,","                //    setup the widget to display the current cell's Date value","                //-------","                editorShow: function(o){","                    var val = o.value;","","                    // Display the widget, and select the date (if valid)","                    if(this.widget) {","                        this.widget.show();","","                        if(Y.Lang.isDate(val)) {","                            this.widget.set('date',val);","                            this.widget.selectDates(val);","                        }","                    }","","                    // Update the INPUT[text] value with date and set it's focus","                    this._setInputValue(val);","                    o.inputNode.focus();","                },","","                //-------","                // After this View is hidden,","                //    hide the Calendar widget to avoid bleed-thru","                //-------","                editorHide: function(){","                    if(this.widget) {","                        this.widget.hide();","                    }","                },","","                //-------","                // After this View is hidden,","                //    hide the Calendar widget to avoid bleed-thru","                //-------","                editorSave: function(){","                    if(this.widget) {","                        this.widget.hide();","                    }","                }","            }","        };",""," **PLEASE NOTE:** All other attributes from the `BaseViewClass` apply and can be included within the `editorConfig`"," object.",""," @class Y.DataTable.EditorOptions.calendar"," @since 3.8.0"," @public"," **/","Y.DataTable.EditorOptions.calendar = {","    BaseViewClass:  Y.DataTable.BaseCellPopupEditor,","    name:           'calendar',","    inputKeys:      true,","","    templateObject: {","        html: 'Enter Date: &nbsp; <input type=\"text\" title=\"inline cell editor\" class=\"<%= this.classInput %>\"  />'","            + '<br/><div class=\"yui3-dt-editor-calendar\"></div>'","    },","","    // setup two buttons \"Save\" and \"Cancel\" for the containing overlay","    overlayConfig:{","        buttons:   [","            { name:'save', value: 'Save',","                action:function(){","                    var val = (this._inputNode) ? this._inputNode.get('value') : null;","                    this.saveEditor(val);","                }","            },","            { name:'cancel', value: 'Cancel',","                action:function(){ this.cancelEditor(); }","            }","        ]","    },","","    inputWidth: 75,","","    // only allow keyboard input of digits or '/' or '-' within the editor ...","    keyFiltering:   /\\/|\\d|\\-/,","","    // Function to call prior to displaying editor, to put a human-readable Date into","    //  the INPUT box initially ...","    prepFn: function(v){","        var dfmt = this.get('dateFormat') || \"%D\" || \"%m/%d/%Y\";","        return Y.DataType.Date.format(v,{format:dfmt});","    },","","    // Function to call after Date editing is complete, prior to saving to DataTable ...","    //  i.e. converts back to \"Date\" format that DT expects ...","    saveFn: function(v){","        return Y.DataType.Date.parse(v) || undefined;","    },","","    //","    // cell editor View instance event listeners ...","    //","    after: {","","        //-------","        // After this View is created,","        //    create the Calendar widget ...","        //-------","        editorCreated: function(){","            var calNode = this.overlay.get('contentBox').one('.yui3-dt-editor-calendar'),","                calWidget,","","                // Define a basic config object for Y.Calendar ...","                calConfig = {","                    // don't define a srcNode in here, because we are creating the node ...","                    height: '215px',","                    width:  '200px',","                    showPrevMonth: true,","                    showNextMonth: true,","","                    // Setup this Calendar widget instance's event listeners ...","                    after: {","","                        //-------","                        // After a \"selection\" is made in the widget,","                        //   updates the Editor's INPUT box on a widget date selection ...","                        //-------","                        selectionChange : function(o){","                            var newDate = o.newSelection[0],","                                editor  = this.editor, //this.get('editor'),","                                prepFn  = editor.get('prepFn'),","                                inpn    = editor._inputNode;","                            inpn.set('value', (prepFn) ? prepFn.call(this,newDate) : newDate );","                        },","","                        //-------","                        // After a date is clicked in the widget,","                        //   save the Date","                        //-------","                        dateClick: function(o){","                            var newDate = o.date,","                                editor  = this.editor;","                            editor.saveEditor(newDate);","                        }","                    }","                },","","                // Pass in user options via calendarConfig","                userCalConfig = this.get('calendarConfig') || {};","","            //","            //  If the srcNode exists, and Y.Calendar library is available ... create the Widget","            //","            if(calNode && Y.Calendar) {","                // combine the base configs with user configs","                calConfig = Y.merge(calConfig,userCalConfig);","","                calConfig.srcNode = calNode;","                calWidget = new Y.Calendar(calConfig).render();","","                // Attach a plugin to the Widget instance, if it is available","                if(Y.Plugin.Calendar && Y.Plugin.Calendar.JumpNav) {","                    this.plug( Y.Plugin.Calendar.JumpNav, {","                        yearStart: 1988, yearEnd:   2021","                    });","                }","","            }","","            //","            //  Set a property on the Calendar widget instance to trackback to this editor view,","            //  AND also attach the Widget instance to this view","            //","            calWidget.editor = this;","            this.widget = calWidget;","","        },","","        //-------","        // After this View is destroyed,","        //    we need to destroy the Calendar widget instance ...","        //-------","        editorDestroyed: function(){","            if(this.widget) {","                this.widget.destroy({remove:true});","            }","        },","","        //-------","        // After this View is displayed,","        //    setup the widget to display the current cell's Date value","        //-------","        editorShow: function(o){","            var val = o.value;","","            // Display the widget, and select the date (if valid)","            if(this.widget) {","                this.widget.show();","","                if(Y.Lang.isDate(val)) {","                    this.widget.set('date',val);","                    this.widget.selectDates(val);","                }","            }","","            // Update the INPUT[text] value with date and set it's focus","            this._setInputValue(val);","            o.inputNode.focus();","        },","","        //-------","        // After this View is hidden,","        //    hide the Calendar widget to avoid bleed-thru","        //-------","        editorHide: function(){","            if(this.widget) {","                this.widget.hide();","            }","        },","","        //-------","        // After this View is hidden,","        //    hide the Calendar widget to avoid bleed-thru","        //-------","        editorSave: function(){","            if(this.widget) {","                this.widget.hide();","            }","        }","    }","};","","","/**"," ### Popup Cell Editor \"autocomplete\""," This View configuration is used to setup a textbox-type popup cell editor that has an Autocomplete"," plugin attached to the INPUT[text] node.",""," ##### Basic Usage","         // Column definition","         { key:'state', editor:\"autocomplete\",","           editorConfig:{","               autocompleteConfig:{","                   source:  myStateArray,","                   alwaysShowList: true","               }","           }","         }",""," ##### Standard Configuration"," This editor creates a simple INPUT[text] control internally within the popup Editor View container positioned"," directly over the TD element and uses Y.Plugin.AutoComplete to setup the autocomplete capability.  The user"," configures the AC via the \"autocompleteConfig\" setting.",""," Typical use case is to define an \"on:select\" listener within the autocompleteConfig object that sets the"," editor \"value\" based upon the data's criteria.",""," The configuration {Object} for this cell editor View is predefined as;","","        Y.DataTable.EditorOptions.autocomplete = {","            BaseViewClass:  Y.DataTable.BaseCellPopupEditor,","            name:           'autocomplete',","            templateObject: {","                html: '<input type=\"text\" title=\"inline cell editor\" class=\"<%= this.classInput %>\" />'","            },","            inputKeys:   true,","","            // Set listeners to this View's instance ....","            after: {","","               //---------","               //  After the cell editor View is instantiated,","               //    get the INPUT node and plugin the AutoComplete to it","               //---------","               editorCreated : function(o){","                   var inputNode = o.inputNode,","                       acConfig = this.get('autocompleteConfig') || {},","                       editor = this;","","                   // If input node exists and autocomplete-plugin is available, plug the sucker in!","                   if(inputNode && Y.Plugin.AutoComplete) {","                       acConfig = Y.merge(acConfig,{","                           alwaysShowList: true,","                           render: true","                       });","                       inputNode.plug(Y.Plugin.AutoComplete, acConfig);","","                       // add this View class as a static prop on the ac plugin","                       inputNode.ac.editor = editor;","                   }","","               }","            }","        };",""," **PLEASE NOTE:** All other attributes from the `BaseViewClass` apply and can be included within the"," `editorConfig` object.",""," @class Y.DataTable.EditorOptions.autocomplete"," @since 3.8.0"," @public"," **/","Y.DataTable.EditorOptions.autocomplete = {","    BaseViewClass:  Y.DataTable.BaseCellPopupEditor,","    name:           'autocomplete',","    templateObject: {","        html: '<input type=\"text\" title=\"inline cell editor\" class=\"<%= this.classInput %>\" />'","    },","    inputKeys:   true,","","    // Set listeners to this View's instance ....","    after: {","","       //---------","       //  After the cell editor View is instantiated,","       //    get the INPUT node and plugin the AutoComplete to it","       //---------","       editorCreated : function(o){","           var inputNode = o.inputNode,","               acConfig = this.get('autocompleteConfig') || {},","               editor = this;","","           // If input node exists and autocomplete-plugin is available, plug the sucker in!","           if(inputNode && Y.Plugin.AutoComplete) {","               acConfig = Y.merge(acConfig,{","                   alwaysShowList: true,","                   render: true","               });","               inputNode.plug(Y.Plugin.AutoComplete, acConfig);","","               // add this View class as a static prop on the ac plugin","               inputNode.ac.editor = editor;","           }","","       }","    }","};","","/**"," ### Popup Cell Editor \"radio\""," This View configuration is used to setup a group of INPUT[type=radio] controls within the view's Overlay",""," ##### Basic Usage","        // Column definition via Array options","        { key:\"size\", editor:\"radio\",","          editorConfig:{","            radioOptions:[ {value:0, text:\"S\"}, {value:1, text:\"M\"}, {value:2, text:\"L\"} ]","          }","        }","        // Column definition via Object type options","        { key:\"size\", editor:\"radio\",","          editorConfig:{","            radioOptions:{ S:\"Small\", M:\"Medium\", L:\"Large\" }","          }","        }",""," ##### Standard Configuration"," This editor creates a series of INPUT[radio] controls sequentially based upon the 'radioOptions' data,"," all with the same \"name\" so that it forms a radio group.  A delegated \"click\" handler is setup at creation"," time to process the \"checked\" RADIO and save it's value.",""," The configuration {Object} for this cell editor View is predefined as;","","        Y.DataTable.EditorOptions.radio = {","            BaseViewClass:  Y.DataTable.BaseCellPopupEditor,","            name:           'radio',","","            // Define the template for the radio group ...","            templateObject: {","","                // Template Handlebars version ...","             //  html: '<div class=\"myradios\">'","             //       + '{{#options}}'","             //       + '<input type=\"radio\" name=\"dt-editor-radio\" value=\"{{value}}\"'","             //       + '{{#if title}} title=\"{{title}}\"{{/if}} /> {{text}}'","             //       + '{{/options}}'","             //       + '</div>'","","                // Template.Micro version","               html: '<div class=\"myradios \">' ////<%= this.classInput %>\">'","                    + '<% Y.Array.each( this.options, function(r) { %>  '","                    + '<input type=\"radio\" name=\"dt-editor-radio\" '","                    +     'value=\"<%= r.value %>\" <% (r.title) ? \\'title=\"r.title\"\\' :  %> /> <%= r.text %>'","                    + '<% },this); %>'","                    + '</div>'","            },","","            // cell editor View instance listeners ...","","            on: {","","                //--------","                //  When editorCreated fires (at initialization),","                //    setup a listener to save changes based on INPUT[radio] 'click' events","                //--------","                editorCreated: function(){","                    var cbox = this.overlay.get('contentBox');","","                    this._subscr.push(","                        cbox.delegate('click',function(e){","                            var tar = e.target,","                                val = tar.get('value');","","                            if(this._isZeroOr(val)) {","                                this.saveEditor(val);","                            }","                        },'input[type=\"radio\"]', this)","                    );","","                },","","                //--------","                //  When the editor is displayed,","                //    update the \"checked\" INPUT[radio] within the group","                //--------","                editorShow : function(o){","                    var chks  = this.overlay.get('contentBox').one('.myradios').all('input[type=\"radio\"]'),","                        val   = o.value || this.get('value'),","                        valStr = Y.Lang.isString(val),","                        chk, rval;","","                    chks.each(function(n){","                        rval = (n && n.get) ? n.get('value') : null;","                        rval = (!valStr && /^\\d*$/.test(rval) ) ? +rval : rval;","                        if(rval===val) {","                            chk = n;","                            return true;","                        }","                        n.set('checked',false);","                    });","","                    if(chk) {","                        chk.set('checked',true);","                    }","                }","            }","        };",""," **PLEASE NOTE:** All other attributes from the `BaseViewClass` apply and can be included within the"," `editorConfig` object.",""," @class Y.DataTable.EditorOptions.radio"," @since 3.8.0"," @public"," **/","Y.DataTable.EditorOptions.radio = {","    BaseViewClass:  Y.DataTable.BaseCellPopupEditor,","    name:           'radio',","","    // Define the template for the radio group ...","    templateObject: {","/*","        // Template Handlebars version ...","       html: '<div class=\"myradios\">'","            + '{{#options}}'","            + '<input type=\"radio\" name=\"dt-editor-radio\" value=\"{{value}}\"'","            + '{{#if title}} title=\"{{title}}\"{{/if}} /> {{text}}'","            + '{{/options}}'","            + '</div>'","*/","        // Template.Micro version","//       html: '<div class=\"myradios <%= this.classInput %>\">'","       html: '<div class=\"myradios \">' ////<%= this.classInput %>\">'","            + '<% Y.Array.each( this.options, function(r) { %>  '","            + '<input type=\"radio\" name=\"dt-editor-radio\" '","            +     'value=\"<%= r.value %>\" <% (r.title) ? \\'title=\"r.title\"\\' :  %> /> <%= r.text %>'","            + '<% },this); %>'","            + '</div>'","    },","","    // cell editor View instance listeners ...","    after: {","","        //--------","        //  After the editor instance is created (at initialization),","        //    setup a listener to save changes based on INPUT[radio] 'click' events","        //--------","        editorCreated: function(){","            var cbox = this.overlay.get('contentBox');","","            this._subscr.push(","                cbox.delegate('click',function(e){","                    var tar = e.target,","                        val = tar.get('value');","","                    if(this._isZeroOr(val)) {","                        this.saveEditor(val);","                    }","                },'input[type=\"radio\"]', this)","            );","","        },","","        //--------","        //  After the editor is displayed,","        //    update the \"checked\" INPUT[radio] within the group","        //--------","        editorShow : function(o){","            var chks  = this.overlay.get('contentBox').one('.myradios').all('input[type=\"radio\"]'),","                val   = o.value || this.get('value'),","                valStr = Y.Lang.isString(val),","                chk, rval;","","            chks.each(function(n){","                rval = (n && n.get) ? n.get('value') : null;","                rval = (!valStr && /^\\d*$/.test(rval) ) ? +rval : rval;","                if(rval===val) {","                    chk = n;","                    return true;","                }","                n.set('checked',false);","            });","","            if(chk) {","                chk.set('checked',true);","            }","        }","    }","","};","","/**"," ### Popup Cell Editor \"dropdown\""," This View configuration is used to create a popup cell editor containing a single SELECT control within"," the Overlay.",""," *Synonyms for this editor include \"select\" and \"combobox\".*",""," ##### Basic Usage","        // Column definition ... simple Array data","        { key:\"inTheForest\", editor:\"dropdown\",","          editorConfig:{ dropdownOptions:[ \"lions\", \"tigers\", \"bears\", \"oh my!\" ] }","        }","","        // Column definition ... options via Object type data","        { key:\"color\", formatter:\"custom\", formatConfig:stypesObj,","          editor:\"select\", editorConfig:{","             selectOptions:{ 0:'Red', 1:'Green', 2:'Fuschia', 3:'Blue' }","          }","        }","","        // Column definition ... options via Array of Objects, non-trivial!","        { key:\"firstTopping\", editor:\"dropdown\",","          editorConfig:{","            dropdownOptions:[","               {controlUnit:'a7',  descr:'Pepperoni'},    {controlUnit:'f3', descr:'Anchovies'},","               {controlUnit:'b114',descr:'Extra Cheese'}, {controlUnit:'7', descr:'Mushrooms'}","             ],","            templateObject:{ propValue:'controlUnit', propText:'descr' }","          }","        }",""," ##### Standard Configuration"," This editor creates a SELECT element within the popup Editor View container positioned directly over the TD element"," and populated via a Template (default Template.Micro, optionally Handlebars or other).  The \"options\" are set via"," the \"dropdownOptions\" (or selectOptions, comboboxOptions) setting and can be either Array based or an Object hash.",""," The configuration {Object} for this cell editor View is predefined as;","","        Y.DataTable.EditorOptions.dropdown = {","            BaseViewClass:  Y.DataTable.BaseCellPopupEditor,","            name:           'dropdown',    // OR 'select' or 'combobox'","","            // Define the template for the SELECT and OPTIONS ...","            templateObject: {","","                // Template Handlebars version ...","                // NOTE: This editor currently uses Handlebars only, intend to use Template.Micro","                //       but need to get this template micro http://yuilibrary.com/projects/yui3/ticket/2533040 fixed","             //   html: '<select class=\"myselect\">'","             //       + '{{#options}}'","             //       + '<option value=\"{{value}}\"{{#if title}} title=\"{{title}}\"{{/if}}>{{text}}</option>'","             //       + '{{/options}}'","             //       + '</select>'","","                // Template Micro version ...","                html: '<select class=\"myselect\">'","                    + '<% Y.Array.each( data.options, function(r){ %>'","                    + '<option value=\"<%= r.value %>\" <% (r.title) ? \\'title=\"r.title\"\\' :  %>><%= r.text %></option>'","                    + '<% },this); %>'","                    + '</select>'","","            },","","            // Listeners applied to this cell editor's View instance ...","            after: {","","                //--------","                //  After the editor view instance is created,","                //    set a \"change\" listener on the SELECT element","                //--------","                editorCreated: function(){","                    var cbox = this.overlay.get('contentBox');","","                    this._subscr.push(","                        cbox.delegate('change',function(e){","                            var val = e.currentTarget.get('value');","","                            if(this._isZeroOr(val)) {","                                this.saveEditor(val);","                            }","","                        },'select', this)","                    );","                },","","                //--------","                //  After the editor is displayed,","                //    update the currently selected OPTION based on the o.value","                //--------","                editorShow : function(o){","                    var sel   = this.overlay.get('contentBox').one('.myselect'),","                        sopts = sel.get('options'),","                        val   = o.value || this.get('value'),","                        sopt;","","                    sopts.some(function(n){","                        if(n && n.get('value') == val) {  // not a === check, to account for mixed vars","                            sopt = n;","                            return true;","                        }","                    });","","                    if(sopt) {","                        sopt.set('selected',true);","                    }","","                }","            }","","        };",""," **PLEASE NOTE:** All other attributes from the `BaseViewClass` apply and can be included within the"," `editorConfig` object.","",""," #### DEBUGGING"," If your SELECT box contains \"[object Object]\" you probably forgot to define `propValue` and `propText`.",""," @class Y.DataTable.EditorOptions.dropdown"," @since 3.8.0"," @public"," **/","Y.DataTable.EditorOptions.dropdown = {","    BaseViewClass:  Y.DataTable.BaseCellPopupEditor,","    name:           'dropdown',    // OR 'select' or 'combobox'","","    // Define the template for the SELECT and OPTIONS ...","    templateObject: {","/*","        // Template Handlebars version ...","        // NOTE: This editor currently uses Handlebars only, intend to use Template.Micro","        //       but need to get this template micro http://yuilibrary.com/projects/yui3/ticket/2533040 fixed","        html: '<select class=\"myselect\">'","            + '{{#options}}'","            + '<option value=\"{{value}}\"{{#if title}} title=\"{{title}}\"{{/if}}>{{text}}</option>'","            + '{{/options}}'","            + '</select>'","*/","        // Template Micro version ...","        html: '<select class=\"myselect\">'","            + '<% Y.Array.each( data.options, function(r){ %>'","            + '<option value=\"<%= r.value %>\" <% (r.title) ? \\'title=\"r.title\"\\' :  %>><%= r.text %></option>'","            + '<% },this); %>'","            + '</select>'","","    },","","    // Listeners applied to this cell editor's View instance ...","    after: {","","        //--------","        //  After the editor view instance is created,","        //    set a \"change\" listener on the SELECT element","        //--------","        editorCreated: function(){","            var cbox = this.overlay.get('contentBox');","","            this._subscr.push(","                cbox.delegate('change',function(e){","                    var val = e.currentTarget.get('value');","","                    if(this._isZeroOr(val)) {","                        this.saveEditor(val);","                    }","","                },'select', this)","            );","        },","","        //--------","        //  After the editor is displayed,","        //    update the currently selected OPTION based on the o.value","        //--------","        editorShow : function(o){","            var sel   = this.overlay.get('contentBox').one('.myselect'),","                sopts = sel.get('options'),","                val   = o.value || this.get('value'),","                sopt;","","            sopts.some(function(n){","                if(n && n.get('value') == val) {  // not a === check, to account for mixed vars","                    sopt = n;","                    return true;","                }","            });","","            if(sopt) {","                sopt.set('selected',true);","            }","","        }","    }","","};","","","Y.DataTable.EditorOptions.select = Y.DataTable.EditorOptions.dropdown;","Y.DataTable.EditorOptions.combobox = Y.DataTable.EditorOptions.dropdown;","","","/**"," ### Popup Cell Editor \"checkbox\""," This View configuration is used to setup a simple checkbox (i.e. on/off, yes/no, true/false) popup cell editor"," within the popup Overlay.",""," ##### Basic Usage","        // Column definition","        { key:'arrived', editor:\"checkbox\",","          editorConfig:{ checkboxHash:{ 'true':'Y', 'false':'N' } }","        }",""," ##### Standard Configuration"," This editor creates a single INPUT[type=checkbox] element internally within the Overlay and directly positioned"," over the TD element.  The checkbox is either \"on\" or \"off\", and the setting is mapped to the data value via the"," checkboxHash editorOption ....",""," The configuration {Object} for this cell editor View is predefined as;","","        Y.DataTable.EditorOptions.checkbox = {","            BaseViewClass:  Y.DataTable.BaseCellPopupEditor,","            name:           'checkbox',","","            templateObject: {","               html: '<input type=\"checkbox\" title=\"inline cell editor\" />'","            },","","            // Define listeners to this View instance ...","            after : {","","                //---------","                // After this cell editor instance is created,","                //   setup a click listener on the INPUT[checkbox]","                //---------","                editorCreated: function(){","                    var cbox = this.overlay.get('contentBox');","","                    this._subscr.push(","                        cbox.delegate('click',function(e){","                            var chk    = e.currentTarget,","                                cvalue = chk.get('checked') || false,","                                chkopt = this.get('checkboxHash') || { 'true':true, 'false':false },","                                val    = chkopt[cvalue];","","                            if(this._isZeroOr(val)) {","                                this.saveEditor(val);","                            }","","","                        },'input[type=\"checkbox\"]', this)","                    );","                },","","                //---------","                // After this editor is displayed,","                //   update the \"checked\" status based on the underlying o.value","                //---------","                editorShow : function(o){","                    var chk    = this.overlay.get('contentBox').one('input[type=\"checkbox\"]'),","                        val    = o.value || this.get('value'),","                        chkopt = (this.get('checkboxHash')) ? this.get('checkboxHash') : { 'true':true, 'false':false },","                        chkst  = false;","","                    if(chk && val !== undefined ) {","                        chkst = (val === chkopt.true ) ? true : false;","                        chkst = (val === chkopt.false ) ? false : chkst;","                        chk.set('checked',chkst);","                    }","                }","            }","        };",""," **PLEASE NOTE:** All other attributes from the `BaseViewClass` apply and can be included within the"," `editorConfig` object.",""," @class Y.DataTable.EditorOptions.checkbox"," @since 3.8.0"," @public"," **/","Y.DataTable.EditorOptions.checkbox = {","    BaseViewClass:  Y.DataTable.BaseCellPopupEditor,","    name:           'checkbox',","","    templateObject: {","       html: '<input type=\"checkbox\" title=\"inline cell editor\" />'","    },","","    // Define listeners to this View instance ...","    after : {","","        //---------","        // After this cell editor instance is created,","        //   setup a click listener on the INPUT[checkbox]","        //---------","        editorCreated: function(){","            var cbox = this.overlay.get('contentBox');","","            this._subscr.push(","                cbox.delegate('click',function(e){","                    var chk    = e.currentTarget,","                        cvalue = chk.get('checked') || false,","                        chkopt = this.get('checkboxHash') || { 'true':true, 'false':false },","                        val    = chkopt[cvalue];","","                    if(this._isZeroOr(val)) {","                        this.saveEditor(val);","                    }","","","                },'input[type=\"checkbox\"]', this)","            );","        },","","        //---------","        // After this editor is displayed,","        //   update the \"checked\" status based on the underlying o.value","        //---------","        editorShow : function(o){","            var chk    = this.overlay.get('contentBox').one('input[type=\"checkbox\"]'),","                val    = o.value || this.get('value'),","                chkopt = this.get('checkboxHash') || this.get('checkboxOptions') || { 'true':true, 'false':false },","                chkst  = false;","","            if(chk && val !== undefined ) {","                chkst = (val === chkopt['true'] ) ? true : false;","                chkst = (val === chkopt['false'] ) ? false : chkst;","                chk.set('checked',chkst);","            }","        }","    }","};","","","}, '@VERSION@', {","    \"supersedes\": [","        \"\"","    ],","    \"skinnable\": \"true\",","    \"requires\": [","        \"gallery-datatable-editable\",","        \"base-build\",","        \"view\",","        \"cssbutton\",","        \"event-outside\",","        \"overlay\",","        \"dd-plugin\",","        \"template\"","    ],","    \"optional\": [","        \"\"","    ]","});"];
_yuitest_coverage["build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js"].lines = {"1":0,"101":0,"109":0,"226":0,"227":0,"228":0,"236":0,"237":0,"238":0,"258":0,"274":0,"275":0,"276":0,"287":0,"304":0,"311":0,"317":0,"318":0,"321":0,"322":0,"326":0,"329":0,"330":0,"332":0,"337":0,"339":0,"362":0,"363":0,"364":0,"367":0,"369":0,"370":0,"373":0,"374":0,"375":0,"393":0,"395":0,"403":0,"404":0,"407":0,"412":0,"413":0,"414":0,"417":0,"419":0,"420":0,"421":0,"424":0,"425":0,"428":0,"430":0,"464":0,"493":0,"496":0,"502":0,"505":0,"506":0,"508":0,"510":0,"511":0,"515":0,"516":0,"521":0,"557":0,"558":0,"559":0,"562":0,"563":0,"564":0,"567":0,"568":0,"570":0,"572":0,"590":0,"591":0,"600":0,"610":0,"615":0,"620":0,"621":0,"624":0,"633":0,"634":0,"635":0,"637":0,"640":0,"642":0,"655":0,"663":0,"666":0,"673":0,"676":0,"677":0,"706":0,"712":0,"713":0,"717":0,"720":0,"724":0,"725":0,"726":0,"727":0,"735":0,"736":0,"737":0,"738":0,"739":0,"740":0,"747":0,"749":0,"752":0,"753":0,"754":0,"755":0,"756":0,"757":0,"763":0,"771":0,"772":0,"773":0,"782":0,"783":0,"796":0,"797":0,"810":0,"822":0,"823":0,"824":0,"830":0,"831":0,"832":0,"833":0,"834":0,"838":0,"839":0,"854":0,"857":0,"860":0,"861":0,"862":0,"865":0,"866":0,"869":0,"870":0,"873":0,"874":0,"877":0,"878":0,"881":0,"882":0,"888":0,"890":0,"891":0,"893":0,"908":0,"917":0,"927":0,"928":0,"930":0,"931":0,"934":0,"935":0,"937":0,"938":0,"941":0,"951":0,"954":0,"955":0,"958":0,"959":0,"993":0,"1112":0,"1350":0,"1362":0,"1434":0,"1447":0,"1448":0,"1455":0,"1463":0,"1543":0,"1569":0,"1571":0,"1572":0,"1574":0,"1576":0,"1588":0,"1589":0,"1652":0,"1668":0,"1669":0,"1675":0,"1887":0,"1902":0,"1903":0,"1907":0,"1920":0,"1921":0,"1927":0,"1940":0,"1959":0,"1963":0,"1971":0,"1973":0,"1984":0,"1986":0,"1988":0,"1989":0,"1992":0,"1993":0,"2004":0,"2005":0,"2014":0,"2015":0,"2024":0,"2027":0,"2028":0,"2030":0,"2031":0,"2032":0,"2037":0,"2038":0,"2046":0,"2047":0,"2056":0,"2057":0,"2133":0,"2149":0,"2154":0,"2155":0,"2159":0,"2162":0,"2276":0,"2309":0,"2311":0,"2313":0,"2316":0,"2317":0,"2329":0,"2334":0,"2335":0,"2336":0,"2337":0,"2338":0,"2339":0,"2341":0,"2344":0,"2345":0,"2474":0,"2507":0,"2509":0,"2511":0,"2513":0,"2514":0,"2526":0,"2531":0,"2532":0,"2533":0,"2534":0,"2538":0,"2539":0,"2548":0,"2549":0,"2630":0,"2646":0,"2648":0,"2650":0,"2655":0,"2656":0,"2669":0,"2674":0,"2675":0,"2676":0,"2677":0};
_yuitest_coverage["build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js"].functions = {"initializer:225":0,"destructor:235":0,"_bindUI:256":0,"_createUI:303":0,"(anonymous 2):362":0,"_unbindUI:360":0,"showEditor:391":0,"cancelEditor:463":0,"saveEditor:492":0,"hideEditor:556":0,"_defEditorSaveFn:589":0,"_defEditorCancelFn:599":0,"_createOverlay:609":0,"(anonymous 3):663":0,"_createOverlayButtons:654":0,"(anonymous 4):737":0,"(anonymous 5):755":0,"_createTemplateContent:705":0,"_setEditorXY:795":0,"_onKeyPress:809":0,"_onKeyDown:853":0,"_isZeroOr:907":0,"_mouseLeave:916":0,"_setInputValue:926":0,"_clearDOMSelection:950":0,"valueFn:993":0,"validator:1112":0,"editorShow:1361":0,"action:1446":0,"action:1454":0,"editorShow:1462":0,"saveFn:1568":0,"editorShow:1586":0,"prepFn:1667":0,"saveFn:1674":0,"action:1901":0,"action:1907":0,"prepFn:1919":0,"saveFn:1926":0,"selectionChange:1958":0,"dateClick:1970":0,"editorCreated:1939":0,"editorDestroyed:2013":0,"editorShow:2023":0,"editorHide:2045":0,"editorSave:2055":0,"editorCreated:2148":0,"(anonymous 6):2312":0,"editorCreated:2308":0,"(anonymous 7):2334":0,"editorShow:2328":0,"(anonymous 8):2510":0,"editorCreated:2506":0,"(anonymous 9):2531":0,"editorShow:2525":0,"(anonymous 10):2649":0,"editorCreated:2645":0,"editorShow:2668":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js"].coveredLines = 273;
_yuitest_coverage["build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js"].coveredFunctions = 59;
_yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 1);
YUI.add('gallery-datatable-celleditor-popup', function (Y, NAME) {

/**
 This module defines an extension of View that includes a BASE Y.DataTable.BaseCellPopupEditor View class definition
 cell "pop-up" editor.  This view class includes an editor with HTML inserted into an Overlay widget directly over
 the TD cell.  Positioning, event management, creation/destruction and attribute changes are managed by this class.

 ##### Configuration

 Y.DataTable.BaseCellPopupEditor by itself just creates an empty Overlay container, and really isn't meant to be used
 that way.  The view class includes a number of [attributes](#attrs) that are the key to defining a workable popup editor
 and it's behaviors.

 The Y.DataTable.BaseCellPopupEditor View class communicates with the DataTable via the gallery-datatable-editable
 module, which sets up invocation and rendering of this View and establishes listeners for View events, thus the
 DataTable serves as a Controller.

 Since the generic View class permits ad-hoc attributes, the implementer can pass many properties in during instantiation
 that will become available as run-time View attributes.

 ##### View Construction / Rendering

 HTML content that will be set to the Overlay's `bodyContent` is setup via the [templateObject](#attr_templateObject) and
 it's `html` property.  The base view class uses the YUI Template module, and specifically the Template.Micro module to
 build out the HTML (Handlebars format is also available).  For many use cases you won't need a fancy "template", and
 in fact your templateObject.html may not include any "template parameters" at all -- which is perfectly fine.

 ##### Editing / Validation

 This editor view creates the template'ed content, and attaches the [_inputClass](#property__classInput) wherever the
 implementer assigns the class tag.  The editor can also be configured to listen to the base view's [editorCreated](#event_editorCreated)
 in order to attach or configure a Widget or another UI component within the View container.

 Key listeners are provided to detect changes to the first Node within the container with [_inputClass](#property__classInput)
 set.  These keylisteners can be used prohibit invalid keystrokes (via the [keyFiltering](#attr_keyFiltering) setting) and
 to allow validation upon a "save" entry (keyboard RTN stroke) where a [validator](#attr_validator) can be prescribed to
 allow/disallow changes based upon the overall "value" of the INPUT control.

 If the implementer has connected a Widget to this View, the widget should be configured by it's own "selection" mechanism
 to either call this View's [saveEditor](#event_saveEditor) or[cancelEditor](#event_cancelEditor) methods to ensure proper
 saving / closing of the Overlay.

 ##### Navigation
 The editor provides the capability to navigate from TD cell via key listeners on the following key
 combinations;
 * CTRL-arrow keys
 * TAB goes to RIGHT, SHIFT-TAB goes to left
 * ESC cancels editing
 * RTN saves cell

 Key navigation can be disabled via the [inputKeys](#attr_inputKeys) attribute set to `false`.

 When a "key navigation" request is received it is passed to the [keyDir](#attr_keyDir) as a change
 in [row,col] that implementers can listen to "change" events on, to reposition and open editing on the
 new relative cell.  (NOTE: This view does not reposition, it simply fires a `keyDirChange` event.

 ##### Events
 Several events are fired by this View;  which can be listened for and acted upon to achieve differing results.
 For example, the Y.DataTable.EditorOptions.inlineAC (inline autocompletion editor) listens for the
 [editorCreated](#event_editorCreated) event and once received, it configures the autocomplete plugin onto the
 INPUT node.

 ##### Pre-Built Popup Editors

 This Module includes several pre-defined editor configurations which are stored within the Y.DataTable.EditorOptions
 namespace (presently there are popup editors for "textbox", "textarea", "checkbox", "radio", "dropdown", "autocomplete",
 "calendar", "date", "number").  New popup editors can be created and added to this namespace at runtime,
 and by defining the `BaseViewClass:Y.DataTable.BaseCellPopupEditor` property.

 This Y.DataTable.BaseCellinlineEditor class is similar to (and compatible with ) the Y.DataTable.BaseCellPopupEditor
 in another gallery module.  Note that since the "inline" editor uses a simple INPUT[type=text] Node instead of an
 Overlay the codeline is quite a bit simpler.

 The pre-built configuration options are stored in an Object variable Y.DataTable.EditorOptions within
 the DataTable namespace.  The gallery-datatable-editable module uses the Y.DataTable.EditorOptions to
 create required editor View instances.

 For example, the pre-built configuration object for the [number](Y.DataTable.EditorOptions.number.html) popup editor
 is stored as `Y.DataTable.EditorOptions.number`.

 To configure an editor on-the-fly (i.e within a DataTable column definition) just include the configuration object options
 within DT's column `editorConfig` object, which is Y.merge'ed with the pre-built configs;

        // Column definition ... disabling keyfiltering and setting a CSS class
        { key:'firstName',
          editor:"text", editorConfig:{ className:'align-right', keyFiltering:null }
        }

 ###### KNOWN ISSUES:
 <ul>
 <li>In-cell key navigation with scrolling DT's can put the View out of the DT limits, no bounds checking is currently done!</li>
 <li>Some problems have been encountered after "datatable.destroy()" and then immediate re-building of the same DT without a page refresh.</li>
 </ul>

 @module gallery-datatable-celleditor-popup
 @class Y.DataTable.BaseCellPopupEditor
 @extends Y.View
 @author Todd Smith
 @since 3.8.0
 **/
_yuitest_coverfunc("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 101);
var KEYC_ESC = 27,
    KEYC_RTN = 13,
    KEYC_TAB = 9,
    KEYC_UP  = 38,
    KEYC_DOWN  = 40,
    KEYC_RIGHT  = 39,
    KEYC_LEFT  = 37;

_yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 109);
Y.DataTable.BaseCellPopupEditor =  Y.Base.create('celleditor',Y.View,[],{

    /**
     * Defines the HTML content "template" for the containing Overlay of this editor,
     * this property is also set by default to the attribute
     * @property template
     * @type String
     * @default See Code
     * @static
     */
    template:       '<div class="yui3-widget yui3-overlay {classOverlay}" tabindex="1"></div>',

    /**
     * Defines the HTML content "template" for BUTTON elements that are added to the Overlay
     * via the overlayButtons attribute.
     * @property btnTemplate
     * @type String
     * @default See Code
     * @static
     */
    btnTemplate:    '<button class="yui3-button {classButton}" data-button={name}>{value}</button>',

    /**
     * Placeholder property for the Overlay that is created by this View
     * @property overlay
     * @type Widget
     * @default null
     * @static
     */
    overlay:        null,

//--------------------  Static CSS class names  ---------------------------


    /**
     * CSS classname to identify the input HTML node within the View container
     * @property _classInput
     * @type String
     * @default 'yui3-datatable-editor-input'
     * @protected
     * @static
     */
    _classInput:    'yui3-datatable-editor-input',

    /**
     * CSS classname to identify the individual input collection HTML nodes within
     * the View container
     * @property _classItem
     * @type String
     * @default 'yui3-datatable-editor-input-item'
     * @protected
     * @static
     */
    _classItem:     'yui3-datatable-editor-input-item',

    /**
     * CSS classname for the Overlay content within the View container
     * @property _classOverlay
     * @type String
     * @default 'yui3-datatable-editor-overlay'
     * @protected
     * @static
     */
    _classOverlay:  'yui3-datatable-editor-overlay',

    /**
     * CSS classname used for Overlay BUTTON elements within the View container
     * @property _classOverlayBtn
     * @type String
     * @default 'yui3-datatable-editor-overlay-button'
     * @protected
     * @static
     */
    _classOverlayBtn:  'yui3-datatable-editor-overlay-button',

    /**
     * CSS classname to identify the individual input collection HTML nodes within
     * the View container
     * @property _classEditing
     * @type String
     * @default 'editing'
     * @protected
     * @static
     */
    _classEditing:  'editing',

    /**
     * Placeholder for the created Input element contained within the Overlay and
     * View container
     * @property _inputNode
     * @type Node
     * @default null
     * @protected
     * @static
     */
    _inputNode:     null,

    /**
     * Placeholder for listener handles created from this View
     * @property _subscr
     * @type Array of {EventHandles}
     * @default []
     * @protected
     * @static
     */
    _subscr:        [],

//======================   LIFECYCLE METHODS   ===========================

    /**
     * Creates the View instance and sets the container and bindings
     * @method initializer
     * @chainable
     * @return {*}
     * @protected
     */
    initializer: function(){
        _yuitest_coverfunc("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", "initializer", 225);
_yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 226);
this._createUI();
        _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 227);
this._bindUI();
        _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 228);
return this;
    },

    /**
     * @method destructor
     * @protected
     */
    destructor: function(){
        _yuitest_coverfunc("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", "destructor", 235);
_yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 236);
this.cancelEditor();
        _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 237);
this._unbindUI();
        _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 238);
this.fire('editorDestroyed');
    },

    /**
     * Event fired when the cell editor View is destroyed.
     *
     * Implementers can listen for this event to check if any sub-components / widgets, etc.. they
     * had created as part of this View need to be destroyed or listener unbound.
     *
     * @event editorDestroyed
     */

    /**
     * Method that publishes the custom events and sets bindings for key handling and
     * positioning changes
     * @method _bindUI
     * @private
     */
    _bindUI:  function(){

        _yuitest_coverfunc("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", "_bindUI", 256);
_yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 258);
this.publish({
            editorSave: {
                defaultFn:   this._defEditorSaveFn,
                emitFacade:  true,
                preventable: true
            },
            editorCancel: {
                defaultFn:   this._defEditorCancelFn,
                emitFacade:  true,
                preventable: true
            },
            editorCreated: {emitFacade:  true, preventable: true },
            editorDestroyed: {emitFacade:  true, preventable: true }
        });

        // Set a key listener on inputnode
        _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 274);
if(this._inputNode ) {
            _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 275);
this._subscr.push( this._inputNode.on('keydown',this._onKeyDown, this)  );
            _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 276);
this._subscr.push( this._inputNode.on('keypress',this._onKeyPress, this)  );

         // add bubble target
         //   if(this._inputNode && this.overlay) {
         //       this._inputNode.addTarget(this.overlay);
         //       this.overlay.addTarget(this._inputNode);
         //   }

        }

        // This is here to support "scrolling" of the underlying DT ...
        _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 287);
this._subscr.push( this.on('xyChange',this._setEditorXY) );
      //  this.on('xyChange',this._setEditorXY);

    },


    /**
     * Creates this View's container, including instantiating the Overlay widget within
     * the container, incorporating user-supplied overlay configs, creating buttons and
     * creating the internal HTML content within the Overlay (using a Template-based
     * method)
     *
     * @method _createUI
     * @return {Y.Overlay} Overlay instance for this View
     * @private
     */
    _createUI: function(){
       _yuitest_coverfunc("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", "_createUI", 303);
_yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 304);
var ocfg  = this.get('overlayConfig'),
           tobj  = this.get('templateObject'),
           overlay;

        //
        //  Create containing Overlay
        //
        _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 311);
overlay = this._createOverlay();

        //
        //  Add buttons in the Overlay footer section
        //  (we aren't using overlay, so have to add these manually ...)
        //
        _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 317);
if( ocfg && ocfg.buttons ) {
            _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 318);
this._createOverlayButtons(overlay);
        }

        _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 321);
if( tobj && Y.Lang.isObject(tobj) ) {
            _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 322);
this._createTemplateContent(overlay);
        }

        //
        _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 326);
this._inputNode = overlay.get('contentBox').one('.'+this._classInput);

        // render it, save it and leave ...
        _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 329);
this.overlay = overlay;
        _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 330);
overlay.render();

        _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 332);
this.fire('editorCreated',{
            inputNode:  this._inputNode,
            container:  overlay
        });

        _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 337);
this.set('container',overlay);

        _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 339);
this.overlay = overlay;

    },

    /**
     * View event fired when the inline editor has been initialized and ready for usage.
     * This event can be listened to in order to add additional content or widgets, etc onto
     * the View's container.
     *
     * @event editorCreated
     * @param {Object} rtn Returned object
     *  @param {Node} rtn.inputNode The created INPUT[text] node, if any
     *  @param {Object} rtn.container The View container / Overlay instance
     */

    /**
     * Detaches the listeners that were set on this view, any widgets that were created
     * and on the View's Overlay instance.
     * @method _unbindUI
     * @private
     */
    _unbindUI: function(){

        _yuitest_coverfunc("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", "_unbindUI", 360);
_yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 362);
Y.Array.each(this._subscr,function(e){
            _yuitest_coverfunc("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", "(anonymous 2)", 362);
_yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 363);
if(e && e.detach) {
                _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 364);
e.detach();
            }
        });
        _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 367);
this._subscr = null;

        _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 369);
if(this.widget) {
            _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 370);
this.widget.destroy({remove:true});
        }

        _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 373);
if(this.overlay) {
            _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 374);
this.overlay.destroy({remove:true});
            _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 375);
this.overlay = null;
        }

    },

//======================   PUBLIC METHODS   ===========================

    /**
     * Method that displays the editor configured for the input TD node, this is done
     * in lieu of a `render` method for this View.  If no `td` is provided then the
     * last configured [cell](#attr_cell) attribute's `td` property is used.
     *
     * @method showEditor
     * @param {Node} tar Target TD cell that editing takes place on
     * @public
     */
    showEditor: function(td){

        _yuitest_coverfunc("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", "showEditor", 391);
_yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 393);
td = td || this.get('cell').td;

        _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 395);
var cell   = this.get('cell'),
            td_xy  = td.getXY(),
            off_xy = this.get('offsetXY'),
            td_w   = +(td.getComputedStyle('width').replace(/px/,'')),
            oVal   = (this._isZeroOr(cell.value)) ? cell.value : this.get('value');
            //(rec && coln) ? rec.get(coln) : null;

    // Decorate the TD target and show the Overlay
        _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 403);
td.addClass(this._classEditing);
        _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 404);
this.overlay.show();

        // clear up browser "selected" stuff
        _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 407);
this._clearDOMSelection();

    //
    //  Position and resize the Overlay and input ...
    //
        _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 412);
if(off_xy) {
            _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 413);
td_xy[0] += off_xy[0];
            _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 414);
td_xy[1] += off_xy[1];
        }

        _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 417);
this.overlay.set('xy',td_xy);

        _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 419);
td_w = this.get('inputWidth') || td_w;
        _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 420);
if(this._inputNode) {
            _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 421);
this._inputNode.setStyle('width', td_w );
        }

        _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 424);
this._set('visible',true);
        _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 425);
this._set('hidden',false);

    // Set the initial display "value" in INPUT ... (mostly for text)
        _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 428);
this._setInputValue(oVal);

        _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 430);
this.fire('editorShow',{
            td:         td,
            cell:       cell,
            inputNode:  this._inputNode,
            value:      oVal //cell.value || this.get('value')
        });

    },

    /**
     * Event fired when the cell editor is displayed and becomes visible.
     *
     * Implementers may listen for this event if they have configured complex View's, that include
     * other widgets or components, to update their UI upon displaying of the view.
     *
     * @event editorShow
     * @param {Object} rtn Returned object
     * @param {Node} rtn.inputNode The editor's INPUT / TEXTAREA Node
     * @param {String|Number|Date} rtn.value The current "value" setting
     * @param {Object} rtn.cell object
     *  @param {Node} rtn.cell.td TD Node undergoing editing
     *  @param {String} rtn.cell.recClientId The active record's "clientId" attribute setting
     *  @param {String} rtn.cell.colKey The active column's key or name setting
     */


    /**
     * Called when the user has requested to cancel, and abort any changes to the DT cell,
     * usually signified by a keyboard ESC or "Cancel" button, etc..
     *
     * @method cancelEditor
     * @public
     */
    cancelEditor: function(){
        _yuitest_coverfunc("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", "cancelEditor", 463);
_yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 464);
this.fire("editorCancel",{
            td:         this.get('cell').td,
            cell:       this.get('cell'),
            oldValue:   this.get('lastValue')
        });
    },

    /**
     * Fired when editing is cancelled (without saving) on this cell editor
     * @event editorCancel
     * @param {Object} rtn Returned object
     *  @param {Node} rtn.td TD Node for the edited cell
     *  @param {Object} rtn.cell Current cell object
     *  @param {String|Number|Date} rtn.oldValue Data value of this cell prior to editing
     */

    /**
     * Saves the View's `value` setting (usually after keyboard RTN or other means) and fires the
     * [editorSave](#event_editorSave) event so consumers (i.e. DataTable) can make final changes to the
     * Model or dataset.
     *
     * Thank you to **Satyam** for his guidance on configuring the event publishing, defaultFn related to this
     * technique!
     *
     * @method saveEditor
     * @param val {String|Number|Date} Value to save to the current editor's [value](#attr_value) attribute
     * @public
     */
    saveEditor: function(val){
        _yuitest_coverfunc("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", "saveEditor", 492);
_yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 493);
var cell = this.get('cell'),
            savefn;

        _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 496);
val = (val !== undefined && val !== null) ? val : this.get('value') ||  this._inputNode.get('value');

        //
        // If a valid record exists and we found the updated "value" from this View,
        //   then apply the changed "value" to the record (Model) attribute ...
        //
        _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 502);
if( val !== undefined && val !== null ) {

            // If a "save" function was defined, run thru it and update the "value" setting
            _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 505);
savefn = this.get('saveFn');
            _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 506);
val = (savefn) ? savefn.call(this,val) : val;

            _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 508);
if(val === undefined) {
                //val = this.get('lastValue');
                _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 510);
this.cancelEditor();
                _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 511);
return;
            }

            // set the 'lastValue' attribute prior to updating value in View
            _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 515);
if(val) {
                _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 516);
this.set('lastValue',this.get('value'));
            }

            // set this editor's value ATTR
           // this.set('value',val);
            _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 521);
this.fire("editorSave",{
                td:         cell.td,
                cell:       cell,
                oldValue:   this.get('lastValue'),
                newValue:   val
            });

        }

    },

    /**
     * Event that is fired when the user has finished editing the View's cell contents (signified by either
     * a keyboard RTN entry or "Save" button, etc...).
     *
     * This event is intended to be the PRIMARY means for implementers to know that the editing has been
     * completed and validated.  Consumers (i.e. DataTable) should listen to this event and process it's results
     * to save to the Model and or dataset for the DT.
     *
     * @event editorSave
     * @param {Object} rtn Returned object
     *  @param {Node} rtn.td TD Node for the edited cell
     *  @param {Object} rtn.cell Current cell object
     *  @param {String|Number|Date} rtn.oldValue Data value of this cell prior to editing
     *  @param {String|Number|Date} rtn.newValue Data value of this cell after editing
     */

    /**
     * Hides the current editor View instance.  If the optional `hideMe` param is true this View will
     * be temporarily "hidden" (used for scrolling DT's when the TD is scrolled off/on to the page)
     *
     * @method hideEditor
     * @param keep {Boolean} Keep visible set to true/false
     * @public
     */
    hideEditor: function(hideMe){
        _yuitest_coverfunc("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", "hideEditor", 556);
_yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 557);
var cell;
        _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 558);
if(this.overlay) {
            _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 559);
this.overlay.hide();
        }

        _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 562);
cell = this.get('cell');
        _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 563);
if(cell && cell.td) {
            _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 564);
cell.td.removeClass(this._classEditing);
        }

        _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 567);
if(hideMe===true) {
            _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 568);
this._set('hidden',true);
        }
        _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 570);
this._set('visible',false);

        _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 572);
this.fire('editorHide');
    },

    /**
     * Fired when the active cell editor is hidden
     * @event editorHide
     */


//======================   PRIVATE METHODS   ===========================

    /**
     * The defaultFn for the `editorSave` event
     * @method _defEditorSaveFn
     * @param e {EventFacade} For editorSave event
     * @private
     */
    _defEditorSaveFn: function(e){
        _yuitest_coverfunc("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", "_defEditorSaveFn", 589);
_yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 590);
this.set('value', e.newValue);
        _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 591);
this.hideEditor();
    },

    /**
     * The defaultFn for the `editorCancel` event
     * @method _defEditorCancelFn
     * @private
     */
    _defEditorCancelFn: function(){
        _yuitest_coverfunc("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", "_defEditorCancelFn", 599);
_yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 600);
this.hideEditor();
    },

    /**
     * Method that creates the Editor's Overlay instance and populates the base content.
     * @method _createOverlay
     * @return {Y.Overlay}
     * @private
     */
    _createOverlay: function(){
        _yuitest_coverfunc("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", "_createOverlay", 609);
_yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 610);
var ocfg  = this.get('overlayConfig'),
            html,overlay;
    //
    //  Create the Overlay
    //
        _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 615);
html = Y.Lang.sub(this.get('template'),{
            classOverlay:   this._classOverlay+' '
        });

        // Merge the user-supplied Config object with some defaults
        _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 620);
if(this.get('overlayWidth')) {
            _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 621);
ocfg.width = this.get('overlayWidth');
        }

        _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 624);
ocfg = Y.merge(ocfg,{
            contentBox: Y.Node.create(html),
            bodyContent: ' ',
            zIndex:     99,
            visible:    false,
            render:     true
        });

        // Create the Overlay, plugin the drag-drop
        _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 633);
overlay = new Y.Overlay(ocfg);
        _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 634);
if(Y.Plugin.Drag) {
            _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 635);
overlay.plug(Y.Plugin.Drag);
        }
        _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 637);
overlay.hide();

        // Set the inputNode property ... point to INPUT or TEXTAREA, SELECT, etc..
        _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 640);
this._inputNode = overlay.get('contentBox').one('.'+this._classInput);

        _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 642);
return overlay;
    },


    /**
     * Method creates a footer section within the Overlay and adds the buttons entered
     * as the "buttons" config property of "overlayConfig".
     *
     * @method _createOverlayButtons
     * @param {Widget} overlay
     * @private
     */
    _createOverlayButtons: function(overlay){
        _yuitest_coverfunc("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", "_createOverlayButtons", 654);
_yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 655);
var ov_cfg  = this.get('overlayConfig'),
            ov_btns = ov_cfg.buttons, // value, action
            ov_cbox = overlay.get('contentBox'),
            ov_ftr  = ov_cbox.appendChild(Y.Node.create('<div class="yui3-widget-ft"></div>')),
            btn_html, btn_node;

        // Loop over all Buttons in the configs, creating them one at a time
        //  button config is expected to have {name,value,action} members
        _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 663);
Y.Array.each(ov_btns, function(btn){

            // build the button HTML ...
            _yuitest_coverfunc("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", "(anonymous 3)", 663);
_yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 666);
btn_html = Y.Lang.sub(this.btnTemplate,{
                classButton: this._classOverlayBtn + ( (btn.name) ? '-' + btn.name : ''),
                name:        btn.name || 'btn',
                value:       btn.value || 'unknown label'
            });

            // create the BUTTON, appending to footer section of the Overlay ...
            _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 673);
btn_node = ov_ftr.appendChild( Y.Node.create(btn_html) );

            // and add it's click handler ...
            _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 676);
if(btn_node && btn.action && Y.Lang.isFunction(btn.action) ) {
                _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 677);
this._subscr.push( btn_node.on('click', Y.bind( btn.action,this) )  );
            }

        },this);

    },

    /**
     * Method used to process the [templateObject](#attr_templateObject) attribute and generate the
     * Overlay's `bodyContent`.  This method uses the `Y.Template` module to prepare the HTML, which
     * is passed in via [templateObject](#attr_templateObject)'s `html` property.
     *
     * This method uses the `Y.Template.Micro` module by default to process the template.  Implementers
     * can pass in any different Y.Template supported-template engine via the [templateEngine](#attr_templateEngine)
     * attribute (i.e. `templateEngine: Y.Handlebars`) but will have to modify the `html` property of templateObject
     * appropriately for that engine.
     *
     * Implementers can pass in "options" and other properties to the [templateObject](#attr_templateObject) ATTR and
     * this function will normalize the `this.options` to an Object with keys {value,text,title,raw} which can be
     * used more directly within HTML construction.
     *
     * The templateObject ATTR `options` property can be either an Array or an Object, this function converts and
     * normalizes the content to an output Array as `this.options` within the template definitions.
     *
     * @method _createTemplateContent
     * @param overlay {Widget} Overlay instance for this View
     * @private
     */
    _createTemplateContent: function(overlay) {
        _yuitest_coverfunc("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", "_createTemplateContent", 705);
_yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 706);
var tmplObj  = Y.merge(this.get('templateObject')),
            ename    = this.get('name'),
            tmplOpts = this.get( ename + 'Options') || tmplObj.options,
            tmplEng,tmicro,compiledHTML,robj,html;

        // use a Template "engine" if defined, otherwise Template.Micro
        _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 712);
tmplEng  = this.get('templateEngine');
        _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 713);
tmicro   = new Y.Template(tmplEng);


        // check for template-type strings ...
        _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 717);
html = tmplObj.html;


        _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 720);
if( /<%|\{\{/.test(html) ) {
            //
            //  Setup template object properties
            //
            _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 724);
tmplObj.classInput = this._classInput;
            _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 725);
tmplObj.propValue  = this.get('propValue') || tmplObj.propValue || 'value';
            _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 726);
tmplObj.propText   = this.get('propText') || tmplObj.propText || 'text';
            _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 727);
tmplObj.propTitle  = this.get('propTitle') || tmplObj.propTitle;

            //
            //  Typecheck for the template "options", if an Object hash, then convert to
            //   an array.
            //

            // Normalize options array to {value: text: title: format}
            _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 735);
if(Y.Lang.isArray(tmplOpts)) {
                _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 736);
tmplObj.options = [];
                _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 737);
Y.Array.each(tmplOpts,function(r){
                    _yuitest_coverfunc("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", "(anonymous 4)", 737);
_yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 738);
robj = {};
                    _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 739);
if(Y.Lang.isObject(r)) {
                        _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 740);
robj = {
                            value: r[tmplObj.propValue],
                            text: r[tmplObj.propText],
                            title: (tmplObj.propTitle) ? r[tmplObj.propTitle] || tmplObj.propTitle : null,
                            raw: r
                        };
                    } else {
                        _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 747);
robj = {value:r, text:r, title:null, raw:r};
                    }
                    _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 749);
tmplObj.options.push(robj);
                },this);

            } else {_yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 752);
if ( Y.Lang.isObject(tmplOpts) ) {
                _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 753);
tmplOpts = Y.merge(tmplOpts);
                _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 754);
tmplObj.options = [];
                _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 755);
Y.Object.each(tmplOpts,function(v,k,obj){
                    _yuitest_coverfunc("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", "(anonymous 5)", 755);
_yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 756);
if(this._isZeroOr(v) && this._isZeroOr(k)) {
                        _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 757);
robj = {
                            value: (Y.Lang.isString(k) && /^\d*$/.test(k) ) ? +k : k,
                            text: v,
                            title: (tmplObj.propTitle) ? tmplObj.propTitle : null,
                            raw: obj
                        };
                        _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 763);
tmplObj.options.push( robj );
                    }
                },this);
            }}

            //
            //  Run thru and compile the template and execute it and set the HTML to the Overlay's "body"
            //
            _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 771);
compiledHTML = tmicro.compile(tmplObj.html);
            _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 772);
if(compiledHTML) {
                _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 773);
html = compiledHTML(tmplObj);
            }

        }

        //
        //  Set the html for the Overlay ...
        //    if no Template tags are present, it just puts templateObject.html inside
        //
        _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 782);
if(html) {
            _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 783);
overlay.set('bodyContent', html );
        }

    },

    /**
     * This method can be used to quickly reset the current View editor's position,
     *  used for scrollable DataTables.
     * @method _setEditorXY
     * @param e {EventFacade} The xy attribute change event facade
     * @private
     */
    _setEditorXY: function(e) {
        _yuitest_coverfunc("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", "_setEditorXY", 795);
_yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 796);
if(this.overlay && e.newVal) {
            _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 797);
this.overlay.set('xy', e.newVal);
        }
    },

    /**
     * Provides a method to process keydown entries and validate or prevent invalid inputs.
     * This method is meant to be overrideable by implementers.
     *
     * @method _onKeyPress
     * @param e {EventFacade} Key press event object
     * @public
     */
    _onKeyPress: function(e) {
        _yuitest_coverfunc("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", "_onKeyPress", 809);
_yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 810);
var keyc    = e.keyCode,
            inp     = e.target || this._inputNode,
            value   = inp.get('value'),
            keyfilt = this.get('keyFiltering'),
         //   keyvald = this.get('keyValidator'),
            kchar   = String.fromCharCode(keyc),
            flagRE  = true,
            krtn;

        //
        // If RTN, then prevent and save ...
        //
        _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 822);
if(keyc === KEYC_RTN) {
            _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 823);
e.preventDefault();
            _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 824);
this.saveEditor(value);
        }

        //
        // Check key filtering validation ... either a RegExp or a user-function
        //
        _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 830);
if(keyfilt instanceof RegExp) {
            _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 831);
flagRE = (!kchar.match(keyfilt)) ? false : flagRE;
        } else {_yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 832);
if (Y.Lang.isFunction(keyfilt)) {
            _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 833);
krtn = keyfilt.call(this,e);
            _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 834);
flagRE = (krtn) ? true : false;
        }}

        // If key filtering returned false, prevent continuing
        _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 838);
if(!flagRE) {
            _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 839);
e.preventDefault();
        }

    },


    /**
     * Key listener for the INPUT inline editor, "keydown" is checked for non-printing key
     *  strokes, navigation or ESC
     *
     * @method _onKeyDown
     * @param e {EventFacade} Keydown event facade
     * @private
     */
    _onKeyDown : function(e){
        _yuitest_coverfunc("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", "_onKeyDown", 853);
_yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 854);
var keyc    = e.keyCode,
            dir;

        _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 857);
switch(keyc) {

            case KEYC_ESC:
                _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 860);
e.preventDefault();
                _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 861);
this.cancelEditor();
                _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 862);
break;

            case KEYC_UP:
                _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 865);
dir = (e.ctrlKey) ? [-1,0] : null;
                _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 866);
break;

            case KEYC_DOWN:
                _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 869);
dir = (e.ctrlKey) ? [1,0] : null;
                _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 870);
break;

            case KEYC_LEFT:
                _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 873);
dir = (e.ctrlKey) ? [0,-1] : null;
                _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 874);
break;

            case KEYC_RIGHT:
                _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 877);
dir = (e.ctrlKey) ? [0,1] : null;
                _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 878);
break;

            case KEYC_TAB: // tab
                _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 881);
dir = (e.shiftKey) ? [0,-1] : [0,1] ;
                _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 882);
break;
        }

        //
        //  If dir is non-falsey, a navigation direction was set ...
        //
        _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 888);
if(dir) {
            // set the key direction movement
            _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 890);
if(this.get('inputKeys')===true) {
                _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 891);
this._set('keyDir',dir);
            }
            _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 893);
e.preventDefault();
        }

    },

    /**
     * Utility method that checks if a value (include ZERO!!) is defined and
     * not null  (there's probably a much better way to do this)
     *
     * @method _isZeroOr
     * @param v {Number|String} Value to check
     * @return {Boolean} True if value is defined, not null, and possibly zero
     * @private
     */
    _isZeroOr : function(v) {
        _yuitest_coverfunc("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", "_isZeroOr", 907);
_yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 908);
return (v !== undefined && v !== null) ? true : false;
    },

    /**
     * Listener to mouseleave event that closes the active editor
     * @method _mouseLeave
     * @private
     */
    _mouseLeave: function(){
        _yuitest_coverfunc("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", "_mouseLeave", 916);
_yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 917);
this.cancelEditor();
    },

    /**
     * @method _setInputValue
     * @param {Number|String|Date} val
     * @return {*}
     * @private
     */
    _setInputValue: function(val) {
        _yuitest_coverfunc("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", "_setInputValue", 926);
_yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 927);
var prepFn;
        _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 928);
val = val || this.get('cell').value || this.get('value');

        _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 930);
if(!val) {
            _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 931);
return;
        }

        _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 934);
prepFn = this.get('prepFn');
        _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 935);
val = (prepFn) ? prepFn.call(this,val) : val;

        _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 937);
if(this._inputNode){
            _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 938);
this._inputNode.set('value',val);
        }

        _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 941);
return val;
    },

    /**
     * Helper method to clear DOM "selected" text or ranges
     * NOTE: could probably do this with CSS `user-select: none;`, but anyway ...
     * @method _clearDOMSelection
     * @private
     */
    _clearDOMSelection: function(){
        _yuitest_coverfunc("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", "_clearDOMSelection", 950);
_yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 951);
var sel = (Y.config.win.getSelection) ? Y.config.win.getSelection()
            : (Y.config.doc.selection) ? Y.config.doc.selection : null;

        _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 954);
if ( sel && sel.empty ) {
            _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 955);
sel.empty();
        }    // works on chrome

        _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 958);
if ( sel && sel.removeAllRanges ) {
            _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 959);
sel.removeAllRanges();
        }    // works on FireFox
    }

},{
    ATTRS:{

        /**
         * Name for this View, this is useful because the `name` attribute is prefixed to the
         *  'Options' string for some Views (i.e. a cell editor named 'myRadio' will have a defined
         *  set of options available of 'myRadioOptions'
         *
         * @attribute name
         * @type String
         * @default null
         */
        name: {
            value:      null,
            validator:  Y.Lang.isString
        },

        /**
         * Defines the Overlay's HTML template for the overall View (not recommended to change this!!)
         * NOTE: This the Overlay structure template **and not** the bodyContent template for the Overlay,
         * it is not recommended you change this attr.
         *
         * Please see the [templateObject](#attr_templateObject) attribute to define the HTML for your View!
         *
         * @attribute template
         * @type String
         * @private
         * @default
         */
        template:{
            valueFn:  function(){ _yuitest_coverfunc("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", "valueFn", 993);
_yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 993);
return this.template; },
            validator:  Y.Lang.isString
        },

        /**
         * Additional config parameters for the Overlay to be used in constructing the Editor.
         * These configs are merged with the defaults required by the Editor.
         *
         * @attribute overlayConfig
         * @type Object
         * @default {}
         */
        overlayConfig:{
            value:      {},
            validator:  Y.Lang.isObject
        },


        /**
         * Specifies a width attribute style to set the `_classInput` Node element to upon rendering.
         * @attribute inputWidth
         * @type String|Number
         * @default null
         */
        inputWidth: {
            value:  null
        },

        /**
         * Defines the `width` parameter to set the Overlay widget to upon rendering, can also be overridden
         * by setting `overlayConfig.width`.
         * @attribute overlayWidth
         * @type String|Number
         * @default null
         */
        overlayWidth:{
            value:  null
        },

        /**
         * A flag to indicate if cell-to-cell navigation should be implemented (currently setup for CTRL-arrow
         * key, TAB and Shift-TAB) capability
         * @attribute inputKeys
         * @type Boolean
         * @default true
         */
        inputKeys:{
            value:      true,
            validator:  Y.Lang.isBoolean
        },

        /**
         * Defines the type of template engine that will be used to parse Templates, (via Y.Template).
         * Typically this would be set to `Y.Template.Micro` or `Y.Handlebars`
         *
         * NOTE: If you use Y.Handlebars (or any other YUI template engine) you MUST include it in your YUI.use
         * loader statement ("template" is included in this module's `requires` by default)
         *
         * @attribute templateEngine
         * @type Object
         * @default Y.Template.Micro
         */
        templateEngine: {
            value:  Y.Template.Micro
        },

        /**
         * This attribute is used to define the HTML content that will be created / generated and inserted within
         * this View's Y.Overlay.   The attribute definitions include an object with the following recognizable
         * properties: `html, xxxOptions, propValue, propText, propTitle`
         *
         * Note that xxxOptions matches the `name` attribute (i.e. the editor "name" you include on your column
         * definitions), where xxx is replaced with the name.  For "radio" it is `radioOptions`, for "select" it is
         * `selectOptions`, "checkbox" it is `checkboxOptions`, etc...
         *
         * The method [_createTemplateContent](#method__createTemplateContent) uses this attribute and processes the
         * template using the `html` and other properties to generate the HTML.  It then inserts the compiled HTML into
         * the Overlay's `bodyContent`.

         * @example
         *
         *      templateObject: {
         *          // set the template definition
         *          html: '<select class="myselect">'
         *             +  '<% Y.Array.each( data.options, function(r){ %>'
         *             +  '<option value="<%= r.value %>" <% (r.title) ? \'title="r.title"\' :  %>>'
         *             +  '<%= r.text %></option>'
         *             +  '<% },this); %>'
         *             +  '</select>'
         *          options: states   // [ {value:'AZ', text:'Arizona}, {value:'DE', text:'Delaware' } ]
         *      }
         *
         * @attribute templateObject
         * @type Object
         * @default null
         */
        templateObject: {
            value:  null
        },

        /**
         * A cell reference object populated by the calling DataTable, contains the following key properties:
         *   `{td,value,recClientId,colKey}`
         * @attribute cell
         * @type Object
         * @default {}
         */
        cell: {
            value:  {}
        },

        /**
         * Maintains a reference back to the calling DataTable instance (not really used yet)
         * @attribute hostDT
         * @type Y.DataTable
         * @default null
         */
        hostDT : {
            value:  null,
            validator:  function(v) { _yuitest_coverfunc("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", "validator", 1112);
_yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 1112);
return v instanceof Y.DataTable; }
        },

        /**
         * Value that was saved in the Editor View and returned to the record
         *
         * @attribute value
         * @type {String|Number|Date}
         * @default null
         */
        value: {
            value:  null
        },

        /**
         * Value that was contained in the cell when the Editor View was initiated
         *
         * @attribute lastValue
         * @type {String|Number|Date}
         * @default null
         */
        lastValue:{
            value:  null
        },

        /**
         * Function to execute on the "data" contents just prior to displaying in the Editor's main view
         * (i.e. typically used for pre-formatting Date information from JS to mm/dd/YYYY format)
         *
         * This function will receive one argument "value" which is the data value from the record, and
         *  the function runs in Editor scope.
         *
         * @attribute prepFn
         * @type Function
         * @default null
         */
        prepFn:{
            value:      null,
            validator:  Y.Lang.isFunction
        },

        /**
         * Function to execute when Editing is complete, prior to "saving" the data to the Record (Model)
         *
         * This function will receive one argument "value" which is the data value from the INPUT or Widget, and
         *  the function runs in Editor scope.
         *
         * @attribute saveFn
         * @type Function
         * @default null
         */
        saveFn:{
            value:      null,
            validator:  Y.Lang.isFunction
        },

        /**
         * Tracks navigation changes during keyboard input as relative [row,col] changes from the currently
         * active cell TD.
         *
         * @attribute keyDir
         * @type Array as [row,col] from current TD
         * @readOnly
         * @default []
         */
        keyDir: {
            value:      [],
            readOnly:   true,
            validator:  Y.Lang.isArray
        },

        /**
         * Setting for checking the visibility status of this Editor
         * @attribute visible
         * @type Boolean
         * @default false
         * @readOnly
         */
        visible: {
            value:      false,
            readOnly:   true,
            validator:  Y.Lang.isBoolean
        },

        /**
         * Setting to check if the editor is "still open" but just hidden, created in order to support
         * scrolling datatables when an editor scrolls out of open window.
         *
         * @attribute hidden
         * @type Boolean
         * @default false
         * @readOnly
         */
        hidden: {
            value:      false,
            readOnly:   true,
            validator:  Y.Lang.isBoolean
        },

        /**
         * Sets an offset of the XY coordinates that will be used for positioning the Overlay upon
         * displaying the editor View
         * @attribute offsetXY
         * @type Array
         * @default [0,0]
         */
        offsetXY :{
            value: [0,0],
            validator:  Y.Lang.isArray
        },

        /**
         * XY coordinate position of the View container Overlay for this editor
         * @attribute xy
         * @type Array
         * @default null
         */
        xy : {
            value:      null,
            validator:  Y.Lang.isArray
        },

        /**
         * Provides a keystroke filtering capability to restrict input into the editing area checked during the
         * "keypress" event.  This attribute is set to either a RegEx or a function that confirms if the keystroke
         * was valid for this editor.  (TRUE meaning valid, FALSE meaning invalid)
         *
         * If a function is provided, the single argument is the keystroke event facade `e` and if
         * the keystroke is valid it should return true, otherwise if invalid false;
         *
         *  @example
         *      /\d/            // for numeric digit-only input
         *      /\d|\-|\./      // for floating point numeric input
         *      /\d|\//         // for Date field entry in MM/DD/YYYY format
         *
         * @attribute keyFiltering
         * @type {RegExp|Function}
         * @default null
         */
        keyFiltering:  {
            value:  null
        },

        /**
         * Provides the capability to validate the final saved value after editing is finished.
         * This attribute can be set to either a RegEx or a function, that operates on the entire
         * "value" setting of the editor input (whereas [keyFiltering](#attr_keyFilter) performs
         * validation checks on each key input).
         *
         * If a function is provided, the single argument is the value setting of the editor.
         * the keystroke is valid it should return true, otherwise if invalid false;
         *
         *  @example
         *      /\d/            // for numeric digit-only input
         *      /\d|\-|\.|\+/   // for floating point numeric input
         *      /\d|\//         // for Date field entry in MM/DD/YYYY format
         *
         * @attribute validator
         * @type {RegExp|Function}
         * @default null
         */
        validator: {
            value:      null
        }

        /**
          Concept for user-prescribed key mappings ... still incomplete

            keyNav:{

               keydown:  {
                    left:  [ {ctrlKey:37}, {shiftKey:9}
                    right: [ {ctrlKey:39
                    up:    [ 38
                    down:  [ 40
                    save:  [ 13
                    cancel: [27
               },

               mouse: {
                   open : [click, focus]
                   close : [ blur ]
               }
            }

         */


    }
});


//====================================================================================================================
//                   P O P U P    C E L L    E D I T O R    D E F I N I T I O N S
//====================================================================================================================


/**
 ### Popup Cell Editor "text"
 This View configuration is used to setup a basic textbox type popup cell editor.

 ##### Basic Usage
        // Column definition
        { key:'firstName', editor:"text"}

        // Column definition ... disabling inputKeys navigation and setting offsetXY
        { key:'firstName',
          editor:"text", editorConfig:{ inputKeys:false, offsetXY: [5,7] }
        }

 ##### Standard Configuration
 This editor creates a simple INPUT[text] internally within the popup Editor View container positioned
 directly over the TD element.

 The configuration {Object} for this cell editor View is predefined as;

        Y.DataTable.EditorOptions.text = {
            BaseViewClass:  Y.DataTable.BaseCellPopupEditor,
            name:           'text',
            templateObject: {
                // Template.Micro setup
                html: '<input type="text" title="inline cell editor" class="<%= this.classInput %>"  />'
            },
            inputKeys:      true,
            after:{
                editorShow : function(o){
                    o.inputNode.focus();
                }
            }
        };

 **PLEASE NOTE:** All other attributes from the `BaseViewClass` apply and can be included within the
 `editorConfig` object.

 @class Y.DataTable.EditorOptions.text
 @since 3.8.0
 @public
 **/
_yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 1350);
Y.DataTable.EditorOptions.text = {
    BaseViewClass:  Y.DataTable.BaseCellPopupEditor,
    name:           'text',

    templateObject: {
        html: '<input type="text" title="inline cell editor" class="<%= this.classInput %>"  />'
    },

    inputKeys:      true,

    after:{
        editorShow : function(o){
            _yuitest_coverfunc("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", "editorShow", 1361);
_yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 1362);
o.inputNode.focus();
        }
    }

};

/**
 ### Popup Cell Editor "textarea"
 This View configuration is used to setup an editor referenced as "textarea" as a popup-type cell editor.

 ##### Basic Usage:
        // Column definition
        { key:'experience', editor:"textarea"}

        // Column definition ... disabling inputKeys navigation and setting offsetXY
        { key:'firstName',
          editor:"JobDescription", editorConfig:{
             // disables the buttons below the TEXTAREA
             overlayConfig:{ buttons: null }
          }
        }

 ##### Standard Configuration
 This editor creates a simple TEXTAREA internally within the popup Editor View container positioned
 directly over the TD element.

 The configuration {Object} for this cell editor View is predefined as;

        Y.DataTable.EditorOptions.textarea = {
            BaseViewClass:  Y.DataTable.BaseCellPopupEditor,
            name:           'textarea',

            // Template.Micro setup
            templateObject:{
                    html: '<textarea title="inline cell editor" class="<%= this.classInput %>"></textarea>'
                },

            // allow inter-cell navigation
            inputKeys: true,

            // setup two buttons "Save" and "Cancel" for the containing overlay
            overlayConfig:{
                buttons:   [
                    { name:'save', value: 'Save',
                        action:function(){
                            var val = (this._inputNode) ? this._inputNode.get('value') : null;
                            this.saveEditor(val);
                        }
                    },
                    { name:'cancel', value: 'Cancel',
                        action:function(){
                            this.cancelEditor();
                        }
                    }
                ]
            },

            after:{
                // focus the TEXTAREA on display
                editorShow : function(o){
                    o.inputNode.focus();
                }
            }
        };

 **PLEASE NOTE:** All other attributes from the `BaseViewClass` apply and can be included within the
 `editorConfig` object.

 @class Y.DataTable.EditorOptions.textarea
 @since 3.8.0
 @public
 **/
_yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 1434);
Y.DataTable.EditorOptions.textarea = {
    BaseViewClass:  Y.DataTable.BaseCellPopupEditor,
    name:           'textarea',
    templateObject:{
        html: '<textarea title="inline cell editor" class="<%= this.classInput %>"></textarea>'
    },

    inputKeys: true,
    // setup two buttons "Save" and "Cancel" for the containing overlay
    overlayConfig:{
        buttons:   [
            { name:'save', value: 'Save',
                action:function(){
                    _yuitest_coverfunc("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", "action", 1446);
_yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 1447);
var val = (this._inputNode) ? this._inputNode.get('value') : null;
                    _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 1448);
this.saveEditor(val);
                    //this.fire('editorSave',val);

                }
            },
            { name:'cancel', value: 'Cancel',
                action:function(){
                    _yuitest_coverfunc("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", "action", 1454);
_yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 1455);
this.cancelEditor();
                }
            }
        ]
    },

    after:{
        editorShow : function(o){
            _yuitest_coverfunc("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", "editorShow", 1462);
_yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 1463);
o.inputNode.focus();
           // o.inputNode.select();
        }
    }

};


/**
 ### Popup Cell Editor "number"
 This View configuration is used to setup a basic numeric editor as a popup-type cell editor.
 A `saveFn` is prescribed that handles validation and converting the input text to numeric format.

 ##### Basic Usage
        // Column definition
        { key:'salary', editor:"number" }

        // Column definition ... disabling keyfiltering and setting a CSS class
        { key:'firstName',
          editor:"text", editorConfig:{ className:'align-right', keyFiltering:null }
        }

 ##### Standard Configuration
 This editor creates a simple INPUT[text] internally within the popup Editor View container positioned
 directly over the TD element. Configuration is almost identical to [text](/api/classes/Y.DataTable.EditorOptions.text.html#index)
 editor except for the pre-selection of contents and conversion of saved value to numeric format in saveFn.

 The configuration {Object} for this cell editor View is predefined as;

        Y.DataTable.EditorOptions.number = {
            BaseViewClass:  Y.DataTable.BaseCellPopupEditor,
            name:           'number',
            templateObject:{
                // Template.Micro template
                html: '<input type="text" title="inline cell editor" class="<%= this.classInput %>"  />'
            },
            inputKeys: true,

            // only permit digit, '.' and '-' keys in the input, reject others ...
            keyFiltering:   /\.|\d|\-/,

            // Set a flaoting point number validation RegEx expression
            validator:  /^\s*(\+|-)?((\d+(\.\d+)?)|(\.\d+))\s*$/,

            // Function to call after numeric editing is complete, prior to saving to DataTable ...
            //  i.e. checks validation against ad-hoc attribute "validationRegExp" (if it exists)
            //       and converts the value to numeric (or undefined if fails regexp);
            saveFn: function(v){
                var vre = this.get('validator'),
                    value;
                if(vre instanceof RegExp) {
                    value = (vre.test(v)) ? +v : undefined;
                } else {
                    value = +v;
                }
                return value;
            },

            // Set an after listener to this View's instance
            after: {

                //---------
                // After this view is displayed,
                //   focus and "select" all content of the input (for quick typeover)
                //---------
                editorShow : function(o){
                    // initially set focus / select entire INPUT
                    o.inputNode.focus();
                    o.inputNode.select();
                }
            }
        };

 **PLEASE NOTE:** All other attributes from the `BaseViewClass` apply and can be included within the
 `editorConfig` object.

 @class Y.DataTable.EditorOptions.number
 @since 3.8.0
 @public
 **/
_yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 1543);
Y.DataTable.EditorOptions.number = {
    BaseViewClass:  Y.DataTable.BaseCellPopupEditor,
    name:           'number',

    templateObject:{
        html: '<input type="text" title="inline cell editor" class="<%= this.classInput %>"  />'
    },

    inputKeys:      true,

    /**
     * A validation regular expression object used to check validity of the input floating point number.
     * This can be defined by the user to accept other numeric input, or set to "null" to disable regex checks.
     *
     * @attribute validator
     * @type RegExp
     * @default /^\s*(\+|-)?((\d+(\.\d+)?)|(\.\d+))\s*$/
     */
    validator:  /^\s*(\+|-)?((\d+(\.\d+)?)|(\.\d+))\s*$/,

    keyFiltering:   /\.|\d|\-/,

    // Function to call after numeric editing is complete, prior to saving to DataTable ...
    //  i.e. checks validation against ad-hoc attribute "validationRegExp" (if it exists)
    //       and converts the value to numeric (or undefined if fails regexp);
    saveFn: function(v){
        _yuitest_coverfunc("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", "saveFn", 1568);
_yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 1569);
var vre = this.get('validator'),
            value;
        _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 1571);
if(vre instanceof RegExp) {
            _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 1572);
value = (vre.test(v)) ? +v : undefined;
        } else {
            _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 1574);
value = +v;
        }
        _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 1576);
return value;
    },

    // Set an after listener to this View's instance
    after: {

        //---------
        // After this view is displayed,
        //   focus and "select" all content of the input (for quick typeover)
        //---------
        editorShow : function(o){
            // initially set focus / select entire INPUT
            _yuitest_coverfunc("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", "editorShow", 1586);
_yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 1588);
o.inputNode.focus();
            _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 1589);
o.inputNode.select();
        }
    }
};

/**
 ### Popup Cell Editor "date"
 This View configuration is used to setup a bare-bones date editor as a popup-type cell editor.
 Configuration is setup with both `prepFn` and `saveFn` to convert the Date object.

 ##### Basic Usage
        // Column definition
        { key:'firstName', editor:"date"}

        // Column definition ... with user-defined dateFormat and disabling keyfiltering
        { key:'firstName',
          editor:"text", editorConfig:{ dateFormat: '%Y-%m-%d', keyFiltering:null }
        }

 ##### Standard Configuration
 This editor creates a simple INPUT[text] internally within the popup Editor View container positioned
 directly over the TD element.  Additionally, if a "dateFormat" editorOption is provided the value of
 the INPUT will be pre-processed with that format.  On save, the value of the input is parsed back to
 a Date object for the DT.

 The configuration {Object} for this cell editor View is predefined as;

        Y.DataTable.EditorOptions.date = {
            BaseViewClass:  Y.DataTable.BaseCellPopupEditor,
            name:           'date',

            // Template.Micro setup
            templateObject: {
                html: '<input type="text" title="inline cell editor" class="<%= this.classInput %>"  />'
            },

            inputKeys:  true,
            inputWidth: 75,   // width of the INPUT[text]

            // only allow keyboard input of digits or '/' or '-' within the editor ...
            keyFiltering:   /\/|\d|\-/,

            // Function to call prior to displaying editor, to put a human-readable Date into
            //  the INPUT box initially ...
            prepFn: function(v){
                var dfmt = this.get('dateFormat') || "%D";
                return Y.DataType.Date.format(v,{format:dfmt});
            },

            // Function to call after Date editing is complete, prior to saving to DataTable ...
            //  i.e. converts back to "Date" format that DT expects ...
            saveFn: function(v){
                return Y.DataType.Date.parse(v) || undefined;
            }
        };

 **PLEASE NOTE:** All other attributes from the `BaseViewClass` apply and can be included within the
 `editorConfig` object.

 @class Y.DataTable.EditorOptions.date
 @since 3.8.0
 @public
 **/
_yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 1652);
Y.DataTable.EditorOptions.date = {
    BaseViewClass:  Y.DataTable.BaseCellPopupEditor,
    name:           'date',
    templateObject: {
        html: '<input type="text" title="inline cell editor" class="<%= this.classInput %>"  />'
    },

    inputKeys:  true,
    inputWidth: 75,

    // only allow keyboard input of digits or '/' or '-' within the editor ...
    keyFiltering:   /\/|\d|\-/,

    // Function to call prior to displaying editor, to put a human-readable Date into
    //  the INPUT box initially ...
    prepFn: function(v){
        _yuitest_coverfunc("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", "prepFn", 1667);
_yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 1668);
var dfmt = this.get('dateFormat') || "%D";
        _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 1669);
return Y.DataType.Date.format(v,{format:dfmt});
    },

    // Function to call after Date editing is complete, prior to saving to DataTable ...
    //  i.e. converts back to "Date" format that DT expects ...
    saveFn: function(v){
        _yuitest_coverfunc("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", "saveFn", 1674);
_yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 1675);
return Y.DataType.Date.parse(v) || undefined;
    }
};


/**
 ### Popup Cell Editor "calendar"
 This View configuration is used to setup an editor View as a "calendar" popup cell editor that
 includes a Y.Calendar widget incorporated within the View container.

 ##### Basic Usage
        // Column definition
        { key:'startDate', editor:"calendar" }

        // Column definition ...
        { key:'birthdate', label:'Employee DOB', formatter:"shortDate",
          editor:"calendar", editorConfig:{
             inputKeys:false,
          }
        }

 ##### Standard Configuration
 This editor includes (a) an INPUT[text] and (b) Y.Calendar widget instance all within the same Overlay content.

 *Configuration for this View is considerably more complex compared to other Views, requiring additional functions
 and listener functions to setup the Y.Calendar widget and to account for widget actions and events.*

 The configuration {Object} for this cell editor View is predefined as;

        Y.DataTable.EditorOptions.calendar = {
            BaseViewClass:  Y.DataTable.BaseCellPopupEditor,
            name:           'calendar',
            inputKeys:      true,

            templateObject: {
                html: 'Enter Date: &nbsp; <input type="text" title="inline cell editor" class="<%= this.classInput %>"  />'
                    + '<br/><div class="yui3-dt-editor-calendar"></div>'
            },

            // setup two buttons "Save" and "Cancel" for the containing overlay
            overlayConfig:{
                buttons:   [
                    { name:'save', value: 'Save',
                        action:function(){
                            var val = (this._inputNode) ? this._inputNode.get('value') : null;
                            this.saveEditor(val);
                        }
                    },
                    { name:'cancel', value: 'Cancel',
                        action:function(){ this.cancelEditor(); }
                    }
                ]
            },

            inputWidth: 75,   // set the INPUT[type=text] field width in the Overlay

            // only allow keyboard input of digits or '/' or '-' within the editor ...
            keyFiltering:   /\/|\d|\-/,

            // Function to call prior to displaying editor, to put a human-readable Date into
            //  the INPUT box initially ...
            prepFn: function(v){
                var dfmt = this.get('dateFormat') || "%D" || "%m/%d/%Y";
                return Y.DataType.Date.format(v,{format:dfmt});
            },

            // Function to call after Date editing is complete, prior to saving to DataTable ...
            //  i.e. converts back to "Date" format that DT expects ...
            saveFn: function(v){
                return Y.DataType.Date.parse(v) || undefined;
            },

            //
            // cell editor View instance event listeners ...
            //
            after: {

                //-------
                // After this View is created,
                //    create the Calendar widget ...
                //-------
                editorCreated: function(){
                    var calNode = this.overlay.get('contentBox').one('.yui3-dt-editor-calendar'),
                        calWidget,

                        // Define a basic config object for Y.Calendar ...
                        calConfig = {
                            // don't define a srcNode in here, because we are creating the node ...
                            height: '215px',
                            width:  '200px',
                            showPrevMonth: true,
                            showNextMonth: true,

                            // Setup this Calendar widget instance's event listeners ...
                            after: {

                                //-------
                                // After a "selection" is made in the widget,
                                //   updates the Editor's INPUT box on a widget date selection ...
                                //-------
                                selectionChange : function(o){
                                    var newDate = o.newSelection[0],
                                        editor  = this.editor, //this.get('editor'),
                                        prepFn  = editor.get('prepFn'),
                                        inpn    = editor._inputNode;
                                    inpn.set('value', (prepFn) ? prepFn.call(this,newDate) : newDate );
                                },

                                //-------
                                // After a date is clicked in the widget,
                                //   save the Date
                                //-------
                                dateClick: function(o){
                                    var newDate = o.date,
                                        editor  = this.editor;
                                    editor.saveEditor(newDate);
                                }
                            }
                        },

                        // Pass in user options via calendarConfig
                        userCalConfig = this.get('calendarConfig') || {};

                    //
                    //  If the srcNode exists, and Y.Calendar library is available ... create the Widget
                    //
                    if(calNode && Y.Calendar) {
                        // combine the base configs with user configs
                        calConfig = Y.merge(calConfig,userCalConfig);

                        calConfig.srcNode = calNode;
                        calWidget = new Y.Calendar(calConfig).render();

                        // Attach a plugin to the Widget instance, if it is available
                        if(Y.Plugin.Calendar && Y.Plugin.Calendar.JumpNav) {
                            this.plug( Y.Plugin.Calendar.JumpNav, {
                                yearStart: 1988, yearEnd:   2021
                            });
                        }

                    }

                    //
                    //  Set a property on the Calendar widget instance to trackback to this editor view,
                    //  AND also attach the Widget instance to this view
                    //
                    calWidget.editor = this;
                    this.widget = calWidget;

                },

                //-------
                // After this View is destroyed,
                //    we need to destroy the Calendar widget instance ...
                //-------
                editorDestroyed: function(){
                    if(this.widget) {
                        this.widget.destroy({remove:true});
                    }
                },

                //-------
                // After this View is displayed,
                //    setup the widget to display the current cell's Date value
                //-------
                editorShow: function(o){
                    var val = o.value;

                    // Display the widget, and select the date (if valid)
                    if(this.widget) {
                        this.widget.show();

                        if(Y.Lang.isDate(val)) {
                            this.widget.set('date',val);
                            this.widget.selectDates(val);
                        }
                    }

                    // Update the INPUT[text] value with date and set it's focus
                    this._setInputValue(val);
                    o.inputNode.focus();
                },

                //-------
                // After this View is hidden,
                //    hide the Calendar widget to avoid bleed-thru
                //-------
                editorHide: function(){
                    if(this.widget) {
                        this.widget.hide();
                    }
                },

                //-------
                // After this View is hidden,
                //    hide the Calendar widget to avoid bleed-thru
                //-------
                editorSave: function(){
                    if(this.widget) {
                        this.widget.hide();
                    }
                }
            }
        };

 **PLEASE NOTE:** All other attributes from the `BaseViewClass` apply and can be included within the `editorConfig`
 object.

 @class Y.DataTable.EditorOptions.calendar
 @since 3.8.0
 @public
 **/
_yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 1887);
Y.DataTable.EditorOptions.calendar = {
    BaseViewClass:  Y.DataTable.BaseCellPopupEditor,
    name:           'calendar',
    inputKeys:      true,

    templateObject: {
        html: 'Enter Date: &nbsp; <input type="text" title="inline cell editor" class="<%= this.classInput %>"  />'
            + '<br/><div class="yui3-dt-editor-calendar"></div>'
    },

    // setup two buttons "Save" and "Cancel" for the containing overlay
    overlayConfig:{
        buttons:   [
            { name:'save', value: 'Save',
                action:function(){
                    _yuitest_coverfunc("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", "action", 1901);
_yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 1902);
var val = (this._inputNode) ? this._inputNode.get('value') : null;
                    _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 1903);
this.saveEditor(val);
                }
            },
            { name:'cancel', value: 'Cancel',
                action:function(){ _yuitest_coverfunc("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", "action", 1907);
_yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 1907);
this.cancelEditor(); }
            }
        ]
    },

    inputWidth: 75,

    // only allow keyboard input of digits or '/' or '-' within the editor ...
    keyFiltering:   /\/|\d|\-/,

    // Function to call prior to displaying editor, to put a human-readable Date into
    //  the INPUT box initially ...
    prepFn: function(v){
        _yuitest_coverfunc("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", "prepFn", 1919);
_yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 1920);
var dfmt = this.get('dateFormat') || "%D" || "%m/%d/%Y";
        _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 1921);
return Y.DataType.Date.format(v,{format:dfmt});
    },

    // Function to call after Date editing is complete, prior to saving to DataTable ...
    //  i.e. converts back to "Date" format that DT expects ...
    saveFn: function(v){
        _yuitest_coverfunc("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", "saveFn", 1926);
_yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 1927);
return Y.DataType.Date.parse(v) || undefined;
    },

    //
    // cell editor View instance event listeners ...
    //
    after: {

        //-------
        // After this View is created,
        //    create the Calendar widget ...
        //-------
        editorCreated: function(){
            _yuitest_coverfunc("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", "editorCreated", 1939);
_yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 1940);
var calNode = this.overlay.get('contentBox').one('.yui3-dt-editor-calendar'),
                calWidget,

                // Define a basic config object for Y.Calendar ...
                calConfig = {
                    // don't define a srcNode in here, because we are creating the node ...
                    height: '215px',
                    width:  '200px',
                    showPrevMonth: true,
                    showNextMonth: true,

                    // Setup this Calendar widget instance's event listeners ...
                    after: {

                        //-------
                        // After a "selection" is made in the widget,
                        //   updates the Editor's INPUT box on a widget date selection ...
                        //-------
                        selectionChange : function(o){
                            _yuitest_coverfunc("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", "selectionChange", 1958);
_yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 1959);
var newDate = o.newSelection[0],
                                editor  = this.editor, //this.get('editor'),
                                prepFn  = editor.get('prepFn'),
                                inpn    = editor._inputNode;
                            _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 1963);
inpn.set('value', (prepFn) ? prepFn.call(this,newDate) : newDate );
                        },

                        //-------
                        // After a date is clicked in the widget,
                        //   save the Date
                        //-------
                        dateClick: function(o){
                            _yuitest_coverfunc("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", "dateClick", 1970);
_yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 1971);
var newDate = o.date,
                                editor  = this.editor;
                            _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 1973);
editor.saveEditor(newDate);
                        }
                    }
                },

                // Pass in user options via calendarConfig
                userCalConfig = this.get('calendarConfig') || {};

            //
            //  If the srcNode exists, and Y.Calendar library is available ... create the Widget
            //
            _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 1984);
if(calNode && Y.Calendar) {
                // combine the base configs with user configs
                _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 1986);
calConfig = Y.merge(calConfig,userCalConfig);

                _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 1988);
calConfig.srcNode = calNode;
                _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 1989);
calWidget = new Y.Calendar(calConfig).render();

                // Attach a plugin to the Widget instance, if it is available
                _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 1992);
if(Y.Plugin.Calendar && Y.Plugin.Calendar.JumpNav) {
                    _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 1993);
this.plug( Y.Plugin.Calendar.JumpNav, {
                        yearStart: 1988, yearEnd:   2021
                    });
                }

            }

            //
            //  Set a property on the Calendar widget instance to trackback to this editor view,
            //  AND also attach the Widget instance to this view
            //
            _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 2004);
calWidget.editor = this;
            _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 2005);
this.widget = calWidget;

        },

        //-------
        // After this View is destroyed,
        //    we need to destroy the Calendar widget instance ...
        //-------
        editorDestroyed: function(){
            _yuitest_coverfunc("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", "editorDestroyed", 2013);
_yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 2014);
if(this.widget) {
                _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 2015);
this.widget.destroy({remove:true});
            }
        },

        //-------
        // After this View is displayed,
        //    setup the widget to display the current cell's Date value
        //-------
        editorShow: function(o){
            _yuitest_coverfunc("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", "editorShow", 2023);
_yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 2024);
var val = o.value;

            // Display the widget, and select the date (if valid)
            _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 2027);
if(this.widget) {
                _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 2028);
this.widget.show();

                _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 2030);
if(Y.Lang.isDate(val)) {
                    _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 2031);
this.widget.set('date',val);
                    _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 2032);
this.widget.selectDates(val);
                }
            }

            // Update the INPUT[text] value with date and set it's focus
            _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 2037);
this._setInputValue(val);
            _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 2038);
o.inputNode.focus();
        },

        //-------
        // After this View is hidden,
        //    hide the Calendar widget to avoid bleed-thru
        //-------
        editorHide: function(){
            _yuitest_coverfunc("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", "editorHide", 2045);
_yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 2046);
if(this.widget) {
                _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 2047);
this.widget.hide();
            }
        },

        //-------
        // After this View is hidden,
        //    hide the Calendar widget to avoid bleed-thru
        //-------
        editorSave: function(){
            _yuitest_coverfunc("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", "editorSave", 2055);
_yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 2056);
if(this.widget) {
                _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 2057);
this.widget.hide();
            }
        }
    }
};


/**
 ### Popup Cell Editor "autocomplete"
 This View configuration is used to setup a textbox-type popup cell editor that has an Autocomplete
 plugin attached to the INPUT[text] node.

 ##### Basic Usage
         // Column definition
         { key:'state', editor:"autocomplete",
           editorConfig:{
               autocompleteConfig:{
                   source:  myStateArray,
                   alwaysShowList: true
               }
           }
         }

 ##### Standard Configuration
 This editor creates a simple INPUT[text] control internally within the popup Editor View container positioned
 directly over the TD element and uses Y.Plugin.AutoComplete to setup the autocomplete capability.  The user
 configures the AC via the "autocompleteConfig" setting.

 Typical use case is to define an "on:select" listener within the autocompleteConfig object that sets the
 editor "value" based upon the data's criteria.

 The configuration {Object} for this cell editor View is predefined as;

        Y.DataTable.EditorOptions.autocomplete = {
            BaseViewClass:  Y.DataTable.BaseCellPopupEditor,
            name:           'autocomplete',
            templateObject: {
                html: '<input type="text" title="inline cell editor" class="<%= this.classInput %>" />'
            },
            inputKeys:   true,

            // Set listeners to this View's instance ....
            after: {

               //---------
               //  After the cell editor View is instantiated,
               //    get the INPUT node and plugin the AutoComplete to it
               //---------
               editorCreated : function(o){
                   var inputNode = o.inputNode,
                       acConfig = this.get('autocompleteConfig') || {},
                       editor = this;

                   // If input node exists and autocomplete-plugin is available, plug the sucker in!
                   if(inputNode && Y.Plugin.AutoComplete) {
                       acConfig = Y.merge(acConfig,{
                           alwaysShowList: true,
                           render: true
                       });
                       inputNode.plug(Y.Plugin.AutoComplete, acConfig);

                       // add this View class as a static prop on the ac plugin
                       inputNode.ac.editor = editor;
                   }

               }
            }
        };

 **PLEASE NOTE:** All other attributes from the `BaseViewClass` apply and can be included within the
 `editorConfig` object.

 @class Y.DataTable.EditorOptions.autocomplete
 @since 3.8.0
 @public
 **/
_yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 2133);
Y.DataTable.EditorOptions.autocomplete = {
    BaseViewClass:  Y.DataTable.BaseCellPopupEditor,
    name:           'autocomplete',
    templateObject: {
        html: '<input type="text" title="inline cell editor" class="<%= this.classInput %>" />'
    },
    inputKeys:   true,

    // Set listeners to this View's instance ....
    after: {

       //---------
       //  After the cell editor View is instantiated,
       //    get the INPUT node and plugin the AutoComplete to it
       //---------
       editorCreated : function(o){
           _yuitest_coverfunc("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", "editorCreated", 2148);
_yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 2149);
var inputNode = o.inputNode,
               acConfig = this.get('autocompleteConfig') || {},
               editor = this;

           // If input node exists and autocomplete-plugin is available, plug the sucker in!
           _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 2154);
if(inputNode && Y.Plugin.AutoComplete) {
               _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 2155);
acConfig = Y.merge(acConfig,{
                   alwaysShowList: true,
                   render: true
               });
               _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 2159);
inputNode.plug(Y.Plugin.AutoComplete, acConfig);

               // add this View class as a static prop on the ac plugin
               _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 2162);
inputNode.ac.editor = editor;
           }

       }
    }
};

/**
 ### Popup Cell Editor "radio"
 This View configuration is used to setup a group of INPUT[type=radio] controls within the view's Overlay

 ##### Basic Usage
        // Column definition via Array options
        { key:"size", editor:"radio",
          editorConfig:{
            radioOptions:[ {value:0, text:"S"}, {value:1, text:"M"}, {value:2, text:"L"} ]
          }
        }
        // Column definition via Object type options
        { key:"size", editor:"radio",
          editorConfig:{
            radioOptions:{ S:"Small", M:"Medium", L:"Large" }
          }
        }

 ##### Standard Configuration
 This editor creates a series of INPUT[radio] controls sequentially based upon the 'radioOptions' data,
 all with the same "name" so that it forms a radio group.  A delegated "click" handler is setup at creation
 time to process the "checked" RADIO and save it's value.

 The configuration {Object} for this cell editor View is predefined as;

        Y.DataTable.EditorOptions.radio = {
            BaseViewClass:  Y.DataTable.BaseCellPopupEditor,
            name:           'radio',

            // Define the template for the radio group ...
            templateObject: {

                // Template Handlebars version ...
             //  html: '<div class="myradios">'
             //       + '{{#options}}'
             //       + '<input type="radio" name="dt-editor-radio" value="{{value}}"'
             //       + '{{#if title}} title="{{title}}"{{/if}} /> {{text}}'
             //       + '{{/options}}'
             //       + '</div>'

                // Template.Micro version
               html: '<div class="myradios ">' ////<%= this.classInput %>">'
                    + '<% Y.Array.each( this.options, function(r) { %>  '
                    + '<input type="radio" name="dt-editor-radio" '
                    +     'value="<%= r.value %>" <% (r.title) ? \'title="r.title"\' :  %> /> <%= r.text %>'
                    + '<% },this); %>'
                    + '</div>'
            },

            // cell editor View instance listeners ...

            on: {

                //--------
                //  When editorCreated fires (at initialization),
                //    setup a listener to save changes based on INPUT[radio] 'click' events
                //--------
                editorCreated: function(){
                    var cbox = this.overlay.get('contentBox');

                    this._subscr.push(
                        cbox.delegate('click',function(e){
                            var tar = e.target,
                                val = tar.get('value');

                            if(this._isZeroOr(val)) {
                                this.saveEditor(val);
                            }
                        },'input[type="radio"]', this)
                    );

                },

                //--------
                //  When the editor is displayed,
                //    update the "checked" INPUT[radio] within the group
                //--------
                editorShow : function(o){
                    var chks  = this.overlay.get('contentBox').one('.myradios').all('input[type="radio"]'),
                        val   = o.value || this.get('value'),
                        valStr = Y.Lang.isString(val),
                        chk, rval;

                    chks.each(function(n){
                        rval = (n && n.get) ? n.get('value') : null;
                        rval = (!valStr && /^\d*$/.test(rval) ) ? +rval : rval;
                        if(rval===val) {
                            chk = n;
                            return true;
                        }
                        n.set('checked',false);
                    });

                    if(chk) {
                        chk.set('checked',true);
                    }
                }
            }
        };

 **PLEASE NOTE:** All other attributes from the `BaseViewClass` apply and can be included within the
 `editorConfig` object.

 @class Y.DataTable.EditorOptions.radio
 @since 3.8.0
 @public
 **/
_yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 2276);
Y.DataTable.EditorOptions.radio = {
    BaseViewClass:  Y.DataTable.BaseCellPopupEditor,
    name:           'radio',

    // Define the template for the radio group ...
    templateObject: {
/*
        // Template Handlebars version ...
       html: '<div class="myradios">'
            + '{{#options}}'
            + '<input type="radio" name="dt-editor-radio" value="{{value}}"'
            + '{{#if title}} title="{{title}}"{{/if}} /> {{text}}'
            + '{{/options}}'
            + '</div>'
*/
        // Template.Micro version
//       html: '<div class="myradios <%= this.classInput %>">'
       html: '<div class="myradios ">' ////<%= this.classInput %>">'
            + '<% Y.Array.each( this.options, function(r) { %>  '
            + '<input type="radio" name="dt-editor-radio" '
            +     'value="<%= r.value %>" <% (r.title) ? \'title="r.title"\' :  %> /> <%= r.text %>'
            + '<% },this); %>'
            + '</div>'
    },

    // cell editor View instance listeners ...
    after: {

        //--------
        //  After the editor instance is created (at initialization),
        //    setup a listener to save changes based on INPUT[radio] 'click' events
        //--------
        editorCreated: function(){
            _yuitest_coverfunc("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", "editorCreated", 2308);
_yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 2309);
var cbox = this.overlay.get('contentBox');

            _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 2311);
this._subscr.push(
                cbox.delegate('click',function(e){
                    _yuitest_coverfunc("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", "(anonymous 6)", 2312);
_yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 2313);
var tar = e.target,
                        val = tar.get('value');

                    _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 2316);
if(this._isZeroOr(val)) {
                        _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 2317);
this.saveEditor(val);
                    }
                },'input[type="radio"]', this)
            );

        },

        //--------
        //  After the editor is displayed,
        //    update the "checked" INPUT[radio] within the group
        //--------
        editorShow : function(o){
            _yuitest_coverfunc("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", "editorShow", 2328);
_yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 2329);
var chks  = this.overlay.get('contentBox').one('.myradios').all('input[type="radio"]'),
                val   = o.value || this.get('value'),
                valStr = Y.Lang.isString(val),
                chk, rval;

            _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 2334);
chks.each(function(n){
                _yuitest_coverfunc("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", "(anonymous 7)", 2334);
_yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 2335);
rval = (n && n.get) ? n.get('value') : null;
                _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 2336);
rval = (!valStr && /^\d*$/.test(rval) ) ? +rval : rval;
                _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 2337);
if(rval===val) {
                    _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 2338);
chk = n;
                    _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 2339);
return true;
                }
                _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 2341);
n.set('checked',false);
            });

            _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 2344);
if(chk) {
                _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 2345);
chk.set('checked',true);
            }
        }
    }

};

/**
 ### Popup Cell Editor "dropdown"
 This View configuration is used to create a popup cell editor containing a single SELECT control within
 the Overlay.

 *Synonyms for this editor include "select" and "combobox".*

 ##### Basic Usage
        // Column definition ... simple Array data
        { key:"inTheForest", editor:"dropdown",
          editorConfig:{ dropdownOptions:[ "lions", "tigers", "bears", "oh my!" ] }
        }

        // Column definition ... options via Object type data
        { key:"color", formatter:"custom", formatConfig:stypesObj,
          editor:"select", editorConfig:{
             selectOptions:{ 0:'Red', 1:'Green', 2:'Fuschia', 3:'Blue' }
          }
        }

        // Column definition ... options via Array of Objects, non-trivial!
        { key:"firstTopping", editor:"dropdown",
          editorConfig:{
            dropdownOptions:[
               {controlUnit:'a7',  descr:'Pepperoni'},    {controlUnit:'f3', descr:'Anchovies'},
               {controlUnit:'b114',descr:'Extra Cheese'}, {controlUnit:'7', descr:'Mushrooms'}
             ],
            templateObject:{ propValue:'controlUnit', propText:'descr' }
          }
        }

 ##### Standard Configuration
 This editor creates a SELECT element within the popup Editor View container positioned directly over the TD element
 and populated via a Template (default Template.Micro, optionally Handlebars or other).  The "options" are set via
 the "dropdownOptions" (or selectOptions, comboboxOptions) setting and can be either Array based or an Object hash.

 The configuration {Object} for this cell editor View is predefined as;

        Y.DataTable.EditorOptions.dropdown = {
            BaseViewClass:  Y.DataTable.BaseCellPopupEditor,
            name:           'dropdown',    // OR 'select' or 'combobox'

            // Define the template for the SELECT and OPTIONS ...
            templateObject: {

                // Template Handlebars version ...
                // NOTE: This editor currently uses Handlebars only, intend to use Template.Micro
                //       but need to get this template micro http://yuilibrary.com/projects/yui3/ticket/2533040 fixed
             //   html: '<select class="myselect">'
             //       + '{{#options}}'
             //       + '<option value="{{value}}"{{#if title}} title="{{title}}"{{/if}}>{{text}}</option>'
             //       + '{{/options}}'
             //       + '</select>'

                // Template Micro version ...
                html: '<select class="myselect">'
                    + '<% Y.Array.each( data.options, function(r){ %>'
                    + '<option value="<%= r.value %>" <% (r.title) ? \'title="r.title"\' :  %>><%= r.text %></option>'
                    + '<% },this); %>'
                    + '</select>'

            },

            // Listeners applied to this cell editor's View instance ...
            after: {

                //--------
                //  After the editor view instance is created,
                //    set a "change" listener on the SELECT element
                //--------
                editorCreated: function(){
                    var cbox = this.overlay.get('contentBox');

                    this._subscr.push(
                        cbox.delegate('change',function(e){
                            var val = e.currentTarget.get('value');

                            if(this._isZeroOr(val)) {
                                this.saveEditor(val);
                            }

                        },'select', this)
                    );
                },

                //--------
                //  After the editor is displayed,
                //    update the currently selected OPTION based on the o.value
                //--------
                editorShow : function(o){
                    var sel   = this.overlay.get('contentBox').one('.myselect'),
                        sopts = sel.get('options'),
                        val   = o.value || this.get('value'),
                        sopt;

                    sopts.some(function(n){
                        if(n && n.get('value') == val) {  // not a === check, to account for mixed vars
                            sopt = n;
                            return true;
                        }
                    });

                    if(sopt) {
                        sopt.set('selected',true);
                    }

                }
            }

        };

 **PLEASE NOTE:** All other attributes from the `BaseViewClass` apply and can be included within the
 `editorConfig` object.


 #### DEBUGGING
 If your SELECT box contains "[object Object]" you probably forgot to define `propValue` and `propText`.

 @class Y.DataTable.EditorOptions.dropdown
 @since 3.8.0
 @public
 **/
_yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 2474);
Y.DataTable.EditorOptions.dropdown = {
    BaseViewClass:  Y.DataTable.BaseCellPopupEditor,
    name:           'dropdown',    // OR 'select' or 'combobox'

    // Define the template for the SELECT and OPTIONS ...
    templateObject: {
/*
        // Template Handlebars version ...
        // NOTE: This editor currently uses Handlebars only, intend to use Template.Micro
        //       but need to get this template micro http://yuilibrary.com/projects/yui3/ticket/2533040 fixed
        html: '<select class="myselect">'
            + '{{#options}}'
            + '<option value="{{value}}"{{#if title}} title="{{title}}"{{/if}}>{{text}}</option>'
            + '{{/options}}'
            + '</select>'
*/
        // Template Micro version ...
        html: '<select class="myselect">'
            + '<% Y.Array.each( data.options, function(r){ %>'
            + '<option value="<%= r.value %>" <% (r.title) ? \'title="r.title"\' :  %>><%= r.text %></option>'
            + '<% },this); %>'
            + '</select>'

    },

    // Listeners applied to this cell editor's View instance ...
    after: {

        //--------
        //  After the editor view instance is created,
        //    set a "change" listener on the SELECT element
        //--------
        editorCreated: function(){
            _yuitest_coverfunc("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", "editorCreated", 2506);
_yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 2507);
var cbox = this.overlay.get('contentBox');

            _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 2509);
this._subscr.push(
                cbox.delegate('change',function(e){
                    _yuitest_coverfunc("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", "(anonymous 8)", 2510);
_yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 2511);
var val = e.currentTarget.get('value');

                    _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 2513);
if(this._isZeroOr(val)) {
                        _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 2514);
this.saveEditor(val);
                    }

                },'select', this)
            );
        },

        //--------
        //  After the editor is displayed,
        //    update the currently selected OPTION based on the o.value
        //--------
        editorShow : function(o){
            _yuitest_coverfunc("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", "editorShow", 2525);
_yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 2526);
var sel   = this.overlay.get('contentBox').one('.myselect'),
                sopts = sel.get('options'),
                val   = o.value || this.get('value'),
                sopt;

            _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 2531);
sopts.some(function(n){
                _yuitest_coverfunc("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", "(anonymous 9)", 2531);
_yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 2532);
if(n && n.get('value') == val) {  // not a === check, to account for mixed vars
                    _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 2533);
sopt = n;
                    _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 2534);
return true;
                }
            });

            _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 2538);
if(sopt) {
                _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 2539);
sopt.set('selected',true);
            }

        }
    }

};


_yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 2548);
Y.DataTable.EditorOptions.select = Y.DataTable.EditorOptions.dropdown;
_yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 2549);
Y.DataTable.EditorOptions.combobox = Y.DataTable.EditorOptions.dropdown;


/**
 ### Popup Cell Editor "checkbox"
 This View configuration is used to setup a simple checkbox (i.e. on/off, yes/no, true/false) popup cell editor
 within the popup Overlay.

 ##### Basic Usage
        // Column definition
        { key:'arrived', editor:"checkbox",
          editorConfig:{ checkboxHash:{ 'true':'Y', 'false':'N' } }
        }

 ##### Standard Configuration
 This editor creates a single INPUT[type=checkbox] element internally within the Overlay and directly positioned
 over the TD element.  The checkbox is either "on" or "off", and the setting is mapped to the data value via the
 checkboxHash editorOption ....

 The configuration {Object} for this cell editor View is predefined as;

        Y.DataTable.EditorOptions.checkbox = {
            BaseViewClass:  Y.DataTable.BaseCellPopupEditor,
            name:           'checkbox',

            templateObject: {
               html: '<input type="checkbox" title="inline cell editor" />'
            },

            // Define listeners to this View instance ...
            after : {

                //---------
                // After this cell editor instance is created,
                //   setup a click listener on the INPUT[checkbox]
                //---------
                editorCreated: function(){
                    var cbox = this.overlay.get('contentBox');

                    this._subscr.push(
                        cbox.delegate('click',function(e){
                            var chk    = e.currentTarget,
                                cvalue = chk.get('checked') || false,
                                chkopt = this.get('checkboxHash') || { 'true':true, 'false':false },
                                val    = chkopt[cvalue];

                            if(this._isZeroOr(val)) {
                                this.saveEditor(val);
                            }


                        },'input[type="checkbox"]', this)
                    );
                },

                //---------
                // After this editor is displayed,
                //   update the "checked" status based on the underlying o.value
                //---------
                editorShow : function(o){
                    var chk    = this.overlay.get('contentBox').one('input[type="checkbox"]'),
                        val    = o.value || this.get('value'),
                        chkopt = (this.get('checkboxHash')) ? this.get('checkboxHash') : { 'true':true, 'false':false },
                        chkst  = false;

                    if(chk && val !== undefined ) {
                        chkst = (val === chkopt.true ) ? true : false;
                        chkst = (val === chkopt.false ) ? false : chkst;
                        chk.set('checked',chkst);
                    }
                }
            }
        };

 **PLEASE NOTE:** All other attributes from the `BaseViewClass` apply and can be included within the
 `editorConfig` object.

 @class Y.DataTable.EditorOptions.checkbox
 @since 3.8.0
 @public
 **/
_yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 2630);
Y.DataTable.EditorOptions.checkbox = {
    BaseViewClass:  Y.DataTable.BaseCellPopupEditor,
    name:           'checkbox',

    templateObject: {
       html: '<input type="checkbox" title="inline cell editor" />'
    },

    // Define listeners to this View instance ...
    after : {

        //---------
        // After this cell editor instance is created,
        //   setup a click listener on the INPUT[checkbox]
        //---------
        editorCreated: function(){
            _yuitest_coverfunc("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", "editorCreated", 2645);
_yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 2646);
var cbox = this.overlay.get('contentBox');

            _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 2648);
this._subscr.push(
                cbox.delegate('click',function(e){
                    _yuitest_coverfunc("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", "(anonymous 10)", 2649);
_yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 2650);
var chk    = e.currentTarget,
                        cvalue = chk.get('checked') || false,
                        chkopt = this.get('checkboxHash') || { 'true':true, 'false':false },
                        val    = chkopt[cvalue];

                    _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 2655);
if(this._isZeroOr(val)) {
                        _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 2656);
this.saveEditor(val);
                    }


                },'input[type="checkbox"]', this)
            );
        },

        //---------
        // After this editor is displayed,
        //   update the "checked" status based on the underlying o.value
        //---------
        editorShow : function(o){
            _yuitest_coverfunc("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", "editorShow", 2668);
_yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 2669);
var chk    = this.overlay.get('contentBox').one('input[type="checkbox"]'),
                val    = o.value || this.get('value'),
                chkopt = this.get('checkboxHash') || this.get('checkboxOptions') || { 'true':true, 'false':false },
                chkst  = false;

            _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 2674);
if(chk && val !== undefined ) {
                _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 2675);
chkst = (val === chkopt['true'] ) ? true : false;
                _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 2676);
chkst = (val === chkopt['false'] ) ? false : chkst;
                _yuitest_coverline("build/gallery-datatable-celleditor-popup/gallery-datatable-celleditor-popup.js", 2677);
chk.set('checked',chkst);
            }
        }
    }
};


}, '@VERSION@', {
    "supersedes": [
        ""
    ],
    "skinnable": "true",
    "requires": [
        "gallery-datatable-editable",
        "base-build",
        "view",
        "cssbutton",
        "event-outside",
        "overlay",
        "dd-plugin",
        "template"
    ],
    "optional": [
        ""
    ]
});
