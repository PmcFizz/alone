/**
 * Created by Administrator on 2017/11/4.
 */
(function () {
    function startGetData() {
        var targetHref = $("#").val();
        var selector = $("#").val();
        $.ajax({
            type: "post",
            url: '',
            data: {},
            dataType: "json",
            success: function (res) {

            }

        })
    };
    $("#start").click(startGetData)
})()