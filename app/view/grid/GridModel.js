Ext.define('GeoExt.demo.app.view.grid.GridModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.grid-grid',

    requires: [
        'GeoExt.demo.app.store.Districts'
    ],

    // https://www.sencha.com/forum/showthread.php?313600-Use-binded-data-to-configure-proxy-in-viewModel&p=1141585&viewfull=1#post1141585
    formulas: {
        map: {
            get: function() {
                // in more recent ExtJS versions can use Ext.getApplication().getName()
                return Ext.app.Application.instance.getMap();
            }
        },
        wmsLayer: {
            get: function() {
                var app = Ext.app.Application.instance;
                // TODO use more robust way to get layer
                return app.getLayerBy('name', 'Districts (Right-click)');
            }
        },
        selectStyle: {
            get: function() {
                return new ol.style.Style({
                    stroke: new ol.style.Stroke({
                        color: '#0ff',
                        width: 2
                    })
                });
            }
        }
    },
    stores: {
        districts: {
            type: 'districts',
            map: '{map}',
            createLayer: true,
            style: null, // hide WFS features unless selected - they are visible as part of the WMS
            listeners: {
                'gx-wfsstoreload-beforeload': 'onWfsStoreBeforeLoad',
                'gx-wfsstoreload': 'onWfsStoreAfterLoad'
            }
        }
    }

});
