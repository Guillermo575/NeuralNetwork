 let BestScore = [];
 let ScoreBoard;
 function CreateScoreBoard(width)
 {
	ScoreBoard = createGraphics(width, 200);
	ScoreBoard.show(); 
 }
function EvaluateBestScore(item)
{
	var cierre = false;
	for (let i = 0; i < BestScore.length && !cierre; i++)
	{
		if(BestScore[i] == item)
		{
			BestScore.splice(i, 1);
			cierre = true;
		}
	}
	cierre = false;
	for (let i = 0; i < BestScore.length && !cierre; i++)
	{
		if(BestScore[i].score < item.score)
		{
			BestScore.splice(i, 0, item);
			cierre = true;
		}
	}
	if(!cierre) BestScore.splice(BestScore.length, 0, item);
	if(BestScore.length > 10) BestScore.splice(BestScore.length -1);
}
function PrintScoreBoard()
{
	ScoreBoard.fill(255);
	ScoreBoard.rect(0, 0, ScoreBoard.width - 1, ScoreBoard.height - 1);
	ScoreBoard.fill(0);
	var board = "BEST SCORE: \n\n";
	for(let l = 0; l < BestScore.length; l++)
	{
		board += (l + 1).toString().padStart(2, '0') + ".-         SCORE: " + BestScore[l].score.toString().padStart(30, ' ') + " | GEN:" + BestScore[l].generation.toString().padStart(20, ' ') + "\n";
	}
	ScoreBoard.text(board, 20, 20);
}
function BestRecord()
{
	return BestScore[0].score;
}