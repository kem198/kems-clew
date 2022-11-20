$(function () {

    /* ==================================================
     * Works Masonry レイアウト
     * ================================================== */
    $('#works').each(function () {

        // 変数・配列の宣言
        var $container = $(this),
            $loadMoreButton = $('#load-more'), // 追加ボタン
            $filter = $('#works-filter'),     // フィルタリングのフォーム
            addItemCount = 12,                // 一度に表示するアイテム数
            added = 0,                        // 表示済みのアイテム数
            allData = [],                     // すべての JSON データ
            tags = [],                        // JSON から取得したタグの配列
            filteredData = [];                // フィルタリングされた JSON データ

        // Home の場合は3つのみを表示するため addItemCount へ 3 を再代入する
        if ($('#home').length) {
            var addItemCount = 3;
        }

        // オプションを設定して Masonry を準備
        $container.masonry({
            itemSelector: '.works-item', // 要素のセレクタ
            columnWidth: 216,            // カラムの幅
            gutter: 16,                  // カラム間の左右の隙間
            fitWidth: 'true',            // 親の幅を自動調整して中央揃え
            transitionDuration: 'none'   // デフォルトの transition を削除（CSS と競合するため）
        });

        // アイテムを生成しドキュメントに挿入する関数
        function addItems (filter) {
            var elements = [],
                // 追加するデータの配列
                slicedData = filteredData.slice(added, added + addItemCount);

            // slicedData の要素ごとに DOM 要素を生成
            $.each(slicedData, function (i, item) {
                var itemHTML =
                    '<li class="works-item is-loading">' +
                        '<a href="' + item.images.large + '">' +
                            '<img src="' + item.images.thumb + '" alt="' + item.title + '">' +
                            '<span class="caption">' +
                                '<span class="inner">' +
                                    '<b class="title">' + item.title + '</b>' +
                                    '<time class="date" datatime="' + item.date + '">' +
                                        item.date +
                                    '</time>' +
                                '</span>' +
                            '</span>' +
                        '</a>' +
                    '</li>';
                elements.push($(itemHTML).get(0));
            });

            // Home の場合は配列の最後に more ボタン を挿入する
            if ($('#home').length) {
                var itemMore =
                    '<div id="home-more" class="works-item">' +
                        '<a href="./works.html">' +
                            '<p>more <i class="fa-solid fa-caret-right"></i></p>' +
                        '</a>' +
                    '</div>';
                elements.push($(itemMore).get(0));
            }

            // DOM 要素の配列をコンテナに挿入し Masonry レイアウトを実行
            $container
                .append(elements)
                .imagesLoaded(function () {
                    $('#load-more').removeClass('is-loading'); // ロードボタンを表示する
                    $(elements).removeClass('is-loading');     // DOM 要素を表示する
                    $container.masonry('appended', elements);  // masonry へ DOM 要素の配列を渡して実行

                    // フィルタリング時は再配置
                    if (filter) {
                        $container.masonry();
                    }
                });

            // アイテムのリンクへ Colorbox を設定
            $container.find('a').not('#home-more a').colorbox({
                maxWidth: '90%',
                maxHeight: '90%',
                opacity: '0.8',     // 背景の透明度
                returnFocus: false, // モーダルを閉じたときにそのモーダルのトリガーとなったリンクにフォーカスを戻さない  True の場合 iOS Safari だと青い選択が表示されるため
                reposition: false,  // ウインドウがリサイズされたときにモーダルの位置を変更しない True だと iOS で拡大時にクラッシュするため
                title: function () {
                    return $(this).children('.inner').html();
                }
            })

            // Colorbpx の画像をクリックしても閉じる
            $('#colorbox').on('click', function () {
                $.colorbox.close();
            })

            // 追加済みアイテム数の更新
            added += slicedData.length;

            // JSON データがすべて追加し終わっていたら追加ボタンを消す
            if (added < filteredData.length) {
                $loadMoreButton.show();
            } else {
                $loadMoreButton.hide();
            }
        }

        // タグを JSON から取得してサイドメニューへ表示する関数
        function appendTags (data) {

            // 取得した JSON 内のタグ情報を二次元配列として格納
            var multiTags = [];
            for (var i in data) {
                if (data[i].tags) {
                    multiTags.push(data[i].tags);
                }
            }

            // 一次元に変換したタグ配列から重複を排除した Set オブジェクトを作成
            var setTags = new Set(multiTags.flat());
            // console.log(setTags);

            // Set オブジェクトを昇順の配列として代入
            tags = Array.from(setTags).sort();
            // console.log(tags);

            // タグ配列の要素ごとに DOM 要素を生成し HTML へ挿入
            $.each(tags, function (i, item) {
                var tagHTML =
                    '<label for=' + item + '>' +
                        '<li class="tag">' +
                            '<input type="radio" name="filter" id="' + item + '" value="' + item + '">' +
                            item +
                        '</li>' +
                    '</label>';
                // console.log(tagHTML);
                $('#tags').append(tagHTML);
            });
        }

        // アイテムをフィルタリングする関数
        function filterItems () {
            var key = $(this).val(), // チェックされたラジオボタンの value

                // 追加済みの Masonry アイテム
                masonryItems = $container.masonry('getItemElements');

            // Masonry アイテムを削除
            $container.masonry('remove', masonryItems);

            // フィルタリング済みアイテムのデータと追加済みアイテム数をリセット
            filteredData = [];
            added = 0;

            if (key === 'All') {
                // All がチェックされた場合、すべての JSON データを格納
                filteredData = allData;

                // works-h2 を非表示
                $('#works-h2').removeClass('filter-selected');

            } else if (["Developments", "Illustrations", "Others"].includes(key)) {
                // All 以外のカテゴリの場合、キーと一致するデータを抽出
                filteredData = $.grep(allData, function (item) {
                    return item.category === key;
                });

                // works-h2 を表示
                $('#works-h2').text(key).addClass('filter-selected');

            } else {
                // All, カテゴリ以外の場合、キーを item.tags に含むデータを抽出
                filteredData = $.grep(allData, function (item) {
                    return item.tags.includes(key);
                });

                // works-h2 を表示
                $('#works-h2').text('#' + key).addClass('filter-selected');
            }

            // アイテムを追加
            addItems(true);
        }

        // Works ギャラリーを初期化する関数
        function initWorks (data) {

            // 取得した JSON データを格納
            allData = data;

            // 新しい順（降順）で表示するため配列を逆順にする
            allData.reverse();

            // 最初の状態ではフィルタリングせずそのまま全データを渡す
            filteredData = allData;

            // 最初のアイテム群を表示
            addItems();

            // 追加ボタンがクリックされたら追加で表示
            $loadMoreButton.on('click', addItems);

            // フィルターのラジオボタンが変更されたらフィルタリングを実行
            $filter.on('change', 'input[type="radio"]', filterItems);

            // フィルターのタグがクリックされたら選択状態にする
            $('label').on('click', function () {
                var $selectedTag = $(this).children('.tag')
                $selectedTag.addClass('tag-selected');
                $('.tag').not($selectedTag).removeClass('tag-selected'); // 選択されたタグ以外は非選択状態にする
            });
        }

        // JSON を取得し appendTags 関数を実行
        $.getJSON('./data/content.json', appendTags);

        // JSON を取得し initWorks 関数を実行
        $.getJSON('./data/content.json', initWorks);
    });

});
