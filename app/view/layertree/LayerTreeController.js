Ext.define('Geoext.demo.app.view.layertree.LayerTreeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.layertree-layertree',

    requires: [
        'Geoext.demo.app.view.grid.Grid'
    ],

    gridWindow: null,

    getContextMenu: function(layerTreeNode) {

        var me = this;
        var layer = layerTreeNode.getOlLayer();

        if (layer.getSource() instanceof ol.source.TileWMS) {
            var params = layer.get('source').getParams();
            if ('LAYERS' in params) {
                if (params['LAYERS'] === 'dwd:Warngebiete_Kreise') {
                    return me.createMenu(layer);
                }
            }
        }


    },
    createMenu: function(layer) {

        var me = this;

        var contextMenu = Ext.create('Ext.menu.Menu', {
            items: [{
                text: 'Open Table',
                handler: function() {
                    me.createGridWindow(layer);
                }
            }]
        });

        return contextMenu;
    },

    createGridWindow: function(layer) {

        var me = this;

        if (!me.gridWindow) {

            me.gridWindow = Ext.create("Ext.window.Window", {
                height: 600,
                title: layer.qtitle,
                layout: 'fit',
                maximizable: true,
                items: [{
                    xtype: 'Geoext.demo.app.view.grid.Grid',
                    width: 1050,
                    height: 600
                }],
                closeAction: 'hide' // don't destroy the window when closed
            });
        }

        me.gridWindow.show();
    }
});
