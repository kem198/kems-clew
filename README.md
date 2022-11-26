<!-- omit in toc -->
# KeM's Clew

個人サイト [KeM's Clew](https://kems-clew.net) の実体となるファイル群を管理しているリポジトリ。  
URL はこちら。

- [https://kems-clew.net](https://kems-clew.net)

以下の URL でもアクセスできる。  
すべて [https://kems-clew.net](https://kems-clew.net) へリダイレクトされる。

- [https://www.kems-clew.net](https://www.kems-clew.net)
- [http://kems-clew.net](http://kems-clew.net)
- [http://www.kems-clew.net](http://www.kems-clew.net)

<!-- omit in toc -->
## 目次

- [1. 公開まわりの設定](#1-公開まわりの設定)
    - [1.1. 独自ドメインと DNS 設定](#11-独自ドメインと-dns-設定)
    - [1.2. GitHub Pages でのホスティング](#12-github-pages-でのホスティング)
    - [1.3. HTTPS 化](#13-https-化)
- [2. 内部構成](#2-内部構成)
    - [2.1. Jekyll によるビルド](#21-jekyll-によるビルド)
    - [2.2. 使用ライブラリ](#22-使用ライブラリ)
- [3. 作業方法メモ](#3-作業方法メモ)
    - [3.1. 環境構築](#31-環境構築)
    - [3.2. ビルド・Web サーバーの立ち上げ・表示](#32-ビルドweb-サーバーの立ち上げ表示)
    - [3.3. メモ](#33-メモ)
        - [3.3.1. `_site` ディレクトリをルートとして Web サーバーを立てる](#331-_site-ディレクトリをルートとして-web-サーバーを立てる)
- [4. 参考文献](#4-参考文献)
    - [4.1. ドメインの取得～公開](#41-ドメインの取得公開)
    - [4.2. GitHub Pages / Jekyll](#42-github-pages--jekyll)
    - [4.3. HTML / CSS / JS](#43-html--css--js)

## 1. 公開まわりの設定

### 1.1. 独自ドメインと DNS 設定

独自ドメイン `kems-clew.net` は 2022-11-11 に [Xserver Domain](https://www.xdomain.ne.jp/) で取得。

GitHub Pages の `A` レコード 及び `AAAA` レコードを Xserver Domain の DNS レコード設定に追加し、ドメインに来た通信を GitHub Pages の IP アドレスへ向けている。

`www` サブドメインは `kenkenpa198.github.io` の `CNAME` レコードを DNS レコード設定へ追加して利用できるようにしている。

### 1.2. GitHub Pages でのホスティング

サイトの実体は GitHub Pages でホスティングされている。  
元の URL は下記。

- [https://kenkenpa198.github.io/kems-clew.net/](https://kenkenpa198.github.io/kems-clew.net/)

`/docs` 配下がサイトの実体となるファイルを格納するディレクトリ。  
`main` ブランチに存在する`/docs` ディレクトリをビルド用ディレクトリとして設定している。

![GitHub Pages の設定](images/githubpages_branch.jpg)

### 1.3. HTTPS 化

SSL 証明書は [Xserver SSL](https://ssl.xdomain.ne.jp/) にて発行。ブランドは `Let's Encrypt` 。  
HTTPS での公開は GitHub Pages の `Enforce HTTPS` 機能を使用している。

## 2. 内部構成

### 2.1. Jekyll によるビルド

当サイトは HTML ソースのテンプレート化や [マークダウン記法でのブログ機能](https://kems-clew.net/notes.html) を実装している。  
これらは GitHub Pages に組み込まれている静的サイトジェネレータ「[Jekyll](http://jekyllrb-ja.github.io/)」の機能を使用している。

初回リリース時点で Jekyll の機能を使用しているのは以下のディレクトリ・ファイル。

- `/docs/_layouts/`
    - サイト全体で使用するテンプレートファイルを格納するディレクトリ。
    - 例えば `default.html` は `<head>` タグ及び `<body>` タグ内のヘッダーとフッター、後述のタグ `{{ content }}` などが記述された共通テンプレートファイル。
- `/docs/_posts/`
    - [Notes](https://kems-clew.net/notes.html) ページ配下にて公開されるブログの投稿ファイルを格納するディレクトリ。
    - 投稿はマークダウン形式のファイルとして作成・配置する。
    - ファイル名は [命名規則が存在する](http://jekyllrb-ja.github.io/docs/posts/#%E3%83%9D%E3%82%B9%E3%83%88%E3%82%92%E4%BD%9C%E3%82%8B:~:text=%E3%81%97%E3%81%A6%E3%81%84%E3%81%BE%E3%81%99%E3%80%82-,%E3%83%9D%E3%82%B9%E3%83%88%E3%82%92%E4%BD%9C%E3%82%8B,-Permalink) 。

        ```text
        YEAR-MONTH-DAY-title.MARKUP
        ```

        ```text
        例）
        2011-12-31-new-years-eve-is-awesome.md
        2012-09-12-how-to-write-a-blog.md
        ```

    - ファイルそれぞれの先頭には後述の「YAML Front Matter」が記述されている。
- `/docs/_drafts/`
    - ブログ投稿の下書きファイルを格納するディレクトリ。通常はビルドから除外される。
    - こちらはファイル名から日付を除去して配置する。

        ```text
        title.MARKUP
        ```

    - `jekyll serve` へ `--drafts` オプションを付けて実行すると、ビルドの対象になり表示確認ができるようになる。
    - 下書きを保存するためのディレクトリであるため、`.gitignore` にて Git 管理外としている。
- `/docs/_config.yml`
    - Jekyll を使用したサイトのデフォルト設定値を定義するファイル。
- これらの他、ブレースホルダー `{ ... }` `{{ ... }}` や YAML 形式での記述がされたファイル。
    - [オブジェクト](http://jekyllrb-ja.github.io/docs/step-by-step/02-liquid/#:~:text=%E3%83%86%E3%83%B3%E3%83%97%E3%83%AC%E3%83%BC%E3%83%88%E8%A8%80%E8%AA%9E%E3%81%A7%E3%81%99%E3%80%82-,%E3%82%AA%E3%83%96%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88,-Permalink)

        ```html
        {{ content }}
        ```

        ```html
        {{ page.title }}
        ```

    - [タグ](http://jekyllrb-ja.github.io/docs/step-by-step/02-liquid/#:~:text=%E5%87%BA%E5%8A%9B%E3%81%97%E3%81%BE%E3%81%99%E3%80%82-,%E3%82%BF%E3%82%B0,-Permalink)

        ```html
        <ul class="myposts">
        {% for post in site.posts %}
            <li>
                <span class="postDate">{{ post.date | date: "%Y-%m-%d" }}</span>
                <a href="{{ post.url }}">{{ post.title }}</a>
            </li>
        {% endfor %}
        </ul>
        ```

    - [フィルタ](http://jekyllrb-ja.github.io/docs/step-by-step/02-liquid/#:~:text=%E7%A2%BA%E8%AA%8D%E3%81%8F%E3%81%A0%E3%81%95%E3%81%84%E3%80%82-,%E3%83%95%E3%82%A3%E3%83%AB%E3%82%BF,Permalink,-%E3%83%95%E3%82%A3%E3%83%AB%E3%82%BF%E3%81%AFLiquid)

        ```html
        <link rel="stylesheet" href="{{ "/assets/css/style.css" | relative_url }}">
        ```

    - [YAML Front Matter](http://jekyllrb-ja.github.io/docs/front-matter/) （ファイルの先頭に記述）

        ```yml
        ---
        title: Home
        layout: default
        page-category: home
        ---
        ```

テンプレートとして利用されるファイルには `{{ content }}` を始めとしたオブジェクトやタグなどの記述が存在する。  
ソースとして利用されるファイルには YAML Front Matter が記述されている。

この YAML Front Matter 上に記述された情報やコンテンツ内容が、テンプレートのブレースホルダー内の変数へ挿入され、HTML ファイルが生成されるイメージ。

詳しくは Jekyll のチュートリアル用ページを参照。

- [セットアップ | Jekyll • シンプルで、ブログのような、静的サイト](https://jekyllrb-ja.github.io/docs/step-by-step/01-setup/)
- [HTMLサイトをJekyllに変換 | Jekyll • シンプルで、ブログのような、静的サイト](http://jekyllrb-ja.github.io/tutorials/convert-existing-site-to-jekyll/)

### 2.2. 使用ライブラリ

[Home](https://kems-clew.net/) や [Works](https://kems-clew.net/works.html) ページの画像レイアウト・ライトボックス処理は以下の JavaScript ライブラリを使用している。

- [jQuery](https://jquery.com/)
- [Masonry](https://masonry.desandro.com/)
- [Colorbox](http://www.jacklmoore.com/colorbox/)

なお画像レイアウトの DOM 要素は JavaScript が書き出すため、JavaScript が無効な環境ではコンテンツが正常に表示されない。  
このため暫定策として以下の記述を該当するページに配置している。

```html
<!-- JavaScript が無効な環境で表示するコンテンツ -->
<noscript>
    <p>
        JavaScript が無効のため、コンテンツを正常に表示できませんでした。<br>
        お手数ですがブラウザの設定をお確かめの上、ページの再読み込みを行ってください。
    </p>
</noscript>
```

## 3. 作業方法メモ

### 3.1. 環境構築

[kenkenpa198/tutorial-jekyll](https://github.com/kenkenpa198/tutorial-jekyll) > `2. 環境構築メモ` を参照。

### 3.2. ビルド・Web サーバーの立ち上げ・表示

1. `/docs` ディレクトリへ移動する。

    ```shell
    $ cd docs
    ```

2. 下記いずれかの `jekyll` コマンドでカレントディレクトリをルートディレクトリとしてビルドする。

    ```shell
    $ jekyll build          # サイトをビルドし、_site ディレクトリに出力する
    $ jekyll serve          # ビルド後、変更を加える度に再構築を行う。あわせて http://localhost:4000 でローカルサーバを走らせる。基本はコレ
    $ jekyll serve --drafts # _drafts ディレクトリに存在するブログ投稿の下書きを追加してビルドするオプション
    ```

3. `jekyll serve` を使用した場合、以下のように出力される。

    ```shell
    $ jekyll serve
    Configuration file: /home/username/foo/bar/kems-clew.net/docs/_config.yml
                Source: /home/username/foo/bar/kems-clew.net/docs
        Destination: /home/username/foo/bar/kems-clew.net/docs/_site
    Incremental build: disabled. Enable with --incremental
        Generating...
                        done in 0.454 seconds.
    Auto-regeneration: enabled for '/home/username/foo/bar/kems-clew.net/docs'
        Server address: http://127.0.0.1:4000
    Server running... press ctrl-c to stop.
    ```

4. `/docs` 配下に `_site` ディレクトリが生成され、その配下にビルドされたウェブサイトのソースが配置される。

    ```shell
    $ tree --dirsfirst -L 2
    .                                     # /docs/
    ├── _drafts
    ├── _layouts
    │   ├── default.html
    │   └── post.html
    ├── _posts
    │   ├── 2022-11-18-hello-world.md
    │   ├── ...
    │   └── 2022-11-23-whats-clew.md
    ├── _site                             # _site ディレクトリ。ビルドされたウェブサイトのソースが配置される
    │   ├── 2022
    │   ├── assets
    │   ├── 404.html
    │   ├── CNAME
    │   ├── apple-touch-icon.png
    │   ├── favicon.ico
    │   ├── index.html
    │   ├── notes.html
    │   └── works.html
    ├── assets
    │   ├── css
    │   ├── data
    │   ├── images
    │   └── js
    ├── 404.html
    ├── CNAME
    ├── _config.yml
    ├── apple-touch-icon.png
    ├── favicon.ico
    ├── index.html
    ├── notes.html
    └── works.html
    ```

5. `Server address:` に表示されているローカルホストのアドレス `http://127.0.0.1:4000`（もしくは `http://localhost:4000`）へブラウザでアクセスする。
6. `/docs/_site` に配置された `index.html` が表示される。
7. `/docs` 配下のソースファイルを上書き保存すると、自動で再ビルドされる。

### 3.3. メモ

#### 3.3.1. `_site` ディレクトリをルートとして Web サーバーを立てる

`_site` ディレクトリをルートとして別の Web サーバーを立てることもできる。  
この場合、Jekyll を使用せずに作成した通常のウェブサイトのように扱うことができる。

例えば VSCode の拡張機能「Live Server」の場合、以下の手順になる。

1. [3.2. ビルド・Web サーバーの立ち上げ・表示](#32-ビルドweb-サーバーの立ち上げ表示) の工程 2 まで進め、`_site` ディレクトリと配下のファイルをビルドする。
2. 別ウィンドウの VSCode もしくは `フォルダをワークスペースに追加...` で `_site` ディレクトリを開く。
3. `_site` ディレクトリをルートとして Live Server を実行する。
4. 初期設定だとポート `5500` でサーバーが構築されるので、`http://127.0.0.1:5500` へアクセスする。

[3.2. ビルド・Web サーバーの立ち上げ・表示](#32-ビルドweb-サーバーの立ち上げ表示) で立てた Web サーバーだと iPhone など同ネットワーク内の別端末からアクセスができない（？）ため、別端末で表示確認をする際はこちらの方法を使っている。

## 4. 参考文献

### 4.1. ドメインの取得～公開

- [Xserver Domain で取得したドメインを使って GitHub Pages で HTTPS に対応したサイトを公開する方法 – ktzwのエンジニアブログ](https://y-ktzw.com/posts/custom-domain/)

### 4.2. GitHub Pages / Jekyll

- [About custom domains and GitHub Pages - GitHub Docs](https://docs.github.com/ja/pages/configuring-a-custom-domain-for-your-github-pages-site/about-custom-domains-and-github-pages)
- [Jekyll • シンプルで、ブログのような、静的サイト | プレーンテキストを静的サイトやブログに変えましょう](http://jekyllrb-ja.github.io/)
    - [Posts（ポスト） | Jekyll • シンプルで、ブログのような、静的サイト](http://jekyllrb-ja.github.io/docs/posts/)
    - [タグフィルタ | Jekyll • シンプルで、ブログのような、静的サイト](http://jekyllrb-ja.github.io/docs/liquid/tags/#linking-to-posts)
- [Neos21/neos21.net: Repository of Neo's World](https://github.com/Neos21/neos21.net)

### 4.3. HTML / CSS / JS

- [jQuery最高の教科書｜株式会社シフトブレイン 著](http://jquery.shiftbrain.co.jp/)
- [CSS 最近のWebページやアプリのレイアウトに適した、ラッパーの実装テクニックを徹底解説 | コリス](https://coliss.com/articles/build-websites/operation/css/styling-layout-wrappers-in-css.html)
- [CSSでメディアクエリ(Media Queries)の基本的な書き方、記述の意味を理解し、「何となく使う」を卒業する。 | WEMO](https://wemo.tech/839)
- [【2022年】レスポンシブデザインのブレイクポイントまとめ｜どのデバイスでも綺麗に見える秘訣とは   ｜caroa design magazine](https://caroa.jp/design/article/IuBFNKUn)
- [スクロールバーの出現によるガタつきを防ぐCSS | q-Az](https://q-az.net/appear-scrollbar-problem/)
- [width,heighとpaddingの同時指定によるレイアウト崩れをbox-sizingdで防ぐ - Qiita](https://qiita.com/NeGI1009/items/a738cd96a345a7799e4b)
- [簡単にモーダルウィンドウを実装できるjQueryプラグイン「Colorbox」｜I'll be NET](https://illbenet.jp/view/js-colorbox)
