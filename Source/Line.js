
class Line
{
	constructor(actorName, speech, stageDirection)
	{
		this.actorName = actorName;
		this.speech = speech;
		this.stageDirection = stageDirection;
	}

	static fromString(lineAsString)
	{
		var actorName = null;
		var stageDirection = null;
		var speech = null;

		if (lineAsString.startsWith("["))
		{
			stageDirection = lineAsString;
			stageDirection =
				stageDirection.split("[").join("");
			stageDirection =
				stageDirection.split("]").join("");
		}
		else
		{
			var lineSplitOnColonSpace =
				lineAsString.split(": ");

			actorName = lineSplitOnColonSpace[0];

			var stageDirectionAndOrSpeech =
				lineSplitOnColonSpace[1];

			if (stageDirectionAndOrSpeech == null)
			{
				return null; // hack
			}
			else if (stageDirectionAndOrSpeech.startsWith("["))
			{
				var stageDirectionAndSpeech =
					stageDirectionAndOrSpeech.split("]");

				stageDirection = stageDirectionAndSpeech[0];
				stageDirection =
					stageDirection.split("[").join("");

				speech = stageDirectionAndSpeech[1];
				speech = (speech.length == 0 ? null : speech);
			}
			else
			{
				speech = stageDirectionAndOrSpeech;
			}
		}

		var returnLine = new Line
		(
			actorName, speech, stageDirection
		);

		return returnLine;
	}

	isAwaitingInput()
	{
		var returnValue =
		(
			this.speech != null
			|| this.stageDirection == LineOperationNames.Instance().Pause
		);
		return returnValue;
	}

	runForShowing(showing)
	{
		if (this.stageDirection != null)
		{
			var lineTextParts = this.stageDirection.split(" ");

			var operationName = lineTextParts[0];
			var operand0 = lineTextParts[1];
			var operand1 = lineTextParts[2];
			var operand2 = lineTextParts[3];
			var operand3 = lineTextParts[4];

			var opNames = LineOperationNames.Instance();

			if (operationName == opNames.Background)
			{
				var backgroundName = operand0;
				var backgroundImage = showing.scene.imageByName(backgroundName);
				var background = new Background
				(
					backgroundName, backgroundImage
				);
				showing.scene.background = background;
			}
			else if (operationName == opNames.CameraMoveTo)
			{
				var cameraPosX = parseFloat(operand0);
				var cameraPosY = parseFloat(operand1);
				var cameraPosZ = parseFloat(operand2);

				var cameraPos = new Coords
				(
					cameraPosX, cameraPosY, cameraPosZ
				);

				var camera = showing.camera;
				camera.pos.overwriteWith(cameraPos);
			}
			else if (operationName == opNames.CameraPointAt)
			{
				var camera = showing.camera;
			}
			else if (operationName == opNames.CameraViewSize)
			{
				var viewSizeX = parseInt(operand0);
				var viewSizeY = parseInt(operand1);
				var focalLength = parseInt(operand2);
				var viewSize = new Coords(viewSizeX, viewSizeY);
				Globals.Instance.display.initialize(viewSize);

				var camera = new Camera
				(
					viewSize, focalLength, null, null
				);
				showing.camera = camera;
			}
			else if (operationName == opNames.Enters)
			{
				var markName = operand0;
				var mark = showing.scene.markByName(markName);
				var markPos = mark.pos;
				var actorDisposition = new ActorDisposition
				(
					this.actorName, markPos.clone()
				);
				showing.actorDispositions.push(actorDisposition);
			}
			else if (operationName == opNames.Exits)
			{
				showing.actorRemoveByName(this.actorName);
			}
			else if (operationName == opNames.Font)
			{
				var fontHeight = parseInt(operand0);
				Globals.Instance.display.fontHeight = fontHeight;
			}
			else if (operationName == opNames.Mark)
			{
				var markName = operand0;
				var markPosX = parseFloat(operand1);
				var markPosY = parseFloat(operand2);
				var markPosZ = parseFloat(operand3);
				var markPos = new Coords
				(
					markPosX, markPosY, markPosZ
				);
				var mark = new Mark(markName, markPos);
				showing.scene.markAdd(mark);
			}
			else if (operationName == opNames.Moves)
			{
				var markName = operand0;
				var mark = showing.scene.markByName(markName);
				var markPos = mark.pos;
				var actorDisposition =
					showing.actorDispositionByName(this.actorName);
				actorDisposition.pos.overwriteWith(markPos);
			}
			else if (operationName == opNames.Pause)
			{
				// Do nothing.
			}
			else if (operationName == opNames.Role)
			{
				var actorName = operand0;
				var actorImage = showing.scene.imageByName(actorName);
				var actor = new Actor(actorName, actorImage);
				showing.scene.actorAdd(actor);
			}
			else if (operationName == opNames.Scene)
			{
				var sceneName =
					this.stageDirection.substring(opNames.Scene.length + 1);
				showing.scene.name = sceneName;
			}
			else if (operationName == opNames.Title)
			{
				var titleToSet =
					(operand0.length == 0 ? null : lineTextParts.slice(1).join(" "));
				showing.title = titleToSet;
			}
			else if (operationName == opNames.TitleClear)
			{
				showing.title = "";
			}
		}
	}
}
