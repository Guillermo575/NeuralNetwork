function calculateFitness(lstItems)
{
	let sum = lstItems.reduce((total, item) => total += item.score, 0);
	lstItems.forEach ( item => { item.fitness = item.score / sum; } );
}
function pickOneBrain(Item,lstItems)
{
	let index = 0;
	let r = random(1);
	while (r > 0)
	{
		r -= lstItems[index].fitness;
		index ++;
	}
	let pickedBird = lstItems[index - 1];
	pickedBird.brain.mutate(mutate);
	Item.brain = pickedBird.brain.copy();
	return Item;
}
function mutate(val)
{
	return (random(1) < 0.1) ? (val + randomGaussian() * 0.5) : val;
}