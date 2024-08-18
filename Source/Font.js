
class Font
{
	constructor(name, heightInPixels)
	{
		this.name = name || "sans-serif";
		this.heightInPixels = heightInPixels || 10;
	}

	static default()
	{
		return new Font(null, null);
	}

	toSystemFont()
	{
		return this.heightInPixels + "px " + this.name;
	}
}