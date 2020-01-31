let lstCactus = [];
let countdown = 0;
let NextCactus = 0;
function SetupGame()
{
	CreateCommonControls(Math.min(600, window.innerWidth), Math.min(600, window.innerWidth) * 0.5);
}
function CreateNewGeneration()
{
	countdown = 0;
	NextCactus = random(50, 80);
	Generation++;
	calculateFitness(DeadSamples);
	for (let i = 0; i < TotalSamples; i++)
	{
		Samples.push(DeadSamples.length == 0 ? new Dinosaur(Generation, i) : pickOneBrain(new Dinosaur(Generation, i), DeadSamples));
	}
	DeadSamples = [];
	lstCactus = [];
}
function GameFunction()
{
	if (countdown++ > NextCactus)
	{
		countdown = 0;
		NextCactus = random(50, 80);
		lstCactus.push(new Cactus());
	}
	for (let i = 0; i < Samples.length; i++)
	{
		Samples[i].think(lstCactus);
		Samples[i].update();
		EvaluateBestScore(Samples[i].brain);
	}
	for (let i = lstCactus.length - 1; i >= 0; i--)
	{
		lstCactus[i].update();
		if (lstCactus[i].isOffscreen())
			lstCactus.splice(i, 1);
		for (let j = Samples.length - 1; j >= 0; j--)
			if (Samples[j].hitsCactus(lstCactus[i]))
				DeadSamples.push(Samples.splice(j, 1)[0]);
	}
	if (Samples.length === 0)
		CreateNewGeneration();
}
function DrawFunction()
{
	Samples.forEach(Dinosaur => { Dinosaur.draw(); });
	lstCactus.forEach(Cactus => { Cactus.draw(); });
	PrintCurrentBoard("Dinosaurs", Samples.map(function(v){ return v.brain; }), BestRecord());
}