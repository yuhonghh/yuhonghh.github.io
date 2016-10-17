function myfunction(){
    var str = $("#input").val();
    $("#output").text(str);
}

$("#test").bind('click',myfunction);