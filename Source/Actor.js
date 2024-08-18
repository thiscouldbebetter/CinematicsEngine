
class Actor
{
	constructor(name, animationGroup)
	{
		this.name = name;
		this.animationGroup = animationGroup;
	}

	imageCurrent()
	{
		return this.animationGroup.imageCurrent();
	}
}
