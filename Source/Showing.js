
class Showing
{
	constructor(scene)
	{
		this.scene = scene;
		this.actorNamesLeftAndRight = [];
	}

	draw()
	{
		Globals.Instance.displayHelper.drawShowing(this);
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

			isAwaitingInput = lineCurrent.runForShowing(this);
		}

		Globals.Instance.displayHelper.drawShowing(this);
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
