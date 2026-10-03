'use client';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './Loader.module.css';

export default function Loader() {
  const stageRef = useRef<HTMLDivElement>(null);
  const loadingBarRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isUnmounted, setIsUnmounted] = useState(false);
  const [loaderStep, setLoaderStep] = useState(1);
  const [scriptsLoaded, setScriptsLoaded] = useState(false);
  const router = useRouter();

  const handleShowSite = (target = 'top') => {
    setIsVisible(false);
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('loaderFinished', { detail: { target } }));
    }, 400); // Trigger animation right as loader finishes fading out
    setTimeout(() => {
      setIsUnmounted(true);
    }, 1000);
  };

  const handleUnderConstruction = () => {
    setIsVisible(false);
    setTimeout(() => {
      router.push('/under-construction');
      setIsUnmounted(true);
    }, 400);
  };

  useEffect(() => {
    // We only need to check if THREE and OrbitControls are on window
    const checkThree = setInterval(() => {
      const win = window as any;
      if (win.THREE && win.THREE.OrbitControls) {
        clearInterval(checkThree);
        setScriptsLoaded(true);
      }
    }, 50);
    return () => clearInterval(checkThree);
  }, []);

  useEffect(() => {
    if (!scriptsLoaded || !stageRef.current) return;
    const stage = stageRef.current;
    const loadingBar = loadingBarRef.current;
    const THREE = (window as any).THREE;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(114.66, 1, 0.1, 100);
    camera.position.set(6.3, 4.25, 6.3);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(stage.clientWidth, stage.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMappingExposure = 1.26;
    stage.appendChild(renderer.domElement);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.055;
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.minDistance = 4.0;
    controls.maxDistance = 15;
    controls.minPolarAngle = Math.PI * 0.18;
    controls.maxPolarAngle = Math.PI * 0.77;
    controls.target.set(0, 0.12, 0);
    controls.autoRotate = true;
    controls.autoRotateSpeed = 2.0;

    let lastInteraction = performance.now();
    controls.addEventListener('start', () => { lastInteraction = performance.now(); });
    controls.addEventListener('end', () => { lastInteraction = performance.now(); });

    const hemi = new THREE.HemisphereLight(0xbfeaff, 0x15191c, 1.0);
    scene.add(hemi);

    const key = new THREE.DirectionalLight(0xffffff, 3.6);
    key.position.set(5.5, 8.5, 6.5);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    key.shadow.camera.left = -6;
    key.shadow.camera.right = 6;
    key.shadow.camera.top = 6;
    key.shadow.camera.bottom = -6;
    key.shadow.camera.near = 1;
    key.shadow.camera.far = 24;
    key.shadow.bias = -0.0005;
    scene.add(key);

    const rim = new THREE.DirectionalLight(0x54d9ff, 2.1);
    rim.position.set(-6, 3, -5);
    scene.add(rim);

    const warm = new THREE.PointLight(0xff8a43, 1.6, 14, 2);
    warm.position.set(4.5, -1, -3.5);
    scene.add(warm);

    const rim2 = new THREE.DirectionalLight(0xff0000, 2.5);
    rim2.position.set(6, -3, -5);
    scene.add(rim2);

    const cubeRoot = new THREE.Group();
    cubeRoot.position.y = 0.08;
    cubeRoot.rotation.y = -0.08;
    scene.add(cubeRoot);

    const cubies: any[] = [];
    const spacing = 1.04;
    const coreSize = 0.94;
    const stickerSize = 0.68;
    const stickerOffset = coreSize / 2 + 0.008;
    
    const colors: Record<string, number> = {
      px: 0xff0000, nx: 0xff6200, py: 0xffffff,
      ny: 0xffdd00, pz: 0x00ff3c, nz: 0x0055ff
    };

    const coreGeometry = new THREE.BoxGeometry(coreSize, coreSize, coreSize, 2, 2, 2);
    const coreMaterial = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.8, metalness: 0.5 });
    const stickerMaterials: Record<string, any> = {};
    Object.keys(colors).forEach((keyName) => {
      stickerMaterials[keyName] = new THREE.MeshPhysicalMaterial({
        color: colors[keyName],
        roughness: 0.1,
        metalness: 0.1,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
        emissive: colors[keyName],
        emissiveIntensity: 0.25,
        side: THREE.DoubleSide
      });
    });

    function roundedRectShape(w: number, h: number, r: number) {
      const x = -w / 2, y = -h / 2;
      const s = new THREE.Shape();
      s.moveTo(x + r, y);
      s.lineTo(x + w - r, y);
      s.quadraticCurveTo(x + w, y, x + w, y + r);
      s.lineTo(x + w, y + h - r);
      s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      s.lineTo(x + r, y + h);
      s.quadraticCurveTo(x, y + h, x, y + h - r);
      s.lineTo(x, y + r);
      s.quadraticCurveTo(x, y, x + r, y);
      return s;
    }
    const stickerGeometry = new THREE.ShapeGeometry(roundedRectShape(stickerSize, stickerSize, 0.095), 5);

    function addSticker(cubie: any, face: string) {
      const sticker = new THREE.Mesh(stickerGeometry, stickerMaterials[face]);
      sticker.castShadow = false;
      sticker.receiveShadow = true;
      if (face === 'px') { sticker.position.x = stickerOffset; sticker.rotation.y = Math.PI / 2; }
      if (face === 'nx') { sticker.position.x = -stickerOffset; sticker.rotation.y = -Math.PI / 2; }
      if (face === 'py') { sticker.position.y = stickerOffset; sticker.rotation.x = -Math.PI / 2; }
      if (face === 'ny') { sticker.position.y = -stickerOffset; sticker.rotation.x = Math.PI / 2; }
      if (face === 'pz') { sticker.position.z = stickerOffset; }
      if (face === 'nz') { sticker.position.z = -stickerOffset; sticker.rotation.y = Math.PI; }
      cubie.add(sticker);
    }

    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          if (x === 0 && y === 0 && z === 0) continue;
          const cubie = new THREE.Group();
          const core = new THREE.Mesh(coreGeometry, coreMaterial);
          core.castShadow = true;
          core.receiveShadow = true;
          cubie.add(core);
          if (x === 1) addSticker(cubie, 'px');
          if (x === -1) addSticker(cubie, 'nx');
          if (y === 1) addSticker(cubie, 'py');
          if (y === -1) addSticker(cubie, 'ny');
          if (z === 1) addSticker(cubie, 'pz');
          if (z === -1) addSticker(cubie, 'nz');
          cubie.position.set(x * spacing, y * spacing, z * spacing);
          cubie.userData.coord = new THREE.Vector3(x, y, z);
          cubeRoot.add(cubie);
          cubies.push(cubie);
        }
      }
    }

    const FACE: Record<string, any> = {
      R: { axis: new THREE.Vector3(1, 0, 0), key: 'x', layer: 1 },
      L: { axis: new THREE.Vector3(1, 0, 0), key: 'x', layer: -1 },
      U: { axis: new THREE.Vector3(0, 1, 0), key: 'y', layer: 1 },
      D: { axis: new THREE.Vector3(0, 1, 0), key: 'y', layer: -1 },
      F: { axis: new THREE.Vector3(0, 0, 1), key: 'z', layer: 1 },
      B: { axis: new THREE.Vector3(0, 0, 1), key: 'z', layer: -1 }
    };
    const solution = [
      { face: 'F', prime: false },
      { face: 'U', prime: true },
      { face: 'R', prime: true }
    ];

    function moveAngle(move: any) { return move.prime ? Math.PI / 2 : -Math.PI / 2; }
    function layerCubies(faceName: string) {
      const def = FACE[faceName];
      return cubies.filter((c) => Math.round(c.userData.coord[def.key]) === def.layer);
    }
    function rotatedCoord(vector: any, axis: any, angle: number) {
      const out = vector.clone().applyAxisAngle(axis, angle);
      out.set(Math.round(out.x), Math.round(out.y), Math.round(out.z));
      return out;
    }
    function snapQuaternion(q: any) {
      q.set(
        Math.round(q.x * 1000000) / 1000000,
        Math.round(q.y * 1000000) / 1000000,
        Math.round(q.z * 1000000) / 1000000,
        Math.round(q.w * 1000000) / 1000000
      ).normalize();
    }
    function applyMoveInstant(move: any) {
      const def = FACE[move.face];
      const angle = moveAngle(move);
      const q = new THREE.Quaternion().setFromAxisAngle(def.axis, angle);
      const selected = layerCubies(move.face);
      selected.forEach((c) => {
        c.userData.coord.copy(rotatedCoord(c.userData.coord, def.axis, angle));
        c.position.copy(c.userData.coord).multiplyScalar(spacing);
        c.quaternion.premultiply(q);
        snapQuaternion(c.quaternion);
      });
    }

    applyMoveInstant({ face: 'R', prime: false });
    applyMoveInstant({ face: 'U', prime: false });
    applyMoveInstant({ face: 'F', prime: true });

    let step = 0;
    let activeTurn: any = null;
    let celebrating = false;
    let isExploding = false;
    let lastFrame = performance.now();
    const turnDuration = prefersReduced ? 0.12 : 0.65;
    let isDestroyed = false;
    let animationId: number;

    function easeOutElastic(x: number) {
      const c4 = (2 * Math.PI) / 2.3;
      return x === 0 ? 0 : x === 1 ? 1 : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
    }

    function beginTurn(move: any) {
      if (activeTurn || isDestroyed) return;
      const def = FACE[move.face];
      const angle = moveAngle(move);
      const selected = layerCubies(move.face);
      const pivot = new THREE.Group();
      cubeRoot.add(pivot);
      selected.forEach((c) => { pivot.attach(c); });
      activeTurn = {
        pivot: pivot,
        selected: selected,
        axis: def.axis.clone(),
        angle: angle,
        elapsed: 0
      };
    }

    function finishTurn() {
      if (isDestroyed) return;
      const turn = activeTurn;
      turn.pivot.quaternion.setFromAxisAngle(turn.axis, turn.angle);
      turn.selected.forEach((c: any) => {
        c.userData.coord.copy(rotatedCoord(c.userData.coord, turn.axis, turn.angle));
        cubeRoot.attach(c);
        c.position.copy(c.userData.coord).multiplyScalar(spacing);
        snapQuaternion(c.quaternion);
      });
      cubeRoot.remove(turn.pivot);
      step++;
      activeTurn = null;

      if (loadingBar) {
        loadingBar.style.width = (step / solution.length * 100) + '%';
      }

      if (step === solution.length) {
        celebrating = true;
        window.dispatchEvent(new Event('cubeSolved'));
        setTimeout(() => {
          isExploding = true;
        }, 1000); 
        setTimeout(() => {
          if (!isDestroyed) setLoaderStep(2);
        }, 1500); 
      } else {
        setTimeout(() => { beginTurn(solution[step]); }, 150);
      }
    }

    function resize() {
      if (!stageRef.current) return;
      const w = stageRef.current.clientWidth;
      const h = stageRef.current.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / Math.max(h, 1);
      camera.updateProjectionMatrix();
    }
    window.addEventListener('resize', resize);
    resize();

    function animate(now: number) {
      if (isDestroyed) return;
      animationId = requestAnimationFrame(animate);
      const dt = Math.min((now - lastFrame) / 1000, 0.05);
      lastFrame = now;

      cubeRoot.position.y = 0.08 + Math.sin(now / 600) * 0.15;

      if (activeTurn) {
        activeTurn.elapsed += dt;
        const t = Math.min(activeTurn.elapsed / turnDuration, 1);
        const eased = easeOutElastic(t);
        activeTurn.pivot.quaternion.setFromAxisAngle(activeTurn.axis, activeTurn.angle * eased);
        if (t >= 1) finishTurn();
      }

      if (celebrating && !isExploding) {
        controls.autoRotateSpeed = 25.0;
        cubeRoot.scale.lerp(new THREE.Vector3(1.15, 1.15, 1.15), 0.08);
        rim2.intensity = Math.min(rim2.intensity + 0.1, 6.0);
      }

      if (isExploding) {
        controls.autoRotateSpeed *= 0.9;
        cubies.forEach(c => {
          if (!c.userData.velocity) {
            const dir = c.userData.coord.clone().normalize();
            dir.x += (Math.random() - 0.5) * 0.5;
            dir.y += (Math.random() - 0.5) * 0.5;
            dir.z += (Math.random() - 0.5) * 0.5;
            c.userData.velocity = dir.normalize().multiplyScalar(0.15 + Math.random() * 0.1);
          }
          
          c.userData.velocity.multiplyScalar(1.08); // accelerate outward
          c.position.add(c.userData.velocity);
          c.rotation.x += 0.12 * c.userData.velocity.x;
          c.rotation.y += 0.12 * c.userData.velocity.y;
          c.rotation.z += 0.12 * c.userData.velocity.z;
          // Removed scaling so they stay visible as they fly off screen
        });
        rim2.intensity = Math.max(rim2.intensity - 0.2, 0);
      }

      const idle = (!activeTurn && now - lastInteraction > 1800 && !prefersReduced) || celebrating;
      controls.autoRotate = idle;
      controls.update();
      renderer.render(scene, camera);
    }

    animationId = requestAnimationFrame(animate);
    setTimeout(() => { beginTurn(solution[0]); }, prefersReduced ? 100 : 700);

    return () => {
      isDestroyed = true;
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
      if (stageRef.current && renderer.domElement) {
        stageRef.current.removeChild(renderer.domElement);
      }
    };
  }, [scriptsLoaded]);

  if (isUnmounted && typeof window !== 'undefined') {
    // Return null when completely finished to remove from DOM
    return null;
  }

  return (
    <div className={`${styles.overlay} ${!isVisible ? styles.hidden : ''}`}>
      <div className={styles.contentWrapper}>
        <div className={`${styles.animContainer} ${loaderStep === 1 ? styles.cubeExpanded : styles.cubeCollapsed}`}>
          <div className={styles.stageWrapper} style={{ pointerEvents: loaderStep === 1 ? 'auto' : 'none' }}>
            <div ref={stageRef} className={styles.stage} aria-label="3D Rubik's Cube. Drag to orbit." />
          </div>
        </div>
        
        <div className={styles.introDialogContainer}>
          <Image 
            src="/images/profile_picture-removebg.webp" 
            alt="Jacob Cromwell" 
            width={128} 
            height={128} 
            className={styles.profilePic}
          />
          <div className={styles.dialogBox}>
            <p key={`t1-${loaderStep}`} className={styles.dialogText} style={{ fontWeight: loaderStep === 1 ? 600 : 400, marginBottom: loaderStep === 1 ? '6px' : '0' }}>
              {loaderStep === 1 ? "Hi, I'm Jacob." : "What brings you here today?"}
            </p>
            {loaderStep === 1 && <p key="t2" className={styles.dialogText}>I truly appreciate you taking the time to learn more about how I can help you.</p>}
          </div>
        </div>

        <div className={`${styles.animContainer} ${loaderStep === 1 ? styles.expanded : styles.collapsed}`}>
          <div className={styles.loadingBarContainer}>
            <div ref={loadingBarRef} className={styles.loadingBar} />
          </div>
        </div>

        <div className={`${styles.animContainer} ${loaderStep === 2 ? styles.buttonExpanded : styles.collapsed}`}>
          <div className={styles.buttonGroup}>
            {loaderStep === 2 && (
              <>
                <button className={styles.choiceBtn} onClick={() => handleShowSite('top')} style={{ animationDelay: '0.1s' }}>
                  What do you do?
                </button>
                <button className={styles.choiceBtn} onClick={() => handleShowSite('#about')} style={{ animationDelay: '0.2s' }}>
                  I'd like to know more about your professional history.
                </button>
                <button className={styles.choiceBtn} onClick={() => handleShowSite('#non-profit')} style={{ animationDelay: '0.3s' }}>
                  More info about non-profit work.
                </button>
              </>
            )}
          </div>
        </div>

        {loaderStep === 2 && (
          <button className={styles.skipDemoBtn} onClick={() => handleShowSite('#case-studies')}>
            Skip To Portfolio
          </button>
        )}
      </div>
    </div>
  );
}
