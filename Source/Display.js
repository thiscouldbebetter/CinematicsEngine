
class Display
{
	constructor()
	{
		this.fontHeight = 10;

		this._actorPosInView = new Coords();
	}

	drawShowing(showing)
	{
		var scene = showing.scene;

		if (scene.background != null)
		{
			var backgroundImage = scene.background.image.systemImage;
			this.graphics.drawImage
			(
				backgroundImage,
				0, 0
			);
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
				this.graphics.measureText(title).width;

			var titlePos = new Coords
			(
				cameraViewSize.x / 2 - textWidth / 2,
				cameraViewSize.y / 2
			);
			this.graphics.fillStyle = "Gray";
			this.graphics.fillText
			(
				title,
				titlePos.x, titlePos.y
			);
		}
	}

	drawShowing_ActorDisposition(showing, actorDisposition)
	{
		var scene = showing.scene;
		var camera = showing.camera;

		var actorName = actorDisposition.actorName;
		var actor = scene.actorsByName.get(actorName);
		var actorImage = actor.image;
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

		this.graphics.drawImage
		(
			actorImage.systemImage,
			// source
			0, 0,
			actorImageSizeActual.x,
			actorImageSizeActual.y,
			// destination
			actorPosInView.x - actorImageSizeApparentHalf.x,
			actorPosInView.y - actorImageSizeApparent.y,
			actorImageSizeApparent.x,
			actorImageSizeApparent.y
		);

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

		var speechBubbleSize = new Coords
		(
			textWidth + textMargin * 2,
			numberOfTextLines * this.fontHeight + textMargin * 2
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

		var speechBubblePos = new Coords(speechBubblePosX, this.fontHeight);
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

		g.fillStyle = "Gray";
		g.fillText
		(
			lineSpeech,
			speechBubblePos.x + textMargin, 
			speechBubblePos.y + textMargin + this.fontHeight * .8
		);
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
		this.graphics.font = "" + this.fontHeight + "px sans-serif";

		this.fillStyle = "LightGray";
	}
}
