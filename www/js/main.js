function onWindowClose() {
	Neutralino.app.exit();
}

async function initCustomWindowBar() {
	const closeBtn = document.getElementById("closeBtn");
	const minimizeBtn = document.getElementById("minimizeBtn");
	const maximizeBtn = document.getElementById("maximizeBtn");
	const draggableRegion = document.getElementById("draggableRegion");

	draggableRegion.addEventListener("mousemove", async (e) => {
		if (e.buttons == 1 && await Neutralino.window.isMaximized()) {
			await Neutralino.window.unmaximize();
		}
	})

	closeBtn.addEventListener("click", async () => {
		await Neutralino.app.exit(0);
	})

	minimizeBtn.addEventListener("click", async () => {
		await Neutralino.window.minimize();
	})

	maximizeBtn.addEventListener("click", async () => {
		await Neutralino.window.maximize();
	})

	await Neutralino.window.setDraggableRegion('draggableRegion');
}

Neutralino.init();
Neutralino.events.on("windowClose", onWindowClose);
Neutralino.events.on("ready", initCustomWindowBar);