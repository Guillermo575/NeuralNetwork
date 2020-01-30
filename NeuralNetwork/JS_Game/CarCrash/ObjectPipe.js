class Pipe
{
	constructor()
	{
		this.gapSize = 90;
		this.top = random(GameScene.width * 0.1, GameScene.width * 0.8);
		this.bottom = this.top + this.gapSize;
		this.y = 0;
		this.w = 30;
		this.speed = 5;
	}
	draw()
	{
		fill(255);
		rect(0, this.y, this.top, this.w);
		rect(this.bottom, this.y, GameScene.width, this.w);
	}
	update()
	{
		this.y += this.speed;
	}
	isOffscreen()
	{
		return this.y > GameScene.height;
	}
}