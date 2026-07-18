document.addEventListener("DOMContentLoaded", function () {
  /* ==================================================
   * Works Masonry レイアウト
   * ================================================== */
  const containers = document.querySelectorAll(".works-container");

  containers.forEach(function (container) {
    // スコープ化された要素参照を参照する
    // ID が子要素でなくルートにある場合は document 側を参照する
    const loadMoreButton =
      container.querySelector("#load-more") ||
      document.getElementById("load-more");
    const filterForm =
      container.querySelector("#works-form") ||
      document.getElementById("works-form");
    const worksTags =
      container.querySelector("#works-tags") ||
      document.getElementById("works-tags");

    let addItemCount = document.getElementById("home") ? 3 : 20;
    let added = 0;
    let allData = [];
    let tags = [];
    let filteredData = [];

    // GLightbox を初期化する
    let lightbox = null;
    if (window.GLightbox) {
      lightbox = GLightbox({
        selector: ".works-item a",
        openEffect: "fade",
        closeEffect: "none",
        slideEffect: "slide",
      });
    }

    /**
     * 指定されたデータスライスから DOM 要素を生成し、
     * フラグメントと作成した要素の配列を返す
     * @param { Array < Object > } slicedData - ワーク項目の配列
     * @returns { { fragment: DocumentFragment, newItems: HTMLElement[] } }
     */
    function createItems(slicedData) {
      const fragment = document.createDocumentFragment();
      const newItems = [];

      slicedData.forEach(function (item) {
        const href = item.images && item.images.large ? item.images.large : "#";
        const thumb = item.images && item.images.thumb ? item.images.thumb : "";
        const title = item.title || "";
        const date = item.date || "";

        const li = document.createElement("li");
        li.className = "works-item is-loading";

        const a = document.createElement("a");
        a.href = href;

        const imgEl = document.createElement("img");
        imgEl.src = thumb;
        imgEl.alt = title;

        const spanCaption = document.createElement("span");
        spanCaption.className = "caption";

        const spanInner = document.createElement("span");
        spanInner.className = "inner";

        const bTitle = document.createElement("b");
        bTitle.className = "title";
        bTitle.textContent = title;

        const timeEl = document.createElement("time");
        timeEl.className = "date";
        timeEl.setAttribute("datetime", date);
        timeEl.textContent = date;

        spanInner.appendChild(bTitle);
        spanInner.appendChild(timeEl);
        spanCaption.appendChild(spanInner);

        a.appendChild(imgEl);
        a.appendChild(spanCaption);
        li.appendChild(a);

        fragment.appendChild(li);
        newItems.push(li);
      });

      return { fragment: fragment, newItems: newItems };
    }

    /**
     * 要素の高さを計算し、CSS グリッドの行スパンを設定する
     * @param { HTMLElement } el - 対象の要素
     */
    function resizeItem(el) {
      // compute and set grid row span based on element height
      // use cached rowHeight/rowGap when available to avoid repeated style reads
      const rowHeight =
        typeof cachedRowHeight === "number" ? cachedRowHeight : 8;
      const rowGap = typeof cachedRowGap === "number" ? cachedRowGap : 16;
      const img = el.querySelector("img");
      const caption = el.querySelector(".caption");
      const imgHeight = img
        ? img.getBoundingClientRect().height
        : el.getBoundingClientRect().height;
      const captionHeight = caption
        ? caption.getBoundingClientRect().height
        : 0;
      const totalHeight = imgHeight + captionHeight;
      const rowSpan = Math.max(
        1,
        Math.ceil((totalHeight + rowGap) / (rowHeight + rowGap)),
      );
      el.style.gridRowEnd = "span " + rowSpan;
    }

    // cached metrics for grid calculations to reduce getComputedStyle calls
    let cachedRowHeight = null;
    let cachedRowGap = null;

    /**
     * コンテナの CSS メトリクスを読み取り、行高さとギャップ値をキャッシュする
     */
    function updateRowMetrics() {
      const style = window.getComputedStyle(container);
      const rh = parseFloat(style.getPropertyValue("grid-auto-rows"));
      const gapVal =
        style.getPropertyValue("gap") || style.getPropertyValue("grid-row-gap");
      const rg = parseFloat(gapVal);
      cachedRowHeight = Number.isFinite(rh) && rh > 0 ? rh : 8;
      cachedRowGap = Number.isFinite(rg) ? rg : 16;
    }

    let resizeTimer = null;
    /**
     * コンテナ内の全アイテムをデバウンス付きで再計算する
     */
    function resizeAllItems() {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        // refresh cached metrics once per batch
        updateRowMetrics();
        container.querySelectorAll(".works-item").forEach(function (el) {
          resizeItem(el);
        });
      }, 150);
    }

    /**
     * 画像が準備できるまで待機する ( decode() が利用可能な場合はそれを優先する ) 。
     * @param { HTMLImageElement } img - 画像要素
     * @returns { Promise < void > }
     */
    function waitForImage(img) {
      return new Promise(function (resolve) {
        if (!img) return resolve();
        if (img.complete) return resolve();
        if (typeof img.decode === "function") {
          img
            .decode()
            .then(function () {
              resolve();
            })
            .catch(function () {
              // fallback to load/error events
              const onFinish = function () {
                resolve();
              };
              img.addEventListener("load", onFinish, { once: true });
              img.addEventListener("error", onFinish, { once: true });
            });
        } else {
          const onFinish = function () {
            resolve();
          };
          img.addEventListener("load", onFinish, { once: true });
          img.addEventListener("error", onFinish, { once: true });
        }
      });
    }

    /**
     * 次にレンダリングするデータのスライスを返す
     * @returns { Array < Object > } sliced data
     */
    function getNextSlice() {
      return filteredData.slice(added, added + addItemCount);
    }

    /**
     * 指定したデータスライスを描画する :
     * 要素生成、追加、画像処理、レイアウト更新、ライトボックス再初期化、UI 状態更新を行う
     * @param { Array < Object > } slicedData - 描画対象のデータ配列
     */
    function renderItems(slicedData) {
      const created = createItems(slicedData);
      container.appendChild(created.fragment);

      const elems = created.newItems;

      elems.forEach(function (el) {
        const img = el.querySelector("img");
        var show = function () {
          el.classList.remove("is-loading");
          // set grid row span when image is ready
          resizeItem(el);
        };

        if (img) {
          waitForImage(img).then(show);
        } else {
          show();
        }
      });

      // ensure all items recalculated after a short delay
      resizeAllItems();
      if (loadMoreButton) loadMoreButton.classList.remove("is-loading");

      // Lightbox を再初期化 (GLightbox の API に合わせて呼び出す)
      if (lightbox) {
        if (typeof lightbox.reload === "function") {
          lightbox.reload();
        } else if (typeof lightbox.refresh === "function") {
          lightbox.refresh();
        }
      }

      added += slicedData.length;

      if (loadMoreButton) {
        loadMoreButton.style.display =
          added < filteredData.length ? "" : "none";
      }
    }

    /**
     * 次のバッチを追加するオーケストレータ ( 軽量なラッパー ) 。
     * @param { boolean } isFilter - フィルタ変更による呼び出しかどうか
     */
    function addItems(isFilter) {
      const slicedData = getNextSlice();
      if (!slicedData.length) {
        if (loadMoreButton) loadMoreButton.style.display = "none";
        return;
      }
      renderItems(slicedData);
    }

    /**
     * 「 load more 」ボタンのクリックハンドラ。
     * @returns { void }
     */
    function onLoadMoreClick() {
      addItems(false);
    }

    function appendTags(data) {
      /**
       * データからユニークなタグを抽出し、安全な DOM 入力要素を構築する
       * @param { Array < Object > } data
       */
      const multiTags = [];
      data.forEach(function (d) {
        if (d.tags) multiTags.push(d.tags);
      });
      const setTags = new Set(multiTags.flat());
      tags = Array.from(setTags).sort();

      if (!worksTags) return;
      // clear existing
      while (worksTags.firstChild) worksTags.removeChild(worksTags.firstChild);

      function sanitizeId(str) {
        return (
          "tag-" +
          String(str)
            .toLowerCase()
            .replace(/[^a-z0-9_-]+/g, "-")
        ).replace(/^-+|-+$/g, "");
      }

      tags.forEach(function (t) {
        const li = document.createElement("li");
        li.className = "tag";

        const id = sanitizeId(t);
        const input = document.createElement("input");
        input.type = "radio";
        input.name = "filter";
        input.id = id;
        input.value = t;

        const label = document.createElement("label");
        label.htmlFor = id;
        label.textContent = "#" + t;

        li.appendChild(input);
        li.appendChild(label);
        worksTags.appendChild(li);
      });
    }

    /**
     * カテゴリまたはタグでフィルタを適用し、現在のアイテムをクリアして再描画する
     * @param { string } key - フィルタキー ( "All" 、カテゴリ名またはタグ )
     */
    function filterItems(key) {
      // スクロールトップ
      window.scrollTo({ top: 0, behavior: "auto" });

      // 既存アイテムを削除
      container.querySelectorAll(".works-item").forEach(function (el) {
        el.remove();
      });

      filteredData = [];
      added = 0;

      if (key === "All") {
        filteredData = allData;
        document.querySelectorAll(".works-h2").forEach(function (h) {
          h.classList.remove("filter-selected");
        });
      } else if (["Developments", "Illustrations", "Others"].includes(key)) {
        filteredData = allData.filter(function (item) {
          return item.category === key;
        });
        document.querySelectorAll(".works-h2").forEach(function (h) {
          h.textContent = key;
          h.classList.add("filter-selected");
        });
      } else {
        filteredData = allData.filter(function (item) {
          return item.tags && item.tags.includes(key);
        });
        document.querySelectorAll(".works-h2").forEach(function (h) {
          h.innerHTML = '<i class="fa-solid fa-hashtag"></i>' + key;
          h.classList.add("filter-selected");
        });
      }

      addItems(true);
    }

    /**
     * Works の状態を初期化し、イベントリスナをバインドする
     * @param { Array < Object > } data - JSON から読み込んだワーク項目の配列
     */
    function initWorks(data) {
      allData = data.slice().reverse();
      filteredData = allData;
      addItems();

      if (loadMoreButton) {
        loadMoreButton.removeEventListener("click", onLoadMoreClick);
        loadMoreButton.addEventListener("click", onLoadMoreClick);
      }

      if (filterForm) {
        // 単純な委譲: ラジオ変更を監視
        filterForm.removeEventListener("change", onFilterChange);
        filterForm.addEventListener("change", onFilterChange);
      }

      // ウィンドウリサイズ時に再計算
      window.removeEventListener("resize", resizeAllItems);
      window.addEventListener("resize", resizeAllItems);
    }

    /**
     * フィルタ用ラジオ入力に対する委譲された change ハンドラ
     * @param { Event } e
     */
    function onFilterChange(e) {
      const target = e.target;
      if (!target) return;
      if (target.matches('input[type="radio"][name="filter"]')) {
        filterItems(target.value);
      }
    }

    /**
     * JSON を読み込み、Works UI を初期化する。fetch が失敗した場合は
     * コンテナ内にインラインのエラーメッセージを表示する
     * @returns { Promise < void > }
     */
    function loadData() {
      return fetch("/assets/works/content.json")
        .then(function (res) {
          if (!res.ok) throw new Error("Failed to load JSON");
          return res.json();
        })
        .then(function (data) {
          appendTags(data);
          initWorks(data);
        })
        .catch(function (err) {
          // エラー時はコンソールへ出力する
          console.error("works.json load error:", err);
        });
    }

    // JSON を取得して初期化
    loadData();
  });
});
