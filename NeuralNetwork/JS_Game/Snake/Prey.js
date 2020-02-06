class Prey
{
	constructor()
	{
		this.x = floor(random(10, (GameScene.width - 100) / 10)) * 10;
		this.y = floor(random(10, (GameScene.height - 100) / 10)) * 10;
		this.score = 100;
		this.size = 10;
	}
	draw()
	{
		fill(255);
		rect(this.x - (this.size/2), this.y - (this.size/2), this.size, this.size);
	}
	update()
	{
	}
	isOffscreen()
	{
	}
}