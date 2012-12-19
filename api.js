YUI.add("yuidoc-meta", function(Y) {
   Y.YUIDoc = { meta: {
    "classes": [
        "Y.Calendar.JumpNavView",
        "Y.ContextMenuView",
        "Y.DataTable.CheckboxSelect",
        "Y.DataTable.Formatters",
        "Y.DataTable.Paginator",
        "Y.DataTable.Selection",
        "Y.FooterView",
        "Y.PaginatorModel",
        "Y.PaginatorView",
        "Y.Plugin.Calendar.JumpNav"
    ],
    "modules": [
        "DataTable",
        "FooterView",
        "Selection",
        "contextmenu",
        "datatable",
        "formatters",
        "gallery-datatable-paginator",
        "gallery-datatable-selection",
        "gallery-paginator-view"
    ],
    "allModules": [
        {
            "displayName": "contextmenu",
            "name": "contextmenu",
            "description": "This module includes a Y.View class extension that attaches to an existing \"trigger\" Node and uses event delegation to listen\nfor \"contextmenu\" requests (i.e. right-click). When the context menu is invoked, a Y.Overlay object is rendered and displayed\nthat includes user-defined menu items that are related to the context where the menu was invoked.\n\nThis view utilizes several attributes and fires several events that users can listen to in order to take specific actions based\non the \"trigger target\" node.\n\nPlease refer to the [trigger](#attr_trigger) ATTRIBUTE for more description of the target.node and target.trigger.\n\n#####Usage\nTo configure a bare-bones basic contextmenu, you need to provide the `trigger` and `menuItems` attributes as;\n\n    var cmenu = new Y.ContextMenuView({\n       trigger: {\n           node:   Y.one(\".myExistingContainer\"),\n           target:  'li'\n       },\n       menuItems: [ \"Add\", \"Edit\", \"Delete\" ]\n   });\n\nThe `menuItems` can be simple entries or Objects, if they are Objects the \"label\" property will be used to fill the visible Menu (See [menuItems](#attr_menuItems)).\n\n#####Attributes / Events\nAn implementer is typically interested in listening to the following ATTRIBUTE \"change\" events;\n<ul>\n  <li>`selectedMenuChange` : which fires when a contextmenu choice is clicked (see <a href=\"#attr_selectedMenu\">selectedMenu</a>)</li>\n  <li>`contextTargetChange`: which fires when the user \"right-clicks\" on the target.node (see <a href=\"#attr_contextTarget\">contextTarget</a>)</li>\n</ul>\n\nAdditionally please refer to the [Events](#events) section for more information on available events."
        },
        {
            "displayName": "DataTable",
            "name": "DataTable"
        },
        {
            "displayName": "datatable",
            "name": "datatable"
        },
        {
            "displayName": "FooterView",
            "name": "FooterView",
            "description": "FooterView is a YUI View class extension that provides a simple, one row summary row\nto a Datatable. This view provides\nfor a summary row appended to the bottom of the DataTable TBODY, typically consisting\nof **one** TH element (with a colspan) and several TD elements for each desired column\nwhere a \"calculated field\" is desired.\n\nView configuration provides for calculated fields based upon the all of the available\ndataset fields within the DataTable's \"ModelList\".\n\nThe view works with either non-scrolling or scrolling DataTables, and allows for either a\n\"fixed\" view, wherein the footer remains fixed at the bottom of the DataTable contentBox\nwhile the table is scrolled.\n\n#### Calculated Fields\n\nThe current implementation supports the following calculated fields, where they are\nidentified by their placeholder tag for replacement via Y.sub (case insensitive);\n\n* `{sum}` Calculate the arithmetic sum of the specified column in dataset\n* `{min}` Calculate the minimum value of the specified column in dataset\n* `{max}` Calculate the maximum value of the specified column in dataset\n* `{avg}` Calculate the arithmetic average of the of the specified column (synonyms `{mean}`, `{average}`)\n\nAlso, non-looping calcs are;\n\n*  `{row_count}` Returns the number of rows in the dataset\n*  `{col_count}` Returns the number of columns in the dataset (no visibility check)\n*  `{date}` Returns the current date\n*  `{time}` Returns the current time\n\n#### Configuration\n\nYUI 3.6.0 DataTable supports attributes including `footerView` and `footerConfig`.\n\nThis FooterView recognizes the following attributes, which must be configured via the\nDataTable {configs} (see usage example below);\n\n* [`fixed`](#attr_fixed) : Flag indicating if footer should be fixed or floating\n* [`heading`](#attr_heading) : Object, defining the single TH as;\n   * [`colspan`](#attr_heading.colspan) : Number of columns to merge from left for the TH\n   * [`content`](#attr_heading.content) : A string indicating the content of the TH for the footer\n   * [`className`](#attr_heading.className) : Additional classname for TH\n* [`columns`](#attr_columns) : Array of objects, one per desired TD column in footer as;\n   * [`key`](#attr_columns.key) : `key` name from the DataTable columns\n   * [`content`](#attr_columns.content) : String indicating the contents of this TD\n   * [`className`](#attr_columns.className) : Additional classname for TD\n   * [`formatter`](#attr_columns.formatter) : Formatter to apply to this column result\n* [`dateFormat`](#attr_dateFormat) : Format string to use for any {date} fields\n* [`timeFormat`](#attr_timeFormat) : Format string to use for any {time} fields\n\nAdditionally the user can provide a valid function as a column `content` to calculate a\ncustom entry for \n<br/>a column (see [`columns.content`](#attr_columns.content) or [`calcDatasetValue`](#method_calcDatasetValue))\n\n#### Usage\n\n    var dtable = new Y.DataTable({\n        columns:    ['EmpId','FirstName','LastName','NumClients','SalesTTM'],\n        data:       AccountMgr.Sales,\n        scrollable: 'y',\n        height:     '250px',\n        width:      '400px',\n\n        footerView:   Y.FooterView,\n        footerConfig: {\n            fixed:   true,\n            heading: {\n                colspan:\t3,\n                content:\t\"Sales Totals for {row_count} Account Mgrs : &nbsp;\",\n                className:\t\"align-right\"\n            },\n            columns: [\n                { key:'NumClients', content:\"{Avg} avg\", className:\"clientAvg\" },\n                { key:'SalesTTM',   content:\"{sum}\", className:\"salesTotal\", formatter:fmtCurrency }\n            ]\n        }\n    });\n\n    dtable.render('#salesDT');"
        },
        {
            "displayName": "formatters",
            "name": "formatters",
            "description": "Define a \"named\" Column Formatters object and attach it to the Y.DataTable namespace.\nThe named formatters are defined as a series of format strings that are typically used by the\ndata formatting function Y.DataType.Number.format and Y.DataType.Date.format.\n\nThe function [`namedFormatter`](#method_namedFormatter) is defined that can be used to call as a column formatter which\nformats the column cell using the [`formatStrings`](#property_formatStrings) object.\n\nThis module includes an override of the [Y.DataTable.BodyView._createRowHTML](#method_Y.DataTable.BodyView._createRowHTML) method.  Therefore implementers shouldn't call the `namedFormatter` method directly because the overridden method handles the call if the entered formatter string name is recognized.\n \n###Usage\nThe format string names can be used in a column configuration object as follows;\n\n\t\tvar dt1 = new Y.DataTable({\n\t        data: some_data,\n   \t    columns: [\n       \t    { key:\"start_date\", label:\"Start\", formatter:\"fullDate\" },\n           \t{ key:\"end_date\", label:\"End\", formatter:\"default\",\n\t                 formatOptions:{ type:'date', formatConfig:{ format:'%F' } }    },\n   \t        { key:\"qty\", label:\"Inventory Qty\", formatter:\"comma\" },\n       \t    { key:\"cost\", label:\"Carried Cost\", formatter:\"currency\",\n\t                 formatConfig:{ prefix:'£', thousandsSeparator:\",\"} }\n   \t    ]\n\t\t}).render();\n\n####Pre-Defined `formatStrings` settings; (specifically, Y.DataTable.Formatters.formatStrings)\nFor \"number\" formatting, using [Y.DataType.Number](http://yuilibrary.com/yui/docs/api/classes/DataType.Number.html#method_format).\n\n<table><tr><th>string</th><th>Formatter Object</th><th>Formatted Example</th></tr>\n<tr><td>`general`</td><td>{ decimalPlaces:0 }</td><td>123457</td></tr>\n<tr><td>`general2`</td><td>{ decimalPlaces:2 }</td><td>123456.79</td></tr>\n<tr><td>`currency`</td><td>{ prefix:'$', decimalPlaces:0, thousandsSeparator:',' }</td><td>$ 123,457</td></tr>\n<tr><td>`currency2`</td><td>{ prefix:'$', decimalPlaces:2, thousandsSeparator:',' }</td><td>$ 123,456.78</td></tr>\n<tr><td>`currency3`</td><td>{ prefix:'$', decimalPlaces:3, thousandsSeparator:',' }</td><td>$ 123,457.789</td></tr>\n<tr><td>`comma`</td><td>{ decimalPlaces:0, thousandsSeparator:','}</td><td>123,457</td></tr>\n<tr><td>`comma2`</td><td>{ decimalPlaces:2, thousandsSeparator:','}</td><td>123,456.78</td></tr>\n<tr><td>`comma3`</td><td>{ decimalPlaces:3, thousandsSeparator:','}</td><td>123,457.789</td></tr>\n</table>\n\nFor \"date\" formatting, using [Y.DataType.Date](http://yuilibrary.com/yui/docs/api/classes/DataType.Date.html#method_format).\n<br/>(Please refer to the Date.format method above for the proper use of \"strftime\" format strings)\n<table><tr><th>string</th><th>Formatter Object</th><th>Formatted Example</th></tr>\n<tr><td>`shortDate`</td><td>{ format:'%D' }</td><td>03/12/92</td></tr>\n<tr><td>`longDate`</td><td>{ format:'%m/%d/%Y' }</td><td>03/12/1992</td></tr>\n<tr><td>`fullDate`</td><td>{ format:'%B %e, %Y' }</td><td>March 12, 1992</td></tr>\n<tr><td>`isoDate`</td><td>{ format:'%F'}</td><td>1992-03-12</td></tr>\n<tr><td>`isoDateTime`</td><td>{ format:'%FT%T'}</td><td>1992-03-12T22:11:07</td></tr>\n</table>\n\n####Replaceable Hash\nThis utility can also replace the cell value with values from a data hash (i.e. JS simple object, consisting of key:value pairs).\nAccess to this capability is by providing a `formatter` as any string not-recognizable in the `formatStrings` object\n**AND** by providing a `formatConfig` object (equal to the hash) in the column definition.\n\n####User-Defined `formatStrings`\nImplementers may add their \"named\" own formatting strings for their own use-cases simply by adding more named formatters to the `formatStrings` object as;\n\n\tY.DataTable.Formatters.formatStrings['myNumberFmtr'] = {\n\t\ttype:'number', \n\t\tformatConfig:{ thousandsSeparator:'x', decimalPlaces:11 } \n\t};\n\tY.DataTable.Formatters.formatStrings['myDateFmtr'] = {\n\t\ttype:'date', \n\t\tformatConfig:{ format:{ \"At the tone the TIME will be %T\" } \n\t};"
        },
        {
            "displayName": "gallery-datatable-paginator",
            "name": "gallery-datatable-paginator",
            "description": "Defines a Y.DataTable class extension to add capability to support a Paginator View-Model and allow\npaging of actively displayed data within the DT instance.\n\nWorks with either client-side pagination (i.e. local data, usually in form of JS Array) or\nin conjunction with remote server-side pagination, via either DataSource or ModelSync.REST.\n\nAllows for dealing with sorted data, wherein the local data is sorted in place, and in the case of remote data the \"sortBy\"\nattribute is passed to the remote server.\n\n<h4>Usage</h4>\n\n    var dtable = new Y.DataTable({\n        columns:    [ 'firstName','lastName','state','age', 'grade' ],\n        data:       enrollment.records,\n        scrollable: 'y',\n        height:     '450px',\n        sortBy:     [{lastName:'asc'}, {grade:-1}],\n        paginator:  new PaginatorView({\n           model:      new PaginatorModel({itemsPerPage:50, page:3}),\n           container:  '#pagContA'\n        }),\n        resizePaginator: true\n    });\n\n<h4>Client OR Server Pagination</h4>\n\nPagination can either be done solely on the \"client\", or from a remote \"server\".  The attribute [paginationSource](#attr_paginationSource)\nis set to either of these strings.  The trivial case is where the data is coming locally (i.e. in a JS array) and the user requests\n\"client\" pagination.  Likewise when pagination occurs solely on a remote device, \"server\" is very straightforward.  This module also\nprovides a middle-path where the initial payload is obtained from a remote source, and then after loading, pagination is to be done\non the \"client\" (see below).\n\nA determination of whether the source of `data` is either \"local\" data (i.e. a Javascript Array or Y.ModelList), or is\nprovided from a server (either DataSource or ModelSync.REST) is performed within the method [_afterDataReset](#method__afterDataReset).\n\nFor server-side pagination, the OUTGOING request must include (as a minimum);  `page` and `itemsPerPage` querystring\nparameters (all others, including `sortBy` are optional).  Likewise, the INCOMING (returned response) must include as \"meta-data\" at\nleast `totalItems`, plus any other PaginatorModel attributes.   The key item within the returned response is `totalItems'. If the returned\nresponse does not contain `totalItems` metadata <b>the PaginatorView will not be shown!</b>.\n\nWe have provided an attribute [serverPaginationMap](#attr_serverPaginationMap) as an object hash to translate both outgoing\nquerystring parameter names and incoming (response returned) parameter names in order to match what is expected by the\nPaginatorModel.  Please see this attribute or the examples for how to utilize this map for your use case.\n\n<h4>Loading the \"data\" For a Page</h4>\nOnce the \"source of data\" is known, the method [processPageRequest](#method_processPageRequest) fires on a `pageChange`.\n\nFor the case of \"client\" pagination, an internal buffer [_mlistArray](#property__mlistArray) is set to hold all of the data.\nEach page request in this circumstance involves using simply Array slicing methods from the buffer.\n(See method [paginatorLocalRequest](#method_paginatorLocalRequest) for details)\n\nThe case of \"remote data\" (from a server) is actually more straightforward.  For the case of ModelSync.REST remote data the\ncurrent \"pagination state\" is processed through the [serverPaginationMap](#attr_serverPaginationMap) hash (to convert to\nqueryString format) and the ModelList.load() method is called.  For the case of a DataSource, a similar approach is used where\nthe [requestStringTemplate](#attr_requestStringTemplate) is read, processed through the serverPaginationMap hash and a\ndatasource.load() request is fired.\n(See methods [paginatorMLRequest](#method_paginatorMLRequest) and [paginatorDSRequest](#method_paginatorDSRequest)for details)\n\nThis extension DOES NOT \"cache\" pages for remote data, it simply inserts the full returned data into the DT.  So as a consequence,\na pagination state change for remote data involves a simple request sent to the server source (either DataSource or ModelSync.REST)\nand the response results are loaded in the DT as in any other \"response\".\n\n<h4>Loading the \"initial data\" remotely - then using \"client\" Pagination</h4>\n\nA recent revision to this module now allows for the initial payload of data that constitutes the entire \"dataset\" to be loaded\nfrom a remote source (by the standard DataSource or ModelSync.REST methods).\n\nBy setting the [paginationSource](#attr_paginationSource) attribute to \"client\", this module proceeds with paginating the DataTable\nas if the data was initially set within the \"data\" property.\n\n<h4>Sorting</h4>\n\nThis module supports sorting for both client and server side Pagination.  Note that sorting for \"server-side\" is required to be\naccomplished by the remote server; the \"sortBy\" settings are passed in a remote page request.\n\nFor client-side Pagination the task is a more complex.  We utilize an internal buffer to store the client-side data, so therefore\nthe requested \"sorting\" is accomplished internally within method [paginatorSortLocalData](#method_paginatorSortLocalData).\nBasic \"client-side\" sorting is supported in this method (limited to one sort key at a time).\nImplementers may override this method for more complex sorting needs."
        },
        {
            "displayName": "gallery-datatable-selection",
            "name": "gallery-datatable-selection",
            "description": "A class extension for DataTable that adds \"highlight\" and \"select\" actions via mouse selection.\nThe extension works in either \"cell\" mode or \"row\" mode (set via attribute [selectionMode](#attr_selectionMode)).\n\nHighlighting is controlled by the [highlightMode](#attr_highlightMode) attribute (either \"cell\" or \"row\").\n(Highlighting provides a \"mouseover\" indication only), and a delegated \"mouseover\" event is defined in this module.\n\nSelection is provided via \"click\" listeners, by setting a delegated \"click\" handler on the TD or TR elements.\n\nThis extension includes the ability to select \"multiple\" items, by setting the [selectionMulti](#attr_selectionMulti)\nattribute (enabled using browser multi-select click modifier, i.e. \"Cmd\" key on Mac OSX or \"Ctrl\" key on Windows / Linux).\n\nAdditionally, a \"range\" selection capability is provided by using the browser range selector click key modifier,\nspecifically the Shift key on most systems.\n\nThe extension has been written to allow preserving the \"selected\" rows or cells during \"sort\" operations.  This is\naccomplished by storing the selected TR's basis record, specifically the \"clientId\" attribute which remains unique\nafter sorting operations.\n\nSpecific attributes are provided that can be read for current selections, including the ATTRS [selectedRows](#attr_selectedRows),\nand [selectedCells](#attr_selectedCells).\n\nTypical usage would be to set the \"selectionMode\" and \"highlightMode\" attributes (and selectionMulti if desired) and then\nto provide a positive control (like a BUTTON or A link) to process the selections.  Two events are provided,  [selection](#event_selection)\nand [selected](#event_selected) but these fire for every \"click\" action, which may not be ideal -- especially for multi selections."
        },
        {
            "displayName": "gallery-paginator-view",
            "name": "gallery-paginator-view",
            "description": "A Model class extension to be used to track \"pagination state\" of a paged set of control elements.\nFor example, can be used to track the pagination status of a DataTable where the user selects limited\nportions for display, against a larger data set.\n\nThe primary tools for maintaining \"page state\" is through the following attributes;\n\n* `totalItems` &nbsp;&nbsp;  Which represents the \"Total count of items of interest\" (See attribute [totalItems](#attr_totalItems) )\n* `itemsPerPage` &nbsp;&nbsp; Which represents the \"Count of items on each page\" (See attribute [itemsPerPage](#attr_itemsPerPage) )\n*  `page` &nbsp;&nbsp;  The currently selected page, within all pages required that encompass the above two attributes\n    (See attribute [page](#attr_page) )\n\n<h4>Usage</h4>\n\n    // setup a paginator model for 500 'foo' items, paged at 50 per page ...\n    var pagModel = new Y.PaginatorModel({\n       totalItems:     500,\n       itemsPerPage:   50\n    });\n    pagModel.get('totalPages');  // returns 10\n\n    pagModel.set('page',3);\n    pagModel.getAttrs(['lastPage','page','itemIndexStart','itemIndexEnd']);\n    // returns ... { lastPage:1, page:3, itemIndexStart:100, itemIndexEnd:149 }"
        },
        {
            "displayName": "Selection",
            "name": "Selection",
            "description": "A DataTable class extension that adds capability to provide a \"checkbox\" (INPUT[type=checkbox]) selection\ncapability via a new column, which includes \"select all\" checkbox in the TH.  The class uses only a few\ndefined attributes to add the capability.\n\nThis extension works with sorted data and with paginated DataTable (via Y.DataTable.Paginator), by retaining\na set of \"primary keys\" for the selected records.\n\nUsers define the \"primary keys\" by either setting a property flag of \"primaryKey:true\" in the DataTable\ncolumn configuration OR by setting the [primaryKeys](#attr_primaryKeys) attribute.\n\nTo enable the \"checkbox\" selection, set the attribute [checkboxSelectMode](#attr_checkboxSelectMode) to true,\nwhich will add a new column as the first column and sets listeners for checkbox selections.\n\nTo retrieve the \"checkbox\" selected records, the attribute [checkboxSelected](#attr_checkboxSelected) can be\nqueried to return an array of objects of selected records (See method [_getCheckboxSelected](#method__getCheckboxSelected))\nfor details.\n\n####Usage\n\t\tvar dtable = new Y.DataTable({\n\t\t    columns: \t['port','pname', 'ptitle'],\n\t\t    data: \t\tports,\n\t\t    scrollable: 'y',\n\t\t    height: \t'250px',\n\t\t\n\t\t// define two primary keys and enable checkbox selection mode ...\n\t\t    primaryKeys:\t\t[ 'port', 'pname' ],\n\t\t    checkboxSelectMode:\ttrue\n\t\t\n\t\t}).render(\"#dtable\");"
        }
    ]
} };
});