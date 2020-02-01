class Car
{
	constructor(Gen, id)
	{
		this.x = random(GameScene.width);
		this.y = GameScene.height - 20;
		this.xVelocity = 0;
		this.r = 15;
		this.flyForce = 12;
		this.MovesRealized = 0;
		this.brain = new NeuralNetwork(5, 10, 2);
		this.brain.setTagNames(Gen, id, Gen + "_" + id);
	}
	draw()
	{
		noStroke();
		fill(255, 100);
		rect(this.x - this.r, this.y - this.r, this.r * 2, this.r * 2);
	}
	think(pipes)
	{
		let currentPipe = pipes.find(pipe => pipe.y - pipe.w < this.y);
		let inputs = [];
		inputs.push(this.flyForce / 10);
		inputs.push(this.x / GameScene.width);
		inputs.push(currentPipe === undefined ? 0 : currentPipe.left / GameScene.width);
		inputs.push(currentPipe === undefined ? 0 : currentPipe.right / GameScene.width);
		inputs.push(currentPipe === undefined ? 0 : currentPipe.y / GameScene.height);
		this.xVelocity = 0;
		let outputs = this.brain.predict(inputs);
		if(outputs[0] > outputs[1])
			this.Move(outputs[0] > 0.5 ? this.flyForce : -this.flyForce);
	}
	update()
	{
		this.brain.score++;
		this.x += this.xVelocity;
	}
	Move(Force)
	{
		this.MovesRealized++;
		this.xVelocity += Force;
	}
	hitsPipe(pipe)
	{
		return (this.x - this.r < pipe.left || this.x + this.r > pipe.right) && this.y + this.r > pipe.y && this.y - this.r < pipe.y + pipe.w;
	}
	isOffscreen()
	{
		return this.x - this.r < 0 || this.x + this.r > GameScene.width;
	}
	FitnessCriterion()
	{
		return this.MovesRealized;
	}
}