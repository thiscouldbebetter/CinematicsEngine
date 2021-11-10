
class DisplayHelper
{
	drawShowing(showing)
	{
		var scene = showing.scene;

		var backgroundImage = scene.background.image.systemImage;
		this.graphics.drawImage
		(
			backgroundImage,
			0, 0
		);

		var actorNames = showing.actorNamesLeftAndRight;

		var widthDivisor = 4;

		var actorPositions = 
		[
			actorPos = new Coords
			(
				this.viewSize.x / widthDivisor,
				this.viewSize.y / 2
			),

			actorPos = new Coords
			(
				(widthDivisor - 1) * this.viewSize.x / widthDivisor,
				this.viewSize.y / 2
			),
		];

		for (var i = 0; i < actorNames.length; i++)
		{
			var actorName = actorNames[i];
			if (actorName != null)
			{
				var actorPos = actorPositions[i];
				var actor = scene.actorsByName.get(actorName);
				var actorImage = actor.image

				this.graphics.drawImage
				(
					actorImage.systemImage,
					actorPos.x - actorImage.size().x / 2, 
					actorPos.y - actorImage.size().y / 2
				);
			}
		}
		
		var line = showing.lineCurrent();
		var text = line.text;
		var isTextStageDirection = (text.indexOf("[") == 0);

		if (isTextStageDirection == false)
		{
			var textWidth = this.graphics.measureText(text).width;
			var textAsLines = [ text ];
			var numberOfTextLines = textAsLines.length;

			var speechBubbleMargin = 8;
			var textMargin = 8;
			var tailWidthHalf = speechBubbleMargin / 2;
			var tailLength = speechBubbleMargin;

			var actorIndex = actorNames.indexOf(line.actorName);
			var actorPos = actorPositions[actorIndex];

			var speechBubbleSize = new Coords
			(
				textWidth + textMargin * 2,
				numberOfTextLines * this.fontHeight + textMargin * 2
			);

			var speechBubblePosX = actorPos.x - textWidth / 2 - textMargin;

			if (actorIndex == 0)
			{
				if (speechBubblePosX < 0)
				{
					speechBubblePosX = speechBubbleMargin;
				}
			}
			else
			{
				if (speechBubblePosX + speechBubbleSize.x > this.viewSize.x)
				{
					speechBubblePosX = 
						this.viewSize.x 
						- speechBubbleMargin 
						- textMargin * 2 
						- textWidth;
				}
			}

			var speechBubblePos = new Coords(speechBubblePosX, this.fontHeight);
			var tailPosX = actorPos.x;
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

			this.graphics.fillStyle = "Gray";
			this.graphics.fillText
			(
				text,
				speechBubblePos.x + textMargin, 
				speechBubblePos.y + textMargin + this.fontHeight * .8
			);

		}
	}

	initialize(fontHeight, viewSize)
	{
		this.fontHeight = fontHeight;
		this.viewSize = viewSize;

		var canvas = document.createElement("canvas");
		canvas.width = this.viewSize.x;
		canvas.height = this.viewSize.y;
		var divMain = document.getElementById("divMain");
		divMain.appendChild(canvas);
		this.graphics = canvas.getContext("2d");
		this.graphics.font = "" + fontHeight + "px sans-serif";

		this.fillStyle = "LightGray";
	}
}
