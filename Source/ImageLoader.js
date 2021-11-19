
class ImageLoader
{
	imageByName(imageName)
	{
		return this.imagesByName.get(imageName);
	}

	loadImages(images, callback)
	{
		this.images = images;
		this.imagesByName = new Map(this.images.map(x => [x.name, x]));
		this.imagesBySource = new Map(this.images.map(x => [x.source, x]));
		this.callback = callback;
		this.numberOfImagesLoaded = 0;

		for (var i = 0; i < this.images.length; i++)
		{
			var image = this.images[i];
			var systemImage = document.createElement("img");
			systemImage.onload = this.loadImages_ImageLoaded.bind(this);
			image.systemImage = systemImage;
			systemImage.src = image.source;
		}
	}

	loadImages_ImageLoaded(event)
	{
		this.numberOfImagesLoaded++;
		if (this.numberOfImagesLoaded >= this.images.length)
		{
			this.callback(this);
		}
	}
}
