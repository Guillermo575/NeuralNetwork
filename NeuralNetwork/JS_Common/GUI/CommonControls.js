let Canvas;
let SliderSpeed;
let PauseButton;
let SlowButton;
let FastButton;
let HideButton;
var Pause = false;
function CreateCommonControls(width, height)
{
	Canvas = createCanvas(width, height);
	SliderSpeed = createSlider(1, 100, 1, 1);
	SliderSpeed.position(width + 220, height + (height * 0.1));
	SlowButton = createButton('<');
    SlowButton.mousePressed(SlowGame);
	SlowButton.position(width + 50, height + (height * 0.1));
	PauseButton = createButton('Pause');
    PauseButton.mousePressed(PauseResume);
	PauseButton.position(width + 100, height + (height * 0.1));
	FastButton = createButton('>');
    FastButton.mousePressed(FastGame);
	FastButton.position(width + 180, height + (height * 0.1));
	HideButton = createButton('Hide');
    HideButton.mousePressed(HideShow);
	HideButton.position(width + 380, height + (height * 0.1));
	CreateCurrentBoard(width);
	CreateScoreBoard(width);
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