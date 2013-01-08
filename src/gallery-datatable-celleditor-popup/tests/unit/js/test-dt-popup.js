YUI.add('module-tests-dtpopup', function(Y) {

    var suite = new Y.Test.Suite('gallery-datatable-popup'),
        Assert = Y.Test.Assert;

    // a blocking sleep function ... easier than Y.later or timeout crap
    function sleep(msecs){
        var tstart = new Date().getTime();
        while( new Date().getTime() < tstart + msecs );
        return;
    }


    function makeDT( colChoice ) {

        var someData = [
            {sid:10, sname:'Sneakers', sopen:0, stype:0, stock:0, sprice:59.93, shipst:'s', sdate:new Date(2009,3,11) },
            {sid:11, sname:'Varnished Cane Toads', sopen:1,  stype:10, stock:2, shipst:'u', sprice:17.49, sdate:new Date(2009,4,12) },
            {sid:12, sname:'JuJu Beans', sopen:0,  stype:20, stock:1, sprice:1.29, shipst:'s', sdate:new Date(2009,5,13) },
            {sid:13, sname:'Tent Stakes', sopen:1,  stype:30, stock:1, sprice:7.99, shipst:'n', sdate:new Date(2010,6,14) },
            {sid:14, sname:'Peanut Butter', sopen:0,  stype:40, stock:0, sprice:3.29, shipst:'e', sdate:new Date(2011,7,15) },
            {sid:15, sname:'Garbage Bags', sopen:1, stype:50,  stock:2, sprice:17.95, shipst:'r', sdate:new Date(2012,8,18) }
        ];

        // enlarge the dataset
        Y.Array.each(someData,function(d,di){
            d.sdesc = 'Description for Item ' + d.sid + ' : ' + d.sname;
        });
     //   someData = someData.concat(someData,someData);

        //
        // Define some Arrays / Object Hashes to be used by formatters / editor options ...
        //
        var stypes = [
            {value:0,  text:'Standard'},
            {value:10, text:'Improved'},
            {value:20, text:'Deluxe'},
            {value:30, text:'Better'},
            {value:40, text:'Subpar'},
            {value:50, text:'Junk'}
        ];

        var shipTypes = { s:'Shipped', u:'Unknown', n:'Not Shipped', e:'Expedited', r:'Returned' };

        var stypesObj = {};
        Y.Array.each(stypes,function(r){
            stypesObj[r.value] = r.text;
        });

        var stock = { 0:'No ', 1:'Yes ', 2:'B/O ' };
        var sopen = { 0:'No', 1:'Yes'};

    //
    // We use pre-named editors on the "editor" property of the Columns,
    //   in some cases, editorConfig are added to provide stuff to pass to the editor Instance ...

       var colsNoediting = [
            { key:'sid',    label:"sID", editable:false },
            { key:'sopen',  label:"Open?" },
            { key:'sname',  label:"Item Name" },
            { key:'sdesc',  label:"Description"},
            { key:'stype',  label:"Condition" },
            { key:'stock',  label:"In Stock?" },
            { key:'sprice', label:"Retail Price" },
            { key:'sdate',  label:"Trans Date" }
        ];

        var colsEditing = [
                { key:'sid',    label:"sID", editable:false },

                { key:'sopen',  label:"Open?",
              //    formatter:"custom", formatConfig:sopen,
                  editor:"checkbox", editorConfig:{
                    checkboxHash:{ 'true':1, 'false':0 }
                  }
                },

                { key:'sname',  label:"Item Name"
                  //editor:"text", editorConfig:{ offsetXY: [5,5] }
                },

                { key:'sdesc',  label:"Description",  editor:"textarea" },

                { key:'stype',  label:"Condition",
              //    formatter:"custom", formatConfig:stypesObj,
                  editor:"select",
                  editorConfig:{
                      selectOptions:  stypesObj, //stypes,
                      templateEngine:Y.Handlebars
                  }
                },

                { key:'stock',  label:"In Stock?",
              //    formatter:"custom", formatConfig:stock,
                  editor:"radio",
                  editorConfig:{
                      radioOptions:stock,
                      overlayWidth: 260,
                      templateEngine:Y.Handlebars
                  }
                },

                { key:'sprice', label:"Retail Price"
             //     formatter:"currency2", className:'align-right'
                 // editor:"number"
                 // editor: 'inlineNumber'
                },

                { key:'sdate',  label:"Trans Date",
              //    formatter:"shortDate", className:'align-right',
                  editor:"calendar"
                 // editor:"date", editorConfig:{ keyFiltering:null, inputKeys:false }
                }
            ];

        var cols = [ colsNoediting, colsEditing ];

        var localDT = new Y.DataTable({
            columns: cols[colChoice],
            data: someData

         //   editOpenType: 'click',
         //   defaultEditor: 'text',
         //   editable: true

        }).render('#dtable');
        return localDT;
    }


    suite.add(new Y.Test.Case({
        name: 'Gallery DataTable-Celleditor-Popup : basic setup and instance',

        setUp : function () {
            // cols
            // {sid: sname: sdesc: sopen:0, stype:0, stock:0, sprice:, shipst:'s', sdate: },
            this.dt = makeDT(0);

        },

        tearDown : function () {
            this.dt.destroy();
            delete this.dt;
        },

        'should be a class': function() {
            //Assert.isFunction(Y.DataTable.Editable);
        },

        'should instantiate as a Model': function() {
            Assert.isInstanceOf( Y.DataTable, this.dt, 'Not an instanceof Y.DataTable');
        },

        'listeners are set' : function(){
            //Assert.areSame( 3, this.m._subscr.length, "Didn't find 3 listeners" );
        }

    }));


    Y.Test.Runner.add(suite);


},'', { requires: [ 'test' ] });

