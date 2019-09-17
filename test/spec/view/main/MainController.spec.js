describe('GeoExt.demo.app.view.main.MainController', function () {
    describe('Basics', function() {
        it('is defined', function () {
            expect(GeoExt.demo.app.view.main.MainController).not.to.be(undefined);
        });

        it('can be instantiated', function() {
            var inst = Ext.create('GeoExt.demo.app.view.main.MainController', {});
            expect(inst).to.be.a(GeoExt.demo.app.view.main.MainController);
        });
    });
});
