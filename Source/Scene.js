
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
