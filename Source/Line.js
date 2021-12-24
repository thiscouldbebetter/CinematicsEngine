
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

	runForShowing(showing)
	{
		if (this.stageDirection != null)
		{
			var lineTextParts = this.stageDirection.split(" ");

			var opBackground = "Background:";
			var opCameraMoveTo = "CameraMoveTo:";
			var opCameraPointAt = "CameraPointAt:";
			var opCameraViewSize = "CameraViewSize:";
			var opEnters = "enters";
			var opExits = "exits";
			var opFont = "Font:";
			var opMark = "Mark:";
			var opMoves = "moves";
			var opRole = "Role:";
			var opScene = "Scene:";
			var opTitle = "Title:";

			var operationName = lineTextParts[0];
			var operand0 = lineTextParts[1];
			var operand1 = lineTextParts[2];
			var operand2 = lineTextParts[3];
			var operand3 = lineTextParts[4];

			if (operationName == opBackground)
			{
				var backgroundName = operand0;
				var backgroundImage = showing.scene.imageByName(backgroundName);
				var background = new Background
				(
					backgroundName, backgroundImage
				);
				showing.scene.background = background;
			}
			else if (operationName == opCameraMoveTo)
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
			else if (operationName == opCameraPointAt)
			{
				var camera = showing.camera;
			}
			else if (operationName == opCameraViewSize)
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
			else if (operationName == opEnters)
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
			else if (operationName == opExits)
			{
				showing.actorRemoveByName(this.actorName);
			}
			else if (operationName == opFont)
			{
				var fontHeight = parseInt(operand0);
				Globals.Instance.display.fontHeight = fontHeight;
			}
			else if (operationName == opMark)
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
			else if (operationName == opMoves)
			{
				var markName = operand0;
				var mark = showing.scene.markByName(markName);
				var markPos = mark.pos;
				var actorDisposition =
					showing.actorDispositions.find
					(
						x => x.actorName == this.actorName
					);
				actorDisposition.pos.overwriteWith(markPos);
			}
			else if (operationName == opRole)
			{
				var actorName = operand0;
				var actorImage = showing.scene.imageByName(actorName);
				var actor = new Actor(actorName, actorImage);
				showing.scene.actorAdd(actor);
			}
			else if (operationName == opScene)
			{
				var sceneName =
					this.stageDirection.substring(opScene.length + 1);
				showing.scene.name = sceneName;
			}
			else if (operationName == opTitle)
			{
				var titleToSet =
					(operand0.length == 0 ? null : lineTextParts.slice(1).join(" "));
				showing.title = titleToSet;
			}
		}
	}
}
