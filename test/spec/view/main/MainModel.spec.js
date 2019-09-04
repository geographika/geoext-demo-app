describe('GeoExt.demo.app.view.main.MainModel', function () {
    describe('Basics', function() {
        it('is defined', function () {
            expect(GeoExt.demo.app.view.main.MainModel).not.to.be(undefined);
        });

        it('can be instantiated', function() {
            var inst = GeoExt.demo.app.view.main.MainModel.create();
            expect(inst).to.be.a(GeoExt.demo.app.view.main.MainModel);
        });
    });
});
