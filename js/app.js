gsap.registerPlugin(ScrollTrigger);

const cursor = document.querySelector('.cursor');

const lerp = (current, target, factor) =>
	current * (1 - factor) + target * factor;

let mousePosition = { x: 0, y: 0 };
window.addEventListener("mousemove", (e) => {
	mousePosition.x = e.pageX;
	mousePosition.y = e.pageY;
});

const calculateDistance = (x1, y1, x2, y2) => {
	return Math.hypot(x1 - x2, y1 - y2);
};

// ------------------------------------------------------------------------
class MagneticObject {
	constructor(domElement) {
		this.domElement = domElement;
		this.boundingClientRect = this.domElement.getBoundingClientRect();
		this.triggerArea = 180;
		this.interpolationFactor = 0.8;

		this.lerpingData = {
			x: { current: 0, target: 0 },
			y: { current: 0, target: 0 },
		};

		this.render();
		this.resize();
	}

	resize() {
		window.addEventListener("resize", () => {
			this.boundingClientRect = this.domElement.getBoundingClientRect();
		});
	}

	render() {
		const distanceFromMouseToCenter = calculateDistance(
			mousePosition.x,
			mousePosition.y,
			this.boundingClientRect.left + this.boundingClientRect.width / 2,
			this.boundingClientRect.top + this.boundingClientRect.height / 2
		);

		let targetHolder = { x: 0, y: 0 };

		if (distanceFromMouseToCenter < this.triggerArea) {
			this.domElement.classList.add("focus");
			targetHolder.x =
				(mousePosition.x -
					(this.boundingClientRect.left +
						this.boundingClientRect.width / 2)) *
				0.2;
			targetHolder.y =
				(mousePosition.y -
					(this.boundingClientRect.top +
						this.boundingClientRect.height / 2)) *
				0.2;
		} else {
			this.domElement.classList.remove("focus");
		}
		this.lerpingData["x"].target = targetHolder.x;
		this.lerpingData["y"].target = targetHolder.y;

		for (const item in this.lerpingData) {
			this.lerpingData[item].current = lerp(
				this.lerpingData[item].current,
				this.lerpingData[item].target,
				this.interpolationFactor
			);
		}

		this.domElement.style.transform = `translate(${this.lerpingData["x"].current}px, ${this.lerpingData["y"].current}px)`;

		window.requestAnimationFrame(() => this.render());
	}
}

const button = document.querySelector(".header__menu-wrapper");
new MagneticObject(button);


//ANIMATION
TweenMax.to('.overlay-logo svg', 1.5, {
	delay: 0,
	y: 0,
	ease: Expo.easeInOut
})

TweenMax.to('.overlay-logo svg', 1.5, {
	delay: 3,
	y: -100,
	ease: Expo.easeInOut
})

TweenMax.to('.firts', 1.5, {
	delay: 3.7,
	width: "0%",
	ease: Expo.easeInOut
})

TweenMax.to('.second', 1.5, {
	delay: 3.9,
	width: "0%",
	ease: Expo.easeInOut
})

TweenMax.to('.third', 1.5, {
	delay: 4.1,
	width: "0%",
	ease: Expo.easeInOut
})

// MAIN gsap
TweenMax.to('.header__logo a .hide-java img', 1.5, {
	delay: 4.5,
	y: "0",
	ease: Expo.easeInOut
})

TweenMax.to('.header__logo a .hide-jonnor img', 1.5, {
	delay: 4.6,
	y: "0",
	ease: Expo.easeInOut
})

TweenMax.to('.header__navigator li', 1.5, {
	delay: 4.5,
	x: "0",
	stagger: 0.05,
	ease: Expo.easeInOut
})

TweenMax.to('.main__line', 1.5, {
	delay: 4.2,
	width: "100%",
	ease: Expo.easeInOut
})

TweenMax.to('.main__heading .hidetext p', 1.5, {
	delay: 4.5,
	y: "0%",
	ease: Expo.easeInOut
})

TweenMax.to('.main__arrow', 1.5, {
	delay: 4.5,
	ease: Expo.easeInOut
})

//MENU
let t1 = new TimelineMax({ paused: true });

t1.to('.menu-overlay', {
	duration: 1.5,
	right: "0%",
	stagger: .2,
	ease: Expo.easeInOut
})

t1.to('.menuBurger', {
	duration: 1.5,
	x: 0,
	ease: Expo.easeInOut
})

document.querySelector('.header__menu-wrapper').addEventListener('click', () => {
	t1.play();
})
document.querySelector('.menuBurger__close').addEventListener('click', () => {
	t1.reverse();
})



//SCROLL TRIGGER
TweenMax.to('.work__line', 1.5, {
	scrollTrigger: {
		trigger: ".work__heading",
		start: "top center",
	},
	width: "100%",
	ease: Expo.easeInOut
})

//JQUERY
$(document).ready(function(){
	$(".menuBurgerBtn").hover(function() {
		$(".menuBurger__image").toggleClass('visible');
	});
});