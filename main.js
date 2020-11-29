let lastY = window.scrollY;
let header = document.getElementById("header");

let search = /^.*\/search\/?(\?.*)?$/.test(location.href);

fetch("posts.json")
	.then((response) => response.json())
	.then((data) => {
		let posts = data.posts;
		posts.forEach((post) => {
			let el = document.createElement("div");
			el.classList.add("post");

			let image = document.createElement("img");
			image.src = "./images/posts/" + post.imageName + ".png";
			el.appendChild(image);

			let title = document.createElement("h2");
			title.innerHTML = post.title;
			el.appendChild(title);

			el.onclick = () => (location.href = post.link);
			document.getElementById("app").appendChild(el);
		});
	});
