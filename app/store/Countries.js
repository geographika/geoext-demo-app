Ext.define('Geoext.demo.app.store.Countries', {
    extend: 'GeoExt.data.store.WfsFeatures',

    // filter the underlying WFS as well as the store https://geoext.github.io/geoext3/master/docs/#!/api/GeoExt.data.store.Features

    passThroughFilter: false, // this has to be false or the grid will have duplicate features
    // https://github.com/geoext/geoext3/blob/8333ede18220c3a18f964447d968c12f8b4882dd/src/data/store/WfsFeatures.js#L319 and
    // https://github.com/geoext/geoext3/blob/8333ede18220c3a18f964447d968c12f8b4882dd/src/data/store/WfsFeatures.js#L324
    remoteFilter: true,
    alias: 'store.countries',
    model: 'GeoExt.data.model.Feature',
    createLayer: true,
    url: 'https://maps.dwd.de/geoserver/dwd/ows?',
    version: '2.0.0',
    cacheFeatureCount: false,
    typeName: 'dwd:Warngebiete_Kreise',
    outputFormat: 'application/json',
    sorters: [{
        property: "WARNCELLID",
        direction: "ASC"
    }],
    startIndex: 0,
    count: 10,
    format: new ol.format.GeoJSON({
        featureProjection: 'EPSG:3857'
    }),
    style: new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: 'rgba(255, 255, 0, 1.0)',
            width: 2
        })
    })
});
