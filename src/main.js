let lastY = window.scrollY;
let header = document.getElementById("header");

let search = /^.*\/search\/?(\?.*)?$/.test(location.href);

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

		this.shadow = this.attachShadow({ mode: "open" });

		this.divEl = document.createElement("div");
		this.divEl.classList.add("post");
		this.shadow.appendChild(this.divEl);

		this.titleEl = document.createElement("h2");
		if (this.postTitle) this.titleEl.innerHTML = this.postTitle;
		this.divEl.appendChild(this.titleEl);

		this.imgEl = document.createElement("img");
		if (this.postImage) this.imgEl.src = `images/posts/${this.postImage}.png`;
		this.divEl.appendChild(this.imgEl);

		this.styleEl = document.createElement("style");
		this.styleEl.innerHTML = `.post {
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
		this.shadow.appendChild(this.styleEl);

		this.divEl.onclick = () => {
			location.href = this.postLink;
		};
	}

	get postTitle() {
		return this.getAttribute("post-title");
	}

	get postImage() {
		return this.getAttribute("post-img");
	}

	get postLink() {
		return this.getAttribute("post-link");
	}

	set postTitle(v) {
		this.setAttribute("post-title", v);
		this.titleEl.innerHTML = this.postTitle;
	}

	set postImage(v) {
		this.setAttribute("post-img", v);
		this.imgEl.src =
			(search ? "../" : "") + `images/posts/${this.postImage}.png`;
	}

	set postLink(v) {
		this.setAttribute("post-link", v);
	}
}

customElements.define("web-post", HTMLPostElement);

fetch(search ? "../posts.json" : "posts.json")
	.then((response) => response.json())
	.then((data) => {
		let posts = data.posts;
		posts.forEach((post) => {
			if (
				!search ||
				post.tags.includes(
					new URLSearchParams(window.location.search).get("tag")
				)
			) {
				let el;
				let found = false;

				post.overrides?.forEach((override) => {
					if (
						search &&
						override.tags.includes(
							new URLSearchParams(window.location.search).get("tag")
						) &&
						!found
					) {
						found = true;

						el = new HTMLPostElement();
						el.postTitle = override.override.title ?? post.title;
						el.postImage = override.override.imageName ?? post.imageName;
						el.postLink = override.override.link ?? post.link;
					}
				});

				if (!found) {
					el = new HTMLPostElement();
					el.postTitle = post.title;
					el.postImage = post.imageName;
					el.postLink = post.link;
				}

				document.getElementById("app").appendChild(el);
			}
		});
	});
