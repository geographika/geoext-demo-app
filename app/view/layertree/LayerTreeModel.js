Ext.define('Geoext.demo.app.view.layertree.LayerTreeModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.layertree-layertree',
    requires: [
        'GeoExt.data.store.LayersTree'
    ],
    //data: {
    //    name: 'Geoext.demo.app'
    //},

    constructor: function() {
        this.callParent(arguments);
        var map = Geoext.demo.app.getApplication().getMap();

        var treeStore = Ext.create('GeoExt.data.store.LayersTree', {
            layerGroup: map.getLayerGroup(),
            // Add a filter so any Unnamed layers don't appear in the layer tree
            // https://docs.sencha.com/extjs/6.5.1/modern/Ext.data.TreeStore.html#cfg-filters
            filters: function(layerRec) {
                var layer = layerRec.getOlLayer();
                if (layer) {
                    return layer.get('name') !== undefined;
                }
            }
        });

        this.setStores({
            layers: treeStore
        });
    }

});
