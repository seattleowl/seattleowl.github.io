
	//ui-menu
		var MenuProto = Object.create(HTMLElement.prototype);
		MenuProto.createdCallback = function() {
			var color = this.getAttribute('color')
			var height = this.getAttribute('height')

			var header = document.createElement("h2")
			header.innerHTML = this.innerHTML
			this.innerHTML = ""

			var background = document.createElement("div")
			background.style = "width:100%;top:0;left:0;position:fixed;background-color:" + color + ";height:" + (height || "30") + "px"
			background.appendChild(header)

			this.appendChild(background)

			header.style = "cursor:default;margin:0px;margin-left:10px;margin-top:" + ((height / 2) - (header.clientHeight / 2)) + "px"
		}
		var HTMLMenuElement = document.registerElement("seakit-ui-menu", {
			prototype: MenuProto
		})
	//ui-menu-item
		var MenuItemProto = Object.create(HTMLElement.prototype);
		MenuItemProto.createdCallback = function() {
				var height = this.getAttribute('height')
				var header = document.createElement("a")
				header.innerHTML = this.innerHTML
				this.innerHTML = ""
				this.addEventListener('click', function(e) {
					window.location = this.getAttribute('href')
				})
				this.appendChild(header)
				header.style = "cursor:pointer!important;text-decoration:none;margin:0px;margin-left:30px;margin-top:" + ((height / 2) - (header.clientHeight / 2)) + "px"
				if (this.getAttribute('hoverColor')) {
					var css = 'seakit-ui-menu-item a:hover{color: ' + this.getAttribute('hoverColor') + ";}seakit-ui-menu-item a{color: " + this.getAttribute('color') + ";-webkit-transition: color 1s;transition: color 1s;}"
					var style = document.createElement('style');
					if (style.styleSheet) {
					    style.styleSheet.cssText = css;
					} else {
					    style.appendChild(document.createTextNode(css));
					}
					document.getElementsByTagName('head')[0].appendChild(style);
				}
			}
			var HTMLMenuItemElement = document.registerElement("seakit-ui-menu-item", {
				prototype: MenuItemProto
			})