
class Display
{
	constructor()
	{
		this.font = Font.default();

		this._actorPosInView = new Coords();
	}

	drawShowing(showing)
	{
		var scene = showing.scene;

		var g = this.graphics;

		if (scene.background != null)
		{
			var backgroundImage = scene.background.image;
			backgroundImage.drawToGraphicsAtPos(g, Coords.zeroes() );
		}

		var lineCurrent = showing.lineCurrent();

		var camera = showing.camera;
		var cameraViewSize = (camera == null ? null : camera.viewSize);

		this._actorPosInView.clear();

		var actorDispositions = showing.actorDispositions;

		for (var i = 0; i < actorDispositions.length; i++)
		{
			var actorDisposition = actorDispositions[i];
			this.drawShowing_ActorDisposition(showing, actorDisposition);
		}

		var title = showing.title;
		if (title != null)
		{
			var textWidth =
				g.measureText(title).width;

			var titlePos = new Coords
			(
				cameraViewSize.x / 2 - textWidth / 2,
				cameraViewSize.y / 2
			);

			this.drawTextAtPos(title, titlePos);
		}
	}

	drawShowing_ActorDisposition(showing, actorDisposition)
	{
		var scene = showing.scene;
		var camera = showing.camera;

		var actorName = actorDisposition.actorName;
		var actor = scene.actorsByName.get(actorName);
		var actorImage = actor.imageCurrent();
		var actorImageSizeActual = actorImage.size();

		var actorPos = actorDisposition.pos;
		var actorPosInView = this._actorPosInView;
		actorPosInView.overwriteWith(actorPos);
		camera.transformCoordsWorldToView(actorPosInView);

		var actorImageSizeApparent =
			actorImageSizeActual.clone().multiplyScalar
			(
				camera.focalLength
			).divideScalar
			(
				actorPosInView.z
			);
		var actorImageSizeApparentHalf =
			actorImageSizeApparent.clone().half();

		var g = this.graphics;

		actorImage.drawToGraphicsAtPosWithSize
		(
			g,
			new Coords // pos
			(
				actorPosInView.x - actorImageSizeApparentHalf.x,
				actorPosInView.y - actorImageSizeApparent.y // !
			),
			actorImageSizeApparent
		)

		var lineCurrent = showing.lineCurrent();
		var hasLineCurrent =
		(
			lineCurrent.actorName == actorName
			&& lineCurrent.speech != null
			&& lineCurrent.speech.length > 0
		);

		if (hasLineCurrent)
		{
			this.drawShowing_ActorDisposition_LineCurrent
			(
				lineCurrent, actorPosInView
			);
		}
	}

	drawShowing_ActorDisposition_LineCurrent(lineCurrent, actorPosInView)
	{
		var lineSpeech = lineCurrent.speech;

		var g = this.graphics;

		var textWidth =
			g.measureText(lineSpeech).width;
		var textAsLines = [ lineSpeech ];
		var numberOfTextLines = textAsLines.length;

		var speechBubbleMargin = 8;
		var textMargin = 8;
		var tailWidthHalf = speechBubbleMargin / 2;
		var tailLength = speechBubbleMargin;

		var fontHeight = this.font.heightInPixels;

		var speechBubbleSize = new Coords
		(
			textWidth + textMargin * 2,
			numberOfTextLines * fontHeight + textMargin * 2
		);

		var speechBubblePosX =
			actorPosInView.x - textWidth / 2 - textMargin;

		if (speechBubblePosX < 0)
		{
			speechBubblePosX = speechBubbleMargin;
		}
		else if (speechBubblePosX + speechBubbleSize.x > this.viewSize.x)
		{
			speechBubblePosX = 
				this.viewSize.x 
				- speechBubbleMargin 
				- textMargin * 2 
				- textWidth;
		}

		var speechBubblePos = new Coords(speechBubblePosX, fontHeight);
		var tailPosX = actorPosInView.x;
		var cornerRadius = textMargin;

		g.beginPath();
		g.moveTo(speechBubblePos.x + cornerRadius, speechBubblePos.y);
		g.arcTo
		(
			speechBubblePos.x + speechBubbleSize.x, speechBubblePos.y,
			speechBubblePos.x + speechBubbleSize.x, speechBubblePos.y + cornerRadius,
			cornerRadius
		);
		g.arcTo
		(
			speechBubblePos.x + speechBubbleSize.x, speechBubblePos.y + speechBubbleSize.y,
			speechBubblePos.x + speechBubbleSize.x - cornerRadius, speechBubblePos.y + speechBubbleSize.y,
			cornerRadius
		);

		g.lineTo(tailPosX + tailWidthHalf, speechBubblePos.y + speechBubbleSize.y);
		g.lineTo(tailPosX, speechBubblePos.y + speechBubbleSize.y + tailLength * 2);
		g.lineTo(tailPosX - tailWidthHalf, speechBubblePos.y + speechBubbleSize.y);

		g.arcTo
		(
			speechBubblePos.x, speechBubblePos.y + speechBubbleSize.y,
			speechBubblePos.x, speechBubblePos.y + speechBubbleSize.y - cornerRadius,
			cornerRadius
		);
		g.arcTo
		(
			speechBubblePos.x, speechBubblePos.y,
			speechBubblePos.x + cornerRadius, speechBubblePos.y,
			cornerRadius
		);
		g.fillStyle = "White";
		g.fill();
		g.strokeStyle = "Gray";
		g.stroke();

		var textPos =
			speechBubblePos
				.clone()
				.addXY(textMargin, textMargin + fontHeight * .8);

		this.drawTextAtPos(lineSpeech, textPos);
	}

	drawTextAtPos(textToDraw, drawPos)
	{
		var g = this.graphics;
		g.fillStyle = "Gray";
		g.fillText
		(
			textToDraw,
			drawPos.x, drawPos.y
		);
	}

	fontSetFromNameAndHeightInPixels(name, heightInPixels)
	{
		if (name != null)
		{
			this.font.name = name;
		}

		if (heightInPixels != null)
		{
			this.font.heightInPixels = heightInPixels;
		}
	}

	initialize(viewSize)
	{
		this.viewSize = viewSize;

		var canvas = document.createElement("canvas");
		canvas.width = this.viewSize.x;
		canvas.height = this.viewSize.y;
		var divOutput = document.getElementById("divOutput");
		divOutput.innerHTML = "";
		divOutput.appendChild(canvas);
		this.graphics = canvas.getContext("2d");
		this.graphics.font = "" + this.font.toSystemFont();

		this.fillStyle = "LightGray";
	}
}
