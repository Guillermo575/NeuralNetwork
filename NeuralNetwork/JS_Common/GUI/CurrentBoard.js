let CurrentBoard;
function CreateCurrentBoard(width)
{
	CurrentBoard = createGraphics(width, 30);
	CurrentBoard.show();
}
function PrintCurrentBoard(textBoard)
{
	CurrentBoard.fill(255);
	CurrentBoard.rect(0, 0, CurrentBoard.width - 1, CurrentBoard.height - 1);
	CurrentBoard.fill(0);
	CurrentBoard.text(textBoard, 20, 20);
}