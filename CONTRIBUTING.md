## CONTRIBUTING

1. forkしてください
2. 最新の main ブランチから feature を切って作業してください
3. あなたの feature ブランチからPRを立ててください

### PRに対して管理者の作業フロー

1. release ブランチ・マイルストーンがなければ作る
2. PRの base branch を作った release に変更する
3. Labels とマイルストーンを設定する
4. 動作確認・コードレビュー
5. release ブランチにマージ

## リリース手順

1. release ブランチがなければ作る
2. release から feature を切って作業する
3. PR経由で release にマージする
4. issues のマイルストーンにリリースバージョンが同じものがあれば延期するか対応する
5. ある程度作業がまとまったら main ブランチマージPRを立てる
6. 動確後、マージでCIで自動リリース

※ リリース後はタグを切って[リリースを作成](https://github.com/Kiryu-kai/asacoco-gen/releases)する
