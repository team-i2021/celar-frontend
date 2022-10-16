# Celar
Current Location Sharing Service

# Usage
1. `template.auth.js`を参考にして`auth.js`をルートディレクトリに作成する。  
2. `celar/celar-backend`を起動する。  
3. `celar/celar-frontend`（本レポジトリ）を起動する。  

# Attention
必ず、バックエンドフロントエンド共に、SSL/TLSによるHTTPS暗号化を行なってください。  
セキュリティー上の観点から、HTTPS化が行われていないと一部の機能がご利用できないと思われます。  

# Reccomend
お勧めのURLの形態です。

サブドメイン|用途
---|---
.|フロントエンド
ws.|WebSocketサーバー
api.|HTTPAPIサーバー

# License
スプライトアイコン: [Material Symbols and Icons - Google Fonts](https://fonts.google.com/icons) (Apache License 2.0)
