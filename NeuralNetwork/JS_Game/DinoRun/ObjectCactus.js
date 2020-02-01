class Cactus
{
	constructor()
	{
		this.w = random(60, 90);
		this.x = GameScene.width;
		this.y = GameScene.height;
		this.speed = -5;
	}
	draw()
	{
		fill(255);
		rect(this.x, this.y - this.w, this.w, this.w);
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