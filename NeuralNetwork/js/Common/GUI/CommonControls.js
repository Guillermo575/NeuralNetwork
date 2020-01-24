const SCREEN_SIZE = Math.min(600, window.innerWidth);
let slider; 
let button;
var Pause = false;
function CreateCommonControls()
{
	createCanvas(SCREEN_SIZE, 3 * SCREEN_SIZE / 4);
	CreateCurrentBoard(SCREEN_SIZE);	
	CreateScoreBoard(SCREEN_SIZE);
	slider = createSlider(1, 1000, 1, 1);
	button = createButton('Pause');
    button.mousePressed(PauseResume);
}
function PauseResume()
{
	Pause = !Pause; 
	button.html(Pause ? "Resume" : "Pause");	
}
function GetSliderSpeed()
{
	return slider.value();
}
function GetPauseState()
{
	return Pause;
}