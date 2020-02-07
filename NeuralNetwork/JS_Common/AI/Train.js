function calculateFitness(lstItems)
{
	let sum = lstItems.reduce((total, item) => total += item.FitnessCriterion(), 0);
	lstItems.forEach ( item => { item.brain.fitness = item.FitnessCriterion() / sum; } );
}
function evolveBrain(Item, lstItems)
{
	let index = 0;
	let r = random(1);
	let genItem = Item.generation;
	let idItem = Item.id;
	let nameItem = Item.name;
	while (r > 0)
	{
		r -= lstItems[index].fitness;
		index ++;
	}
	let pickedItem = lstItems[index - 1];
	pickedItem.mutate(mutate);
	Item = pickedItem.copy();
	Item.setTagNames(genItem, idItem, nameItem);
	return Item;
}
function mutate(val)
{
	return (random(1) < 0.1) ? (val + randomGaussian() * 0.5) : val;
}