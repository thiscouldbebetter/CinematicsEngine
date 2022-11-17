
class LineOperationNames
{
	constructor()
	{
		this.Background = "Background:";
		this.CameraMoveTo = "CameraMoveTo:";
		this.CameraPointAt = "CameraPointAt:";
		this.CameraViewSize = "CameraViewSize:";
		this.Enters = "enters";
		this.Exits = "exits";
		this.Font = "Font:";
		this.Mark = "Mark:";
		this.Moves = "moves";
		this.Pause = "Pause";
		this.Role = "Role:";
		this.Scene = "Scene:";
		this.Title = "Title:";
		this.TitleClear = "TitleClear";
	}

	static Instance()
	{
		if (LineOperationNames._instance == null)
		{
			LineOperationNames._instance = new LineOperationNames();
		}
		return LineOperationNames._instance;
	}
}
