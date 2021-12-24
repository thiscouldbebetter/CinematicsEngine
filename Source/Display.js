
class Display
{
	constructor()
	{
		this.fontHeight = 10;
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

		var actorPosInView = new Coords();

		var actorDispositions = showing.actorDispositions;

		for (var i = 0; i < actorDispositions.length; i++)
		{
			var actorDisposition = actorDispositions[i];
			var actorName = actorDisposition.actorName;
			var actor = scene.actorsByName.get(actorName);
			var actorImage = actor.image;
			var actorImageSizeActual = actorImage.size();

			var actorPos = actorDisposition.pos;
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

			var hasLineCurrent =
			(
				lineCurrent.actorName == actorName
				&& lineCurrent.speech != null
				&& lineCurrent.speech.length > 0
			);

			if (hasLineCurrent)
			{
				var lineSpeech = lineCurrent.speech;

				var textWidth =
					this.graphics.measureText(lineSpeech).width;
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

				this.graphics.beginPath();
				this.graphics.moveTo(speechBubblePos.x + cornerRadius, speechBubblePos.y);
				this.graphics.arcTo
				(
					speechBubblePos.x + speechBubbleSize.x, speechBubblePos.y,
					speechBubblePos.x + speechBubbleSize.x, speechBubblePos.y + cornerRadius,
					cornerRadius
				);
				this.graphics.arcTo
				(
					speechBubblePos.x + speechBubbleSize.x, speechBubblePos.y + speechBubbleSize.y,
					speechBubblePos.x + speechBubbleSize.x - cornerRadius, speechBubblePos.y + speechBubbleSize.y,
					cornerRadius
				);

				this.graphics.lineTo(tailPosX + tailWidthHalf, speechBubblePos.y + speechBubbleSize.y);
				this.graphics.lineTo(tailPosX, speechBubblePos.y + speechBubbleSize.y + tailLength * 2);
				this.graphics.lineTo(tailPosX - tailWidthHalf, speechBubblePos.y + speechBubbleSize.y);

				this.graphics.arcTo
				(
					speechBubblePos.x, speechBubblePos.y + speechBubbleSize.y,
					speechBubblePos.x, speechBubblePos.y + speechBubbleSize.y - cornerRadius,
					cornerRadius
				);
				this.graphics.arcTo
				(
					speechBubblePos.x, speechBubblePos.y,
					speechBubblePos.x + cornerRadius, speechBubblePos.y,
					cornerRadius
				);
				this.graphics.fillStyle = "White";
				this.graphics.fill();
				this.graphics.strokeStyle = "Gray";
				this.graphics.stroke();

				this.graphics.fillStyle = "Gray";
				this.graphics.fillText
				(
					lineSpeech,
					speechBubblePos.x + textMargin, 
					speechBubblePos.y + textMargin + this.fontHeight * .8
				);
			}
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
