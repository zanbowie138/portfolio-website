import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

interface ImageTransitionProps {
  images: string[];
  currentIndex: number;
  width?: number;
  height?: number;
  onTransitionComplete?: () => void;
}

export default function ImageTransition({
  images,
  currentIndex,
  width = 100,
  height = 60,
  onTransitionComplete,
}: ImageTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    slides: Slide[];
    currentSlide: number;
    timeline?: gsap.core.Timeline;
  } | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Setup Three.js scene
    const renderer = new THREE.WebGLRenderer({
      antialias: window.devicePixelRatio === 1,
      alpha: true
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    renderer.setSize(rect.width, rect.height);
    container.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(
      80,
      rect.width / rect.height,
      0.1,
      1000
    );
    camera.position.set(0, 0, 60);

    const scene = new THREE.Scene();

    // Create slides
    const slides: Slide[] = [];

    sceneRef.current = {
      renderer,
      scene,
      camera,
      slides,
      currentSlide: 0,
    };

    // Animation loop
    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }
    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      camera.aspect = rect.width / rect.height;
      camera.updateProjectionMatrix();
      renderer.setSize(rect.width, rect.height);
    };
    window.addEventListener('resize', handleResize);

    // Load initial image
    if (images.length > 0) {
      loadImage(images[0], 'in').then((slide) => {
        sceneRef.current?.slides.push(slide);
        sceneRef.current?.scene.add(slide);
        slide.time = slide.totalDuration; // Show fully formed
      });
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      container.removeChild(renderer.domElement);
      slides.forEach(slide => {
        slide.geometry.dispose();
        slide.material.dispose();
      });
    };
  }, []);

  // Handle image transitions
  useEffect(() => {
    if (!sceneRef.current || currentIndex < 0 || currentIndex >= images.length) return;

    const { scene, slides, timeline } = sceneRef.current;

    // Kill previous timeline
    if (timeline) {
      timeline.kill();
    }

    // Clear old slides
    slides.forEach(slide => {
      scene.remove(slide);
      slide.geometry.dispose();
      slide.material.dispose();
    });
    slides.length = 0;

    // Load new transition
    const prevIndex = sceneRef.current.currentSlide;
    sceneRef.current.currentSlide = currentIndex;

    // Transition between images
    Promise.all([
      loadImage(images[prevIndex], 'out'),
      loadImage(images[currentIndex], 'in'),
    ]).then(([slideOut, slideIn]) => {
      if (!sceneRef.current) return;

      sceneRef.current.slides.push(slideOut, slideIn);
      scene.add(slideOut, slideIn);

      // Create transition timeline
      const tl = gsap.timeline({
        onComplete: onTransitionComplete,
      });

      tl.add(createSlideTransition(slideOut), 0);
      tl.add(createSlideTransition(slideIn), 0);

      sceneRef.current.timeline = tl;
    });
  }, [currentIndex, images, onTransitionComplete]);

  function loadImage(url: string, phase: 'in' | 'out'): Promise<Slide> {
    return new Promise((resolve) => {
      const loader = new THREE.TextureLoader();
      loader.setCrossOrigin('Anonymous');
      loader.load(url, (texture) => {
        const slide = new Slide(width, height, phase, texture);
        resolve(slide);
      });
    });
  }

  function createSlideTransition(slide: Slide): gsap.core.Tween {
    return gsap.fromTo(
      slide,
      { time: 0 },
      {
        time: slide.totalDuration,
        duration: 3.0,
        ease: 'none'
      }
    );
  }

  return (
    <div
      ref={containerRef}
      className="w-full h-full"
      style={{ touchAction: 'none' }}
    />
  );
}

// Slide class
class Slide extends THREE.Mesh {
  totalDuration: number;

  constructor(
    width: number,
    height: number,
    animationPhase: 'in' | 'out',
    texture: THREE.Texture
  ) {
    // Create plane geometry with subdivisions
    const planeGeometry = new THREE.PlaneGeometry(
      width,
      height,
      width * 2,
      height * 2
    );

    // Create buffer geometry with custom attributes
    const geometry = new THREE.BufferGeometry();
    const faces = [];

    // Convert indexed geometry to non-indexed (separate faces)
    const positions = planeGeometry.attributes.position;
    const uvs = planeGeometry.attributes.uv;
    const indices = planeGeometry.index!;

    const posArray: number[] = [];
    const uvArray: number[] = [];
    const animArray: number[] = [];
    const startPosArray: number[] = [];
    const control0Array: number[] = [];
    const control1Array: number[] = [];
    const endPosArray: number[] = [];

    const faceCount = indices.count / 3;

    const minDuration = 0.8;
    const maxDuration = 1.2;
    const maxDelayX = 0.9;
    const maxDelayY = 0.125;
    const stretch = 0.11;

    const totalDuration = maxDuration + maxDelayX + maxDelayY + stretch;

    // Helper functions
    const randFloat = (min: number, max: number) => Math.random() * (max - min) + min;
    const randFloatSpread = (range: number) => (Math.random() - 0.5) * range;

    function getControlPoint0(centroid: THREE.Vector3): THREE.Vector3 {
      const signY = Math.sign(centroid.y);
      return new THREE.Vector3(
        randFloat(0.1, 0.3) * 50,
        signY * randFloat(0.1, 0.3) * 70,
        randFloatSpread(20)
      );
    }

    function getControlPoint1(centroid: THREE.Vector3): THREE.Vector3 {
      const signY = Math.sign(centroid.y);
      return new THREE.Vector3(
        randFloat(0.3, 0.6) * 50,
        -signY * randFloat(0.3, 0.6) * 70,
        randFloatSpread(20)
      );
    }

    for (let i = 0; i < faceCount; i++) {
      const i0 = indices.getX(i * 3);
      const i1 = indices.getX(i * 3 + 1);
      const i2 = indices.getX(i * 3 + 2);

      // Get vertices
      const v0 = new THREE.Vector3(
        positions.getX(i0),
        positions.getY(i0),
        positions.getZ(i0)
      );
      const v1 = new THREE.Vector3(
        positions.getX(i1),
        positions.getY(i1),
        positions.getZ(i1)
      );
      const v2 = new THREE.Vector3(
        positions.getX(i2),
        positions.getY(i2),
        positions.getZ(i2)
      );

      // Compute centroid
      const centroid = new THREE.Vector3()
        .add(v0)
        .add(v1)
        .add(v2)
        .divideScalar(3);

      // Animation timing
      const duration = randFloat(minDuration, maxDuration);
      const delayX = ((centroid.x + width * 0.5) / width) * maxDelayX;
      const delayY = animationPhase === 'in'
        ? (Math.abs(centroid.y) / (height * 0.5)) * maxDelayY
        : maxDelayY - (Math.abs(centroid.y) / (height * 0.5)) * maxDelayY;

      const delay = delayX + delayY + Math.random() * stretch * duration;

      // Control points for bezier curve
      const startPosition = centroid.clone();
      const endPosition = centroid.clone();
      const control0 = centroid.clone();
      const control1 = centroid.clone();

      if (animationPhase === 'in') {
        control0.sub(getControlPoint0(centroid));
        control1.sub(getControlPoint1(centroid));
      } else {
        control0.add(getControlPoint0(centroid));
        control1.add(getControlPoint1(centroid));
      }

      // Add vertices relative to centroid
      for (const vertex of [v0, v1, v2]) {
        const relPos = vertex.clone().sub(centroid);
        posArray.push(relPos.x, relPos.y, relPos.z);

        // Animation data
        animArray.push(delay, duration);

        // Bezier control points
        startPosArray.push(startPosition.x, startPosition.y, startPosition.z);
        control0Array.push(control0.x, control0.y, control0.z);
        control1Array.push(control1.x, control1.y, control1.z);
        endPosArray.push(endPosition.x, endPosition.y, endPosition.z);
      }

      // UVs
      const uv0 = new THREE.Vector2(uvs.getX(i0), uvs.getY(i0));
      const uv1 = new THREE.Vector2(uvs.getX(i1), uvs.getY(i1));
      const uv2 = new THREE.Vector2(uvs.getX(i2), uvs.getY(i2));

      uvArray.push(uv0.x, uv0.y, uv1.x, uv1.y, uv2.x, uv2.y);
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(posArray, 3));
    geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvArray, 2));
    geometry.setAttribute('aAnimation', new THREE.Float32BufferAttribute(animArray, 2));
    geometry.setAttribute('aStartPosition', new THREE.Float32BufferAttribute(startPosArray, 3));
    geometry.setAttribute('aControl0', new THREE.Float32BufferAttribute(control0Array, 3));
    geometry.setAttribute('aControl1', new THREE.Float32BufferAttribute(control1Array, 3));
    geometry.setAttribute('aEndPosition', new THREE.Float32BufferAttribute(endPosArray, 3));

    // Custom shader material
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0.0 },
        map: { value: texture },
      },
      vertexShader: `
        uniform float uTime;
        attribute vec2 aAnimation;
        attribute vec3 aStartPosition;
        attribute vec3 aControl0;
        attribute vec3 aControl1;
        attribute vec3 aEndPosition;

        varying vec2 vUv;
        varying float vProgress;
        varying float vAlpha;

        // Cubic bezier function
        vec3 cubicBezier(vec3 p0, vec3 p1, vec3 p2, vec3 p3, float t) {
          float tn = 1.0 - t;
          return tn * tn * tn * p0 +
                 3.0 * tn * tn * t * p1 +
                 3.0 * tn * t * t * p2 +
                 t * t * t * p3;
        }

        // Ease in-out cubic
        float easeInOutCubic(float t) {
          return t < 0.5
            ? 4.0 * t * t * t
            : 1.0 - pow(-2.0 * t + 2.0, 3.0) / 2.0;
        }

        void main() {
          vUv = uv;

          float tDelay = aAnimation.x;
          float tDuration = aAnimation.y;
          float tTime = clamp(uTime - tDelay, 0.0, tDuration);
          float tProgress = easeInOutCubic(tTime / tDuration);

          vProgress = tProgress;

          // Create fade effect for trail
          ${animationPhase === 'in'
            ? 'vAlpha = smoothstep(0.0, 0.3, tProgress);'
            : 'vAlpha = smoothstep(1.0, 0.7, tProgress);'}

          vec3 transformed = position;
          ${animationPhase === 'in' ? 'transformed *= tProgress;' : 'transformed *= 1.0 - tProgress;'}
          transformed += cubicBezier(aStartPosition, aControl0, aControl1, aEndPosition, tProgress);

          gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D map;
        varying vec2 vUv;
        varying float vProgress;
        varying float vAlpha;

        void main() {
          vec4 texColor = texture2D(map, vUv);

          // Apply alpha fade for trail effect
          texColor.a *= vAlpha;

          // Add slight glow during motion
          float motionGlow = smoothstep(0.2, 0.5, vProgress) * smoothstep(0.8, 0.5, vProgress) * 0.2;
          texColor.rgb += motionGlow;

          gl_FragColor = texColor;
        }
      `,
      side: THREE.DoubleSide,
      transparent: true,
      blending: THREE.NormalBlending,
      depthWrite: false,
    });

    super(geometry, material);
    this.totalDuration = totalDuration;
    this.frustumCulled = false;
  }

  get time(): number {
    return (this.material as THREE.ShaderMaterial).uniforms.uTime.value;
  }

  set time(value: number) {
    (this.material as THREE.ShaderMaterial).uniforms.uTime.value = value;
  }
}
