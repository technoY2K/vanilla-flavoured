class BasicCounter extends HTMLElement {
  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });
    const min = Number(this.getAttribute("min") ?? -100);
    const alertAt = Number(this.getAttribute("alert-at") ?? -10);

    let count = 0;

    shadow.innerHTML = `
      <style>
        :host {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: var(--space-lg, 2rem);
          margin-block: var(--space-xl, 4rem);
        }

        h2 {
          width: 100%;
          font-family: var(--font-sans, system-ui, sans-serif);
          color: var(--color-text, #f1f5f9);
        }

        .value {
          font-family: var(--font-mono, ui-monospace, monospace);
          font-size: 3rem;
          min-width: 4ch;
          text-align: center;
          color: var(--color-text, #f1f5f9);
        }

        button {
          font-family: inherit;
          font-size: 1.5rem;
          width: 3rem;
          height: 3rem;
          border-radius: 50%;
          border: 1px solid var(--color-muted, #94a3b8);
          background: transparent;
          color: var(--color-text, #f1f5f9);
          cursor: pointer;
          transition: border-color 0.15s;
        }

        button:hover {
          border-color: var(--color-text, #f1f5f9);
        }

        dialog {
          background: #1c1017;
          color: #fca5a5;
          border: 1px solid #991b1b;
          border-radius: 0.5rem;
          padding: var(--space-xl, 4rem);
          text-align: center;
          font-size: 1.25rem;
        }

        dialog::backdrop {
          background: rgba(0, 0, 0, 0.7);
        }

        .close-btn {
          margin-top: var(--space-lg, 2rem);
          font-family: inherit;
          font-size: 0.875rem;
          width: auto;
          height: auto;
          padding: var(--space-sm, 0.5rem) var(--space-md, 1rem);
          border-radius: 0.25rem;
          border: 1px solid #991b1b;
          background: transparent;
          color: #fca5a5;
        }
      </style>

      <h2><slot name="heading"></slot></h2>
      <button data-action="decrement">\u2212</button>
      <span class="value">0</span>
      <button data-action="increment">+</button>

      <dialog>
        <p>Uh oh, we need a framework</p>
        <button class="close-btn">Just kidding</button>
      </dialog>
    `;

    const display = shadow.querySelector(".value");
    const dialog = shadow.querySelector("dialog");

    shadow.addEventListener("click", (e) => {
      const action = e.target.dataset.action;
      if (action === "increment") count++;
      if (action === "decrement" && count > min) count--;
      if (action) {
        display.textContent = count;
        if (count < alertAt && action === "decrement") dialog.showModal();
      }
    });

    dialog.addEventListener("click", (e) => {
      if (e.target === dialog || e.target.classList.contains("close-btn")) {
        dialog.close();
      }
    });
  }
}

customElements.define("vanilla-counter", BasicCounter);
