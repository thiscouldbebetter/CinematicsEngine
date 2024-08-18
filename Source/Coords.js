
class Coords
{
	constructor(x, y, z)
	{
		this.x = x;
		this.y = y;
		this.z = z;
	}

	static ones()
	{
		return new Coords(1, 1, 1);
	}

	static zeroes()
	{
		return new Coords(0, 0, 0);
	}

	add(other)
	{
		this.x += other.x;
		this.y += other.y;
		this.z += other.z;
		return this;
	}

	addXY(x, y)
	{
		this.x += x;
		this.y += y;
		return this;
	}

	clear()
	{
		this.x = 0;
		this.y = 0;
		this.z = 0;
		return this;
	}

	clone()
	{
		return new Coords(this.x, this.y, this.z);
	}

	crossProduct(other)
	{
		var x = this.y * other.z - this.z * other.y;
		var y = this.z * other.x - this.x * other.z;
		var z = this.x * other.y - this.y * other.x;
		this.overwriteWithXYZ(x, y, z);
	}

	divide(other)
	{
		this.x /= other.x;
		this.y /= other.y;
		this.z /= other.z;
		return this;
	}

	divideScalar(scalar)
	{
		this.x /= scalar;
		this.y /= scalar;
		this.z /= scalar;
		return this;
	}

	dotProduct(other)
	{
		return this.x * other.x + this.y * other.y + this.z * other.z;
	}

	half()
	{
		return this.divideScalar(2);
	}

	magnitude()
	{
		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
	}

	multiply(other)
	{
		this.x *= other.x;
		this.y *= other.y;
		this.z *= other.z;
		return this;
	}

	multiplyScalar(scalar)
	{
		this.x *= scalar;
		this.y *= scalar;
		this.z *= scalar;
		return this;
	}

	overwriteWith(other)
	{
		this.x = other.x;
		this.y = other.y;
		this.z = other.z;
		return this;
	}

	overwriteWithXYZ(x, y, z)
	{
		this.x = x;
		this.y = y;
		this.z = z;
		return this;
	}

	normalize()
	{
		return this.divideScalar(this.magnitude());
	}

	subtract(other)
	{
		this.x -= other.x;
		this.y -= other.y;
		this.z -= other.z;
		return this;
	}

	// String.

	static fromString(coordsAsString)
	{
		coordsAsString = coordsAsString || "1x1x1";

		var xyz =
			coordsAsString
				.split("x")
				.map(x => parseFloat(x) );
		return new Coords(xyz[0], xyz[1], xyz[2]);
	}

	toString()
	{
		return this.x + "x" + this.y;
	}
}
