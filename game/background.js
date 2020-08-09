const BgImg =
{
  SKY_MOUNTAIN : getResourceImage("background/skymountain_large.png"),
  MINECRAFT : getResourceImage("background/minecraft.png")
}

var img;
var translation = 0;

class Background
{
  constructor()
  {
    this.bx = 0;
  }

  setImage(image)
  {
    img = new Image();
    img.src = image;
  }

  draw()
  {
    if (!p.collision_side)
    {
      if (p.x > SCREEN_WIDTH / 2 - p.w / 2)
      {
        if (p.moveRight)
        {
          translation += p.speed;
          context.translate(-p.speed, 0);
        }
        else if (p.moveLeft)
        {
          translation -= p.speed;
          context.translate(p.speed, 0);
        }
      }

      if (p.x < 1)
      {
        if (translation > 0)
        {
          translation -= translation / p.speed;
          context.translate(translation / p.speed, 0);
        }
      }

      this.bx = p.x > SCREEN_WIDTH / 2 - p.w / 2 ? (p.x - SCREEN_WIDTH / 2) * 0.9 : this.bx;
    }

    context.drawImage(img, this.bx, 0);
  }
}
