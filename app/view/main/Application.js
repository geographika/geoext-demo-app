/**
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */
Ext.define('Geoext.demo.app.Application', {
    extend: 'Ext.app.Application',

    name: 'Geoext.demo.app',

    quickTips: false,
    platformConfig: {
        desktop: {
            quickTips: true
        }
    },

    stores: [
        // TODO: add global / shared stores here
    ],

    launch: function() {
        // TODO - Launch the application
    },


    getMap: function() {
        // see http://terrestris.github.io/BasiGX/master/docs/source/Map2.html#BasiGX-util-Map-static-method-getMapComponent
        return Ext.ComponentQuery.query('gx_map')[0].map;
    },

    getLayerBy: function(key, val, collection) {

        // based on https://github.com/terrestris/BasiGX/blob/master/src/util/Layer.js
        var me = this;
        var matchingLayer;
        var layers;

        var map = me.getMap();
        layers = map.getLayers().getArray();

        Ext.each(layers, function(layer) {
            if (matchingLayer) {
                return false;
            }
            if (layer.get(key) === val && layer instanceof ol.layer.Base) {
                matchingLayer = layer;
                return false;
            } else if (layer instanceof ol.layer.Group) {
                matchingLayer = me.getLayerBy(key, val, layer.getLayers());
            }
        });
        return matchingLayer;
    },

    onAppUpdate: function() {
        Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
            function(choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
