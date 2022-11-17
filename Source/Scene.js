
class Scene
{
	constructor
	(
		name,
		fontHeightInPixels,
		contentFiles,
		camera,
		marks,
		lines
	)
	{
		this.name = name;
		this.contentFiles = contentFiles;
		this.fontHeightInPixels = fontHeightInPixels;
		this.camera = camera;
		this.marks = marks || [];
		this.lines = lines;

		this.contentFilesByName = new Map
		(
			this.contentFiles.map
			(
				x => [ x.name, x ]
			)
		);

		this.marksByName = new Map();

		this.actors = [];
		this.actorsByName = new Map();
	}

	static fromContentFilesAndString(contentFiles, sceneAsString)
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
		var returnScene = new Scene
		(
			null, // name
			null, // fontHeightInPixels 
			contentFiles,
			null, // camera
			null, // marks
			lines
		);

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
					var imageData =
					(
						this.contentFilesByName.has(imageSourcePath)
						? this.contentFilesByName.get(imageSourcePath).contentsAsDataUrl
						: imageData = imageSourcePath
					);

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
