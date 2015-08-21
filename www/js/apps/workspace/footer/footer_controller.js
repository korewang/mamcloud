/**
 * Created by wangxinyan on 2014/7/30.
 */
define(['app','apps/workspace/footer/footer_view','entities/workspace/footer/itemcollection'],function (CloudMAM,Views) {
    var FooterController = Marionette.Controller.extend({
        footerIndex:function(options){

            options=options||{};
            var self =this;
            var items = CloudMAM.request('workspace:footer:item');

            var footerCompositeView = new Views.FooterComView({
                collection:items
            });
//            this.listenTo(Views,'file:search',function(){
//                console.log('s');
//            });

            CloudMAM.footerRegion.show(footerCompositeView);
            self.listenTo(CloudMAM,'hide:footer',function(){//hide  footer fn
                footerCompositeView.$el.addClass('none');
            });

        }
    })
    return new FooterController();
});