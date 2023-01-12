sap.ui.define([
    "com/demo/app/controller/BaseController",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "sap/ui/core/Fragment",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function (BaseController, MessageBox, MessageToast, Fragment,Filter,FilterOperator) {
    'use strict';
    return BaseController.extend("com.demo.app.controller.View2", {
        onInit: function () {
            this.oRouter = this.getOwnerComponent().getRouter();
            this.oRouter.getRoute("detail").attachMatched(this.herculis, this);
        },

        herculis: function (oEvent) {
            var fruitId = oEvent.getParameter("arguments").fruitId;
            var sPath = '/fruits/' + fruitId;
            this.getView().bindElement(sPath);
        },

        // onBack: function(){

        //     var oHistory = History.getInstance();
        // 	var sPreviousHash = oHistory.getPreviousHash();

        // 	if (sPreviousHash !== undefined) {
        // 		window.history.go(-1);
        // 	} else {
        // 		var oRouter = this.getOwnerComponent().getRouter();
        // 		oRouter.navTo("empty");
        // 	}
        // },

        onSave: function () {
            MessageBox.confirm("Do you want to save?", {
                title: "Confirmation for Save",
                onClose: function (status) {
                    if (status === 'OK') {
                        MessageToast.show("Your order has been places successfully")
                    }
                    else {
                        MessageToast.show("Could not Save");
                    }

                }
            });

        },



        onCancel: function () {
            MessageBox.error("Failed to Save");
        },

        onPrint: function (oEvent) {
            var ComboItems = this.getView().byId("multicombo").getSelectedItems();
            for (let i = 0; i < ComboItems.length; i++) {
                const element = ComboItems[i];


            }
        },

        onNavNextRow: function (oEvent) {
            var sPath = oEvent.getParameter("listItem").getBindingContextPath();
            var si = sPath.split("/")[sPath.split("/").length - 1];

            this.onNext(si);

        },

        onNext: function (si) {
            this.oRouter.navTo("supdetail", {
                supplierId: si
            });
        },

        onItemSelect:function(oEvent){
            var sId = oEvent.getSource().getId();
            if (sId.indexOf("city") == 0){
                var oSelItem = oEvent.getParameter("selectedItem");
                var sText = oSelItem.getLabel();
                this.oField.setValue(sText);
            }
            else {
                var aFilters =[];
                var aItems =  oEvent.getParameter("selectedItems");
                for (let i = 0; i < aItems.length; i++) {
                    const element = aItems[i];
                    var oFilter = new Filter("name", FilterOperator.EQ, element.getLabel());    
                    aFilters.push(oFilter);
                }

                var oFilterFinal = new Filter({
                    filters:aFilters,
                    and:false
                }); 

                this.getView().byId("idTab").getBinding("items").filter(oFilterFinal);
            }
         

        },
        
        oField :null,

        onFilter: function (oEvent) {
           
            if (!this.oSupplierPopup) {
                Fragment.load({
                    id: "supplier",
                    controller: this,
                    name: "com.demo.app.fragments.popup"
                }).then(function (oDialog) {
                    this.oSupplierPopup = oDialog;
                    this.oSupplierPopup.setTitle("Supplier Details");
                    this.getView().addDependent(oDialog);
                    this.oSupplierPopup.bindAggregation("items",{
                          path:"/suppliers",
                          template: new sap.m.DisplayListItem({
                            label:"{name}",
                            value:"{city}"
                          })
                    });
                    oDialog.open();
                }.bind(this));
            } else {
                this.oSupplierPopup.open();
            }

        },

        onF4Help: function (oEvent) {
            this.oField = oEvent.getSource();
            if (!this.oCityPopup) {
                Fragment.load({
                    id: "city",
                    controller: this,
                    name: "com.demo.app.fragments.popup"
                }).then(function (oDialog) {
                    this.oCityPopup = oDialog;
                    this.oCityPopup.setTitle("City Details");
                    this.oCityPopup.setMultiSelect("false");
                    this.getView().addDependent(oDialog);
                    this.oCityPopup.bindAggregation("items",{
                          path:"/cities",
                          template: new sap.m.DisplayListItem({
                            label:"{name}",
                            value:"{famousFor}"
                           
                          })
                    });
                    oDialog.open();
                }.bind(this));
            } else {
                this.oCityPopup.open();
            }

        }

    });

});