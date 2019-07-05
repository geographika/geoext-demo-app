Ext.define('Geoext.demo.app.view.layertree.LayerTreeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.layertree-layertree',

    gridWindow: null,

    onMenuClick: function() {

        debugger;
    },

    onCreateContextUI: function(layerTreeNode) {

        var me = this;
        var layer = layerTreeNode.getOlLayer();

        if (!me.gridWindow) {

            var grid = Ext.create('Geoext.demo.app.view.grid.Grid', {
                width: 1050,
                height: 600
            });

            me.gridWindow = Ext.create("Ext.window.Window", {
                height: 600,
                //width: 880,
                title: 'Light Summary', // TODO update from name
                layout: 'fit',
                maximizable: true,
                items: [grid],
                closeAction: 'hide' // don't destroy the window when closed
            });
        }

        me.gridWindow.show();
    }
});
