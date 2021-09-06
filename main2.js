class Carousel {
	constructor(images = []) {
		this.images = images;
		this.ulCarousel = document.getElementById("ulCarousel");
		this.template = document.getElementById("template");
		this.currImgIndex = 0;
		this.deviation = 0;
		this.deviceWidth = document.documentElement.offsetWidth;
		this.onTouchStart = this.onTouchStart.bind(this);
		this.onTouchMove = this.onTouchMove.bind(this);
		this.onTouchEnd = this.onTouchEnd.bind(this);
		this.initApp();
	}

	initApp() {
		this.createImages();
		this.dispatchEvents();
	}

	createImages() {
		const fragment = new DocumentFragment();
		this.images.forEach((image) => {
			const templateContent = this.template.content.cloneNode(true);
			const container = templateContent.querySelector(".container");
			const img = templateContent.querySelector("img");
			img.setAttribute("src", image);
			img.setAttribute("alt", image);
			fragment.appendChild(container);
		});
		this.ulCarousel.appendChild(fragment);
	}

	onTouchStart(e) {
		this.posX = e.pageX || e.touches[0].pageX;
	}

	onTouchMove(e){

		if(this.posX) {
			const currX = e.pageX || e.touches[0].pageX;
			this.deviation = currX - this.posX;
			if (this.deviation > 0 && this.currImgIndex !== 0) {
				this.ulCarousel.style.transform = `translateX(-${this.currImgIndex * this.deviceWidth - Math.abs(this.deviation)}px)`;
			} else if (this.deviation < 0 && this.currImgIndex !== this.images.length-1) {
				this.ulCarousel.style.transform = `translateX(-${this.currImgIndex * this.deviceWidth + Math.abs(this.deviation)}px)`;
			}
		}
	}

	onTouchEnd(e) {
		console.log(e)

		if (this.deviation < 0) {
			if(this.currImgIndex < this.images.length - 1) {
				this.currImgIndex++;
			}
		} else {
			if(this.currImgIndex > 0) {
				this.currImgIndex--;
			}
		}
		this.ulCarousel.style.transform = `translateX(-${this.currImgIndex * this.deviceWidth}px)`;
		this.posX = 0;
	}

	dispatchEvents() {
		this.ulCarousel.addEventListener("touchstart", this.onTouchStart);
		this.ulCarousel.addEventListener("touchmove", this.onTouchMove);
		this.ulCarousel.addEventListener("touchend", this.onTouchEnd);

		this.ulCarousel.addEventListener("dragenter", this.onTouchStart);
		this.ulCarousel.addEventListener("dragover", this.onTouchMove);
		this.ulCarousel.addEventListener("dragend", this.onTouchEnd);
	}
}

const images = [
	"https://m.media-amazon.com/images/S/sonata-images-prod/PV_IN_SarpattaParambaraiLaunch_PD/d47f8fbc-c7c3-48a3-a6a4-2df97f83ebc8._UR1280,600_SX1500_FMjpg_.jpeg",
	"https://m.media-amazon.com/images/S/sonata-images-prod/PV_IN_TomandJerry_PD/ee7fe9ce-a66c-45d2-befa-f73af4cea919._UR1280,600_SX1500_FMjpg_.jpeg",
	"https://m.media-amazon.com/images/S/sonata-images-prod/PV_IN_CoolieNo1REviewsRegular/511c4474-fb0e-467c-a91e-e73fbcb0c652._UR1280,600_SX1500_FMjpg_.jpg"
];

// const images = ["1.jpg", "2.jpg", "3.jpg"];
const obj = new Carousel(images);
