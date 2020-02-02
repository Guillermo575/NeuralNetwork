let GameScene;
let Generation = 0;
let TotalSamples = 300;
let Samples = [];
let DeadSamples = [];
function setup() 
{
	SetupGame();
	GameScene = new Scene(width, height);
	StartGame();
}
function StartGame()
{
	CreateNewGeneration();
}
function CreateSample(sample)
{
	sample.brain = (DeadSamples.length > 0) ? evolveBrain(sample.brain, DeadSamples.map(function(v){ return v.brain; })) : sample.brain;
	return sample;
}
function draw()
{
	if(!GetPauseState())
	{
		for (let i = 0; i < GetSliderSpeed(); i++) 
		{
			GameFunction();
		}
		background(0);
		DrawFunction();
		ScoreBoardPanel.PrintScoreBoard();
		CurrentBoardPanel.PrintCurrentBoard("Samples", Samples.map(function(v){ return v.brain; }), ScoreBoardPanel.BestRecord());
	}
}