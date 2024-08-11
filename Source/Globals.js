
class Globals
{
	constructor()
	{
		this.contentFilesUploaded = [];
	}

	static Instance = new Globals();

	contentFileUploadedAdd(contentFileUploaded)
	{
		this.contentFilesUploaded.push(contentFileUploaded);
	}

	runScene(scene)
	{
		var fontHeight = scene.fontHeightInPixels;
		var viewSize = scene.viewSizeInPixels;

		this.display = new Display();

		this.inputHelper = new InputHelper();

		this.showing = new Showing(scene);
		this.showing.initialize();

		this.showing.ticksPerSecondSet(scene.ticksPerSecond);

		this.inputHelper.initialize();
	}
}
