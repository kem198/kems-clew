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

    // masonry インスタンスを保持
    let msnry = null;
    if (window.Masonry) {
      msnry = new Masonry(container, {
        itemSelector: ".works-item",
        columnWidth: 216,
        gutter: 16,
        fitWidth: true,
        transitionDuration: 0,
      });
    }

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

    function addItems(isFilter) {
      const slicedData = filteredData.slice(added, added + addItemCount);
      if (!slicedData.length) {
        if (loadMoreButton) loadMoreButton.style.display = "none";
        return;
      }

      const newElems = createItems(slicedData);

      // imagesLoaded があれば待機してから Masonry を更新
      if (window.imagesLoaded) {
        imagesLoaded(container, { background: true }, function () {
          newElems.forEach(function (el) {
            el.classList.remove("is-loading");
          });
          if (msnry) msnry.appended(newElems);
          if (isFilter && msnry) msnry.layout();
          if (loadMoreButton) loadMoreButton.classList.remove("is-loading");
        });
      } else {
        // フォールバック
        newElems.forEach(function (el) {
          el.classList.remove("is-loading");
        });
        if (msnry) {
          msnry.appended(newElems);
          if (isFilter) msnry.layout();
        }
        if (loadMoreButton) loadMoreButton.classList.remove("is-loading");
      }

      // Lightbox を再初期化 (GLightbox の場合は自動で拾うが、確実に更新)
      if (lightbox && typeof lightbox.reload === "function") {
        lightbox.reload();
      }

      added += slicedData.length;

      if (loadMoreButton) {
        loadMoreButton.style.display =
          added < filteredData.length ? "" : "none";
      }
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

      // 既存アイテムを Masonry から削除
      if (msnry) {
        const items = container.querySelectorAll(".works-item");
        msnry.remove(items);
      } else {
        container.querySelectorAll(".works-item").forEach(function (el) {
          el.remove();
        });
      }

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
        loadMoreButton.removeEventListener("click", addItems);
        loadMoreButton.addEventListener("click", function () {
          addItems(false);
        });
      }

      if (filterForm) {
        // 単純な委譲: ラジオ変更を監視
        filterForm.removeEventListener("change", onFilterChange);
        filterForm.addEventListener("change", onFilterChange);
      }
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
