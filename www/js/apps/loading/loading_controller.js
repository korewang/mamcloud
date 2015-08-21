/**
 * Created by wangxinyan on 2014/8/28.
 */
define(["app","apps/loading/loading_view"],function (CloudMAM,LoadingView) {
    var LoadingController = Marionette.Controller.extend({
        loadingData: function (options) {
            options = options||{};
            var self = this;
            var loadingView = new LoadingView.loadingItemView();
            CloudMAM.loadingRegion.show(loadingView);
            loadingView.resetLoadPosition();//重新计算位置
        }
    });
    return new LoadingController();
});