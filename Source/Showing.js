
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

			isAwaitingInput =
				(lineCurrent.speech != null);
			lineCurrent.runForShowing(this);
		}

		Globals.Instance.display.drawShowing(this);
	}

	updateForTimerTick()
	{
		var inputHelper = Globals.Instance.inputHelper;

		if (inputHelper.isMousePressed)
		{
			inputHelper.isMousePressed = false;
			this.lineCurrentAdvance();
			this.draw();
		}
	}
}
