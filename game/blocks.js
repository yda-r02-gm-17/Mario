const BlockType =
{
  GRASS : getResourceImage("block/grass.png"),
  DIRT : getResourceImage("block/dirt.png")
}

var blockImg;
var blockSize = 60;

/* 普通のブロック */
class Block
{
  static place(type, x, y, w, h)
  {
    blockImg = new Image();
    blockImg.src = type;
    context.drawImage(blockImg, x, y, w, h);

    if (p.x <= x + w && p.x + p.w >= x)
    { /* 両サイドでの衝突だけ */
      if (p.y <= y + h - 1 && p.y + p.h >= y + 1)
      {
        p.collision_side = true;
      }
    }

    if (p.x + p.w / 10 <= x + w - 1 && p.x + p.w - p.w / 10 >= x + 1)
    { /* 下面での衝突だけ */
      if (p.y - 1 <= y + h && p.y >= y)
      {
        p.collision_top = true;
      }
    }

    if (p.x + p.w / 10 <= x + w - 1 && p.x + p.w - p.w / 10 >= x + 1)
    { /* 上面での衝突だけ */
      if (p.y + p.h + 1 >= y && p.y + p.h + 1 <= y + 10)
      {
        p.isGrounded = true;
      }
    }
  }
}

/* 当たり判定無しブロック */
class nBlock
{
}
