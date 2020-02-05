class Prey
{
	constructor()
	{
		this.x = floor(random(10, (GameScene.width - 100) / 10)) * 10;
		this.y = floor(random(10, (GameScene.height - 100) / 10)) * 10;
		this.score = 100;
	}
	draw()
	{
		fill(255);
		rect(this.x, this.y, 10, 10);
	}
	update()
	{
	}
	isOffscreen()
	{
	}
}