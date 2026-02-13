<script setup>
import { onMounted, onBeforeUnmount, ref } from "vue";

const canvasRef = ref(null);

let ctx;
let fireAnimation;
let resizeHandler;

onMounted(() => {
  const canvas = canvasRef.value;
  ctx = canvas.getContext("2d");

  const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);
  resizeHandler = resizeCanvas;

  class FireAnimation {
    constructor() {
      this.particles = [];
      this.time = 0;
      this.lastUpdateTime = 0;

      this.paletteBase = [
        { r: 245, g: 167, b: 66 },
        { r: 232, g: 90, b: 25 },
        { r: 255, g: 62, b: 0 },
        { r: 191, g: 34, b: 34 },
        { r: 80, g: 20, b: 70 },
      ];

      this.palette = [...this.paletteBase];
      this.createParticles();
      this.animate();
    }

    createParticles() {
      const count = Math.floor((canvas.width * canvas.height) / 4000);

      for (let i = 0; i < count; i++) {
        this.particles.push(this.createParticle());
      }
    }

    createParticle(x = Math.random() * canvas.width, y = canvas.height + Math.random() * 100) {
      return {
        x,
        y,
        size: 5 + Math.random() * 10,
        opacity: 0.1 + Math.random() * 0.5,
        speedX: (Math.random() - 0.5) * 1.5,
        speedY: -3 - Math.random() * 3,
        colorIndex: Math.floor(Math.random() * this.palette.length),
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        sway: 0.3 + Math.random() * 0.5,
        swaySpeed: 0.005 + Math.random() * 0.01,
        swayOffset: Math.random() * Math.PI * 2,
        lifespan: 120 + Math.random() * 180,
      };
    }

    animate(time = 0) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      this.time += 0.01;
      this.updatePalette();
      this.updateParticles();

      requestAnimationFrame(this.animate.bind(this));
    }

    updatePalette() {
      this.palette = this.paletteBase.map((c, i) => {
        const t = this.time + i * 0.5;
        const v = 20;
        return {
          r: Math.min(255, c.r + Math.sin(t) * v),
          g: Math.min(255, c.g + Math.sin(t + 1) * v),
          b: Math.min(255, c.b + Math.sin(t + 2) * v),
        };
      });
    }

    updateParticles() {
      this.particles.forEach((p, i) => {
        p.x += p.speedX + Math.sin(this.time * p.swaySpeed + p.swayOffset) * p.sway;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;
        p.lifespan--;

        const life = p.lifespan / 300;
        if (p.lifespan > 0) {
          this.drawBrush(p, life);
        } else {
          this.particles[i] = this.createParticle();
        }
      });
    }

    drawBrush(p, life) {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);

      const size = p.size * life;
      const opacity = p.opacity * life;
      const c = this.palette[p.colorIndex];

      const grad = ctx.createLinearGradient(0, -size, 0, size);
      grad.addColorStop(0, `rgba(${c.r},${c.g},${c.b},0)`);
      grad.addColorStop(0.5, `rgba(${c.r},${c.g},${c.b},${opacity})`);
      grad.addColorStop(1, `rgba(${c.r},${c.g},${c.b},0)`);

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.moveTo(-size / 3, -size);
      ctx.quadraticCurveTo(size / 2, 0, -size / 3, size);
      ctx.quadraticCurveTo(size / 2, 0, size / 3, -size / 2);
      ctx.fill();

      ctx.restore();
    }

    burst(x, y, count = 30) {
      for (let i = 0; i < count; i++) {
        this.particles.push(this.createParticle(x, y));
      }
    }
  }

  fireAnimation = new FireAnimation();

  canvas.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    fireAnimation.burst(e.clientX - rect.left, e.clientY - rect.top, 3);
  });
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", resizeHandler);
});
</script>

<template>
  <div class="canvas-container">
    <canvas ref="canvasRef"></canvas>
  </div>
</template>

<style scoped>
.canvas-container {
  position: fixed;
  inset: 0;
  pointer-events: none;
}

canvas {
  width: 100%;
  height: 100%;
}
</style>
