class BasicSparkles extends HTMLElement {
  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });
    const count = Number(this.getAttribute("count") ?? 40);

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

        .box {
          position: relative;
          overflow: hidden;
          height: 20rem;
          border-radius: 0.5rem;
          background: linear-gradient(135deg, #0a0f1e 0%, #1a103a 50%, #0a0f1e 100%);
        }

        .sparkle {
          position: absolute;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: white;
          animation: twinkle var(--duration) var(--delay) infinite ease-in-out;
          box-shadow:
            0 0 4px 1px rgba(255, 255, 255, 0.6),
            0 0 8px 2px rgba(200, 180, 255, 0.3);
        }

        @keyframes twinkle {
          0%, 100% {
            opacity: 0;
            transform: scale(0);
          }
          50% {
            opacity: 1;
            transform: scale(1);
          }
        }
      </style>

      <h2><slot name="heading"></slot></h2>
      <div class="box"></div>
    `;

    const box = shadow.querySelector(".box");

    for (let i = 0; i < count; i++) {
      const sparkle = document.createElement("span");
      sparkle.classList.add("sparkle");

      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const duration = 1.5 + Math.random() * 2.5;
      const delay = Math.random() * 4;
      const size = 2 + Math.random() * 4;

      sparkle.style.left = `${x}%`;
      sparkle.style.top = `${y}%`;
      sparkle.style.width = `${size}px`;
      sparkle.style.height = `${size}px`;
      sparkle.style.setProperty("--duration", `${duration}s`);
      sparkle.style.setProperty("--delay", `${delay}s`);

      box.appendChild(sparkle);
    }
  }
}

customElements.define("vanilla-sparkles", BasicSparkles);
