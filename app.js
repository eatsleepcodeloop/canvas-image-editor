const state = {
  canvas: null,
  baseImage: null,
  overlayLocked: false,
  stickerButtons: [],
};

const elements = {
  baseImageInput: document.getElementById("baseImageInput"),
  overlayImageInput: document.getElementById("overlayImageInput"),
  downloadBtn: document.getElementById("downloadBtn"),
  drawToggleBtn: document.getElementById("drawToggleBtn"),
  disableDrawBtn: document.getElementById("disableDrawBtn"),
  addTextBtn: document.getElementById("addTextBtn"),
  watermarkBtn: document.getElementById("watermarkBtn"),
  blurBtn: document.getElementById("blurBtn"),
  pixelateBtn: document.getElementById("pixelateBtn"),
  deleteBtn: document.getElementById("deleteBtn"),
  clearBtn: document.getElementById("clearBtn"),
  brushSize: document.getElementById("brushSize"),
  colorPicker: document.getElementById("colorPicker"),
  fontFamily: document.getElementById("fontFamily"),
  fontWeight: document.getElementById("fontWeight"),
  editToggle: document.getElementById("editToggle"),
  canvasFrame: document.getElementById("canvasFrame"),
  canvasPlaceholder: document.getElementById("canvasPlaceholder"),
  canvasOverlay: document.getElementById("canvasOverlay"),
  stickerGrid: document.getElementById("stickerGrid"),
  statusText: document.getElementById("statusText"),
};

const stickerSources = [
  "./assets/stickers/emoji/Angry.png",
  "./assets/stickers/emoji/Angry2.png",
  "./assets/stickers/emoji/Angry3.png",
  "./assets/stickers/emoji/Anonymous.png",
  "./assets/stickers/emoji/BubbleWhite.png",
  "./assets/stickers/emoji/Caring.png",
  "./assets/stickers/emoji/Clownx218.png",
  "./assets/stickers/emoji/Confuse.png",
  "./assets/stickers/emoji/CryingHard.png",
  "./assets/stickers/emoji/drooling.png",
  "./assets/stickers/emoji/FacePalm.png",
  "./assets/stickers/emoji/FamousFrog.png",
  "./assets/stickers/emoji/Funny.png",
  "./assets/stickers/emoji/GhostEmoji.png",
  "./assets/stickers/emoji/HappyEmojiWithStar.png",
  "./assets/stickers/emoji/HappyFace.png",
  "./assets/stickers/emoji/HeheHahaIconWhiteBg.png",
  "./assets/stickers/emoji/JapaneseMask.png",
  "./assets/stickers/emoji/Jealous.png",
  "./assets/stickers/emoji/Jealous2.png",
  "./assets/stickers/emoji/LoveFace.png",
  "./assets/stickers/emoji/MagnifyingGlass.png",
  "./assets/stickers/emoji/Monkey.png",
  "./assets/stickers/emoji/Naughty.png",
  "./assets/stickers/emoji/NoChoice.png",
  "./assets/stickers/emoji/Nochoice2.png",
  "./assets/stickers/emoji/NoChoice3.png",
  "./assets/stickers/emoji/Party.png",
  "./assets/stickers/emoji/peaceEmoji.png",
  "./assets/stickers/emoji/PlayIcon.png",
  "./assets/stickers/emoji/play_icon2.png",
  "./assets/stickers/emoji/Pointing.png",
  "./assets/stickers/emoji/Question.png",
  "./assets/stickers/emoji/Question2.png",
  "./assets/stickers/emoji/Question3.png",
  "./assets/stickers/emoji/RedArrow.png",
  "./assets/stickers/emoji/RedCircle.png",
  "./assets/stickers/emoji/RedHeartx218.png",
  "./assets/stickers/emoji/Relief.png",
  "./assets/stickers/emoji/Sad.png",
  "./assets/stickers/emoji/Sad2.png",
  "./assets/stickers/emoji/Sad3.png",
  "./assets/stickers/emoji/Smiley.png",
  "./assets/stickers/emoji/Smiley2.png",
  "./assets/stickers/emoji/Smiley3.png",
  "./assets/stickers/emoji/Smiley4.png",
  "./assets/stickers/emoji/Surprise.png",
  "./assets/stickers/emoji/SurpriseEffect.png",
  "./assets/stickers/emoji/SurpriseEmoji.png",
  "./assets/stickers/emoji/SurpriseEmoji2.png",
  "./assets/stickers/emoji/ThinkingEmoji.png",
  "./assets/stickers/emoji/Worry2.png",
  "./assets/stickers/emoji/Worrying.png",
  "./assets/stickers/emoji/XavierReply.png",
  "./assets/stickers/emoji/Comic/CryBadly.png",
  "./assets/stickers/emoji/Comic/CryBadly2.png",
  "./assets/stickers/emoji/Comic/CryingComic.png",
  "./assets/stickers/emoji/Comic/GoodComic.png",
  "./assets/stickers/emoji/Comic/LaughBadly.png",
  "./assets/stickers/emoji/Comic/LaughingComic.png",
  "./assets/stickers/emoji/Comic/LikeAking.png",
  "./assets/stickers/emoji/Comic/LOL.png",
  "./assets/stickers/emoji/Comic/Okay.png",
  "./assets/stickers/emoji/Comic/OMG.png",
  "./assets/stickers/emoji/Comic/SmileBadly.png",
  "./assets/stickers/emoji/Comic/Smilebadly2.png",
  "./assets/stickers/emoji/Comic/ThinkingComic.png",
  "./assets/stickers/emoji/Comic/WhyNo.png",
  "./assets/stickers/emoji/Comic/WTF2.png",
  "./assets/stickers/emoji/Comic/WTFComic.png",
];

function setStatus(message) {
  elements.statusText.textContent = message;
}

function hasCanvas() {
  return Boolean(state.canvas && state.baseImage);
}

function setControlsEnabled(enabled) {
  [
    elements.downloadBtn,
    elements.drawToggleBtn,
    elements.disableDrawBtn,
    elements.addTextBtn,
    elements.watermarkBtn,
    elements.blurBtn,
    elements.pixelateBtn,
    elements.deleteBtn,
    elements.clearBtn,
    elements.overlayImageInput,
  ].forEach((element) => {
    element.disabled = !enabled;
  });

  state.stickerButtons.forEach((button) => {
    button.disabled = !enabled;
  });
}

function stickerLabel(src) {
  const name = src.split("/").pop()?.replace(/\.[^.]+$/, "") ?? "Sticker";
  return name.replace(/([a-z])([A-Z])/g, "$1 $2");
}

function renderStickerGrid() {
  const fragment = document.createDocumentFragment();

  stickerSources.forEach((src) => {
    const button = document.createElement("button");
    const image = document.createElement("img");

    button.type = "button";
    button.className = "sticker-button";
    button.dataset.sticker = src;
    button.title = stickerLabel(src);
    button.disabled = true;

    image.src = src;
    image.alt = `${stickerLabel(src)} sticker`;
    image.loading = "lazy";

    button.appendChild(image);
    button.addEventListener("click", () => {
      addImageOverlay(image.currentSrc || image.src || src);
    });

    fragment.appendChild(button);
    state.stickerButtons.push(button);
  });

  elements.stickerGrid.replaceChildren(fragment);
}

function updateBrushSettings() {
  if (!state.canvas) {
    return;
  }

  state.canvas.freeDrawingBrush.color = elements.colorPicker.value;
  state.canvas.freeDrawingBrush.width = Number.parseInt(elements.brushSize.value, 10) || 4;
}

function disableDrawing() {
  if (!state.canvas) {
    return;
  }

  state.canvas.isDrawingMode = false;
  setStatus("Draw mode disabled.");
}

function enableDrawing() {
  if (!hasCanvas()) {
    return;
  }

  state.canvas.isDrawingMode = true;
  updateBrushSettings();
  setStatus("Draw mode enabled.");
}

function lockEditor(locked) {
  state.overlayLocked = locked;
  elements.canvasOverlay.hidden = !locked;

  if (locked && state.canvas) {
    disableDrawing();
    state.canvas.discardActiveObject();
    state.canvas.renderAll();
  }
}

function createCanvas() {
  if (state.canvas) {
    state.canvas.dispose();
  }

  state.canvas = new fabric.Canvas("editorCanvas", {
    preserveObjectStacking: true,
    selection: true,
  });

  state.canvas.defaultCursor = "default";
  state.canvas.hoverCursor = "move";
  state.canvas.freeDrawingBrush = new fabric.PencilBrush(state.canvas);
  updateBrushSettings();
}

function fitBaseImageToFrame(img) {
  const maxWidth = Math.max(elements.canvasFrame.clientWidth - 56, 320);
  const maxHeight = Math.max(window.innerHeight * 0.62, 360);
  const scale = Math.min(maxWidth / img.width, maxHeight / img.height, 1);
  const width = Math.round(img.width * scale);
  const height = Math.round(img.height * scale);

  img.set({
    selectable: false,
    evented: false,
    lockMovementX: true,
    lockMovementY: true,
    left: 0,
    top: 0,
    scaleX: scale,
    scaleY: scale,
  });

  state.canvas.setDimensions({ width, height });
}

function syncEffectCrop(target) {
  target.set({
    cropX: Math.max(0, target.left),
    cropY: Math.max(0, target.top),
  });
  target.dirty = true;
  target.setCoords();
}

function scheduleEffectCrop(target) {
  if (target.__cropFramePending) {
    return;
  }

  target.__cropFramePending = true;

  window.requestAnimationFrame(() => {
    target.__cropFramePending = false;
    syncEffectCrop(target);
    state.canvas?.renderAll();
  });
}

function loadBaseImage(dataUrl) {
  createCanvas();

  fabric.Image.fromURL(
    dataUrl,
    (img) => {
      state.baseImage = img;
      fitBaseImageToFrame(img);
      state.canvas.clear();
      state.canvas.add(img);
      state.canvas.sendToBack(img);
      state.canvas.renderAll();

      elements.canvasFrame.classList.remove("is-empty");
      elements.canvasPlaceholder.hidden = true;
      setControlsEnabled(true);
      lockEditor(!elements.editToggle.checked);
      setStatus("Base image loaded. You can start editing.");
    },
    { crossOrigin: "anonymous" }
  );
}

function readFileAsDataUrl(file, onLoad) {
  const reader = new FileReader();
  reader.onload = (event) => onLoad(event.target.result);
  reader.readAsDataURL(file);
}

function loadFabricImage(url, options = {}) {
  return new Promise((resolve, reject) => {
    fabric.Image.fromURL(
      url,
      (img) => {
        if (!img) {
          reject(new Error(`Failed to load image: ${url}`));
          return;
        }

        resolve(img);
      },
      options
    );
  });
}

function createEffectId() {
  return `effect-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

async function addImageOverlay(url, options = {}) {
  if (!hasCanvas()) {
    return;
  }

  disableDrawing();

  try {
    const img = await loadFabricImage(url, options);
    const maxWidth = state.canvas.getWidth() * 0.45;
    const maxHeight = state.canvas.getHeight() * 0.45;
    const scale = Math.min(maxWidth / img.width, maxHeight / img.height, 1);

    img.set({
      left: 36,
      top: 36,
      scaleX: scale,
      scaleY: scale,
      transparentCorners: false,
      cornerStyle: "circle",
      objectCaching: false,
    });

    state.canvas.add(img);
    state.canvas.setActiveObject(img);
    state.canvas.renderAll();
    setStatus("Overlay added.");
  } catch (error) {
    console.error(error);
    setStatus("Image overlay failed to load.");
  }
}

function addText() {
  if (!hasCanvas()) {
    return;
  }

  disableDrawing();

  const text = new fabric.IText("Your text here", {
    left: 36,
    top: 36,
    fontSize: 28,
    fill: elements.colorPicker.value,
    fontFamily: elements.fontFamily.value,
    fontWeight: elements.fontWeight.value,
    transparentCorners: false,
    cornerStyle: "circle",
  });

  state.canvas.add(text);
  state.canvas.setActiveObject(text);
  text.enterEditing();
  text.selectAll();
  state.canvas.renderAll();
  setStatus("Text layer added.");
}

function addWatermark() {
  if (!hasCanvas()) {
    return;
  }

  disableDrawing();

  const text = new fabric.IText("Canvas Meme Editor", {
    left: 18,
    top: state.canvas.getHeight() - 42,
    fontSize: 20,
    opacity: 0.5,
    fill: elements.colorPicker.value,
    fontFamily: elements.fontFamily.value,
    fontWeight: elements.fontWeight.value,
  });

  state.canvas.add(text);
  state.canvas.setActiveObject(text);
  state.canvas.renderAll();
  setStatus("Watermark added.");
}

async function addFilteredSelection(filterType) {
  if (!hasCanvas()) {
    return;
  }

  disableDrawing();

  const copiedCanvas = state.canvas.toCanvasElement();
  const snapshot = new fabric.Image(copiedCanvas);
  const filter =
    filterType === "pixelate"
      ? new fabric.Image.filters.Pixelate({ blocksize: 10 })
      : new fabric.Image.filters.Blur({ blur: 0.3 });

  snapshot.filters.push(filter);
  snapshot.applyFilters();

  const filteredCanvas = new fabric.StaticCanvas(null, {
    width: copiedCanvas.width,
    height: copiedCanvas.height,
  });

  filteredCanvas.add(snapshot);
  filteredCanvas.renderAll();

  try {
    const overlay = await loadFabricImage(filteredCanvas.toDataURL(), { crossOrigin: "anonymous" });
    const effectId = createEffectId();
    const initialLeft = 42;
    const initialTop = 42;
    const initialWidth = 150;
    const initialHeight = 100;

    const clipRect = new fabric.Rect({
      absolutePositioned: true,
      left: initialLeft,
      top: initialTop,
      width: initialWidth,
      height: initialHeight,
      originX: "left",
      originY: "top",
    });

    overlay.set({
      left: 0,
      top: 0,
      selectable: false,
      evented: false,
      objectCaching: false,
      clipPath: clipRect,
      effectId,
      effectRole: "overlay",
    });

    const controller = new fabric.Rect({
      left: initialLeft,
      top: initialTop,
      width: initialWidth,
      height: initialHeight,
      fill: "rgba(255,255,255,0.05)",
      stroke: filterType === "pixelate" ? "#0d5c63" : "#ff6b35",
      strokeWidth: 2,
      strokeDashArray: [10, 6],
      transparentCorners: false,
      cornerStyle: "circle",
      objectCaching: false,
      noScaleCache: true,
      excludeFromExport: true,
      effectId,
      effectRole: "controller",
    });

    const syncEffectWindow = (target, render = true) => {
      const width = Math.max(24, target.width * target.scaleX);
      const height = Math.max(24, target.height * target.scaleY);

      clipRect.set({
        left: target.left,
        top: target.top,
        width,
        height,
      });

      overlay.clipPath = clipRect;
      overlay.dirty = true;
      target.dirty = true;
      if (render) {
        state.canvas.requestRenderAll();
      }
    };

    let pendingSyncFrame = null;
    let lastSyncAt = 0;
    const scheduleSyncEffectWindow = (target) => {
      const now = performance.now();
      if (now - lastSyncAt > 32) {
        lastSyncAt = now;
        syncEffectWindow(target);
        return;
      }

      if (pendingSyncFrame) {
        return;
      }

      pendingSyncFrame = window.requestAnimationFrame(() => {
        pendingSyncFrame = null;
        lastSyncAt = performance.now();
        syncEffectWindow(target);
      });
    };

    controller.on("moving", ({ target }) => {
      scheduleSyncEffectWindow(target);
    });

    controller.on("scaling", ({ target }) => {
      scheduleSyncEffectWindow(target);
    });

    controller.on("modified", ({ target }) => {
      if (pendingSyncFrame) {
        window.cancelAnimationFrame(pendingSyncFrame);
        pendingSyncFrame = null;
      }

      const width = Math.max(24, target.width * target.scaleX);
      const height = Math.max(24, target.height * target.scaleY);

      target.set({
        width,
        height,
        scaleX: 1,
        scaleY: 1,
      });

      syncEffectWindow(target);
    });

    state.canvas.add(overlay);
    state.canvas.add(controller);
    state.canvas.bringToFront(controller);
    state.canvas.setActiveObject(controller);
    state.canvas.renderAll();
    setStatus(filterType === "pixelate" ? "Pixelated region added." : "Blur region added.");
  } catch (error) {
    console.error(error);
    setStatus("Effect layer failed to load.");
  }
}

function deleteSelected() {
  if (!state.canvas) {
    return;
  }

  const activeObject = state.canvas.getActiveObject();
  if (!activeObject || activeObject === state.baseImage) {
    return;
  }

   if (activeObject.effectId) {
    state.canvas.getObjects().forEach((object) => {
      if (object.effectId === activeObject.effectId) {
        state.canvas.remove(object);
      }
    });

    state.canvas.discardActiveObject();
    state.canvas.renderAll();
    setStatus("Selected effect deleted.");
    return;
  }

  state.canvas.remove(activeObject);
  state.canvas.discardActiveObject();
  state.canvas.renderAll();
  setStatus("Selected layer deleted.");
}

function clearLayers() {
  if (!hasCanvas()) {
    return;
  }

  state.canvas.getObjects().forEach((object) => {
    if (object !== state.baseImage) {
      state.canvas.remove(object);
    }
  });

  state.canvas.discardActiveObject();
  state.canvas.renderAll();
  setStatus("All editable layers cleared.");
}

function exportPng() {
  if (!hasCanvas()) {
    return;
  }

  disableDrawing();
  state.canvas.discardActiveObject();
  state.canvas.renderAll();

  const link = document.createElement("a");
  link.href = state.canvas.toDataURL({
    format: "png",
    multiplier: 2,
  });
  link.download = `canvas-meme-${Date.now()}.png`;
  link.click();
  setStatus("PNG exported.");
}

elements.baseImageInput.addEventListener("change", (event) => {
  const [file] = event.target.files;
  if (!file) {
    return;
  }

  readFileAsDataUrl(file, loadBaseImage);
});

elements.overlayImageInput.addEventListener("change", (event) => {
  const [file] = event.target.files;
  if (!file) {
    return;
  }

  readFileAsDataUrl(file, addImageOverlay);
  event.target.value = "";
});

elements.colorPicker.addEventListener("input", () => {
  if (!state.canvas) {
    return;
  }

  const activeObject = state.canvas.getActiveObject();
  if (activeObject && (activeObject.type === "i-text" || activeObject.type === "textbox")) {
    activeObject.set({ fill: elements.colorPicker.value });
    state.canvas.renderAll();
  }

  updateBrushSettings();
});

elements.brushSize.addEventListener("input", updateBrushSettings);
elements.editToggle.addEventListener("change", (event) => {
  lockEditor(!event.target.checked);
  setStatus(event.target.checked ? "Edit mode enabled." : "Edit mode disabled.");
});

elements.drawToggleBtn.addEventListener("click", enableDrawing);
elements.disableDrawBtn.addEventListener("click", disableDrawing);
elements.addTextBtn.addEventListener("click", addText);
elements.watermarkBtn.addEventListener("click", addWatermark);
elements.blurBtn.addEventListener("click", () => addFilteredSelection("blur"));
elements.pixelateBtn.addEventListener("click", () => addFilteredSelection("pixelate"));
elements.deleteBtn.addEventListener("click", deleteSelected);
elements.clearBtn.addEventListener("click", clearLayers);
elements.downloadBtn.addEventListener("click", exportPng);

window.addEventListener("keydown", (event) => {
  if (event.key === "Delete") {
    deleteSelected();
  }
});

window.addEventListener("resize", () => {
  if (!hasCanvas()) {
    return;
  }

  const source = state.baseImage.getSrc();
  const overlays = state.canvas
    .getObjects()
    .filter((object) => object !== state.baseImage)
    .map((object) => object.toObject());

  loadBaseImage(source);

  setTimeout(() => {
    fabric.util.enlivenObjects(overlays, (objects) => {
      objects.forEach((object) => state.canvas.add(object));
      state.canvas.renderAll();
    });
  }, 0);
});

renderStickerGrid();
setControlsEnabled(false);
