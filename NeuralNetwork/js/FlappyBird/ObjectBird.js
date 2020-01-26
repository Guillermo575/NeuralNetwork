class Bird
{
	constructor()
	{
		this.generation = 0;
		this.x = 60;
		this.y = random(GameScene.height);
		this.yVelocity = 0;
		this.r = 15;
		this.weight = 0.8;
		this.flyForce = -12;
		this.score = 0;
		this.fitness = 0;
		this.brain = new NeuralNetwork(5, 10, 2);
	}
	draw()
	{
		noStroke();
		fill(255, 100);
		ellipse(this.x, this.y, this.r * 2);
	}
	think(pipes)
	{
		let currentPipe = pipes.find(pipe => pipe.x + pipe.w > this.x);
		let inputs = [];
		inputs.push(this.y / GameScene.height);
		inputs.push(this.yVelocity / 10);
		inputs.push(currentPipe.top / GameScene.height);
		inputs.push(currentPipe.bottom / GameScene.height);
		inputs.push(currentPipe.x / GameScene.width);
		let outputs = this.brain.predict(inputs);
		if (outputs[0] > outputs[1])
			this.fly();
	}
	update()
	{
		this.score++;
		this.yVelocity += this.weight * GameScene.gravity;
		this.yVelocity *= 0.9;
		this.y += this.yVelocity;
		this.y = this.y > GameScene.height ? GameScene.height : this.y < 0 ? 0 : this.y;
		this.yVelocity = this.y > GameScene.height && this.y < 0 ? 0 : this.yVelocity;
	}
	fly()
	{
		this.yVelocity += this.flyForce;
	}
	hitsPipe(pipe)
	{
		return (this.y - this.r < pipe.top || this.y + this.r > pipe.bottom) && this.x + this.r > pipe.x && this.x - this.r < pipe.x + pipe.w;
	}
}