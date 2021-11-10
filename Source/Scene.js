
class Scene
{
	constructor(name, background, actors, lines)
	{
		this.name = name;
		this.background = background;
		this.actors = actors;
		this.lines = lines;

		this.actors = actors;
		this.actorsByName = new Map(this.actors.map(x => [x.name, x]));
	}
}
