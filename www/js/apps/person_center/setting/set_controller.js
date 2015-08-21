/**
 * Created by wangxinyan on 2014/10/22.
 */
define(['app','apps/person_center/setting/set_view'],function(CloudMAM,Views){
    var PersonSetController = Marionette.Controller.extend({
        index:function(options){

            options=options||{};
            var self = this;
            var personView = new Views.PersonSetItemView();


            CloudMAM.mainRegion.show(personView);
            personView.clientHeight();

            CloudMAM.headerRegion.empty();
            CloudMAM.footerRegion.empty();
            CloudMAM.loadingRegion.empty();
        }
    });

    return new PersonSetController();
});