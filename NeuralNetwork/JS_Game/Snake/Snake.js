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
		this.stamina = 1000;
		this.speedX = 0;
		this.speedY = 0;
	    for (let i = 0; i < this.numSegments - 1; i++)
		{
			this.xCor.push(this.x + i * this.diff);
			this.yCor.push(this.y);
		}
		this.snakeHeadX = this.xCor[this.xCor.length - 1];
		this.snakeHeadY = this.yCor[this.yCor.length - 1];
		this.brain = new NeuralNetwork(9, 18, 2);
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
		let currentPrey = Preys[0];
		let NearDistance = 0;
		for(let i = 0; i < Preys.length; i++)
		{
			var comp_horizontal = this.x - currentPrey.x;
			var comp_vertical = this.y - currentPrey.y;
			var distancia = Math.sqrt(comp_horizontal * comp_horizontal + comp_vertical * comp_vertical);
			if(distancia < NearDistance || NearDistance == 0)
			{
				currentPrey = Preys[i];
				NearDistance = distancia;
			}
		}
		let inputs = [];
		inputs.push(this.snakeHeadX == 0 ? 0 : 1/this.snakeHeadX);
		inputs.push(this.snakeHeadY == 0 ? 0 : 1/this.snakeHeadY);
		inputs.push(this.snakeHeadX / GameScene.width);
		inputs.push(this.snakeHeadY / GameScene.height);
		inputs.push(this.stamina / 1000);
		inputs.push(this.speedX);
		inputs.push(this.speedY);
		inputs.push(currentPrey === undefined ? 0 : (currentPrey.x / GameScene.width));
		inputs.push(currentPrey === undefined ? 0 : (currentPrey.y / GameScene.height));
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
				if(this.direction !== 'right')
				{
					this.direction = 'left';
					this.movesRealized++;
					this.speedX = -1;
					this.speedY = 0;
				}
			break;
			case 'right':
				if(this.direction !== 'left')
				{
					this.direction = 'right';
					this.movesRealized++;
					this.speedX = 1;
					this.speedY = 0;
				}
			break;
			case 'up':
				if(this.direction !== 'down')
				{
					this.direction = 'up';
					this.movesRealized++;
					this.speedX = 0;
					this.speedY = -1;
				}
			break;
			case 'down':
				if(this.direction !== 'up')
				{
					this.direction = 'down';
					this.movesRealized++;
					this.speedX = 0;
					this.speedY = 1;
				}
			break;
		}
	}
	update()
	{
		this.stamina--;
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
		this.snakeHeadX = this.xCor[this.xCor.length - 1];
		this.snakeHeadY = this.yCor[this.yCor.length - 1];
	}
	checkSnakeCollision()
	{
		for (let i = 0; i < this.xCor.length - 1; i++)
			if (this.xCor[i] === this.snakeHeadX && this.yCor[i] === this.snakeHeadY)
				return true;
	}
	checkSnakeEat(Prey)
	{
		return this.snakeHeadX > (Prey.x - Prey.size/2) && this.snakeHeadX < (Prey.x + Prey.size/2) &&
			   this.snakeHeadY > (Prey.y - Prey.size/2) && this.snakeHeadY < (Prey.y + Prey.size/2);
	}
	growSnake(Prey)
	{
		this.stamina = 1000;
		this.brain.score += Prey.score;
		this.numSegments++;
		this.xCor.unshift(this.xCor[0]);
		this.yCor.unshift(this.yCor[0]);
		this.snakeHeadX = this.xCor[this.xCor.length - 1];
		this.snakeHeadY = this.yCor[this.yCor.length - 1];
	}
	isOffscreen()
	{
		return this.snakeHeadX > GameScene.width || this.snakeHeadX < 0 || this.snakeHeadY > GameScene.height || this.snakeHeadY < 0;
	}
	FitnessCriterion()
	{
		return (this.stamina == 0 ? 0 : this.movesRealized) + this.brain.score;
	}
}