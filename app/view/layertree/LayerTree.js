
Ext.define('Geoext.demo.app.view.layertree.LayerTree', {
    extend: 'Ext.tree.Panel',
    xtype: 'Geoext.demo.app.view.layertree.LayerTree',
    requires: [
        'Geoext.demo.app.view.layertree.LayerTreeController',
        'Geoext.demo.app.view.layertree.LayerTreeModel',
        'GeoExt.plugin.layertreenode.ContextMenu',

        'Geoext.demo.app.view.grid.Grid'
    ],

    controller: 'layertree-layertree',
    viewModel: {
        type: 'layertree-layertree'
    },
    bind: {
        store: '{layers}'
    },
    title: 'Map Layers',
    viewConfig: {
        plugins: { ptype: 'treeviewdragdrop' }
    },
    columns: {
        header: false,

        items: [
            {
                xtype: 'treecolumn',
                dataIndex: 'text',
                align: 'left',
                flex: 1,
                // ViewControllers do not listen to manually fired events
                // so specify a listener config
                listeners: {
                    onMenuClick: 'onCreateContextUI'
                },
                plugins: [{
                    ptype: 'gx_layertreenode_contextmenu',
                    pluginId: 'myTestPlugin',
                    createContextUi: function(layerTreeNode) {
                        // the plugin itself cannot fire events, but its container component 
                        // the treecolumn can

                        var column = this.getCmp();

                        var contextMenu = Ext.create('Ext.menu.Menu', {
                            height: 200,
                            width: 250,
                            items: [{
                                text: 'Preview',
                                handler: function() {
                                    column.fireEvent('onMenuClick', layerTreeNode);
                                }
                            }]
                        });

                        return contextMenu;
                        
                    }
                }]
            }
        ]
    },
    rootVisible: false,
    //flex: 1,
    border: false
});
