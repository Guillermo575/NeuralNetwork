class CurrentBoard
{
	constructor()
	{
		this.Panel = createGraphics(600, 40);
		this.Panel.textFont("Lucida Console");
		this.Panel.position(0, 0);
		this.Panel.show();
	}
	PrintCurrentBoard(Title, Samples, BestRecord)
	{
		this.Panel.fill(255);
		this.Panel.rect(0, 0, this.Panel.width - 1, this.Panel.height - 1);
		this.Panel.fill(0);
		let BestCurrentScore = Samples[0].score;
		for(let i = 0; i < Samples.length; i++)
		{
			BestCurrentScore = Samples[i].score > BestCurrentScore ? Samples[i].score : BestCurrentScore;
		}
		let Board = "Current:" + BestCurrentScore.toString().padStart(30, ' ') + " | ";
		Board += (Title +":").padEnd(11, ' ') + Samples.length.toString().padStart(25, ' ') + "\n";
		Board += "Highest:" + BestRecord.toString().padStart(30, ' ') + " | ";
		Board += "Generation:" + Samples[0].generation.toString().padStart(25, ' ') + "\n";
		this.Panel.text(Board, 10, 15);
	}
}