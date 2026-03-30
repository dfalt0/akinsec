import React, { useEffect, useRef, useState } from 'react';

// Simplified Perlin noise implementation
class ClassicalNoise {
  constructor() {
    this.grad3 = [[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],
                 [1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],
                 [0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]];
    this.p = [];
    for(let i=0; i<256; i++) {
      this.p[i] = Math.floor(Math.random()*256);
    }
    this.perm = [];
    for(let i=0; i<512; i++) {
      this.perm[i]=this.p[i & 255];
    }
  }
  
  dot(g, x, y) {
    return g[0]*x + g[1]*y;
  }
  
  noise(xin, yin) {
    let n0, n1, n2;
    const F2 = 0.5*(Math.sqrt(3.0)-1.0);
    let s = (xin+yin)*F2;
    let i = Math.floor(xin+s);
    let j = Math.floor(yin+s);
    const G2 = (3.0-Math.sqrt(3.0))/6.0;
    let t = (i+j)*G2;
    let X0 = i-t;
    let Y0 = j-t;
    let x0 = xin-X0;
    let y0 = yin-Y0;
    let i1, j1;
    if(x0>y0) {i1=1; j1=0;}
    else {i1=0; j1=1;}
    let x1 = x0 - i1 + G2;
    let y1 = y0 - j1 + G2;
    let x2 = x0 - 1.0 + 2.0 * G2;
    let y2 = y0 - 1.0 + 2.0 * G2;
    let ii = i & 255;
    let jj = j & 255;
    let gi0 = this.perm[ii+this.perm[jj]] % 12;
    let gi1 = this.perm[ii+i1+this.perm[jj+j1]] % 12;
    let gi2 = this.perm[ii+1+this.perm[jj+1]] % 12;
    let t0 = 0.5 - x0*x0-y0*y0;
    if(t0<0) n0 = 0.0;
    else {
      t0 *= t0;
      n0 = t0 * t0 * this.dot(this.grad3[gi0], x0, y0);
    }
    let t1 = 0.5 - x1*x1-y1*y1;
    if(t1<0) n1 = 0.0;
    else {
      t1 *= t1;
      n1 = t1 * t1 * this.dot(this.grad3[gi1], x1, y1);
    }
    let t2 = 0.5 - x2*x2-y2*y2;
    if(t2<0) n2 = 0.0;
    else {
      t2 *= t2;
      n2 = t2 * t2 * this.dot(this.grad3[gi2], x2, y2);
    }
    return 70.0 * (n0 + n1 + n2);
  }
}

const WaveBackground = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const perlinRef = useRef(null);
  const variatorsRef = useRef([]);
  const maxLinesRef = useRef(35);
  const [isVisible, setIsVisible] = useState(false);
  const speedRef = useRef(0.0015); // Base speed - will be randomized (increased from 0.0005)
  const amplitudeRef = useRef(120); // Base amplitude - will be randomized

  useEffect(() => {
    // Randomize wave speed on page load (faster than current speed)
    const baseSpeed = 0.0015; // Increased speed for faster wave height changes
    const randomMultiplier = 0.3 + Math.random() * 0.7; // Random between 30% and 100% of base speed
    speedRef.current = baseSpeed * randomMultiplier;
    
    // Randomize amplitude with occasional taller waves
    const baseAmplitude = 120;
    const amplitudeMultiplier = 0.6 + Math.random() * 0.8; // Random between 60% and 140% of base amplitude
    amplitudeRef.current = baseAmplitude * amplitudeMultiplier;
    
    // Trigger fade-in animation after component mounts
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const perlin = new ClassicalNoise();
    perlinRef.current = perlin;
    
    const variation = 0.0008; // Increased for more natural wave curves
    const amp = amplitudeRef.current; // Use randomized amplitude
    const max_lines = 35;
    maxLinesRef.current = max_lines;
    
    // Initialize variators
    const variators = [];
    for (let i = 0, u = 0; i < max_lines; i++, u += 0.03) {
      variators[i] = u;
    }
    variatorsRef.current = variators;

    let canvasWidth, canvasHeight, start_y;

    const draw = () => {
      // Global hue that shifts slowly over time
      const globalHue = (Date.now() * 0.01) % 360;
      
      // Add padding to prevent edge collision
      const padding = 50;
      
      for (let i = 0; i <= max_lines; i++) {
        ctx.beginPath();
        // Start drawing from the padded position
        ctx.moveTo(-padding, start_y);
        
        let lastY;
        for (let x = -padding; x <= canvasWidth + padding; x += 2) {
          const y = perlin.noise(x * variation + variators[i], x * variation);
          ctx.lineTo(x, start_y + amp * y);
          lastY = y;
        }
        
        // Calculate opacity based on line position - reduced for subtlety
        const linePosition = i / max_lines;
        const baseAlpha = 0.008 + (1 - linePosition) * 0.15; // Reduced opacity
        
        // All lines use the same hue, just different brightness
        const saturation = 60 + (1 - linePosition) * 20; // Reduced saturation
        const lightness = 40 + (1 - linePosition) * 20; // Reduced lightness
        
        if (i === 0) {
          // Main glowing edge - more subtle
          ctx.shadowBlur = 15; // Reduced shadow
          ctx.shadowColor = `hsla(${globalHue}, ${saturation}%, ${lightness}%, 0.4)`;
          ctx.strokeStyle = `hsla(${globalHue}, ${saturation}%, ${lightness}%, ${Math.min(baseAlpha * 6, 0.6)})`;
          ctx.lineWidth = 1.8; // Thinner line
        } else {
          // Contour lines - same hue, subtle variations
          ctx.shadowBlur = 0;
          ctx.strokeStyle = `hsla(${globalHue}, ${saturation}%, ${lightness}%, ${baseAlpha})`;
          ctx.lineWidth = 0.6 + (1 - linePosition) * 0.3; // Thinner lines
        }
        
        ctx.stroke();
        ctx.closePath();
        
        variators[i] += speedRef.current;
      }
    };

    const animate = () => {
      // Clear with transparent background to show the wave
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      draw();
      animationRef.current = requestAnimationFrame(animate);
    };

    const resizeCanvas = () => {
      canvasWidth = window.innerWidth;
      canvasHeight = window.innerHeight;
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      start_y = canvasHeight * 0.55; // Moved lower on the page
    };

    // Initialize
    resizeCanvas();
    animate();
    
    const handleResize = () => {
      resizeCanvas();
    };
    
    window.addEventListener('resize', handleResize);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none transition-opacity duration-1000 ease-out"
      style={{ 
        zIndex: -1,
        opacity: isVisible ? 0.7 : 0 // Fade in from 0 to 0.7
      }}
    />
  );
};

export default WaveBackground;
