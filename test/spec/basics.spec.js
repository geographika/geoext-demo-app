describe('Basic requirements of GeoExt.demo.app', function() {
    describe('Libraries are loaded & available in testsuite', function() {
        describe('ExtJS', function() {
            it('is defined', function() {
                expect(Ext).not.to.be(undefined);
            });
        });
        describe('OpenLayers', function() {
            it('is defined', function() {
                expect(ol).not.to.be(undefined);
            });
        });
        describe('GeoExt', function () {
            it('is defined', function () {
                expect(GeoExt).not.to.be(undefined);
            });
        });
    });
    describe('"GeoExt.demo.app" app is initialized', function() {
        describe('"GeoExt.demo.app" Namespace', function() {
            it('is defined', function() {
                expect(GeoExt.demo.app).not.to.be(undefined);
            });
        });
    });
});
