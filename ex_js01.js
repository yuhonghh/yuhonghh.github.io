function myfunction(){
    var str = $("#input").val();
    $("#output").text(str);
}

$("#test").bind('click',myfunction);

// 新增牌背影像
function addPokerBackImg(index) {
    // 產生一張圖片
    var $img = $('<img>');

    // 設定 src 屬性
    $img.attr('src', './IMG/IMG_back.JPG');
    // 設定 class 樣式
    $img.attr('class', 'img-thumbnail');

    // 記錄 img 的編號
    $img.attr('data-index', index);

    // 將 img 插入至 id=output 內
    $img.appendTo('#output');


    // 將 img 的 click 事件綁定
    $img.bind('click', function() {
        // 取出 data-index 的屬性
        var index = $(this).attr('data-index');
        console.log('按到第' + index + '張');


        $img.attr('src', './IMG/IMG_back' + index + '.JPG');
    });

}

function Run() {
    console.log('run...');

    $('img').remove();

    var pokers = [1, 2, 3, 4];

    for (var i = 0; i < 4; i++) {
        addPokerBackImg(pokers[i]);
    }

}

$('#run').bind('click', Run);