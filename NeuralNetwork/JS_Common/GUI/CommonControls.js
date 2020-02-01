var Canvas;
var SliderSpeed;
var PauseButton;
var SlowButton;
var FastButton;
var HideButton;
var DownloadButton;
var CurrentBoardPanel;
var ScoreBoardPanel;
var Pause = false;
function CreateCommonControls(width, height)
{
	Canvas = createCanvas(width, height);
	SlowButton = createButton('<');
	PauseButton = createButton('Pause');
	FastButton = createButton('>');
	SliderSpeed = createSlider(1, 300, 1, 1);
	HideButton = createButton('Hide');
	DownloadButton = createButton('Downlaod best');
	CurrentBoardPanel = new CurrentBoard();
	ScoreBoardPanel = new ScoreBoard();
    SlowButton.mousePressed(SlowGame);
    PauseButton.mousePressed(PauseResume);
    FastButton.mousePressed(FastGame);
    HideButton.mousePressed(HideShow);
	DownloadButton.mousePressed(DownloadBrain);
	Canvas.position(700, 0);
	SliderSpeed.position(220, 300);
	SlowButton.position(50, 300);
	PauseButton.position(100, 300);
	FastButton.position(180, 300);
	HideButton.position(380, 300);
	DownloadButton.position(450, 300);
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
	SliderSpeed.value(300);
}
function GetSliderSpeed()
{
	return SliderSpeed.value();
}
function GetPauseState()
{
	return Pause;
}
function DownloadBrain()
{
	ScoreBoardPanel.DownloadBrain();
}