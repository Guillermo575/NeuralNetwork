function calculateFitness(lstItems)
{
	let sum = lstItems.reduce((total, item) => total += item.FitnessCriterion(), 0);
	lstItems.forEach ( item => { item.fitness = item.FitnessCriterion() / sum; } );
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
	let pickedItem = lstItems[index - 1];
	pickedItem.brain.mutate(mutate);
	Item.brain = pickedItem.brain.copy();
	return Item;
}
function mutate(val)
{
	return (random(1) < 0.1) ? (val + randomGaussian() * 0.5) : val;
}