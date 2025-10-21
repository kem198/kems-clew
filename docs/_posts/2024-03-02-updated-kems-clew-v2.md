---
layout: post
title: "KeM's Clew (現: アリアドネの糸) をアップグレードしました"
description: ""
preview: ""
category: 情報技術
tags:
  - misc
  - jekyll
  - javascript
date: 2024-03-02
lastmod: 2025-10-22
---

表題のとおり、KeM's Clew (現: アリアドネの糸) をアップグレードしました。v2 系としています。

- [Release v2.0.0 · kem198/kems-clew.net](https://github.com/kem198/kems-clew.net/releases/tag/v2.0.0)

経緯と更新内容について紹介します！

## 経緯

私生活の状況が色々と変わったことがきっかけです。

それに先立ち、掲載情報を手軽に活用したり、静的サイト運用周りの技術を楽しく試せる場にしたいと考えていました。そのためには、まず既存の「とりあえず動いたのでヨシ！」なコード群を整理するのが前提になるというもので……。

そんなわけで、KeM's Clew のサイト構成をイチから見直すことにしました。

## 内部処理を刷新

> - Minima をベースとした構成へ刷新。
>     - `Gemfile` , `Gemfile.lock` など Ruby 関連ファイルの追加。
>     - 反映するスタイルシートを `.css` から `.scss` へ刷新。
>     - 各コンポーネントの冗長構成を見直し・切り分け。

まずはこのあたり。

主に [GitHub Pages の公式情報](https://docs.github.com/ja/pages/setting-up-a-github-pages-site-with-jekyll/creating-a-github-pages-site-with-jekyll) と [Minima](https://github.com/jekyll/minima) テーマの構成を参考にして、各コンポーネントの切り分けや構成の見直しを諸々対応しています。

具体的な技術情報は次の内容をご参考ください。

- [About > 使用している技術・素材](https://clew.kem198.net/about/#使用している技術素材)
- [kem198/kems-clew.net > 2.3. (v2.0.0 ～) minima テーマへ切り替え](https://github.com/kem198/kems-clew.net?tab=readme-ov-file#23-v200--minima-%E3%83%86%E3%83%BC%E3%83%9E%E3%81%B8%E5%88%87%E3%82%8A%E6%9B%BF%E3%81%88)

Jekyll の Liquid 構文や Sass など、改めて触れる機会になってよかった。

## サイドメニューを設置

> - Notes 配下のページへ各機能を実装。
>     - (一覧ページ / 記事ページ) サイドメニューを新規設置。
>     - (一覧ページ) タグ一覧をサイドメニューへ設置。
>     - (記事ページ) 目次をサイドメニューへ設置。

今までは [Works](https://clew.kem198.net/works/) ページにのみ実装していたサイドメニューを、[Notes](https://clew.kem198.net/notes/) 配下のページにも新設しました。

- 更新前:

  ![sidemenu-before]({{ baseurl | append: "/assets/notes/2024-03-01-updated-kems-clew-v2/sidemenu-before.jpg" | relative_url }})

- 更新後:

  ![sidemenu-after]({{ baseurl | append: "/assets/notes/2024-03-01-updated-kems-clew-v2/sidemenu-after.jpg" | relative_url }})

このサイドメニューは `position: sticky;` による固定表示を実装しています。

![sidemenu-sticky]({{ baseurl | append: "/assets/notes/2024-03-01-updated-kems-clew-v2/sidemenu-sticky.gif" | relative_url }})

このサイドメニューは画面幅が狭い場合、メニューボタンでの開閉式 UI になります。使い勝手は……今後に期待ということで……。

![sidemenu-sp]({{ baseurl | append: "/assets/notes/2024-03-01-updated-kems-clew-v2/sidemenu-sp.gif" | relative_url }})

なお [Works](https://clew.kem198.net/works/) ページ側のサイドメニューも併せて改修し、デザインやコンポーネント的な処理をある程度共通化しています。

![sidemenu-works]({{ baseurl | append: "/assets/notes/2024-03-01-updated-kems-clew-v2/sidemenu-works.jpg" | relative_url }})

各種あしらいや内部的な処理などまだまだ差異があるので、引き続き統一化を進めていきたい。

### サイドメニュー > タグ一覧

[Notes](https://clew.kem198.net/notes/) ページでは、前述のサイドメニューへタグ一覧を設置しています。いわゆるタグクラウド。

![tagcloud-sidemenu]({{ baseurl | append: "/assets/notes/2024-03-01-updated-kems-clew-v2/tagcloud-sidemenu.jpg" | relative_url }})

`()` 内はそのタグが割り振られている記事件数です。

クリックするとタグごとにソートされたページの該当項目へジャンプします。あんまり UX がよろしくないので今後の改善ポイント。

ちなみに記事の見出しにも同じコンポーネントを配置しています。こちらはその記事に割り当てられているタグが表示されます。

![tagcloud-h1]({{ baseurl | append: "/assets/notes/2024-03-01-updated-kems-clew-v2/tagcloud-h1.jpg" | relative_url }})

### サイドメニュー > 目次

[Notes](https://clew.kem198.net/notes/) 配下の記事ごとのページでは目次が設置されています。

![toc]({{ baseurl | append: "/assets/notes/2024-03-01-updated-kems-clew-v2/toc.jpg" | relative_url }})

目次の生成はこちらのインクルードファイルを利用しています。

- [allejo/jekyll-toc: A GitHub Pages compatible Table of Contents generator without a plugin or JavaScript :octocat:](https://github.com/allejo/jekyll-toc)

目次は記事内の見出しを読み出して自動生成されます。最高。

この目次と前述の固定表示により、ページの横断が各段に行いやすくなりました。中でも [便利スニペット集](https://clew.kem198.net/notes/2024-01-13-my-snippets.html) のページはかなり使い勝手がよくなった☺️

## ページャを設置

> - (記事ページ) 投稿の末尾へページャを設置。

記事の末尾によくあるやつ。

![pager]({{ baseurl | append: "/assets/notes/2024-03-01-updated-kems-clew-v2/pager.jpg" | relative_url }})

実装そのものは難しくなかったが、Jekyll が提供しているページ変数 `page.previous` と `page.next` に格納される記事情報が想像と逆の順番だったのでちょっとややこしかったです。

- [変数 \| Jekyll • シンプルで、ブログのような、静的サイト](https://jekyllrb-ja.github.io/docs/variables/)
- [How do I reverse the ordering of previous and next posts? - Help - Jekyll Talk](https://talk.jekyllrb.com/t/how-do-i-reverse-the-ordering-of-previous-and-next-posts/8346)

例えばよくあるブログサービスだと「次の記事へ」ボタンは【**過去の日付**】の記事へ遷移することが多いと思うけれど、`page.next` は【**未来の日付**】の記事情報が格納されている。このため「次の記事へ」に `page.next` を当ててしまうと、(イメージでの) 前のページへ遷移してしまう……。

これに対して自分の実装上では [単純に逆にして当てはめています](https://github.com/kem198/kems-clew.net/blob/main/docs/_includes/nav-pager.html) 。「Next (次の記事へ)」と表示されているリンク先は、実は `page.previous` が設定されている、という感じ。

記事の順番をコード内で制御すればもっとわかりやすくできるはず……その内改善しておきたい。

## コードを手軽にコピー

> - コードブロックの記述をクリップボードへコピーできる機能を追加。

Qiita などのサービスでよく見るアレ。KeM's Clew にも実装しました。

![codeblock-regexp]({{ baseurl | append: "/assets/notes/2024-03-01-updated-kems-clew-v2/codeblock-regexp.gif" | relative_url }})

↓お試し用

```shell
マウスホバーすると
右側へコピーボタンが表示されます。
```

実装は下記の情報を参考にしています。

- [Code Block Highlighter Copy/Paste (Jekyll)](https://www.blandersoft.com/short/code-block-copy-paste/)

こちらも [便利スニペット集](https://clew.kem198.net/notes/2024-01-13-my-snippets.html) のページの使い勝手に大きく貢献しております！

## Ubuntu 系フォントを導入

> あしらい用および等幅フォントとして Ubuntu, Ubuntu Mono を利用開始。

今までのテキスト用フォントは [Noto Sans Japanese](https://fonts.google.com/noto/specimen/Noto+Sans+JP?query=noto+sans) のみでしたが、これに新しく Ubuntu 系のフォントを追加しました。

- [Ubuntu - Google Fonts](https://fonts.google.com/specimen/Ubuntu)
- [Ubuntu Mono - Google Fonts](https://fonts.google.com/specimen/Ubuntu+Mono?query=ubuntu+mono)

我らが Ubuntu の [公式フォントのようですね](https://design.ubuntu.com/font) 。めちゃくちゃかわいい！

それぞれ次の場所で使用しています。

- Ubuntu: サイトタイトル、タグなど

  ![ubuntu]({{ baseurl | append: "/assets/notes/2024-03-01-updated-kems-clew-v2/ubuntu.jpg" | relative_url }})

- Ubuntu Mono: コードスパン / コードブロック 用

  `Code span`

  ```c
  // Code block
  #include <stdio.h>

  int main(void) {
      printf("Hello, World!\n");
  }
  ```

初めて別種のフォントを織り交ぜることに挑戦してみたけど……だいぶ垢抜けたのでは！！？

## RSS を設置

> RSS を新規設置。

- [サイトフッター > kems-clew.net/feed.xml](https://clew.kem198.net/feed.xml)

こんな拙作でもよければどうぞ🙇‍♂️🙇‍♂️

## 不要な機能を削除

> - 次の機能をオミット。
>     - スムーススクロール
>     - Notes > カテゴリ別ページ

スムーススクロールは無い方がテキパキ動いて使い勝手良かったので削除。

カテゴリ別ページはその内復活するかも？

## おわりに

以上となります！

当記事で挙げた他にも、サイト全体のデザイン・あしらいは微調整を続けています。内部処理的な面でも改善できるところはまだまだいっぱい……。

今後も手入れしていくぞー。
