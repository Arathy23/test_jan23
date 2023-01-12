sap.ui.define([
    "com/demo/app/controller/BaseController",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function (BaseController, Filter, FilterOperator) {
    'use strict';
    return BaseController.extend("com.demo.app.controller.View1", {
        onInit: function () {
            this.oRouter = this.getOwnerComponent().getRouter();
        },


        onNext: function (sIndex) {
            this.oRouter.navTo("detail", {
                fruitId: sIndex
            });
        },

        onItemDelete: function (oEvent) {
            var ItemSelected = oEvent.getParameter("listItem");
            // var oList = this.getView().byId("idList");
            var oList = oEvent.getSource();
            oList.removeItem(ItemSelected);

        },

        onDelete: function (oEvent) {
            var oList = this.getView().byId("idList");
            var oItems = oList.getSelectedItems();
            for (let i = 0; i < oItems.length; i++) {
                const element = oItems[i];
                oList.removeItem(element);

            }
        },

        onSearch: function (oEvent) {
            var sValue = oEvent.getParameter("query");
            var oFilter1 = new Filter("name", FilterOperator.Contains, sValue);
            var oFilter2 = new Filter("type", FilterOperator.Contains, sValue);
            var oFilter = new Filter({
                filters: [oFilter1, oFilter2]
            });

            var oList = this.getView().byId("idList");
            oList.getBinding("items").filter(oFilter);
        },

        onSelect: function (oEvent) {
            var oListItem = oEvent.getParameter("listItem");
            var sPath = oListItem.getBindingContextPath();
            var sIndex = sPath.split("/")[sPath.split("/").length - 1];

            this.onNext(sIndex);
        }
    });

});