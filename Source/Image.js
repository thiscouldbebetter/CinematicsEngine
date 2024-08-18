
class Image
{
	constructor(name, source)
	{
		this.name = name;
		this.source = source;

		this.isLoaded = false;
		this.load();
	}

	drawToGraphicsAtPos(graphics, pos)
	{
		this.drawToGraphicsAtPosWithSize(graphics, pos, null);
	}

	drawToGraphicsAtPosWithSize(graphics, pos, sizeToDraw)
	{
		var systemImage = this.systemImage;

		if (sizeToDraw == null)
		{
			graphics.drawImage
			(
				systemImage,
				pos.x, pos.y
			);
		}
		else
		{
			graphics.drawImage
			(
				systemImage,
				0, 0,
				systemImage.width, systemImage.height,
				pos.x, pos.y,
				sizeToDraw.x, sizeToDraw.y
			);
		}
	}

	load()
	{
		if (this.isLoaded == false)
		{
			var image = this;
			var systemImage = document.createElement("img");
			systemImage.onload = (e) =>
			{
				image.isLoaded = true;
			}
			this.systemImage = systemImage;
			systemImage.src = image.source;
		}
	}

	size()
	{
		return new Coords(this.systemImage.width, this.systemImage.height);
	}
}
