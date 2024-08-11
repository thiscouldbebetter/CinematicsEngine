
class Advancer
{
	constructor(name, updateShowingForTimerTick)
	{
		this.name = name;
		this._updateShowingForTimerTick =
			updateShowingForTimerTick;
	}

	static fromTypeNameAndArgument(advancerTypeName, argument)
	{
		var advancer;

		if (advancerTypeName == "OnClick")
		{
			advancer = Advancer.onClick();
		}
		else if (advancerTypeName == "EveryNTicks")
		{
			var seconds = parseFloat(argument);
			advancer = Advancer.everyNTicks(seconds);
		}
		else
		{
			throw new Error("Advancer type name not recognized: " + advancerTypeName);
		}

		return advancer;
	}

	static everyNTicks(ticksPerAdvance)
	{
		var advancer = new Advancer
		(
			"EveryNTicks",
			(showing) =>
			{
				var advancer = showing.scene.advancer;

				advancer.ticksSoFar++;

				var tickCurrent = advancer.ticksSoFar;
				var tickLastAdvanced = advancer.tickLastAdvanced;
				var ticksSinceLastAdvanced = 
					tickCurrent - tickLastAdvanced;
				var ticksPerAdvance = advancer.ticksPerAdvance;
				if (ticksSinceLastAdvanced >= ticksPerAdvance)
				{
					showing.lineCurrentAdvanceAndDraw();
					advancer.tickLastAdvanced = tickCurrent;
				}
			}
		);

		advancer.ticksPerAdvance = ticksPerAdvance;
		advancer.ticksSoFar = 0;
		advancer.tickLastAdvanced = 0;

		return advancer;
	}

	static onClick()
	{
		return new Advancer
		(
			"OnClick",
			(showing) =>
			{
				var inputHelper = Globals.Instance.inputHelper;

				if (inputHelper.isMousePressed)
				{
					inputHelper.isMousePressed = false;
					showing.lineCurrentAdvanceAndDraw();
				}
			}
		);
	}

	updateShowingForTimerTick(showing)
	{
		this._updateShowingForTimerTick.call(this, showing);
	}
}