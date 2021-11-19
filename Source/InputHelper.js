
class InputHelper
{
	constructor()
	{
		this.isMousePressed = false;
	}

	initialize()
	{
		document.body.onmousedown = this.handleEventMouseDown.bind(this);
	}

	handleEventMouseDown(event)
	{
		this.isMousePressed = true;
	}
}
