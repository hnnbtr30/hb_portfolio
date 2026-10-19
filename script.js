/**
 * HANNA ABIGAIL B. BETER - 3D SPORTS CAR THEMED PORTFOLIO
 * High-Performance Telemetry, 3D Tilt Mechanics, Cover Video Audio Engine,
 * 3D Drifting Sports Car Avatar (Three.js), & Working Pit Contact Form (Web3Forms/Gmail)
 */

document.addEventListener('DOMContentLoaded', () => {
  initCoverVideoAudio();
  init3DAvatarDrift();
  initContactForm();
  initTiltEffect();
  initScrollAnimations();
  initActiveNavTracking();
  initTelemetryCounters();
});

/* ==========================================================================
   1. Facebook Cover Video Audio Engine (Sound Toggle & Calibrated Ambient Music)
   ========================================================================== */
function initCoverVideoAudio() {
  const coverVideo = document.getElementById('cover-video');
  const soundToggleBtn = document.getElementById('video-sound-toggle');
  const soundIcon = document.getElementById('sound-icon');
  const soundText = document.getElementById('sound-text');

  if (!coverVideo) return;

  // Calibrated ambient background volume (28% for a soft, immersive background music track)
  const TARGET_VOLUME = 0.28;
  coverVideo.volume = TARGET_VOLUME;

  // Function to set sound ON
  function enableSound() {
    coverVideo.muted = false;
    coverVideo.volume = TARGET_VOLUME;
    const playPromise = coverVideo.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.warn('Playback prevented:', err);
      });
    }

    if (soundToggleBtn) soundToggleBtn.classList.add('sound-on');
    if (soundIcon) soundIcon.className = 'fa-solid fa-volume-high';
    if (soundText) soundText.textContent = 'SOUND: ON';
  }

  // Function to set sound OFF (Mute)
  function disableSound() {
    coverVideo.muted = true;
    if (soundToggleBtn) soundToggleBtn.classList.remove('sound-on');
    if (soundIcon) soundIcon.className = 'fa-solid fa-volume-xmark';
    if (soundText) soundText.textContent = 'UNMUTE SOUND';
  }

  // Button Click Handler: Toggle sound on/off
  if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (coverVideo.muted) {
        enableSound();
      } else {
        disableSound();
      }
    });
  }

  // First User Interaction Unmute:
  // Browsers block unmuted autoplay on initial load.
  // Automatically unmutes softly on first user interaction!
  function onFirstInteraction() {
    if (coverVideo.muted) {
      enableSound();
    }
    // Remove listeners once activated
    window.removeEventListener('click', onFirstInteraction);
    window.removeEventListener('keydown', onFirstInteraction);
    window.removeEventListener('touchstart', onFirstInteraction);
  }

  window.addEventListener('click', onFirstInteraction, { passive: true });
  window.addEventListener('keydown', onFirstInteraction, { passive: true });
  window.addEventListener('touchstart', onFirstInteraction, { passive: true });
}

/* ==========================================================================
   2. 3D Drifting Sports Car Avatar / Profile Frame (Three.js)
   Continuous circular drift around the profile border with cyan/teal smoke
   particles & light trails. Optimized, responsive, non-blocking clicks.
   ========================================================================== */
function init3DAvatarDrift() {
  const canvas = document.getElementById('avatar-drift-canvas');
  if (!canvas) {
    console.warn('avatar-drift-canvas element not found in DOM.');
    return;
  }
  if (typeof THREE === 'undefined') {
    console.warn('Three.js library not loaded; skipping 3D avatar drift.');
    return;
  }

  const SIZE = 280;
  // Circular orbit radius just outside the 175px circular avatar border
  const ORBIT_RADIUS = 78;

  // Scene & Camera
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
  camera.position.set(0, 0, 240);
  camera.lookAt(0, 0, 0);

  // WebGL Renderer
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance'
  });
  renderer.setSize(SIZE, SIZE);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

  // High-Visibility Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 2.2);
  scene.add(ambientLight);

  const mainLight = new THREE.DirectionalLight(0xffffff, 2.4);
  mainLight.position.set(70, 90, 130);
  scene.add(mainLight);

  const cyanRimLight = new THREE.DirectionalLight(0x00f0ff, 3.0);
  cyanRimLight.position.set(-80, -70, 80);
  scene.add(cyanRimLight);

  // Faint Glowing Cyan Orbital Guide Ring (Cyberpunk HUD telemetry track)
  const ringGeo = new THREE.RingGeometry(76.8, 79.2, 72);
  const ringMat = new THREE.MeshBasicMaterial({
    color: 0x00f0ff,
    transparent: true,
    opacity: 0.22,
    side: THREE.DoubleSide
  });
  const orbitRing = new THREE.Mesh(ringGeo, ringMat);
  scene.add(orbitRing);

  // 3D Sports Car Assembly Group
  const carGroup = new THREE.Group();
  scene.add(carGroup);

  // High-Contrast Automotive & Cyberpunk Materials
  const bodyMaterial = new THREE.MeshStandardMaterial({
    color: 0x182436, // Gunmetal / Titanium metallic body
    metalness: 0.88,
    roughness: 0.22,
    emissive: 0x081928,
    emissiveIntensity: 0.45
  });

  const bodyAccentMaterial = new THREE.MeshStandardMaterial({
    color: 0x00f0ff, // Vivid Neon Cyan aero trim & stripes
    emissive: 0x00f0ff,
    emissiveIntensity: 1.25,
    metalness: 0.35,
    roughness: 0.15
  });

  const glassMaterial = new THREE.MeshStandardMaterial({
    color: 0x021d28,
    emissive: 0x00f0ff,
    emissiveIntensity: 0.45,
    metalness: 0.95,
    roughness: 0.05,
    transparent: true,
    opacity: 0.88
  });

  const wheelTireMaterial = new THREE.MeshStandardMaterial({
    color: 0x111419,
    roughness: 0.8,
    metalness: 0.2
  });

  const wheelRimMaterial = new THREE.MeshBasicMaterial({
    color: 0x00f0ff
  });

  const headlightMaterial = new THREE.MeshBasicMaterial({
    color: 0x00ffff
  });

  const taillightMaterial = new THREE.MeshBasicMaterial({
    color: 0xff1e56
  });

  // 1. Lower Chassis (Wedge Supercar Silhouette)
  // +Y is front, -Y is rear, +X is right, -X is left, +Z is up
  const chassisGeo = new THREE.BoxGeometry(11, 23, 4.4);
  const chassis = new THREE.Mesh(chassisGeo, bodyMaterial);
  chassis.position.z = 3.2;
  carGroup.add(chassis);

  // 2. Neon Cyan Center Racing Stripe
  const stripeGeo = new THREE.BoxGeometry(2.0, 22.8, 0.4);
  const stripe = new THREE.Mesh(stripeGeo, bodyAccentMaterial);
  stripe.position.set(0, 0, 5.5);
  carGroup.add(stripe);

  // 3. Aerodynamic Front Hood
  const hoodGeo = new THREE.BoxGeometry(9.6, 8.6, 2.6);
  const hood = new THREE.Mesh(hoodGeo, bodyMaterial);
  hood.position.set(0, 8.6, 2.6);
  hood.rotation.x = -0.16;
  carGroup.add(hood);

  // Front Splitter (Carbon aerodynamic front lip with neon glow)
  const splitterGeo = new THREE.BoxGeometry(12.4, 4, 0.8);
  const splitter = new THREE.Mesh(splitterGeo, bodyAccentMaterial);
  splitter.position.set(0, 12.8, 1.3);
  carGroup.add(splitter);

  // Side Skirts (Aero ground effects)
  const skirtGeo = new THREE.BoxGeometry(1.2, 17, 0.8);
  const skirtL = new THREE.Mesh(skirtGeo, bodyAccentMaterial);
  skirtL.position.set(-5.6, -0.5, 1.2);
  carGroup.add(skirtL);

  const skirtR = new THREE.Mesh(skirtGeo, bodyAccentMaterial);
  skirtR.position.set(5.6, -0.5, 1.2);
  carGroup.add(skirtR);

  // 4. Cabin / Cockpit Canopy
  const cabinGeo = new THREE.BoxGeometry(7.8, 10.6, 3.6);
  const cabin = new THREE.Mesh(cabinGeo, glassMaterial);
  cabin.position.set(0, -1, 6.4);
  carGroup.add(cabin);

  // Roof Scoop
  const scoopGeo = new THREE.BoxGeometry(3, 4, 1.2);
  const scoop = new THREE.Mesh(scoopGeo, bodyMaterial);
  scoop.position.set(0, -0.6, 8.6);
  carGroup.add(scoop);

  // 5. High-Downforce Rear GT Wing / Spoiler
  const wingBladeGeo = new THREE.BoxGeometry(13.6, 3.4, 0.8);
  const wingBlade = new THREE.Mesh(wingBladeGeo, bodyMaterial);
  wingBlade.position.set(0, -11.2, 8.0);
  wingBlade.rotation.x = 0.12;
  carGroup.add(wingBlade);

  // Wing Endplates (Glowing neon cyan vertical fins)
  const endplateGeo = new THREE.BoxGeometry(0.5, 3.6, 2.2);
  const epL = new THREE.Mesh(endplateGeo, bodyAccentMaterial);
  epL.position.set(-6.8, -11.2, 8.0);
  carGroup.add(epL);

  const epR = new THREE.Mesh(endplateGeo, bodyAccentMaterial);
  epR.position.set(6.8, -11.2, 8.0);
  carGroup.add(epR);

  // Wing Struts
  const strutGeo = new THREE.BoxGeometry(0.8, 1.4, 3.2);
  const strutL = new THREE.Mesh(strutGeo, bodyAccentMaterial);
  strutL.position.set(-4.2, -10.8, 6.2);
  carGroup.add(strutL);

  const strutR = new THREE.Mesh(strutGeo, bodyAccentMaterial);
  strutR.position.set(4.2, -10.8, 6.2);
  carGroup.add(strutR);

  // 6. Headlights (Bright Twin Neon Cyan LED Bars)
  const headlightGeo = new THREE.BoxGeometry(2.6, 1.0, 1.3);
  const hlLeft = new THREE.Mesh(headlightGeo, headlightMaterial);
  hlLeft.position.set(-3.8, 12.8, 3.2);
  carGroup.add(hlLeft);

  const hlRight = new THREE.Mesh(headlightGeo, headlightMaterial);
  hlRight.position.set(3.8, 12.8, 3.2);
  carGroup.add(hlRight);

  // 7. Taillights (Cyber Neon Red Lightbar)
  const taillightGeo = new THREE.BoxGeometry(10.2, 0.8, 1.2);
  const taillightBar = new THREE.Mesh(taillightGeo, taillightMaterial);
  taillightBar.position.set(0, -11.8, 4.0);
  carGroup.add(taillightBar);

  // 8. Wheels & Rims (4 wheels with glowing cyan rims)
  const wheelMeshes = [];
  const wheelPositions = [
    { x: -6.0, y: 6.8, z: 2.4, isFront: true },
    { x: 6.0, y: 6.8, z: 2.4, isFront: true },
    { x: -6.0, y: -7.2, z: 2.4, isFront: false },
    { x: 6.0, y: -7.2, z: 2.4, isFront: false }
  ];

  const wheelGeo = new THREE.CylinderGeometry(2.6, 2.6, 1.8, 12);
  wheelGeo.rotateZ(Math.PI / 2);

  const rimGeo = new THREE.CylinderGeometry(1.5, 1.5, 1.9, 8);
  rimGeo.rotateZ(Math.PI / 2);

  wheelPositions.forEach(pos => {
    const wGroup = new THREE.Group();
    const tire = new THREE.Mesh(wheelGeo, wheelTireMaterial);
    const rim = new THREE.Mesh(rimGeo, wheelRimMaterial);
    wGroup.add(tire);
    wGroup.add(rim);
    wGroup.position.set(pos.x, pos.y, pos.z);

    if (pos.isFront) {
      wGroup.rotation.z = -0.28; // Front wheel counter-steering opposite to drift
    }
    carGroup.add(wGroup);
    wheelMeshes.push(wGroup);
  });

  // Neon Cyan Underglow PointLight
  const underglowLight = new THREE.PointLight(0x00f0ff, 3.2, 45);
  underglowLight.position.set(0, 0, 1.4);
  carGroup.add(underglowLight);

  // 9. Drifting Tire Smoke Particles System
  const SMOKE_COUNT = 45;
  const smokeParticles = [];
  const smokeGeo = new THREE.PlaneGeometry(3.8, 3.8);
  const smokeMat = new THREE.MeshBasicMaterial({
    color: 0x00f0ff,
    transparent: true,
    opacity: 0,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  });

  const smokeGroup = new THREE.Group();
  scene.add(smokeGroup);

  for (let i = 0; i < SMOKE_COUNT; i++) {
    const mesh = new THREE.Mesh(smokeGeo, smokeMat.clone());
    mesh.visible = false;
    smokeGroup.add(mesh);
    smokeParticles.push({
      mesh,
      life: 0,
      maxLife: 1.0,
      vx: 0,
      vy: 0,
      vz: 0,
      scaleSpeed: 0
    });
  }

  let smokeIndex = 0;
  function emitSmoke(posX, posY, posZ, orbitAngle) {
    const p = smokeParticles[smokeIndex];
    smokeIndex = (smokeIndex + 1) % SMOKE_COUNT;

    p.mesh.position.set(
      posX + (Math.random() - 0.5) * 2.5,
      posY + (Math.random() - 0.5) * 2.5,
      posZ + Math.random() * 2
    );
    p.mesh.scale.set(1, 1, 1);
    p.mesh.visible = true;
    p.life = 0;
    p.maxLife = 0.55 + Math.random() * 0.45;

    const driftOppositeAngle = orbitAngle - Math.PI / 2 + (Math.random() - 0.5) * 0.4;
    const speed = 0.45 + Math.random() * 0.65;
    p.vx = Math.cos(driftOppositeAngle) * speed;
    p.vy = Math.sin(driftOppositeAngle) * speed;
    p.vz = 0.2 + Math.random() * 0.35;
    p.scaleSpeed = 2.4 + Math.random() * 1.8;

    if (Math.random() > 0.35) {
      p.mesh.material.color.setHex(0x00f0ff);
    } else {
      p.mesh.material.color.setHex(0x88ffff);
    }
  }

  // 10. Glowing Light Trail behind Car
  const TRAIL_POINTS = 30;
  const trailPositions = new Float32Array(TRAIL_POINTS * 3);
  const trailColors = new Float32Array(TRAIL_POINTS * 3);

  for (let i = 0; i < TRAIL_POINTS; i++) {
    trailPositions[i * 3] = Math.cos(0) * ORBIT_RADIUS;
    trailPositions[i * 3 + 1] = Math.sin(0) * ORBIT_RADIUS;
    trailPositions[i * 3 + 2] = 2;

    const ratio = i / TRAIL_POINTS;
    trailColors[i * 3] = 0;
    trailColors[i * 3 + 1] = ratio * 0.95;
    trailColors[i * 3 + 2] = ratio * 1.0;
  }

  const trailGeo = new THREE.BufferGeometry();
  trailGeo.setAttribute('position', new THREE.BufferAttribute(trailPositions, 3));
  trailGeo.setAttribute('color', new THREE.BufferAttribute(trailColors, 3));

  const trailMat = new THREE.LineBasicMaterial({
    vertexColors: true,
    transparent: true,
    opacity: 0.9,
    blending: THREE.AdditiveBlending,
    linewidth: 2
  });

  const trailLine = new THREE.Line(trailGeo, trailMat);
  scene.add(trailLine);

  // Animation Loop State
  let angle = 0;
  const ROTATION_SPEED = 0.95; // rad/sec (~6.6 seconds per full revolution)
  const DRIFT_SLIP_ANGLE = 0.42; // ~24 degrees inward drift angle
  let lastTime = performance.now();
  let isRunning = true;
  let animFrameId = null;

  // Pause when browser tab is inactive to save battery/GPU
  document.addEventListener('visibilitychange', () => {
    isRunning = !document.hidden;
    if (isRunning && !animFrameId) {
      lastTime = performance.now();
      animFrameId = requestAnimationFrame(animate);
    }
  });

  function animate(now) {
    if (!isRunning) {
      animFrameId = null;
      return;
    }

    const dt = Math.min((now - lastTime) / 1000, 0.1);
    lastTime = now;

    // 1. Advance Circular Orbit Angle
    angle += ROTATION_SPEED * dt;
    if (angle > Math.PI * 2) angle -= Math.PI * 2;

    // 2. Position Car around Circular Orbit
    const carX = Math.cos(angle) * ORBIT_RADIUS;
    const carY = Math.sin(angle) * ORBIT_RADIUS;
    const carZ = Math.sin(now * 0.012) * 0.6;

    carGroup.position.set(carX, carY, carZ);

    // 3. Drift Physics: Car nose points inward into turn, tail steps outward
    carGroup.rotation.z = angle + Math.PI / 2 + DRIFT_SLIP_ANGLE;

    // 3D Centrifugal Body Roll: Tilts roof & side toward viewer so the 3D car geometry pops!
    carGroup.rotation.x = Math.sin(angle) * 0.22;
    carGroup.rotation.y = -Math.cos(angle) * 0.22;

    // 4. Wheel Spin
    wheelMeshes.forEach(w => {
      w.children[0].rotation.x += dt * 20;
      w.children[1].rotation.x += dt * 20;
    });

    // 5. Emit Tire Smoke from rear wheels
    const rearX = carX - Math.sin(carGroup.rotation.z) * 11;
    const rearY = carY + Math.cos(carGroup.rotation.z) * 11;

    emitSmoke(rearX, rearY, 2, angle);

    // Update Smoke Particles
    smokeParticles.forEach(p => {
      if (!p.mesh.visible) return;
      p.life += dt;
      if (p.life >= p.maxLife) {
        p.mesh.visible = false;
        return;
      }

      const progress = p.life / p.maxLife;
      p.mesh.position.x += p.vx;
      p.mesh.position.y += p.vy;
      p.mesh.position.z += p.vz;

      const currentScale = 1 + progress * p.scaleSpeed;
      p.mesh.scale.set(currentScale, currentScale, 1);
      p.mesh.material.opacity = (1 - progress) * 0.5;
    });

    // 6. Update Light Trail Points
    const posAttr = trailGeo.attributes.position;
    for (let i = 0; i < TRAIL_POINTS - 1; i++) {
      posAttr.setXYZ(
        i,
        posAttr.getX(i + 1),
        posAttr.getY(i + 1),
        posAttr.getZ(i + 1)
      );
    }
    posAttr.setXYZ(TRAIL_POINTS - 1, rearX, rearY, 2.5);
    posAttr.needsUpdate = true;

    // Render 3D Frame
    renderer.render(scene, camera);

    animFrameId = requestAnimationFrame(animate);
  }

  // Start Animation Loop immediately!
  animFrameId = requestAnimationFrame(animate);
}

/* ==========================================================================
   3. Pit Radio Contact Terminal (Gmail Direct Routing & Form Validation)
   Connected directly to Gmail (hannabeter30@gmail.com). Works seamlessly
   like GitHub links by opening Gmail Composer with pre-filled telemetry.
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('pit-contact-form');
  if (!form) return;

  const emailInput = document.getElementById('contact-email');
  const subjectInput = document.getElementById('contact-subject');
  const messageInput = document.getElementById('contact-message');
  const submitBtn = document.getElementById('contact-submit-btn');
  const btnIcon = document.getElementById('btn-icon');
  const btnText = document.getElementById('btn-text');

  const alertBox = document.getElementById('form-status-alert');
  const alertIcon = document.getElementById('alert-icon-box');
  const alertTitle = document.getElementById('alert-title');
  const alertDesc = document.getElementById('alert-desc');

  const emailError = document.getElementById('email-error');
  const subjectError = document.getElementById('subject-error');
  const messageError = document.getElementById('message-error');

  const DESTINATION_GMAIL = 'hannabeter30@gmail.com';
  const EMAIL_REGEX = /^[^s@]+@[^s@]+.[^s@]+$/;

  // Real-time input error clearing
  [emailInput, subjectInput, messageInput].forEach(input => {
    if (!input) return;
    input.addEventListener('input', () => {
      input.classList.remove('is-invalid');
      const errEl = document.getElementById(`${input.name}-error`);
      if (errEl) errEl.textContent = '';
      if (alertBox && alertBox.classList.contains('alert-error')) {
        alertBox.style.display = 'none';
      }
    });
  });

  function validate() {
    let isValid = true;

    // Validate Email
    const emailVal = emailInput.value.trim();
    if (!emailVal) {
      showFieldError(emailInput, emailError, 'Email address is required.');
      isValid = false;
    } else if (!EMAIL_REGEX.test(emailVal)) {
      showFieldError(emailInput, emailError, 'Enter a valid email address (e.g. name@domain.com).');
      isValid = false;
    } else {
      clearFieldError(emailInput, emailError);
    }

    // Validate Subject
    const subjectVal = subjectInput.value.trim();
    if (!subjectVal) {
      showFieldError(subjectInput, subjectError, 'Subject line is required.');
      isValid = false;
    } else if (subjectVal.length < 2) {
      showFieldError(subjectInput, subjectError, 'Subject must be at least 2 characters.');
      isValid = false;
    } else {
      clearFieldError(subjectInput, subjectError);
    }

    // Validate Message
    const messageVal = messageInput.value.trim();
    if (!messageVal) {
      showFieldError(messageInput, messageError, 'Message body cannot be empty.');
      isValid = false;
    } else if (messageVal.length < 5) {
      showFieldError(messageInput, messageError, 'Message must be at least 5 characters long.');
      isValid = false;
    } else {
      clearFieldError(messageInput, messageError);
    }

    return isValid;
  }

  function showFieldError(input, errorEl, message) {
    input.classList.add('is-invalid');
    input.classList.remove('is-valid');
    if (errorEl) errorEl.textContent = message;
  }

  function clearFieldError(input, errorEl) {
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
    if (errorEl) errorEl.textContent = '';
  }

  function showAlert(type, title, desc, extraHtml = '') {
    alertBox.style.display = 'flex';
    alertBox.className = `form-status-alert alert-${type}`;
    if (type === 'success') {
      alertIcon.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    } else {
      alertIcon.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i>';
    }
    alertTitle.textContent = title;
    alertDesc.innerHTML = desc + (extraHtml ? `<br>${extraHtml}` : '');
    alertBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function hideAlert() {
    alertBox.style.display = 'none';
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!validate()) {
      showAlert('error', 'TELEMETRY REJECTED', 'Please correct the highlighted inputs before transmitting.');
      return;
    }

    const senderEmail = emailInput.value.trim();
    const subject = subjectInput.value.trim();
    const message = messageInput.value.trim();

    // Construct Direct Gmail Web Composer URL (works exactly like GitHub links)
    const formattedBody = `${message}\n\n===============================\nTELEMETRY DISPATCH DETAILS\nSender Email: ${senderEmail}\nRecipient: ${DESTINATION_GMAIL}\nTimestamp: ${new Date().toLocaleString()}\nPortfolio: Hanna Abigail B. Beter (BSCpE)\n===============================`;
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(DESTINATION_GMAIL)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(formattedBody)}`;
    const mailtoUrl = `mailto:${DESTINATION_GMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(formattedBody)}`;

    // Set tactile transmitting state
    submitBtn.disabled = true;
    submitBtn.classList.add('loading');
    btnIcon.className = 'fa-solid fa-satellite-dish fa-spin';
    btnText.textContent = 'CONNECTING TO GMAIL...';
    hideAlert();

    setTimeout(() => {
      // Open Gmail Web Composer in a new tab (exactly like GitHub link)
      window.open(gmailUrl, '_blank', 'noopener,noreferrer');

      // Success HUD confirmation banner with 1-click action buttons
      const actionButtons = `
        <div style="margin-top: 12px; display: flex; gap: 10px; flex-wrap: wrap;">
          <a href="${gmailUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary-racing" style="padding: 7px 14px; font-size: 0.72rem;">
            <i class="fa-solid fa-arrow-up-right-from-square"></i> OPEN IN GMAIL WEB
          </a>
          <a href="${mailtoUrl}" class="btn btn-secondary-carbon" style="padding: 7px 14px; font-size: 0.72rem;">
            <i class="fa-solid fa-envelope"></i> OPEN DEFAULT CLIENT
          </a>
        </div>
      `;

      showAlert(
        'success',
        'TRANSMISSION PREPARED // ROUTED TO GMAIL',
        `Your message has been formatted and pre-loaded into the Gmail Web Composer directly addressed to <strong class="neon-highlight">${DESTINATION_GMAIL}</strong>. Review and click <strong>Send</strong> in Gmail to deliver your telemetry!`,
        actionButtons
      );

      // Reset form fields
      form.reset();
      [emailInput, subjectInput, messageInput].forEach(inp => {
        inp.classList.remove('is-valid', 'is-invalid');
      });

      // Reset button state
      submitBtn.disabled = false;
      submitBtn.classList.remove('loading');
      btnIcon.className = 'fa-solid fa-paper-plane';
      btnText.textContent = 'SEND MESSAGE';
    }, 450);
  });
}

/* ==========================================================================
   4. 3D Tilt Mechanics (Realistic Perspective & Automotive Glassmorphism)
   ========================================================================== */
function initTiltEffect() {
  const tiltElements = document.querySelectorAll('[data-tilt], .tech-card, .project-card, .telemetry-cell');

  tiltElements.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(8px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)`;
      card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
    });

    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.1s ease-out';
    });
  });
}

/* ==========================================================================
   5. Scroll Entrance Animations (IntersectionObserver)
   ========================================================================== */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll(
    '.project-card, .tech-card, .telemetry-cell, .hud-stat-box, .channel-card, .comms-resume-box, .comms-form-terminal'
  );

  animatedElements.forEach(el => {
    el.classList.add('fade-in-up');
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('appear');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  animatedElements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   6. Active Section Navigation Tracking
   ========================================================================== */
function initActiveNavTracking() {
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-links .nav-item');

  function highlightNav() {
    const scrollY = window.pageYOffset + 200;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navItems.forEach(item => {
          item.classList.remove('active');
          if (item.getAttribute('href') === `#${sectionId}`) {
            item.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNav, { passive: true });
}

/* ==========================================================================
   7. Telemetry Counters (Tachometer Rev-Up Effect)
   ========================================================================== */
function initTelemetryCounters() {
  const statNumbers = document.querySelectorAll('.cell-value[data-target]');
  let hasAnimated = false;

  const triggerElements = document.querySelectorAll('.fb-telemetry-bar, #telemetry, .telemetry-section');
  if (!triggerElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        statNumbers.forEach(counter => {
          const target = parseFloat(counter.getAttribute('data-target'));
          const isDecimal = target % 1 !== 0;
          let current = 0;
          const duration = 1800; // ms
          const stepTime = 30;
          const totalSteps = duration / stepTime;
          const increment = target / totalSteps;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              counter.textContent = isDecimal ? target.toFixed(1) + '%' : target;
              clearInterval(timer);
            } else {
              counter.textContent = isDecimal ? current.toFixed(1) + '%' : Math.floor(current);
            }
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.2 });

  triggerElements.forEach(el => observer.observe(el));
}
