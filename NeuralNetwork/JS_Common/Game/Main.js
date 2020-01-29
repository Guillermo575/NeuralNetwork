function setup() 
{
	SetupGame();
	GameScene = new Scene(width, height);
	StartGame();
}
function draw()
{
	if(!GetPauseState())
	{
		for (let i = 0; i < GetSliderSpeed(); i++) 
		{
			GameFunction();
		}
		background(50);
		DrawFunction();
		PrintScoreBoard();
	}
}