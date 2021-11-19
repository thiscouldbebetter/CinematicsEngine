
class Image
{
	constructor(name, source)
	{
		this.name = name;
		this.source = source;

		this.load();
	}

	load()
	{
		this.isLoaded = false;
		var image = this;
		var systemImage = document.createElement("img");
		systemImage.onload = (e) =>
		{
			image.isLoaded = true;
		}
		this.systemImage = systemImage;
		systemImage.src = image.source;
	}

	size()
	{
		return new Coords(this.systemImage.width, this.systemImage.height);
	}
}
