/* Configuration */
tailwind.config = {
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#f2f7f4',
          100: '#e1ede6',
          500: '#386641',
          700: '#27472e',
          800: '#1F3A2E',
          900: '#14271f',
        },
        sand: {
          50: '#FDFBF7',
          100: '#F7F3EB',
          200: '#EFE7D3',
          300: '#E0D4B8',
        },
        rust: {
          500: '#B5541F',
          600: '#9A4519',
        },
        water: {
          500: '#2B7A78',
          600: '#17252A',
        },
        charcoal: '#1B1B16',
      },
      fontFamily: {
        serif: ['Fraunces', 'serif'],
        sans: ['Sarabun', 'Plus Jakarta Sans', 'sans-serif'],
      }
    }
  }
};

/* =========================================================
   DATA MODEL
========================================================= */

const places = {
  "ศูนย์บริการนักท่องเที่ยว": {
    desc: "จุดเริ่มต้นเส้นทาง ลงทะเบียน รับแผนที่ และติดต่อเจ้าหน้าที่อุทยาน",
    x: 80,
    y: 190,
    icon: "compass",
    badge: "จุดบริการ",
    color: "bg-amber-100 text-amber-800"
  },

  "ลานสน": {
    desc: "ลานป่าสนร่มรื่น บรรยากาศเงียบสงบ เหมาะสำหรับพักดื่มน้ำและถ่ายรูป",
    x: 230,
    y: 80,
    icon: "trees",
    badge: "ธรรมชาติ",
    color: "bg-emerald-100 text-emerald-800"
  },

  "ริมธาร": {
    desc: "จุดพักริมลำธารใสเย็น สามารถนั่งพักผ่อน ฟังเสียงน้ำไหล และล้างหน้าผ่อนคลาย",
    x: 230,
    y: 300,
    icon: "waves",
    badge: "แหล่งน้ำ",
    color: "bg-blue-100 text-blue-800"
  },

  "น้ำตกสายรุ้ง": {
    desc: "น้ำตกสวยงามตระการตา ไฮไลต์เด็ดที่มีละอองน้ำสะท้อนแสงแดดเป็นสายรุ้ง",
    x: 400,
    y: 190,
    icon: "droplets",
    badge: "จุดไฮไลต์",
    color: "bg-cyan-100 text-cyan-800"
  },

  "ถ้ำหินงอก": {
    desc: "ถ้ำธรรมชาติที่มีหินงอกหินย้อยตระการตา ต้องใช้ไฟฉายในการเข้าชม",
    x: 400,
    y: 60,
    icon: "mountain-snow",
    badge: "จุดสำรวจ",
    color: "bg-purple-100 text-purple-800"
  },

  "จุดชมวิวยอดดอย": {
    desc: "จุดสูงสุดของอุทยาน มองเห็นวิวทิวทัศน์ได้แบบ 360 องศา และทะเลหมอกยามเช้า",
    x: 580,
    y: 120,
    icon: "sun",
    badge: "จุดชมวิว",
    color: "bg-orange-100 text-orange-800"
  },

  "ลานกางเต็นท์": {
    desc: "พื้นที่พักแรมกลางคืน มีสิ่งอำนวยความสะดวก ห้องน้ำ และจุดประกอบอาหาร",
    x: 580,
    y: 300,
    icon: "tent",
    badge: "จุดพักแรม",
    color: "bg-teal-100 text-teal-800"
  }
};
// ==================== TREE ====================
// โครงสร้าง Tree สำหรับจัดหมวดหมู่สถานที่ท่องเที่ยว
const trailTree = {
    name: "TrailWise",
    children: [
        {
            name: "สถานที่ท่องเที่ยวธรรมชาติ",
            children: [
                { name: "น้ำตกสายรุ้ง", children: [] },
                { name: "ถ้ำหินงอก", children: [] },
                { name: "จุดชมวิวยอดดอย", children: [] },
                { name: "ลานสน", children: [] }
            ]
        },
        {
            name: "จุดพักและสิ่งอำนวยความสะดวก",
            children: [
                { name: "ศูนย์บริการนักท่องเที่ยว", children: [] },
                { name: "ลานกางเต็นท์", children: [] },
                { name: "ริมธาร", children: [] }
            ]
        }
    ]
};

// หาความลึกของ Tree
function getTreeDepth(node) {
    if (!node.children || node.children.length === 0) {
        return 0;
    }

    return 1 + Math.max(...node.children.map(getTreeDepth));
}

// ความลึกของ Tree = 2
const treeDepth = getTreeDepth(trailTree);

console.log("Tree:", trailTree);
console.log("Tree Depth:", treeDepth);

/* =========================================================
   GRAPH
========================================================= */

const graph = {
  "ศูนย์บริการนักท่องเที่ยว": [
    { to: "ลานสน", w: 1.2 },
    { to: "ริมธาร", w: 2.0 }
  ],

  "ลานสน": [
    { to: "ศูนย์บริการนักท่องเที่ยว", w: 1.2 },
    { to: "น้ำตกสายรุ้ง", w: 1.5 },
    { to: "ถ้ำหินงอก", w: 2.3 }
  ],

  "ริมธาร": [
    { to: "ศูนย์บริการนักท่องเที่ยว", w: 2.0 },
    { to: "น้ำตกสายรุ้ง", w: 1.0 },
    { to: "ลานกางเต็นท์", w: 1.8 }
  ],

  "น้ำตกสายรุ้ง": [
    { to: "ลานสน", w: 1.5 },
    { to: "ริมธาร", w: 1.0 },
    { to: "จุดชมวิวยอดดอย", w: 2.5 }
  ],

  "ถ้ำหินงอก": [
    { to: "ลานสน", w: 2.3 },
    { to: "จุดชมวิวยอดดอย", w: 1.7 }
  ],

  "จุดชมวิวยอดดอย": [
    { to: "น้ำตกสายรุ้ง", w: 2.5 },
    { to: "ถ้ำหินงอก", w: 1.7 },
    { to: "ลานกางเต็นท์", w: 2.0 }
  ],

  "ลานกางเต็นท์": [
    { to: "ริมธาร", w: 1.8 },
    { to: "จุดชมวิวยอดดอย", w: 2.0 }
  ]
};


/* =========================================================
   CATEGORY
========================================================= */

const categories = [
  {
    name: "สถานที่ท่องเที่ยวธรรมชาติ",
    items: [
      "น้ำตกสายรุ้ง",
      "จุดชมวิวยอดดอย",
      "ถ้ำหินงอก",
      "ลานสน"
    ]
  },

  {
    name: "จุดพักและสิ่งอำนวยความสะดวก",
    items: [
      "ศูนย์บริการนักท่องเที่ยว",
      "ลานกางเต็นท์",
      "ริมธาร"
    ]
  },

  {
    name: "กิจกรรมยอดนิยม",
    items: [
      "จุดชมวิวยอดดอย",
      "น้ำตกสายรุ้ง",
      "ถ้ำหินงอก",
      "ลานกางเต็นท์"
    ]
  }
];


/* =========================================================
   ALGORITHMS
========================================================= */

function bfsPath(start, goal) {

  const queue = [[start]];
  const visited = new Set([start]);

  while (queue.length) {

    const path = queue.shift();
    const node = path.at(-1);

    if (node === goal) {
      return path;
    }

    for (const { to } of graph[node] || []) {

      if (!visited.has(to)) {

        visited.add(to);

        queue.push([
          ...path,
          to
        ]);
      }
    }
  }

  return null;
}


function dfsPath(
  start,
  goal,
  visited = new Set(),
  path = []
) {

  visited.add(start);

  path = [
    ...path,
    start
  ];

  if (start === goal) {
    return path;
  }

  for (const { to } of graph[start] || []) {

    if (!visited.has(to)) {

      const result = dfsPath(
        to,
        goal,
        visited,
        path
      );

      if (result) {
        return result;
      }
    }
  }

  return null;
}


function findClosestNode(dist, visited) {

  let u = null;
  let best = Infinity;

  for (const v in dist) {

    if (
      !visited.has(v) &&
      dist[v] < best
    ) {

      best = dist[v];
      u = v;
    }
  }

  return u;
}


function dijkstra(start, goal) {

  const dist = {};
  const prev = {};
  const visited = new Set();

  Object.keys(graph).forEach(v => {
    dist[v] = Infinity;
  });

  dist[start] = 0;

  while (true) {

    const u = findClosestNode(
      dist,
      visited
    );

    if (u === null) {
      break;
    }

    if (u === goal) {
      break;
    }

    visited.add(u);

    for (const { to, w } of graph[u] || []) {

      const alt = dist[u] + w;

      if (alt < dist[to]) {

        dist[to] = alt;
        prev[to] = u;
      }
    }
  }

  if (dist[goal] === Infinity) {
    return null;
  }

  const path = [];

  let cur = goal;

  while (cur) {

    path.unshift(cur);

    cur = prev[cur];
  }

  return {
    path,
    distance: dist[goal]
  };
}


function calculatePathDistance(pathArray) {

  if (
    !pathArray ||
    pathArray.length < 2
  ) {
    return 0;
  }

  let dist = 0;

  for (
    let i = 0;
    i < pathArray.length - 1;
    i++
  ) {

    const u = pathArray[i];
    const v = pathArray[i + 1];

    const edge = (graph[u] || [])
      .find(e => e.to === v);

    if (edge) {
      dist += edge.w;
    }
  }

  return dist;
}


/* =========================================================
   GLOBAL STATE
========================================================= */

let activeSelectedPath = [];

let currentCategoryTab = "ทั้งหมด";

let mapClickStep = 0;


/*
 * สำคัญ:
 * หน้า map.html ใช้ตัวแปรสองตัวนี้
 *
 * null/null     = ยังไม่ได้เลือก
 * start/null    = เลือกจุดแรกแล้ว
 * start/end     = เลือกครบสองจุดแล้ว
 */

let mapStartPoint = null;
let mapEndPoint = null;


/* =========================================================
   GENERAL
========================================================= */

function toggleMobileMenu() {

  const menu =
    document.getElementById('mobile-menu');

  if (menu) {
    menu.classList.toggle('hidden');
  }
}


function navigateToRoute(targetPlace) {

  sessionStorage.setItem(
    'targetPlace',
    targetPlace
  );

  window.location.href =
    'route.html';
}


/* =========================================================
   ROUTE PAGE
========================================================= */

function populateDropdowns() {

  const startSel =
    document.getElementById('startSel');

  const endSel =
    document.getElementById('endSel');

  if (!startSel || !endSel) {
    return;
  }


  startSel.innerHTML = '';

  endSel.innerHTML = '';


  Object.keys(places).forEach(name => {

    startSel.innerHTML +=
      `<option value="${name}">${name}</option>`;

    endSel.innerHTML +=
      `<option value="${name}">${name}</option>`;
  });


  const savedTarget =
    sessionStorage.getItem('targetPlace');


  startSel.value =
    "ศูนย์บริการนักท่องเที่ยว";


  endSel.value =
    savedTarget ||
    "จุดชมวิวยอดดอย";


  sessionStorage.removeItem(
    'targetPlace'
  );


  /*
   * เมื่อเปิด route.html
   * ให้การคลิกแผนที่ครั้งแรก
   * เป็นการเลือกจุดเริ่มต้น
   */

  mapClickStep = 0;


  startSel.addEventListener(
    'change',
    () => {

      /*
       * เมื่อผู้ใช้เปลี่ยน dropdown จุดเริ่ม
       * จุดเริ่มถือว่าถูกเลือกแล้ว
       * ต่อไปคลิกแผนที่จะเป็นจุดหมาย
       */

      mapClickStep = 1;

      calculateRoute();
    }
  );


  endSel.addEventListener(
    'change',
    () => {

      mapClickStep = 2;

      calculateRoute();
    }
  );


  document
    .getElementById('algoSel')
    ?.addEventListener(
      'change',
      () => {

        updateAlgoExplainText();

        calculateRoute();
      }
    );


  document
    .getElementById('findBtn')
    ?.addEventListener(
      'click',
      calculateRoute
    );
}


function updateAlgoExplainText() {

  const algoEl =
    document.getElementById('algoSel');

  const explain =
    document.getElementById(
      'algo-explain-text'
    );


  if (!algoEl || !explain) {
    return;
  }


  const algo = algoEl.value;


  if (algo === 'dijkstra') {

    explain.innerHTML =
      '<strong>เส้นทางสั้นที่สุด:</strong> ระบบจะเลือกเส้นทางที่ใช้ระยะทางเดินเท้ารวมน้อยที่สุดเพื่อประหยัดพลังงาน';

  } else if (algo === 'bfs') {

    explain.innerHTML =
      '<strong>แวะพักน้อยที่สุด:</strong> ค้นหาเส้นทางตรงที่ผ่านจุดแวะพักระหว่างทางน้อยที่สุด';

  } else {

    explain.innerHTML =
      '<strong>เส้นทางศึกษาธรรมชาติ:</strong> แนะนำการเดินสำรวจตามแนวป่าเพื่อชมธรรมชาติรายทาง';
  }
}


/* =========================================================
   HOME CARDS
========================================================= */

function renderHomeCards() {

  const grid =
    document.getElementById(
      'home-places-grid'
    );


  if (!grid) {
    return;
  }


  grid.innerHTML = '';


  Object.entries(places)
    .forEach(([name, info]) => {

      const card =
        document.createElement('div');


      card.className =
        'glass-card p-5 rounded-2xl border border-sand-300 hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between';


      card.onclick = () =>
        navigateToRoute(name);


      card.innerHTML = `
        <div>

          <div class="flex items-center justify-between mb-3">

            <span class="px-2.5 py-1 rounded-full ${info.color} text-xs font-semibold flex items-center gap-1.5">

              <i
                data-lucide="${info.icon}"
                class="w-3.5 h-3.5">
              </i>

              ${info.badge}

            </span>

            <i
              data-lucide="arrow-up-right"
              class="w-4 h-4 text-rust-500 opacity-0 group-hover:opacity-100 transition-opacity">
            </i>

          </div>

          <h3 class="font-serif font-bold text-lg text-forest-900 mb-1 group-hover:text-rust-500 transition-colors flex items-center gap-2">

            ${name}

          </h3>

          <p class="text-xs text-charcoal/70 leading-relaxed">

            ${info.desc}

          </p>

        </div>

        <div class="mt-4 pt-3 border-t border-sand-200 text-xs text-rust-500 font-semibold flex items-center gap-1">

          วางแผนไปที่นี่

          <i
            data-lucide="chevron-right"
            class="w-3.5 h-3.5">
          </i>

        </div>
      `;


      grid.appendChild(card);
    });


  if (window.lucide) {
    lucide.createIcons();
  }
}


/* =========================================================
   ROUTE HELPERS
========================================================= */

function getRouteElements() {

  const startSel =
    document.getElementById('startSel');

  const endSel =
    document.getElementById('endSel');

  const algoSel =
    document.getElementById('algoSel');


  if (
    !startSel ||
    !endSel ||
    !algoSel
  ) {
    return null;
  }


  return {
    startSel,
    endSel,
    algoSel
  };
}


function getComputedRoute(
  algo,
  start,
  end
) {

  if (algo === 'dijkstra') {

    const res =
      dijkstra(start, end);


    if (res) {

      return {
        path: res.path,
        distance: res.distance
      };
    }


    return {
      path: [],
      distance: 0
    };
  }


  if (algo === 'bfs') {

    const path =
      bfsPath(start, end);


    return {
      path: path || [],
      distance:
        calculatePathDistance(
          path || []
        )
    };
  }


  const path =
    dfsPath(start, end);


  return {
    path: path || [],
    distance:
      calculatePathDistance(
        path || []
      )
  };
}


/* =========================================================
   ROUTE RESULT
========================================================= */

function renderRouteResultUI(
  out,
  list,
  start,
  end,
  totalDistance
) {

  if (out) {

    out.innerHTML = `
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">

        <div>

          เส้นทางจาก

          <strong class="text-sand-100">
            ${start}
          </strong>

          ถึง

          <strong class="text-sand-100">
            ${end}
          </strong>

        </div>

        <div class="text-rust-500 bg-sand-50 px-3 py-1 rounded-full text-xs font-bold self-start sm:self-auto shadow-sm">

          ระยะทางรวม
          ${totalDistance.toFixed(1)}
          กม.

        </div>

      </div>
    `;
  }


  if (list) {
    list.innerHTML = "";
  }
}


function renderRouteSteps(
  list,
  computedPath
) {

  if (!list) {
    return;
  }


  computedPath.forEach(
    (name, i) => {

      const li =
        document.createElement('li');


      li.className =
        'flex items-start gap-3 bg-white p-3.5 rounded-xl border border-sand-300 shadow-sm';


      const isStart =
        i === 0;


      const isEnd =
        i ===
        computedPath.length - 1;


      let badgeColor =
        'bg-sand-200 text-forest-900';


      if (isStart) {

        badgeColor =
          'bg-forest-800 text-white';

      } else if (isEnd) {

        badgeColor =
          'bg-rust-500 text-white';
      }


      const placeIcon =
        places[name]
          ? places[name].icon
          : 'map-pin';


      li.innerHTML = `
        <span class="flex-none w-8 h-8 rounded-full ${badgeColor} text-xs font-bold flex items-center justify-center mt-0.5 shadow-sm">

          ${i + 1}

        </span>

        <div class="flex-grow">

          <div class="flex items-center justify-between">

            <strong class="text-forest-900 text-sm flex items-center gap-1.5">

              <i
                data-lucide="${placeIcon}"
                class="w-4 h-4 text-rust-500">
              </i>

              ${name}

            </strong>

            ${
              isStart
                ? '<span class="text-[10px] bg-forest-100 text-forest-800 font-bold px-2 py-0.5 rounded">จุดเริ่มต้น</span>'
                : ''
            }

            ${
              isEnd
                ? '<span class="text-[10px] bg-rust-50 text-rust-500 font-bold px-2 py-0.5 rounded">จุดหมาย</span>'
                : ''
            }

          </div>

          <div class="text-xs text-charcoal/70 mt-1">

            ${
              places[name]
                ? places[name].desc
                : ''
            }

          </div>

        </div>
      `;


      list.appendChild(li);
    }
  );


  if (window.lucide) {
    lucide.createIcons();
  }
}


function updateRouteAdvice(
  note,
  algo,
  start,
  end,
  computedPath
) {

  if (!note) {
    return;
  }


  const fewest =
    bfsPath(start, end);


  if (
    algo === 'dijkstra' &&
    fewest &&
    fewest.length <
      computedPath.length
  ) {

    note.style.display =
      'block';


    note.innerHTML = `
      💡
      <strong>
        คำแนะนำเพิ่มเติม:
      </strong>

      หากต้องการเส้นทางที่แวะพักน้อยจุดกว่า
      สามารถเลือกเดินผ่านเส้นทาง:

      <span class="text-rust-500 font-semibold">
        ${fewest.join(' → ')}
      </span>
    `;

  } else {

    note.style.display =
      'none';
  }
}


function calculateRoute() {

  const elements =
    getRouteElements();


  if (!elements) {
    return;
  }


  const {
    startSel,
    endSel,
    algoSel
  } = elements;


  const start =
    startSel.value;

  const end =
    endSel.value;

  const algo =
    algoSel.value;


  const out =
    document.getElementById(
      'routeResult'
    );

  const list =
    document.getElementById(
      'stepList'
    );

  const note =
    document.getElementById(
      'altNote'
    );


  if (start === end) {

    if (out) {

      out.innerHTML =
        `<span class="text-amber-300">
          ⚠️ กรุณาเลือกจุดปลายทางให้แตกต่างจากจุดเริ่มต้นค่ะ
        </span>`;
    }


    if (list) {
      list.innerHTML = "";
    }


    if (note) {
      note.style.display =
        'none';
    }


    activeSelectedPath = [
      start
    ];


    drawGraphCanvas(
      'route-canvas-svg',
      activeSelectedPath
    );


    return;
  }


  const result =
    getComputedRoute(
      algo,
      start,
      end
    );


  const computedPath =
    result.path;


  const totalDistance =
    result.distance;


  activeSelectedPath =
    computedPath;


  drawGraphCanvas(
    'route-canvas-svg',
    activeSelectedPath
  );


  if (
    !computedPath ||
    computedPath.length === 0
  ) {

    if (out) {

      out.innerHTML =
        "ยังไม่มีเส้นทางเชื่อมต่อระหว่างสองจุดนี้ค่ะ";
    }


    if (list) {
      list.innerHTML = "";
    }


    if (note) {
      note.style.display =
        'none';
    }


    return;
  }


  renderRouteResultUI(
    out,
    list,
    start,
    end,
    totalDistance
  );


  renderRouteSteps(
    list,
    computedPath
  );


  updateRouteAdvice(
    note,
    algo,
    start,
    end,
    computedPath
  );
}


/* =========================================================
   GRAPH HELPERS
========================================================= */

function isEdgeInPath(
  u,
  v,
  path
) {

  if (
    !path ||
    path.length < 2
  ) {
    return false;
  }


  for (
    let i = 0;
    i < path.length - 1;
    i++
  ) {

    if (
      (
        path[i] === u &&
        path[i + 1] === v
      )
      ||
      (
        path[i] === v &&
        path[i + 1] === u
      )
    ) {

      return true;
    }
  }


  return false;
}


/* =========================================================
   DRAW GRAPH
========================================================= */

function drawGraphCanvas(
  svgId,
  highlightPath = []
) {

  const svg =
    document.getElementById(svgId);


  if (!svg) {
    return;
  }


  /*
   * ล้างเฉพาะภาพใน SVG
   * ไม่ล้าง mapStartPoint/mapEndPoint
   *
   * ตรงนี้สำคัญมาก
   */

  svg.innerHTML = '';


  const drawnEdges =
    new Set();


  const validPath =
    Array.isArray(highlightPath)
      ? highlightPath
      : [];


/* -------------------------
   DRAW EDGES
------------------------- */

  Object.keys(graph)
    .forEach(u => {

      const p1 =
        places[u];


      graph[u].forEach(
        ({ to: v, w }) => {

          const p2 =
            places[v];


          const edgeKey =
            [u, v]
              .sort(
                (a, b) =>
                  a.localeCompare(b)
              )
              .join('--');


          if (
            drawnEdges.has(edgeKey)
          ) {
            return;
          }


          drawnEdges.add(edgeKey);


          const highlighted =
            isEdgeInPath(
              u,
              v,
              validPath
            );


          const line =
            document.createElementNS(
              'http://www.w3.org/2000/svg',
              'line'
            );


          line.setAttribute(
            'x1',
            p1.x
          );

          line.setAttribute(
            'y1',
            p1.y
          );

          line.setAttribute(
            'x2',
            p2.x
          );

          line.setAttribute(
            'y2',
            p2.y
          );


          line.setAttribute(
            'stroke',
            highlighted
              ? '#B5541F'
              : '#D8CDAF'
          );


          line.setAttribute(
            'stroke-width',
            highlighted
              ? '4'
              : '2'
          );


          /*
           * เส้นไม่รับ click
           * เพื่อไม่ขวาง node
           */

          line.style.pointerEvents =
            'none';


          if (highlighted) {

            line.setAttribute(
              'class',
              'animated-pulse-line'
            );
          }


          svg.appendChild(line);


          const midX =
            (p1.x + p2.x) / 2;


          const midY =
            (p1.y + p2.y) / 2;


          const rect =
            document.createElementNS(
              'http://www.w3.org/2000/svg',
              'rect'
            );


          rect.setAttribute(
            'x',
            midX - 18
          );

          rect.setAttribute(
            'y',
            midY - 10
          );

          rect.setAttribute(
            'width',
            '36'
          );

          rect.setAttribute(
            'height',
            '18'
          );

          rect.setAttribute(
            'rx',
            '9'
          );


          rect.setAttribute(
            'fill',
            highlighted
              ? '#B5541F'
              : '#FBF8EF'
          );


          rect.setAttribute(
            'stroke',
            highlighted
              ? '#B5541F'
              : '#D8CDAF'
          );


          rect.setAttribute(
            'stroke-width',
            '1'
          );


          /*
           * ป้ายระยะทางไม่รับ click
           */

          rect.style.pointerEvents =
            'none';


          svg.appendChild(rect);


          const text =
            document.createElementNS(
              'http://www.w3.org/2000/svg',
              'text'
            );


          text.setAttribute(
            'x',
            midX
          );

          text.setAttribute(
            'y',
            midY + 3.5
          );

          text.setAttribute(
            'text-anchor',
            'middle'
          );

          text.setAttribute(
            'font-size',
            '10'
          );

          text.setAttribute(
            'font-weight',
            'bold'
          );


          text.setAttribute(
            'fill',
            highlighted
              ? '#FFFFFF'
              : '#386641'
          );


          text.textContent =
            `${w} กม.`;


          text.style.pointerEvents =
            'none';


          svg.appendChild(text);
        }
      );
    });


/* -------------------------
   DRAW NODES
------------------------- */

  Object.entries(places)
    .forEach(([name, p]) => {

      const isNodeInPath =
        validPath.includes(name);


      const isStartNode =
        validPath.length > 0 &&
        validPath[0] === name;


      const isEndNode =
        validPath.length > 1 &&
        validPath.at(-1) === name;


      /*
       * group เป็นพื้นที่ click
       */

      const group =
        document.createElementNS(
          'http://www.w3.org/2000/svg',
          'g'
        );


      group.setAttribute(
        'class',
        'cursor-pointer group'
      );


      group.style.cursor =
        'pointer';


      group.style.pointerEvents =
        'all';


      /*
       * สำคัญ:
       * ทุกครั้งที่ redraw
       * node ใหม่จะได้รับ click listener ใหม่
       */

      group.addEventListener(
        'click',
        function (event) {

          event.preventDefault();

          event.stopPropagation();

          onNodeClick(name);
        }
      );


/* -------------------------
   OUTER CIRCLE
------------------------- */

      const circleOuter =
        document.createElementNS(
          'http://www.w3.org/2000/svg',
          'circle'
        );


      circleOuter.setAttribute(
        'cx',
        p.x
      );

      circleOuter.setAttribute(
        'cy',
        p.y
      );


      circleOuter.setAttribute(
        'r',
        isNodeInPath
          ? '18'
          : '14'
      );


      let circleFill =
        '#FBF8EF';


      if (isStartNode) {

        circleFill =
          '#1F3A2E';

      } else if (isEndNode) {

        circleFill =
          '#B5541F';

      } else if (isNodeInPath) {

        circleFill =
          '#386641';
      }


      circleOuter.setAttribute(
        'fill',
        circleFill
      );


      circleOuter.setAttribute(
        'stroke',
        isNodeInPath
          ? '#B5541F'
          : '#386641'
      );


      circleOuter.setAttribute(
        'stroke-width',
        '3'
      );


      circleOuter.style.pointerEvents =
        'all';


      group.appendChild(
        circleOuter
      );


/* -------------------------
   INNER CIRCLE
------------------------- */

      const circleInner =
        document.createElementNS(
          'http://www.w3.org/2000/svg',
          'circle'
        );


      circleInner.setAttribute(
        'cx',
        p.x
      );

      circleInner.setAttribute(
        'cy',
        p.y
      );

      circleInner.setAttribute(
        'r',
        '4'
      );

      circleInner.setAttribute(
        'fill',
        '#EFE7D3'
      );


      circleInner.style.pointerEvents =
        'none';


      group.appendChild(
        circleInner
      );


/* -------------------------
   LABEL BACKGROUND
------------------------- */

      const labelBg =
        document.createElementNS(
          'http://www.w3.org/2000/svg',
          'rect'
        );


      const textWidth =
        Math.max(
          name.length * 9.5,
          45
        );


      labelBg.setAttribute(
        'x',
        p.x -
          textWidth / 2
      );


      labelBg.setAttribute(
        'y',
        p.y + 22
      );


      labelBg.setAttribute(
        'width',
        textWidth
      );


      labelBg.setAttribute(
        'height',
        '18'
      );


      labelBg.setAttribute(
        'rx',
        '4'
      );


      labelBg.setAttribute(
        'fill',
        isNodeInPath
          ? '#1F3A2E'
          : 'rgba(255,255,255,0.95)'
      );


      /*
       * label ไม่ขวาง click
       */

      labelBg.style.pointerEvents =
        'none';


      group.appendChild(
        labelBg
      );


/* -------------------------
   LABEL TEXT
------------------------- */

      const text =
        document.createElementNS(
          'http://www.w3.org/2000/svg',
          'text'
        );


      text.setAttribute(
        'x',
        p.x
      );


      text.setAttribute(
        'y',
        p.y + 34
      );


      text.setAttribute(
        'text-anchor',
        'middle'
      );


      text.setAttribute(
        'font-size',
        '11'
      );


      text.setAttribute(
        'font-weight',
        isNodeInPath
          ? 'bold'
          : '600'
      );


      text.setAttribute(
        'fill',
        isNodeInPath
          ? '#EFE7D3'
          : '#1B1B16'
      );


      text.textContent =
        name;


      text.style.pointerEvents =
        'none';


      group.appendChild(text);


      svg.appendChild(group);
    });
}


/* =========================================================
   ROUTE.HTML CLICK
========================================================= */

function handleRoutePageClick(
  nodeName,
  startSel,
  endSel
) {

  /*
   * CLICK 1
   * เลือกจุดเริ่มต้น
   */

  if (mapClickStep === 0) {

    startSel.value =
      nodeName;


    mapClickStep = 1;


    const out =
      document.getElementById(
        'routeResult'
      );


    if (out) {

      out.innerHTML = `
        <span class="text-amber-300">

          📍 เลือกจุดเริ่มต้นแล้ว:

          <strong>
            ${nodeName}
          </strong>

          <br>

          👆 กรุณาคลิกอีกครั้งเพื่อเลือกจุดปลายทาง

        </span>
      `;
    }


    drawGraphCanvas(
      'route-canvas-svg',
      [nodeName]
    );


    return;
  }


  /*
   * CLICK 2
   * เลือกจุดปลายทาง
   */

  if (mapClickStep === 1) {

    /*
     * ถ้ากดจุดเดิม
     * ให้รอเลือกจุดอื่น
     * ห้าม reset
     */

    if (
      nodeName ===
      startSel.value
    ) {

      const out =
        document.getElementById(
          'routeResult'
        );


      if (out) {

        out.innerHTML = `
          <span class="text-amber-300">

            ⚠️ จุดปลายทางต้องแตกต่างจากจุดเริ่มต้นค่ะ

            <br>

            👆 กรุณาคลิกจุดอื่นเป็นจุดปลายทาง

          </span>
        `;
      }


      return;
    }


    endSel.value =
      nodeName;


    mapClickStep = 2;


    calculateRoute();


    return;
  }


  /*
   * เลือกครบแล้ว
   * CLICK ใหม่ = เริ่มรอบใหม่
   */

  startSel.value =
    nodeName;


  mapClickStep = 1;


  drawGraphCanvas(
    'route-canvas-svg',
    [nodeName]
  );


  const out =
    document.getElementById(
      'routeResult'
    );


  if (out) {

    out.innerHTML = `
      <span class="text-amber-300">

        📍 เลือกจุดเริ่มต้นใหม่แล้ว:

        <strong>
          ${nodeName}
        </strong>

        <br>

        👆 กรุณาคลิกอีกครั้งเพื่อเลือกจุดปลายทาง

      </span>
    `;
  }
}


/* =========================================================
   MAP.HTML CLICK
   ส่วนที่แก้ปัญหา "กดได้แค่จุดเดียว"
========================================================= */

function handleMapPageClick(
  nodeName
) {

  /*
   * CLICK 1
   * ยังไม่มีจุดเริ่มต้น
   */

  if (mapStartPoint === null) {

    mapStartPoint =
      nodeName;


    mapEndPoint =
      null;


    /*
     * วาดจุดแรก
     * แต่ state mapStartPoint
     * จะไม่ถูกล้าง
     */

    drawGraphCanvas(
      'full-map-svg',
      [mapStartPoint]
    );


    return;
  }


  /*
   * CLICK 2
   * มีจุดแรกแล้ว
   */

  if (mapEndPoint === null) {

    /*
     * กดจุดเดิม
     * ไม่ reset จุดแรก
     */

    if (
      nodeName ===
      mapStartPoint
    ) {

      return;
    }


    /*
     * เก็บจุดที่สอง
     */

    mapEndPoint =
      nodeName;


    /*
     * คำนวณเส้นทาง
     * ระหว่างสองจุด
     */

    const result =
      dijkstra(
        mapStartPoint,
        mapEndPoint
      );


    /*
     * ถ้ามีเส้นทาง
     * วาดเส้นทางทั้งหมด
     */

    if (
      result &&
      Array.isArray(result.path) &&
      result.path.length >= 2
    ) {

      drawGraphCanvas(
        'full-map-svg',
        result.path
      );

    } else {

      /*
       * fallback
       */

      drawGraphCanvas(
        'full-map-svg',
        [
          mapStartPoint,
          mapEndPoint
        ]
      );
    }


    return;
  }


  /*
   * ถ้าเลือกครบ 2 จุดแล้ว
   * การ click ครั้งถัดไป
   * จะเป็นจุดเริ่มต้นใหม่
   */

  mapStartPoint =
    nodeName;


  mapEndPoint =
    null;


  drawGraphCanvas(
    'full-map-svg',
    [mapStartPoint]
  );
}


/* =========================================================
   NODE CLICK ROUTER
========================================================= */

function onNodeClick(
  nodeName
) {

  /*
   * ตรวจว่าหน้านี้คือ route.html หรือไม่
   */

  const startSel =
    document.getElementById(
      'startSel'
    );


  const endSel =
    document.getElementById(
      'endSel'
    );


  /*
   * ROUTE PAGE
   */

  if (
    startSel &&
    endSel
  ) {

    handleRoutePageClick(
      nodeName,
      startSel,
      endSel
    );


    return;
  }


  /*
   * MAP PAGE
   */

  if (
    document.getElementById(
      'full-map-svg'
    )
  ) {

    handleMapPageClick(
      nodeName
    );
  }
}


/* =========================================================
   CATEGORY TABS
========================================================= */

function renderCategoryTabs() {

  const tabsWrap =
    document.getElementById(
      'categoryTabs'
    );


  if (!tabsWrap) {
    return;
  }


  tabsWrap.innerHTML = '';


  const createTabBtn =
    (name, isActive) => {

      const btn =
        document.createElement(
          'button'
        );


      btn.className =
        `px-4 py-2 rounded-full text-xs font-semibold transition-all flex-none ${
          isActive
            ? 'bg-forest-800 text-white shadow-sm'
            : 'bg-white text-forest-900 hover:bg-sand-200 border border-sand-300'
        }`;


      btn.textContent =
        name;


      btn.onclick = () => {

        currentCategoryTab =
          name;


        renderCategoryTabs();


        renderCategoryGrid(
          name
        );
      };


      return btn;
    };


  tabsWrap.appendChild(
    createTabBtn(
      'ทั้งหมด',
      currentCategoryTab ===
        'ทั้งหมด'
    )
  );


  categories.forEach(cat => {

    tabsWrap.appendChild(
      createTabBtn(
        cat.name,
        currentCategoryTab ===
          cat.name
      )
    );
  });
}


/* =========================================================
   CATEGORY GRID
========================================================= */

function renderCategoryGrid(
  categoryName
) {

  const grid =
    document.getElementById(
      'categoryGrid'
    );


  if (!grid) {
    return;
  }


  grid.innerHTML = '';


  let items = [];


  if (
    categoryName ===
    'ทั้งหมด'
  ) {

    Object.keys(places)
      .forEach(name => {

        items.push({
          name,
          cat:
            "จุดเช็คอินในอุทยาน"
        });
      });

  } else {

    const catObj =
      categories.find(
        c =>
          c.name ===
          categoryName
      );


    if (catObj) {

      catObj.items.forEach(
        name => {

          items.push({
            name,
            cat:
              categoryName
          });
        }
      );
    }
  }


  const query =
    (
      document
        .getElementById(
          'categorySearch'
        )
        ?.value || ''
    ).toLowerCase();


  if (query) {

    items =
      items.filter(
        i =>
          i.name
            .toLowerCase()
            .includes(query)
          ||
          i.cat
            .toLowerCase()
            .includes(query)
      );
  }


  items.forEach(item => {

    const info =
      places[item.name];


    if (!info) {
      return;
    }


    const card =
      document.createElement(
        'div'
      );


    card.className =
      'glass-card p-5 rounded-2xl border border-sand-300 flex flex-col justify-between hover:shadow-lg transition-all';


    card.innerHTML = `
      <div>

        <div class="flex items-center justify-between mb-2">

          <span class="text-[11px] font-bold uppercase tracking-wider text-rust-500 bg-rust-50 px-2.5 py-0.5 rounded-full border border-rust-500/20 flex items-center gap-1">

            <i
              data-lucide="${info.icon}"
              class="w-3 h-3">
            </i>

            ${info.badge}

          </span>

          <i
            data-lucide="tag"
            class="w-3.5 h-3.5 text-charcoal/40">
          </i>

        </div>


        <h3 class="font-serif font-bold text-lg text-forest-900 mb-1.5 flex items-center gap-2">

          ${item.name}

        </h3>


        <p class="text-xs text-charcoal/70 leading-relaxed">

          ${info.desc}

        </p>

      </div>


      <div class="mt-4 pt-3 border-t border-sand-200/60 flex items-center justify-between text-xs">

        <span class="text-forest-800 font-medium">

          เปิดบริการตามปกติ

        </span>


        <button
          onclick="navigateToRoute('${item.name}')"
          class="text-rust-500 font-bold hover:underline">

          วางแผนไปจุดนี้ →

        </button>

      </div>
    `;


    grid.appendChild(card);
  });


  if (window.lucide) {
    lucide.createIcons();
  }
}


function filterCategorySearch() {

  renderCategoryGrid(
    currentCategoryTab
  );
}


/* =========================================================
   INITIALIZATION
========================================================= */

window.addEventListener(
  'DOMContentLoaded',
  () => {

    /*
     * ICONS
     */

    if (window.lucide) {
      lucide.createIcons();
    }


    /*
     * HOME
     */

    if (
      document.getElementById(
        'home-places-grid'
      )
    ) {

      renderHomeCards();
    }


    /*
     * ROUTE PAGE
     */

    if (
      document.getElementById(
        'startSel'
      )
    ) {

      populateDropdowns();


      drawGraphCanvas(
        'route-canvas-svg'
      );


      calculateRoute();
    }


    /*
     * MAP PAGE
     */

    if (
      document.getElementById(
        'full-map-svg'
      )
    ) {

      /*
       * reset เฉพาะตอนเปิดหน้าใหม่
       */

      mapStartPoint =
        null;

      mapEndPoint =
        null;


      drawGraphCanvas(
        'full-map-svg',
        []
      );
    }


    /*
     * CATEGORY PAGE
     */

    if (
      document.getElementById(
        'categoryGrid'
      )
    ) {

      renderCategoryTabs();


      renderCategoryGrid(
        'ทั้งหมด'
      );
    }
  }
);