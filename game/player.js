const PlayerImg =
{
  IDLE_R : getImageFromGitHub("player/right/idle.png"),
  IDLE_L : getImageFromGitHub("player/left/idle.png"),

  WALK_1_R : getImageFromGitHub("player/right/walk_1.png"),
  WALK_1_L : getImageFromGitHub("player/left/walk_1.png"),

  WALK_2_R : getImageFromGitHub("player/right/walk_2.png"),
  WALK_2_L : getImageFromGitHub("player/left/walk_2.png"),

  DASH_R : getImageFromGitHub("player/right/dash.png"),
  DASH_L : getImageFromGitHub("player/left/dash.png"),

  JUMP_R : getImageFromGitHub("player/right/jump.png"),
  JUMP_L : getImageFromGitHub("player/left/jump.png")
}

const PlayerSpeed =
{
  WALK : 5 + 5 / 2,
  DASH : 20
}

class Player
{
  constructor()
  {
    this.img = new Image();
    this.img.src = PlayerImg.IDLE_R;
    this.x = 0;
    this.y = 0;
    this.w = 64;
    this.h = 64;
    this.speed = 0;
    this.moveRight = false;
    this.moveLeft = false;
    this.face = 'r';
    this.jump = false; /* Jump Key Pressed -> true */
    this.jumping = false; /* While Player Jumping -> true */

    this.down = false;
    this.gravity = 10;

    this.isGrounded = false;
    this.collision_side = false;
    this.collision_top = false;

    this.jumpHigh = 0;
    this.jumpCounter = 0;
  }

  setImage(image)
  {
    this.img.src = image;
  }

  resize(width, height)
  {
    this.w = width;
    this.h = height;
  }

  setLocation(x, y)
  {
    this.x = x;
    this.y = y;
  }

  move(bool)
  {
    if (!bool) return; /* 以下のコードはmove=trueで動作 */

    if (this.collision_side) /* ブロックにぶつかった時 */
    {
      this.x = this.moveRight ? this.x -= this.speed : this.x; /* 右に壁 */
      this.x = this.moveLeft ? this.x += this.speed : this.x; /* ひらりに壁 */
    }

    if (this.collision_top)
    {
      this.y = this.jump ? this.y += this.jumpHigh * 2.5 : this.y;
    }

    if (!this.isGrounded) /* 自動落下 */
    {
      this.y += this.gravity;
    }

    this.jumpHigh = 20;

    this.x = this.x < 1 ? this.x + this.speed : this.x; /* 画面外禁止 */
    this.y = this.y > SCREEN_HEIGHT ? SCREEN_HEIGHT : this.y;

    this.moveRight = keyCode == 'ArrowRight.down' ? true : this.moveLeft ? false : this.moveRight;
    this.moveRight = keyCode == 'ArrowRight.up' ? false : this.moveRight;

    this.moveLeft = keyCode == 'ArrowLeft.down' ? true : this.moveRight ? false : this.moveLeft;
    this.moveLeft = keyCode == 'ArrowLeft.up' ? false : this.moveLeft;

    this.jump = keyCode == 'ArrowUp.down' ? true : this.down ? false : this.jump;
    this.jump = keyCode == 'ArrowUp.up' ? false : this.jump;

    this.down = keyCode == 'ArrowDown.down' ? true : this.jump ? false : this.down;
    this.down = keyCode == 'ArrowDown.up' ? false : this.down;

    this.x = this.moveRight ? this.x += this.speed : this.x;
    this.x = this.moveLeft ? this.x -= this.speed : this.x;

    this.y = this.down ? this.y += this.speed : this.y;

    this.pose();
    this.jumpf();

    this.collision_side = false;
    this.collision_top = false;
    this.isGrounded = false;

    this.face = this.moveRight ? 'r' : this.moveLeft ? 'l' : this.face;
  }

  pose()
  {
    if (this.jumping)
    {
      this.changePose("jump");
    }
    else if (this.moveRight || this.moveLeft)
    {
      if ((this.x - 10) % 60 == 0)
      {
        if (!this.collision_side)
        {
          if (getFilenameFromPath(this.img.src) == getFilenameFromPath(PlayerImg.WALK_1_R))
          {
            this.changePose("walk_2");
          }
          else
          {
            this.changePose("walk_1");
          }
        }
      }
    }
    else
    {
      this.changePose("idle");
    }
  }

  jumpf()
  {
    if (this.jumping && this.isGrounded)
    {
      this.jumpCounter = 0;
      this.jumping = false;
      this.changePose("idle");
    }

    if (!this.isGrounded && this.jumping)
    {
      if (this.jumpCounter < 20)
      {
        this.y -= this.jumpHigh;
        this.jumpCounter++;
      }
    }

    if (this.jump)
    {
      if (this.isGrounded)
      {
        this.jumping = true;
        this.y -= this.jumpHigh;
      }
    }
  }

  setSpeed(speed)
  {
    this.speed = speed;
  }

  changePose(poseType)
  {
    if (poseType == "idle")
      this.setImage(this.face == 'r' ? PlayerImg.IDLE_R : PlayerImg.IDLE_L);
    if (poseType == "walk_1")
      this.setImage(this.face == 'r' ? PlayerImg.WALK_1_R : PlayerImg.WALK_1_L);
    if (poseType == "walk_2")
        this.setImage(this.face == 'r' ? PlayerImg.WALK_2_R : PlayerImg.WALK_2_L);
    if (poseType == "jump")
        this.setImage(this.face == 'r' ? PlayerImg.JUMP_R : PlayerImg.JUMP_L);
  }

  draw()
  {
    context.drawImage(this.img, this.x, this.y, this.w, this.h);
  }
}
