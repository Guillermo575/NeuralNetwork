const TOTAL_CARS = 300;
let pipes = []; 
let Cars = []; 
let DeadCars = [];
let generation = 0;
let countdown = 0;
function SetupGame()
{
	CreateCommonControls(Math.min(600, window.innerWidth), Math.min(600, window.innerWidth) * 0.75);
}
function StartGame()
{
	CreateNewGeneration();
}
function CreateNewGeneration()
{
	generation++;
	calculateFitness(DeadCars);
	for (let i = 0; i < TOTAL_CARS; i++)
	{
		Cars.push(DeadCars.length == 0 ? new Car() : pickOneBrain(new Car(), DeadCars));
		Cars[Cars.length - 1].generation = generation;
	}
	DeadCars = [];
	pipes = [];
}
function GameFunction()
{	
	if (countdown++ === 50)
	{
		countdown = 0;
		pipes.push(new Pipe());
	}
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
			if (Cars[j].hitsPipe(pipes[i]) || Cars[j].isOffscreen())
				DeadCars.push(Cars.splice(j, 1)[0]);
	}
	if (Cars.length === 0)
		CreateNewGeneration();
}
function DrawFunction()
{
	Cars.forEach(Car => { Car.draw(); });
	pipes.forEach(pipe => { pipe.draw(); });
	PrintCurrentBoard("Current: " + Cars[0].score.toString().padStart(10, ' ') + " | Generation: " + generation.toString().padStart(5, ' ') + " | Cars: " + Cars.length.toString().padStart(5, ' ') + " | Highest: " + BestRecord().toString().padStart(20, ' '));
}