class Dinosaur
{
	constructor(Gen, id)
	{
		this.x = 60;
		this.y = GameScene.height;
		this.yVelocity = 0;
		this.w = 50;
		this.weight = 0.8;
		this.jumpForce = -40;
		this.brain = new NeuralNetwork(3, 10, 1);
		this.brain.setTagNames(Gen, id, Gen + "_" + id);
	}
	draw()
	{
		noStroke();
		fill(255, 100);
		rect(this.x, this.y - this.w, this.w, this.w);
	}
	think(lstCactus)
	{
		let currentCactus = lstCactus.find(Cactus => Cactus.x + Cactus.w > this.x);
		let inputs = [];
		inputs.push(this.yVelocity / 10);
		inputs.push(currentCactus === undefined ? 0 : currentCactus.y / GameScene.height);
		inputs.push(currentCactus === undefined ? 0 : currentCactus.x / GameScene.width);
		let outputs = this.brain.predict(inputs);
		if (outputs[0] > 0.5)
			this.jump();
	}
	update()
	{
		this.brain.score++;
		this.yVelocity += this.weight * GameScene.gravity;
		this.yVelocity *= 0.9;
		this.y += this.yVelocity;
		this.y = this.y > GameScene.height ? GameScene.height : this.y < 0 ? 0 : this.y;
		this.yVelocity = this.y > GameScene.height && this.y < 0 ? 0 : this.yVelocity;
	}
	jump()
	{
		if(this.isOnGround())
			this.yVelocity += this.jumpForce;
	}
	hitsCactus(Cactus)
	{
		return ((this.x >= Cactus.x && this.x <= Cactus.x + Cactus.w) || (this.x + (this.w/2) >= Cactus.x && this.x + (this.w/2) <= Cactus.x + Cactus.w) || (this.x + this.w >= Cactus.x && this.x + this.w <= Cactus.x + Cactus.w)) &&
			   ((this.y <= Cactus.y && this.y >= Cactus.y - Cactus.w) || (this.y - (this.w/2) <= Cactus.y && this.y - (this.w/2) >= Cactus.y - Cactus.w) || (this.y - this.w <= Cactus.y && this.y - this.w >= Cactus.y - Cactus.w));
	}
	isOnGround()
	{
		return this.y >= GameScene.height;
	}
	FitnessCriterion()
	{
		return this.brain.score;
	}
}