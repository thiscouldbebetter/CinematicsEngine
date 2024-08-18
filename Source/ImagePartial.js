
class ImagePartial
{
	constructor(image, size, offset)
	{
		this.image = image;
		this._size = size;
		this.offset = offset;

		this.load();
	}

	static fromImage(image)
	{
		var returnValue = new ImagePartial
		(
			image, image.size(), Coords.zeroes()
		);

		return returnValue;
	}

	static fromImageAndSize(image, size)
	{
		var returnValue = new ImagePartial
		(
			image, size, Coords.zeroes()
		);

		return returnValue;
	}

	drawToGraphicsAtPos(graphics, pos)
	{
		this.image.drawToGraphicsAtPos(graphics, pos);
	}

	drawToGraphicsAtPosWithSize(graphics, pos, sizeToDraw)
	{
		var systemImage = this.image.systemImage;

		var size = this.size();

		graphics.drawImage
		(
			systemImage,
			this.offset.x, this.offset.y,
			size.x, size.y,
			pos.x, pos.y,
			sizeToDraw.x, sizeToDraw.y
		);
	}

	load()
	{
		this.image.load();
	}

	size()
	{
		return this._size;
	}
}
