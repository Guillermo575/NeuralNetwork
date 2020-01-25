class Car
{
	constructor()
	{
		this.generation = 0;
		this.x = 60;
		this.y = random(GameScene.height);
		this.yVelocity = 0;
		this.r = 15;
		this.weight = 0.8;
		this.flyForce = 12;
		this.score = 0;
		this.fitness = 0;
		this.brain = new NeuralNetwork(4, 12, 3);
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
		inputs.push(this.y / GameScene.height);
		inputs.push(currentPipe.top / GameScene.height);
		inputs.push(currentPipe.bottom / GameScene.height);
		inputs.push(currentPipe.x / GameScene.width);
		this.yVelocity = 0;
		let outputs = this.brain.predict(inputs);
		if (outputs[0] > outputs[1]) 
			this.Up();
		else 
			this.Down();
	}
	update()
	{
		this.score++;
		this.y += this.yVelocity;
		this.y = this.y > GameScene.height ? GameScene.height : this.y < 0 ? 0 : this.y;
		this.yVelocity = this.y > GameScene.height && this.y < 0 ? 0 : this.yVelocity;
	}
	Up()
	{
		this.yVelocity -= this.flyForce;
	}
	Down()
	{
		this.yVelocity += this.flyForce;
	}
	hitsPipe(pipe)
	{
		return (this.y - this.r < pipe.top || this.y + this.r > pipe.bottom) && this.x + this.r > pipe.x && this.x - this.r < pipe.x + pipe.w;
	}
}
function calculateFitness(lstItems)
{
	let sum = lstItems.reduce((total, item) => total += item.score, 0);
	lstItems.forEach ( item => { item.fitness = item.score / sum; } );
}
function pickOneCar(lstItems)
{
	let newCar = new Car();
	if(lstItems.length > 0)
	{
		let index = 0;
		let r = random(1);
		while (r > 0)
		{
			r -= lstItems[index].fitness;
			index ++;
		}
		let pickedCar = lstItems[index - 1];
		pickedCar.brain.mutate(mutate);
		newCar.brain = pickedCar.brain.copy();
	}
	return newCar;
}
function mutate(val)
{
	return (random(1) < 0.1) ? (val + randomGaussian() * 0.5) : val;
}