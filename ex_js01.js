function myfunction(){
    var str = $("#input").val();
    $("#output").text(str);
}

$("#test").bind('click',myfunction);

// 新增牌背影像
function addcard(index) {
    // 產生一張圖片
    var $card = $('<img>');

    // 設定 src 屬性
    $card.attr('src', './IMG/IMG_card0.JPG');
    // 設定 class 樣式
    $card.attr('class', 'img-thumbnail');

    // 記錄 img 的編號
    $card.attr('data-index', index);

    // 將 img 插入至 id=output 內
    $card.appendTo('#output');


    // 將 img 的 click 事件綁定
    $card.bind('click', function() {
        // 取出 data-index 的屬性
        var index = $(this).attr('data-index');
        console.log('按到第' + index + '張');


        $card.attr('src', './IMG/IMG_card' + index + '.JPG');
    });

}

function Run() {
    console.log('run...');

    $('card').remove();

    var card = [1, 2, 3, 4];

    for (var i = 0; i < 4; i++) {
        addcard(card[i]);
    }

}

$('#run').bind('click', Run);