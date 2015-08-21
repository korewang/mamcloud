requirejs.config({
	baseUrl : "js",
	paths: {

		jquery : "libs/jquery",
        jtouch:"libs/jquery.touchy",
        iScroll:"libs/iscroll",
		underscore: "libs/underscore",
		backbone: "libs/backbone",
		marionette: "libs/backbone.marionette",
		handlebars: "libs/handlebars",
		text: "libs/text",
        "backbone.picky": "libs/backbone.picky",
        "backbone.paginator": "libs/backbone.paginator",
        "backbone.validation": "libs/backbone-validation-amd",
		dropzone: "libs/dropzone-amd-module",
        ratchet: "libs/ratchet",
        bootstrap: "libs/bootstrap",
        "bootstrap-dialog": "libs/bootstrap-dialog"
	},

	shim: {
		underscore: {
			exports: "_"
		},
        ratchet: {
            exports: "ratchet",
            deps: ["jquery"]
        },
        jtouch:{
          deps:["jquery"],
            exports:'jtouch'
        },
        bootstrap:{
            deps:["jquery"],
            exports : 'bootstrap'
        },
		handlebars: {
			exports: "Handlebars"
		},

        "bootstrap-dialog": {
            deps:["jquery","bootstrap"],
            exports:"BootstrapDialog"
        },

		backbone: {
			deps: ["underscore","jquery","handlebars","jtouch","iScroll"],
			exports:"Backbone"
		},
        "backbone.picky": ["backbone"],
        "backbone.paginator":["backbone"],
		marionette: {
			deps:["backbone","bootstrap"],
			exports: "Marionette"
		}
	}
});


require(["app","interface"],function(app,devApp){

    var deviceReadyDeferred = devApp.initialize();
    $.when(deviceReadyDeferred).then(function(){
        app.start();
        //navigator.notification.alert("started");
    });
    deviceReadyDeferred.resolve();
    app.onStop = function(){

        appEventHandler.unInitialize();
    };

});