// This Function Will Run Before Window is closed.
function onWindowClose() {
	Neutralino.app.exit();
}

/*
This function should be run only once, this function will
add maximize, minimize, close and drag control on our custom titlebar.
*/
async function initCustomWindowBar() {
	const closeBtn = document.getElementById("closeBtn"); // Close Button.
	const minimizeBtn = document.getElementById("minimizeBtn"); // Minimize Button.
	const maximizeBtn = document.getElementById("maximizeBtn"); // Maximize Button.

	// Draggable Area Which Can be used to drag window around the workspace.
	const draggableRegion = document.getElementById("draggableRegion");

	// Add A Click Event Listener, and Run onWindowClose.
	closeBtn.addEventListener("click", onWindowClose)

	// Add A Click Event Listener, and Run function which will Minimize the Window.
	minimizeBtn.addEventListener("click", async () => {
		await Neutralino.window.minimize();
	})

	// Add A Click Event Listener, and Run function which will Maximize the Window.
	maximizeBtn.addEventListener("click", async () => {
		await Neutralino.window.maximize();
	})

	/*
	   Add A Mouse Move Event Listener, and Run function everytime when mouse moves
	   over the "draggableRegion", and check if left mouse button is pressed and window
	   is maximized, which means if user is trying to move the window when it is maximized
	   which will unmaximize the window.
	*/
	draggableRegion.addEventListener("mousemove", async (e) => {
		if (e.buttons == 1 && await Neutralino.window.isMaximized()) {
			await Neutralino.window.unmaximize();
		}
	})

	/*
	   Set the draggable region to our HTML element so that
	   we can move our window my dragging our "draggableRegion"
	*/
	await Neutralino.window.setDraggableRegion('draggableRegion');
}

// Initialize Neutralino
Neutralino.init();

// Run onWindowClose When windowClose event occurs.
Neutralino.events.on("windowClose", onWindowClose);

// Run initCustomWindowBar when ready event occurs.
Neutralino.events.on("ready", initCustomWindowBar);