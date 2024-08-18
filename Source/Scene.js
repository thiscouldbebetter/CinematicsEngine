
class Scene
{
	constructor
	(
		name,
		ticksPerSecond,
		advancer,
		fontHeightInPixels,
		camera,
		marks,
		lines
	)
	{
		this.name = name;
		this.ticksPerSecond = ticksPerSecond || 10;
		this.advancer = advancer || Advancer.onClick();
		this.fontHeightInPixels = fontHeightInPixels;
		this.camera = camera;
		this.marks = marks || [];
		this.lines = lines;

		this.marksByName = new Map();

		this.actors = [];
		this.actorsByName = new Map();
	}

	static demo()
	{
		var sceneAsLines =
		[
			"[CameraViewSize: 200 150 100]",
			"[CameraMoveTo: 0 -100 25]",
			"[CameraPointAt: 0 0 0]",
			"[Font: 10]",
			"[Advance: EveryNTicks 50]",
			"[TicksPerSecond: 25]",
			"",
			"[Scene: We Need to Talk About Spot]",
			"===================================",
			"",
			"[Background: Suburbia ../Content/Demo/Suburbia.png]",
			"",
			"[Mark: left 50 0 0]",
			"[Mark: right -50 0 0]",
			"[Mark: right_downstage -50 30 0]",
			"[Mark: right_upstage -50 -30 0]",
			"",
			"[Role: Rick data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsIAAA7CARUoSoAAAAF4SURBVHhe7ZhBboUwDEShV+i2y97/RF122zPQuhpUKw39cWynQuMnoUEf9GcYQgTZP15ej42YJygtVQCUlioASksVAKWlCoDSUgVAaQn7Fnh+f8PeD1//jb0YMjzcBfRCtXhDZnpMFzASqsUacoXH1BzQC3Ycx6+txXJBKzyEkEmwF0S4+n2GLA9zAW3DjwLIcX3OyB1a4XHiGgGPgkWQ7WEqQDdrDTZ6h1Z4aELmgCv2ff/eMvF6pBWgQ2WVEOGROgLuQFoB+nm0PsujRHiYCtBvWSNDTkKdwfT5f72trfDQuEbA7HNnIdvDXID1XVuwXsQKjxP3HCDGV+a9Y7MXl+UxVUDP4AyitxZLsBUewpL1AMEaTJPpUStCUQXcFfckeHeqACgtVQCUlioASksVAKWlCoDSQl9AyMfQ6OdqFp4vQvcI+O+LFzwZag6A0uIuIHrVZwZPhloRgtJSBUBpqQKgtFQBUFqqACgtVQCUlioASgt5Adv2CXk2xQQ6lAUqAAAAAElFTkSuQmCC]",
			"",
			"[Role: Jane data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsIAAA7CARUoSoAAAAF5SURBVHhe7ZkLjoMwEEOhp9jT7eF6ut6CLSu3CoHSTDIzamU/CRmVCg/OhyjM0/W2TMRcoLQoACgtCgBKiwKA0qIAoLTQB+CzFP79wUnB9YYTJ4I8xgI4KqpmtMhgj74AWoqqsRaZ4XHHPgccFLYsy+7YYXmgDA8wPAkeFnLn1e89RHrYAigSXs3fFbC73tJCGR4F4a/Bdw/gwYhHewBVy1jY/P+shTI8KoZ6wDzP/0ck0R7dAZRFRRWY4RE+B3w63QGUY846XlvJ8GgPoFhlPbrjWlRLYZvue7Zay/CoCB8CUWO3ZMTDZRJsxrhWz/CwBVDdfC3wVZFn107J8Ciw94CDhB+FlMcOS8tkeID+/YDW1VZHUU8SPLQj5BLAFxP+Gvx0FACUFgUApUUBQGlRAFBaFACUFgUApUUBQGmhDyBmQ8TwcdKM806Tfw+IfPgV5/trDoDS4h+A925wjfP9tSsMpUUBQGlRAFBaFACUFgUApUUBQEmZpj/AmK9JWkteywAAAABJRU5ErkJggg==]",
			"",
			"[Role: Spot data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAEnQAABJ0Ad5mH3gAAADISURBVGhD7dhBCoMwEIXhaTchJ/BMnswr5BxZ5jbJLjmBO01g2kLtcuoj8D6QJlbQH4ygj6OTiT31d1oMQGMAGgPQGIDGADQGoDEAjQFoDPhl33cppUitVff80XgntpRSGu/Y7y2EcOSc9V97pgHfF//atm3TI+yZfZUYt433XmdXRqe5MFsDrTUd3csswDmno3uZBSzLIn3B6uw+po/RdV2lL1idfcQYdWSPnxbRGIDGADQGoDEAjQFoDEBjABoD0BiANnmAyAmV9IYPSausUgAAAABJRU5ErkJggg==]",
			"",
			"[Title: \"We Need to Talk About Spot\"]",
			"[Pause]",
			"[TitleClear]",
			"",
			"Rick: [enters left]",
			"Jane: [enters right]",
			"Rick: Jane, have you seen Spot?",
			"Jane: His NAME is Mr. Beansprouts.",
			"Rick: For the hundredth time, no it's NOT.",
			"Jane: Yes, it is.  I'll prove it.",
			"Jane: Come here, Mr. Beansprouts!",
			"[Pause]",
			"Jane: [moves right_downstage] Mr. Beeeeeeansprouts!",
			"[Pause]",
			"[Font: 12]",
			"Jane: [moves right_upstage] RIGHT NOW, MR. BEANSPROUTS!",
			"[Font: 10]",
			"[Pause]",
			"Jane: [moves right] Stupid dog.  Forget it.",
			"Jane: [exits]",
			"[Pause]",
			"Spot: [enters right]",
			"Spot: Is she gone?",
			"Spot: I've told her a million times...",
			"Spot: ...it's DOCTOR Beansprouts.",
			"Spot: Anyway, you wanted to see me?",
			"Rick: Shut up and get in the crate, Spot.",
			"Spot: Yes, sir.",
			"Rick: [exits]",
			"Spot: [exits]",
			"",
			"[Title: THE END]",
			"[End]"
		];

		var scene = Scene.fromLines(sceneAsLines);

		return scene;
	}

	static fromLines(lines)
	{
		return new Scene
		(
			null, // name,
			null, // ticksPerSecond
			null, // advancer,
			null, // fontHeightInPixels,
			null, // camera,
			null, // marks,
			lines
		);
	}

	static fromString(sceneAsString)
	{
		var newline = "\n";
		var sceneAsTextLines = sceneAsString.split(newline);
		var lines = sceneAsTextLines.filter
		(
			x => x.length > 0
		).map(
			x => Line.fromString(x)
		).filter
		(
			x => x != null
		);

		// Null fields will be set by stage directions in the lines array.
		var returnScene = Scene.fromLines(lines);

		return returnScene;
	}

	actorAdd(actorToAdd)
	{
		this.actors.push(actorToAdd);
		this.actorsByName.set(actorToAdd.name, actorToAdd);
	}

	actorByName(actorName)
	{
		return this.actorsByName.get(actorName);
	}

	actorRemoveByName(actorToRemoveName)
	{
		var actorToRemove = this.actorByName(actorToRemoveName);
		this.actors.splice(this.actors.indexOf(actorToRemove), 1);
		this.actorsByName.delete(actorToRemoveName);
	}

	backgroundSet(background)
	{
		this.background = background;
	}

	imageByName(imageName)
	{
		return this.imageLoader.imageByName(imageName);
	}

	imagesLoad(callback)
	{
		var imagesToLoad = [];

		for (var i = 0; i < this.lines.length; i++)
		{
			var line = this.lines[i];
			var stageDirection = line.stageDirection;
			if (stageDirection != null)
			{
				var stageDirectionParts = stageDirection.split(" ");
				var operationName = stageDirectionParts[0];

				var doesLineRequireMedia =
				(
					operationName == "Background:"
					|| operationName == "Role:"
				);

				if (doesLineRequireMedia)
				{
					var imageName = stageDirectionParts[1];
					var imageSourcePath = stageDirectionParts[2];
					var imageData = imageSourcePath;

					var imageToLoad = new Image(imageName, imageData);

					imagesToLoad.push(imageToLoad);
				}
			}
		}

		this.imageLoader = new ImageLoader();
		this.imageLoader.loadImages(imagesToLoad, callback);
	}

	markAdd(markToAdd)
	{
		this.marks.push(markToAdd);
		this.marksByName.set(markToAdd.name, markToAdd);
	}

	markByName(markName)
	{
		return this.marksByName.get(markName);
	}
}
