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
    - [2.3. (v2.0.0 ～) minima テーマへ切り替え](#23-v200--minima-テーマへ切り替え)
- [3. 作業方法メモ](#3-作業方法メモ)
    - [3.1. 環境構築](#31-環境構築)
    - [3.2. ビルド・Web サーバの立ち上げ・表示](#32-ビルドweb-サーバの立ち上げ表示)
- [4. その他メモ](#4-その他メモ)
    - [4.1. 独自ドメインと DNS 設定 (詳細)](#41-独自ドメインと-dns-設定-詳細)
    - [4.2. `_site` ディレクトリをルートとして Web サーバを立てる](#42-_site-ディレクトリをルートとして-web-サーバを立てる)
- [5. 権利表記](#5-権利表記)
- [6. 参考文献](#6-参考文献)
    - [6.1. ドメインの取得～公開](#61-ドメインの取得公開)
    - [6.2. GitHub Pages](#62-github-pages)
    - [6.3. Jekyll](#63-jekyll)
    - [6.4. CSS](#64-css)
    - [6.5. jQuery](#65-jquery)

## 1. 公開まわりの設定

### 1.1. 独自ドメインと DNS 設定

独自ドメイン `kems-clew.net` は 2022-11-11 に [Xserver Domain](https://www.xdomain.ne.jp/) で取得したもの。

GitHub Pages の A レコード 及び AAAA レコードを Xserver Domain の DNS レコード設定に追加し、ドメインに来た通信を GitHub Pages の IP アドレスへ転送している。

設定の詳細は [4.1. 独自ドメインと DNS 設定 (詳細)](#41-独自ドメインと-dns-設定-詳細) を参照。

### 1.2. GitHub Pages でのホスティング

サイトの実体は GitHub Pages でホスティングされている。元の URL は下記。

- [https://kenkenpa198.github.io/kems-clew.net/](https://kenkenpa198.github.io/kems-clew.net/)

`main` ブランチに存在する`/docs` ディレクトリをビルド用ディレクトリとして設定している。

![GitHub Pages の設定](images/githubpages_branch.jpg)


### 1.3. HTTPS 化

SSL 証明書は [Xserver SSL](https://ssl.xdomain.ne.jp/) にて発行。ブランドは `Let's Encrypt` 。

HTTPS での公開は GitHub Pages の `Enforce HTTPS` 機能を使用している。

## 2. 内部構成

### 2.1. Jekyll によるビルド

当サイトは HTML ソースのテンプレート化や [マークダウン記法でのブログ機能](https://kems-clew.net/notes/) を実装している。

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
        <ul class="posts">
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

詳しくは参考文献の Jekyll 関連ページを参照。

### 2.2. 使用ライブラリ

[Works](https://kems-clew.net/works/) ページの画像レイアウト・ライトボックス処理は以下の JavaScript ライブラリを使用している。

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

### 2.3. (v2.0.0 ～) minima テーマへ切り替え

v2.0.0 (2024-02-25 リリース) より minima テーマをベースにした構造へ刷新。

このテーマは GitHub Pages 公式の手順で作成されたテンプレートを使用している。このため内部構造がガラッと変わった。

- `Gemfile` , `Gemfile.lock` など Ruby 関連ファイルの追加。
    - `Gemfile` の中で GitHub Pages がサポートしている Jekyll プラグインを使用するようにしている。

        ```ruby
        gem "github-pages", "~> 231", group: :jekyll_plugins
        ```

- 反映するスタイルシートを `.css` から `.scss` へ刷新。
    - `docs/assets/` へ `main.scss` が配置されている。HTML の `<link>` タグで読み込まれるのはこちら。
    - `docs/minima` へ `minima.scss` を配置する。
        - この中に配置された `minima.scss` がさらに `./minima/_***.scss` の各ファイルをインポートしている。
        - このディレクトリに格納すると、Jekyll 側の仕組みにより `main.scss` 側でのディレクトリ名指定が不要らしい。
    - これによりソースコードがだいぶキレイになった。

- ビルド時の実行コマンドの変更
    - `Gemfile.lock` に記述されたバージョンの Jekyll を使用しなければならないため、ビルド時は次のコマンドを実行する。

        ```shell
        bundle exec jekyll serve
        ```

    - `jekyll serve` では環境にインストールされている Jekyll が使用されてしまう。

- その他、各コンポーネントの切り分けやあしらいの調整など全体的にリファクタリング。

より詳しい再現手順やビルド方法は次のリポジトリを参照すること。

- [kenkenpa198/helloworld-github-pages-with-jekyll](https://github.com/kenkenpa198/helloworld-github-pages-with-jekyll)

## 3. 作業方法メモ

### 3.1. 環境構築

下記を参考に環境構築を行う。

- (~ v1.3.0) [kenkenpa198/tutorial-jekyll](https://github.com/kenkenpa198/tutorial-jekyll) > `2. 環境構築メモ`
- (v2.0.0 ~) [kenkenpa198/helloworld-github-pages-with-jekyll](https://github.com/kenkenpa198/helloworld-github-pages-with-jekyll)

### 3.2. ビルド・Web サーバの立ち上げ・表示

1. `/docs` ディレクトリへ移動する。

    ```shell
    $ cd docs
    ```

2. 下記いずれかの `jekyll` コマンドでカレントディレクトリをルートディレクトリとしてビルドする。

    ```shell
    # サイトをビルドし、_site ディレクトリに出力する
    $ bundle exec jekyll build

    # ビルド後、変更を加える度に再構築を行う。基本はコレ
    # あわせて http://localhost:4000 でローカルサーバが立ち上がる
    $ bundle exec jekyll serve

    # ブログ投稿の下書きを追加してビルドするオプション
    # 下書きは _drafts ディレクトリへ配置する
    $ bundle exec jekyll serve --drafts
    ```

3. `jekyll serve` を使用した場合、以下のように出力される。

    ```shell
    $ bundle exec jekyll serve
    Configuration file: /home/.../kems-clew.net-v2/docs/_config.yml
    To use retry middleware with Faraday v2.0+, install `faraday-retry` gem
                Source: /home/.../kems-clew.net-v2/docs
        Destination: /home/.../kems-clew.net-v2/docs/_site
    Incremental build: disabled. Enable with --incremental
        Generating...
        Jekyll Feed: Generating feed for posts
                        done in 0.81 seconds.
                        Auto-regeneration may not work on some Windows versions.
                        Please see: https://github.com/Microsoft/BashOnWindows/issues/216
                        If it does not work, please upgrade Bash on Windows or run Jekyll with --no-watch.
    Auto-regeneration: enabled for '/home/.../kems-clew.net-v2/docs'
        Server address: http://127.0.0.1:4000/
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
    ├── index.html
    ├── notes.html
    └── works.html
    ```

5. `Server address:` に表示されているローカルホストアドレス ([http://127.0.0.1:4000/](http://127.0.0.1:4000/)) へブラウザでアクセスする。
6. `/docs/_site` に配置された `index.html` が表示される。
7. `/docs` 配下のソースファイルを上書き保存すると、自動で再ビルドされる。

## 4. その他メモ

### 4.1. 独自ドメインと DNS 設定 (詳細)

2022-11-11 当時、ドメインの取得後に Xserver Domain で対応した設定。

GitHub Pages の A レコード 及び AAAA レコードを Xserver Domain の DNS レコード設定に追加する。

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
実際の XServer Domain > `DNSレコード設定` 画面上でもこの内容で設定している [^1] 。

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

これにより、ドメインに来た通信が GitHub Pages の IP アドレスへ転送される。

設定後 `nslookup` コマンドで確認。

```shell
$ nslookup kems-clew.net
Server:         192.168.3.1
Address:        192.168.3.1#53

Non-authoritative answer:
Name:   kems-clew.net
Address: 185.199.109.153
Name:   kems-clew.net
Address: 185.199.108.153
Name:   kems-clew.net
Address: 185.199.110.153
Name:   kems-clew.net
Address: 185.199.111.153
Name:   kems-clew.net
Address: 2606:50c0:8002::153
Name:   kems-clew.net
Address: 2606:50c0:8001::153
Name:   kems-clew.net
Address: 2606:50c0:8003::153
Name:   kems-clew.net
Address: 2606:50c0:8000::153
```

```shell
$ nslookup www.kems-clew.net
Server:         192.168.3.1
Address:        192.168.3.1#53

Non-authoritative answer:
www.kems-clew.net       canonical name = kenkenpa198.github.io.
Name:   kenkenpa198.github.io
Address: 185.199.108.153
Name:   kenkenpa198.github.io
Address: 185.199.109.153
Name:   kenkenpa198.github.io
Address: 185.199.110.153
Name:   kenkenpa198.github.io
Address: 185.199.111.153
Name:   kenkenpa198.github.io
Address: 2606:50c0:8000::153
Name:   kenkenpa198.github.io
Address: 2606:50c0:8001::153
Name:   kenkenpa198.github.io
Address: 2606:50c0:8003::153
Name:   kenkenpa198.github.io
Address: 2606:50c0:8002::153
```

### 4.2. `_site` ディレクトリをルートとして Web サーバを立てる

`_site` ディレクトリをルートとして別の Web サーバを立てることもできる。  
この場合、Jekyll を使用せずに作成した通常のウェブサイトのように扱うことができる。

WSL で開発を行う場合、スマートフォンなどの外部端末で表示確認をする際の代替手段となる (※) 。

例えば VS Code の拡張機能「Live Server」の場合、下記の手順になる。

1. [3.2. ビルド・Web サーバの立ち上げ・表示](#32-ビルドweb-サーバの立ち上げ表示) の工程 2 まで進め、`_site` ディレクトリと配下のファイルをビルドする。
2. **Windows 環境側で** 新規の VS Code を開く。[WSL 拡張機能](https://learn.microsoft.com/ja-jp/windows/wsl/tutorials/wsl-vscode#install-vs-code-and-the-wsl-extension) は使用しない。
    1. 例)

        ```shell
        # WSL 側で _site が次の場所の場合……
        $ pwd
        /home/.../kems-clew.net/docs/_site
        ```

        ```shell
        # Win 側では次の場所を VS Code で開く。
        PS > pwd

        Path
        ----
        Microsoft.PowerShell.Core\FileSystem::\\wsl.localhost\Ubuntu\home\...\kems-clew.net\docs\_site
        ```

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

- [Jekyll Codex](https://jekyllcodex.org/)  
About: [About Jekyll Codex | Jekyll Codex](https://jekyllcodex.org/about/)

## 6. 参考文献

### 6.1. ドメインの取得～公開

- [Xserver Domain で取得したドメインを使って GitHub Pages で HTTPS に対応したサイトを公開する方法 – ktzwのエンジニアブログ](https://y-ktzw.com/posts/custom-domain/)

### 6.2. GitHub Pages

- [GitHub Pages のドキュメント - GitHub Docs](https://docs.github.com/ja/pages)
    - [Jekyll を使用して GitHub Pages サイトを作成する - GitHub Docs](https://docs.github.com/ja/pages/setting-up-a-github-pages-site-with-jekyll/creating-a-github-pages-site-with-jekyll)
    - [カスタムドメインとGitHub Pagesについて - GitHub Docs](https://docs.github.com/ja/pages/configuring-a-custom-domain-for-your-github-pages-site/about-custom-domains-and-github-pages)
- [TwitterやFacebookで表示されるOGPイメージをGithubPagesで簡単に実装する - Qiita](https://qiita.com/o_ob/items/6c71bc783df428116ef8)

### 6.3. Jekyll

- [Jekyllには投稿予約機能がある＆Jekyllにタイムゾーンを設定 | 為せばnull](https://blog.yotiosoft.com/2022/03/05/Jekyll%E3%81%AB%E3%81%AF%E6%8A%95%E7%A8%BF%E4%BA%88%E7%B4%84%E6%A9%9F%E8%83%BD%E3%81%8C%E3%81%82%E3%82%8B-Jekyll%E3%81%AB%E3%82%BF%E3%82%A4%E3%83%A0%E3%82%BE%E3%83%BC%E3%83%B3%E3%82%92%E8%A8%AD%E5%AE%9A.html)
- [Neos21/neos21.net: Repository of Neo's World](https://github.com/Neos21/neos21.net)
- [JekyllのCategories一覧をアルファベット順にする](https://haltaro.github.io/2018/04/15/sort-categories)
- [Jekyllのテーマを自作する 基本編 - 第4回 - Sass（CSS）でスタイルを作成する | e-joint.jp](https://e-joint.jp/blog/359#su-toc-item-0)

### 6.4. CSS

- [CSS 最近のWebページやアプリのレイアウトに適した、ラッパーの実装テクニックを徹底解説 | コリス](https://coliss.com/articles/build-websites/operation/css/styling-layout-wrappers-in-css.html)
- [CSSでメディアクエリ(Media Queries)の基本的な書き方、記述の意味を理解し、「何となく使う」を卒業する。 | WEMO](https://wemo.tech/839)
- [【2022年】レスポンシブデザインのブレイクポイントまとめ｜どのデバイスでも綺麗に見える秘訣とは   ｜caroa design magazine](https://caroa.jp/design/article/IuBFNKUn)
- [スクロールバーの出現によるガタつきを防ぐCSS | q-Az](https://q-az.net/appear-scrollbar-problem/)
- [width,heighとpaddingの同時指定によるレイアウト崩れをbox-sizingdで防ぐ - Qiita](https://qiita.com/NeGI1009/items/a738cd96a345a7799e4b)
- [【CSS】display:flexでmax-widthが効かない時の対処法。calcやflex-basisの活用 \#CSS - Qiita](https://qiita.com/shizen-shin/items/dc8d096300cde63dc8a8)
- [Flexbox からコンテンツはみ出る問題を完全に解決する \#CSS - Qiita](https://qiita.com/mpyw/items/dfc63c1fed5dfc5eda26)

### 6.5. jQuery

- [jQuery最高の教科書｜株式会社シフトブレイン 著](http://jquery.shiftbrain.co.jp/)
- [簡単にモーダルウィンドウを実装できるjQueryプラグイン「Colorbox」｜I'll be NET](https://illbenet.jp/view/js-colorbox)
