
Ext.define('Geoext.demo.app.view.grid.Grid', {
    xtype: 'Geoext.demo.app.view.grid.Grid',
    extend: 'Ext.grid.Panel',

    requires: [
        'Ext.grid.filters.Filters',
        'Geoext.demo.app.view.grid.GridController',
        'Geoext.demo.app.view.grid.GridModel',

        'GeoExt.toolbar.WfsPaging',
        'GeoExt.selection.FeatureModel',
        'GeoExt.util.OGCFilter'
    ],

    controller: 'grid-grid',
    viewModel: {
        type: 'grid-grid'
    },

    plugins: 'gridfilters',

    bind: {
        store: '{districts}'
    },
    selModel: {
        type: 'featuremodel',
        mode: 'SINGLE',
        mapSelection: true,
        selectStyle: new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: '#0ff',
                width: 4
            })
        }),
        bind: {
            map: '{map}'
            //selectStyle: '{selectStyle}' // TODO can't be bound
        }
    },
    columns: {
        items: [
            {
                text: 'Cell ID',
                dataIndex: 'WARNCELLID',
                flex: 1,
                filter: {
                    type: 'list'
                }
            },
            {
                text: 'Name',
                dataIndex: 'NAME',
                flex: 2,
                filter: {
                    type: 'string'
                }
            },
            {
                text: 'Processed Time',
                dataIndex: 'PROCESSTIME',
                flex: 2
            }
        ]
    },
    dockedItems: [
        {
            xtype: 'toolbar',
            items: [{
                xtype: 'button',
                text: "Clear Filters",
                handler: function() {
                    this.up('grid').getPlugin('gridfilters').clearFilters();
                }
            }]
        },
        {
            xtype: 'gx_wfspaging_toolbar',
            displayInfo: true
        }
    ],
    listeners: {
        filterchange: 'onFilterChange',
        itemdblclick: 'onDoubleClick'
    }
});
