/**
 * Created by wangxinyan on 2014/8/3.
 */
define(['app','apps/select/footer/footer_view','entities/select/footer/itemcollection'],function (CloudMAM,Views) {
    var FooterController = Marionette.Controller.extend({
        footerIndex:function(options){
            options=options||{};
            var self =this;
            var items = CloudMAM.request('select:footer:item');
            var footerCompositeView = new Views.FooterComView({
                collection:items
            });
            CloudMAM.footerRegion.show(footerCompositeView);
        }
    })
    return new FooterController();
});