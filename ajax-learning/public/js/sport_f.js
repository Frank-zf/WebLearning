$(function () {
    $("#load").bind("click", function () {
        var $this = $(this);
        //在本地直接load慕课网的资源是会有跨域拦截的，所以下述方式获取不了
        // $.getScript("http://www.imooc.com/data/sport_f.js",function(){

        //借助本地的代理服务器去获取目标服务器的资源
        //方式1
        $.getScript("http://localhost:3000/data/sport_f.js", function (data) {
            $this.attr("disabled", "true");
        })
    })
})