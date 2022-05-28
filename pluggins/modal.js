function _createModal({title, closable, content, width}) {
	const markup = `<div class="modal-overlay">
                <div class="modal-window">
                    <div class="modal-header">
                        <span class="modal-title">${title}</span>
                        <span class="modal-close ${closable}">&times;</span>
                    </div>
                    <div class="modal-body">
                        <p>${content}</p>
                        <p>${content}</p>
                    </div>
                    <div class="modal-footer">
                        <button>Ok</button>
                        <button>Cancel</button>
                    </div>
                </div>
            </div>`;

	console.log(options);
	const modal = document.createElement("div");
    modal.classList.add("vmodal");
    modal.style.width = `${width}`;
	modal.insertAdjacentHTML("afterbegin", markup);
	document.body.appendChild(modal);
	return modal;
}

const options = {
	title: "Modal",
	closable: true,
    content: "Lorem ipsum dolor sit.",
    width: '400px',
};

$.modal = function (options) {
	const ANIMATION_SPEED = 200;
	const $modal = _createModal(options);
	let closing = false;
	return {
		open() {
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
        destroy() {

            $modal.innerHTML = '';
        },
	};
};
