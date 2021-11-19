
class Scene
{
	constructor
	(
		name,
		fontHeightInPixels,
		viewSizeInPixels,
		lines
	)
	{
		this.name = name;
		this.fontHeightInPixels = fontHeightInPixels;
		this.viewSizeInPixels = viewSizeInPixels;
		this.lines = lines;

		this.actors = [];
		this.actorsByName = new Map();
	}

	static fromString(sceneAsString)
	{
		var newline = "\n";
		var sceneAsTextLines = sceneAsString.split(newline);
		var lines = sceneAsTextLines.map(
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
			null, // viewSizeInPixels
			lines
		);

		return returnScene;
	}

	actorAdd(actorToAdd)
	{
		this.actors.push(actorToAdd);
		this.actorsByName.set(actorToAdd.name, actorToAdd);
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
			var lineText = line.text;
			// Trim opening and closing brackets.
			lineText = lineText.substr(1, lineText.length - 2);
			var lineTextParts = lineText.split(" ");
			var operationName = lineTextParts[0];

			var doesLineRequireMedia =
			(
				operationName == "Background:"
				|| operationName == "Role:"
			);

			if (doesLineRequireMedia)
			{
				var imageName = lineTextParts[1];
				var imageSource = lineTextParts[2];

				var image = new Image(imageName, imageSource);
				imagesToLoad.push(image);
			}
		}

		this.imageLoader = new ImageLoader();
		this.imageLoader.loadImages(imagesToLoad, callback);
	}
}
