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
      lightbox = GLightbox({ selector: ".works-item a" });
    }

    function createItems(slicedData) {
      const beforeCount = container.querySelectorAll(".works-item").length;
      slicedData.forEach(function (item) {
        const href = item.images && item.images.large ? item.images.large : "#";
        const thumb = item.images && item.images.thumb ? item.images.thumb : "";
        const title = item.title || "";
        const date = item.date || "";
        const html = `
          <li class="works-item is-loading">
            <a href="${href}">
              <img src="${thumb}" alt="${title}">
              <span class="caption">
                <span class="inner">
                  <b class="title">${title}</b>
                  <time class="date" datetime="${date}">${date}</time>
                </span>
              </span>
            </a>
          </li>`;
        container.insertAdjacentHTML("beforeend", html);
      });

      const allItems = container.querySelectorAll(".works-item");
      const newItems = Array.prototype.slice.call(allItems, beforeCount);
      return newItems;
    }

    function resizeItem(el) {
      // compute and set grid row span based on element height
      const style = window.getComputedStyle(container);
      const rowHeight = parseInt(style.getPropertyValue("grid-auto-rows")) || 8;
      const rowGap =
        parseInt(style.getPropertyValue("gap")) ||
        parseInt(style.getPropertyValue("grid-row-gap")) ||
        16;
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

    let resizeTimer = null;
    function resizeAllItems() {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        container.querySelectorAll(".works-item").forEach(function (el) {
          resizeItem(el);
        });
      }, 150);
    }

    function addItems(isFilter) {
      const slicedData = filteredData.slice(added, added + addItemCount);
      if (!slicedData.length) {
        if (loadMoreButton) loadMoreButton.style.display = "none";
        return;
      }

      const newElems = createItems(slicedData);

      // CSS カラムを使うため Masonry スクリプトは不要。
      // 画像の読み込みが完了したら個別に .is-loading を外して表示する。
      newElems.forEach(function (el) {
        const img = el.querySelector("img");
        const show = function () {
          el.classList.remove("is-loading");
          // set grid row span when image is ready
          resizeItem(el);
        };
        if (img) {
          if (img.complete) {
            show();
          } else {
            img.addEventListener("load", show, { once: true });
            img.addEventListener("error", show, { once: true });
          }
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

    function onLoadMoreClick() {
      addItems(false);
    }

    function appendTags(data) {
      const multiTags = [];
      data.forEach(function (d) {
        if (d.tags) multiTags.push(d.tags);
      });
      const setTags = new Set(multiTags.flat());
      tags = Array.from(setTags).sort();

      if (!worksTags) return;
      tags.forEach(function (t) {
        const li = document.createElement("li");
        li.className = "tag";
        li.innerHTML = `<input type="radio" name="filter" id="${t}" value="${t}"><label for="${t}">#${t}</label>`;
        worksTags.appendChild(li);
      });
    }

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

    function onFilterChange(e) {
      const target = e.target;
      if (!target) return;
      if (target.matches('input[type="radio"][name="filter"]')) {
        filterItems(target.value);
      }
    }

    // JSON を取得して初期化
    fetch("/assets/works/content.json")
      .then(function (res) {
        if (!res.ok) throw new Error("Failed to load JSON");
        return res.json();
      })
      .then(function (data) {
        appendTags(data);
        initWorks(data);
      })
      .catch(function (err) {
        // エラー時のフォールバック: コンソール出力
        console.error("works.json load error:", err);
      });
  });
});
