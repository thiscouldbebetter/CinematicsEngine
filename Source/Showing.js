
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

		while (true)
		{
			var lineIndexNext = this.lineIndexCurrent + 1;

			if (lineIndexNext >= this.scene.lines.length)
			{
				break;
			}

			this.lineIndexCurrent = lineIndexNext;
			var lineCurrent = this.lineCurrent();
			var lineText = lineCurrent.text;

			var isLineTextStageDirection = (lineText.indexOf("[") == 0);
			if (isLineTextStageDirection == false)
			{
				break;
			}
			else
			{
				var enters = "[enters ";
				var exits = "[exits ";
				var left = "left";
				var right = "right";	

				if (lineText.indexOf(enters) == 0)
				{
					var direction = lineText.substr(enters.length);
					if (direction.indexOf(left) == 0)
					{
						this.actorNamesLeftAndRight[0] = lineCurrent.actorName;
					}
					else
					{
						this.actorNamesLeftAndRight[1] = lineCurrent.actorName;
					}
				}
				else if (lineText.indexOf(exits) == 0)
				{
					var direction = lineText.substr(enters.length);
					if (direction.indexOf(left) == 0)
					{
						this.actorNamesLeftAndRight[0] = null;
					}
					else
					{
						this.actorNamesLeftAndRight[1] = null;
					}
				}
			}
		}
	}

	updateForTimerTick()
	{
		var inputHelper = Globals.Instance.inputHelper;

		if (inputHelper.isMousePressed == true)
		{
			inputHelper.isMousePressed = false;
			this.lineCurrentAdvance();
			this.draw();
		}
	}
}
