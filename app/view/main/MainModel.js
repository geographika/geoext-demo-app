/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('Geoext.demo.app.view.main.MainModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.main',

    formulas: {
        map: {
            get: function() {
                return Geoext.demo.app.getApplication().getMap();
            }
        },
        locationLayerStyle:
        {
            get: function() {
                return new ol.style.Style({
                    stroke: new ol.style.Stroke({
                        color: 'blue',
                        width: 3
                    }),
                    fill: new ol.style.Fill({
                        color: 'rgba(0, 0, 255, 0.1)'
                    })
                });
            }
        }
    }
});
