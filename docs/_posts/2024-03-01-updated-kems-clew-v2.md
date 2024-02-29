---
layout: post
title: KeM's Clew をアップデートしました
description: ""
preview: ""
category: 情報技術
tags:
  - misc
date: 2024-03-01
lastmod: 2024-03-01
---

表題のとおり。KeM's Clew v2.\*.\* としてリリースしております。

- [Release v2.0.0 · kenkenpa198/kems-clew.net](https://github.com/kenkenpa198/kems-clew.net/releases/tag/v2.0.0)

経緯とアップデート内容について紹介します。

## 改修に至った経緯

詳しくは書けないけれど、私生活の状況が色々と変わったことがきっかけです。

それに先立ち、掲載情報を気楽に活用したり、フロントエンド面の技術を楽しく学べる場にしたいと考えていました。そのためには、まず既存の「とりあえず動けばええやろ」なコード群を整理するのが前提になるというもので……。

そんなわけで、KeM's Clew のサイト構成をイチから見直すことにしました。

## 内部処理を刷新

> - Minima をベースとした構成へ刷新。
>     - `Gemfile` , `Gemfile.lock` など Ruby 関連ファイルの追加。
>     - 反映するスタイルシートを `.css` から `.scss` へ刷新。
>     - 各コンポーネントの冗長構成を見直し・切り分け。

まずはこのあたり。

主に [GitHub Pages の公式情報](https://docs.github.com/ja/pages/setting-up-a-github-pages-site-with-jekyll/creating-a-github-pages-site-with-jekyll) と [Minima](https://github.com/jekyll/minima) テーマの構成を参考にして、各コンポーネントの切り分けや構成の見直しを諸々対応しています。

具体的な技術情報は次の内容をご参考ください。

- [About > 使用している技術・素材](https://kems-clew.net/about/#使用している技術素材)
- [kenkenpa198/kems-clew.net > 2.3. (v2.0.0 ～) minima テーマへ切り替え](https://github.com/kenkenpa198/kems-clew.net?tab=readme-ov-file#23-v200--minima-%E3%83%86%E3%83%BC%E3%83%9E%E3%81%B8%E5%88%87%E3%82%8A%E6%9B%BF%E3%81%88)

Jekyll の Liquid 構文や Sass など、改めて触れる機会になってよかった。

## サイドメニューと各機能を設置

> - Notes 配下のページへ各機能を実装。
>     - (一覧ページ / 記事ページ) サイドメニューを新規設置。
>     - (一覧ページ) タグ一覧をサイドメニューへ設置。
>     - (記事ページ) 目次をサイドメニューへ設置。

今までは [Works](https://kems-clew.net/works/) ページにのみ実装していたサイドメニューを、[Notes](https://kems-clew.net/notes/) 配下のページにも新設しました。

- 更新前:

  ![note-before]({{ baseurl | append: "/assets/notes/2024-03-01-updated-kems-clew-v2/note-before.jpg" | relative_url }})

- 更新後:

  ![note-after]({{ baseurl | append: "/assets/notes/2024-03-01-updated-kems-clew-v2/note-after.jpg" | relative_url }})

記事一覧ページではタグを、記事ページでは目次を表示しています。

また、`position: sticky;` で固定表示を実装しています。

![note-toc]({{ baseurl | append: "/assets/notes/2024-03-01-updated-kems-clew-v2/note-toc.gif" | relative_url }})

特に目次の存在はページの横断が大変行いやすくなりました。[便利スニペット集](https://kems-clew.net/notes/2024-01-13-my-snippets.html) のページはかなり効果が大きい……。

その他、ビューポートによってメニューボタンに変化するなどいろいろ工夫しています。使い勝手は……今後に期待ということで……。

なお [Works](https://kems-clew.net/works/) ページ側のサイドメニューも併せて改修し、デザインやコンポーネント的な処理をある程度共通化しています。タグの表示や内部的な処理などまだまだ差異があるので、引き続き統一化を進めていきたい。

## コードを手軽にコピー

> - コードブロックの記述をクリップボードへコピーできる機能を追加。

Qiita などのサービスでよく見るアレ。KeM's Clew にも実装しました。

![regexp]({{ baseurl | append: "/assets/notes/2024-03-01-updated-kems-clew-v2/regexp.gif" | relative_url }})

実装は下記ページを参考にしています。

- [Code Block Highlighter Copy/Paste (Jekyll)](https://www.blandersoft.com/short/code-block-copy-paste/)

こちらも [便利スニペット集](https://kems-clew.net/notes/2024-01-13-my-snippets.html) のページの使い勝手に大きく貢献しております！

## Ubuntu 系フォントを導入

> あしらい用および等幅フォントとして Ubuntu, Ubuntu Mono を利用開始。

今までのテキスト用フォントは [Noto Sans Japanese](https://fonts.google.com/noto/specimen/Noto+Sans+JP?query=noto+sans) のみでしたが、これに新しく下記 2 種を追加しました。

- [Ubuntu - Google Fonts](https://fonts.google.com/specimen/Ubuntu)
- [Ubuntu Mono - Google Fonts](https://fonts.google.com/specimen/Ubuntu+Mono?query=ubuntu+mono)

我らが Ubuntu の [公式フォントのようですね](https://design.ubuntu.com/) 。めちゃくちゃかわいい！

それぞれ次の場所で使用しています。

- Ubuntu (サイトタイトル、タグなど) :

  ![ubuntu]({{ baseurl | append: "/assets/notes/2024-03-01-updated-kems-clew-v2/ubuntu.jpg" | relative_url }})

- Ubuntu Mono (コードスパン / ブロック 用) :

  ```c
  #include <stdio.h>

  int main(void) {
      printf("Hello, World!\n");
  }
  ```

初めて 2 種類のフォントを織り交ぜることに挑戦してみたけど……だいぶセンスよいのでは！！？

サイト全体のデザイン・あしらいについては微調整を続けています。行間とか余白とかね～～どこまでこだわるか……。

## RSS を設置

> RSS を新規設置。

- [サイトフッター > kems-clew.net/feed.xml](https://kems-clew.net/feed.xml)

こんな拙作でもよければどうぞ🙇‍♂️🙇‍♂️

## 不要な機能を削除

> - 次の機能をオミット。
>     - スムーススクロール
>     - Notes > カテゴリ別ページ

スムーススクロールは無い方がテキパキ動いて使い勝手良かったので削除。

カテゴリ別ページはその内復活するかも？

## おわりに

なんやかんやでコミット数は くらいになってしまった。今後も遊び倒していくぞー。
