[![platform](https://img.shields.io/badge/platform-Node--RED-red)](https://nodered.org)
[![npm](https://img.shields.io/npm/v/node-red-contrib-line-content-api.svg)](https://www.npmjs.com/package/node-red-contrib-line-content-api)
[![downloads](https://img.shields.io/npm/dt/node-red-contrib-line-content-api.svg)](https://www.npmjs.com/package/node-red-contrib-line-content-api)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/gaomar/node-red-contrib-line-content-api/blob/main/LICENSE)

## 概要
LINEに投稿されたコンテンツを取得します。

## インストール

```
npm i node-red-contrib-line-content-api
```

or

AdminタブからInstall

## 使い方
### 入力項目

|項目|説明|
|--|--|
|MessageId|LINEのコンテンツが格納されているMessageId（こちらが優先される）|
|AccessToken|LINEのアクセストークンを設定します。|
|出力形式|バイナリ形式か、base64形式かを選択します。|
|msg.line|node-red-contrib-line-messaging-api経由の場合はmsg.lineの値が参照されます。|

### 出力項目

|項目|説明|
|--|--|
|payload|指定した出力形式のLINEコンテンツを返します。|

## LINK

* [NodeRED](https://flows.nodered.org/node/node-red-contrib-line-content-api)
* [Libraries.io](https://libraries.io/npm/node-red-contrib-line-content-api)
* [npm](https://www.npmjs.com/package/node-red-contrib-line-content-api)

## release

* 2023/09/11: 初回リリース（v1.0.0）

