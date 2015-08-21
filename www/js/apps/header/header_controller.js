/**
 * Created by wangxinyan on 2014/7/30.
 */
define(['app','apps/header/header_view','jquery'],function (CloudMAM,Views) {
    var headerController = Marionette.Controller.extend({
        headerIndex:function(options){
            options=options||{};
            var self = this;
            var viewRegionHead = new CloudMAM.HeaderApp.Views.headerView();
            CloudMAM.headerRegion.show(viewRegionHead);
            self.listenTo(CloudMAM,"dropmenu:dropdown",function(){
                $(document).ready(function(){
                    $(document).click(function(event){
                        var $target = $(event.target);
                        if ( $target.is($(".pro")) ) {
                            $(".pro .dropdown-menu").toggleClass("dropset");
                        }else{
                            $(".pro .dropdown-menu").removeClass("dropset");
                        }
                    });
                });

            })
        }
    });
    return new headerController();
});