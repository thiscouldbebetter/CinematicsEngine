
class Camera
{
	constructor(viewSize, focalLength, pos, orientation)
	{
		this.viewSize = viewSize;
		this.focalLength = focalLength;
		this.pos = pos || new Coords(0, -focalLength, 0);
		this.orientation = orientation || Orientation.forwardYDownZ();
	}

	transformCoordsWorldToView(worldCoordsToTransform)
	{
		var viewCoords =
			worldCoordsToTransform.subtract
			(
				this.pos
			);

		viewCoords.overwriteWithXYZ
		(
			this.orientation.right.dotProduct(viewCoords),
			this.orientation.down.dotProduct(viewCoords),
			this.orientation.forward.dotProduct(viewCoords),
		);

		var viewCoordsZ = viewCoords.z;

		viewCoords.multiplyScalar
		(
			this.focalLength
		).divideScalar
		(
			viewCoordsZ
		);
		viewCoords.z = viewCoordsZ;

		viewCoords.x += this.viewSize.x / 2;
		viewCoords.y += this.viewSize.y / 2;

		return viewCoords;
	}
}