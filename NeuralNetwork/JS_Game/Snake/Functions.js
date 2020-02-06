let Preys = [];
let TotalPreys = 3;
function SetupGame()
{
	TotalSamples = 300;
	CreateCommonControls(Math.min(500, window.innerWidth), Math.min(500, window.innerWidth));
}
function CreateNewGeneration()
{
	Generation++;
	calculateFitness(DeadSamples);
	Preys = [];
	for (let i = 0; i < TotalSamples; i++)
		Samples.push(CreateSample(new Snake(Generation, i)));
	for (let i = 0; i < TotalPreys; i++)
		Preys.push(new Prey());
	DeadSamples = [];
}
function GameFunction()
{
	for (let i = 0; i < Samples.length; i++)
	{
		Samples[i].think(Preys);
		Samples[i].update();
		ScoreBoardPanel.EvaluateBestScore(Samples[i].brain);
		for (let j = 0; j < Preys.length; j++)
		{
			if(Samples[i].checkSnakeEat(Preys[j]))
			{
				Samples[i].growSnake(Preys[j]);
				Preys.splice(j, 1);
				Preys.push(new Prey());
			}
		}
		if(Samples[i].checkSnakeCollision() || Samples[i].isOffscreen() || Samples[i].stamina == 0)
			DeadSamples.push(Samples.splice(i, 1)[0]);
	}
	if (Samples.length === 0)
		CreateNewGeneration();
}
function DrawFunction()
{
	Samples.forEach(sample => { sample.draw(); });
	Preys.forEach(prey => { prey.draw(); });
}