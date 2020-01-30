let pipes = [];
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
	countdown = 0;
	Generation++;
	calculateFitness(DeadSamples);
	for (let i = 0; i < TotalSamples; i++)
	{
		Samples.push(DeadSamples.length == 0 ? new Car(Generation, i) : pickOneBrain(new Car(Generation, i), DeadSamples));
	}
	DeadSamples = [];
	pipes = [];
}
function GameFunction()
{
	if (countdown++ === 50)
	{
		countdown = 0;
		pipes.push(new Pipe());
	}
	for (let i = 0; i < Samples.length; i++)
	{
		Samples[i].think(pipes);
		Samples[i].update();
		EvaluateBestScore(Samples[i]);
	}
	for (let i = pipes.length - 1; i >= 0; i--)
	{
		pipes[i].update();
		if (pipes[i].isOffscreen())
			pipes.splice(i, 1);
		for (let j = Samples.length - 1; j >= 0; j--)
			if (Samples[j].hitsPipe(pipes[i]) || Samples[j].isOffscreen())
				DeadSamples.push(Samples.splice(j, 1)[0]);
	}
	if (Samples.length === 0)
		CreateNewGeneration();
}
function DrawFunction()
{
	Samples.forEach(Car => { Car.draw(); });
	pipes.forEach(pipe => { pipe.draw(); });
	PrintCurrentBoard("Cars", Samples, BestRecord());
}