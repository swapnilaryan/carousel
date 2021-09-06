class Carousel {
	constructor(images) {
		this.template = document.getElementById("template");
		this.ul = document.querySelector("ul");
		this.images = images || [];
		this.xPos = 0;
		this.deviation = 0;
		this.currImgIndex = 0
		this.attachEvent = this.attachEvent.bind(this);
		this.bodyOffsetWidth = document.body.offsetWidth;
		this.initApp();
	}

	initApp() {
		this.createImages();
		this.attachEvent(this.ul)
	}

	createImages() {
		const fragment = new DocumentFragment();
		this.images.forEach(image => {
			const templateContent = document.importNode(this.template.content, true);
			const container = templateContent.querySelector("li");
			container.style.width = `${this.bodyOffsetWidth}px`;
			const img = templateContent.querySelector("img")
			img.setAttribute("src", image);
			img.setAttribute("alt", image);
			fragment.appendChild(templateContent);
		});
		this.ul.appendChild(fragment);
	}

	attachEvent(carousel) {
		if(carousel instanceof HTMLElement ) {
			carousel.addEventListener("touchstart", (e) => {
				this.xPos = e.touches[0].pageX;
			});

			carousel.addEventListener("touchmove", (e) => {
				const currXPos = e.touches[0].pageX;
				this.deviation = currXPos - this.xPos;
				if(this.deviation > 0 && this.currImgIndex !== 0) {
					this.ul.style.transform = `translateX(-${(this.currImgIndex * this.bodyOffsetWidth) - Math.abs(this.deviation)}px)`;
				} else if (this.deviation < 0 && this.currImgIndex !== this.images.length - 1) {
					this.ul.style.transform = `translateX(-${(this.currImgIndex * this.bodyOffsetWidth) + Math.abs(this.deviation)}px)`;
				}
			});

			carousel.addEventListener("touchend", (e) => {
				if(this.deviation < 0) {
					if(this.currImgIndex < this.images.length - 1) {
						this.currImgIndex++
					}
					this.ul.style.transform = `translateX(-${this.bodyOffsetWidth * this.currImgIndex}px)`
				} else {
					if(this.currImgIndex > 0) {
						this.currImgIndex--
					}
					this.ul.style.transform = `translateX(-${this.bodyOffsetWidth * this.currImgIndex}px)`
				}
			});
		}
	}

}
// const images = ["1.jpg", "2.jpg", "3.jpg"];
const images = [
	"https://m.media-amazon.com/images/S/sonata-images-prod/PV_IN_SarpattaParambaraiLaunch_PD/d47f8fbc-c7c3-48a3-a6a4-2df97f83ebc8._UR1280,600_SX1500_FMjpg_.jpeg",
	"https://m.media-amazon.com/images/S/sonata-images-prod/PV_IN_TomandJerry_PD/ee7fe9ce-a66c-45d2-befa-f73af4cea919._UR1280,600_SX1500_FMjpg_.jpeg",
	"https://m.media-amazon.com/images/S/sonata-images-prod/PV_IN_CoolieNo1REviewsRegular/511c4474-fb0e-467c-a91e-e73fbcb0c652._UR1280,600_SX1500_FMjpg_.jpg"
];
const obj = new Carousel(images);