# Nomad Community（承認制）公開の手順

## フォルダ
- `site/` 公開サイト → GitHub の1つ目のリポジトリ（Public）
- `admin-site/` 管理者サイト → GitHub の**別の**リポジトリ（Public・推測されにくい名前）
- `sql/` Supabase に貼る（GitHub には載せない）

## 1. Supabase（2つ目の無料プロジェクト）
1. 新しいプロジェクトを作成（名前: nomad-community、Region: Tokyo）。Database Password は控える
2. Authentication → Sign In / Providers で、**新規ユーザーの自己登録（sign up）をオフ**にする（会員のログインはないため）
3. SQL Editor で `sql/setup.sql` の全文を貼って Run
4. Authentication → Users → Add user で、管理者のメールとパスワードを登録（Auto Confirm をオン）。UID をコピー
5. SQL Editor で実行（権限は owner / moderator / viewer）
   `insert into admins (user_id, role) values ('コピーしたUID', 'owner');`

## 2. 設定ファイル
- `admin-site/config.js` に、Project URL と Publishable key（`sb_publishable_…`）を貼る。Secret key は絶対に貼らない
- `site/config.js` は設定済み（WhatsApp の案内リンク、公式LINEのID、会社HPのURL）。変更がなければ、そのまま

## 3. GitHub
1. `site/` の中身を、1つ目のリポジトリにアップロード（**`images` フォルダも、フォルダごとドラッグ**）→ Settings → Pages（main / root）
   - 公開サイトのファイル: index / hotel / apply / done / terms / privacy（各.html）、style.css、home.css、site.js、config.js、favicon.svg、og.jpg、images/（写真7枚）
   - 共有用の画像（og.jpg）のURLは、リポジトリ名を `nomad-community` とした前提です。別の名前にした場合は、各htmlの `og:image` のURLを書き換えてください。
2. `admin-site/` の中身（config.js は編集済みのもの）を、2つ目のリポジトリにアップロード → Pages を有効化
3. 管理者サイトのURLは、自分だけがブックマークし、公開サイトからはリンクしない

## 4. 管理画面の初回ログイン
メールとパスワードでログイン → QRコードを認証アプリで読み取る → 6桁コードを入力。「読み取れない場合のキー」を控える

## 5. 動作確認
1. スマホで公開サイトの申請ページを開き、入力して「メッセージを作成して開く」を押す → WhatsApp または LINE が開く（メッセージが入っていなければ、コピーされた文を貼り付ける）
2. 管理画面の「案件の登録」で、案件コードを発行
3. 案件を開き、「審査を開始 → 承認（または却下＋理由コード）→ 招待済み → 参加」まで進める。定型文のコピーも試す
4. 「操作ログ」（Owner）に、すべての操作が残っていることを確認
5. テストの案件は、状態を「削除済み」にする（Owner）

## 6. WhatsApp Business / 公式LINE の運用設定
- ラベルを作る: 新着／審査中／承認／却下／招待済み
- プロフィール名と説明に、「Nomad Community（運営：合同会社ウィング）」と分かるように書く
- 却下した方とのトークは、「消えるメッセージ」をオンにする
- トークのバックアップ先（Googleドライブ・iCloud・PC）を把握し、削除のときは、そこも対象にする
- オフライン名簿は、暗号化したファイルで保管する。項目は、案件コード、ニックネーム、居住国、連絡先、同意日、承認日、退会日だけ

## 7. 運用ルール（初期値）
審査7日以内／却下は30日で削除／退会後30日以内に削除／招待リンクの期限7日／再申請は却下から30日後（営業目的は不可）／操作ログは1年
管理画面のダッシュボードに、期限を過ぎた案件が赤く出ます。

## 8. 写真について
- 掲載している写真は、ご自身で撮影したものです。撮影データ（位置情報など）は、すべて削除してあります。
- 人物が写る写真（交流・コワーキング）は、写っている方の公開の同意を、控えておいてください。
- 写真を差し替えるときは、`images/` の同じファイル名で上書きします（横長、1枚200KB以下がおすすめ）。
