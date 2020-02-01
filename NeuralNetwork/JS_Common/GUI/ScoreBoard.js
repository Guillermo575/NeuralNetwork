class ScoreBoard
{
	constructor()
	{
		this.BestScore = [];
		this.Panel = createGraphics(600, 200);
		this.Panel.textFont("Lucida Console");
		this.Panel.position(0, 50);
		this.Panel.show();
	}
	EvaluateBestScore(item)
	{
		var cierre = false;
		for (let i = 0; i < this.BestScore.length && !cierre; i++)
		{
			if(this.BestScore[i] == item)
			{
				this.BestScore.splice(i, 1);
				cierre = true;
			}
		}
		cierre = false;
		for (let i = 0; i < this.BestScore.length && !cierre; i++)
		{
			if(this.BestScore[i].score < item.score)
			{
				this.BestScore.splice(i, 0, item);
				cierre = true;
			}
		}
		if(!cierre)
			this.BestScore.splice(this.BestScore.length, 0, item);
		if(this.BestScore.length > 10)
			this.BestScore.splice(this.BestScore.length -1);
	}
	BestRecord()
	{
		return this.BestScore[0].score;
	}
	PrintScoreBoard()
	{
		this.Panel.fill(255);
		this.Panel.rect(0, 0, this.Panel.width - 1, this.Panel.height - 1);
		this.Panel.fill(0);
		var board = "BEST SCORE: \n\n";
		for(let l = 0; l < this.BestScore.length; l++)
		{
			board += (l + 1).toString().padStart(3, '0') + " | ";
			board += "SCORE: " + this.BestScore[l].score.toString().padStart(24, ' ') + " | ";
			board += "ID:" + this.BestScore[l].id.toString().padStart(8, ' ') + " | ";
			board += "GEN:" + this.BestScore[l].generation.toString().padStart(15, ' ') + " | ";
			board += "\n";
		}
		this.Panel.text(board, 20, 20);
	}
	DownloadBrain()
	{
		const filename = "Brain_" + this.BestScore[0].name + ".txt";
		const jsonStr = JSON.stringify(this.BestScore[0]);
		let objSave = document.createElement('a');
		objSave.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(jsonStr));
		objSave.setAttribute('download', filename);
		objSave.style.display = 'none';
		document.body.appendChild(objSave);
		objSave.click();
		document.body.removeChild(objSave);
	}
 }