let CurrentBoard;
function CreateCurrentBoard(width)
{
	CurrentBoard = createGraphics(width, 40);
	CurrentBoard.textFont("Lucida Console");
	CurrentBoard.position(0, 0);
	CurrentBoard.show();
}
function PrintCurrentBoard(Title, Samples, BestRecord)
{
	CurrentBoard.fill(255);
	CurrentBoard.rect(0, 0, CurrentBoard.width - 1, CurrentBoard.height - 1);
	CurrentBoard.fill(0);
	let Board = "Current:" + Samples[0].score.toString().padStart(30, ' ') + " | ";
	Board += (Title +":").padEnd(11, ' ') + Samples.length.toString().padStart(25, ' ') + "\n";
	Board += "Highest:" + BestRecord.toString().padStart(30, ' ') + " | ";
	Board += "Generation:" + Samples[0].generation.toString().padStart(25, ' ') + "\n";
	CurrentBoard.text(Board, 10, 15);
}