const SCREEN_SIZE = Math.min(600, window.innerWidth);
let Canvas;
let SliderSpeed;
let PauseButton;
let SlowButton;
let FastButton;
let HideButton;
var Pause = false;
function CreateCommonControls()
{
	Canvas = createCanvas(SCREEN_SIZE, SCREEN_SIZE * 0.75);
	SliderSpeed = createSlider(1, 100, 1, 1);
	SliderSpeed.position(SCREEN_SIZE + 220, SCREEN_SIZE * 0.82);
	SlowButton = createButton('<');
    SlowButton.mousePressed(SlowGame);
	SlowButton.position(SCREEN_SIZE + 50, SCREEN_SIZE * 0.82);
	PauseButton = createButton('Pause');
    PauseButton.mousePressed(PauseResume);
	PauseButton.position(SCREEN_SIZE + 100, SCREEN_SIZE * 0.82);
	FastButton = createButton('>');
    FastButton.mousePressed(FastGame);
	FastButton.position(SCREEN_SIZE + 180, SCREEN_SIZE * 0.82);
	HideButton = createButton('Hide');
    HideButton.mousePressed(HideShow);
	HideButton.position(SCREEN_SIZE + 380, SCREEN_SIZE * 0.82);
	CreateCurrentBoard(SCREEN_SIZE);
	CreateScoreBoard(SCREEN_SIZE);
}
function PauseResume()
{
	Pause = !Pause; 
	PauseButton.html(Pause ? "Resume" : "Pause");
}
function HideShow()
{
	Canvas.style('display', Canvas.style('display') === 'none' ? '' : 'none');
	HideButton.html(Canvas.style('display') === 'none' ? "Show" : "Hide");
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