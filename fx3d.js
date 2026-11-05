/* SanookFlix 3D effects: twisting film reel, 3D snacks, stars, balloons and live mascots. */
(function () {
  'use strict';
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var small = innerWidth < 700;
  var rnd = function (a, b) { return a + Math.random() * (b - a); };

  /* ---------- shared 3D paint (gradients) ---------- */
  var BAL = [['#ff8fb0', '#f72867', '#8f0d36'], ['#a6f3ff', '#08c6ee', '#075f8f'], ['#fff3a3', '#ffd21f', '#a87d00'], ['#ffcf8f', '#ff8a00', '#9a4800'], ['#e2c9ff', '#a855f7', '#4c1d95']];
  var defs = '<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>' +
    '<linearGradient id="s3-cupW" x1="0" x2="1"><stop offset="0" stop-color="#b9bac9"/><stop offset=".3" stop-color="#fff"/><stop offset=".62" stop-color="#eef0f7"/><stop offset="1" stop-color="#9a9cb2"/></linearGradient>' +
    '<linearGradient id="s3-cupR" x1="0" x2="1"><stop offset="0" stop-color="#8d0c28"/><stop offset=".32" stop-color="#ff4668"/><stop offset=".62" stop-color="#e11d48"/><stop offset="1" stop-color="#6d0a1f"/></linearGradient>' +
    '<radialGradient id="s3-pop" cx=".36" cy=".3" r=".75"><stop offset="0" stop-color="#fffef6"/><stop offset=".5" stop-color="#ffefb8"/><stop offset="1" stop-color="#e0a94a"/></radialGradient>' +
    '<linearGradient id="s3-soda" x1="0" x2="1"><stop offset="0" stop-color="#07408f"/><stop offset=".3" stop-color="#3cc7ff"/><stop offset=".6" stop-color="#0ea5e9"/><stop offset="1" stop-color="#062f6b"/></linearGradient>' +
    '<linearGradient id="s3-lid" x1="0" x2="1"><stop offset="0" stop-color="#a7b4c6"/><stop offset=".38" stop-color="#fff"/><stop offset="1" stop-color="#7d8ba0"/></linearGradient>' +
    '<linearGradient id="s3-nacho" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffe597"/><stop offset=".55" stop-color="#f6b840"/><stop offset="1" stop-color="#c97d12"/></linearGradient>' +
    '<linearGradient id="s3-bowl" x1="0" x2="1"><stop offset="0" stop-color="#6b210c"/><stop offset=".35" stop-color="#f26a1b"/><stop offset=".65" stop-color="#d9480f"/><stop offset="1" stop-color="#5a1b09"/></linearGradient>' +
    '<radialGradient id="s3-cheese" cx=".4" cy=".35" r=".7"><stop offset="0" stop-color="#fff4b0"/><stop offset="1" stop-color="#f59e0b"/></radialGradient>' +
    '<linearGradient id="s3-bun" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f9d38a"/><stop offset=".5" stop-color="#dc8f3f"/><stop offset="1" stop-color="#93531b"/></linearGradient>' +
    '<linearGradient id="s3-saus" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff9a7a"/><stop offset=".45" stop-color="#c0402a"/><stop offset="1" stop-color="#6e1c11"/></linearGradient>' +
    '<linearGradient id="s3-chocF" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8f5130"/><stop offset="1" stop-color="#4a2210"/></linearGradient>' +
    '<linearGradient id="s3-chocT" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#b8754a"/><stop offset="1" stop-color="#7a4021"/></linearGradient>' +
    '<linearGradient id="s3-foil" x1="0" x2="1"><stop offset="0" stop-color="#1e3a8a"/><stop offset=".3" stop-color="#7cc4ff"/><stop offset=".55" stop-color="#2563eb"/><stop offset="1" stop-color="#172d6b"/></linearGradient>' +
    '<radialGradient id="s3-candy" cx=".36" cy=".3" r=".8"><stop offset="0" stop-color="#ffd0e6"/><stop offset=".5" stop-color="#ff4fa0"/><stop offset="1" stop-color="#a3125a"/></radialGradient>' +
    '<linearGradient id="s3-candyE" x1="0" x2="1"><stop offset="0" stop-color="#ff9dcb"/><stop offset="1" stop-color="#c2186b"/></linearGradient>' +
    '<radialGradient id="s3-dough" cx=".4" cy=".35" r=".75"><stop offset="0" stop-color="#f7cd8c"/><stop offset="1" stop-color="#a8652a"/></radialGradient>' +
    '<radialGradient id="s3-icing" cx=".38" cy=".3" r=".8"><stop offset="0" stop-color="#ffc2dc"/><stop offset=".6" stop-color="#ff5fa2"/><stop offset="1" stop-color="#c22a73"/></radialGradient>' +
    '<radialGradient id="s3-hole" cx=".5" cy=".6" r=".6"><stop offset="0" stop-color="#3a1d0b" stop-opacity=".0"/><stop offset="1" stop-color="#3a1d0b" stop-opacity=".55"/></radialGradient>' +
    '<linearGradient id="s3-cone" x1="0" x2="1"><stop offset="0" stop-color="#a8641f"/><stop offset=".4" stop-color="#f1b866"/><stop offset="1" stop-color="#8a4d12"/></linearGradient>' +
    '<radialGradient id="s3-scoopP" cx=".36" cy=".3" r=".8"><stop offset="0" stop-color="#ffe3ef"/><stop offset=".55" stop-color="#ff8fbd"/><stop offset="1" stop-color="#d14b86"/></radialGradient>' +
    '<radialGradient id="s3-scoopM" cx=".36" cy=".3" r=".8"><stop offset="0" stop-color="#e8fff6"/><stop offset=".55" stop-color="#7ee8c4"/><stop offset="1" stop-color="#2bab83"/></radialGradient>' +
    '<radialGradient id="s3-cherry" cx=".35" cy=".3" r=".75"><stop offset="0" stop-color="#ff8a8a"/><stop offset="1" stop-color="#a1001b"/></radialGradient>' +
    '<linearGradient id="s3-crust" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f3c178"/><stop offset="1" stop-color="#a2601f"/></linearGradient>' +
    '<linearGradient id="s3-pcheese" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffe680"/><stop offset="1" stop-color="#f5a623"/></linearGradient>' +
    '<radialGradient id="s3-pep" cx=".38" cy=".32" r=".75"><stop offset="0" stop-color="#f26b5b"/><stop offset="1" stop-color="#8f1d12"/></radialGradient>' +
    '<linearGradient id="s3-clap" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a3f5c"/><stop offset="1" stop-color="#0d0f1f"/></linearGradient>' +
    '<radialGradient id="s3-gummy" cx=".38" cy=".3" r=".8"><stop offset="0" stop-color="#d9ffb3" stop-opacity=".95"/><stop offset=".55" stop-color="#7ed321" stop-opacity=".9"/><stop offset="1" stop-color="#3e8f0e" stop-opacity=".95"/></radialGradient>' +
    '<linearGradient id="s3-fries" x1="0" x2="1"><stop offset="0" stop-color="#e9a62a"/><stop offset=".45" stop-color="#ffe08a"/><stop offset="1" stop-color="#d48b17"/></linearGradient>' +
    '<linearGradient id="s3-box" x1="0" x2="1"><stop offset="0" stop-color="#8d0c28"/><stop offset=".35" stop-color="#ff3d62"/><stop offset="1" stop-color="#7a0b22"/></linearGradient>' +
    BAL.map(function (c, i) { return '<radialGradient id="s3-b' + i + '" cx=".34" cy=".3" r=".78"><stop offset="0" stop-color="' + c[0] + '"/><stop offset=".5" stop-color="' + c[1] + '"/><stop offset="1" stop-color="' + c[2] + '"/></radialGradient>'; }).join('') +
    '</defs></svg>';
  document.body.insertAdjacentHTML('afterbegin', defs);

  var SH = function (cx, cy, rx) { return '<ellipse cx="' + cx + '" cy="' + cy + '" rx="' + rx + '" ry="' + (rx * .18) + '" fill="#000" opacity=".22"/>'; };
  var GL = function (d) { return '<path d="' + d + '" fill="#fff" opacity=".38"/>'; };

  var SNACKS = {
    popcorn: '<svg viewBox="0 0 100 124">' + SH(50, 118, 30) +
      ['22,40,13', '36,28,15', '52,24,16', '68,30,14', '80,42,12', '30,46,12', '46,40,14', '62,42,14', '74,50,11', '40,52,11', '56,54,11'].map(function (k) { var a = k.split(','); return '<circle cx="' + a[0] + '" cy="' + a[1] + '" r="' + a[2] + '" fill="url(#s3-pop)"/>'; }).join('') +
      '<path d="M16 52h68l-9 60q-25 7-50 0z" fill="url(#s3-cupW)"/>' +
      '<path d="M26 52h10l3 63-9-2zM45 52h10l-1 65h-8zM64 52h10l-5 61-8 2z" fill="url(#s3-cupR)"/>' +
      '<ellipse cx="50" cy="52" rx="34" ry="6" fill="url(#s3-cupR)"/><ellipse cx="50" cy="51" rx="30" ry="4" fill="#ffe6a8"/>' +
      GL('M21 56q4 26 8 54l-4-1q-4-26-6-53z') + '</svg>',
    soda: '<svg viewBox="0 0 80 132">' + SH(40, 126, 24) +
      '<path d="M44 2l7 1-4 34-6-1z" fill="#ff4668"/><path d="M45 9l6 1M44 17l6 1M43 25l6 1" stroke="#fff" stroke-width="3"/>' +
      '<path d="M10 34h60v6H10z" fill="url(#s3-lid)"/><ellipse cx="40" cy="34" rx="30" ry="6" fill="url(#s3-lid)"/>' +
      '<path d="M12 40h56l-8 80q-20 6-40 0z" fill="url(#s3-soda)"/>' +
      '<ellipse cx="40" cy="78" rx="13" ry="13" fill="#fff" opacity=".9"/><path d="M40 69l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z" fill="#f72867"/>' +
      GL('M17 44q3 36 7 72l-5-1q-4-36-6-71z') + '</svg>',
    nachos: '<svg viewBox="0 0 120 100">' + SH(60, 94, 44) +
      '<path d="M30 30l22-24 12 34zM56 24l30-14 2 34zM20 42l14-30 26 28zM70 38l34-10-10 30z" fill="url(#s3-nacho)" stroke="#c97d12" stroke-width="1"/>' +
      '<path d="M40 30q10-6 22 0q6 8-4 12q-12 2-18-12z" fill="url(#s3-cheese)"/>' +
      '<path d="M14 44h92q-4 40-46 44q-42-4-46-44z" fill="url(#s3-bowl)"/><ellipse cx="60" cy="44" rx="46" ry="8" fill="#ff8c42"/><ellipse cx="60" cy="44" rx="40" ry="5" fill="#f6b840"/>' +
      GL('M22 50q6 20 22 30l-3 2q-17-10-23-31z') + '</svg>',
    hotdog: '<svg viewBox="0 0 130 70">' + SH(65, 64, 52) +
      '<g transform="rotate(-10 65 36)"><rect x="8" y="22" width="114" height="30" rx="15" fill="url(#s3-saus)"/>' +
      '<path d="M14 38q51 22 102 0q4 18-14 22H28q-18-4-14-22z" fill="url(#s3-bun)"/>' +
      '<path d="M18 30q4-12 18-12h58q14 0 18 12q-47-16-94 0z" fill="url(#s3-bun)"/>' +
      '<path d="M22 34q8-6 16 0t16 0 16 0 16 0 16 0" fill="none" stroke="#ffd21f" stroke-width="4" stroke-linecap="round"/>' +
      '<path d="M30 26q30-6 60 0" fill="none" stroke="#fff" stroke-width="3" opacity=".35" stroke-linecap="round"/></g></svg>',
    chocolate: '<svg viewBox="0 0 120 90">' + SH(60, 84, 46) +
      '<path d="M14 40l60-24 34 12-60 26z" fill="url(#s3-chocT)"/>' +
      '<path d="M14 40l34 14v26L14 66z" fill="url(#s3-chocF)"/><path d="M48 54l60-26v26L48 80z" fill="#3b1a0c"/>' +
      '<path d="M29 34l34 14M44 28l34 14M59 22l34 14M38 46l60-24" stroke="#5a2c15" stroke-width="2" opacity=".8"/>' +
      '<path d="M40 50l34-14 34 12v26L48 80l-8-4z" fill="url(#s3-foil)" opacity=".95"/>' +
      '<path d="M52 66l18-8M60 70l26-11" stroke="#fff" stroke-width="2" opacity=".5"/>' + GL('M18 41l52-21 6 2-54 22z') + '</svg>',
    candy: '<svg viewBox="0 0 120 64">' + SH(60, 60, 34) +
      '<path d="M30 32L6 14v36zM90 32l24-18v36z" fill="url(#s3-candyE)"/>' +
      '<ellipse cx="60" cy="32" rx="32" ry="22" fill="url(#s3-candy)"/>' +
      '<path d="M44 14q-8 18 0 36M60 10q-8 22 0 44M76 14q-8 18 0 36" fill="none" stroke="#fff" stroke-width="4" opacity=".55"/>' +
      '<ellipse cx="50" cy="20" rx="10" ry="5" fill="#fff" opacity=".6"/></svg>',
    donut: '<svg viewBox="0 0 100 92">' + SH(50, 86, 38) +
      '<ellipse cx="50" cy="48" rx="44" ry="34" fill="url(#s3-dough)"/>' +
      '<path d="M10 42q4-26 40-28q36 2 40 28q-2 10-8 12q-4 8-12 4q-8 10-20 4q-12 6-20-4q-8 4-12-4q-6-2-8-12z" fill="url(#s3-icing)"/>' +
      '<ellipse cx="50" cy="42" rx="13" ry="8" fill="#2a1408"/><ellipse cx="50" cy="42" rx="13" ry="8" fill="url(#s3-hole)"/>' +
      '<g stroke-width="4" stroke-linecap="round"><path d="M26 30l6-3" stroke="#ffd21f"/><path d="M70 28l5 3" stroke="#08c6ee"/><path d="M30 50l4 4" stroke="#fff"/><path d="M68 52l6-2" stroke="#a855f7"/><path d="M48 24l6 0" stroke="#7ee8c4"/><path d="M58 58l5 3" stroke="#ffd21f"/></g>' +
      '<path d="M22 26q14-10 30-10" fill="none" stroke="#fff" stroke-width="4" opacity=".55" stroke-linecap="round"/></svg>',
    icecream: '<svg viewBox="0 0 80 130">' + SH(40, 126, 14) +
      '<path d="M14 58h52L40 124z" fill="url(#s3-cone)"/><path d="M20 66l30 36M30 62l26 30M18 78l18 22M60 66L30 102M50 62L24 92M62 78L44 100" stroke="#8a4d12" stroke-width="2" opacity=".6"/>' +
      '<circle cx="40" cy="44" r="22" fill="url(#s3-scoopM)"/><circle cx="40" cy="26" r="19" fill="url(#s3-scoopP)"/>' +
      '<path d="M18 58q6 6 12 0t10 0 10 0 12 0" fill="url(#s3-scoopM)"/>' +
      '<path d="M42 8q4-8 10-6" stroke="#2f7a12" stroke-width="2" fill="none"/><circle cx="41" cy="10" r="7" fill="url(#s3-cherry)"/><circle cx="38.5" cy="7.5" r="2" fill="#fff" opacity=".8"/></svg>',
    pizza: '<svg viewBox="0 0 110 110">' + SH(55, 104, 30) +
      '<path d="M10 22q45-22 90 0L55 104z" fill="url(#s3-pcheese)"/>' +
      '<path d="M8 20q47-24 94 0l-3 8q-44-22-88 0z" fill="url(#s3-crust)"/>' +
      '<circle cx="40" cy="40" r="8" fill="url(#s3-pep)"/><circle cx="66" cy="44" r="7" fill="url(#s3-pep)"/><circle cx="54" cy="68" r="6.5" fill="url(#s3-pep)"/>' +
      '<path d="M30 54q2 10 6 12M72 62q-2 8-6 10" stroke="#f5a623" stroke-width="4" stroke-linecap="round"/>' + GL('M16 30q30-14 60-6l-2 3q-30-7-56 6z') + '</svg>',
    fries: '<svg viewBox="0 0 90 120">' + SH(45, 114, 28) +
      ['14,30,8', '24,18,8', '34,8,8', '44,14,8', '54,6,8', '64,16,8', '72,26,8', '30,30,7', '50,28,7', '60,34,7'].map(function (k, i) { var a = k.split(','); return '<rect x="' + a[0] + '" y="' + a[1] + '" width="' + a[2] + '" height="54" rx="2" fill="url(#s3-fries)" transform="rotate(' + ((i % 3) * 5 - 5) + ' ' + a[0] + ' 60)"/>'; }).join('') +
      '<path d="M10 52h70l-8 58q-27 6-54 0z" fill="url(#s3-box)"/><path d="M10 52q35 18 70 0" fill="#c41438"/>' +
      '<path d="M37 74q8-8 16 0q-8 10-16 0z" fill="#ffd21f"/>' + GL('M15 58q3 24 8 48l-4-1q-4-24-6-47z') + '</svg>',
    clapper: '<svg viewBox="0 0 110 100">' + SH(55, 95, 40) +
      '<rect x="12" y="38" width="86" height="52" rx="5" fill="url(#s3-clap)"/>' +
      '<g transform="rotate(-14 12 34)"><rect x="12" y="24" width="86" height="14" rx="3" fill="#f5f5fa"/><path d="M22 24l10 14h10L32 24zM46 24l10 14h10L56 24zM70 24l10 14h10L80 24z" fill="#15133a"/></g>' +
      '<rect x="12" y="38" width="86" height="12" fill="#f5f5fa"/><path d="M22 38l10 12h10L32 38zM46 38l10 12h10L56 38zM70 38l10 12h10L80 38z" fill="#15133a"/>' +
      '<path d="M22 62h66M22 74h40" stroke="#9aa3c7" stroke-width="3" opacity=".7"/>' + GL('M16 52h80v3H16z') + '</svg>',
    gummy: '<svg viewBox="0 0 80 100">' + SH(40, 96, 22) +
      '<circle cx="22" cy="14" r="9" fill="url(#s3-gummy)"/><circle cx="58" cy="14" r="9" fill="url(#s3-gummy)"/>' +
      '<circle cx="40" cy="28" r="20" fill="url(#s3-gummy)"/><ellipse cx="40" cy="64" rx="24" ry="28" fill="url(#s3-gummy)"/>' +
      '<circle cx="16" cy="52" r="9" fill="url(#s3-gummy)"/><circle cx="64" cy="52" r="9" fill="url(#s3-gummy)"/><circle cx="24" cy="88" r="10" fill="url(#s3-gummy)"/><circle cx="56" cy="88" r="10" fill="url(#s3-gummy)"/>' +
      '<circle cx="33" cy="24" r="2.6" fill="#1f4d07"/><circle cx="47" cy="24" r="2.6" fill="#1f4d07"/><path d="M35 33q5 4 10 0" stroke="#1f4d07" stroke-width="2" fill="none" stroke-linecap="round"/>' +
      '<ellipse cx="30" cy="54" rx="6" ry="10" fill="#fff" opacity=".45"/><ellipse cx="32" cy="18" rx="5" ry="3" fill="#fff" opacity=".55"/></svg>'
  };

  var STAR = function (col) {
    var O = [[50, 4], [93.75, 35.79], [77.04, 87.21], [22.96, 87.21], [6.25, 35.79]], I = [[61.17, 34.63], [68.07, 55.87], [50, 69], [31.93, 55.87], [38.83, 34.63]];
    var pts = []; for (var k = 0; k < 5; k++) { pts.push(O[k].join(',')); pts.push(I[k].join(',')); }
    var dark = '', lite = '';
    for (k = 0; k < 5; k++) {
      dark += '<path d="M50 50L' + O[k].join(' ') + 'L' + I[k].join(' ') + 'z" fill="#000" opacity=".24"/>';
      lite += '<path d="M50 50L' + O[k].join(' ') + 'L' + I[(k + 4) % 5].join(' ') + 'z" fill="#fff" opacity=".16"/>';
    }
    return '<svg viewBox="0 0 100 100"><circle cx="50" cy="52" r="40" fill="' + col + '" opacity=".16"/><polygon points="' + pts.join(' ') + '" fill="' + col + '"/>' + dark + lite +
      '<polygon points="' + pts.join(' ') + '" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width="1.5"/><ellipse cx="42" cy="30" rx="6" ry="4" fill="#fff" opacity=".7"/></svg>';
  };
  var BALLOON = function (i) {
    var c = BAL[i % BAL.length];
    return '<svg viewBox="0 0 60 110"><ellipse cx="30" cy="34" rx="25" ry="31" fill="url(#s3-b' + (i % BAL.length) + ')"/>' +
      '<path d="M30 65l-5 8h10z" fill="' + c[2] + '"/>' +
      '<path d="M30 73q-9 12 0 22t0 14" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="1.6"/>' +
      '<ellipse cx="20" cy="20" rx="6" ry="10" fill="#fff" opacity=".55" transform="rotate(-20 20 20)"/><ellipse cx="17" cy="33" rx="2.5" ry="4" fill="#fff" opacity=".35"/>' +
      '<path d="M44 52q6-8 6-20" fill="none" stroke="' + c[0] + '" stroke-width="3" opacity=".5" stroke-linecap="round"/></svg>';
  };
  var MASCOT = function () {
    return '<span class="mz" style="--bd:' + rnd(7, 12).toFixed(1) + 's;--bdl:-' + rnd(0, 10).toFixed(1) + 's"><img src="mascot-sm.png" alt="" decoding="async"><i class="mz-e l"></i><i class="mz-e r"></i></span>';
  };

  /* ---------- rebuild the floating things ---------- */
  var fl = document.querySelector('.fl'), stars = document.querySelector('.stars');
  if (fl) {
    fl.innerHTML = '';
    var add = function (html, w, cls, extra) {
      var e = document.createElement('i');
      e.className = 'fl-i ' + cls;
      e.innerHTML = html;
      e.style.cssText = 'left:' + rnd(0, 92) + '%;top:' + rnd(0, 86) + '%;width:' + w + 'px;--x:' + rnd(-140, 140) + 'px;--y:' + rnd(-100, 100) + 'px;--r:' + rnd(-20, 20) + 'deg;--d:' + rnd(20, 36) + 's;animation-delay:' + (-rnd(0, 25)) + 's;' + (extra || '');
      fl.appendChild(e);
    };
    for (var m = 0; m < (small ? 3 : 6); m++) add(MASCOT(), rnd(small ? 70 : 90, small ? 110 : 150), 'drift');
    var names = Object.keys(SNACKS);
    if (small) names = names.slice(0, 6);
    names.forEach(function (n) { add(SNACKS[n], rnd(small ? 44 : 56, small ? 64 : 92), 'drift snack'); });
    for (var b = 0; b < (small ? 3 : 6); b++) add(BALLOON(b), rnd(small ? 40 : 46, small ? 56 : 70), 'balloon', 'top:0;left:' + rnd(2, 94) + '%;animation:rise ' + rnd(40, 70) + 's linear ' + (-rnd(0, 50)) + 's infinite');
  }
  if (stars) {
    stars.innerHTML = '';
    var cols = ['#ffd21f', '#ffd21f', '#ffd21f', '#08c6ee', '#f72867', '#ff8a00'];
    for (var s = 0; s < (small ? 10 : 18); s++) {
      var st = document.createElement('i'), z = rnd(14, 34);
      st.className = 'star3';
      st.innerHTML = STAR(cols[s % cols.length]);
      st.style.cssText = 'left:' + rnd(0, 96) + '%;top:' + rnd(0, 90) + '%;width:' + z + 'px;--x:' + rnd(-80, 80) + 'px;--y:' + rnd(-60, 60) + 'px;--r:' + rnd(-45, 45) + 'deg;--d:' + rnd(16, 34) + 's;animation-delay:' + (-rnd(0, 20)) + 's,' + (-rnd(0, 3)) + 's';
      stars.appendChild(st);
    }
  }
  var big = document.querySelector('.mascot.mz img'); if (big) big.src = 'mascot-sm.png';

  /* ---------- cinema spotlights (replaces the old film strip) ---------- */
  (function () {
    var host = (typeof root !== 'undefined' && root) ? root : document.querySelector('.sky');
    var oldFilm = (host || document).querySelector('svg.film, canvas.film');
    if (oldFilm) oldFilm.remove();
    if (!host) return;
    var bcss = '.beams{position:absolute;inset:0;overflow:hidden;pointer-events:none}' +
      '.beam{position:absolute;bottom:-12vh;width:34vw;min-width:260px;height:135vh;transform-origin:50% 100%;will-change:transform;' +
      'clip-path:polygon(46% 100%,54% 100%,100% 0,0 0);filter:blur(7px)}' +
      '.beam.b1{left:-4vw;background:linear-gradient(to top,rgba(255,226,140,.30),rgba(255,226,140,.10) 45%,rgba(255,226,140,0) 82%);animation:sfbeam1 16s ease-in-out infinite alternate}' +
      '.beam.b2{right:-4vw;background:linear-gradient(to top,rgba(140,220,255,.26),rgba(140,220,255,.08) 45%,rgba(140,220,255,0) 82%);animation:sfbeam2 19s ease-in-out infinite alternate}' +
      '.beam.b3{left:38vw;width:26vw;background:linear-gradient(to top,rgba(255,140,200,.20),rgba(255,140,200,.06) 45%,rgba(255,140,200,0) 80%);animation:sfbeam3 23s ease-in-out infinite alternate}' +
      '.beams::after{content:"";position:absolute;left:0;right:0;bottom:0;height:22vh;background:radial-gradient(60% 100% at 50% 100%,rgba(255,210,120,.16),transparent 70%)}' +
      '@keyframes sfbeam1{from{transform:rotate(-30deg)}to{transform:rotate(16deg)}}' +
      '@keyframes sfbeam2{from{transform:rotate(28deg)}to{transform:rotate(-14deg)}}' +
      '@keyframes sfbeam3{from{transform:rotate(-12deg)}to{transform:rotate(14deg)}}' +
      '@media(prefers-reduced-motion:reduce){.beam{animation:none!important}}';
    var s = document.createElement('style'); s.textContent = bcss; document.head.appendChild(s);
    var b = document.createElement('div'); b.className = 'beams'; b.setAttribute('aria-hidden', 'true');
    b.innerHTML = '<i class="beam b1"></i><i class="beam b2"></i><i class="beam b3"></i>';
    host.insertBefore(b, host.firstChild);
  })();
})();
