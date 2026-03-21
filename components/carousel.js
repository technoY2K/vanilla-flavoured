class BasicCarousel extends HTMLElement {
  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });

    shadow.innerHTML = `
      <style>
        :host {
          display: block;
          margin-block: var(--space-xl, 4rem);
        }

        h2 {
          font-family: var(--font-sans, system-ui, sans-serif);
          color: var(--color-text, #f1f5f9);
          margin-bottom: var(--space-lg, 2rem);
        }

        .track {
          display: flex;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          gap: var(--space-md, 1rem);
          border-radius: 0.5rem;
          scrollbar-width: none;
        }

        .track::-webkit-scrollbar {
          display: none;
        }

        ::slotted(img) {
          flex: 0 0 100%;
          width: 100%;
          height: auto;
          border-radius: 0.5rem;
          scroll-snap-align: start;
          object-fit: cover;
        }

        .nav {
          display: flex;
          justify-content: center;
          gap: var(--space-md, 1rem);
          margin-top: var(--space-md, 1rem);
        }

        button {
          font-family: inherit;
          font-size: 1.25rem;
          width: 2.5rem;
          height: 2.5rem;
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
      </style>

      <h2><slot name="heading"></slot></h2>
      <div class="track">
        <slot></slot>
      </div>
      <div class="nav">
        <button data-dir="prev">\u2190</button>
        <button data-dir="next">\u2192</button>
      </div>
    `;

    const track = shadow.querySelector(".track");

    shadow.querySelector(".nav").addEventListener("click", (e) => {
      const dir = e.target.dataset.dir;
      if (!dir) return;

      const atEnd =
        track.scrollLeft + track.clientWidth >= track.scrollWidth - 1;
      const atStart = track.scrollLeft <= 0;

      if (dir === "next" && atEnd) {
        track.scrollTo({ left: 0, behavior: "smooth" });
      } else if (dir === "prev" && atStart) {
        track.scrollTo({ left: track.scrollWidth, behavior: "smooth" });
      } else {
        track.scrollBy({
          left: dir === "next" ? track.clientWidth : -track.clientWidth,
          behavior: "smooth",
        });
      }
    });
  }
}

customElements.define("vanilla-carousel", BasicCarousel);
