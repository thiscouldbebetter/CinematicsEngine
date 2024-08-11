
class Showing
{
	constructor(scene)
	{
		this.scene = scene;

		this.actorDispositions = [];
	}

	actorByName(actorName)
	{
		return this.scene.actorByName(actorName);
	}

	actorDispositionByName(actorName)
	{
		return this.actorDispositions.find(x => x.actorName == actorName);
	}

	actorRemoveByName(actorName)
	{
		var actorDisposition =
			this.actorDispositions.find
			(
				x => x.actorName == actorName
			);

		this.actorDispositions.splice
		(
			this.actorDispositions.indexOf(actorDisposition),
			1
		);
	}

	draw()
	{
		Globals.Instance.display.drawShowing(this);
	}

	initialize()
	{
		this.scene.imagesLoad(this.initialize_ImagesLoaded.bind(this));
	}

	initialize_ImagesLoaded(imageLoader)
	{
		this.isComplete = false;
		this.lineIndexCurrent = null;
		this.lineCurrentAdvance();
		this.draw();
	}

	lineCurrent()
	{
		return (this.scene.lines[this.lineIndexCurrent]);
	}

	lineCurrentAdvance()
	{
		if (this.isComplete)
		{
			return;
		}
		
		if (this.lineIndexCurrent == null)
		{
			this.lineIndexCurrent = -1;
		}

		var isAwaitingInput = false;
		while (isAwaitingInput == false)
		{
			var lineIndexNext = this.lineIndexCurrent + 1;

			if (lineIndexNext >= this.scene.lines.length)
			{
				break;
			}

			this.lineIndexCurrent = lineIndexNext;
			var lineCurrent = this.lineCurrent();

			isAwaitingInput = lineCurrent.isAwaitingInput();
			lineCurrent.runForShowing(this);
		}

		// todo - Is this necessary?
		Globals.Instance.display.drawShowing(this);
	}

	lineCurrentAdvanceAndDraw()
	{
		// todo
		// Isn't it already drawing at the end of .lineCurrentAdvance()?

		this.lineCurrentAdvance();
		this.draw();
	}

	stop()
	{
		if (this.timer != null)
		{
			clearInterval(this.timer);
		}
	}

	ticksPerSecondSet(value)
	{
		if (this.timer != null)
		{
			clearInterval(this.timer);
		}

		var millisecondsPerTimerTick =
			Math.round(1000 / value);

		this.timer = setInterval
		(
			this.updateForTimerTick.bind(this), 
			millisecondsPerTimerTick
		);
	}

	updateForTimerTick()
	{
		var advancer = this.scene.advancer;
		advancer.updateShowingForTimerTick(this);
	}
}
