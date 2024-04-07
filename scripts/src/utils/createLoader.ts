export function createLoader(): HTMLDivElement {
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
