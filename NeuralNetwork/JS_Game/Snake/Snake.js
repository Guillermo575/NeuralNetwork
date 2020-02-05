class Snake
{
	constructor(Gen, id)
	{
		this.x = 0;
		this.y = 250;
		this.numSegments = 10;
		this.direction = 'right';
		this.xCor = [];
		this.yCor = [];
		this.diff = 10;
		this.movesRealized = 0;
	    for (let i = 0; i < this.numSegments - 1; i++)
		{
			this.xCor.push(this.x + i * this.diff);
			this.yCor.push(this.y);
		}
		this.brain = new NeuralNetwork(4, 8, 2);
		this.brain.setTagNames(Gen, id, Gen + "_" + id);
	}
	draw()
	{
		noStroke();
		strokeWeight(this.diff);
		fill(255, 100);
		for (let i = 0; i < this.numSegments - 1; i++)
			ellipse(this.xCor[i], this.yCor[i], this.diff);
	}
	think(Preys)
	{
		const snakeHeadX = this.xCor[this.xCor.length - 1];
		const snakeHeadY = this.yCor[this.yCor.length - 1];
		let currentPrey = Preys.find(Preys => Preys.x + Preys.w > snakeHeadX);
		let inputs = [];
		inputs.push(snakeHeadX / GameScene.width);
		inputs.push(snakeHeadY / GameScene.height);
		inputs.push(currentPrey === undefined ? 0 : currentPrey.X / GameScene.with);
		inputs.push(currentPrey === undefined ? 0 : currentPrey.Y / GameScene.height);
		let outputs = this.brain.predict(inputs);
		if(outputs[0] > outputs[1])
			this.Move(outputs[0] > 0.5 ? 'right' : 'left');
		else
			this.Move(outputs[1] > 0.5 ? 'down' : 'up');
	}
	Move(newDirection)
	{
		switch (newDirection)
		{
			case 'left':
				this.direction = this.direction !== 'right' ? 'left' : this.direction;
			break;
			case 'right':
				this.direction = this.direction !== 'left' ? 'right' : this.direction;
			break;
			case 'up':
				this.direction = this.direction !== 'down' ? 'up' : this.direction;
			break;
			case 'down':
				this.direction = this.direction !== 'up' ? 'down' : this.direction;
			break;
		}
	}
	update()
	{
		this.movesRealized++;
		for (let i = 0; i < this.numSegments - 1; i++)
		{
			this.xCor[i] = this.xCor[i + 1];
			this.yCor[i] = this.yCor[i + 1];
		}
		switch (this.direction)
		{
			case 'right':
				this.xCor[this.xCor.length - 1] = this.xCor[this.xCor.length - 2] + this.diff;
				this.yCor[this.yCor.length - 1] = this.yCor[this.yCor.length - 2];
			break;
			case 'up':
				this.xCor[this.xCor.length - 1] = this.xCor[this.xCor.length - 2];
				this.yCor[this.yCor.length - 1] = this.yCor[this.yCor.length - 2] - this.diff;
			break;
			case 'left':
				this.xCor[this.xCor.length - 1] = this.xCor[this.xCor.length - 2] - this.diff;
				this.yCor[this.yCor.length - 1] = this.yCor[this.yCor.length - 2];
			break;
			case 'down':
				this.xCor[this.xCor.length - 1] = this.xCor[this.xCor.length - 2];
				this.yCor[this.yCor.length - 1] = this.yCor[this.yCor.length - 2] + this.diff;
			break;
		}
	}
	checkSnakeCollision()
	{
		const snakeHeadX = this.xCor[this.xCor.length - 1];
		const snakeHeadY = this.yCor[this.yCor.length - 1];
		for (let i = 0; i < this.xCor.length - 1; i++)
			if (this.xCor[i] === snakeHeadX && this.yCor[i] === snakeHeadY)
				return true;
	}
	checkSnakeEat(Prey)
	{
		return this.xCor[this.xCor.length - 1] === Prey.x && this.yCor[this.yCor.length - 1] === Prey.y;
	}
	growSnake(Prey)
	{
		this.brain.score += Prey.score;
		this.numSegments++;
		this.xCor.unshift(this.xCor[0]);
		this.yCor.unshift(this.yCor[0]);
	}
	isOffscreen()
	{
		return this.xCor[this.xCor.length - 1] > GameScene.width || this.xCor[this.xCor.length - 1] < 0 || this.yCor[this.yCor.length - 1] > GameScene.height || this.yCor[this.yCor.length - 1] < 0;
	}
	FitnessCriterion()
	{
		return this.movesRealized + this.brain.score;
	}
}