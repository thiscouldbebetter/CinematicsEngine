
class Orientation
{
	constructor(forward, down)
	{
		this.forward = forward || new Coords(0, 1, 0);
		this.down = down || new Coords(0, 0, 1);
		this.right = new Coords();
		this.orthogonalize();
	}

	static forwardYDownZ()
	{
		return new Orientation
		(
			new Coords(0, 1, 0),
			new Coords(0, 0, 1)
		);
	}

	orthogonalize()
	{
		this.right.overwriteWith
		(
			this.down
		).crossProduct
		(
			this.forward
		);

		this.down.overwriteWith
		(
			this.right
		).crossProduct
		(
			this.forward
		);

		return this;
	}
}