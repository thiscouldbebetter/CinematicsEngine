
class Image
{
	constructor(source)
	{
		this.source = source;
	}

	size()
	{
		return new Coords(this.systemImage.width, this.systemImage.height);
	}
}
