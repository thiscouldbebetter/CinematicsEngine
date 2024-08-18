
class Animation
{
	constructor(name, imageBaseSizeInFrames, imageBase, sequences)
	{
		this.name = name;
		this.imageBaseSizeInFrames =
			imageBaseSizeInFrames || Coords.ones();
		this.imageBase = imageBase;
		this.sequences =
			sequences || [ AnimationSequence.default() ];
	}

	static fromImageBase(imageBase)
	{
		return new Animation
		(
			imageBase.name,
			null, // imageBaseSizeInFrames
			imageBase,
			null // sequences
		);
	}

	static fromImageBaseAndSizeInFrames
	(
		imageBase, imageBaseSizeInFrames
	)
	{
		return new Animation
		(
			imageBase.name,
			imageBaseSizeInFrames,
			imageBase,
			null // sequences
		);
	}

	frameSizeInPixels()
	{
		var returnValue =
			this.imageBase
				.size()
				.divide(this.imageBaseSizeInFrames);

		return returnValue;
	}

	imageCurrent()
	{
		var sequenceCurrent = this.sequenceCurrent();
		var imageCurrent =
			sequenceCurrent.imageCurrentForAnimation(this);
		return imageCurrent;
	}

	sequenceCurrent()
	{
		return this.sequences[0]; // todo
	}
}

class AnimationGroup
{
	constructor(name, animations)
	{
		this.name = name;
		this.animations = animations;
	}

	static fromImage(image)
	{
		return new AnimationGroup
		(
			image.name,
			[ Animation.fromImageBase(image) ]
		);
	}

	static fromImageAndSizeInFrames(image, sizeInFrames)
	{
		var animation =
			Animation.fromImageBaseAndSizeInFrames(image, sizeInFrames);

		return new AnimationGroup
		(
			image.name,
			[ animation ]
		);
	}

	animationCurrent()
	{
		return this.animations[0];
	}

	imageCurrent()
	{
		var animation = this.animationCurrent();
		var imageCurrent = animation.imageCurrent();
		return imageCurrent;
	}
}

class AnimationSequence
{
	constructor(boundsWithinImageBase, frameCount)
	{
		this.boundsWithinImageBase = boundsWithinImageBase;
		this.frameCount = frameCount;
	}

	static default()
	{
		return new AnimationSequence(null, null);
	}

	imageCurrentForAnimation(animation)
	{
		var frameSizeInPixels =
			animation.frameSizeInPixels();

		var returnValue = ImagePartial.fromImageAndSize
		(
			animation.imageBase,
			frameSizeInPixels
		);
		return returnValue;
	}
}
