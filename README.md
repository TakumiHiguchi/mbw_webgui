# music.branchwith webGUI

music.branchwithの管理コンソールです。

## リンク
[music.branchwith webGUI](https://music-branchwith-web-gui.web.app/signin)

## 注意
- dockerが使える環境はご自身でご用意してください。

## 使い方
1. [mbw-nginx-proxy](https://github.com/TakumiHiguchi/mbw-nginx-proxy)のページを見て、mbw-nginx-proxyをdocker-compose up -dします
2. mbw-api をdocker-compose up -dします
3. music.branchwith webGUI をcloneしましょう
  ```
  $ git clone https://github.com/TakumiHiguchi/mbw_webgui.git
  ```

4. ディレクトリに移動しましょう
  ```
  $ cd mbw_webgui
  ```

5. dockerちゃんに全てお任せしましょう
  ``` 
  $ docker-compose build
  $ docker-compose run node yarn install
  $ docker-compose up
  ```

6. join [mbw-webgui.localhost](http://mbw-webgui.localhost/)

music.branchwith群の詳しい起動方法は、[mbw-nginx-proxy](https://github.com/TakumiHiguchi/mbw-nginx-proxy)のREADMEを見てください。
