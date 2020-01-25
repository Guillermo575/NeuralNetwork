const TOTAL_CarS = 300;
let pipes = []; 
let Cars = []; 
let DeadCars = [];
let generation = 0;
function StartGame()
{
	GameScene = new Scene(width, height);
	StartNewGeneration();
}
function StartNewGeneration()
{
	generation++;
	calculateFitness(DeadCars);
	for (let i = 0; i < TOTAL_CarS; i++)
	{
		Cars.push(pickOneCar(DeadCars));
		Cars[Cars.length - 1].generation = generation;
	}
	DeadCars = [];
	pipes = [];
}
function GameFunction()
{
	if (Cars[0].score % 50 === 0) 
		pipes.push(new Pipe());
	for (let i = 0; i < Cars.length; i++)
	{
		Cars[i].think(pipes);
		Cars[i].update();
		EvaluateBestScore(Cars[i]);
	}
	for (let i = pipes.length - 1; i >= 0; i--) 
	{
		pipes[i].update();
		if (pipes[i].isOffscreen()) 
			pipes.splice(i, 1);
		for (let j = Cars.length - 1; j >= 0; j--)
			if (Cars[j].hitsPipe(pipes[i]) || Cars[j].y - Cars[j].r < 0 || Cars[j].y + Cars[j].r > height) 
				DeadCars.push(Cars.splice(j, 1)[0]);
	}
	if (Cars.length === 0) 
		StartNewGeneration();	
}
function DrawFunction()
{
	background(50);
	Cars.forEach(Car => { Car.draw(); });
	pipes.forEach(pipe => { pipe.draw(); });
	PrintCurrentBoard("Current: " + Cars[0].score.toString().padStart(10, ' ') + ", Generation: " + generation + ", Cars: " + Cars.length + ", Highest: " + BestRecord(), 20, height - 10);
	PrintScoreBoard();	
}