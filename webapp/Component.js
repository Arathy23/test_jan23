sap.ui.define([
    "sap/ui/core/UIComponent"
], function (UIComponent) {
    'use strict';
    return UIComponent.extend("com.demo.app.Component", {
        metadata: {
            manifest: "json"
        },
        init: function () {
            // like constructor of Component Class
            //here we call Base class contructor 
            sap.ui.core.UIComponent.prototype.init.apply(this) ;  
            var oRouter = this.getRouter()  ;
            oRouter.initialize();
        },
    

        destroy: function () {

        }

    });
});