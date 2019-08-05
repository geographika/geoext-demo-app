Ext.define('GeoExt.demo.app.view.grid.GridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.grid-grid',

    onFilterChange: function(rec, filters) {

        var wmsLayer = this.getViewModel().getData().wmsLayer;

        if (wmsLayer) {
            var wmsFilter = GeoExt.util.OGCFilter.getOgcWmsFilterFromExtJsFilter(filters);

            wmsLayer.getSource().updateParams({
                filter: wmsFilter,
                cacheBuster: Math.random()

            });
        }
    },

    onDoubleClick: function(grid, record) {

        var map =  this.getViewModel().getData().map;
        var feat = record.getFeature();
        var extent = feat.getGeometry().getExtent();
        map.getView().fit(extent, map.getSize());
    },

    onWfsStoreBeforeLoad: function(store, params) {

        var view = this.getView();
        view.setLoading(true);

        var filters = store.getFilters();
        var wfsGetFeatureFilter = GeoExt.util.OGCFilter.getOgcWfsFilterFromExtJsFilter(filters.items, 'And', '2.0.0');
        params.filter = wfsGetFeatureFilter;
    },

    onWfsStoreAfterLoad: function() {
        var view = this.getView();
        view.setLoading(false);
    }


});
