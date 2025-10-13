---
layout: post
page-category: note
title: 便利スニペット集
description: ""
preview: ""
category: 情報技術
tags:
  - excel
  - docker
  - git
  - laravel
  - linux
  - regexp
  - windows
  - vscode
date: 2024-01-13
lastmod: 2025-10-13
---

自分用便利スニペット集。

- 公私でよく使用するスニペットやコマンド、作業手順などをウェブから参照できるようにしたもの。
- 思いついたら適宜追加していく。
- 参考にする際は自己責任で！

<!-- omit in toc -->
## テンプレート

- タイトル

  ```c
  // コード
  ```

    - 参考文献・出典

## 1. 記号

- 全角スペース

  ```c
  　
  ```

- タブ文字

  ```c
  [	]
  ```

  ※ `[` `]` の中をコピーする。

## 2. 正規表現

### 2.1. 早見表

- [正規表現サンプル集](https://www.megasoft.co.jp/mifes/seiki/meta.html)
- [正規表現：メタ文字（特殊文字）の一覧 \| WWWクリエイターズ](https://www-creators.com/archives/2612)
- [正規表現構文早見表 - JavaScript \| MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide/Regular_expressions/Cheatsheet)

### 2.2. 記号・制御文字

- 半角スペース OR 全角スペース OR タブ文字

  ```c
   |　|\t
  ```

- 改行コード (LF / CRLF / CR)

  ```c
  \n|\r\n|\r
  ```

    - [正規表現：改行コードの表現方法。置換による削除 \| WWWクリエイターズ](https://www-creators.com/archives/2551)

### 2.3. URL

- 完全一致 (行頭 ～ 行末)

  ```c
  ^(http|https):\/\/[-\w\.]+(:\d+)?(\/[^\s]*)?$
  ```

- 部分一致

  ```c
  (http|https):\/\/[-\w\.]+(:\d+)?(\/[^\s]*)?
  ```

    - [とほほの正規表現入門 - とほほのWWW入門](https://www.tohoho-web.com/ex/regexp.html)
    - [正規表現 - とほほのWWW入門](https://www.tohoho-web.com/perl/regexp.htm)

### 2.4. その他

- 先読みアサーション

  ```c
  X(?=Y)
  ```

  パターン X に対してパターン Y が続く場合のみ X がマッチする。

  ```c
  // 例えば次の場合……
  .+(?=@)

  // 'local' にのみマッチする ('@' にはマッチしない)
  local@example.com
  ^^^^^
  ```

    - [正規表現構文早見表 - JavaScript \| MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide/Regular_expressions/Cheatsheet#%E3%81%9D%E3%81%AE%E4%BB%96%E3%81%AE%E3%82%A2%E3%82%B5%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3)
    - [正規表現のマッチングをどこからでも―「境界アサーション」と「ルックアラウンドアサーション」：ECMAScriptで学ぶ正規表現（7） - ＠IT](https://atmarkit.itmedia.co.jp/ait/articles/2207/15/news002.html)

- 金額をカンマ区切りへ変換

  ```c
  (?<=\d)(?=(\d{3})+(?!\d)
  ```

  ```c
  // マッチした箇所を ',' へ置換
  1234567890
  12345678901
  123456789012
  1234567890123

  // 結果
  1,234,567,890
  12,345,678,901
  123,456,789,012
  1,234,567,890,123
  ```

    - [正規表現のマッチングをどこからでも―「境界アサーション」と「ルックアラウンドアサーション」：ECMAScriptで学ぶ正規表現（7） - ＠IT](https://atmarkit.itmedia.co.jp/ait/articles/2207/15/news002.html)

## 3. Linux

### 3.1. バージョンを確認する

- `issue` で確認する

  ```shell
  cat /etc/issue
  ```

  ```shell
  # e.g.
  $ cat /etc/issue
  Ubuntu 22.04.4 LTS \n \l
  ```

- `os-release` で確認する

  ```shell
  cat /etc/os-release
  ```

  ```shell
  # e.g.
  $ cat /etc/os-release
  PRETTY_NAME="Ubuntu 22.04.4 LTS"
  NAME="Ubuntu"
  VERSION_ID="22.04"
  VERSION="22.04.4 LTS (Jammy Jellyfish)"
  VERSION_CODENAME=jammy
  ID=ubuntu
  ID_LIKE=debian
  HOME_URL="https://www.ubuntu.com/"
  SUPPORT_URL="https://help.ubuntu.com/"
  BUG_REPORT_URL="https://bugs.launchpad.net/ubuntu/"
  PRIVACY_POLICY_URL="https://www.ubuntu.com/legal/terms-and-policies/privacy-policy"
  UBUNTU_CODENAME=jammy
  ```

- `lsb_release` コマンドで確認する

  ```shell
  lsb_release -a
  ```

  ```shell
  # e.g.
  $ lsb_release -a
  No LSB modules are available.
  Distributor ID: Ubuntu
  Description:    Ubuntu 22.04.4 LTS
  Release:        22.04
  Codename:       jammy
  ```

    - [lsb_release – ディストリビューションのバージョン情報の確認 \| Linuxコマンド.NET](https://linuxcommand.net/lsb_release/)
    - [Windows11 + WSL で Ubuntu 環境を構築するずんだもん - YouTube](https://www.youtube.com/watch?v=odDJ3QvlF2g)

- `neofetch` コマンドで確認する

  ```shell
  neofetch
  ```

  ```shell
  # e.g.
  $ sudo apt-get update
  $ sudo apt-get install -y neofetch
  $ neofetch
  ```

  ![neofetch]({{ baseurl | append: "/assets/notes/2024-01-13-my-snippets/neofetch.png" | relative_url }})

### 3.2. alias

- alias 一覧 ([kem198/dotfiles > alias.zsh](https://github.com/kem198/dotfiles/blob/main/zsh/rc/alias.zsh))

  ```shell
  alias
  ```

### 3.3. apt / apt-get

- 利用可能なパッケージ一覧を更新する

  ```shell
  sudo apt update
  ```

  ```shell
  sudo apt-get update
  ```

- 環境のパッケージを更新する

  ```shell
  sudo apt upgrade -y
  ```

  ```shell
  sudo apt-get upgrade -y
  ```

- 必要なくなったパッケージを削除する

  ```shell
  sudo apt autoremove -y
  ```

  ```shell
  sudo apt-get autoremove -y
  ```

- 不要なキャッシュファイルを削除する

  ```shell
  sudo apt autoclean -y
  ```

  ```shell
  sudo apt-get autoclean -y
  ```

    - [Ubuntu 20.04 LTS を 22.04 LTS にアップグレードする - Uzabase for Engineers](https://tech.uzabase.com/entry/2022/10/05/163458)

### 3.4. chown

- 配下のファイルとディレクトリの所有者とグループをホストのユーザーへ変更する

  ```shell
  sudo chown -R $USER:$USER .
  ```

    - [man chown (1): ファイルの所有者とグループを変更する](https://ja.manpages.org/chown)
    - [WSL2でDockerを使用する際の権限問題を解決するシンプルな方法（docker-compose.yml使用） #Docker - Qiita](https://qiita.com/twu_go/items/a449e3006bd74fc7d10d)
    - [Linuxのユーザーとグループって何だろう？：“応用力”をつけるためのLinux再入門（10）（1/2 ページ） - ＠IT](https://atmarkit.itmedia.co.jp/ait/articles/1706/02/news014.html)

### 3.5. curl

#### 3.5.1. HTTP Requests

- GET ( `GET /items` )

    ```shell
    curl -L -X GET 'http://localhost:8080/items' | jq
    ```

- GET ( `GET /items/{itemId}` )

    ```shell
    curl -L -X GET 'http://localhost:8080/items/1' | jq
    ```

- POST ( `POST /items` )

    ```shell
    curl -L -X POST 'http://localhost:8080/items' \
    -H 'Content-Type: application/json' \
    -d '{"itemName": "Candy", "itemCategory": "Food"}' \
    | jq
    ```

- PUT ( `PUT /items/{itemId}` )

    ```shell
    curl -L -X PUT 'http://localhost:8080/items/1' \
    -H 'Content-Type: application/json' \
    -d '{"itemName": "Candy", "itemCategory": "Food"}' \
    | jq
    ```

- DELETE ( `DELETE /items/{itemId}` )

    ```shell
    curl -L -X DELETE 'http://localhost:8080/items/1' | jq
    ```

### 3.6. grep

- 指定ファイル内を検索する (行番号付き)

  ```shell
  grep -n [キーワード] [ファイル名]
  ```

  ```shell
  # e.g.
  $ pwd
  /.../kems-clew.net
  $ grep -n キーワード ./docs/_posts/2024-01-13-my-snippets.md
  166:  grep -n [キーワード] [ファイル名]
  172:  $ grep -n キーワード ./2024-01-13-my-snippets.md
  # ...
  ```

- 指定ディレクトリ配下でヒットしたファイル名のリストを出力する

  ```shell
  grep -rlI [キーワード] [起点となるディレクトリパス]
  ```

  ```shell
  # e.g.
  $ grep -rlI キーワード ./docs/
  ./docs/_posts/2023-01-02-inbox-zero.md
  ./docs/_posts/2024-01-13-my-snippets.md
  ./docs/_site/feed.xml
  # ...
  ```

- 指定ディレクトリ配下でヒットしたファイル名と行のリストを出力する

  ```shell
  grep -rnI [キーワード] [起点となるディレクトリパス + /*]
  ```

  ```shell
  # e.g.
  $ grep -rnI キーワード ./docs/
  ./docs/_posts/2023-01-02-inbox-zero.md:58:    |               | 検索キーワード          | セクション名（省略可） |
  ./docs/_posts/2023-01-02-inbox-zero.md:101:    - どうにもよくわからなかったので、自分の設定では検索キーワードとセクション名を設定するように しています。
  ./docs/_posts/2024-01-13-my-snippets.md:166:  grep -n [キーワード] [ファイル名]
  # ...
  ```

    - [man grep (1): パターンにマッチする行を表示する](https://ja.manpages.org/grep#)

### 3.7. seq

- 指定範囲の数値をゼロ埋めで出力

  ```shell
  seq -w 1 100
  ```

- 桁数を指定する場合

  ```shell
  seq -f %04g 30
  ```

### 3.8. split

- CSV ファイルを 100 行単位で分割する

    ```shell
    mkdir -p split && \
    split -l 100 -d --additional-suffix=.csv ./filename.csv split/filename
    ```

### 3.9. ssh

- SSH 接続

  ```shell
  ssh {ユーザー名}@{接続先の IP アドレス} -p {ポート番号}
  ```

## 4. Windows PowerShell

### 4.1. OS 情報を表示する

- Get-WmiObject コマンドで確認する

  ```powershell
  Get-WmiObject Win32_OperatingSystem
  ```

  ```powershell
  # e.g.
  PS > Get-WmiObject Win32_OperatingSystem


  SystemDirectory : C:\WINDOWS\system32
  Organization    :
  BuildNumber     : 22631
  RegisteredUser  : kem198
  SerialNumber    : *****-*****-*****-*****
  Version         : 10.0.22631
  ```

- systeminfo コマンドで確認する

  ```powershell
  systeminfo
  ```

  ```powershell
  # e.g.
  PS > systeminfo

  ホスト名:               KEM-VELOX
  OS 名:                  Microsoft Windows 11 Home
  OS バージョン:          10.0.22631 N/A ビルド 22631
  OS 製造元:              Microsoft Corporation
  OS 構成:                スタンドアロン ワークステーション
  # ...
  # BIOS や物理メモリ、ネットワーク情報など
  ```

### 4.2. OS のバージョン情報を表示する

- レジストリから取得する

  ```powershell
  (Get-ItemProperty -Path 'HKLM:\SOFTWARE\Microsoft\Windows NT\CurrentVersion' -Name 'DisplayVersion').DisplayVersion
  ```

  ```powershell
  (Get-ItemProperty -Path 'HKLM:\SOFTWARE\Microsoft\Windows NT\CurrentVersion' -Name 'BuildLabEx').BuildLabEx
  ```

  ```powershell
  # e.g.
  PS > (Get-ItemProperty -Path 'HKLM:\SOFTWARE\Microsoft\Windows NT\CurrentVersion' -Name 'DisplayVersion').DisplayVersion
  23H2

  PS > (Get-ItemProperty -Path 'HKLM:\SOFTWARE\Microsoft\Windows NT\CurrentVersion' -Name 'BuildLabEx').BuildLabEx
  22621.1.amd64fre.ni_release.220506-1250
  ```

- systeminfo コマンドの実行結果を絞り込む

  ```powershell
  (systeminfo | ?{$_.Contains("OS")})[0,1];
  ```

  ```powershell
  # e.g.
  PS > (systeminfo | ?{$_.Contains("OS")})[0,1];
  OS 名:                  Microsoft Windows 11 Home
  OS バージョン:          10.0.22631 N/A ビルド 22631
  ```

    - [PowerShellシステム要件、バージョン情報メモ \#Windows10 - Qiita](https://qiita.com/e4rfx/items/e370ba343a3c3841b646)

- cmd の ver コマンドを利用する

  ```powershell
  cmd /C ver
  ```

  ```powershell
  # e.g.
  PS > cmd /C ver

  Microsoft Windows [Version 10.0.22631.3527]
  ```

    - [Windows のバージョンを表示する \| Operations Lab.](https://operationslab.wordpress.com/2013/03/10/windows-のバージョンを表示する/)

### 4.3. WSL

- WSL のバージョン情報を表示する

  ```powershell
  wsl --version
  ```

  ```powershell
  # e.g.
  PS > wsl -v
  WSL バージョン: 2.0.14.0
  カーネル バージョン: 5.15.133.1-1
  WSLg バージョン: 1.0.59
  MSRDC バージョン: 1.2.4677
  Direct3D バージョン: 1.611.1-81528511
  DXCore バージョン: 10.0.25131.1002-220531-1700.rs-onecore-base2-hyp
  Windows バージョン: 10.0.22631.3235
  ```

- ディストリビューション一覧と詳細情報を表示する

  ```powershell
  wsl -l -v
  ```

  ```powershell
  # e.g.
  PS > wsl -l -v
    NAME                   STATE           VERSION
  * Ubuntu                 Running         2
    Arch                   Running         2
    docker-desktop         Stopped         2
    docker-desktop-data    Stopped         2
  ```

## 5. Git

- ⚠️: 対象コミットの歴史を改変する操作。
    - **リモートブランチへプッシュ済みの場合、無断で行わないこと** 。

### 5.1. remote

- リモートリポジトリを登録する

  ```shell
  git remote add origin https://github.com/kem198/dotfiles
  ```

- リモートリポジトリの URL を変更する

  ```shell
  git remote set-url origin git@github.com:kem198/dotfiles.git
  ```

- リモートリポジトリの確認

  ```shell
  git remote -v
  ```

  ```shell
  # e.g.
  $ git remote -v
  origin  git@github.com:kem198/dotfiles.git (fetch)
  origin  git@github.com:kem198/dotfiles.git (push)
  ```

### 5.2. ⚠️Git の操作を取り消す

```shell
# 1. git reflog で操作履歴を出力する
$ git reflog
02f11b7 HEAD@{0}: reset: moving to 02f11b7                               # 現在のコミット (HEAD)
0488e28 HEAD@{1}: merge develop: Merge made by the 'recursive' strategy. # 1 つ前のコミット
...

# 2. 戻りたいコミットを指定して git reset する
# 「1 つ前」に戻す場合は「HEAD@{n}」へ 1 を指定する
# ディレクトリの内容が書き換わるので注意
$ git reset --hard HEAD@{1}

# コミットのハッシュを指定してもよい
$ git reset --hard 0488e28

# ステージング状態へ戻す場合は --soft を指定する
$ git reset --soft HEAD@{1}
```

参考文献:

- [Git - リセットコマンド詳説](https://git-scm.com/book/ja/v2/Git-%E3%81%AE%E3%81%95%E3%81%BE%E3%81%96%E3%81%BE%E3%81%AA%E3%83%84%E3%83%BC%E3%83%AB-%E3%83%AA%E3%82%BB%E3%83%83%E3%83%88%E3%82%B3%E3%83%9E%E3%83%B3%E3%83%89%E8%A9%B3%E8%AA%AC)
- [第6話 git reset 3種類をどこよりもわかりやすい図解で解説！【連載】マンガでわかるGit ～コマンド編～ - itstaffing エンジニアスタイル](https://www.r-staffing.co.jp/engineer/entry/20191129_1)
- [第7話 間違えて reset しちゃった？git reflogで元どおり【連載】マンガでわかるGit ～コマンド編～ - itstaffing エンジニアスタイル](https://www.r-staffing.co.jp/engineer/entry/20191227_1)

### 5.3. ⚠️コミットを統合する

(1) のコミットを (2) へ統合する場合の対応手順。

```shell
$ gll
* dc80a8f 2024-01-13 11:33:09 (HEAD -> main) wip by"kem198"                   # (1)
* 07e84cc 2024-01-13 11:27:11 [add]add note 2024-01-13-my-snippets by"kem198" # (2)
```

```shell
# 1. リベースを開始する
$ git rebase -i HEAD~~
```

```shell
# 2. リベース指示書を編集する
# 統合するコミットを f へ書き換えて保存する
# f は統合を指示する指定
pick 07e84cc [add]add note 2024-01-13-my-snippets
f dc80a8f wip                                     # pick から f へ変更

# Rebase d3937fb..dc80a8f onto d3937fb (2 commands)
#
# Commands:
# p, pick <commit> = use commit
# ...
# f, fixup <commit> = like "squash", but discard this commit's log message
# ...
```

```shell
# 3. ファイルを保存後、Successfully ... と表示されたことを確認する
$ git rebase -i HEAD~~                            # 1. で実行したコマンド
Successfully rebased and updated refs/heads/main. # 返った結果

# 4. コミットログとファイル内容を確認する
$ gll
* 8ed7b8a 2024-01-13 10:57:20 (HEAD -> main) [add]add note 2024-01-13-my-snippets by"kem198"
...
```

参考文献:

- [5. rebase -i でコミットをまとめる｜サル先生のGit入門【プロジェクト管理ツールBacklog】](https://backlog.com/ja/git-tutorial/stepup/32/)

※ 実行しているコマンド `$ gll` は [git log のエイリアス](https://github.com/kem198/dotfiles/blob/fe695c145ec1c6b35849622cc3b26703d0ef5700/zsh/rc/alias.zsh#L100) 。

### 5.4. キャッシュを削除する

[kem198/dotfiles](https://github.com/kem198/dotfiles?tab=readme-ov-file#git-%E3%81%AE%E3%82%AD%E3%83%A3%E3%83%83%E3%82%B7%E3%83%A5%E5%89%8A%E9%99%A4%E6%89%8B%E9%A0%86) にも記載しているもの。

- グローバルな除外設定 (`.gitignore_global` など) を設定する前にコミットをしてしまった。
- 過去に追跡対象としてコミットしたファイルを `.gitignore` の追跡対象外へ追加する。
- `.gitignore` を整理したので追跡対象の設定が問題ないか確認したい。

これらに該当する場合は Git のキャッシュ削除が必要になる。

```shell
# 1. cd
cd fuga

# 2. Git のキャッシュをすべてのファイルから削除する
git rm --cached -r .

# 3. 全てのファイルをステージングする
git add -vA

# 4. コミット対象のファイルが変更を加えたファイルのみであるか確認する
git status -s

# 5. コミットする
git commit -m 'commit comments'
```

参考文献:

- [.gitignoreに記載したのに反映されない件 #Git - Qiita](https://qiita.com/fuwamaki/items/3ed021163e50beab7154)
- [Git - git-rm Documentation](https://git-scm.com/docs/git-rm)
    - [-r](https://git-scm.com/docs/git-rm#Documentation/git-rm.txt--r)
    - [--cached](https://git-scm.com/docs/git-rm#Documentation/git-rm.txt---cached)
- [git-rm – Git コマンドリファレンス（日本語版）](https://tracpath.com/docs/git-rm/)

## 6. Docker

```shell
$ docker --version
Docker version 25.0.2, build 29cf629
```

- Docker へログインする

  ```shell
  docker login
  ```

- 指定した Docker イメージをプルする

  ```shell
  docker pull [OPTIONS] NAME[:TAG|@DIGEST]
  ```

### 6.1. Compose

#### 6.1.1. build

- サービスをビルドする

  ```shell
  docker compose build [OPTIONS] [SERVICE...]
  ```

  ```shell
  # e.g.
  # --no-cache: Do not use cache when building the image
  $ docker compose build --no-cache
  [+] Building 44.1s (6/9)
  ...
  [+] Building 62.5s (10/10) FINISHED
  ```

#### 6.1.2. up

- サービスを起動する

  ```shell
  docker compose up [OPTIONS] [SERVICE...]
  ```

  ```shell
  # e.g.
  $ docker compose up
  [+] Running 9/9
  ...
  db-1    | The files belonging to this database system will be owned by user "postgres".
  ...
  main-1  | ====================================
  main-1  |            discordbot-mdn
  main-1  | ====================================
  ```

  ```shell
  # e.g. バックグラウンドで起動する
  # -d, --detach: Detached mode: Run containers in the background
  $ docker compose up -d
  [+] Running 2/2
  ✔ Container discordbot-mdn-main-1  Started        0.0s
  ✔ Container discordbot-mdn-db-1    Started        0.0s
  ```

  ```shell
  # e.g. イメージをビルドしてから起動する
  # --build: Build images before starting containers.
  $ docker compose up -d --build
  [+] Building 1.5s (10/10) FINISHED                          docker:default
  => [main internal] load build definition from Dockerfile    0.0s
  [+] Running 2/0
  ✔ Container discordbot-mdn-db-1    Running                 0.0s
  ✔ Container discordbot-mdn-main-1  Running                 0.0s
  ```

#### 6.1.3. ls

- サービスを一覧表示する

  ```shell
  docker compose ls [OPTIONS]
  ```

  ```shell
  # e.g. 起動中のサービスを表示する
  $ docker compose ls
  NAME                STATUS              CONFIG FILES
  wasbook-docker      running(5)          /.../wasbook-docker/docker-compose.yml
  ```

  ```shell
  # e.g. 停止中のサービスも表示する
  $ docker compose ls -a
  NAME                STATUS              CONFIG FILES
  discordbot-mdn      exited(2)           /.../discordbot-mdn/docker-compose.yml
  wasbook-docker      running(5)          /.../wasbook-docker/docker-compose.yml
  ```

#### 6.1.4. stop

- サービスを停止する

  ```shell
  docker compose stop [OPTIONS] [SERVICE...]
  ```

  ```shell
  # e.g.
  $ docker compose stop
  [+] Stopping 2/2
  ✔ Container discordbot-mdn-main-1  Stopped        10.3s
  ✔ Container discordbot-mdn-db-1    Stopped         0.3s
  ```

#### 6.1.5. logs

- サービスのログを表示する

  ```shell
  docker compose logs [OPTIONS] [SERVICE...]
  ```

  ```shell
  # e.g.
  # -f, --follow: Follow log output.
  $ docker compose logs -f
  main-1  | ====================================
  main-1  |            discordbot-mdn
  main-1  | ====================================
  main-1  | 2024-02-18 16:32:59.847807
  ...
  ```

#### 6.1.6. exec

- サービス内でアプリケーションを実行する

  ```shell
  docker compose exec [OPTIONS] SERVICE COMMAND [ARGS...]
  ```

  ```shell
  # e.g. アプリ内で Bash を実行する
  # 1. Find SERVICE name
  $ cat docker-compose.yml
  version: "3.7"
  services:
    ...
    main:      # SERVICE name
      build: .
      ...

  # 2. exec with bash
  $ docker compose exec discordbot-mdn-main-1 bash
  service "discordbot-mdn-main-1" is not running
  ```

  ```shell
  # e.g. Postgres DB へログインする
  # database   : Service name
  # -U         : Use username (postgres)
  $ docker compose exec database psql -U postgres
  psql (11.22)
  Type "help" for help.

  postgres=#
  ```

#### 6.1.7. down

- サービスを削除する

  ```shell
  docker compose down [OPTIONS] [SERVICES]
  ```

  ```shell
  # e.g.
  $ docker compose down
  [+] Running 3/3
  ✔ Container discordbot-mdn-db-1    Removed         0.3s
  ✔ Container discordbot-mdn-main-1  Removed        10.4s
  ✔ Network discordbot-mdn_default   Removed         0.2s
  ```

  ```shell
  # e.g. イメージもすべて削除する
  # --rmi string: Remove images used by services. "local" remove only images that don't have a custom tag ("local"|"all")
  $ docker-compose down --rmi all
  [+] Running 2/2
  ✔ Image postgres:14.5-alpine3.16    Removed        0.1s
  ✔ Image discordbot-mdn-main:latest  Removed        0.1s
  ```

  ```shell
  # e.g. ボリュームも削除する
  # -v, --volumes: Remove named volumes declared in the "volumes" section of the Compose file and anonymous volumes attached to containers.
  $ docker-compose down --rmi all --volumes
  [+] Running 2/2
  ✔ Image postgres:14.5-alpine3.16    Removed        0.1s
  ✔ Image discordbot-mdn-main:latest  Removed        0.1s
  ```

### 6.2. Container

#### 6.2.1. ls

- Docker コンテナを一覧表示する

  ```shell
  docker container ls [OPTIONS]
  ```

  ```shell
  # e.g. 起動中のコンテナを表示する
  # docker ps と同義
  $ docker container ls
  CONTAINER ID   IMAGE                   COMMAND                  CREATED       STATUS         PORTS                               NAMES
  af2574bc26e3   wasbook-docker-nginx    "/docker-entrypoint.…"   4 weeks ago   Up 2 minutes   80/tcp                              wasbook-docker-nginx-1
  # ...
  ```

  ```shell
  # e.g. 停止中のコンテナもすべて表示する
  # docker ps -a と同義
  $ docker container ls -a
  CONTAINER ID   IMAGE                      COMMAND                  CREATED              STATUS                            PORTS                               NAMES
  7cea32a40911   postgres:14.5-alpine3.16   "docker-entrypoint.s…"   About a minute ago   Exited (0) About a minute ago                                         discordbot-mdn-db-1
  # ...
  af2574bc26e3   wasbook-docker-nginx       "/docker-entrypoint.…"   4 weeks ago          Up 2 minutes                      80/tcp                              wasbook-docker-nginx-1
  # ...
  ```

#### 6.2.2. stop

- Docker コンテナを停止する

  ```shell
  docker container stop [OPTIONS] CONTAINER [CONTAINER...]
  ```

  ```shell
  # e.g.
  $ docker container rm discordbot-mdn-db-1
  discordbot-mdn-db-1
  ```

#### 6.2.3. rm

- Docker コンテナを削除する

  ```shell
  docker container rm [OPTIONS] CONTAINER [CONTAINER...]
  ```

  ```shell
  # e.g.
  $ docker container rm discordbot-mdn-db-1
  discordbot-mdn-db-1
  ```

### 6.3. Image

#### 6.3.1. ls

- Docker イメージを一覧表示する

  ```shell
  docker image ls
  ```

  ```shell
  # e.g.
  # docker images と同義
  $ docker image ls
  REPOSITORY   TAG         IMAGE ID       CREATED        SIZE
  docker-app   latest      25102b30807f   3 weeks ago    496MB
  postgres     11-alpine   10d7fb41183a   2 months ago   232MB
  ```

#### 6.3.2. rm

- Docker イメージを削除する

  ```shell
  docker image rm [OPTIONS] IMAGE [IMAGE...]
  ```

  ```shell
  # e.g.
  # docker rmi と同義
  $ docker image rm postgres:14.5-alpine3.16
  Untagged: postgres:14.5-alpine3.16
  Untagged: postgres@sha256:ac09c433f64f2d310a83e5cc24dadc13561f645199d4ec8e503824de22e14668
  Deleted: sha256:aac01494762a1319624f6117a3d9d374540ec58095c2c9f84adb92619aec3b6e
  # ...
  ```

#### 6.3.3. prune

- `<none>` イメージを一括削除する

  ```shell
  docker image prune -f
  ```

    - [docker imagesに表示される＜none＞を消す。dangling \| codechord](https://codechord.com/2019/08/docker-images-none-dangling/)

### 6.4. Volume

#### 6.4.1. ls

- ボリューム一覧を表示する

  ```shell
  docker volume ls [OPTIONS]
  ```

  ```shell
  # e.g.
  $ docker volume ls
  DRIVER    VOLUME NAME
  local     discordbot-mdn_db-volume
  ```

#### 6.4.2. rm

- ボリュームを削除する

  ```shell
  docker volume rm [OPTIONS] VOLUME [VOLUME...]
  ```

  ```shell
  $ docker volume rm discordbot-mdn_db-volume
  discordbot-mdn_db-volume

  $ docker volume ls
  DRIVER    VOLUME NAME
  ```

## 7. Laravel

```shell
$ php --version
PHP 7.3.33 (cli) (built: Mar 18 2022 03:18:11) ( NTS )
Copyright (c) 1997-2018 The PHP Group
Zend Engine v3.3.33, Copyright (c) 1998-2018 Zend Technologies
$ php artisan --version
Laravel Framework 8.83.27
$ composer --version
Composer version 2.6.6 2023-12-08 18:32:26
```

### 7.1. Composer

- `composer.json` を使用してライブラリをインストールする

  ```shell
  composer install
  ```

    - [Command-line interface / Commands - Composer](https://getcomposer.org/doc/03-cli.md#install-i)

- オートローダーを更新する

  ```shell
  composer dump-autoload
  ```

    - [Command-line interface / Commands - Composer](https://getcomposer.org/doc/03-cli.md#dump-autoload-dumpautoload)

### 7.2. Artisan

#### 7.2.1. db

- シーダーを実行する

  ```shell
  php artisan db:seed [options] [--] [<class>]
  ```

  ```shell
  # e.g.
  $ composer dump-autoload
  $ php artisan db:seed --class=FoldersTableSeeder
  Database seeding completed successfully.

  # Check Database
  $ exit
  $ docker compose exec database bash
  37ccc2e57c0a:/# psql -U postgres
  psql (11.22)
  Type "help" for help.

  postgres=# select * from folders;
   id |    title     |     created_at      |     updated_at
  ----+--------------+---------------------+---------------------
    1 | プライベート | 2024-01-21 12:24:51 | 2024-01-21 12:24:51
    2 | 仕事         | 2024-01-21 12:24:51 | 2024-01-21 12:24:51
    3 | 旅行         | 2024-01-21 12:24:51 | 2024-01-21 12:24:51
  (3 rows)
  ```

#### 7.2.2. key

- アプリケーションの暗号化キーを設定する

  ```shell
  php artisan key:generate
  ```

    - [暗号化 10.x Laravel](https://readouble.com/laravel/10.x/ja/encryption.html)

#### 7.2.3. make

- コントローラークラスを作成する

  ```shell
  php artisan make:controller [options] [--] <name>
  ```

  ```shell
  # e.g.
  $ php artisan make:controller TaskController
  INFO  Controller [app/Http/Controllers/TaskController.php] created successfully.
  ```

- マイグレーションファイルを作成する

  ```shell
  php artisan make:migration [options] [--] <name>
  ```

  ```shell
  # e.g.
  $ php artisan make:migration create_folders_table --create=folders
  $ ls -la database/migrations/
  total 36
  drwxr-xr-x 2 1000 1000 4096 Feb 17 02:41 .
  drwxr-xr-x 5 1000 1000 4096 Jan 21 16:37 ..
  -rw-r--r-- 1 1000 1000  798 Jan 21 16:37 2014_10_12_000000_create_users_table.php
  ...
  -rw-r--r-- 1 1000 1000  770 Jan 21 16:37 2024_01_21_111050_create_folders_table.php # made
  ```

- モデルクラスを作成する

  ```shell
  php artisan make:model [options] [--] <name>
  ```

  ```shell
  # e.g.
  $ php artisan make:model Folder

  $ ls -la app/Models/
  total 20
  drwxr-xr-x 2 1000 1000 4096 Jan 22 10:25 .
  drwxr-xr-x 7 1000 1000 4096 Jan 21 16:37 ..
  -rw-r--r-- 1 1000 1000  247 Jan 22 12:20 Folder.php # made
  -rw-r--r-- 1 1000 1000  913 Jan 21 16:37 User.php
  ```

- FormRequest クラスを作成する

  ```shell
  php artisan make:request <name>
  ```

  ```shell
  # e.g.
  $ php artisan make:request CreateFolder

  $ ls -la app/Http/Requests/
  total 20
  drwxr-xr-x 2 1000 1000 4096 Feb 14 13:38 .
  drwxr-xr-x 5 1000 1000 4096 Jan 22 13:34 ..
  -rw-r--r-- 1 1000 1000  654 Jan 22 14:06 CreateFolder.php # made
  ```

- シーダークラスを作成する

  ```shell
  php artisan make:seeder <name>
  ```

  ```shell
  # e.g.
  $ php artisan make:seeder FoldersTableSeeder

  $ ls -la database/seeders
  total 24
  drwxr-xr-x 2 1000 1000 4096 Feb 14 13:38 .
  drwxr-xr-x 5 1000 1000 4096 Jan 21 16:37 ..
  -rw-r--r-- 1 1000 1000  282 Jan 21 16:37 DatabaseSeeder.php
  -rw-r--r-- 1 1000 1000  846 Feb 14 13:38 FoldersTableSeeder.php # made
  ```

- テストクラスを作成する

  ```shell
  php artisan make:test [options] [--] <name>
  ```

  ```shell
  # e.g.
  $ php artisan make:test TaskTest
  $ ls -la tests/Feature
  total 16
  drwxr-xr-x 2 1000 1000 4096 Feb 14 13:38 .
  drwxr-xr-x 4 1000 1000 4096 Jan 21 16:37 ..
  -rw-r--r-- 1 1000 1000  339 Jan 21 16:37 ExampleTest.php
  -rw-r--r-- 1 1000 1000 2509 Feb 14 13:38 TaskTest.php
  ```

#### 7.2.4. migrate

- マイグレーションを実行する

  ```shell
  php artisan migrate
  ```

  ```shell
  # e.g.
  $ php artisan migrate
  Migration table created successfully.
  Migrating: 2014_10_12_000000_create_users_table
  Migrated:  2014_10_12_000000_create_users_table (6.16ms)
  Migrating: 2014_10_12_100000_create_password_resets_table
  Migrated:  2014_10_12_100000_create_password_resets_table (2.87ms)
  ```

- テーブルをすべて削除してからマイグレーションを実行する

  ```shell
  php artisan migrate:fresh
  ```

  ```shell
  # e.g.
  $ php artisan migrate:fresh
  Dropped all tables successfully.
  Migration table created successfully.
  Migrating: 2014_10_12_000000_create_users_table
  Migrated:  2014_10_12_000000_create_users_table (2.66ms)
  ...
  ```

#### 7.2.5. route

- ルーティングの定義を一覧表示する

  ```shell
  route:list [options]
  ```

  ```shell
  # e.g.
  $ php artisan route:list
  +--------+----------+-----------------------------------+------------------+------------------------------------------------------------------------+---------------------------------------------+
  | Domain | Method   | URI                               | Name             | Action                                                                 | Middleware                                  |
  +--------+----------+-----------------------------------+------------------+------------------------------------------------------------------------+---------------------------------------------+
  |        | GET|HEAD | /                                 | home             | App\Http\Controllers\HomeController@index                              | web                                         |
  |        | GET|HEAD | api/user                          |                  | Closure                                                                | api                                         |
  |        |          |                                   |                  |                                                                        | App\Http\Middleware\Authenticate:sanctum    |
  |        | GET|HEAD | folders/create                    | folders.create   | App\Http\Controllers\FolderController@showCreateForm                   | web                                         |
  |        | POST     | folders/create                    |                  | App\Http\Controllers\FolderController@create                           | web                                         |
  |        | GET|HEAD | folders/{id}/tasks                | tasks.index      | App\Http\Controllers\TaskController@index                              | web                                         |
  |        | GET|HEAD | folders/{id}/tasks/create         | tasks.create     | App\Http\Controllers\TaskController@showCreateForm                     | web                                         |
  |        | POST     | folders/{id}/tasks/create         |                  | App\Http\Controllers\TaskController@create                             | web                                         |
  |        | GET|HEAD | folders/{id}/tasks/{task_id}/edit | tasks.edit       | App\Http\Controllers\TaskController@showEditForm                       | web                                         |
  |        | POST     | folders/{id}/tasks/{task_id}/edit |                  | App\Http\Controllers\TaskController@edit                               | web                                         |
  |        | GET|HEAD | home                              | home             | App\Http\Controllers\HomeController@index                              | web                                         |
  |        | POST     | login                             |                  | App\Http\Controllers\Auth\LoginController@login                        | web                                         |
  |        |          |                                   |                  |                                                                        | App\Http\Middleware\RedirectIfAuthenticated |
  |        | GET|HEAD | login                             | login            | App\Http\Controllers\Auth\LoginController@showLoginForm                | web                                         |
  |        |          |                                   |                  |                                                                        | App\Http\Middleware\RedirectIfAuthenticated |
  |        | POST     | logout                            | logout           | App\Http\Controllers\Auth\LoginController@logout                       | web                                         |
  |        | GET|HEAD | password/confirm                  | password.confirm | App\Http\Controllers\Auth\ConfirmPasswordController@showConfirmForm    | web                                         |
  |        |          |                                   |                  |                                                                        | App\Http\Middleware\Authenticate            |
  |        | POST     | password/confirm                  |                  | App\Http\Controllers\Auth\ConfirmPasswordController@confirm            | web                                         |
  |        |          |                                   |                  |                                                                        | App\Http\Middleware\Authenticate            |
  |        | POST     | password/email                    | password.email   | App\Http\Controllers\Auth\ForgotPasswordController@sendResetLinkEmail  | web                                         |
  |        | GET|HEAD | password/reset                    | password.request | App\Http\Controllers\Auth\ForgotPasswordController@showLinkRequestForm | web                                         |
  |        | POST     | password/reset                    | password.update  | App\Http\Controllers\Auth\ResetPasswordController@reset                | web                                         |
  |        | GET|HEAD | password/reset/{token}            | password.reset   | App\Http\Controllers\Auth\ResetPasswordController@showResetForm        | web                                         |
  |        | GET|HEAD | register                          | register         | App\Http\Controllers\Auth\RegisterController@showRegistrationForm      | web                                         |
  |        |          |                                   |                  |                                                                        | App\Http\Middleware\RedirectIfAuthenticated |
  |        | POST     | register                          |                  | App\Http\Controllers\Auth\RegisterController@register                  | web                                         |
  |        |          |                                   |                  |                                                                        | App\Http\Middleware\RedirectIfAuthenticated |
  |        | GET|HEAD | sanctum/csrf-cookie               |                  | Laravel\Sanctum\Http\Controllers\CsrfCookieController@show             | web                                         |
  +--------+----------+-----------------------------------+------------------+------------------------------------------------------------------------+---------------------------------------------+
  ```

#### 7.2.6. serve

- Web サーバーを起動する

  ```shell
  php artisan serve [options]
  ```

  ```shell
  # e.g.
  # ローカルホストで起動する
  $ php artisan serve --host 0.0.0.0
  Starting Laravel development server: http://0.0.0.0:8000

  # Access to http://localhost:8000
  ```

#### 7.2.7. tinker

- メソッドを実行する

  ```shell
  tinker [options] [--] [<include>...]
  ```

  ```shell
  # e.g. メソッドを実行する
  $ php artisan tinker
  Psy Shell v0.11.22 (PHP 7.3.33 — cli) by Justin Hileman
  > $folder = App\Models\Folder::find(1);
  = App\Models\Folder {#6516
      id: 1,
      title: "プライベート",
      created_at: "2024-01-22 10:39:42",
      updated_at: "2024-01-22 10:39:42",
    }
  ```

  ```shell
  # e.g. 実行される SQL を確認する
  $ php artisan tinker
  Psy Shell v0.11.22 (PHP 7.3.33 — cli) by Justin Hileman
  > \App\Models\Task::where('folder_id', 1)->toSql();
  = "select * from "tasks" where "folder_id" = ?"
  ```

## 8. SQL

- [標準 SQL 集]({% post_url 2022-11-24-sql-standard %})
- [自作 SQL 集]({% post_url 2022-11-24-sql-made-by-me %})

## 9. VS Code

### 9.1. 保存時の設定を無効化する

```json
{
    "files.insertFinalNewline": false,
    "files.trimFinalNewlines": false,
    "files.trimTrailingWhitespace": false,
}
```

これを `ワークスペース/.vscode/settings.json` へ記述すると、[ユーザー設定で行われている](https://github.com/kem198/dotfiles/blob/0defd6780a2505a590646184708781cf54fd9553/config/Code/User/settings.json#L22-L24) 下記の記述を無効化できる。

- 保存時に新規行を挿入 (`files.insertFinalNewline`)
- 保存時に不要行を除去 (`files.trimFinalNewlines`)
- 保存時に行末のスペース記号を削除 (`files.trimTrailingWhitespace`)

他者が作成したコードをそのまま保存したいときに配置する。

## 10. Excel

- 🔄: Google スプレッドシートでも動作を確認している関数。

### 10.1. 書式設定

- YYYY-MM-DD hh:mm:ss 形式 (ゼロ埋め) で表示

  ```c
  YYYY-MM-DD hh:mm:ss
  ```

### 10.2. 関数

- 🔄 縦に連番を振る

  ```c
  =IFERROR(MAX(INDIRECT(ADDRESS(1,COLUMN())):INDIRECT(ADDRESS(ROW()-1,COLUMN())))+1,1)
  ```

- 🔄 横に連番を振る

  ```c
  =IFERROR(MAX(INDIRECT(ADDRESS(ROW(),1)):INDIRECT(ADDRESS(ROW(),COLUMN()-1)))+1,1)
  ```

    - [Excel ドキュメントを書く時の定石集 - Neo's World](https://neos21.net/tech/business-communication/excel-best-practices.html)

- 🔄 縦に連番を振る (数値以外のセルでリセット)

  ```c
  =IFERROR(INDIRECT(ADDRESS(ROW()-1,COLUMN()))+1,1)
  ```

- 🔄 横に連番を振る (数値以外のセルでリセット)

  ```c
  =IFERROR(INDIRECT(ADDRESS(ROW(),COLUMN()-1))+1,1)
  ```

- シート名を表示する

  ```c
  =MID(CELL("filename",A1),FIND("]",CELL("filename",A1))+1,99)
  ```

    - [Excelの表でシート名を利用するのに毎度手動でコピペする修行は不要！ 関数で取得する方法 - 残業を減らす！Officeテクニック - 窓の杜](https://forest.watch.impress.co.jp/docs/serial/offitech/1453353.html)

## 11. その他

### 11.1. example.com

- example.com

  ```text
  example.com
  ```

  ```text
  https://example.com/
  ```

  ```text
  username@example.com
  ```

    - [example.com](https://example.com/)
    - [example.com - Wikipedia](https://ja.wikipedia.org/wiki/Example.com)

### 11.2. Google 検索

- サイト内検索

  ```shell
  # example.com ドメイン内で「つけ麺」を含むページを検索する
  site:example.com つけ麺

  # ディレクトリを指定するとその階層以下に限定できる
  site:https://www.example.com/ramen つけ麺
  ```

    - [検索演算子「site: 」の使い方 \| Google 検索セントラル  \|  ドキュメント  \|  Google for Developers](https://developers.google.com/search/docs/monitor-debug/search-operators/all-search-site?hl=ja)
