
class Line
{
	constructor(actorName, text)
	{
		this.actorName = actorName;
		this.text = text;
	}

	static fromString(lineAsString)
	{
		var returnLine;

		lineAsString = lineAsString.trim();

		var colonSpace = ": ";
		var indexOfColonSpaceFirst =
			lineAsString.indexOf(colonSpace);
		if (lineAsString.startsWith("["))
		{
			// Trim off the starting and ending brackets.
			returnLine = new Line(null, lineAsString);
		}
		else if (indexOfColonSpaceFirst <= 0)
		{
			returnLine = null;
		}
		else
		{
			var actorName = lineAsString.substr
			(
				0, indexOfColonSpaceFirst
			);
			var text = lineAsString.substr
			(
				indexOfColonSpaceFirst + colonSpace.length
			);

			returnLine = new Line(actorName, text);
		}

		return returnLine;
	}

	runForShowing(showing)
	{
		var isAwaitingInput;

		var lineCurrent = this;
		var actorName = lineCurrent.actorName;
		var lineText = this.text;

		var isLineTextStageDirection = (lineText.indexOf("[") == 0);
		if (isLineTextStageDirection == false)
		{
			isAwaitingInput = true;
		}
		else
		{
			isAwaitingInput = false;

			// Remove opening and closing brackets.
			lineText = lineText.substr(1, lineText.length - 2);

			var lineTextParts = lineText.split(" ");

			var background = "Background:";
			var enters = "enters";
			var exits = "exits";
			var font = "Font:";
			var role = "Role:";
			var scene = "Scene:";
			var size = "Size:";

			var left = "left";
			var right = "right";

			var operationName = lineTextParts[0];
			var operand0 = lineTextParts[1];
			var operand1 = lineTextParts[2];
			var operand2 = lineTextParts[3];

			if (operationName == background)
			{
				var backgroundName = operand0;
				var backgroundImage = showing.scene.imageByName(backgroundName);
				var background = new Background
				(
					backgroundName, backgroundImage
				);
				showing.scene.background = background;
			}
			else if (operationName == enters)
			{
				var direction = operand0;
				if (direction == left)
				{
					showing.actorNamesLeftAndRight[0] =
						actorName;
				}
				else
				{
					showing.actorNamesLeftAndRight[1] =
						actorName;
				}
			}
			else if (operationName == exits)
			{
				if (showing.actorNamesLeftAndRight[0] == actorName)
				{
					showing.actorNamesLeftAndRight[0] = null;
				}
				else
				{
					showing.actorNamesLeftAndRight[1] = null;
				}
			}
			else if (operationName == font)
			{
				var fontHeight = parseInt(operand0);
				Globals.Instance.displayHelper.fontHeightInPixels = fontHeight;
			}
			else if (operationName == role)
			{
				var actorName = operand0;
				var actorImage = showing.scene.imageByName(actorName);
				var actor = new Actor(actorName, actorImage);
				showing.scene.actorAdd(actor);
			}
			else if (operationName == scene)
			{
				var sceneName = lineText.substring(scene.length + 1);
				showing.scene.name = sceneName;
			}
			else if (operationName == size)
			{
				var displaySizeX = parseInt(operand0);
				var displaySizeY = parseInt(operand1);
				var fontHeight = parseFloat(operand2)
				var displaySize = new Coords(displaySizeX, displaySizeY);
				Globals.Instance.displayHelper.initialize(displaySize, fontHeight);
			}
		}

		return isAwaitingInput;
	}
}
