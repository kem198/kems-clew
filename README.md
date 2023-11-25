<!-- omit in toc -->
# KeM's Clew

個人サイト [KeM's Clew](https://kems-clew.net) の実体となるファイル群を管理しているリポジトリ。  
URL はこちら。

- [https://kems-clew.net](https://kems-clew.net)

下記の URL でもアクセスできる。  
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
    - [3.2. ビルド・Web サーバの立ち上げ・表示](#32-ビルドweb-サーバの立ち上げ表示)
- [4. その他メモ](#4-その他メモ)
    - [4.1. `_site` ディレクトリをルートとして Web サーバを立てる](#41-_site-ディレクトリをルートとして-web-サーバを立てる)
- [5. 権利表記](#5-権利表記)
- [6. 参考文献](#6-参考文献)
    - [6.1. ドメインの取得～公開](#61-ドメインの取得公開)
    - [6.2. GitHub Pages / Jekyll](#62-github-pages--jekyll)
    - [6.3. HTML / CSS / JS](#63-html--css--js)

## 1. 公開まわりの設定

### 1.1. 独自ドメインと DNS 設定

独自ドメイン `kems-clew.net` は2022年11月11日に [Xserver Domain](https://www.xdomain.ne.jp/) で取得したもの。

GitHub Pages の A レコード 及び AAAA レコードを Xserver Domain の DNS レコード設定に追加し、ドメインに来た通信を GitHub Pages の IP アドレスへ転送している。

- [GitHub Pages サイトのカスタムドメインを管理する - GitHub Docs > Apexドメインを設定する](https://docs.github.com/ja/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site#configuring-an-apex-domain)

> - A レコードを作成するには、apex ドメインが GitHub Pages の IP アドレスを指すようにします。
>
> ```text
> 185.199.108.153
> 185.199.109.153
> 185.199.110.153
> 185.199.111.153
> ```
>
> - AAAA レコードを作成するには、apex ドメインが GitHub Pages の IP アドレスを指すようにします。
>
> ```text
> 2606:50c0:8000::153
> 2606:50c0:8001::153
> 2606:50c0:8002::153
> 2606:50c0:8003::153
> ```

`www` サブドメインは `kenkenpa198.github.io` の CNAME レコードを DNS レコード設定へ追加して利用できるようにしている。

- [GitHub Pages サイトのカスタムドメインを管理する - GitHub Docs > apex ドメインと www サブドメイン バリアントの構成](https://docs.github.com/ja/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site#configuring-a-subdomain)

> ご利用の DNS プロバイダーに移動し、サブドメインがサイトの既定のドメインを指す CNAMECNAME レコードを作成します。 たとえば、ユーザー サイトのサブドメイン www.example.com を使用する場合は、www.example.com が <user>.github.io を指す CNAME レコードを作成します。 組織サイトのサブドメイン another.example.com を使用する場合は、another.example.com が <organization>.github.io を指す CNAME レコードを作成します。 CNAME レコードは常に、<user>.github.io または <organization>.github.io (リポジトリ名を除く) を指す必要があります。 正しいレコードの作成方法に関する詳しい情報については、DNSプロバイダのドキュメンテーションを参照してください。 サイトの既定のドメインの詳細については、「GitHub Pages について」を参照してください。

これらをまとめると下表の対応となる。  
実際の XServer Domain > `DNSレコード設定` 画面上でもこの内容で設定している。

| ホスト名          | 種別  | 内容                  |
| ----------------- | ----- | --------------------- |
| kems-clew.net     | A     | 185.199.108.153       |
| kems-clew.net     | A     | 185.199.109.153       |
| kems-clew.net     | A     | 185.199.110.153       |
| kems-clew.net     | A     | 185.199.111.153       |
| kems-clew.net     | AAAA  | 2606:50c0:8000::153   |
| kems-clew.net     | AAAA  | 2606:50c0:8001::153   |
| kems-clew.net     | AAAA  | 2606:50c0:8002::153   |
| kems-clew.net     | AAAA  | 2606:50c0:8003::153   |
| www.kems-clew.net | CNAME | kenkenpa198.github.io |

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
        <link rel="stylesheet" href="{{ "/css/style.css" | relative_url }}">
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
- [imagesLoaded](https://imagesloaded.desandro.com/)
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

### 3.2. ビルド・Web サーバの立ち上げ・表示

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

## 4. その他メモ

### 4.1. `_site` ディレクトリをルートとして Web サーバを立てる

`_site` ディレクトリをルートとして別の Web サーバを立てることもできる。  
この場合、Jekyll を使用せずに作成した通常のウェブサイトのように扱うことができる。

WSL で開発を行う場合、スマートフォンなどの外部端末で表示確認をする際の代替手段となる (※) 。

例えば VS Code の拡張機能「Live Server」の場合、下記の手順になる。

1. [3.2. ビルド・Web サーバの立ち上げ・表示](#32-ビルドweb-サーバの立ち上げ表示) の工程 2 まで進め、`_site` ディレクトリと配下のファイルをビルドする。
2. 別ウィンドウの VS Code もしくは `フォルダをワークスペースに追加...` で `_site` ディレクトリを開く。
3. `_site` ディレクトリをルートとして Live Server を実行する。
4. 初期設定だとポート `5500` でサーバが構築されるので、`http://127.0.0.1:5500` へアクセスする。
    1. 外部端末からアクセスする場合は `ipconfig` で表示した `<<IPv4 アドレス>>:5500` でアクセスする。要ポート開放。

(※) [3.2. ビルド・Web サーバの立ち上げ・表示](#32-ビルドweb-サーバの立ち上げ表示) を WSL 環境で行った場合、同ネットワーク内の別端末からのアクセスが難しい。WSL バージョン 2 は仮想ネットワーク上での実行であることにより、Linux ディストリビューションの IP アドレスの取得など手順がやや煩雑なため。

- [WSL を使用したネットワーク アプリケーションへのアクセス | Microsoft Learn](https://learn.microsoft.com/ja-jp/windows/wsl/networking#accessing-a-wsl-2-distribution-from-your-local-area-network-lan)
- [WSL2で開発中のWebアプリを同じLANのスマホで動作確認する方法](https://zenn.dev/solufa/articles/accessing-wsl2-from-mobile)

上記記事のとおり回避策はあるが難易度高めなので、現状は前述の手順で表示確認を行っている。

## 5. 権利表記

- [Font Awesome](https://fontawesome.com/)  
License: [CC BY 4.0 License](https://creativecommons.org/licenses/by/4.0/)  
About: [Free License | Font Awesome](https://fontawesome.com/license/free)  

- [Noto Sans Japanese (Google Fonts)](https://fonts.google.com/noto/specimen/Noto+Sans+JP)  
License: [SIL Open Font License (OFL)](https://scripts.sil.org/cms/scripts/page.php?site_id=nrsi&id=OFL)  
About: [Noto Sans Japanese - Google Fonts](https://fonts.google.com/noto/specimen/Noto+Sans+JP/about)

- [jQuery](https://jquery.com/)  
License: [MIT License](https://www.tldrlegal.com/license/mit-license)  
About: [Download jQuery | jQuery](https://jquery.com/download/)

- [imagesLoaded](https://imagesloaded.desandro.com/)  
License: [MIT License](https://desandro.mit-license.org/)  
About: [MIT License | imagesLoaded](https://imagesloaded.desandro.com/#mit-license)

- [Masonry](https://masonry.desandro.com/)  
License: [MIT License](https://desandro.mit-license.org/)

- [Colorbox](https://www.jacklmoore.com/colorbox/)  
License: [MIT License](https://opensource.org/license/mit/)

## 6. 参考文献

### 6.1. ドメインの取得～公開

- [Xserver Domain で取得したドメインを使って GitHub Pages で HTTPS に対応したサイトを公開する方法 – ktzwのエンジニアブログ](https://y-ktzw.com/posts/custom-domain/)

### 6.2. GitHub Pages / Jekyll

- [About custom domains and GitHub Pages - GitHub Docs](https://docs.github.com/ja/pages/configuring-a-custom-domain-for-your-github-pages-site/about-custom-domains-and-github-pages)
- [Jekyll • シンプルで、ブログのような、静的サイト | プレーンテキストを静的サイトやブログに変えましょう](http://jekyllrb-ja.github.io/)
    - [Posts（ポスト） | Jekyll • シンプルで、ブログのような、静的サイト](http://jekyllrb-ja.github.io/docs/posts/)
    - [タグフィルタ | Jekyll • シンプルで、ブログのような、静的サイト](http://jekyllrb-ja.github.io/docs/liquid/tags/#linking-to-posts)
    - [オプション設定 | Jekyll • シンプルで、ブログのような、静的サイト](https://jekyllrb-ja.github.io/docs/configuration/options/)
- [Jekyllには投稿予約機能がある＆Jekyllにタイムゾーンを設定 | 為せばnull](https://blog.yotiosoft.com/2022/03/05/Jekyll%E3%81%AB%E3%81%AF%E6%8A%95%E7%A8%BF%E4%BA%88%E7%B4%84%E6%A9%9F%E8%83%BD%E3%81%8C%E3%81%82%E3%82%8B-Jekyll%E3%81%AB%E3%82%BF%E3%82%A4%E3%83%A0%E3%82%BE%E3%83%BC%E3%83%B3%E3%82%92%E8%A8%AD%E5%AE%9A.html)
- [Neos21/neos21.net: Repository of Neo's World](https://github.com/Neos21/neos21.net)

### 6.3. HTML / CSS / JS

- [jQuery最高の教科書｜株式会社シフトブレイン 著](http://jquery.shiftbrain.co.jp/)
- [CSS 最近のWebページやアプリのレイアウトに適した、ラッパーの実装テクニックを徹底解説 | コリス](https://coliss.com/articles/build-websites/operation/css/styling-layout-wrappers-in-css.html)
- [CSSでメディアクエリ(Media Queries)の基本的な書き方、記述の意味を理解し、「何となく使う」を卒業する。 | WEMO](https://wemo.tech/839)
- [【2022年】レスポンシブデザインのブレイクポイントまとめ｜どのデバイスでも綺麗に見える秘訣とは   ｜caroa design magazine](https://caroa.jp/design/article/IuBFNKUn)
- [スクロールバーの出現によるガタつきを防ぐCSS | q-Az](https://q-az.net/appear-scrollbar-problem/)
- [width,heighとpaddingの同時指定によるレイアウト崩れをbox-sizingdで防ぐ - Qiita](https://qiita.com/NeGI1009/items/a738cd96a345a7799e4b)
- [簡単にモーダルウィンドウを実装できるjQueryプラグイン「Colorbox」｜I'll be NET](https://illbenet.jp/view/js-colorbox)
- [TwitterやFacebookで表示されるOGPイメージをGithubPagesで簡単に実装する - Qiita](https://qiita.com/o_ob/items/6c71bc783df428116ef8)
