class Pipe
{
	constructor()
	{
		this.gapSize = random(70, 90);
		this.left = random(GameScene.width * 0.1, GameScene.width * 0.8);
		this.right = this.left + this.gapSize;
		this.y = 0;
		this.w = 30;
		this.speed = 5;
	}
	draw()
	{
		fill(255);
		rect(0, this.y, this.left, this.w);
		rect(this.right, this.y, GameScene.width, this.w);
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