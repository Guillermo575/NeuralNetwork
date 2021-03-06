class Pipe
{
	constructor()
	{
		this.gapSize = 90;
		this.top = random(GameScene.height/5, 3 * GameScene.height/4);
		this.bottom = this.top + this.gapSize;
		this.x = GameScene.width;
		this.w = 30;
		this.speed = -5;
	}
	draw()
	{
		fill(255);
		rect(this.x, 0, this.w, this.top);
		rect(this.x, this.bottom, this.w, GameScene.height);
	}
	update()
	{
		this.x += this.speed;
	}
	isOffscreen()
	{
		return this.x < -this.w;
	}
}