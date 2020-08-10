const DataName =
{
  WELCOME : "welcome",
  ALL_COIN : "all-coin",
  STAR_COIN : "star-coin",
  SHINE_SPRITE: "shine-sprite"
}

var images =
[
  PlayerImg.IDLE_R,
  PlayerImg.IDLE_L,
  PlayerImg.WALK_1_R,
  PlayerImg.WALK_1_L,
  PlayerImg.WALK_2_R,
  PlayerImg.WALK_2_L,
  PlayerImg.JUMP_R,
  PlayerImg.JUMP_L
]

class Data
{
  constructor()
  {
    this.welcome = false;
    this.all_coin = 0;
    this.star_coin = 0;
    this.shine_sprite = 0; /* データ追加場所 */
  }

  static LOAD() /* ページ読み込みで1回だけ実行 */
  {
    if (!Data.get(DataName.WELCOME)) /* 初めてのページ読み込みでCookie初期化 */
    {
      this.save(DataName.WELCOME, true);
      this.save(DataName.ALL_COIN, 0);
      this.save(DataName.STAR_COIN, 0);
      this.save(DataName.SHINE_SPRITE, 0); /* データ追加場所 */
    }

    /* JSに書き込み */
    this.welcome = this.get(DataName.WELCOME);
    this.all_coin = this.get(DataName.ALL_COIN);
    this.star_coin = this.get(DataName.STAR_COIN);
    this.shine_sprite = this.get(DataName.SHINE_SPRITE); /* データ追加場所 */
  }

  static UPDATE() /* 常に実行される */ /* Cookie操作によるチート行為防止 */
  {
    /* 書き込まれたデータからCookieに反映 */
    this.save(DataName.WELCOME, this.welcome);
    this.save(DataName.ALL_COIN, this.all_coin);
    this.save(DataName.STAR_COIN, this.star_coin);
    this.save(DataName.SHINE_SPRITE, this.shine_sprite); /* データ追加場所 */

    if (p.x > 500)
    {
      this.all_coin++;
    }
  }

  static save(name, value)
  {
    document.cookie = name + '=' + value + ';max-age=315360000' /* 10年 */;
  }

  static get(name)
  {
    var cookies = document.cookie;
    var cookiesArray = cookies.split(';');

    for (var c of cookiesArray)
    {
      var cArray = c.split('=');

      if (cArray[0].indexOf(name) != -1)
      {
        return cArray[1];
      }
    }

    return null;
  }
}
