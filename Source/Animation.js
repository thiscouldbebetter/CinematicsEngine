
class Animation
{
	constructor(name, imageBase, sequences)
	{
		this.name = name;
		this.imageBase = imageBase;
		this.sequences = sequences || [ AnimationSequence.default() ];
	}

	static fromImageBase(imageBase)
	{
		return new Animation(imageBase.name, imageBase, null);
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
		return animation.imageBase;
	}
}
