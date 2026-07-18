$(function () {
  /* ==================================================
   * Works Masonry レイアウト
   * ================================================== */
  $(".works-container").each(function () {
    // 変数・配列の宣言
    const $container = $(this);
    const $loadMoreButton = $("#load-more"); // 追加ボタン
    const $filter = $("#works-form"); // フィルタリングのフォーム
    let addItemCount = 20; // 一度に表示するアイテム数
    let added = 0; // 表示済みのアイテム数
    let allData = []; // すべての JSON データ
    let tags = []; // JSON から取得したタグの配列
    let filteredData = []; // フィルタリングされた JSON データ

    // Home の場合は3つのみを表示するため addItemCount を変更
    if ($("#home").length) {
      addItemCount = 3;
    }

    // オプションを設定して Masonry を準備
    $container.masonry({
      itemSelector: ".works-item", // 要素のセレクタ
      columnWidth: 216, // カラムの幅
      gutter: 16, // カラム間の左右の隙間
      fitWidth: true, // 親の幅を自動調整して中央揃え
      transitionDuration: "none", // デフォルトの transition を削除（CSS と競合するため）
    });

    // Colorbox の共通設定（複数回バインドされないよう外側で一度だけ設定）
    $container.on("click", "a", function () {
      // noop: colorbox は要素単位で初期化するためここでは何もしない
    });

    // Colorbox の画像をクリックしても閉じる（グローバルで一度だけ）
    $("#colorbox")
      .off("click")
      .on("click", function () {
        $.colorbox.close();
      });

    // アイテムを生成しドキュメントに挿入する関数
    function addItems(isFilter) {
      const elements = [];
      const slicedData = filteredData.slice(added, added + addItemCount);

      // slicedData の要素ごとに DOM 要素を生成
      $.each(slicedData, function (i, item) {
        const itemHTML =
          '<li class="works-item is-loading">' +
          '<a href="' +
          item.images.large +
          '">' +
          '<img src="' +
          item.images.thumb +
          '" alt="' +
          item.title +
          '">' +
          '<span class="caption">' +
          '<span class="inner">' +
          '<b class="title">' +
          item.title +
          "</b>" +
          '<time class="date" datetime="' +
          item.date +
          '">' +
          item.date +
          "</time>" +
          "</span>" +
          "</span>" +
          "</a>" +
          "</li>";
        elements.push($(itemHTML).get(0));
      });

      if (elements.length === 0) {
        $loadMoreButton.hide();
        return;
      }

      // DOM 要素の配列をコンテナに挿入
      $container.append(elements);

      // 画像読み込み後に Masonry レイアウトを更新
      $container.imagesLoaded(function () {
        $loadMoreButton.removeClass("is-loading");
        $(elements).removeClass("is-loading");
        $container.masonry("appended", elements);

        // フィルタリング時は再配置
        if (isFilter) {
          $container.masonry();
        }
      });

      // 追加した要素のリンクへ Colorbox を設定（既存要素に再設定しない）
      $(elements)
        .find("a")
        .not("#home-more a")
        .colorbox({
          maxWidth: "100%",
          maxHeight: "100%",
          opacity: "0.75", // 背景の透明度
          returnFocus: false, // モーダルを閉じたときにフォーカスを戻さない
          reposition: false, // リサイズ時に位置変更しない
          title: function () {
            return $(this).find(".inner").html();
          },
        });

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
    function appendTags(data) {
      // 取得した JSON 内のタグ情報を二次元配列として格納
      const multiTags = [];
      for (let i in data) {
        if (data[i].tags) {
          multiTags.push(data[i].tags);
        }
      }

      // 一次元に変換したタグ配列から重複を排除した Set オブジェクトを作成
      const setTags = new Set(multiTags.flat());
      tags = Array.from(setTags).sort();

      // タグ配列の要素ごとに DOM 要素を生成し HTML へ挿入
      $.each(tags, function (i, item) {
        const tagHTML =
          '<li class="tag">' +
          '<input type="radio" name="filter" id="' +
          item +
          '" value="' +
          item +
          '">' +
          '<label for="' +
          item +
          '">#' +
          item +
          "</label>" +
          "</li>";
        $("#works-tags").append(tagHTML);
      });
    }

    // アイテムをフィルタリングする関数
    function filterItems() {
      // まずトップへ戻る
      window.scrollTo({ top: 0, behavior: "auto" });

      const key = $(this).val(); // チェックされたラジオボタンの value

      // 追加済みの Masonry アイテムを取得して削除
      const masonryItems = $container.masonry("getItemElements");
      $container.masonry("remove", masonryItems);

      // フィルタリング済みアイテムのデータと追加済みアイテム数をリセット
      filteredData = [];
      added = 0;

      if (key === "All") {
        // All がチェックされた場合、すべての JSON データを格納
        filteredData = allData;
        $(".works-h2").removeClass("filter-selected");
      } else if (["Developments", "Illustrations", "Others"].includes(key)) {
        // カテゴリの場合
        filteredData = $.grep(allData, function (item) {
          return item.category === key;
        });
        $(".works-h2").text(key).addClass("filter-selected");
      } else {
        // タグによるフィルタ
        filteredData = $.grep(allData, function (item) {
          return item.tags && item.tags.includes(key);
        });
        $(".works-h2")
          .html('<i class="fa-solid fa-hashtag"></i>' + key)
          .addClass("filter-selected");
      }

      // アイテムを追加
      addItems(true);
    }

    // Works ギャラリーを初期化する関数
    function initWorks(data) {
      // 取得した JSON データを格納
      allData = data.slice();

      // 新しい順（降順）で表示するため配列を逆順にする
      allData.reverse();

      // 最初の状態ではフィルタリングせずそのまま全データを渡す
      filteredData = allData;

      // 最初のアイテム群を表示
      addItems();

      // 追加ボタンがクリックされたら追加で表示
      $loadMoreButton.off("click").on("click", function () {
        addItems();
      });

      // フィルターのラジオボタンが変更されたらフィルタリングを実行
      $filter.off("change").on("change", 'input[type="radio"]', filterItems);
    }

    // JSON を取得しタグ表示と初期化を実行
    $.getJSON("/assets/works/content.json").done(function (data) {
      appendTags(data);
      initWorks(data);
    });
  });
});
