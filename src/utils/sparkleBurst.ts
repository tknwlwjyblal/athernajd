// Interactive luxury sparkle and particle burst generator on click

export interface SparkleParticle {
  x: number;
  y: number;
  size: number;
  color: string;
  angle: number;
  speed: number;
  opacity: number;
  rotation: number;
  decay: number;
}

export function triggerGoldenBurst(originX: number, originY: number, count = 22) {
  if (typeof document === 'undefined') return;

  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '99999';
  document.body.appendChild(canvas);

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    canvas.remove();
    return;
  }

  const goldHues = [
    '#c5a059',
    '#e9c176',
    '#ffd700',
    '#775a19',
    '#fff8f3',
    '#f4ede6',
  ];

  const particles: SparkleParticle[] = [];

  for (let i = 0; i < count; i++) {
    particles.push({
      x: originX,
      y: originY,
      size: Math.random() * 5 + 3,
      color: goldHues[Math.floor(Math.random() * goldHues.length)],
      angle: Math.random() * Math.PI * 2,
      speed: Math.random() * 6 + 2,
      opacity: 1,
      rotation: Math.random() * Math.PI * 2,
      decay: Math.random() * 0.02 + 0.015,
    });
  }

  let animationFrameId: number;

  function drawStar(context: CanvasRenderingContext2D, cx: number, cy: number, spikes: number, outerRadius: number, innerRadius: number) {
    let rot = (Math.PI / 2) * 3;
    let x = cx;
    let y = cy;
    const step = Math.PI / spikes;

    context.beginPath();
    context.moveTo(cx, cy - outerRadius);
    for (let i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerRadius;
      y = cy + Math.sin(rot) * outerRadius;
      context.lineTo(x, y);
      rot += step;

      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;
      context.lineTo(x, y);
      rot += step;
    }
    context.lineTo(cx, cy - outerRadius);
    context.closePath();
    context.fill();
  }

  function render() {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let activeCount = 0;

    particles.forEach((p) => {
      if (p.opacity <= 0) return;
      activeCount++;

      p.x += Math.cos(p.angle) * p.speed;
      p.y += Math.sin(p.angle) * p.speed + 0.8; // subtle gravity
      p.speed *= 0.94; // friction
      p.opacity -= p.decay;
      p.rotation += 0.08;

      ctx.save();
      ctx.globalAlpha = Math.max(0, p.opacity);
      ctx.fillStyle = p.color;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);

      // Half particles are four-pointed stars, half are diamond circles
      if (Math.random() > 0.5) {
        drawStar(ctx, 0, 0, 4, p.size, p.size * 0.4);
      } else {
        ctx.beginPath();
        ctx.arc(0, 0, p.size * 0.6, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    });

    if (activeCount > 0) {
      animationFrameId = requestAnimationFrame(render);
    } else {
      cancelAnimationFrame(animationFrameId);
      canvas.remove();
    }
  }

  render();
}
