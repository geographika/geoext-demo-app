
Ext.define('GeoExt.demo.app.view.layertree.LayerTree', {
    extend: 'Ext.tree.Panel',
    xtype: 'GeoExt.demo.app.view.layertree.LayerTree',
    requires: [
        'Ext.tree.plugin.TreeViewDragDrop',
        'GeoExt.demo.app.view.layertree.LayerTreeController',
        'GeoExt.demo.app.view.layertree.LayerTreeModel',
        'GeoExt.plugin.layertreenode.ContextMenu'
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
                plugins: [{
                    ptype: 'gx_layertreenode_contextmenu',
                    pluginId: 'myTestPlugin',
                    createContextUi: function(layerTreeNode) {

                        // the plugin itself cannot fire events
                        // we get the ViewController from the column and call
                        // the function manually

                        var column = this.getCmp();
                        return column.up().up().getController().getContextMenu(layerTreeNode);
                    }
                }]
            }
        ]
    },
    rootVisible: false,
    border: false
});
