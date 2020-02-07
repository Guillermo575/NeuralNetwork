class Prey
{
	constructor()
	{
		this.x = floor(random(GameScene.width * 0.1, GameScene.width - (GameScene.width * 0.1)));
		this.y = floor(random(GameScene.height * 0.1, GameScene.height - (GameScene.height * 0.1)));
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