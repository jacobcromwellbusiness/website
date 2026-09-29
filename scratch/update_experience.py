import re

def update_html():
    with open('index.html', 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. CSS Additions
    css_to_add = """
/* Experience Section Styles */
.experience-section { padding-top: 10vh; min-height: 100vh; padding-bottom: 120px; }
.exp-intro-container { height: 40vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; margin-bottom: 60px; }
.exp-profile-pic { width: 120px; height: 120px; border-radius: 50%; object-fit: cover; border: 3px solid var(--line); margin-bottom: 24px; box-shadow: 0 8px 24px rgba(0,0,0,0.1); }
.exp-dialog-box { font-size: 1.5rem; font-weight: 500; color: var(--ink); }

.exp-layout { display: flex; max-width: 1200px; margin: 0 auto; padding: 0 24px; gap: 60px; position: relative; }
.exp-sidebar { width: 300px; flex-shrink: 0; }
.exp-sticky-content { position: sticky; top: 120px; display: flex; flex-direction: column; gap: 40px; }
#exp-cube-wrapper { width: 100%; height: 250px; background: transparent; border-radius: 12px; }

.exp-skills-box { background: var(--bg-3); border: 1px solid var(--line); border-radius: 12px; padding: 24px; }
.exp-skills-box h4 { font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--ink-dim); margin-bottom: 16px; border-bottom: 1px solid var(--line); padding-bottom: 8px; }
#exp-skills-list { list-style: none; padding: 0; margin: 0; display: flex; flex-wrap: wrap; gap: 8px; }
.skill-tag { background: var(--bg); border: 1px solid var(--line); padding: 6px 12px; border-radius: 20px; font-size: 0.85rem; color: var(--ink); animation: popIn 0.3s ease-out forwards; }

.exp-jobs-list { flex-grow: 1; padding-bottom: 40vh; }
.job-item { margin-bottom: 80px; position: relative; }
.job-bullets { margin-top: 20px; padding-left: 20px; list-style-type: square; color: var(--ink-dim); line-height: 1.7; font-size: 1.05rem; }
.job-bullets li { margin-bottom: 12px; }

@media (max-width: 900px) {
  .exp-layout { flex-direction: column; }
  .exp-sidebar { width: 100%; position: relative; }
  .exp-sticky-content { position: sticky; top: 20px; z-index: 10; background: var(--bg); padding-bottom: 20px; border-bottom: 1px solid var(--line); }
  .exp-intro-container { height: auto; padding: 60px 20px; }
}
"""
    # Insert CSS before </style>
    content = content.replace("</style>", css_to_add + "\n</style>")

    # 2. HTML Replacement
    html_replacement = """
  <section id="machine" class="experience-section">
    <div class="exp-intro-container">
      <img src="images/profile_picture.png" class="exp-profile-pic" alt="Jacob Cromwell">
      <div class="exp-dialog-box">
        <p>Let's take a look at my resume</p>
        <a href="#" class="btn-primary" target="_blank" style="margin-top: 20px; font-size: 0.95rem; padding: 12px 24px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">Download PDF &darr;</a>
      </div>
    </div>

    <div class="exp-layout">
      <!-- Sticky Sidebar for Skills and Cube -->
      <div class="exp-sidebar">
        <div class="exp-sticky-content">
          <div id="exp-cube-wrapper"></div>
          <div class="exp-skills-box" id="exp-skills-box">
            <h4>Acquired Skills</h4>
            <ul id="exp-skills-list">
              <li style="color: var(--ink-dim); font-size: 0.9rem;">Scroll to view skills...</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Scrollable Jobs List -->
      <div class="exp-jobs-list" id="exp-jobs-list">
        <h2 style="font-size: 2rem; margin-bottom: 40px; color: var(--ink); font-weight: 700;">EXPERIENCE</h2>

        <div class="job-item" data-skills="System Architecture|Compliance|Project Management|LMS Administration|Data Migration|Workflow Optimization|Auditing">
          <h3 style="font-size: 1.5rem; margin-bottom: 4px; font-weight: 600;">Safety System Architect</h3>
          <h4 style="color: var(--ink-dim); font-weight: 500; margin-bottom: 20px;">Atlantic Digital Safety <span style="margin-left: 8px; opacity: 0.7; font-size: 0.9rem;">December 2025 - Present</span></h4>
          <ul class="job-bullets">
            <li>Collaborate with stakeholders to enhance their safety systems and ensure compliance with safety certifications.</li>
            <li>Utilize existing training infrastructure to streamline safety processes or manage upgrades as a technical project manager.</li>
            <li>Maintain audit proof records to support business stakeholders in meeting regulatory requirements.</li>
            <li>Act as a fractional LMS administrator for businesses, managing data migration, user provisioning, and complex course assignments within platforms like Absorb, Procore, and Oracle.</li>
            <li>Bridge the gap between safety software and field operations by optimizing existing digital workflows to increase worker adoption and data accuracy.</li>
            <li>Lead "Migration Readiness" audits for organizations switching safety platforms, ensuring historical training records are scrubbed, mapped, and validated before transfer.</li>
          </ul>
        </div>

        <div class="job-item" data-skills="Product Implementation|Project Scoping|Client Management|Technical Consulting|API Integration|SSO|Jira Service Desk|Incident Management">
          <h3 style="font-size: 1.5rem; margin-bottom: 4px; font-weight: 600;">Technical Specialist</h3>
          <h4 style="color: var(--ink-dim); font-weight: 500; margin-bottom: 20px;">Absorb Software <span style="margin-left: 8px; opacity: 0.7; font-size: 0.9rem;">December 2022 - November 2025</span></h4>
          <ul class="job-bullets">
            <li>Scoping, implementing, and maintaining technical service products using Absorb's software stack.</li>
            <li>Gathering and documenting project requirements, confirming project scope, and working with clients to develop achievable timelines and program goals for their LMS.</li>
            <li>Managing client projects to completion according to client timelines and requirements.</li>
            <li>Delivering training, consulting, and best practice information on Absorb products & services.</li>
            <li>Supporting and implementing additional products and integrations such as RESTful API, Single Sign On, CRM/HRM integrations, etc.</li>
            <li>Assisting and collaborating with other Absorb teams on technical and data-related issues.</li>
            <li>Updating and maintaining internal documentation resources.</li>
            <li>Building and maintaining strong client relationships to provide the best possible service experience in every interaction.</li>
            <li>Directed incident management for client LMS projects, leveraging Jira Service Desk to monitor and resolve high-priority incidents within targets, achieving a 95% issue resolution rate and ensuring continuous system uptime for over 100 enterprise clients.</li>
          </ul>
        </div>

        <div class="job-item" data-skills="Technical Support|Hardware & Software Troubleshooting|Client Training|Feedback Gathering|Technical Writing|Onboarding & Offboarding|Reporting & Analytics">
          <h3 style="font-size: 1.5rem; margin-bottom: 4px; font-weight: 600;">Support Engineer</h3>
          <h4 style="color: var(--ink-dim); font-weight: 500; margin-bottom: 20px;">Synoptek <span style="margin-left: 8px; opacity: 0.7; font-size: 0.9rem;">June 2019 - December 2022</span></h4>
          <ul class="job-bullets">
            <li>Respond to requests via phone, chat and email</li>
            <li>Offering technical support on the delivery, configuration, setup, maintenance and troubleshooting of computer systems, hardware and software</li>
            <li>Training staff on computer basics and diagnosing more complex problems when needed</li>
            <li>Gathering feedback from clients to improve service and training</li>
            <li>Writing and editing training manuals for different programs</li>
            <li>Onboarding / offboarding clients around different aspects of service</li>
            <li>Running reports and analyzing common complaints and problems.</li>
          </ul>
        </div>

        <div class="job-item" data-skills="Subject Matter Expert (SME)|KPI Review & Coaching|Call Quality Monitoring|Customer Experience Improvement|Reporting & Strategy|Training Development">
          <h3 style="font-size: 1.5rem; margin-bottom: 4px; font-weight: 600;">Reservations Team Lead</h3>
          <h4 style="color: var(--ink-dim); font-weight: 500; margin-bottom: 20px;">Wyndham Hotels & Resorts <span style="margin-left: 8px; opacity: 0.7; font-size: 0.9rem;">August 2016 - November 2018</span></h4>
          <ul class="job-bullets">
            <li>Subject Matter Expert level knowledge in regards to all of the tools we use to support the reservation team</li>
            <li>Review targets / KPI's with employees, offer coaching to those who are struggling to meet these goals</li>
            <li>Monitor call quality to highlight common customer issues and improve communication to offer a better customer experience</li>
            <li>Submit regular reports to management to seek new ideas to improve performance</li>
            <li>Develop and implement new training programs as needed to support team goals.</li>
          </ul>
        </div>
        
        <div style="margin-top: 60px; padding: 40px; background: var(--bg-3); border-radius: 12px; text-align: center; border: 1px solid var(--line);">
          <h3 style="margin-bottom: 16px;">What's next?</h3>
          <p style="color: var(--ink-dim); margin-bottom: 24px;">Now that you've seen the journey, let's look at the projects.</p>
          <a href="#attract" class="btn-primary">View Projects &rarr;</a>
        </div>

      </div>
    </div>
  </section>
"""
    
    # We replace from <header id="machine" class="hero-section"> to </header>
    pattern = re.compile(r'<header id="machine" class="hero-section">.*?</header>', re.DOTALL)
    content = pattern.sub(html_replacement, content)

    # 3. Add JS for Scroll Cube and Skills
    js_to_add = """
// --- EXPERIENCE SCROLL LOGIC ---
(function initExperience() {
  if (!window.THREE) return;
  var wrapper = document.getElementById('exp-cube-wrapper');
  if (!wrapper) return;

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
  camera.position.set(5.7, 3.85, 5.7);

  var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(wrapper.clientWidth, wrapper.clientHeight, false);
  wrapper.appendChild(renderer.domElement);

  var controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.enablePan = false;
  controls.enableZoom = false;

  var rim = new THREE.DirectionalLight(0xff0000, 2.5);
  rim.position.set(6, -3, -5);
  scene.add(rim);
  var fill = new THREE.DirectionalLight(0xffffff, 0.8);
  fill.position.set(-5, 3, 5);
  scene.add(fill);
  var ambient = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambient);

  // Build Cube
  var spacing = 1.05;
  var geo = new THREE.BoxGeometry(1, 1, 1);
  var cubeRoot = new THREE.Group();
  scene.add(cubeRoot);

  var colors = { px: 0xff0000, nx: 0xff6200, py: 0xffffff, ny: 0xffdd00, pz: 0x00ff3c, nz: 0x0055ff };
  var materials = [];
  ['px','nx','py','ny','pz','nz'].forEach(function(k) {
    materials.push(new THREE.MeshPhysicalMaterial({ color: colors[k], roughness: 0.1, metalness: 0.1, clearcoat: 1.0 }));
  });

  var cubies = [];
  for (var x = -1; x <= 1; x++) {
    for (var y = -1; y <= 1; y++) {
      for (var z = -1; z <= 1; z++) {
        var m = materials.map(function(mat, i) {
          if (i===0 && x===1) return mat; if (i===1 && x===-1) return mat;
          if (i===2 && y===1) return mat; if (i===3 && y===-1) return mat;
          if (i===4 && z===1) return mat; if (i===5 && z===-1) return mat;
          return new THREE.MeshPhysicalMaterial({ color: 0x222222, roughness: 0.8 });
        });
        var cubie = new THREE.Mesh(geo, m);
        cubie.position.set(x * spacing, y * spacing, z * spacing);
        cubie.userData = { coord: new THREE.Vector3(x, y, z), baseQuat: new THREE.Quaternion() };
        cubeRoot.add(cubie);
        cubies.push(cubie);
      }
    }
  }

  var FACE = {
    R: { axis: new THREE.Vector3(1, 0, 0), key: 'x', layer: 1 },
    L: { axis: new THREE.Vector3(1, 0, 0), key: 'x', layer: -1 },
    U: { axis: new THREE.Vector3(0, 1, 0), key: 'y', layer: 1 },
    D: { axis: new THREE.Vector3(0, 1, 0), key: 'y', layer: -1 },
    F: { axis: new THREE.Vector3(0, 0, 1), key: 'z', layer: 1 },
    B: { axis: new THREE.Vector3(0, 0, 1), key: 'z', layer: -1 }
  };
  var solution = [
    { face: 'F', prime: false },
    { face: 'U', prime: true },
    { face: 'R', prime: true },
    { face: 'D', prime: false },
    { face: 'B', prime: true }
  ];

  function layerCubies(faceName) {
    var def = FACE[faceName];
    return cubies.filter(function (c) { return Math.round(c.userData.coord[def.key]) === def.layer; });
  }

  // Pre-calculate scramble states
  var states = [];
  // State 0 is Solved
  
  // We need to scramble it, and then as user scrolls, it animates towards solved.
  // The solution array solves it. So if we apply the solution reversed, it scrambles it.
  function applyMoveToState(move) {
    var angle = move.prime ? Math.PI/2 : -Math.PI/2;
    var q = new THREE.Quaternion().setFromAxisAngle(FACE[move.face].axis, angle);
    layerCubies(move.face).forEach(function(c) {
      c.userData.coord.applyAxisAngle(FACE[move.face].axis, angle);
      c.userData.coord.set(Math.round(c.userData.coord.x), Math.round(c.userData.coord.y), Math.round(c.userData.coord.z));
      c.userData.baseQuat.premultiply(q);
      c.userData.baseQuat.normalize();
    });
  }

  // To make state 0 the scrambled state, we apply the inverse of the solution.
  // Actually, let's just make the "target" solved, and start scrambled.
  // First, let's store the base states for each step.
  // For simplicity, we just apply moves based on scroll progress in real time.
  
  // Wait, real-time scrubbing of 3D rotations without snapping is tricky.
  // Instead, let's use the same logic as loader, but driven by scroll!
  
  var currentStep = 0;
  var lastScrollY = window.scrollY;

  // Let's just do a simple continuous auto-rotation of the cube here, 
  // and trigger specific moves as the user reaches each job item!
  
  var activeTurn = null;
  function easeOutElastic(x) {
    var c4 = (2 * Math.PI) / 2.3;
    return x === 0 ? 0 : x === 1 ? 1 : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
  }

  function beginTurn(move) {
    if (activeTurn) return;
    var def = FACE[move.face];
    var angle = move.prime ? Math.PI / 2 : -Math.PI / 2;
    var selected = layerCubies(move.face);
    var pivot = new THREE.Group();
    cubeRoot.add(pivot);
    selected.forEach(function (c) { pivot.attach(c); });
    activeTurn = { pivot: pivot, selected: selected, axis: def.axis.clone(), angle: angle, elapsed: 0, duration: 0.65 };
  }

  function finishTurn() {
    var turn = activeTurn;
    turn.pivot.quaternion.setFromAxisAngle(turn.axis, turn.angle);
    turn.selected.forEach(function (c) {
      c.userData.coord.applyAxisAngle(turn.axis, turn.angle);
      c.userData.coord.set(Math.round(c.userData.coord.x), Math.round(c.userData.coord.y), Math.round(c.userData.coord.z));
      cubeRoot.attach(c);
      c.position.copy(c.userData.coord).multiplyScalar(spacing);
      c.quaternion.normalize();
    });
    cubeRoot.remove(turn.pivot);
    activeTurn = null;
  }

  // Scramble it to start!
  solution.slice().reverse().forEach(function(m) {
    applyMoveToState({ face: m.face, prime: !m.prime });
  });
  cubies.forEach(function(c) {
    c.position.copy(c.userData.coord).multiplyScalar(spacing);
    c.quaternion.copy(c.userData.baseQuat);
  });

  // Animation Loop
  var lastTime = performance.now();
  function animate() {
    requestAnimationFrame(animate);
    var now = performance.now();
    var dt = (now - lastTime) / 1000;
    lastTime = now;

    if (activeTurn) {
      activeTurn.elapsed += dt;
      var t = Math.min(activeTurn.elapsed / activeTurn.duration, 1);
      activeTurn.pivot.quaternion.setFromAxisAngle(activeTurn.axis, activeTurn.angle * easeOutElastic(t));
      if (t >= 1) finishTurn();
    }

    if (!activeTurn) {
       cubeRoot.rotation.y += dt * 0.2;
       cubeRoot.rotation.x += dt * 0.1;
    }
    renderer.render(scene, camera);
  }
  animate();

  // Resize handler
  window.addEventListener('resize', function() {
    if(!wrapper) return;
    camera.aspect = wrapper.clientWidth / wrapper.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(wrapper.clientWidth, wrapper.clientHeight, false);
  });

  // Intersection Observer for Skills
  var jobItems = document.querySelectorAll('.job-item');
  var skillsList = document.getElementById('exp-skills-list');
  var movesFired = 0;

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        var skills = entry.target.getAttribute('data-skills').split('|');
        skillsList.innerHTML = '';
        skills.forEach(function(s, i) {
          var li = document.createElement('li');
          li.className = 'skill-tag';
          li.textContent = s;
          li.style.animationDelay = (i * 0.05) + 's';
          skillsList.appendChild(li);
        });

        // Fire a move on the cube!
        if (movesFired < solution.length && !activeTurn) {
          beginTurn(solution[movesFired]);
          movesFired++;
        }
      }
    });
  }, { threshold: 0.5 });

  jobItems.forEach(function(job) { observer.observe(job); });

})();
</script>
"""
    content = content.replace("</script>\n</body>", js_to_add + "\n</body>")

    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(content)

update_html()
