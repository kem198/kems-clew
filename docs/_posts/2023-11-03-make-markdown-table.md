---
layout: post
page-category: note
title: VS Code で Markdown のテーブルを楽々記述するぞ
description: ""
preview: ""
category: 開発
tags:
    - markdown
    - vscode
date: 2023-11-25
lastmod: 2023-11-25
---

<!-- omit in toc -->
## 要約

- Markdown はテーブルを記述するのがめんどうくさい。
- VS Code の拡張機能 [Markdown Table](https://marketplace.visualstudio.com/items?itemName=TakumiI.markdowntable) をインストールすると解決するぞ。
- ショートカットキーの設定もすると便利だよ。

<!-- omit in toc -->
## 目次

- [はじめに](#はじめに)
- [検証環境](#検証環境)
- [環境構築・実行](#環境構築実行)
    - [1. 拡張機能をインストールする](#1-拡張機能をインストールする)
    - [2. テーブルを整形する](#2-テーブルを整形する)
    - [3. 行・列を入れ替える](#3-行列を入れ替える)
- [ショートカットキーまとめ](#ショートカットキーまとめ)
- [おわりに](#おわりに)
- [オマケ: Obsidian でも同様の操作を実現する](#オマケ-obsidian-でも同様の操作を実現する)

## はじめに

Markdown 記法に慣れるとドキュメントやメモをさくさく書けてとっても楽しい (当社比) 。

……のですが、ひとつサクサクと書けないものが存在します。テーブル (表) です。

| ルール名       | メニュー         | 説明                                 |
| -------------- | ---------------- | ------------------------------------ |
| ナワバリバトル | レギュラーマッチ | たくさんナワバリを確保しろ！         |
| ガチエリア     | バンカラマッチ   | ガチエリアを確保して守りぬけ！       |
| ガチヤグラ     | バンカラマッチ   | ガチヤグラを相手ゴールに運べ！       |
| ガチアサリ     | バンカラマッチ   | ガチアサリを相手ゴールに投げ入れろ！ |

こちら、ソースコード上では下記のように記述されています。

```markdown
| ルール名       | メニュー         | 説明                                 |
| -------------- | ---------------- | ------------------------------------ |
| ナワバリバトル | レギュラーマッチ | たくさんナワバリを確保しろ！         |
| ガチエリア     | バンカラマッチ   | ガチエリアを確保して守りぬけ！       |
| ガチヤグラ     | バンカラマッチ   | ガチヤグラを相手ゴールに運べ！       |
| ガチアサリ     | バンカラマッチ   | ガチアサリを相手ゴールに投げ入れろ！ |
```

いや～～。

…………。

……。

**めんどうくさい！！！**

- パイプ記号 `|` とハイフン記号 `-` を組み合わせて記述する必要がある。
- 半角スペースで整形しておくとソースコードが読みやすいものの、記述の調整が大変。
- 行・列を入れ替える時はほぼほぼ書き直しになる。

今回はそんな Markdown 記法のテーブルを、VS Code の拡張機能やショートカットを使用して楽々記述するぞ！という趣旨の記事になっております～。

![all](/assets/images/notes/2023-11-03-make-markdown-table/all.gif)

## 検証環境

当記事は下記の環境のもと作成しています。よしなに読み替えてください。

- OS: Windows 11
- エディタ: [Visual Studio Code](https://azure.microsoft.com/ja-jp/products/visual-studio-code) (以降「VS Code」と表記)
- フォント: 等幅フォント ([白源](https://qiita.com/tawara_/items/374f3ca0a386fab8b305))
- 拡張機能:
    - [Japanese Language Pack for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=MS-CEINTL.vscode-language-pack-ja)
    - [Markdown Table](https://marketplace.visualstudio.com/items?itemName=TakumiI.markdowntable) ※当記事でインストールします。

## 環境構築・実行

### 1. 拡張機能をインストールする

まずは VS Code へ拡張機能 [Markdown Table](https://marketplace.visualstudio.com/items?itemName=TakumiI.markdowntable) をインストールします。ライセンスなどは適宜ご確認ください。

なお同様の拡張機能が複数存在しますので注意しましょう。この拡張機能は日本語を含むマルチバイト文字列に対応していることが特徴です。

![policyf](/assets/images/notes/2023-11-03-make-markdown-table/policy.png)

↑同拡張機能の概要ページより引用 (あまりにもありがたい) 。

### 2. テーブルを整形する

インストールが終わったら試しに書いてみましょう。

.md 形式のファイルを開いたら、下記のとおりヘッダー行とハイフン記号までざっくり記述しまして……

```markdown
|ルール名|メニュー|
|-
```

Tab キーを押下すると……

![tab](/assets/images/notes/2023-11-03-make-markdown-table/tab.gif)

↑うおおおおおお

こんな感じで、次のフィールドへ進むついでに自動で半角スペースを挿入して整形してくれます。前のフィールドへ戻るには `Shift` + `Tab` を送信しましょう。

これにて下記の課題は解決です。あまりにもあっさり……。

> - パイプ記号 `|` とハイフン記号 `-` を組み合わせて記述する必要がある。
> - 半角スペースで整形しておくとソースコードが読みやすいものの、記述の調整が大変。

### 3. 行・列を入れ替える

残りの課題である

> - 行・列を入れ替える時はほぼほぼ書き直しになる。

を解決しましょう。

まず行の入れ替えは VS Code 標準のショートカットキーで対応できます。普段のコーディングの際にも便利。

- `Alt` + `UpArrow (↑)` : 行を上へ移動
- `Alt` + `DownArrow (↓)` : 行を下へ移動

![swap-ud](/assets/images/notes/2023-11-03-make-markdown-table/swap-ud.gif)

列の入れ替えは右クリックから行えます。先ほどの拡張機能に付随している機能です。

- `Markdown Table: Move to Left.` : 列を左へ移動
- `Markdown Table: Move to Right.` : 列を右へ移動

![swap-lr01](/assets/images/notes/2023-11-03-make-markdown-table/swap-lr.gif)

これだけでも十分便利ですが、VS Code のキーボード ショートカットへ登録すると便利です。

1. VS Code の `ファイル(F)` > `ユーザー設定` > `キーボード ショートカット` を実行する。
2. `Markdown Table: Move to` で検索し、同機能のショートカット設定を表示する。
3. `キー バインド` をクリックし、下図のとおりキーバインドを設定する。
    - `Markdown Table: Move to Left.` : `Alt` + `LeftArrow`
    - `Markdown Table: Move to Right.` : `Alt` + `RightArrow`

    ![swap-keybindings](/assets/images/notes/2023-11-03-make-markdown-table/swap-keybindings.png)

    ※デフォルトで同じショートカットキーに標準機能がアサインされているので、適宜置き換えを行ってください。

![all](/assets/images/notes/2023-11-03-make-markdown-table/all.gif)

↑キーボードだけですべての操作が完結できました！

## ショートカットキーまとめ

当ページで紹介・設定したショートカットキーをまとめると下表のとおりとなります。

| ショートカットキー       | 説明                                      | 機能の提供元   |
| ------------------------ | ----------------------------------------- | -------------- |
| `Tab`                    | 次のフィールドへ進む / テーブルを整形する | Markdown Table |
| `Shift` + `Tab`          | 前のフィールドへ戻る                      | Markdown Table |
| `Alt` + `UpArrow (↑)`    | 行を上へ移動                              | VS Code 標準   |
| `Alt` + `UpArrow (↓)`    | 行を下へ移動                              | VS Code 標準   |
| `Alt` + `LeftArrow (←)`  | 列を左へ移動                              | Markdown Table |
| `Alt` + `RightArrow (→)` | 列を右へ移動                              | Markdown Table |

## おわりに

ということで「VS Code で Markdown のテーブルを楽々記述するぞ」が実現できました！

拡張機能 [Markdown Table](https://marketplace.visualstudio.com/items?itemName=TakumiI.markdowntable) には、他にも各種機能が存在するようです。  
詳細は同拡張機能の概要ページ > `2. Demo` `3. Extension Configurations` を参照しましょう。特に `Convert from TSV` がエクセルを併用している場合に便利です。

ドキュメントは未来の自分への手紙！！よきドキュメントを残していきましょう～～。

## オマケ: Obsidian でも同様の操作を実現する

今回は VS Code の記事でしたが、メモアプリ「Obsidian」でも同様の操作が実現できます。

- 拡張機能: [Advanced Tables for Obsidian](https://github.com/tgrosinger/advanced-tables-obsidian)
    - [Obsidian 用リンク](obsidian://show-plugin?id=table-editor-obsidian)
- 設定するショートカットキー:
    - `上の行と入れ替える` (Obsidian 標準)
    - `下の行と入れ替える` (Obsidian 標準)
    - `Advanced Tables: Move column left` (Advanced Tables)
    - `Advanced Tables: Move column right` (Advanced Tables)

![obsidian-swap-ud](/assets/images/notes/2023-11-03-make-markdown-table/obsidian-swap-ud.png)

![obsidian-swap-lr](/assets/images/notes/2023-11-03-make-markdown-table/obsidian-swap-lr.png)

Obsidian の記事も書きたいなあ……。
