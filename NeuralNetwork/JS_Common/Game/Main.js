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
	}
}