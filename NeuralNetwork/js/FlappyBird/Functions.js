const TOTAL_BIRDS = 300;
let pipes = []; 
let Birds = []; 
let DeadBirds = [];
let generation = 0;
function StartGame()
{
	GameScene = new Scene(width, height);
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
	if (Birds[0].score % 50 === 0)
		pipes.push(new Pipe());
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
			if (Birds[j].hitsPipe(pipes[i]) || Birds[j].y - Birds[j].r < 0 || Birds[j].y + Birds[j].r > height) 
				DeadBirds.push(Birds.splice(j, 1)[0]);
	}
	if (Birds.length === 0) 
		CreateNewGeneration();
}
function DrawFunction()
{
	background(50);
	Birds.forEach(bird => { bird.draw(); });
	pipes.forEach(pipe => { pipe.draw(); });
	PrintCurrentBoard("Current: " + Birds[0].score.toString().padStart(10, ' ') + ", Generation: " + generation + ", Birds: " + Birds.length + ", Highest: " + BestRecord(), 20, height - 10);
	PrintScoreBoard();	
}