
class Globals
{
	static Instance = new Globals();

	initialize(fontHeight, viewSize, scene)
	{
		this.displayHelper = new DisplayHelper();
		this.displayHelper.initialize(fontHeight, viewSize);

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
