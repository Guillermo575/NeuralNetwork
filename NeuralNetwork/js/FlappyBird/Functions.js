const TOTAL_BIRDS = 300;
let pipes = []; 
let Birds = []; 
let DeadBirds = [];
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
	calculateFitness(DeadBirds);
	for (let i = 0; i < TOTAL_BIRDS; i++)
	{
		Birds.push(DeadBirds.length == 0 ? new Bird() : pickOneBrain(new Bird(), DeadBirds));
		Birds[Birds.length - 1].generation = generation;
	}
	DeadBirds = [];
	pipes = [];
}
function GameFunction()
{
	if (countdown++ === 50)
	{
		countdown = 0;
		pipes.push(new Pipe());
	}
	for (let i = 0; i < Birds.length; i++)
	{
		Birds[i].think(pipes);
		Birds[i].update();
		EvaluateBestScore(Birds[i]);
	}
	for (let i = pipes.length - 1; i >= 0; i--) 
	{
		pipes[i].update();
		if (pipes[i].isOffscreen())
			pipes.splice(i, 1);
		for (let j = Birds.length - 1; j >= 0; j--)
			if (Birds[j].hitsPipe(pipes[i]) || Birds[j].isOffscreen())
				DeadBirds.push(Birds.splice(j, 1)[0]);
	}
	if (Birds.length === 0) 
		CreateNewGeneration();
}
function DrawFunction()
{
	Birds.forEach(bird => { bird.draw(); });
	pipes.forEach(pipe => { pipe.draw(); });
	PrintCurrentBoard("Current: " + Birds[0].score.toString().padStart(10, ' ') + " | Generation: " + generation.toString().padStart(5, ' ') + " | Birds: " + Birds.length.toString().padStart(5, ' ') + " | Highest: " + BestRecord().toString().padStart(20, ' '));
}