
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

		var millisecondsPerTimerTick = 100;
		setInterval
		(
			this.handleEventTimerTick.bind(this), 
			millisecondsPerTimerTick
		);

		this.inputHelper.initialize();
	}

	// events

	handleEventTimerTick()
	{
		this.showing.updateForTimerTick();
	}
}
