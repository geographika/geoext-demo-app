Ext.define('Geoext.demo.app.view.grid.GridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.grid-grid',

    onFilterChange: function(rec, filters) {

        var wmsLayer = this.getViewModel().getData().wmsLayer;
        var wmsFilter = GeoExt.util.OGCFilter.getOgcWmsFilterFromExtJsFilter(filters);

        wmsLayer.getSource().updateParams({
            filter: wmsFilter,
            cacheBuster: Math.random()

        });

        //var wfsLayer = this.getView().getStore().layer;
        //var wfsGetFeatureFilter = GeoExt.util.OGCFilter.getOgcWfsFilterFromExtJsFilter(filters, 'And', '2.0.0');
        //wfsLayer.getSource().clear();
        //wfsLayer.getSource().refresh();
    },

    onDoubleClick: function(grid, record) {

        var map =  this.getViewModel().getData().map;
        var feat = record.getFeature();
        var extent = feat.getGeometry().getExtent();
        map.getView().fit(extent, map.getSize());

    },

    onWfsStoreBeforeLoad: function(store, params) {

        var wfsLayer = store.layer;
        var filters = store.getFilters();
        var wfsGetFeatureFilter = GeoExt.util.OGCFilter.getOgcWfsFilterFromExtJsFilter(filters.items, 'And', '2.0.0');
        params.filter = wfsGetFeatureFilter;

    }


});
