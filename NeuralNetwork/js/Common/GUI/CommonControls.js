const SCREEN_SIZE = Math.min(600, window.innerWidth);
let SliderSpeed;
let PauseButton;
let SlowButton;
let FastButton;
var Pause = false;
function CreateCommonControls()
{
	createCanvas(SCREEN_SIZE, SCREEN_SIZE * 0.75);
	CreateCurrentBoard(SCREEN_SIZE);
	CreateScoreBoard(SCREEN_SIZE);
	SliderSpeed = createSlider(1, 100, 1, 1);
	SliderSpeed.position(SCREEN_SIZE + (SCREEN_SIZE/2), SCREEN_SIZE * 0.82);
	SlowButton = createButton('<');
    SlowButton.mousePressed(SlowGame);
	SlowButton.position(SCREEN_SIZE + 50, SCREEN_SIZE * 0.82);
	PauseButton = createButton('Pause');
    PauseButton.mousePressed(PauseResume);
	PauseButton.position(SCREEN_SIZE + 100, SCREEN_SIZE * 0.82);
	FastButton = createButton('>');
    FastButton.mousePressed(FastGame);
	FastButton.position(SCREEN_SIZE + 180, SCREEN_SIZE * 0.82);
}
function PauseResume()
{
	Pause = !Pause; 
	PauseButton.html(Pause ? "Resume" : "Pause");
}
function SlowGame()
{
	SliderSpeed.value(1);
}
function FastGame()
{
	SliderSpeed.value(100);
}
function GetSliderSpeed()
{
	return SliderSpeed.value();
}
function GetPauseState()
{
	return Pause;
}