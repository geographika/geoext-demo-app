
Ext.define('GeoExt.demo.app.view.map.Map', {
    extend: 'Ext.panel.Panel',
    xtype: 'GeoExt.demo.app.view.map.Map',

    requires: [
        'GeoExt.state.PermalinkProvider',
        'GeoExt.demo.app.view.map.MapController',
        'GeoExt.demo.app.view.map.MapModel',
        'GeoExt.demo.app.view.map.MapModel'
    ],

    controller: 'map',
    viewModel: {
        type: 'map'
    },

    shouldUpdatePermalink: true,

    initComponent: function() {

        var me = this;

        var wmsLayer = new ol.layer.Tile({
            name: 'Districts (Right-click)',
            source: new ol.source.TileWMS({
                url: 'https://maps.dwd.de/geoserver/dwd/ows?',
                params: {
                    'LAYERS': 'dwd:Warngebiete_Kreise',
                    'TILED': true
                },
                attributions: [new ol.Attribution({
                    html: '<a href="https://www.dwd.de">' +
                        'Copyright: © Deutscher Wetterdienst</a>'
                })]
            })
        });

        me.map = new ol.Map({
            // layers will be created from config in initComponent
            layers: [
                new ol.layer.Tile({
                    source: new ol.source.OSM(),
                    name: 'OpenStreetMap'
                }),
                wmsLayer
            ],
            view: new ol.View({
                center: ol.proj.fromLonLat([10.452, 51.168]),
                zoom: 6
            })
        });

        me.items = {
            xtype: 'gx_map',
            pointerRest: true,
            pointerRestInterval: 500,
            // allow a permalink
            stateful: true,
            stateId: 'gx_mapstate',
            map: me.map
        };

        me.callParent();

        // make sub components accessible as members
        me.mapCmp = me.down('gx_map');

        // create permalink provider
        me.permalinkProvider = Ext.create('GeoExt.state.PermalinkProvider');
        // set it in the state manager
        Ext.state.Manager.setProvider(me.permalinkProvider);

        if (window.location.hash !== '') {
            // try to restore center, zoom-level and rotation from the URL
            me.mapCmp.applyState(
                me.permalinkProvider.readPermalinkHash(window.location.hash)
            );
        }

        me.registerPermalinkEvents();

    },

    registerPermalinkEvents: function() {
        var me = this;

        // update permalink when visible map state changes
        me.permalinkProvider.on('statechange', function(stateProvider, stateId, state) {
            me.updatePermalink(state);
        });

        // restore the view state when navigating through the history, see
        // https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onpopstate

        window.addEventListener('popstate', function(event) {
            if (event.state === null) {
                return;
            }

            var view = me.olMap.getView();
            view.setCenter(event.state.center);
            view.setZoom(event.state.zoom);
            view.setRotation(event.state.rotation);
            view.shouldUpdatePermalink = false;
        });
    },

    updatePermalink: function(mapState) {
        var me = this;

        if (!me.shouldUpdatePermalink) {
            // do not update the URL when the view was changed in the 'popstate'
            // handler
            me.shouldUpdatePermalink = true;
            return;
        }

        var roundCoords = true;
        var hash = me.permalinkProvider.getPermalinkHash(roundCoords);

        // push the state into the window history (to navigate with browser's
        // back and forward buttons)
        window.history.pushState(mapState, 'map', hash);
    }
});
