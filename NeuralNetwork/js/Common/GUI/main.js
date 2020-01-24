function setup() 
{
	CreateCommonControls();
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
		DrawFunction();
	}
}