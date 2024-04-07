"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLoader = void 0;
function createLoader() {
    const container = document.createElement("div");
    container.classList.add("lds-roller");
    container.innerHTML = `
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  `;
    return container;
}
exports.createLoader = createLoader;
//# sourceMappingURL=createLoader.js.map