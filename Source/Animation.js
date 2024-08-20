
class Animation
{
	constructor(name, imageBaseSizeInFrames, imageBase, sequences)
	{
		this.name = name;
		this.imageBaseSizeInFrames =
			imageBaseSizeInFrames || Coords.ones();
		this.imageBase = imageBase;
		this.sequences =
			sequences || [ AnimationFrameSequence.default() ];
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

	update()
	{
		var sequenceCurrent = this.sequenceCurrent();
		sequenceCurrent.update();
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

	update()
	{
		var animationCurrent = this.animationCurrent();
		animationCurrent.update();
	}
}

class AnimationFrameSequence
{
	constructor(boundsWithinImageBase, ticksToHold, repeats)
	{
		this.boundsWithinImageBase = boundsWithinImageBase;
		this.ticksToHold = ticksToHold || 1;
		this.repeats = repeats || false;

		this.frameIndexCurrent = 0;
		this.ticksOnFrameCurrent = 0;
		this._done = false;
	}

	static default()
	{
		return new AnimationFrameSequence(null, null, null);
	}

	done()
	{
		return this._done;
	}

	frameCurrentIndex()
	{
		return 0; // todo
	}

	imageCurrentForAnimation(animation)
	{
		var frameSizeInPixels =
			animation.frameSizeInPixels();

		var frameCurrentIndex = this.frameCurrentIndex();
		var frameOffsetInFrames =
			new Coords(frameCurrentIndex, 0);
		var frameOffsetInPixels =
			frameOffsetInFrames.multiply(frameSizeInPixels);

		var returnValue = ImagePartial.fromImageSizeAndOffset
		(
			animation.imageBase,
			frameSizeInPixels,
			frameOffsetInPixels
		);

		return returnValue;
	}

	update()
	{
		var isStarted =
			this.ticksOnFrameCurrent != null;

		if (isStarted == false)
		{
			this.ticksOnFrameCurrent = 0;
		}
		else
		{
			this.ticksOnFrameCurrent++;

			if (this.ticksOnFrameCurrent >= this.ticksToHold)
			{
				if (this.repeats)
				{
					this.ticksOnFrameCurrent = 0;
				}
				else
				{
					this._done = true;
				}
			}
		}
	}
}
