
class ContentFile
{
	constructor(name, contentsAsDataUrl)
	{
		this.name = name;
		this.contentsAsDataUrl = contentsAsDataUrl;
	}

	static fromNameAndContentsAsDataUrl(name, contentsAsDataUrl)
	{
		return new ContentFile(name, contentsAsDataUrl);
	}

	toDomElementOption()
	{
		var d = document;
		var optionElement = d.createElement("option");
		optionElement.id = this.name;
		optionElement.text = this.name;
		optionElement.value = this.name;

		return optionElement;
	}
}