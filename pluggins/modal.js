Element.prototype.appendAfter = function (element) {
	element.parentNode.insertBefore(this, element.nextSibling);
};


function noop() { };

function _createModalFooter(buttons = []) {
	if (buttons.length === 0) {
		return document.createElement("div");
	}
	const wrap = document.createElement("div");
	wrap.classList.add("modal-footer");
	buttons.forEach(btn => {
		const $btn = document.createElement('button');
		$btn.textContent = btn.text;
		$btn.classList.add('btn');
		$btn.classList.add(`btn-${btn.type || 'secondary'}`);
		$btn.onclick = btn.handler || noop;

		wrap.appendChild($btn);
	})

	return wrap;
}

function _createModal({ title, closable, content, width, footerButtons }) {
	const DEFAULT_WIDTH = "600px";
	const markup = `<div class="modal-overlay">
                <div class="modal-window">
                    <div class="modal-header">
                        <span class="modal-title">${title}</span>
                        ${
													closable
														? `<span class="modal-close" data-close="true">&times;</span>`
														: ""
												}
                    </div>
                    <div class="modal-body" data-content>
                       ${content || ""}
                    </div>                   
                </div>
            </div>`;

	const modal = document.createElement("div");
	modal.classList.add("vmodal");
	modal.style.width = `${width || DEFAULT_WIDTH}`;
	modal.insertAdjacentHTML("afterbegin", markup);
	const footer = _createModalFooter(footerButtons);
	footer.appendAfter(modal.querySelector("[data-content]"));
	document.body.appendChild(modal);
	return modal;
}

const options = {
	title: "Modal",
	closable: true,
	content: `<h4>Modal window is working</h4>
	<p>lorem is a basic text</p>`,
	width: "400px",
	footerButtons: [
		{
			text: "OK",
			type: "primary",
			handler() {
				console.log("Primary btn clicked");
				modal.close();
			},
		},
		{
			text: "Cancel",
			type: "danger",
			handler() {
				console.log("Danger btn clicked");
				modal.close();
			},
		},
	],
};

$.modal = function (options) {
	const ANIMATION_SPEED = 200;
	const $modal = _createModal(options);
	let closing = false;
	let destroyed = false;

	const modal = {
		open() {
			if (destroyed) {
				return console.log("Modal is destroyed!");
			}
			!closing && $modal.classList.add("open");
		},
		close() {
			closing = true;
			$modal.classList.remove("open");
			$modal.classList.add("hide");
			setTimeout(() => {
				$modal.classList.remove("hide");
				closing = false;
			}, ANIMATION_SPEED);
		},
	};

	const listener = (event) => {
		const closeBtn = event.target.dataset.close;
		if (closeBtn) {
			modal.close();
		}
	};

	$modal.addEventListener("click", listener);

	return Object.assign(modal, {
		destory() {
			$modal.parentNode.removeChild($modal);
			$modal.removeEventListener("click", listener);
			destroyed = true;
		},
		setContent(html) {
			$modal.querySelector("[data-content]").innerHTML = html;
		},
	});
};
