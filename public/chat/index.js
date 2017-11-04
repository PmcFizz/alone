/**
 * Created by Administrator on 2017/11/4.
 */
$(function () {
    var socket = io();
    let send = () => {
        let  val=$("#say").val();
        if(!val){
            return;
        }else{
            socket.emit('start', $("#say").val());
            $("#say").val('');
            return false;
        }
    };

    let addMsg = (msg) => {
        $("#message").append($("<li class='list-group-item'>").text(msg));
        window.scrollTo(0, document.body.scrollHeight);
    };

    $("#send").click(send);

    $("#say").keydown((ev) => {
        if (ev.keyCode === 13) {
            send();
        }
    });
    socket.on('start', addMsg);
});