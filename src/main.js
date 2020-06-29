let lastY = window.scrollY;
let header = document.getElementById("header");

window.onscroll = () => {
	if (window.scrollY > Math.min(lastY, 130)) {
		header.classList.add("minimized");
	} else if (window.scrollY < 130) {
		header.classList.remove("minimized");
	}
};

class HTMLPostElement extends HTMLElement {
	constructor() {
		super();

		let shadow = this.attachShadow({ mode: "open" });

		let div = document.createElement("div");
		div.classList.add("post");
		shadow.appendChild(div);

		let title = document.createElement("h2");
		title.innerHTML = this.postTitle;
		div.appendChild(title);

		let img = document.createElement("img");
		img.src = `images/posts/${this.postImage}.png`;
		div.appendChild(img);

		let style = document.createElement("style");
		style.innerHTML = `.post {
			height: max-content;
			width: 580px;
			background-color: var(--color-purple-2);
			border-radius: 5px;
			margin-bottom: 10px;
			padding-bottom: 10px;
			box-shadow: 0 5px 3px transparent;
			transition: box-shadow 200ms;
			text-align: start;
			cursor: pointer;
		}
		
		.post:hover {
			box-shadow: 0 5px 3px var(--color-gray-2);
		}
		
		.post h2 {
			color: var(--color-gray-1);
			padding-left: 20px;
			width: 100%;
		}
		
		.post img {
			width: 580px;
			border-radius: 0 0 5px 5px;
		}`;
		shadow.appendChild(style);

		div.onclick = () => {
			location.href = this.postUrl;
		};
	}

	get postTitle() {
		return this.getAttribute("post-title");
	}

	get postImage() {
		return this.getAttribute("post-img");
	}

	get postUrl() {
		return this.getAttribute("post-url");
	}
}

customElements.define("web-post", HTMLPostElement);
