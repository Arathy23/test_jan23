sap.ui.define([
   "com/demo/app/controller/BaseController",
   "sap/ui/core/routing/History"
], function(BaseController,History) {
    'use strict';
    return BaseController.extend("com.demo.app.controller.View3",{
        onInit: function(){
            this.oRouter = this.getOwnerComponent().getRouter();
            this.oRouter.getRoute("supdetail").attachMatched(this.supplier, this);
        
        },

        supplier:function(oEvent){
              var suppId = oEvent.getParameter("arguments").supplierId;
              var sPath = '/suppliers/'+ suppId;
              this.getView().bindElement(sPath);
        },

        onBack:function(){
            var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = this.getOwnerComponent().getRouter();
				oRouter.navTo("detail");
			}
			
        }
    });
    
});