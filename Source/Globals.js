
class Globals
{
	static Instance = new Globals();

	runScene(scene)
	{
		var fontHeight = scene.fontHeightInPixels;
		var viewSize = scene.viewSizeInPixels;

		this.displayHelper = new DisplayHelper();

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
