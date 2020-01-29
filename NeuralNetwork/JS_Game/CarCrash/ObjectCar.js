class Car
{
	constructor()
	{
		this.generation = 0;
		this.x = 60;
		this.y = random(GameScene.height);
		this.yVelocity = 0;
		this.r = 15;
		this.flyForce = 12;
		this.score = 0;
		this.MovesRealized = 0;
		this.fitness = 0;
		this.brain = new NeuralNetwork(5, 10, 2);
	}
	draw()
	{
		noStroke();
		fill(255, 100);
		rect(this.x - this.r, this.y - this.r, this.r * 2, this.r * 2);
	}
	think(pipes)
	{
		let currentPipe = pipes.find(pipe => pipe.x + pipe.w > this.x);
		let inputs = [];
		inputs.push(this.flyForce / 10);
		inputs.push(this.y / GameScene.height);
		inputs.push(currentPipe === undefined ? 0 : currentPipe.top / GameScene.height);
		inputs.push(currentPipe === undefined ? 0 : currentPipe.bottom / GameScene.height);
		inputs.push(currentPipe === undefined ? 0 : currentPipe.x / GameScene.width);
		this.yVelocity = 0;
		let outputs = this.brain.predict(inputs);
		if(outputs[0] > outputs[1])
			this.Move(outputs[0] > 0.5 ? this.flyForce : -this.flyForce);
	}
	update()
	{
		this.score++;
		this.y += this.yVelocity;
		this.y = this.y > GameScene.height ? GameScene.height : this.y < 0 ? 0 : this.y;
		this.yVelocity = this.y > GameScene.height && this.y < 0 ? 0 : this.yVelocity;
	}
	Move(Force)
	{
		this.MovesRealized++;
		this.yVelocity += Force;
	}
	hitsPipe(pipe)
	{
		return (this.y - this.r < pipe.top || this.y + this.r > pipe.bottom) && this.x + this.r > pipe.x && this.x - this.r < pipe.x + pipe.w;
	}
	isOffscreen()
	{
		return this.y - this.r < 0 || this.y + this.r > GameScene.height;
	}
	FitnessCriterion()
	{
		return this.MovesRealized + this.score;
	}
}