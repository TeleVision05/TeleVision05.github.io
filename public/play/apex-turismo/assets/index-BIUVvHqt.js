(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();function e(e,t,n){let r=document.createElement(e);return t&&(r.className=t),n!==void 0&&(r.textContent=n),r}function t(e){for(;e.firstChild;)e.removeChild(e.firstChild)}var n=class{items=[];index=-1;columns=1;onMoveSound;constructor(e){this.onMoveSound=e}setItems(e,t=1){this.items=e,this.columns=Math.max(1,t),this.index=e.length?0:-1,this.items.forEach((e,t)=>{e.el.classList.add(`focusable`),e.el.addEventListener(`mouseenter`,()=>this.setIndex(t,!1))}),this.highlight()}clear(){this.items=[],this.index=-1}highlight(){this.items.forEach((e,t)=>e.el.classList.toggle(`focused`,t===this.index)),this.items[this.index]?.el.scrollIntoView({block:`nearest`,behavior:`smooth`})}setIndex(e,t=!0){e<0||e>=this.items.length||e===this.index||(this.index=e,this.highlight(),this.items[e]?.onFocus?.(),t&&this.onMoveSound?.())}moveBy(e){if(!this.items.length)return;let t=Math.max(0,Math.min(this.items.length-1,this.index+e));this.setIndex(t)}handle(e){this.items.length&&(e.menuDown?this.moveBy(this.columns):e.menuUp?this.moveBy(-this.columns):e.menuRight?this.right():e.menuLeft?this.left():e.menuConfirm&&this.confirm())}left(){let e=this.items[this.index];e&&(this.columns>1?this.index%this.columns!==0&&this.moveBy(-1):e.onLeft&&(e.onLeft(),this.onMoveSound?.()))}right(){let e=this.items[this.index];e&&(this.columns>1?this.index%this.columns!==this.columns-1&&this.moveBy(1):e.onRight&&(e.onRight(),this.onMoveSound?.()))}confirm(){let e=this.items[this.index];e&&(e.onConfirm?e.onConfirm():e.el.click())}get current(){return this.items[this.index]?.el??null}};function r(e){return`Cr. ${Math.round(e).toLocaleString(`en-US`)}`}function i(e){return`${Math.round(e*1.341)} hp`}function a(e){return`${Math.round(e)} Nm`}function o(e){return`${Math.round(e)} kg`}function s(e){return`${(e/1e3).toLocaleString(`en-US`,{maximumFractionDigits:1})} km`}function c(e){return`${e} PP`}function l(e){return`${Math.round(e*100)}%`}function u(e,t){let n=t===`mph`?e*.621:e;return Math.round(n).toString()}function d(e){return e.length?e[0].toUpperCase()+e.slice(1):e}var f=(e,t,n)=>e<t?t:e>n?n:e,p=(e,t,n)=>e+(t-e)*n,m=(e,t,n,r)=>p(e,t,1-Math.exp(-r/Math.max(n,1e-6))),h=(e,t)=>(e%t+t)%t;function g(e,t){if(t<=e[0].x)return e[0].y;let n=e[e.length-1];if(t>=n.x)return n.y;for(let n=1;n<e.length;n++){let r=e[n];if(t<=r.x){let i=e[n-1];return p(i.y,r.y,(t-i.x)/(r.x-i.x))}}return n.y}function _(e){let t=e>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function v(e){if(e==null||!isFinite(e))return`--:--.---`;let t=e<0,n=Math.abs(e),r=Math.floor(n/6e4),i=Math.floor(n%6e4/1e3),a=Math.floor(n%1e3);return`${t?`-`:``}${r}:${i.toString().padStart(2,`0`)}.${a.toString().padStart(3,`0`)}`}function y(e){let t=e/1e3;return`${t>=0?`+`:`-`}${Math.abs(t).toFixed(3)}`}var b=220,x=14,S=class{el;staticCanvas;dynCanvas;staticCtx;dynCtx;hasOutline=!1;constructor(){this.el=e(`div`,`hud-minimap`),this.staticCanvas=document.createElement(`canvas`),this.dynCanvas=document.createElement(`canvas`);for(let e of[this.staticCanvas,this.dynCanvas])e.width=b,e.height=b,this.el.appendChild(e);this.staticCtx=this.staticCanvas.getContext(`2d`),this.dynCtx=this.dynCanvas.getContext(`2d`)}toPixel(e,t){return[x+e*192,x+t*192]}setOutline(e){this.hasOutline=!0;let t=this.staticCtx;t.clearRect(0,0,b,b),e.length&&(t.strokeStyle=`rgba(245,245,245,0.55)`,t.lineWidth=3,t.lineJoin=`round`,t.beginPath(),e.forEach(([e,n],r)=>{let[i,a]=this.toPixel(e,n);r===0?t.moveTo(i,a):t.lineTo(i,a)}),t.closePath(),t.stroke())}reset(){this.hasOutline=!1,this.staticCtx.clearRect(0,0,b,b)}get outlineReady(){return this.hasOutline}drawDots(e){let t=this.dynCtx;t.clearRect(0,0,b,b);for(let n of e){let[e,r]=this.toPixel(n.u,n.v),i=n.isPlayer?5:3.5;t.beginPath(),t.arc(e,r,i,0,Math.PI*2),t.fillStyle=n.isPlayer?`#e8b923`:n.color,t.fill(),n.isPlayer&&(t.strokeStyle=`rgba(0,0,0,0.6)`,t.lineWidth=1,t.stroke())}}},C=class{el;facade;minimap=new S;position=e(`span`,``,``);totalCars=e(`span`,`of`,``);lapEl=e(`div`,`hud-lap`,``);currentTime=e(`div`,`hud-current-time`,``);lastTime=e(`span`,``,``);bestTime=e(`span`,``,``);delta=e(`span`,`hud-delta`,``);sectors=[];gapAhead=e(`span`,``,``);gapBehind=e(`span`,``,``);speedValue=e(`span`,``,``);speedUnit=e(`span`,`unit`,``);gear=e(`div`,`hud-gear`,``);rpmFill=e(`div`,`hud-rpm-fill`);rpmRedline=e(`div`,`hud-rpm-redline`);shiftLight=e(`div`,`hud-shift-light`);absBadge=e(`span`,`hud-badge`,`ABS`);tcsBadge=e(`span`,`hud-badge`,`TCS`);offBadge=e(`span`,`hud-badge`,`OFF TRACK`);invalidBadge=e(`span`,`hud-badge`,`LAP INVALID`);centerMessage=e(`div`,`hud-center-message`);standingsBox=e(`div`,`hud-standings panel hidden`);standingsBody=e(`tbody`);prev={};currentTrackId=null;constructor(t){this.facade=t,this.rpmRedline.style.width=`12%`,this.el=e(`div`,`hud-layer`),this.el.append(this.buildTopLeft(),this.buildTopRight(),this.buildGaps(),this.buildBottomRight(),this.centerMessage,this.minimap.el,this.buildStandings())}buildTopLeft(){let t=e(`div`,`hud-top-left`),n=e(`div`,`hud-position`);return n.append(this.position,this.totalCars),t.append(n,this.lapEl,this.buildAssists()),t}buildTopRight(){let t=e(`div`,`hud-top-right`),n=e(`div`,`hud-time-row`);n.append(this.lastTime,this.bestTime,this.delta);let r=e(`div`,`hud-sectors`);for(let t=0;t<3;t++){let t=e(`div`,`hud-sector`);this.sectors.push(t),r.appendChild(t)}return t.append(this.currentTime,n,r),t}buildGaps(){let t=e(`div`,`hud-gaps`);return t.append(this.gapAhead,this.gapBehind),t}buildBottomRight(){let t=e(`div`,`hud-bottom-right`),n=e(`div`,`hud-speed`);n.append(this.speedValue,this.speedUnit);let r=e(`div`,`hud-rpm-bar`);return r.append(this.rpmRedline,this.rpmFill),t.append(n,this.gear,r,this.shiftLight),t}buildAssists(){let t=e(`div`,`hud-assists`);return t.append(this.absBadge,this.tcsBadge,this.offBadge,this.invalidBadge),t}buildStandings(){let t=e(`table`),n=e(`tr`);for(let t of[`Pos`,`Driver`,`Car`,`Gap`,`Best`])n.appendChild(e(`th`,``,t));let r=e(`thead`);return r.appendChild(n),t.append(r,this.standingsBody),this.standingsBox.appendChild(t),this.standingsBox}set(e,t,n){this.prev[e]!==n&&(this.prev[e]=n,t.textContent=n)}updatePosition(e){this.set(`pos`,this.position,`${e.position}`),this.set(`ofCars`,this.totalCars,` / ${e.totalCars}`),this.set(`lap`,this.lapEl,`LAP ${e.lap} / ${e.totalLaps}`)}updateTimes(e){this.set(`cur`,this.currentTime,v(e.currentLapMs)),this.set(`last`,this.lastTime,`LAST ${v(e.lastLapMs)}`),this.set(`best`,this.bestTime,`BEST ${v(e.bestLapMs)}`);let t=e.deltaToBestMs===null?``:y(e.deltaToBestMs);this.prev.delta!==t&&(this.prev.delta=t,this.delta.textContent=t,this.delta.classList.toggle(`negative`,e.deltaToBestMs!==null&&e.deltaToBestMs<0),this.delta.classList.toggle(`positive`,e.deltaToBestMs!==null&&e.deltaToBestMs>=0),this.delta.classList.toggle(`hidden`,e.deltaToBestMs===null)),e.sectorTimes.forEach((e,t)=>{let n=`sector${t}`,r=e===null?`pending`:`set`;this.prev[n]!==r&&(this.prev[n]=r,this.sectors[t]?.classList.toggle(`set`,e!==null))})}updateGaps(e){this.set(`gapAhead`,this.gapAhead,e.gapAheadMs===null?``:`Ahead ${y(-e.gapAheadMs)}`),this.set(`gapBehind`,this.gapBehind,e.gapBehindMs===null?``:`Behind ${y(e.gapBehindMs)}`)}updateSpeedGear(e){let t=this.facade.save.settings.units;this.set(`speed`,this.speedValue,u(e.speedKmh,t)),this.set(`unit`,this.speedUnit,t===`mph`?`mph`:`km/h`);let n=e.gear===0?`N`:e.gear===-1?`R`:`${e.gear}`;this.set(`gear`,this.gear,n)}updateRpm(e){let t=Math.max(0,Math.min(1,e.rpm/e.redlineRpm)),n=`rpm${t.toFixed(3)}`;this.prev.rpmKey!==n&&(this.prev.rpmKey=n,this.rpmFill.style.transform=`scaleX(${t})`);let r=e.rpm>e.redlineRpm*.95;this.prev.shiftFlash!==r&&(this.prev.shiftFlash=r,this.shiftLight.classList.toggle(`flash`,r))}updateAssists(e){this.prev.abs!==e.abs&&(this.prev.abs=e.abs,this.absBadge.classList.toggle(`active`,e.abs)),this.prev.tcs!==e.tcs&&(this.prev.tcs=e.tcs,this.tcsBadge.classList.toggle(`active`,e.tcs)),this.prev.off!==e.offTrack&&(this.prev.off=e.offTrack,this.offBadge.classList.toggle(`warn`,e.offTrack),this.offBadge.classList.toggle(`hidden`,!e.offTrack)),this.prev.invalid!==e.invalidLap&&(this.prev.invalid=e.invalidLap,this.invalidBadge.classList.toggle(`warn`,e.invalidLap),this.invalidBadge.classList.toggle(`hidden`,!e.invalidLap))}updateMessage(n){let r=``,i=`hud-center-message`;n.countdown===null?n.wrongWay?(r=`WRONG WAY`,i+=` flash`):n.message&&(r=n.message):(r=n.countdown>0?`${n.countdown}`:`GO!`,i+=` countdown`);let a=`${i}|${r}`;if(this.prev.msg===a)return;this.prev.msg=a,this.centerMessage.className=i;let o=i.includes(`countdown`);r&&!o?(t(this.centerMessage),this.centerMessage.appendChild(e(`div`,`hud-message-text`,r))):this.centerMessage.textContent=r}updateMinimap(e){let t=this.facade.loadedTrackName();t===this.currentTrackId?this.minimap.outlineReady||this.minimap.setOutline(this.facade.trackOutline()):(this.currentTrackId=t,this.minimap.setOutline(this.facade.trackOutline()));let n=e.carProgress.map(e=>{let[t,n]=this.facade.minimapPoint(e.s,e.lateral);return{u:t,v:n,color:e.color,isPlayer:e.isPlayer}});this.minimap.drawDots(n)}updateStandings(n){t(this.standingsBody);for(let t of n){let n=e(`tr`,t.isPlayer?`is-player`:``);n.appendChild(e(`td`,``,`${t.position}`)),n.appendChild(e(`td`,``,t.name)),n.appendChild(e(`td`,``,t.carName)),n.appendChild(e(`td`,``,t.gapMs===null?`Leader`:y(t.gapMs))),n.appendChild(e(`td`,``,v(t.bestLapMs))),this.standingsBody.appendChild(n)}}update(e){this.updatePosition(e),this.updateTimes(e),this.updateGaps(e),this.updateSpeedGear(e),this.updateRpm(e),this.updateAssists(e),this.updateMessage(e),this.updateMinimap(e),this.standingsBox.classList.contains(`hidden`)||this.updateStandings(e.standings)}setStandingsVisible(e){this.prev.standingsVisible!==e&&(this.prev.standingsVisible=e,this.standingsBox.classList.toggle(`hidden`,!e))}resetForNewRace(){this.minimap.reset(),this.currentTrackId=null,this.prev={}}},w=3200,T=class{el;constructor(){this.el=e(`div`,`toast-layer`)}show(t){let n=e(`div`,`toast`,t);this.el.appendChild(n),requestAnimationFrame(()=>n.classList.add(`shown`)),window.setTimeout(()=>{n.classList.remove(`shown`),window.setTimeout(()=>n.remove(),250)},w)}},E={back:`
    <path d="M19 12H6"/>
    <path d="M10.5 6.5L5 12l5.5 5.5"/>
  `,world:`
    <circle cx="12" cy="12" r="8.5"/>
    <ellipse cx="12" cy="12" rx="3.6" ry="8.5"/>
    <path d="M3.8 9.5h16.4M3.8 14.5h16.4"/>
    <path d="M4.5 15.5c3-3.6 5.6-5.2 7.5-5.2s4.5 1.6 7.5 5.2" stroke-width="2.1"/>
  `,flag:`
    <path d="M6 21V4"/>
    <path d="M6 4h11l-2.5 3.5L17 11H6"/>
    <path fill="currentColor" stroke="none" d="M6 4h2.5v2.5H6zM11 4h2.5v2.5H11zM8.7 6.4h2.5v2.5H8.7zM13.6 6.4h2.4v2.5h-2.4zM6 8.9h2.5v2.4H6zM11 8.9h2.5v2.4H11z"/>
  `,stopwatch:`
    <circle cx="12" cy="13.5" r="8"/>
    <path d="M12 13.5V9"/>
    <path d="M9.5 3h5"/>
    <path d="M12 3v2"/>
    <path d="M18.2 5.6l1.4-1.4"/>
  `,car:`
    <path d="M4.2 15.2l1.4-5.1A2.2 2.2 0 0 1 7.7 8.4h8.6a2.2 2.2 0 0 1 2.1 1.7l1.4 5.1"/>
    <rect x="3" y="15.2" width="18" height="4.2" rx="1.6"/>
    <circle cx="7.6" cy="19.4" r="1.4"/>
    <circle cx="16.4" cy="19.4" r="1.4"/>
    <path d="M7 12.2h2.2M14.8 12.2H17"/>
  `,tag:`
    <path d="M12.3 3.2h5.5a1 1 0 0 1 1 1v5.5a1 1 0 0 1-.3.7l-9 9a1 1 0 0 1-1.4 0l-5.5-5.5a1 1 0 0 1 0-1.4l9-9a1 1 0 0 1 .7-.3z"/>
    <circle cx="15.3" cy="8.7" r="1.5" fill="currentColor" stroke="none"/>
  `,wrench:`
    <path d="M14.9 6.2a4 4 0 0 0-5.5 5.3L4.2 16.7l3.1 3.1 5.2-5.2a4 4 0 0 0 5.3-5.5l-2.6 2.6-2.1-2.1z"/>
    <circle cx="18.3" cy="5.7" r="1.9"/>
    <path d="M18.3 2.2v1.6M18.3 7.6v1.6M14.9 5.7h1.6M20.1 5.7h1.6"/>
  `,trophy:`
    <path d="M8 4.2h8v4a4 4 0 0 1-8 0v-4z"/>
    <path d="M8 5.4H5.3a3 3 0 0 0 3.1 4.6"/>
    <path d="M16 5.4h2.7a3 3 0 0 1-3.1 4.6"/>
    <path d="M12 12.2v2.8"/>
    <path d="M9 19.8h6"/>
    <path d="M10 16.5h4l.6 3.3h-5.2z"/>
  `,sliders:`
    <path d="M3.5 6.2h10.2"/>
    <circle cx="16" cy="6.2" r="1.9"/>
    <path d="M18.3 6.2h2.2"/>
    <path d="M3.5 12h4.7"/>
    <circle cx="10.5" cy="12" r="1.9"/>
    <path d="M12.8 12h7.7"/>
    <path d="M3.5 17.8h12.7"/>
    <circle cx="18.5" cy="17.8" r="1.9"/>
  `,gamepad:`
    <rect x="2.8" y="7.8" width="18.4" height="9.2" rx="4.6"/>
    <path d="M7.3 10.4v4M5.3 12.4h4"/>
    <circle cx="16.2" cy="10.8" r="1"/>
    <circle cx="18.6" cy="13.2" r="1"/>
  `,coin:`
    <circle cx="12" cy="12" r="8.5"/>
    <path d="M12 7v10"/>
    <path d="M9.3 9.4c0-1.2 1.2-2.1 2.7-2.1s2.7.9 2.7 2c0 1.2-1.2 1.7-2.7 2.1s-2.7.9-2.7 2.1c0 1.1 1.2 2 2.7 2s2.7-.9 2.7-2.1"/>
  `,emblem:`<path fill="currentColor" stroke="none" d="M12 2.4l9 10.1h-5.7L12 21.6l-3.3-9.1H3l9-10.1z"/>`,pause:`
    <rect fill="currentColor" stroke="none" x="6" y="4" width="4" height="16" rx="1.2"/>
    <rect fill="currentColor" stroke="none" x="14" y="4" width="4" height="16" rx="1.2"/>
  `,resume:`<path fill="currentColor" stroke="none" d="M7.5 4.8l12 7.2-12 7.2V4.8z"/>`,restart:`
    <path d="M20 12a8 8 0 1 1-2.7-6"/>
    <path d="M20 4.3v5.4h-5.4"/>
  `,quit:`
    <path d="M13.5 4.2H6.3a1.1 1.1 0 0 0-1.1 1.1v13.4a1.1 1.1 0 0 0 1.1 1.1h7.2"/>
    <path d="M9.8 12h10"/>
    <path d="M16.4 8.2l3.8 3.8-3.8 3.8"/>
  `,replay:`
    <rect x="3" y="5" width="18" height="14" rx="2.2"/>
    <path fill="currentColor" stroke="none" d="M9.8 8.7l6.4 3.3-6.4 3.3V8.7z"/>
  `,continue:`
    <path d="M4.5 12h15"/>
    <path d="M13 6l6.5 6-6.5 6"/>
  `};function D(e,t=`gt-icon`){let n=document.createElementNS(`http://www.w3.org/2000/svg`,`svg`);return n.setAttribute(`viewBox`,`0 0 24 24`),n.setAttribute(`fill`,`none`),n.setAttribute(`stroke`,`currentColor`),n.setAttribute(`stroke-width`,`1.75`),n.setAttribute(`stroke-linecap`,`round`),n.setAttribute(`stroke-linejoin`,`round`),n.setAttribute(`aria-hidden`,`true`),t&&n.setAttribute(`class`,t),n.innerHTML=E[e],n}function O(t){let n=e(`div`,`screen screen-title`),r=e(`div`,`title-wrap`);r.appendChild(D(`emblem`,`title-emblem`)),r.appendChild(e(`div`,`game-title`,`APEX TURISMO`)),r.appendChild(e(`div`,`game-subtitle`,`The Real Driving Simulator`)),r.appendChild(e(`div`,`press-start`,`Press any key or click to start`)),n.appendChild(r);let i=e(`div`,`driver-credit`,``);r.appendChild(i);let a=!1,o=()=>{a&&(a=!1,window.removeEventListener(`keydown`,s),t.facade.showroom(null),t.sound(`confirm`),t.show(`home`))},s=()=>{o()};return n.addEventListener(`click`,o),{el:n,onShow:()=>{a=!0,window.addEventListener(`keydown`,s),t.facade.showroom(null)},onHide:()=>{a=!1,window.removeEventListener(`keydown`,s)},render:()=>{i.textContent=`Driver: ${t.facade.save.driverName}`},focus:()=>({items:[{el:n,onConfirm:o}]})}}function k(t,n,r){let i=e(`button`,`gt-btn ${r?.className??``}`.trim());return r?.icon&&i.appendChild(D(r.icon,`gt-btn-icon`)),i.appendChild(e(`span`,`gt-btn-label`,t)),r?.disabled&&(i.disabled=!0,i.classList.add(`disabled`)),i.addEventListener(`click`,()=>{i.disabled||n()}),{el:i,item:{el:i,onConfirm:()=>!i.disabled&&n()}}}function A(t,n,r){let i=e(`div`,`menu-screen`);i.appendChild(e(`div`,`menu-scrim`));let a=e(`div`,`menu-col${r?.wide?` wide`:``}`),o=e(`div`,`menu-header`),s;if(r?.onBack){let e=k(`Back`,r.onBack,{className:`menu-back ghost`,icon:`back`});o.appendChild(e.el),s=e.item}o.append(e(`div`,`overline`,t),e(`h1`,`menu-title`,n));let c=e(`div`,`menu-body`);return a.append(o,c),i.appendChild(a),{el:i,body:c,backItem:s}}function ee(t){let n=e(`div`,`gt-row`);n.appendChild(e(`span`,`gt-row-label`,t));let r=e(`div`,`gt-row-value`);return n.appendChild(r),{row:n,value:r}}function te(t,n,r,i,a){let{row:o,value:s}=ee(t);a?.disabled&&o.classList.add(`disabled`);let c=Math.max(0,n.findIndex(e=>e.value===r)),l=e(`button`,`gt-arrow`,`‹`),u=e(`span`,`gt-cycle-text`,n[c]?.label??``),d=e(`button`,`gt-arrow`,`›`);s.append(l,u,d),a?.hint&&o.appendChild(e(`div`,`gt-row-hint`,a.hint));let f=e=>{a?.disabled||!n.length||(c=(c+e+n.length)%n.length,u.textContent=n[c].label,i(n[c].value))};return l.addEventListener(`click`,e=>{e.stopPropagation(),f(-1)}),d.addEventListener(`click`,e=>{e.stopPropagation(),f(1)}),{el:o,item:{el:o,onLeft:()=>f(-1),onRight:()=>f(1),onConfirm:()=>f(1)}}}function j(e,t,n,r){return te(e,[{value:!1,label:r?.offLabel??`Off`},{value:!0,label:r?.onLabel??`On`}],t,n)}function ne(t,n,r,i,a,o,s,c){let{row:l,value:u}=ee(t);c?.disabled&&l.classList.add(`disabled`);let d=e(`div`,`gt-slider-track`),f=e(`input`,`gt-slider`);f.type=`range`,f.min=String(r),f.max=String(i),f.step=String(a),f.value=String(n),f.disabled=!!c?.disabled;let p=e(`span`,`gt-slider-readout`,o(n));d.appendChild(f),u.append(d,p),c?.hint&&l.appendChild(e(`div`,`gt-row-hint`,c.hint));let m=e=>{p.textContent=o(e),s(e)};f.addEventListener(`input`,()=>m(Number(f.value)));let h=e=>{if(c?.disabled)return;let t=Math.max(r,Math.min(i,Number(f.value)+e*a));f.value=String(t),m(t)};return{el:l,item:c?.disabled?{el:l}:{el:l,onLeft:()=>h(-1),onRight:()=>h(1)}}}function re(t,n,r){let i=e(`button`,`gt-swatch${n?` selected`:``}`);return i.style.background=t,i.title=t,i.addEventListener(`click`,r),{el:i,item:{el:i,onConfirm:r}}}function ie(t,n,r,i){let a=e(`button`,`home-menu-item`);a.appendChild(D(t,`home-menu-item-icon`));let o=e(`div`,`home-menu-item-text`);return o.append(e(`div`,`home-menu-item-title`,n),e(`div`,`home-menu-item-desc`,r)),a.appendChild(o),a.addEventListener(`click`,i),{el:a,item:{el:a,onConfirm:i}}}function ae(t,n){let r=e(`div`,`list-row ${t}`.trim());return n&&r.addEventListener(`click`,n),{el:r,item:{el:r,onConfirm:n??(()=>void 0)}}}function oe(t,n,r){let i=e(`button`,`chip${n?` active`:``}`,t);return i.addEventListener(`click`,r),{el:i,item:{el:i,onConfirm:r}}}var se=[`Brake in a straight line, then release smoothly as you turn in.`,`Look through the corner to where you want the car to go, not at the apex.`,`Trail braking late lets you rotate the car deeper into slow corners.`,`Smooth throttle application beats a stab of full power out of the apex.`,`A wider entry line often buys a straighter, faster exit — don't fight for the apex.`,`Weight transfer takes time: give the car a moment to settle before you commit.`];function ce(){let t=e(`div`,`top-bar`),n=e(`div`,`wordmark`);n.appendChild(D(`emblem`,`wordmark-emblem`)),n.appendChild(e(`span`,`wordmark-text`,`APEX TURISMO`));let r=e(`div`,`credits tnum`,``),i=e(`div`,`credits-block`);i.appendChild(r);let a=e(`div`,`car-name`,``),o=e(`div`,`car-pp tnum`,``),s=e(`div`,`car-block`);s.append(a,o);let c=e(`div`,`driver-name`,``),l=e(`div`,`driver-block`);l.appendChild(c);let u=e(`div`,`top-bar-left`);return u.append(n,i),t.append(u,s,l),{el:t,credits:r,carName:a,carPp:o,driverName:c}}function le(){let t=e(`div`,`home-ticker`);t.appendChild(e(`div`,`overline home-ticker-label`,`Driving tip`));let n=e(`span`,`home-ticker-text`,``);return t.appendChild(n),{el:t,text:n}}function ue(e){return[{icon:`world`,title:`World Circuits`,desc:`Race through the event series`,go:()=>e.show(`events`)},{icon:`flag`,title:`Custom Race`,desc:`Set up a one-off race on any track`,go:()=>e.show(`custom`)},{icon:`stopwatch`,title:`Time Trial`,desc:`Chase your best lap, no traffic`,go:()=>e.show(`timetrial`)},{icon:`car`,title:`Garage`,desc:`Manage your owned cars`,go:()=>e.show(`garage`)},{icon:`tag`,title:`Brand Central`,desc:`Buy cars from every maker`,go:()=>e.show(`dealership`)},{icon:`wrench`,title:`Tuning Shop`,desc:`Upgrade and set up your car`,go:()=>e.show(`tuning`)},{icon:`trophy`,title:`Records`,desc:`Your best laps, track by track`,go:()=>e.show(`records`)},{icon:`sliders`,title:`Settings`,desc:`Graphics, audio, assists and more`,go:()=>e.show(`settings`)},{icon:`gamepad`,title:`Controls`,desc:`Devices, mapping and keyboard reference`,go:()=>e.show(`controls`)}]}function de(e,t){let{save:n}=t.facade;e.credits.textContent=r(n.credits),e.driverName.textContent=n.driverName;let i=n.garage[n.selectedCar];if(i){let n=t.facade.ownedCarSpec(i);e.carName.textContent=n.name,e.carPp.textContent=c(t.facade.performancePoints(n,i.tuning))}else e.carName.textContent=`No car selected`,e.carPp.textContent=``}function fe(e,t){let n=t.facade.events(),r=n.length||1,i=n.filter(e=>t.facade.save.completedEvents[e.id]).length;e.style.width=`${Math.min(100,Math.round(i/r*100))}%`}function pe(e){let{save:t}=e.facade,n=t.garage[t.selectedCar];n?e.facade.showroom(n.specId,n.tuning.color):e.facade.showroom(null)}function me(n){let r=e(`div`,`screen screen-home`),i=e(`div`,`home-bg-veil`),a=e(`div`,`home-progress-track`),o=e(`div`,`home-progress-fill`);a.appendChild(o);let s=ce(),c=e(`div`,`home-menu`),l=le();r.append(i,a,s.el,c,l.el);let u=[],d=null,f=0,p=()=>{l.text.textContent=se[f%se.length],f++,l.text.classList.remove(`home-ticker-text`),l.text.offsetWidth,l.text.classList.add(`home-ticker-text`)};return{el:r,onShow:()=>{pe(n),p(),d!==null&&window.clearInterval(d),d=window.setInterval(p,6e3)},onHide:()=>{d!==null&&window.clearInterval(d),d=null},render:()=>{t(c),de(s,n),fe(o,n),u=[];for(let e of ue(n)){let t=ie(e.icon,e.title,e.desc,e.go);c.appendChild(t.el),u.push(t.item)}},focus:()=>({items:u})}}var he=[1,1.08,1.17,1.28],ge=[1,.97,.94,.9];function _e(e,t){let n=1+f(t.suspension,-1,1)*.3,r=e.massKg*ge[t.weightStage],i=e.downforceFront+e.downforceRear>.2;return{...e,massKg:r,springFront:e.springFront*n,springRear:e.springRear*n,damperFront:e.damperFront*Math.sqrt(n),damperRear:e.damperRear*Math.sqrt(n),antiRollFront:e.antiRollFront*n,antiRollRear:e.antiRollRear*n,brakeBias:f(t.brakeBias||e.brakeBias,.5,.72),tyres:t.tyres,powerMul:he[t.powerStage],downforceMul:i?1+f(t.downforce,-1,1)*.35:1}}function ve(e,t=1){let n=0;for(let r of e.torqueCurve)n=Math.max(n,r.nm*t*r.rpm/9549);return n}function ye(e,t){let n=_e(e,t),r=ve(e,n.powerMul)/n.massKg,i={comfort:.88,sport:1,racing:1.16}[t.tyres],a=n.tyreGrip*i,o=(n.downforceFront+n.downforceRear)*n.downforceMul,s=100+r*850+a*170+o*14;return Math.round(s)}function be(e){return{powerStage:0,weightStage:0,tyres:e.tyres,suspension:0,downforce:0,finalDriveMul:1,brakeBias:e.brakeBias,color:e.defaultColor}}function xe(t,n){let r=e(`div`,`stat-item`);return r.appendChild(e(`div`,`stat-label`,t)),r.appendChild(e(`div`,`stat-value`,n)),r}var Se=class{ctx;el;shell;list=e(`div`,`menu-scroll`);detail=e(`div`,`garage-detail`);detailScroll=e(`div`,`detail-scroll`);detailActions=e(`div`,`detail-actions`);highlightIndex=0;sellConfirm=!1;notice=null;focusItems=[];constructor(t){this.ctx=t,this.el=e(`div`,`screen screen-garage`),this.shell=A(`Owned cars`,`Garage`,{onBack:()=>{this.ctx.sound(`back`),this.ctx.back()}}),this.shell.body.classList.add(`split`),this.detail.append(this.detailScroll,this.detailActions),this.shell.body.append(this.list,this.detail),this.el.appendChild(this.shell.el)}onShow(){this.highlightIndex=this.ctx.facade.save.selectedCar,this.sellConfirm=!1,this.notice=null}render(){this.rebuild()}focus(){return{items:this.focusItems}}selectCar(e){this.ctx.facade.selectCar(e),this.ctx.sound(`confirm`),this.ctx.refresh()}setColor(e,t){this.ctx.facade.setTuning(e,{color:t}),this.ctx.sound(`confirm`),this.ctx.refresh()}sellNow(e){let t=this.ctx.facade.sellCar(e);if(t){this.notice=t,this.sellConfirm=!1,this.ctx.sound(`error`),this.rebuild();return}this.sellConfirm=!1,this.notice=null;let n=this.ctx.facade.save.garage.length-1;this.highlightIndex=Math.max(0,Math.min(this.highlightIndex,n)),this.ctx.sound(`confirm`),this.ctx.toast(`Car sold`),this.ctx.refresh()}buildDetail(n,r){t(this.detailScroll),t(this.detailActions);let l=this.ctx.facade.ownedCarSpec(n),u=this.ctx.facade.performancePoints(l,n.tuning),f=this.ctx.facade.peakPowerKw(l,n.tuning),p=Math.max(...l.torqueCurve.map(e=>e.nm))*he[n.tuning.powerStage],m=l.massKg*ge[n.tuning.weightStage],h=e(`div`,`detail-heading`);h.append(e(`div`,`detail-name`,l.name),e(`div`,`pill pp`,c(u))),this.detailScroll.appendChild(h),this.detailScroll.appendChild(e(`div`,`card-sub`,`${l.maker} · ${l.carClass} · ${s(n.odometerM)}`)),this.ctx.facade.save.selectedCar===r&&this.detailScroll.appendChild(e(`div`,`notice info`,`Currently selected`)),this.detailScroll.appendChild(e(`div`,`section-label`,`Colour`));let g=e(`div`,`swatch-row`);for(let e of l.colors){let t=re(e,e===n.tuning.color,()=>this.setColor(r,e));g.appendChild(t.el),this.focusItems.push(t.item)}this.detailScroll.appendChild(g);let _=e(`div`,`stat-grid`);if(_.append(xe(`Power`,i(f)),xe(`Torque`,a(p)),xe(`Weight`,o(m)),xe(`Drivetrain`,l.drivetrain),xe(`Tyres`,d(n.tuning.tyres)),xe(`PP`,c(u))),this.detailScroll.appendChild(_),this.notice&&this.detailScroll.appendChild(e(`div`,`notice error`,this.notice)),this.sellConfirm){this.detailActions.appendChild(e(`div`,`detail-price afford`,`Sell ${l.name}?`));let t=k(`Confirm`,()=>this.sellNow(r),{className:`danger`}),n=k(`Cancel`,()=>{this.sellConfirm=!1,this.rebuild()});this.detailActions.append(t.el,n.el),this.focusItems.push(t.item,n.item);return}if(this.ctx.facade.save.selectedCar!==r){let e=k(`Select car`,()=>this.selectCar(r),{className:`primary`});this.detailActions.appendChild(e.el),this.focusItems.push(e.item)}let v=k(`Sell car`,()=>{this.sellConfirm=!0,this.notice=null,this.rebuild()},{className:`danger`,disabled:this.ctx.facade.save.garage.length<=1});this.detailActions.appendChild(v.el),this.focusItems.push(v.item)}buildCard(t,n){let r=this.ctx.facade.ownedCarSpec(t),a=ae(n===this.ctx.facade.save.selectedCar?`selected`:``,()=>this.selectCar(n));a.item.onFocus=()=>{this.highlightIndex!==n&&(this.highlightIndex=n,this.sellConfirm=!1,this.notice=null,this.rebuild())};let l=e(`div`,`card-title-row`);l.appendChild(e(`div`,`card-title`,r.name)),l.appendChild(e(`div`,`pill pp`,c(this.ctx.facade.performancePoints(r,t.tuning)))),a.el.appendChild(l),a.el.appendChild(e(`div`,`card-sub`,`${r.maker} · ${r.carClass}`));let u=e(`div`,`card-meta`);u.appendChild(e(`span`,``,i(this.ctx.facade.peakPowerKw(r,t.tuning)))),u.appendChild(e(`span`,``,o(r.massKg*ge[t.tuning.weightStage]))),u.appendChild(e(`span`,``,s(t.odometerM))),a.el.appendChild(u),this.list.appendChild(a.el),this.focusItems.push(a.item)}rebuild(){this.focusItems=[],this.shell.backItem&&this.focusItems.push(this.shell.backItem),t(this.list);let{garage:e}=this.ctx.facade.save;e.forEach((e,t)=>this.buildCard(e,t));let n=e[this.highlightIndex]??e[0];if(n){let e=this.ctx.facade.ownedCarSpec(n);this.ctx.facade.showroom(e.id,n.tuning.color),this.buildDetail(n,this.highlightIndex)}}};function Ce(e){return new Se(e)}var we=[`All`,`N100`,`N200`,`N300`,`N500`,`Gr.4`,`Gr.3`,`Gr.1`];function Te(e){return{powerStage:0,weightStage:0,tyres:e.tyres,suspension:0,downforce:0,finalDriveMul:1,brakeBias:e.brakeBias,color:e.defaultColor}}function M(t,n){let r=e(`div`,`stat-item`);return r.appendChild(e(`div`,`stat-label`,t)),r.appendChild(e(`div`,`stat-value`,n)),r}var Ee=class{ctx;el;shell;chipRow=e(`div`,`chip-row`);list=e(`div`,`menu-scroll`);detail=e(`div`,`dealer-detail`);detailScroll=e(`div`,`detail-scroll`);detailActions=e(`div`,`detail-actions`);cars=[];classFilter=`All`;highlightId=``;chosenColor=``;notice=null;focusItems=[];constructor(t){this.ctx=t,this.el=e(`div`,`screen screen-dealership`),this.shell=A(`Cars`,`Brand Central`,{onBack:()=>{this.ctx.sound(`back`),this.ctx.back()}}),this.shell.body.classList.add(`split`),this.detail.append(this.detailScroll,this.detailActions),this.shell.body.append(this.chipRow,this.list,this.detail),this.el.appendChild(this.shell.el)}onShow(){this.notice=null}render(){this.rebuild()}focus(){return{items:this.focusItems}}isOwned(e){return this.ctx.facade.save.garage.some(t=>t.specId===e)}buyNow(e){let t=this.ctx.facade.buyCar(e.id,this.chosenColor||e.defaultColor);if(t){this.notice={kind:`error`,text:t},this.ctx.sound(`error`),this.rebuild();return}this.notice=null,this.ctx.sound(`buy`),this.ctx.toast(`${e.name} purchased`),this.ctx.refresh()}buildDetail(n){t(this.detailScroll),t(this.detailActions);let a=e(`div`,`detail-heading`);a.append(e(`div`,`detail-name`,n.name),e(`div`,`pill class`,n.carClass)),this.detailScroll.appendChild(a),this.detailScroll.appendChild(e(`div`,`card-sub`,n.description));let o=e(`div`,`stat-grid`);o.append(M(`PP`,c(this.ctx.facade.performancePoints(n,Te(n)))),M(`Power`,i(this.ctx.facade.peakPowerKw(n,Te(n)))),M(`Drivetrain`,n.drivetrain),M(`Weight`,`${Math.round(n.massKg)} kg`)),this.detailScroll.appendChild(o),this.detailScroll.appendChild(e(`div`,`section-label`,`Colour`));let s=e(`div`,`swatch-row`);for(let e of n.colors){let t=re(e,e===this.chosenColor,()=>{this.chosenColor=e,this.ctx.facade.showroom(n.id,this.chosenColor),this.rebuild()});s.appendChild(t.el),this.focusItems.push(t.item)}this.detailScroll.appendChild(s),this.notice&&this.detailScroll.appendChild(e(`div`,`notice ${this.notice.kind}`,this.notice.text)),this.isOwned(n.id)&&this.detailScroll.appendChild(e(`div`,`notice info`,`Already in your garage`));let l=e(`div`,`detail-price ${this.ctx.facade.save.credits>=n.priceCr?`afford`:`short`}`,r(n.priceCr)),u=k(this.isOwned(n.id)?`Buy another`:`Buy car`,()=>this.buyNow(n),{className:`primary`});this.detailActions.append(l,u.el),this.focusItems.push(u.item)}buildCard(t){let n=ae(t.id===this.highlightId?`selected`:``,()=>{this.highlightId=t.id,this.chosenColor=t.defaultColor,this.notice=null,this.rebuild()});n.item.onFocus=()=>{this.highlightId!==t.id&&(this.highlightId=t.id,this.chosenColor=t.defaultColor,this.notice=null,this.rebuild())};let i=e(`div`,`card-title-row`);if(i.appendChild(e(`div`,`card-title`,t.name)),i.appendChild(e(`div`,`pill pp`,c(this.ctx.facade.performancePoints(t,Te(t))))),n.el.appendChild(i),n.el.appendChild(e(`div`,`card-sub`,`${t.carClass} · ${r(t.priceCr)}`)),this.isOwned(t.id)){let t=e(`div`,`card-meta`);t.appendChild(e(`span`,`pill owned`,`Owned`)),n.el.appendChild(t)}this.list.appendChild(n.el),this.focusItems.push(n.item)}filteredCars(){return this.classFilter===`All`?this.cars:this.cars.filter(e=>e.carClass===this.classFilter)}groupedByMaker(e){let t=new Map;for(let n of e){let e=t.get(n.maker)??[];e.push(n),t.set(n.maker,e)}return t}buildChips(){t(this.chipRow);for(let e of we){let t=oe(e,e===this.classFilter,()=>{this.classFilter=e,this.rebuild()});this.chipRow.appendChild(t.el),this.focusItems.push(t.item)}}rebuild(){this.focusItems=[],this.shell.backItem&&this.focusItems.push(this.shell.backItem),t(this.list),this.cars=this.ctx.facade.cars(),this.buildChips();let n=this.filteredCars();n.find(e=>e.id===this.highlightId)||(this.highlightId=n[0]?.id??``);for(let[t,r]of this.groupedByMaker(n)){this.list.appendChild(e(`div`,`section-label`,t));for(let e of r)this.buildCard(e)}let r=n.find(e=>e.id===this.highlightId);r?(this.chosenColor||=r.defaultColor,this.ctx.facade.showroom(r.id,this.chosenColor),this.buildDetail(r)):(t(this.detailScroll),t(this.detailActions),this.ctx.facade.showroom(null),this.detailScroll.appendChild(e(`div`,`notice info`,`No cars in this class`)))}};function De(e){return new Ee(e)}var Oe=[`comfort`,`sport`,`racing`];function N(e,t){return e===`power`?t.tuning.powerStage:e===`weight`?t.tuning.weightStage:Oe.indexOf(t.tuning.tyres)}var ke=class{ctx;el;shell;carName=e(`div`,`card-title`,``);ppReadout=e(`div`,`card-sub`,``);body=e(`div`,`menu-scroll`);focusItems=[];notice=null;constructor(t){this.ctx=t,this.el=e(`div`,`screen screen-tuning`),this.shell=A(`Upgrade & setup`,`Tuning Shop`,{onBack:()=>{this.ctx.sound(`back`),this.ctx.back()}}),this.shell.body.append(this.carName,this.ppReadout,this.body),this.el.appendChild(this.shell.el)}onShow(){this.notice=null}render(){this.rebuild()}focus(){return{items:this.focusItems}}buyUpgrade(e,t,n){let r=this.ctx.facade.buyUpgrade(e,t,n);if(r){this.notice=r,this.ctx.sound(`error`),this.rebuild();return}this.notice=null,this.ctx.sound(`buy`),this.ctx.refresh()}buildUpgradeSection(t,n,i){this.body.appendChild(e(`div`,`section-label`,i.label));let a=N(i.kind,n);i.stages.forEach((n,o)=>{let s=e(`div`,`gt-row`);if(s.appendChild(e(`span`,`gt-row-label`,n.label)),o===a)s.appendChild(e(`div`,`pill owned`,`Installed`));else{let e=k(r(n.priceCr),()=>this.buyUpgrade(t,i.kind,o));s.appendChild(e.el),this.focusItems.push(e.item)}this.body.appendChild(s)})}buildDownforceSlider(e,t,n,r){let i=ne(`Downforce`,t.tuning.downforce,-1,1,.1,e=>e<-.05?`Low`:e>.05?`High`:`Medium`,r=>{this.ctx.facade.setTuning(e,{downforce:r}),t.tuning.downforce=r,this.ppReadout.textContent=c(this.ctx.facade.performancePoints(n,t.tuning))},{disabled:!r,hint:r?void 0:`This car has no aero — downforce has no effect`});this.body.appendChild(i.el),r&&this.focusItems.push(i.item)}buildSetupSliders(t,n){let r=this.ctx.facade.ownedCarSpec(n),i=r.downforceFront+r.downforceRear>=.2;this.body.appendChild(e(`div`,`section-label`,`Setup`));let a=ne(`Suspension`,n.tuning.suspension,-1,1,.1,e=>e<-.05?`Soft`:e>.05?`Stiff`:`Neutral`,e=>this.ctx.facade.setTuning(t,{suspension:e}));this.body.appendChild(a.el),this.focusItems.push(a.item),this.buildDownforceSlider(t,n,r,i);let o=ne(`Final drive`,n.tuning.finalDriveMul,.85,1.15,.01,e=>e.toFixed(2),e=>this.ctx.facade.setTuning(t,{finalDriveMul:e}));this.body.appendChild(o.el),this.focusItems.push(o.item);let s=ne(`Brake bias`,n.tuning.brakeBias,.5,.72,.01,e=>`${Math.round(e*100)}% F`,e=>this.ctx.facade.setTuning(t,{brakeBias:e}));this.body.appendChild(s.el),this.focusItems.push(s.item)}rebuild(){this.focusItems=[],this.shell.backItem&&this.focusItems.push(this.shell.backItem),t(this.body);let n=this.ctx.facade.save.selectedCar,r=this.ctx.facade.save.garage[n];if(!r){this.carName.textContent=`No car selected`,this.ppReadout.textContent=``,this.ctx.facade.showroom(null);return}let i=this.ctx.facade.ownedCarSpec(r);this.carName.textContent=i.name,this.ppReadout.textContent=c(this.ctx.facade.performancePoints(i,r.tuning)),this.ctx.facade.showroom(i.id,r.tuning.color),this.notice&&this.body.appendChild(e(`div`,`notice error`,this.notice));for(let e of this.ctx.facade.upgrades())this.buildUpgradeSection(n,r,e);this.buildSetupSliders(n,r)}};function P(e){return new ke(e)}var F=[{id:`sunday_tsukuba`,series:`Sunday Cup`,name:`Sunday Cup: Tsukuba`,description:`The classic starting point. Three laps of the tight Tsukuba Circuit in road cars.`,trackId:`tsukuba`,laps:3,opponents:7,allowedClasses:[`N100`,`N200`,`N300`],ppLimit:450,opponentClass:`N100`,payoutCr:[5e3,3e3,2e3],difficulty:`easy`,timeOfDay:`noon`},{id:`sunday_brands`,series:`Sunday Cup`,name:`Sunday Cup: Brands Hatch`,description:`Paddock Hill Bend rewards bravery. Keep it clean over three laps.`,trackId:`brands_hatch`,laps:3,opponents:7,allowedClasses:[`N100`,`N200`,`N300`],ppLimit:450,opponentClass:`N100`,payoutCr:[6e3,3500,2200],difficulty:`easy`,timeOfDay:`evening`,requires:`sunday_tsukuba`},{id:`clubman_laguna`,series:`Clubman Cup`,name:`Clubman Cup: Laguna Seca`,description:`Drop into the Corkscrew blind. Sports cars, four laps.`,trackId:`laguna_seca`,laps:4,opponents:9,allowedClasses:[`N200`,`N300`,`N500`],ppLimit:560,opponentClass:`N300`,payoutCr:[12e3,7e3,4500],difficulty:`normal`,timeOfDay:`noon`,requires:`sunday_brands`},{id:`clubman_suzuka`,series:`Clubman Cup`,name:`Clubman Cup: Suzuka`,description:`The S Curves, Spoon and 130R. Four laps of the greatest driver's circuit in the world.`,trackId:`suzuka`,laps:4,opponents:9,allowedClasses:[`N200`,`N300`,`N500`],ppLimit:560,opponentClass:`N300`,payoutCr:[15e3,8500,5500],difficulty:`normal`,timeOfDay:`morning`,requires:`clubman_laguna`},{id:`supercar_monza`,series:`Supercar Festival`,name:`Supercar Festival: Monza`,description:`The Temple of Speed. Flat out down the straights, brave on the brakes into the chicanes.`,trackId:`monza`,laps:4,opponents:11,allowedClasses:[`N500`],ppLimit:760,opponentClass:`N500`,payoutCr:[35e3,2e4,12e3],difficulty:`normal`,timeOfDay:`noon`,requires:`clubman_suzuka`},{id:`supercar_spa`,series:`Supercar Festival`,name:`Supercar Festival: Spa-Francorchamps`,description:`Eau Rouge, Raidillon and the long climb to Les Combes. Five laps through the Ardennes.`,trackId:`spa`,laps:5,opponents:11,allowedClasses:[`N500`],ppLimit:760,opponentClass:`N500`,payoutCr:[45e3,26e3,15e3],difficulty:`hard`,timeOfDay:`evening`,requires:`supercar_monza`},{id:`gt3_silverstone`,series:`GT World Series`,name:`GT World Series: Silverstone`,description:`Gr.3 racing cars only. Six laps through Maggotts, Becketts and Chapel.`,trackId:`silverstone`,laps:6,opponents:13,allowedClasses:[`Gr.3`,`Gr.4`],ppLimit:720,opponentClass:`Gr.3`,payoutCr:[8e4,48e3,3e4],difficulty:`hard`,timeOfDay:`morning`,requires:`supercar_spa`},{id:`gt3_interlagos`,series:`GT World Series`,name:`GT World Series: Interlagos`,description:`Anticlockwise, uphill and downhill, through the Senna S. The hardest six laps you will drive.`,trackId:`interlagos`,laps:6,opponents:13,allowedClasses:[`Gr.3`,`Gr.4`],ppLimit:720,opponentClass:`Gr.3`,payoutCr:[1e5,6e4,38e3],difficulty:`expert`,timeOfDay:`evening`,requires:`gt3_silverstone`},{id:`lmp_spa`,series:`Endurance Prototype Cup`,name:`Prototype Cup: Spa-Francorchamps`,description:`Le Mans prototypes at full noise. Eight laps into the night.`,trackId:`spa`,laps:8,opponents:11,allowedClasses:[`Gr.1`],ppLimit:null,opponentClass:`Gr.1`,payoutCr:[25e4,15e4,9e4],difficulty:`expert`,timeOfDay:`night`,requires:`gt3_interlagos`}],Ae=e=>F.find(t=>t.id===e),je=class{ctx;el;shell;notice=e(`div`,`notice error hidden`);list=e(`div`,`menu-scroll`);focusItems=[];constructor(t){this.ctx=t,this.el=e(`div`,`screen screen-events`),this.shell=A(`Career`,`World Circuits`,{wide:!0,onBack:()=>{this.ctx.sound(`back`),this.ctx.back()}}),this.shell.body.append(this.notice,this.list),this.el.appendChild(this.shell.el)}onShow(){this.ctx.facade.showroom(null)}render(){this.rebuild()}focus(){return{items:this.focusItems}}enter(e){let t=this.ctx.facade.startEvent(e.id);if(t){this.notice.textContent=t,this.notice.classList.remove(`hidden`),this.ctx.sound(`error`);return}this.notice.classList.add(`hidden`),this.ctx.sound(`confirm`)}trackName(e){return this.ctx.facade.tracks().find(t=>t.id===e)?.name??e}buildMeta(t){let n=e(`div`,`card-meta`),i=`Payout ${r(t.payoutCr[0])} / ${r(t.payoutCr[1])} / ${r(t.payoutCr[2])}`;return n.append(e(`span`,``,`${this.trackName(t.trackId)} · ${t.laps} laps`),e(`span`,``,`${t.opponents} opponents`),e(`span`,``,t.ppLimit?`PP limit ${t.ppLimit}`:`No PP limit`),e(`span`,``,t.allowedClasses.join(`, `)),e(`span`,``,i)),n}buildCard(t){let n=this.ctx.facade.eventUnlocked(t.id),r=ae(n?``:`locked`,n?()=>this.enter(t):void 0);n||r.el.classList.add(`disabled`);let i=e(`div`,`card-title-row`);i.append(e(`div`,`card-title`,t.name),e(`div`,`pill ${n?`class`:`locked`}`,n?t.difficulty:`Locked`)),r.el.append(i,e(`div`,`card-sub`,t.description),this.buildMeta(t));let a=this.ctx.facade.save.completedEvents[t.id];if(a&&r.el.appendChild(e(`div`,`card-sub`,`Best result: P${a.bestPosition} (${a.count} entries)`)),!n&&t.requires){let n=Ae(t.requires);r.el.appendChild(e(`div`,`notice info`,`Complete ${n?.name??`the previous event`} first`))}this.list.appendChild(r.el),n&&this.focusItems.push(r.item)}rebuild(){this.focusItems=[],this.shell.backItem&&this.focusItems.push(this.shell.backItem),t(this.list),this.notice.classList.add(`hidden`);let n=new Map;for(let e of this.ctx.facade.events()){let t=n.get(e.series)??[];t.push(e),n.set(e.series,t)}for(let[t,r]of n){this.list.appendChild(e(`div`,`section-label`,t));for(let e of r)this.buildCard(e)}}};function Me(e){return new je(e)}function Ne(e){return e.map(e=>({value:e,label:d(e)}))}var Pe=Ne([`easy`,`normal`,`hard`,`expert`]),Fe=Ne([`morning`,`noon`,`evening`,`night`]),Ie=Ne([`clear`,`overcast`,`rain`]),Le=Ne([`auto`,`manual`]),Re=class{ctx;el;shell;body=e(`div`,`menu-scroll form-rows`);focusItems=[];state;constructor(t){this.ctx=t,this.el=e(`div`,`screen screen-custom`),this.shell=A(`One-off race`,`Custom Race`,{onBack:()=>{this.ctx.sound(`back`),this.ctx.back()}}),this.shell.body.appendChild(this.body),this.el.appendChild(this.shell.el),this.state={trackId:``,laps:3,opponents:7,difficulty:`normal`,timeOfDay:`noon`,weather:`clear`,rollingStart:!1,transmission:t.facade.save.settings.transmission}}onShow(){this.ctx.facade.showroom(null)}render(){this.rebuild()}focus(){return{items:this.focusItems}}start(){let e={mode:`race`,trackId:this.state.trackId,laps:this.state.laps,opponents:this.state.opponents,difficulty:this.state.difficulty,timeOfDay:this.state.timeOfDay,weather:this.state.weather,playerCarId:String(this.ctx.facade.save.selectedCar),rollingStart:this.state.rollingStart,transmission:this.state.transmission};this.ctx.sound(`confirm`),this.ctx.facade.startRace(e)}buildTrackInfo(){let t=this.ctx.facade.tracks(),n=t.find(e=>e.id===this.state.trackId),r=te(`Track`,t.map(e=>({value:e.id,label:e.name})),this.state.trackId,e=>{this.state.trackId=e,this.rebuild()});if(this.body.appendChild(r.el),this.focusItems.push(r.item),!n)return;this.body.appendChild(e(`div`,`gt-row-hint`,`${n.country} · ${(n.lengthM/1e3).toFixed(2)} km · ${n.corners} corners`));let i=this.ctx.facade.save.garage[this.ctx.facade.save.selectedCar]?.specId,a=this.ctx.facade.bestLap(n.id,i);this.body.appendChild(e(`div`,`gt-row-hint`,`Best lap here: ${v(a)}`))}buildOptionRows(){let e=this.state,t=ne(`Laps`,e.laps,1,20,1,e=>`${e}`,t=>e.laps=t),n=ne(`Opponents`,e.opponents,0,15,1,e=>`${e}`,t=>e.opponents=t),r=te(`Difficulty`,Pe,e.difficulty,t=>e.difficulty=t),i=te(`Time of day`,Fe,e.timeOfDay,t=>e.timeOfDay=t),a=te(`Weather`,Ie,e.weather,t=>e.weather=t),o=j(`Rolling start`,e.rollingStart,t=>e.rollingStart=t),s=te(`Transmission`,Le,e.transmission,t=>e.transmission=t);for(let e of[t,n,r,i,a,o,s])this.body.appendChild(e.el),this.focusItems.push(e.item)}rebuild(){this.focusItems=[],this.shell.backItem&&this.focusItems.push(this.shell.backItem),t(this.body);let n=this.ctx.facade.tracks();n.find(e=>e.id===this.state.trackId)||(this.state.trackId=n[0]?.id??``),this.buildTrackInfo(),this.buildOptionRows();let r=k(`Start race`,()=>this.start(),{className:`primary`}),i=e(`div`,`form-actions`);i.appendChild(r.el),this.body.appendChild(i),this.focusItems.push(r.item)}};function ze(e){return new Re(e)}var Be=class{ctx;el;shell;body=e(`div`,`menu-scroll form-rows`);focusItems=[];state;constructor(t){this.ctx=t,this.el=e(`div`,`screen screen-timetrial`),this.shell=A(`No traffic`,`Time Trial`,{onBack:()=>{this.ctx.sound(`back`),this.ctx.back()}}),this.shell.body.appendChild(this.body),this.el.appendChild(this.shell.el),this.state={trackId:``,timeOfDay:`noon`,transmission:t.facade.save.settings.transmission}}onShow(){this.ctx.facade.showroom(null)}render(){this.rebuild()}focus(){return{items:this.focusItems}}start(){let e={mode:`timetrial`,trackId:this.state.trackId,laps:99,opponents:0,difficulty:`normal`,timeOfDay:this.state.timeOfDay,weather:`clear`,playerCarId:String(this.ctx.facade.save.selectedCar),rollingStart:!1,transmission:this.state.transmission};this.ctx.sound(`confirm`),this.ctx.facade.startRace(e)}buildTrackInfo(){let t=this.ctx.facade.tracks(),n=t.find(e=>e.id===this.state.trackId),r=te(`Track`,t.map(e=>({value:e.id,label:e.name})),this.state.trackId,e=>{this.state.trackId=e,this.rebuild()});if(this.body.appendChild(r.el),this.focusItems.push(r.item),!n)return;this.body.appendChild(e(`div`,`gt-row-hint`,`${n.country} · ${(n.lengthM/1e3).toFixed(2)} km · ${n.corners} corners`));let i=this.ctx.facade.save.garage[this.ctx.facade.save.selectedCar]?.specId,a=this.ctx.facade.bestLap(n.id,i);this.body.appendChild(e(`div`,`gt-row-hint`,`Best lap here: ${v(a)}`))}rebuild(){this.focusItems=[],this.shell.backItem&&this.focusItems.push(this.shell.backItem),t(this.body);let n=this.ctx.facade.tracks();n.find(e=>e.id===this.state.trackId)||(this.state.trackId=n[0]?.id??``),this.buildTrackInfo();let r=te(`Time of day`,Fe,this.state.timeOfDay,e=>this.state.timeOfDay=e);this.body.appendChild(r.el),this.focusItems.push(r.item);let i=te(`Transmission`,Le,this.state.transmission,e=>this.state.transmission=e);this.body.appendChild(i.el),this.focusItems.push(i.item);let a=k(`Start time trial`,()=>this.start(),{className:`primary`}),o=e(`div`,`form-actions`);o.appendChild(a.el),this.body.appendChild(o),this.focusItems.push(a.item)}};function Ve(e){return new Be(e)}var He=[`low`,`medium`,`high`,`ultra`].map(e=>({value:e,label:d(e)})),Ue=[{value:`kmh`,label:`km/h`},{value:`mph`,label:`mph`}],We=[{value:0,label:`Off`},{value:1,label:`Weak`},{value:2,label:`Strong`}],Ge=[{value:`chase`,label:`Chase`},{value:`chaseFar`,label:`Chase (far)`},{value:`hood`,label:`Hood`},{value:`cockpit`,label:`Cockpit`},{value:`bumper`,label:`Bumper`}],Ke=[{value:`auto`,label:`Automatic`},{value:`manual`,label:`Manual`}],qe=class{ctx;el;shell;body=e(`div`,`menu-scroll form-rows`);focusItems=[];resetConfirm=!1;constructor(t){this.ctx=t,this.el=e(`div`,`screen screen-settings`),this.shell=A(`Options`,`Settings`,{onBack:()=>{this.ctx.sound(`back`),this.ctx.back()}}),this.shell.body.appendChild(this.body),this.el.appendChild(this.shell.el)}onShow(){this.resetConfirm=!1,this.ctx.facade.showroom(null)}render(){this.rebuild()}focus(){return{items:this.focusItems}}push(e){this.body.appendChild(e.el),this.focusItems.push(e.item)}patchGraphics(e){this.ctx.facade.updateSettings({graphics:{...this.ctx.facade.save.settings.graphics,...e}})}buildGraphics(){let t=this.ctx.facade.save.settings.graphics;this.body.appendChild(e(`div`,`section-label subsection`,`Graphics`)),this.push(te(`Quality`,He,t.quality,e=>this.patchGraphics({quality:e}))),this.push(j(`Shadows`,t.shadows,e=>this.patchGraphics({shadows:e}))),this.push(j(`Post-processing`,t.postProcessing,e=>this.patchGraphics({postProcessing:e}))),this.push(j(`Motion blur`,t.motionBlur,e=>this.patchGraphics({motionBlur:e}))),this.push(ne(`Resolution scale`,t.resolutionScale,.5,1,.05,l,e=>this.patchGraphics({resolutionScale:e}))),this.push(ne(`Field of view`,t.fov,55,100,1,e=>`${Math.round(e)}°`,e=>this.patchGraphics({fov:e})))}buildAudio(){let t=this.ctx.facade.save.settings.audio;this.body.appendChild(e(`div`,`section-label subsection`,`Audio`));let n=e=>this.ctx.facade.updateSettings({audio:{...this.ctx.facade.save.settings.audio,...e}});this.push(ne(`Master volume`,t.master,0,1,.05,l,e=>n({master:e}))),this.push(ne(`Engine`,t.engine,0,1,.05,l,e=>n({engine:e}))),this.push(ne(`Effects`,t.effects,0,1,.05,l,e=>n({effects:e}))),this.push(ne(`Music`,t.music,0,1,.05,l,e=>n({music:e})))}buildAssists(){let t=this.ctx.facade.save.settings.assists;this.body.appendChild(e(`div`,`section-label subsection`,`Assists`));let n=e=>this.ctx.facade.updateSettings({assists:{...this.ctx.facade.save.settings.assists,...e}});this.push(j(`ABS`,t.abs,e=>n({abs:e}))),this.push(te(`Traction control`,We,t.tcs,e=>n({tcs:e}))),this.push(j(`Stability control`,t.stability,e=>n({stability:e}))),this.push(j(`Racing line`,t.racingLine,e=>n({racingLine:e}))),this.push(j(`Brake assist`,t.autoBrake,e=>n({autoBrake:e})))}buildDriving(){let t=this.ctx.facade.save.settings;this.body.appendChild(e(`div`,`section-label subsection`,`Driving`)),this.push(te(`Transmission`,Ke,t.transmission,e=>this.ctx.facade.updateSettings({transmission:e}))),this.push(te(`Units`,Ue,t.units,e=>this.ctx.facade.updateSettings({units:e}))),this.push(j(`Unlimited credits (cheat)`,t.unlimitedCredits,e=>this.ctx.facade.updateSettings({unlimitedCredits:e}))),this.push(te(`Camera`,Ge,this.ctx.facade.cameraMode(),e=>this.ctx.facade.setCameraMode(e)))}buildControls(){let t=this.ctx.facade.save.settings;this.body.appendChild(e(`div`,`section-label subsection`,`Controls`)),this.push(ne(`Steering sensitivity`,t.steeringSensitivity,.5,2,.05,e=>e.toFixed(2),e=>this.ctx.facade.updateSettings({steeringSensitivity:e}))),this.push(ne(`Wheel rotation`,t.wheelRotationDeg,360,1080,10,e=>`${Math.round(e)}°`,e=>this.ctx.facade.updateSettings({wheelRotationDeg:e}))),this.push(ne(`Force feedback`,t.wheelForceFeedback,0,1,.05,l,e=>this.ctx.facade.updateSettings({wheelForceFeedback:e})))}buildReset(){if(this.body.appendChild(e(`div`,`section-label subsection`,`Data`)),this.resetConfirm)this.buildResetConfirmBox();else{let e=k(`Reset save data`,()=>{this.resetConfirm=!0,this.rebuild()},{className:`danger`});this.push(e)}}buildResetConfirmBox(){let t=e(`div`,`confirm-box`);t.appendChild(e(`div`,`confirm-text`,`Reset all save data — credits, cars and records? This cannot be undone.`));let n=e(`div`,`form-actions`),r=k(`Confirm reset`,()=>{this.ctx.facade.resetSave(),this.resetConfirm=!1,this.ctx.sound(`confirm`),this.ctx.toast(`Save data reset`),this.ctx.refresh()},{className:`danger`}),i=k(`Cancel`,()=>{this.resetConfirm=!1,this.rebuild()});n.append(r.el,i.el),t.appendChild(n),this.body.appendChild(t),this.focusItems.push(r.item,i.item)}rebuild(){this.focusItems=[],this.shell.backItem&&this.focusItems.push(this.shell.backItem),t(this.body),this.buildGraphics(),this.buildAudio(),this.buildAssists(),this.buildDriving(),this.buildControls(),this.buildReset()}};function Je(e){return new qe(e)}var Ye=e=>({kind:`button`,index:e,rest:0,full:1}),Xe=(e,t=0,n=1)=>({kind:`axis`,index:e,rest:t,full:n});function Ze(e){return{deviceId:e,deviceType:`gamepad`,bindings:{steerAxis:Xe(0),throttle:Ye(7),brake:Ye(6),handbrake:Ye(1),shiftUp:Ye(5),shiftDown:Ye(4),camera:Ye(3),lookBack:Ye(8),pause:Ye(9),reset:Ye(2),standings:Ye(0)}}}function Qe(e){let t=e.toLowerCase(),n=/g29|g920|g923|g27|g25|driving force|logitech/.test(t),r=/t150|t300|t248|tmx|t500|tx |thrustmaster|ferrari/.test(t),i=/fanatec|csl|podium|clubsport/.test(t),a=/moza|simagic|simucube|vrs/.test(t);return!n&&!r&&!i&&!a?null:{deviceId:e,deviceType:`wheel`,bindings:{steerAxis:Xe(0),throttle:Xe(n?2:1,1,-1),brake:Xe(n?5:2,1,-1),shiftUp:Ye(n?4:5),shiftDown:Ye(n?5:4),handbrake:Ye(1),camera:Ye(3),lookBack:Ye(0),pause:Ye(9),reset:Ye(2),standings:Ye(8)}}}function $e(e){return/wheel|g29|g920|g923|g27|t150|t300|t248|tmx|fanatec|moza|simagic|driving force|racing/i.test(e)}var et={steerLeft:`Steer left`,steerRight:`Steer right`,steerAxis:`Steering axis`,throttle:`Accelerate`,brake:`Brake`,handbrake:`Handbrake`,shiftUp:`Shift up`,shiftDown:`Shift down`,camera:`Change camera`,lookBack:`Look back`,pause:`Pause`,reset:`Reset to track`,standings:`Show standings`},tt=[`steerAxis`,`throttle`,`brake`,`handbrake`,`shiftUp`,`shiftDown`,`camera`,`lookBack`,`pause`,`reset`,`standings`],nt={ArrowLeft:`steerLeft`,KeyA:`steerLeft`,ArrowRight:`steerRight`,KeyD:`steerRight`,ArrowUp:`throttle`,KeyW:`throttle`,ArrowDown:`brake`,KeyS:`brake`,Space:`handbrake`,ShiftLeft:`shiftUp`,ShiftRight:`shiftUp`,KeyE:`shiftUp`,ControlLeft:`shiftDown`,ControlRight:`shiftDown`,KeyQ:`shiftDown`,KeyC:`camera`,KeyV:`lookBack`,Escape:`pause`,KeyR:`reset`,Tab:`standings`,Enter:`menuConfirm`,Backspace:`menuBack`};function rt(){return{steer:0,steerIsDirect:!1,throttle:0,brake:0,handbrake:!1,shiftUp:!1,shiftDown:!1,camera:!1,lookBack:!1,pause:!1,reset:!1,standings:!1,menuUp:!1,menuDown:!1,menuLeft:!1,menuRight:!1,menuConfirm:!1,menuBack:!1}}var it=[`shiftUp`,`shiftDown`,`camera`,`pause`,`reset`],at=class{state=rt();steeringSensitivity=1;wheelRotationDeg=900;keys=new Set;prevDigital={};kbSteer=0;kbThrottle=0;kbBrake=0;mappings;capture=null;lastDeviceUsed=`keyboard`;ffbEnabled=!0;constructor(e){this.mappings=e,window.addEventListener(`keydown`,e=>{(e.code===`Tab`||e.code===`Space`||e.code.startsWith(`Arrow`))&&e.preventDefault(),this.keys.add(e.code),this.lastDeviceUsed=`keyboard`}),window.addEventListener(`keyup`,e=>this.keys.delete(e.code)),window.addEventListener(`blur`,()=>this.keys.clear())}setMappings(e){this.mappings=e}devices(){let e=[];for(let t of navigator.getGamepads()){if(!t)continue;let n=$e(t.id)||this.mappings[t.id]?.deviceType===`wheel`?`wheel`:`gamepad`;e.push({index:t.index,id:t.id,type:n,mapped:!!this.mappings[t.id]})}return e}mappingFor(e){return this.mappings[e.id]||(e.mapping===`standard`&&!$e(e.id)?Ze(e.id):Qe(e.id))}update(e){let t=this.state,n={};this.readKeyboard(e,n);let r=this.kbSteer,i=this.kbThrottle,a=this.kbBrake;t.steerIsDirect=!1,this.capture&&this.pollCapture();for(let e of navigator.getGamepads()){if(!e)continue;let o=this.mappingFor(e);if(!o)continue;let s=this.readGamepad(e,o,n);(Math.abs(s.steer)>.02||s.throttle>.02||s.brake>.02)&&(this.lastDeviceUsed=o.deviceType),Math.abs(s.steer)>Math.abs(r)&&(r=s.steer,t.steerIsDirect=o.deviceType===`wheel`),i=Math.max(i,s.throttle),a=Math.max(a,s.brake),this.readMenuFromGamepad(e,n)}t.steer=f(r,-1,1),t.throttle=f(i,0,1),t.brake=f(a,0,1),t.handbrake=!!n.handbrake,t.lookBack=!!n.lookBack,t.standings=!!n.standings;for(let e of it)t[e]=!!n[e]&&!this.prevDigital[e];for(let e of[`menuUp`,`menuDown`,`menuLeft`,`menuRight`,`menuConfirm`,`menuBack`])t[e]=!!n[e]&&!this.prevDigital[e];this.prevDigital=n}readKeyboard(e,t){let n=0,r=!1,i=!1;for(let e of this.keys){let a=nt[e];a&&(a===`steerLeft`?--n:a===`steerRight`?n+=1:a===`throttle`?r=!0:a===`brake`?i=!0:t[a]=!0)}(this.keys.has(`ArrowUp`)||this.keys.has(`KeyW`))&&(t.menuUp=!0),(this.keys.has(`ArrowDown`)||this.keys.has(`KeyS`))&&(t.menuDown=!0),(this.keys.has(`ArrowLeft`)||this.keys.has(`KeyA`))&&(t.menuLeft=!0),(this.keys.has(`ArrowRight`)||this.keys.has(`KeyD`))&&(t.menuRight=!0),this.keys.has(`Escape`)&&(t.menuBack=!0);let a=3.2*this.steeringSensitivity;this.kbSteer=n===0?Math.abs(this.kbSteer)<7*e?0:this.kbSteer-Math.sign(this.kbSteer)*7*e:f(this.kbSteer+n*a*e,-1,1),this.kbThrottle=f(this.kbThrottle+(r?5:-8)*e,0,1),this.kbBrake=f(this.kbBrake+(i?6:-10)*e,0,1)}readBinding(e,t){if(!t)return 0;if(t.kind===`button`){let n=e.buttons[t.index];return n?typeof n.value==`number`?n.value:+!!n.pressed:0}let n=e.axes[t.index]??t.rest,r=t.full-t.rest;return Math.abs(r)<.001?0:f((n-t.rest)/r,0,1)}readGamepad(e,t,n){let r=t.bindings,i=0;if(r.steerAxis){let n=e.axes[r.steerAxis.index]??0;if(t.deviceType===`wheel`)i=f(n*(900/this.wheelRotationDeg),-1,1);else{let e=Math.max(0,Math.abs(n)-.08)/.92;i=Math.sign(n)*e**1.4*this.steeringSensitivity}}(r.steerLeft||r.steerRight)&&(i+=this.readBinding(e,r.steerRight)-this.readBinding(e,r.steerLeft));let a=this.readBinding(e,r.throttle),o=this.readBinding(e,r.brake);for(let t of[`handbrake`,`shiftUp`,`shiftDown`,`camera`,`lookBack`,`pause`,`reset`,`standings`])this.readBinding(e,r[t])>.5&&(n[t]=!0);return{steer:i,throttle:a,brake:o}}readMenuFromGamepad(e,t){let n=e.mapping===`standard`,r=t=>!!e.buttons[t]?.pressed,i=e.axes[1]??0,a=e.axes[0]??0;(n&&r(12)||i<-.6)&&(t.menuUp=!0),(n&&r(13)||i>.6)&&(t.menuDown=!0),(n&&r(14)||n&&a<-.6)&&(t.menuLeft=!0),(n&&r(15)||n&&a>.6)&&(t.menuRight=!0),r(0)&&(t.menuConfirm=!0),r(1)&&(t.menuBack=!0),r(9)&&(t.pause=!0)}captureBinding(){let e=[...navigator.getGamepads()].map(e=>e?{axes:[...e.axes],buttons:e.buttons.map(e=>e.value)}:{axes:[],buttons:[]});return new Promise(t=>{this.capture={baseline:e,resolve:t}})}cancelCapture(){this.capture=null}pollCapture(){if(!this.capture)return;let e=navigator.getGamepads();for(let t=0;t<e.length;t++){let n=e[t],r=this.capture.baseline[t];if(!(!n||!r)){for(let e=0;e<n.axes.length;e++){let t=r.axes[e]??0,i=n.axes[e];if(Math.abs(i-t)>.55){let r=i>t?1:-1;this.capture.resolve({kind:`axis`,index:e,rest:t,full:r,deviceId:n.id}),this.capture=null;return}}for(let e=0;e<n.buttons.length;e++)if(n.buttons[e].value-(r.buttons[e]??0)>.5){this.capture.resolve({kind:`button`,index:e,rest:0,full:1,deviceId:n.id}),this.capture=null;return}}}}rumble(e,t,n){if(this.ffbEnabled)for(let r of navigator.getGamepads()){let i=r?.vibrationActuator;i?.playEffect&&i.playEffect(`dual-rumble`,{startDelay:0,duration:n,strongMagnitude:f(e,0,1),weakMagnitude:f(t,0,1)}).catch(()=>{})}}setForceFeedback(e){this.ffbEnabled=e}static describe(e){return e.kind===`axis`?`Axis ${e.index}${e.full<e.rest?` (inverted)`:``}`:`Button ${e.index}`}actionsList(){return[`steerAxis`,`throttle`,`brake`,`handbrake`,`shiftUp`,`shiftDown`,`camera`,`lookBack`,`pause`,`reset`,`standings`]}};function ot(e){return e.startsWith(`Key`)?e.slice(3):e.startsWith(`Digit`)?e.slice(5):e.startsWith(`Arrow`)?`${e.slice(5)} arrow`:e.replace(`Left`,` (L)`).replace(`Right`,` (R)`)}var st=class{ctx;el;shell;body=e(`div`,`menu-scroll`);overlay=e(`div`,`capture-overlay hidden panel`);overlayText=e(`div`,`capture-text`,``);devices=[];focusItems=[];capturing=!1;cancelled=!1;pollTimer=null;constructor(t){this.ctx=t,this.el=e(`div`,`screen screen-controls`),this.shell=A(`Input`,`Controls`,{wide:!0,onBack:()=>{this.ctx.sound(`back`),this.ctx.back()}}),this.shell.body.appendChild(this.body),this.el.appendChild(this.shell.el),this.overlay.append(this.overlayText,e(`div`,`capture-hint`,`Move Back / press Backspace to cancel`)),this.el.appendChild(this.overlay)}onShow(){this.ctx.facade.showroom(null),this.cancelled=!1,this.pollTimer=window.setInterval(()=>{this.capturing||this.rebuild()},1e3)}onHide(){this.pollTimer!==null&&window.clearInterval(this.pollTimer),this.pollTimer=null,this.capturing&&(this.cancelled=!0,this.ctx.facade.cancelCapture(),this.setCapturing(!1))}render(){this.rebuild()}focus(){return this.capturing?{items:[]}:{items:this.focusItems}}interceptBack(){return this.capturing?(this.cancelled=!0,this.ctx.facade.cancelCapture(),this.setCapturing(!1),this.ctx.sound(`back`),this.rebuild(),!0):!1}setCapturing(e,t){this.capturing=e,this.overlay.classList.toggle(`hidden`,!e),t&&(this.overlayText.textContent=`Move or press the control for: ${t}`)}async captureOne(e,t){this.setCapturing(!0,et[t]),this.focusItems=[];try{let n=await this.ctx.facade.captureBinding();if(this.cancelled)return;this.ctx.facade.setBinding(e.id,e.type,t,n),this.ctx.sound(`confirm`)}finally{this.setCapturing(!1)}}async mapAll(e){this.cancelled=!1;for(let t of tt){if(this.cancelled)break;await this.captureOne(e,t)}this.rebuild()}buildDeviceList(){if(this.body.appendChild(e(`div`,`section-label subsection`,`Connected devices`)),!this.devices.length){this.body.appendChild(e(`div`,`notice info`,`No devices detected yet. Press a button on your controller or wheel to detect it.`));return}let t=e(`div`,`device-list`);for(let n of this.devices){let r=e(`div`,`device-row`);r.appendChild(e(`span`,``,`${n.id} (${n.type===`wheel`?`Wheel`:`Gamepad`})`)),r.appendChild(e(`span`,`pill ${n.mapped?`owned`:`locked`}`,n.mapped?`Mapped`:`Default mapping`)),t.appendChild(r)}this.body.appendChild(t),this.body.appendChild(e(`div`,`gt-row-hint`,`Steering wheels are treated as direct 1:1 steering — no smoothing or auto-centre.`))}buildMappingRow(t,n,r){let i=r?.bindings[n],a=e(`div`,`gt-row`);a.appendChild(e(`span`,`gt-row-label`,et[n]));let o=e(`div`,`gt-row-value`);o.appendChild(e(`span`,``,i?at.describe(i):`Not bound`));let s=k(`Remap`,()=>{this.captureOne(t,n).then(()=>this.rebuild())});o.appendChild(s.el),a.appendChild(o),this.body.appendChild(a),this.focusItems.push(s.item)}buildMappingTable(t){this.body.appendChild(e(`div`,`section-label subsection`,`Mapping — ${t.id}`));let n=this.ctx.facade.inputMappings()[t.id];for(let e of tt)this.buildMappingRow(t,e,n);let r=k(`Map all`,()=>void this.mapAll(t)),i=k(`Reset device`,()=>{this.ctx.facade.clearMapping(t.id),this.ctx.sound(`back`),this.rebuild()},{className:`danger`}),a=e(`div`,`form-actions`);a.append(r.el,i.el),this.body.appendChild(a),this.focusItems.push(r.item,i.item)}buildKeyboardTable(){this.body.appendChild(e(`div`,`section-label subsection`,`Keyboard reference`));let t=e(`table`,`kbd-table`);for(let[n,r]of Object.entries(nt)){let i=r.startsWith(`menu`)?r.replace(`menu`,`Menu `):et[r],a=e(`tr`);a.appendChild(e(`td`,`key`,ot(n))),a.appendChild(e(`td`,``,i)),t.appendChild(a)}this.body.appendChild(t)}rebuild(){this.focusItems=[],this.shell.backItem&&this.focusItems.push(this.shell.backItem),t(this.body),this.devices=this.ctx.facade.inputDevices(),this.buildDeviceList();for(let e of this.devices)this.buildMappingTable(e);this.buildKeyboardTable()}};function ct(e){return new st(e)}function lt(n){let r=e(`div`,`screen screen-records`),i=A(`Career`,`Records`,{wide:!0,onBack:()=>{n.sound(`back`),n.back()}}),a=e(`div`,`menu-scroll`);i.body.appendChild(a),r.appendChild(i.el);let o=[];function s(){o=[],i.backItem&&o.push(i.backItem),t(a);let{records:r}=n.facade.save;if(!r.length){a.appendChild(e(`div`,`notice info`,`No lap records yet — go set one.`));return}let s=n.facade.tracks(),c=r.map(e=>({record:e,trackName:s.find(t=>t.id===e.trackId)?.name??e.trackId,carName:n.facade.carById(e.carSpecId)?.name??e.carSpecId})).sort((e,t)=>e.trackName.localeCompare(t.trackName)||e.record.timeMs-t.record.timeMs),l=e(`table`,`records-table`),u=e(`tr`);for(let t of[`Track`,`Car`,`Time`,`Date`])u.appendChild(e(`th`,``,t));l.appendChild(u);for(let t of c){let n=e(`tr`),r={el:n};n.appendChild(e(`td`,``,t.trackName)),n.appendChild(e(`td`,``,t.carName)),n.appendChild(e(`td`,``,v(t.record.timeMs))),n.appendChild(e(`td`,``,new Date(t.record.dateIso).toLocaleDateString())),l.appendChild(n),o.push(r)}a.appendChild(l)}return{el:r,onShow:()=>n.facade.showroom(null),render:()=>s(),focus:()=>({items:o})}}var ut=[`Trail-brake into slow corners to keep the front tyres loaded.`,`Short-shift on cold tyres until they come up to temperature.`,`Downforce costs top speed but pays it back in the corners.`,`Softer tyres grip harder but wear out faster over a stint.`,`Late apexes open the exit and protect your line down the straight.`,`Lift off gently before you brake to keep the car balanced.`,`A wider entry line often means a straighter, faster exit.`,`Watch your brake bias — too much rear locks the tail under braking.`];function dt(t){let n=e(`div`,`screen screen-loading`),r=e(`div`,`loading-wrap`),i=e(`div`,`loading-track-name`,``),a=e(`div`,`loading-bar-track`),o=e(`div`,`loading-bar-fill`);a.appendChild(o);let s=e(`div`,`loading-status`,``),c=e(`div`,`loading-tip`,``);r.append(i,a,s,c),n.appendChild(r);let l=null,u=()=>{c.textContent=`Tip: ${ut[Math.floor(Math.random()*ut.length)]}`};return{el:n,onShow:()=>{t.facade.showroom(null),u(),l=window.setInterval(u,4500)},onHide:()=>{l!==null&&window.clearInterval(l),l=null},render:()=>{i.textContent=t.facade.loadedTrackName()||`Loading`},focus:()=>({items:[]}),setProgress:(e,t)=>{o.style.width=`${Math.round(Math.max(0,Math.min(1,e))*100)}%`,s.textContent=t}}}function ft(n){let r=e(`div`,`screen screen-pause`),i=e(`div`,`center-panel panel`);i.appendChild(e(`div`,`overline pause-title`,`Paused`));let a=e(`div`,`form-rows`);i.appendChild(a),r.appendChild(i);let o=[];function s(){t(a),o=[];let e=k(`Resume`,()=>{n.sound(`confirm`),n.facade.resumeRace()},{className:`primary`}),r=k(`Restart`,()=>{n.sound(`confirm`),n.facade.restartRace()}),i=k(`Settings`,()=>n.show(`settings`)),s=k(`Quit to menu`,()=>{n.sound(`back`),n.facade.quitToHome()},{className:`danger`});for(let t of[e,r,i,s])a.appendChild(t.el),o.push(t.item)}return{el:r,render:()=>s(),focus:()=>({items:o})}}function pt(e){return e.totalTimeMs===null?e.gapMs===null?e.finished?`Finished`:`DNF`:y(e.gapMs):v(e.totalTimeMs)}var mt=class{ctx;el;tableWrap=e(`div`,`results-table-wrap`);creditsValue=e(`div`,`credits-earned`,`Cr. 0`);recordBanner=e(`div`,`results-new-record hidden`,`New track record!`);buttons=e(`div`,`form-actions`);focusItems=[];last=null;countUpHandle=null;constructor(t){this.ctx=t,this.el=e(`div`,`screen screen-results`);let n=e(`div`,`center-panel panel`),r=e(`div`,`results-credits`);r.appendChild(this.creditsValue),n.append(e(`div`,`overline results-title`,`Session Results`),this.tableWrap,r,this.recordBanner,this.buttons),this.el.appendChild(n)}onShow(e){e&&(this.last=e)}onHide(){this.countUpHandle!==null&&cancelAnimationFrame(this.countUpHandle),this.countUpHandle=null}render(e){e&&(this.last=e),this.rebuild()}focus(){return{items:this.focusItems}}buildTable(n){t(this.tableWrap);let r=e(`table`,`results-table`),i=e(`tr`);for(let t of[`Pos`,`Driver`,`Car`,`Time`,`Best lap`])i.appendChild(e(`th`,``,t));r.appendChild(i);for(let t of n.entries){let n=e(`tr`,t.isPlayer?`player-row`:``);n.append(e(`td`,``,`${t.position}`),e(`td`,``,t.name),e(`td`,``,t.carName),e(`td`,``,pt(t)),e(`td`,``,v(t.bestLapMs))),r.appendChild(n)}this.tableWrap.appendChild(r)}animateCredits(e){this.countUpHandle!==null&&cancelAnimationFrame(this.countUpHandle);let t=performance.now(),n=i=>{let a=Math.min(1,(i-t)/900),o=1-(1-a)**3;this.creditsValue.textContent=r(Math.round(e*o)),a<1&&(this.countUpHandle=requestAnimationFrame(n))};this.countUpHandle=requestAnimationFrame(n)}rebuild(){if(this.focusItems=[],t(this.buttons),!this.last)return;this.buildTable(this.last),this.recordBanner.classList.toggle(`hidden`,!this.last.newRecord),this.animateCredits(this.last.creditsEarned);let e=k(`Watch replay`,()=>{this.ctx.sound(`confirm`),this.ctx.facade.startReplay(),this.ctx.show(`replay`)}),n=k(`Continue`,()=>{this.ctx.sound(`confirm`),this.ctx.facade.quitToHome()},{className:`primary`}),r=k(`Restart`,()=>{this.ctx.sound(`confirm`),this.ctx.facade.restartRace()});this.buttons.append(e.el,n.el,r.el),this.focusItems.push(e.item,n.item,r.item)}};function ht(e){return new mt(e)}var gt={tv:`TV`,chase:`Chase`};function _t(t){let n=e(`div`,`screen screen-replay`),r=e(`div`,`replay-bar panel`),i=e(`div`,`replay-progress-track`),a=e(`div`,`replay-progress-fill`);i.appendChild(a);let o=e(`div`,`replay-time-row`),s=e(`span`,``,`0:00.000`),c=e(`span`,``,`0:00.000`);o.append(s,e(`span`,``,`/`),c);let l=e(`div`,`replay-controls`),u=k(`Pause`,()=>t.facade.replayControl(`toggle`)),d=k(`«`,()=>t.facade.replayControl(`slower`)),f=e(`span`,`replay-speed`,`x1`),p=k(`»`,()=>t.facade.replayControl(`faster`)),m=k(`TV`,()=>t.facade.replayControl(`camera`)),h=e(`span`,`replay-subject`,``),g=k(`Next car`,()=>t.facade.replayControl(`nextCar`)),_=k(`Exit replay`,()=>y());l.append(u.el,d.el,f,p.el,m.el,h,g.el,_.el),r.append(i,o,l),n.appendChild(r);function y(){t.facade.exitReplay(),t.sound(`back`),t.back()}function b(){let e=t.facade.replayState(),n=e.durationS>0?Math.max(0,Math.min(1,e.timeS/e.durationS)):0;a.style.transform=`scaleX(${n})`,s.textContent=v(e.timeS*1e3),c.textContent=v(e.durationS*1e3),u.el.textContent=e.playing?`Pause`:`Play`,f.textContent=`x${e.speed}`,m.el.textContent=gt[e.camera]??e.camera,h.textContent=e.subject}return{el:n,onShow:()=>b(),onTick:()=>b(),render:()=>b(),focus:()=>({items:[]}),interceptInput:e=>!e.menuBack&&(e.menuConfirm&&t.facade.replayControl(`toggle`),e.menuLeft&&t.facade.replayControl(`slower`),e.menuRight&&t.facade.replayControl(`faster`),(e.menuUp||e.menuDown)&&t.facade.replayControl(`nextCar`),!0),interceptBack:()=>(y(),!0)}}var vt=[`race`,`pause`],yt=class{facade;root;screensLayer=e(`div`,`screens`);toastLayer=new T;hud;focusManager=new n(()=>this.facade.playUiSound(`move`));screens;currentName=null;history=[];ctx;suppressBackOnce=!1;constructor(e,t){this.facade=e,this.root=t,this.root.classList.add(`apex-ui`),this.hud=new C(e),this.ctx={facade:e,show:(e,t)=>this.navigate(e,t,!0),back:()=>this.goBack(),refresh:()=>this.refresh(),toast:e=>this.toastLayer.show(e),sound:t=>e.playUiSound(t)},this.screens=this.buildScreens();for(let e of Object.keys(this.screens))this.screensLayer.appendChild(this.screens[e].el);this.root.append(this.screensLayer,this.hud.el,this.toastLayer.el),this.navigate(`title`,void 0,!1)}buildScreens(){let t=this.ctx;return{title:O(t),home:me(t),garage:Ce(t),dealership:De(t),tuning:P(t),events:Me(t),custom:ze(t),timetrial:Ve(t),settings:Je(t),controls:ct(t),records:lt(t),loading:dt(t),race:{el:e(`div`,`screen screen-race`),render:()=>void 0,focus:()=>({items:[]})},pause:ft(t),results:ht(t),replay:_t(t)}}updateChrome(){for(let e of Object.keys(this.screens))this.screens[e].el.classList.toggle(`active`,e===this.currentName);let e=this.currentName!==null&&vt.includes(this.currentName);this.hud.el.classList.toggle(`hidden-hud`,!e),this.hud.el.classList.toggle(`dimmed`,this.currentName===`pause`)}applyFocus(e){let t=e.focus();this.focusManager.setItems(t.items,t.columns??1)}navigate(e,t,n){let r=this.currentName;r&&n&&this.history.push(r),r&&this.screens[r].onHide?.(),this.currentName=e;let i=this.screens[e];i.onShow?.(t),i.render(t),this.applyFocus(i),this.updateChrome()}goBack(){let e=this.history.pop();e&&this.navigate(e,void 0,!1)}refresh(){if(!this.currentName)return;let e=this.screens[this.currentName];e.render(),this.applyFocus(e)}showScreen(e,t){this.navigate(e,t,!0),this.suppressBackOnce=!0}updateHud(e){this.hud.update(e)}showResults(e){this.navigate(`results`,e,!0),this.suppressBackOnce=!0}setLoading(e,t){this.screens.loading.setProgress(e,t)}handleInput(e){if(!this.currentName)return;let t=this.suppressBackOnce;this.suppressBackOnce=!1;let n=this.screens[this.currentName];if(n.onTick?.(),this.currentName===`race`&&this.hud.setStandingsVisible(e.standings),!n.interceptInput?.(e)){if(e.menuBack){if(t||n.interceptBack?.())return;this.facade.playUiSound(`back`),this.goBack();return}this.focusManager.handle(e)}}showToast(e){this.toastLayer.show(e)}};function bt(e,t){let n=new yt(e,t);return{showScreen:(e,t)=>n.showScreen(e,t),updateHud:e=>n.updateHud(e),showResults:e=>n.showResults(e),setLoading:(e,t)=>n.setLoading(e,t),handleInput:e=>n.handleInput(e),refresh:()=>n.refresh(),showToast:e=>n.showToast(e)}}function xt(){let e=globalThis;return e.AudioContext??e.webkitAudioContext??null}function St(){try{let e=xt();if(!e)return null;let t=new e,n=t.createGain(),r=t.createGain(),i=t.createGain(),a=t.createGain(),o=t.createDynamicsCompressor(),s=t.createGain(),c=t.createGain(),l=t.createBiquadFilter(),u=t.createBiquadFilter();n.gain.value=1,r.gain.value=1,i.gain.value=1,a.gain.value=1,s.gain.value=1,c.gain.value=1,o.threshold.value=-20,o.knee.value=24,o.ratio.value=3,o.attack.value=.006,o.release.value=.25,l.type=`lowpass`,l.frequency.value=3800,l.Q.value=.7,u.type=`highshelf`,u.frequency.value=2500,u.gain.value=-6,s.connect(l).connect(n),c.connect(r),n.connect(a),r.connect(a),i.connect(a),a.connect(u).connect(o);let d=null;if(typeof t.createAnalyser==`function`)try{d=t.createAnalyser(),d.fftSize=2048}catch{d=null}return d?(o.connect(d),d.connect(t.destination)):o.connect(t.destination),{ctx:t,engineBus:n,effectsBus:r,musicBus:i,masterGain:a,compressor:o,analyser:d,raceEngineGain:s,raceLoopGain:c,engineLowpass:l}}catch{return null}}function Ct(e,t,n){return Math.min(n,Math.max(t,e))}function I(e,t,n,r=.05){if(Number.isFinite(t))try{e.setTargetAtTime(t,n.currentTime,Math.max(.001,r))}catch{}}function wt(e,t,n){try{e.setValueAtTime(t,n.currentTime)}catch{}}function Tt(e,t,n=`white`){let r=Math.max(1,Math.floor(e.sampleRate*t)),i=e.createBuffer(1,r,e.sampleRate),a=i.getChannelData(0);if(n===`white`)for(let e=0;e<r;e++)a[e]=Math.random()*2-1;else{let e=0;for(let t=0;t<r;t++){let n=Math.random()*2-1;e=(e+.02*n)/1.02,a[t]=e*3.5}}return i}function Et(e,t,n){let r=e.createBufferSource();return r.buffer=Tt(e,t,n),r.loop=!0,r.start(),r}function Dt(e,t=18){let n=new Float32Array(t+1),r=new Float32Array(t+1);for(let e=1;e<=t;e++)r[e]=1/e;return e.createPeriodicWave(n,r,{disableNormalization:!1})}function Ot(e=.4){let t=new Float32Array(256),n=1+e*5,r=Math.tanh(n);for(let e=0;e<256;e++){let i=e/255*2-1;t[e]=Math.tanh(i*n)/r}return t}function kt(e=6){let t=new Float32Array(256);for(let n=0;n<256;n++){let r=n/255*2-1;t[n]=Math.max(0,r)**+e}return t}function At(e,t,n){if(n)return{pan:0,gain:1,cutoff:2e4,distance:0};let r=Math.hypot(e,t);return{pan:Ct(e/20,-1,1),gain:1/(1+r/12)**1.6,cutoff:Ct(9e3/(1+r/15),300,9e3),distance:r}}var jt=class{rate;v;constructor(e=0,t=8){this.rate=t,this.v=e}update(e,t){let n=1-Math.exp(-this.rate*Math.max(0,t));return this.v+=(e-this.v)*n,this.v}reset(e){this.v=e}get value(){return this.v}},Mt=`// Sample-accurate exhaust pulse-train generator, run on the audio rendering
// thread. Each firing event is a short asymmetric pressure pulse (fast
// linear attack, exponential decay) retriggered at the firing frequency,
// following a repeating per-engine cylinder-order pattern with per-pulse
// timing/amplitude jitter. Loaded via audioWorklet.addModule() from a Blob
// URL built from this file's raw source — see ../engine/ExhaustWorklet.ts.
//
// Not a TypeScript file on purpose: it is imported with \`?raw\` and shipped
// to the browser verbatim, so it must already be plain, dependency-free JS.
class EngineProcessor extends AudioWorkletProcessor {
  static get parameterDescriptors() {
    return [
      {
        name: 'firingFreq',
        defaultValue: 30,
        minValue: 0.1,
        maxValue: 2000,
        automationRate: 'a-rate',
      },
      {
        name: 'jitterAmount',
        defaultValue: 0.03,
        minValue: 0,
        maxValue: 0.2,
        automationRate: 'k-rate',
      },
    ];
  }

  constructor(options) {
    super(options);
    const opts = (options && options.processorOptions) || {};
    this.pattern = opts.pattern && opts.pattern.length ? opts.pattern : [{ mult: 1, amp: 1 }];
    this.attackS = Math.max(0.0002, (opts.attackMs ?? 1) / 1000);
    this.decayS = Math.max(0.001, (opts.decayMs ?? 6) / 1000);
    this.patternIndex = 0;
    this.timeToNext = 0;
    this.sinceStart = 1;
    this.peak = 0;
  }

  triggerPulse(freq, jitter) {
    const entry = this.pattern[this.patternIndex % this.pattern.length];
    this.patternIndex++;
    const timeJitter = 1 + (Math.random() * 2 - 1) * jitter;
    const ampJitter = 1 + (Math.random() * 2 - 1) * jitter * 1.4;
    const period = freq > 0 ? 1 / freq : 1;
    this.timeToNext += period * entry.mult * timeJitter;
    this.peak = Math.max(0.05, entry.amp * ampJitter);
    this.sinceStart = 0;
  }

  envelope() {
    if (this.sinceStart < this.attackS) return this.peak * (this.sinceStart / this.attackS);
    const decayT = this.sinceStart - this.attackS;
    return this.peak * Math.exp(-decayT / this.decayS);
  }

  process(_inputs, outputs, parameters) {
    const out = outputs[0] && outputs[0][0];
    if (!out) return true;
    const freqArr = parameters.firingFreq;
    const jitter = parameters.jitterAmount[0];
    const dt = 1 / sampleRate;

    for (let i = 0; i < out.length; i++) {
      const freq = freqArr.length > 1 ? freqArr[i] : freqArr[0];
      this.timeToNext -= dt;
      if (this.timeToNext <= 0) this.triggerPulse(freq, jitter);
      out[i] = this.envelope();
      this.sinceStart += dt;
    }
    return true;
  }
}

registerProcessor('engine-processor', EngineProcessor);
`,Nt=`engine-processor`,Pt=null,Ft=new WeakSet;function It(){return Pt??=URL.createObjectURL(new Blob([Mt],{type:`text/javascript`})),Pt}function Lt(e){return typeof e.audioWorklet?.addModule==`function`}async function Rt(e){if(!Lt(e))return!1;if(Ft.has(e))return!0;try{return await e.audioWorklet.addModule(It()),Ft.add(e),!0}catch{return!1}}function zt(e,t,n,r){return new AudioWorkletNode(e,Nt,{numberOfInputs:0,numberOfOutputs:1,outputChannelCount:[1],processorOptions:{pattern:t,attackMs:n,decayMs:r}})}var Bt=.08,Vt=class{ctx;preset=null;usingWorklet=!1;fallbackOsc;fallbackGain;workletNode=null;freqParam;resonatorInput;resonators=[];resonatorSum;shaper;lowpass;shiftGain;levelGain;constructor(e,t,n){this.ctx=e,this.fallbackOsc=e.createOscillator(),this.fallbackOsc.frequency.value=100,this.fallbackGain=e.createGain(),this.fallbackGain.gain.value=1,this.fallbackOsc.connect(this.fallbackGain),this.fallbackOsc.start(),this.freqParam=this.fallbackOsc.frequency,this.resonatorInput=e.createGain(),this.resonatorInput.gain.value=1,this.fallbackGain.connect(this.resonatorInput),this.resonatorSum=e.createGain(),this.resonatorSum.gain.value=.45,this.resonators=this.buildResonators(),this.shaper=e.createWaveShaper(),this.lowpass=e.createBiquadFilter(),this.lowpass.type=`lowpass`,this.lowpass.Q.value=.7,this.shiftGain=e.createGain(),this.shiftGain.gain.value=1,this.levelGain=e.createGain(),this.levelGain.gain.value=.3,this.resonatorSum.connect(this.shaper).connect(this.lowpass).connect(this.shiftGain).connect(this.levelGain).connect(t),n.then(e=>{e&&this.upgradeToWorklet()})}input(){return this.resonatorInput}buildResonators(){let e=[];for(let t=0;t<4;t++){let n=this.ctx.createBiquadFilter();n.type=t===3?`peaking`:`bandpass`,n.Q.value=t===0?2.5:3,t===3&&(n.gain.value=3),this.resonatorInput.connect(n).connect(this.resonatorSum),e.push(n)}return e}applyPreset(e){if(this.preset===e)return;this.preset=e;let t=e.exhaustFundamentalHz,n=[t,t*2,t*3,e.bodyResonanceHz];for(let e=0;e<this.resonators.length;e++)wt(this.resonators[e].frequency,n[e],this.ctx);this.shaper.curve=Ot(e.saturation);try{this.fallbackOsc.setPeriodicWave(Dt(this.ctx,12))}catch{}this.usingWorklet&&this.rebuildWorkletNode()}upgradeToWorklet(){this.usingWorklet||!this.preset||(this.usingWorklet=!0,this.rebuildWorkletNode(),I(this.fallbackGain.gain,0,this.ctx,.05))}rebuildWorkletNode(){if(this.preset)try{this.workletNode?.disconnect();let e=zt(this.ctx,this.preset.firePattern,this.preset.attackMs,this.preset.decayMs);e.connect(this.resonatorInput),this.workletNode=e;let t=e.parameters.get(`firingFreq`);t&&(this.freqParam=t)}catch{this.usingWorklet=!1}}setFrequency(e,t){t?wt(this.freqParam,e,this.ctx):I(this.freqParam,e,this.ctx,.03)}setJitter(e){let t=this.workletNode?.parameters.get(`jitterAmount`);t&&wt(t,e,this.ctx)}updateTone(e,t,n,r){if(!this.preset)return;let i=this.preset,a=i.filterBaseHz+e*i.filterRpmHz*1e3+t*i.filterThrottleHz;n&&(a*=.55),I(this.lowpass.frequency,a,this.ctx,.05),I(this.levelGain.gain,r,this.ctx,.08)}shiftCut(){let e=this.ctx.currentTime;try{this.shiftGain.gain.cancelScheduledValues(e),this.shiftGain.gain.setValueAtTime(1,e),this.shiftGain.gain.linearRampToValueAtTime(.15,e+Bt*.3),this.shiftGain.gain.linearRampToValueAtTime(1,e+Bt)}catch{}}},Ht=.5,Ut=.01,Wt=class{ctx;destination;preset=null;intakeSrc;intakeBp;intakeGain;turboOsc;turboGain;blowoffBuffer;blowoffCooldown=0;tickSrc;tickHp;tickGain;tickLfo;tickShaper;tickDepthGain;superOsc;superLp;superGain;hybridOsc;hybridGain;constructor(e,t){this.ctx=e,this.destination=t,this.intakeSrc=Et(e,2,`white`),this.intakeBp=e.createBiquadFilter(),this.intakeBp.type=`bandpass`,this.intakeBp.Q.value=1,this.intakeGain=e.createGain(),this.intakeGain.gain.value=0,this.intakeSrc.connect(this.intakeBp).connect(this.intakeGain).connect(t),[this.turboOsc,this.turboGain]=this.sineVoice(),this.blowoffBuffer=Tt(e,.3,`white`),this.tickSrc=Et(e,1.5,`white`),this.tickHp=e.createBiquadFilter(),this.tickHp.type=`highpass`,this.tickHp.frequency.value=3e3,this.tickGain=e.createGain(),this.tickGain.gain.value=0,this.tickLfo=e.createOscillator(),this.tickLfo.type=`sine`,this.tickLfo.frequency.value=40,this.tickShaper=e.createWaveShaper(),this.tickShaper.curve=kt(30),this.tickDepthGain=e.createGain(),this.tickDepthGain.gain.value=0,this.tickLfo.connect(this.tickShaper).connect(this.tickDepthGain).connect(this.tickGain.gain),this.tickLfo.start(),this.tickSrc.connect(this.tickHp).connect(this.tickGain).connect(t),[this.superOsc,this.superGain]=this.sineVoice(`sawtooth`),this.superLp=e.createBiquadFilter(),this.superLp.type=`lowpass`,this.superLp.frequency.value=3e3,this.superGain.disconnect(),this.superGain.connect(this.superLp).connect(t),[this.hybridOsc,this.hybridGain]=this.sineVoice()}sineVoice(e=`sine`){let t=this.ctx.createOscillator();t.type=e,t.frequency.value=200,t.start();let n=this.ctx.createGain();return n.gain.value=0,t.connect(n).connect(this.destination),[t,n]}applyPreset(e){this.preset=e,e.turbo||wt(this.turboGain.gain,0,this.ctx),e.supercharger||wt(this.superGain.gain,0,this.ctx),e.hybridWhine||wt(this.hybridGain.gain,0,this.ctx)}update(e,t,n,r){this.preset&&(this.updateIntake(e,t),this.updateTurbo(e,t,r),this.updateTick(n),this.updateSupercharger(e.rpm),this.updateHybrid(t,n))}updateIntake(e,t){let n=this.preset,r=Ct(n.intakeBaseHz+t*(1200-n.intakeBaseHz),600,1200);I(this.intakeBp.frequency,r,this.ctx,.06),I(this.intakeGain.gain,e.throttle*(.02+t*.04),this.ctx,.06)}updateTurbo(e,t,n){if(!this.preset.turbo)return;I(this.turboOsc.frequency,Ct(2e3+t*6e3,2e3,8e3),this.ctx,.08),I(this.turboGain.gain,e.throttle*t*Ut,this.ctx,.1),this.blowoffCooldown=Math.max(0,this.blowoffCooldown-1/60);let r=n-e.throttle;n>.6&&r>.35&&this.blowoffCooldown<=0&&(this.blowoffCooldown=Ht,this.fireBlowoff(.18*r))}updateTick(e){let t=this.preset.valvetrainTick;I(this.tickLfo.frequency,e*2,this.ctx,.05),I(this.tickDepthGain.gain,t*Ut*2.5,this.ctx,.1)}updateSupercharger(e){if(!this.preset.supercharger)return;let t=e/60;I(this.superOsc.frequency,t*5,this.ctx,.04),I(this.superGain.gain,Ct(e/7e3,0,1)*.05,this.ctx,.1)}updateHybrid(e,t){this.preset.hybridWhine&&(I(this.hybridOsc.frequency,t*8,this.ctx,.05),I(this.hybridGain.gain,e*Ut*.6,this.ctx,.1))}fireBlowoff(e){try{let t=this.ctx.createBufferSource();t.buffer=this.blowoffBuffer;let n=this.ctx.createBiquadFilter();n.type=`highpass`,n.frequency.value=3500;let r=this.ctx.createGain(),i=this.ctx.currentTime;r.gain.setValueAtTime(1e-4,i),r.gain.exponentialRampToValueAtTime(Math.max(5e-4,e),i+.02),r.gain.exponentialRampToValueAtTime(1e-4,i+.22),t.connect(n).connect(r).connect(this.destination),t.start(i),t.stop(i+.3),t.onended=()=>{try{t.disconnect(),n.disconnect(),r.disconnect()}catch{}}}catch{}}idle(){I(this.intakeGain.gain,0,this.ctx,.2),I(this.turboGain.gain,0,this.ctx,.2),I(this.tickDepthGain.gain,0,this.ctx,.2),I(this.superGain.gain,0,this.ctx,.2),I(this.hybridGain.gain,0,this.ctx,.2)}},Gt=1.5,Kt=.18,qt=1.35,Jt=class{ctx;overrunCooldown=0;liftBoostUntil=0;blipUntil=0;burstBuffer;constructor(e){this.ctx=e,this.burstBuffer=Tt(e,.3,`white`)}reset(){this.overrunCooldown=0,this.liftBoostUntil=0,this.blipUntil=0}onOverrunStart(){this.liftBoostUntil=this.ctx.currentTime+Gt}triggerBlip(){this.blipUntil=this.ctx.currentTime+Kt}blipMultiplier(){return this.ctx.currentTime<this.blipUntil?qt:1}liftBoost(){let e=this.liftBoostUntil-this.ctx.currentTime;return e<=0?1:1+e/Gt*3}updateOverrun(e,t,n,r){if(this.overrunCooldown=Math.max(0,this.overrunCooldown-t),!e||this.overrunCooldown>0||n<=0)return;let i=this.liftBoost();Math.random()>n*i*t*5||(this.overrunCooldown=.05+(1-n)*.1,this.fireBurst(r,.12*n*i,.05))}fireShiftThump(e){this.fireBurst(e,.35,.03)}fireBurst(e,t,n){try{let r=this.ctx.createBufferSource();r.buffer=this.burstBuffer;let i=this.ctx.createBiquadFilter();i.type=`bandpass`,i.frequency.value=1200+Math.random()*1800,i.Q.value=1.5;let a=this.ctx.createGain(),o=this.ctx.currentTime;a.gain.setValueAtTime(1e-4,o),a.gain.exponentialRampToValueAtTime(Math.max(5e-4,t),o+n*.2),a.gain.exponentialRampToValueAtTime(1e-4,o+n+.1),r.connect(i).connect(a).connect(e),r.start(o),r.stop(o+n+.15),r.onended=()=>{try{r.disconnect(),i.disconnect(),a.disconnect()}catch{}}}catch{}}},Yt=e=>e,Xt=e=>Array.from({length:e},()=>({mult:1,amp:1})),Zt={i4:Yt({pulsesPerRev:2,firePattern:Xt(2),attackMs:1,decayMs:7,jitterIdle:.05,jitterHigh:.025,exhaustFundamentalHz:130,bodyResonanceHz:280,filterBaseHz:800,filterRpmHz:3.2,filterThrottleHz:2200,saturation:.22,intakeBaseHz:650,turbo:!0,overrunCrackle:.35,valvetrainTick:.35,hybridWhine:!1,supercharger:!1}),i6:Yt({pulsesPerRev:3,firePattern:Xt(3),attackMs:1,decayMs:8,jitterIdle:.045,jitterHigh:.02,exhaustFundamentalHz:115,bodyResonanceHz:260,filterBaseHz:900,filterRpmHz:3,filterThrottleHz:2400,saturation:.19,intakeBaseHz:700,turbo:!1,overrunCrackle:.25,valvetrainTick:.3,hybridWhine:!1,supercharger:!1}),v6:Yt({pulsesPerRev:3,firePattern:[{mult:.92,amp:1.05},{mult:1.08,amp:.95},{mult:1,amp:1}],attackMs:1,decayMs:7,jitterIdle:.05,jitterHigh:.025,exhaustFundamentalHz:105,bodyResonanceHz:250,filterBaseHz:750,filterRpmHz:3.3,filterThrottleHz:2100,saturation:.25,intakeBaseHz:680,turbo:!0,overrunCrackle:.3,valvetrainTick:.3,hybridWhine:!1,supercharger:!1}),v8:Yt({pulsesPerRev:4,firePattern:[{mult:.72,amp:1.15},{mult:1.28,amp:.85},{mult:.82,amp:1.1},{mult:1.18,amp:.9}],attackMs:1.2,decayMs:11,jitterIdle:.06,jitterHigh:.03,exhaustFundamentalHz:85,bodyResonanceHz:230,filterBaseHz:700,filterRpmHz:3.6,filterThrottleHz:2600,saturation:.32,intakeBaseHz:620,turbo:!1,overrunCrackle:.6,valvetrainTick:.4,hybridWhine:!1,supercharger:!0}),rotary:Yt({pulsesPerRev:3,firePattern:Xt(3),attackMs:2,decayMs:12,jitterIdle:.03,jitterHigh:.015,exhaustFundamentalHz:140,bodyResonanceHz:320,filterBaseHz:1e3,filterRpmHz:2.8,filterThrottleHz:2e3,saturation:.14,intakeBaseHz:750,turbo:!1,overrunCrackle:.15,valvetrainTick:0,hybridWhine:!1,supercharger:!1}),flat6:Yt({pulsesPerRev:3,firePattern:[{mult:.95,amp:1.05},{mult:1.05,amp:.95},{mult:1,amp:1}],attackMs:1,decayMs:9,jitterIdle:.05,jitterHigh:.025,exhaustFundamentalHz:100,bodyResonanceHz:240,filterBaseHz:850,filterRpmHz:3.1,filterThrottleHz:2300,saturation:.2,intakeBaseHz:700,turbo:!1,overrunCrackle:.5,valvetrainTick:.3,hybridWhine:!1,supercharger:!1}),v8hybrid:Yt({pulsesPerRev:4,firePattern:[{mult:.8,amp:1.1},{mult:1.2,amp:.9},{mult:.85,amp:1.05},{mult:1.15,amp:.95}],attackMs:1.1,decayMs:10,jitterIdle:.055,jitterHigh:.028,exhaustFundamentalHz:90,bodyResonanceHz:235,filterBaseHz:700,filterRpmHz:3.4,filterThrottleHz:2400,saturation:.25,intakeBaseHz:640,turbo:!1,overrunCrackle:.55,valvetrainTick:.35,hybridWhine:!0,supercharger:!1})};function Qt(e,t){return Math.max(.5,e/60)*Zt[t].pulsesPerRev}function $t(e,t){let n=Zt[e],r=Math.min(1,Math.max(0,t));return n.jitterIdle+(n.jitterHigh-n.jitterIdle)*r}var en=90,tn=.12,nn=class{ctx;kind=null;preSpatial;exhaust;mech;overrunShift;voiceGain;panner;distGain;distLpf;wasShifting=!1;wasOverrun=!1;lastThrottle=0;lastGear=0;lastDistance=0;constructor(e,t,n){this.ctx=e,this.preSpatial=e.createGain(),this.preSpatial.gain.value=1,this.exhaust=new Vt(e,this.preSpatial,n),this.mech=new Wt(e,this.preSpatial),this.overrunShift=new Jt(e),this.voiceGain=e.createGain(),this.voiceGain.gain.value=0,this.panner=e.createStereoPanner(),this.distGain=e.createGain(),this.distLpf=e.createBiquadFilter(),this.distLpf.type=`lowpass`,this.distLpf.frequency.value=2e4,this.preSpatial.connect(this.voiceGain).connect(this.panner).connect(this.distGain).connect(this.distLpf).connect(t),this.applyPreset(`i4`)}applyPreset(e){if(this.kind===e)return;this.kind=e;let t=Zt[e];this.exhaust.applyPreset(t),this.mech.applyPreset(t)}assign(e){this.applyPreset(e.engine);let t=Qt(e.rpm,e.engine);this.exhaust.setFrequency(t,!0),wt(this.voiceGain.gain,0,this.ctx),this.wasShifting=e.shifting,this.wasOverrun=!1,this.lastThrottle=e.throttle,this.lastGear=e.gear,this.lastDistance=Math.hypot(e.relX,e.relY,e.relZ),this.overrunShift.reset()}update(e,t){this.applyPreset(e.engine);let n=Zt[e.engine],r=Ct(e.rpm/Math.max(1,e.redlineRpm),0,1.3),i=e.throttle<.15&&r>.55;i&&!this.wasOverrun&&this.overrunShift.onOverrunStart(),this.wasOverrun=i;let a=e.isPlayer?1:this.dopplerRatio(e,t),o=Qt(e.rpm,e.engine);this.exhaust.setFrequency(o*a*this.overrunShift.blipMultiplier(),!1),this.exhaust.setJitter($t(e.engine,r));let s=(i?.55:1)*(e.isPlayer?.16:.13);this.exhaust.updateTone(r,e.throttle,i,s),this.mech.update(e,r,o,this.lastThrottle),this.overrunShift.updateOverrun(i,t,n.overrunCrackle,this.exhaust.input()),this.updateShift(e),this.updateSpatial(e),this.lastThrottle=e.throttle,this.lastGear=e.gear}idle(){I(this.voiceGain.gain,0,this.ctx,.25),this.mech.idle()}dopplerRatio(e,t){if(t<=0)return 1;let n=Math.hypot(e.relX,e.relY,e.relZ),r=(this.lastDistance-n)/t;return this.lastDistance=n,1+Ct(r/en,-.12,tn)}updateShift(e){e.shifting&&!this.wasShifting&&(this.exhaust.shiftCut(),this.overrunShift.fireShiftThump(this.exhaust.input()),e.gear<this.lastGear&&this.overrunShift.triggerBlip()),this.wasShifting=e.shifting}updateSpatial(e){let t=At(e.relX,e.relZ,e.isPlayer);I(this.panner.pan,t.pan,this.ctx,.15),I(this.distGain.gain,t.gain,this.ctx,.15),I(this.distLpf.frequency,t.cutoff,this.ctx,.15),I(this.voiceGain.gain,1,this.ctx,.2)}},rn=class{ctx;squealSrc;squealBp;squealGain;grassSrc;grassLp;grassGain;curbSrc;curbBp;curbPulseGain;curbDepthGain;curbLfo;curbShaper;preSpatial;voiceGain;panner;distGain;skid=new jt(0,10);constructor(e,t){this.ctx=e,this.preSpatial=e.createGain(),this.preSpatial.gain.value=1,this.squealSrc=Et(e,1.5,`white`),this.squealBp=e.createBiquadFilter(),this.squealBp.type=`bandpass`,this.squealBp.Q.value=6,this.squealBp.frequency.value=1100,this.squealGain=e.createGain(),this.squealGain.gain.value=0,this.squealSrc.connect(this.squealBp).connect(this.squealGain).connect(this.preSpatial),this.grassSrc=Et(e,1.5,`brown`),this.grassLp=e.createBiquadFilter(),this.grassLp.type=`lowpass`,this.grassLp.frequency.value=220,this.grassGain=e.createGain(),this.grassGain.gain.value=0,this.grassSrc.connect(this.grassLp).connect(this.grassGain).connect(this.preSpatial),this.curbSrc=Et(e,1.5,`white`),this.curbBp=e.createBiquadFilter(),this.curbBp.type=`bandpass`,this.curbBp.frequency.value=150,this.curbBp.Q.value=1.2,this.curbPulseGain=e.createGain(),this.curbPulseGain.gain.value=0,this.curbDepthGain=e.createGain(),this.curbDepthGain.gain.value=0,this.curbLfo=e.createOscillator(),this.curbLfo.type=`sine`,this.curbLfo.frequency.value=2,this.curbShaper=e.createWaveShaper(),this.curbShaper.curve=kt(8),this.curbLfo.connect(this.curbShaper).connect(this.curbPulseGain.gain),this.curbLfo.start(),this.curbSrc.connect(this.curbBp).connect(this.curbPulseGain).connect(this.curbDepthGain).connect(this.preSpatial),this.voiceGain=e.createGain(),this.voiceGain.gain.value=0,this.panner=e.createStereoPanner(),this.distGain=e.createGain(),this.preSpatial.connect(this.voiceGain).connect(this.panner).connect(this.distGain).connect(t)}assign(e){this.skid.reset(e.skid)}update(e,t){let n=this.skid.update(e.skid,t),r=e.speed>3;I(this.squealBp.frequency,Ct(900+n*300+e.speed*5,900,1400),this.ctx,.08),I(this.squealGain.gain,r?n*.5:0,this.ctx,.08),I(this.grassGain.gain,e.onGrass?Ct(e.speed/25,0,1)*.35:0,this.ctx,.15),I(this.curbLfo.frequency,Ct(e.speed/2,.5,10),this.ctx,.1),I(this.curbDepthGain.gain,e.onCurb?Ct(e.speed/20,.15,1)*.4:0,this.ctx,.06);let i=At(e.relX,e.relZ,e.isPlayer);I(this.panner.pan,i.pan,this.ctx,.15),I(this.distGain.gain,i.gain,this.ctx,.15),I(this.voiceGain.gain,1,this.ctx,.2)}idle(){I(this.voiceGain.gain,0,this.ctx,.25)}},an=4,on=class{core;playerSlot;otherSlots=[];constructor(e){this.core=e;let t=Rt(e.ctx);this.playerSlot=this.makeSlot(t);for(let e=0;e<an;e++)this.otherSlots.push(this.makeSlot(t))}makeSlot(e){return{carId:null,engine:new nn(this.core.ctx,this.core.raceEngineGain,e),tyre:new rn(this.core.ctx,this.core.raceLoopGain)}}update(e,t){let n=e.find(e=>e.isPlayer)??null;this.updatePlayer(n,t);let r=e.filter(e=>!e.isPlayer).map(e=>({c:e,d:Math.hypot(e.relX,e.relZ)})).sort((e,t)=>e.d-t.d).slice(0,an);this.freeStaleSlots(r.map(e=>e.c.id)),this.assignNewcomers(r.map(e=>e.c)),this.updateAssignedOthers(r.map(e=>e.c),t)}updatePlayer(e,t){let n=this.playerSlot;if(!e){n.engine.idle(),n.tyre.idle(),n.carId=null;return}n.carId!==e.id&&(n.carId=e.id,n.engine.assign(e),n.tyre.assign(e)),n.engine.update(e,t),n.tyre.update(e,t)}freeStaleSlots(e){let t=new Set(e);for(let e of this.otherSlots)e.carId!==null&&!t.has(e.carId)&&(e.carId=null,e.engine.idle(),e.tyre.idle())}assignNewcomers(e){for(let t of e){if(this.otherSlots.some(e=>e.carId===t.id))continue;let e=this.otherSlots.find(e=>e.carId===null);e&&(e.carId=t.id,e.engine.assign(t),e.tyre.assign(t))}}updateAssignedOthers(e,t){for(let n of this.otherSlots){if(n.carId===null)continue;let r=e.find(e=>e.id===n.carId);r&&(n.engine.update(r,t),n.tyre.update(r,t))}}},sn=.08,cn=class{ctx;lastPlay=-1/0;panner;distGain;burstBuffer;constructor(e,t){this.ctx=e,this.panner=e.createStereoPanner(),this.distGain=e.createGain(),this.panner.connect(this.distGain).connect(t),this.burstBuffer=Tt(e,1,`white`)}play(e,t,n){let r=this.ctx.currentTime;if(r-this.lastPlay<sn)return;this.lastPlay=r;let i=Ct(e,0,1.5),a=Math.hypot(t,n);I(this.panner.pan,Ct(t/20,-1,1),this.ctx,.01),I(this.distGain.gain,1/(1+a/15),this.ctx,.01),this.burstSweep(i),this.burstThump(i),this.burstPartials(i)}burstSweep(e){let t=this.ctx.createBufferSource();t.buffer=this.burstBuffer;let n=this.ctx.createBiquadFilter();n.type=`bandpass`,n.Q.value=2.5;let r=this.ctx.createGain(),i=this.ctx.currentTime;n.frequency.setValueAtTime(3200,i),n.frequency.exponentialRampToValueAtTime(500,i+.18),r.gain.setValueAtTime(1e-4,i),r.gain.exponentialRampToValueAtTime(Math.max(.001,.5*e),i+.008),r.gain.exponentialRampToValueAtTime(1e-4,i+.22),t.connect(n).connect(r).connect(this.panner),t.start(i),t.stop(i+.3),t.onended=()=>this.safeDisconnect(t,n,r)}burstThump(e){let t=this.ctx.createOscillator();t.type=`sine`;let n=this.ctx.createGain(),r=this.ctx.currentTime;t.frequency.setValueAtTime(60+Math.random()*30,r),n.gain.setValueAtTime(1e-4,r),n.gain.exponentialRampToValueAtTime(Math.max(.001,.6*e),r+.01),n.gain.exponentialRampToValueAtTime(1e-4,r+.2),t.connect(n).connect(this.panner),t.start(r),t.stop(r+.25),t.onended=()=>this.safeDisconnect(t,n)}burstPartials(e){let t=this.ctx.currentTime;for(let n of[1200,1850,2600]){let r=this.ctx.createOscillator();r.type=`triangle`,r.frequency.value=n*(1+(Math.random()-.5)*.05);let i=this.ctx.createGain();i.gain.setValueAtTime(1e-4,t),i.gain.exponentialRampToValueAtTime(Math.max(.001,.15*e),t+.005),i.gain.exponentialRampToValueAtTime(1e-4,t+.1),r.connect(i).connect(this.panner),r.start(t),r.stop(t+.15),r.onended=()=>this.safeDisconnect(r,i)}}safeDisconnect(...e){for(let t of e)try{t.disconnect()}catch{}}},ln=class{ctx;gain;constructor(e,t){this.ctx=e;let n=Et(e,1,`white`),r=e.createBiquadFilter();r.type=`bandpass`,r.frequency.value=1e3,r.Q.value=.8,this.gain=e.createGain(),this.gain.gain.value=0,n.connect(r).connect(this.gain).connect(t)}play(e){let t=this.ctx.currentTime,n=this.gain.gain;try{let r=n.value;n.cancelScheduledValues(t),n.setValueAtTime(r,t),n.setTargetAtTime(Ct(e,0,1)*.5,t,.04),n.setTargetAtTime(0,t+.15,.2)}catch{}}},un=class{ctx;gain;filter;constructor(e,t){this.ctx=e;let n=Et(e,2,`white`);this.filter=e.createBiquadFilter(),this.filter.type=`lowpass`,this.filter.frequency.value=300,this.gain=e.createGain(),this.gain.gain.value=0,n.connect(this.filter).connect(this.gain).connect(t)}update(e){let t=Ct((e-20)/25,0,1);I(this.filter.frequency,250+e*20,this.ctx,.2),I(this.gain.gain,t*.3,this.ctx,.3)}idle(){I(this.gain.gain,0,this.ctx,.3)}},dn=60/84,fn=4,pn=4,mn=.15,hn=50,gn=1.5,_n=[-4,0,3,7],vn=[_n,[0,3,7,10],[-7,-4,0,3],[-2,-1,5,8]],yn=[-16,-12,-19,-14],bn=e=>440*2**(e/12);function xn(e){let t=e>>>0;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}var Sn=class{ctx;out;padGain;padFilter;padOscs=[];lfo;hatBuffer;rand=xn(1337);on=!1;timer=null;nextNoteTime=0;beatIndex=0;lastChordBlock=-1;constructor(e,t){this.ctx=e,this.out=e.createGain(),this.out.gain.value=0,this.out.connect(t),this.padFilter=e.createBiquadFilter(),this.padFilter.type=`lowpass`,this.padFilter.frequency.value=900,this.padGain=e.createGain(),this.padGain.gain.value=.18,this.padFilter.connect(this.padGain).connect(this.out),this.padOscs=_n.slice(0,3).map((e,t)=>this.buildPadOsc(e,t)),this.lfo=e.createOscillator(),this.lfo.type=`sine`,this.lfo.frequency.value=.07;let n=e.createGain();n.gain.value=260,this.lfo.connect(n).connect(this.padFilter.frequency),this.lfo.start(),this.hatBuffer=Tt(e,.05,`white`)}buildPadOsc(e,t){let n=this.ctx.createOscillator();return n.type=`triangle`,n.frequency.value=bn(e-12),n.detune.value=(t-1)*5,n.connect(this.padFilter),n.start(),n}setOn(e){e!==this.on&&(this.on=e,e?this.start():this.stop())}start(){I(this.out.gain,1,this.ctx,gn/3),this.nextNoteTime=this.ctx.currentTime+.05,this.beatIndex=0,this.lastChordBlock=-1,this.timer===null&&(this.timer=setInterval(()=>this.scheduler(),hn))}stop(){I(this.out.gain,0,this.ctx,gn/3),this.timer!==null&&(clearInterval(this.timer),this.timer=null)}scheduler(){let e=this.ctx.currentTime+mn;for(;this.nextNoteTime<e;)this.scheduleBeat(this.nextNoteTime,this.beatIndex),this.nextNoteTime+=dn,this.beatIndex++}scheduleBeat(e,t){let n=Math.floor(t/fn),r=t%fn,i=Math.floor(n/pn)%vn.length,a=vn[i];r===0&&(this.playBass(yn[i],e),i!==this.lastChordBlock&&(this.lastChordBlock=i,this.padOscs.forEach((e,t)=>I(e.frequency,bn(a[t]-12),this.ctx,1.2)))),this.playHihat(e+dn*.5),this.rand()>.25&&this.playArpNote(a,e+this.rand()*dn*.4)}playBass(e,t){let n=this.ctx.createOscillator();n.type=`sine`,n.frequency.value=bn(e);let r=this.ctx.createGain();r.gain.setValueAtTime(1e-4,t),r.gain.exponentialRampToValueAtTime(.16,t+.15),r.gain.exponentialRampToValueAtTime(1e-4,t+dn*1.8),n.connect(r).connect(this.out),n.start(t),n.stop(t+dn*2),n.onended=()=>this.cleanup(n,r)}playArpNote(e,t){let n=bn(e[Math.floor(this.rand()*e.length)]+(this.rand()>.8?12:0)),r=this.ctx.createGain();r.gain.setValueAtTime(1e-4,t),r.gain.exponentialRampToValueAtTime(.07,t+.008),r.gain.exponentialRampToValueAtTime(1e-4,t+.7);let i=[1,2,3].map(e=>this.arpPartial(n*e,1/e,t,r));r.connect(this.out);let a=t+.75;i.forEach(e=>{e.stop(a),e.onended=()=>this.cleanup(e)})}arpPartial(e,t,n,r){let i=this.ctx.createOscillator();i.type=`sine`,i.frequency.value=e;let a=this.ctx.createGain();return a.gain.value=Ct(t,0,1),i.connect(a).connect(r),i.start(n),i}playHihat(e){let t=this.ctx.createBufferSource();t.buffer=this.hatBuffer;let n=this.ctx.createBiquadFilter();n.type=`highpass`,n.frequency.value=6e3;let r=this.ctx.createGain();r.gain.setValueAtTime(1e-4,e),r.gain.exponentialRampToValueAtTime(.03,e+.003),r.gain.exponentialRampToValueAtTime(1e-4,e+.04),t.connect(n).connect(r).connect(this.out),t.start(e),t.stop(e+.05),t.onended=()=>this.cleanup(t,n,r)}cleanup(...e){for(let t of e)try{t.disconnect()}catch{}}},Cn=200,wn=1.5,Tn=class{ctx;out;crowdGain;paTimer=null;nextPaAt=0;on=!1;constructor(e,t){this.ctx=e,this.out=e.createGain(),this.out.gain.value=0,this.out.connect(t);let n=Et(e,3,`white`),r=e.createBiquadFilter();r.type=`bandpass`,r.frequency.value=700,r.Q.value=.6,this.crowdGain=e.createGain(),this.crowdGain.gain.value=.05,n.connect(r).connect(this.crowdGain).connect(this.out);let i=e.createOscillator();i.type=`sine`,i.frequency.value=.11;let a=e.createGain();a.gain.value=.02,i.connect(a).connect(this.crowdGain.gain),i.start()}setOn(e){e!==this.on&&(this.on=e,I(this.out.gain,+!!e,this.ctx,wn/3),e?this.startPaScheduler():this.stopPaScheduler())}startPaScheduler(){this.nextPaAt=this.ctx.currentTime+3+Math.random()*8,this.paTimer===null&&(this.paTimer=setInterval(()=>this.tick(),Cn))}stopPaScheduler(){this.paTimer!==null&&(clearInterval(this.paTimer),this.paTimer=null)}tick(){this.ctx.currentTime<this.nextPaAt||(this.playPaBurst(),this.nextPaAt=this.ctx.currentTime+6+Math.random()*12)}playPaBurst(){let e=this.ctx.createOscillator();e.type=`square`;let t=320+Math.random()*260,n=this.ctx.createBiquadFilter();n.type=`bandpass`,n.frequency.value=t*2,n.Q.value=3;let r=this.ctx.createGain(),i=this.ctx.createStereoPanner();i.pan.value=Ct((Math.random()-.5)*2,-1,1);let a=this.ctx.currentTime,o=.4+Math.random()*.6;e.frequency.setValueAtTime(t,a),r.gain.setValueAtTime(1e-4,a),r.gain.exponentialRampToValueAtTime(.02,a+.05),r.gain.exponentialRampToValueAtTime(1e-4,a+o),e.connect(n).connect(r).connect(i).connect(this.out),e.start(a),e.stop(a+o+.05),e.onended=()=>this.cleanup(e,n,r,i)}cleanup(...e){for(let t of e)try{t.disconnect()}catch{}}};function En(e,t,n){try{switch(n){case`move`:return Dn(e,t,880,.03,.06,`sine`);case`confirm`:return On(e,t,660,990,.08);case`back`:return On(e,t,660,440,.08);case`buy`:return kn(e,t,[523,659,784,1047]);case`error`:return An(e,t);case`countdown`:return Dn(e,t,880,.12,.12,`sine`);case`go`:return Dn(e,t,1760,.5,.16,`triangle`)}}catch{}}function Dn(e,t,n,r,i,a){let o=e.createOscillator();o.type=a,o.frequency.value=n;let s=e.createGain(),c=e.currentTime;s.gain.setValueAtTime(1e-4,c),s.gain.exponentialRampToValueAtTime(i,c+Math.min(.015,r*.2)),s.gain.exponentialRampToValueAtTime(1e-4,c+r),o.connect(s).connect(t),o.start(c),o.stop(c+r+.02),o.onended=()=>jn(o,s)}function On(e,t,n,r,i){Dn(e,t,n,.06,i,`sine`);let a=e.createOscillator();a.type=`sine`;let o=e.createGain(),s=e.currentTime+.06;a.frequency.value=r,o.gain.setValueAtTime(1e-4,s),o.gain.exponentialRampToValueAtTime(i,s+.015),o.gain.exponentialRampToValueAtTime(1e-4,s+.09),a.connect(o).connect(t),a.start(s),a.stop(s+.12),a.onended=()=>jn(a,o)}function kn(e,t,n){n.forEach((n,r)=>{let i=e.createOscillator();i.type=`triangle`,i.frequency.value=n;let a=e.createGain(),o=e.currentTime+r*.07;a.gain.setValueAtTime(1e-4,o),a.gain.exponentialRampToValueAtTime(.09,o+.01),a.gain.exponentialRampToValueAtTime(1e-4,o+.22),i.connect(a).connect(t),i.start(o),i.stop(o+.25),i.onended=()=>jn(i,a)})}function An(e,t){let n=e.createBufferSource();n.buffer=Tt(e,.3,`white`);let r=e.createBiquadFilter();r.type=`lowpass`,r.frequency.value=220;let i=e.createGain(),a=e.currentTime;i.gain.setValueAtTime(1e-4,a),i.gain.exponentialRampToValueAtTime(.12,a+.02),i.gain.exponentialRampToValueAtTime(1e-4,a+.28),n.connect(r).connect(i).connect(t),n.start(a),n.stop(a+.3),n.onended=()=>jn(n,r,i)}function jn(...e){for(let t of e)try{t.disconnect()}catch{}}var Mn={master:1,engine:1,effects:1,music:1},Nn=.15,Pn=.3;function Fn(){return{core:null,pool:null,collisionFx:null,scrapeFx:null,windFx:null,menuMusic:null,ambience:null,settings:{...Mn},raceActive:!0}}function In(e){if(e.core)return e.core;let t=St();return t?(e.core=t,e.pool=new on(t),e.collisionFx=new cn(t.ctx,t.effectsBus),e.scrapeFx=new ln(t.ctx,t.effectsBus),e.windFx=new un(t.ctx,t.raceLoopGain),e.menuMusic=new Sn(t.ctx,t.musicBus),e.ambience=new Tn(t.ctx,t.raceLoopGain),Ln(t,e.settings),Rn(t,e.raceActive),t):null}function Ln(e,t){I(e.masterGain.gain,Ct(t.master,0,1.5),e.ctx,Nn),I(e.engineBus.gain,Ct(t.engine,0,1.5),e.ctx,Nn),I(e.effectsBus.gain,Ct(t.effects,0,1.5),e.ctx,Nn),I(e.musicBus.gain,Ct(t.music,0,1.5),e.ctx,Nn)}function Rn(e,t){I(e.raceEngineGain.gain,+!!t,e.ctx,Pn),I(e.raceLoopGain.gain,+!!t,e.ctx,Pn)}var zn=3500;function Bn(e,t,n){if(!e.core||!e.pool)return;e.pool.update(t,n);let r=t.find(e=>e.isPlayer);if(r){e.windFx?.update(r.speed);let t=zn+r.throttle*1e3;I(e.core.engineLowpass.frequency,t,e.core.ctx,.15)}else e.windFx?.idle()}function Vn(){let e=Fn();return{async resume(){let t=In(e);if(t)try{await t.ctx.resume()}catch{}},setSettings(t){e.settings=t,e.core&&Ln(e.core,t)},updateCars(t,n){Bn(e,t,n)},playCollision(t,n,r){e.collisionFx?.play(t,n,r)},playWallScrape(t){e.scrapeFx?.play(t)},playUi(t){e.core&&En(e.core.ctx,e.core.effectsBus,t)},setMenuMusic(t){e.menuMusic?.setOn(t)},setRaceAmbience(t){e.ambience?.setOn(t)},setRaceActive(t){e.raceActive=t,e.core&&Rn(e.core,t)},__audioDebugAnalyser(){return e.core?.analyser??null}}}var L=(...e)=>e.map(([e,t])=>({rpm:e,nm:t})),R={cgHeightM:.48,reverseRatio:3.4,suspensionTravelM:.16,steerLockDeg:34,frontTorqueSplit:0},Hn=[{...R,id:`sakura_86`,name:`Sakura Levin 86 '85`,maker:`Sakura`,year:1985,country:`Japan`,carClass:`N100`,priceCr:22e3,description:`The lightweight rear-drive coupe that taught a generation to drift. 128 hp of high-revving twin-cam and a chassis that talks to you.`,model:`sakura_86.glb`,defaultColor:`#f2f2f2`,colors:[`#f2f2f2`,`#1a1a1a`,`#c8102e`,`#2c5aa0`,`#d9c98a`],massKg:970,frontWeightBias:.53,drivetrain:`FR`,lengthM:4.18,widthM:1.63,heightM:1.34,wheelbaseM:2.4,trackM:1.36,wheelRadiusM:.29,torqueCurve:L([1e3,95],[2500,125],[4e3,142],[5200,150],[6600,140],[7500,118],[7800,90]),idleRpm:900,redlineRpm:7600,gearRatios:[3.58,2.02,1.38,1,.86],finalDrive:4.3,dragCd:.36,frontalAreaM2:1.85,downforceFront:0,downforceRear:.02,springFront:24e3,springRear:21e3,damperFront:1900,damperRear:1700,antiRollFront:9e3,antiRollRear:5e3,brakeTorqueNm:3400,brakeBias:.62,tyreGrip:1,tyres:`comfort`,engine:`i4`},{...R,id:`hakone_beat`,name:`Hakone Beat Sports '91`,maker:`Hakone`,year:1991,country:`Japan`,carClass:`N100`,priceCr:14e3,description:`A mid-engined kei roadster with a screaming three-cylinder that wants 8000 rpm for breakfast. Barely faster than traffic in a straight line, and more fun than almost anything else at any speed.`,model:`small_roadster.glb`,defaultColor:`#f5d000`,colors:[`#f5d000`,`#e8e8e8`,`#c8102e`,`#1a1a1a`],massKg:760,frontWeightBias:.44,drivetrain:`MR`,lengthM:3.75,widthM:1.4,heightM:1.19,wheelbaseM:2.28,trackM:1.22,wheelRadiusM:.27,torqueCurve:L([1140,42],[2180,58],[3580,71],[4970,77],[6360,72],[7400,60],[8100,48]),idleRpm:950,redlineRpm:8100,gearRatios:[3.35,2.41,1.74,1.25,.9],finalDrive:4.1,dragCd:.34,frontalAreaM2:1.65,downforceFront:0,downforceRear:.02,springFront:19e3,springRear:16720,damperFront:1508,damperRear:1327,antiRollFront:7030,antiRollRear:4013,brakeTorqueNm:2698,brakeBias:.58,tyreGrip:.977,tyres:`comfort`,engine:`i4`,cgHeightM:.46,steerLockDeg:33},{...R,id:`minor_cooper_s`,name:`Minor Cooper S 1275 '71`,maker:`Minor`,year:1971,country:`UK`,carClass:`N100`,priceCr:12e3,description:`Go-kart proportions and a stiff little four-speed that snaps between corners. What it lacks in a straight line it makes up for by refusing to lift, ever.`,model:`compact_hatch.glb`,defaultColor:`#d6d6d6`,colors:[`#d6d6d6`,`#1a1a1a`,`#0f3d91`,`#c8102e`],massKg:700,frontWeightBias:.62,drivetrain:`FF`,lengthM:3.85,widthM:1.54,heightM:1.34,wheelbaseM:2.29,trackM:1.27,wheelRadiusM:.25,torqueCurve:L([1020,60],[1890,81],[3040,100],[4200,109],[5360,101],[6220,85],[6800,67]),idleRpm:850,redlineRpm:6800,gearRatios:[3.53,2.32,1.52,1],finalDrive:3.9,dragCd:.42,frontalAreaM2:1.55,downforceFront:0,downforceRear:.01,springFront:17500,springRear:15400,damperFront:1389,damperRear:1222,antiRollFront:6475,antiRollRear:3696,brakeTorqueNm:2485,brakeBias:.6,tyreGrip:.876,tyres:`comfort`,engine:`i4`,cgHeightM:.46,steerLockDeg:33},{...R,id:`diamond_starion`,name:`Diamond Starion GSR-VR '88`,maker:`Diamond`,year:1988,country:`Japan`,carClass:`N100`,priceCr:19e3,description:`A turbocharged, balloon-fendered coupe that trades finesse for boost. The turbo lag builds tension right up to the moment it lets go.`,model:`kaizen_rx7.glb`,defaultColor:`#7a1620`,colors:[`#7a1620`,`#1a1a1a`,`#d6d6d6`,`#0f3d91`],massKg:1300,frontWeightBias:.56,drivetrain:`FR`,lengthM:4.36,widthM:1.69,heightM:1.32,wheelbaseM:2.43,trackM:1.44,wheelRadiusM:.31,torqueCurve:L([1020,145],[1920,215],[3110,234],[4310,234],[5510,215],[6400,187],[7e3,159]),idleRpm:850,redlineRpm:7e3,gearRatios:[3.45,2.43,1.71,1.21,.85],finalDrive:3.9,dragCd:.34,frontalAreaM2:1.95,downforceFront:.02,downforceRear:.05,springFront:32500,springRear:28600,damperFront:2579,damperRear:2270,antiRollFront:12025,antiRollRear:6864,brakeTorqueNm:4615,brakeBias:.61,tyreGrip:1.042,tyres:`sport`,engine:`i4`,cgHeightM:.46,steerLockDeg:33},{...R,id:`volks_scirocco`,name:`Volks Scirocco GTX '81`,maker:`Volks`,year:1981,country:`Germany`,carClass:`N100`,priceCr:13500,description:`A wedge-nosed hatch coupe with just enough power to make its light weight matter. Honest, chuckable, and happiest right at redline.`,model:`compact_hatch.glb`,defaultColor:`#c46a1f`,colors:[`#c46a1f`,`#1a1a1a`,`#e8e8e8`,`#0f3d91`],massKg:950,frontWeightBias:.6,drivetrain:`FF`,lengthM:3.9,widthM:1.64,heightM:1.32,wheelbaseM:2.4,trackM:1.38,wheelRadiusM:.28,torqueCurve:L([1020,89],[1860,121],[2970,149],[4090,162],[5210,150],[6040,126],[6600,100]),idleRpm:850,redlineRpm:6600,gearRatios:[3.45,2.44,1.73,1.23,.87],finalDrive:3.94,dragCd:.38,frontalAreaM2:1.78,downforceFront:0,downforceRear:.02,springFront:23750,springRear:20900,damperFront:1885,damperRear:1659,antiRollFront:8788,antiRollRear:5016,brakeTorqueNm:3373,brakeBias:.6,tyreGrip:1.046,tyres:`comfort`,engine:`i4`,cgHeightM:.46,steerLockDeg:33},{...R,id:`pleiades_leone_rx`,name:`Pleiades Leone RX '83`,maker:`Pleiades`,year:1983,country:`Japan`,carClass:`N100`,priceCr:15500,description:`A boxy turbocharged coupe with a flat-four burble and enough ground clearance to shrug off a gravel car park. Understated until the boost gauge climbs.`,model:`sport_notch.glb`,defaultColor:`#3a5a3a`,colors:[`#3a5a3a`,`#e8e8e8`,`#1a1a1a`],massKg:980,frontWeightBias:.58,drivetrain:`FF`,lengthM:4.42,widthM:1.65,heightM:1.39,wheelbaseM:2.52,trackM:1.4,wheelRadiusM:.29,torqueCurve:L([1020,93],[1840,138],[2940,150],[4030,150],[5130,138],[5950,120],[6500,102]),idleRpm:850,redlineRpm:6500,gearRatios:[3.5,2.48,1.75,1.24,.88],finalDrive:3.9,dragCd:.39,frontalAreaM2:1.9,downforceFront:0,downforceRear:.02,springFront:24500,springRear:21560,damperFront:1944,damperRear:1711,antiRollFront:9065,antiRollRear:5174,brakeTorqueNm:3479,brakeBias:.6,tyreGrip:1.035,tyres:`comfort`,engine:`flat6`,cgHeightM:.46,steerLockDeg:33},{...R,id:`norfolk_elan`,name:`Norfolk Elan Sprint '71`,maker:`Norfolk`,year:1971,country:`UK`,carClass:`N100`,priceCr:17e3,description:`A fibreglass-bodied roadster built around the old rule: add lightness. At 700 kg even modest power feels urgent.`,model:`small_roadster.glb`,defaultColor:`#1f6b3a`,colors:[`#1f6b3a`,`#c8102e`,`#e8e8e8`,`#1a1a1a`],massKg:700,frontWeightBias:.48,drivetrain:`FR`,lengthM:3.85,widthM:1.53,heightM:1.18,wheelbaseM:2.14,trackM:1.27,wheelRadiusM:.27,torqueCurve:L([1080,99],[1940,135],[3080,165],[4230,180],[5370,167],[6230,140],[6800,111]),idleRpm:900,redlineRpm:6800,gearRatios:[3.3,2.35,1.67,1.19,.85],finalDrive:3.9,dragCd:.36,frontalAreaM2:1.5,downforceFront:0,downforceRear:.02,springFront:17500,springRear:15400,damperFront:1389,damperRear:1222,antiRollFront:6475,antiRollRear:3696,brakeTorqueNm:2485,brakeBias:.58,tyreGrip:1.033,tyres:`sport`,engine:`i4`,cgHeightM:.46,steerLockDeg:33}],Un=[{...R,id:`kaizen_roadster`,name:`Kaizen Roadster VS '99`,maker:`Kaizen`,year:1999,country:`Japan`,carClass:`N200`,priceCr:24e3,description:`The default answer to 'what's the purest way to spend a Sunday'. Front-engined, rear-driven, and tuned to slide progressively the moment you ask.`,model:`small_roadster.glb`,defaultColor:`#c8102e`,colors:[`#c8102e`,`#1a1a1a`,`#e8e8e8`,`#0f3d91`,`#f0d000`],massKg:990,frontWeightBias:.5,drivetrain:`FR`,lengthM:3.97,widthM:1.68,heightM:1.23,wheelbaseM:2.27,trackM:1.44,wheelRadiusM:.29,torqueCurve:L([1080,104],[2e3,142],[3220,174],[4450,189],[5670,176],[6590,147],[7200,117]),idleRpm:900,redlineRpm:7200,gearRatios:[3.6,2.52,1.77,1.24,.87],finalDrive:4.1,dragCd:.35,frontalAreaM2:1.8,downforceFront:.01,downforceRear:.05,springFront:27720,springRear:24750,damperFront:2100,damperRear:1875,antiRollFront:11088,antiRollRear:6930,suspensionTravelM:.15,brakeTorqueNm:3812,brakeBias:.58,tyreGrip:1.114,tyres:`sport`,engine:`i4`,cgHeightM:.44,steerLockDeg:32},{...R,id:`swift_works_gti`,name:`Swift Works GTi '89`,maker:`Swift Works`,year:1989,country:`Japan`,carClass:`N200`,priceCr:17500,description:`A featherweight hatch with just 100 hp, but at 850 kg every one of them matters. Point it at an apex and it simply goes there.`,model:`compact_hatch.glb`,defaultColor:`#e8e8e8`,colors:[`#e8e8e8`,`#c8102e`,`#1a1a1a`,`#1f6bd6`],massKg:850,frontWeightBias:.62,drivetrain:`FF`,lengthM:3.7,widthM:1.63,heightM:1.34,wheelbaseM:2.32,trackM:1.4,wheelRadiusM:.27,torqueCurve:L([1080,71],[2040,97],[3330,119],[4610,130],[5900,121],[6860,101],[7500,80]),idleRpm:900,redlineRpm:7500,gearRatios:[3.5,2.46,1.73,1.22,.86],finalDrive:4.2,dragCd:.35,frontalAreaM2:1.7,downforceFront:0,downforceRear:.03,springFront:23800,springRear:21250,damperFront:1803,damperRear:1610,antiRollFront:9520,antiRollRear:5950,suspensionTravelM:.15,brakeTorqueNm:3273,brakeBias:.6,tyreGrip:1.058,tyres:`sport`,engine:`i4`,cgHeightM:.44,steerLockDeg:32},{...R,id:`alpage_a110`,name:`Alpage A110 Berlinette '73`,maker:`Alpage`,year:1973,country:`France`,carClass:`N200`,priceCr:26e3,description:`A rear-engined French mountain-road specialist wrapped in aluminium panels over a backbone chassis. Delicate on the outside, ferocious on a hairpin.`,model:`small_roadster.glb`,defaultColor:`#1e4fa3`,colors:[`#1e4fa3`,`#e8e8e8`,`#c8102e`],massKg:720,frontWeightBias:.42,drivetrain:`MR`,lengthM:4.05,widthM:1.58,heightM:1.13,wheelbaseM:2.1,trackM:1.3,wheelRadiusM:.27,torqueCurve:L([1080,101],[2010,138],[3260,169],[4500,184],[5750,171],[6680,143],[7300,114]),idleRpm:900,redlineRpm:7300,gearRatios:[3.4,2.4,1.69,1.19,.84],finalDrive:4,dragCd:.32,frontalAreaM2:1.55,downforceFront:0,downforceRear:.03,springFront:20160,springRear:18e3,damperFront:1527,damperRear:1364,antiRollFront:8064,antiRollRear:5040,suspensionTravelM:.15,brakeTorqueNm:2772,brakeBias:.56,tyreGrip:1.047,tyres:`sport`,engine:`i4`,cgHeightM:.44,steerLockDeg:32},{...R,id:`losange_clio_williams`,name:`Losange Clio Williams '93`,maker:`Losange`,year:1993,country:`France`,carClass:`N200`,priceCr:21e3,description:`A homologation hot hatch with flared arches and a free-revving 2.0. Built in a limited run, driven like there's no tomorrow.`,model:`compact_hatch.glb`,defaultColor:`#f5d000`,colors:[`#f5d000`,`#1a1a1a`,`#e8e8e8`],massKg:980,frontWeightBias:.62,drivetrain:`FF`,lengthM:3.71,widthM:1.66,heightM:1.38,wheelbaseM:2.47,trackM:1.42,wheelRadiusM:.28,torqueCurve:L([1080,110],[2e3,150],[3220,184],[4450,200],[5670,186],[6590,156],[7200,124]),idleRpm:900,redlineRpm:7200,gearRatios:[3.5,2.47,1.74,1.23,.87],finalDrive:3.9,dragCd:.34,frontalAreaM2:1.85,downforceFront:0,downforceRear:.04,springFront:27440,springRear:24500,damperFront:2079,damperRear:1856,antiRollFront:10976,antiRollRear:6860,suspensionTravelM:.15,brakeTorqueNm:3773,brakeBias:.61,tyreGrip:1.11,tyres:`sport`,engine:`i4`,cgHeightM:.44,steerLockDeg:32},{...R,id:`hanul_veloster`,name:`Hanul Veloster Turbo '19`,maker:`Hanul`,year:2019,country:`South Korea`,carClass:`N200`,priceCr:23500,description:`An asymmetric-door hatch with a punchy turbo four and a dual-clutch that bangs off shifts. Quirky styling, straightforward fun.`,model:`compact_hatch.glb`,defaultColor:`#1a1a1a`,colors:[`#1a1a1a`,`#e8e8e8`,`#c8102e`,`#1e4fa3`],massKg:1300,frontWeightBias:.62,drivetrain:`FF`,lengthM:4.24,widthM:1.8,heightM:1.4,wheelbaseM:2.65,trackM:1.55,wheelRadiusM:.31,torqueCurve:L([1020,179],[1880,266],[3030,289],[4170,289],[5320,266],[6180,232],[6750,197]),idleRpm:850,redlineRpm:6750,gearRatios:[3.6,2.61,1.89,1.37,.99,.72],finalDrive:4,dragCd:.32,frontalAreaM2:2.1,downforceFront:.02,downforceRear:.06,springFront:36400,springRear:32500,damperFront:2758,damperRear:2462,antiRollFront:14560,antiRollRear:9100,suspensionTravelM:.15,brakeTorqueNm:5005,brakeBias:.62,tyreGrip:1.15,tyres:`sport`,engine:`i4`,cgHeightM:.44,steerLockDeg:32},{...R,id:`norfolk_elise`,name:`Norfolk Elise S1 '96`,maker:`Norfolk`,year:1996,country:`UK`,carClass:`N200`,priceCr:28e3,description:`A bonded-aluminium tub wrapped in the thinnest possible bodywork. Modest power feels urgent at 725 kg; the steering talks constantly.`,model:`small_roadster.glb`,defaultColor:`#f2f2f2`,colors:[`#f2f2f2`,`#1f6b3a`,`#c8102e`,`#1a1a1a`],massKg:725,frontWeightBias:.4,drivetrain:`MR`,lengthM:3.85,widthM:1.72,heightM:1.15,wheelbaseM:2.3,trackM:1.44,wheelRadiusM:.28,torqueCurve:L([1080,90],[1970,123],[3150,151],[4340,164],[5520,152],[6410,128],[7e3,101]),idleRpm:900,redlineRpm:7e3,gearRatios:[3.4,2.39,1.68,1.18,.83],finalDrive:4,dragCd:.36,frontalAreaM2:1.6,downforceFront:.02,downforceRear:.05,springFront:20300,springRear:18125,damperFront:1538,damperRear:1373,antiRollFront:8120,antiRollRear:5075,suspensionTravelM:.15,brakeTorqueNm:2791,brakeBias:.56,tyreGrip:1.094,tyres:`sport`,engine:`i4`,cgHeightM:.44,steerLockDeg:32},{...R,id:`minor_cooper_s_jcw`,name:`Minor Cooper S JCW '21`,maker:`Minor`,year:2021,country:`UK`,carClass:`N200`,priceCr:34e3,description:`The modern go-kart, grown up but not grown soft. A hot little turbo four and a chassis that still darts where you look.`,model:`compact_hatch.glb`,defaultColor:`#0a4f2e`,colors:[`#0a4f2e`,`#e8e8e8`,`#1a1a1a`,`#f5d000`],massKg:1265,frontWeightBias:.63,drivetrain:`FF`,lengthM:3.87,widthM:1.74,heightM:1.44,wheelbaseM:2.5,trackM:1.52,wheelRadiusM:.31,torqueCurve:L([1020,211],[1840,314],[2940,341],[4030,341],[5130,314],[5950,273],[6500,232]),idleRpm:850,redlineRpm:6500,gearRatios:[3.6,2.59,1.87,1.35,.97,.7],finalDrive:4.05,dragCd:.33,frontalAreaM2:2,downforceFront:.02,downforceRear:.08,springFront:35420,springRear:31625,damperFront:2683,damperRear:2396,antiRollFront:14168,antiRollRear:8855,suspensionTravelM:.15,brakeTorqueNm:4870,brakeBias:.62,tyreGrip:1.15,tyres:`sport`,engine:`i4`,cgHeightM:.44,steerLockDeg:32}],Wn=[{...R,id:`hakone_type_r`,name:`Hakone Civic Type R '22`,maker:`Hakone`,year:2022,country:`Japan`,carClass:`N300`,priceCr:48e3,description:`Front-wheel drive done right: a 2.0 turbo, a mechanical limited-slip and a chassis that hunts apexes. Wing included.`,model:`hakone_type_r.glb`,defaultColor:`#d0d5d8`,colors:[`#d0d5d8`,`#c8102e`,`#1a1a1a`,`#1e5bb8`,`#f5f5f5`],massKg:1430,frontWeightBias:.62,drivetrain:`FF`,lengthM:4.56,widthM:1.88,heightM:1.41,wheelbaseM:2.73,trackM:1.6,wheelRadiusM:.34,torqueCurve:L([1e3,200],[2e3,360],[2600,420],[4500,420],[5500,395],[6500,350],[7e3,300]),idleRpm:850,redlineRpm:7e3,gearRatios:[3.63,2.12,1.53,1.13,.91,.73],finalDrive:4.1,dragCd:.33,frontalAreaM2:2.25,downforceFront:.12,downforceRear:.28,springFront:38e3,springRear:34e3,damperFront:2600,damperRear:2300,antiRollFront:16e3,antiRollRear:14e3,brakeTorqueNm:5600,brakeBias:.64,tyreGrip:1.06,tyres:`sport`,engine:`i4`},{...R,id:`kaizen_rx7`,name:`Kaizen RX-7 Spirit R '02`,maker:`Kaizen`,year:2002,country:`Japan`,carClass:`N300`,priceCr:65e3,description:`Twin-turbo rotary, 1270 kg and near-perfect balance. The last and best of the line; it rewards precision and punishes greed.`,model:`kaizen_rx7.glb`,defaultColor:`#1c2e6e`,colors:[`#1c2e6e`,`#f3f3f3`,`#d21f2b`,`#111111`,`#f0c419`],massKg:1270,frontWeightBias:.5,drivetrain:`FR`,lengthM:4.28,widthM:1.76,heightM:1.23,wheelbaseM:2.43,trackM:1.46,wheelRadiusM:.32,torqueCurve:L([1e3,180],[2500,240],[3500,300],[5e3,314],[6500,305],[7500,275],[8200,230]),idleRpm:800,redlineRpm:8e3,gearRatios:[3.48,2.02,1.39,1,.81],finalDrive:4.3,dragCd:.31,frontalAreaM2:1.9,downforceFront:.04,downforceRear:.1,springFront:34e3,springRear:3e4,damperFront:2400,damperRear:2200,antiRollFront:14e3,antiRollRear:11e3,brakeTorqueNm:5e3,brakeBias:.61,tyreGrip:1.05,tyres:`sport`,engine:`rotary`},{...R,id:`shinsei_silvia`,name:`Shinsei Silvia Spec-R '00`,maker:`Shinsei`,year:2e3,country:`Japan`,carClass:`N300`,priceCr:52e3,description:`A drift icon by reputation: turbocharged, rear-driven, and set up to rotate the instant you lift. The aftermarket built a whole culture around this chassis.`,model:`sport_fastback.glb`,defaultColor:`#0a2f6e`,colors:[`#0a2f6e`,`#e8e8e8`,`#c8102e`,`#1a1a1a`],massKg:1250,frontWeightBias:.55,drivetrain:`FR`,lengthM:4.44,widthM:1.75,heightM:1.29,wheelbaseM:2.53,trackM:1.48,wheelRadiusM:.31,torqueCurve:L([1020,201],[1990,299],[3290,325],[4580,325],[5880,299],[6850,260],[7500,221]),idleRpm:850,redlineRpm:7500,gearRatios:[3.6,2.65,1.95,1.44,1.06,.78],finalDrive:4.1,dragCd:.31,frontalAreaM2:1.95,downforceFront:.05,downforceRear:.14,springFront:37500,springRear:33750,damperFront:2622,damperRear:2360,antiRollFront:15750,antiRollRear:11475,suspensionTravelM:.14,brakeTorqueNm:4938,brakeBias:.62,tyreGrip:1.15,tyres:`sport`,engine:`i4`,cgHeightM:.43,steerLockDeg:31},{...R,id:`hakone_integra_r`,name:`Hakone Integra Type R '01`,maker:`Hakone`,year:2001,country:`Japan`,carClass:`N300`,priceCr:47e3,description:`A naturally aspirated, hand-ported four that doesn't wake up until 6000 rpm and doesn't want to stop until 8400. Front-wheel drive with a limited-slip that actually earns its keep.`,model:`sport_fastback.glb`,defaultColor:`#f5f5f5`,colors:[`#f5f5f5`,`#c8102e`,`#1a1a1a`,`#0a2f6e`],massKg:1180,frontWeightBias:.63,drivetrain:`FF`,lengthM:4.4,widthM:1.73,heightM:1.36,wheelbaseM:2.57,trackM:1.49,wheelRadiusM:.3,torqueCurve:L([1020,141],[2130,193],[3600,236],[5080,257],[6560,239],[7660,200],[8400,159]),idleRpm:850,redlineRpm:8400,gearRatios:[3.4,2.55,1.91,1.43,1.07,.8],finalDrive:4.4,dragCd:.32,frontalAreaM2:1.95,downforceFront:.06,downforceRear:.16,springFront:35400,springRear:31860,damperFront:2476,damperRear:2228,antiRollFront:14868,antiRollRear:10832,suspensionTravelM:.14,brakeTorqueNm:4661,brakeBias:.62,tyreGrip:1.15,tyres:`sport`,engine:`i4`,cgHeightM:.43,steerLockDeg:31},{...R,id:`volks_golf_r`,name:`Volks Golf R '22`,maker:`Volks`,year:2022,country:`Germany`,carClass:`N300`,priceCr:58e3,description:`A hot hatch that quietly does everything: all-wheel drive traction off the line, a drift mode for showing off, and a turbo four with real midrange shove.`,model:`sport_notch.glb`,defaultColor:`#e8e8e8`,colors:[`#e8e8e8`,`#1a1a1a`,`#0a2f6e`,`#c8102e`],massKg:1480,frontWeightBias:.6,drivetrain:`4WD`,frontTorqueSplit:.55,lengthM:4.29,widthM:1.79,heightM:1.46,wheelbaseM:2.63,trackM:1.54,wheelRadiusM:.32,torqueCurve:L([1020,284],[1870,421],[3010,457],[4140,457],[5280,421],[6130,366],[6700,311]),idleRpm:850,redlineRpm:6700,gearRatios:[3.5,2.57,1.89,1.39,1.02,.75],finalDrive:3.9,dragCd:.31,frontalAreaM2:2.2,downforceFront:.05,downforceRear:.12,springFront:44400,springRear:39960,damperFront:3105,damperRear:2794,antiRollFront:18648,antiRollRear:13586,suspensionTravelM:.14,brakeTorqueNm:5846,brakeBias:.6,tyreGrip:1.15,tyres:`sport`,engine:`i4`,cgHeightM:.43,steerLockDeg:31},{...R,id:`pleiades_wrx_sti`,name:`Pleiades Impreza WRX STI '05`,maker:`Pleiades`,year:2005,country:`Japan`,carClass:`N300`,priceCr:49e3,description:`A rally-bred boxer turbo with symmetrical all-wheel drive and a burble that gives it away from a block away. Gravel or tarmac, it doesn't much care.`,model:`sport_notch.glb`,defaultColor:`#0a2f8e`,colors:[`#0a2f8e`,`#f5d000`,`#e8e8e8`,`#1a1a1a`],massKg:1470,frontWeightBias:.59,drivetrain:`4WD`,frontTorqueSplit:.43,lengthM:4.46,widthM:1.74,heightM:1.48,wheelbaseM:2.52,trackM:1.49,wheelRadiusM:.31,torqueCurve:L([1080,266],[1940,394],[3080,429],[4230,429],[5370,394],[6230,343],[6800,291]),idleRpm:900,redlineRpm:6800,gearRatios:[3.6,2.64,1.93,1.42,1.04,.76],finalDrive:3.9,dragCd:.33,frontalAreaM2:2.15,downforceFront:.04,downforceRear:.14,springFront:44100,springRear:39690,damperFront:3084,damperRear:2776,antiRollFront:18522,antiRollRear:13495,suspensionTravelM:.14,brakeTorqueNm:5807,brakeBias:.58,tyreGrip:1.15,tyres:`sport`,engine:`flat6`,cgHeightM:.43,steerLockDeg:31},{...R,id:`diamond_evo_ix`,name:`Diamond Lancer Evolution IX '06`,maker:`Diamond`,year:2006,country:`Japan`,carClass:`N300`,priceCr:5e4,description:`A four-door rally weapon with an active centre differential that shuffles torque faster than you can think about it. Turns in like it weighs half what it does.`,model:`sport_notch.glb`,defaultColor:`#1a1a1a`,colors:[`#1a1a1a`,`#e8e8e8`,`#c8102e`,`#0a2f8e`],massKg:1420,frontWeightBias:.58,drivetrain:`4WD`,frontTorqueSplit:.35,lengthM:4.49,widthM:1.77,heightM:1.45,wheelbaseM:2.63,trackM:1.51,wheelRadiusM:.31,torqueCurve:L([1020,251],[1920,372],[3110,405],[4310,405],[5510,372],[6400,324],[7e3,275]),idleRpm:850,redlineRpm:7e3,gearRatios:[3.5,2.59,1.92,1.42,1.05,.78],finalDrive:4,dragCd:.33,frontalAreaM2:2.1,downforceFront:.05,downforceRear:.16,springFront:42600,springRear:38340,damperFront:2979,damperRear:2681,antiRollFront:17892,antiRollRear:13036,suspensionTravelM:.14,brakeTorqueNm:5609,brakeBias:.59,tyreGrip:1.15,tyres:`sport`,engine:`i4`,cgHeightM:.43,steerLockDeg:31},{...R,id:`shinsei_370z`,name:`Shinsei Fairlady Z '09`,maker:`Shinsei`,year:2009,country:`Japan`,carClass:`N300`,priceCr:46e3,description:`A naturally aspirated V6 in a short-wheelbase coupe, unapologetically old-school. No turbo lag, no hybrid assist, just a wide powerband and a front-engined balance.`,model:`sport_fastback.glb`,defaultColor:`#c8102e`,colors:[`#c8102e`,`#1a1a1a`,`#e8e8e8`,`#f5d000`],massKg:1520,frontWeightBias:.53,drivetrain:`FR`,lengthM:4.25,widthM:1.85,heightM:1.32,wheelbaseM:2.55,trackM:1.53,wheelRadiusM:.32,torqueCurve:L([960,238],[1940,325],[3250,398],[4560,433],[5870,403],[6850,338],[7500,268]),idleRpm:800,redlineRpm:7500,gearRatios:[3.6,2.65,1.95,1.44,1.06,.78],finalDrive:3.7,dragCd:.3,frontalAreaM2:2,downforceFront:.03,downforceRear:.1,springFront:45600,springRear:41040,damperFront:3189,damperRear:2870,antiRollFront:19152,antiRollRear:13954,suspensionTravelM:.14,brakeTorqueNm:6004,brakeBias:.6,tyreGrip:1.15,tyres:`sport`,engine:`v6`,cgHeightM:.43,steerLockDeg:31}],Gn=[{...R,id:`shinsei_gtr`,name:`Shinsei GT-R Nismo '17`,maker:`Shinsei`,year:2017,country:`Japan`,carClass:`N500`,priceCr:24e4,description:`600 hp, all-wheel drive and a dual-clutch that shifts faster than you can blink. Godzilla eats supercars for breakfast.`,model:`shinsei_gtr.glb`,defaultColor:`#b8b8bd`,colors:[`#b8b8bd`,`#0a0a0a`,`#c8102e`,`#f5f5f5`,`#2f6fd6`],massKg:1720,frontWeightBias:.54,drivetrain:`4WD`,frontTorqueSplit:.3,lengthM:4.69,widthM:1.9,heightM:1.37,wheelbaseM:2.78,trackM:1.6,wheelRadiusM:.36,torqueCurve:L([1e3,300],[2500,560],[3600,652],[5600,652],[6800,620],[7100,560]),idleRpm:750,redlineRpm:7100,gearRatios:[4.06,2.3,1.6,1.25,1,.8],finalDrive:3.7,dragCd:.26,frontalAreaM2:2.3,downforceFront:.18,downforceRear:.3,springFront:48e3,springRear:42e3,damperFront:3400,damperRear:3e3,antiRollFront:22e3,antiRollRear:18e3,brakeTorqueNm:7800,brakeBias:.6,tyreGrip:1.1,tyres:`sport`,engine:`v6`},{...R,id:`bavaria_m4`,name:`Bavaria M4 Competition '21`,maker:`Bavaria`,year:2021,country:`Germany`,carClass:`N500`,priceCr:95e3,description:`510 hp straight-six turbo, rear-wheel drive and a long wheelbase that makes it a natural at the limit. A grand tourer with claws.`,model:`bavaria_m4.glb`,defaultColor:`#3a7d44`,colors:[`#3a7d44`,`#f2f2f2`,`#0a0a0a`,`#f0a500`,`#2b4c9a`],massKg:1725,frontWeightBias:.53,drivetrain:`FR`,lengthM:4.79,widthM:1.89,heightM:1.39,wheelbaseM:2.86,trackM:1.62,wheelRadiusM:.35,torqueCurve:L([1e3,320],[2200,600],[2750,650],[5500,650],[6250,585],[7200,480]),idleRpm:800,redlineRpm:7200,gearRatios:[5,3.2,2.14,1.72,1.31,1,.82,.64],finalDrive:3.15,dragCd:.32,frontalAreaM2:2.3,downforceFront:.08,downforceRear:.14,springFront:42e3,springRear:38e3,damperFront:3e3,damperRear:2700,antiRollFront:2e4,antiRollRear:15e3,brakeTorqueNm:7200,brakeBias:.6,tyreGrip:1.08,tyres:`sport`,engine:`i6`},{...R,id:`stallion_gt`,name:`Stallion GT500 '20`,maker:`Stallion`,year:2020,country:`USA`,carClass:`N500`,priceCr:11e4,description:`A supercharged 5.2-litre V8 with 760 hp and a soundtrack to match. Muscle with manners, if you respect the throttle.`,model:`stallion_gt.glb`,defaultColor:`#0f3d91`,colors:[`#0f3d91`,`#d3d3d3`,`#c8102e`,`#111111`,`#e8b923`],massKg:1900,frontWeightBias:.56,drivetrain:`FR`,lengthM:4.79,widthM:1.92,heightM:1.38,wheelbaseM:2.72,trackM:1.64,wheelRadiusM:.35,torqueCurve:L([1e3,380],[2500,620],[4e3,780],[5e3,847],[6500,820],[7300,740],[7600,650]),idleRpm:850,redlineRpm:7500,gearRatios:[4.7,2.99,2.15,1.77,1.52,1.28,1],finalDrive:3.73,dragCd:.36,frontalAreaM2:2.35,downforceFront:.15,downforceRear:.28,springFront:46e3,springRear:4e4,damperFront:3200,damperRear:2900,antiRollFront:21e3,antiRollRear:16e3,brakeTorqueNm:8200,brakeBias:.62,tyreGrip:1.08,tyres:`sport`,engine:`v8`},{...R,id:`vantage_sf`,name:`Vantage SF Stradale '24`,maker:`Vantage`,year:2024,country:`Italy`,carClass:`N500`,priceCr:6e5,description:`A 1000 hp hybrid V8 in a carbon tub with torque-vectoring front motors. It bends physics and, occasionally, egos.`,model:`vantage_sf.glb`,defaultColor:`#d61f26`,colors:[`#d61f26`,`#f8e71c`,`#0a0a0a`,`#f2f2f2`,`#1e4fa3`],massKg:1570,frontWeightBias:.43,drivetrain:`4WD`,frontTorqueSplit:.25,lengthM:4.6,widthM:1.98,heightM:1.19,wheelbaseM:2.65,trackM:1.68,wheelRadiusM:.35,torqueCurve:L([1e3,500],[3e3,760],[5e3,800],[6500,800],[7500,760],[8e3,700],[8300,600]),idleRpm:900,redlineRpm:8e3,gearRatios:[3.9,2.6,1.92,1.5,1.2,.98,.8,.66],finalDrive:3.9,dragCd:.32,frontalAreaM2:2.1,downforceFront:.5,downforceRear:.9,springFront:7e4,springRear:75e3,damperFront:4200,damperRear:4400,antiRollFront:3e4,antiRollRear:28e3,suspensionTravelM:.11,brakeTorqueNm:9500,brakeBias:.58,tyreGrip:1.15,tyres:`sport`,engine:`v8hybrid`},{...R,id:`sting_corvette`,name:`Sting Corvette Z06 '23`,maker:`Sting`,year:2023,country:`USA`,carClass:`N500`,priceCr:21e4,description:`America's first mid-engined production sports car, with a flat-plane V8 that revs like nothing Detroit has built before. The layout changes everything about how it turns in.`,model:`vantage_sf.glb`,defaultColor:`#f5d000`,colors:[`#f5d000`,`#c8102e`,`#1a1a1a`,`#e8e8e8`],massKg:1560,frontWeightBias:.4,drivetrain:`MR`,lengthM:4.63,widthM:2,heightM:1.24,wheelbaseM:2.72,trackM:1.68,wheelRadiusM:.35,torqueCurve:L([1020,420],[2160,573],[3670,703],[5190,765],[6710,711],[7840,596],[8600,474]),idleRpm:850,redlineRpm:8600,gearRatios:[4.4,3.31,2.49,1.87,1.41,1.06,.8,.6],finalDrive:3.4,dragCd:.34,frontalAreaM2:2.15,downforceFront:.15,downforceRear:.35,springFront:65520,springRear:58968,damperFront:4680,damperRear:4212,antiRollFront:29484,antiRollRear:22408,suspensionTravelM:.12,brakeTorqueNm:8923,brakeBias:.58,tyreGrip:1.15,tyres:`sport`,engine:`v8`,cgHeightM:.42,steerLockDeg:30},{...R,id:`stellar_amg_gt`,name:`Stellar AMG GT 63 '21`,maker:`Stellar`,year:2021,country:`Germany`,carClass:`N500`,priceCr:175e3,description:`A long-hooded, four-seat grand tourer with a hand-built twin-turbo V8 up front. Effortless at 250 km/h, and still happy to step out of line on command.`,model:`stallion_gt.glb`,defaultColor:`#1a1a1a`,colors:[`#1a1a1a`,`#e8e8e8`,`#0a2f6e`,`#c8102e`],massKg:1730,frontWeightBias:.52,drivetrain:`FR`,lengthM:4.73,widthM:1.98,heightM:1.35,wheelbaseM:2.83,trackM:1.65,wheelRadiusM:.35,torqueCurve:L([960,504],[1870,749],[3070,814],[4280,814],[5490,749],[6400,651],[7e3,553]),idleRpm:800,redlineRpm:7e3,gearRatios:[4.7,3.52,2.63,1.97,1.48,1.11,.83,.62],finalDrive:3.3,dragCd:.33,frontalAreaM2:2.3,downforceFront:.1,downforceRear:.22,springFront:57090,springRear:51381,damperFront:4078,damperRear:3670,antiRollFront:25691,antiRollRear:19525,suspensionTravelM:.12,brakeTorqueNm:7993,brakeBias:.6,tyreGrip:1.15,tyres:`sport`,engine:`v8`,cgHeightM:.42,steerLockDeg:30},{...R,id:`ringstadt_r8`,name:`Ringstadt R8 V10 Performance '22`,maker:`Ringstadt`,year:2022,country:`Germany`,carClass:`N500`,priceCr:23e4,description:`A naturally aspirated ten-cylinder howl in a mid-engined, all-wheel-drive shell that makes supercar speed feel almost casual. One of the last of its kind.`,model:`vantage_sf.glb`,defaultColor:`#0a2f6e`,colors:[`#0a2f6e`,`#f5d000`,`#e8e8e8`,`#1a1a1a`],massKg:1620,frontWeightBias:.42,drivetrain:`4WD`,frontTorqueSplit:.15,lengthM:4.47,widthM:1.99,heightM:1.24,wheelbaseM:2.65,trackM:1.65,wheelRadiusM:.35,torqueCurve:L([1080,384],[2220,524],[3750,642],[5270,698],[6800,649],[7940,545],[8700,433]),idleRpm:900,redlineRpm:8700,gearRatios:[4.1,3.02,2.22,1.63,1.2,.88,.65],finalDrive:3.5,dragCd:.34,frontalAreaM2:2.1,downforceFront:.12,downforceRear:.3,springFront:65610,springRear:59049,damperFront:4686,damperRear:4218,antiRollFront:29525,antiRollRear:22439,suspensionTravelM:.12,brakeTorqueNm:9266,brakeBias:.56,tyreGrip:1.15,tyres:`sport`,engine:`v8`,cgHeightM:.42,steerLockDeg:30},{...R,id:`hakone_nsx`,name:`Hakone NSX Type S '22`,maker:`Hakone`,year:2022,country:`Japan`,carClass:`N500`,priceCr:22e4,description:`A twin-turbo V6 hybrid with three electric motors sorting out torque vectoring on the fly. Everyday-usable, then suddenly not, the instant you bury the throttle.`,model:`vantage_sf.glb`,defaultColor:`#f2f2f2`,colors:[`#f2f2f2`,`#0a2f6e`,`#c8102e`,`#1a1a1a`],massKg:1730,frontWeightBias:.42,drivetrain:`4WD`,frontTorqueSplit:.25,lengthM:4.53,widthM:1.94,heightM:1.22,wheelbaseM:2.63,trackM:1.66,wheelRadiusM:.35,torqueCurve:L([1020,483],[1990,717],[3290,780],[4580,780],[5880,717],[6850,624],[7500,530]),idleRpm:850,redlineRpm:7500,gearRatios:[4.2,3.05,2.22,1.61,1.17,.85,.62],finalDrive:3.6,dragCd:.32,frontalAreaM2:2.05,downforceFront:.15,downforceRear:.32,springFront:67470,springRear:60723,damperFront:4819,damperRear:4337,antiRollFront:30362,antiRollRear:23075,suspensionTravelM:.12,brakeTorqueNm:9896,brakeBias:.56,tyreGrip:1.15,tyres:`sport`,engine:`v6`,cgHeightM:.42,steerLockDeg:30},{...R,id:`sakura_supra`,name:`Sakura Supra RZ '23`,maker:`Sakura`,year:2023,country:`Japan`,carClass:`N500`,priceCr:98e3,description:`A turbocharged straight-six back under the Supra badge after two decades away, with a chassis co-developed for a European roadster. Long bonnet, short overhangs, honest balance.`,model:`kaizen_rx7.glb`,defaultColor:`#e8e8e8`,colors:[`#e8e8e8`,`#c8102e`,`#1a1a1a`,`#0a2f6e`],massKg:1550,frontWeightBias:.53,drivetrain:`FR`,lengthM:4.38,widthM:1.86,heightM:1.29,wheelbaseM:2.47,trackM:1.59,wheelRadiusM:.32,torqueCurve:L([960,334],[1850,496],[3040,539],[4230,539],[5420,496],[6310,431],[6900,366]),idleRpm:800,redlineRpm:6900,gearRatios:[4.7,3.5,2.61,1.95,1.45,1.08,.81,.6],finalDrive:3.15,dragCd:.32,frontalAreaM2:2,downforceFront:.05,downforceRear:.14,springFront:46500,springRear:41850,damperFront:3321,damperRear:2989,antiRollFront:20925,antiRollRear:15903,suspensionTravelM:.12,brakeTorqueNm:6820,brakeBias:.6,tyreGrip:1.15,tyres:`sport`,engine:`i6`,cgHeightM:.42,steerLockDeg:30}],Kn=[{...R,id:`aurelia_cayman_gt4`,name:`Aurelia Cayman GT4 Clubsport '22`,maker:`Aurelia`,year:2022,country:`Germany`,carClass:`Gr.4`,priceCr:26e4,description:`A mid-engined flat-six clubsport racer, stripped of everything the road car needed and none of what the track does. Approachable enough for a first season of racing.`,model:`aurelia_gt3.glb`,defaultColor:`#f5f5f5`,colors:[`#f5f5f5`,`#1a1a1a`,`#c8102e`,`#0a2f6e`],massKg:1420,frontWeightBias:.45,drivetrain:`MR`,lengthM:4.46,widthM:1.97,heightM:1.27,wheelbaseM:2.48,trackM:1.6,wheelRadiusM:.34,torqueCurve:L([1440,275],[2450,375],[3810,460],[5160,500],[6510,465],[7520,390],[8200,310]),idleRpm:1200,redlineRpm:8200,gearRatios:[3.3,2.6,2.05,1.61,1.27,1],finalDrive:4.1,dragCd:.38,frontalAreaM2:2,downforceFront:.5,downforceRear:.9,springFront:102240,springRear:110760,damperFront:5842,damperRear:6329,antiRollFront:42941,antiRollRear:44304,suspensionTravelM:.09,brakeTorqueNm:9656,brakeBias:.56,tyreGrip:1.3,tyres:`racing`,engine:`flat6`,cgHeightM:.4,steerLockDeg:29},{...R,id:`bavaria_m4_gt4`,name:`Bavaria M4 GT4 '23`,maker:`Bavaria`,year:2023,country:`Germany`,carClass:`Gr.4`,priceCr:27e4,description:`The road M4's turbocharged straight-six, a roll cage, and a splitter that actually does something. A gentleman racer's staple.`,model:`bavaria_m4.glb`,defaultColor:`#1a3a8f`,colors:[`#1a3a8f`,`#f5f5f5`,`#1a1a1a`],massKg:1450,frontWeightBias:.52,drivetrain:`FR`,lengthM:4.85,widthM:1.99,heightM:1.38,wheelbaseM:2.86,trackM:1.66,wheelRadiusM:.34,torqueCurve:L([1320,360],[2200,534],[3380,580],[4550,580],[5730,534],[6610,464],[7200,395]),idleRpm:1100,redlineRpm:7200,gearRatios:[3.2,2.54,2.01,1.59,1.26,1],finalDrive:3.7,dragCd:.4,frontalAreaM2:2.15,downforceFront:.55,downforceRear:1,springFront:104400,springRear:113100,damperFront:5966,damperRear:6463,antiRollFront:43848,antiRollRear:45240,suspensionTravelM:.09,brakeTorqueNm:9860,brakeBias:.57,tyreGrip:1.3,tyres:`racing`,engine:`i6`,cgHeightM:.4,steerLockDeg:29},{...R,id:`stallion_mustang_gt4`,name:`Stallion Mustang GT4 '24`,maker:`Stallion`,year:2024,country:`USA`,carClass:`Gr.4`,priceCr:255e3,description:`A naturally aspirated V8 pony car turned sprint racer: simple, torquey, and easy to trust right up to the limit of the rubber.`,model:`stallion_gt.glb`,defaultColor:`#0f3d91`,colors:[`#0f3d91`,`#f5f5f5`,`#1a1a1a`,`#c8102e`],massKg:1420,frontWeightBias:.54,drivetrain:`FR`,lengthM:4.81,widthM:1.92,heightM:1.35,wheelbaseM:2.72,trackM:1.65,wheelRadiusM:.34,torqueCurve:L([1080,323],[2010,446],[3260,529],[4500,557],[5750,540],[6680,490],[7300,418]),idleRpm:900,redlineRpm:7300,gearRatios:[3.3,2.6,2.05,1.61,1.27,1],finalDrive:3.9,dragCd:.39,frontalAreaM2:2.2,downforceFront:.55,downforceRear:1.05,springFront:102240,springRear:110760,damperFront:5842,damperRear:6329,antiRollFront:42941,antiRollRear:44304,suspensionTravelM:.09,brakeTorqueNm:9656,brakeBias:.58,tyreGrip:1.3,tyres:`racing`,engine:`v8`,cgHeightM:.4,steerLockDeg:29},{...R,id:`sakura_supra_gt4`,name:`Sakura Supra GT4 '23`,maker:`Sakura`,year:2023,country:`Japan`,carClass:`Gr.4`,priceCr:25e4,description:`A turbocharged straight-six race car built to a strict cost cap, with a spec ECU and a wing that finally earns its keep. Consistent, predictable, quick.`,model:`kaizen_rx7.glb`,defaultColor:`#e8e8e8`,colors:[`#e8e8e8`,`#c8102e`,`#1a1a1a`],massKg:1350,frontWeightBias:.53,drivetrain:`FR`,lengthM:4.46,widthM:1.91,heightM:1.27,wheelbaseM:2.47,trackM:1.62,wheelRadiusM:.33,torqueCurve:L([1200,365],[2070,542],[3230,589],[4390,589],[5550,542],[6420,471],[7e3,401]),idleRpm:1e3,redlineRpm:7e3,gearRatios:[3.3,2.6,2.05,1.61,1.27,1],finalDrive:4,dragCd:.38,frontalAreaM2:2,downforceFront:.5,downforceRear:.95,springFront:97200,springRear:105300,damperFront:5554,damperRear:6017,antiRollFront:40824,antiRollRear:42120,suspensionTravelM:.09,brakeTorqueNm:9180,brakeBias:.57,tyreGrip:1.3,tyres:`racing`,engine:`i6`,cgHeightM:.4,steerLockDeg:29},{...R,id:`alpage_a110_gt4`,name:`Alpage A110 GT4 '21`,maker:`Alpage`,year:2021,country:`France`,carClass:`Gr.4`,priceCr:23e4,description:`The lightest car on the GT4 grid, and it shows: a turbo four with modest output but a power-to-weight ratio the V8s can't touch out of slow corners.`,model:`small_roadster.glb`,defaultColor:`#0a2f6e`,colors:[`#0a2f6e`,`#f5f5f5`,`#c8102e`],massKg:1150,frontWeightBias:.43,drivetrain:`MR`,lengthM:4.2,widthM:1.9,heightM:1.2,wheelbaseM:2.35,trackM:1.55,wheelRadiusM:.32,torqueCurve:L([1200,247],[2120,367],[3340,399],[4560,399],[5780,367],[6690,319],[7300,271]),idleRpm:1e3,redlineRpm:7300,gearRatios:[3.3,2.6,2.05,1.61,1.27,1],finalDrive:4,dragCd:.36,frontalAreaM2:1.85,downforceFront:.4,downforceRear:.85,springFront:82800,springRear:89700,damperFront:4731,damperRear:5126,antiRollFront:34776,antiRollRear:35880,suspensionTravelM:.09,brakeTorqueNm:7820,brakeBias:.55,tyreGrip:1.3,tyres:`racing`,engine:`i4`,cgHeightM:.4,steerLockDeg:29}],qn=[{...R,id:`aurelia_gt3`,name:`Aurelia 911 GT3 R '23`,maker:`Aurelia`,year:2023,country:`Germany`,carClass:`Gr.3`,priceCr:48e4,description:`A customer racing car with a 4.0-litre flat-six screaming to 9000 rpm, slick tyres and a wing that keeps it glued through 130R.`,model:`aurelia_gt3.glb`,defaultColor:`#f5f5f5`,colors:[`#f5f5f5`,`#d61f26`,`#1a1a1a`,`#0a7bd6`,`#f7c600`],massKg:1250,frontWeightBias:.41,drivetrain:`RR`,lengthM:4.62,widthM:2.05,heightM:1.28,wheelbaseM:2.46,trackM:1.72,wheelRadiusM:.35,torqueCurve:L([2e3,320],[4e3,420],[6150,470],[7500,465],[8250,445],[9e3,400],[9300,340]),idleRpm:1500,redlineRpm:9200,gearRatios:[3.05,2.3,1.85,1.55,1.34,1.18],finalDrive:3.8,dragCd:.42,frontalAreaM2:2.15,downforceFront:1.3,downforceRear:2.1,springFront:13e4,springRear:15e4,damperFront:6e3,damperRear:6500,antiRollFront:5e4,antiRollRear:45e3,suspensionTravelM:.08,brakeTorqueNm:9e3,brakeBias:.57,tyreGrip:1.22,tyres:`racing`,engine:`flat6`,cgHeightM:.38,steerLockDeg:28},{...R,id:`toro_huracan_gt3`,name:`Toro Huracan GT3 EVO2 '23`,maker:`Toro`,year:2023,country:`Italy`,carClass:`Gr.3`,priceCr:52e4,description:`A screaming naturally aspirated V10 in a carbon-and-aluminium GT3 shell, tuned by a factory programme with decades of endurance pedigree behind it.`,model:`gt3_mid.glb`,defaultColor:`#f5d000`,colors:[`#f5d000`,`#1a1a1a`,`#c8102e`],massKg:1300,frontWeightBias:.43,drivetrain:`MR`,lengthM:4.56,widthM:2.03,heightM:1.18,wheelbaseM:2.62,trackM:1.68,wheelRadiusM:.355,torqueCurve:L([1680,384],[2700,524],[4070,642],[5430,698],[6800,649],[7820,545],[8500,433]),idleRpm:1400,redlineRpm:8500,gearRatios:[3.05,2.51,2.06,1.7,1.4,1.15],finalDrive:3.9,dragCd:.42,frontalAreaM2:2.1,downforceFront:1.1,downforceRear:2,springFront:135200,springRear:156e3,damperFront:6230,damperRear:7189,antiRollFront:52052,antiRollRear:46800,suspensionTravelM:.08,brakeTorqueNm:9620,brakeBias:.56,tyreGrip:1.29,tyres:`racing`,engine:`v8`,cgHeightM:.38,steerLockDeg:28},{...R,id:`stellar_amg_gt3`,name:`Stellar AMG GT3 '20`,maker:`Stellar`,year:2020,country:`Germany`,carClass:`Gr.3`,priceCr:49e4,description:`A front-engined GT3 racer among a field of mid-engined rivals, proving a long bonnet and a big V8 can still win on Sunday.`,model:`aurelia_gt3.glb`,defaultColor:`#1a1a1a`,colors:[`#1a1a1a`,`#f5f5f5`,`#c8102e`],massKg:1290,frontWeightBias:.47,drivetrain:`FR`,lengthM:4.66,widthM:2.04,heightM:1.22,wheelbaseM:2.63,trackM:1.66,wheelRadiusM:.35,torqueCurve:L([1680,383],[2550,522],[3720,640],[4880,696],[6050,647],[6920,543],[7500,432]),idleRpm:1400,redlineRpm:7500,gearRatios:[3.1,2.54,2.08,1.71,1.4,1.15],finalDrive:3.85,dragCd:.43,frontalAreaM2:2.15,downforceFront:1.15,downforceRear:1.95,springFront:134160,springRear:154800,damperFront:6182,damperRear:7134,antiRollFront:51652,antiRollRear:46440,suspensionTravelM:.08,brakeTorqueNm:9546,brakeBias:.57,tyreGrip:1.3,tyres:`racing`,engine:`v8`,cgHeightM:.38,steerLockDeg:28},{...R,id:`ringstadt_r8_lms`,name:`Ringstadt R8 LMS Evo II '22`,maker:`Ringstadt`,year:2022,country:`Germany`,carClass:`Gr.3`,priceCr:51e4,description:`A production-based GT3 racer with a naturally aspirated V10 that needs no turbo lag management, just a driver willing to use all of it.`,model:`gt3_mid.glb`,defaultColor:`#0a2f6e`,colors:[`#0a2f6e`,`#f5f5f5`,`#c8102e`],massKg:1300,frontWeightBias:.44,drivetrain:`MR`,lengthM:4.6,widthM:2.03,heightM:1.23,wheelbaseM:2.65,trackM:1.67,wheelRadiusM:.355,torqueCurve:L([1560,360],[2620,491],[4020,602],[5430,655],[6840,609],[7900,511],[8600,406]),idleRpm:1300,redlineRpm:8600,gearRatios:[3.1,2.54,2.08,1.71,1.4,1.15],finalDrive:3.9,dragCd:.42,frontalAreaM2:2.1,downforceFront:1.1,downforceRear:1.9,springFront:135200,springRear:156e3,damperFront:6230,damperRear:7189,antiRollFront:52052,antiRollRear:46800,suspensionTravelM:.08,brakeTorqueNm:9620,brakeBias:.56,tyreGrip:1.3,tyres:`racing`,engine:`v8`,cgHeightM:.38,steerLockDeg:28},{...R,id:`cavallo_488_gt3`,name:`Cavallo 488 GT3 Evo '20`,maker:`Cavallo`,year:2020,country:`Italy`,carClass:`Gr.3`,priceCr:53e4,description:`A twin-turbo V8 GT3 car from a manufacturer with more Le Mans class wins than most grids combined. Composed under braking, vicious out of slow corners.`,model:`gt3_mid.glb`,defaultColor:`#c8102e`,colors:[`#c8102e`,`#f5d000`,`#1a1a1a`],massKg:1300,frontWeightBias:.44,drivetrain:`MR`,lengthM:4.57,widthM:2.05,heightM:1.2,wheelbaseM:2.65,trackM:1.68,wheelRadiusM:.355,torqueCurve:L([1560,420],[2530,623],[3810,677],[5100,677],[6390,623],[7360,542],[8e3,461]),idleRpm:1300,redlineRpm:8e3,gearRatios:[3.1,2.54,2.08,1.71,1.4,1.15],finalDrive:3.95,dragCd:.42,frontalAreaM2:2.1,downforceFront:1.15,downforceRear:2,springFront:135200,springRear:156e3,damperFront:6230,damperRear:7189,antiRollFront:52052,antiRollRear:46800,suspensionTravelM:.08,brakeTorqueNm:9620,brakeBias:.56,tyreGrip:1.3,tyres:`racing`,engine:`v8`,cgHeightM:.38,steerLockDeg:28},{...R,id:`hakone_nsx_gt3`,name:`Hakone NSX GT3 Evo '22`,maker:`Hakone`,year:2022,country:`Japan`,carClass:`Gr.3`,priceCr:5e5,description:`The road car's hybrid system stripped out in favour of a simple twin-turbo V6 and rear-wheel drive. Lighter, louder, and built purely to win GT3 races.`,model:`gt3_mid.glb`,defaultColor:`#f5f5f5`,colors:[`#f5f5f5`,`#1a1a1a`,`#0a2f6e`],massKg:1300,frontWeightBias:.45,drivetrain:`MR`,lengthM:4.52,widthM:2.02,heightM:1.19,wheelbaseM:2.63,trackM:1.67,wheelRadiusM:.35,torqueCurve:L([1560,438],[2450,651],[3640,707],[4830,707],[6020,651],[6910,566],[7500,481]),idleRpm:1300,redlineRpm:7500,gearRatios:[3.1,2.54,2.08,1.71,1.4,1.15],finalDrive:3.9,dragCd:.42,frontalAreaM2:2.05,downforceFront:1.1,downforceRear:1.9,springFront:135200,springRear:156e3,damperFront:6230,damperRear:7189,antiRollFront:52052,antiRollRear:46800,suspensionTravelM:.08,brakeTorqueNm:9620,brakeBias:.56,tyreGrip:1.291,tyres:`racing`,engine:`v6`,cgHeightM:.38,steerLockDeg:28}],Jn=[{...R,id:`lyon_lmp`,name:`Lyon LMP1 Hybrid '19`,maker:`Lyon`,year:2019,country:`France`,carClass:`Gr.1`,priceCr:3e6,description:`A Le Mans prototype: 1000 hp of hybrid thrust in 870 kg, with enough downforce to drive on the ceiling. Blink and you miss the braking point.`,model:`lyon_lmp.glb`,defaultColor:`#0a0a0a`,colors:[`#0a0a0a`,`#e10600`,`#f5f5f5`,`#00a3e0`,`#ffcc00`],massKg:870,frontWeightBias:.44,drivetrain:`4WD`,frontTorqueSplit:.3,lengthM:4.65,widthM:1.9,heightM:1.05,wheelbaseM:3,trackM:1.6,wheelRadiusM:.35,torqueCurve:L([2e3,500],[4e3,700],[6e3,780],[7500,790],[8500,760],[9e3,700],[9300,600]),idleRpm:2e3,redlineRpm:9e3,gearRatios:[2.9,2.2,1.78,1.5,1.3,1.15,1.03],finalDrive:3.5,dragCd:.5,frontalAreaM2:1.9,downforceFront:2.4,downforceRear:3.6,springFront:18e4,springRear:2e5,damperFront:7500,damperRear:8e3,antiRollFront:7e4,antiRollRear:65e3,suspensionTravelM:.06,brakeTorqueNm:11e3,brakeBias:.55,tyreGrip:1.28,tyres:`racing`,engine:`v8hybrid`,cgHeightM:.3,steerLockDeg:24},{...R,id:`zenith_gtp`,name:`Zenith GTP Hyper '23`,maker:`Zenith`,year:2023,country:`UK`,carClass:`Gr.1`,priceCr:32e5,description:`A hybrid Le Mans Hypercar with a front electric motor that only engages above walking pace, and a carbon tub built to shrug off a 24-hour race.`,model:`lyon_lmp.glb`,defaultColor:`#e8891c`,colors:[`#e8891c`,`#1a1a1a`,`#f5f5f5`],massKg:1030,frontWeightBias:.45,drivetrain:`4WD`,frontTorqueSplit:.15,lengthM:4.65,widthM:1.9,heightM:1.06,wheelbaseM:2.97,trackM:1.6,wheelRadiusM:.35,torqueCurve:L([2160,582],[3190,664],[4550,685],[5920,685],[7290,650],[8320,582],[9e3,493]),idleRpm:1800,redlineRpm:9e3,gearRatios:[2.85,2.43,2.08,1.77,1.51,1.29,1.1],finalDrive:3.5,dragCd:.48,frontalAreaM2:1.9,downforceFront:2.1,downforceRear:3.3,springFront:213210,springRear:236900,damperFront:8884,damperRear:9871,antiRollFront:83152,antiRollRear:76993,suspensionTravelM:.06,brakeTorqueNm:12978,brakeBias:.55,tyreGrip:1.3,tyres:`racing`,engine:`v8hybrid`,cgHeightM:.3,steerLockDeg:24},{...R,id:`cavallo_499p`,name:`Cavallo 499P Hyper '23`,maker:`Cavallo`,year:2023,country:`Italy`,carClass:`Gr.1`,priceCr:33e5,description:`A return to top-class endurance racing after decades away, with a hybrid V6 and a front axle motor that spins up as the car crosses 120 km/h.`,model:`lyon_lmp.glb`,defaultColor:`#a3170f`,colors:[`#a3170f`,`#1a1a1a`,`#f5f5f5`],massKg:1030,frontWeightBias:.45,drivetrain:`4WD`,frontTorqueSplit:.15,lengthM:4.68,widthM:1.9,heightM:1.07,wheelbaseM:3,trackM:1.6,wheelRadiusM:.35,torqueCurve:L([2160,595],[3160,679],[4480,700],[5810,700],[7140,665],[8140,595],[8800,504]),idleRpm:1800,redlineRpm:8800,gearRatios:[2.85,2.43,2.08,1.77,1.51,1.29,1.1],finalDrive:3.5,dragCd:.48,frontalAreaM2:1.9,downforceFront:2.15,downforceRear:3.35,springFront:213210,springRear:236900,damperFront:8884,damperRear:9871,antiRollFront:83152,antiRollRear:76993,suspensionTravelM:.06,brakeTorqueNm:12978,brakeBias:.55,tyreGrip:1.3,tyres:`racing`,engine:`v8hybrid`,cgHeightM:.3,steerLockDeg:24},{...R,id:`toro_sc63`,name:`Toro SC63 LMDh '24`,maker:`Toro`,year:2024,country:`Italy`,carClass:`Gr.1`,priceCr:31e5,description:`A shared-spec hybrid prototype riding a common chassis and gearbox with three rival manufacturers, distinguished only by the carbon bodywork and the badge.`,model:`lyon_lmp.glb`,defaultColor:`#f5d000`,colors:[`#f5d000`,`#1a1a1a`,`#0a2f6e`],massKg:1030,frontWeightBias:.44,drivetrain:`MR`,lengthM:4.6,widthM:1.9,heightM:1.06,wheelbaseM:2.95,trackM:1.6,wheelRadiusM:.35,torqueCurve:L([2160,601],[3140,686],[4450,708],[5760,708],[7070,672],[8050,601],[8700,510]),idleRpm:1800,redlineRpm:8700,gearRatios:[2.85,2.43,2.08,1.77,1.51,1.29,1.1],finalDrive:3.5,dragCd:.47,frontalAreaM2:1.9,downforceFront:2.05,downforceRear:3.25,springFront:213210,springRear:236900,damperFront:8884,damperRear:9871,antiRollFront:83152,antiRollRear:76993,suspensionTravelM:.06,brakeTorqueNm:12978,brakeBias:.55,tyreGrip:1.3,tyres:`racing`,engine:`v8hybrid`,cgHeightM:.3,steerLockDeg:24}],Yn=[...Hn,...Un,...Wn,...Gn,...Kn,...qn,...Jn],Xn=e=>{let t=Yn.find(t=>t.id===e);if(!t)throw Error(`Unknown car ${e}`);return t},Zn=`sakura_86`,Qn=`apex-turismo-save-v1`;function $n(){return{graphics:{quality:`high`,shadows:!0,postProcessing:!0,motionBlur:!1,resolutionScale:1,fov:70},audio:{master:.8,engine:.9,effects:.8,music:.4},assists:{abs:!0,tcs:1,stability:!1,racingLine:!0,autoBrake:!1},transmission:`auto`,units:`kmh`,cameraMode:`chase`,steeringSensitivity:1,wheelRotationDeg:900,wheelForceFeedback:.7,unlimitedCredits:!1}}function er(){return{version:1,credits:3e4,garage:[{specId:Zn,tuning:be(Xn(Zn)),odometerM:0}],selectedCar:0,records:[],completedEvents:{},settings:$n(),totalRaces:0,totalDistanceM:0,inputMappings:{},driverName:`Player`}}var tr=class{data;constructor(){this.data=this.load()}load(){try{let e=localStorage.getItem(Qn);if(!e)return er();let t=JSON.parse(e),n=er();return{...n,...t,settings:{...n.settings,...t.settings??{},graphics:{...n.settings.graphics,...t.settings?.graphics??{}},audio:{...n.settings.audio,...t.settings?.audio??{}},assists:{...n.settings.assists,...t.settings?.assists??{}}},garage:t.garage&&t.garage.length?t.garage:n.garage}}catch{return er()}}save(){try{localStorage.setItem(Qn,JSON.stringify(this.data))}catch{}}reset(){this.data=er(),this.save()}get selected(){return this.data.garage[Math.min(this.data.selectedCar,this.data.garage.length-1)]}bestLap(e,t){let n=null;for(let r of this.data.records)r.trackId===e&&(t&&r.carSpecId!==t||(n===null||r.timeMs<n)&&(n=r.timeMs));return n}recordLap(e,t,n){let r=this.bestLap(e,t);return r!==null&&r<=n?!1:(this.data.records=this.data.records.filter(n=>n.trackId!==e||n.carSpecId!==t),this.data.records.push({trackId:e,carSpecId:t,timeMs:n,dateIso:new Date().toISOString()}),this.save(),!0)}},nr=[`comfort`,`sport`,`racing`];function rr(e){let t=Math.max(4e3,Math.round(e.priceCr*.06/100)*100);return[{kind:`power`,label:`Engine tuning`,stages:[{label:`Stock`,priceCr:0},{label:`Stage 1: Sports ECU & exhaust (+8%)`,priceCr:t},{label:`Stage 2: Intake, cams & headers (+17%)`,priceCr:t*2.5},{label:`Stage 3: Full race build (+28%)`,priceCr:t*5}]},{kind:`weight`,label:`Weight reduction`,stages:[{label:`Stock`,priceCr:0},{label:`Stage 1: Interior strip (-3%)`,priceCr:t*.8},{label:`Stage 2: Carbon panels (-6%)`,priceCr:t*2},{label:`Stage 3: Full carbon body (-10%)`,priceCr:t*4}]},{kind:`tyres`,label:`Tyres`,stages:[{label:`Comfort`,priceCr:Math.round(t*.3)},{label:`Sport`,priceCr:Math.round(t*.7)},{label:`Racing slicks`,priceCr:Math.round(t*1.6)}]}]}var ir=999999999,ar=e=>`Cr. ${Math.round(e).toLocaleString(`en-US`)}`,or=class{save;constructor(e){this.save=e}buyCar(e,t){let n=Xn(e);if(this.save.settings.unlimitedCredits&&(this.save.credits=ir),this.save.credits<n.priceCr)return`You need ${ar(n.priceCr-this.save.credits)} more to buy the ${n.name}. Win races to earn credits.`;this.save.credits-=n.priceCr;let r=be(n);return r.color=n.colors.includes(t)?t:n.defaultColor,this.save.garage.push({specId:e,tuning:r,odometerM:0}),this.save.selectedCar=this.save.garage.length-1,null}sellCar(e){if(this.save.garage.length<=1)return`You cannot sell your only car.`;let t=this.save.garage[e];if(!t)return`That car is not in your garage.`;let n=Xn(t.specId),r=Math.round(n.priceCr*.55);return this.save.credits+=r,this.save.garage.splice(e,1),this.save.selectedCar>=this.save.garage.length&&(this.save.selectedCar=this.save.garage.length-1),null}buyUpgrade(e,t,n){let r=this.save.garage[e];if(!r)return`That car is not in your garage.`;let i=rr(Xn(r.specId)).find(e=>e.kind===t),a=i?.stages[n];if(!i||!a)return`That upgrade is not available.`;let o=t===`power`?r.tuning.powerStage:t===`weight`?r.tuning.weightStage:nr.indexOf(r.tuning.tyres);return o===n?`That is already installed.`:t!==`tyres`&&n<o?(this.applyStage(r,t,n),null):(this.save.settings.unlimitedCredits&&(this.save.credits=ir),this.save.credits<a.priceCr?`You need ${ar(a.priceCr-this.save.credits)} more for ${a.label}.`:(this.save.credits-=a.priceCr,this.applyStage(r,t,n),null))}applyStage(e,t,n){t===`power`?e.tuning.powerStage=n:t===`weight`?e.tuning.weightStage=n:e.tuning.tyres=nr[n]}},sr=`attached`,cr=1e3,lr=1001,ur=1002,dr=1003,fr=1004,pr=1005,mr=1006,hr=1007,gr=1008,_r=1009,vr=1010,yr=1011,br=1012,xr=1013,Sr=1014,Cr=1015,wr=1016,Tr=1017,Er=1018,Dr=1020,Or=35902,kr=35899,Ar=1021,jr=1022,Mr=1023,Nr=1026,Pr=1027,Fr=1028,Ir=1029,Lr=1030,Rr=1031,zr=1033,Br=33776,Vr=33777,Hr=33778,Ur=33779,Wr=35840,Gr=35841,Kr=35842,qr=35843,Jr=36196,Yr=37492,Xr=37496,Zr=37488,Qr=37489,$r=37490,ei=37491,ti=37808,ni=37809,ri=37810,ii=37811,ai=37812,oi=37813,si=37814,ci=37815,li=37816,ui=37817,di=37818,fi=37819,pi=37820,mi=37821,hi=36492,gi=36494,_i=36495,vi=36283,yi=36284,bi=36285,xi=36286,Si=2300,Ci=2301,wi=2302,Ti=2303,Ei=2400,Di=2401,Oi=2402,ki=2500,Ai=3200,ji=`srgb`,Mi=`srgb-linear`,Ni=`linear`,Pi=`srgb`,Fi=7680,Ii=35044,Li=2e3;function Ri(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function zi(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function Bi(e){return document.createElementNS(`http://www.w3.org/1999/xhtml`,e)}function Vi(){let e=Bi(`canvas`);return e.style.display=`block`,e}var Hi={};function Ui(...e){let t=`THREE.`+e.shift();console.log(t,...e)}function Wi(e){let t=e[0];if(typeof t==`string`&&t.startsWith(`TSL:`)){let t=e[1];t&&t.isStackTrace?e[0]+=` `+t.getLocation():e[1]=`Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.`}return e}function z(...e){e=Wi(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.warn(n.getError(t)):console.warn(t,...e)}}function B(...e){e=Wi(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.error(n.getError(t)):console.error(t,...e)}}function Gi(...e){let t=e.join(` `);t in Hi||(Hi[t]=!0,z(...e))}function Ki(e,t,n){return new Promise(function(r,i){function a(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:i();break;case e.TIMEOUT_EXPIRED:setTimeout(a,n);break;default:r()}}setTimeout(a,n)})}var qi={0:1,2:6,4:7,3:5,1:0,6:2,7:4,5:3},Ji=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n!==void 0&&n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let r=n[e];if(r!==void 0){let e=r.indexOf(t);e!==-1&&r.splice(e,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let t=n.slice(0);for(let n=0,r=t.length;n<r;n++)t[n].call(this,e);e.target=null}}},Yi=`00.01.02.03.04.05.06.07.08.09.0a.0b.0c.0d.0e.0f.10.11.12.13.14.15.16.17.18.19.1a.1b.1c.1d.1e.1f.20.21.22.23.24.25.26.27.28.29.2a.2b.2c.2d.2e.2f.30.31.32.33.34.35.36.37.38.39.3a.3b.3c.3d.3e.3f.40.41.42.43.44.45.46.47.48.49.4a.4b.4c.4d.4e.4f.50.51.52.53.54.55.56.57.58.59.5a.5b.5c.5d.5e.5f.60.61.62.63.64.65.66.67.68.69.6a.6b.6c.6d.6e.6f.70.71.72.73.74.75.76.77.78.79.7a.7b.7c.7d.7e.7f.80.81.82.83.84.85.86.87.88.89.8a.8b.8c.8d.8e.8f.90.91.92.93.94.95.96.97.98.99.9a.9b.9c.9d.9e.9f.a0.a1.a2.a3.a4.a5.a6.a7.a8.a9.aa.ab.ac.ad.ae.af.b0.b1.b2.b3.b4.b5.b6.b7.b8.b9.ba.bb.bc.bd.be.bf.c0.c1.c2.c3.c4.c5.c6.c7.c8.c9.ca.cb.cc.cd.ce.cf.d0.d1.d2.d3.d4.d5.d6.d7.d8.d9.da.db.dc.dd.de.df.e0.e1.e2.e3.e4.e5.e6.e7.e8.e9.ea.eb.ec.ed.ee.ef.f0.f1.f2.f3.f4.f5.f6.f7.f8.f9.fa.fb.fc.fd.fe.ff`.split(`.`),Xi=1234567,Zi=Math.PI/180,Qi=180/Math.PI;function $i(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(Yi[e&255]+Yi[e>>8&255]+Yi[e>>16&255]+Yi[e>>24&255]+`-`+Yi[t&255]+Yi[t>>8&255]+`-`+Yi[t>>16&15|64]+Yi[t>>24&255]+`-`+Yi[n&63|128]+Yi[n>>8&255]+`-`+Yi[n>>16&255]+Yi[n>>24&255]+Yi[r&255]+Yi[r>>8&255]+Yi[r>>16&255]+Yi[r>>24&255]).toLowerCase()}function V(e,t,n){return Math.max(t,Math.min(n,e))}function ea(e,t){return(e%t+t)%t}function ta(e,t,n,r,i){return r+(e-t)*(i-r)/(n-t)}function na(e,t,n){return e===t?0:(n-e)/(t-e)}function ra(e,t,n){return(1-n)*e+n*t}function ia(e,t,n,r){return ra(e,t,1-Math.exp(-n*r))}function aa(e,t=1){return t-Math.abs(ea(e,t*2)-t)}function oa(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*(3-2*e))}function sa(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*e*(e*(e*6-15)+10))}function ca(e,t){return e+Math.floor(Math.random()*(t-e+1))}function la(e,t){return e+Math.random()*(t-e)}function ua(e){return e*(.5-Math.random())}function da(e){e!==void 0&&(Xi=e);let t=Xi+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function fa(e){return e*Zi}function pa(e){return e*Qi}function ma(e){return!(e&e-1)&&e!==0}function ha(e){return 2**Math.ceil(Math.log(e)/Math.LN2)}function ga(e){return 2**Math.floor(Math.log(e)/Math.LN2)}function _a(e,t,n,r,i){let a=Math.cos,o=Math.sin,s=a(n/2),c=o(n/2),l=a((t+r)/2),u=o((t+r)/2),d=a((t-r)/2),f=o((t-r)/2),p=a((r-t)/2),m=o((r-t)/2);switch(i){case`XYX`:e.set(s*u,c*d,c*f,s*l);break;case`YZY`:e.set(c*f,s*u,c*d,s*l);break;case`ZXZ`:e.set(c*d,c*f,s*u,s*l);break;case`XZX`:e.set(s*u,c*m,c*p,s*l);break;case`YXY`:e.set(c*p,s*u,c*m,s*l);break;case`ZYZ`:e.set(c*m,c*p,s*u,s*l);break;default:z(`MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: `+i)}}function va(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw Error(`THREE.MathUtils: Invalid component type.`)}}function ya(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:throw Error(`THREE.MathUtils: Invalid component type.`)}}var ba={DEG2RAD:Zi,RAD2DEG:Qi,generateUUID:$i,clamp:V,euclideanModulo:ea,mapLinear:ta,inverseLerp:na,lerp:ra,damp:ia,pingpong:aa,smoothstep:oa,smootherstep:sa,randInt:ca,randFloat:la,randFloatSpread:ua,seededRandom:da,degToRad:fa,radToDeg:pa,isPowerOfTwo:ma,ceilPowerOfTwo:ha,floorPowerOfTwo:ga,setQuaternionFromProperEuler:_a,normalize:ya,denormalize:va},H=class e{static{e.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw Error(`THREE.Vector2: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw Error(`THREE.Vector2: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=V(this.x,e.x,t.x),this.y=V(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=V(this.x,e,t),this.y=V(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(V(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(V(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),i=this.x-e.x,a=this.y-e.y;return this.x=i*n-a*r+e.x,this.y=i*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},xa=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,i,a,o){let s=n[r+0],c=n[r+1],l=n[r+2],u=n[r+3],d=i[a+0],f=i[a+1],p=i[a+2],m=i[a+3];if(u!==m||s!==d||c!==f||l!==p){let e=s*d+c*f+l*p+u*m;e<0&&(d=-d,f=-f,p=-p,m=-m,e=-e);let t=1-o;if(e<.9995){let n=Math.acos(e),r=Math.sin(n);t=Math.sin(t*n)/r,o=Math.sin(o*n)/r,s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o}else{s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o;let e=1/Math.sqrt(s*s+c*c+l*l+u*u);s*=e,c*=e,l*=e,u*=e}}e[t]=s,e[t+1]=c,e[t+2]=l,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,r,i,a){let o=n[r],s=n[r+1],c=n[r+2],l=n[r+3],u=i[a],d=i[a+1],f=i[a+2],p=i[a+3];return e[t]=o*p+l*u+s*f-c*d,e[t+1]=s*p+l*d+c*u-o*f,e[t+2]=c*p+l*f+o*d-s*u,e[t+3]=l*p-o*u-s*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,i=e._z,a=e._order,o=Math.cos,s=Math.sin,c=o(n/2),l=o(r/2),u=o(i/2),d=s(n/2),f=s(r/2),p=s(i/2);switch(a){case`XYZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`YXZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`ZXY`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`ZYX`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`YZX`:this._x=d*l*u+c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u-d*f*p;break;case`XZY`:this._x=d*l*u-c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u+d*f*p;break;default:z(`Quaternion: .setFromEuler() encountered an unknown order: `+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],i=t[8],a=t[1],o=t[5],s=t[9],c=t[2],l=t[6],u=t[10],d=n+o+u;if(d>0){let e=.5/Math.sqrt(d+1);this._w=.25/e,this._x=(l-s)*e,this._y=(i-c)*e,this._z=(a-r)*e}else if(n>o&&n>u){let e=2*Math.sqrt(1+n-o-u);this._w=(l-s)/e,this._x=.25*e,this._y=(r+a)/e,this._z=(i+c)/e}else if(o>u){let e=2*Math.sqrt(1+o-n-u);this._w=(i-c)/e,this._x=(r+a)/e,this._y=.25*e,this._z=(s+l)/e}else{let e=2*Math.sqrt(1+u-n-o);this._w=(a-r)/e,this._x=(i+c)/e,this._y=(s+l)/e,this._z=.25*e}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(V(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x*=e,this._y*=e,this._z*=e,this._w*=e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=t._x,s=t._y,c=t._z,l=t._w;return this._x=n*l+a*o+r*c-i*s,this._y=r*l+a*s+i*o-n*c,this._z=i*l+a*c+n*s-r*o,this._w=a*l-n*o-r*s-i*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,i=-i,a=-a,o=-o);let s=1-t;if(o<.9995){let e=Math.acos(o),c=Math.sin(e);s=Math.sin(s*e)/c,t=Math.sin(t*e)/c,this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this._onChangeCallback()}else this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),i=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),i*Math.sin(t),i*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},U=class e{static{e.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw Error(`THREE.Vector3: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error(`THREE.Vector3: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Ca.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Ca.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6]*r,this.y=i[1]*t+i[4]*n+i[7]*r,this.z=i[2]*t+i[5]*n+i[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=e.elements,a=1/(i[3]*t+i[7]*n+i[11]*r+i[15]);return this.x=(i[0]*t+i[4]*n+i[8]*r+i[12])*a,this.y=(i[1]*t+i[5]*n+i[9]*r+i[13])*a,this.z=(i[2]*t+i[6]*n+i[10]*r+i[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,i=e.x,a=e.y,o=e.z,s=e.w,c=2*(a*r-o*n),l=2*(o*t-i*r),u=2*(i*n-a*t);return this.x=t+s*c+a*u-o*l,this.y=n+s*l+o*c-i*u,this.z=r+s*u+i*l-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[4]*n+i[8]*r,this.y=i[1]*t+i[5]*n+i[9]*r,this.z=i[2]*t+i[6]*n+i[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=V(this.x,e.x,t.x),this.y=V(this.y,e.y,t.y),this.z=V(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=V(this.x,e,t),this.y=V(this.y,e,t),this.z=V(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(V(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,i=e.z,a=t.x,o=t.y,s=t.z;return this.x=r*s-i*o,this.y=i*a-n*s,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Sa.copy(this).projectOnVector(e),this.sub(Sa)}reflect(e){return this.sub(Sa.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(V(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Sa=new U,Ca=new xa,W=class e{static{e.prototype.isMatrix3=!0}constructor(e,t,n,r,i,a,o,s,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c)}set(e,t,n,r,i,a,o,s,c){let l=this.elements;return l[0]=e,l[1]=r,l[2]=o,l[3]=t,l[4]=i,l[5]=s,l[6]=n,l[7]=a,l[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[3],s=n[6],c=n[1],l=n[4],u=n[7],d=n[2],f=n[5],p=n[8],m=r[0],h=r[3],g=r[6],_=r[1],v=r[4],y=r[7],b=r[2],x=r[5],S=r[8];return i[0]=a*m+o*_+s*b,i[3]=a*h+o*v+s*x,i[6]=a*g+o*y+s*S,i[1]=c*m+l*_+u*b,i[4]=c*h+l*v+u*x,i[7]=c*g+l*y+u*S,i[2]=d*m+f*_+p*b,i[5]=d*h+f*v+p*x,i[8]=d*g+f*y+p*S,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8];return t*a*l-t*o*c-n*i*l+n*o*s+r*i*c-r*a*s}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=l*a-o*c,d=o*s-l*i,f=c*i-a*s,p=t*u+n*d+r*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let m=1/p;return e[0]=u*m,e[1]=(r*c-l*n)*m,e[2]=(o*n-r*a)*m,e[3]=d*m,e[4]=(l*t-r*s)*m,e[5]=(r*i-o*t)*m,e[6]=f*m,e[7]=(n*s-c*t)*m,e[8]=(a*t-n*i)*m,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,i,a,o){let s=Math.cos(i),c=Math.sin(i);return this.set(n*s,n*c,-n*(s*a+c*o)+a+e,-r*c,r*s,-r*(-c*a+s*o)+o+t,0,0,1),this}scale(e,t){return Gi(`Matrix3: .scale() is deprecated. Use .makeScale() instead.`),this.premultiply(wa.makeScale(e,t)),this}rotate(e){return Gi(`Matrix3: .rotate() is deprecated. Use .makeRotation() instead.`),this.premultiply(wa.makeRotation(-e)),this}translate(e,t){return Gi(`Matrix3: .translate() is deprecated. Use .makeTranslation() instead.`),this.premultiply(wa.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<9;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},wa=new W,Ta=new W().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Ea=new W().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Da(){let e={enabled:!0,workingColorSpace:Mi,spaces:{},convert:function(e,t,n){return this.enabled===!1||t===n||!t||!n?e:(this.spaces[t].transfer===`srgb`&&(e.r=Oa(e.r),e.g=Oa(e.g),e.b=Oa(e.b)),this.spaces[t].primaries!==this.spaces[n].primaries&&(e.applyMatrix3(this.spaces[t].toXYZ),e.applyMatrix3(this.spaces[n].fromXYZ)),this.spaces[n].transfer===`srgb`&&(e.r=ka(e.r),e.g=ka(e.g),e.b=ka(e.b)),e)},workingToColorSpace:function(e,t){return this.convert(e,this.workingColorSpace,t)},colorSpaceToWorking:function(e,t){return this.convert(e,t,this.workingColorSpace)},getPrimaries:function(e){return this.spaces[e].primaries},getTransfer:function(e){return e===``?Ni:this.spaces[e].transfer},getToneMappingMode:function(e){return this.spaces[e].outputColorSpaceConfig.toneMappingMode||`standard`},getLuminanceCoefficients:function(e,t=this.workingColorSpace){return e.fromArray(this.spaces[t].luminanceCoefficients)},define:function(e){Object.assign(this.spaces,e)},_getMatrix:function(e,t,n){return e.copy(this.spaces[t].toXYZ).multiply(this.spaces[n].fromXYZ)},_getDrawingBufferColorSpace:function(e){return this.spaces[e].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(e=this.workingColorSpace){return this.spaces[e].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(t,n){return Gi(`ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace().`),e.workingToColorSpace(t,n)},toWorkingColorSpace:function(t,n){return Gi(`ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking().`),e.colorSpaceToWorking(t,n)}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],r=[.3127,.329];return e.define({[Mi]:{primaries:t,whitePoint:r,transfer:Ni,toXYZ:Ta,fromXYZ:Ea,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:ji},outputColorSpaceConfig:{drawingBufferColorSpace:ji}},[ji]:{primaries:t,whitePoint:r,transfer:Pi,toXYZ:Ta,fromXYZ:Ea,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:ji}}}),e}var G=Da();function Oa(e){return e<.04045?e*.0773993808:(e*.9478672986+.0521327014)**2.4}function ka(e){return e<.0031308?e*12.92:1.055*e**.41666-.055}var Aa,ja=class{static getDataURL(e,t=`image/png`){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>`u`)return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Aa===void 0&&(Aa=Bi(`canvas`)),Aa.width=e.width,Aa.height=e.height;let t=Aa.getContext(`2d`);e instanceof ImageData?t.putImageData(e,0,0):t.drawImage(e,0,0,e.width,e.height),n=Aa}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap){let t=Bi(`canvas`);t.width=e.width,t.height=e.height;let n=t.getContext(`2d`);n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),i=r.data;for(let e=0;e<i.length;e++)i[e]=Oa(i[e]/255)*255;return n.putImageData(r,0,0),t}if(e.data){let t=e.data.slice(0);for(let e=0;e<t.length;e++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[e]=Math.floor(Oa(t[e]/255)*255):t[e]=Oa(t[e]);return{data:t,width:e.width,height:e.height}}return z(`ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied.`),e}},Ma=0,Na=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Ma++}),this.uuid=$i(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<`u`&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<`u`&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t===null?e.set(0,0,0):e.set(t.width,t.height,t.depth||0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:``},r=this.data;if(r!==null){let e;if(Array.isArray(r)){e=[];for(let t=0,n=r.length;t<n;t++)r[t].isDataTexture?e.push(Pa(r[t].image)):e.push(Pa(r[t]))}else e=Pa(r);n.url=e}return t||(e.images[this.uuid]=n),n}};function Pa(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap?ja.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(z(`Texture: Unable to serialize Texture.`),{})}var Fa=0,Ia=new U,La=class e extends Ji{constructor(t=e.DEFAULT_IMAGE,n=e.DEFAULT_MAPPING,r=lr,i=lr,a=mr,o=gr,s=Mr,c=_r,l=e.DEFAULT_ANISOTROPY,u=``){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Fa++}),this.uuid=$i(),this.name=``,this.source=new Na(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=r,this.wrapT=i,this.magFilter=a,this.minFilter=o,this.anisotropy=l,this.format=s,this.internalFormat=null,this.type=c,this.offset=new H(0,0),this.repeat=new H(1,1),this.center=new H(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new W,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Ia).x}get height(){return this.source.getSize(Ia).y}get depth(){return this.source.getSize(Ia).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){z(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){z(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:`Texture`,generator:`Texture.toJSON`},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:`dispose`})}transformUv(e){if(this.mapping!==300)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case cr:e.x-=Math.floor(e.x);break;case lr:e.x=e.x<0?0:1;break;case ur:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x-=Math.floor(e.x)}if(e.y<0||e.y>1)switch(this.wrapT){case cr:e.y-=Math.floor(e.y);break;case lr:e.y=e.y<0?0:1;break;case ur:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y-=Math.floor(e.y)}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};La.DEFAULT_IMAGE=null,La.DEFAULT_MAPPING=300,La.DEFAULT_ANISOTROPY=1;var Ra=class e{static{e.prototype.isVector4=!0}constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw Error(`THREE.Vector4: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error(`THREE.Vector4: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w===void 0?1:e.w,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*i,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*i,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*i,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*i,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,i,a=.01,o=.1,s=e.elements,c=s[0],l=s[4],u=s[8],d=s[1],f=s[5],p=s[9],m=s[2],h=s[6],g=s[10];if(Math.abs(l-d)<a&&Math.abs(u-m)<a&&Math.abs(p-h)<a){if(Math.abs(l+d)<o&&Math.abs(u+m)<o&&Math.abs(p+h)<o&&Math.abs(c+f+g-3)<o)return this.set(1,0,0,0),this;t=Math.PI;let e=(c+1)/2,s=(f+1)/2,_=(g+1)/2,v=(l+d)/4,y=(u+m)/4,b=(p+h)/4;return e>s&&e>_?e<a?(n=0,r=.707106781,i=.707106781):(n=Math.sqrt(e),r=v/n,i=y/n):s>_?s<a?(n=.707106781,r=0,i=.707106781):(r=Math.sqrt(s),n=v/r,i=b/r):_<a?(n=.707106781,r=.707106781,i=0):(i=Math.sqrt(_),n=y/i,r=b/i),this.set(n,r,i,t),this}let _=Math.sqrt((h-p)*(h-p)+(u-m)*(u-m)+(d-l)*(d-l));return Math.abs(_)<.001&&(_=1),this.x=(h-p)/_,this.y=(u-m)/_,this.z=(d-l)/_,this.w=Math.acos((c+f+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=V(this.x,e.x,t.x),this.y=V(this.y,e.y,t.y),this.z=V(this.z,e.z,t.z),this.w=V(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=V(this.x,e,t),this.y=V(this.y,e,t),this.z=V(this.z,e,t),this.w=V(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(V(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},za=class extends Ji{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:mr,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Ra(0,0,e,t),this.scissorTest=!1,this.viewport=new Ra(0,0,e,t),this.textures=[];let r=new La({width:e,height:t,depth:n.depth}),i=n.count;for(let e=0;e<i;e++)this.textures[e]=r.clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:mr,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let e=0;e<this.textures.length;e++)this.textures[e].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,i=this.textures.length;r<i;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let n=Object.assign({},e.textures[t].image);this.textures[t].source=new Na(n)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:`dispose`})}},Ba=class extends za{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Va=class extends La{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=dr,this.minFilter=dr,this.wrapR=lr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}},Ha=class extends La{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=dr,this.minFilter=dr,this.wrapR=lr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},K=class e{static{e.prototype.isMatrix4=!0}constructor(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h)}set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=r,g[1]=i,g[5]=a,g[9]=o,g[13]=s,g[2]=c,g[6]=l,g[10]=u,g[14]=d,g[3]=f,g[7]=p,g[11]=m,g[15]=h,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new e().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,r=1/Ua.setFromMatrixColumn(e,0).length(),i=1/Ua.setFromMatrixColumn(e,1).length(),a=1/Ua.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*i,t[5]=n[5]*i,t[6]=n[6]*i,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,i=e.z,a=Math.cos(n),o=Math.sin(n),s=Math.cos(r),c=Math.sin(r),l=Math.cos(i),u=Math.sin(i);if(e.order===`XYZ`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=-s*u,t[8]=c,t[1]=n+r*c,t[5]=e-i*c,t[9]=-o*s,t[2]=i-e*c,t[6]=r+n*c,t[10]=a*s}else if(e.order===`YXZ`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e+i*o,t[4]=r*o-n,t[8]=a*c,t[1]=a*u,t[5]=a*l,t[9]=-o,t[2]=n*o-r,t[6]=i+e*o,t[10]=a*s}else if(e.order===`ZXY`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e-i*o,t[4]=-a*u,t[8]=r+n*o,t[1]=n+r*o,t[5]=a*l,t[9]=i-e*o,t[2]=-a*c,t[6]=o,t[10]=a*s}else if(e.order===`ZYX`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=r*c-n,t[8]=e*c+i,t[1]=s*u,t[5]=i*c+e,t[9]=n*c-r,t[2]=-c,t[6]=o*s,t[10]=a*s}else if(e.order===`YZX`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=i-e*u,t[8]=r*u+n,t[1]=u,t[5]=a*l,t[9]=-o*l,t[2]=-c*l,t[6]=n*u+r,t[10]=e-i*u}else if(e.order===`XZY`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=-u,t[8]=c*l,t[1]=e*u+i,t[5]=a*l,t[9]=n*u-r,t[2]=r*u-n,t[6]=o*l,t[10]=i*u+e}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Ga,e,Ka)}lookAt(e,t,n){let r=this.elements;return Ya.subVectors(e,t),Ya.lengthSq()===0&&(Ya.z=1),Ya.normalize(),qa.crossVectors(n,Ya),qa.lengthSq()===0&&(Math.abs(n.z)===1?Ya.x+=1e-4:Ya.z+=1e-4,Ya.normalize(),qa.crossVectors(n,Ya)),qa.normalize(),Ja.crossVectors(Ya,qa),r[0]=qa.x,r[4]=Ja.x,r[8]=Ya.x,r[1]=qa.y,r[5]=Ja.y,r[9]=Ya.y,r[2]=qa.z,r[6]=Ja.z,r[10]=Ya.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[4],s=n[8],c=n[12],l=n[1],u=n[5],d=n[9],f=n[13],p=n[2],m=n[6],h=n[10],g=n[14],_=n[3],v=n[7],y=n[11],b=n[15],x=r[0],S=r[4],C=r[8],w=r[12],T=r[1],E=r[5],D=r[9],O=r[13],k=r[2],A=r[6],ee=r[10],te=r[14],j=r[3],ne=r[7],re=r[11],ie=r[15];return i[0]=a*x+o*T+s*k+c*j,i[4]=a*S+o*E+s*A+c*ne,i[8]=a*C+o*D+s*ee+c*re,i[12]=a*w+o*O+s*te+c*ie,i[1]=l*x+u*T+d*k+f*j,i[5]=l*S+u*E+d*A+f*ne,i[9]=l*C+u*D+d*ee+f*re,i[13]=l*w+u*O+d*te+f*ie,i[2]=p*x+m*T+h*k+g*j,i[6]=p*S+m*E+h*A+g*ne,i[10]=p*C+m*D+h*ee+g*re,i[14]=p*w+m*O+h*te+g*ie,i[3]=_*x+v*T+y*k+b*j,i[7]=_*S+v*E+y*A+b*ne,i[11]=_*C+v*D+y*ee+b*re,i[15]=_*w+v*O+y*te+b*ie,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[12],a=e[1],o=e[5],s=e[9],c=e[13],l=e[2],u=e[6],d=e[10],f=e[14],p=e[3],m=e[7],h=e[11],g=e[15],_=s*f-c*d,v=o*f-c*u,y=o*d-s*u,b=a*f-c*l,x=a*d-s*l,S=a*u-o*l;return t*(m*_-h*v+g*y)-n*(p*_-h*b+g*x)+r*(p*v-m*b+g*S)-i*(p*y-m*x+h*S)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[1],a=e[5],o=e[9],s=e[2],c=e[6],l=e[10];return t*(a*l-o*c)-n*(i*l-o*s)+r*(i*c-a*s)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=e[9],d=e[10],f=e[11],p=e[12],m=e[13],h=e[14],g=e[15],_=t*o-n*a,v=t*s-r*a,y=t*c-i*a,b=n*s-r*o,x=n*c-i*o,S=r*c-i*s,C=l*m-u*p,w=l*h-d*p,T=l*g-f*p,E=u*h-d*m,D=u*g-f*m,O=d*g-f*h,k=_*O-v*D+y*E+b*T-x*w+S*C;if(k===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/k;return e[0]=(o*O-s*D+c*E)*A,e[1]=(r*D-n*O-i*E)*A,e[2]=(m*S-h*x+g*b)*A,e[3]=(d*x-u*S-f*b)*A,e[4]=(s*T-a*O-c*w)*A,e[5]=(t*O-r*T+i*w)*A,e[6]=(h*y-p*S-g*v)*A,e[7]=(l*S-d*y+f*v)*A,e[8]=(a*D-o*T+c*C)*A,e[9]=(n*T-t*D-i*C)*A,e[10]=(p*x-m*y+g*_)*A,e[11]=(u*y-l*x-f*_)*A,e[12]=(o*w-a*E-s*C)*A,e[13]=(t*E-n*w+r*C)*A,e[14]=(m*v-p*b-h*_)*A,e[15]=(l*b-u*v+d*_)*A,this}scale(e){let t=this.elements,n=e.x,r=e.y,i=e.z;return t[0]*=n,t[4]*=r,t[8]*=i,t[1]*=n,t[5]*=r,t[9]*=i,t[2]*=n,t[6]*=r,t[10]*=i,t[3]*=n,t[7]*=r,t[11]*=i,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),i=1-n,a=e.x,o=e.y,s=e.z,c=i*a,l=i*o;return this.set(c*a+n,c*o-r*s,c*s+r*o,0,c*o+r*s,l*o+n,l*s-r*a,0,c*s-r*o,l*s+r*a,i*s*s+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,i,a){return this.set(1,n,i,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,i=t._x,a=t._y,o=t._z,s=t._w,c=i+i,l=a+a,u=o+o,d=i*c,f=i*l,p=i*u,m=a*l,h=a*u,g=o*u,_=s*c,v=s*l,y=s*u,b=n.x,x=n.y,S=n.z;return r[0]=(1-(m+g))*b,r[1]=(f+y)*b,r[2]=(p-v)*b,r[3]=0,r[4]=(f-y)*x,r[5]=(1-(d+g))*x,r[6]=(h+_)*x,r[7]=0,r[8]=(p+v)*S,r[9]=(h-_)*S,r[10]=(1-(d+m))*S,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let i=this.determinantAffine();if(i===0)return n.set(1,1,1),t.identity(),this;let a=Ua.set(r[0],r[1],r[2]).length(),o=Ua.set(r[4],r[5],r[6]).length(),s=Ua.set(r[8],r[9],r[10]).length();i<0&&(a=-a),Wa.copy(this);let c=1/a,l=1/o,u=1/s;return Wa.elements[0]*=c,Wa.elements[1]*=c,Wa.elements[2]*=c,Wa.elements[4]*=l,Wa.elements[5]*=l,Wa.elements[6]*=l,Wa.elements[8]*=u,Wa.elements[9]*=u,Wa.elements[10]*=u,t.setFromRotationMatrix(Wa),n.x=a,n.y=o,n.z=s,this}makePerspective(e,t,n,r,i,a,o=Li,s=!1){let c=this.elements,l=2*i/(t-e),u=2*i/(n-r),d=(t+e)/(t-e),f=(n+r)/(n-r),p,m;if(s)p=i/(a-i),m=a*i/(a-i);else if(o===2e3)p=-(a+i)/(a-i),m=-2*a*i/(a-i);else if(o===2001)p=-a/(a-i),m=-a*i/(a-i);else throw Error(`THREE.Matrix4.makePerspective(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,i,a,o=Li,s=!1){let c=this.elements,l=2/(t-e),u=2/(n-r),d=-(t+e)/(t-e),f=-(n+r)/(n-r),p,m;if(s)p=1/(a-i),m=a/(a-i);else if(o===2e3)p=-2/(a-i),m=-(a+i)/(a-i);else if(o===2001)p=-1/(a-i),m=-i/(a-i);else throw Error(`THREE.Matrix4.makeOrthographic(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<16;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},Ua=new U,Wa=new K,Ga=new U(0,0,0),Ka=new U(1,1,1),qa=new U,Ja=new U,Ya=new U,Xa=new K,Za=new xa,Qa=class e{constructor(t=0,n=0,r=0,i=e.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=r,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,i=r[0],a=r[4],o=r[8],s=r[1],c=r[5],l=r[9],u=r[2],d=r[6],f=r[10];switch(t){case`XYZ`:this._y=Math.asin(V(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-l,f),this._z=Math.atan2(-a,i)):(this._x=Math.atan2(d,c),this._z=0);break;case`YXZ`:this._x=Math.asin(-V(l,-1,1)),Math.abs(l)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(s,c)):(this._y=Math.atan2(-u,i),this._z=0);break;case`ZXY`:this._x=Math.asin(V(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(s,i));break;case`ZYX`:this._y=Math.asin(-V(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(s,i)):(this._x=0,this._z=Math.atan2(-a,c));break;case`YZX`:this._z=Math.asin(V(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(-l,c),this._y=Math.atan2(-u,i)):(this._x=0,this._y=Math.atan2(o,f));break;case`XZY`:this._z=Math.asin(-V(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,i)):(this._x=Math.atan2(-l,f),this._y=0);break;default:z(`Euler: .setFromRotationMatrix() encountered an unknown order: `+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Xa.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Xa,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Za.setFromEuler(this),this.setFromQuaternion(Za,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Qa.DEFAULT_ORDER=`XYZ`;var $a=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&(1<<e|0))}},eo=0,to=new U,no=new xa,ro=new K,io=new U,ao=new U,oo=new U,so=new xa,co=new U(1,0,0),lo=new U(0,1,0),uo=new U(0,0,1),fo={type:`added`},po={type:`removed`},mo={type:`childadded`,child:null},ho={type:`childremoved`,child:null},go=class e extends Ji{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:eo++}),this.uuid=$i(),this.name=``,this.type=`Object3D`,this.parent=null,this.children=[],this.up=e.DEFAULT_UP.clone();let t=new U,n=new Qa,r=new xa,i=new U(1,1,1);function a(){r.setFromEuler(n,!1)}function o(){n.setFromQuaternion(r,void 0,!1)}n._onChange(a),r._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new K},normalMatrix:{value:new W}}),this.matrix=new K,this.matrixWorld=new K,this.matrixAutoUpdate=e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new $a,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return no.setFromAxisAngle(e,t),this.quaternion.multiply(no),this}rotateOnWorldAxis(e,t){return no.setFromAxisAngle(e,t),this.quaternion.premultiply(no),this}rotateX(e){return this.rotateOnAxis(co,e)}rotateY(e){return this.rotateOnAxis(lo,e)}rotateZ(e){return this.rotateOnAxis(uo,e)}translateOnAxis(e,t){return to.copy(e).applyQuaternion(this.quaternion),this.position.add(to.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(co,e)}translateY(e){return this.translateOnAxis(lo,e)}translateZ(e){return this.translateOnAxis(uo,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ro.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?io.copy(e):io.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),ao.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ro.lookAt(ao,io,this.up):ro.lookAt(io,ao,this.up),this.quaternion.setFromRotationMatrix(ro),r&&(ro.extractRotation(r.matrixWorld),no.setFromRotationMatrix(ro),this.quaternion.premultiply(no.invert()))}add(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return e===this?(B(`Object3D.add: object can't be added as a child of itself.`,e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(fo),mo.child=e,this.dispatchEvent(mo),mo.child=null):B(`Object3D.add: object not an instance of THREE.Object3D.`,e),this)}remove(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.remove(arguments[e]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(po),ho.child=e,this.dispatchEvent(ho),ho.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ro.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ro.multiply(e.parent.matrixWorld)),e.applyMatrix4(ro),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(fo),mo.child=e,this.dispatchEvent(mo),mo.child=null,this}getObjectById(e){return this.getObjectByProperty(`id`,e)}getObjectByName(e){return this.getObjectByProperty(`name`,e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let r=this.children[n].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let i=0,a=r.length;i<a;i++)r[i].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ao,e,oo),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ao,so,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,r=e.z,i=this.matrix.elements;i[12]+=t-i[0]*t-i[4]*n-i[8]*r,i[13]+=n-i[1]*t-i[5]*n-i[9]*r,i[14]+=r-i[2]*t-i[6]*n-i[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let e=this.children;for(let t=0,r=e.length;t<r;t++)e[t].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e==`string`,n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:`Object`,generator:`Object3D.toJSON`});let r={};r.uuid=this.uuid,r.type=this.type,this.name!==``&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),this.static!==!1&&(r.static=this.static),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type=`InstancedMesh`,r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type=`BatchedMesh`,r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(e=>({...e,boundingBox:e.boundingBox?e.boundingBox.toJSON():void 0,boundingSphere:e.boundingSphere?e.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(e=>({...e})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function i(t,n){return t[n.uuid]===void 0&&(t[n.uuid]=n.toJSON(e)),n.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=i(e.geometries,this.geometry);let t=this.geometry.parameters;if(t!==void 0&&t.shapes!==void 0){let n=t.shapes;if(Array.isArray(n))for(let t=0,r=n.length;t<r;t++){let r=n[t];i(e.shapes,r)}else i(e.shapes,n)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(i(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0){if(Array.isArray(this.material)){let t=[];for(let n=0,r=this.material.length;n<r;n++)t.push(i(e.materials,this.material[n]));r.material=t}else r.material=i(e.materials,this.material)}if(this.children.length>0){r.children=[];for(let t=0;t<this.children.length;t++)r.children.push(this.children[t].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let t=0;t<this.animations.length;t++){let n=this.animations[t];r.animations.push(i(e.animations,n))}}if(t){let t=a(e.geometries),r=a(e.materials),i=a(e.textures),o=a(e.images),s=a(e.shapes),c=a(e.skeletons),l=a(e.animations),u=a(e.nodes);t.length>0&&(n.geometries=t),r.length>0&&(n.materials=r),i.length>0&&(n.textures=i),o.length>0&&(n.images=o),s.length>0&&(n.shapes=s),c.length>0&&(n.skeletons=c),l.length>0&&(n.animations=l),u.length>0&&(n.nodes=u)}return n.object=r,n;function a(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot===null?null:e.pivot.clone(),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let t=0;t<e.children.length;t++){let n=e.children[t];this.add(n.clone())}return this}};go.DEFAULT_UP=new U(0,1,0),go.DEFAULT_MATRIX_AUTO_UPDATE=!0,go.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var _o=class extends go{constructor(){super(),this.isGroup=!0,this.type=`Group`}},vo={type:`move`},yo=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new _o,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new _o,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new U,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new U),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new _o,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new U,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new U,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:`connected`,data:e}),this}disconnect(e){return this.dispatchEvent({type:`disconnected`,data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,i=null,a=null,o=this._targetRay,s=this._grip,c=this._hand;if(e&&t.session.visibilityState!==`visible-blurred`){if(c&&e.hand){a=!0;for(let r of e.hand.values()){let e=t.getJointPose(r,n),i=this._getHandJoint(c,r);e!==null&&(i.matrix.fromArray(e.transform.matrix),i.matrix.decompose(i.position,i.rotation,i.scale),i.matrixWorldNeedsUpdate=!0,i.jointRadius=e.radius),i.visible=e!==null}let r=c.joints[`index-finger-tip`],i=c.joints[`thumb-tip`],o=r.position.distanceTo(i.position);c.inputState.pinching&&o>.025?(c.inputState.pinching=!1,this.dispatchEvent({type:`pinchend`,handedness:e.handedness,target:this})):!c.inputState.pinching&&o<=.015&&(c.inputState.pinching=!0,this.dispatchEvent({type:`pinchstart`,handedness:e.handedness,target:this}))}else s!==null&&e.gripSpace&&(i=t.getPose(e.gripSpace,n),i!==null&&(s.matrix.fromArray(i.transform.matrix),s.matrix.decompose(s.position,s.rotation,s.scale),s.matrixWorldNeedsUpdate=!0,i.linearVelocity?(s.hasLinearVelocity=!0,s.linearVelocity.copy(i.linearVelocity)):s.hasLinearVelocity=!1,i.angularVelocity?(s.hasAngularVelocity=!0,s.angularVelocity.copy(i.angularVelocity)):s.hasAngularVelocity=!1,s.eventsEnabled&&s.dispatchEvent({type:`gripUpdated`,data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&i!==null&&(r=i),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(vo)))}return o!==null&&(o.visible=r!==null),s!==null&&(s.visible=i!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new _o;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},bo={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},xo={h:0,s:0,l:0},So={h:0,s:0,l:0};function Co(e,t,n){return n<0&&(n+=1),n>1&&--n,n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}var q=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let t=e;t&&t.isColor?this.copy(t):typeof t==`number`?this.setHex(t):typeof t==`string`&&this.setStyle(t)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=ji){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,G.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=G.workingColorSpace){return this.r=e,this.g=t,this.b=n,G.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=G.workingColorSpace){if(e=ea(e,1),t=V(t,0,1),n=V(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,i=2*n-r;this.r=Co(i,r,e+1/3),this.g=Co(i,r,e),this.b=Co(i,r,e-1/3)}return G.colorSpaceToWorking(this,r),this}setStyle(e,t=ji){function n(t){t!==void 0&&parseFloat(t)<1&&z(`Color: Alpha component of `+e+` will be ignored.`)}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let i,a=r[1],o=r[2];switch(a){case`rgb`:case`rgba`:if(i=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(255,parseInt(i[1],10))/255,Math.min(255,parseInt(i[2],10))/255,Math.min(255,parseInt(i[3],10))/255,t);if(i=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(100,parseInt(i[1],10))/100,Math.min(100,parseInt(i[2],10))/100,Math.min(100,parseInt(i[3],10))/100,t);break;case`hsl`:case`hsla`:if(i=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setHSL(parseFloat(i[1])/360,parseFloat(i[2])/100,parseFloat(i[3])/100,t);break;default:z(`Color: Unknown color model `+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let n=r[1],i=n.length;if(i===3)return this.setRGB(parseInt(n.charAt(0),16)/15,parseInt(n.charAt(1),16)/15,parseInt(n.charAt(2),16)/15,t);if(i===6)return this.setHex(parseInt(n,16),t);z(`Color: Invalid hex color `+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=ji){let n=bo[e.toLowerCase()];return n===void 0?z(`Color: Unknown color `+e):this.setHex(n,t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Oa(e.r),this.g=Oa(e.g),this.b=Oa(e.b),this}copyLinearToSRGB(e){return this.r=ka(e.r),this.g=ka(e.g),this.b=ka(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=ji){return G.workingToColorSpace(wo.copy(this),e),Math.round(V(wo.r*255,0,255))*65536+Math.round(V(wo.g*255,0,255))*256+Math.round(V(wo.b*255,0,255))}getHexString(e=ji){return(`000000`+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=G.workingColorSpace){G.workingToColorSpace(wo.copy(this),t);let n=wo.r,r=wo.g,i=wo.b,a=Math.max(n,r,i),o=Math.min(n,r,i),s,c,l=(o+a)/2;if(o===a)s=0,c=0;else{let e=a-o;switch(c=l<=.5?e/(a+o):e/(2-a-o),a){case n:s=(r-i)/e+(r<i?6:0);break;case r:s=(i-n)/e+2;break;case i:s=(n-r)/e+4}s/=6}return e.h=s,e.s=c,e.l=l,e}getRGB(e,t=G.workingColorSpace){return G.workingToColorSpace(wo.copy(this),t),e.r=wo.r,e.g=wo.g,e.b=wo.b,e}getStyle(e=ji){G.workingToColorSpace(wo.copy(this),e);let t=wo.r,n=wo.g,r=wo.b;return e===`srgb`?`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`:`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`}offsetHSL(e,t,n){return this.getHSL(xo),this.setHSL(xo.h+e,xo.s+t,xo.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(xo),e.getHSL(So);let n=ra(xo.h,So.h,t),r=ra(xo.s,So.s,t),i=ra(xo.l,So.l,t);return this.setHSL(n,r,i),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,i=e.elements;return this.r=i[0]*t+i[3]*n+i[6]*r,this.g=i[1]*t+i[4]*n+i[7]*r,this.b=i[2]*t+i[5]*n+i[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},wo=new q;q.NAMES=bo;var To=class e{constructor(e,t=1,n=1e3){this.isFog=!0,this.name=``,this.color=new q(e),this.near=t,this.far=n}clone(){return new e(this.color,this.near,this.far)}toJSON(){return{type:`Fog`,name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},Eo=class extends go{constructor(){super(),this.isScene=!0,this.type=`Scene`,this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Qa,this.environmentIntensity=1,this.environmentRotation=new Qa,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},Do=new U,Oo=new U,ko=new U,Ao=new U,jo=new U,Mo=new U,No=new U,Po=new U,Fo=new U,Io=new U,Lo=new Ra,Ro=new Ra,zo=new Ra,Bo=class e{constructor(e=new U,t=new U,n=new U){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),Do.subVectors(e,t),r.cross(Do);let i=r.lengthSq();return i>0?r.multiplyScalar(1/Math.sqrt(i)):r.set(0,0,0)}static getBarycoord(e,t,n,r,i){Do.subVectors(r,t),Oo.subVectors(n,t),ko.subVectors(e,t);let a=Do.dot(Do),o=Do.dot(Oo),s=Do.dot(ko),c=Oo.dot(Oo),l=Oo.dot(ko),u=a*c-o*o;if(u===0)return i.set(0,0,0),null;let d=1/u,f=(c*s-o*l)*d,p=(a*l-o*s)*d;return i.set(1-f-p,p,f)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,Ao)!==null&&Ao.x>=0&&Ao.y>=0&&Ao.x+Ao.y<=1}static getInterpolation(e,t,n,r,i,a,o,s){return this.getBarycoord(e,t,n,r,Ao)===null?(s.x=0,s.y=0,`z`in s&&(s.z=0),`w`in s&&(s.w=0),null):(s.setScalar(0),s.addScaledVector(i,Ao.x),s.addScaledVector(a,Ao.y),s.addScaledVector(o,Ao.z),s)}static getInterpolatedAttribute(e,t,n,r,i,a){return Lo.setScalar(0),Ro.setScalar(0),zo.setScalar(0),Lo.fromBufferAttribute(e,t),Ro.fromBufferAttribute(e,n),zo.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(Lo,i.x),a.addScaledVector(Ro,i.y),a.addScaledVector(zo,i.z),a}static isFrontFacing(e,t,n,r){return Do.subVectors(n,t),Oo.subVectors(e,t),Do.cross(Oo).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Do.subVectors(this.c,this.b),Oo.subVectors(this.a,this.b),Do.cross(Oo).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return e.getNormal(this.a,this.b,this.c,t)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return e.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,r,i,a){return e.getInterpolation(t,this.a,this.b,this.c,n,r,i,a)}containsPoint(t){return e.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return e.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,i=this.c,a,o;jo.subVectors(r,n),Mo.subVectors(i,n),Po.subVectors(e,n);let s=jo.dot(Po),c=Mo.dot(Po);if(s<=0&&c<=0)return t.copy(n);Fo.subVectors(e,r);let l=jo.dot(Fo),u=Mo.dot(Fo);if(l>=0&&u<=l)return t.copy(r);let d=s*u-l*c;if(d<=0&&s>=0&&l<=0)return a=s/(s-l),t.copy(n).addScaledVector(jo,a);Io.subVectors(e,i);let f=jo.dot(Io),p=Mo.dot(Io);if(p>=0&&f<=p)return t.copy(i);let m=f*c-s*p;if(m<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(n).addScaledVector(Mo,o);let h=l*p-f*u;if(h<=0&&u-l>=0&&f-p>=0)return No.subVectors(i,r),o=(u-l)/(u-l+(f-p)),t.copy(r).addScaledVector(No,o);let g=1/(h+m+d);return a=m*g,o=d*g,t.copy(n).addScaledVector(jo,a).addScaledVector(Mo,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Vo=class{constructor(e=new U(1/0,1/0,1/0),t=new U(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Uo.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Uo.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Uo.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute(`position`);if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let t=0,n=r.count;t<n;t++)e.isMesh===!0?e.getVertexPosition(t,Uo):Uo.fromBufferAttribute(r,t),Uo.applyMatrix4(e.matrixWorld),this.expandByPoint(Uo);else e.boundingBox===void 0?(n.boundingBox===null&&n.computeBoundingBox(),Wo.copy(n.boundingBox)):(e.boundingBox===null&&e.computeBoundingBox(),Wo.copy(e.boundingBox)),Wo.applyMatrix4(e.matrixWorld),this.union(Wo)}let r=e.children;for(let e=0,n=r.length;e<n;e++)this.expandByObject(r[e],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Uo),Uo.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Zo),Qo.subVectors(this.max,Zo),Go.subVectors(e.a,Zo),Ko.subVectors(e.b,Zo),qo.subVectors(e.c,Zo),Jo.subVectors(Ko,Go),Yo.subVectors(qo,Ko),Xo.subVectors(Go,qo);let t=[0,-Jo.z,Jo.y,0,-Yo.z,Yo.y,0,-Xo.z,Xo.y,Jo.z,0,-Jo.x,Yo.z,0,-Yo.x,Xo.z,0,-Xo.x,-Jo.y,Jo.x,0,-Yo.y,Yo.x,0,-Xo.y,Xo.x,0];return!ts(t,Go,Ko,qo,Qo)||(t=[1,0,0,0,1,0,0,0,1],!ts(t,Go,Ko,qo,Qo))?!1:($o.crossVectors(Jo,Yo),t=[$o.x,$o.y,$o.z],ts(t,Go,Ko,qo,Qo))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Uo).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Uo).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Ho[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Ho[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Ho[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Ho[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Ho[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Ho[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Ho[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Ho[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Ho),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Ho=[new U,new U,new U,new U,new U,new U,new U,new U],Uo=new U,Wo=new Vo,Go=new U,Ko=new U,qo=new U,Jo=new U,Yo=new U,Xo=new U,Zo=new U,Qo=new U,$o=new U,es=new U;function ts(e,t,n,r,i){for(let a=0,o=e.length-3;a<=o;a+=3){es.fromArray(e,a);let o=i.x*Math.abs(es.x)+i.y*Math.abs(es.y)+i.z*Math.abs(es.z),s=t.dot(es),c=n.dot(es),l=r.dot(es);if(Math.max(-Math.max(s,c,l),Math.min(s,c,l))>o)return!1}return!0}var ns=new U,rs=new H,is=0,as=class extends Ji{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw TypeError(`THREE.BufferAttribute: array should be a Typed Array.`);this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:is++}),this.name=``,this.array=e,this.itemSize=t,this.count=e===void 0?0:e.length/t,this.normalized=n,this.usage=Ii,this.updateRanges=[],this.gpuType=Cr,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,i=this.itemSize;r<i;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)rs.fromBufferAttribute(this,t),rs.applyMatrix3(e),this.setXY(t,rs.x,rs.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)ns.fromBufferAttribute(this,t),ns.applyMatrix3(e),this.setXYZ(t,ns.x,ns.y,ns.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)ns.fromBufferAttribute(this,t),ns.applyMatrix4(e),this.setXYZ(t,ns.x,ns.y,ns.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)ns.fromBufferAttribute(this,t),ns.applyNormalMatrix(e),this.setXYZ(t,ns.x,ns.y,ns.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)ns.fromBufferAttribute(this,t),ns.transformDirection(e),this.setXYZ(t,ns.x,ns.y,ns.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=va(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=ya(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=va(t,this.array)),t}setX(e,t){return this.normalized&&(t=ya(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=va(t,this.array)),t}setY(e,t){return this.normalized&&(t=ya(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=va(t,this.array)),t}setZ(e,t){return this.normalized&&(t=ya(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=va(t,this.array)),t}setW(e,t){return this.normalized&&(t=ya(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=ya(t,this.array),n=ya(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=ya(t,this.array),n=ya(n,this.array),r=ya(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e*=this.itemSize,this.normalized&&(t=ya(t,this.array),n=ya(n,this.array),r=ya(r,this.array),i=ya(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=i,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==``&&(e.name=this.name),this.usage!==35044&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:`dispose`})}},os=class extends as{constructor(e,t,n){super(new Uint16Array(e),t,n)}},ss=class extends as{constructor(e,t,n){super(new Uint32Array(e),t,n)}},cs=class extends as{constructor(e,t,n){super(new Float32Array(e),t,n)}},ls=new Vo,us=new U,ds=new U,fs=class{constructor(e=new U,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t===void 0?ls.setFromPoints(e).getCenter(n):n.copy(t);let r=0;for(let t=0,i=e.length;t<i;t++)r=Math.max(r,n.distanceToSquared(e[t]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius*=e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;us.subVectors(e,this.center);let t=us.lengthSq();if(t>this.radius*this.radius){let e=Math.sqrt(t),n=(e-this.radius)*.5;this.center.addScaledVector(us,n/e),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(ds.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(us.copy(e.center).add(ds)),this.expandByPoint(us.copy(e.center).sub(ds))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},ps=0,ms=new K,hs=new go,gs=new U,_s=new Vo,vs=new Vo,ys=new U,bs=class e extends Ji{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:ps++}),this.uuid=$i(),this.name=``,this.type=`BufferGeometry`,this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return this.index=Array.isArray(e)?new(Ri(e)?ss:os)(e,1):e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let t=new W().getNormalMatrix(e);n.applyNormalMatrix(t),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return ms.makeRotationFromQuaternion(e),this.applyMatrix4(ms),this}rotateX(e){return ms.makeRotationX(e),this.applyMatrix4(ms),this}rotateY(e){return ms.makeRotationY(e),this.applyMatrix4(ms),this}rotateZ(e){return ms.makeRotationZ(e),this.applyMatrix4(ms),this}translate(e,t,n){return ms.makeTranslation(e,t,n),this.applyMatrix4(ms),this}scale(e,t,n){return ms.makeScale(e,t,n),this.applyMatrix4(ms),this}lookAt(e){return hs.lookAt(e),hs.updateMatrix(),this.applyMatrix4(hs.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(gs).negate(),this.translate(gs.x,gs.y,gs.z),this}setFromPoints(e){let t=this.getAttribute(`position`);if(t===void 0){let t=[];for(let n=0,r=e.length;n<r;n++){let r=e[n];t.push(r.x,r.y,r.z||0)}this.setAttribute(`position`,new cs(t,3))}else{let n=Math.min(e.length,t.count);for(let r=0;r<n;r++){let n=e[r];t.setXYZ(r,n.x,n.y,n.z||0)}e.length>t.count&&z(`BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.`),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Vo);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){B(`BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.`,this),this.boundingBox.set(new U(-1/0,-1/0,-1/0),new U(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];_s.setFromBufferAttribute(n),this.morphTargetsRelative?(ys.addVectors(this.boundingBox.min,_s.min),this.boundingBox.expandByPoint(ys),ys.addVectors(this.boundingBox.max,_s.max),this.boundingBox.expandByPoint(ys)):(this.boundingBox.expandByPoint(_s.min),this.boundingBox.expandByPoint(_s.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&B(`BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.`,this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new fs);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){B(`BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.`,this),this.boundingSphere.set(new U,1/0);return}if(e){let n=this.boundingSphere.center;if(_s.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];vs.setFromBufferAttribute(n),this.morphTargetsRelative?(ys.addVectors(_s.min,vs.min),_s.expandByPoint(ys),ys.addVectors(_s.max,vs.max),_s.expandByPoint(ys)):(_s.expandByPoint(vs.min),_s.expandByPoint(vs.max))}_s.getCenter(n);let r=0;for(let t=0,i=e.count;t<i;t++)ys.fromBufferAttribute(e,t),r=Math.max(r,n.distanceToSquared(ys));if(t)for(let i=0,a=t.length;i<a;i++){let a=t[i],o=this.morphTargetsRelative;for(let t=0,i=a.count;t<i;t++)ys.fromBufferAttribute(a,t),o&&(gs.fromBufferAttribute(e,t),ys.add(gs)),r=Math.max(r,n.distanceToSquared(ys))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&B(`BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.`,this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){B(`BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)`);return}let n=t.position,r=t.normal,i=t.uv,a=this.getAttribute(`tangent`);(a===void 0||a.count!==n.count)&&(a=new as(new Float32Array(4*n.count),4),this.setAttribute(`tangent`,a));let o=[],s=[];for(let e=0;e<n.count;e++)o[e]=new U,s[e]=new U;let c=new U,l=new U,u=new U,d=new H,f=new H,p=new H,m=new U,h=new U;function g(e,t,r){c.fromBufferAttribute(n,e),l.fromBufferAttribute(n,t),u.fromBufferAttribute(n,r),d.fromBufferAttribute(i,e),f.fromBufferAttribute(i,t),p.fromBufferAttribute(i,r),l.sub(c),u.sub(c),f.sub(d),p.sub(d);let a=1/(f.x*p.y-p.x*f.y);isFinite(a)&&(m.copy(l).multiplyScalar(p.y).addScaledVector(u,-f.y).multiplyScalar(a),h.copy(u).multiplyScalar(f.x).addScaledVector(l,-p.x).multiplyScalar(a),o[e].add(m),o[t].add(m),o[r].add(m),s[e].add(h),s[t].add(h),s[r].add(h))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)g(e.getX(t+0),e.getX(t+1),e.getX(t+2))}let v=new U,y=new U,b=new U,x=new U;function S(e){b.fromBufferAttribute(r,e),x.copy(b);let t=o[e];v.copy(t),v.sub(b.multiplyScalar(b.dot(t))).normalize(),y.crossVectors(x,t);let n=y.dot(s[e])<0?-1:1;a.setXYZW(e,v.x,v.y,v.z,n)}for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)S(e.getX(t+0)),S(e.getX(t+1)),S(e.getX(t+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute(`position`);if(t!==void 0){let n=this.getAttribute(`normal`);if(n===void 0||n.count!==t.count)n=new as(new Float32Array(t.count*3),3),this.setAttribute(`normal`,n);else for(let e=0,t=n.count;e<t;e++)n.setXYZ(e,0,0,0);let r=new U,i=new U,a=new U,o=new U,s=new U,c=new U,l=new U,u=new U;if(e)for(let d=0,f=e.count;d<f;d+=3){let f=e.getX(d+0),p=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(t,f),i.fromBufferAttribute(t,p),a.fromBufferAttribute(t,m),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),o.fromBufferAttribute(n,f),s.fromBufferAttribute(n,p),c.fromBufferAttribute(n,m),o.add(l),s.add(l),c.add(l),n.setXYZ(f,o.x,o.y,o.z),n.setXYZ(p,s.x,s.y,s.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let e=0,o=t.count;e<o;e+=3)r.fromBufferAttribute(t,e+0),i.fromBufferAttribute(t,e+1),a.fromBufferAttribute(t,e+2),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),n.setXYZ(e+0,l.x,l.y,l.z),n.setXYZ(e+1,l.x,l.y,l.z),n.setXYZ(e+2,l.x,l.y,l.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)ys.fromBufferAttribute(e,t),ys.normalize(),e.setXYZ(t,ys.x,ys.y,ys.z)}toNonIndexed(){function t(e,t){let n=e.array,r=e.itemSize,i=e.normalized,a=new n.constructor(t.length*r),o=0,s=0;for(let i=0,c=t.length;i<c;i++){o=e.isInterleavedBufferAttribute?t[i]*e.data.stride+e.offset:t[i]*r;for(let e=0;e<r;e++)a[s++]=n[o++]}return new as(a,r,i)}if(this.index===null)return z(`BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed.`),this;let n=new e,r=this.index.array,i=this.attributes;for(let e in i){let a=i[e],o=t(a,r);n.setAttribute(e,o)}let a=this.morphAttributes;for(let e in a){let i=[],o=a[e];for(let e=0,n=o.length;e<n;e++){let n=o[e],a=t(n,r);i.push(a)}n.morphAttributes[e]=i}n.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let e=0,t=o.length;e<t;e++){let t=o[e];n.addGroup(t.start,t.count,t.materialIndex)}return n}toJSON(){let e={metadata:{version:4.7,type:`BufferGeometry`,generator:`BufferGeometry.toJSON`}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?`BufferGeometry`:this.type,this.name!==``&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let t=this.parameters;for(let n in t)t[n]!==void 0&&(e[n]=t[n]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let t in n){let r=n[t];e.data.attributes[t]=r.toJSON(e.data)}let r={},i=!1;for(let t in this.morphAttributes){let n=this.morphAttributes[t],a=[];for(let t=0,r=n.length;t<r;t++){let r=n[t];a.push(r.toJSON(e.data))}a.length>0&&(r[t]=a,i=!0)}i&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let r=e.attributes;for(let e in r){let n=r[e];this.setAttribute(e,n.clone(t))}let i=e.morphAttributes;for(let e in i){let n=[],r=i[e];for(let e=0,i=r.length;e<i;e++)n.push(r[e].clone(t));this.morphAttributes[e]=n}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let e=0,t=a.length;e<t;e++){let t=a[e];this.addGroup(t.start,t.count,t.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let s=e.boundingSphere;return s!==null&&(this.boundingSphere=s.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:`dispose`})}},xs=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e===void 0?0:e.length/t,this.usage=Ii,this.updateRanges=[],this.version=0,this.uuid=$i()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let r=0,i=this.stride;r<i;r++)this.array[e+r]=t.array[n+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=$i()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=$i()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},Ss=new U,Cs=class e{constructor(e,t,n,r=!1){this.isInterleavedBufferAttribute=!0,this.name=``,this.data=e,this.itemSize=t,this.offset=n,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Ss.fromBufferAttribute(this,t),Ss.applyMatrix4(e),this.setXYZ(t,Ss.x,Ss.y,Ss.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Ss.fromBufferAttribute(this,t),Ss.applyNormalMatrix(e),this.setXYZ(t,Ss.x,Ss.y,Ss.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Ss.fromBufferAttribute(this,t),Ss.transformDirection(e),this.setXYZ(t,Ss.x,Ss.y,Ss.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=va(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=ya(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=ya(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=ya(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=ya(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=ya(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=va(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=va(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=va(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=va(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=ya(t,this.array),n=ya(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=ya(t,this.array),n=ya(n,this.array),r=ya(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=ya(t,this.array),n=ya(n,this.array),r=ya(r,this.array),i=ya(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this.data.array[e+3]=i,this}clone(t){if(t===void 0){Ui(`InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.`);let e=[];for(let t=0;t<this.count;t++){let n=t*this.data.stride+this.offset;for(let t=0;t<this.itemSize;t++)e.push(this.data.array[n+t])}return new as(new this.array.constructor(e),this.itemSize,this.normalized)}return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new e(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){Ui(`InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.`);let e=[];for(let t=0;t<this.count;t++){let n=t*this.data.stride+this.offset;for(let t=0;t<this.itemSize;t++)e.push(this.data.array[n+t])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},ws=0,Ts=class extends Ji{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:ws++}),this.uuid=$i(),this.name=``,this.type=`Material`,this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new q(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Fi,this.stencilZFail=Fi,this.stencilZPass=Fi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){z(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){z(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector2&&n&&n.isVector2||r&&r.isEuler&&n&&n.isEuler||r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:`Material`,generator:`Material.toJSON`}};n.uuid=this.uuid,n.type=this.type,this.name!==``&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==1&&(n.blending=this.blending),this.side!==0&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==204&&(n.blendSrc=this.blendSrc),this.blendDst!==205&&(n.blendDst=this.blendDst),this.blendEquation!==100&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==3&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==519&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==7680&&(n.stencilFail=this.stencilFail),this.stencilZFail!==7680&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==7680&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==`round`&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==`round`&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}if(t){let t=r(e.textures),i=r(e.images);t.length>0&&(n.textures=t),i.length>0&&(n.images=i)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new q().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(this.vertexColors=typeof e.vertexColors==`number`?e.vertexColors>0:e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let t=e.normalScale;Array.isArray(t)===!1&&(t=[t,t]),this.normalScale=new H().fromArray(t)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new H().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let e=t.length;n=Array(e);for(let r=0;r!==e;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:`dispose`})}set needsUpdate(e){e===!0&&this.version++}},Es=new U,Ds=new U,Os=new U,ks=new U,As=new U,js=new U,Ms=new U,Ns=class{constructor(e=new U,t=new U(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Es)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Es.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Es.copy(this.origin).addScaledVector(this.direction,t),Es.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){Ds.copy(e).add(t).multiplyScalar(.5),Os.copy(t).sub(e).normalize(),ks.copy(this.origin).sub(Ds);let i=e.distanceTo(t)*.5,a=-this.direction.dot(Os),o=ks.dot(this.direction),s=-ks.dot(Os),c=ks.lengthSq(),l=Math.abs(1-a*a),u,d,f,p;if(l>0){if(u=a*s-o,d=a*o-s,p=i*l,u>=0){if(d>=-p){if(d<=p){let e=1/l;u*=e,d*=e,f=u*(u+a*d+2*o)+d*(a*u+d+2*s)+c}else d=i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d=-i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d<=-p?(u=Math.max(0,-(-a*i+o)),d=u>0?-i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c):d<=p?(u=0,d=Math.min(Math.max(-i,-s),i),f=d*(d+2*s)+c):(u=Math.max(0,-(a*i+o)),d=u>0?i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c)}else d=a>0?-i:i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(Ds).addScaledVector(Os,d),f}intersectSphere(e,t){Es.subVectors(e.center,this.origin);let n=Es.dot(this.direction),r=Es.dot(Es)-n*n,i=e.radius*e.radius;if(r>i)return null;let a=Math.sqrt(i-r),o=n-a,s=n+a;return s<0?null:o<0?this.at(s,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,i,a,o,s,c=1/this.direction.x,l=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),l>=0?(i=(e.min.y-d.y)*l,a=(e.max.y-d.y)*l):(i=(e.max.y-d.y)*l,a=(e.min.y-d.y)*l),n>a||i>r||((i>n||isNaN(n))&&(n=i),(a<r||isNaN(r))&&(r=a),u>=0?(o=(e.min.z-d.z)*u,s=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,s=(e.min.z-d.z)*u),n>s||o>r)||((o>n||n!==n)&&(n=o),(s<r||r!==r)&&(r=s),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,Es)!==null}intersectTriangle(e,t,n,r,i){As.subVectors(t,e),js.subVectors(n,e),Ms.crossVectors(As,js);let a=this.direction.dot(Ms),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;ks.subVectors(this.origin,e);let s=o*this.direction.dot(js.crossVectors(ks,js));if(s<0)return null;let c=o*this.direction.dot(As.cross(ks));if(c<0||s+c>a)return null;let l=-o*ks.dot(Ms);return l<0?null:this.at(l/a,i)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Ps=class extends Ts{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type=`MeshBasicMaterial`,this.color=new q(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Qa,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Fs=new K,Is=new Ns,Ls=new fs,Rs=new U,zs=new U,Bs=new U,Vs=new U,Hs=new U,Us=new U,Ws=new U,Gs=new U,J=class extends go{constructor(e=new bs,t=new Ps){super(),this.isMesh=!0,this.type=`Mesh`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,i=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(i&&o){Us.set(0,0,0);for(let n=0,r=i.length;n<r;n++){let r=o[n],s=i[n];r!==0&&(Hs.fromBufferAttribute(s,e),a?Us.addScaledVector(Hs,r):Us.addScaledVector(Hs.sub(t),r))}t.add(Us)}return t}raycast(e,t){let n=this.geometry,r=this.material,i=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Ls.copy(n.boundingSphere),Ls.applyMatrix4(i),Is.copy(e.ray).recast(e.near),!(Ls.containsPoint(Is.origin)===!1&&(Is.intersectSphere(Ls,Rs)===null||Is.origin.distanceToSquared(Rs)>(e.far-e.near)**2))&&(Fs.copy(i).invert(),Is.copy(e.ray).applyMatrix4(Fs),(n.boundingBox===null||Is.intersectsBox(n.boundingBox)!==!1)&&this._computeIntersections(e,t,Is)))}_computeIntersections(e,t,n){let r,i=this.geometry,a=this.material,o=i.index,s=i.attributes.position,c=i.attributes.uv,l=i.attributes.uv1,u=i.attributes.normal,d=i.groups,f=i.drawRange;if(o!==null){if(Array.isArray(a))for(let i=0,s=d.length;i<s;i++){let s=d[i],p=a[s.materialIndex],m=Math.max(s.start,f.start),h=Math.min(o.count,Math.min(s.start+s.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=o.getX(i),d=o.getX(i+1),f=o.getX(i+2);r=qs(this,p,e,n,c,l,u,a,d,f),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=s.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),s=Math.min(o.count,f.start+f.count);for(let d=i,f=s;d<f;d+=3){let i=o.getX(d),s=o.getX(d+1),f=o.getX(d+2);r=qs(this,a,e,n,c,l,u,i,s,f),r&&(r.faceIndex=Math.floor(d/3),t.push(r))}}}else if(s!==void 0){if(Array.isArray(a))for(let i=0,o=d.length;i<o;i++){let o=d[i],p=a[o.materialIndex],m=Math.max(o.start,f.start),h=Math.min(s.count,Math.min(o.start+o.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=i,s=i+1,d=i+2;r=qs(this,p,e,n,c,l,u,a,s,d),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=o.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),o=Math.min(s.count,f.start+f.count);for(let s=i,d=o;s<d;s+=3){let i=s,o=s+1,d=s+2;r=qs(this,a,e,n,c,l,u,i,o,d),r&&(r.faceIndex=Math.floor(s/3),t.push(r))}}}}};function Ks(e,t,n,r,i,a,o,s){let c;if(c=t.side===1?r.intersectTriangle(o,a,i,!0,s):r.intersectTriangle(i,a,o,t.side===0,s),c===null)return null;Gs.copy(s),Gs.applyMatrix4(e.matrixWorld);let l=n.ray.origin.distanceTo(Gs);return l<n.near||l>n.far?null:{distance:l,point:Gs.clone(),object:e}}function qs(e,t,n,r,i,a,o,s,c,l){e.getVertexPosition(s,zs),e.getVertexPosition(c,Bs),e.getVertexPosition(l,Vs);let u=Ks(e,t,n,r,zs,Bs,Vs,Ws);if(u){let e=new U;Bo.getBarycoord(Ws,zs,Bs,Vs,e),i&&(u.uv=Bo.getInterpolatedAttribute(i,s,c,l,e,new H)),a&&(u.uv1=Bo.getInterpolatedAttribute(a,s,c,l,e,new H)),o&&(u.normal=Bo.getInterpolatedAttribute(o,s,c,l,e,new U),u.normal.dot(r.direction)>0&&u.normal.multiplyScalar(-1));let t={a:s,b:c,c:l,normal:new U,materialIndex:0};Bo.getNormal(zs,Bs,Vs,t.normal),u.face=t,u.barycoord=e}return u}var Js=new Ra,Ys=new Ra,Xs=new Ra,Zs=new Ra,Qs=new K,$s=new U,ec=new fs,tc=new K,nc=new Ns,rc=class extends J{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type=`SkinnedMesh`,this.bindMode=sr,this.bindMatrix=new K,this.bindMatrixInverse=new K,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Vo),this.boundingBox.makeEmpty();let t=e.getAttribute(`position`);for(let e=0;e<t.count;e++)this.getVertexPosition(e,$s),this.boundingBox.expandByPoint($s)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new fs),this.boundingSphere.makeEmpty();let t=e.getAttribute(`position`);for(let e=0;e<t.count;e++)this.getVertexPosition(e,$s),this.boundingSphere.expandByPoint($s)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let n=this.material,r=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ec.copy(this.boundingSphere),ec.applyMatrix4(r),e.ray.intersectsSphere(ec)!==!1&&(tc.copy(r).invert(),nc.copy(e.ray).applyMatrix4(tc),(this.boundingBox===null||nc.intersectsBox(this.boundingBox)!==!1)&&this._computeIntersections(e,t,nc)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new Ra,t=this.geometry.attributes.skinWeight;for(let n=0,r=t.count;n<r;n++){e.fromBufferAttribute(t,n);let r=1/e.manhattanLength();r===1/0?e.set(1,0,0,0):e.multiplyScalar(r),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===`attached`?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===`detached`?this.bindMatrixInverse.copy(this.bindMatrix).invert():z(`SkinnedMesh: Unrecognized bindMode: `+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,r=this.geometry;Ys.fromBufferAttribute(r.attributes.skinIndex,e),Xs.fromBufferAttribute(r.attributes.skinWeight,e),t.isVector4?(Js.copy(t),t.set(0,0,0,0)):(Js.set(...t,1),t.set(0,0,0)),Js.applyMatrix4(this.bindMatrix);for(let e=0;e<4;e++){let r=Xs.getComponent(e);if(r!==0){let i=Ys.getComponent(e);Qs.multiplyMatrices(n.bones[i].matrixWorld,n.boneInverses[i]),t.addScaledVector(Zs.copy(Js).applyMatrix4(Qs),r)}}return t.isVector4&&(t.w=Js.w),t.applyMatrix4(this.bindMatrixInverse)}},ic=class extends go{constructor(){super(),this.isBone=!0,this.type=`Bone`}},ac=class extends La{constructor(e=null,t=1,n=1,r,i,a,o,s,c=dr,l=dr,u,d){super(null,a,o,s,c,l,r,i,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},oc=new K,sc=new K,cc=class e{constructor(e=[],t=[]){this.uuid=$i(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){z(`Skeleton: Number of inverse bone matrices does not match amount of bones.`),this.boneInverses=[];for(let e=0,t=this.bones.length;e<t;e++)this.boneInverses.push(new K)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let t=new K;this.bones[e]&&t.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(t)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let t=this.bones[e];t&&t.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let t=this.bones[e];t&&(t.parent&&t.parent.isBone?(t.matrix.copy(t.parent.matrixWorld).invert(),t.matrix.multiply(t.matrixWorld)):t.matrix.copy(t.matrixWorld),t.matrix.decompose(t.position,t.quaternion,t.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,r=this.boneTexture;for(let r=0,i=e.length;r<i;r++){let i=e[r]?e[r].matrixWorld:sc;oc.multiplyMatrices(i,t[r]),oc.toArray(n,r*16)}r!==null&&(r.needsUpdate=!0)}clone(){return new e(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new ac(t,e,e,Mr,Cr);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let n=this.bones[t];if(n.name===e)return n}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,r=e.bones.length;n<r;n++){let r=e.bones[n],i=t[r];i===void 0&&(z(`Skeleton: No bone found with UUID:`,r),i=new ic),this.bones.push(i),this.boneInverses.push(new K().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.7,type:`Skeleton`,generator:`Skeleton.toJSON`},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let r=0,i=t.length;r<i;r++){let i=t[r];e.bones.push(i.uuid);let a=n[r];e.boneInverses.push(a.toArray())}return e}},lc=class extends as{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},uc=new K,dc=new K,fc=[],pc=new Vo,mc=new K,hc=new J,gc=new fs,_c=class extends J{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new lc(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let e=0;e<n;e++)this.setMatrixAt(e,mc)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Vo),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,uc),pc.copy(e.boundingBox).applyMatrix4(uc),this.boundingBox.union(pc)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new fs),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,uc),gc.copy(e.boundingSphere).applyMatrix4(uc),this.boundingSphere.union(gc)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,r=this.morphTexture.source.data.data,i=e*(n.length+1)+1;for(let e=0;e<n.length;e++)n[e]=r[i+e]}raycast(e,t){let n=this.matrixWorld,r=this.count;if(hc.geometry=this.geometry,hc.material=this.material,hc.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),gc.copy(this.boundingSphere),gc.applyMatrix4(n),e.ray.intersectsSphere(gc)!==!1))for(let i=0;i<r;i++){this.getMatrixAt(i,uc),dc.multiplyMatrices(n,uc),hc.matrixWorld=dc,hc.raycast(e,fc);for(let e=0,n=fc.length;e<n;e++){let n=fc[e];n.instanceId=i,n.object=this,t.push(n)}fc.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new lc(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new ac(new Float32Array(r*this.count),r,this.count,Fr,Cr));let i=this.morphTexture.source.data.data,a=0;for(let e=0;e<n.length;e++)a+=n[e];let o=this.geometry.morphTargetsRelative?1:1-a,s=r*e;return i[s]=o,i.set(n,s+1),this}updateMorphTargets(){}dispose(){this.dispatchEvent({type:`dispose`}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},vc=new U,yc=new U,bc=new W,xc=class{constructor(e=new U(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=vc.subVectors(n,t).cross(yc.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let r=e.delta(vc),i=this.normal.dot(r);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/i;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||bc.getNormalMatrix(e),r=this.coplanarPoint(vc).applyMatrix4(e),i=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(i),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},Sc=new fs,Cc=new H(.5,.5),wc=new U,Tc=class{constructor(e=new xc,t=new xc,n=new xc,r=new xc,i=new xc,a=new xc){this.planes=[e,t,n,r,i,a]}set(e,t,n,r,i,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(i),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Li,n=!1){let r=this.planes,i=e.elements,a=i[0],o=i[1],s=i[2],c=i[3],l=i[4],u=i[5],d=i[6],f=i[7],p=i[8],m=i[9],h=i[10],g=i[11],_=i[12],v=i[13],y=i[14],b=i[15];if(r[0].setComponents(c-a,f-l,g-p,b-_).normalize(),r[1].setComponents(c+a,f+l,g+p,b+_).normalize(),r[2].setComponents(c+o,f+u,g+m,b+v).normalize(),r[3].setComponents(c-o,f-u,g-m,b-v).normalize(),n)r[4].setComponents(s,d,h,y).normalize(),r[5].setComponents(c-s,f-d,g-h,b-y).normalize();else if(r[4].setComponents(c-s,f-d,g-h,b-y).normalize(),t===2e3)r[5].setComponents(c+s,f+d,g+h,b+y).normalize();else if(t===2001)r[5].setComponents(s,d,h,y).normalize();else throw Error(`THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: `+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Sc.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Sc.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Sc)}intersectsSprite(e){return Sc.center.set(0,0,0),Sc.radius=.7071067811865476+Cc.distanceTo(e.center),Sc.applyMatrix4(e.matrixWorld),this.intersectsSphere(Sc)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let e=0;e<6;e++)if(t[e].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(wc.x=r.normal.x>0?e.max.x:e.min.x,wc.y=r.normal.y>0?e.max.y:e.min.y,wc.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(wc)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},Ec=class extends Ts{constructor(e){super(),this.isLineBasicMaterial=!0,this.type=`LineBasicMaterial`,this.color=new q(16777215),this.map=null,this.linewidth=1,this.linecap=`round`,this.linejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},Dc=new U,Oc=new U,kc=new K,Ac=new Ns,jc=new fs,Mc=new U,Nc=new U,Pc=class extends go{constructor(e=new bs,t=new Ec){super(),this.isLine=!0,this.type=`Line`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let e=1,r=t.count;e<r;e++)Dc.fromBufferAttribute(t,e-1),Oc.fromBufferAttribute(t,e),n[e]=n[e-1],n[e]+=Dc.distanceTo(Oc);e.setAttribute(`lineDistance`,new cs(n,1))}else z(`Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.`);return this}raycast(e,t){let n=this.geometry,r=this.matrixWorld,i=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),jc.copy(n.boundingSphere),jc.applyMatrix4(r),jc.radius+=i,e.ray.intersectsSphere(jc)===!1)return;kc.copy(r).invert(),Ac.copy(e.ray).applyMatrix4(kc);let o=i/((this.scale.x+this.scale.y+this.scale.z)/3),s=o*o,c=this.isLineSegments?2:1,l=n.index,u=n.attributes.position;if(l!==null){let n=Math.max(0,a.start),r=Math.min(l.count,a.start+a.count);for(let i=n,a=r-1;i<a;i+=c){let n=l.getX(i),r=l.getX(i+1),a=Fc(this,e,Ac,s,n,r,i);a&&t.push(a)}if(this.isLineLoop){let i=l.getX(r-1),a=l.getX(n),o=Fc(this,e,Ac,s,i,a,r-1);o&&t.push(o)}}else{let n=Math.max(0,a.start),r=Math.min(u.count,a.start+a.count);for(let i=n,a=r-1;i<a;i+=c){let n=Fc(this,e,Ac,s,i,i+1,i);n&&t.push(n)}if(this.isLineLoop){let i=Fc(this,e,Ac,s,r-1,n,r-1);i&&t.push(i)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}};function Fc(e,t,n,r,i,a,o){let s=e.geometry.attributes.position;if(Dc.fromBufferAttribute(s,i),Oc.fromBufferAttribute(s,a),n.distanceSqToSegment(Dc,Oc,Mc,Nc)>r)return;Mc.applyMatrix4(e.matrixWorld);let c=t.ray.origin.distanceTo(Mc);if(!(c<t.near||c>t.far))return{distance:c,point:Nc.clone().applyMatrix4(e.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:e}}var Ic=new U,Lc=new U,Rc=class extends Pc{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type=`LineSegments`}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let e=0,r=t.count;e<r;e+=2)Ic.fromBufferAttribute(t,e),Lc.fromBufferAttribute(t,e+1),n[e]=e===0?0:n[e-1],n[e+1]=n[e]+Ic.distanceTo(Lc);e.setAttribute(`lineDistance`,new cs(n,1))}else z(`LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.`);return this}},zc=class extends Pc{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type=`LineLoop`}},Bc=class extends Ts{constructor(e){super(),this.isPointsMaterial=!0,this.type=`PointsMaterial`,this.color=new q(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Vc=new K,Hc=new Ns,Uc=new fs,Wc=new U,Gc=class extends go{constructor(e=new bs,t=new Bc){super(),this.isPoints=!0,this.type=`Points`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let n=this.geometry,r=this.matrixWorld,i=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Uc.copy(n.boundingSphere),Uc.applyMatrix4(r),Uc.radius+=i,e.ray.intersectsSphere(Uc)===!1)return;Vc.copy(r).invert(),Hc.copy(e.ray).applyMatrix4(Vc);let o=i/((this.scale.x+this.scale.y+this.scale.z)/3),s=o*o,c=n.index,l=n.attributes.position;if(c!==null){let n=Math.max(0,a.start),i=Math.min(c.count,a.start+a.count);for(let a=n,o=i;a<o;a++){let n=c.getX(a);Wc.fromBufferAttribute(l,n),Kc(Wc,n,s,r,e,t,this)}}else{let n=Math.max(0,a.start),i=Math.min(l.count,a.start+a.count);for(let a=n,o=i;a<o;a++)Wc.fromBufferAttribute(l,a),Kc(Wc,a,s,r,e,t,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}};function Kc(e,t,n,r,i,a,o){let s=Hc.distanceSqToPoint(e);if(s<n){let n=new U;Hc.closestPointToPoint(e,n),n.applyMatrix4(r);let c=i.ray.origin.distanceTo(n);if(c<i.near||c>i.far)return;a.push({distance:c,distanceToRay:Math.sqrt(s),point:n,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}var qc=class extends La{constructor(e=[],t=301,n,r,i,a,o,s,c,l){super(e,t,n,r,i,a,o,s,c,l),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Jc=class extends La{constructor(e,t,n,r,i,a,o,s,c){super(e,t,n,r,i,a,o,s,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},Yc=class extends La{constructor(e,t,n=Sr,r,i,a,o=dr,s=dr,c,l=Nr,u=1){if(l!==1026&&l!==1027)throw Error(`THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat`);super({width:e,height:t,depth:u},r,i,a,o,s,l,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Na(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},Xc=class extends Yc{constructor(e,t=Sr,n=301,r,i,a=dr,o=dr,s,c=Nr){let l={width:e,height:e,depth:1},u=[l,l,l,l,l,l];super(e,e,t,n,r,i,a,o,s,c),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},Zc=class extends La{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},Y=class e extends bs{constructor(e=1,t=1,n=1,r=1,i=1,a=1){super(),this.type=`BoxGeometry`,this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:i,depthSegments:a};let o=this;r=Math.floor(r),i=Math.floor(i),a=Math.floor(a);let s=[],c=[],l=[],u=[],d=0,f=0;p(`z`,`y`,`x`,-1,-1,n,t,e,a,i,0),p(`z`,`y`,`x`,1,-1,n,t,-e,a,i,1),p(`x`,`z`,`y`,1,1,e,n,t,r,a,2),p(`x`,`z`,`y`,1,-1,e,n,-t,r,a,3),p(`x`,`y`,`z`,1,-1,e,t,n,r,i,4),p(`x`,`y`,`z`,-1,-1,e,t,-n,r,i,5),this.setIndex(s),this.setAttribute(`position`,new cs(c,3)),this.setAttribute(`normal`,new cs(l,3)),this.setAttribute(`uv`,new cs(u,2));function p(e,t,n,r,i,a,p,m,h,g,_){let v=a/h,y=p/g,b=a/2,x=p/2,S=m/2,C=h+1,w=g+1,T=0,E=0,D=new U;for(let a=0;a<w;a++){let o=a*y-x;for(let s=0;s<C;s++)D[e]=(s*v-b)*r,D[t]=o*i,D[n]=S,c.push(D.x,D.y,D.z),D[e]=0,D[t]=0,D[n]=m>0?1:-1,l.push(D.x,D.y,D.z),u.push(s/h),u.push(1-a/g),T+=1}for(let e=0;e<g;e++)for(let t=0;t<h;t++){let n=d+t+C*e,r=d+t+C*(e+1),i=d+(t+1)+C*(e+1),a=d+(t+1)+C*e;s.push(n,r,a),s.push(r,i,a),E+=6}o.addGroup(f,E,_),f+=E,d+=T}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}},Qc=class e extends bs{constructor(e=1,t=32,n=0,r=Math.PI*2){super(),this.type=`CircleGeometry`,this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:r},t=Math.max(3,t);let i=[],a=[],o=[],s=[],c=new U,l=new H;a.push(0,0,0),o.push(0,0,1),s.push(.5,.5);for(let i=0,u=3;i<=t;i++,u+=3){let d=n+i/t*r;c.x=e*Math.cos(d),c.y=e*Math.sin(d),a.push(c.x,c.y,c.z),o.push(0,0,1),l.x=(a[u]/e+1)/2,l.y=(a[u+1]/e+1)/2,s.push(l.x,l.y)}for(let e=1;e<=t;e++)i.push(e,e+1,0);this.setIndex(i),this.setAttribute(`position`,new cs(a,3)),this.setAttribute(`normal`,new cs(o,3)),this.setAttribute(`uv`,new cs(s,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.segments,t.thetaStart,t.thetaLength)}},$c=class e extends bs{constructor(e=1,t=1,n=1,r=32,i=1,a=!1,o=0,s=Math.PI*2){super(),this.type=`CylinderGeometry`,this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:i,openEnded:a,thetaStart:o,thetaLength:s};let c=this;r=Math.floor(r),i=Math.floor(i);let l=[],u=[],d=[],f=[],p=0,m=[],h=n/2,g=0;_(),a===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(l),this.setAttribute(`position`,new cs(u,3)),this.setAttribute(`normal`,new cs(d,3)),this.setAttribute(`uv`,new cs(f,2));function _(){let a=new U,_=new U,v=0,y=(t-e)/n;for(let c=0;c<=i;c++){let l=[],g=c/i,v=g*(t-e)+e;for(let e=0;e<=r;e++){let t=e/r,i=t*s+o,c=Math.sin(i),m=Math.cos(i);_.x=v*c,_.y=-g*n+h,_.z=v*m,u.push(_.x,_.y,_.z),a.set(c,y,m).normalize(),d.push(a.x,a.y,a.z),f.push(t,1-g),l.push(p++)}m.push(l)}for(let n=0;n<r;n++)for(let r=0;r<i;r++){let a=m[r][n],o=m[r+1][n],s=m[r+1][n+1],c=m[r][n+1];(e>0||r!==0)&&(l.push(a,o,c),v+=3),(t>0||r!==i-1)&&(l.push(o,s,c),v+=3)}c.addGroup(g,v,0),g+=v}function v(n){let i=p,a=new H,m=new U,_=0,v=n===!0?e:t,y=n===!0?1:-1;for(let e=1;e<=r;e++)u.push(0,h*y,0),d.push(0,y,0),f.push(.5,.5),p++;let b=p;for(let e=0;e<=r;e++){let t=e/r*s+o,n=Math.cos(t),i=Math.sin(t);m.x=v*i,m.y=h*y,m.z=v*n,u.push(m.x,m.y,m.z),d.push(0,y,0),a.x=n*.5+.5,a.y=i*.5*y+.5,f.push(a.x,a.y),p++}for(let e=0;e<r;e++){let t=i+e,r=b+e;n===!0?l.push(r,r+1,t):l.push(r+1,r,t),_+=3}c.addGroup(g,_,n===!0?1:2),g+=_}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},el=class e extends $c{constructor(e=1,t=1,n=32,r=1,i=!1,a=0,o=Math.PI*2){super(0,e,t,n,r,i,a,o),this.type=`ConeGeometry`,this.parameters={radius:e,height:t,radialSegments:n,heightSegments:r,openEnded:i,thetaStart:a,thetaLength:o}}static fromJSON(t){return new e(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},tl=class e extends bs{constructor(e=1,t=1,n=1,r=1){super(),this.type=`PlaneGeometry`,this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let i=e/2,a=t/2,o=Math.floor(n),s=Math.floor(r),c=o+1,l=s+1,u=e/o,d=t/s,f=[],p=[],m=[],h=[];for(let e=0;e<l;e++){let t=e*d-a;for(let n=0;n<c;n++){let r=n*u-i;p.push(r,-t,0),m.push(0,0,1),h.push(n/o),h.push(1-e/s)}}for(let e=0;e<s;e++)for(let t=0;t<o;t++){let n=t+c*e,r=t+c*(e+1),i=t+1+c*(e+1),a=t+1+c*e;f.push(n,r,a),f.push(r,i,a)}this.setIndex(f),this.setAttribute(`position`,new cs(p,3)),this.setAttribute(`normal`,new cs(m,3)),this.setAttribute(`uv`,new cs(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.widthSegments,t.heightSegments)}},nl=class e extends bs{constructor(e=.5,t=1,n=32,r=1,i=0,a=Math.PI*2){super(),this.type=`RingGeometry`,this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:r,thetaStart:i,thetaLength:a},n=Math.max(3,n),r=Math.max(1,r);let o=[],s=[],c=[],l=[],u=e,d=(t-e)/r,f=new U,p=new H;for(let e=0;e<=r;e++){for(let e=0;e<=n;e++){let r=i+e/n*a;f.x=u*Math.cos(r),f.y=u*Math.sin(r),s.push(f.x,f.y,f.z),c.push(0,0,1),p.x=(f.x/t+1)/2,p.y=(f.y/t+1)/2,l.push(p.x,p.y)}u+=d}for(let e=0;e<r;e++){let t=e*(n+1);for(let e=0;e<n;e++){let r=e+t,i=r,a=r+n+1,s=r+n+2,c=r+1;o.push(i,a,c),o.push(a,s,c)}}this.setIndex(o),this.setAttribute(`position`,new cs(s,3)),this.setAttribute(`normal`,new cs(c,3)),this.setAttribute(`uv`,new cs(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}},rl=class e extends bs{constructor(e=1,t=32,n=16,r=0,i=Math.PI*2,a=0,o=Math.PI){super(),this.type=`SphereGeometry`,this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:i,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let s=Math.min(a+o,Math.PI),c=0,l=[],u=new U,d=new U,f=[],p=[],m=[],h=[];for(let f=0;f<=n;f++){let g=[],_=f/n,v=a+_*o,y=e*Math.cos(v),b=Math.sqrt(e*e-y*y),x=0;f===0&&a===0?x=.5/t:f===n&&s===Math.PI&&(x=-.5/t);for(let e=0;e<=t;e++){let n=e/t,a=r+n*i;u.x=-b*Math.cos(a),u.y=y,u.z=b*Math.sin(a),p.push(u.x,u.y,u.z),d.copy(u).normalize(),m.push(d.x,d.y,d.z),h.push(n+x,1-_),g.push(c++)}l.push(g)}for(let e=0;e<n;e++)for(let r=0;r<t;r++){let t=l[e][r+1],i=l[e][r],o=l[e+1][r],c=l[e+1][r+1];(e!==0||a>0)&&f.push(t,i,c),(e!==n-1||s<Math.PI)&&f.push(i,o,c)}this.setIndex(f),this.setAttribute(`position`,new cs(p,3)),this.setAttribute(`normal`,new cs(m,3)),this.setAttribute(`uv`,new cs(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}},il=class e extends bs{constructor(e=1,t=.4,n=12,r=48,i=Math.PI*2,a=0,o=Math.PI*2){super(),this.type=`TorusGeometry`,this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:r,arc:i,thetaStart:a,thetaLength:o},n=Math.floor(n),r=Math.floor(r);let s=[],c=[],l=[],u=[],d=new U,f=new U,p=new U;for(let s=0;s<=n;s++){let m=a+s/n*o;for(let a=0;a<=r;a++){let o=a/r*i;f.x=(e+t*Math.cos(m))*Math.cos(o),f.y=(e+t*Math.cos(m))*Math.sin(o),f.z=t*Math.sin(m),c.push(f.x,f.y,f.z),d.x=e*Math.cos(o),d.y=e*Math.sin(o),p.subVectors(f,d).normalize(),l.push(p.x,p.y,p.z),u.push(a/r),u.push(s/n)}}for(let e=1;e<=n;e++)for(let t=1;t<=r;t++){let n=(r+1)*e+t-1,i=(r+1)*(e-1)+t-1,a=(r+1)*(e-1)+t,o=(r+1)*e+t;s.push(n,i,o),s.push(i,a,o)}this.setIndex(s),this.setAttribute(`position`,new cs(c,3)),this.setAttribute(`normal`,new cs(l,3)),this.setAttribute(`uv`,new cs(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}};function al(e){let t={};for(let n in e){t[n]={};for(let r in e[n]){let i=e[n][r];if(sl(i))i.isRenderTargetTexture?(z(`UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms().`),t[n][r]=null):t[n][r]=i.clone();else if(Array.isArray(i)){if(sl(i[0])){let e=[];for(let t=0,n=i.length;t<n;t++)e[t]=i[t].clone();t[n][r]=e}else t[n][r]=i.slice()}else t[n][r]=i}}return t}function ol(e){let t={};for(let n=0;n<e.length;n++){let r=al(e[n]);for(let e in r)t[e]=r[e]}return t}function sl(e){return e&&(e.isColor||e.isMatrix3||e.isMatrix4||e.isVector2||e.isVector3||e.isVector4||e.isTexture||e.isQuaternion)}function cl(e){let t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function ll(e){let t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:G.workingColorSpace}var ul={clone:al,merge:ol},dl=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,fl=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,pl=class extends Ts{constructor(e){super(),this.isShaderMaterial=!0,this.type=`ShaderMaterial`,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=dl,this.fragmentShader=fl,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=al(e.uniforms),this.uniformsGroups=cl(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let n in this.uniforms){let r=this.uniforms[n].value;r&&r.isTexture?t.uniforms[n]={type:`t`,value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[n]={type:`c`,value:r.getHex()}:r&&r.isVector2?t.uniforms[n]={type:`v2`,value:r.toArray()}:r&&r.isVector3?t.uniforms[n]={type:`v3`,value:r.toArray()}:r&&r.isVector4?t.uniforms[n]={type:`v4`,value:r.toArray()}:r&&r.isMatrix3?t.uniforms[n]={type:`m3`,value:r.toArray()}:r&&r.isMatrix4?t.uniforms[n]={type:`m4`,value:r.toArray()}:t.uniforms[n]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let e in this.extensions)this.extensions[e]===!0&&(n[e]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let r=e.uniforms[n];switch(this.uniforms[n]={},r.type){case`t`:this.uniforms[n].value=t[r.value]||null;break;case`c`:this.uniforms[n].value=new q().setHex(r.value);break;case`v2`:this.uniforms[n].value=new H().fromArray(r.value);break;case`v3`:this.uniforms[n].value=new U().fromArray(r.value);break;case`v4`:this.uniforms[n].value=new Ra().fromArray(r.value);break;case`m3`:this.uniforms[n].value=new W().fromArray(r.value);break;case`m4`:this.uniforms[n].value=new K().fromArray(r.value);break;default:this.uniforms[n].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let t in e.extensions)this.extensions[t]=e.extensions[t];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},ml=class extends pl{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type=`RawShaderMaterial`}},X=class extends Ts{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type=`MeshStandardMaterial`,this.defines={STANDARD:``},this.color=new q(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new q(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new H(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Qa,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:``},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},hl=class extends X{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:``,PHYSICAL:``},this.type=`MeshPhysicalMaterial`,this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new H(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return V(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new q(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new q(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new q(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:``,PHYSICAL:``},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}},gl=class extends Ts{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type=`MeshDepthMaterial`,this.depthPacking=Ai,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},_l=class extends Ts{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type=`MeshDistanceMaterial`,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function vl(e,t){return!e||e.constructor===t?e:typeof t.BYTES_PER_ELEMENT==`number`?new t(e):Array.prototype.slice.call(e)}function yl(e){function t(t,n){return e[t]-e[n]}let n=e.length,r=Array(n);for(let e=0;e!==n;++e)r[e]=e;return r.sort(t),r}function bl(e,t,n){let r=e.length,i=new e.constructor(r);for(let a=0,o=0;o!==r;++a){let r=n[a]*t;for(let n=0;n!==t;++n)i[o++]=e[r+n]}return i}function xl(e,t,n,r){let i=1,a=e[0];for(;a!==void 0&&a[r]===void 0;)a=e[i++];if(a===void 0)return;let o=a[r];if(o!==void 0){if(Array.isArray(o))do o=a[r],o!==void 0&&(t.push(a.time),n.push(...o)),a=e[i++];while(a!==void 0);else if(o.toArray!==void 0)do o=a[r],o!==void 0&&(t.push(a.time),o.toArray(n,n.length)),a=e[i++];while(a!==void 0);else do o=a[r],o!==void 0&&(t.push(a.time),n.push(o)),a=e[i++];while(a!==void 0)}}var Sl=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r===void 0?new t.constructor(n):r,this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],i=t[n-1];validate_interval:{seek:{let a;linear_scan:{forward_scan:if(!(e<r)){for(let a=n+2;;){if(r===void 0){if(e<i)break forward_scan;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(i=r,r=t[++n],e<r)break seek}a=t.length;break linear_scan}if(!(e>=i)){let o=t[1];e<o&&(n=2,i=o);for(let a=n-2;;){if(i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===a)break;if(r=i,i=t[--n-1],e>=i)break seek}a=n,n=0;break linear_scan}break validate_interval}for(;n<a;){let r=n+a>>>1;e<t[r]?a=r:n=r+1}if(r=t[n],i=t[n-1],i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,i,r)}return this.interpolate_(n,i,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,i=e*r;for(let e=0;e!==r;++e)t[e]=n[i+e];return t}interpolate_(){throw Error(`THREE.Interpolant: Call to abstract method.`)}intervalChanged_(){}},Cl=class extends Sl{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Ei,endingEnd:Ei}}intervalChanged_(e,t,n){let r=this.parameterPositions,i=e-2,a=e+1,o=r[i],s=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case Di:i=e,o=2*t-n;break;case Oi:i=r.length-2,o=t+r[i]-r[i+1];break;default:i=e,o=n}if(s===void 0)switch(this.getSettings_().endingEnd){case Di:a=e,s=2*n-t;break;case Oi:a=1,s=n+r[1]-r[0];break;default:a=e-1,s=t}let c=(n-t)*.5,l=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(s-n),this._offsetPrev=i*l,this._offsetNext=a*l}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-t)/(r-t),m=p*p,h=m*p,g=-d*h+2*d*m-d*p,_=(1+d)*h+(-1.5-2*d)*m+(-.5+d)*p+1,v=(-1-f)*h+(1.5+f)*m+.5*p,y=f*h-f*m;for(let e=0;e!==o;++e)i[e]=g*a[l+e]+_*a[c+e]+v*a[s+e]+y*a[u+e];return i}},wl=class extends Sl{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=(n-t)/(r-t),u=1-l;for(let e=0;e!==o;++e)i[e]=a[c+e]*u+a[s+e]*l;return i}},Tl=class extends Sl{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},El=class extends Sl{interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this.inTangents,u=this.outTangents;if(!l||!u){let e=(n-t)/(r-t),l=1-e;for(let t=0;t!==o;++t)i[t]=a[c+t]*l+a[s+t]*e;return i}let d=o*2,f=e-1;for(let p=0;p!==o;++p){let o=a[c+p],m=a[s+p],h=f*d+p*2,g=u[h],_=u[h+1],v=e*d+p*2,y=l[v],b=l[v+1],x=(n-t)/(r-t),S,C,w,T,E;for(let e=0;e<8;e++){S=x*x,C=S*x,w=1-x,T=w*w,E=T*w;let e=E*t+3*T*x*g+3*w*S*y+C*r-n;if(Math.abs(e)<1e-10)break;let i=3*T*(g-t)+6*w*x*(y-g)+3*S*(r-y);if(Math.abs(i)<1e-10)break;x-=e/i,x=Math.max(0,Math.min(1,x))}i[p]=E*o+3*T*x*_+3*w*S*b+C*m}return i}},Dl=class{constructor(e,t,n,r){if(e===void 0)throw Error(`THREE.KeyframeTrack: track name is undefined`);if(t===void 0||t.length===0)throw Error(`THREE.KeyframeTrack: no keyframes in track named `+e);this.name=e,this.times=vl(t,this.TimeBufferType),this.values=vl(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:vl(e.times,Array),values:vl(e.values,Array)};let t=e.getInterpolation();t!==e.DefaultInterpolation&&(n.interpolation=t)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Tl(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new wl(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Cl(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new El(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case Si:t=this.InterpolantFactoryMethodDiscrete;break;case Ci:t=this.InterpolantFactoryMethodLinear;break;case wi:t=this.InterpolantFactoryMethodSmooth;break;case Ti:t=this.InterpolantFactoryMethodBezier}if(t===void 0){let t=`unsupported interpolation for `+this.ValueTypeName+` keyframe track named `+this.name;if(this.createInterpolant===void 0){if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error(t)}return z(`KeyframeTrack:`,t),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Si;case this.InterpolantFactoryMethodLinear:return Ci;case this.InterpolantFactoryMethodSmooth:return wi;case this.InterpolantFactoryMethodBezier:return Ti}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e}return this}trim(e,t){let n=this.times,r=n.length,i=0,a=r-1;for(;i!==r&&n[i]<e;)++i;for(;a!==-1&&n[a]>t;)--a;if(++a,i!==0||a!==r){i>=a&&(a=Math.max(a,1),i=a-1);let e=this.getValueSize();this.times=n.slice(i,a),this.values=this.values.slice(i*e,a*e)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(B(`KeyframeTrack: Invalid value size in track.`,this),e=!1);let n=this.times,r=this.values,i=n.length;i===0&&(B(`KeyframeTrack: Track is empty.`,this),e=!1);let a=null;for(let t=0;t!==i;t++){let r=n[t];if(typeof r==`number`&&isNaN(r)){B(`KeyframeTrack: Time is not a valid number.`,this,t,r),e=!1;break}if(a!==null&&a>r){B(`KeyframeTrack: Out of order keys.`,this,t,r,a),e=!1;break}a=r}if(r!==void 0&&zi(r))for(let t=0,n=r.length;t!==n;++t){let n=r[t];if(isNaN(n)){B(`KeyframeTrack: Value is not a valid number.`,this,t,n),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===wi,i=e.length-1,a=1;for(let o=1;o<i;++o){let i=!1,s=e[o];if(s!==e[o+1]&&(o!==1||s!==e[0])){if(r)i=!0;else{let e=o*n,r=e-n,a=e+n;for(let o=0;o!==n;++o){let n=t[e+o];if(n!==t[r+o]||n!==t[a+o]){i=!0;break}}}}if(i){if(o!==a){e[a]=e[o];let r=o*n,i=a*n;for(let e=0;e!==n;++e)t[i+e]=t[r+e]}++a}}if(i>0){e[a]=e[i];for(let e=i*n,r=a*n,o=0;o!==n;++o)t[r+o]=t[e+o];++a}return a===e.length?(this.times=e,this.values=t):(this.times=e.slice(0,a),this.values=t.slice(0,a*n)),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,r}};Dl.prototype.ValueTypeName=``,Dl.prototype.TimeBufferType=Float32Array,Dl.prototype.ValueBufferType=Float32Array,Dl.prototype.DefaultInterpolation=Ci;var Ol=class extends Dl{constructor(e,t,n){super(e,t,n)}};Ol.prototype.ValueTypeName=`bool`,Ol.prototype.ValueBufferType=Array,Ol.prototype.DefaultInterpolation=Si,Ol.prototype.InterpolantFactoryMethodLinear=void 0,Ol.prototype.InterpolantFactoryMethodSmooth=void 0;var kl=class extends Dl{constructor(e,t,n,r){super(e,t,n,r)}};kl.prototype.ValueTypeName=`color`;var Al=class extends Dl{constructor(e,t,n,r){super(e,t,n,r)}};Al.prototype.ValueTypeName=`number`;var jl=class extends Sl{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=(n-t)/(r-t),c=e*o;for(let e=c+o;c!==e;c+=4)xa.slerpFlat(i,0,a,c-o,a,c,s);return i}},Ml=class extends Dl{constructor(e,t,n,r){super(e,t,n,r)}InterpolantFactoryMethodLinear(e){return new jl(this.times,this.values,this.getValueSize(),e)}};Ml.prototype.ValueTypeName=`quaternion`,Ml.prototype.InterpolantFactoryMethodSmooth=void 0;var Nl=class extends Dl{constructor(e,t,n){super(e,t,n)}};Nl.prototype.ValueTypeName=`string`,Nl.prototype.ValueBufferType=Array,Nl.prototype.DefaultInterpolation=Si,Nl.prototype.InterpolantFactoryMethodLinear=void 0,Nl.prototype.InterpolantFactoryMethodSmooth=void 0;var Pl=class extends Dl{constructor(e,t,n,r){super(e,t,n,r)}};Pl.prototype.ValueTypeName=`vector`;var Fl=class{constructor(e=``,t=-1,n=[],r=ki){this.name=e,this.tracks=n,this.duration=t,this.blendMode=r,this.uuid=$i(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){let t=[],n=e.tracks,r=1/(e.fps||1);for(let e=0,i=n.length;e!==i;++e)t.push(Ll(n[e]).scale(r));let i=new this(e.name,e.duration,t,e.blendMode);return i.uuid=e.uuid,i.userData=JSON.parse(e.userData||`{}`),i}static toJSON(e){let t=[],n=e.tracks,r={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let e=0,r=n.length;e!==r;++e)t.push(Dl.toJSON(n[e]));return r}static CreateFromMorphTargetSequence(e,t,n,r){let i=t.length,a=[];for(let e=0;e<i;e++){let o=[],s=[];o.push((e+i-1)%i,e,(e+1)%i),s.push(0,1,0);let c=yl(o);o=bl(o,1,c),s=bl(s,1,c),!r&&o[0]===0&&(o.push(i),s.push(s[0])),a.push(new Al(`.morphTargetInfluences[`+t[e].name+`]`,o,s).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){let t=e;n=t.geometry&&t.geometry.animations||t.animations}for(let e=0;e<n.length;e++)if(n[e].name===t)return n[e];return null}static CreateClipsFromMorphTargetSequences(e,t,n){let r={},i=/^([\w-]*?)([\d]+)$/;for(let t=0,n=e.length;t<n;t++){let n=e[t],a=n.name.match(i);if(a&&a.length>1){let e=a[1],t=r[e];t||(r[e]=t=[]),t.push(n)}}let a=[];for(let e in r)a.push(this.CreateFromMorphTargetSequence(e,r[e],t,n));return a}resetDuration(){let e=this.tracks,t=0;for(let n=0,r=e.length;n!==r;++n){let e=this.tracks[n];t=Math.max(t,e.times[e.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e&&=this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());let t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}};function Il(e){switch(e.toLowerCase()){case`scalar`:case`double`:case`float`:case`number`:case`integer`:return Al;case`vector`:case`vector2`:case`vector3`:case`vector4`:return Pl;case`color`:return kl;case`quaternion`:return Ml;case`bool`:case`boolean`:return Ol;case`string`:return Nl}throw Error(`THREE.KeyframeTrack: Unsupported typeName: `+e)}function Ll(e){if(e.type===void 0)throw Error(`THREE.KeyframeTrack: track type undefined, can not parse`);let t=Il(e.type);if(e.times===void 0){let t=[],n=[];xl(e.keys,t,n,`value`),e.times=t,e.values=n}return t.parse===void 0?new t(e.name,e.times,e.values,e.interpolation):t.parse(e)}var Rl={enabled:!1,files:{},add:function(e,t){this.enabled!==!1&&(zl(e)||(this.files[e]=t))},get:function(e){if(this.enabled!==!1&&!zl(e))return this.files[e]},remove:function(e){delete this.files[e]},clear:function(){this.files={}}};function zl(e){try{let t=e.slice(e.indexOf(`:`)+1);return new URL(t).protocol===`blob:`}catch{return!1}}var Bl=new class{constructor(e,t,n){let r=this,i=!1,a=0,o=0,s,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(e){o++,i===!1&&r.onStart!==void 0&&r.onStart(e,a,o),i=!0},this.itemEnd=function(e){a++,r.onProgress!==void 0&&r.onProgress(e,a,o),a===o&&(i=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(e){r.onError!==void 0&&r.onError(e)},this.resolveURL=function(e){return e=e.normalize(`NFC`),s?s(e):e},this.setURLModifier=function(e){return s=e,this},this.addHandler=function(e,t){return c.push(e,t),this},this.removeHandler=function(e){let t=c.indexOf(e);return t!==-1&&c.splice(t,2),this},this.getHandler=function(e){for(let t=0,n=c.length;t<n;t+=2){let n=c[t],r=c[t+1];if(n.global&&(n.lastIndex=0),n.test(e))return r}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||=new AbortController,this._abortController}},Vl=class{constructor(e){this.manager=e===void 0?Bl:e,this.crossOrigin=`anonymous`,this.withCredentials=!1,this.path=``,this.resourcePath=``,this.requestHeader={},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(r,i){n.load(e,r,t,i)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};Vl.DEFAULT_MATERIAL_NAME=`__DEFAULT`;var Hl={},Ul=class extends Error{constructor(e,t){super(e),this.response=t}},Wl=class extends Vl{constructor(e){super(e),this.mimeType=``,this.responseType=``,this._abortController=new AbortController}load(e,t,n,r){e===void 0&&(e=``),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let i=Rl.get(`file:${e}`);if(i!==void 0){this.manager.itemStart(e),setTimeout(()=>{t&&t(i),this.manager.itemEnd(e)},0);return}if(Hl[e]!==void 0){Hl[e].push({onLoad:t,onProgress:n,onError:r});return}Hl[e]=[],Hl[e].push({onLoad:t,onProgress:n,onError:r});let a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?`include`:`same-origin`,signal:typeof AbortSignal.any==`function`?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),o=this.mimeType,s=this.responseType;fetch(a).then(t=>{if(t.status===200||t.status===0){if(t.status===0&&z(`FileLoader: HTTP Status 0 received.`),typeof ReadableStream>`u`||t.body===void 0||t.body.getReader===void 0)return t;let n=Hl[e],r=t.body.getReader(),i=t.headers.get(`X-File-Size`)||t.headers.get(`Content-Length`),a=i?parseInt(i):0,o=a!==0,s=0,c=new ReadableStream({start(e){t();function t(){r.read().then(({done:r,value:i})=>{if(r)e.close();else{s+=i.byteLength;let r=new ProgressEvent(`progress`,{lengthComputable:o,loaded:s,total:a});for(let e=0,t=n.length;e<t;e++){let t=n[e];t.onProgress&&t.onProgress(r)}e.enqueue(i),t()}},t=>{e.error(t)})}}});return new Response(c)}throw new Ul(`fetch for "${t.url}" responded with ${t.status}: ${t.statusText}`,t)}).then(e=>{switch(s){case`arraybuffer`:return e.arrayBuffer();case`blob`:return e.blob();case`document`:return e.text().then(e=>new DOMParser().parseFromString(e,o));case`json`:return e.json();default:if(o===``)return e.text();{let t=/charset="?([^;"\s]*)"?/i.exec(o),n=t&&t[1]?t[1].toLowerCase():void 0,r=new TextDecoder(n);return e.arrayBuffer().then(e=>r.decode(e))}}}).then(t=>{Rl.add(`file:${e}`,t);let n=Hl[e];delete Hl[e];for(let e=0,r=n.length;e<r;e++){let r=n[e];r.onLoad&&r.onLoad(t)}}).catch(t=>{let n=Hl[e];if(n===void 0)throw this.manager.itemError(e),t;delete Hl[e];for(let e=0,r=n.length;e<r;e++){let r=n[e];r.onError&&r.onError(t)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}},Gl=new WeakMap,Kl=class extends Vl{constructor(e){super(e)}load(e,t,n,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let i=this,a=Rl.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)i.manager.itemStart(e),setTimeout(function(){t&&t(a),i.manager.itemEnd(e)},0);else{let e=Gl.get(a);e===void 0&&(e=[],Gl.set(a,e)),e.push({onLoad:t,onError:r})}return a}let o=Bi(`img`);function s(){l(),t&&t(this);let n=Gl.get(this)||[];for(let e=0;e<n.length;e++){let t=n[e];t.onLoad&&t.onLoad(this)}Gl.delete(this),i.manager.itemEnd(e)}function c(t){l(),r&&r(t),Rl.remove(`image:${e}`);let n=Gl.get(this)||[];for(let e=0;e<n.length;e++){let r=n[e];r.onError&&r.onError(t)}Gl.delete(this),i.manager.itemError(e),i.manager.itemEnd(e)}function l(){o.removeEventListener(`load`,s,!1),o.removeEventListener(`error`,c,!1)}return o.addEventListener(`load`,s,!1),o.addEventListener(`error`,c,!1),e.slice(0,5)!==`data:`&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),Rl.add(`image:${e}`,o),i.manager.itemStart(e),o.src=e,o}},ql=class extends Vl{constructor(e){super(e)}load(e,t,n,r){let i=new La,a=new Kl(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(e){i.image=e,i.needsUpdate=!0,t!==void 0&&t(i)},n,r),i}},Jl=class extends go{constructor(e,t=1){super(),this.isLight=!0,this.type=`Light`,this.color=new q(e),this.intensity=t}dispose(){this.dispatchEvent({type:`dispose`})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},Yl=class extends Jl{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type=`HemisphereLight`,this.position.copy(go.DEFAULT_UP),this.updateMatrix(),this.groundColor=new q(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},Xl=new K,Zl=new U,Ql=new U,$l=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new H(512,512),this.mapType=_r,this.map=null,this.mapPass=null,this.matrix=new K,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Tc,this._frameExtents=new H(1,1),this._viewportCount=1,this._viewports=[new Ra(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;Zl.setFromMatrixPosition(e.matrixWorld),t.position.copy(Zl),Ql.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Ql),t.updateMatrixWorld(),Xl.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Xl,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===2001||t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Xl)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},eu=new U,tu=new xa,nu=new U,ru=class extends go{constructor(){super(),this.isCamera=!0,this.type=`Camera`,this.matrixWorldInverse=new K,this.projectionMatrix=new K,this.projectionMatrixInverse=new K,this.coordinateSystem=Li,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(eu,tu,nu),nu.x===1&&nu.y===1&&nu.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(eu,tu,nu.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(eu,tu,nu),nu.x===1&&nu.y===1&&nu.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(eu,tu,nu.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},iu=new U,au=new H,ou=new H,su=class extends ru{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type=`PerspectiveCamera`,this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Qi*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Zi*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Qi*2*Math.atan(Math.tan(Zi*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){iu.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(iu.x,iu.y).multiplyScalar(-e/iu.z),iu.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(iu.x,iu.y).multiplyScalar(-e/iu.z)}getViewSize(e,t){return this.getViewBounds(e,au,ou),t.subVectors(ou,au)}setViewOffset(e,t,n,r,i,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Zi*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,i=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let e=a.fullWidth,o=a.fullHeight;i+=a.offsetX*r/e,t-=a.offsetY*n/o,r*=a.width/e,n*=a.height/o}let o=this.filmOffset;o!==0&&(i+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(i,i+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},cu=class extends $l{constructor(){super(new su(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){let t=this.camera,n=Qi*2*e.angle*this.focus,r=this.mapSize.width/this.mapSize.height*this.aspect,i=e.distance||t.far;(n!==t.fov||r!==t.aspect||i!==t.far)&&(t.fov=n,t.aspect=r,t.far=i,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}},lu=class extends Jl{constructor(e,t,n=0,r=Math.PI/3,i=0,a=2){super(e,t),this.isSpotLight=!0,this.type=`SpotLight`,this.position.copy(go.DEFAULT_UP),this.updateMatrix(),this.target=new go,this.distance=n,this.angle=r,this.penumbra=i,this.decay=a,this.map=null,this.shadow=new cu}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}},uu=class extends $l{constructor(){super(new su(90,1,.5,500)),this.isPointLightShadow=!0}},du=class extends Jl{constructor(e,t,n=0,r=2){super(e,t),this.isPointLight=!0,this.type=`PointLight`,this.distance=n,this.decay=r,this.shadow=new uu}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},fu=class extends ru{constructor(e=-1,t=1,n=1,r=-1,i=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type=`OrthographicCamera`,this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=i,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,i,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,i=n-e,a=n+e,o=r+t,s=r-t;if(this.view!==null&&this.view.enabled){let e=(this.right-this.left)/this.view.fullWidth/this.zoom,t=(this.top-this.bottom)/this.view.fullHeight/this.zoom;i+=e*this.view.offsetX,a=i+e*this.view.width,o-=t*this.view.offsetY,s=o-t*this.view.height}this.projectionMatrix.makeOrthographic(i,a,o,s,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},pu=class extends $l{constructor(){super(new fu(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},mu=class extends Jl{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type=`DirectionalLight`,this.position.copy(go.DEFAULT_UP),this.updateMatrix(),this.target=new go,this.shadow=new pu}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}},hu=class extends Jl{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type=`AmbientLight`}},gu=class{static extractUrlBase(e){let t=e.lastIndexOf(`/`);return t===-1?`./`:e.slice(0,t+1)}static resolveURL(e,t){return typeof e!=`string`||e===``?``:(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,`$1`)),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}},_u=new WeakMap,vu=class extends Vl{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>`u`&&z(`ImageBitmapLoader: createImageBitmap() not supported.`),typeof fetch>`u`&&z(`ImageBitmapLoader: fetch() not supported.`),this.options={premultiplyAlpha:`none`},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,r){e===void 0&&(e=``),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let i=this,a=Rl.get(`image-bitmap:${e}`);if(a!==void 0){if(i.manager.itemStart(e),a.then){a.then(n=>{_u.has(a)===!0?(r&&r(_u.get(a)),i.manager.itemError(e),i.manager.itemEnd(e)):(t&&t(n),i.manager.itemEnd(e))});return}setTimeout(function(){t&&t(a),i.manager.itemEnd(e)},0);return}let o={};o.credentials=this.crossOrigin===`anonymous`?`same-origin`:`include`,o.headers=this.requestHeader,o.signal=typeof AbortSignal.any==`function`?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;let s=fetch(e,o).then(function(e){return e.blob()}).then(function(e){return createImageBitmap(e,Object.assign(i.options,{colorSpaceConversion:`none`}))}).then(function(n){Rl.add(`image-bitmap:${e}`,n),t&&t(n),i.manager.itemEnd(e)}).catch(function(t){r&&r(t),_u.set(s,t),Rl.remove(`image-bitmap:${e}`),i.manager.itemError(e),i.manager.itemEnd(e)});Rl.add(`image-bitmap:${e}`,s),i.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}},yu=-90,bu=1,xu=class extends go{constructor(e,t,n){super(),this.type=`CubeCamera`,this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new su(yu,bu,e,t);r.layers=this.layers,this.add(r);let i=new su(yu,bu,e,t);i.layers=this.layers,this.add(i);let a=new su(yu,bu,e,t);a.layers=this.layers,this.add(a);let o=new su(yu,bu,e,t);o.layers=this.layers,this.add(o);let s=new su(yu,bu,e,t);s.layers=this.layers,this.add(s);let c=new su(yu,bu,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,i,a,o,s]=t;for(let e of t)this.remove(e);if(e===2e3)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),i.up.set(0,0,-1),i.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),s.up.set(0,1,0),s.lookAt(0,0,-1);else if(e===2001)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),i.up.set(0,0,1),i.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),s.up.set(0,-1,0),s.lookAt(0,0,-1);else throw Error(`THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: `+e);for(let e of t)this.add(e),e.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[i,a,o,s,c,l]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let m=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let h=!1;h=e.isWebGLRenderer===!0?e.state.buffers.depth.getReversed():e.reversedDepthBuffer,e.setRenderTarget(n,0,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,i),e.setRenderTarget(n,1,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,4,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=m,e.setRenderTarget(n,5,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(u,d,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},Su=class extends su{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}},Cu=class{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=wu.bind(this),e.addEventListener(`visibilitychange`,this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener(`visibilitychange`,this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e===void 0?performance.now():e)-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}};function wu(){this._document.hidden===!1&&this.reset()}var Tu=`\\[\\]\\.:\\/`,Eu=RegExp(`[\\[\\]\\.:\\/]`,`g`),Du=`[^\\[\\]\\.:\\/]`,Ou=`[^`+Tu.replace(`\\.`,``)+`]`,ku=`((?:WC+[\\/:])*)`.replace(`WC`,Du),Au=`(WCOD+)?`.replace(`WCOD`,Ou),ju=`(?:\\.(WC+)(?:\\[(.+)\\])?)?`.replace(`WC`,Du),Mu=`\\.(WC+)(?:\\[(.+)\\])?`.replace(`WC`,Du),Nu=RegExp(`^`+ku+Au+ju+Mu+`$`),Pu=[`material`,`materials`,`bones`,`map`],Fu=class{constructor(e,t,n){let r=n||Iu.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,i=n.length;r!==i;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},Iu=class e{constructor(t,n,r){this.path=n,this.parsedPath=r||e.parseTrackName(n),this.node=e.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,n,r){return t&&t.isAnimationObjectGroup?new e.Composite(t,n,r):new e(t,n,r)}static sanitizeNodeName(e){return e.replace(/\s/g,`_`).replace(Eu,``)}static parseTrackName(e){let t=Nu.exec(e);if(t===null)throw Error(`THREE.PropertyBinding: Cannot parse trackName: `+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(`.`);if(r!==void 0&&r!==-1){let e=n.nodeName.substring(r+1);Pu.indexOf(e)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=e)}if(n.propertyName===null||n.propertyName.length===0)throw Error(`THREE.PropertyBinding: can not parse propertyName from trackName: `+e);return n}static findNode(e,t){if(t===void 0||t===``||t===`.`||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(e){for(let r=0;r<e.length;r++){let i=e[r];if(i.name===t||i.uuid===t)return i;let a=n(i.children);if(a)return a}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let t=this.node,n=this.parsedPath,r=n.objectName,i=n.propertyName,a=n.propertyIndex;if(t||(t=e.findNode(this.rootNode,n.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){z(`PropertyBinding: No target node found for track: `+this.path+`.`);return}if(r){let e=n.objectIndex;switch(r){case`materials`:if(!t.material){B(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.materials){B(`PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.`,this);return}t=t.material.materials;break;case`bones`:if(!t.skeleton){B(`PropertyBinding: Can not bind to bones as node does not have a skeleton.`,this);return}t=t.skeleton.bones;for(let n=0;n<t.length;n++)if(t[n].name===e){e=n;break}break;case`map`:if(`map`in t){t=t.map;break}if(!t.material){B(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.map){B(`PropertyBinding: Can not bind to material.map as node.material does not have a map.`,this);return}t=t.material.map;break;default:if(t[r]===void 0){B(`PropertyBinding: Can not bind to objectName of node undefined.`,this);return}t=t[r]}if(e!==void 0){if(t[e]===void 0){B(`PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.`,this,t);return}t=t[e]}}let o=t[i];if(o===void 0){let e=n.nodeName;B(`PropertyBinding: Trying to update property for track: `+e+`.`+i+` but it wasn't found.`,t);return}let s=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?s=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(s=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(a!==void 0){if(i===`morphTargetInfluences`){if(!t.geometry){B(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.`,this);return}if(!t.geometry.morphAttributes){B(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.`,this);return}t.morphTargetDictionary[a]!==void 0&&(a=t.morphTargetDictionary[a])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=a}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][s]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Iu.Composite=Fu,Iu.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},Iu.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},Iu.prototype.GetterByBindingType=[Iu.prototype._getValue_direct,Iu.prototype._getValue_array,Iu.prototype._getValue_arrayElement,Iu.prototype._getValue_toArray],Iu.prototype.SetterByBindingTypeAndVersioning=[[Iu.prototype._setValue_direct,Iu.prototype._setValue_direct_setNeedsUpdate,Iu.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Iu.prototype._setValue_array,Iu.prototype._setValue_array_setNeedsUpdate,Iu.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Iu.prototype._setValue_arrayElement,Iu.prototype._setValue_arrayElement_setNeedsUpdate,Iu.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Iu.prototype._setValue_fromArray,Iu.prototype._setValue_fromArray_setNeedsUpdate,Iu.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]],class e{static{e.prototype.isMatrix2=!0}constructor(e,t,n,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,r){let i=this.elements;return i[0]=e,i[2]=t,i[1]=n,i[3]=r,this}};function Lu(e,t,n,r){let i=Ru(r);switch(n){case Ar:return e*t;case Fr:return e*t/i.components*i.byteLength;case Ir:return e*t/i.components*i.byteLength;case Lr:return e*t*2/i.components*i.byteLength;case Rr:return e*t*2/i.components*i.byteLength;case jr:return e*t*3/i.components*i.byteLength;case Mr:return e*t*4/i.components*i.byteLength;case zr:return e*t*4/i.components*i.byteLength;case Br:case Vr:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case Hr:case Ur:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case Gr:case qr:return Math.max(e,16)*Math.max(t,8)/4;case Wr:case Kr:return Math.max(e,8)*Math.max(t,8)/2;case Jr:case Yr:case Zr:case Qr:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case Xr:case $r:case ei:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case ti:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case ni:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case ri:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case ii:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case ai:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case oi:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case si:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case ci:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case li:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case ui:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case di:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case fi:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case pi:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case mi:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case hi:case gi:case _i:return Math.ceil(e/4)*Math.ceil(t/4)*16;case vi:case yi:return Math.ceil(e/4)*Math.ceil(t/4)*8;case bi:case xi:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw Error(`Unable to determine texture byte length for ${n} format.`)}function Ru(e){switch(e){case _r:case vr:return{byteLength:1,components:1};case br:case yr:case wr:return{byteLength:2,components:1};case Tr:case Er:return{byteLength:2,components:4};case Sr:case xr:case Cr:return{byteLength:4,components:1};case Or:case kr:return{byteLength:4,components:3}}throw Error(`THREE.TextureUtils: Unknown texture type ${e}.`)}typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`register`,{detail:{revision:`185`}})),typeof window<`u`&&(window.__THREE__?z(`WARNING: Multiple instances of Three.js being imported.`):window.__THREE__=`185`);function zu(){let e=null,t=!1,n=null,r=null;function i(t,a){n(t,a),r=e.requestAnimationFrame(i)}return{start:function(){t!==!0&&n!==null&&e!==null&&(r=e.requestAnimationFrame(i),t=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(r),t=!1},setAnimationLoop:function(e){n=e},setContext:function(t){e=t}}}function Bu(e){let t=new WeakMap;function n(t,n){let r=t.array,i=t.usage,a=r.byteLength,o=e.createBuffer();e.bindBuffer(n,o),e.bufferData(n,r,i),t.onUploadCallback();let s;if(r instanceof Float32Array)s=e.FLOAT;else if(typeof Float16Array<`u`&&r instanceof Float16Array)s=e.HALF_FLOAT;else if(r instanceof Uint16Array)s=t.isFloat16BufferAttribute?e.HALF_FLOAT:e.UNSIGNED_SHORT;else if(r instanceof Int16Array)s=e.SHORT;else if(r instanceof Uint32Array)s=e.UNSIGNED_INT;else if(r instanceof Int32Array)s=e.INT;else if(r instanceof Int8Array)s=e.BYTE;else if(r instanceof Uint8Array)s=e.UNSIGNED_BYTE;else if(r instanceof Uint8ClampedArray)s=e.UNSIGNED_BYTE;else throw Error(`THREE.WebGLAttributes: Unsupported buffer data format: `+r);return{buffer:o,type:s,bytesPerElement:r.BYTES_PER_ELEMENT,version:t.version,size:a}}function r(t,n,r){let i=n.array,a=n.updateRanges;if(e.bindBuffer(r,t),a.length===0)e.bufferSubData(r,0,i);else{a.sort((e,t)=>e.start-t.start);let t=0;for(let e=1;e<a.length;e++){let n=a[t],r=a[e];r.start<=n.start+n.count+1?n.count=Math.max(n.count,r.start+r.count-n.start):(++t,a[t]=r)}a.length=t+1;for(let t=0,n=a.length;t<n;t++){let n=a[t];e.bufferSubData(r,n.start*i.BYTES_PER_ELEMENT,i,n.start,n.count)}n.clearUpdateRanges()}n.onUploadCallback()}function i(e){return e.isInterleavedBufferAttribute&&(e=e.data),t.get(e)}function a(n){n.isInterleavedBufferAttribute&&(n=n.data);let r=t.get(n);r&&(e.deleteBuffer(r.buffer),t.delete(n))}function o(e,i){if(e.isInterleavedBufferAttribute&&(e=e.data),e.isGLBufferAttribute){let n=t.get(e);(!n||n.version<e.version)&&t.set(e,{buffer:e.buffer,type:e.type,bytesPerElement:e.elementSize,version:e.version});return}let a=t.get(e);if(a===void 0)t.set(e,n(e,i));else if(a.version<e.version){if(a.size!==e.array.byteLength)throw Error(`THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.`);r(a.buffer,e,i),a.version=e.version}}return{get:i,remove:a,update:o}}var Z={alphahash_fragment:`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,alphahash_pars_fragment:`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,alphamap_fragment:`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,alphamap_pars_fragment:`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,alphatest_fragment:`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,alphatest_pars_fragment:`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,aomap_fragment:`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,aomap_pars_fragment:`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,batching_pars_vertex:`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,batching_vertex:`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,begin_vertex:`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,beginnormal_vertex:`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bsdfs:`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,iridescence_fragment:`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,bumpmap_pars_fragment:`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,clipping_planes_fragment:`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,clipping_planes_pars_fragment:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,clipping_planes_pars_vertex:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,clipping_planes_vertex:`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,color_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,color_pars_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,color_pars_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,color_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,common:`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,cube_uv_reflection_fragment:`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,defaultnormal_vertex:`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,displacementmap_pars_vertex:`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,displacementmap_vertex:`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,emissivemap_fragment:`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,emissivemap_pars_fragment:`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,colorspace_fragment:`gl_FragColor = linearToOutputTexel( gl_FragColor );`,colorspace_pars_fragment:`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,envmap_fragment:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,envmap_common_pars_fragment:`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,envmap_pars_fragment:`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,envmap_pars_vertex:`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,envmap_physical_pars_fragment:`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,envmap_vertex:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,fog_vertex:`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fog_pars_vertex:`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fog_fragment:`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fog_pars_fragment:`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gradientmap_pars_fragment:`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,lightmap_pars_fragment:`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lights_lambert_fragment:`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lights_lambert_pars_fragment:`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lights_pars_begin:`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,lights_toon_fragment:`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lights_toon_pars_fragment:`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lights_phong_fragment:`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lights_phong_pars_fragment:`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lights_physical_fragment:`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,lights_physical_pars_fragment:`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,lights_fragment_begin:`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,lights_fragment_maps:`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,lights_fragment_end:`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,lightprobes_pars_fragment:`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,logdepthbuf_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,logdepthbuf_pars_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_pars_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,map_fragment:`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,map_pars_fragment:`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,map_particle_fragment:`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,map_particle_pars_fragment:`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,metalnessmap_fragment:`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,metalnessmap_pars_fragment:`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,morphinstance_vertex:`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,morphcolor_vertex:`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,morphnormal_vertex:`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,morphtarget_pars_vertex:`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,morphtarget_vertex:`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,normal_fragment_begin:`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,normal_fragment_maps:`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,normal_pars_fragment:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_pars_vertex:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_vertex:`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,normalmap_pars_fragment:`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,clearcoat_normal_fragment_begin:`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,clearcoat_normal_fragment_maps:`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,clearcoat_pars_fragment:`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,iridescence_pars_fragment:`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,opaque_fragment:`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,packing:`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,premultiplied_alpha_fragment:`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,project_vertex:`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dithering_fragment:`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dithering_pars_fragment:`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,roughnessmap_fragment:`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,roughnessmap_pars_fragment:`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,shadowmap_pars_fragment:`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,shadowmap_pars_vertex:`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,shadowmap_vertex:`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,shadowmask_pars_fragment:`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,skinbase_vertex:`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,skinning_pars_vertex:`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,skinning_vertex:`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,skinnormal_vertex:`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,specularmap_fragment:`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,specularmap_pars_fragment:`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tonemapping_fragment:`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tonemapping_pars_fragment:`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,transmission_fragment:`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,transmission_pars_fragment:`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,uv_pars_fragment:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_pars_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,worldpos_vertex:`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,background_vert:`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,background_frag:`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,backgroundCube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,backgroundCube_frag:`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cube_frag:`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,depth_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,depth_frag:`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,distance_vert:`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,distance_frag:`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,equirect_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,equirect_frag:`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,linedashed_vert:`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,linedashed_frag:`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,meshbasic_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,meshbasic_frag:`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshlambert_vert:`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshlambert_frag:`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshmatcap_vert:`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,meshmatcap_frag:`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshnormal_vert:`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,meshnormal_frag:`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,meshphong_vert:`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshphong_frag:`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshphysical_vert:`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,meshphysical_frag:`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshtoon_vert:`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshtoon_frag:`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,points_vert:`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,points_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,shadow_vert:`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,shadow_frag:`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,sprite_vert:`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sprite_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`},Q={common:{diffuse:{value:new q(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new W},alphaMap:{value:null},alphaMapTransform:{value:new W},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new W}},envmap:{envMap:{value:null},envMapRotation:{value:new W},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new W}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new W}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new W},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new W},normalScale:{value:new H(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new W},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new W}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new W}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new W}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new q(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new U},probesMax:{value:new U},probesResolution:{value:new U}},points:{diffuse:{value:new q(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new W},alphaTest:{value:0},uvTransform:{value:new W}},sprite:{diffuse:{value:new q(16777215)},opacity:{value:1},center:{value:new H(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new W},alphaMap:{value:null},alphaMapTransform:{value:new W},alphaTest:{value:0}}},Vu={basic:{uniforms:ol([Q.common,Q.specularmap,Q.envmap,Q.aomap,Q.lightmap,Q.fog]),vertexShader:Z.meshbasic_vert,fragmentShader:Z.meshbasic_frag},lambert:{uniforms:ol([Q.common,Q.specularmap,Q.envmap,Q.aomap,Q.lightmap,Q.emissivemap,Q.bumpmap,Q.normalmap,Q.displacementmap,Q.fog,Q.lights,{emissive:{value:new q(0)},envMapIntensity:{value:1}}]),vertexShader:Z.meshlambert_vert,fragmentShader:Z.meshlambert_frag},phong:{uniforms:ol([Q.common,Q.specularmap,Q.envmap,Q.aomap,Q.lightmap,Q.emissivemap,Q.bumpmap,Q.normalmap,Q.displacementmap,Q.fog,Q.lights,{emissive:{value:new q(0)},specular:{value:new q(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Z.meshphong_vert,fragmentShader:Z.meshphong_frag},standard:{uniforms:ol([Q.common,Q.envmap,Q.aomap,Q.lightmap,Q.emissivemap,Q.bumpmap,Q.normalmap,Q.displacementmap,Q.roughnessmap,Q.metalnessmap,Q.fog,Q.lights,{emissive:{value:new q(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Z.meshphysical_vert,fragmentShader:Z.meshphysical_frag},toon:{uniforms:ol([Q.common,Q.aomap,Q.lightmap,Q.emissivemap,Q.bumpmap,Q.normalmap,Q.displacementmap,Q.gradientmap,Q.fog,Q.lights,{emissive:{value:new q(0)}}]),vertexShader:Z.meshtoon_vert,fragmentShader:Z.meshtoon_frag},matcap:{uniforms:ol([Q.common,Q.bumpmap,Q.normalmap,Q.displacementmap,Q.fog,{matcap:{value:null}}]),vertexShader:Z.meshmatcap_vert,fragmentShader:Z.meshmatcap_frag},points:{uniforms:ol([Q.points,Q.fog]),vertexShader:Z.points_vert,fragmentShader:Z.points_frag},dashed:{uniforms:ol([Q.common,Q.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Z.linedashed_vert,fragmentShader:Z.linedashed_frag},depth:{uniforms:ol([Q.common,Q.displacementmap]),vertexShader:Z.depth_vert,fragmentShader:Z.depth_frag},normal:{uniforms:ol([Q.common,Q.bumpmap,Q.normalmap,Q.displacementmap,{opacity:{value:1}}]),vertexShader:Z.meshnormal_vert,fragmentShader:Z.meshnormal_frag},sprite:{uniforms:ol([Q.sprite,Q.fog]),vertexShader:Z.sprite_vert,fragmentShader:Z.sprite_frag},background:{uniforms:{uvTransform:{value:new W},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Z.background_vert,fragmentShader:Z.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new W}},vertexShader:Z.backgroundCube_vert,fragmentShader:Z.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Z.cube_vert,fragmentShader:Z.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Z.equirect_vert,fragmentShader:Z.equirect_frag},distance:{uniforms:ol([Q.common,Q.displacementmap,{referencePosition:{value:new U},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Z.distance_vert,fragmentShader:Z.distance_frag},shadow:{uniforms:ol([Q.lights,Q.fog,{color:{value:new q(0)},opacity:{value:1}}]),vertexShader:Z.shadow_vert,fragmentShader:Z.shadow_frag}};Vu.physical={uniforms:ol([Vu.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new W},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new W},clearcoatNormalScale:{value:new H(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new W},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new W},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new W},sheen:{value:0},sheenColor:{value:new q(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new W},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new W},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new W},transmissionSamplerSize:{value:new H},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new W},attenuationDistance:{value:0},attenuationColor:{value:new q(0)},specularColor:{value:new q(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new W},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new W},anisotropyVector:{value:new H},anisotropyMap:{value:null},anisotropyMapTransform:{value:new W}}]),vertexShader:Z.meshphysical_vert,fragmentShader:Z.meshphysical_frag};var Hu={r:0,b:0,g:0},Uu=new K,Wu=new W;Wu.set(-1,0,0,0,1,0,0,0,1);function Gu(e,t,n,r,i,a){let o=new q(0),s=i===!0?0:1,c,l,u=null,d=0,f=null;function p(e){let n=e.isScene===!0?e.background:null;if(n&&n.isTexture){let r=e.backgroundBlurriness>0;n=t.get(n,r)}return n}function m(t){let r=!1,i=p(t);i===null?g(o,s):i&&i.isColor&&(g(i,1),r=!0);let c=e.xr.getEnvironmentBlendMode();c===`additive`?n.buffers.color.setClear(0,0,0,1,a):c===`alpha-blend`&&n.buffers.color.setClear(0,0,0,0,a),(e.autoClear||r)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function h(t,n){let i=p(n);i&&(i.isCubeTexture||i.mapping===306)?(l===void 0&&(l=new J(new Y(1,1,1),new pl({name:`BackgroundCubeMaterial`,uniforms:al(Vu.backgroundCube.uniforms),vertexShader:Vu.backgroundCube.vertexShader,fragmentShader:Vu.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute(`normal`),l.geometry.deleteAttribute(`uv`),l.onBeforeRender=function(e,t,n){this.matrixWorld.copyPosition(n.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(l)),l.material.uniforms.envMap.value=i,l.material.uniforms.backgroundBlurriness.value=n.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(Uu.makeRotationFromEuler(n.backgroundRotation)).transpose(),i.isCubeTexture&&i.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(Wu),l.material.toneMapped=G.getTransfer(i.colorSpace)!==Pi,(u!==i||d!==i.version||f!==e.toneMapping)&&(l.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),l.layers.enableAll(),t.unshift(l,l.geometry,l.material,0,0,null)):i&&i.isTexture&&(c===void 0&&(c=new J(new tl(2,2),new pl({name:`BackgroundMaterial`,uniforms:al(Vu.background.uniforms),vertexShader:Vu.background.vertexShader,fragmentShader:Vu.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute(`normal`),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=i,c.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,c.material.toneMapped=G.getTransfer(i.colorSpace)!==Pi,i.matrixAutoUpdate===!0&&i.updateMatrix(),c.material.uniforms.uvTransform.value.copy(i.matrix),(u!==i||d!==i.version||f!==e.toneMapping)&&(c.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),c.layers.enableAll(),t.unshift(c,c.geometry,c.material,0,0,null))}function g(t,r){t.getRGB(Hu,ll(e)),n.buffers.color.setClear(Hu.r,Hu.g,Hu.b,r,a)}function _(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(e,t=1){o.set(e),s=t,g(o,s)},getClearAlpha:function(){return s},setClearAlpha:function(e){s=e,g(o,s)},render:m,addToRenderList:h,dispose:_}}function Ku(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),r={},i=f(null),a=i,o=!1;function s(n,r,i,s,c){let u=!1,f=d(n,s,i,r);a!==f&&(a=f,l(a.object)),u=p(n,s,i,c),u&&m(n,s,i,c),c!==null&&t.update(c,e.ELEMENT_ARRAY_BUFFER),(u||o)&&(o=!1,b(n,r,i,s),c!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(c).buffer))}function c(){return e.createVertexArray()}function l(t){return e.bindVertexArray(t)}function u(t){return e.deleteVertexArray(t)}function d(e,t,n,i){let a=i.wireframe===!0,o=r[t.id];o===void 0&&(o={},r[t.id]=o);let s=e.isInstancedMesh===!0?e.id:0,l=o[s];l===void 0&&(l={},o[s]=l);let u=l[n.id];u===void 0&&(u={},l[n.id]=u);let d=u[a];return d===void 0&&(d=f(c()),u[a]=d),d}function f(e){let t=[],r=[],i=[];for(let e=0;e<n;e++)t[e]=0,r[e]=0,i[e]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:t,enabledAttributes:r,attributeDivisors:i,object:e,attributes:{},index:null}}function p(e,t,n,r){let i=a.attributes,o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=i[t],r=o[t];if(r===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(r=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(r=e.instanceColor)),n===void 0||n.attribute!==r||r&&n.data!==r.data)return!0;s++}return a.attributesNum!==s||a.index!==r}function m(e,t,n,r){let i={},o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=o[t];n===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(n=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(n=e.instanceColor));let r={};r.attribute=n,n&&n.data&&(r.data=n.data),i[t]=r,s++}a.attributes=i,a.attributesNum=s,a.index=r}function h(){let e=a.newAttributes;for(let t=0,n=e.length;t<n;t++)e[t]=0}function g(e){_(e,0)}function _(t,n){let r=a.newAttributes,i=a.enabledAttributes,o=a.attributeDivisors;r[t]=1,i[t]===0&&(e.enableVertexAttribArray(t),i[t]=1),o[t]!==n&&(e.vertexAttribDivisor(t,n),o[t]=n)}function v(){let t=a.newAttributes,n=a.enabledAttributes;for(let r=0,i=n.length;r<i;r++)n[r]!==t[r]&&(e.disableVertexAttribArray(r),n[r]=0)}function y(t,n,r,i,a,o,s){s===!0?e.vertexAttribIPointer(t,n,r,a,o):e.vertexAttribPointer(t,n,r,i,a,o)}function b(n,r,i,a){h();let o=a.attributes,s=i.getAttributes(),c=r.defaultAttributeValues;for(let r in s){let i=s[r];if(i.location>=0){let s=o[r];if(s===void 0&&(r===`instanceMatrix`&&n.instanceMatrix&&(s=n.instanceMatrix),r===`instanceColor`&&n.instanceColor&&(s=n.instanceColor)),s!==void 0){let r=s.normalized,o=s.itemSize,c=t.get(s);if(c===void 0)continue;let l=c.buffer,u=c.type,d=c.bytesPerElement,f=u===e.INT||u===e.UNSIGNED_INT||s.gpuType===1013;if(s.isInterleavedBufferAttribute){let t=s.data,c=t.stride,p=s.offset;if(t.isInstancedInterleavedBuffer){for(let e=0;e<i.locationSize;e++)_(i.location+e,t.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=t.meshPerAttribute*t.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,c*d,(p+o/i.locationSize*e)*d,f)}else{if(s.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,s.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=s.meshPerAttribute*s.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,o*d,o/i.locationSize*e*d,f)}}else if(c!==void 0){let t=c[r];if(t!==void 0)switch(t.length){case 2:e.vertexAttrib2fv(i.location,t);break;case 3:e.vertexAttrib3fv(i.location,t);break;case 4:e.vertexAttrib4fv(i.location,t);break;default:e.vertexAttrib1fv(i.location,t)}}}}v()}function x(){T();for(let e in r){let t=r[e];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e]}}function S(e){if(r[e.id]===void 0)return;let t=r[e.id];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e.id]}function C(e){for(let t in r){let n=r[t];for(let t in n){let r=n[t];if(r[e.id]===void 0)continue;let i=r[e.id];for(let e in i)u(i[e].object),delete i[e];delete r[e.id]}}}function w(e){for(let t in r){let n=r[t],i=e.isInstancedMesh===!0?e.id:0,a=n[i];if(a!==void 0){for(let e in a){let t=a[e];for(let e in t)u(t[e].object),delete t[e];delete a[e]}delete n[i],Object.keys(n).length===0&&delete r[t]}}}function T(){E(),o=!0,a!==i&&(a=i,l(a.object))}function E(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:s,reset:T,resetDefaultState:E,dispose:x,releaseStatesOfGeometry:S,releaseStatesOfObject:w,releaseStatesOfProgram:C,initAttributes:h,enableAttribute:g,disableUnusedAttributes:v}}function qu(e,t,n){let r;function i(e){r=e}function a(t,i){e.drawArrays(r,t,i),n.update(i,r,1)}function o(t,i,a){a!==0&&(e.drawArraysInstanced(r,t,i,a),n.update(i,r,a))}function s(e,i,a){if(a===0)return;t.get(`WEBGL_multi_draw`).multiDrawArraysWEBGL(r,e,0,i,0,a);let o=0;for(let e=0;e<a;e++)o+=i[e];n.update(o,r,1)}this.setMode=i,this.render=a,this.renderInstances=o,this.renderMultiDraw=s}function Ju(e,t,n,r){let i;function a(){if(i!==void 0)return i;if(t.has(`EXT_texture_filter_anisotropic`)===!0){let n=t.get(`EXT_texture_filter_anisotropic`);i=e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(t){return t===1023||r.convert(t)===e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT)}function s(n){let i=n===1016&&(t.has(`EXT_color_buffer_half_float`)||t.has(`EXT_color_buffer_float`));return!(n!==1009&&r.convert(n)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE)&&n!==1015&&!i)}function c(t){if(t===`highp`){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return`highp`;t=`mediump`}return t===`mediump`&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?`mediump`:`lowp`}let l=n.precision===void 0?`highp`:n.precision,u=c(l);u!==l&&(z(`WebGLRenderer:`,l,`not supported, using`,u,`instead.`),l=u);let d=n.logarithmicDepthBuffer===!0,f=n.reversedDepthBuffer===!0&&t.has(`EXT_clip_control`);n.reversedDepthBuffer===!0&&f===!1&&z(`WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.`);let p=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),m=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),h=e.getParameter(e.MAX_TEXTURE_SIZE),g=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),_=e.getParameter(e.MAX_VERTEX_ATTRIBS),v=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),y=e.getParameter(e.MAX_VARYING_VECTORS),b=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),x=e.getParameter(e.MAX_SAMPLES),S=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:s,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:p,maxVertexTextures:m,maxTextureSize:h,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:b,maxSamples:x,samples:S}}function Yu(e){let t=this,n=null,r=0,i=!1,a=!1,o=new xc,s=new W,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(e,t){let n=e.length!==0||t||r!==0||i;return i=t,r=e.length,n},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(e,t){n=u(e,t,0)},this.setState=function(t,o,s){let d=t.clippingPlanes,f=t.clipIntersection,p=t.clipShadows,m=e.get(t);if(!i||d===null||d.length===0||a&&!p)a?u(null):l();else{let e=a?0:r,t=e*4,i=m.clippingState||null;c.value=i,i=u(d,o,t,s);for(let e=0;e!==t;++e)i[e]=n[e];m.clippingState=i,this.numIntersection=f?this.numPlanes:0,this.numPlanes+=e}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=r>0),t.numPlanes=r,t.numIntersection=0}function u(e,n,r,i){let a=e===null?0:e.length,l=null;if(a!==0){if(l=c.value,i!==!0||l===null){let t=r+a*4,i=n.matrixWorldInverse;s.getNormalMatrix(i),(l===null||l.length<t)&&(l=new Float32Array(t));for(let t=0,n=r;t!==a;++t,n+=4)o.copy(e[t]).applyMatrix4(i,s),o.normal.toArray(l,n),l[n+3]=o.constant}c.value=l,c.needsUpdate=!0}return t.numPlanes=a,t.numIntersection=0,l}}var Xu=4,Zu=[.125,.215,.35,.446,.526,.582],Qu=20,$u=256,ed=new fu,td=new q,nd=null,rd=0,id=0,ad=!1,od=new U,sd=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,r=100,i={}){let{size:a=256,position:o=od}=i;nd=this._renderer.getRenderTarget(),rd=this._renderer.getActiveCubeFace(),id=this._renderer.getActiveMipmapLevel(),ad=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,r,s,o),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=md(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=pd(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=2**this._lodMax}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(nd,rd,id),this._renderer.xr.enabled=ad,e.scissorTest=!1,ud(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),nd=this._renderer.getRenderTarget(),rd=this._renderer.getActiveCubeFace(),id=this._renderer.getActiveMipmapLevel(),ad=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:mr,minFilter:mr,generateMipmaps:!1,type:wr,format:Mr,colorSpace:Mi,depthBuffer:!1},r=ld(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=ld(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=cd(r)),this._blurMaterial=fd(r,e,t),this._ggxMaterial=dd(r,e,t)}return r}_compileMaterial(e){let t=new J(new bs,e);this._renderer.compile(t,ed)}_sceneToCubeUV(e,t,n,r,i){let a=new su(90,1,t,n),o=[1,-1,1,1,1,1],s=[1,1,1,-1,-1,-1],c=this._renderer,l=c.autoClear,u=c.toneMapping;c.getClearColor(td),c.toneMapping=0,c.autoClear=!1,c.state.buffers.depth.getReversed()&&(c.setRenderTarget(r),c.clearDepth(),c.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new J(new Y,new Ps({name:`PMREM.Background`,side:1,depthWrite:!1,depthTest:!1})));let d=this._backgroundBox,f=d.material,p=!1,m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,p=!0):(f.color.copy(td),p=!0);for(let t=0;t<6;t++){let n=t%3;n===0?(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x+s[t],i.y,i.z)):n===1?(a.up.set(0,0,o[t]),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y+s[t],i.z)):(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y,i.z+s[t]));let l=this._cubeSize;ud(r,n*l,t>2?l:0,l,l),c.setRenderTarget(r),p&&c.render(d,a),c.render(e,a)}c.toneMapping=u,c.autoClear=l,e.background=m}_textureToCubeUV(e,t){let n=this._renderer,r=e.mapping===301||e.mapping===302;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=md()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=pd());let i=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=i;let o=i.uniforms;o.envMap.value=e;let s=this._cubeSize;ud(t,0,0,3*s,2*s),n.setRenderTarget(t),n.render(a,ed)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let r=this._lodMeshes.length;for(let t=1;t<r;t++)this._applyGGXFilter(e,t-1,t);t.autoClear=n}_applyGGXFilter(e,t,n){let r=this._renderer,i=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let s=a.uniforms,c=n/(this._lodMeshes.length-1),l=t/(this._lodMeshes.length-1),u=Math.sqrt(c*c-l*l)*(0+c*1.25),{_lodMax:d}=this,f=this._sizeLods[n],p=3*f*(n>d-Xu?n-d+Xu:0),m=4*(this._cubeSize-f);s.envMap.value=e.texture,s.roughness.value=u,s.mipInt.value=d-t,ud(i,p,m,3*f,2*f),r.setRenderTarget(i),r.render(o,ed),s.envMap.value=i.texture,s.roughness.value=0,s.mipInt.value=d-n,ud(e,p,m,3*f,2*f),r.setRenderTarget(e),r.render(o,ed)}_blur(e,t,n,r,i){let a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,r,`latitudinal`,i),this._halfBlur(a,e,n,n,r,`longitudinal`,i)}_halfBlur(e,t,n,r,i,a,o){let s=this._renderer,c=this._blurMaterial;a!==`latitudinal`&&a!==`longitudinal`&&B(`blur direction must be either latitudinal or longitudinal!`);let l=this._lodMeshes[r];l.material=c;let u=c.uniforms,d=this._sizeLods[n]-1,f=isFinite(i)?Math.PI/(2*d):2*Math.PI/39,p=i/f,m=isFinite(i)?1+Math.floor(3*p):Qu;m>Qu&&z(`sigmaRadians, ${i}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Qu}`);let h=[],g=0;for(let e=0;e<Qu;++e){let t=e/p,n=Math.exp(-t*t/2);h.push(n),e===0?g+=n:e<m&&(g+=2*n)}for(let e=0;e<h.length;e++)h[e]=h[e]/g;u.envMap.value=e.texture,u.samples.value=m,u.weights.value=h,u.latitudinal.value=a===`latitudinal`,o&&(u.poleAxis.value=o);let{_lodMax:_}=this;u.dTheta.value=f,u.mipInt.value=_-n;let v=this._sizeLods[r];ud(t,3*v*(r>_-Xu?r-_+Xu:0),4*(this._cubeSize-v),3*v,2*v),s.setRenderTarget(t),s.render(l,ed)}};function cd(e){let t=[],n=[],r=[],i=e,a=e-Xu+1+Zu.length;for(let o=0;o<a;o++){let a=2**i;t.push(a);let s=1/a;o>e-Xu?s=Zu[o-e+Xu-1]:o===0&&(s=0),n.push(s);let c=1/(a-2),l=-c,u=1+c,d=[l,l,u,l,u,u,l,l,u,u,l,u],f=new Float32Array(108),p=new Float32Array(72),m=new Float32Array(36);for(let e=0;e<6;e++){let t=e%3*2/3-1,n=e>2?0:-1,r=[t,n,0,t+2/3,n,0,t+2/3,n+1,0,t,n,0,t+2/3,n+1,0,t,n+1,0];f.set(r,18*e),p.set(d,12*e);let i=[e,e,e,e,e,e];m.set(i,6*e)}let h=new bs;h.setAttribute(`position`,new as(f,3)),h.setAttribute(`uv`,new as(p,2)),h.setAttribute(`faceIndex`,new as(m,1)),r.push(new J(h,null)),i>Xu&&i--}return{lodMeshes:r,sizeLods:t,sigmas:n}}function ld(e,t,n){let r=new Ba(e,t,n);return r.texture.mapping=306,r.texture.name=`PMREM.cubeUv`,r.scissorTest=!0,r}function ud(e,t,n,r,i){e.viewport.set(t,n,r,i),e.scissor.set(t,n,r,i)}function dd(e,t,n){return new pl({name:`PMREMGGXConvolution`,defines:{GGX_SAMPLES:$u,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:hd(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function fd(e,t,n){let r=new Float32Array(Qu),i=new U(0,1,0);return new pl({name:`SphericalGaussianBlur`,defines:{n:Qu,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:r},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:hd(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function pd(){return new pl({name:`EquirectangularToCubeUV`,uniforms:{envMap:{value:null}},vertexShader:hd(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function md(){return new pl({name:`CubemapToCubeUV`,uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:hd(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function hd(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}var gd=class extends Ba{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new qc(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Y(5,5,5),i=new pl({name:`CubemapFromEquirect`,uniforms:al(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});i.uniforms.tEquirect.value=t;let a=new J(r,i),o=t.minFilter;return t.minFilter===1008&&(t.minFilter=mr),new xu(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let i=e.getRenderTarget();for(let i=0;i<6;i++)e.setRenderTarget(this,i),e.clear(t,n,r);e.setRenderTarget(i)}};function _d(e){let t=new WeakMap,n=new WeakMap,r=null;function i(e,t=!1){return e==null?null:t?o(e):a(e)}function a(n){if(n&&n.isTexture){let r=n.mapping;if(r===303||r===304){if(t.has(n)){let e=t.get(n).texture;return s(e,n.mapping)}{let r=n.image;if(r&&r.height>0){let i=new gd(r.height);return i.fromEquirectangularTexture(e,n),t.set(n,i),n.addEventListener(`dispose`,l),s(i.texture,n.mapping)}return null}}}return n}function o(t){if(t&&t.isTexture){let i=t.mapping,a=i===303||i===304,o=i===301||i===302;if(a||o){let i=n.get(t),s=i===void 0?0:i.texture.pmremVersion;if(t.isRenderTargetTexture&&t.pmremVersion!==s)return r===null&&(r=new sd(e)),i=a?r.fromEquirectangular(t,i):r.fromCubemap(t,i),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),i.texture;if(i!==void 0)return i.texture;{let s=t.image;return a&&s&&s.height>0||o&&s&&c(s)?(r===null&&(r=new sd(e)),i=a?r.fromEquirectangular(t):r.fromCubemap(t),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),t.addEventListener(`dispose`,u),i.texture):null}}}return t}function s(e,t){return t===303?e.mapping=301:t===304&&(e.mapping=302),e}function c(e){let t=0;for(let n=0;n<6;n++)e[n]!==void 0&&t++;return t===6}function l(e){let n=e.target;n.removeEventListener(`dispose`,l);let r=t.get(n);r!==void 0&&(t.delete(n),r.dispose())}function u(e){let t=e.target;t.removeEventListener(`dispose`,u);let r=n.get(t);r!==void 0&&(n.delete(t),r.dispose())}function d(){t=new WeakMap,n=new WeakMap,r!==null&&(r.dispose(),r=null)}return{get:i,dispose:d}}function vd(e){let t={};function n(n){if(t[n]!==void 0)return t[n];let r=e.getExtension(n);return t[n]=r,r}return{has:function(e){return n(e)!==null},init:function(){n(`EXT_color_buffer_float`),n(`WEBGL_clip_cull_distance`),n(`OES_texture_float_linear`),n(`EXT_color_buffer_half_float`),n(`WEBGL_multisampled_render_to_texture`),n(`WEBGL_render_shared_exponent`)},get:function(e){let t=n(e);return t===null&&Gi(`WebGLRenderer: `+e+` extension not supported.`),t}}}function yd(e,t,n,r){let i={},a=new WeakMap;function o(e){let s=e.target;s.index!==null&&t.remove(s.index);for(let e in s.attributes)t.remove(s.attributes[e]);s.removeEventListener(`dispose`,o),delete i[s.id];let c=a.get(s);c&&(t.remove(c),a.delete(s)),r.releaseStatesOfGeometry(s),s.isInstancedBufferGeometry===!0&&delete s._maxInstanceCount,n.memory.geometries--}function s(e,t){return i[t.id]===!0?t:(t.addEventListener(`dispose`,o),i[t.id]=!0,n.memory.geometries++,t)}function c(n){let r=n.attributes;for(let n in r)t.update(r[n],e.ARRAY_BUFFER)}function l(e){let n=[],r=e.index,i=e.attributes.position,o=0;if(i===void 0)return;if(r!==null){let e=r.array;o=r.version;for(let t=0,r=e.length;t<r;t+=3){let r=e[t+0],i=e[t+1],a=e[t+2];n.push(r,i,i,a,a,r)}}else{let e=i.array;o=i.version;for(let t=0,r=e.length/3-1;t<r;t+=3){let e=t+0,r=t+1,i=t+2;n.push(e,r,r,i,i,e)}}let s=new(i.count>=65535?ss:os)(n,1);s.version=o;let c=a.get(e);c&&t.remove(c),a.set(e,s)}function u(e){let t=a.get(e);if(t){let n=e.index;n!==null&&t.version<n.version&&l(e)}else l(e);return a.get(e)}return{get:s,update:c,getWireframeAttribute:u}}function bd(e,t,n){let r;function i(e){r=e}let a,o;function s(e){a=e.type,o=e.bytesPerElement}function c(t,i){e.drawElements(r,i,a,t*o),n.update(i,r,1)}function l(t,i,s){s!==0&&(e.drawElementsInstanced(r,i,a,t*o,s),n.update(i,r,s))}function u(e,i,o){if(o===0)return;t.get(`WEBGL_multi_draw`).multiDrawElementsWEBGL(r,i,0,a,e,0,o);let s=0;for(let e=0;e<o;e++)s+=i[e];n.update(s,r,1)}this.setMode=i,this.setIndex=s,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function xd(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function r(t,r,i){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=t/3*i;break;case e.LINES:n.lines+=t/2*i;break;case e.LINE_STRIP:n.lines+=i*(t-1);break;case e.LINE_LOOP:n.lines+=i*t;break;case e.POINTS:n.points+=i*t;break;default:B(`WebGLInfo: Unknown draw mode:`,r)}}function i(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:i,update:r}}function Sd(e,t,n){let r=new WeakMap,i=new Ra;function a(a,o,s){let c=a.morphTargetInfluences,l=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=l===void 0?0:l.length,d=r.get(o);if(d===void 0||d.count!==u){d!==void 0&&d.texture.dispose();let e=o.morphAttributes.position!==void 0,n=o.morphAttributes.normal!==void 0,a=o.morphAttributes.color!==void 0,s=o.morphAttributes.position||[],c=o.morphAttributes.normal||[],l=o.morphAttributes.color||[],f=0;e===!0&&(f=1),n===!0&&(f=2),a===!0&&(f=3);let p=o.attributes.position.count*f,m=1;p>t.maxTextureSize&&(m=Math.ceil(p/t.maxTextureSize),p=t.maxTextureSize);let h=new Float32Array(p*m*4*u),g=new Va(h,p,m,u);g.type=Cr,g.needsUpdate=!0;let _=f*4;for(let t=0;t<u;t++){let r=s[t],o=c[t],u=l[t],d=p*m*4*t;for(let t=0;t<r.count;t++){let s=t*_;e===!0&&(i.fromBufferAttribute(r,t),h[d+s+0]=i.x,h[d+s+1]=i.y,h[d+s+2]=i.z,h[d+s+3]=0),n===!0&&(i.fromBufferAttribute(o,t),h[d+s+4]=i.x,h[d+s+5]=i.y,h[d+s+6]=i.z,h[d+s+7]=0),a===!0&&(i.fromBufferAttribute(u,t),h[d+s+8]=i.x,h[d+s+9]=i.y,h[d+s+10]=i.z,h[d+s+11]=u.itemSize===4?i.w:1)}}d={count:u,texture:g,size:new H(p,m)},r.set(o,d);function v(){g.dispose(),r.delete(o),o.removeEventListener(`dispose`,v)}o.addEventListener(`dispose`,v)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)s.getUniforms().setValue(e,`morphTexture`,a.morphTexture,n);else{let t=0;for(let e=0;e<c.length;e++)t+=c[e];let n=o.morphTargetsRelative?1:1-t;s.getUniforms().setValue(e,`morphTargetBaseInfluence`,n),s.getUniforms().setValue(e,`morphTargetInfluences`,c)}s.getUniforms().setValue(e,`morphTargetsTexture`,d.texture,n),s.getUniforms().setValue(e,`morphTargetsTextureSize`,d.size)}return{update:a}}function Cd(e,t,n,r,i){let a=new WeakMap;function o(r){let o=i.render.frame,s=r.geometry,l=t.get(r,s);if(a.get(l)!==o&&(t.update(l),a.set(l,o)),r.isInstancedMesh&&(r.hasEventListener(`dispose`,c)===!1&&r.addEventListener(`dispose`,c),a.get(r)!==o&&(n.update(r.instanceMatrix,e.ARRAY_BUFFER),r.instanceColor!==null&&n.update(r.instanceColor,e.ARRAY_BUFFER),a.set(r,o))),r.isSkinnedMesh){let e=r.skeleton;a.get(e)!==o&&(e.update(),a.set(e,o))}return l}function s(){a=new WeakMap}function c(e){let t=e.target;t.removeEventListener(`dispose`,c),r.releaseStatesOfObject(t),n.remove(t.instanceMatrix),t.instanceColor!==null&&n.remove(t.instanceColor)}return{update:o,dispose:s}}var wd={1:`LINEAR_TONE_MAPPING`,2:`REINHARD_TONE_MAPPING`,3:`CINEON_TONE_MAPPING`,4:`ACES_FILMIC_TONE_MAPPING`,6:`AGX_TONE_MAPPING`,7:`NEUTRAL_TONE_MAPPING`,5:`CUSTOM_TONE_MAPPING`};function Td(e,t,n,r,i,a){let o=new Ba(t,n,{type:e,depthBuffer:i,stencilBuffer:a,samples:r?4:0,depthTexture:i?new Yc(t,n):void 0}),s=new Ba(t,n,{type:wr,depthBuffer:!1,stencilBuffer:!1}),c=new bs;c.setAttribute(`position`,new cs([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute(`uv`,new cs([0,2,0,0,2,0],2));let l=new ml({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),u=new J(c,l),d=new fu(-1,1,1,-1,0,1),f=null,p=null,m=!1,h,g=null,_=[],v=!1;this.setSize=function(e,t){o.setSize(e,t),s.setSize(e,t);for(let n=0;n<_.length;n++){let r=_[n];r.setSize&&r.setSize(e,t)}},this.setEffects=function(e){_=e,v=_.length>0&&_[0].isRenderPass===!0;let t=o.width,n=o.height;for(let e=0;e<_.length;e++){let r=_[e];r.setSize&&r.setSize(t,n)}},this.begin=function(e,t){if(m||e.toneMapping===0&&_.length===0)return!1;if(g=t,t!==null){let e=t.width,n=t.height;(o.width!==e||o.height!==n)&&this.setSize(e,n)}return v===!1&&e.setRenderTarget(o),h=e.toneMapping,e.toneMapping=0,!0},this.hasRenderPass=function(){return v},this.end=function(e,t){e.toneMapping=h,m=!0;let n=o,r=s;for(let i=0;i<_.length;i++){let a=_[i];if(a.enabled!==!1&&(a.render(e,r,n,t),a.needsSwap!==!1)){let e=n;n=r,r=e}}if(f!==e.outputColorSpace||p!==e.toneMapping){f=e.outputColorSpace,p=e.toneMapping,l.defines={},G.getTransfer(f)===`srgb`&&(l.defines.SRGB_TRANSFER=``);let t=wd[p];t&&(l.defines[t]=``),l.needsUpdate=!0}l.uniforms.tDiffuse.value=n.texture,e.setRenderTarget(g),e.render(u,d),g=null,m=!1},this.isCompositing=function(){return m},this.dispose=function(){o.depthTexture&&o.depthTexture.dispose(),o.dispose(),s.dispose(),c.dispose(),l.dispose()}}var Ed=new La,Dd=new Yc(1,1),Od=new Va,kd=new Ha,Ad=new qc,jd=[],Md=[],Nd=new Float32Array(16),Pd=new Float32Array(9),Fd=new Float32Array(4);function Id(e,t,n){let r=e[0];if(r<=0||r>0)return e;let i=t*n,a=jd[i];if(a===void 0&&(a=new Float32Array(i),jd[i]=a),t!==0){r.toArray(a,0);for(let r=1,i=0;r!==t;++r)i+=n,e[r].toArray(a,i)}return a}function Ld(e,t){if(e.length!==t.length)return!1;for(let n=0,r=e.length;n<r;n++)if(e[n]!==t[n])return!1;return!0}function Rd(e,t){for(let n=0,r=t.length;n<r;n++)e[n]=t[n]}function zd(e,t){let n=Md[t];n===void 0&&(n=new Int32Array(t),Md[t]=n);for(let r=0;r!==t;++r)n[r]=e.allocateTextureUnit();return n}function Bd(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function Vd(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Ld(n,t))return;e.uniform2fv(this.addr,t),Rd(n,t)}}function Hd(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(Ld(n,t))return;e.uniform3fv(this.addr,t),Rd(n,t)}}function Ud(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Ld(n,t))return;e.uniform4fv(this.addr,t),Rd(n,t)}}function Wd(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Ld(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),Rd(n,t)}else{if(Ld(n,r))return;Fd.set(r),e.uniformMatrix2fv(this.addr,!1,Fd),Rd(n,r)}}function Gd(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Ld(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),Rd(n,t)}else{if(Ld(n,r))return;Pd.set(r),e.uniformMatrix3fv(this.addr,!1,Pd),Rd(n,r)}}function Kd(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Ld(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),Rd(n,t)}else{if(Ld(n,r))return;Nd.set(r),e.uniformMatrix4fv(this.addr,!1,Nd),Rd(n,r)}}function qd(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function Jd(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Ld(n,t))return;e.uniform2iv(this.addr,t),Rd(n,t)}}function Yd(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Ld(n,t))return;e.uniform3iv(this.addr,t),Rd(n,t)}}function Xd(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Ld(n,t))return;e.uniform4iv(this.addr,t),Rd(n,t)}}function Zd(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function Qd(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Ld(n,t))return;e.uniform2uiv(this.addr,t),Rd(n,t)}}function $d(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Ld(n,t))return;e.uniform3uiv(this.addr,t),Rd(n,t)}}function ef(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Ld(n,t))return;e.uniform4uiv(this.addr,t),Rd(n,t)}}function tf(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;this.type===e.SAMPLER_2D_SHADOW?(Dd.compareFunction=n.isReversedDepthBuffer()?518:515,a=Dd):a=Ed,n.setTexture2D(t||a,i)}function nf(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture3D(t||kd,i)}function rf(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTextureCube(t||Ad,i)}function af(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture2DArray(t||Od,i)}function of(e){switch(e){case 5126:return Bd;case 35664:return Vd;case 35665:return Hd;case 35666:return Ud;case 35674:return Wd;case 35675:return Gd;case 35676:return Kd;case 5124:case 35670:return qd;case 35667:case 35671:return Jd;case 35668:case 35672:return Yd;case 35669:case 35673:return Xd;case 5125:return Zd;case 36294:return Qd;case 36295:return $d;case 36296:return ef;case 35678:case 36198:case 36298:case 36306:case 35682:return tf;case 35679:case 36299:case 36307:return nf;case 35680:case 36300:case 36308:case 36293:return rf;case 36289:case 36303:case 36311:case 36292:return af}}function sf(e,t){e.uniform1fv(this.addr,t)}function cf(e,t){let n=Id(t,this.size,2);e.uniform2fv(this.addr,n)}function lf(e,t){let n=Id(t,this.size,3);e.uniform3fv(this.addr,n)}function uf(e,t){let n=Id(t,this.size,4);e.uniform4fv(this.addr,n)}function df(e,t){let n=Id(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function ff(e,t){let n=Id(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function pf(e,t){let n=Id(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function mf(e,t){e.uniform1iv(this.addr,t)}function hf(e,t){e.uniform2iv(this.addr,t)}function gf(e,t){e.uniform3iv(this.addr,t)}function _f(e,t){e.uniform4iv(this.addr,t)}function vf(e,t){e.uniform1uiv(this.addr,t)}function yf(e,t){e.uniform2uiv(this.addr,t)}function bf(e,t){e.uniform3uiv(this.addr,t)}function xf(e,t){e.uniform4uiv(this.addr,t)}function Sf(e,t,n){let r=this.cache,i=t.length,a=zd(n,i);Ld(r,a)||(e.uniform1iv(this.addr,a),Rd(r,a));let o;o=this.type===e.SAMPLER_2D_SHADOW?Dd:Ed;for(let e=0;e!==i;++e)n.setTexture2D(t[e]||o,a[e])}function Cf(e,t,n){let r=this.cache,i=t.length,a=zd(n,i);Ld(r,a)||(e.uniform1iv(this.addr,a),Rd(r,a));for(let e=0;e!==i;++e)n.setTexture3D(t[e]||kd,a[e])}function wf(e,t,n){let r=this.cache,i=t.length,a=zd(n,i);Ld(r,a)||(e.uniform1iv(this.addr,a),Rd(r,a));for(let e=0;e!==i;++e)n.setTextureCube(t[e]||Ad,a[e])}function Tf(e,t,n){let r=this.cache,i=t.length,a=zd(n,i);Ld(r,a)||(e.uniform1iv(this.addr,a),Rd(r,a));for(let e=0;e!==i;++e)n.setTexture2DArray(t[e]||Od,a[e])}function Ef(e){switch(e){case 5126:return sf;case 35664:return cf;case 35665:return lf;case 35666:return uf;case 35674:return df;case 35675:return ff;case 35676:return pf;case 5124:case 35670:return mf;case 35667:case 35671:return hf;case 35668:case 35672:return gf;case 35669:case 35673:return _f;case 5125:return vf;case 36294:return yf;case 36295:return bf;case 36296:return xf;case 35678:case 36198:case 36298:case 36306:case 35682:return Sf;case 35679:case 36299:case 36307:return Cf;case 35680:case 36300:case 36308:case 36293:return wf;case 36289:case 36303:case 36311:case 36292:return Tf}}var Df=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=of(t.type)}},Of=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Ef(t.type)}},kf=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let i=0,a=r.length;i!==a;++i){let a=r[i];a.setValue(e,t[a.id],n)}}},Af=/(\w+)(\])?(\[|\.)?/g;function jf(e,t){e.seq.push(t),e.map[t.id]=t}function Mf(e,t,n){let r=e.name,i=r.length;for(Af.lastIndex=0;;){let a=Af.exec(r),o=Af.lastIndex,s=a[1],c=a[2]===`]`,l=a[3];if(c&&(s|=0),l===void 0||l===`[`&&o+2===i){jf(n,l===void 0?new Df(s,e,t):new Of(s,e,t));break}{let e=n.map[s];e===void 0&&(e=new kf(s),jf(n,e)),n=e}}}var Nf=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let n=e.getActiveUniform(t,r);Mf(n,e.getUniformLocation(t,n.name),this)}let r=[],i=[];for(let t of this.seq)t.type===e.SAMPLER_2D_SHADOW||t.type===e.SAMPLER_CUBE_SHADOW||t.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(t):i.push(t);r.length>0&&(this.seq=r.concat(i))}setValue(e,t,n,r){let i=this.map[t];i!==void 0&&i.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let i=0,a=t.length;i!==a;++i){let a=t[i],o=n[a.id];o.needsUpdate!==!1&&a.setValue(e,o.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,i=e.length;r!==i;++r){let i=e[r];i.id in t&&n.push(i)}return n}};function Pf(e,t,n){let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),r}var Ff=37297,If=0;function Lf(e,t){let n=e.split(`
`),r=[],i=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let e=i;e<a;e++){let i=e+1;r.push(`${i===t?`>`:` `} ${i}: ${n[e]}`)}return r.join(`
`)}var Rf=new W;function zf(e){G._getMatrix(Rf,G.workingColorSpace,e);let t=`mat3( ${Rf.elements.map(e=>e.toFixed(4))} )`;switch(G.getTransfer(e)){case Ni:return[t,`LinearTransferOETF`];case Pi:return[t,`sRGBTransferOETF`];default:return z(`WebGLProgram: Unsupported color space: `,e),[t,`LinearTransferOETF`]}}function Bf(e,t,n){let r=e.getShaderParameter(t,e.COMPILE_STATUS),i=(e.getShaderInfoLog(t)||``).trim();if(r&&i===``)return``;let a=/ERROR: 0:(\d+)/.exec(i);if(a){let r=parseInt(a[1]);return n.toUpperCase()+`

`+i+`

`+Lf(e.getShaderSource(t),r)}return i}function Vf(e,t){let n=zf(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,`}`].join(`
`)}var Hf={1:`Linear`,2:`Reinhard`,3:`Cineon`,4:`ACESFilmic`,6:`AgX`,7:`Neutral`,5:`Custom`};function Uf(e,t){let n=Hf[t];return n===void 0?(z(`WebGLProgram: Unsupported toneMapping:`,t),`vec3 `+e+`( vec3 color ) { return LinearToneMapping( color ); }`):`vec3 `+e+`( vec3 color ) { return `+n+`ToneMapping( color ); }`}var Wf=new U;function Gf(){return G.getLuminanceCoefficients(Wf),[`float luminance( const in vec3 rgb ) {`,`	const vec3 weights = vec3( ${Wf.x.toFixed(4)}, ${Wf.y.toFixed(4)}, ${Wf.z.toFixed(4)} );`,`	return dot( weights, rgb );`,`}`].join(`
`)}function Kf(e){return[e.extensionClipCullDistance?`#extension GL_ANGLE_clip_cull_distance : require`:``,e.extensionMultiDraw?`#extension GL_ANGLE_multi_draw : require`:``].filter(Yf).join(`
`)}function qf(e){let t=[];for(let n in e){let r=e[n];r!==!1&&t.push(`#define `+n+` `+r)}return t.join(`
`)}function Jf(e,t){let n={},r=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let i=0;i<r;i++){let r=e.getActiveAttrib(t,i),a=r.name,o=1;r.type===e.FLOAT_MAT2&&(o=2),r.type===e.FLOAT_MAT3&&(o=3),r.type===e.FLOAT_MAT4&&(o=4),n[a]={type:r.type,location:e.getAttribLocation(t,a),locationSize:o}}return n}function Yf(e){return e!==``}function Xf(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Zf(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Qf=/^[ \t]*#include +<([\w\d./]+)>/gm;function $f(e){return e.replace(Qf,tp)}var ep=new Map;function tp(e,t){let n=Z[t];if(n===void 0){let e=ep.get(t);if(e!==void 0)n=Z[e],z(`WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.`,t,e);else throw Error(`THREE.WebGLProgram: Can not resolve #include <`+t+`>`)}return $f(n)}var np=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function rp(e){return e.replace(np,ip)}function ip(e,t,n,r){let i=``;for(let e=parseInt(t);e<parseInt(n);e++)i+=r.replace(/\[\s*i\s*\]/g,`[ `+e+` ]`).replace(/UNROLLED_LOOP_INDEX/g,e);return i}function ap(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision===`highp`?t+=`
#define HIGH_PRECISION`:e.precision===`mediump`?t+=`
#define MEDIUM_PRECISION`:e.precision===`lowp`&&(t+=`
#define LOW_PRECISION`),t}var op={1:`SHADOWMAP_TYPE_PCF`,3:`SHADOWMAP_TYPE_VSM`};function sp(e){return op[e.shadowMapType]||`SHADOWMAP_TYPE_BASIC`}var cp={301:`ENVMAP_TYPE_CUBE`,302:`ENVMAP_TYPE_CUBE`,306:`ENVMAP_TYPE_CUBE_UV`};function lp(e){return e.envMap===!1?`ENVMAP_TYPE_CUBE`:cp[e.envMapMode]||`ENVMAP_TYPE_CUBE`}var up={302:`ENVMAP_MODE_REFRACTION`};function dp(e){return e.envMap===!1?`ENVMAP_MODE_REFLECTION`:up[e.envMapMode]||`ENVMAP_MODE_REFLECTION`}var fp={0:`ENVMAP_BLENDING_MULTIPLY`,1:`ENVMAP_BLENDING_MIX`,2:`ENVMAP_BLENDING_ADD`};function pp(e){return e.envMap===!1?`ENVMAP_BLENDING_NONE`:fp[e.combine]||`ENVMAP_BLENDING_NONE`}function mp(e){let t=e.envMapCubeUVHeight;if(t===null)return null;let n=Math.log2(t)-2,r=1/t;return{texelWidth:1/(3*Math.max(2**n,112)),texelHeight:r,maxMip:n}}function hp(e,t,n,r){let i=e.getContext(),a=n.defines,o=n.vertexShader,s=n.fragmentShader,c=sp(n),l=lp(n),u=dp(n),d=pp(n),f=mp(n),p=Kf(n),m=qf(a),h=i.createProgram(),g,_,v=n.glslVersion?`#version `+n.glslVersion+`
`:``;n.isRawShaderMaterial?(g=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(Yf).join(`
`),g.length>0&&(g+=`
`),_=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(Yf).join(`
`),_.length>0&&(_+=`
`)):(g=[ap(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.extensionClipCullDistance?`#define USE_CLIP_DISTANCE`:``,n.batching?`#define USE_BATCHING`:``,n.batchingColor?`#define USE_BATCHING_COLOR`:``,n.instancing?`#define USE_INSTANCING`:``,n.instancingColor?`#define USE_INSTANCING_COLOR`:``,n.instancingMorph?`#define USE_INSTANCING_MORPH`:``,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.map?`#define USE_MAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+u:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.displacementMap?`#define USE_DISPLACEMENTMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.mapUv?`#define MAP_UV `+n.mapUv:``,n.alphaMapUv?`#define ALPHAMAP_UV `+n.alphaMapUv:``,n.lightMapUv?`#define LIGHTMAP_UV `+n.lightMapUv:``,n.aoMapUv?`#define AOMAP_UV `+n.aoMapUv:``,n.emissiveMapUv?`#define EMISSIVEMAP_UV `+n.emissiveMapUv:``,n.bumpMapUv?`#define BUMPMAP_UV `+n.bumpMapUv:``,n.normalMapUv?`#define NORMALMAP_UV `+n.normalMapUv:``,n.displacementMapUv?`#define DISPLACEMENTMAP_UV `+n.displacementMapUv:``,n.metalnessMapUv?`#define METALNESSMAP_UV `+n.metalnessMapUv:``,n.roughnessMapUv?`#define ROUGHNESSMAP_UV `+n.roughnessMapUv:``,n.anisotropyMapUv?`#define ANISOTROPYMAP_UV `+n.anisotropyMapUv:``,n.clearcoatMapUv?`#define CLEARCOATMAP_UV `+n.clearcoatMapUv:``,n.clearcoatNormalMapUv?`#define CLEARCOAT_NORMALMAP_UV `+n.clearcoatNormalMapUv:``,n.clearcoatRoughnessMapUv?`#define CLEARCOAT_ROUGHNESSMAP_UV `+n.clearcoatRoughnessMapUv:``,n.iridescenceMapUv?`#define IRIDESCENCEMAP_UV `+n.iridescenceMapUv:``,n.iridescenceThicknessMapUv?`#define IRIDESCENCE_THICKNESSMAP_UV `+n.iridescenceThicknessMapUv:``,n.sheenColorMapUv?`#define SHEEN_COLORMAP_UV `+n.sheenColorMapUv:``,n.sheenRoughnessMapUv?`#define SHEEN_ROUGHNESSMAP_UV `+n.sheenRoughnessMapUv:``,n.specularMapUv?`#define SPECULARMAP_UV `+n.specularMapUv:``,n.specularColorMapUv?`#define SPECULAR_COLORMAP_UV `+n.specularColorMapUv:``,n.specularIntensityMapUv?`#define SPECULAR_INTENSITYMAP_UV `+n.specularIntensityMapUv:``,n.transmissionMapUv?`#define TRANSMISSIONMAP_UV `+n.transmissionMapUv:``,n.thicknessMapUv?`#define THICKNESSMAP_UV `+n.thicknessMapUv:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexNormals?`#define HAS_NORMAL`:``,n.vertexColors?`#define USE_COLOR`:``,n.vertexAlphas?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.flatShading?`#define FLAT_SHADED`:``,n.skinning?`#define USE_SKINNING`:``,n.morphTargets?`#define USE_MORPHTARGETS`:``,n.morphNormals&&n.flatShading===!1?`#define USE_MORPHNORMALS`:``,n.morphColors?`#define USE_MORPHCOLORS`:``,n.morphTargetsCount>0?`#define MORPHTARGETS_TEXTURE_STRIDE `+n.morphTextureStride:``,n.morphTargetsCount>0?`#define MORPHTARGETS_COUNT `+n.morphTargetsCount:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.sizeAttenuation?`#define USE_SIZEATTENUATION`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 modelMatrix;`,`uniform mat4 modelViewMatrix;`,`uniform mat4 projectionMatrix;`,`uniform mat4 viewMatrix;`,`uniform mat3 normalMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,`#ifdef USE_INSTANCING`,`	attribute mat4 instanceMatrix;`,`#endif`,`#ifdef USE_INSTANCING_COLOR`,`	attribute vec3 instanceColor;`,`#endif`,`#ifdef USE_INSTANCING_MORPH`,`	uniform sampler2D morphTexture;`,`#endif`,`attribute vec3 position;`,`attribute vec3 normal;`,`attribute vec2 uv;`,`#ifdef USE_UV1`,`	attribute vec2 uv1;`,`#endif`,`#ifdef USE_UV2`,`	attribute vec2 uv2;`,`#endif`,`#ifdef USE_UV3`,`	attribute vec2 uv3;`,`#endif`,`#ifdef USE_TANGENT`,`	attribute vec4 tangent;`,`#endif`,`#if defined( USE_COLOR_ALPHA )`,`	attribute vec4 color;`,`#elif defined( USE_COLOR )`,`	attribute vec3 color;`,`#endif`,`#ifdef USE_SKINNING`,`	attribute vec4 skinIndex;`,`	attribute vec4 skinWeight;`,`#endif`,`
`].filter(Yf).join(`
`),_=[ap(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.alphaToCoverage?`#define ALPHA_TO_COVERAGE`:``,n.map?`#define USE_MAP`:``,n.matcap?`#define USE_MATCAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+l:``,n.envMap?`#define `+u:``,n.envMap?`#define `+d:``,f?`#define CUBEUV_TEXEL_WIDTH `+f.texelWidth:``,f?`#define CUBEUV_TEXEL_HEIGHT `+f.texelHeight:``,f?`#define CUBEUV_MAX_MIP `+f.maxMip+`.0`:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.packedNormalMap?`#define USE_PACKED_NORMALMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoat?`#define USE_CLEARCOAT`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.dispersion?`#define USE_DISPERSION`:``,n.iridescence?`#define USE_IRIDESCENCE`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaTest?`#define USE_ALPHATEST`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.sheen?`#define USE_SHEEN`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexColors||n.instancingColor?`#define USE_COLOR`:``,n.vertexAlphas||n.batchingColor?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.gradientMap?`#define USE_GRADIENTMAP`:``,n.flatShading?`#define FLAT_SHADED`:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.premultipliedAlpha?`#define PREMULTIPLIED_ALPHA`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.numLightProbeGrids>0?`#define USE_LIGHT_PROBES_GRID`:``,n.decodeVideoTexture?`#define DECODE_VIDEO_TEXTURE`:``,n.decodeVideoTextureEmissive?`#define DECODE_VIDEO_TEXTURE_EMISSIVE`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 viewMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,n.toneMapping===0?``:`#define TONE_MAPPING`,n.toneMapping===0?``:Z.tonemapping_pars_fragment,n.toneMapping===0?``:Uf(`toneMapping`,n.toneMapping),n.dithering?`#define DITHERING`:``,n.opaque?`#define OPAQUE`:``,Z.colorspace_pars_fragment,Vf(`linearToOutputTexel`,n.outputColorSpace),Gf(),n.useDepthPacking?`#define DEPTH_PACKING `+n.depthPacking:``,`
`].filter(Yf).join(`
`)),o=$f(o),o=Xf(o,n),o=Zf(o,n),s=$f(s),s=Xf(s,n),s=Zf(s,n),o=rp(o),s=rp(s),n.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,g=[p,`#define attribute in`,`#define varying out`,`#define texture2D texture`].join(`
`)+`
`+g,_=[`#define varying in`,n.glslVersion===`300 es`?``:`layout(location = 0) out highp vec4 pc_fragColor;`,n.glslVersion===`300 es`?``:`#define gl_FragColor pc_fragColor`,`#define gl_FragDepthEXT gl_FragDepth`,`#define texture2D texture`,`#define textureCube texture`,`#define texture2DProj textureProj`,`#define texture2DLodEXT textureLod`,`#define texture2DProjLodEXT textureProjLod`,`#define textureCubeLodEXT textureLod`,`#define texture2DGradEXT textureGrad`,`#define texture2DProjGradEXT textureProjGrad`,`#define textureCubeGradEXT textureGrad`].join(`
`)+`
`+_);let y=v+g+o,b=v+_+s,x=Pf(i,i.VERTEX_SHADER,y),S=Pf(i,i.FRAGMENT_SHADER,b);i.attachShader(h,x),i.attachShader(h,S),n.index0AttributeName===void 0?n.hasPositionAttribute===!0&&i.bindAttribLocation(h,0,`position`):i.bindAttribLocation(h,0,n.index0AttributeName),i.linkProgram(h);function C(t){if(e.debug.checkShaderErrors){let n=i.getProgramInfoLog(h)||``,r=i.getShaderInfoLog(x)||``,a=i.getShaderInfoLog(S)||``,o=n.trim(),s=r.trim(),c=a.trim(),l=!0,u=!0;if(i.getProgramParameter(h,i.LINK_STATUS)===!1){if(l=!1,typeof e.debug.onShaderError==`function`)e.debug.onShaderError(i,h,x,S);else{let e=Bf(i,x,`vertex`),n=Bf(i,S,`fragment`);B(`WebGLProgram: Shader Error `+i.getError()+` - VALIDATE_STATUS `+i.getProgramParameter(h,i.VALIDATE_STATUS)+`

Material Name: `+t.name+`
Material Type: `+t.type+`

Program Info Log: `+o+`
`+e+`
`+n)}}else o===``?(s===``||c===``)&&(u=!1):z(`WebGLProgram: Program Info Log:`,o);u&&(t.diagnostics={runnable:l,programLog:o,vertexShader:{log:s,prefix:g},fragmentShader:{log:c,prefix:_}})}i.deleteShader(x),i.deleteShader(S),w=new Nf(i,h),T=Jf(i,h)}let w;this.getUniforms=function(){return w===void 0&&C(this),w};let T;this.getAttributes=function(){return T===void 0&&C(this),T};let E=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return E===!1&&(E=i.getProgramParameter(h,Ff)),E},this.destroy=function(){r.releaseStatesOfProgram(this),i.deleteProgram(h),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=If++,this.cacheKey=t,this.usedTimes=1,this.program=h,this.vertexShader=x,this.fragmentShader=S,this}var gp=0,_p=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let e of t)e.usedTimes--,e.usedTimes===0&&this.shaderCache.delete(e.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new vp(e),t.set(e,n)),n}},vp=class{constructor(e){this.id=gp++,this.code=e,this.usedTimes=0}};function yp(e){return e===1030||e===37490||e===36285}function bp(e,t,n,r,i,a){let o=new $a,s=new _p,c=new Set,l=[],u=new Map,d=r.logarithmicDepthBuffer,f=r.precision,p={MeshDepthMaterial:`depth`,MeshDistanceMaterial:`distance`,MeshNormalMaterial:`normal`,MeshBasicMaterial:`basic`,MeshLambertMaterial:`lambert`,MeshPhongMaterial:`phong`,MeshToonMaterial:`toon`,MeshStandardMaterial:`physical`,MeshPhysicalMaterial:`physical`,MeshMatcapMaterial:`matcap`,LineBasicMaterial:`basic`,LineDashedMaterial:`dashed`,PointsMaterial:`points`,ShadowMaterial:`shadow`,SpriteMaterial:`sprite`};function m(e){return c.add(e),e===0?`uv`:`uv${e}`}function h(i,o,l,u,h,g){let _=u.fog,v=h.geometry,y=i.isMeshStandardMaterial||i.isMeshLambertMaterial||i.isMeshPhongMaterial?u.environment:null,b=i.isMeshStandardMaterial||i.isMeshLambertMaterial&&!i.envMap||i.isMeshPhongMaterial&&!i.envMap,x=t.get(i.envMap||y,b),S=x&&x.mapping===306?x.image.height:null,C=p[i.type];i.precision!==null&&(f=r.getMaxPrecision(i.precision),f!==i.precision&&z(`WebGLProgram.getParameters:`,i.precision,`not supported, using`,f,`instead.`));let w=v.morphAttributes.position||v.morphAttributes.normal||v.morphAttributes.color,T=w===void 0?0:w.length,E=0;v.morphAttributes.position!==void 0&&(E=1),v.morphAttributes.normal!==void 0&&(E=2),v.morphAttributes.color!==void 0&&(E=3);let D,O,k,A;if(C){let e=Vu[C];D=e.vertexShader,O=e.fragmentShader}else{D=i.vertexShader,O=i.fragmentShader;let e=s.getVertexShaderStage(i),t=s.getFragmentShaderStage(i);s.update(i,e,t),k=e.id,A=t.id}let ee=e.getRenderTarget(),te=e.state.buffers.depth.getReversed(),j=h.isInstancedMesh===!0,ne=h.isBatchedMesh===!0,re=!!i.map,ie=!!i.matcap,ae=!!x,oe=!!i.aoMap,se=!!i.lightMap,ce=!!i.bumpMap&&i.wireframe===!1,le=!!i.normalMap,ue=!!i.displacementMap,de=!!i.emissiveMap,fe=!!i.metalnessMap,pe=!!i.roughnessMap,me=i.anisotropy>0,he=i.clearcoat>0,ge=i.dispersion>0,_e=i.iridescence>0,ve=i.sheen>0,ye=i.transmission>0,be=me&&!!i.anisotropyMap,xe=he&&!!i.clearcoatMap,Se=he&&!!i.clearcoatNormalMap,Ce=he&&!!i.clearcoatRoughnessMap,we=_e&&!!i.iridescenceMap,Te=_e&&!!i.iridescenceThicknessMap,M=ve&&!!i.sheenColorMap,Ee=ve&&!!i.sheenRoughnessMap,De=!!i.specularMap,Oe=!!i.specularColorMap,N=!!i.specularIntensityMap,ke=ye&&!!i.transmissionMap,P=ye&&!!i.thicknessMap,F=!!i.gradientMap,Ae=!!i.alphaMap,je=i.alphaTest>0,Me=!!i.alphaHash,Ne=!!i.extensions,Pe=0;i.toneMapped&&(ee===null||ee.isXRRenderTarget===!0)&&(Pe=e.toneMapping);let Fe={shaderID:C,shaderType:i.type,shaderName:i.name,vertexShader:D,fragmentShader:O,defines:i.defines,customVertexShaderID:k,customFragmentShaderID:A,isRawShaderMaterial:i.isRawShaderMaterial===!0,glslVersion:i.glslVersion,precision:f,batching:ne,batchingColor:ne&&h._colorsTexture!==null,instancing:j,instancingColor:j&&h.instanceColor!==null,instancingMorph:j&&h.morphTexture!==null,outputColorSpace:ee===null?e.outputColorSpace:ee.isXRRenderTarget===!0?ee.texture.colorSpace:G.workingColorSpace,alphaToCoverage:!!i.alphaToCoverage,map:re,matcap:ie,envMap:ae,envMapMode:ae&&x.mapping,envMapCubeUVHeight:S,aoMap:oe,lightMap:se,bumpMap:ce,normalMap:le,displacementMap:ue,emissiveMap:de,normalMapObjectSpace:le&&i.normalMapType===1,normalMapTangentSpace:le&&i.normalMapType===0,packedNormalMap:le&&i.normalMapType===0&&yp(i.normalMap.format),metalnessMap:fe,roughnessMap:pe,anisotropy:me,anisotropyMap:be,clearcoat:he,clearcoatMap:xe,clearcoatNormalMap:Se,clearcoatRoughnessMap:Ce,dispersion:ge,iridescence:_e,iridescenceMap:we,iridescenceThicknessMap:Te,sheen:ve,sheenColorMap:M,sheenRoughnessMap:Ee,specularMap:De,specularColorMap:Oe,specularIntensityMap:N,transmission:ye,transmissionMap:ke,thicknessMap:P,gradientMap:F,opaque:i.transparent===!1&&i.blending===1&&i.alphaToCoverage===!1,alphaMap:Ae,alphaTest:je,alphaHash:Me,combine:i.combine,mapUv:re&&m(i.map.channel),aoMapUv:oe&&m(i.aoMap.channel),lightMapUv:se&&m(i.lightMap.channel),bumpMapUv:ce&&m(i.bumpMap.channel),normalMapUv:le&&m(i.normalMap.channel),displacementMapUv:ue&&m(i.displacementMap.channel),emissiveMapUv:de&&m(i.emissiveMap.channel),metalnessMapUv:fe&&m(i.metalnessMap.channel),roughnessMapUv:pe&&m(i.roughnessMap.channel),anisotropyMapUv:be&&m(i.anisotropyMap.channel),clearcoatMapUv:xe&&m(i.clearcoatMap.channel),clearcoatNormalMapUv:Se&&m(i.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ce&&m(i.clearcoatRoughnessMap.channel),iridescenceMapUv:we&&m(i.iridescenceMap.channel),iridescenceThicknessMapUv:Te&&m(i.iridescenceThicknessMap.channel),sheenColorMapUv:M&&m(i.sheenColorMap.channel),sheenRoughnessMapUv:Ee&&m(i.sheenRoughnessMap.channel),specularMapUv:De&&m(i.specularMap.channel),specularColorMapUv:Oe&&m(i.specularColorMap.channel),specularIntensityMapUv:N&&m(i.specularIntensityMap.channel),transmissionMapUv:ke&&m(i.transmissionMap.channel),thicknessMapUv:P&&m(i.thicknessMap.channel),alphaMapUv:Ae&&m(i.alphaMap.channel),vertexTangents:!!v.attributes.tangent&&(le||me),vertexNormals:!!v.attributes.normal,vertexColors:i.vertexColors,vertexAlphas:i.vertexColors===!0&&!!v.attributes.color&&v.attributes.color.itemSize===4,pointsUvs:h.isPoints===!0&&!!v.attributes.uv&&(re||Ae),fog:!!_,useFog:i.fog===!0,fogExp2:!!_&&_.isFogExp2,flatShading:i.wireframe===!1&&(i.flatShading===!0||v.attributes.normal===void 0&&le===!1&&(i.isMeshLambertMaterial||i.isMeshPhongMaterial||i.isMeshStandardMaterial||i.isMeshPhysicalMaterial)),sizeAttenuation:i.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:te,skinning:h.isSkinnedMesh===!0,hasPositionAttribute:v.attributes.position!==void 0,morphTargets:v.morphAttributes.position!==void 0,morphNormals:v.morphAttributes.normal!==void 0,morphColors:v.morphAttributes.color!==void 0,morphTargetsCount:T,morphTextureStride:E,numDirLights:o.directional.length,numPointLights:o.point.length,numSpotLights:o.spot.length,numSpotLightMaps:o.spotLightMap.length,numRectAreaLights:o.rectArea.length,numHemiLights:o.hemi.length,numDirLightShadows:o.directionalShadowMap.length,numPointLightShadows:o.pointShadowMap.length,numSpotLightShadows:o.spotShadowMap.length,numSpotLightShadowsWithMaps:o.numSpotLightShadowsWithMaps,numLightProbes:o.numLightProbes,numLightProbeGrids:g.length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:i.dithering,shadowMapEnabled:e.shadowMap.enabled&&l.length>0,shadowMapType:e.shadowMap.type,toneMapping:Pe,decodeVideoTexture:re&&i.map.isVideoTexture===!0&&G.getTransfer(i.map.colorSpace)===`srgb`,decodeVideoTextureEmissive:de&&i.emissiveMap.isVideoTexture===!0&&G.getTransfer(i.emissiveMap.colorSpace)===`srgb`,premultipliedAlpha:i.premultipliedAlpha,doubleSided:i.side===2,flipSided:i.side===1,useDepthPacking:i.depthPacking>=0,depthPacking:i.depthPacking||0,index0AttributeName:i.index0AttributeName,extensionClipCullDistance:Ne&&i.extensions.clipCullDistance===!0&&n.has(`WEBGL_clip_cull_distance`),extensionMultiDraw:(Ne&&i.extensions.multiDraw===!0||ne)&&n.has(`WEBGL_multi_draw`),rendererExtensionParallelShaderCompile:n.has(`KHR_parallel_shader_compile`),customProgramCacheKey:i.customProgramCacheKey()};return Fe.vertexUv1s=c.has(1),Fe.vertexUv2s=c.has(2),Fe.vertexUv3s=c.has(3),c.clear(),Fe}function g(t){let n=[];if(t.shaderID?n.push(t.shaderID):(n.push(t.customVertexShaderID),n.push(t.customFragmentShaderID)),t.defines!==void 0)for(let e in t.defines)n.push(e),n.push(t.defines[e]);return t.isRawShaderMaterial===!1&&(_(n,t),v(n,t),n.push(e.outputColorSpace)),n.push(t.customProgramCacheKey),n.join()}function _(e,t){e.push(t.precision),e.push(t.outputColorSpace),e.push(t.envMapMode),e.push(t.envMapCubeUVHeight),e.push(t.mapUv),e.push(t.alphaMapUv),e.push(t.lightMapUv),e.push(t.aoMapUv),e.push(t.bumpMapUv),e.push(t.normalMapUv),e.push(t.displacementMapUv),e.push(t.emissiveMapUv),e.push(t.metalnessMapUv),e.push(t.roughnessMapUv),e.push(t.anisotropyMapUv),e.push(t.clearcoatMapUv),e.push(t.clearcoatNormalMapUv),e.push(t.clearcoatRoughnessMapUv),e.push(t.iridescenceMapUv),e.push(t.iridescenceThicknessMapUv),e.push(t.sheenColorMapUv),e.push(t.sheenRoughnessMapUv),e.push(t.specularMapUv),e.push(t.specularColorMapUv),e.push(t.specularIntensityMapUv),e.push(t.transmissionMapUv),e.push(t.thicknessMapUv),e.push(t.combine),e.push(t.fogExp2),e.push(t.sizeAttenuation),e.push(t.morphTargetsCount),e.push(t.morphAttributeCount),e.push(t.numDirLights),e.push(t.numPointLights),e.push(t.numSpotLights),e.push(t.numSpotLightMaps),e.push(t.numHemiLights),e.push(t.numRectAreaLights),e.push(t.numDirLightShadows),e.push(t.numPointLightShadows),e.push(t.numSpotLightShadows),e.push(t.numSpotLightShadowsWithMaps),e.push(t.numLightProbes),e.push(t.shadowMapType),e.push(t.toneMapping),e.push(t.numClippingPlanes),e.push(t.numClipIntersection),e.push(t.depthPacking)}function v(e,t){o.disableAll(),t.instancing&&o.enable(0),t.instancingColor&&o.enable(1),t.instancingMorph&&o.enable(2),t.matcap&&o.enable(3),t.envMap&&o.enable(4),t.normalMapObjectSpace&&o.enable(5),t.normalMapTangentSpace&&o.enable(6),t.clearcoat&&o.enable(7),t.iridescence&&o.enable(8),t.alphaTest&&o.enable(9),t.vertexColors&&o.enable(10),t.vertexAlphas&&o.enable(11),t.vertexUv1s&&o.enable(12),t.vertexUv2s&&o.enable(13),t.vertexUv3s&&o.enable(14),t.vertexTangents&&o.enable(15),t.anisotropy&&o.enable(16),t.alphaHash&&o.enable(17),t.batching&&o.enable(18),t.dispersion&&o.enable(19),t.batchingColor&&o.enable(20),t.gradientMap&&o.enable(21),t.packedNormalMap&&o.enable(22),t.vertexNormals&&o.enable(23),e.push(o.mask),o.disableAll(),t.fog&&o.enable(0),t.useFog&&o.enable(1),t.flatShading&&o.enable(2),t.logarithmicDepthBuffer&&o.enable(3),t.reversedDepthBuffer&&o.enable(4),t.skinning&&o.enable(5),t.morphTargets&&o.enable(6),t.morphNormals&&o.enable(7),t.morphColors&&o.enable(8),t.premultipliedAlpha&&o.enable(9),t.shadowMapEnabled&&o.enable(10),t.doubleSided&&o.enable(11),t.flipSided&&o.enable(12),t.useDepthPacking&&o.enable(13),t.dithering&&o.enable(14),t.transmission&&o.enable(15),t.sheen&&o.enable(16),t.opaque&&o.enable(17),t.pointsUvs&&o.enable(18),t.decodeVideoTexture&&o.enable(19),t.decodeVideoTextureEmissive&&o.enable(20),t.alphaToCoverage&&o.enable(21),t.numLightProbeGrids>0&&o.enable(22),t.hasPositionAttribute&&o.enable(23),e.push(o.mask)}function y(e){let t=p[e.type],n;if(t){let e=Vu[t];n=ul.clone(e.uniforms)}else n=e.uniforms;return n}function b(t,n){let r=u.get(n);return r===void 0?(r=new hp(e,n,t,i),l.push(r),u.set(n,r)):++r.usedTimes,r}function x(e){if(--e.usedTimes===0){let t=l.indexOf(e);l[t]=l[l.length-1],l.pop(),u.delete(e.cacheKey),e.destroy()}}function S(e){s.remove(e)}function C(){s.dispose()}return{getParameters:h,getProgramCacheKey:g,getUniforms:y,acquireProgram:b,releaseProgram:x,releaseShaderCache:S,programs:l,dispose:C}}function xp(){let e=new WeakMap;function t(t){return e.has(t)}function n(t){let n=e.get(t);return n===void 0&&(n={},e.set(t,n)),n}function r(t){e.delete(t)}function i(t,n,r){e.get(t)[n]=r}function a(){e=new WeakMap}return{has:t,get:n,remove:r,update:i,dispose:a}}function Sp(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.material.id===t.material.id?e.materialVariant===t.materialVariant?e.z===t.z?e.id-t.id:e.z-t.z:e.materialVariant-t.materialVariant:e.material.id-t.material.id:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function Cp(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.z===t.z?e.id-t.id:t.z-e.z:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function wp(){let e=[],t=0,n=[],r=[],i=[];function a(){t=0,n.length=0,r.length=0,i.length=0}function o(e){let t=0;return e.isInstancedMesh&&(t+=2),e.isSkinnedMesh&&(t+=1),t}function s(n,r,i,a,s,c){let l=e[t];return l===void 0?(l={id:n.id,object:n,geometry:r,material:i,materialVariant:o(n),groupOrder:a,renderOrder:n.renderOrder,z:s,group:c},e[t]=l):(l.id=n.id,l.object=n,l.geometry=r,l.material=i,l.materialVariant=o(n),l.groupOrder=a,l.renderOrder=n.renderOrder,l.z=s,l.group=c),t++,l}function c(e,t,a,o,c,l){let u=s(e,t,a,o,c,l);a.transmission>0?r.push(u):a.transparent===!0?i.push(u):n.push(u)}function l(e,t,a,o,c,l){let u=s(e,t,a,o,c,l);a.transmission>0?r.unshift(u):a.transparent===!0?i.unshift(u):n.unshift(u)}function u(e,t,a){n.length>1&&n.sort(e||Sp),r.length>1&&r.sort(t||Cp),i.length>1&&i.sort(t||Cp),a&&(n.reverse(),r.reverse(),i.reverse())}function d(){for(let n=t,r=e.length;n<r;n++){let t=e[n];if(t.id===null)break;t.id=null,t.object=null,t.geometry=null,t.material=null,t.group=null}}return{opaque:n,transmissive:r,transparent:i,init:a,push:c,unshift:l,finish:d,sort:u}}function Tp(){let e=new WeakMap;function t(t,n){let r=e.get(t),i;return r===void 0?(i=new wp,e.set(t,[i])):n>=r.length?(i=new wp,r.push(i)):i=r[n],i}function n(){e=new WeakMap}return{get:t,dispose:n}}function Ep(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`DirectionalLight`:n={direction:new U,color:new q};break;case`SpotLight`:n={position:new U,direction:new U,color:new q,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case`PointLight`:n={position:new U,color:new q,distance:0,decay:0};break;case`HemisphereLight`:n={direction:new U,skyColor:new q,groundColor:new q};break;case`RectAreaLight`:n={color:new q,position:new U,halfWidth:new U,halfHeight:new U}}return e[t.id]=n,n}}}function Dp(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`DirectionalLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new H};break;case`SpotLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new H};break;case`PointLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new H,shadowCameraNear:1,shadowCameraFar:1e3}}return e[t.id]=n,n}}}var Op=0;function kp(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+ +!!t.map-!!e.map}function Ap(e){let t=new Ep,n=Dp(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let e=0;e<9;e++)r.probe.push(new U);let i=new U,a=new K,o=new K;function s(i){let a=0,o=0,s=0;for(let e=0;e<9;e++)r.probe[e].set(0,0,0);let c=0,l=0,u=0,d=0,f=0,p=0,m=0,h=0,g=0,_=0,v=0;i.sort(kp);for(let e=0,y=i.length;e<y;e++){let y=i[e],b=y.color,x=y.intensity,S=y.distance,C=null;if(y.shadow&&y.shadow.map&&(C=y.shadow.map.texture.format===1030?y.shadow.map.texture:y.shadow.map.depthTexture||y.shadow.map.texture),y.isAmbientLight)a+=b.r*x,o+=b.g*x,s+=b.b*x;else if(y.isLightProbe){for(let e=0;e<9;e++)r.probe[e].addScaledVector(y.sh.coefficients[e],x);v++}else if(y.isDirectionalLight){let e=t.get(y);if(e.color.copy(y.color).multiplyScalar(y.intensity),y.castShadow){let e=y.shadow,t=n.get(y);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,r.directionalShadow[c]=t,r.directionalShadowMap[c]=C,r.directionalShadowMatrix[c]=y.shadow.matrix,p++}r.directional[c]=e,c++}else if(y.isSpotLight){let e=t.get(y);e.position.setFromMatrixPosition(y.matrixWorld),e.color.copy(b).multiplyScalar(x),e.distance=S,e.coneCos=Math.cos(y.angle),e.penumbraCos=Math.cos(y.angle*(1-y.penumbra)),e.decay=y.decay,r.spot[u]=e;let i=y.shadow;if(y.map&&(r.spotLightMap[g]=y.map,g++,i.updateMatrices(y),y.castShadow&&_++),r.spotLightMatrix[u]=i.matrix,y.castShadow){let e=n.get(y);e.shadowIntensity=i.intensity,e.shadowBias=i.bias,e.shadowNormalBias=i.normalBias,e.shadowRadius=i.radius,e.shadowMapSize=i.mapSize,r.spotShadow[u]=e,r.spotShadowMap[u]=C,h++}u++}else if(y.isRectAreaLight){let e=t.get(y);e.color.copy(b).multiplyScalar(x),e.halfWidth.set(y.width*.5,0,0),e.halfHeight.set(0,y.height*.5,0),r.rectArea[d]=e,d++}else if(y.isPointLight){let e=t.get(y);if(e.color.copy(y.color).multiplyScalar(y.intensity),e.distance=y.distance,e.decay=y.decay,y.castShadow){let e=y.shadow,t=n.get(y);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,t.shadowCameraNear=e.camera.near,t.shadowCameraFar=e.camera.far,r.pointShadow[l]=t,r.pointShadowMap[l]=C,r.pointShadowMatrix[l]=y.shadow.matrix,m++}r.point[l]=e,l++}else if(y.isHemisphereLight){let e=t.get(y);e.skyColor.copy(y.color).multiplyScalar(x),e.groundColor.copy(y.groundColor).multiplyScalar(x),r.hemi[f]=e,f++}}d>0&&(e.has(`OES_texture_float_linear`)===!0?(r.rectAreaLTC1=Q.LTC_FLOAT_1,r.rectAreaLTC2=Q.LTC_FLOAT_2):(r.rectAreaLTC1=Q.LTC_HALF_1,r.rectAreaLTC2=Q.LTC_HALF_2)),r.ambient[0]=a,r.ambient[1]=o,r.ambient[2]=s;let y=r.hash;(y.directionalLength!==c||y.pointLength!==l||y.spotLength!==u||y.rectAreaLength!==d||y.hemiLength!==f||y.numDirectionalShadows!==p||y.numPointShadows!==m||y.numSpotShadows!==h||y.numSpotMaps!==g||y.numLightProbes!==v)&&(r.directional.length=c,r.spot.length=u,r.rectArea.length=d,r.point.length=l,r.hemi.length=f,r.directionalShadow.length=p,r.directionalShadowMap.length=p,r.pointShadow.length=m,r.pointShadowMap.length=m,r.spotShadow.length=h,r.spotShadowMap.length=h,r.directionalShadowMatrix.length=p,r.pointShadowMatrix.length=m,r.spotLightMatrix.length=h+g-_,r.spotLightMap.length=g,r.numSpotLightShadowsWithMaps=_,r.numLightProbes=v,y.directionalLength=c,y.pointLength=l,y.spotLength=u,y.rectAreaLength=d,y.hemiLength=f,y.numDirectionalShadows=p,y.numPointShadows=m,y.numSpotShadows=h,y.numSpotMaps=g,y.numLightProbes=v,r.version=Op++)}function c(e,t){let n=0,s=0,c=0,l=0,u=0,d=t.matrixWorldInverse;for(let t=0,f=e.length;t<f;t++){let f=e[t];if(f.isDirectionalLight){let e=r.directional[n];e.direction.setFromMatrixPosition(f.matrixWorld),i.setFromMatrixPosition(f.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(d),n++}else if(f.isSpotLight){let e=r.spot[c];e.position.setFromMatrixPosition(f.matrixWorld),e.position.applyMatrix4(d),e.direction.setFromMatrixPosition(f.matrixWorld),i.setFromMatrixPosition(f.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(d),c++}else if(f.isRectAreaLight){let e=r.rectArea[l];e.position.setFromMatrixPosition(f.matrixWorld),e.position.applyMatrix4(d),o.identity(),a.copy(f.matrixWorld),a.premultiply(d),o.extractRotation(a),e.halfWidth.set(f.width*.5,0,0),e.halfHeight.set(0,f.height*.5,0),e.halfWidth.applyMatrix4(o),e.halfHeight.applyMatrix4(o),l++}else if(f.isPointLight){let e=r.point[s];e.position.setFromMatrixPosition(f.matrixWorld),e.position.applyMatrix4(d),s++}else if(f.isHemisphereLight){let e=r.hemi[u];e.direction.setFromMatrixPosition(f.matrixWorld),e.direction.transformDirection(d),u++}}}return{setup:s,setupView:c,state:r}}function jp(e){let t=new Ap(e),n=[],r=[],i=[];function a(e){d.camera=e,n.length=0,r.length=0,i.length=0}function o(e){n.push(e)}function s(e){r.push(e)}function c(e){i.push(e)}function l(){t.setup(n)}function u(e){t.setupView(n,e)}let d={lightsArray:n,shadowsArray:r,lightProbeGridArray:i,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:d,setupLights:l,setupLightsView:u,pushLight:o,pushShadow:s,pushLightProbeGrid:c}}function Mp(e){let t=new WeakMap;function n(n,r=0){let i=t.get(n),a;return i===void 0?(a=new jp(e),t.set(n,[a])):r>=i.length?(a=new jp(e),i.push(a)):a=i[r],a}function r(){t=new WeakMap}return{get:n,dispose:r}}var Np=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Pp=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,Fp=[new U(1,0,0),new U(-1,0,0),new U(0,1,0),new U(0,-1,0),new U(0,0,1),new U(0,0,-1)],Ip=[new U(0,-1,0),new U(0,-1,0),new U(0,0,1),new U(0,0,-1),new U(0,-1,0),new U(0,-1,0)],Lp=new K,Rp=new U,zp=new U;function Bp(e,t,n){let r=new Tc,i=new H,a=new H,o=new Ra,s=new gl,c=new _l,l={},u=n.maxTextureSize,d={0:1,1:0,2:2},f=new pl({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new H},radius:{value:4}},vertexShader:Np,fragmentShader:Pp}),p=f.clone();p.defines.HORIZONTAL_PASS=1;let m=new bs;m.setAttribute(`position`,new as(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let h=new J(m,f),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let _=this.type;this.render=function(t,n,s){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||t.length===0)return;this.type===2&&(z(`WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead.`),this.type=1);let c=e.getRenderTarget(),l=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),f=e.state;f.setBlending(0),f.buffers.depth.getReversed()===!0?f.buffers.color.setClear(0,0,0,0):f.buffers.color.setClear(1,1,1,1),f.buffers.depth.setTest(!0),f.setScissorTest(!1);let p=_!==this.type;p&&n.traverse(function(e){e.material&&(Array.isArray(e.material)?e.material.forEach(e=>e.needsUpdate=!0):e.material.needsUpdate=!0)});for(let c=0,l=t.length;c<l;c++){let l=t[c],d=l.shadow;if(d===void 0){z(`WebGLShadowMap:`,l,`has no shadow.`);continue}if(d.autoUpdate===!1&&d.needsUpdate===!1)continue;i.copy(d.mapSize);let m=d.getFrameExtents();i.multiply(m),a.copy(d.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(a.x=Math.floor(u/m.x),i.x=a.x*m.x,d.mapSize.x=a.x),i.y>u&&(a.y=Math.floor(u/m.y),i.y=a.y*m.y,d.mapSize.y=a.y));let h=e.state.buffers.depth.getReversed();if(d.camera._reversedDepth=h,d.map===null||p===!0){if(d.map!==null&&(d.map.depthTexture!==null&&(d.map.depthTexture.dispose(),d.map.depthTexture=null),d.map.dispose()),this.type===3){if(l.isPointLight){z(`WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.`);continue}d.map=new Ba(i.x,i.y,{format:Lr,type:wr,minFilter:mr,magFilter:mr,generateMipmaps:!1}),d.map.texture.name=l.name+`.shadowMap`,d.map.depthTexture=new Yc(i.x,i.y,Cr),d.map.depthTexture.name=l.name+`.shadowMapDepth`,d.map.depthTexture.format=Nr,d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=dr,d.map.depthTexture.magFilter=dr}else l.isPointLight?(d.map=new gd(i.x),d.map.depthTexture=new Xc(i.x,Sr)):(d.map=new Ba(i.x,i.y),d.map.depthTexture=new Yc(i.x,i.y,Sr)),d.map.depthTexture.name=l.name+`.shadowMap`,d.map.depthTexture.format=Nr,this.type===1?(d.map.depthTexture.compareFunction=h?518:515,d.map.depthTexture.minFilter=mr,d.map.depthTexture.magFilter=mr):(d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=dr,d.map.depthTexture.magFilter=dr);d.camera.updateProjectionMatrix()}let g=d.map.isWebGLCubeRenderTarget?6:1;for(let t=0;t<g;t++){if(d.map.isWebGLCubeRenderTarget)e.setRenderTarget(d.map,t),e.clear();else{t===0&&(e.setRenderTarget(d.map),e.clear());let n=d.getViewport(t);o.set(a.x*n.x,a.y*n.y,a.x*n.z,a.y*n.w),f.viewport(o)}if(l.isPointLight){let e=d.camera,n=d.matrix,r=l.distance||e.far;r!==e.far&&(e.far=r,e.updateProjectionMatrix()),Rp.setFromMatrixPosition(l.matrixWorld),e.position.copy(Rp),zp.copy(e.position),zp.add(Fp[t]),e.up.copy(Ip[t]),e.lookAt(zp),e.updateMatrixWorld(),n.makeTranslation(-Rp.x,-Rp.y,-Rp.z),Lp.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),d._frustum.setFromProjectionMatrix(Lp,e.coordinateSystem,e.reversedDepth)}else d.updateMatrices(l);r=d.getFrustum(),b(n,s,d.camera,l,this.type)}d.isPointLightShadow!==!0&&this.type===3&&v(d,s),d.needsUpdate=!1}_=this.type,g.needsUpdate=!1,e.setRenderTarget(c,l,d)};function v(n,r){let a=t.update(h);f.defines.VSM_SAMPLES!==n.blurSamples&&(f.defines.VSM_SAMPLES=n.blurSamples,p.defines.VSM_SAMPLES=n.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),n.mapPass===null&&(n.mapPass=new Ba(i.x,i.y,{format:Lr,type:wr})),f.uniforms.shadow_pass.value=n.map.depthTexture,f.uniforms.resolution.value=n.mapSize,f.uniforms.radius.value=n.radius,e.setRenderTarget(n.mapPass),e.clear(),e.renderBufferDirect(r,null,a,f,h,null),p.uniforms.shadow_pass.value=n.mapPass.texture,p.uniforms.resolution.value=n.mapSize,p.uniforms.radius.value=n.radius,e.setRenderTarget(n.map),e.clear(),e.renderBufferDirect(r,null,a,p,h,null)}function y(t,n,r,i){let a=null,o=r.isPointLight===!0?t.customDistanceMaterial:t.customDepthMaterial;if(o!==void 0)a=o;else if(a=r.isPointLight===!0?c:s,e.localClippingEnabled&&n.clipShadows===!0&&Array.isArray(n.clippingPlanes)&&n.clippingPlanes.length!==0||n.displacementMap&&n.displacementScale!==0||n.alphaMap&&n.alphaTest>0||n.map&&n.alphaTest>0||n.alphaToCoverage===!0){let e=a.uuid,t=n.uuid,r=l[e];r===void 0&&(r={},l[e]=r);let i=r[t];i===void 0&&(i=a.clone(),r[t]=i,n.addEventListener(`dispose`,x)),a=i}if(a.visible=n.visible,a.wireframe=n.wireframe,i===3?a.side=n.shadowSide===null?n.side:n.shadowSide:a.side=n.shadowSide===null?d[n.side]:n.shadowSide,a.alphaMap=n.alphaMap,a.alphaTest=n.alphaToCoverage===!0?.5:n.alphaTest,a.map=n.map,a.clipShadows=n.clipShadows,a.clippingPlanes=n.clippingPlanes,a.clipIntersection=n.clipIntersection,a.displacementMap=n.displacementMap,a.displacementScale=n.displacementScale,a.displacementBias=n.displacementBias,a.wireframeLinewidth=n.wireframeLinewidth,a.linewidth=n.linewidth,r.isPointLight===!0&&a.isMeshDistanceMaterial===!0){let t=e.properties.get(a);t.light=r}return a}function b(n,i,a,o,s){if(n.visible===!1)return;if(n.layers.test(i.layers)&&(n.isMesh||n.isLine||n.isPoints)&&(n.castShadow||n.receiveShadow&&s===3)&&(!n.frustumCulled||r.intersectsObject(n))){n.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse,n.matrixWorld);let r=t.update(n),c=n.material;if(Array.isArray(c)){let t=r.groups;for(let l=0,u=t.length;l<u;l++){let u=t[l],d=c[u.materialIndex];if(d&&d.visible){let t=y(n,d,o,s);n.onBeforeShadow(e,n,i,a,r,t,u),e.renderBufferDirect(a,null,r,t,n,u),n.onAfterShadow(e,n,i,a,r,t,u)}}}else if(c.visible){let t=y(n,c,o,s);n.onBeforeShadow(e,n,i,a,r,t,null),e.renderBufferDirect(a,null,r,t,n,null),n.onAfterShadow(e,n,i,a,r,t,null)}}let c=n.children;for(let e=0,t=c.length;e<t;e++)b(c[e],i,a,o,s)}function x(e){e.target.removeEventListener(`dispose`,x);for(let t in l){let n=l[t],r=e.target.uuid;r in n&&(n[r].dispose(),delete n[r])}}}function Vp(e,t){function n(){let t=!1,n=new Ra,r=null,i=new Ra(0,0,0,0);return{setMask:function(n){r!==n&&!t&&(e.colorMask(n,n,n,n),r=n)},setLocked:function(e){t=e},setClear:function(t,r,a,o,s){s===!0&&(t*=o,r*=o,a*=o),n.set(t,r,a,o),i.equals(n)===!1&&(e.clearColor(t,r,a,o),i.copy(n))},reset:function(){t=!1,r=null,i.set(-1,0,0,0)}}}function r(){let n=!1,r=!1,i=null,a=null,o=null;return{setReversed:function(e){if(r!==e){let n=t.get(`EXT_clip_control`);e?n.clipControlEXT(n.LOWER_LEFT_EXT,n.ZERO_TO_ONE_EXT):n.clipControlEXT(n.LOWER_LEFT_EXT,n.NEGATIVE_ONE_TO_ONE_EXT),r=e;let i=o;o=null,this.setClear(i)}},getReversed:function(){return r},setTest:function(t){t?fe(e.DEPTH_TEST):pe(e.DEPTH_TEST)},setMask:function(t){i!==t&&!n&&(e.depthMask(t),i=t)},setFunc:function(t){if(r&&(t=qi[t]),a!==t){switch(t){case 0:e.depthFunc(e.NEVER);break;case 1:e.depthFunc(e.ALWAYS);break;case 2:e.depthFunc(e.LESS);break;case 3:e.depthFunc(e.LEQUAL);break;case 4:e.depthFunc(e.EQUAL);break;case 5:e.depthFunc(e.GEQUAL);break;case 6:e.depthFunc(e.GREATER);break;case 7:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}a=t}},setLocked:function(e){n=e},setClear:function(t){o!==t&&(o=t,r&&(t=1-t),e.clearDepth(t))},reset:function(){n=!1,i=null,a=null,o=null,r=!1}}}function i(){let t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null;return{setTest:function(n){t||(n?fe(e.STENCIL_TEST):pe(e.STENCIL_TEST))},setMask:function(r){n!==r&&!t&&(e.stencilMask(r),n=r)},setFunc:function(t,n,o){(r!==t||i!==n||a!==o)&&(e.stencilFunc(t,n,o),r=t,i=n,a=o)},setOp:function(t,n,r){(o!==t||s!==n||c!==r)&&(e.stencilOp(t,n,r),o=t,s=n,c=r)},setLocked:function(e){t=e},setClear:function(t){l!==t&&(e.clearStencil(t),l=t)},reset:function(){t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null}}}let a=new n,o=new r,s=new i,c=new WeakMap,l=new WeakMap,u={},d={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new q(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,ee=null,te=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),j=!1,ne=0,re=e.getParameter(e.VERSION);re.indexOf(`WebGL`)===-1?re.indexOf(`OpenGL ES`)!==-1&&(ne=parseFloat(/^OpenGL ES (\d)/.exec(re)[1]),j=ne>=2):(ne=parseFloat(/^WebGL (\d)/.exec(re)[1]),j=ne>=1);let ie=null,ae={},oe=e.getParameter(e.SCISSOR_BOX),se=e.getParameter(e.VIEWPORT),ce=new Ra().fromArray(oe),le=new Ra().fromArray(se);function ue(t,n,r,i){let a=new Uint8Array(4),o=e.createTexture();e.bindTexture(t,o),e.texParameteri(t,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(t,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let o=0;o<r;o++)t===e.TEXTURE_3D||t===e.TEXTURE_2D_ARRAY?e.texImage3D(n,0,e.RGBA,1,1,i,0,e.RGBA,e.UNSIGNED_BYTE,a):e.texImage2D(n+o,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,a);return o}let de={};de[e.TEXTURE_2D]=ue(e.TEXTURE_2D,e.TEXTURE_2D,1),de[e.TEXTURE_CUBE_MAP]=ue(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),de[e.TEXTURE_2D_ARRAY]=ue(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),de[e.TEXTURE_3D]=ue(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),o.setClear(1),s.setClear(0),fe(e.DEPTH_TEST),o.setFunc(3),xe(!1),Se(1),fe(e.CULL_FACE),ye(0);function fe(t){u[t]!==!0&&(e.enable(t),u[t]=!0)}function pe(t){u[t]!==!1&&(e.disable(t),u[t]=!1)}function me(t,n){return f[t]!==n&&(e.bindFramebuffer(t,n),f[t]=n,t===e.DRAW_FRAMEBUFFER&&(f[e.FRAMEBUFFER]=n),t===e.FRAMEBUFFER&&(f[e.DRAW_FRAMEBUFFER]=n),!0)}function he(t,n){let r=m,i=!1;if(t){r=p.get(n),r===void 0&&(r=[],p.set(n,r));let a=t.textures;if(r.length!==a.length||r[0]!==e.COLOR_ATTACHMENT0){for(let t=0,n=a.length;t<n;t++)r[t]=e.COLOR_ATTACHMENT0+t;r.length=a.length,i=!0}}else r[0]!==e.BACK&&(r[0]=e.BACK,i=!0);i&&e.drawBuffers(r)}function ge(t){return h!==t&&(e.useProgram(t),h=t,!0)}let _e={100:e.FUNC_ADD,101:e.FUNC_SUBTRACT,102:e.FUNC_REVERSE_SUBTRACT};_e[103]=e.MIN,_e[104]=e.MAX;let ve={200:e.ZERO,201:e.ONE,202:e.SRC_COLOR,204:e.SRC_ALPHA,210:e.SRC_ALPHA_SATURATE,208:e.DST_COLOR,206:e.DST_ALPHA,203:e.ONE_MINUS_SRC_COLOR,205:e.ONE_MINUS_SRC_ALPHA,209:e.ONE_MINUS_DST_COLOR,207:e.ONE_MINUS_DST_ALPHA,211:e.CONSTANT_COLOR,212:e.ONE_MINUS_CONSTANT_COLOR,213:e.CONSTANT_ALPHA,214:e.ONE_MINUS_CONSTANT_ALPHA};function ye(t,n,r,i,a,o,s,c,l,u){if(t===0){g===!0&&(pe(e.BLEND),g=!1);return}if(g===!1&&(fe(e.BLEND),g=!0),t!==5){if(t!==_||u!==E){if((v!==100||x!==100)&&(e.blendEquation(e.FUNC_ADD),v=100,x=100),u)switch(t){case 1:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.ONE,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:B(`WebGLState: Invalid blending: `,t)}else switch(t){case 1:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case 3:B(`WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true`);break;case 4:B(`WebGLState: MultiplyBlending requires material.premultipliedAlpha = true`);break;default:B(`WebGLState: Invalid blending: `,t)}y=null,b=null,S=null,C=null,w.set(0,0,0),T=0,_=t,E=u}return}a||=n,o||=r,s||=i,(n!==v||a!==x)&&(e.blendEquationSeparate(_e[n],_e[a]),v=n,x=a),(r!==y||i!==b||o!==S||s!==C)&&(e.blendFuncSeparate(ve[r],ve[i],ve[o],ve[s]),y=r,b=i,S=o,C=s),(c.equals(w)===!1||l!==T)&&(e.blendColor(c.r,c.g,c.b,l),w.copy(c),T=l),_=t,E=!1}function be(t,n){t.side===2?pe(e.CULL_FACE):fe(e.CULL_FACE);let r=t.side===1;n&&(r=!r),xe(r),t.blending===1&&t.transparent===!1?ye(0):ye(t.blending,t.blendEquation,t.blendSrc,t.blendDst,t.blendEquationAlpha,t.blendSrcAlpha,t.blendDstAlpha,t.blendColor,t.blendAlpha,t.premultipliedAlpha),o.setFunc(t.depthFunc),o.setTest(t.depthTest),o.setMask(t.depthWrite),a.setMask(t.colorWrite);let i=t.stencilWrite;s.setTest(i),i&&(s.setMask(t.stencilWriteMask),s.setFunc(t.stencilFunc,t.stencilRef,t.stencilFuncMask),s.setOp(t.stencilFail,t.stencilZFail,t.stencilZPass)),we(t.polygonOffset,t.polygonOffsetFactor,t.polygonOffsetUnits),t.alphaToCoverage===!0?fe(e.SAMPLE_ALPHA_TO_COVERAGE):pe(e.SAMPLE_ALPHA_TO_COVERAGE)}function xe(t){D!==t&&(t?e.frontFace(e.CW):e.frontFace(e.CCW),D=t)}function Se(t){t===0?pe(e.CULL_FACE):(fe(e.CULL_FACE),t!==O&&(t===1?e.cullFace(e.BACK):t===2?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))),O=t}function Ce(t){t!==k&&(j&&e.lineWidth(t),k=t)}function we(t,n,r){t?(fe(e.POLYGON_OFFSET_FILL),(A!==n||ee!==r)&&(A=n,ee=r,o.getReversed()&&(n=-n),e.polygonOffset(n,r))):pe(e.POLYGON_OFFSET_FILL)}function Te(t){t?fe(e.SCISSOR_TEST):pe(e.SCISSOR_TEST)}function M(t){t===void 0&&(t=e.TEXTURE0+te-1),ie!==t&&(e.activeTexture(t),ie=t)}function Ee(t,n,r){r===void 0&&(r=ie===null?e.TEXTURE0+te-1:ie);let i=ae[r];i===void 0&&(i={type:void 0,texture:void 0},ae[r]=i),(i.type!==t||i.texture!==n)&&(ie!==r&&(e.activeTexture(r),ie=r),e.bindTexture(t,n||de[t]),i.type=t,i.texture=n)}function De(){let t=ae[ie];t!==void 0&&t.type!==void 0&&(e.bindTexture(t.type,null),t.type=void 0,t.texture=void 0)}function Oe(){try{e.compressedTexImage2D(...arguments)}catch(e){B(`WebGLState:`,e)}}function N(){try{e.compressedTexImage3D(...arguments)}catch(e){B(`WebGLState:`,e)}}function ke(){try{e.texSubImage2D(...arguments)}catch(e){B(`WebGLState:`,e)}}function P(){try{e.texSubImage3D(...arguments)}catch(e){B(`WebGLState:`,e)}}function F(){try{e.compressedTexSubImage2D(...arguments)}catch(e){B(`WebGLState:`,e)}}function Ae(){try{e.compressedTexSubImage3D(...arguments)}catch(e){B(`WebGLState:`,e)}}function je(){try{e.texStorage2D(...arguments)}catch(e){B(`WebGLState:`,e)}}function Me(){try{e.texStorage3D(...arguments)}catch(e){B(`WebGLState:`,e)}}function Ne(){try{e.texImage2D(...arguments)}catch(e){B(`WebGLState:`,e)}}function Pe(){try{e.texImage3D(...arguments)}catch(e){B(`WebGLState:`,e)}}function Fe(t){return d[t]===void 0?e.getParameter(t):d[t]}function Ie(t,n){d[t]!==n&&(e.pixelStorei(t,n),d[t]=n)}function Le(t){ce.equals(t)===!1&&(e.scissor(t.x,t.y,t.z,t.w),ce.copy(t))}function Re(t){le.equals(t)===!1&&(e.viewport(t.x,t.y,t.z,t.w),le.copy(t))}function ze(t,n){let r=l.get(n);r===void 0&&(r=new WeakMap,l.set(n,r));let i=r.get(t);i===void 0&&(i=e.getUniformBlockIndex(n,t.name),r.set(t,i))}function Be(t,n){let r=l.get(n).get(t);c.get(n)!==r&&(e.uniformBlockBinding(n,r,t.__bindingPointIndex),c.set(n,r))}function Ve(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),o.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),u={},d={},ie=null,ae={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new q(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,ee=null,ce.set(0,0,e.canvas.width,e.canvas.height),le.set(0,0,e.canvas.width,e.canvas.height),a.reset(),o.reset(),s.reset()}return{buffers:{color:a,depth:o,stencil:s},enable:fe,disable:pe,bindFramebuffer:me,drawBuffers:he,useProgram:ge,setBlending:ye,setMaterial:be,setFlipSided:xe,setCullFace:Se,setLineWidth:Ce,setPolygonOffset:we,setScissorTest:Te,activeTexture:M,bindTexture:Ee,unbindTexture:De,compressedTexImage2D:Oe,compressedTexImage3D:N,texImage2D:Ne,texImage3D:Pe,pixelStorei:Ie,getParameter:Fe,updateUBOMapping:ze,uniformBlockBinding:Be,texStorage2D:je,texStorage3D:Me,texSubImage2D:ke,texSubImage3D:P,compressedTexSubImage2D:F,compressedTexSubImage3D:Ae,scissor:Le,viewport:Re,reset:Ve}}function Hp(e,t,n,r,i,a,o){let s=t.has(`WEBGL_multisampled_render_to_texture`)?t.get(`WEBGL_multisampled_render_to_texture`):null,c=typeof navigator>`u`?!1:/OculusBrowser/g.test(navigator.userAgent),l=new H,u=new WeakMap,d=new Set,f,p=new WeakMap,m=!1;try{m=typeof OffscreenCanvas<`u`&&new OffscreenCanvas(1,1).getContext(`2d`)!==null}catch{}function h(e,t){return m?new OffscreenCanvas(e,t):Bi(`canvas`)}function g(e,t,n){let r=1,i=Oe(e);if((i.width>n||i.height>n)&&(r=n/Math.max(i.width,i.height)),r<1){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap||typeof VideoFrame<`u`&&e instanceof VideoFrame){let n=Math.floor(r*i.width),a=Math.floor(r*i.height);f===void 0&&(f=h(n,a));let o=t?h(n,a):f;return o.width=n,o.height=a,o.getContext(`2d`).drawImage(e,0,0,n,a),z(`WebGLRenderer: Texture has been resized from (`+i.width+`x`+i.height+`) to (`+n+`x`+a+`).`),o}return`data`in e&&z(`WebGLRenderer: Image in DataTexture is too big (`+i.width+`x`+i.height+`).`),e}return e}function _(e){return e.generateMipmaps}function v(t){e.generateMipmap(t)}function y(t){return t.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:t.isWebGL3DRenderTarget?e.TEXTURE_3D:t.isWebGLArrayRenderTarget||t.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function b(n,r,i,a,o,s=!1){if(n!==null){if(e[n]!==void 0)return e[n];z(`WebGLRenderer: Attempt to use non-existing WebGL internal format '`+n+`'`)}let c;a&&(c=t.get(`EXT_texture_norm16`),c||z(`WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension`));let l=r;if(r===e.RED&&(i===e.FLOAT&&(l=e.R32F),i===e.HALF_FLOAT&&(l=e.R16F),i===e.UNSIGNED_BYTE&&(l=e.R8),i===e.UNSIGNED_SHORT&&c&&(l=c.R16_EXT),i===e.SHORT&&c&&(l=c.R16_SNORM_EXT)),r===e.RED_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.R8UI),i===e.UNSIGNED_SHORT&&(l=e.R16UI),i===e.UNSIGNED_INT&&(l=e.R32UI),i===e.BYTE&&(l=e.R8I),i===e.SHORT&&(l=e.R16I),i===e.INT&&(l=e.R32I)),r===e.RG&&(i===e.FLOAT&&(l=e.RG32F),i===e.HALF_FLOAT&&(l=e.RG16F),i===e.UNSIGNED_BYTE&&(l=e.RG8),i===e.UNSIGNED_SHORT&&c&&(l=c.RG16_EXT),i===e.SHORT&&c&&(l=c.RG16_SNORM_EXT)),r===e.RG_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RG8UI),i===e.UNSIGNED_SHORT&&(l=e.RG16UI),i===e.UNSIGNED_INT&&(l=e.RG32UI),i===e.BYTE&&(l=e.RG8I),i===e.SHORT&&(l=e.RG16I),i===e.INT&&(l=e.RG32I)),r===e.RGB_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGB8UI),i===e.UNSIGNED_SHORT&&(l=e.RGB16UI),i===e.UNSIGNED_INT&&(l=e.RGB32UI),i===e.BYTE&&(l=e.RGB8I),i===e.SHORT&&(l=e.RGB16I),i===e.INT&&(l=e.RGB32I)),r===e.RGBA_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGBA8UI),i===e.UNSIGNED_SHORT&&(l=e.RGBA16UI),i===e.UNSIGNED_INT&&(l=e.RGBA32UI),i===e.BYTE&&(l=e.RGBA8I),i===e.SHORT&&(l=e.RGBA16I),i===e.INT&&(l=e.RGBA32I)),r===e.RGB&&(i===e.UNSIGNED_SHORT&&c&&(l=c.RGB16_EXT),i===e.SHORT&&c&&(l=c.RGB16_SNORM_EXT),i===e.UNSIGNED_INT_5_9_9_9_REV&&(l=e.RGB9_E5),i===e.UNSIGNED_INT_10F_11F_11F_REV&&(l=e.R11F_G11F_B10F)),r===e.RGBA){let t=s?Ni:G.getTransfer(o);i===e.FLOAT&&(l=e.RGBA32F),i===e.HALF_FLOAT&&(l=e.RGBA16F),i===e.UNSIGNED_BYTE&&(l=t===`srgb`?e.SRGB8_ALPHA8:e.RGBA8),i===e.UNSIGNED_SHORT&&c&&(l=c.RGBA16_EXT),i===e.SHORT&&c&&(l=c.RGBA16_SNORM_EXT),i===e.UNSIGNED_SHORT_4_4_4_4&&(l=e.RGBA4),i===e.UNSIGNED_SHORT_5_5_5_1&&(l=e.RGB5_A1)}return(l===e.R16F||l===e.R32F||l===e.RG16F||l===e.RG32F||l===e.RGBA16F||l===e.RGBA32F)&&t.get(`EXT_color_buffer_float`),l}function x(t,n){let r;return t?n===null||n===1014||n===1020?r=e.DEPTH24_STENCIL8:n===1015?r=e.DEPTH32F_STENCIL8:n===1012&&(r=e.DEPTH24_STENCIL8,z(`DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.`)):n===null||n===1014||n===1020?r=e.DEPTH_COMPONENT24:n===1015?r=e.DEPTH_COMPONENT32F:n===1012&&(r=e.DEPTH_COMPONENT16),r}function S(e,t){return _(e)===!0||e.isFramebufferTexture&&e.minFilter!==1003&&e.minFilter!==1006?Math.log2(Math.max(t.width,t.height))+1:e.mipmaps!==void 0&&e.mipmaps.length>0?e.mipmaps.length:e.isCompressedTexture&&Array.isArray(e.image)?t.mipmaps.length:1}function C(e){let t=e.target;t.removeEventListener(`dispose`,C),T(t),t.isVideoTexture&&u.delete(t),t.isHTMLTexture&&d.delete(t)}function w(e){let t=e.target;t.removeEventListener(`dispose`,w),D(t)}function T(e){let t=r.get(e);if(t.__webglInit===void 0)return;let n=e.source,i=p.get(n);if(i){let r=i[t.__cacheKey];r.usedTimes--,r.usedTimes===0&&E(e),Object.keys(i).length===0&&p.delete(n)}r.remove(e)}function E(t){let n=r.get(t);e.deleteTexture(n.__webglTexture);let i=t.source,a=p.get(i);delete a[n.__cacheKey],o.memory.textures--}function D(t){let n=r.get(t);if(t.depthTexture&&(t.depthTexture.dispose(),r.remove(t.depthTexture)),t.isWebGLCubeRenderTarget)for(let t=0;t<6;t++){if(Array.isArray(n.__webglFramebuffer[t]))for(let r=0;r<n.__webglFramebuffer[t].length;r++)e.deleteFramebuffer(n.__webglFramebuffer[t][r]);else e.deleteFramebuffer(n.__webglFramebuffer[t]);n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer[t])}else{if(Array.isArray(n.__webglFramebuffer))for(let t=0;t<n.__webglFramebuffer.length;t++)e.deleteFramebuffer(n.__webglFramebuffer[t]);else e.deleteFramebuffer(n.__webglFramebuffer);if(n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer),n.__webglMultisampledFramebuffer&&e.deleteFramebuffer(n.__webglMultisampledFramebuffer),n.__webglColorRenderbuffer)for(let t=0;t<n.__webglColorRenderbuffer.length;t++)n.__webglColorRenderbuffer[t]&&e.deleteRenderbuffer(n.__webglColorRenderbuffer[t]);n.__webglDepthRenderbuffer&&e.deleteRenderbuffer(n.__webglDepthRenderbuffer)}let i=t.textures;for(let t=0,n=i.length;t<n;t++){let n=r.get(i[t]);n.__webglTexture&&(e.deleteTexture(n.__webglTexture),o.memory.textures--),r.remove(i[t])}r.remove(t)}let O=0;function k(){O=0}function A(){return O}function ee(e){O=e}function te(){let e=O;return e>=i.maxTextures&&z(`WebGLTextures: Trying to use `+e+` texture units while this GPU supports only `+i.maxTextures),O+=1,e}function j(e){let t=[];return t.push(e.wrapS),t.push(e.wrapT),t.push(e.wrapR||0),t.push(e.magFilter),t.push(e.minFilter),t.push(e.anisotropy),t.push(e.internalFormat),t.push(e.format),t.push(e.type),t.push(e.generateMipmaps),t.push(e.premultiplyAlpha),t.push(e.flipY),t.push(e.unpackAlignment),t.push(e.colorSpace),t.join()}function ne(t,i){let a=r.get(t);if(t.isVideoTexture&&Ee(t),t.isRenderTargetTexture===!1&&t.isExternalTexture!==!0&&t.version>0&&a.__version!==t.version){let e=t.image;if(e===null)z(`WebGLRenderer: Texture marked for update but no image data found.`);else if(e.complete===!1)z(`WebGLRenderer: Texture marked for update but image is incomplete`);else{pe(a,t,i);return}}else t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null);n.bindTexture(e.TEXTURE_2D,a.__webglTexture,e.TEXTURE0+i)}function re(t,i){let a=r.get(t);if(t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version){pe(a,t,i);return}t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null),n.bindTexture(e.TEXTURE_2D_ARRAY,a.__webglTexture,e.TEXTURE0+i)}function ie(t,i){let a=r.get(t);if(t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version){pe(a,t,i);return}n.bindTexture(e.TEXTURE_3D,a.__webglTexture,e.TEXTURE0+i)}function ae(t,i){let a=r.get(t);if(t.isCubeDepthTexture!==!0&&t.version>0&&a.__version!==t.version){me(a,t,i);return}n.bindTexture(e.TEXTURE_CUBE_MAP,a.__webglTexture,e.TEXTURE0+i)}let oe={[cr]:e.REPEAT,[lr]:e.CLAMP_TO_EDGE,[ur]:e.MIRRORED_REPEAT},se={[dr]:e.NEAREST,[fr]:e.NEAREST_MIPMAP_NEAREST,[pr]:e.NEAREST_MIPMAP_LINEAR,[mr]:e.LINEAR,[hr]:e.LINEAR_MIPMAP_NEAREST,[gr]:e.LINEAR_MIPMAP_LINEAR},ce={512:e.NEVER,519:e.ALWAYS,513:e.LESS,515:e.LEQUAL,514:e.EQUAL,518:e.GEQUAL,516:e.GREATER,517:e.NOTEQUAL};function le(n,a){if(a.type===1015&&t.has(`OES_texture_float_linear`)===!1&&(a.magFilter===1006||a.magFilter===1007||a.magFilter===1005||a.magFilter===1008||a.minFilter===1006||a.minFilter===1007||a.minFilter===1005||a.minFilter===1008)&&z(`WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.`),e.texParameteri(n,e.TEXTURE_WRAP_S,oe[a.wrapS]),e.texParameteri(n,e.TEXTURE_WRAP_T,oe[a.wrapT]),(n===e.TEXTURE_3D||n===e.TEXTURE_2D_ARRAY)&&e.texParameteri(n,e.TEXTURE_WRAP_R,oe[a.wrapR]),e.texParameteri(n,e.TEXTURE_MAG_FILTER,se[a.magFilter]),e.texParameteri(n,e.TEXTURE_MIN_FILTER,se[a.minFilter]),a.compareFunction&&(e.texParameteri(n,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(n,e.TEXTURE_COMPARE_FUNC,ce[a.compareFunction])),t.has(`EXT_texture_filter_anisotropic`)===!0){if(a.magFilter===1003||a.minFilter!==1005&&a.minFilter!==1008||a.type===1015&&t.has(`OES_texture_float_linear`)===!1)return;if(a.anisotropy>1||r.get(a).__currentAnisotropy){let o=t.get(`EXT_texture_filter_anisotropic`);e.texParameterf(n,o.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(a.anisotropy,i.getMaxAnisotropy())),r.get(a).__currentAnisotropy=a.anisotropy}}}function ue(t,n){let r=!1;t.__webglInit===void 0&&(t.__webglInit=!0,n.addEventListener(`dispose`,C));let i=n.source,a=p.get(i);a===void 0&&(a={},p.set(i,a));let s=j(n);if(s!==t.__cacheKey){a[s]===void 0&&(a[s]={texture:e.createTexture(),usedTimes:0},o.memory.textures++,r=!0),a[s].usedTimes++;let i=a[t.__cacheKey];i!==void 0&&(a[t.__cacheKey].usedTimes--,i.usedTimes===0&&E(n)),t.__cacheKey=s,t.__webglTexture=a[s].texture}return r}function de(e,t,n){return Math.floor(Math.floor(e/n)/t)}function fe(t,r,i,a){let o=t.updateRanges;if(o.length===0)n.texSubImage2D(e.TEXTURE_2D,0,0,0,r.width,r.height,i,a,r.data);else{o.sort((e,t)=>e.start-t.start);let s=0;for(let e=1;e<o.length;e++){let t=o[s],n=o[e],i=t.start+t.count,a=de(n.start,r.width,4),c=de(t.start,r.width,4);n.start<=i+1&&a===c&&de(n.start+n.count-1,r.width,4)===a?t.count=Math.max(t.count,n.start+n.count-t.start):(++s,o[s]=n)}o.length=s+1;let c=n.getParameter(e.UNPACK_ROW_LENGTH),l=n.getParameter(e.UNPACK_SKIP_PIXELS),u=n.getParameter(e.UNPACK_SKIP_ROWS);n.pixelStorei(e.UNPACK_ROW_LENGTH,r.width);for(let t=0,s=o.length;t<s;t++){let s=o[t],c=Math.floor(s.start/4),l=Math.ceil(s.count/4),u=c%r.width,d=Math.floor(c/r.width),f=l;n.pixelStorei(e.UNPACK_SKIP_PIXELS,u),n.pixelStorei(e.UNPACK_SKIP_ROWS,d),n.texSubImage2D(e.TEXTURE_2D,0,u,d,f,1,i,a,r.data)}t.clearUpdateRanges(),n.pixelStorei(e.UNPACK_ROW_LENGTH,c),n.pixelStorei(e.UNPACK_SKIP_PIXELS,l),n.pixelStorei(e.UNPACK_SKIP_ROWS,u)}}function pe(t,o,s){let c=e.TEXTURE_2D;(o.isDataArrayTexture||o.isCompressedArrayTexture)&&(c=e.TEXTURE_2D_ARRAY),o.isData3DTexture&&(c=e.TEXTURE_3D);let l=ue(t,o),u=o.source;n.bindTexture(c,t.__webglTexture,e.TEXTURE0+s);let f=r.get(u);if(u.version!==f.__version||l===!0){if(n.activeTexture(e.TEXTURE0+s),!(typeof ImageBitmap<`u`&&o.image instanceof ImageBitmap)){let t=G.getPrimaries(G.workingColorSpace),r=o.colorSpace===``?null:G.getPrimaries(o.colorSpace),i=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,i)}n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment);let t=g(o.image,!1,i.maxTextureSize);t=De(o,t);let r=a.convert(o.format,o.colorSpace),p=a.convert(o.type),m=b(o.internalFormat,r,p,o.normalized,o.colorSpace,o.isVideoTexture);le(c,o);let h,y=o.mipmaps,C=o.isVideoTexture!==!0,w=f.__version===void 0||l===!0,T=u.dataReady,E=S(o,t);if(o.isDepthTexture)m=x(o.format===Pr,o.type),w&&(C?n.texStorage2D(e.TEXTURE_2D,1,m,t.width,t.height):n.texImage2D(e.TEXTURE_2D,0,m,t.width,t.height,0,r,p,null));else if(o.isDataTexture){if(y.length>0){C&&w&&n.texStorage2D(e.TEXTURE_2D,E,m,y[0].width,y[0].height);for(let t=0,i=y.length;t<i;t++)h=y[t],C?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,p,h.data):n.texImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,r,p,h.data);o.generateMipmaps=!1}else C?(w&&n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height),T&&fe(o,t,r,p)):n.texImage2D(e.TEXTURE_2D,0,m,t.width,t.height,0,r,p,t.data)}else if(o.isCompressedTexture){if(o.isCompressedArrayTexture){C&&w&&n.texStorage3D(e.TEXTURE_2D_ARRAY,E,m,y[0].width,y[0].height,t.depth);for(let i=0,a=y.length;i<a;i++)if(h=y[i],o.format!==1023){if(r!==null){if(C){if(T){if(o.layerUpdates.size>0){let t=Lu(h.width,h.height,o.format,o.type);for(let a of o.layerUpdates){let o=h.data.subarray(a*t/h.data.BYTES_PER_ELEMENT,(a+1)*t/h.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,a,h.width,h.height,1,r,o)}o.clearLayerUpdates()}else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,h.width,h.height,t.depth,r,h.data)}}else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,i,m,h.width,h.height,t.depth,0,h.data,0,0)}else z(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`)}else C?T&&n.texSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,h.width,h.height,t.depth,r,p,h.data):n.texImage3D(e.TEXTURE_2D_ARRAY,i,m,h.width,h.height,t.depth,0,r,p,h.data)}else{C&&w&&n.texStorage2D(e.TEXTURE_2D,E,m,y[0].width,y[0].height);for(let t=0,i=y.length;t<i;t++)h=y[t],o.format===1023?C?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,p,h.data):n.texImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,r,p,h.data):r===null?z(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`):C?T&&n.compressedTexSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,h.data):n.compressedTexImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,h.data)}}else if(o.isDataArrayTexture){if(C){if(w&&n.texStorage3D(e.TEXTURE_2D_ARRAY,E,m,t.width,t.height,t.depth),T){if(o.layerUpdates.size>0){let i=Lu(t.width,t.height,o.format,o.type);for(let a of o.layerUpdates){let o=t.data.subarray(a*i/t.data.BYTES_PER_ELEMENT,(a+1)*i/t.data.BYTES_PER_ELEMENT);n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,a,t.width,t.height,1,r,p,o)}o.clearLayerUpdates()}else n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,t.width,t.height,t.depth,r,p,t.data)}}else n.texImage3D(e.TEXTURE_2D_ARRAY,0,m,t.width,t.height,t.depth,0,r,p,t.data)}else if(o.isData3DTexture)C?(w&&n.texStorage3D(e.TEXTURE_3D,E,m,t.width,t.height,t.depth),T&&n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,t.width,t.height,t.depth,r,p,t.data)):n.texImage3D(e.TEXTURE_3D,0,m,t.width,t.height,t.depth,0,r,p,t.data);else if(o.isFramebufferTexture){if(w){if(C)n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height);else{let i=t.width,a=t.height;for(let t=0;t<E;t++)n.texImage2D(e.TEXTURE_2D,t,m,i,a,0,r,p,null),i>>=1,a>>=1}}}else if(o.isHTMLTexture){if(`texElementImage2D`in e){let n=e.canvas;if(n.hasAttribute(`layoutsubtree`)||n.setAttribute(`layoutsubtree`,`true`),t.parentNode!==n){n.appendChild(t),d.add(o),n.onpaint=e=>{let t=e.changedElements;for(let e of d)t.includes(e.image)&&(e.needsUpdate=!0)},n.requestPaint();return}if(e.texElementImage2D.length===3)e.texElementImage2D(e.TEXTURE_2D,e.RGBA8,t);else{let n=e.RGBA,r=e.RGBA,i=e.UNSIGNED_BYTE;e.texElementImage2D(e.TEXTURE_2D,0,n,r,i,t)}e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)}}else if(y.length>0){if(C&&w){let t=Oe(y[0]);n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height)}for(let t=0,i=y.length;t<i;t++)h=y[t],C?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,r,p,h):n.texImage2D(e.TEXTURE_2D,t,m,r,p,h);o.generateMipmaps=!1}else if(C){if(w){let r=Oe(t);n.texStorage2D(e.TEXTURE_2D,E,m,r.width,r.height)}T&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,r,p,t)}else n.texImage2D(e.TEXTURE_2D,0,m,r,p,t);_(o)&&v(c),f.__version=u.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function me(t,o,s){if(o.image.length!==6)return;let c=ue(t,o),l=o.source;n.bindTexture(e.TEXTURE_CUBE_MAP,t.__webglTexture,e.TEXTURE0+s);let u=r.get(l);if(l.version!==u.__version||c===!0){n.activeTexture(e.TEXTURE0+s);let t=G.getPrimaries(G.workingColorSpace),r=o.colorSpace===``?null:G.getPrimaries(o.colorSpace),d=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,d);let f=o.isCompressedTexture||o.image[0].isCompressedTexture,p=o.image[0]&&o.image[0].isDataTexture,m=[];for(let e=0;e<6;e++)!f&&!p?m[e]=g(o.image[e],!0,i.maxCubemapSize):m[e]=p?o.image[e].image:o.image[e],m[e]=De(o,m[e]);let h=m[0],y=a.convert(o.format,o.colorSpace),x=a.convert(o.type),C=b(o.internalFormat,y,x,o.normalized,o.colorSpace),w=o.isVideoTexture!==!0,T=u.__version===void 0||c===!0,E=l.dataReady,D=S(o,h);le(e.TEXTURE_CUBE_MAP,o);let O;if(f){w&&T&&n.texStorage2D(e.TEXTURE_CUBE_MAP,D,C,h.width,h.height);for(let t=0;t<6;t++){O=m[t].mipmaps;for(let r=0;r<O.length;r++){let i=O[r];o.format===1023?w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,y,x,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,C,i.width,i.height,0,y,x,i.data):y===null?z(`WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()`):w?E&&n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,y,i.data):n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,C,i.width,i.height,0,i.data)}}}else{if(O=o.mipmaps,w&&T){O.length>0&&D++;let t=Oe(m[0]);n.texStorage2D(e.TEXTURE_CUBE_MAP,D,C,t.width,t.height)}for(let t=0;t<6;t++)if(p){w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,m[t].width,m[t].height,y,x,m[t].data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,C,m[t].width,m[t].height,0,y,x,m[t].data);for(let r=0;r<O.length;r++){let i=O[r].image[t].image;w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,i.width,i.height,y,x,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,C,i.width,i.height,0,y,x,i.data)}}else{w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,y,x,m[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,C,y,x,m[t]);for(let r=0;r<O.length;r++){let i=O[r];w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,y,x,i.image[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,C,y,x,i.image[t])}}}_(o)&&v(e.TEXTURE_CUBE_MAP),u.__version=l.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function he(t,i,o,c,l,u){let d=a.convert(o.format,o.colorSpace),f=a.convert(o.type),p=b(o.internalFormat,d,f,o.normalized,o.colorSpace),m=r.get(i),h=r.get(o);if(h.__renderTarget=i,!m.__hasExternalTextures){let t=Math.max(1,i.width>>u),r=Math.max(1,i.height>>u);l===e.TEXTURE_3D||l===e.TEXTURE_2D_ARRAY?n.texImage3D(l,u,p,t,r,i.depth,0,d,f,null):n.texImage2D(l,u,p,t,r,0,d,f,null)}n.bindFramebuffer(e.FRAMEBUFFER,t),M(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,c,l,h.__webglTexture,0,Te(i)):(l===e.TEXTURE_2D||l>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&l<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,c,l,h.__webglTexture,u),n.bindFramebuffer(e.FRAMEBUFFER,null)}function ge(t,n,r){if(e.bindRenderbuffer(e.RENDERBUFFER,t),n.depthBuffer){let i=n.depthTexture,a=i&&i.isDepthTexture?i.type:null,o=x(n.stencilBuffer,a),c=n.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;M(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Te(n),o,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,Te(n),o,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,o,n.width,n.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,c,e.RENDERBUFFER,t)}else{let t=n.textures;for(let i=0;i<t.length;i++){let o=t[i],c=a.convert(o.format,o.colorSpace),l=a.convert(o.type),u=b(o.internalFormat,c,l,o.normalized,o.colorSpace);M(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Te(n),u,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,Te(n),u,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,u,n.width,n.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function _e(t,i,o){let c=i.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(e.FRAMEBUFFER,t),!(i.depthTexture&&i.depthTexture.isDepthTexture))throw Error(`THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.`);let l=r.get(i.depthTexture);if(l.__renderTarget=i,(!l.__webglTexture||i.depthTexture.image.width!==i.width||i.depthTexture.image.height!==i.height)&&(i.depthTexture.image.width=i.width,i.depthTexture.image.height=i.height,i.depthTexture.needsUpdate=!0),c){if(l.__webglInit===void 0&&(l.__webglInit=!0,i.depthTexture.addEventListener(`dispose`,C)),l.__webglTexture===void 0){l.__webglTexture=e.createTexture(),n.bindTexture(e.TEXTURE_CUBE_MAP,l.__webglTexture),le(e.TEXTURE_CUBE_MAP,i.depthTexture);let t=a.convert(i.depthTexture.format),r=a.convert(i.depthTexture.type),o;i.depthTexture.format===1026?o=e.DEPTH_COMPONENT24:i.depthTexture.format===1027&&(o=e.DEPTH24_STENCIL8);for(let n=0;n<6;n++)e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0,o,i.width,i.height,0,t,r,null)}}else ne(i.depthTexture,0);let u=l.__webglTexture,d=Te(i),f=c?e.TEXTURE_CUBE_MAP_POSITIVE_X+o:e.TEXTURE_2D,p=i.depthTexture.format===1027?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(i.depthTexture.format===1026)M(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else if(i.depthTexture.format===1027)M(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else throw Error(`THREE.WebGLTextures: Unknown depthTexture format.`)}function ve(t){let i=r.get(t),a=t.isWebGLCubeRenderTarget===!0;if(i.__boundDepthTexture!==t.depthTexture){let e=t.depthTexture;if(i.__depthDisposeCallback&&i.__depthDisposeCallback(),e){let t=()=>{delete i.__boundDepthTexture,delete i.__depthDisposeCallback,e.removeEventListener(`dispose`,t)};e.addEventListener(`dispose`,t),i.__depthDisposeCallback=t}i.__boundDepthTexture=e}if(t.depthTexture&&!i.__autoAllocateDepthBuffer){if(a)for(let e=0;e<6;e++)_e(i.__webglFramebuffer[e],t,e);else{let e=t.texture.mipmaps;e&&e.length>0?_e(i.__webglFramebuffer[0],t,0):_e(i.__webglFramebuffer,t,0)}}else if(a){i.__webglDepthbuffer=[];for(let r=0;r<6;r++)if(n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[r]),i.__webglDepthbuffer[r]===void 0)i.__webglDepthbuffer[r]=e.createRenderbuffer(),ge(i.__webglDepthbuffer[r],t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,a=i.__webglDepthbuffer[r];e.bindRenderbuffer(e.RENDERBUFFER,a),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,a)}}else{let r=t.texture.mipmaps;if(r&&r.length>0?n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[0]):n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer),i.__webglDepthbuffer===void 0)i.__webglDepthbuffer=e.createRenderbuffer(),ge(i.__webglDepthbuffer,t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,r=i.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,r),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,r)}}n.bindFramebuffer(e.FRAMEBUFFER,null)}function ye(t,n,i){let a=r.get(t);n!==void 0&&he(a.__webglFramebuffer,t,t.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),i!==void 0&&ve(t)}function be(t){let i=t.texture,s=r.get(t),c=r.get(i);t.addEventListener(`dispose`,w);let l=t.textures,u=t.isWebGLCubeRenderTarget===!0,d=l.length>1;if(d||(c.__webglTexture===void 0&&(c.__webglTexture=e.createTexture()),c.__version=i.version,o.memory.textures++),u){s.__webglFramebuffer=[];for(let t=0;t<6;t++)if(i.mipmaps&&i.mipmaps.length>0){s.__webglFramebuffer[t]=[];for(let n=0;n<i.mipmaps.length;n++)s.__webglFramebuffer[t][n]=e.createFramebuffer()}else s.__webglFramebuffer[t]=e.createFramebuffer()}else{if(i.mipmaps&&i.mipmaps.length>0){s.__webglFramebuffer=[];for(let t=0;t<i.mipmaps.length;t++)s.__webglFramebuffer[t]=e.createFramebuffer()}else s.__webglFramebuffer=e.createFramebuffer();if(d)for(let t=0,n=l.length;t<n;t++){let n=r.get(l[t]);n.__webglTexture===void 0&&(n.__webglTexture=e.createTexture(),o.memory.textures++)}if(t.samples>0&&M(t)===!1){s.__webglMultisampledFramebuffer=e.createFramebuffer(),s.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,s.__webglMultisampledFramebuffer);for(let n=0;n<l.length;n++){let r=l[n];s.__webglColorRenderbuffer[n]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,s.__webglColorRenderbuffer[n]);let i=a.convert(r.format,r.colorSpace),o=a.convert(r.type),c=b(r.internalFormat,i,o,r.normalized,r.colorSpace,t.isXRRenderTarget===!0),u=Te(t);e.renderbufferStorageMultisample(e.RENDERBUFFER,u,c,t.width,t.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+n,e.RENDERBUFFER,s.__webglColorRenderbuffer[n])}e.bindRenderbuffer(e.RENDERBUFFER,null),t.depthBuffer&&(s.__webglDepthRenderbuffer=e.createRenderbuffer(),ge(s.__webglDepthRenderbuffer,t,!0)),n.bindFramebuffer(e.FRAMEBUFFER,null)}}if(u){n.bindTexture(e.TEXTURE_CUBE_MAP,c.__webglTexture),le(e.TEXTURE_CUBE_MAP,i);for(let n=0;n<6;n++)if(i.mipmaps&&i.mipmaps.length>0)for(let r=0;r<i.mipmaps.length;r++)he(s.__webglFramebuffer[n][r],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,r);else he(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0);_(i)&&v(e.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(d){for(let i=0,a=l.length;i<a;i++){let a=l[i],o=r.get(a),c=e.TEXTURE_2D;(t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(c=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(c,o.__webglTexture),le(c,a),he(s.__webglFramebuffer,t,a,e.COLOR_ATTACHMENT0+i,c,0),_(a)&&v(c)}n.unbindTexture()}else{let r=e.TEXTURE_2D;if((t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(r=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(r,c.__webglTexture),le(r,i),i.mipmaps&&i.mipmaps.length>0)for(let n=0;n<i.mipmaps.length;n++)he(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,r,n);else he(s.__webglFramebuffer,t,i,e.COLOR_ATTACHMENT0,r,0);_(i)&&v(r),n.unbindTexture()}t.depthBuffer&&ve(t)}function xe(e){let t=e.textures;for(let i=0,a=t.length;i<a;i++){let a=t[i];if(_(a)){let t=y(e),i=r.get(a).__webglTexture;n.bindTexture(t,i),v(t),n.unbindTexture()}}}let Se=[],Ce=[];function we(t){if(t.samples>0){if(M(t)===!1){let i=t.textures,a=t.width,o=t.height,s=e.COLOR_BUFFER_BIT,l=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,u=r.get(t),d=i.length>1;if(d)for(let t=0;t<i.length;t++)n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,u.__webglMultisampledFramebuffer);let f=t.texture.mipmaps;f&&f.length>0?n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer[0]):n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer);for(let n=0;n<i.length;n++){if(t.resolveDepthBuffer&&(t.depthBuffer&&(s|=e.DEPTH_BUFFER_BIT),t.stencilBuffer&&t.resolveStencilBuffer&&(s|=e.STENCIL_BUFFER_BIT)),d){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,u.__webglColorRenderbuffer[n]);let t=r.get(i[n]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0)}e.blitFramebuffer(0,0,a,o,0,0,a,o,s,e.NEAREST),c===!0&&(Se.length=0,Ce.length=0,Se.push(e.COLOR_ATTACHMENT0+n),t.depthBuffer&&t.resolveDepthBuffer===!1&&(Se.push(l),Ce.push(l),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,Ce)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,Se))}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),d)for(let t=0;t<i.length;t++){n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,u.__webglColorRenderbuffer[t]);let a=r.get(i[t]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,a,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglMultisampledFramebuffer)}else if(t.depthBuffer&&t.resolveDepthBuffer===!1&&c){let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[n])}}}function Te(e){return Math.min(i.maxSamples,e.samples)}function M(e){let n=r.get(e);return e.samples>0&&t.has(`WEBGL_multisampled_render_to_texture`)===!0&&n.__useRenderToTexture!==!1}function Ee(e){let t=o.render.frame;u.get(e)!==t&&(u.set(e,t),e.update())}function De(e,t){let n=e.colorSpace,r=e.format,i=e.type;return e.isCompressedTexture===!0||e.isVideoTexture===!0||n!==`srgb-linear`&&n!==``&&(G.getTransfer(n)===`srgb`?(r!==1023||i!==1009)&&z(`WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.`):B(`WebGLTextures: Unsupported texture color space:`,n)),t}function Oe(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement?(l.width=e.naturalWidth||e.width,l.height=e.naturalHeight||e.height):typeof VideoFrame<`u`&&e instanceof VideoFrame?(l.width=e.displayWidth,l.height=e.displayHeight):(l.width=e.width,l.height=e.height),l}this.allocateTextureUnit=te,this.resetTextureUnits=k,this.getTextureUnits=A,this.setTextureUnits=ee,this.setTexture2D=ne,this.setTexture2DArray=re,this.setTexture3D=ie,this.setTextureCube=ae,this.rebindTextures=ye,this.setupRenderTarget=be,this.updateRenderTargetMipmap=xe,this.updateMultisampleRenderTarget=we,this.setupDepthRenderbuffer=ve,this.setupFrameBufferTexture=he,this.useMultisampledRTT=M,this.isReversedDepthBuffer=function(){return n.buffers.depth.getReversed()}}function Up(e,t){function n(n,r=``){let i,a=G.getTransfer(r);if(n===1009)return e.UNSIGNED_BYTE;if(n===1017)return e.UNSIGNED_SHORT_4_4_4_4;if(n===1018)return e.UNSIGNED_SHORT_5_5_5_1;if(n===35902)return e.UNSIGNED_INT_5_9_9_9_REV;if(n===35899)return e.UNSIGNED_INT_10F_11F_11F_REV;if(n===1010)return e.BYTE;if(n===1011)return e.SHORT;if(n===1012)return e.UNSIGNED_SHORT;if(n===1013)return e.INT;if(n===1014)return e.UNSIGNED_INT;if(n===1015)return e.FLOAT;if(n===1016)return e.HALF_FLOAT;if(n===1021)return e.ALPHA;if(n===1022)return e.RGB;if(n===1023)return e.RGBA;if(n===1026)return e.DEPTH_COMPONENT;if(n===1027)return e.DEPTH_STENCIL;if(n===1028)return e.RED;if(n===1029)return e.RED_INTEGER;if(n===1030)return e.RG;if(n===1031)return e.RG_INTEGER;if(n===1033)return e.RGBA_INTEGER;if(n===33776||n===33777||n===33778||n===33779){if(a===`srgb`){if(i=t.get(`WEBGL_compressed_texture_s3tc_srgb`),i!==null){if(n===33776)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null}else if(i=t.get(`WEBGL_compressed_texture_s3tc`),i!==null){if(n===33776)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null}if(n===35840||n===35841||n===35842||n===35843){if(i=t.get(`WEBGL_compressed_texture_pvrtc`),i!==null){if(n===35840)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===35841)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===35842)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===35843)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null}if(n===36196||n===37492||n===37496||n===37488||n===37489||n===37490||n===37491){if(i=t.get(`WEBGL_compressed_texture_etc`),i!==null){if(n===36196||n===37492)return a===`srgb`?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(n===37496)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC;if(n===37488)return i.COMPRESSED_R11_EAC;if(n===37489)return i.COMPRESSED_SIGNED_R11_EAC;if(n===37490)return i.COMPRESSED_RG11_EAC;if(n===37491)return i.COMPRESSED_SIGNED_RG11_EAC}else return null}if(n===37808||n===37809||n===37810||n===37811||n===37812||n===37813||n===37814||n===37815||n===37816||n===37817||n===37818||n===37819||n===37820||n===37821){if(i=t.get(`WEBGL_compressed_texture_astc`),i!==null){if(n===37808)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===37809)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===37810)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===37811)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===37812)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===37813)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===37814)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===37815)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===37816)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===37817)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===37818)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===37819)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===37820)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===37821)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null}if(n===36492||n===36494||n===36495){if(i=t.get(`EXT_texture_compression_bptc`),i!==null){if(n===36492)return a===`srgb`?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===36494)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===36495)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null}if(n===36283||n===36284||n===36285||n===36286){if(i=t.get(`EXT_texture_compression_rgtc`),i!==null){if(n===36283)return i.COMPRESSED_RED_RGTC1_EXT;if(n===36284)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===36285)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===36286)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null}return n===1020?e.UNSIGNED_INT_24_8:e[n]===void 0?null:e[n]}return{convert:n}}var Wp=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Gp=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Kp=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new Zc(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new pl({vertexShader:Wp,fragmentShader:Gp,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new J(new tl(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},qp=class extends Ji{constructor(e,t){super();let n=this,r=null,i=1,a=null,o=`local-floor`,s=1,c=null,l=null,u=null,d=null,f=null,p=null,m=typeof XRWebGLBinding<`u`,h=new Kp,g={},_=t.getContextAttributes(),v=null,y=null,b=[],x=[],S=new H,C=null,w=new su;w.viewport=new Ra;let T=new su;T.viewport=new Ra;let E=[w,T],D=new Su,O=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(e){let t=b[e];return t===void 0&&(t=new yo,b[e]=t),t.getTargetRaySpace()},this.getControllerGrip=function(e){let t=b[e];return t===void 0&&(t=new yo,b[e]=t),t.getGripSpace()},this.getHand=function(e){let t=b[e];return t===void 0&&(t=new yo,b[e]=t),t.getHandSpace()};function A(e){let t=x.indexOf(e.inputSource);if(t===-1)return;let n=b[t];n!==void 0&&(n.update(e.inputSource,e.frame,c||a),n.dispatchEvent({type:e.type,data:e.inputSource}))}function ee(){r.removeEventListener(`select`,A),r.removeEventListener(`selectstart`,A),r.removeEventListener(`selectend`,A),r.removeEventListener(`squeeze`,A),r.removeEventListener(`squeezestart`,A),r.removeEventListener(`squeezeend`,A),r.removeEventListener(`end`,ee),r.removeEventListener(`inputsourceschange`,te);for(let e=0;e<b.length;e++){let t=x[e];t!==null&&(x[e]=null,b[e].disconnect(t))}O=null,k=null,h.reset();for(let e in g)delete g[e];e.setRenderTarget(v),f=null,d=null,u=null,r=null,y=null,ce.stop(),n.isPresenting=!1,e.setPixelRatio(C),e.setSize(S.width,S.height,!1),n.dispatchEvent({type:`sessionend`})}this.setFramebufferScaleFactor=function(e){i=e,n.isPresenting===!0&&z(`WebXRManager: Cannot change framebuffer scale while presenting.`)},this.setReferenceSpaceType=function(e){o=e,n.isPresenting===!0&&z(`WebXRManager: Cannot change reference space type while presenting.`)},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(e){c=e},this.getBaseLayer=function(){return d===null?f:d},this.getBinding=function(){return u===null&&m&&(u=new XRWebGLBinding(r,t)),u},this.getFrame=function(){return p},this.getSession=function(){return r},this.setSession=async function(l){if(r=l,r!==null){if(v=e.getRenderTarget(),r.addEventListener(`select`,A),r.addEventListener(`selectstart`,A),r.addEventListener(`selectend`,A),r.addEventListener(`squeeze`,A),r.addEventListener(`squeezestart`,A),r.addEventListener(`squeezeend`,A),r.addEventListener(`end`,ee),r.addEventListener(`inputsourceschange`,te),_.xrCompatible!==!0&&await t.makeXRCompatible(),C=e.getPixelRatio(),e.getSize(S),m&&`createProjectionLayer`in XRWebGLBinding.prototype){let n=null,a=null,o=null;_.depth&&(o=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,n=_.stencil?Pr:Nr,a=_.stencil?Dr:Sr);let s={colorFormat:t.RGBA8,depthFormat:o,scaleFactor:i};u=this.getBinding(),d=u.createProjectionLayer(s),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),y=new Ba(d.textureWidth,d.textureHeight,{format:Mr,type:_r,depthTexture:new Yc(d.textureWidth,d.textureHeight,a,void 0,void 0,void 0,void 0,void 0,void 0,n),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{let n={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:i};f=new XRWebGLLayer(r,t,n),r.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new Ba(f.framebufferWidth,f.framebufferHeight,{format:Mr,type:_r,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(s),c=null,a=await r.requestReferenceSpace(o),ce.setContext(r),ce.start(),n.isPresenting=!0,n.dispatchEvent({type:`sessionstart`})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return h.getDepthTexture()};function te(e){for(let t=0;t<e.removed.length;t++){let n=e.removed[t],r=x.indexOf(n);r>=0&&(x[r]=null,b[r].disconnect(n))}for(let t=0;t<e.added.length;t++){let n=e.added[t],r=x.indexOf(n);if(r===-1){for(let e=0;e<b.length;e++)if(e>=x.length){x.push(n),r=e;break}else if(x[e]===null){x[e]=n,r=e;break}if(r===-1)break}let i=b[r];i&&i.connect(n)}}let j=new U,ne=new U;function re(e,t,n){j.setFromMatrixPosition(t.matrixWorld),ne.setFromMatrixPosition(n.matrixWorld);let r=j.distanceTo(ne),i=t.projectionMatrix.elements,a=n.projectionMatrix.elements,o=i[14]/(i[10]-1),s=i[14]/(i[10]+1),c=(i[9]+1)/i[5],l=(i[9]-1)/i[5],u=(i[8]-1)/i[0],d=(a[8]+1)/a[0],f=o*u,p=o*d,m=r/(-u+d),h=m*-u;if(t.matrixWorld.decompose(e.position,e.quaternion,e.scale),e.translateX(h),e.translateZ(m),e.matrixWorld.compose(e.position,e.quaternion,e.scale),e.matrixWorldInverse.copy(e.matrixWorld).invert(),i[10]===-1)e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse);else{let t=o+m,n=s+m,i=f-h,a=p+(r-h),u=c*s/n*t,d=l*s/n*t;e.projectionMatrix.makePerspective(i,a,u,d,t,n),e.projectionMatrixInverse.copy(e.projectionMatrix).invert()}}function ie(e,t){t===null?e.matrixWorld.copy(e.matrix):e.matrixWorld.multiplyMatrices(t.matrixWorld,e.matrix),e.matrixWorldInverse.copy(e.matrixWorld).invert()}this.updateCamera=function(e){if(r===null)return;let t=e.near,n=e.far;h.texture!==null&&(h.depthNear>0&&(t=h.depthNear),h.depthFar>0&&(n=h.depthFar)),D.near=T.near=w.near=t,D.far=T.far=w.far=n,(O!==D.near||k!==D.far)&&(r.updateRenderState({depthNear:D.near,depthFar:D.far}),O=D.near,k=D.far),D.layers.mask=e.layers.mask|6,w.layers.mask=D.layers.mask&-5,T.layers.mask=D.layers.mask&-3;let i=e.parent,a=D.cameras;ie(D,i);for(let e=0;e<a.length;e++)ie(a[e],i);a.length===2?re(D,w,T):D.projectionMatrix.copy(w.projectionMatrix),ae(e,D,i)};function ae(e,t,n){n===null?e.matrix.copy(t.matrixWorld):(e.matrix.copy(n.matrixWorld),e.matrix.invert(),e.matrix.multiply(t.matrixWorld)),e.matrix.decompose(e.position,e.quaternion,e.scale),e.updateMatrixWorld(!0),e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse),e.isPerspectiveCamera&&(e.fov=Qi*2*Math.atan(1/e.projectionMatrix.elements[5]),e.zoom=1)}this.getCamera=function(){return D},this.getFoveation=function(){if(d!==null||f!==null)return s},this.setFoveation=function(e){s=e,d!==null&&(d.fixedFoveation=e),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=e)},this.hasDepthSensing=function(){return h.texture!==null},this.getDepthSensingMesh=function(){return h.getMesh(D)},this.getCameraTexture=function(e){return g[e]};let oe=null;function se(t,i){if(l=i.getViewerPose(c||a),p=i,l!==null){let t=l.views;f!==null&&(e.setRenderTargetFramebuffer(y,f.framebuffer),e.setRenderTarget(y));let i=!1;t.length!==D.cameras.length&&(D.cameras.length=0,i=!0);for(let n=0;n<t.length;n++){let r=t[n],a=null;if(f!==null)a=f.getViewport(r);else{let t=u.getViewSubImage(d,r);a=t.viewport,n===0&&(e.setRenderTargetTextures(y,t.colorTexture,t.depthStencilTexture),e.setRenderTarget(y))}let o=E[n];o===void 0&&(o=new su,o.layers.enable(n),o.viewport=new Ra,E[n]=o),o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.projectionMatrix.fromArray(r.projectionMatrix),o.projectionMatrixInverse.copy(o.projectionMatrix).invert(),o.viewport.set(a.x,a.y,a.width,a.height),n===0&&(D.matrix.copy(o.matrix),D.matrix.decompose(D.position,D.quaternion,D.scale)),i===!0&&D.cameras.push(o)}let a=r.enabledFeatures;if(a&&a.includes(`depth-sensing`)&&r.depthUsage==`gpu-optimized`&&m){u=n.getBinding();let e=u.getDepthInformation(t[0]);e&&e.isValid&&e.texture&&h.init(e,r.renderState)}if(a&&a.includes(`camera-access`)&&m){e.state.unbindTexture(),u=n.getBinding();for(let e=0;e<t.length;e++){let n=t[e].camera;if(n){let e=g[n];e||(e=new Zc,g[n]=e);let t=u.getCameraImage(n);e.sourceTexture=t}}}}for(let e=0;e<b.length;e++){let t=x[e],n=b[e];t!==null&&n!==void 0&&n.update(t,i,c||a)}oe&&oe(t,i),i.detectedPlanes&&n.dispatchEvent({type:`planesdetected`,data:i}),p=null}let ce=new zu;ce.setAnimationLoop(se),this.setAnimationLoop=function(e){oe=e},this.dispose=function(){}}},Jp=new K,Yp=new W;Yp.set(-1,0,0,0,1,0,0,0,1);function Xp(e,t){function n(e,t){e.matrixAutoUpdate===!0&&e.updateMatrix(),t.value.copy(e.matrix)}function r(t,n){n.color.getRGB(t.fogColor.value,ll(e)),n.isFog?(t.fogNear.value=n.near,t.fogFar.value=n.far):n.isFogExp2&&(t.fogDensity.value=n.density)}function i(e,t,n,r,i){t.isNodeMaterial?t.uniformsNeedUpdate=!1:t.isMeshBasicMaterial?a(e,t):t.isMeshLambertMaterial?(a(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshToonMaterial?(a(e,t),d(e,t)):t.isMeshPhongMaterial?(a(e,t),u(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshStandardMaterial?(a(e,t),f(e,t),t.isMeshPhysicalMaterial&&p(e,t,i)):t.isMeshMatcapMaterial?(a(e,t),m(e,t)):t.isMeshDepthMaterial?a(e,t):t.isMeshDistanceMaterial?(a(e,t),h(e,t)):t.isMeshNormalMaterial?a(e,t):t.isLineBasicMaterial?(o(e,t),t.isLineDashedMaterial&&s(e,t)):t.isPointsMaterial?c(e,t,n,r):t.isSpriteMaterial?l(e,t):t.isShadowMaterial?(e.color.value.copy(t.color),e.opacity.value=t.opacity):t.isShaderMaterial&&(t.uniformsNeedUpdate=!1)}function a(e,r){e.opacity.value=r.opacity,r.color&&e.diffuse.value.copy(r.color),r.emissive&&e.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity),r.map&&(e.map.value=r.map,n(r.map,e.mapTransform)),r.alphaMap&&(e.alphaMap.value=r.alphaMap,n(r.alphaMap,e.alphaMapTransform)),r.bumpMap&&(e.bumpMap.value=r.bumpMap,n(r.bumpMap,e.bumpMapTransform),e.bumpScale.value=r.bumpScale,r.side===1&&(e.bumpScale.value*=-1)),r.normalMap&&(e.normalMap.value=r.normalMap,n(r.normalMap,e.normalMapTransform),e.normalScale.value.copy(r.normalScale),r.side===1&&e.normalScale.value.negate()),r.displacementMap&&(e.displacementMap.value=r.displacementMap,n(r.displacementMap,e.displacementMapTransform),e.displacementScale.value=r.displacementScale,e.displacementBias.value=r.displacementBias),r.emissiveMap&&(e.emissiveMap.value=r.emissiveMap,n(r.emissiveMap,e.emissiveMapTransform)),r.specularMap&&(e.specularMap.value=r.specularMap,n(r.specularMap,e.specularMapTransform)),r.alphaTest>0&&(e.alphaTest.value=r.alphaTest);let i=t.get(r),a=i.envMap,o=i.envMapRotation;a&&(e.envMap.value=a,e.envMapRotation.value.setFromMatrix4(Jp.makeRotationFromEuler(o)).transpose(),a.isCubeTexture&&a.isRenderTargetTexture===!1&&e.envMapRotation.value.premultiply(Yp),e.reflectivity.value=r.reflectivity,e.ior.value=r.ior,e.refractionRatio.value=r.refractionRatio),r.lightMap&&(e.lightMap.value=r.lightMap,e.lightMapIntensity.value=r.lightMapIntensity,n(r.lightMap,e.lightMapTransform)),r.aoMap&&(e.aoMap.value=r.aoMap,e.aoMapIntensity.value=r.aoMapIntensity,n(r.aoMap,e.aoMapTransform))}function o(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform))}function s(e,t){e.dashSize.value=t.dashSize,e.totalSize.value=t.dashSize+t.gapSize,e.scale.value=t.scale}function c(e,t,r,i){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.size.value=t.size*r,e.scale.value=i*.5,t.map&&(e.map.value=t.map,n(t.map,e.uvTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function l(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.rotation.value=t.rotation,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function u(e,t){e.specular.value.copy(t.specular),e.shininess.value=Math.max(t.shininess,1e-4)}function d(e,t){t.gradientMap&&(e.gradientMap.value=t.gradientMap)}function f(e,t){e.metalness.value=t.metalness,t.metalnessMap&&(e.metalnessMap.value=t.metalnessMap,n(t.metalnessMap,e.metalnessMapTransform)),e.roughness.value=t.roughness,t.roughnessMap&&(e.roughnessMap.value=t.roughnessMap,n(t.roughnessMap,e.roughnessMapTransform)),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)}function p(e,t,r){e.ior.value=t.ior,t.sheen>0&&(e.sheenColor.value.copy(t.sheenColor).multiplyScalar(t.sheen),e.sheenRoughness.value=t.sheenRoughness,t.sheenColorMap&&(e.sheenColorMap.value=t.sheenColorMap,n(t.sheenColorMap,e.sheenColorMapTransform)),t.sheenRoughnessMap&&(e.sheenRoughnessMap.value=t.sheenRoughnessMap,n(t.sheenRoughnessMap,e.sheenRoughnessMapTransform))),t.clearcoat>0&&(e.clearcoat.value=t.clearcoat,e.clearcoatRoughness.value=t.clearcoatRoughness,t.clearcoatMap&&(e.clearcoatMap.value=t.clearcoatMap,n(t.clearcoatMap,e.clearcoatMapTransform)),t.clearcoatRoughnessMap&&(e.clearcoatRoughnessMap.value=t.clearcoatRoughnessMap,n(t.clearcoatRoughnessMap,e.clearcoatRoughnessMapTransform)),t.clearcoatNormalMap&&(e.clearcoatNormalMap.value=t.clearcoatNormalMap,n(t.clearcoatNormalMap,e.clearcoatNormalMapTransform),e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale),t.side===1&&e.clearcoatNormalScale.value.negate())),t.dispersion>0&&(e.dispersion.value=t.dispersion),t.iridescence>0&&(e.iridescence.value=t.iridescence,e.iridescenceIOR.value=t.iridescenceIOR,e.iridescenceThicknessMinimum.value=t.iridescenceThicknessRange[0],e.iridescenceThicknessMaximum.value=t.iridescenceThicknessRange[1],t.iridescenceMap&&(e.iridescenceMap.value=t.iridescenceMap,n(t.iridescenceMap,e.iridescenceMapTransform)),t.iridescenceThicknessMap&&(e.iridescenceThicknessMap.value=t.iridescenceThicknessMap,n(t.iridescenceThicknessMap,e.iridescenceThicknessMapTransform))),t.transmission>0&&(e.transmission.value=t.transmission,e.transmissionSamplerMap.value=r.texture,e.transmissionSamplerSize.value.set(r.width,r.height),t.transmissionMap&&(e.transmissionMap.value=t.transmissionMap,n(t.transmissionMap,e.transmissionMapTransform)),e.thickness.value=t.thickness,t.thicknessMap&&(e.thicknessMap.value=t.thicknessMap,n(t.thicknessMap,e.thicknessMapTransform)),e.attenuationDistance.value=t.attenuationDistance,e.attenuationColor.value.copy(t.attenuationColor)),t.anisotropy>0&&(e.anisotropyVector.value.set(t.anisotropy*Math.cos(t.anisotropyRotation),t.anisotropy*Math.sin(t.anisotropyRotation)),t.anisotropyMap&&(e.anisotropyMap.value=t.anisotropyMap,n(t.anisotropyMap,e.anisotropyMapTransform))),e.specularIntensity.value=t.specularIntensity,e.specularColor.value.copy(t.specularColor),t.specularColorMap&&(e.specularColorMap.value=t.specularColorMap,n(t.specularColorMap,e.specularColorMapTransform)),t.specularIntensityMap&&(e.specularIntensityMap.value=t.specularIntensityMap,n(t.specularIntensityMap,e.specularIntensityMapTransform))}function m(e,t){t.matcap&&(e.matcap.value=t.matcap)}function h(e,n){let r=t.get(n).light;e.referencePosition.value.setFromMatrixPosition(r.matrixWorld),e.nearDistance.value=r.shadow.camera.near,e.farDistance.value=r.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:i}}function Zp(e,t,n,r){let i={},a={},o=[],s=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function c(e,t){let n=t.program;r.uniformBlockBinding(e,n)}function l(e,n){let o=i[e.id];o===void 0&&(g(e),o=u(e),i[e.id]=o,e.addEventListener(`dispose`,v));let s=n.program;r.updateUBOMapping(e,s);let c=t.render.frame;a[e.id]!==c&&(f(e),a[e.id]=c)}function u(t){let n=d();t.__bindingPointIndex=n;let r=e.createBuffer(),i=t.__size,a=t.usage;return e.bindBuffer(e.UNIFORM_BUFFER,r),e.bufferData(e.UNIFORM_BUFFER,i,a),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,n,r),r}function d(){for(let e=0;e<s;e++)if(o.indexOf(e)===-1)return o.push(e),e;return B(`WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached.`),0}function f(t){let n=i[t.id],r=t.uniforms,a=t.__cache;e.bindBuffer(e.UNIFORM_BUFFER,n);for(let e=0,t=r.length;e<t;e++){let t=r[e];if(Array.isArray(t))for(let n=0,r=t.length;n<r;n++)p(t[n],e,n,a);else p(t,e,0,a)}e.bindBuffer(e.UNIFORM_BUFFER,null)}function p(t,n,r,i){if(h(t,n,r,i)===!0){let n=t.__offset,r=t.value;if(Array.isArray(r)){let e=0;for(let n=0;n<r.length;n++){let i=r[n],a=_(i);m(i,t.__data,e),typeof i!=`number`&&typeof i!=`boolean`&&!i.isMatrix3&&!ArrayBuffer.isView(i)&&(e+=a.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(r,t.__data,0);e.bufferSubData(e.UNIFORM_BUFFER,n,t.__data)}}function m(e,t,n){typeof e==`number`||typeof e==`boolean`?t[0]=e:e.isMatrix3?(t[0]=e.elements[0],t[1]=e.elements[1],t[2]=e.elements[2],t[3]=0,t[4]=e.elements[3],t[5]=e.elements[4],t[6]=e.elements[5],t[7]=0,t[8]=e.elements[6],t[9]=e.elements[7],t[10]=e.elements[8],t[11]=0):ArrayBuffer.isView(e)?t.set(new e.constructor(e.buffer,e.byteOffset,t.length)):e.toArray(t,n)}function h(e,t,n,r){let i=e.value,a=t+`_`+n;if(r[a]===void 0)return r[a]=typeof i==`number`||typeof i==`boolean`?i:ArrayBuffer.isView(i)?i.slice():i.clone(),!0;{let e=r[a];if(typeof i==`number`||typeof i==`boolean`){if(e!==i)return r[a]=i,!0}else if(ArrayBuffer.isView(i))return!0;else if(e.equals(i)===!1)return e.copy(i),!0}return!1}function g(e){let t=e.uniforms,n=0;for(let e=0,r=t.length;e<r;e++){let r=Array.isArray(t[e])?t[e]:[t[e]];for(let e=0,t=r.length;e<t;e++){let t=r[e],i=Array.isArray(t.value)?t.value:[t.value];for(let e=0,r=i.length;e<r;e++){let r=i[e],a=_(r),o=n%16,s=o%a.boundary,c=o+s;n+=s,c!==0&&16-c<a.storage&&(n+=16-c),t.__data=new Float32Array(a.storage/Float32Array.BYTES_PER_ELEMENT),t.__offset=n,n+=a.storage}}}let r=n%16;return r>0&&(n+=16-r),e.__size=n,e.__cache={},this}function _(e){let t={boundary:0,storage:0};return typeof e==`number`||typeof e==`boolean`?(t.boundary=4,t.storage=4):e.isVector2?(t.boundary=8,t.storage=8):e.isVector3||e.isColor?(t.boundary=16,t.storage=12):e.isVector4?(t.boundary=16,t.storage=16):e.isMatrix3?(t.boundary=48,t.storage=48):e.isMatrix4?(t.boundary=64,t.storage=64):e.isTexture?z(`WebGLRenderer: Texture samplers can not be part of an uniforms group.`):ArrayBuffer.isView(e)?(t.boundary=16,t.storage=e.byteLength):z(`WebGLRenderer: Unsupported uniform value type.`,e),t}function v(t){let n=t.target;n.removeEventListener(`dispose`,v);let r=o.indexOf(n.__bindingPointIndex);o.splice(r,1),e.deleteBuffer(i[n.id]),delete i[n.id],delete a[n.id]}function y(){for(let t in i)e.deleteBuffer(i[t]);o=[],i={},a={}}return{bind:c,update:l,dispose:y}}var Qp=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),$p=null;function em(){return $p===null&&($p=new ac(Qp,16,16,Lr,wr),$p.name=`DFG_LUT`,$p.minFilter=mr,$p.magFilter=mr,$p.wrapS=lr,$p.wrapT=lr,$p.generateMipmaps=!1,$p.needsUpdate=!0),$p}var tm=class{constructor(e={}){let{canvas:t=Vi(),context:n=null,depth:r=!0,stencil:i=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:s=!0,preserveDrawingBuffer:c=!1,powerPreference:l=`default`,failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1,outputBufferType:f=_r}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<`u`&&n instanceof WebGLRenderingContext)throw Error(`THREE.WebGLRenderer: WebGL 1 is not supported since r163.`);p=n.getContextAttributes().alpha}else p=a;let m=f,h=new Set([zr,Rr,Ir]),g=new Set([_r,Sr,br,Dr,Tr,Er]),_=new Uint32Array(4),v=new Int32Array(4),y=new U,b=null,x=null,S=[],C=[],w=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=0,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let T=this,E=!1,D=null,O=null,k=null,A=null;this._outputColorSpace=ji;let ee=0,te=0,j=null,ne=-1,re=null,ie=new Ra,ae=new Ra,oe=null,se=new q(0),ce=0,le=t.width,ue=t.height,de=1,fe=null,pe=null,me=new Ra(0,0,le,ue),he=new Ra(0,0,le,ue),ge=!1,_e=new Tc,ve=!1,ye=!1,be=new K,xe=new U,Se=new Ra,Ce={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},we=!1;function Te(){return j===null?de:1}let M=n;function Ee(e,n){return t.getContext(e,n)}try{let e={alpha:!0,depth:r,stencil:i,antialias:o,premultipliedAlpha:s,preserveDrawingBuffer:c,powerPreference:l,failIfMajorPerformanceCaveat:u};if(`setAttribute`in t&&t.setAttribute(`data-engine`,`three.js r185`),t.addEventListener(`webglcontextlost`,Ye,!1),t.addEventListener(`webglcontextrestored`,Xe,!1),t.addEventListener(`webglcontextcreationerror`,Ze,!1),M===null){let t=`webgl2`;if(M=Ee(t,e),M===null)throw Ee(t)?Error(`THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.`):Error(`THREE.WebGLRenderer: Error creating WebGL context.`)}}catch(e){throw B(`WebGLRenderer: `+e.message),e}let De,Oe,N,ke,P,F,Ae,je,Me,Ne,Pe,Fe,Ie,Le,Re,ze,Be,Ve,He,Ue,We,Ge,Ke;function qe(){De=new vd(M),De.init(),We=new Up(M,De),Oe=new Ju(M,De,e,We),N=new Vp(M,De),Oe.reversedDepthBuffer&&d&&N.buffers.depth.setReversed(!0),O=M.createFramebuffer(),k=M.createFramebuffer(),A=M.createFramebuffer(),ke=new xd(M),P=new xp,F=new Hp(M,De,N,P,Oe,We,ke),Ae=new _d(T),je=new Bu(M),Ge=new Ku(M,je),Me=new yd(M,je,ke,Ge),Ne=new Cd(M,Me,je,Ge,ke),Ve=new Sd(M,Oe,F),Re=new Yu(P),Pe=new bp(T,Ae,De,Oe,Ge,Re),Fe=new Xp(T,P),Ie=new Tp,Le=new Mp(De),Be=new Gu(T,Ae,N,Ne,p,s),ze=new Bp(T,Ne,Oe),Ke=new Zp(M,ke,Oe,N),He=new qu(M,De,ke),Ue=new bd(M,De,ke),ke.programs=Pe.programs,T.capabilities=Oe,T.extensions=De,T.properties=P,T.renderLists=Ie,T.shadowMap=ze,T.state=N,T.info=ke}qe(),m!==1009&&(w=new Td(m,t.width,t.height,o,r,i));let Je=new qp(T,M);this.xr=Je,this.getContext=function(){return M},this.getContextAttributes=function(){return M.getContextAttributes()},this.forceContextLoss=function(){let e=De.get(`WEBGL_lose_context`);e&&e.loseContext()},this.forceContextRestore=function(){let e=De.get(`WEBGL_lose_context`);e&&e.restoreContext()},this.getPixelRatio=function(){return de},this.setPixelRatio=function(e){e!==void 0&&(de=e,this.setSize(le,ue,!1))},this.getSize=function(e){return e.set(le,ue)},this.setSize=function(e,n,r=!0){if(Je.isPresenting){z(`WebGLRenderer: Can't change size while VR device is presenting.`);return}le=e,ue=n,t.width=Math.floor(e*de),t.height=Math.floor(n*de),r===!0&&(t.style.width=e+`px`,t.style.height=n+`px`),w!==null&&w.setSize(t.width,t.height),this.setViewport(0,0,e,n)},this.getDrawingBufferSize=function(e){return e.set(le*de,ue*de).floor()},this.setDrawingBufferSize=function(e,n,r){le=e,ue=n,de=r,t.width=Math.floor(e*r),t.height=Math.floor(n*r),this.setViewport(0,0,e,n)},this.setEffects=function(e){if(m===1009){B(`WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.`);return}if(e){for(let t=0;t<e.length;t++)if(e[t].isOutputPass===!0){z(`WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.`);break}}w.setEffects(e||[])},this.getCurrentViewport=function(e){return e.copy(ie)},this.getViewport=function(e){return e.copy(me)},this.setViewport=function(e,t,n,r){e.isVector4?me.set(e.x,e.y,e.z,e.w):me.set(e,t,n,r),N.viewport(ie.copy(me).multiplyScalar(de).round())},this.getScissor=function(e){return e.copy(he)},this.setScissor=function(e,t,n,r){e.isVector4?he.set(e.x,e.y,e.z,e.w):he.set(e,t,n,r),N.scissor(ae.copy(he).multiplyScalar(de).round())},this.getScissorTest=function(){return ge},this.setScissorTest=function(e){N.setScissorTest(ge=e)},this.setOpaqueSort=function(e){fe=e},this.setTransparentSort=function(e){pe=e},this.getClearColor=function(e){return e.copy(Be.getClearColor())},this.setClearColor=function(){Be.setClearColor(...arguments)},this.getClearAlpha=function(){return Be.getClearAlpha()},this.setClearAlpha=function(){Be.setClearAlpha(...arguments)},this.clear=function(e=!0,t=!0,n=!0){let r=0;if(e){let e=!1;if(j!==null){let t=j.texture.format;e=h.has(t)}if(e){let e=j.texture.type,t=g.has(e),n=Be.getClearColor(),r=Be.getClearAlpha(),i=n.r,a=n.g,o=n.b;t?(_[0]=i,_[1]=a,_[2]=o,_[3]=r,M.clearBufferuiv(M.COLOR,0,_)):(v[0]=i,v[1]=a,v[2]=o,v[3]=r,M.clearBufferiv(M.COLOR,0,v))}else r|=M.COLOR_BUFFER_BIT}t&&(r|=M.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),n&&(r|=M.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),r!==0&&M.clear(r)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(e){e.setRenderer(this),D=e},this.dispose=function(){t.removeEventListener(`webglcontextlost`,Ye,!1),t.removeEventListener(`webglcontextrestored`,Xe,!1),t.removeEventListener(`webglcontextcreationerror`,Ze,!1),Be.dispose(),Ie.dispose(),Le.dispose(),P.dispose(),Ae.dispose(),Ne.dispose(),Ge.dispose(),Ke.dispose(),Pe.dispose(),Je.dispose(),Je.removeEventListener(`sessionstart`,it),Je.removeEventListener(`sessionend`,at),ot.stop()};function Ye(e){e.preventDefault(),Ui(`WebGLRenderer: Context Lost.`),E=!0}function Xe(){Ui(`WebGLRenderer: Context Restored.`),E=!1;let e=ke.autoReset,t=ze.enabled,n=ze.autoUpdate,r=ze.needsUpdate,i=ze.type;qe(),ke.autoReset=e,ze.enabled=t,ze.autoUpdate=n,ze.needsUpdate=r,ze.type=i}function Ze(e){B(`WebGLRenderer: A WebGL context could not be created. Reason: `,e.statusMessage)}function Qe(e){let t=e.target;t.removeEventListener(`dispose`,Qe),$e(t)}function $e(e){et(e),P.remove(e)}function et(e){let t=P.get(e).programs;t!==void 0&&(t.forEach(function(e){Pe.releaseProgram(e)}),e.isShaderMaterial&&Pe.releaseShaderCache(e))}this.renderBufferDirect=function(e,t,n,r,i,a){t===null&&(t=Ce);let o=i.isMesh&&i.matrixWorld.determinantAffine()<0,s=gt(e,t,n,r,i);N.setMaterial(r,o);let c=n.index,l=1;if(r.wireframe===!0){if(c=Me.getWireframeAttribute(n),c===void 0)return;l=2}let u=n.drawRange,d=n.attributes.position,f=u.start*l,p=(u.start+u.count)*l;a!==null&&(f=Math.max(f,a.start*l),p=Math.min(p,(a.start+a.count)*l)),c===null?d!=null&&(f=Math.max(f,0),p=Math.min(p,d.count)):(f=Math.max(f,0),p=Math.min(p,c.count));let m=p-f;if(m<0||m===1/0)return;Ge.setup(i,r,s,n,c);let h,g=He;if(c!==null&&(h=je.get(c),g=Ue,g.setIndex(h)),i.isMesh)r.wireframe===!0?(N.setLineWidth(r.wireframeLinewidth*Te()),g.setMode(M.LINES)):g.setMode(M.TRIANGLES);else if(i.isLine){let e=r.linewidth;e===void 0&&(e=1),N.setLineWidth(e*Te()),i.isLineSegments?g.setMode(M.LINES):i.isLineLoop?g.setMode(M.LINE_LOOP):g.setMode(M.LINE_STRIP)}else i.isPoints?g.setMode(M.POINTS):i.isSprite&&g.setMode(M.TRIANGLES);if(i.isBatchedMesh){if(De.get(`WEBGL_multi_draw`))g.renderMultiDraw(i._multiDrawStarts,i._multiDrawCounts,i._multiDrawCount);else{let e=i._multiDrawStarts,t=i._multiDrawCounts,n=i._multiDrawCount,a=c?je.get(c).bytesPerElement:1,o=P.get(r).currentProgram.getUniforms();for(let r=0;r<n;r++)o.setValue(M,`_gl_DrawID`,r),g.render(e[r]/a,t[r])}}else if(i.isInstancedMesh)g.renderInstances(f,m,i.count);else if(n.isInstancedBufferGeometry){let e=n._maxInstanceCount===void 0?1/0:n._maxInstanceCount,t=Math.min(n.instanceCount,e);g.renderInstances(f,m,t)}else g.render(f,m)};function tt(e,t,n){e.transparent===!0&&e.side===2&&e.forceSinglePass===!1?(e.side=1,e.needsUpdate=!0,ft(e,t,n),e.side=0,e.needsUpdate=!0,ft(e,t,n),e.side=2):ft(e,t,n)}this.compile=function(e,t,n=null){n===null&&(n=e),x=Le.get(n),x.init(t),C.push(x),n.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(x.pushLight(e),e.castShadow&&x.pushShadow(e))}),e!==n&&e.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(x.pushLight(e),e.castShadow&&x.pushShadow(e))}),x.setupLights();let r=new Set;return e.traverse(function(e){if(!(e.isMesh||e.isPoints||e.isLine||e.isSprite))return;let t=e.material;if(t){if(Array.isArray(t))for(let i=0;i<t.length;i++){let a=t[i];tt(a,n,e),r.add(a)}else tt(t,n,e),r.add(t)}}),x=C.pop(),r},this.compileAsync=function(e,t,n=null){let r=this.compile(e,t,n);return new Promise(t=>{function n(){if(r.forEach(function(e){P.get(e).currentProgram.isReady()&&r.delete(e)}),r.size===0){t(e);return}setTimeout(n,10)}De.get(`KHR_parallel_shader_compile`)===null?setTimeout(n,10):n()})};let nt=null;function rt(e){nt&&nt(e)}function it(){ot.stop()}function at(){ot.start()}let ot=new zu;ot.setAnimationLoop(rt),typeof self<`u`&&ot.setContext(self),this.setAnimationLoop=function(e){nt=e,Je.setAnimationLoop(e),e===null?ot.stop():ot.start()},Je.addEventListener(`sessionstart`,it),Je.addEventListener(`sessionend`,at),this.render=function(e,t){if(t!==void 0&&t.isCamera!==!0){B(`WebGLRenderer.render: camera is not an instance of THREE.Camera.`);return}if(E===!0)return;D!==null&&D.renderStart(e,t);let n=Je.enabled===!0&&Je.isPresenting===!0,r=w!==null&&(j===null||n)&&w.begin(T,j);if(e.matrixWorldAutoUpdate===!0&&e.updateMatrixWorld(),t.parent===null&&t.matrixWorldAutoUpdate===!0&&t.updateMatrixWorld(),Je.enabled===!0&&Je.isPresenting===!0&&(w===null||w.isCompositing()===!1)&&(Je.cameraAutoUpdate===!0&&Je.updateCamera(t),t=Je.getCamera()),e.isScene===!0&&e.onBeforeRender(T,e,t,j),x=Le.get(e,C.length),x.init(t),x.state.textureUnits=F.getTextureUnits(),C.push(x),be.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),_e.setFromProjectionMatrix(be,Li,t.reversedDepth),ye=this.localClippingEnabled,ve=Re.init(this.clippingPlanes,ye),b=Ie.get(e,S.length),b.init(),S.push(b),Je.enabled===!0&&Je.isPresenting===!0){let e=T.xr.getDepthSensingMesh();e!==null&&st(e,t,-1/0,T.sortObjects)}st(e,t,0,T.sortObjects),b.finish(),T.sortObjects===!0&&b.sort(fe,pe,t.reversedDepth),we=Je.enabled===!1||Je.isPresenting===!1||Je.hasDepthSensing()===!1,we&&Be.addToRenderList(b,e),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),ve===!0&&Re.beginShadows();let i=x.state.shadowsArray;if(ze.render(i,e,t),ve===!0&&Re.endShadows(),(r&&w.hasRenderPass())===!1){let n=b.opaque,r=b.transmissive;if(x.setupLights(),t.isArrayCamera){let i=t.cameras;if(r.length>0)for(let t=0,a=i.length;t<a;t++){let a=i[t];lt(n,r,e,a)}we&&Be.render(e);for(let t=0,n=i.length;t<n;t++){let n=i[t];ct(b,e,n,n.viewport)}}else r.length>0&&lt(n,r,e,t),we&&Be.render(e),ct(b,e,t)}j!==null&&te===0&&(F.updateMultisampleRenderTarget(j),F.updateRenderTargetMipmap(j)),r&&w.end(T),e.isScene===!0&&e.onAfterRender(T,e,t),Ge.resetDefaultState(),ne=-1,re=null,C.pop(),C.length>0?(x=C[C.length-1],F.setTextureUnits(x.state.textureUnits),ve===!0&&Re.setGlobalState(T.clippingPlanes,x.state.camera)):x=null,S.pop(),b=S.length>0?S[S.length-1]:null,D!==null&&D.renderEnd()};function st(e,t,n,r){if(e.visible===!1)return;if(e.layers.test(t.layers)){if(e.isGroup)n=e.renderOrder;else if(e.isLOD)e.autoUpdate===!0&&e.update(t);else if(e.isLightProbeGrid)x.pushLightProbeGrid(e);else if(e.isLight)x.pushLight(e),e.castShadow&&x.pushShadow(e);else if(e.isSprite){if(!e.frustumCulled||_e.intersectsSprite(e)){r&&Se.setFromMatrixPosition(e.matrixWorld).applyMatrix4(be);let t=Ne.update(e),i=e.material;i.visible&&b.push(e,t,i,n,Se.z,null)}}else if((e.isMesh||e.isLine||e.isPoints)&&(!e.frustumCulled||_e.intersectsObject(e))){let t=Ne.update(e),i=e.material;if(r&&(e.boundingSphere===void 0?(t.boundingSphere===null&&t.computeBoundingSphere(),Se.copy(t.boundingSphere.center)):(e.boundingSphere===null&&e.computeBoundingSphere(),Se.copy(e.boundingSphere.center)),Se.applyMatrix4(e.matrixWorld).applyMatrix4(be)),Array.isArray(i)){let r=t.groups;for(let a=0,o=r.length;a<o;a++){let o=r[a],s=i[o.materialIndex];s&&s.visible&&b.push(e,t,s,n,Se.z,o)}}else i.visible&&b.push(e,t,i,n,Se.z,null)}}let i=e.children;for(let e=0,a=i.length;e<a;e++)st(i[e],t,n,r)}function ct(e,t,n,r){let{opaque:i,transmissive:a,transparent:o}=e;x.setupLightsView(n),ve===!0&&Re.setGlobalState(T.clippingPlanes,n),r&&N.viewport(ie.copy(r)),i.length>0&&ut(i,t,n),a.length>0&&ut(a,t,n),o.length>0&&ut(o,t,n),N.buffers.depth.setTest(!0),N.buffers.depth.setMask(!0),N.buffers.color.setMask(!0),N.setPolygonOffset(!1)}function lt(e,t,n,r){if((n.isScene===!0?n.overrideMaterial:null)!==null)return;if(x.state.transmissionRenderTarget[r.id]===void 0){let e=De.has(`EXT_color_buffer_half_float`)||De.has(`EXT_color_buffer_float`);x.state.transmissionRenderTarget[r.id]=new Ba(1,1,{generateMipmaps:!0,type:e?wr:_r,minFilter:gr,samples:Math.max(4,Oe.samples),stencilBuffer:i,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:G.workingColorSpace})}let a=x.state.transmissionRenderTarget[r.id],o=r.viewport||ie;a.setSize(o.z*T.transmissionResolutionScale,o.w*T.transmissionResolutionScale);let s=T.getRenderTarget(),c=T.getActiveCubeFace(),l=T.getActiveMipmapLevel();T.setRenderTarget(a),T.getClearColor(se),ce=T.getClearAlpha(),ce<1&&T.setClearColor(16777215,.5),T.clear(),we&&Be.render(n);let u=T.toneMapping;T.toneMapping=0;let d=r.viewport;if(r.viewport!==void 0&&(r.viewport=void 0),x.setupLightsView(r),ve===!0&&Re.setGlobalState(T.clippingPlanes,r),ut(e,n,r),F.updateMultisampleRenderTarget(a),F.updateRenderTargetMipmap(a),De.has(`WEBGL_multisampled_render_to_texture`)===!1){let e=!1;for(let i=0,a=t.length;i<a;i++){let{object:a,geometry:o,material:s,group:c}=t[i];if(s.side===2&&a.layers.test(r.layers)){let t=s.side;s.side=1,s.needsUpdate=!0,dt(a,n,r,o,s,c),s.side=t,s.needsUpdate=!0,e=!0}}e===!0&&(F.updateMultisampleRenderTarget(a),F.updateRenderTargetMipmap(a))}T.setRenderTarget(s,c,l),T.setClearColor(se,ce),d!==void 0&&(r.viewport=d),T.toneMapping=u}function ut(e,t,n){let r=t.isScene===!0?t.overrideMaterial:null;for(let i=0,a=e.length;i<a;i++){let a=e[i],{object:o,geometry:s,group:c}=a,l=a.material;l.allowOverride===!0&&r!==null&&(l=r),o.layers.test(n.layers)&&dt(o,t,n,s,l,c)}}function dt(e,t,n,r,i,a){e.onBeforeRender(T,t,n,r,i,a),e.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse,e.matrixWorld),e.normalMatrix.getNormalMatrix(e.modelViewMatrix),i.onBeforeRender(T,t,n,r,e,a),i.transparent===!0&&i.side===2&&i.forceSinglePass===!1?(i.side=1,i.needsUpdate=!0,T.renderBufferDirect(n,t,r,i,e,a),i.side=0,i.needsUpdate=!0,T.renderBufferDirect(n,t,r,i,e,a),i.side=2):T.renderBufferDirect(n,t,r,i,e,a),e.onAfterRender(T,t,n,r,i,a)}function ft(e,t,n){t.isScene!==!0&&(t=Ce);let r=P.get(e),i=x.state.lights,a=x.state.shadowsArray,o=i.state.version,s=Pe.getParameters(e,i.state,a,t,n,x.state.lightProbeGridArray),c=Pe.getProgramCacheKey(s),l=r.programs;r.environment=e.isMeshStandardMaterial||e.isMeshLambertMaterial||e.isMeshPhongMaterial?t.environment:null,r.fog=t.fog;let u=e.isMeshStandardMaterial||e.isMeshLambertMaterial&&!e.envMap||e.isMeshPhongMaterial&&!e.envMap;r.envMap=Ae.get(e.envMap||r.environment,u),r.envMapRotation=r.environment!==null&&e.envMap===null?t.environmentRotation:e.envMapRotation,l===void 0&&(e.addEventListener(`dispose`,Qe),l=new Map,r.programs=l);let d=l.get(c);if(d!==void 0){if(r.currentProgram===d&&r.lightsStateVersion===o)return mt(e,s),d}else s.uniforms=Pe.getUniforms(e),D!==null&&e.isNodeMaterial&&D.build(e,n,s),e.onBeforeCompile(s,T),d=Pe.acquireProgram(s,c),l.set(c,d),r.uniforms=s.uniforms;let f=r.uniforms;return(!e.isShaderMaterial&&!e.isRawShaderMaterial||e.clipping===!0)&&(f.clippingPlanes=Re.uniform),mt(e,s),r.needsLights=vt(e),r.lightsStateVersion=o,r.needsLights&&(f.ambientLightColor.value=i.state.ambient,f.lightProbe.value=i.state.probe,f.directionalLights.value=i.state.directional,f.directionalLightShadows.value=i.state.directionalShadow,f.spotLights.value=i.state.spot,f.spotLightShadows.value=i.state.spotShadow,f.rectAreaLights.value=i.state.rectArea,f.ltc_1.value=i.state.rectAreaLTC1,f.ltc_2.value=i.state.rectAreaLTC2,f.pointLights.value=i.state.point,f.pointLightShadows.value=i.state.pointShadow,f.hemisphereLights.value=i.state.hemi,f.directionalShadowMatrix.value=i.state.directionalShadowMatrix,f.spotLightMatrix.value=i.state.spotLightMatrix,f.spotLightMap.value=i.state.spotLightMap,f.pointShadowMatrix.value=i.state.pointShadowMatrix),r.lightProbeGrid=x.state.lightProbeGridArray.length>0,r.currentProgram=d,r.uniformsList=null,d}function pt(e){if(e.uniformsList===null){let t=e.currentProgram.getUniforms();e.uniformsList=Nf.seqWithValue(t.seq,e.uniforms)}return e.uniformsList}function mt(e,t){let n=P.get(e);n.outputColorSpace=t.outputColorSpace,n.batching=t.batching,n.batchingColor=t.batchingColor,n.instancing=t.instancing,n.instancingColor=t.instancingColor,n.instancingMorph=t.instancingMorph,n.skinning=t.skinning,n.morphTargets=t.morphTargets,n.morphNormals=t.morphNormals,n.morphColors=t.morphColors,n.morphTargetsCount=t.morphTargetsCount,n.numClippingPlanes=t.numClippingPlanes,n.numIntersection=t.numClipIntersection,n.vertexAlphas=t.vertexAlphas,n.vertexTangents=t.vertexTangents,n.toneMapping=t.toneMapping}function ht(e,t){if(e.length===0)return null;if(e.length===1)return e[0].texture===null?null:e[0];y.setFromMatrixPosition(t.matrixWorld);for(let t=0,n=e.length;t<n;t++){let n=e[t];if(n.texture!==null&&n.boundingBox.containsPoint(y))return n}return null}function gt(e,t,n,r,i){t.isScene!==!0&&(t=Ce),F.resetTextureUnits();let a=t.fog,o=r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial?t.environment:null,s=j===null?T.outputColorSpace:j.isXRRenderTarget===!0?j.texture.colorSpace:G.workingColorSpace,c=r.isMeshStandardMaterial||r.isMeshLambertMaterial&&!r.envMap||r.isMeshPhongMaterial&&!r.envMap,l=Ae.get(r.envMap||o,c),u=r.vertexColors===!0&&!!n.attributes.color&&n.attributes.color.itemSize===4,d=!!n.attributes.tangent&&(!!r.normalMap||r.anisotropy>0),f=!!n.morphAttributes.position,p=!!n.morphAttributes.normal,m=!!n.morphAttributes.color,h=0;r.toneMapped&&(j===null||j.isXRRenderTarget===!0)&&(h=T.toneMapping);let g=n.morphAttributes.position||n.morphAttributes.normal||n.morphAttributes.color,_=g===void 0?0:g.length,v=P.get(r),y=x.state.lights;if(ve===!0&&(ye===!0||e!==re)){let t=e===re&&r.id===ne;Re.setState(r,e,t)}let b=!1;r.version===v.__version?v.needsLights&&v.lightsStateVersion!==y.state.version?b=!0:v.outputColorSpace===s?i.isBatchedMesh&&v.batching===!1||!i.isBatchedMesh&&v.batching===!0||i.isBatchedMesh&&v.batchingColor===!0&&i.colorTexture===null||i.isBatchedMesh&&v.batchingColor===!1&&i.colorTexture!==null||i.isInstancedMesh&&v.instancing===!1||!i.isInstancedMesh&&v.instancing===!0||i.isSkinnedMesh&&v.skinning===!1||!i.isSkinnedMesh&&v.skinning===!0||i.isInstancedMesh&&v.instancingColor===!0&&i.instanceColor===null||i.isInstancedMesh&&v.instancingColor===!1&&i.instanceColor!==null||i.isInstancedMesh&&v.instancingMorph===!0&&i.morphTexture===null||i.isInstancedMesh&&v.instancingMorph===!1&&i.morphTexture!==null?b=!0:v.envMap===l?r.fog===!0&&v.fog!==a||v.numClippingPlanes!==void 0&&(v.numClippingPlanes!==Re.numPlanes||v.numIntersection!==Re.numIntersection)?b=!0:v.vertexAlphas===u&&v.vertexTangents===d&&v.morphTargets===f&&v.morphNormals===p&&v.morphColors===m&&v.toneMapping===h&&v.morphTargetsCount===_?!!v.lightProbeGrid!=x.state.lightProbeGridArray.length>0&&(b=!0):b=!0:b=!0:b=!0:(b=!0,v.__version=r.version);let S=v.currentProgram;b===!0&&(S=ft(r,t,i),D&&r.isNodeMaterial&&D.onUpdateProgram(r,S,v));let C=!1,w=!1,E=!1,O=S.getUniforms(),k=v.uniforms;if(N.useProgram(S.program)&&(C=!0,w=!0,E=!0),r.id!==ne&&(ne=r.id,w=!0),v.needsLights){let e=ht(x.state.lightProbeGridArray,i);v.lightProbeGrid!==e&&(v.lightProbeGrid=e,w=!0)}if(C||re!==e){N.buffers.depth.getReversed()&&e.reversedDepth!==!0&&(e._reversedDepth=!0,e.updateProjectionMatrix()),O.setValue(M,`projectionMatrix`,e.projectionMatrix),O.setValue(M,`viewMatrix`,e.matrixWorldInverse);let t=O.map.cameraPosition;t!==void 0&&t.setValue(M,xe.setFromMatrixPosition(e.matrixWorld)),Oe.logarithmicDepthBuffer&&O.setValue(M,`logDepthBufFC`,2/(Math.log(e.far+1)/Math.LN2)),(r.isMeshPhongMaterial||r.isMeshToonMaterial||r.isMeshLambertMaterial||r.isMeshBasicMaterial||r.isMeshStandardMaterial||r.isShaderMaterial)&&O.setValue(M,`isOrthographic`,e.isOrthographicCamera===!0),re!==e&&(re=e,w=!0,E=!0)}if(v.needsLights&&(y.state.directionalShadowMap.length>0&&O.setValue(M,`directionalShadowMap`,y.state.directionalShadowMap,F),y.state.spotShadowMap.length>0&&O.setValue(M,`spotShadowMap`,y.state.spotShadowMap,F),y.state.pointShadowMap.length>0&&O.setValue(M,`pointShadowMap`,y.state.pointShadowMap,F)),i.isSkinnedMesh){O.setOptional(M,i,`bindMatrix`),O.setOptional(M,i,`bindMatrixInverse`);let e=i.skeleton;e&&(e.boneTexture===null&&e.computeBoneTexture(),O.setValue(M,`boneTexture`,e.boneTexture,F))}i.isBatchedMesh&&(O.setOptional(M,i,`batchingTexture`),O.setValue(M,`batchingTexture`,i._matricesTexture,F),O.setOptional(M,i,`batchingIdTexture`),O.setValue(M,`batchingIdTexture`,i._indirectTexture,F),O.setOptional(M,i,`batchingColorTexture`),i._colorsTexture!==null&&O.setValue(M,`batchingColorTexture`,i._colorsTexture,F));let A=n.morphAttributes;if((A.position!==void 0||A.normal!==void 0||A.color!==void 0)&&Ve.update(i,n,S),(w||v.receiveShadow!==i.receiveShadow)&&(v.receiveShadow=i.receiveShadow,O.setValue(M,`receiveShadow`,i.receiveShadow)),(r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial)&&r.envMap===null&&t.environment!==null&&(k.envMapIntensity.value=t.environmentIntensity),k.dfgLUT!==void 0&&(k.dfgLUT.value=em()),w){if(O.setValue(M,`toneMappingExposure`,T.toneMappingExposure),v.needsLights&&_t(k,E),a&&r.fog===!0&&Fe.refreshFogUniforms(k,a),Fe.refreshMaterialUniforms(k,r,de,ue,x.state.transmissionRenderTarget[e.id]),v.needsLights&&v.lightProbeGrid){let e=v.lightProbeGrid;k.probesSH.value=e.texture,k.probesMin.value.copy(e.boundingBox.min),k.probesMax.value.copy(e.boundingBox.max),k.probesResolution.value.copy(e.resolution)}Nf.upload(M,pt(v),k,F)}if(r.isShaderMaterial&&r.uniformsNeedUpdate===!0&&(Nf.upload(M,pt(v),k,F),r.uniformsNeedUpdate=!1),r.isSpriteMaterial&&O.setValue(M,`center`,i.center),O.setValue(M,`modelViewMatrix`,i.modelViewMatrix),O.setValue(M,`normalMatrix`,i.normalMatrix),O.setValue(M,`modelMatrix`,i.matrixWorld),r.uniformsGroups!==void 0){let e=r.uniformsGroups;for(let t=0,n=e.length;t<n;t++){let n=e[t];Ke.update(n,S),Ke.bind(n,S)}}return S}function _t(e,t){e.ambientLightColor.needsUpdate=t,e.lightProbe.needsUpdate=t,e.directionalLights.needsUpdate=t,e.directionalLightShadows.needsUpdate=t,e.pointLights.needsUpdate=t,e.pointLightShadows.needsUpdate=t,e.spotLights.needsUpdate=t,e.spotLightShadows.needsUpdate=t,e.rectAreaLights.needsUpdate=t,e.hemisphereLights.needsUpdate=t}function vt(e){return e.isMeshLambertMaterial||e.isMeshToonMaterial||e.isMeshPhongMaterial||e.isMeshStandardMaterial||e.isShadowMaterial||e.isShaderMaterial&&e.lights===!0}this.getActiveCubeFace=function(){return ee},this.getActiveMipmapLevel=function(){return te},this.getRenderTarget=function(){return j},this.setRenderTargetTextures=function(e,t,n){let r=P.get(e);r.__autoAllocateDepthBuffer=e.resolveDepthBuffer===!1,r.__autoAllocateDepthBuffer===!1&&(r.__useRenderToTexture=!1),P.get(e.texture).__webglTexture=t,P.get(e.depthTexture).__webglTexture=r.__autoAllocateDepthBuffer?void 0:n,r.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(e,t){let n=P.get(e);n.__webglFramebuffer=t,n.__useDefaultFramebuffer=t===void 0},this.setRenderTarget=function(e,t=0,n=0){j=e,ee=t,te=n;let r=null,i=!1,a=!1;if(e){let o=P.get(e);if(o.__useDefaultFramebuffer!==void 0){N.bindFramebuffer(M.FRAMEBUFFER,o.__webglFramebuffer),ie.copy(e.viewport),ae.copy(e.scissor),oe=e.scissorTest,N.viewport(ie),N.scissor(ae),N.setScissorTest(oe),ne=-1;return}if(o.__webglFramebuffer===void 0)F.setupRenderTarget(e);else if(o.__hasExternalTextures)F.rebindTextures(e,P.get(e.texture).__webglTexture,P.get(e.depthTexture).__webglTexture);else if(e.depthBuffer){let t=e.depthTexture;if(o.__boundDepthTexture!==t){if(t!==null&&P.has(t)&&(e.width!==t.image.width||e.height!==t.image.height))throw Error(`THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.`);F.setupDepthRenderbuffer(e)}}let s=e.texture;(s.isData3DTexture||s.isDataArrayTexture||s.isCompressedArrayTexture)&&(a=!0);let c=P.get(e).__webglFramebuffer;e.isWebGLCubeRenderTarget?(r=Array.isArray(c[t])?c[t][n]:c[t],i=!0):r=e.samples>0&&F.useMultisampledRTT(e)===!1?P.get(e).__webglMultisampledFramebuffer:Array.isArray(c)?c[n]:c,ie.copy(e.viewport),ae.copy(e.scissor),oe=e.scissorTest}else ie.copy(me).multiplyScalar(de).floor(),ae.copy(he).multiplyScalar(de).floor(),oe=ge;if(n!==0&&(r=O),N.bindFramebuffer(M.FRAMEBUFFER,r)&&N.drawBuffers(e,r),N.viewport(ie),N.scissor(ae),N.setScissorTest(oe),i){let r=P.get(e.texture);M.framebufferTexture2D(M.FRAMEBUFFER,M.COLOR_ATTACHMENT0,M.TEXTURE_CUBE_MAP_POSITIVE_X+t,r.__webglTexture,n)}else if(a){let r=t;for(let t=0;t<e.textures.length;t++){let i=P.get(e.textures[t]);M.framebufferTextureLayer(M.FRAMEBUFFER,M.COLOR_ATTACHMENT0+t,i.__webglTexture,n,r)}}else if(e!==null&&n!==0){let t=P.get(e.texture);M.framebufferTexture2D(M.FRAMEBUFFER,M.COLOR_ATTACHMENT0,M.TEXTURE_2D,t.__webglTexture,n)}ne=-1},this.readRenderTargetPixels=function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget)){B(`WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);return}let c=P.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){N.bindFramebuffer(M.FRAMEBUFFER,c);try{let o=e.textures[s],c=o.format,l=o.type;if(e.textures.length>1&&M.readBuffer(M.COLOR_ATTACHMENT0+s),!Oe.textureFormatReadable(c)){B(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.`);return}if(!Oe.textureTypeReadable(l)){B(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.`);return}t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i&&M.readPixels(t,n,r,i,We.convert(c),We.convert(l),a)}finally{let e=j===null?null:P.get(j).__webglFramebuffer;N.bindFramebuffer(M.FRAMEBUFFER,e)}}},this.readRenderTargetPixelsAsync=async function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget))throw Error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);let c=P.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){if(t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i){N.bindFramebuffer(M.FRAMEBUFFER,c);let o=e.textures[s],l=o.format,u=o.type;if(e.textures.length>1&&M.readBuffer(M.COLOR_ATTACHMENT0+s),!Oe.textureFormatReadable(l))throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.`);if(!Oe.textureTypeReadable(u))throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.`);let d=M.createBuffer();M.bindBuffer(M.PIXEL_PACK_BUFFER,d),M.bufferData(M.PIXEL_PACK_BUFFER,a.byteLength,M.STREAM_READ),M.readPixels(t,n,r,i,We.convert(l),We.convert(u),0);let f=j===null?null:P.get(j).__webglFramebuffer;N.bindFramebuffer(M.FRAMEBUFFER,f);let p=M.fenceSync(M.SYNC_GPU_COMMANDS_COMPLETE,0);return M.flush(),await Ki(M,p,4),M.bindBuffer(M.PIXEL_PACK_BUFFER,d),M.getBufferSubData(M.PIXEL_PACK_BUFFER,0,a),M.deleteBuffer(d),M.deleteSync(p),a}throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.`)}},this.copyFramebufferToTexture=function(e,t=null,n=0){let r=2**-n,i=Math.floor(e.image.width*r),a=Math.floor(e.image.height*r),o=t===null?0:t.x,s=t===null?0:t.y;F.setTexture2D(e,0),M.copyTexSubImage2D(M.TEXTURE_2D,n,0,0,o,s,i,a),N.unbindTexture()},this.copyTextureToTexture=function(e,t,n=null,r=null,i=0,a=0){let o,s,c,l,u,d,f,p,m,h=e.isCompressedTexture?e.mipmaps[a]:e.image;if(n!==null)o=n.max.x-n.min.x,s=n.max.y-n.min.y,c=n.isBox3?n.max.z-n.min.z:1,l=n.min.x,u=n.min.y,d=n.isBox3?n.min.z:0;else{let t=2**-i;o=Math.floor(h.width*t),s=Math.floor(h.height*t),c=e.isDataArrayTexture?h.depth:e.isData3DTexture?Math.floor(h.depth*t):1,l=0,u=0,d=0}r===null?(f=0,p=0,m=0):(f=r.x,p=r.y,m=r.z);let g=We.convert(t.format),_=We.convert(t.type),v;t.isData3DTexture?(F.setTexture3D(t,0),v=M.TEXTURE_3D):t.isDataArrayTexture||t.isCompressedArrayTexture?(F.setTexture2DArray(t,0),v=M.TEXTURE_2D_ARRAY):(F.setTexture2D(t,0),v=M.TEXTURE_2D),N.activeTexture(M.TEXTURE0),N.pixelStorei(M.UNPACK_FLIP_Y_WEBGL,t.flipY),N.pixelStorei(M.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),N.pixelStorei(M.UNPACK_ALIGNMENT,t.unpackAlignment);let y=N.getParameter(M.UNPACK_ROW_LENGTH),b=N.getParameter(M.UNPACK_IMAGE_HEIGHT),x=N.getParameter(M.UNPACK_SKIP_PIXELS),S=N.getParameter(M.UNPACK_SKIP_ROWS),C=N.getParameter(M.UNPACK_SKIP_IMAGES);N.pixelStorei(M.UNPACK_ROW_LENGTH,h.width),N.pixelStorei(M.UNPACK_IMAGE_HEIGHT,h.height),N.pixelStorei(M.UNPACK_SKIP_PIXELS,l),N.pixelStorei(M.UNPACK_SKIP_ROWS,u),N.pixelStorei(M.UNPACK_SKIP_IMAGES,d);let w=e.isDataArrayTexture||e.isData3DTexture,T=t.isDataArrayTexture||t.isData3DTexture;if(e.isDepthTexture){let n=P.get(e),r=P.get(t),h=P.get(n.__renderTarget),g=P.get(r.__renderTarget);N.bindFramebuffer(M.READ_FRAMEBUFFER,h.__webglFramebuffer),N.bindFramebuffer(M.DRAW_FRAMEBUFFER,g.__webglFramebuffer);for(let n=0;n<c;n++)w&&(M.framebufferTextureLayer(M.READ_FRAMEBUFFER,M.COLOR_ATTACHMENT0,P.get(e).__webglTexture,i,d+n),M.framebufferTextureLayer(M.DRAW_FRAMEBUFFER,M.COLOR_ATTACHMENT0,P.get(t).__webglTexture,a,m+n)),M.blitFramebuffer(l,u,o,s,f,p,o,s,M.DEPTH_BUFFER_BIT,M.NEAREST);N.bindFramebuffer(M.READ_FRAMEBUFFER,null),N.bindFramebuffer(M.DRAW_FRAMEBUFFER,null)}else if(i!==0||e.isRenderTargetTexture||P.has(e)){let n=P.get(e),r=P.get(t);N.bindFramebuffer(M.READ_FRAMEBUFFER,k),N.bindFramebuffer(M.DRAW_FRAMEBUFFER,A);for(let e=0;e<c;e++)w?M.framebufferTextureLayer(M.READ_FRAMEBUFFER,M.COLOR_ATTACHMENT0,n.__webglTexture,i,d+e):M.framebufferTexture2D(M.READ_FRAMEBUFFER,M.COLOR_ATTACHMENT0,M.TEXTURE_2D,n.__webglTexture,i),T?M.framebufferTextureLayer(M.DRAW_FRAMEBUFFER,M.COLOR_ATTACHMENT0,r.__webglTexture,a,m+e):M.framebufferTexture2D(M.DRAW_FRAMEBUFFER,M.COLOR_ATTACHMENT0,M.TEXTURE_2D,r.__webglTexture,a),i===0?T?M.copyTexSubImage3D(v,a,f,p,m+e,l,u,o,s):M.copyTexSubImage2D(v,a,f,p,l,u,o,s):M.blitFramebuffer(l,u,o,s,f,p,o,s,M.COLOR_BUFFER_BIT,M.NEAREST);N.bindFramebuffer(M.READ_FRAMEBUFFER,null),N.bindFramebuffer(M.DRAW_FRAMEBUFFER,null)}else T?e.isDataTexture||e.isData3DTexture?M.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h.data):t.isCompressedArrayTexture?M.compressedTexSubImage3D(v,a,f,p,m,o,s,c,g,h.data):M.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h):e.isDataTexture?M.texSubImage2D(M.TEXTURE_2D,a,f,p,o,s,g,_,h.data):e.isCompressedTexture?M.compressedTexSubImage2D(M.TEXTURE_2D,a,f,p,h.width,h.height,g,h.data):M.texSubImage2D(M.TEXTURE_2D,a,f,p,o,s,g,_,h);N.pixelStorei(M.UNPACK_ROW_LENGTH,y),N.pixelStorei(M.UNPACK_IMAGE_HEIGHT,b),N.pixelStorei(M.UNPACK_SKIP_PIXELS,x),N.pixelStorei(M.UNPACK_SKIP_ROWS,S),N.pixelStorei(M.UNPACK_SKIP_IMAGES,C),a===0&&t.generateMipmaps&&M.generateMipmap(v),N.unbindTexture()},this.initRenderTarget=function(e){P.get(e).__webglFramebuffer===void 0&&F.setupRenderTarget(e)},this.initTexture=function(e){e.isCubeTexture?F.setTextureCube(e,0):e.isData3DTexture?F.setTexture3D(e,0):e.isDataArrayTexture||e.isCompressedArrayTexture?F.setTexture2DArray(e,0):F.setTexture2D(e,0),N.unbindTexture()},this.resetState=function(){ee=0,te=0,j=null,N.reset(),Ge.reset()},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}get coordinateSystem(){return Li}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=G._getDrawingBufferColorSpace(e),t.unpackColorSpace=G._getUnpackColorSpace()}},nm=class e extends J{constructor(){let t=e.SkyShader,n=new pl({name:t.name,uniforms:ul.clone(t.uniforms),vertexShader:t.vertexShader,fragmentShader:t.fragmentShader,side:1,depthWrite:!1});super(new Y(1,1,1),n),this.isSky=!0}};nm.SkyShader={name:`SkyShader`,uniforms:{turbidity:{value:2},rayleigh:{value:1},mieCoefficient:{value:.005},mieDirectionalG:{value:.8},sunPosition:{value:new U},up:{value:new U(0,1,0)},cloudScale:{value:2e-4},cloudSpeed:{value:1e-4},cloudCoverage:{value:.4},cloudDensity:{value:.4},cloudElevation:{value:.5},showSunDisc:{value:1},time:{value:0}},vertexShader:`
		uniform vec3 sunPosition;
		uniform float rayleigh;
		uniform float turbidity;
		uniform float mieCoefficient;
		uniform vec3 up;

		varying vec3 vWorldPosition;
		varying vec3 vSunDirection;
		varying float vSunfade;
		varying vec3 vBetaR;
		varying vec3 vBetaM;
		varying float vSunE;

		// constants for atmospheric scattering
		const float e = 2.71828182845904523536028747135266249775724709369995957;
		const float pi = 3.141592653589793238462643383279502884197169;

		// wavelength of used primaries, according to preetham
		const vec3 lambda = vec3( 680E-9, 550E-9, 450E-9 );
		// this pre-calculation replaces older TotalRayleigh(vec3 lambda) function:
		// (8.0 * pow(pi, 3.0) * pow(pow(n, 2.0) - 1.0, 2.0) * (6.0 + 3.0 * pn)) / (3.0 * N * pow(lambda, vec3(4.0)) * (6.0 - 7.0 * pn))
		const vec3 totalRayleigh = vec3( 5.804542996261093E-6, 1.3562911419845635E-5, 3.0265902468824876E-5 );

		// mie stuff
		// K coefficient for the primaries
		const float v = 4.0;
		const vec3 K = vec3( 0.686, 0.678, 0.666 );
		// MieConst = pi * pow( ( 2.0 * pi ) / lambda, vec3( v - 2.0 ) ) * K
		const vec3 MieConst = vec3( 1.8399918514433978E14, 2.7798023919660528E14, 4.0790479543861094E14 );

		// earth shadow hack
		// cutoffAngle = pi / 1.95;
		const float cutoffAngle = 1.6110731556870734;
		const float steepness = 1.5;
		const float EE = 1000.0;

		float sunIntensity( float zenithAngleCos ) {
			zenithAngleCos = clamp( zenithAngleCos, -1.0, 1.0 );
			return EE * max( 0.0, 1.0 - pow( e, -( ( cutoffAngle - acos( zenithAngleCos ) ) / steepness ) ) );
		}

		vec3 totalMie( float T ) {
			float c = ( 0.2 * T ) * 10E-18;
			return 0.434 * c * MieConst;
		}

		void main() {

			vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
			vWorldPosition = worldPosition.xyz;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			gl_Position.z = gl_Position.w; // set z to camera.far

			vSunDirection = normalize( sunPosition );

			vSunE = sunIntensity( dot( vSunDirection, up ) );

			vSunfade = 1.0 - clamp( 1.0 - exp( ( sunPosition.y / 450000.0 ) ), 0.0, 1.0 );

			float rayleighCoefficient = rayleigh - ( 1.0 * ( 1.0 - vSunfade ) );

			// extinction (absorption + out scattering)
			// rayleigh coefficients
			vBetaR = totalRayleigh * rayleighCoefficient;

			// mie coefficients
			vBetaM = totalMie( turbidity ) * mieCoefficient;

		}`,fragmentShader:`
		varying vec3 vWorldPosition;
		varying vec3 vSunDirection;
		varying vec3 vBetaR;
		varying vec3 vBetaM;
		varying float vSunE;

		uniform float mieDirectionalG;
		uniform vec3 up;
		uniform float cloudScale;
		uniform float cloudSpeed;
		uniform float cloudCoverage;
		uniform float cloudDensity;
		uniform float cloudElevation;
		uniform float showSunDisc;
		uniform float time;

		// Cloud noise functions
		float hash( vec2 p ) {
			return fract( sin( dot( p, vec2( 127.1, 311.7 ) ) ) * 43758.5453123 );
		}

		float noise( vec2 p ) {
			vec2 i = floor( p );
			vec2 f = fract( p );
			f = f * f * ( 3.0 - 2.0 * f );
			float a = hash( i );
			float b = hash( i + vec2( 1.0, 0.0 ) );
			float c = hash( i + vec2( 0.0, 1.0 ) );
			float d = hash( i + vec2( 1.0, 1.0 ) );
			return mix( mix( a, b, f.x ), mix( c, d, f.x ), f.y );
		}

		float fbm( vec2 p ) {
			float value = 0.0;
			float amplitude = 0.5;
			for ( int i = 0; i < 5; i ++ ) {
				value += amplitude * noise( p );
				p *= 2.0;
				amplitude *= 0.5;
			}
			return value;
		}

		// constants for atmospheric scattering
		const float pi = 3.141592653589793238462643383279502884197169;

		const float n = 1.0003; // refractive index of air
		const float N = 2.545E25; // number of molecules per unit volume for air at 288.15K and 1013mb (sea level -45 celsius)

		// optical length at zenith for molecules
		const float rayleighZenithLength = 8.4E3;
		const float mieZenithLength = 1.25E3;
		// 66 arc seconds -> degrees, and the cosine of that
		const float sunAngularDiameterCos = 0.999956676946448443553574619906976478926848692873900859324;

		// 3.0 / ( 16.0 * pi )
		const float THREE_OVER_SIXTEENPI = 0.05968310365946075;
		// 1.0 / ( 4.0 * pi )
		const float ONE_OVER_FOURPI = 0.07957747154594767;

		float rayleighPhase( float cosTheta ) {
			return THREE_OVER_SIXTEENPI * ( 1.0 + pow( cosTheta, 2.0 ) );
		}

		float hgPhase( float cosTheta, float g ) {
			float g2 = pow( g, 2.0 );
			float inverse = 1.0 / pow( 1.0 - 2.0 * g * cosTheta + g2, 1.5 );
			return ONE_OVER_FOURPI * ( ( 1.0 - g2 ) * inverse );
		}

		void main() {

			vec3 direction = normalize( vWorldPosition - cameraPosition );

			// optical length
			// cutoff angle at 90 to avoid singularity in next formula.
			float zenithAngle = acos( max( 0.0, dot( up, direction ) ) );
			float inverse = 1.0 / ( cos( zenithAngle ) + 0.15 * pow( 93.885 - ( ( zenithAngle * 180.0 ) / pi ), -1.253 ) );
			float sR = rayleighZenithLength * inverse;
			float sM = mieZenithLength * inverse;

			// combined extinction factor
			vec3 Fex = exp( -( vBetaR * sR + vBetaM * sM ) );

			// in scattering
			float cosTheta = dot( direction, vSunDirection );

			float rPhase = rayleighPhase( cosTheta * 0.5 + 0.5 );
			vec3 betaRTheta = vBetaR * rPhase;

			float mPhase = hgPhase( cosTheta, mieDirectionalG );
			vec3 betaMTheta = vBetaM * mPhase;

			vec3 Lin = pow( vSunE * ( ( betaRTheta + betaMTheta ) / ( vBetaR + vBetaM ) ) * ( 1.0 - Fex ), vec3( 1.5 ) );
			Lin *= mix( vec3( 1.0 ), pow( vSunE * ( ( betaRTheta + betaMTheta ) / ( vBetaR + vBetaM ) ) * Fex, vec3( 1.0 / 2.0 ) ), clamp( pow( 1.0 - dot( up, vSunDirection ), 5.0 ), 0.0, 1.0 ) );

			// nightsky
			float theta = acos( direction.y ); // elevation --> y-axis, [-pi/2, pi/2]
			float phi = atan( direction.z, direction.x ); // azimuth --> x-axis [-pi/2, pi/2]
			vec2 uv = vec2( phi, theta ) / vec2( 2.0 * pi, pi ) + vec2( 0.5, 0.0 );
			vec3 L0 = vec3( 0.1 ) * Fex;

			// composition + solar disc
			float sundisc = smoothstep( sunAngularDiameterCos, sunAngularDiameterCos + 0.00002, cosTheta ) * showSunDisc;
			L0 += ( vSunE * 19000.0 * Fex ) * sundisc;

			vec3 texColor = ( Lin + L0 ) * 0.04 + vec3( 0.0, 0.0003, 0.00075 );

			// Clouds
			if ( direction.y > 0.0 && cloudCoverage > 0.0 ) {

				// Project to cloud plane (higher elevation = clouds appear lower/closer)
				float elevation = mix( 1.0, 0.1, cloudElevation );
				vec2 cloudUV = direction.xz / ( direction.y * elevation );
				cloudUV *= cloudScale;
				cloudUV += time * cloudSpeed;

				// Multi-octave noise for fluffy clouds
				float cloudNoise = fbm( cloudUV * 1000.0 );
				cloudNoise += 0.5 * fbm( cloudUV * 2000.0 + 3.7 );
				cloudNoise = cloudNoise * 0.5 + 0.5;

				// Apply coverage threshold
				float cloudMask = smoothstep( 1.0 - cloudCoverage, 1.0 - cloudCoverage + 0.3, cloudNoise );

				// Fade clouds near horizon (adjusted by elevation)
				float horizonFade = smoothstep( 0.0, 0.1 + 0.2 * cloudElevation, direction.y );
				cloudMask *= horizonFade;

				// Cloud lighting based on sun position
				float sunInfluence = dot( direction, vSunDirection ) * 0.5 + 0.5;
				float daylight = max( 0.0, vSunDirection.y * 2.0 );

				// Base cloud color affected by atmosphere
				vec3 atmosphereColor = Lin * 0.04;
				vec3 cloudColor = mix( vec3( 0.3 ), vec3( 1.0 ), daylight );
				cloudColor = mix( cloudColor, atmosphereColor + vec3( 1.0 ), sunInfluence * 0.5 );
				cloudColor *= vSunE * 0.00002;

				// Blend clouds with sky
				texColor = mix( texColor, cloudColor, cloudMask * cloudDensity );

			}

			gl_FragColor = vec4( texColor, 1.0 );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>

		}`};var rm={name:`CopyShader`,uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`},im=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error(`THREE.Pass: .render() must be implemented in derived pass.`)}dispose(){}},am=new fu(-1,1,1,-1,0,1),om=new class extends bs{constructor(){super(),this.setAttribute(`position`,new cs([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute(`uv`,new cs([0,2,0,0,2,0],2))}},sm=class{constructor(e){this._mesh=new J(om,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,am)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}},cm=class extends im{constructor(e,t=`tDiffuse`){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof pl?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=ul.clone(e.uniforms),this.material=new pl({name:e.name===void 0?`unspecified`:e.name,defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new sm(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}},lm=class extends im{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){let r=e.getContext(),i=e.state;i.buffers.color.setMask(!1),i.buffers.depth.setMask(!1),i.buffers.color.setLocked(!0),i.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),i.buffers.stencil.setTest(!0),i.buffers.stencil.setOp(r.REPLACE,r.REPLACE,r.REPLACE),i.buffers.stencil.setFunc(r.ALWAYS,a,4294967295),i.buffers.stencil.setClear(o),i.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),i.buffers.color.setLocked(!1),i.buffers.depth.setLocked(!1),i.buffers.color.setMask(!0),i.buffers.depth.setMask(!0),i.buffers.stencil.setLocked(!1),i.buffers.stencil.setFunc(r.EQUAL,1,4294967295),i.buffers.stencil.setOp(r.KEEP,r.KEEP,r.KEEP),i.buffers.stencil.setLocked(!0)}},um=class extends im{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}},dm=class{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){let n=e.getSize(new H);this._width=n.width,this._height=n.height,t=new Ba(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:wr}),t.texture.name=`EffectComposer.rt1`}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name=`EffectComposer.rt2`,this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new cm(rm),this.copyPass.material.blending=0,this.timer=new Cu}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());let t=this.renderer.getRenderTarget(),n=!1;for(let t=0,r=this.passes.length;t<r;t++){let r=this.passes[t];if(r.enabled!==!1){if(r.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(t),r.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),r.needsSwap){if(n){let t=this.renderer.getContext(),n=this.renderer.state.buffers.stencil;n.setFunc(t.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),n.setFunc(t.EQUAL,1,4294967295)}this.swapBuffers()}lm!==void 0&&(r instanceof lm?n=!0:r instanceof um&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){let t=this.renderer.getSize(new H);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;let n=this._width*this._pixelRatio,r=this._height*this._pixelRatio;this.renderTarget1.setSize(n,r),this.renderTarget2.setSize(n,r);for(let e=0;e<this.passes.length;e++)this.passes[e].setSize(n,r)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}},fm=class extends im{constructor(e,t,n=null,r=null,i=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=r,this.clearAlpha=i,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new q}render(e,t,n){let r=e.autoClear;e.autoClear=!1;let i,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(i=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==1&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(i),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=r}},pm={name:`LuminosityHighPassShader`,uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new q(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`},mm=class e extends im{constructor(e,t=1,n,r){super(),this.strength=t,this.radius=n,this.threshold=r,this.resolution=e===void 0?new H(256,256):new H(e.x,e.y),this.clearColor=new q(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let i=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new Ba(i,a,{type:wr}),this.renderTargetBright.texture.name=`UnrealBloomPass.bright`,this.renderTargetBright.texture.generateMipmaps=!1;for(let e=0;e<this.nMips;e++){let t=new Ba(i,a,{type:wr});t.texture.name=`UnrealBloomPass.h`+e,t.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(t);let n=new Ba(i,a,{type:wr});n.texture.name=`UnrealBloomPass.v`+e,n.texture.generateMipmaps=!1,this.renderTargetsVertical.push(n),i=Math.round(i/2),a=Math.round(a/2)}let o=pm;this.highPassUniforms=ul.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=r,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new pl({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];let s=[6,10,14,18,22];i=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let e=0;e<this.nMips;e++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(s[e])),this.separableBlurMaterials[e].uniforms.invSize.value=new H(1/i,1/a),i=Math.round(i/2),a=Math.round(a/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;let c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new U(1,1,1),new U(1,1,1),new U(1,1,1),new U(1,1,1),new U(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=ul.clone(rm.uniforms),this.blendMaterial=new pl({uniforms:this.copyUniforms,vertexShader:rm.vertexShader,fragmentShader:rm.fragmentShader,premultipliedAlpha:!0,blending:2,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new q,this._oldClearAlpha=1,this._basic=new Ps,this._fsQuad=new sm(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),r=Math.round(t/2);this.renderTargetBright.setSize(n,r);for(let e=0;e<this.nMips;e++)this.renderTargetsHorizontal[e].setSize(n,r),this.renderTargetsVertical[e].setSize(n,r),this.separableBlurMaterials[e].uniforms.invSize.value=new H(1/n,1/r),n=Math.round(n/2),r=Math.round(r/2)}render(t,n,r,i,a){t.getClearColor(this._oldClearColor),this._oldClearAlpha=t.getClearAlpha();let o=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),a&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=r.texture,t.setRenderTarget(null),t.clear(),this._fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=r.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this._fsQuad.render(t);let s=this.renderTargetBright;for(let n=0;n<this.nMips;n++)this._fsQuad.material=this.separableBlurMaterials[n],this.separableBlurMaterials[n].uniforms.colorTexture.value=s.texture,this.separableBlurMaterials[n].uniforms.direction.value=e.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[n]),t.clear(),this._fsQuad.render(t),this.separableBlurMaterials[n].uniforms.colorTexture.value=this.renderTargetsHorizontal[n].texture,this.separableBlurMaterials[n].uniforms.direction.value=e.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[n]),t.clear(),this._fsQuad.render(t),s=this.renderTargetsVertical[n];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this._fsQuad.render(t),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,a&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(r),this._fsQuad.render(t)),t.setClearColor(this._oldClearColor,this._oldClearAlpha),t.autoClear=o}_getSeparableBlurMaterial(e){let t=[],n=e/3;for(let r=0;r<e;r++)t.push(.39894*Math.exp(-.5*r*r/(n*n))/n);return new pl({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new H(.5,.5)},direction:{value:new H(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				#include <common>

				varying vec2 vUv;

				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {

					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;

					for ( int i = 1; i < KERNEL_RADIUS; i ++ ) {

						float x = float( i );
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += ( sample1 + sample2 ) * w;

					}

					gl_FragColor = vec4( diffuseSum, 1.0 );

				}`})}_getCompositeMaterial(e){return new pl({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				varying vec2 vUv;

				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor( const in float factor ) {

					float mirrorFactor = 1.2 - factor;
					return mix( factor, mirrorFactor, bloomRadius );

				}

				void main() {

					// 3.0 for backwards compatibility with previous alpha-based intensity
					vec3 bloom = 3.0 * bloomStrength * (
						lerpBloomFactor( bloomFactors[ 0 ] ) * bloomTintColors[ 0 ] * texture2D( blurTexture1, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 1 ] ) * bloomTintColors[ 1 ] * texture2D( blurTexture2, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 2 ] ) * bloomTintColors[ 2 ] * texture2D( blurTexture3, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 3 ] ) * bloomTintColors[ 3 ] * texture2D( blurTexture4, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 4 ] ) * bloomTintColors[ 4 ] * texture2D( blurTexture5, vUv ).rgb
					);

					float bloomAlpha = max( bloom.r, max( bloom.g, bloom.b ) );
					gl_FragColor = vec4( bloom, bloomAlpha );

				}`})}};mm.BlurDirectionX=new H(1,0),mm.BlurDirectionY=new H(0,1);var hm={name:`SMAAEdgesShader`,defines:{SMAA_THRESHOLD:`0.1`},uniforms:{tDiffuse:{value:null},resolution:{value:new H(1/1024,1/512)}},vertexShader:`

		uniform vec2 resolution;

		varying vec2 vUv;
		varying vec4 vOffset[ 3 ];

		void SMAAEdgeDetectionVS( vec2 texcoord ) {
			vOffset[ 0 ] = texcoord.xyxy + resolution.xyxy * vec4( -1.0, 0.0, 0.0,  1.0 ); // WebGL port note: Changed sign in W component
			vOffset[ 1 ] = texcoord.xyxy + resolution.xyxy * vec4(  1.0, 0.0, 0.0, -1.0 ); // WebGL port note: Changed sign in W component
			vOffset[ 2 ] = texcoord.xyxy + resolution.xyxy * vec4( -2.0, 0.0, 0.0,  2.0 ); // WebGL port note: Changed sign in W component
		}

		void main() {

			vUv = uv;

			SMAAEdgeDetectionVS( vUv );

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;

		varying vec2 vUv;
		varying vec4 vOffset[ 3 ];

		vec4 SMAAColorEdgeDetectionPS( vec2 texcoord, vec4 offset[3], sampler2D colorTex ) {
			vec2 threshold = vec2( SMAA_THRESHOLD, SMAA_THRESHOLD );

			// Calculate color deltas:
			vec4 delta;
			vec3 C = texture2D( colorTex, texcoord ).rgb;

			vec3 Cleft = texture2D( colorTex, offset[0].xy ).rgb;
			vec3 t = abs( C - Cleft );
			delta.x = max( max( t.r, t.g ), t.b );

			vec3 Ctop = texture2D( colorTex, offset[0].zw ).rgb;
			t = abs( C - Ctop );
			delta.y = max( max( t.r, t.g ), t.b );

			// We do the usual threshold:
			vec2 edges = step( threshold, delta.xy );

			// Then discard if there is no edge:
			if ( dot( edges, vec2( 1.0, 1.0 ) ) == 0.0 )
				discard;

			// Calculate right and bottom deltas:
			vec3 Cright = texture2D( colorTex, offset[1].xy ).rgb;
			t = abs( C - Cright );
			delta.z = max( max( t.r, t.g ), t.b );

			vec3 Cbottom  = texture2D( colorTex, offset[1].zw ).rgb;
			t = abs( C - Cbottom );
			delta.w = max( max( t.r, t.g ), t.b );

			// Calculate the maximum delta in the direct neighborhood:
			float maxDelta = max( max( max( delta.x, delta.y ), delta.z ), delta.w );

			// Calculate left-left and top-top deltas:
			vec3 Cleftleft  = texture2D( colorTex, offset[2].xy ).rgb;
			t = abs( C - Cleftleft );
			delta.z = max( max( t.r, t.g ), t.b );

			vec3 Ctoptop = texture2D( colorTex, offset[2].zw ).rgb;
			t = abs( C - Ctoptop );
			delta.w = max( max( t.r, t.g ), t.b );

			// Calculate the final maximum delta:
			maxDelta = max( max( maxDelta, delta.z ), delta.w );

			// Local contrast adaptation in action:
			edges.xy *= step( 0.5 * maxDelta, delta.xy );

			return vec4( edges, 0.0, 0.0 );
		}

		void main() {

			gl_FragColor = SMAAColorEdgeDetectionPS( vUv, vOffset, tDiffuse );

		}`},gm={name:`SMAAWeightsShader`,defines:{SMAA_MAX_SEARCH_STEPS:`8`,SMAA_AREATEX_MAX_DISTANCE:`16`,SMAA_AREATEX_PIXEL_SIZE:`( 1.0 / vec2( 160.0, 560.0 ) )`,SMAA_AREATEX_SUBTEX_SIZE:`( 1.0 / 7.0 )`},uniforms:{tDiffuse:{value:null},tArea:{value:null},tSearch:{value:null},resolution:{value:new H(1/1024,1/512)}},vertexShader:`

		uniform vec2 resolution;

		varying vec2 vUv;
		varying vec4 vOffset[ 3 ];
		varying vec2 vPixcoord;

		void SMAABlendingWeightCalculationVS( vec2 texcoord ) {
			vPixcoord = texcoord / resolution;

			// We will use these offsets for the searches later on (see @PSEUDO_GATHER4):
			vOffset[ 0 ] = texcoord.xyxy + resolution.xyxy * vec4( -0.25, 0.125, 1.25, 0.125 ); // WebGL port note: Changed sign in Y and W components
			vOffset[ 1 ] = texcoord.xyxy + resolution.xyxy * vec4( -0.125, 0.25, -0.125, -1.25 ); // WebGL port note: Changed sign in Y and W components

			// And these for the searches, they indicate the ends of the loops:
			vOffset[ 2 ] = vec4( vOffset[ 0 ].xz, vOffset[ 1 ].yw ) + vec4( -2.0, 2.0, -2.0, 2.0 ) * resolution.xxyy * float( SMAA_MAX_SEARCH_STEPS );

		}

		void main() {

			vUv = uv;

			SMAABlendingWeightCalculationVS( vUv );

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		#define SMAASampleLevelZeroOffset( tex, coord, offset ) texture2D( tex, coord + float( offset ) * resolution, 0.0 )

		uniform sampler2D tDiffuse;
		uniform sampler2D tArea;
		uniform sampler2D tSearch;
		uniform vec2 resolution;

		varying vec2 vUv;
		varying vec4 vOffset[3];
		varying vec2 vPixcoord;

		#if __VERSION__ == 100
		vec2 round( vec2 x ) {
			return sign( x ) * floor( abs( x ) + 0.5 );
		}
		#endif

		float SMAASearchLength( sampler2D searchTex, vec2 e, float bias, float scale ) {
			// Not required if searchTex accesses are set to point:
			// float2 SEARCH_TEX_PIXEL_SIZE = 1.0 / float2(66.0, 33.0);
			// e = float2(bias, 0.0) + 0.5 * SEARCH_TEX_PIXEL_SIZE +
			//     e * float2(scale, 1.0) * float2(64.0, 32.0) * SEARCH_TEX_PIXEL_SIZE;
			e.r = bias + e.r * scale;
			return 255.0 * texture2D( searchTex, e, 0.0 ).r;
		}

		float SMAASearchXLeft( sampler2D edgesTex, sampler2D searchTex, vec2 texcoord, float end ) {
			/**
				* @PSEUDO_GATHER4
				* This texcoord has been offset by (-0.25, -0.125) in the vertex shader to
				* sample between edge, thus fetching four edges in a row.
				* Sampling with different offsets in each direction allows to disambiguate
				* which edges are active from the four fetched ones.
				*/
			vec2 e = vec2( 0.0, 1.0 );

			for ( int i = 0; i < SMAA_MAX_SEARCH_STEPS; i ++ ) { // WebGL port note: Changed while to for
				e = texture2D( edgesTex, texcoord, 0.0 ).rg;
				texcoord -= vec2( 2.0, 0.0 ) * resolution;
				if ( ! ( texcoord.x > end && e.g > 0.8281 && e.r == 0.0 ) ) break;
			}

			// We correct the previous (-0.25, -0.125) offset we applied:
			texcoord.x += 0.25 * resolution.x;

			// The searches are bias by 1, so adjust the coords accordingly:
			texcoord.x += resolution.x;

			// Disambiguate the length added by the last step:
			texcoord.x += 2.0 * resolution.x; // Undo last step
			texcoord.x -= resolution.x * SMAASearchLength(searchTex, e, 0.0, 0.5);

			return texcoord.x;
		}

		float SMAASearchXRight( sampler2D edgesTex, sampler2D searchTex, vec2 texcoord, float end ) {
			vec2 e = vec2( 0.0, 1.0 );

			for ( int i = 0; i < SMAA_MAX_SEARCH_STEPS; i ++ ) { // WebGL port note: Changed while to for
				e = texture2D( edgesTex, texcoord, 0.0 ).rg;
				texcoord += vec2( 2.0, 0.0 ) * resolution;
				if ( ! ( texcoord.x < end && e.g > 0.8281 && e.r == 0.0 ) ) break;
			}

			texcoord.x -= 0.25 * resolution.x;
			texcoord.x -= resolution.x;
			texcoord.x -= 2.0 * resolution.x;
			texcoord.x += resolution.x * SMAASearchLength( searchTex, e, 0.5, 0.5 );

			return texcoord.x;
		}

		float SMAASearchYUp( sampler2D edgesTex, sampler2D searchTex, vec2 texcoord, float end ) {
			vec2 e = vec2( 1.0, 0.0 );

			for ( int i = 0; i < SMAA_MAX_SEARCH_STEPS; i ++ ) { // WebGL port note: Changed while to for
				e = texture2D( edgesTex, texcoord, 0.0 ).rg;
				texcoord += vec2( 0.0, 2.0 ) * resolution; // WebGL port note: Changed sign
				if ( ! ( texcoord.y > end && e.r > 0.8281 && e.g == 0.0 ) ) break;
			}

			texcoord.y -= 0.25 * resolution.y; // WebGL port note: Changed sign
			texcoord.y -= resolution.y; // WebGL port note: Changed sign
			texcoord.y -= 2.0 * resolution.y; // WebGL port note: Changed sign
			texcoord.y += resolution.y * SMAASearchLength( searchTex, e.gr, 0.0, 0.5 ); // WebGL port note: Changed sign

			return texcoord.y;
		}

		float SMAASearchYDown( sampler2D edgesTex, sampler2D searchTex, vec2 texcoord, float end ) {
			vec2 e = vec2( 1.0, 0.0 );

			for ( int i = 0; i < SMAA_MAX_SEARCH_STEPS; i ++ ) { // WebGL port note: Changed while to for
				e = texture2D( edgesTex, texcoord, 0.0 ).rg;
				texcoord -= vec2( 0.0, 2.0 ) * resolution; // WebGL port note: Changed sign
				if ( ! ( texcoord.y < end && e.r > 0.8281 && e.g == 0.0 ) ) break;
			}

			texcoord.y += 0.25 * resolution.y; // WebGL port note: Changed sign
			texcoord.y += resolution.y; // WebGL port note: Changed sign
			texcoord.y += 2.0 * resolution.y; // WebGL port note: Changed sign
			texcoord.y -= resolution.y * SMAASearchLength( searchTex, e.gr, 0.5, 0.5 ); // WebGL port note: Changed sign

			return texcoord.y;
		}

		vec2 SMAAArea( sampler2D areaTex, vec2 dist, float e1, float e2, float offset ) {
			// Rounding prevents precision errors of bilinear filtering:
			vec2 texcoord = float( SMAA_AREATEX_MAX_DISTANCE ) * round( 4.0 * vec2( e1, e2 ) ) + dist;

			// We do a scale and bias for mapping to texel space:
			texcoord = SMAA_AREATEX_PIXEL_SIZE * texcoord + ( 0.5 * SMAA_AREATEX_PIXEL_SIZE );

			// Move to proper place, according to the subpixel offset:
			texcoord.y += SMAA_AREATEX_SUBTEX_SIZE * offset;

			return texture2D( areaTex, texcoord, 0.0 ).rg;
		}

		vec4 SMAABlendingWeightCalculationPS( vec2 texcoord, vec2 pixcoord, vec4 offset[ 3 ], sampler2D edgesTex, sampler2D areaTex, sampler2D searchTex, ivec4 subsampleIndices ) {
			vec4 weights = vec4( 0.0, 0.0, 0.0, 0.0 );

			vec2 e = texture2D( edgesTex, texcoord ).rg;

			if ( e.g > 0.0 ) { // Edge at north
				vec2 d;

				// Find the distance to the left:
				vec2 coords;
				coords.x = SMAASearchXLeft( edgesTex, searchTex, offset[ 0 ].xy, offset[ 2 ].x );
				coords.y = offset[ 1 ].y; // offset[1].y = texcoord.y - 0.25 * resolution.y (@CROSSING_OFFSET)
				d.x = coords.x;

				// Now fetch the left crossing edges, two at a time using bilinear
				// filtering. Sampling at -0.25 (see @CROSSING_OFFSET) enables to
				// discern what value each edge has:
				float e1 = texture2D( edgesTex, coords, 0.0 ).r;

				// Find the distance to the right:
				coords.x = SMAASearchXRight( edgesTex, searchTex, offset[ 0 ].zw, offset[ 2 ].y );
				d.y = coords.x;

				// We want the distances to be in pixel units (doing this here allow to
				// better interleave arithmetic and memory accesses):
				d = d / resolution.x - pixcoord.x;

				// SMAAArea below needs a sqrt, as the areas texture is compressed
				// quadratically:
				vec2 sqrt_d = sqrt( abs( d ) );

				// Fetch the right crossing edges:
				coords.y -= 1.0 * resolution.y; // WebGL port note: Added
				float e2 = SMAASampleLevelZeroOffset( edgesTex, coords, ivec2( 1, 0 ) ).r;

				// Ok, we know how this pattern looks like, now it is time for getting
				// the actual area:
				weights.rg = SMAAArea( areaTex, sqrt_d, e1, e2, float( subsampleIndices.y ) );
			}

			if ( e.r > 0.0 ) { // Edge at west
				vec2 d;

				// Find the distance to the top:
				vec2 coords;

				coords.y = SMAASearchYUp( edgesTex, searchTex, offset[ 1 ].xy, offset[ 2 ].z );
				coords.x = offset[ 0 ].x; // offset[1].x = texcoord.x - 0.25 * resolution.x;
				d.x = coords.y;

				// Fetch the top crossing edges:
				float e1 = texture2D( edgesTex, coords, 0.0 ).g;

				// Find the distance to the bottom:
				coords.y = SMAASearchYDown( edgesTex, searchTex, offset[ 1 ].zw, offset[ 2 ].w );
				d.y = coords.y;

				// We want the distances to be in pixel units:
				d = d / resolution.y - pixcoord.y;

				// SMAAArea below needs a sqrt, as the areas texture is compressed
				// quadratically:
				vec2 sqrt_d = sqrt( abs( d ) );

				// Fetch the bottom crossing edges:
				coords.y -= 1.0 * resolution.y; // WebGL port note: Added
				float e2 = SMAASampleLevelZeroOffset( edgesTex, coords, ivec2( 0, 1 ) ).g;

				// Get the area for this direction:
				weights.ba = SMAAArea( areaTex, sqrt_d, e1, e2, float( subsampleIndices.x ) );
			}

			return weights;
		}

		void main() {

			gl_FragColor = SMAABlendingWeightCalculationPS( vUv, vPixcoord, vOffset, tDiffuse, tArea, tSearch, ivec4( 0.0 ) );

		}`},_m={name:`SMAABlendShader`,uniforms:{tDiffuse:{value:null},tColor:{value:null},resolution:{value:new H(1/1024,1/512)}},vertexShader:`

		uniform vec2 resolution;

		varying vec2 vUv;
		varying vec4 vOffset[ 2 ];

		void SMAANeighborhoodBlendingVS( vec2 texcoord ) {
			vOffset[ 0 ] = texcoord.xyxy + resolution.xyxy * vec4( -1.0, 0.0, 0.0, 1.0 ); // WebGL port note: Changed sign in W component
			vOffset[ 1 ] = texcoord.xyxy + resolution.xyxy * vec4( 1.0, 0.0, 0.0, -1.0 ); // WebGL port note: Changed sign in W component
		}

		void main() {

			vUv = uv;

			SMAANeighborhoodBlendingVS( vUv );

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform sampler2D tColor;
		uniform vec2 resolution;

		varying vec2 vUv;
		varying vec4 vOffset[ 2 ];

		vec4 SMAANeighborhoodBlendingPS( vec2 texcoord, vec4 offset[ 2 ], sampler2D colorTex, sampler2D blendTex ) {
			// Fetch the blending weights for current pixel:
			vec4 a;
			a.xz = texture2D( blendTex, texcoord ).xz;
			a.y = texture2D( blendTex, offset[ 1 ].zw ).g;
			a.w = texture2D( blendTex, offset[ 1 ].xy ).a;

			// Is there any blending weight with a value greater than 0.0?
			if ( dot(a, vec4( 1.0, 1.0, 1.0, 1.0 )) < 1e-5 ) {
				return texture2D( colorTex, texcoord, 0.0 );
			} else {
				// Up to 4 lines can be crossing a pixel (one through each edge). We
				// favor blending by choosing the line with the maximum weight for each
				// direction:
				vec2 offset;
				offset.x = a.a > a.b ? a.a : -a.b; // left vs. right
				offset.y = a.g > a.r ? -a.g : a.r; // top vs. bottom // WebGL port note: Changed signs

				// Then we go in the direction that has the maximum weight:
				if ( abs( offset.x ) > abs( offset.y )) { // horizontal vs. vertical
					offset.y = 0.0;
				} else {
					offset.x = 0.0;
				}

				// Fetch the opposite color and lerp by hand:
				vec4 C = texture2D( colorTex, texcoord, 0.0 );
				texcoord += sign( offset ) * resolution;
				vec4 Cop = texture2D( colorTex, texcoord, 0.0 );
				float s = abs( offset.x ) > abs( offset.y ) ? abs( offset.x ) : abs( offset.y );

				// WebGL port note: Added gamma correction
				C.xyz = pow(C.xyz, vec3(2.2));
				Cop.xyz = pow(Cop.xyz, vec3(2.2));
				vec4 mixed = mix(C, Cop, s);
				mixed.xyz = pow(mixed.xyz, vec3(1.0 / 2.2));

				return mixed;
			}
		}

		void main() {

			gl_FragColor = SMAANeighborhoodBlendingPS( vUv, vOffset, tColor, tDiffuse );

		}`},vm=class extends im{constructor(){super(),this._edgesRT=new Ba(1,1,{depthBuffer:!1,type:wr}),this._edgesRT.texture.name=`SMAAPass.edges`,this._weightsRT=new Ba(1,1,{depthBuffer:!1,type:wr}),this._weightsRT.texture.name=`SMAAPass.weights`;let e=this,t=new Image;t.src=this._getAreaTexture(),t.onload=function(){e._areaTexture.needsUpdate=!0},this._areaTexture=new La,this._areaTexture.name=`SMAAPass.area`,this._areaTexture.image=t,this._areaTexture.minFilter=mr,this._areaTexture.generateMipmaps=!1,this._areaTexture.flipY=!1;let n=new Image;n.src=this._getSearchTexture(),n.onload=function(){e._searchTexture.needsUpdate=!0},this._searchTexture=new La,this._searchTexture.name=`SMAAPass.search`,this._searchTexture.image=n,this._searchTexture.magFilter=dr,this._searchTexture.minFilter=dr,this._searchTexture.generateMipmaps=!1,this._searchTexture.flipY=!1,this._uniformsEdges=ul.clone(hm.uniforms),this._materialEdges=new pl({defines:Object.assign({},hm.defines),uniforms:this._uniformsEdges,vertexShader:hm.vertexShader,fragmentShader:hm.fragmentShader}),this._uniformsWeights=ul.clone(gm.uniforms),this._uniformsWeights.tDiffuse.value=this._edgesRT.texture,this._uniformsWeights.tArea.value=this._areaTexture,this._uniformsWeights.tSearch.value=this._searchTexture,this._materialWeights=new pl({defines:Object.assign({},gm.defines),uniforms:this._uniformsWeights,vertexShader:gm.vertexShader,fragmentShader:gm.fragmentShader}),this._uniformsBlend=ul.clone(_m.uniforms),this._uniformsBlend.tDiffuse.value=this._weightsRT.texture,this._materialBlend=new pl({uniforms:this._uniformsBlend,vertexShader:_m.vertexShader,fragmentShader:_m.fragmentShader}),this._fsQuad=new sm(null)}render(e,t,n){this._uniformsEdges.tDiffuse.value=n.texture,this._fsQuad.material=this._materialEdges,e.setRenderTarget(this._edgesRT),this.clear&&e.clear(),this._fsQuad.render(e),this._fsQuad.material=this._materialWeights,e.setRenderTarget(this._weightsRT),this.clear&&e.clear(),this._fsQuad.render(e),this._uniformsBlend.tColor.value=n.texture,this._fsQuad.material=this._materialBlend,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(),this._fsQuad.render(e))}setSize(e,t){this._edgesRT.setSize(e,t),this._weightsRT.setSize(e,t),this._materialEdges.uniforms.resolution.value.set(1/e,1/t),this._materialWeights.uniforms.resolution.value.set(1/e,1/t),this._materialBlend.uniforms.resolution.value.set(1/e,1/t)}dispose(){this._edgesRT.dispose(),this._weightsRT.dispose(),this._areaTexture.dispose(),this._searchTexture.dispose(),this._materialEdges.dispose(),this._materialWeights.dispose(),this._materialBlend.dispose(),this._fsQuad.dispose()}_getAreaTexture(){return`data:image/png;base64,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`}_getSearchTexture(){return`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEIAAAAhCAAAAABIXyLAAAAAOElEQVRIx2NgGAWjYBSMglEwEICREYRgFBZBqDCSLA2MGPUIVQETE9iNUAqLR5gIeoQKRgwXjwAAGn4AtaFeYLEAAAAASUVORK5CYII=`}},ym={name:`OutputShader`,uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`},bm=class extends im{constructor(){super(),this.isOutputPass=!0,this.uniforms=ul.clone(ym.uniforms),this.material=new ml({name:ym.name,uniforms:this.uniforms,vertexShader:ym.vertexShader,fragmentShader:ym.fragmentShader}),this._fsQuad=new sm(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},G.getTransfer(this._outputColorSpace)===`srgb`&&(this.material.defines.SRGB_TRANSFER=``),this._toneMapping===1?this.material.defines.LINEAR_TONE_MAPPING=``:this._toneMapping===2?this.material.defines.REINHARD_TONE_MAPPING=``:this._toneMapping===3?this.material.defines.CINEON_TONE_MAPPING=``:this._toneMapping===4?this.material.defines.ACES_FILMIC_TONE_MAPPING=``:this._toneMapping===6?this.material.defines.AGX_TONE_MAPPING=``:this._toneMapping===7?this.material.defines.NEUTRAL_TONE_MAPPING=``:this._toneMapping===5&&(this.material.defines.CUSTOM_TONE_MAPPING=``),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}},xm={morning:{elevationDeg:14,azimuthDeg:110,sunIntensity:2.2,sunColor:`#ffd9a8`,ambient:.1,hemiSky:`#bcd4ff`,hemiGround:`#5a5a40`,fogColor:`#d9e2ee`,fogDensity:6e-4,turbidity:4,rayleigh:1.8,exposure:.55},noon:{elevationDeg:58,azimuthDeg:180,sunIntensity:2.5,sunColor:`#fff4e0`,ambient:.12,hemiSky:`#a9c8ff`,hemiGround:`#6b6b4a`,fogColor:`#c9d8ea`,fogDensity:28e-5,turbidity:4,rayleigh:2.6,exposure:.5},evening:{elevationDeg:7,azimuthDeg:265,sunIntensity:1.8,sunColor:`#ffb070`,ambient:.08,hemiSky:`#e0a080`,hemiGround:`#3a3a30`,fogColor:`#e8c7a8`,fogDensity:.0011,turbidity:8,rayleigh:2.4,exposure:.55},night:{elevationDeg:-8,azimuthDeg:30,sunIntensity:.55,sunColor:`#8fa8ff`,ambient:.1,hemiSky:`#2a3a6a`,hemiGround:`#0a0c12`,fogColor:`#070a14`,fogDensity:.0016,turbidity:2,rayleigh:.3,exposure:.75}},Sm=class{renderer;scene=new Eo;camera;sun;hemi;ambient;sky;composer=null;bloom=null;envTexture=null;settings;sunDir=new U;skyScale={value:.32};pmrem;timeOfDay=`noon`;weather=`clear`;constructor(e,t){this.settings=t,this.renderer=new tm({canvas:e,antialias:!1,powerPreference:`high-performance`}),this.renderer.outputColorSpace=ji,this.renderer.toneMapping=4,this.renderer.shadowMap.enabled=t.shadows,this.renderer.shadowMap.type=2,this.camera=new su(t.fov,1,.1,6e3),this.sun=new mu(`#ffffff`,3),this.sun.castShadow=!0,this.sun.shadow.mapSize.set(4096,4096),this.sun.shadow.bias=-4e-4,this.sun.shadow.normalBias=.05,this.sun.shadow.camera.near=1,this.sun.shadow.camera.far=600,this.scene.add(this.sun,this.sun.target),this.hemi=new Yl(`#bcd4ff`,`#5a5a40`,.6),this.ambient=new hu(`#ffffff`,.3),this.scene.add(this.hemi,this.ambient),this.sky=new nm,this.sky.scale.setScalar(45e4);let n=this.sky.material;n.onBeforeCompile=e=>{e.uniforms.skyScale=this.skyScale,e.fragmentShader=e.fragmentShader.replace(`uniform float mieDirectionalG;`,`uniform float mieDirectionalG;
uniform float skyScale;`).replace(`gl_FragColor = vec4( texColor, 1.0 );`,`gl_FragColor = vec4( min( texColor * skyScale, vec3( 1.9 ) ), 1.0 );`)},this.scene.add(this.sky),this.pmrem=new sd(this.renderer),this.applySettings(t),this.setLighting(`noon`,`clear`),this.resize(),window.addEventListener(`resize`,()=>this.resize())}applySettings(e){this.settings=e;let t=e.quality,n=t===`ultra`?2:t===`high`?1.5:t===`medium`?1.25:1;this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,n)*ba.clamp(e.resolutionScale,.5,1)),this.renderer.shadowMap.enabled=e.shadows;let r=t===`ultra`?4096:t===`high`?3072:t===`medium`?2048:1024;this.sun.shadow.mapSize.x!==r&&(this.sun.shadow.mapSize.set(r,r),this.sun.shadow.map?.dispose(),this.sun.shadow.map=null),this.camera.fov=e.fov,this.camera.updateProjectionMatrix(),this.setupPost(),this.resize()}setupPost(){if(this.composer?.dispose(),this.composer=null,this.bloom=null,!this.settings.postProcessing)return;let e=this.renderer.getDrawingBufferSize(new U);this.composer=new dm(this.renderer),this.composer.addPass(new fm(this.scene,this.camera)),this.bloom=new mm(e,.12,.4,2),this.composer.addPass(this.bloom),this.composer.addPass(new bm),this.composer.addPass(new vm)}resize(){let e=window.innerWidth,t=window.innerHeight;this.renderer.setSize(e,t,!1),this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.composer?.setSize(e,t)}setLighting(e,t){this.timeOfDay=e,this.weather=t;let n=xm[e],r=t!==`clear`,i=ba.degToRad(90-n.elevationDeg),a=ba.degToRad(n.azimuthDeg);this.sunDir.setFromSphericalCoords(1,i,a);let o=this.sky.material.uniforms;o.sunPosition.value.copy(this.sunDir),o.turbidity.value=r?20:n.turbidity,o.rayleigh.value=r?.8:n.rayleigh,o.mieCoefficient.value=r?.02:e===`noon`?.005:.0025,o.mieDirectionalG.value=e===`noon`?.9:.975,this.skyScale.value=e===`night`?.12:e===`noon`?.32:.62,this.sun.color.set(n.sunColor),this.sun.intensity=n.sunIntensity*(r?.35:1),this.sun.visible=n.elevationDeg>-3||!0,this.hemi.color.set(n.hemiSky),this.hemi.groundColor.set(n.hemiGround),this.hemi.intensity=this.timeOfDay===`night`?.5:r?.45:.3,this.ambient.intensity=n.ambient*(r?1.4:1);let s=new q(n.fogColor);r&&s.multiplyScalar(.8);let c=n.fogDensity*(t===`rain`?2.4:r?1.6:1);this.scene.fog=new To(s,r?60:120,Math.min(7e3,1.8/c)),this.sky.visible=!r,this.scene.background=r?new q(e===`night`?`#05060a`:t===`rain`?`#7d8791`:`#a7b0b8`):null,r&&e!==`night`&&(this.scene.fog=new To(t===`rain`?`#7d8791`:`#a7b0b8`,40,t===`rain`?900:1600)),this.renderer.toneMappingExposure=n.exposure*(r?.9:1),this.buildEnvironment()}buildEnvironment(){this.envTexture?.dispose();let e=xm[this.timeOfDay],t=this.weather!==`clear`,n=new Eo,r=new q(e.hemiSky).multiplyScalar(t?.55:.75),i=new q(e.fogColor).multiplyScalar(t?.6:.85),a=new q(e.hemiGround).multiplyScalar(.5),o=new J(new rl(50,32,16),new pl({side:1,uniforms:{top:{value:r},horizon:{value:i},ground:{value:a},sunDir:{value:this.sunDir.clone()},sunColor:{value:new q(e.sunColor).multiplyScalar(t?1.5:e.sunIntensity*2.5)}},vertexShader:`varying vec3 vDir; void main(){ vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,fragmentShader:`uniform vec3 top; uniform vec3 horizon; uniform vec3 ground; uniform vec3 sunDir; uniform vec3 sunColor; varying vec3 vDir;
          void main(){ float y = vDir.y; vec3 c = y > 0.0 ? mix(horizon, top, pow(y, 0.6)) : mix(horizon, ground, pow(-y, 0.5));
          float s = max(dot(normalize(vDir), normalize(sunDir)), 0.0); c += sunColor * pow(s, 400.0) + sunColor * 0.04 * pow(s, 8.0);
          gl_FragColor = vec4(c, 1.0); }`}));n.add(o);let s=this.pmrem.fromScene(n,.04,1,100);o.geometry.dispose(),o.material.dispose(),this.envTexture=s.texture,this.scene.environment=this.envTexture,this.scene.environmentIntensity=this.timeOfDay===`night`?.5:1}updateShadowTarget(e,t=110){let n=this.sun.shadow.camera;n.left=-t,n.right=t,n.top=t,n.bottom=-t,n.updateProjectionMatrix(),this.sun.position.copy(e).addScaledVector(this.sunDir,300),this.sun.target.position.copy(e),this.sun.target.updateMatrixWorld()}render(){this.composer?this.composer.render():this.renderer.render(this.scene,this.camera)}get sunDirection(){return this.sunDir}dispose(){this.composer?.dispose(),this.pmrem.dispose(),this.renderer.dispose()}};function Cm(e,t=!1){let n=e[0].index!==null,r=new Set(Object.keys(e[0].attributes)),i=new Set(Object.keys(e[0].morphAttributes)),a={},o={},s=e[0].morphTargetsRelative,c=new bs,l=0;for(let u=0;u<e.length;++u){let d=e[u],f=0;if(n!==(d.index!==null))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them.`),null;for(let e in d.attributes){if(!r.has(e))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. All geometries must have compatible attributes; make sure "`+e+`" attribute exists among all geometries, or in none of them.`),null;a[e]===void 0&&(a[e]=[]),a[e].push(d.attributes[e]),f++}if(f!==r.size)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. Make sure all geometries have the same number of attributes.`),null;if(s!==d.morphTargetsRelative)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. .morphTargetsRelative must be consistent throughout all geometries.`),null;for(let e in d.morphAttributes){if(!i.has(e))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`.  .morphAttributes must be consistent throughout all geometries.`),null;o[e]===void 0&&(o[e]=[]),o[e].push(d.morphAttributes[e])}if(t){let e;if(n)e=d.index.count;else if(d.attributes.position!==void 0)e=d.attributes.position.count;else return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. The geometry must have either an index or a position attribute`),null;c.addGroup(l,e,u),l+=e}}if(n){let t=0,n=[];for(let r=0;r<e.length;++r){let i=e[r].index;for(let e=0;e<i.count;++e)n.push(i.getX(e)+t);t+=e[r].attributes.position.count}c.setIndex(n)}for(let e in a){let t=wm(a[e]);if(!t)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the `+e+` attribute.`),null;c.setAttribute(e,t)}for(let e in o){let t=o[e][0].length;if(t!==0){c.morphAttributes=c.morphAttributes||{},c.morphAttributes[e]=[];for(let n=0;n<t;++n){let t=[];for(let r=0;r<o[e].length;++r)t.push(o[e][r][n]);let r=wm(t);if(!r)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the `+e+` morphAttribute.`),null;c.morphAttributes[e].push(r)}}}return c}function wm(e){let t,n,r,i=-1,a=0;for(let o=0;o<e.length;++o){let s=e[o];if(t===void 0&&(t=s.array.constructor),t!==s.array.constructor)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes.`),null;if(n===void 0&&(n=s.itemSize),n!==s.itemSize)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes.`),null;if(r===void 0&&(r=s.normalized),r!==s.normalized)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes.`),null;if(i===-1&&(i=s.gpuType),i!==s.gpuType)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes.`),null;a+=s.count*n}let o=new t(a),s=new as(o,n,r),c=0;for(let t=0;t<e.length;++t){let r=e[t];if(r.isInterleavedBufferAttribute){let e=c/n;for(let t=0,i=r.count;t<i;t++)for(let i=0;i<n;i++){let n=r.getComponent(t,i);s.setComponent(t+e,i,n)}}else o.set(r.array,c);c+=r.count*n}return i!==void 0&&(s.gpuType=i),s}function Tm(e,t){if(t===0)return console.warn(`THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles.`),e;if(t===2||t===1){let n=e.getIndex();if(n===null){let t=[],r=e.getAttribute(`position`);if(r!==void 0){for(let e=0;e<r.count;e++)t.push(e);e.setIndex(t),n=e.getIndex()}else return console.error(`THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible.`),e}let r=n.count-2,i=[];if(t===2)for(let e=1;e<=r;e++)i.push(n.getX(0)),i.push(n.getX(e)),i.push(n.getX(e+1));else for(let e=0;e<r;e++)e%2==0?(i.push(n.getX(e)),i.push(n.getX(e+1)),i.push(n.getX(e+2))):(i.push(n.getX(e+2)),i.push(n.getX(e+1)),i.push(n.getX(e)));i.length/3!==r&&console.error(`THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.`);let a=e.clone();return a.setIndex(i),a.clearGroups(),a}return console.error(`THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:`,t),e}function Em(e){let t=new Map,n=new Map,r=e.clone();return Dm(e,r,function(e,r){t.set(r,e),n.set(e,r)}),r.traverse(function(e){if(!e.isSkinnedMesh)return;let r=e,i=t.get(e),a=i.skeleton.bones;r.skeleton=i.skeleton.clone(),r.bindMatrix.copy(i.bindMatrix),r.skeleton.bones=a.map(function(e){return n.get(e)}),r.bind(r.skeleton,r.bindMatrix)}),r}function Dm(e,t,n){n(e,t);for(let r=0;r<e.children.length;r++)Dm(e.children[r],t.children[r],n)}var Om=class extends Vl{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(e){return new Pm(e)}),this.register(function(e){return new Fm(e)}),this.register(function(e){return new Wm(e)}),this.register(function(e){return new Gm(e)}),this.register(function(e){return new Km(e)}),this.register(function(e){return new Lm(e)}),this.register(function(e){return new Rm(e)}),this.register(function(e){return new zm(e)}),this.register(function(e){return new Bm(e)}),this.register(function(e){return new Nm(e)}),this.register(function(e){return new Vm(e)}),this.register(function(e){return new Im(e)}),this.register(function(e){return new Um(e)}),this.register(function(e){return new Hm(e)}),this.register(function(e){return new jm(e)}),this.register(function(e){return new qm(e,$.EXT_MESHOPT_COMPRESSION)}),this.register(function(e){return new qm(e,$.KHR_MESHOPT_COMPRESSION)}),this.register(function(e){return new Jm(e)})}load(e,t,n,r){let i=this,a;if(this.resourcePath!==``)a=this.resourcePath;else if(this.path!==``){let t=gu.extractUrlBase(e);a=gu.resolveURL(t,this.path)}else a=gu.extractUrlBase(e);this.manager.itemStart(e);let o=function(t){r?r(t):console.error(t),i.manager.itemError(e),i.manager.itemEnd(e)},s=new Wl(this.manager);s.setPath(this.path),s.setResponseType(`arraybuffer`),s.setRequestHeader(this.requestHeader),s.setWithCredentials(this.withCredentials),s.load(e,function(n){try{i.parse(n,a,function(n){t(n),i.manager.itemEnd(e)},o)}catch(e){o(e)}},n,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,r){let i,a={},o={},s=new TextDecoder;if(typeof e==`string`)i=JSON.parse(e);else if(e instanceof ArrayBuffer){if(s.decode(new Uint8Array(e,0,4))===Ym){try{a[$.KHR_BINARY_GLTF]=new Qm(e)}catch(e){r&&r(e);return}i=JSON.parse(a[$.KHR_BINARY_GLTF].content)}else i=JSON.parse(s.decode(e))}else i=e;if(i.asset===void 0||i.asset.version[0]<2){r&&r(Error(`THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported.`));return}let c=new wh(i,{path:t||this.resourcePath||``,crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let e=0;e<this.pluginCallbacks.length;e++){let t=this.pluginCallbacks[e](c);t.name||console.error(`THREE.GLTFLoader: Invalid plugin found: missing name`),o[t.name]=t,a[t.name]=!0}if(i.extensionsUsed)for(let e=0;e<i.extensionsUsed.length;++e){let t=i.extensionsUsed[e],n=i.extensionsRequired||[];switch(t){case $.KHR_MATERIALS_UNLIT:a[t]=new Mm;break;case $.KHR_DRACO_MESH_COMPRESSION:a[t]=new $m(i,this.dracoLoader);break;case $.KHR_TEXTURE_TRANSFORM:a[t]=new eh;break;case $.KHR_MESH_QUANTIZATION:a[t]=new th;break;default:n.indexOf(t)>=0&&o[t]===void 0&&console.warn(`THREE.GLTFLoader: Unknown extension "`+t+`".`)}}c.setExtensions(a),c.setPlugins(o),c.parse(n,r)}parseAsync(e,t){let n=this;return new Promise(function(r,i){n.parse(e,t,r,i)})}};function km(){let e={};return{get:function(t){return e[t]},add:function(t,n){e[t]=n},remove:function(t){delete e[t]},removeAll:function(){e={}}}}function Am(e,t,n){let r=e.json.materials[t];return r.extensions&&r.extensions[n]?r.extensions[n]:null}var $={KHR_BINARY_GLTF:`KHR_binary_glTF`,KHR_DRACO_MESH_COMPRESSION:`KHR_draco_mesh_compression`,KHR_LIGHTS_PUNCTUAL:`KHR_lights_punctual`,KHR_MATERIALS_CLEARCOAT:`KHR_materials_clearcoat`,KHR_MATERIALS_DISPERSION:`KHR_materials_dispersion`,KHR_MATERIALS_IOR:`KHR_materials_ior`,KHR_MATERIALS_SHEEN:`KHR_materials_sheen`,KHR_MATERIALS_SPECULAR:`KHR_materials_specular`,KHR_MATERIALS_TRANSMISSION:`KHR_materials_transmission`,KHR_MATERIALS_IRIDESCENCE:`KHR_materials_iridescence`,KHR_MATERIALS_ANISOTROPY:`KHR_materials_anisotropy`,KHR_MATERIALS_UNLIT:`KHR_materials_unlit`,KHR_MATERIALS_VOLUME:`KHR_materials_volume`,KHR_TEXTURE_BASISU:`KHR_texture_basisu`,KHR_TEXTURE_TRANSFORM:`KHR_texture_transform`,KHR_MESH_QUANTIZATION:`KHR_mesh_quantization`,KHR_MATERIALS_EMISSIVE_STRENGTH:`KHR_materials_emissive_strength`,EXT_MATERIALS_BUMP:`EXT_materials_bump`,EXT_TEXTURE_WEBP:`EXT_texture_webp`,EXT_TEXTURE_AVIF:`EXT_texture_avif`,EXT_MESHOPT_COMPRESSION:`EXT_meshopt_compression`,KHR_MESHOPT_COMPRESSION:`KHR_meshopt_compression`,EXT_MESH_GPU_INSTANCING:`EXT_mesh_gpu_instancing`},jm=class{constructor(e){this.parser=e,this.name=$.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let n=0,r=t.length;n<r;n++){let r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){let t=this.parser,n=`light:`+e,r=t.cache.get(n);if(r)return r;let i=t.json,a=((i.extensions&&i.extensions[this.name]||{}).lights||[])[e],o,s=new q(16777215);a.color!==void 0&&s.setRGB(a.color[0],a.color[1],a.color[2],Mi);let c=a.range===void 0?0:a.range;switch(a.type){case`directional`:o=new mu(s),o.target.position.set(0,0,-1),o.add(o.target);break;case`point`:o=new du(s),o.distance=c;break;case`spot`:o=new lu(s),o.distance=c,a.spot=a.spot||{},a.spot.innerConeAngle=a.spot.innerConeAngle===void 0?0:a.spot.innerConeAngle,a.spot.outerConeAngle=a.spot.outerConeAngle===void 0?Math.PI/4:a.spot.outerConeAngle,o.angle=a.spot.outerConeAngle,o.penumbra=1-a.spot.innerConeAngle/a.spot.outerConeAngle,o.target.position.set(0,0,-1),o.add(o.target);break;default:throw Error(`THREE.GLTFLoader: Unexpected light type: `+a.type)}return o.position.set(0,0,0),gh(o,a),a.intensity!==void 0&&(o.intensity=a.intensity),o.name=t.createUniqueName(a.name||`light_`+e),r=Promise.resolve(o),t.cache.add(n,r),r}getDependency(e,t){if(e===`light`)return this._loadLight(t)}createNodeAttachment(e){let t=this,n=this.parser,r=n.json.nodes[e],i=(r.extensions&&r.extensions[this.name]||{}).light;return i===void 0?null:this._loadLight(i).then(function(e){return n._getNodeRef(t.cache,i,e)})}},Mm=class{constructor(){this.name=$.KHR_MATERIALS_UNLIT}getMaterialType(){return Ps}extendParams(e,t,n){let r=[];e.color=new q(1,1,1),e.opacity=1;let i=t.pbrMetallicRoughness;if(i){if(Array.isArray(i.baseColorFactor)){let t=i.baseColorFactor;e.color.setRGB(t[0],t[1],t[2],Mi),e.opacity=t[3]}i.baseColorTexture!==void 0&&r.push(n.assignTexture(e,`map`,i.baseColorTexture,ji))}return Promise.all(r)}},Nm=class{constructor(e){this.parser=e,this.name=$.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let n=Am(this.parser,e,this.name);return n===null||n.emissiveStrength!==void 0&&(t.emissiveIntensity=n.emissiveStrength),Promise.resolve()}},Pm=class{constructor(e){this.parser=e,this.name=$.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){return Am(this.parser,e,this.name)===null?null:hl}extendMaterialParams(e,t){let n=Am(this.parser,e,this.name);if(n===null)return Promise.resolve();let r=[];if(n.clearcoatFactor!==void 0&&(t.clearcoat=n.clearcoatFactor),n.clearcoatTexture!==void 0&&r.push(this.parser.assignTexture(t,`clearcoatMap`,n.clearcoatTexture)),n.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=n.clearcoatRoughnessFactor),n.clearcoatRoughnessTexture!==void 0&&r.push(this.parser.assignTexture(t,`clearcoatRoughnessMap`,n.clearcoatRoughnessTexture)),n.clearcoatNormalTexture!==void 0&&(r.push(this.parser.assignTexture(t,`clearcoatNormalMap`,n.clearcoatNormalTexture)),n.clearcoatNormalTexture.scale!==void 0)){let e=n.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new H(e,e)}return Promise.all(r)}},Fm=class{constructor(e){this.parser=e,this.name=$.KHR_MATERIALS_DISPERSION}getMaterialType(e){return Am(this.parser,e,this.name)===null?null:hl}extendMaterialParams(e,t){let n=Am(this.parser,e,this.name);return n===null||(t.dispersion=n.dispersion===void 0?0:n.dispersion),Promise.resolve()}},Im=class{constructor(e){this.parser=e,this.name=$.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){return Am(this.parser,e,this.name)===null?null:hl}extendMaterialParams(e,t){let n=Am(this.parser,e,this.name);if(n===null)return Promise.resolve();let r=[];return n.iridescenceFactor!==void 0&&(t.iridescence=n.iridescenceFactor),n.iridescenceTexture!==void 0&&r.push(this.parser.assignTexture(t,`iridescenceMap`,n.iridescenceTexture)),n.iridescenceIor!==void 0&&(t.iridescenceIOR=n.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),n.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=n.iridescenceThicknessMinimum),n.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=n.iridescenceThicknessMaximum),n.iridescenceThicknessTexture!==void 0&&r.push(this.parser.assignTexture(t,`iridescenceThicknessMap`,n.iridescenceThicknessTexture)),Promise.all(r)}},Lm=class{constructor(e){this.parser=e,this.name=$.KHR_MATERIALS_SHEEN}getMaterialType(e){return Am(this.parser,e,this.name)===null?null:hl}extendMaterialParams(e,t){let n=Am(this.parser,e,this.name);if(n===null)return Promise.resolve();let r=[];if(t.sheenColor=new q(0,0,0),t.sheenRoughness=0,t.sheen=1,n.sheenColorFactor!==void 0){let e=n.sheenColorFactor;t.sheenColor.setRGB(e[0],e[1],e[2],Mi)}return n.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=n.sheenRoughnessFactor),n.sheenColorTexture!==void 0&&r.push(this.parser.assignTexture(t,`sheenColorMap`,n.sheenColorTexture,ji)),n.sheenRoughnessTexture!==void 0&&r.push(this.parser.assignTexture(t,`sheenRoughnessMap`,n.sheenRoughnessTexture)),Promise.all(r)}},Rm=class{constructor(e){this.parser=e,this.name=$.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){return Am(this.parser,e,this.name)===null?null:hl}extendMaterialParams(e,t){let n=Am(this.parser,e,this.name);if(n===null)return Promise.resolve();let r=[];return n.transmissionFactor!==void 0&&(t.transmission=n.transmissionFactor),n.transmissionTexture!==void 0&&r.push(this.parser.assignTexture(t,`transmissionMap`,n.transmissionTexture)),Promise.all(r)}},zm=class{constructor(e){this.parser=e,this.name=$.KHR_MATERIALS_VOLUME}getMaterialType(e){return Am(this.parser,e,this.name)===null?null:hl}extendMaterialParams(e,t){let n=Am(this.parser,e,this.name);if(n===null)return Promise.resolve();let r=[];t.thickness=n.thicknessFactor===void 0?0:n.thicknessFactor,n.thicknessTexture!==void 0&&r.push(this.parser.assignTexture(t,`thicknessMap`,n.thicknessTexture)),t.attenuationDistance=n.attenuationDistance||1/0;let i=n.attenuationColor||[1,1,1];return t.attenuationColor=new q().setRGB(i[0],i[1],i[2],Mi),Promise.all(r)}},Bm=class{constructor(e){this.parser=e,this.name=$.KHR_MATERIALS_IOR}getMaterialType(e){return Am(this.parser,e,this.name)===null?null:hl}extendMaterialParams(e,t){let n=Am(this.parser,e,this.name);return n===null?Promise.resolve():(t.ior=n.ior===void 0?1.5:n.ior,t.ior===0&&(t.ior=1e3),Promise.resolve())}},Vm=class{constructor(e){this.parser=e,this.name=$.KHR_MATERIALS_SPECULAR}getMaterialType(e){return Am(this.parser,e,this.name)===null?null:hl}extendMaterialParams(e,t){let n=Am(this.parser,e,this.name);if(n===null)return Promise.resolve();let r=[];t.specularIntensity=n.specularFactor===void 0?1:n.specularFactor,n.specularTexture!==void 0&&r.push(this.parser.assignTexture(t,`specularIntensityMap`,n.specularTexture));let i=n.specularColorFactor||[1,1,1];return t.specularColor=new q().setRGB(i[0],i[1],i[2],Mi),n.specularColorTexture!==void 0&&r.push(this.parser.assignTexture(t,`specularColorMap`,n.specularColorTexture,ji)),Promise.all(r)}},Hm=class{constructor(e){this.parser=e,this.name=$.EXT_MATERIALS_BUMP}getMaterialType(e){return Am(this.parser,e,this.name)===null?null:hl}extendMaterialParams(e,t){let n=Am(this.parser,e,this.name);if(n===null)return Promise.resolve();let r=[];return t.bumpScale=n.bumpFactor===void 0?1:n.bumpFactor,n.bumpTexture!==void 0&&r.push(this.parser.assignTexture(t,`bumpMap`,n.bumpTexture)),Promise.all(r)}},Um=class{constructor(e){this.parser=e,this.name=$.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){return Am(this.parser,e,this.name)===null?null:hl}extendMaterialParams(e,t){let n=Am(this.parser,e,this.name);if(n===null)return Promise.resolve();let r=[];return n.anisotropyStrength!==void 0&&(t.anisotropy=n.anisotropyStrength),n.anisotropyRotation!==void 0&&(t.anisotropyRotation=n.anisotropyRotation),n.anisotropyTexture!==void 0&&r.push(this.parser.assignTexture(t,`anisotropyMap`,n.anisotropyTexture)),Promise.all(r)}},Wm=class{constructor(e){this.parser=e,this.name=$.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,n=t.json,r=n.textures[e];if(!r.extensions||!r.extensions[this.name])return null;let i=r.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw Error(`THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures`);return null}return t.loadTextureImage(e,i.source,a)}},Gm=class{constructor(e){this.parser=e,this.name=$.EXT_TEXTURE_WEBP}loadTexture(e){let t=this.name,n=this.parser,r=n.json,i=r.textures[e];if(!i.extensions||!i.extensions[t])return null;let a=i.extensions[t],o=r.images[a.source],s=n.textureLoader;if(o.uri){let e=n.options.manager.getHandler(o.uri);e!==null&&(s=e)}return n.loadTextureImage(e,a.source,s)}},Km=class{constructor(e){this.parser=e,this.name=$.EXT_TEXTURE_AVIF}loadTexture(e){let t=this.name,n=this.parser,r=n.json,i=r.textures[e];if(!i.extensions||!i.extensions[t])return null;let a=i.extensions[t],o=r.images[a.source],s=n.textureLoader;if(o.uri){let e=n.options.manager.getHandler(o.uri);e!==null&&(s=e)}return n.loadTextureImage(e,a.source,s)}},qm=class{constructor(e,t){this.name=t,this.parser=e}loadBufferView(e){let t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){let e=n.extensions[this.name],r=this.parser.getDependency(`buffer`,e.buffer),i=this.parser.options.meshoptDecoder;if(!i||!i.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw Error(`THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files`);return null}return r.then(function(t){let n=e.byteOffset||0,r=e.byteLength||0,a=e.count,o=e.byteStride,s=new Uint8Array(t,n,r);return i.decodeGltfBufferAsync?i.decodeGltfBufferAsync(a,o,s,e.mode,e.filter).then(function(e){return e.buffer}):i.ready.then(function(){let t=new ArrayBuffer(a*o);return i.decodeGltfBuffer(new Uint8Array(t),a,o,s,e.mode,e.filter),t})})}return null}},Jm=class{constructor(e){this.name=$.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;let r=t.meshes[n.mesh];for(let e of r.primitives)if(e.mode!==ah.TRIANGLES&&e.mode!==ah.TRIANGLE_STRIP&&e.mode!==ah.TRIANGLE_FAN&&e.mode!==void 0)return null;let i=n.extensions[this.name].attributes,a=[],o={};for(let e in i)a.push(this.parser.getDependency(`accessor`,i[e]).then(t=>(o[e]=t,o[e])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(e=>{let t=e.pop(),n=t.isGroup?t.children:[t],r=e[0].count,i=[];for(let e of n){let t=new K,n=new U,a=new xa,s=new U(1,1,1),c=new _c(e.geometry,e.material,r);for(let e=0;e<r;e++)o.TRANSLATION&&n.fromBufferAttribute(o.TRANSLATION,e),o.ROTATION&&a.fromBufferAttribute(o.ROTATION,e),o.SCALE&&s.fromBufferAttribute(o.SCALE,e),c.setMatrixAt(e,t.compose(n,a,s));for(let t in o)if(t===`_COLOR_0`){let e=o[t];c.instanceColor=new lc(e.array,e.itemSize,e.normalized)}else t!==`TRANSLATION`&&t!==`ROTATION`&&t!==`SCALE`&&e.geometry.setAttribute(t,o[t]);go.prototype.copy.call(c,e),this.parser.assignFinalMaterial(c),i.push(c)}return t.isGroup?(t.clear(),t.add(...i),t):i[0]}))}},Ym=`glTF`,Xm=12,Zm={JSON:1313821514,BIN:5130562},Qm=class{constructor(e){this.name=$.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,Xm),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Ym)throw Error(`THREE.GLTFLoader: Unsupported glTF-Binary header.`);if(this.header.version<2)throw Error(`THREE.GLTFLoader: Legacy binary file detected.`);let r=this.header.length-Xm,i=new DataView(e,Xm),a=0;for(;a<r;){let t=i.getUint32(a,!0);a+=4;let r=i.getUint32(a,!0);if(a+=4,r===Zm.JSON){let r=new Uint8Array(e,Xm+a,t);this.content=n.decode(r)}else if(r===Zm.BIN){let n=Xm+a;this.body=e.slice(n,n+t)}a+=t}if(this.content===null)throw Error(`THREE.GLTFLoader: JSON content not found.`)}},$m=class{constructor(e,t){if(!t)throw Error(`THREE.GLTFLoader: No DRACOLoader instance provided.`);this.name=$.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let n=this.json,r=this.dracoLoader,i=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},s={},c={};for(let e in a){let t=uh[e]||e.toLowerCase();o[t]=a[e]}for(let t in e.attributes){let r=uh[t]||t.toLowerCase();if(a[t]!==void 0){let i=n.accessors[e.attributes[t]];c[r]=oh[i.componentType].name,s[r]=i.normalized===!0}}return t.getDependency(`bufferView`,i).then(function(e){return new Promise(function(t,n){r.decodeDracoFile(e,function(e){for(let t in e.attributes){let n=e.attributes[t],r=s[t];r!==void 0&&(n.normalized=r)}t(e)},o,c,Mi,n)})})}},eh=class{constructor(){this.name=$.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0?e:(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0,e)}},th=class{constructor(){this.name=$.KHR_MESH_QUANTIZATION}},nh=class extends Sl{constructor(e,t,n,r){super(e,t,n,r)}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,i=e*r*3+r;for(let e=0;e!==r;e++)t[e]=n[i+e];return t}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=o*2,c=o*3,l=r-t,u=(n-t)/l,d=u*u,f=d*u,p=e*c,m=p-c,h=-2*f+3*d,g=f-d,_=1-h,v=g-d+u;for(let e=0;e!==o;e++){let t=a[m+e+o],n=a[m+e+s]*l,r=a[p+e+o],c=a[p+e]*l;i[e]=_*t+v*n+h*r+g*c}return i}},rh=new xa,ih=class extends nh{interpolate_(e,t,n,r){let i=super.interpolate_(e,t,n,r);return rh.fromArray(i).normalize().toArray(i),i}},ah={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},oh={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},sh={9728:dr,9729:mr,9984:fr,9985:hr,9986:pr,9987:gr},ch={33071:lr,33648:ur,10497:cr},lh={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},uh={POSITION:`position`,NORMAL:`normal`,TANGENT:`tangent`,TEXCOORD_0:`uv`,TEXCOORD_1:`uv1`,TEXCOORD_2:`uv2`,TEXCOORD_3:`uv3`,COLOR_0:`color`,WEIGHTS_0:`skinWeight`,JOINTS_0:`skinIndex`},dh={scale:`scale`,translation:`position`,rotation:`quaternion`,weights:`morphTargetInfluences`},fh={CUBICSPLINE:void 0,LINEAR:Ci,STEP:Si},ph={OPAQUE:`OPAQUE`,MASK:`MASK`,BLEND:`BLEND`};function mh(e){return e.DefaultMaterial===void 0&&(e.DefaultMaterial=new X({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:0})),e.DefaultMaterial}function hh(e,t,n){for(let r in n.extensions)e[r]===void 0&&(t.userData.gltfExtensions=t.userData.gltfExtensions||{},t.userData.gltfExtensions[r]=n.extensions[r])}function gh(e,t){t.extras!==void 0&&(typeof t.extras==`object`?Object.assign(e.userData,t.extras):console.warn(`THREE.GLTFLoader: Ignoring primitive type .extras, `+t.extras))}function _h(e,t,n){let r=!1,i=!1,a=!1;for(let e=0,n=t.length;e<n;e++){let n=t[e];if(n.POSITION!==void 0&&(r=!0),n.NORMAL!==void 0&&(i=!0),n.COLOR_0!==void 0&&(a=!0),r&&i&&a)break}if(!r&&!i&&!a)return Promise.resolve(e);let o=[],s=[],c=[];for(let l=0,u=t.length;l<u;l++){let u=t[l];if(r){let t=u.POSITION===void 0?e.attributes.position:n.getDependency(`accessor`,u.POSITION);o.push(t)}if(i){let t=u.NORMAL===void 0?e.attributes.normal:n.getDependency(`accessor`,u.NORMAL);s.push(t)}if(a){let t=u.COLOR_0===void 0?e.attributes.color:n.getDependency(`accessor`,u.COLOR_0);c.push(t)}}return Promise.all([Promise.all(o),Promise.all(s),Promise.all(c)]).then(function(t){let n=t[0],o=t[1],s=t[2];return r&&(e.morphAttributes.position=n),i&&(e.morphAttributes.normal=o),a&&(e.morphAttributes.color=s),e.morphTargetsRelative=!0,e})}function vh(e,t){if(e.updateMorphTargets(),t.weights!==void 0)for(let n=0,r=t.weights.length;n<r;n++)e.morphTargetInfluences[n]=t.weights[n];if(t.extras&&Array.isArray(t.extras.targetNames)){let n=t.extras.targetNames;if(e.morphTargetInfluences.length===n.length){e.morphTargetDictionary={};for(let t=0,r=n.length;t<r;t++)e.morphTargetDictionary[n[t]]=t}else console.warn(`THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.`)}}function yh(e){let t,n=e.extensions&&e.extensions[$.KHR_DRACO_MESH_COMPRESSION];if(t=n?`draco:`+n.bufferView+`:`+n.indices+`:`+bh(n.attributes):e.indices+`:`+bh(e.attributes)+`:`+e.mode,e.targets!==void 0)for(let n=0,r=e.targets.length;n<r;n++)t+=`:`+bh(e.targets[n]);return t}function bh(e){let t=``,n=Object.keys(e).sort();for(let r=0,i=n.length;r<i;r++)t+=n[r]+`:`+e[n[r]]+`;`;return t}function xh(e){switch(e){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw Error(`THREE.GLTFLoader: Unsupported normalized accessor component type.`)}}function Sh(e){return e.search(/\.jpe?g($|\?)/i)>0||e.search(/^data\:image\/jpeg/)===0?`image/jpeg`:e.search(/\.webp($|\?)/i)>0||e.search(/^data\:image\/webp/)===0?`image/webp`:e.search(/\.ktx2($|\?)/i)>0||e.search(/^data\:image\/ktx2/)===0?`image/ktx2`:`image/png`}var Ch=new K,wh=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new km,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,r=-1,i=!1,a=-1;if(typeof navigator<`u`&&navigator.userAgent!==void 0){let e=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(e)===!0;let t=e.match(/Version\/(\d+)/);r=n&&t?parseInt(t[1],10):-1,i=e.indexOf(`Firefox`)>-1,a=i?e.match(/Firefox\/([0-9]+)\./)[1]:-1}this.textureLoader=typeof createImageBitmap>`u`||n&&r<17||i&&a<98?new ql(this.options.manager):new vu(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Wl(this.options.manager),this.fileLoader.setResponseType(`arraybuffer`),this.options.crossOrigin===`use-credentials`&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let n=this,r=this.json,i=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(e){return e._markDefs&&e._markDefs()}),Promise.all(this._invokeAll(function(e){return e.beforeRoot&&e.beforeRoot()})).then(function(){return Promise.all([n.getDependencies(`scene`),n.getDependencies(`animation`),n.getDependencies(`camera`)])}).then(function(t){let a={scene:t[0][r.scene||0],scenes:t[0],animations:t[1],cameras:t[2],asset:r.asset,parser:n,userData:{}};return hh(i,a,r),gh(a,r),Promise.all(n._invokeAll(function(e){return e.afterRoot&&e.afterRoot(a)})).then(function(){for(let e of a.scenes)e.updateMatrixWorld();e(a)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let n=0,r=t.length;n<r;n++){let r=t[n].joints;for(let t=0,n=r.length;t<n;t++)e[r[t]].isBone=!0}for(let t=0,r=e.length;t<r;t++){let r=e[t];r.mesh!==void 0&&(this._addNodeRef(this.meshCache,r.mesh),r.skin!==void 0&&(n[r.mesh].isSkinnedMesh=!0)),r.camera!==void 0&&this._addNodeRef(this.cameraCache,r.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;let r=n.clone(),i=(e,t)=>{let n=this.associations.get(e);n!=null&&this.associations.set(t,n);for(let[n,r]of e.children.entries())i(r,t.children[n])};return i(n,r),r.name+=`_instance_`+e.uses[t]++,r}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){let r=e(t[n]);if(r)return r}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let n=[];for(let r=0;r<t.length;r++){let i=e(t[r]);i&&n.push(i)}return n}getDependency(e,t){let n=e+`:`+t,r=this.cache.get(n);if(!r){switch(e){case`scene`:r=this.loadScene(t);break;case`node`:r=this._invokeOne(function(e){return e.loadNode&&e.loadNode(t)});break;case`mesh`:r=this._invokeOne(function(e){return e.loadMesh&&e.loadMesh(t)});break;case`accessor`:r=this.loadAccessor(t);break;case`bufferView`:r=this._invokeOne(function(e){return e.loadBufferView&&e.loadBufferView(t)});break;case`buffer`:r=this.loadBuffer(t);break;case`material`:r=this._invokeOne(function(e){return e.loadMaterial&&e.loadMaterial(t)});break;case`texture`:r=this._invokeOne(function(e){return e.loadTexture&&e.loadTexture(t)});break;case`skin`:r=this.loadSkin(t);break;case`animation`:r=this._invokeOne(function(e){return e.loadAnimation&&e.loadAnimation(t)});break;case`camera`:r=this.loadCamera(t);break;default:if(r=this._invokeOne(function(n){return n!=this&&n.getDependency&&n.getDependency(e,t)}),!r)throw Error(`Unknown type: `+e)}this.cache.add(n,r)}return r}getDependencies(e){let t=this.cache.get(e);if(!t){let n=this,r=this.json[e+(e===`mesh`?`es`:`s`)]||[];t=Promise.all(r.map(function(t,r){return n.getDependency(e,r)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!==`arraybuffer`)throw Error(`THREE.GLTFLoader: `+t.type+` buffer type is not supported.`);if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[$.KHR_BINARY_GLTF].body);let r=this.options;return new Promise(function(e,i){n.load(gu.resolveURL(t.uri,r.path),e,void 0,function(){i(Error(`THREE.GLTFLoader: Failed to load buffer "`+t.uri+`".`))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency(`buffer`,t.buffer).then(function(e){let n=t.byteLength||0,r=t.byteOffset||0;return e.slice(r,r+n)})}loadAccessor(e){let t=this,n=this.json,r=this.json.accessors[e];if(r.bufferView===void 0&&r.sparse===void 0){let e=lh[r.type],t=oh[r.componentType],n=r.normalized===!0,i=new t(r.count*e);return Promise.resolve(new as(i,e,n))}let i=[];return r.bufferView===void 0?i.push(null):i.push(this.getDependency(`bufferView`,r.bufferView)),r.sparse!==void 0&&(i.push(this.getDependency(`bufferView`,r.sparse.indices.bufferView)),i.push(this.getDependency(`bufferView`,r.sparse.values.bufferView))),Promise.all(i).then(function(e){let i=e[0],a=lh[r.type],o=oh[r.componentType],s=o.BYTES_PER_ELEMENT,c=s*a,l=r.byteOffset||0,u=r.bufferView===void 0?void 0:n.bufferViews[r.bufferView].byteStride,d=r.normalized===!0,f,p;if(u&&u!==c){let e=Math.floor(l/u),n=`InterleavedBuffer:`+r.bufferView+`:`+r.componentType+`:`+e+`:`+r.count,c=t.cache.get(n);c||(f=new o(i,e*u,r.count*u/s),c=new xs(f,u/s),t.cache.add(n,c)),p=new Cs(c,a,l%u/s,d)}else f=i===null?new o(r.count*a):new o(i,l,r.count*a),p=new as(f,a,d);if(r.sparse!==void 0){let t=lh.SCALAR,n=oh[r.sparse.indices.componentType],s=r.sparse.indices.byteOffset||0,c=r.sparse.values.byteOffset||0,l=new n(e[1],s,r.sparse.count*t),u=new o(e[2],c,r.sparse.count*a);i!==null&&(p=new as(p.array.slice(),p.itemSize,p.normalized)),p.normalized=!1;for(let e=0,t=l.length;e<t;e++){let t=l[e];if(p.setX(t,u[e*a]),a>=2&&p.setY(t,u[e*a+1]),a>=3&&p.setZ(t,u[e*a+2]),a>=4&&p.setW(t,u[e*a+3]),a>=5)throw Error(`THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.`)}p.normalized=d}return p})}loadTexture(e){let t=this.json,n=this.options,r=t.textures[e].source,i=t.images[r],a=this.textureLoader;if(i.uri){let e=n.manager.getHandler(i.uri);e!==null&&(a=e)}return this.loadTextureImage(e,r,a)}loadTextureImage(e,t,n){let r=this,i=this.json,a=i.textures[e],o=i.images[t],s=(o.uri||o.bufferView)+`:`+a.sampler;if(this.textureCache[s])return this.textureCache[s];let c=this.loadImageSource(t,n).then(function(t){t.flipY=!1,t.name=a.name||o.name||``,t.name===``&&typeof o.uri==`string`&&o.uri.startsWith(`data:image/`)===!1&&(t.name=o.uri);let n=(i.samplers||{})[a.sampler]||{};return t.magFilter=sh[n.magFilter]||1006,t.minFilter=sh[n.minFilter]||1008,t.wrapS=ch[n.wrapS]||1e3,t.wrapT=ch[n.wrapT]||1e3,t.generateMipmaps=!t.isCompressedTexture&&t.minFilter!==1003&&t.minFilter!==1006,r.associations.set(t,{textures:e}),t}).catch(function(){return null});return this.textureCache[s]=c,c}loadImageSource(e,t){let n=this,r=this.json,i=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(e=>e.clone());let a=r.images[e],o=self.URL||self.webkitURL,s=a.uri||``,c=!1;if(a.bufferView!==void 0)s=n.getDependency(`bufferView`,a.bufferView).then(function(e){c=!0;let t=new Blob([e],{type:a.mimeType});return s=o.createObjectURL(t),s});else if(a.uri===void 0)throw Error(`THREE.GLTFLoader: Image `+e+` is missing URI and bufferView`);let l=Promise.resolve(s).then(function(e){return new Promise(function(n,r){let a=n;t.isImageBitmapLoader===!0&&(a=function(e){let t=new La(e);t.needsUpdate=!0,n(t)}),t.load(gu.resolveURL(e,i.path),a,void 0,r)})}).then(function(e){return c===!0&&o.revokeObjectURL(s),gh(e,a),e.userData.mimeType=a.mimeType||Sh(a.uri),e}).catch(function(e){throw console.error(`THREE.GLTFLoader: Couldn't load texture`,s),e});return this.sourceCache[e]=l,l}assignTexture(e,t,n,r){let i=this;return this.getDependency(`texture`,n.index).then(function(a){if(!a)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(a=a.clone(),a.channel=n.texCoord),i.extensions[$.KHR_TEXTURE_TRANSFORM]){let e=n.extensions===void 0?void 0:n.extensions[$.KHR_TEXTURE_TRANSFORM];if(e){let t=i.associations.get(a);a=i.extensions[$.KHR_TEXTURE_TRANSFORM].extendTexture(a,e),i.associations.set(a,t)}}return r!==void 0&&(a.colorSpace=r),e[t]=a,a})}assignFinalMaterial(e){let t=e.geometry,n=e.material,r=t.attributes.tangent===void 0,i=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){let e=`PointsMaterial:`+n.uuid,t=this.cache.get(e);t||(t=new Bc,Ts.prototype.copy.call(t,n),t.color.copy(n.color),t.map=n.map,t.sizeAttenuation=!1,this.cache.add(e,t)),n=t}else if(e.isLine){let e=`LineBasicMaterial:`+n.uuid,t=this.cache.get(e);t||(t=new Ec,Ts.prototype.copy.call(t,n),t.color.copy(n.color),t.map=n.map,this.cache.add(e,t)),n=t}if(r||i||a){let e=`ClonedMaterial:`+n.uuid+`:`;r&&(e+=`derivative-tangents:`),i&&(e+=`vertex-colors:`),a&&(e+=`flat-shading:`);let t=this.cache.get(e);t||(t=n.clone(),i&&(t.vertexColors=!0),a&&(t.flatShading=!0),r&&(t.normalScale&&(t.normalScale.y*=-1),t.clearcoatNormalScale&&(t.clearcoatNormalScale.y*=-1)),this.cache.add(e,t),this.associations.set(t,this.associations.get(n))),n=t}e.material=n}getMaterialType(){return X}loadMaterial(e){let t=this,n=this.json,r=this.extensions,i=n.materials[e],a,o={},s=i.extensions||{},c=[];if(s[$.KHR_MATERIALS_UNLIT]){let e=r[$.KHR_MATERIALS_UNLIT];a=e.getMaterialType(),c.push(e.extendParams(o,i,t))}else{let n=i.pbrMetallicRoughness||{};if(o.color=new q(1,1,1),o.opacity=1,Array.isArray(n.baseColorFactor)){let e=n.baseColorFactor;o.color.setRGB(e[0],e[1],e[2],Mi),o.opacity=e[3]}n.baseColorTexture!==void 0&&c.push(t.assignTexture(o,`map`,n.baseColorTexture,ji)),o.metalness=n.metallicFactor===void 0?1:n.metallicFactor,o.roughness=n.roughnessFactor===void 0?1:n.roughnessFactor,n.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(o,`metalnessMap`,n.metallicRoughnessTexture)),c.push(t.assignTexture(o,`roughnessMap`,n.metallicRoughnessTexture))),a=this._invokeOne(function(t){return t.getMaterialType&&t.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(t){return t.extendMaterialParams&&t.extendMaterialParams(e,o)})))}i.doubleSided===!0&&(o.side=2);let l=i.alphaMode||ph.OPAQUE;if(l===ph.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,l===ph.MASK&&(o.alphaTest=i.alphaCutoff===void 0?.5:i.alphaCutoff)),i.normalTexture!==void 0&&a!==Ps&&(c.push(t.assignTexture(o,`normalMap`,i.normalTexture)),o.normalScale=new H(1,1),i.normalTexture.scale!==void 0)){let e=i.normalTexture.scale;o.normalScale.set(e,e)}if(i.occlusionTexture!==void 0&&a!==Ps&&(c.push(t.assignTexture(o,`aoMap`,i.occlusionTexture)),i.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=i.occlusionTexture.strength)),i.emissiveFactor!==void 0&&a!==Ps){let e=i.emissiveFactor;o.emissive=new q().setRGB(e[0],e[1],e[2],Mi)}return i.emissiveTexture!==void 0&&a!==Ps&&c.push(t.assignTexture(o,`emissiveMap`,i.emissiveTexture,ji)),Promise.all(c).then(function(){let n=new a(o);return i.name&&(n.name=i.name),gh(n,i),t.associations.set(n,{materials:e}),i.extensions&&hh(r,n,i),n})}createUniqueName(e){let t=Iu.sanitizeNodeName(e||``);return t in this.nodeNamesUsed?t+`_`+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,n=this.extensions,r=this.primitiveCache;function i(e){return n[$.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(e,t).then(function(n){return Eh(n,e,t)})}let a=[];for(let n=0,o=e.length;n<o;n++){let o=e[n],s=yh(o),c=r[s];if(c)a.push(c.promise);else{let e;e=o.extensions&&o.extensions[$.KHR_DRACO_MESH_COMPRESSION]?i(o):Eh(new bs,o,t),r[s]={primitive:o,promise:e},a.push(e)}}return Promise.all(a)}loadMesh(e){let t=this,n=this.json,r=this.extensions,i=n.meshes[e],a=i.primitives,o=[];for(let e=0,t=a.length;e<t;e++){let t=a[e].material===void 0?mh(this.cache):this.getDependency(`material`,a[e].material);o.push(t)}return o.push(t.loadGeometries(a)),Promise.all(o).then(function(n){let o=n.slice(0,n.length-1),s=n[n.length-1],c=[];for(let n=0,l=s.length;n<l;n++){let l=s[n],u=a[n],d,f=o[n];if(u.mode===ah.TRIANGLES||u.mode===ah.TRIANGLE_STRIP||u.mode===ah.TRIANGLE_FAN||u.mode===void 0)d=i.isSkinnedMesh===!0?new rc(l,f):new J(l,f),d.isSkinnedMesh===!0&&d.normalizeSkinWeights(),u.mode===ah.TRIANGLE_STRIP?d.geometry=Tm(d.geometry,1):u.mode===ah.TRIANGLE_FAN&&(d.geometry=Tm(d.geometry,2));else if(u.mode===ah.LINES)d=new Rc(l,f);else if(u.mode===ah.LINE_STRIP)d=new Pc(l,f);else if(u.mode===ah.LINE_LOOP)d=new zc(l,f);else if(u.mode===ah.POINTS)d=new Gc(l,f);else throw Error(`THREE.GLTFLoader: Primitive mode unsupported: `+u.mode);Object.keys(d.geometry.morphAttributes).length>0&&vh(d,i),d.name=t.createUniqueName(i.name||`mesh_`+e),gh(d,i),u.extensions&&hh(r,d,u),t.assignFinalMaterial(d),c.push(d)}for(let n=0,r=c.length;n<r;n++)t.associations.set(c[n],{meshes:e,primitives:n});if(c.length===1)return i.extensions&&hh(r,c[0],i),c[0];let l=new _o;i.extensions&&hh(r,l,i),t.associations.set(l,{meshes:e});for(let e=0,t=c.length;e<t;e++)l.add(c[e]);return l})}loadCamera(e){let t,n=this.json.cameras[e],r=n[n.type];if(!r){console.warn(`THREE.GLTFLoader: Missing camera parameters.`);return}return n.type===`perspective`?t=new su(ba.radToDeg(r.yfov),r.aspectRatio||1,r.znear||1,r.zfar||2e6):n.type===`orthographic`&&(t=new fu(-r.xmag,r.xmag,r.ymag,-r.ymag,r.znear,r.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),gh(t,n),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],n=[];for(let e=0,r=t.joints.length;e<r;e++)n.push(this._loadNodeShallow(t.joints[e]));return t.inverseBindMatrices===void 0?n.push(null):n.push(this.getDependency(`accessor`,t.inverseBindMatrices)),Promise.all(n).then(function(e){let n=e.pop(),r=e,i=[],a=[];for(let e=0,o=r.length;e<o;e++){let o=r[e];if(o){i.push(o);let t=new K;n!==null&&t.fromArray(n.array,e*16),a.push(t)}else console.warn(`THREE.GLTFLoader: Joint "%s" could not be found.`,t.joints[e])}return new cc(i,a)})}loadAnimation(e){let t=this.json,n=this,r=t.animations[e],i=r.name?r.name:`animation_`+e,a=[],o=[],s=[],c=[],l=[];for(let e=0,t=r.channels.length;e<t;e++){let t=r.channels[e],n=r.samplers[t.sampler],i=t.target,u=i.node,d=r.parameters===void 0?n.input:r.parameters[n.input],f=r.parameters===void 0?n.output:r.parameters[n.output];i.node!==void 0&&(a.push(this.getDependency(`node`,u)),o.push(this.getDependency(`accessor`,d)),s.push(this.getDependency(`accessor`,f)),c.push(n),l.push(i))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(s),Promise.all(c),Promise.all(l)]).then(function(e){let t=e[0],a=e[1],o=e[2],s=e[3],c=e[4],l=[];for(let e=0,r=t.length;e<r;e++){let r=t[e],i=a[e],u=o[e],d=s[e],f=c[e];if(r===void 0)continue;r.updateMatrix&&r.updateMatrix();let p=n._createAnimationTracks(r,i,u,d,f);if(p)for(let e=0;e<p.length;e++)l.push(p[e])}let u=new Fl(i,void 0,l);return gh(u,r),u})}createNodeMesh(e){let t=this.json,n=this,r=t.nodes[e];return r.mesh===void 0?null:n.getDependency(`mesh`,r.mesh).then(function(e){let t=n._getNodeRef(n.meshCache,r.mesh,e);return r.weights!==void 0&&t.traverse(function(e){if(e.isMesh)for(let t=0,n=r.weights.length;t<n;t++)e.morphTargetInfluences[t]=r.weights[t]}),t})}loadNode(e){let t=this.json,n=this,r=t.nodes[e],i=n._loadNodeShallow(e),a=[],o=r.children||[];for(let e=0,t=o.length;e<t;e++)a.push(n.getDependency(`node`,o[e]));let s=r.skin===void 0?Promise.resolve(null):n.getDependency(`skin`,r.skin);return Promise.all([i,Promise.all(a),s]).then(function(e){let t=e[0],n=e[1],r=e[2];r!==null&&t.traverse(function(e){e.isSkinnedMesh&&e.bind(r,Ch)});for(let e=0,r=n.length;e<r;e++)t.add(n[e]);if(t.userData.pivot!==void 0&&n.length>0){let e=t.userData.pivot,r=n[0];t.pivot=new U().fromArray(e),t.position.x-=e[0],t.position.y-=e[1],t.position.z-=e[2],r.position.set(0,0,0),delete t.userData.pivot}return t})}_loadNodeShallow(e){let t=this.json,n=this.extensions,r=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let i=t.nodes[e],a=i.name?r.createUniqueName(i.name):``,o=[],s=r._invokeOne(function(t){return t.createNodeMesh&&t.createNodeMesh(e)});return s&&o.push(s),i.camera!==void 0&&o.push(r.getDependency(`camera`,i.camera).then(function(e){return r._getNodeRef(r.cameraCache,i.camera,e)})),r._invokeAll(function(t){return t.createNodeAttachment&&t.createNodeAttachment(e)}).forEach(function(e){o.push(e)}),this.nodeCache[e]=Promise.all(o).then(function(t){let o;if(o=i.isBone===!0?new ic:t.length>1?new _o:t.length===1?t[0]:new go,o!==t[0])for(let e=0,n=t.length;e<n;e++)o.add(t[e]);if(i.name&&(o.userData.name=i.name,o.name=a),gh(o,i),i.extensions&&hh(n,o,i),i.matrix!==void 0){let e=new K;e.fromArray(i.matrix),o.applyMatrix4(e)}else i.translation!==void 0&&o.position.fromArray(i.translation),i.rotation!==void 0&&o.quaternion.fromArray(i.rotation),i.scale!==void 0&&o.scale.fromArray(i.scale);if(!r.associations.has(o))r.associations.set(o,{});else if(i.mesh!==void 0&&r.meshCache.refs[i.mesh]>1){let e=r.associations.get(o);r.associations.set(o,{...e})}return r.associations.get(o).nodes=e,o}),this.nodeCache[e]}loadScene(e){let t=this.extensions,n=this.json.scenes[e],r=this,i=new _o;n.name&&(i.name=r.createUniqueName(n.name)),gh(i,n),n.extensions&&hh(t,i,n);let a=n.nodes||[],o=[];for(let e=0,t=a.length;e<t;e++)o.push(r.getDependency(`node`,a[e]));return Promise.all(o).then(function(e){for(let t=0,n=e.length;t<n;t++){let n=e[t];n.parent===null?i.add(n):i.add(Em(n))}return r.associations=(e=>{let t=new Map;for(let[e,n]of r.associations)(e instanceof Ts||e instanceof La)&&t.set(e,n);return e.traverse(e=>{let n=r.associations.get(e);n!=null&&t.set(e,n)}),t})(i),i})}_createAnimationTracks(e,t,n,r,i){let a=[],o=e.name?e.name:e.uuid,s=[];function c(e){e.morphTargetInfluences&&s.push(e.name?e.name:e.uuid)}dh[i.path]===dh.weights?(c(e),e.isGroup&&e.children.forEach(c)):s.push(o);let l;switch(dh[i.path]){case dh.weights:l=Al;break;case dh.rotation:l=Ml;break;case dh.translation:case dh.scale:l=Pl;break;default:switch(n.itemSize){case 1:l=Al;break;default:l=Pl}}let u=r.interpolation===void 0?Ci:fh[r.interpolation],d=this._getArrayFromAccessor(n);for(let e=0,n=s.length;e<n;e++){let n=new l(s[e]+`.`+dh[i.path],t.array,d,u);r.interpolation===`CUBICSPLINE`&&this._createCubicSplineTrackInterpolant(n),a.push(n)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let e=xh(t.constructor),n=new Float32Array(t.length);for(let r=0,i=t.length;r<i;r++)n[r]=t[r]*e;t=n}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(e){return new(this instanceof Ml?ih:nh)(this.times,this.values,this.getValueSize()/3,e)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function Th(e,t,n){let r=t.attributes,i=new Vo;if(r.POSITION!==void 0){let e=n.json.accessors[r.POSITION],t=e.min,a=e.max;if(t!==void 0&&a!==void 0){if(i.set(new U(t[0],t[1],t[2]),new U(a[0],a[1],a[2])),e.normalized){let t=xh(oh[e.componentType]);i.min.multiplyScalar(t),i.max.multiplyScalar(t)}}else{console.warn(`THREE.GLTFLoader: Missing min/max properties for accessor POSITION.`);return}}else return;let a=t.targets;if(a!==void 0){let e=new U,t=new U;for(let r=0,i=a.length;r<i;r++){let i=a[r];if(i.POSITION!==void 0){let r=n.json.accessors[i.POSITION],a=r.min,o=r.max;if(a!==void 0&&o!==void 0){if(t.setX(Math.max(Math.abs(a[0]),Math.abs(o[0]))),t.setY(Math.max(Math.abs(a[1]),Math.abs(o[1]))),t.setZ(Math.max(Math.abs(a[2]),Math.abs(o[2]))),r.normalized){let e=xh(oh[r.componentType]);t.multiplyScalar(e)}e.max(t)}else console.warn(`THREE.GLTFLoader: Missing min/max properties for accessor POSITION.`)}}i.expandByVector(e)}e.boundingBox=i;let o=new fs;i.getCenter(o.center),o.radius=i.min.distanceTo(i.max)/2,e.boundingSphere=o}function Eh(e,t,n){let r=t.attributes,i=[];function a(t,r){return n.getDependency(`accessor`,t).then(function(t){e.setAttribute(r,t)})}for(let t in r){let n=uh[t]||t.toLowerCase();n in e.attributes||i.push(a(r[t],n))}if(t.indices!==void 0&&!e.index){let r=n.getDependency(`accessor`,t.indices).then(function(t){e.setIndex(t)});i.push(r)}return G.workingColorSpace!==`srgb-linear`&&`COLOR_0`in r&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${G.workingColorSpace}" not supported.`),gh(e,t),Th(e,t,n),Promise.all(i).then(function(){return t.targets===void 0?e:_h(e,t.targets,n)})}var Dh=new Om,Oh=new Map;function kh(e){let t=Oh.get(e.model);return t||(t=Dh.loadAsync(`/play/apex-turismo/models/cars/${e.model}?v=7`).then(e=>e.scene).catch(()=>Nh(e)),Oh.set(e.model,t)),t}var Ah=[`Wheel_FL`,`Wheel_FR`,`Wheel_RL`,`Wheel_RR`],jh={Glass:{name:`Glass`,color:1712684,metalness:0,roughness:.08,transmission:.75,thickness:.015,ior:1.45,transparent:!0,opacity:.92,depthWrite:!0,envMapIntensity:1},Chrome:{name:`Chrome`,color:14540253,metalness:1,roughness:.12,envMapIntensity:1.5},Rim:{name:`Rim`,color:10132126,metalness:.95,roughness:.3,envMapIntensity:1.3},Rubber:{name:`Rubber`,color:723723,roughness:.92,metalness:0},Trim:{name:`Trim`,color:1118481,roughness:.55,metalness:.1},Headlight:{name:`Headlight`,color:14674175,emissive:14674175,emissiveIntensity:.6,roughness:.15,metalness:.2},Taillight:{name:`Taillight`,color:9043968,emissive:16719888,emissiveIntensity:.35,roughness:.2},Brakelight:{name:`Brakelight`,color:6291456,emissive:16718344,emissiveIntensity:0,roughness:.2},Brake:{name:`Brake`,color:5579298,metalness:.6,roughness:.5},Interior:{name:`Interior`,color:1315860,roughness:.9}},Mh=class{isPlayer;root=new _o;wheels=[null,null,null,null];wheelSpin=[0,0,0,0];steeringWheel=null;paint=null;brakeLight=null;headLight=null;tailLight=null;headlamps=[];tmp=new U;constructor(e,t,n){this.isPlayer=n;let r=e.clone(!0);r.traverse(e=>{e instanceof J&&(e.castShadow=!0,e.receiveShadow=!1,e.material=this.materialFor(e.material,t),(e.name===`Glass`||e.material.name===`Glass`)&&(e.geometry.index?e.geometry.index.count/3:e.geometry.getAttribute(`position`).count/3)<80&&e.scale.set(.92,.97,.92));let n=Ah.indexOf(e.name);n>=0&&(this.wheels[n]=e,e.rotation.order=`YXZ`),e.name===`SteeringWheel`&&(this.steeringWheel=e)}),this.root.add(r)}materialFor(e,t){let n=e.name||``;if(n===`Paint`)return this.paint||(this.paint=new hl({color:new q(t),metalness:.4,roughness:.32,clearcoat:1,clearcoatRoughness:.05,envMapIntensity:1.3}),this.paint.name=`Paint`),this.paint;if(n===`Headlight`)return this.headLight=new X({...jh.Headlight}),this.headLight;if(n===`Taillight`)return this.tailLight=new X({...jh.Taillight}),this.tailLight;if(n===`Brakelight`)return this.brakeLight=new X({...jh.Brakelight}),this.brakeLight;if(n===`Glass`)return new hl({...jh.Glass});let r=jh[n];return r?new X({...r}):e}setColor(e){this.paint?.color.set(e)}enableHeadlamps(e){if(!this.headlamps.length)for(let t of[-1,1]){let n=new lu(15266047,400,140,.55,.5,1.2);n.position.set(t*e.widthM*.35,.7,-e.lengthM*.45),n.target.position.set(t*e.widthM*.2,.2,-e.lengthM*.45-40),n.castShadow=!1,this.root.add(n,n.target),this.headlamps.push(n)}}setNight(e){this.headLight&&(this.headLight.emissiveIntensity=e?6:.6),this.tailLight&&(this.tailLight.emissiveIntensity=e?2.5:.35)}update(e,t){e.bodyOrigin(this.tmp),this.root.position.copy(this.tmp),this.root.quaternion.copy(e.quat);for(let n=0;n<4;n++){let r=this.wheels[n];if(!r)continue;this.wheelSpin[n]=(this.wheelSpin[n]+e.wheels[n].omega*t)%(Math.PI*2),r.rotation.x=this.wheelSpin[n],r.rotation.y=-e.wheels[n].steer;let i=e.wheels[n].restCompression-e.wheels[n].compression;r.position.y=e.wheels[n].radius+i}if(this.steeringWheel&&(this.steeringWheel.rotation.z=-e.controls.steer*Math.PI*1.2),this.brakeLight){let n=e.controls.brake>.05?4.5:0;this.brakeLight.emissiveIntensity+=(n-this.brakeLight.emissiveIntensity)*Math.min(1,t*25)}}applyState(e,t,n,r,i,a,o){this.root.quaternion.copy(t),this.tmp.set(0,-a,0).applyQuaternion(t),this.root.position.copy(e).add(this.tmp);for(let e=0;e<4;e++){let t=this.wheels[e];t&&(t.rotation.x=n[e]%(Math.PI*2),t.rotation.y=e<2?-r:0,t.position.y=o)}this.steeringWheel&&(this.steeringWheel.rotation.z=-r*3),this.brakeLight&&(this.brakeLight.emissiveIntensity=i>.05?4.5:0)}dispose(){this.root.traverse(e=>{if(e instanceof J){let t=e.material;t!==this.paint&&t.dispose()}}),this.paint?.dispose()}};function Nh(e){let t=new _o;t.name=`Car`;let n=e.lengthM,r=e.widthM,i=e.heightM,a=new X({color:16777215,name:`Paint`}),o=new X({color:1118481,name:`Glass`}),s=new J(new Y(r*.92,i*.42,n*.96),a);s.name=`Body`,s.position.y=e.wheelRadiusM*.9+i*.21;let c=new J(new Y(r*.8,i*.4,n*.45),o);c.name=`Glass`,c.position.set(0,e.wheelRadiusM*.9+i*.42+i*.2,n*.05),t.add(s,c);let l=new J(new Y(r*.8,.08,.05),new X({color:6291456,name:`Brakelight`}));l.name=`Brakelights`,l.position.set(0,e.wheelRadiusM*.9+i*.3,n*.48),t.add(l);let u=new X({color:723723,name:`Rubber`}),d=new $c(e.wheelRadiusM,e.wheelRadiusM,.24,24);d.rotateZ(Math.PI/2);let f=e.wheelbaseM*(1-e.frontWeightBias),p=e.wheelbaseM*e.frontWeightBias,m=[[`Wheel_FL`,-e.trackM/2,-f],[`Wheel_FR`,e.trackM/2,-f],[`Wheel_RL`,-e.trackM/2,p],[`Wheel_RR`,e.trackM/2,p]];for(let[n,r,i]of m){let a=new J(d,u);a.name=n,a.position.set(r,e.wheelRadiusM,i),t.add(a)}return t}var Ph=class{renderer;group=new _o;car=null;currentId=null;angle=0;floor;loadToken=0;constructor(e){this.renderer=e,this.floor=new J(new Qc(14,64),new X({color:789777,roughness:.35,metalness:.3})),this.floor.rotation.x=-Math.PI/2,this.floor.receiveShadow=!0;let t=new J(new nl(6,6.15,96),new X({color:15251747,emissive:15251747,emissiveIntensity:1.2}));t.rotation.x=-Math.PI/2,t.position.y=.01;let n=new lu(16777215,380,60,.6,.5,1.6);n.position.set(8,12,8),n.castShadow=!0,n.shadow.mapSize.set(2048,2048);let r=new du(10470655,60,60);r.position.set(-9,5,-6);let i=new du(16769200,50,60);i.position.set(0,4,-10),this.group.add(this.floor,t,n,r,i),this.group.visible=!1}async show(e,t){if(!e){this.group.visible=!1,this.currentId=null;return}if(this.group.visible=!0,this.currentId===e.id){t&&this.car?.setColor(t);return}let n=++this.loadToken;this.currentId=e.id;let r=await kh(e);n===this.loadToken&&(this.clearCar(),this.car=new Mh(r,t??e.defaultColor,!0),this.car.root.position.set(0,0,0),this.group.add(this.car.root))}clearCar(){this.car&&=(this.group.remove(this.car.root),this.car.dispose(),null)}update(e){if(!this.group.visible)return;this.angle+=e*.25,this.car&&(this.car.root.rotation.y=this.angle);let t=this.renderer.camera;t.position.set(4.4,1.35,-5.2),t.lookAt(3.2,.4,0)}dispose(){this.clearCar()}},Fh=1.2,Ih=class{id;name;country;n;spacing;length;points;forwards;rights;normals;widths;curvatures;corners;bridge;coarseCell=24;coarse=new Int32Array;coarseCols=0;coarseRows=0;coarseMinX=0;coarseMinZ=0;constructor(e){this.id=e.id,this.name=e.name,this.country=e.country,this.n=e.points.length,this.spacing=e.sampleSpacingM,this.length=this.n*this.spacing,this.corners=e.corners,this.points=e.points.map(e=>new U(e[0],e[1],e[2])),this.widths=Float32Array.from(e.widths.length===this.n?e.widths:this.points.map(()=>12)),this.bridge=new Uint8Array(this.n),this.relaxTightCorners(),this.raiseCrossovers(),this.forwards=[],this.rights=[],this.normals=[],this.curvatures=new Float32Array(this.n),this.computeFrames(),this.buildCoarse()}relaxTightCorners(){let e=this.n,t=Math.max(10,this.widths[0]*.5+7),n=new Uint8Array(e),r=new Float64Array(e),i=new Float64Array(e);for(let a=0;a<200;a++){n.fill(0);let a=!1;for(let r=0;r<e;r++)Uh(this.points,r)>=t||(n[h(r-1,e)]=n[r]=n[h(r+1,e)]=1,a=!0);if(!a)return;for(let t=0;t<e;t++)r[t]=this.points[t].x,i[t]=this.points[t].z;for(let t=0;t<e;t++){if(!n[t])continue;let a=h(t-1,e),o=h(t+1,e);this.points[t].x=.5*r[t]+.25*(r[a]+r[o]),this.points[t].z=.5*i[t]+.25*(i[a]+i[o])}}}raiseCrossovers(){let e=this.n,t=[];for(let n=0;n<e;n++){let r=this.points[n],i=this.points[h(n+1,e)];for(let a=n+20;a<e;a++){if(n===0&&a>=e-20)continue;let o=this.points[a],s=this.points[h(a+1,e)];Wh(r,i,o,s)&&t.push(a)}}let n=Math.round(140/this.spacing);for(let r of t)for(let t=-n;t<=n;t++){let i=1-Math.abs(t)/n,a=7*(i*i*(3-2*i)),o=h(r+t,e);this.points[o].y+=a,Math.abs(t)<n*.55&&(this.bridge[o]=1)}}computeFrames(){let e=this.n,t=new U(0,1,0);for(let n=0;n<e;n++){let r=this.points[h(n-1,e)],i=this.points[h(n+1,e)],a=new U().subVectors(i,r).normalize(),o=new U().crossVectors(a,t).normalize(),s=new U().crossVectors(o,a).normalize();this.forwards.push(a),this.rights.push(o),this.normals.push(s)}for(let t=0;t<e;t++){let n=this.forwards[h(t-2,e)],r=this.forwards[h(t+2,e)],i=n.x*r.z-n.z*r.x,a=Math.atan2(i,n.x*r.x+n.z*r.z);this.curvatures[t]=a/(4*this.spacing)}}nearestIndexGlobal(e){let t=Rh(Math.floor((e.x-this.coarseMinX)/this.coarseCell),0,this.coarseCols-1),n=Rh(Math.floor((e.z-this.coarseMinZ)/this.coarseCell),0,this.coarseRows-1),r=this.coarse[n*this.coarseCols+t],i=r,a=zh(this.points[r],e);for(let t=-12;t<=12;t++){let n=h(r+t,this.n),o=zh(this.points[n],e);o<a&&(a=o,i=n)}return i}buildCoarse(){let e=1/0,t=-1/0,n=1/0,r=-1/0;for(let i of this.points)e=Math.min(e,i.x),t=Math.max(t,i.x),n=Math.min(n,i.z),r=Math.max(r,i.z);this.coarseMinX=e-700,this.coarseMinZ=n-700,this.coarseCols=Math.ceil((t-e+1400)/this.coarseCell),this.coarseRows=Math.ceil((r-n+1400)/this.coarseCell),this.coarse=new Int32Array(this.coarseCols*this.coarseRows);let i=Math.max(1,Math.floor(20/this.spacing));for(let e=0;e<this.coarseRows;e++){let t=this.coarseMinZ+(e+.5)*this.coarseCell;for(let n=0;n<this.coarseCols;n++){let r=this.coarseMinX+(n+.5)*this.coarseCell,a=0,o=1/0;for(let e=0;e<this.n;e+=i){let n=this.points[e],i=n.x-r,s=n.z-t,c=i*i+s*s;c<o&&(o=c,a=e)}this.coarse[e*this.coarseCols+n]=a}}}nearestIndex(e,t){if(t===null)return this.nearestIndexGlobal(e);let n=t,r=zh(this.points[t],e);for(let i=-30;i<=30;i++){let a=h(t+i,this.n),o=zh(this.points[a],e);o<r&&(r=o,n=a)}if(r>625){let t=this.nearestIndexGlobal(e);if(zh(this.points[t],e)<r)return t}return n}query(e,t,n){let r=this.nearestIndex(e,t),i=this.n,a=h(r-1,i),o=h(r+1,i),s=this.points,c=this.rights,l=Vh(s[a],s[r],c[a],c[r],e),u=Bh.d,d=Vh(s[r],s[o],c[r],c[o],e),f=Bh.d,p=(l<0?-l:l>1?l-1:0)<(d<0?-d:d>1?d-1:0),m=p?a:r,g=p?r:o,_=Rh(p?l:d,0,1),v=p?u:f,y=s[m].y+(s[g].y-s[m].y)*_,b=(this.widths[m]+(this.widths[g]-this.widths[m])*_)*.5,x=n??{index:0,s:0,lateral:0,halfWidth:0,height:0,forward:new U,right:new U,normal:new U,curvature:0};return x.index=r,x.s=Lh((m+_)*this.spacing,this.length),x.lateral=v,x.halfWidth=b,x.height=y,x.forward.copy(this.forwards[r]),x.right.copy(this.rights[r]),x.normal.copy(this.normals[r]),x.curvature=this.curvatures[r],x}surfaceAt(e,t,n){let r=Math.abs(e);return r<=t?`asphalt`:r<=t+1.2&&Math.abs(this.curvatures[n])>.004?`curb`:r<=t+3?`grass`:`gravel`}barrierDistance(e){return this.widths[e]*.5+7}pointAt(e,t=new U){let n=Lh(e,this.length)/this.spacing,r=Math.floor(n),i=n-r;return t.copy(this.points[h(r,this.n)]).lerp(this.points[h(r+1,this.n)],i)}indexAt(e){return h(Math.round(Lh(e,this.length)/this.spacing),this.n)}deltaS(e,t){let n=t-e,r=this.length;return n=(n%r+r)%r,n>r/2&&(n-=r),n}},Lh=(e,t)=>(e%t+t)%t,Rh=(e,t,n)=>e<t?t:e>n?n:e,zh=(e,t)=>(e.x-t.x)**2+(e.z-t.z)**2,Bh={d:0};function Vh(e,t,n,r,i){let a=i.x-e.x,o=i.z-e.z,s=t.x-e.x,c=t.z-e.z,l=r.x-n.x,u=r.z-n.z,d=a*n.z-o*n.x,f=a*u-o*l-(s*n.z-c*n.x),p=-(s*u-c*l),m;if(Math.abs(p)<1e-9)m=Math.abs(f)<1e-12?0:-d/f;else{let e=f*f-4*p*d;if(e<=0)m=-f/(2*p);else{let t=Math.sqrt(e),n=(-f+t)/(2*p),r=(-f-t)/(2*p);m=Hh(n)<=Hh(r)?n:r}}let h=Rh(m,0,1),g=n.x+h*l,_=n.z+h*u,v=g*g+_*_||1;return Bh.d=((a-h*s)*g+(o-h*c)*_)/v,m}var Hh=e=>e<0?-e:e>1?e-1:0;function Uh(e,t){let n=e.length,r=e[h(t-1,n)],i=e[t],a=e[h(t+1,n)],o=i.x-r.x,s=i.z-r.z,c=a.x-i.x,l=a.z-i.z,u=Math.abs(Math.atan2(o*l-s*c,o*c+s*l));return u<1e-6?1/0:.5*(Math.hypot(o,s)+Math.hypot(c,l))/u}function Wh(e,t,n,r){let i=Gh(n,r,e),a=Gh(n,r,t),o=Gh(e,t,n),s=Gh(e,t,r);return(i>0&&a<0||i<0&&a>0)&&(o>0&&s<0||o<0&&s>0)}function Gh(e,t,n){return(t.x-e.x)*(n.z-e.z)-(t.z-e.z)*(n.x-e.x)}async function Kh(e){let t=await fetch(`/play/apex-turismo/tracks/${e}.json`);if(!t.ok)throw Error(`Track ${e} could not be loaded (${t.status})`);return await t.json()}var qh=class{track;offsets;points;curvature;speed;constructor(e,t=1.8){this.track=e;let n=e.n;this.offsets=new Float32Array(n),this.optimise(t),this.points=[];for(let t=0;t<n;t++)this.points.push(e.points[t].clone().addScaledVector(e.rights[t],this.offsets[t]));this.curvature=new Float32Array(n),this.computeCurvature(),this.speed=new Float32Array(n),this.computeSpeeds(1.38,8.5,6,100)}optimise(e){let t=this.track,n=t.n,r=t.points.map(e=>new U(e.x,0,e.z)),i=r.map(e=>e.clone()),a=[40,24,14,8,5,3],o=new U;for(let s of a)for(let a=0;a<40;a++)for(let a=0;a<n;a++){let c=r[h(a-s,n)],l=r[h(a+s,n)];o.addVectors(c,l).multiplyScalar(.5);let u=t.rights[a],d=o.x-i[a].x,p=o.z-i[a].z,m=d*u.x+p*u.z,g=Math.max(.5,t.widths[a]*.5-e),_=f(m,-g,g),v=this.offsets[a];this.offsets[a]=v+(_-v)*.35,r[a].copy(i[a]).addScaledVector(u,this.offsets[a])}for(let e=0;e<6;e++){let e=Float32Array.from(this.offsets);for(let t=0;t<n;t++)this.offsets[t]=(e[h(t-2,n)]+e[h(t-1,n)]*2+e[t]*3+e[h(t+1,n)]*2+e[h(t+2,n)])/9}}computeCurvature(){let e=this.points.length;for(let t=0;t<e;t++){let n=this.points[h(t-2,e)],r=this.points[t],i=this.points[h(t+2,e)];this.curvature[t]=Jh(n,r,i)}let t=Float32Array.from(this.curvature);for(let n=0;n<e;n++){let r=0;for(let i=-2;i<=2;i++)r=Math.max(r,t[h(n+i,e)]);this.curvature[n]=r}}computeSpeeds(e,t,n,r){let i=this.points.length,a=this.track.spacing;for(let t=0;t<i;t++){let n=Math.max(this.curvature[t],1e-4);this.speed[t]=Math.min(r,Math.sqrt(e*9.81/n))}for(let e=0;e<2;e++){for(let e=i-1;e>=-i;e--){let n=h(e,i),r=h(e+1,i),o=Math.max(a,this.points[n].distanceTo(this.points[r])),s=Math.sqrt(this.speed[r]*this.speed[r]+2*t*o);this.speed[n]>s&&(this.speed[n]=s)}for(let e=0;e<2*i;e++){let t=h(e,i),o=h(e+1,i),s=Math.max(a,this.points[t].distanceTo(this.points[o])),c=n*Math.max(.25,1-this.speed[t]/(r*1.05)),l=Math.sqrt(this.speed[t]*this.speed[t]+2*c*s);this.speed[o]>l&&(this.speed[o]=l)}}}minSpeedAhead(e,t){let n=this.points.length,r=Math.ceil(t/this.track.spacing),i=1/0;for(let t=0;t<=r;t++)i=Math.min(i,this.speed[h(e+t,n)]);return i}};function Jh(e,t,n){let r=t.x-e.x,i=t.z-e.z,a=n.x-t.x,o=n.z-t.z,s=n.x-e.x,c=n.z-e.z,l=Math.abs(r*o-i*a),u=Math.hypot(r,i),d=Math.hypot(a,o),f=Math.hypot(s,c);return u*d*f<1e-6?0:2*l/(u*d*f)}var Yh=Math.PI*2/60,Xh=60/(Math.PI*2),Zh=.14,Qh=.25,$h=.9,eg=.45,tg=.9,ng=.8,rg=1.5,ig=.55,ag=.88,og=class{spec;rpm;gear=1;shiftTimer=0;torquePoints;ratios;finalDrive;reverseRatio;idle;redline;powerMul=1;limiterCut=0;launchHold=!1;upshiftRpm;reverseHold=0;autoLock=0;overRev=0;sinceUpshift=1/0;upshiftRoadRpm=1/0;downshiftRoadRpm=0;demandSmoothed=0;constructor(e,t=1){this.spec=e,this.torquePoints=e.torqueCurve.map(e=>({x:e.rpm,y:e.nm})),this.ratios=e.gearRatios,this.finalDrive=e.finalDrive*t,this.reverseRatio=e.reverseRatio,this.idle=e.idleRpm,this.redline=e.redlineRpm,this.rpm=e.idleRpm,this.upshiftRpm=this.ratios.map((e,t)=>this.optimalUpshiftRpm(t+1))}optimalUpshiftRpm(e){let t=this.redline*.8,n=this.redline*.98;if(e>=this.ratios.length)return n;let r=this.ratios[e-1],i=this.ratios[e];for(let e=t;e<n;e+=25){let t=g(this.torquePoints,e)*r;if(g(this.torquePoints,e*i/r)*i>=t)return e}return n}get ratio(){return this.gear===0?0:(this.gear<0?-this.reverseRatio:this.ratios[this.gear-1])*this.finalDrive}get maxGear(){return this.ratios.length}engineTorque(e){let t=this.rpm,n=g(this.torquePoints,t)*this.powerMul,r=.012*n+4e-6*t*t*.35,i=e;return t>=this.redline&&(this.limiterCut=.05),this.limiterCut>0&&(i=0),n*i-r*(1-i)}update(e,t,n){if(this.limiterCut>0&&(this.limiterCut-=e),this.shiftTimer>0&&(this.shiftTimer-=e),this.gear!==0&&this.shiftTimer<=0){let e=Math.abs(n*this.ratio)*Xh,r=this.idle+t*(this.redline*.42-this.idle);this.rpm=Math.max(e,r),this.rpm>this.redline+400&&(this.rpm=this.redline+400)}else{let n=this.idle+t*(this.redline-this.idle),r=t>.05?9e3:6e3,i=f(n-this.rpm,-r*e,r*e);this.rpm+=i}}axleTorque(e){return this.gear===0||this.shiftTimer>0?0:this.engineTorque(e)*this.ratio*$h}reflectedInertia(){return this.gear===0||this.shiftTimer>0?0:Qh*this.ratio*this.ratio}shiftUp(){return this.gear>=this.maxGear||this.shiftTimer>0?!1:(this.gear+=1,this.shiftTimer=Zh,!0)}shiftDown(){return this.gear<=-1||this.shiftTimer>0?!1:(--this.gear,this.shiftTimer=Zh,!0)}autoShift(e,t,n,r,i){if(this.autoLock>0&&(this.autoLock-=e),this.shiftTimer>0)return;if(this.gear===-1){r>-.3&&t>.2&&(this.gear=1);return}if(this.gear===0){this.gear=1;return}if(Math.abs(r)<.4&&n>.4&&t<.05&&!this.launchHold){this.reverseHold+=e,this.reverseHold>.9&&(this.gear=-1);return}this.reverseHold=0,this.overRev=this.rpm>=this.redline?this.overRev+e:0,this.sinceUpshift+=e;let a=sg((t-.1)/.8);this.demandSmoothed+=(a-this.demandSmoothed)*Math.min(1,e/.5);let o=Math.max(a,this.demandSmoothed);if(this.autoLock>0)return;let s=Math.abs(i),c=s*this.ratio*Xh,l=Math.max(t<.05?this.redline*ag:this.upshiftPoint(this.gear,o),this.downshiftRoadRpm*1.1),u=n<.25&&(c>l||this.overRev>.6);if(this.gear<this.maxGear&&r>1&&u){this.autoShiftTo(this.gear+1),this.sinceUpshift=0,this.upshiftRoadRpm=c,this.downshiftRoadRpm=0;return}if(this.gear>1&&this.wantsDownshift(t,n,o,s)){let e=this.ratios[this.gear-2]*this.finalDrive;this.autoShiftTo(this.gear-1),this.upshiftRoadRpm=1/0,this.downshiftRoadRpm=s*e*Xh}}wantsDownshift(e,t,n,r){let i=this.ratios[this.gear-2]*this.finalDrive,a=t>.25,o=this.rpm<this.redline*.4;if(this.sinceUpshift<rg&&!a&&!o)return!1;let s=a||e>.85,c=this.upshiftPoint(this.gear-1,s?1:n)*(s?ng:tg);return c=Math.min(c,this.upshiftRoadRpm*.85),Math.max(r*i*Xh,this.rpm*i/this.ratio)<c}upshiftPoint(e,t){let n=this.redline*ig;return n+(this.upshiftRpm[e-1]-n)*t}autoShiftTo(e){this.gear=e,this.shiftTimer=Zh,this.autoLock=eg,this.overRev=0}static toRad(e){return e*Yh}},sg=e=>{let t=f(e,0,1);return t*t*(3-2*t)},cg={asphalt:1,curb:.92,grass:.55,gravel:.6},lg={asphalt:.013,curb:.02,grass:.06,gravel:.14},ug=.35;function dg(e,t){return e<=0?0:e<1?e*(3-3*e+e*e):1-(1-t)*(1-Math.exp(-(e-1)*1.8))}function fg(e){return e<=0?3:e<1?3-6*e+3*e*e:0}function pg(e,t){return Math.atan2(-t,Math.max(Math.abs(e),1.5))}function mg(e,t){return f((e/t)**+ug,.7,1.4)}function hg(e,t,n=1){let r=f((Math.max(t,200)/e.nominalLoad)**+-e.loadSensitivity,.7,1.3);return e.mu*r*n}function gg(e,t,n,r,i){let a=Math.min(1,Math.max(Math.abs(n),.5)*r/i);return e+(t-e)*a}function _g(e,t,n,r,i,a,o,s,c){if(t<=0)return s.fx=s.fy=s.combinedSlip=s.slipRatio=s.slipAngle=s.stiffness=0,s;let l=Math.max(Math.abs(n),3),u=(i*a-n)/l,d=c??pg(n,r),f=mg(t,e.nominalLoad),p=e.peakSlipRatio*f,m=e.peakSlipAngle*f,h=u/p,g=d/m,_=Math.hypot(h,g),v=hg(e,t,o),y=v*t*dg(_,e.slideRatio),b=0,x=0;if(_>1e-6&&(b=h/_,x=g/_,_>1)){let e=i*a-n,t=-r,o=Math.hypot(e,t);if(o>1e-6){let n=Math.min(1,_-1),r=e/o,i=t/o;b=b*(1-n)+r*n,x=x*(1-n)+i*n;let a=Math.hypot(b,x);a>1e-6&&(b/=a,x/=a)}}let S=Math.min(1,(Math.abs(n)+Math.abs(i*a))/.6);return s.fx=y*b,s.fy=y*x*Math.max(.15,S),s.combinedSlip=_,s.slipRatio=u,s.slipAngle=d,s.stiffness=v*t*fg(_)*a/(p*l),s}function vg(e,t){let n={comfort:{mul:.88,kappa:.13,alpha:.15,slide:.86,loadSens:.08,relax:.5},sport:{mul:1,kappa:.11,alpha:.125,slide:.84,loadSens:.1,relax:.4},racing:{mul:1.16,kappa:.095,alpha:.105,slide:.82,loadSens:.12,relax:.3}}[e];return{mu:t*n.mul,peakSlipRatio:n.kappa,peakSlipAngle:n.alpha,nominalLoad:4e3,loadSensitivity:n.loadSens,slideRatio:n.slide,relaxationLength:n.relax}}function yg(e,t,n){if(Math.abs(e)<1e-4)return{left:0,right:0};let r=t/Math.tan(Math.abs(e)),i=Math.atan(t/(r-n/2)),a=Math.atan(t/(r+n/2)),o=Math.sign(e);return o>0?{left:o*a,right:o*i}:{left:o*i,right:o*a}}function bg(e,t,n,r){let i=e.steerLockDeg*Math.PI/180;if(r)return i;let a=Math.abs(n),o=f(2.2*t.peakSlipAngle/i,.12,.3),s=1/(1+(a/22)**1.35);return i*Math.max(o,s)}function xg(e,t,n,r){return e?12:n!==0&&Math.sign(r)!==0&&Math.sign(r)!==Math.sign(n)||Math.abs(r)<Math.abs(n)?10:Math.max(5,5+t*.04)}function Sg(e){let{spec:t,tyres:n,speed:r,directSteer:i,currentAngle:a,dt:o}=e,s=Math.abs(r),c=e.steerInput*bg(t,n,r,i),l=Math.sign(c)!==0&&Math.sign(c)===Math.sign(e.yawRate);if(!i&&s>8&&l){let r=n.peakSlipAngle*mg(e.frontAxleFz,n.nominalLoad),i=Math.abs(Math.atan(t.wheelbaseM*e.yawRate/Math.max(s,3)))+1.6*r;c=f(c,-i,i)}let u=xg(i,s,a,c);return a+f(c-a,-u*o,u*o)}function Cg(e,t,n,r,i){let a=Math.cos(n),o=Math.sin(n);return r.copy(e).multiplyScalar(a).addScaledVector(t,o),i.copy(t).multiplyScalar(a).addScaledVector(e,-o),{fw:r,rw:i}}function wg(e,t,n){if(t<=0||n<=.02)return{throttle:n,active:!1};let r=0;for(let t of e)t.driven&&t.contact&&(r=Math.max(r,t.force.combinedSlip));let i=t>=2?.55:.75;return r>i?{throttle:n*f(1-(r-i)/.5,.15,1),active:!0}:{throttle:n,active:!1}}function Tg(e,t,n,r,i,a){let o=n.brakeInput*n.torqueNm*(t?n.bias:1-n.bias)*.5;n.handbrake&&!t&&(o=Math.max(o,n.torqueNm*.35));let s=!1;if(n.absEnabled&&o>0&&e.contact&&Math.abs(r)>2){let t=-e.force.slipRatio;t>.12&&(o*=f(1-(t-.12)/.15,.2,1),s=!0)}if(e.brakeTorque=o,o>0){let t=o/a*i;Math.abs(e.omega)<=t?e.omega=0:e.omega-=Math.sign(e.omega)*t}return s}var Eg=1/240,Dg=9.81,Og=1.2,kg=.28,Ag=class{track;spec;tyres;drivetrain;pos=new U;quat=new xa;vel=new U;angVel=new U;wheels=[];mass;invInertiaLocal=new W;inertiaLocal=new U;controls={steer:0,throttle:0,brake:0,handbrake:!1};assists;transmission;query;trackHint=null;absActive=!1;directSteer=!1;weatherGrip=1;tcsActive=!1;steerAngle=0;speed=0;slipAngle=0;lateralG=0;longitudinalG=0;offTrackWheels=0;wallContact=0;forward=new U(0,0,-1);right=new U(1,0,0);up=new U(0,1,0);force=new U;torque=new U;tmp=new U;tmp2=new U;tmp3=new U;wheelQuery;lastVel=new U;invQuat=new xa;constructor(e,t,n,r,i){this.track=n,this.spec=_e(e,t);let a=this.spec;this.tyres=vg(t.tyres,a.tyreGrip),this.drivetrain=new og(e,t.finalDriveMul),this.drivetrain.powerMul=a.powerMul,this.assists=r,this.transmission=i,this.mass=a.massKg;let o=a.widthM,s=a.lengthM,c=a.heightM;this.inertiaLocal.set(this.mass/12*(c*c+s*s)*.9,this.mass/12*(o*o+s*s)*1,this.mass/12*(o*o+c*c)*.9),this.invInertiaLocal.set(1/this.inertiaLocal.x,0,0,0,1/this.inertiaLocal.y,0,0,0,1/this.inertiaLocal.z);let l=a.frontWeightBias,u=a.wheelbaseM*(1-l),d=-a.wheelbaseM*l,f=jg(a.drivetrain),p=(e,t,n)=>({local:new U(e,a.wheelRadiusM-a.cgHeightM,t),radius:a.wheelRadiusM,omega:0,steer:0,compression:0,compressionVel:0,contact:!1,fz:0,surface:`asphalt`,force:{fx:0,fy:0,combinedSlip:0,slipRatio:0,slipAngle:0,stiffness:0},driven:f[n],brakeTorque:0,contactPoint:new U,worldCenter:new U,skid:0,restCompression:0,slipAngleLag:0});this.wheels.push(p(-a.trackM/2,-u,0),p(a.trackM/2,-u,1),p(-a.trackM/2,-d,2),p(a.trackM/2,-d,3)),this.wheels.forEach((e,t)=>{let n=t<2?l/2:(1-l)/2;e.restCompression=this.mass*Dg*n/(t<2?a.springFront:a.springRear),e.compression=e.restCompression}),this.query=this.track.query(this.pos,null),this.wheelQuery=this.track.query(this.pos,null)}placeAt(e,t,n=0){let r=this.track,i=r.indexAt(e),a=r.pointAt(e,this.tmp),o=r.forwards[i],s=r.rights[i];this.pos.copy(a).addScaledVector(s,t),this.pos.y+=this.spec.cgHeightM+.01;let c=Math.atan2(-o.x,-o.z)+n;this.quat.setFromAxisAngle(new U(0,1,0),c),this.vel.set(0,0,0),this.angVel.set(0,0,0),this.trackHint=i,this.drivetrain.gear=1,this.drivetrain.rpm=this.drivetrain.idle;for(let e of this.wheels)e.omega=0,e.compression=e.restCompression;this.updateAxes(),this.track.query(this.pos,this.trackHint,this.query),this.trackHint=this.query.index}resetToTrack(){let e=this.track.query(this.pos,this.trackHint);this.placeAt(e.s,f(e.lateral,-e.halfWidth+2,e.halfWidth-2))}setControls(e,t){let n=this.controls,r=this.transmission===`auto`,i=this.drivetrain.gear===-1&&r;n.throttle=i?e.brake:e.throttle,n.brake=i?e.throttle:e.brake,n.handbrake=e.handbrake,n.steer=e.steer,this.directSteer=e.steerIsDirect,r||(e.shiftUp&&this.drivetrain.shiftUp(),e.shiftDown&&this.drivetrain.shiftDown()),this.applySteering(t)}steerScale(){return bg(this.spec,this.tyres,this.speed,this.directSteer)}applySteering(e){let t=(this.wheels[0].fz+this.wheels[1].fz)/2;this.steerAngle=Sg({spec:this.spec,tyres:this.tyres,speed:this.speed,yawRate:this.angVel.y,directSteer:this.directSteer,steerInput:this.controls.steer,currentAngle:this.steerAngle,frontAxleFz:t,dt:e})}updateAxes(){this.forward.set(0,0,-1).applyQuaternion(this.quat),this.right.set(1,0,0).applyQuaternion(this.quat),this.up.set(0,1,0).applyQuaternion(this.quat)}step(e){this.updateAxes(),this.force.set(0,-9.81*this.mass,0),this.torque.set(0,0,0),this.track.query(this.pos,this.trackHint,this.query),this.trackHint=this.query.index,this.speed=this.vel.dot(this.forward);let t=this.vel.dot(this.right);this.slipAngle=Math.abs(this.speed)>2?Math.atan2(t,Math.abs(this.speed)):0,this.updateSuspension(e),this.updateDrivetrainAndWheels(e),this.applyAero(),this.integrate(e),this.resolveBarriers(),this.lateralG=this.vel.clone().sub(this.lastVel).divideScalar(e).dot(this.right)/Dg,this.longitudinalG=this.vel.clone().sub(this.lastVel).divideScalar(e).dot(this.forward)/Dg,this.lastVel.copy(this.vel)}updateSuspension(e){let t=this.spec;this.offTrackWheels=0;for(let n=0;n<4;n++){let r=this.wheels[n],i=n<2,a=i?t.springFront:t.springRear,o=i?t.damperFront:t.damperRear,s=this.tmp.set(r.local.x,r.local.y+kg-r.restCompression,r.local.z).applyQuaternion(this.quat).add(this.pos),c=this.track.query(s,this.trackHint,this.wheelQuery);r.surface=this.track.surfaceAt(c.lateral,c.halfWidth,c.index),r.surface!==`asphalt`&&r.surface!==`curb`&&this.offTrackWheels++;let l=r.surface===`curb`?.03*Math.sin(c.s*6):0,u=c.height+l,d=Math.max(.5,this.up.y),p=(s.y-u)/d,m=kg+r.radius,h=r.compression;if(p>=m){r.contact=!1,r.compression=0,r.compressionVel=0,r.fz=0,r.worldCenter.copy(s).addScaledVector(this.up,-.28);continue}r.contact=!0;let g=r.restCompression+t.suspensionTravelM;r.compression=f(m-p,0,g),r.compressionVel=(r.compression-h)/e;let _=a*r.compression+o*r.compressionVel;m-p>g&&(_+=(m-p-g)*a*12);let v=this.wheels[n^1],y=i?t.antiRollFront:t.antiRollRear;_+=y*(r.compression-v.compression),r.fz=Math.max(0,_);let b=kg-r.compression;r.worldCenter.copy(s).addScaledVector(this.up,-b),r.contactPoint.copy(r.worldCenter).addScaledVector(this.up,-r.radius),this.tmp2.copy(this.up).multiplyScalar(r.fz),this.addForceAt(this.tmp2,s)}}updateDrivetrainAndWheels(e){let t=this.spec,n=this.drivetrain,r=0,i=0;for(let e of this.wheels)e.driven&&(r+=e.omega,i++);let a=i?r/i:0,o=yg(this.steerAngle,t.wheelbaseM,t.trackM);this.wheels[0].steer=o.left,this.wheels[1].steer=o.right;let s=this.controls.throttle;this.transmission===`auto`&&n.autoShift(e,s,this.controls.brake,this.speed,this.speed/t.wheelRadiusM);let c=wg(this.wheels,this.assists.tcs,s);s=c.throttle,this.tcsActive=c.active,n.update(e,s,a);let l=n.axleTorque(s),u=n.reflectedInertia(),d=t.drivetrain===`4WD`?t.frontTorqueSplit:+(t.drivetrain===`FF`),p=e/4,m={brakeInput:this.controls.brake,handbrake:this.controls.handbrake,absEnabled:this.assists.abs,torqueNm:t.brakeTorqueNm,bias:t.brakeBias};for(let e=0;e<4;e++)for(let t=0;t<4;t++){let n=this.wheels[t];if(!n.driven&&!n.contact&&Math.abs(n.omega)<.1)continue;let r=t<2,a=0;if(n.driven){a=l*(r?d:1-d)*.5;let e=this.wheels[t^1];a-=45*(n.omega-e.omega)}let o=1.1+(n.driven?u/Math.max(1,i):0),s=this.computeTyreForce(n,p),c=n.contact?lg[n.surface]*n.fz*n.radius*Math.sign(n.omega):0,h=a-s.fx*n.radius-c;n.omega+=h*p/(o+p*s.stiffness*n.radius),Tg(n,r,m,this.speed,p,o)&&(this.absActive=!0),e===3&&n.contact&&(this.tmp.copy(Cg(this.forward,this.right,n.steer,this.tmp2,this.tmp3).fw).multiplyScalar(s.fx).addScaledVector(this.tmp3,s.fy),this.addForceAt(this.tmp,n.contactPoint),n.skid=f((s.combinedSlip-1)/1.2,0,1)*Math.min(1,n.fz/1500))}}computeTyreForce(e,t){if(!e.contact)return e.force.fx=e.force.fy=e.force.combinedSlip=0,e.force.slipRatio=0,e.force;let n=Cg(this.forward,this.right,e.steer,this.tmp2,this.tmp3),r=this.pointVelocity(e.contactPoint,this.tmp),i=r.dot(n.fw),a=r.dot(n.rw),o=pg(i,a);return e.slipAngleLag=gg(e.slipAngleLag,o,i,t,this.tyres.relaxationLength),_g(this.tyres,e.fz,i,a,e.omega,e.radius,cg[e.surface]*this.weatherGrip,e.force,e.slipAngleLag)}applyAero(){let e=this.spec,t=this.vel.lengthSq();if(t<.01)return;let n=Math.sqrt(t),r=.5*Og*e.dragCd*e.frontalAreaM2*t;this.force.addScaledVector(this.vel,-r/n);let i=Math.max(0,this.speed),a=.5*Og*i*i,o=a*e.downforceFront*e.downforceMul,s=a*e.downforceRear*e.downforceMul,c=e.wheelbaseM*(1-e.frontWeightBias),l=e.wheelbaseM*e.frontWeightBias;this.tmp.copy(this.up).multiplyScalar(-o),this.addForceAt(this.tmp,this.tmp2.copy(this.pos).addScaledVector(this.forward,c)),this.tmp.copy(this.up).multiplyScalar(-s),this.addForceAt(this.tmp,this.tmp2.copy(this.pos).addScaledVector(this.forward,-l))}integrate(e){this.vel.addScaledVector(this.force,e/this.mass),this.pos.addScaledVector(this.vel,e);let t=this.tmp.copy(this.torque).applyQuaternion(this.invQuat.copy(this.quat).invert());t.x*=1/this.inertiaLocal.x,t.y*=1/this.inertiaLocal.y,t.z*=1/this.inertiaLocal.z,t.applyQuaternion(this.quat),this.angVel.addScaledVector(t,e),this.angVel.multiplyScalar(1-.4*e),this.assists.stability&&Math.abs(this.slipAngle)>.12&&(this.angVel.y*=1-2.5*e);let n=this.angVel.x*e*.5,r=this.angVel.y*e*.5,i=this.angVel.z*e*.5,a=this.quat,o=new xa(n,r,i,0).multiply(a);a.set(a.x+o.x,a.y+o.y,a.z+o.z,a.w+o.w).normalize()}resolveBarriers(){let e=this.spec,t=e.widthM/2,n=e.lengthM/2,r=0;for(let[e,i]of[[-t,-n],[t,-n],[-t,n],[t,n]]){let t=this.tmp.set(e,0,i).applyQuaternion(this.quat).add(this.pos),n=this.track.query(t,this.trackHint,this.wheelQuery),a=this.track.barrierDistance(n.index),o=Math.abs(n.lateral)-a;if(o<=0)continue;let s=Math.sign(n.lateral);this.pos.addScaledVector(n.right,-s*o);let c=this.vel.dot(n.right)*s;c>0&&(this.vel.addScaledVector(n.right,-s*c*1.25),this.vel.multiplyScalar(1-Math.min(.6,c*.05)),r=Math.max(r,c),this.angVel.y*=.5),this.vel.multiplyScalar(.995)}this.wallContact=r}tmpLever=new U;addForceAt(e,t){this.force.add(e);let n=this.tmpLever.subVectors(t,this.pos);this.torque.add(n.cross(e))}pointVelocity(e,t){return t.subVectors(e,this.pos),t.crossVectors(this.angVel,t),t.add(this.vel)}bodyOrigin(e){return e.copy(this.pos).addScaledVector(this.up,-this.spec.cgHeightM)}get rpm(){return this.drivetrain.rpm}get gear(){return this.drivetrain.gear}get speedKmh(){return Math.abs(this.speed)*3.6}};function jg(e){switch(e){case`FF`:return[!0,!0,!1,!1];case`4WD`:return[!0,!0,!0,!0];default:return[!1,!1,!0,!0]}}var Mg=new U,Ng=new U,Pg=class{vehicle;line;skill;avoidOffset=0;stuckTimer=0;reverseTimer=0;noise=1;noiseTimer=0;rng;carFactor;constructor(e,t,n,r){this.vehicle=e,this.line=t,this.skill=n,this.rng=_(r);let i=e.tyres.mu*.97;this.carFactor=Math.sqrt(i*.9/1.38)}update(e,t,n){let r=this.vehicle,i=r.query,a=r.track,o=a.n;this.updateNoise(e);let s=Math.max(0,r.speed),c=f(4+s*.45,6,30),l=h(i.index+Math.round(c/a.spacing),o),u=this.computeAvoidance(e,t,l);Mg.copy(a.points[l]).addScaledVector(a.rights[l],u),Ng.copy(Mg).sub(r.pos);let d=Ng.dot(r.right),p=Ng.dot(r.forward),m=this.lineTangent(l),g=Math.atan2(m.dot(r.right),Math.max(.05,m.dot(r.forward))),_=u-i.lateral,v=Math.atan(1.3*_/(s+3)),y=h(i.index+Math.round((s*.9+6)/a.spacing),o),b=Math.atan(r.spec.wheelbaseM*this.lineCurvature(y)),x=g+v+b-r.angVel.y*-.02,S=9.81*r.tyres.mu*.95*(1+this.aeroBoost(s)),C=Math.atan(r.spec.wheelbaseM*S/Math.max(25,s*s))*1.35+.03;x=f(x,-C,C);let w=f(x/r.steerScale(),-1,1);Math.abs(r.slipAngle)>.06&&(w+=f((r.slipAngle-Math.sign(r.slipAngle)*.06)*1.4,-.6,.6)),p<0&&i.lateral*i.lateral<400&&(w=d>=0?1:-1);let T=Math.min(this.targetSpeed(i.index,s)*this.noise,this.followCap)-s,E=0,D=0;T>0?E=f(.25+T*.45,0,1):D=f(-T*.3,0,1),E*=this.tractionLimit(s),this.blockedAhead>0&&(E=Math.min(E,1-this.blockedAhead),D=Math.max(D,this.blockedAhead>.7?this.blockedAhead-.4:0)),this.handleStuck(e,s),this.reverseTimer>0&&(E=0,D=1,w=-w),n.steer=f(w,-1,1),n.throttle=E,n.brake=D,n.handbrake=!1,n.shiftUp=n.shiftDown=!1}blockedAhead=0;followCap=1/0;tangentTmp=new U;lineTangent(e){let t=this.line.points,n=t.length;return this.tangentTmp.subVectors(t[h(e+1,n)],t[h(e-1,n)]).setY(0).normalize()}lineCurvature(e){let t=this.line.points,n=t.length,r=t[h(e-2,n)],i=t[e],a=t[h(e+2,n)],o=i.x-r.x,s=i.z-r.z,c=a.x-i.x,l=a.z-i.z,u=o*l-s*c,d=Math.hypot(o,s)*Math.hypot(c,l);return d<1e-6?0:-Math.asin(f(u/d,-1,1))/(2*this.line.track.spacing)}aeroBoost(e){let t=this.vehicle.spec,n=.6*e*e*(t.downforceFront+t.downforceRear)*t.downforceMul;return Math.min(1.2,n/(t.massKg*9.81))}tractionLimit(e){let t=this.vehicle,n=t.offTrackWheels>=2,r=f((n?.7:.45)+e/18,0,1);if(n&&e<8)return r;let i=f(1-(Math.abs(t.slipAngle)-.05)/.2,.15,1),a=e<8?1:f(1-(Math.abs(t.steerAngle)/t.steerScale()-.35)*.9,.35,1),o=0;for(let e of t.wheels)e.driven&&e.contact&&(o=Math.max(o,e.force.slipRatio));let s=f(1-(o-.1)/.15,.2,1);return r*i*a*s}targetSpeed(e,t){let n=6+t*.25,r=this.line.minSpeedAhead(e,n),i=Math.sqrt(1+.45*Math.min(1,this.aeroBoost(r*this.carFactor)));return r*this.skill*this.carFactor*i}updateNoise(e){if(this.noiseTimer-=e,this.noiseTimer<=0){this.noiseTimer=2+this.rng()*4;let e=(1-this.skill)*.12+.015;this.noise=1+(this.rng()*2-1)*e}}computeAvoidance(e,t,n){let r=this.vehicle,i=r.track,a=r.query,o=this.line.offsets[n],s=0,c=1/0,l=a.halfWidth-1.4;for(let e of t){if(e===r)continue;let t=i.deltaS(a.s,e.query.s),n=e.query.lateral-a.lateral,u=Math.max(0,r.speed-e.speed);if(t>0&&t<60&&Math.abs(n)<2.4){let n=4+Math.max(0,r.speed)*.7;c=Math.min(c,Math.max(2,e.speed+(t-n)*.5))}if(t>-6&&t<45&&Math.abs(n)<3.2){let r=e.query.lateral+l>l-e.query.lateral?-1:1,i=f(e.query.lateral+r*3,-l,l),a=f(1-t/45,0,1);o=o*(1-a)+i*a;let c=u>.5?t/u:99;t>0&&c<1.6&&Math.abs(n)<2.4&&(s=Math.max(s,f(1-c/1.6,0,1)))}else if(Math.abs(t)<5.5&&Math.abs(n)<2.6){let t=f(e.query.lateral-Math.sign(n||1)*2.4,-l,l);o=o*.4+t*.6}}this.followCap=c,this.blockedAhead=m(this.blockedAhead,s,.15,e);let u=3.5*e,d=m(this.avoidOffset,o,.4,e);return this.avoidOffset+=f(d-this.avoidOffset,-u,u),this.avoidOffset}handleStuck(e,t){if(this.reverseTimer>0){this.reverseTimer-=e;return}let n=this.vehicle,r=t<1&&(n.wallContact>0||n.offTrackWheels>=2||Math.abs(n.query.lateral)>n.query.halfWidth+2);this.stuckTimer=r?this.stuckTimer+e:0,this.stuckTimer>2.5&&(this.reverseTimer=1.4,this.stuckTimer=0)}},Fg=new U,Ig=new U;function Lg(e){return{cx:e.pos.x,cz:e.pos.z,fx:e.forward.x,fz:e.forward.z,rx:e.right.x,rz:e.right.z,hl:e.spec.lengthM*.5*.96,hw:e.spec.widthM*.5*.96}}function Rg(e,t,n){return Math.abs(t*e.fx+n*e.fz)*e.hl+Math.abs(t*e.rx+n*e.rz)*e.hw}function zg(e,t){let n=[[e.fx,e.fz],[e.rx,e.rz],[t.fx,t.fz],[t.rx,t.rz]],r=t.cx-e.cx,i=t.cz-e.cz,a=null;for(let[o,s]of n){let n=r*o+i*s,c=Rg(e,o,s)+Rg(t,o,s)-Math.abs(n);if(c<=0)return null;if(!a||c<a.depth){let e=n<0?-1:1;a={nx:o*e,nz:s*e,depth:c}}}return a}function Bg(e,t){let n=e.length;for(let r=0;r<n;r++){let i=e[r];for(let a=r+1;a<n;a++){let n=e[a],r=n.pos.x-i.pos.x,o=n.pos.z-i.pos.z,s=Math.abs(n.pos.y-i.pos.y);if(r*r+o*o>49||s>2.5)continue;let c=zg(Lg(i),Lg(n));if(!c)continue;let l=Vg(i,n,c.nx,c.nz,c.depth);l>300&&t.push({a:i,b:n,impulse:l})}}}function Vg(e,t,n,r,i){let a=1/e.mass,o=1/t.mass,s=a+o,c=i*.85;e.pos.x-=n*c*a/s,e.pos.z-=r*c*a/s,t.pos.x+=n*c*o/s,t.pos.z+=r*c*o/s;let l=(e.pos.x+t.pos.x)*.5,u=(e.pos.z+t.pos.z)*.5,d=Fg.set(l,(e.pos.y+t.pos.y)*.5,u),f=e.pointVelocity(d,new U),p=t.pointVelocity(d,Ig),m=p.x-f.x,h=p.z-f.z,g=m*n+h*r;if(g>0)return 0;let _={x:l-e.pos.x,z:u-e.pos.z},v={x:l-t.pos.x,z:u-t.pos.z},y=1/e.inertiaLocal.y,b=1/t.inertiaLocal.y,x=_.x*r-_.z*n,S=v.x*r-v.z*n,C=s+x*x*y+S*S*b,w=-1.18*g/C;Hg(e,-w*n,-w*r,_,y),Hg(t,w*n,w*r,v,b);let T=-r,E=n,D=m*T+h*E,O=Math.max(-w*.5,Math.min(w*.5,-D/C));return Hg(e,-O*T,-O*E,_,y),Hg(t,O*T,O*E,v,b),Math.abs(w)}function Hg(e,t,n,r,i){e.vel.x+=t/e.mass,e.vel.z+=n/e.mass,e.angVel.y+=(r.z*t-r.x*n)*i*.55}var Ug=class{entry;vehicle;ai;pp;lap=0;lastS;lapStartMs=0;currentLapMs=0;lastLapMs=null;bestLapMs=null;bestLapSectors=[];sectors=[null,null,null];sectorIndex=0;sectorStartMs=0;finished=!1;finishTimeMs=null;distance=0;invalidLap=!1;wrongWayTimer=0;position=1;input=rt();constructor(e,t,n,r){this.entry=e,this.vehicle=t,this.ai=n,this.pp=r,this.lastS=t.query.s}},Wg=class{track;config;participants=[];vehicles=[];line;state=`countdown`;clockMs=0;countdown=4;accumulator=0;message=null;messageTimer=0;collisionEvents=[];player;paused=!1;simTime=0;constructor(e,t,n,r,i,a){this.track=e,this.config=t,this.line=a??new qh(e);let o={abs:!0,tcs:1,stability:!1,racingLine:!1,autoBrake:!1};n.forEach((n,a)=>{let s=new Ag(n.spec,n.tuning,e,n.isPlayer?r:o,n.isPlayer?i:`auto`),c=Math.floor(a/2),l=a%2==0?-1:1,u=e.length-12-c*10-(l<0?0:5);if(s.placeAt(u,l*2.8),s.weatherGrip=t.weather===`rain`?.72:1,t.rollingStart){s.vel.copy(s.forward).multiplyScalar(22);for(let e of s.wheels)e.omega=22/e.radius;s.drivetrain.gear=2}let d=new Ug(n,s,n.isPlayer?null:new Pg(s,this.line,n.skill,1e3+a*17),ye(n.spec,n.tuning));d.lastS=s.query.s,this.participants.push(d),this.vehicles.push(s)});let s=this.participants.find(e=>e.entry.isPlayer);if(!s)throw Error(`A race needs a player`);this.player=s,t.mode!==`race`&&(this.countdown=0,this.state=`racing`)}update(e,t){if(this.paused)return;let n=Math.min(e,.1);this.state===`countdown`&&this.updateCountdown(n),this.accumulator+=n;let r=0;for(;this.accumulator>=.004166666666666667&&r<30;)this.stepPhysics(Eg,t),this.accumulator-=Eg,r++;this.state!==`countdown`&&(this.clockMs+=n*1e3),this.simTime+=n,this.messageTimer>0&&(this.messageTimer-=n,this.messageTimer<=0&&(this.message=null)),this.updateTiming(n),this.updateStandings(),t.shiftUp=t.shiftDown=!1}updateCountdown(e){let t=Math.ceil(this.countdown);this.countdown-=e;let n=Math.ceil(this.countdown);t!==n&&n>=1&&n<=3&&this.showMessage(String(n),1),this.countdown<=0&&(this.state=`racing`,this.showMessage(`GO!`,1.5))}stepPhysics(e,t){let n=this.state===`countdown`;for(let r of this.participants){if(r.vehicle.drivetrain.launchHold=n,r.ai)r.ai.update(e,this.vehicles,r.input),n&&(r.input.throttle=0,r.input.brake=1),r.vehicle.setControls(r.input,e);else{let i=t;n?r.vehicle.setControls({...i,throttle:0,brake:1,shiftUp:!1,shiftDown:!1},e):(r.vehicle.setControls(i,e),i.shiftUp=i.shiftDown=!1)}r.vehicle.absActive=!1}for(let t of this.vehicles)t.step(e);Bg(this.vehicles,this.collisionEvents)}updateTiming(e){let t=this.track.length;for(let n of this.participants){let r=n.vehicle.query.s;n.wrongWayTimer=this.track.deltaS(n.lastS,r)<-.05&&Math.abs(n.vehicle.speed)>3?n.wrongWayTimer+e:0;let i=n.lastS>t*.85&&r<t*.15,a=n.lastS<t*.15&&r>t*.85;i&&!n.finished&&this.state===`racing`&&this.onLineCrossed(n),a&&n.lap>0&&--n.lap,n.lastS=r,n.distance=n.lap*t+r,n.lap>0&&!n.finished&&(n.currentLapMs=this.clockMs-n.lapStartMs,this.updateSectors(n,r),n.vehicle.offTrackWheels>=4&&(n.invalidLap=!0))}}updateSectors(e,t){let n=this.track.length/3,r=Math.min(2,Math.floor(t/n));r!==e.sectorIndex&&r===e.sectorIndex+1&&(e.sectors[e.sectorIndex]=this.clockMs-e.sectorStartMs,e.sectorStartMs=this.clockMs,e.sectorIndex=r)}onLineCrossed(e){if(e.lap>0){let t=this.clockMs-e.lapStartMs;e.sectors[2]=this.clockMs-e.sectorStartMs,e.lastLapMs=t,!e.invalidLap&&(e.bestLapMs===null||t<e.bestLapMs)&&(e.bestLapMs=t,e.bestLapSectors=e.sectors.map(e=>e??0),e.entry.isPlayer&&this.config.mode!==`race`&&this.showMessage(`BEST LAP`,2))}e.lap+=1,e.lapStartMs=this.clockMs,e.sectorStartMs=this.clockMs,e.sectorIndex=0,e.sectors=[null,null,null],e.invalidLap=!1;let t=this.config.laps;this.config.mode===`race`&&(e.lap>t?(e.finished=!0,e.finishTimeMs=this.clockMs,e.entry.isPlayer&&(this.state=`finished`,this.showMessage(`FINISH`,4))):e.lap===t&&e.entry.isPlayer&&this.showMessage(`FINAL LAP`,2.5))}updateStandings(){[...this.participants].sort((e,t)=>e.finished&&t.finished?(e.finishTimeMs??0)-(t.finishTimeMs??0):e.finished===t.finished?t.distance-e.distance:e.finished?-1:1).forEach((e,t)=>e.position=t+1)}showMessage(e,t){this.message=e,this.messageTimer=t}gapMs(e,t){return e.finished&&t.finished?(t.finishTimeMs??0)-(e.finishTimeMs??0):(e.distance-t.distance)/Math.max(8,Math.abs(t.vehicle.speed))*1e3}standings(){let e=[...this.participants].sort((e,t)=>e.position-t.position),t=e[0];return e.map(e=>({name:e.entry.name,carName:e.entry.spec.name,position:e.position,lap:e.lap,gapMs:e===t?null:this.gapMs(t,e),bestLapMs:e.bestLapMs,isPlayer:e.entry.isPlayer,finished:e.finished}))}hud(e){let t=this.player,n=t.vehicle,r=[...this.participants].sort((e,t)=>e.position-t.position),i=r.indexOf(t);return e.speedKmh=n.speedKmh,e.rpm=n.rpm,e.redlineRpm=n.drivetrain.redline,e.gear=n.gear,e.throttle=n.controls.throttle,e.brake=n.controls.brake,e.position=t.position,e.totalCars=this.participants.length,e.lap=Math.max(1,Math.min(t.lap,this.config.laps)),e.totalLaps=this.config.laps,e.currentLapMs=t.lap>0?t.currentLapMs:0,e.lastLapMs=t.lastLapMs,e.bestLapMs=t.bestLapMs,e.deltaToBestMs=this.deltaToBest(t),e.sectorTimes=t.sectors,e.gapAheadMs=i>0?this.gapMs(r[i-1],t):null,e.gapBehindMs=i<r.length-1?this.gapMs(t,r[i+1]):null,e.countdown=this.state===`countdown`&&this.countdown<=3?Math.max(0,Math.ceil(this.countdown)):null,e.message=this.message,e.finished=t.finished,e.offTrack=n.offTrackWheels>=3,e.abs=n.absActive,e.tcs=n.tcsActive,e.carProgress=this.participants.map(e=>({s:e.vehicle.query.s/this.track.length,lateral:e.vehicle.query.lateral,color:e.entry.tuning.color,isPlayer:e.entry.isPlayer})),e.standings=this.standings(),e.wrongWay=t.wrongWayTimer>1.5,e.invalidLap=t.invalidLap,e}deltaToBest(e){if(e.bestLapMs===null||e.bestLapSectors.length<3||e.lap===0)return null;let t=e.vehicle.query.s/this.track.length,n=1/3,r=Math.min(2,Math.floor(t/n)),i=0;for(let t=0;t<r;t++)i+=e.bestLapSectors[t];return i+=e.bestLapSectors[r]*((t-r*n)/n),e.currentLapMs-i}results(){let e=[...this.participants].sort((e,t)=>e.position-t.position).map(e=>({...this.standings().find(t=>t.name===e.entry.name),totalTimeMs:e.finishTimeMs})),t=this.player.position,n=this.player.pp,r=t===1?1:t===2?.7:t===3?.5:.25,i=this.config.mode===`race`?Math.round(this.config.laps*900*(1+n/500)*r):0;return{config:this.config,entries:e,playerPosition:t,creditsEarned:i,newRecord:!1,bestLapMs:this.player.bestLapMs}}},Gg=6e3,Kg=class{mesh;positions;alphas;cursor=0;last=new Map;tmpL=new U;tmpR=new U;constructor(){this.positions=new Float32Array(Gg*6*3),this.alphas=new Float32Array(Gg*6);let e=new bs;e.setAttribute(`position`,new as(this.positions,3).setUsage(35048)),e.setAttribute(`alpha`,new as(this.alphas,1).setUsage(35048));let t=new pl({transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2,vertexShader:`attribute float alpha; varying float vA; void main(){ vA = alpha; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,fragmentShader:`varying float vA; void main(){ gl_FragColor = vec4(0.02,0.02,0.02, vA*0.55); }`});this.mesh=new J(e,t),this.mesh.frustumCulled=!1,this.mesh.renderOrder=2}update(e){let t=!1;for(let n=0;n<e.length;n++){let r=e[n];for(let e=0;e<4;e++){let i=r.wheels[e],a=`${n}-${e}`,o=i.surface===`asphalt`||i.surface===`curb`;if(!i.contact||i.skid<.25||!o||Math.abs(r.speed)<2){this.last.set(a,null);continue}let s=this.tmpL.copy(i.contactPoint).addScaledVector(r.right,-.11),c=this.tmpR.copy(i.contactPoint).addScaledVector(r.right,.11);s.y+=.015,c.y+=.015;let l=this.last.get(a);l?(this.pushQuad(l.l,l.r,s,c,Math.min(1,i.skid)),l.l.copy(s),l.r.copy(c),t=!0):this.last.set(a,{l:s.clone(),r:c.clone()})}}t&&(this.mesh.geometry.getAttribute(`position`).needsUpdate=!0,this.mesh.geometry.getAttribute(`alpha`).needsUpdate=!0)}pushQuad(e,t,n,r,i){let a=this.cursor%Gg;this.cursor++;let o=a*18,s=[e,t,n,t,r,n];for(let e=0;e<6;e++)this.positions[o+e*3]=s[e].x,this.positions[o+e*3+1]=s[e].y,this.positions[o+e*3+2]=s[e].z,this.alphas[a*6+e]=i}clear(){this.positions.fill(0),this.alphas.fill(0),this.last.clear(),this.cursor=0,this.mesh.geometry.getAttribute(`position`).needsUpdate=!0}},qg=600,Jg=class{points;pos;col;size;life;vel;maxLife;next=0;constructor(){this.pos=new Float32Array(qg*3),this.col=new Float32Array(qg*4),this.size=new Float32Array(qg),this.life=new Float32Array(qg),this.maxLife=new Float32Array(qg),this.vel=new Float32Array(qg*3);let e=new bs;e.setAttribute(`position`,new as(this.pos,3).setUsage(35048)),e.setAttribute(`color4`,new as(this.col,4).setUsage(35048)),e.setAttribute(`psize`,new as(this.size,1).setUsage(35048));let t=new pl({transparent:!0,depthWrite:!1,blending:1,uniforms:{map:{value:Yg()}},vertexShader:`attribute vec4 color4; attribute float psize; varying vec4 vC;
        void main(){ vC = color4; vec4 mv = modelViewMatrix * vec4(position,1.0); gl_PointSize = psize * (400.0 / -mv.z); gl_Position = projectionMatrix * mv; }`,fragmentShader:`uniform sampler2D map; varying vec4 vC; void main(){ vec4 t = texture2D(map, gl_PointCoord); gl_FragColor = vec4(vC.rgb, vC.a * t.a); }`});this.points=new Gc(e,t),this.points.frustumCulled=!1,this.points.renderOrder=3}emit(e,t,n,r,i,a){let o=this.next;this.next=(this.next+1)%qg,this.pos[o*3]=e.x,this.pos[o*3+1]=e.y,this.pos[o*3+2]=e.z,this.vel[o*3]=t.x+(Math.random()-.5)*1.5,this.vel[o*3+1]=t.y+Math.random()*1.2,this.vel[o*3+2]=t.z+(Math.random()-.5)*1.5,this.col[o*4]=n.r,this.col[o*4+1]=n.g,this.col[o*4+2]=n.b,this.col[o*4+3]=a,this.size[o]=r,this.life[o]=i,this.maxLife[o]=i}smoke=new q(.85,.85,.85);dust=new q(.55,.48,.35);tmpV=new U;updateFromVehicles(e,t){for(let n of e)for(let e of n.wheels){if(!e.contact)continue;let r=Math.abs(n.speed),i=e.surface===`grass`||e.surface===`gravel`,a=i?Math.min(1,r/25)*.6:e.skid>.45&&r>4?e.skid:0;if(a<=.05||Math.random()>a*t*40)continue;let o=this.tmpV.copy(n.vel).multiplyScalar(-.15);o.y=.4,this.emit(e.contactPoint,o,i?this.dust:this.smoke,i?1.6:2.2,i?1.2:1.6,i?.35:.42)}this.step(t)}step(e){for(let t=0;t<qg;t++){if(this.life[t]<=0)continue;this.life[t]-=e;let n=Math.max(0,this.life[t]/this.maxLife[t]);this.pos[t*3]+=this.vel[t*3]*e,this.pos[t*3+1]+=this.vel[t*3+1]*e,this.pos[t*3+2]+=this.vel[t*3+2]*e,this.vel[t*3]*=1-e*1.5,this.vel[t*3+2]*=1-e*1.5,this.size[t]+=e*3.5,this.col[t*4+3]=(this.life[t]<=0?0:n*n)*.45}let t=this.points.geometry;t.getAttribute(`position`).needsUpdate=!0,t.getAttribute(`color4`).needsUpdate=!0,t.getAttribute(`psize`).needsUpdate=!0}};function Yg(){let e=document.createElement(`canvas`);e.width=e.height=64;let t=e.getContext(`2d`),n=t.createRadialGradient(32,32,2,32,32,32);return n.addColorStop(0,`rgba(255,255,255,0.9)`),n.addColorStop(.5,`rgba(255,255,255,0.35)`),n.addColorStop(1,`rgba(255,255,255,0)`),t.fillStyle=n,t.fillRect(0,0,64,64),new Jc(e)}var Xg=2500,Zg=class{points;pos;box=28;height=24;constructor(){this.pos=new Float32Array(Xg*3);for(let e=0;e<Xg;e++)this.pos[e*3]=(Math.random()-.5)*this.box*2,this.pos[e*3+1]=Math.random()*this.height,this.pos[e*3+2]=(Math.random()-.5)*this.box*2;let e=new bs;e.setAttribute(`position`,new as(this.pos,3).setUsage(35048));let t=new pl({transparent:!0,depthWrite:!1,uniforms:{map:{value:Yg()}},vertexShader:`void main(){ vec4 mv = modelViewMatrix * vec4(position,1.0); gl_PointSize = min(90.0 / -mv.z, 14.0); gl_Position = projectionMatrix * mv; }`,fragmentShader:`uniform sampler2D map; void main(){ vec2 uv = gl_PointCoord; uv.y = (uv.y - 0.5) * 0.25 + 0.5; float a = texture2D(map, uv).a; gl_FragColor = vec4(0.75, 0.8, 0.9, a * 0.5); }`});this.points=new Gc(e,t),this.points.frustumCulled=!1,this.points.renderOrder=4}update(e,t,n){let r=14*e;for(let t=0;t<Xg;t++){let i=this.pos[t*3+1]-r,a=this.pos[t*3]+n.x*e,o=this.pos[t*3+2]+n.z*e;i<0&&(i+=this.height),a>this.box&&(a-=this.box*2),a<-this.box&&(a+=this.box*2),o>this.box&&(o-=this.box*2),o<-this.box&&(o+=this.box*2),this.pos[t*3]=a,this.pos[t*3+1]=i,this.pos[t*3+2]=o}this.points.position.set(t.x,t.y-6,t.z),this.points.geometry.getAttribute(`position`).needsUpdate=!0}},Qg=[`chase`,`chaseFar`,`hood`,`cockpit`,`bumper`],$g=class{camera;mode=`chase`;lookBack=!1;pos=new U;look=new U;tmp=new U;tmp2=new U;headingDir=new U(0,0,-1);smoothQuat=new xa;shake=0;fovBase=70;initialised=!1;constructor(e){this.camera=e}setBaseFov(e){this.fovBase=e}cycle(){return this.mode=Qg[(Qg.indexOf(this.mode)+1)%Qg.length],this.initialised=!1,this.mode}snap(){this.initialised=!1}update(e,t){let n=Math.abs(e.speed),r=e.bodyOrigin(this.tmp2);switch(this.mode){case`chase`:case`chaseFar`:this.updateChase(e,r,t,this.mode===`chaseFar`);break;case`hood`:this.updateAttached(e,r,0,e.spec.heightM*.72,-e.spec.lengthM*.28,t);break;case`cockpit`:this.updateAttached(e,r,-.36,e.spec.heightM*.7,e.spec.lengthM*.02,t);break;case`bumper`:this.updateAttached(e,r,0,.45,-e.spec.lengthM*.5+.1,t)}let i=f((n-30)/60,0,1)*8;this.camera.fov=m(this.camera.fov,this.fovBase+i,.4,t),this.camera.updateProjectionMatrix(),this.initialised=!0}updateChase(e,t,n,r){let i=Math.abs(e.speed),a=this.tmp.copy(e.vel);a.y=0,i>6&&a.lengthSq()>1?a.normalize():a.copy(e.forward).setY(0).normalize(),e.speed<-1&&a.negate();let o=this.lookBack?-1:1,s=this.headingDir.clone().lerp(a,this.initialised?1-Math.exp(-n/.35):1).normalize();this.headingDir.copy(s);let c=(r?7.5:5.6)+i*.02+e.spec.lengthM*.35,l=(r?2.4:1.7)+e.spec.heightM*.3,u=this.tmp.copy(t).addScaledVector(this.headingDir,-c*o);u.y=t.y+l,this.initialised?(this.pos.x=m(this.pos.x,u.x,.09,n),this.pos.z=m(this.pos.z,u.z,.09,n),this.pos.y=m(this.pos.y,u.y,.16,n)):this.pos.copy(u);let d=this.tmp.copy(t).addScaledVector(this.headingDir,3.5*o);d.y+=.9,this.initialised?this.look.lerp(d,1-Math.exp(-n/.05)):this.look.copy(d),this.applyShake(e,n),this.camera.position.copy(this.pos),this.camera.lookAt(this.look)}updateAttached(e,t,n,r,i,a){let o=this.tmp.set(n,r,i);this.lookBack&&(o.z=-o.z+e.spec.lengthM*.2);let s=o.applyQuaternion(e.quat).add(t),c=e.quat.clone();this.lookBack&&c.multiply(new xa().setFromAxisAngle(new U(0,1,0),Math.PI)),this.initialised?this.smoothQuat.slerp(c,1-Math.exp(-a/.045)):this.smoothQuat.copy(c),this.camera.position.copy(s),this.camera.quaternion.copy(this.smoothQuat),this.applyShake(e,a),this.camera.position.addScaledVector(e.up,this.shake*.02*Math.sin(performance.now()*.05))}applyShake(e,t){let n=(e.offTrackWheels>0?1:e.wheels.some(e=>e.surface===`curb`)?.5:0)*f(Math.abs(e.speed)/30,0,1)+Math.min(1,e.wallContact*.2);if(this.shake=m(this.shake,n,.1,t),this.mode===`chase`||this.mode===`chaseFar`){let e=performance.now()*.02;this.pos.y+=this.shake*.03*Math.sin(e*1.3),this.pos.x+=this.shake*.02*Math.sin(e*1.7)}}},e_={low:1500,medium:2200,high:3e3,ultra:6e3};function t_(e){return{quality:e,textureSize:e===`low`?256:512,treeCount:e_[e],catchFence:e!==`low`,tyreWalls:e!==`low`}}function n_(){return{geometries:[],materials:[],textures:[]}}function r_(e,...t){for(let n of t)e.geometries.push(...n.geometries),e.materials.push(...n.materials),e.textures.push(...n.textures);return e}function i_(e,t,n,r=0,i=new U){let a=e.points[t],o=e.rights[t];return i.set(a.x+o.x*n,a.y+r,a.z+o.z*n)}function a_(e){let t=new Float32Array(e.n),n=0;for(let r=1;r<e.n;r++)n+=e.points[r].distanceTo(e.points[r-1]),t[r]=n;return t}function o_(e,t,n,r=!1){let i=e.length,a=n?i:i-1,o=[],s=[],c=[];for(let n=0;n<a;n++){let a=n,l=(n+1)%i;s_(o,s,c,e[a],t[a],t[l],e[l],r)}let l=new bs;return l.setAttribute(`position`,new cs(o,3)),l.setAttribute(`uv`,new cs(s,2)),r&&l.setAttribute(`color`,new cs(c,3)),l.computeVertexNormals(),l}function s_(e,t,n,r,i,a,o,s){let c=[r,i,a,o],l=[0,1,1,0];for(let r of[0,1,2,0,2,3]){let i=c[r];if(e.push(i.pos.x,i.pos.y,i.pos.z),t.push(l[r],i.v),s){let e=i.color??[1,1,1];n.push(e[0],e[1],e[2])}}}function c_(e){let t=e.length;if(t===0)return[];if(e.every(Boolean))return[Array.from({length:t},(e,t)=>t)];let n=e.findIndex(e=>!e),r=[],i=[];for(let a=0;a<t;a++){let o=(n+a)%t;e[o]?i.push(o):i.length&&(r.push(i),i=[])}return i.length&&r.push(i),r}function l_(e,t){let n=e.indexAt(t);return{point:e.points[n],forward:e.forwards[n],right:e.rights[n],index:n}}function u_(e,t){let n=[],r=[];for(let i=0;i<e.n;i++){let a=e.curvatures[i];n.push(a>t),r.push(a<-t)}return{left:n,right:r}}function d_(e,t){let n=a_(e),r=[],i=[];for(let t=0;t<e.n;t++){let a=n[t]/8,o=e.widths[t]*.5;r.push({pos:i_(e,t,-o,-.02),v:a}),i.push({pos:i_(e,t,o,-.02),v:a})}let a=o_(r,i,!0,!1),o=new X({map:t.asphaltMap,normalMap:t.asphaltNormal,roughness:.85,metalness:0,side:2,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1}),s=new J(a,o);return s.name=`road-surface`,s.receiveShadow=!0,s.renderOrder=1,{mesh:s,disposables:{geometries:[a],materials:[o],textures:[]}}}var f_=1.1,p_=.006;function m_(e,t){let n=a_(e),r=[],i=[];for(let a=0;a<e.n;a++){let o=n[a]/8,s=t.points[a],c=e.rights[a];r.push({pos:s.clone().addScaledVector(c,-1.1).setY(s.y+p_),v:o}),i.push({pos:s.clone().addScaledVector(c,f_).setY(s.y+p_),v:o})}let a=o_(r,i,!0,!1),o=new Ps({color:0,transparent:!0,opacity:.18,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1,side:2}),s=new J(a,o);return s.name=`racing-groove`,{mesh:s,disposables:{geometries:[a],materials:[o],textures:[]}}}var h_=.15,g_=.01;function __(e){let t=[],n=[],r=[],i=[];for(let a=0;a<e.n;a++){let o=e.widths[a]*.5;t.push({pos:i_(e,a,-o,g_),v:0}),n.push({pos:i_(e,a,-o+h_,g_),v:1}),r.push({pos:i_(e,a,o-h_,g_),v:0}),i.push({pos:i_(e,a,o,g_),v:1})}let a=o_(t,n,!0,!1),o=o_(r,i,!0,!1),s=Cm([a,o],!1);a.dispose(),o.dispose();let c=new X({color:15921906,roughness:.6,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2}),l=new J(s,c);return l.name=`edge-lines`,{mesh:l,disposables:{geometries:[s],materials:[c],textures:[]}}}function v_(){return typeof document<`u`}function y_(e,t,n=[120,120,120,255]){if(!v_()){let e=new ac(new Uint8Array(n),1,1,Mr);return e.needsUpdate=!0,e}let r=document.createElement(`canvas`);r.width=e,r.height=e;let i=r.getContext(`2d`);if(!i)throw Error(`2D canvas context unavailable`);return t(i,e),new Jc(r)}function b_(e,t,n,r){e.wrapS=cr,e.wrapT=cr,e.repeat.set(t,n),e.anisotropy=8,r&&(e.colorSpace=ji),e.needsUpdate=!0}function x_(e,t,n){let r=Math.sin(e*127.1+t*311.7+n*74.7)*43758.5453;return r-Math.floor(r)}function S_(e,t,n){let r=Math.floor(e),i=Math.floor(t),a=e-r,o=t-i,s=x_(r,i,n),c=x_(r+1,i,n),l=x_(r,i+1,n),u=x_(r+1,i+1,n),d=a*a*(3-2*a),f=o*o*(3-2*o);return s+(c-s)*d+(l-s)*f+(s-c-l+u)*d*f}function C_(e,t,n,r=4){let i=0,a=.5,o=1,s=0;for(let c=0;c<r;c++)i+=S_(e*o,t*o,n+c*17.13)*a,s+=a,a*=.5,o*=2;return i/s}function w_(e,t={}){let n=t.width??256,r=t.height??128,i=t.bg??`#123a1f`,a=t.fg??`#ffffff`,o=t.fontPx??64;return y_(Math.max(n,r),t=>{t.canvas.width=n,t.canvas.height=r,t.fillStyle=i,t.fillRect(0,0,n,r),t.fillStyle=a,t.font=`bold ${o}px sans-serif`,t.textAlign=`center`,t.textBaseline=`middle`,t.fillText(e,n/2,r/2)},[255,255,255,255])}function T_(e,t,n=1.6){return y_(e,r=>{let i=r.createImageData(e,e),a=1/e;for(let r=0;r<e;r++)for(let o=0;o<e;o++){let s=o/e,c=r/e,l=t(s,c),u=t(s+a,c),d=t(s,c+a),f=(l-u)*n,p=(l-d)*n,m=Math.hypot(f,p,1),h=(r*e+o)*4;i.data[h]=(f/m*.5+.5)*255,i.data[h+1]=(p/m*.5+.5)*255,i.data[h+2]=(1/m*.5+.5)*255,i.data[h+3]=255}r.putImageData(i,0,0)},[128,128,255,255])}function E_(e){if(!v_())return T_(1,()=>0);let t=T_(e,e=>Math.sin(e*3*Math.PI*2)*.5+.5,3);return b_(t,1,1,!1),t}function D_(e,t){return C_(e*48,t*48,11,3)}function O_(e){let t=y_(e,t=>{t.fillStyle=`#3a3a3d`,t.fillRect(0,0,e,e);let n=t.getImageData(0,0,e,e);for(let t=0;t<e;t++)for(let r=0;r<e;r++){let i=r/e,a=t/e,o=C_(i*3,a*3,3,3),s=46+(C_(i*48,a*48,11,3)-.5)*30+(o-.55)*26,c=(t*e+r)*4;n.data[c]=s,n.data[c+1]=s,n.data[c+2]=s+1,n.data[c+3]=255}t.putImageData(n,0,0)},[58,58,60,255]);b_(t,1,1,!0);let n=T_(e,D_,1.4);return b_(n,1,1,!1),{map:t,normalMap:n}}function k_(e){let t=y_(e,t=>{let n=t.createImageData(e,e);for(let t=0;t<e;t++)for(let r=0;r<e;r++){let i=r/e,a=t/e,o=C_(i*60,a*60,21,3),s=C_(i*4,a*4,5,2),c=Math.max(0,s-.55)*2,l=90+o*55,u=40+o*30+c*90,d=30+o*20,f=(t*e+r)*4;n.data[f]=u,n.data[f+1]=l,n.data[f+2]=d,n.data[f+3]=255}t.putImageData(n,0,0)},[50,110,40,255]);return b_(t,1,1,!0),t}function A_(e){let t=y_(e,t=>{let n=t.createImageData(e,e);for(let t=0;t<e;t++)for(let r=0;r<e;r++){let i=r/e,a=t/e,o=150+(C_(i*40,a*40,31,4)-.5)*60,s=(t*e+r)*4;n.data[s]=o+10,n.data[s+1]=o,n.data[s+2]=o-20,n.data[s+3]=255}t.putImageData(n,0,0)},[170,160,140,255]);return b_(t,1,1,!0),t}function j_(e){let t=y_(e,t=>{let n=t.createImageData(e,e);for(let t=0;t<e;t++)for(let r=0;r<e;r++){let i=r/e,a=t/e,o=C_(i*6,a*6,41,4),s=(t*e+r)*4;n.data[s]=70+o*60,n.data[s+1]=95+o*70,n.data[s+2]=55+o*40,n.data[s+3]=255}t.putImageData(n,0,0)},[85,120,70,255]);return b_(t,1,1,!0),t}function M_(e){let t=y_(e,t=>{t.clearRect(0,0,e,e),t.strokeStyle=`rgba(20,20,22,0.85)`,t.lineWidth=Math.max(1,e/96);let n=e/8;t.beginPath();for(let r=-8;r<=16;r++)t.moveTo(r*n,0),t.lineTo(r*n+e,e),t.moveTo(r*n,e),t.lineTo(r*n+e,0);t.stroke()},[30,30,30,160]);return b_(t,1,1,!1),t.premultiplyAlpha=!1,t}function N_(e){let t=O_(e),n=k_(e),r=A_(e),i=j_(Math.max(e,512)),a=M_(Math.min(e,128)),o=E_(Math.min(e,128));return{asphaltMap:t.map,asphaltNormal:t.normalMap,grass:n,gravel:r,terrainVariation:i,catchFence:a,armcoNormal:o,all:[t.map,t.normalMap,n,r,i,a,o]}}var P_=.012;function F_(e){let t=e.points[0],n=e.forwards[0],r=e.widths[0]*.5+.3,i=t.clone().addScaledVector(n,-.5).setY(t.y+P_),a=t.clone().addScaledVector(n,.5).setY(t.y+P_),o=e.rights[0],s=o_([{pos:i.clone().addScaledVector(o,-r),v:0},{pos:a.clone().addScaledVector(o,-r),v:1}],[{pos:i.clone().addScaledVector(o,r),v:0},{pos:a.clone().addScaledVector(o,r),v:1}],!1,!1),c=Math.max(4,Math.round(r*2/.5)),l=y_(64,e=>{e.fillStyle=`#ffffff`,e.fillRect(0,0,64,64),e.fillStyle=`#101010`,e.fillRect(0,0,32,32),e.fillRect(32,32,32,32)});b_(l,c,2,!0);let u=new X({map:l,roughness:.7,side:2,polygonOffset:!0,polygonOffsetFactor:-3,polygonOffsetUnits:-3}),d=new J(s,u);return d.name=`start-finish-line`,{mesh:d,disposables:{geometries:[s],materials:[u],textures:[l]}}}var I_=2.4,L_=5,R_=.08;function z_(e,t,n,r,i){let a=[];for(let o=0;o<r;o++){let r=-(n+o*i),s=e.indexAt(r),c=i_(e,s,t,P_);a.push({center:c,forward:e.forwards[s],right:e.rights[s]})}return a}function B_(e){let t=z_(e,2.8,9,5,9),n=z_(e,-2.8,13.5,5,9),r=[];for(let e of[...t,...n])r.push(...V_(e));let i=Cm(r,!1);for(let e of r)e.dispose();let a=new X({color:16777215,roughness:.6,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2}),o=new J(i,a);return o.name=`grid-boxes`,{mesh:o,disposables:{geometries:[i],materials:[a],textures:[]}}}function V_(e){let t=I_/2,n=L_/2,r=(t,n)=>e.center.clone().addScaledVector(e.forward,t).addScaledVector(e.right,n);return[[r(-2.5,-1.2),r(n,-1.2)],[r(-2.5,t),r(n,t)],[r(-2.5,-1.2),r(-2.5,t)],[r(n,-1.2),r(n,t)]].map(([e,t])=>H_(e,t))}function H_(e,t){let n=t.clone().sub(e).normalize(),r=new U(-n.z,0,n.x).multiplyScalar(R_/2);return o_([{pos:e.clone().sub(r),v:0},{pos:t.clone().sub(r),v:1}],[{pos:e.clone().add(r),v:0},{pos:t.clone().add(r),v:1}],!1,!1)}function U_(e,t,n){let r=new _o;r.name=`road`;let i=n_(),a=d_(e,t);r.add(a.mesh);let o=__(e);r.add(o.mesh);let s=F_(e);r.add(s.mesh);let c=B_(e);if(r.add(c.mesh),r_(i,a.disposables,o.disposables,s.disposables,c.disposables),n){let t=m_(e,n);r.add(t.mesh),r_(i,t.disposables)}return{group:r,roadMeshes:[a.mesh],disposables:i}}var W_=.004,G_=8,K_=.03,q_=2,J_=[.75,.08,.08],Y_=[.92,.92,.92];function X_(e){let t=Array(e.n).fill(!1),n=Array(e.n).fill(!1),r=Array(e.n).fill(!1);for(let i=0;i<e.n;i++){let a=e.curvatures[i];r[i]=Math.abs(a)>W_,a>W_?n[i]=!0:a<-.004&&(t[i]=!0)}return Z_(e,r,t,n),{left:t,right:n}}function Z_(e,t,n,r){let i=e.n;for(let e=0;e<i;e++){let a=(e-1+i)%i;if(!(t[a]&&!t[e]))continue;let o=r[a];for(let a=0;a<G_;a++){let s=(e+a)%i;if(t[s])break;o?n[s]=!0:r[s]=!0}}}function Q_(e,t,n){let r=c_(t),i=[],a=Math.max(1,Math.round(q_/e.spacing));for(let t of r){if(t.length<2)continue;let r=[],o=[];for(let i of t){let t=e.widths[i]*.5,s=Math.floor(i/a)%2,c=s===0?J_:Y_,l=s===0?K_:0,u=n?-1:1;r.push({pos:i_(e,i,u*t),v:0,color:c}),o.push({pos:i_(e,i,u*(t+Fh),l),v:1,color:c})}i.push(n?o_(o,r,!1,!0):o_(r,o,!1,!0))}return i}function $_(e){let{left:t,right:n}=X_(e),r=[...Q_(e,t,!0),...Q_(e,n,!1)],i=r.length?Cm(r,!1):new bs;for(let e of r)e.dispose();let a=new X({vertexColors:!0,roughness:.8,side:2}),o=new J(i,a);return o.name=`curbs`,o.receiveShadow=!0,{mesh:o,disposables:{geometries:[i],materials:[a],textures:[]}}}var ev=.012,tv=6;function nv(e,t,n){let r=[],i=[];for(let t=0;t<e.n;t++){let a=e.curvatures[t],o=n?a>ev:a<-.012;r.push(o),i.push(!o)}return{gravelActive:r,grassActive:i,curb:t}}function rv(e,t,n,r,i){let a=c_(n),o=[];for(let n of a){if(n.length<2)continue;let a=[],s=[];for(let o of n){let n=e.widths[o]*.5,c=r[o]?n+Fh:n,l=e.barrierDistance(o),u=t[o]/tv;a.push({pos:i_(e,o,i*c),v:u}),s.push({pos:i_(e,o,i*l),v:u})}o.push(i===-1?o_(s,a,!1):o_(a,s,!1))}return o}function iv(e,t){let{left:n,right:r}=X_(e),i=a_(e),a=nv(e,n,!0),o=nv(e,r,!1),s=[...rv(e,i,a.grassActive,n,-1),...rv(e,i,o.grassActive,r,1)],c=[...rv(e,i,a.gravelActive,n,-1),...rv(e,i,o.gravelActive,r,1)],l=[],u={geometries:[],materials:[],textures:[]};if(s.length){let e=Cm(s,!1);for(let e of s)e.dispose();let n=new X({map:t.grass,roughness:1,side:2}),r=new J(e,n);r.name=`runoff-grass`,r.receiveShadow=!0,l.push(r),u.geometries.push(e),u.materials.push(n)}if(c.length){let e=Cm(c,!1);for(let e of c)e.dispose();let n=new X({map:t.gravel,roughness:1,side:2}),r=new J(e,n);r.name=`runoff-gravel`,r.receiveShadow=!0,l.push(r),u.geometries.push(e),u.materials.push(n)}return{meshes:l,disposables:u}}var av=2;function ov(e,t,n){let r=a_(e),i=[],a=[];for(let t=0;t<e.n;t++){let o=n*e.barrierDistance(t),s=r[t]/av;i.push({pos:i_(e,t,o,.15),v:s}),a.push({pos:i_(e,t,o,.9),v:s})}let o=o_(i,a,!0,!1),s=t.armcoNormal;s.repeat.set(1,e.length/av),s.needsUpdate=!0;let c=new X({color:10132128,normalMap:s,roughness:.55,metalness:.35,side:2}),l=new J(o,c);return l.name=n===1?`armco-right`:`armco-left`,l.castShadow=!0,l.receiveShadow=!0,{mesh:l,disposables:{geometries:[o],materials:[c],textures:[]}}}function sv(e,t){let n=ov(e,t,-1),r=ov(e,t,1);return{meshes:[n.mesh,r.mesh],disposables:{geometries:[...n.disposables.geometries,...r.disposables.geometries],materials:[...n.disposables.materials,...r.disposables.materials],textures:[]}}}var cv=4,lv=.95,uv=.1;function dv(e){let t=Math.max(1,Math.floor(e.length/cv))*2,n=new Y(uv,lv,uv),r=new X({color:7039855,roughness:.7,metalness:.2}),i=new _c(n,r,t);i.name=`barrier-posts`,i.castShadow=!0,i.receiveShadow=!0;let a=new go,o=new U(0,1,0),s=0,c=Math.floor(e.length/cv);for(let t=0;t<c;t++){let n=e.indexAt(t*cv);for(let t of[-1,1]){let r=e.points[n],c=e.rights[n],l=t*e.barrierDistance(n);a.position.set(r.x+c.x*l,r.y+lv/2,r.z+c.z*l),a.up.copy(o),a.lookAt(a.position.clone().add(c)),a.updateMatrix(),i.setMatrixAt(s++,a.matrix)}}return i.count=s,i.instanceMatrix.needsUpdate=!0,{mesh:i,disposables:{geometries:[n],materials:[r],textures:[]}}}var fv=.01,pv=1.4,mv=.35,hv=1.2,gv=.7;function _v(e){let{left:t,right:n}=u_(e,fv),r=[];if(vv(e,t,-1,r),vv(e,n,1,r),r.length===0)return{mesh:null,disposables:{geometries:[],materials:[],textures:[]}};let i=new $c(mv,mv,hv,12),a=new X({vertexColors:!0,roughness:.9}),o=new _c(i,a,r.length);o.name=`tyre-walls`,o.castShadow=!0,o.receiveShadow=!0;let s=new go,c=new q(1710618),l=new q(15263976),u=new q(10491928);return r.forEach((t,n)=>{let r=e.points[t.idx],i=e.rights[t.idx],a=t.sign*(e.barrierDistance(t.idx)-gv);s.position.set(r.x+i.x*a,r.y+hv/2,r.z+i.z*a),s.rotation.set(0,0,0),s.updateMatrix(),o.setMatrixAt(n,s.matrix);let d=n%5;o.setColorAt(n,d===0?l:d===1?u:c)}),o.instanceMatrix.needsUpdate=!0,o.instanceColor&&(o.instanceColor.needsUpdate=!0),{mesh:o,disposables:{geometries:[i],materials:[a],textures:[]}}}function vv(e,t,n,r){for(let i of c_(t)){let t=0;for(let a=0;a<i.length;a++){let o=i[a];t+=e.spacing,t>=pv&&(r.push({idx:o,sign:n}),t=0)}}}var yv=.01,bv=3,xv=1.2,Sv=5;function Cv(e,t,n,r){let i=[];for(let a of c_(t)){if(a.length<2)continue;let t=[],o=[];for(let i of a){let a=n*(e.barrierDistance(i)+xv),s=r[i]/4;t.push({pos:i_(e,i,a,0),v:s}),o.push({pos:i_(e,i,a,bv),v:s})}i.push(o_(t,o,!1))}return i}function wv(e,t){let n=0;for(let r of c_(t))n+=Math.max(1,Math.floor(r.length*e.spacing/Sv));return n}function Tv(e,t,n,r,i){let a=new go,o=i;for(let i of c_(t)){let t=0;for(let s of i){if(t+=e.spacing,t<Sv)continue;t=0;let i=i_(e,s,n*(e.barrierDistance(s)+xv),bv/2);a.position.copy(i),a.updateMatrix(),r.setMatrixAt(o++,a.matrix)}}return o}function Ev(e,t){let{left:n,right:r}=u_(e,yv),i=a_(e),a=[...Cv(e,n,-1,i),...Cv(e,r,1,i)],o={geometries:[],materials:[],textures:[]},s=[];if(a.length){let e=Cm(a,!1);for(let e of a)e.dispose();let n=new X({map:t.catchFence,transparent:!0,opacity:.85,side:2,roughness:.9}),r=new J(e,n);r.name=`catch-fence`,s.push(r),o.geometries.push(e),o.materials.push(n)}let c=wv(e,n)+wv(e,r),l=null;if(c>0){let t=new Y(.06,bv,.06),i=new X({color:5592405,roughness:.8});l=new _c(t,i,c),l.name=`catch-fence-posts`;let a=Tv(e,n,-1,l,0);Tv(e,r,1,l,a),l.count=c,l.instanceMatrix.needsUpdate=!0,o.geometries.push(t),o.materials.push(i)}return{group:s,posts:l,disposables:o}}function Dv(e,t,n){let r=new _o;r.name=`barriers`;let i=n_(),a=sv(e,t);for(let e of a.meshes)r.add(e);r_(i,a.disposables);let o=dv(e);if(r.add(o.mesh),r_(i,o.disposables),n.tyreWalls){let t=_v(e);t.mesh&&r.add(t.mesh),r_(i,t.disposables)}if(n.catchFence){let n=Ev(e,t);for(let e of n.group)r.add(e);n.posts&&r.add(n.posts),r_(i,n.disposables)}return{group:r,disposables:i}}var Ov=500,kv=25,Av=.4,jv=40,Mv=6,Nv=12,Pv=2,Fv=2,Iv=5*Math.SQRT2;function Lv(e){let t=1/0,n=-1/0,r=1/0,i=-1/0;for(let a of e.points)t=Math.min(t,a.x),n=Math.max(n,a.x),r=Math.min(r,a.z),i=Math.max(i,a.z);return{minX:t-Ov,maxX:n+Ov,minZ:r-Ov,maxZ:i+Ov}}function Rv(e,t){let n=e.points[t].y;return e.bridge[t]?n-7:n}function zv(e,t,n,r){let i=1/0;for(let a=-12;a<=Nv;a++){let o=h(r+a,e.n),s=e.points[o],c=s.x-t,l=s.z-n;if(c*c+l*l>900)continue;let u=Rv(e,o);u<i&&(i=u)}return Number.isFinite(i)?i:Rv(e,r)}function Bv(e,t,n,r){let i=0,a=0;for(let o=-12;o<=Nv;o++){let s=h(r+o,e.n),c=e.points[s],l=c.x-t,u=c.z-n,d=l*l+u*u,f=Math.exp(-d/800);i+=f,a+=f*Rv(e,s)}return i>0?a/i:Rv(e,r)}function Vv(e,t,n,r=0){let i=null;for(let a=0;a<e.n;a++){let o=e.points[a],s=e.barrierDistance(a)+Mv+r,c=t-o.x;if(c>s||c<-s)continue;let l=n-o.z;if(l>s||l<-s||c*c+l*l>s*s)continue;let u=Rv(e,a)-Av;i=i===null?u:Math.min(i,u)}return i}function Hv(e,t,n,r){let i=new U(t,0,n),a=e.query(i,r);i.y=a.height;let o=e.query(i,a.index),s=zv(e,t,n,o.index),c=e.barrierDistance(o.index)+Mv,l=Math.max(0,Math.abs(o.lateral)-c),u=Bv(e,t,n,o.index)+(C_(t/400,n/400,91,5)*2-1)*kv,d=Wv(0,jv,l),f=Uv(s-Av,u,d);if(l>0){let r=e.points[o.index];if((t-r.x)*(t-r.x)+(n-r.z)*(n-r.z)<1600){let r=Vv(e,t,n);r!==null&&(f=Math.min(f,r))}}return{y:f,hint:o.index,lateral:o.lateral,corridorEdge:c}}function Uv(e,t,n){return e+(t-e)*n}function Wv(e,t,n){let r=Math.max(0,Math.min(1,(n-e)/(t-e)));return r*r*(3-2*r)}function Gv(e,t,n,r){let i=n+1,a=t.length;for(let o=0;o<Fv;o++){let o=new Float32Array(a);for(let t=0;t<a;t++)o[t]=e[t*3+1];for(let a=0;a<=r;a++)for(let s=0;s<=n;s++){let c=a*i+s;if(!t[c])continue;let l=0,u=0;for(let e=-1;e<=1;e++){let t=a+e;if(!(t<0||t>r))for(let e=-1;e<=1;e++){let r=s+e;r<0||r>n||(l+=o[t*i+r],u++)}}e[c*3+1]=l/u}}}function Kv(e,t,n,r,i,a,o,s){let c=i+1;for(let l=0;l<n.n;l++){let u=n.points[l],d=n.barrierDistance(l)+Mv+o,f=Rv(n,l)-Av,p=d*d,m=Math.max(0,Math.floor((u.x-d-r.minX)/5)),h=Math.min(i,Math.ceil((u.x+d-r.minX)/5)),g=Math.max(0,Math.floor((u.z-d-r.minZ)/5)),_=Math.min(a,Math.ceil((u.z+d-r.minZ)/5));for(let n=g;n<=_;n++)for(let i=m;i<=h;i++){let a=n*c+i,o=r.minX+i*5,l=r.minZ+n*5,d=o-u.x,m=l-u.z;d*d+m*m>p||(t&&(t[a]=0),s&&e[a*3+1]>f&&(e[a*3+1]=f))}}}function qv(e,t){let n=Lv(e),r=Math.max(2,Math.ceil((n.maxX-n.minX)/5)),i=Math.max(2,Math.ceil((n.maxZ-n.minZ)/5)),a=new Float32Array((r+1)*(i+1)*3),o=new Float32Array((r+1)*(i+1)*2),s=new Uint8Array((r+1)*(i+1));s.fill(1);let c=new U,l=0,u=0;for(let t=0;t<=i;t++)for(let i=0;i<=r;i++){let r=n.minX+i*5,s=n.minZ+t*5,d=Hv(e,r,s,e.nearestIndexGlobal(c.set(r,0,s)));a[l++]=r,a[l++]=d.y,a[l++]=s,o[u++]=r/4e3,o[u++]=s/4e3}Kv(a,s,e,n,r,i,Pv,!1),Gv(a,s,r,i),Kv(a,null,e,n,r,i,Iv,!0);let d=[],f=r+1;for(let e=0;e<i;e++)for(let t=0;t<r;t++){let n=e*f+t,r=n+1,i=n+f,a=i+1;d.push(n,i,r,r,i,a)}let p=new bs;p.setAttribute(`position`,new cs(a,3)),p.setAttribute(`uv`,new cs(o,2)),p.setIndex(d),p.computeVertexNormals();let m=new X({map:t.terrainVariation,roughness:1}),h=new J(p,m);return h.name=`terrain`,h.receiveShadow=!0,{mesh:h,disposables:{geometries:[p],materials:[m],textures:[]}}}var Jv=20,Yv=.8,Xv=.15;function Zv(e,t){return e.points[t].y-7}function Qv(e,t,n){let r=[],i=[];for(let a of t){let t=n*(e.widths[a]*.5+Xv);r.push({pos:i_(e,a,t,-.05),v:0}),i.push({pos:i_(e,a,t,Yv),v:1})}return o_(r,i,!1)}function $v(e,t){return Math.max(1,Math.floor(t.length*e.spacing/Jv))}function ey(e){let t=new _o;t.name=`bridge-supports`;let n=c_(Array.from(e.bridge,e=>e===1)).filter(e=>e.length>1),r={geometries:[],materials:[],textures:[]};if(n.length===0)return{group:t,disposables:r};let i=[],a=0;for(let t of n)i.push(Qv(e,t,-1),Qv(e,t,1)),a+=$v(e,t);let o=Cm(i,!1);for(let e of i)e.dispose();let s=new X({color:12104877,roughness:.9}),c=new J(o,s);c.name=`bridge-parapet`,c.castShadow=!0,c.receiveShadow=!0,t.add(c),r.geometries.push(o),r.materials.push(s);let l=new Y(1.1,1,1.1),u=new X({color:10131086,roughness:.95}),d=new _c(l,u,Math.max(2,a*2));return d.name=`bridge-pillars`,d.castShadow=!0,d.receiveShadow=!0,ty(e,n,d),t.add(d),r.geometries.push(l),r.materials.push(u),{group:t,disposables:r}}function ty(e,t,n){let r=new go,i=0;for(let a of t){let t=0;for(let o of a){if(t+=e.spacing,t<Jv)continue;t=0;let a=e.points[o].y-.3,s=Zv(e,o),c=Math.max(1,a-s),l=e.barrierDistance(o)+1.5;for(let t of[-1,1]){let a=e.points[o],u=e.rights[o];r.position.set(a.x+u.x*t*l,s+c/2,a.z+u.z*t*l),r.scale.set(1,c,1),r.updateMatrix(),n.setMatrixAt(i++,r.matrix)}}}n.count=i,n.instanceMatrix.needsUpdate=!0}var ny=28,ry=6,iy=220,ay=14,oy=90,sy=8271265;function cy(e){let t=1/0,n=-1/0,r=1/0,i=-1/0;for(let a of e.points)t=Math.min(t,a.x),n=Math.max(n,a.x),r=Math.min(r,a.z),i=Math.max(i,a.z);return{minX:t-iy,maxX:n+iy,minZ:r-iy,maxZ:i+iy}}function ly(e,t){let n=_(sy),r=cy(e),i=Array.from({length:ay},()=>({x:r.minX+n()*(r.maxX-r.minX),z:r.minZ+n()*(r.maxZ-r.minZ)})),a=[],o=new U,s=0,c=0;for(;a.length<t&&c<t*6;){c++;let t,l;if(n()<.7){let e=i[Math.floor(n()*i.length)];t=e.x+(n()-.5)*oy*2,l=e.z+(n()-.5)*oy*2}else t=r.minX+n()*(r.maxX-r.minX),l=r.minZ+n()*(r.maxZ-r.minZ);o.set(t,0,l);let u=e.query(o,s);s=u.index;let d=Math.max(ny,e.barrierDistance(u.index)+ry);Math.abs(u.lateral)<d||a.push({x:t,z:l,variant:n()<.5?0:1,scale:.75+n()*.6,hint:s})}return a}function uy(){return{trunk:new X({color:5981746,roughness:1}),canopyA:new X({color:3107636,roughness:.95}),canopyB:new X({color:3963455,roughness:.95})}}function dy(e,t,n,r,i){let a=new go,o=_(8267669),s=0,c=0;t.forEach((t,l)=>{let u=Hv(e,t.x,t.z,t.hint).y;a.position.set(t.x,u+1.1*t.scale,t.z),a.rotation.set(0,o()*Math.PI*2,0),a.scale.setScalar(t.scale),a.updateMatrix(),n.setMatrixAt(l,a.matrix),n.setColorAt(l,new q().setHSL(.08,.3,.25+o()*.05));let d=t.variant===0?r:i,f=t.variant===0?s++:c++;a.position.set(t.x,u+3.6*t.scale,t.z),a.updateMatrix(),d.setMatrixAt(f,a.matrix),d.setColorAt(f,new q().setHSL(.32+o()*.05,.4,.28+o()*.08))}),r.count=s,i.count=c;for(let e of[n,r,i])e.instanceMatrix.needsUpdate=!0,e.instanceColor&&(e.instanceColor.needsUpdate=!0)}function fy(e,t){let n=new _o;n.name=`trees`;let r=ly(e,t),i=new $c(.18,.24,2.2,6),a=new el(1.6,3.2,7),o=new el(1.3,2.6,7),s=uy(),c=new _c(i,s.trunk,r.length),l=new _c(a,s.canopyA,r.length),u=new _c(o,s.canopyB,r.length);return c.castShadow=!0,l.castShadow=!0,u.castShadow=!0,c.receiveShadow=!0,dy(e,r,c,l,u),n.add(c,l,u),{group:n,disposables:{geometries:[i,a,o],materials:[s.trunk,s.canopyA,s.canopyB],textures:[]}}}function py(e,t,n){e.up.set(0,1,0);let r=new U(n.x,0,n.z);r.lengthSq()<1e-8?r.set(0,0,1):r.normalize(),e.lookAt(t.clone().add(r))}function my(e,t,n,r=0){let i=t.point.clone().addScaledVector(t.right,n);i.y+=r,e.position.copy(i),py(e,i,t.forward)}function hy(e,t){let n=0;for(let r=-3;r<=3;r++)n+=e.curvatures[h(t+r,e.n)];return n}function gy(e){let t=e.corners[0];return hy(e,t?t.index:Math.floor(e.n*.05))>0?-1:1}function _y(e){let t=new _o;return t.name=e,t}function vy(e,t){t.updateMatrixWorld(!0);let n=new U,r=new K,i=!1;return t.traverse(t=>{if(i||!(t instanceof J))return;if(t instanceof _c){let a=Math.max(1,Math.floor(t.count/64));for(let o=0;o<t.count;o+=a)if(t.getMatrixAt(o,r),n.set(0,.5,0).applyMatrix4(r).applyMatrix4(t.matrixWorld),yy(e,n)){i=!0;return}return}let a=t.geometry.getAttribute(`position`);if(!a)return;let o=Math.max(1,Math.floor(a.count/48));for(let r=0;r<a.count;r+=o)if(n.fromBufferAttribute(a,r).applyMatrix4(t.matrixWorld),yy(e,n)){i=!0;return}}),i}function yy(e,t){let n=e.query(t,null);if(Math.abs(n.lateral)>n.halfWidth)return!1;let r=t.y-n.height;return r>=-.3&&r<=4.5}var by=8,xy=14,Sy=-70,Cy=12,wy=15;function Ty(e){return Math.min(120,Math.max(30,e.length*.045))}function Ey(e){let t=_y(`pit-building`),n=gy(e),r=Ty(e),i={geometries:[],materials:[],textures:[]},a=new Y(xy,by,wy),o=new X({color:14211292,roughness:.8}),s=new Y(.4,by*.55,wy*.9),c=new X({color:1849938,roughness:.15,metalness:.4,emissive:661026});i.geometries.push(a,s),i.materials.push(o,c);let l=Math.max(1,Math.round(r/wy));for(let i=0;i<l;i++){let u=l_(e,Sy+(-r/2+(i+.5)*(r/l))),d=n*(e.barrierDistance(u.index)+Cy),f=new J(a,o);f.castShadow=!0,f.receiveShadow=!0,my(f,u,d,by/2),t.add(f);let p=new J(s,c);p.castShadow=!1,p.receiveShadow=!0,my(p,u,d-n*7.25,by*.5),t.add(p)}return vy(e,t)&&t.clear(),{group:t,disposables:i}}var Dy=-70,Oy=7,ky=1.1,Ay=.55,jy=.9,My=[2056104,2068303,12729147,14267180],Ny=10,Py=12;function Fy(e){return Math.min(90,Math.max(24,e.length*.035))}function Iy(e){let t=_y(`grandstand`),n=-gy(e),r=Fy(e),i={geometries:[],materials:[],textures:[]},a=new Y(.7,.4,.7),o=new X({vertexColors:!0,roughness:.9}),s=Math.max(1,Math.floor(r/jy)),c=new _c(a,o,Oy*s);c.castShadow=!0,c.receiveShadow=!0,Ly(e,n,r,s,c),t.add(c),i.geometries.push(a),i.materials.push(o);let l=new Y(8.700000000000001,Oy*Ay,Py),u=new X({color:9211024,roughness:.95}),d=new Y(10.700000000000001,.3,12.4),f=new X({color:3815999,roughness:.6});i.geometries.push(l,d),i.materials.push(u,f);let p=Math.max(1,Math.round(r/Py));for(let i=0;i<p;i++){let a=l_(e,Dy+(-r/2+(i+.5)*(r/p))),o=n*(e.barrierDistance(a.index)+Ny),s=new J(l,u);s.receiveShadow=!0,my(s,a,o+Oy*ky*n*.35,Oy*Ay/2-.5),t.add(s);let c=new J(d,f);c.castShadow=!0,my(c,a,o+Oy*ky*n*.4,5.450000000000001),t.add(c)}return vy(e,t)&&t.clear(),{group:t,disposables:i}}function Ly(e,t,n,r,i){let a=new go,o=_(388817),s=0;for(let c=0;c<Oy;c++){let l=.6+c*Ay;for(let u=0;u<r;u++){let r=l_(e,Dy+(-n/2+u*jy)),d=t*(e.barrierDistance(r.index)+Ny+c*ky),f=r.point.clone().addScaledVector(r.right,d);f.y+=l,a.position.copy(f),a.updateMatrix(),i.setMatrixAt(s,a.matrix),i.setColorAt(s,new q(My[Math.floor(o()*My.length)])),s++}}i.count=s,i.instanceMatrix.needsUpdate=!0,i.instanceColor&&(i.instanceColor.needsUpdate=!0)}var Ry=5.5,zy=5,By=16719904,Vy=4196874,Hy=2162496,Uy=667664;function Wy(e){let t=_y(`start-gantry`),n=e.widths[0]*.5+1,r=l_(e,0),i=new Y(.3,Ry,.3),a=new X({color:3158063,roughness:.8,metalness:.3}),o=new J(i,a),s=new J(i,a);my(o,r,-n,Ry/2),my(s,r,n,Ry/2);let c=new Y(n*2+.6,.4,.4),l=new X({color:3158063,roughness:.8,metalness:.3}),u=new J(c,l);my(u,r,0,Ry);let{lamps:d,redLamps:f,greenLamp:p}=Gy(r,n);return t.add(o,s,u,...d),{group:t,redLamps:f,greenLamp:p,disposables:{geometries:[i,c,...d.map(e=>e.geometry)],materials:[a,l,...f,p],textures:[]}}}function Gy(e,t){let n=new rl(.22,12,12),r=[],i=[];for(let a=0;a<zy;a++){let o=new X({color:Vy,emissive:Vy,roughness:.4});r.push(o);let s=new J(n,o);my(s,e,-t+(a+1)*(t*2)/6,4.9),i.push(s)}let a=new X({color:Uy,emissive:Uy,roughness:.4}),o=new J(n,a);return my(o,e,0,4.35),i.push(o),{lamps:i,redLamps:r,greenLamp:a}}var Ky=800,qy=3,Jy=2.4,Yy=2.4;function Xy(e){let t=_y(`marshal-huts`),n=new Y(qy,Yy,Jy),r=new X({color:14735776,roughness:.85}),i=new el(2.6,1.2,4),a=new X({color:9060159,roughness:.8}),o=Math.max(1,Math.floor(e.length/Ky));for(let s=0;s<o;s++){let o=l_(e,s*Ky+Ky*.5),c=(s%2==0?1:-1)*(e.barrierDistance(o.index)+4),l=new J(n,r);l.castShadow=!0,l.receiveShadow=!0,my(l,o,c,Yy/2);let u=new J(i,a);u.castShadow=!0,my(u,o,c,3),u.rotateY(Math.PI/4),t.add(l,u)}return{group:t,disposables:{geometries:[n,i],materials:[r,a],textures:[]}}}var Zy=.015,Qy=[150,100,50],$y=1,eb=.6;function tb(e){let t=_y(`distance-boards`),n={geometries:[],materials:[],textures:[]},r=c_(Array.from(e.curvatures,e=>Math.abs(e)>Zy)).filter(e=>e.length>1).map(e=>e[0]),i=new Y($y,eb,.05);n.geometries.push(i);let a=new Y(.1,2.2,.1),o=new X({color:3092271,roughness:.8});n.geometries.push(a),n.materials.push(o);for(let s of r)nb(e,s,t,i,a,o,n);return{group:t,disposables:n}}function nb(e,t,n,r,i,a,o){let s=t*e.spacing,c=hy(e,t)>0?-1:1,l=l_(e,s-Qy[0]),u=c*(e.barrierDistance(l.index)+2),d=new J(i,a);my(d,l,u,1.1),n.add(d),Qy.forEach((t,i)=>{let a=l_(e,s-Qy[0]),c=w_(String(t),{width:200,height:120,bg:`#123a1f`,fg:`#ffffff`,fontPx:72});o.textures.push(c);let l=new X({map:c,side:2,roughness:.7});o.materials.push(l);let d=new J(r,l);my(d,a,u,2.1-i*.7),n.add(d)})}var rb=[2056104,12729147,16777215,14267180],ib=[-40,-20,0,20],ab=5,ob=60;function sb(e){let t=_y(`flag-poles`),n=-gy(e),r=new $c(.05,.05,ab,6),i=new X({color:13619151,roughness:.6,metalness:.3}),a=new tl(1.4,.9,8,1),o=[],s=[],c=[a];return ib.forEach((l,u)=>{let d=l_(e,-70+l),f=n*(e.barrierDistance(d.index)+3),p=new J(r,i);my(p,d,f,ab/2),t.add(p);let m=new X({color:rb[u%rb.length],side:2,roughness:.8});s.push(m);let h=u===0?a:a.clone();u>0&&c.push(h);let g=new J(h,m);my(g,d,f,4.4),t.add(g),o.push(g)}),{group:t,flags:o,disposables:{geometries:[r,...c],materials:[i,...s],textures:[]}}}function cb(e,t){let n=_y(`light-poles`),r={geometries:[],materials:[],textures:[]};if(t!==`night`)return{group:n,disposables:r};let i=new $c(.08,.1,7,6),a=new X({color:5592405,roughness:.7}),o=new $c(.25,.25,.25,8),s=new X({color:16773824,emissive:16773824,emissiveIntensity:1.6});r.geometries.push(i,o),r.materials.push(a,s);let c=Math.floor(e.length/ob);for(let t=0;t<c;t++){let r=l_(e,t*ob),c=(t%2==0?1:-1)*(e.barrierDistance(r.index)+2.5),l=new J(i,a);my(l,r,c,3.5);let u=new J(o,s);my(u,r,c,7),n.add(l,u)}return{group:n,disposables:r}}var lb=1.6,ub=.7;function db(e){let t=_y(`corner-signs`),n={geometries:[],materials:[],textures:[]},r=new Y(lb,ub,.06);n.geometries.push(r);for(let i of e.corners){let a=l_(e,i.index*e.spacing),o=(hy(e,i.index)>0?-1:1)*(e.barrierDistance(a.index)+2.5),s=w_(i.number===null?i.name:`${i.number} ${i.name}`,{width:512,height:200,bg:`#0d3a1e`,fg:`#ffffff`,fontPx:56});n.textures.push(s);let c=new X({map:s,side:2,roughness:.7});n.materials.push(c);let l=new J(r,c);my(l,a,o,2.2),t.add(l)}return{group:t,disposables:n}}function fb(e,t){let n=new _o;n.name=`furniture`;let r=n_(),i=Ey(e),a=Iy(e),o=Wy(e),s=Xy(e),c=tb(e),l=db(e),u=sb(e),d=cb(e,t.timeOfDay);n.add(i.group,a.group,o.group,s.group,c.group,l.group,u.group,d.group),r_(r,i.disposables,a.disposables,o.disposables,s.disposables,c.disposables,l.disposables,u.disposables,d.disposables);let f=e=>{o.redLamps.forEach((t,n)=>{let r=e>=0&&n<e;t.color.setHex(r?By:Vy),t.emissive.setHex(r?By:Vy)});let t=e===-1;o.greenLamp.color.setHex(t?Hy:Uy),o.greenLamp.emissive.setHex(t?Hy:Uy)};f(0);let p=[];return c.group.traverse(e=>{e instanceof J&&p.push(e)}),l.group.traverse(e=>{e instanceof J&&p.push(e)}),{group:n,disposables:r,setStartLights:f,animatedFlags:u.flags,lodBoards:p}}var pb={suzuka:{id:`suzuka`,landmarks:[{kind:`pitComplex`,s:-10,side:`left`,distance:46,length:100,garages:20,towerHeight:24,roof:`tiered`},{kind:`ferrisWheel`,s:-40,side:`left`,distance:78,radius:30},{kind:`grandstand`,s:768,side:`right`,distance:54,length:55,rows:9,roof:`pitched`},{kind:`grandstand`,s:4040,side:`right`,distance:54,length:55,rows:7,roof:`pitched`},{kind:`grandstand`,s:5480,side:`left`,distance:56,length:55,rows:8,roof:`tiered`},{kind:`cameraTower`,s:720,side:`left`,distance:26,height:16},{kind:`cameraTower`,s:3960,side:`left`,distance:28,height:16},{kind:`cameraTower`,s:5150,side:`right`,distance:28,height:18},{kind:`apexBoard`,s:-5,side:`left`,distance:16},{kind:`apexBoard`,s:2988,side:`right`,distance:16},{kind:`helipad`,s:-200,side:`left`,distance:96},{kind:`carPark`,s:130,side:`left`,distance:71,rows:5,cols:10},{kind:`bridge`,s:480,side:`center`,distance:6,clearance:6.5},{kind:`bridge`,s:2700,side:`center`,distance:6,clearance:6.5},{kind:`bridge`,s:5300,side:`center`,distance:6,clearance:6.5},{kind:`marshalPost`,s:768,side:`right`,distance:16},{kind:`marshalPost`,s:2524,side:`right`,distance:16},{kind:`marshalPost`,s:3876,side:`left`,distance:16},{kind:`marshalPost`,s:5108,side:`left`,distance:18},{kind:`marshalPost`,s:1624,side:`right`,distance:16}],regions:[{kind:`adBoardRun`,sStart:-160,sEnd:160,side:`right`,distance:12,spacing:12,colors:[]},{kind:`flagRow`,sStart:-140,sEnd:60,side:`right`,distance:15,spacing:25},{kind:`gravelTrap`,sStart:2280,sEnd:2620,side:`right`,distance:12,width:22},{kind:`gravelTrap`,sStart:5e3,sEnd:5260,side:`left`,distance:12,width:26},{kind:`forestBelt`,sStart:4200,sEnd:5e3,side:`both`,distance:26,density:.5},{kind:`forestBelt`,sStart:1700,sEnd:2300,side:`both`,distance:26,density:.4}]},monza:{id:`monza`,startRotationM:2200,landmarks:[{kind:`pitComplex`,s:-10,side:`left`,distance:46,length:100,garages:22,towerHeight:26,roof:`flat`},{kind:`grandstand`,s:-70,side:`right`,distance:62,length:55,rows:10,roof:`tiered`},{kind:`grandstand`,s:5676,side:`right`,distance:56,length:55,rows:8,roof:`pitched`},{kind:`grandstand`,s:4148,side:`right`,distance:56,length:55,rows:7,roof:`pitched`},{kind:`cameraTower`,s:2570,side:`right`,distance:26,height:16},{kind:`cameraTower`,s:4468,side:`right`,distance:26,height:16},{kind:`cameraTower`,s:5676,side:`left`,distance:26,height:18},{kind:`apexBoard`,s:-5,side:`right`,distance:16},{kind:`apexBoard`,s:3744,side:`left`,distance:16},{kind:`helipad`,s:-220,side:`left`,distance:106},{kind:`carPark`,s:200,side:`left`,distance:76,rows:6,cols:12},{kind:`bridge`,s:1900,side:`center`,distance:6,clearance:6.5},{kind:`bridge`,s:3744,side:`center`,distance:6,clearance:6.5},{kind:`bridge`,s:4892,side:`center`,distance:6,clearance:6.5},{kind:`marshalPost`,s:2560,side:`left`,distance:16},{kind:`marshalPost`,s:4148,side:`left`,distance:16},{kind:`marshalPost`,s:5536,side:`right`,distance:16},{kind:`marshalPost`,s:1116,side:`left`,distance:16}],regions:[{kind:`adBoardRun`,sStart:-150,sEnd:150,side:`left`,distance:12,spacing:12,colors:[]},{kind:`flagRow`,sStart:-140,sEnd:60,side:`right`,distance:15,spacing:25},{kind:`gravelTrap`,sStart:2500,sEnd:2650,side:`both`,distance:12,width:30},{kind:`gravelTrap`,sStart:5620,sEnd:5752,side:`both`,distance:12,width:26},{kind:`gravelTrap`,sStart:3700,sEnd:3820,side:`both`,distance:12,width:24},{kind:`forestBelt`,sStart:150,sEnd:1900,side:`both`,distance:18,density:1,tall:!0},{kind:`forestBelt`,sStart:1950,sEnd:3650,side:`both`,distance:18,density:1,tall:!0},{kind:`forestBelt`,sStart:3850,sEnd:5600,side:`both`,distance:18,density:1,tall:!0}]},spa:{id:`spa`,startRotationM:5800,landmarks:[{kind:`pitComplex`,s:-10,side:`left`,distance:46,length:100,garages:20,towerHeight:26,roof:`flat`},{kind:`grandstand`,s:-70,side:`right`,distance:60,length:55,rows:9,roof:`tiered`},{kind:`ridgeLine`,s:6780,side:`left`,distance:266,length:300,height:90,peaks:5},{kind:`cameraTower`,s:6708,side:`left`,distance:30,height:18},{kind:`cameraTower`,s:1080,side:`right`,distance:26,height:16},{kind:`apexBoard`,s:-5,side:`right`,distance:16},{kind:`apexBoard`,s:6040,side:`left`,distance:16},{kind:`helipad`,s:-220,side:`left`,distance:106},{kind:`carPark`,s:200,side:`left`,distance:76,rows:6,cols:10},{kind:`bridge`,s:900,side:`center`,distance:6,clearance:6.5},{kind:`bridge`,s:3200,side:`center`,distance:6,clearance:6.5},{kind:`bridge`,s:5900,side:`center`,distance:6,clearance:6.5},{kind:`marshalPost`,s:1740,side:`left`,distance:16},{kind:`marshalPost`,s:3224,side:`right`,distance:16},{kind:`marshalPost`,s:4660,side:`left`,distance:16},{kind:`marshalPost`,s:5396,side:`right`,distance:16}],regions:[{kind:`adBoardRun`,sStart:-150,sEnd:150,side:`left`,distance:12,spacing:12,colors:[]},{kind:`flagRow`,sStart:-140,sEnd:60,side:`right`,distance:15,spacing:25},{kind:`gravelTrap`,sStart:6870,sEnd:6966,side:`right`,distance:12,width:24},{kind:`gravelTrap`,sStart:5390,sEnd:5520,side:`both`,distance:12,width:20},{kind:`forestBelt`,sStart:150,sEnd:1700,side:`both`,distance:19,density:.9,tall:!0},{kind:`forestBelt`,sStart:1800,sEnd:3200,side:`both`,distance:19,density:.9,tall:!0},{kind:`forestBelt`,sStart:3300,sEnd:4600,side:`both`,distance:19,density:.9,tall:!0},{kind:`forestBelt`,sStart:4720,sEnd:5850,side:`both`,distance:26,density:.8,tall:!0},{kind:`forestBelt`,sStart:6150,sEnd:6650,side:`right`,distance:30,density:.6,tall:!0}]},laguna_seca:{id:`laguna_seca`,landmarks:[{kind:`pitComplex`,s:-10,side:`right`,distance:46,length:100,garages:14,towerHeight:18,roof:`flat`},{kind:`grandstand`,s:-60,side:`left`,distance:20,length:55,rows:8,roof:`pitched`},{kind:`grandstand`,s:504,side:`right`,distance:16,length:25,rows:6,roof:`pitched`},{kind:`rollingHills`,s:3300,side:`right`,distance:240,length:50,height:50,oaks:24},{kind:`rollingHills`,s:1900,side:`left`,distance:260,length:50,height:55,oaks:26},{kind:`rollingHills`,s:300,side:`right`,distance:280,length:50,height:58,oaks:28},{kind:`cameraTower`,s:3300,side:`left`,distance:26,height:14},{kind:`cameraTower`,s:504,side:`right`,distance:24,height:14},{kind:`apexBoard`,s:-5,side:`left`,distance:15},{kind:`helipad`,s:-160,side:`right`,distance:76},{kind:`carPark`,s:120,side:`right`,distance:61,rows:4,cols:8},{kind:`bridge`,s:1320,side:`center`,distance:6,clearance:6},{kind:`marshalPost`,s:1612,side:`right`,distance:15},{kind:`marshalPost`,s:2756,side:`left`,distance:15},{kind:`marshalPost`,s:3548,side:`right`,distance:15}],regions:[{kind:`adBoardRun`,sStart:-120,sEnd:120,side:`left`,distance:12,spacing:12,colors:[]},{kind:`flagRow`,sStart:-100,sEnd:40,side:`left`,distance:14,spacing:22},{kind:`gravelTrap`,sStart:3260,sEnd:3420,side:`left`,distance:11,width:14}]},brands_hatch:{id:`brands_hatch`,landmarks:[{kind:`pitComplex`,s:-10,side:`left`,distance:46,length:100,garages:14,towerHeight:18,roof:`flat`},{kind:`grandstand`,s:472,side:`right`,distance:56,length:55,rows:10,roof:`tiered`},{kind:`grandstand`,s:812,side:`left`,distance:56,length:55,rows:8,roof:`pitched`},{kind:`cameraTower`,s:472,side:`left`,distance:24,height:16},{kind:`cameraTower`,s:2668,side:`right`,distance:24,height:14},{kind:`apexBoard`,s:-5,side:`left`,distance:15},{kind:`helipad`,s:-150,side:`left`,distance:76},{kind:`carPark`,s:100,side:`left`,distance:61,rows:4,cols:8},{kind:`bridge`,s:1200,side:`center`,distance:6,clearance:6},{kind:`bridge`,s:2900,side:`center`,distance:6,clearance:6},{kind:`marshalPost`,s:1036,side:`right`,distance:15},{kind:`marshalPost`,s:1696,side:`left`,distance:15},{kind:`marshalPost`,s:2948,side:`right`,distance:15},{kind:`marshalPost`,s:3532,side:`left`,distance:15}],regions:[{kind:`adBoardRun`,sStart:-110,sEnd:110,side:`right`,distance:12,spacing:12,colors:[]},{kind:`flagRow`,sStart:-90,sEnd:40,side:`right`,distance:14,spacing:22},{kind:`gravelTrap`,sStart:440,sEnd:560,side:`left`,distance:11,width:16},{kind:`forestBelt`,sStart:1750,sEnd:3150,side:`both`,distance:18,density:.85}]},tsukuba:{id:`tsukuba`,landmarks:[{kind:`pitComplex`,s:-6,side:`left`,distance:46,length:100,garages:10,towerHeight:14,roof:`flat`},{kind:`grandstand`,s:-50,side:`right`,distance:12,length:14,rows:6,roof:`pitched`},{kind:`cameraTower`,s:756,side:`right`,distance:22,height:12},{kind:`apexBoard`,s:-4,side:`right`,distance:14},{kind:`carPark`,s:90,side:`left`,distance:51,rows:4,cols:8},{kind:`marshalPost`,s:1068,side:`right`,distance:14},{kind:`marshalPost`,s:1748,side:`left`,distance:14}],regions:[{kind:`adBoardRun`,sStart:-90,sEnd:90,side:`left`,distance:11,spacing:10,colors:[]},{kind:`flagRow`,sStart:-70,sEnd:10,side:`right`,distance:9,spacing:20},{kind:`gravelTrap`,sStart:720,sEnd:800,side:`left`,distance:11,width:12}]},fuji:{id:`fuji`,landmarks:[{kind:`pitComplex`,s:-10,side:`left`,distance:46,length:100,garages:20,towerHeight:30,roof:`flat`},{kind:`mountainCone`,s:1200,side:`right`,distance:4206,height:800,radius:1100,snowLine:.32},{kind:`grandstand`,s:-80,side:`right`,distance:58,length:55,rows:10,roof:`tiered`},{kind:`grandstand`,s:2436,side:`right`,distance:54,length:55,rows:6,roof:`pitched`},{kind:`cameraTower`,s:52,side:`right`,distance:26,height:18},{kind:`cameraTower`,s:2720,side:`left`,distance:26,height:16},{kind:`apexBoard`,s:-5,side:`right`,distance:16},{kind:`helipad`,s:-220,side:`left`,distance:106},{kind:`carPark`,s:180,side:`left`,distance:76,rows:6,cols:12},{kind:`bridge`,s:1288,side:`center`,distance:6,clearance:6.5},{kind:`bridge`,s:2996,side:`center`,distance:6,clearance:6.5},{kind:`marshalPost`,s:2128,side:`right`,distance:16},{kind:`marshalPost`,s:2996,side:`left`,distance:16}],regions:[{kind:`adBoardRun`,sStart:-170,sEnd:170,side:`right`,distance:12,spacing:12,colors:[]},{kind:`flagRow`,sStart:-150,sEnd:60,side:`right`,distance:15,spacing:25},{kind:`gravelTrap`,sStart:2080,sEnd:2200,side:`right`,distance:12,width:20}]},interlagos:{id:`interlagos`,startRotationM:3516,landmarks:[{kind:`pitComplex`,s:-10,side:`right`,distance:46,length:100,garages:18,towerHeight:22,roof:`flat`},{kind:`grandstand`,s:-70,side:`left`,distance:18,length:35,rows:9,roof:`tiered`},{kind:`grandstand`,s:3248,side:`left`,distance:18,length:35,rows:10,roof:`tiered`},{kind:`citySkyline`,s:204,side:`right`,distance:1606,length:400,towers:20,maxHeight:95},{kind:`cameraTower`,s:2204,side:`right`,distance:24,height:16},{kind:`cameraTower`,s:4196,side:`left`,distance:24,height:16},{kind:`apexBoard`,s:-5,side:`left`,distance:15},{kind:`helipad`,s:-190,side:`right`,distance:96},{kind:`carPark`,s:150,side:`right`,distance:66,rows:5,cols:10},{kind:`bridge`,s:900,side:`center`,distance:6,clearance:6},{kind:`bridge`,s:2500,side:`center`,distance:6,clearance:6},{kind:`marshalPost`,s:1248,side:`right`,distance:15},{kind:`marshalPost`,s:2420,side:`left`,distance:15},{kind:`marshalPost`,s:3896,side:`right`,distance:15}],regions:[{kind:`adBoardRun`,sStart:-140,sEnd:140,side:`left`,distance:12,spacing:12,colors:[]},{kind:`flagRow`,sStart:-120,sEnd:50,side:`left`,distance:14,spacing:22},{kind:`gravelTrap`,sStart:1900,sEnd:2e3,side:`left`,distance:11,width:16}]},red_bull_ring:{id:`red_bull_ring`,startRotationM:3980,landmarks:[{kind:`pitComplex`,s:-10,side:`left`,distance:46,length:100,garages:16,towerHeight:20,roof:`flat`},{kind:`grandstand`,s:-70,side:`right`,distance:58,length:55,rows:9,roof:`tiered`},{kind:`grandstand`,s:3504,side:`right`,distance:54,length:55,rows:7,roof:`pitched`},{kind:`bullStatue`,s:2050,side:`left`,distance:176,hillHeight:22},{kind:`ridgeLine`,s:1200,side:`left`,distance:906,length:300,height:260,peaks:6},{kind:`ridgeLine`,s:3800,side:`right`,distance:906,length:300,height:220,peaks:5},{kind:`cameraTower`,s:900,side:`left`,distance:24,height:16},{kind:`cameraTower`,s:3284,side:`right`,distance:24,height:16},{kind:`apexBoard`,s:-5,side:`right`,distance:15},{kind:`helipad`,s:-160,side:`left`,distance:81},{kind:`carPark`,s:130,side:`left`,distance:61,rows:4,cols:9},{kind:`bridge`,s:2540,side:`center`,distance:6,clearance:6},{kind:`marshalPost`,s:2232,side:`left`,distance:15},{kind:`marshalPost`,s:4260,side:`right`,distance:15}],regions:[{kind:`adBoardRun`,sStart:-130,sEnd:130,side:`right`,distance:12,spacing:12,colors:[]},{kind:`flagRow`,sStart:-110,sEnd:40,side:`right`,distance:14,spacing:22},{kind:`gravelTrap`,sStart:884,sEnd:916,side:`right`,distance:4,width:5}]},silverstone:{id:`silverstone`,startRotationM:3172,landmarks:[{kind:`pitComplex`,s:-10,side:`left`,distance:46,length:100,garages:24,towerHeight:26,roof:`wing`},{kind:`grandstand`,s:-80,side:`right`,distance:60,length:55,rows:11,roof:`tiered`},{kind:`grandstand`,s:260,side:`right`,distance:56,length:55,rows:8,roof:`pitched`},{kind:`grandstand`,s:2208,side:`right`,distance:56,length:55,rows:8,roof:`pitched`},{kind:`cameraTower`,s:836,side:`left`,distance:26,height:16},{kind:`cameraTower`,s:2792,side:`left`,distance:26,height:16},{kind:`cameraTower`,s:4956,side:`right`,distance:26,height:16},{kind:`apexBoard`,s:-5,side:`right`,distance:16},{kind:`apexBoard`,s:3412,side:`left`,distance:16},{kind:`helipad`,s:-230,side:`left`,distance:106},{kind:`carPark`,s:210,side:`left`,distance:81,rows:6,cols:12},{kind:`bridge`,s:1024,side:`center`,distance:6,clearance:6.5},{kind:`bridge`,s:3624,side:`center`,distance:6,clearance:6.5},{kind:`bridge`,s:5212,side:`center`,distance:6,clearance:6.5},{kind:`marshalPost`,s:1172,side:`left`,distance:16},{kind:`marshalPost`,s:2424,side:`right`,distance:16},{kind:`marshalPost`,s:4040,side:`left`,distance:16},{kind:`marshalPost`,s:5548,side:`right`,distance:16}],regions:[{kind:`adBoardRun`,sStart:-160,sEnd:160,side:`left`,distance:12,spacing:12,colors:[]},{kind:`flagRow`,sStart:-150,sEnd:60,side:`right`,distance:15,spacing:25},{kind:`gravelTrap`,sStart:220,sEnd:340,side:`right`,distance:12,width:20},{kind:`gravelTrap`,sStart:2170,sEnd:2300,side:`right`,distance:12,width:20}]}};function mb(e){return pb[e]??null}var hb={concrete:13224130,concreteDark:10197652,steel:3816770,steelLight:7040886,glassBlue:1849938,glassEmissive:661026,roofDark:3356219,roofRed:8007471,tarmacGrey:4868682,gravelBeige:13350275,grassGreen:3963455,snowWhite:16054010,rockGrey:7764594,rockDark:5659220,hillGreenDry:10261591,hillGreenLush:5209407,cityConcrete:12170924,cityGlass:9414843,bullBlack:1315860,plinthGrey:9079430},gb=[2056104,12729147,14267180,3116879,16777215,3815999],_b=[2056104,2068303,12729147,14267180,16777215];function vb(e,t){return e[t%e.length]}var yb=4;function bb(e,t,n,r){let i=l_(e,t),a=n===`left`?-1:+(n===`right`),o=Math.max(yb,r),s=a*(e.barrierDistance(i.index)+o),c=i.point.x+i.right.x*s,l=i.point.z+i.right.z*s,{y:u}=Hv(e,c,l,i.index),d=Vv(e,c,l);return{position:new U(c,d===null?u:Math.min(u,d),l),forward:i.forward,right:i.right,index:i.index}}function xb(e,t,n,r,i=0){let a=t.clone();a.y+=r,e.position.copy(a),py(e,a,n),i&&e.rotateY(i*Math.PI/180)}function Sb(e,t,n,r=0){xb(e,t.position,t.forward,n,r)}function Cb(e,t,n){return e.position.clone().addScaledVector(e.right,t*n)}function wb(e,t){let n=l_(e,t);return{position:e.points[n.index].clone(),forward:n.forward,right:n.right,index:n.index}}function Tb(e){let t=new _o;return t.name=e,t}var Eb=1.1,Db=.55,Ob=.9,kb=12;function Ab(e,t){let n=Tb(`dressing-grandstand`),r=t.rows,i=t.seatColors??_b,a=t.side===`left`?-1:1,o={geometries:[],materials:[],textures:[]},s=new Y(.7,.4,.7),c=new X({vertexColors:!0,roughness:.9}),l=Math.max(1,Math.floor(t.length/Ob)),u=new _c(s,c,r*l);u.castShadow=!0,u.receiveShadow=!0,Mb(e,t,r,l,i,u),n.add(u),o.geometries.push(s),o.materials.push(c);let d=new Y(r*Eb+1,r*Db,kb),f=new X({color:9211024,roughness:.95}),p=jb(t,r);o.geometries.push(d,p.geometry),o.materials.push(f,p.material);let m=Math.max(1,Math.round(t.length/kb));for(let i=0;i<m;i++){let o=-t.length/2+(i+.5)*(t.length/m),s=bb(e.track,t.s+o,t.side,t.distance),c=new J(d,f);c.receiveShadow=!0,c.castShadow=!0,xb(c,s.position.clone().addScaledVector(s.right,a*r*Eb*.35),s.forward,r*Db/2-.5,t.rotationDeg),n.add(c);let l=new J(p.geometry,p.material);l.castShadow=!0,t.roof===`pitched`&&l.rotateZ(-.05),xb(l,s.position.clone().addScaledVector(s.right,a*r*Eb*.4),s.forward,r*Db+1.6,t.rotationDeg),n.add(l)}return{group:n,disposables:o}}function jb(e,t){return{geometry:new Y(t*Eb+3,e.roof===`tiered`?.3:.35,12.4),material:new X({color:3815999,roughness:.6,metalness:.1})}}function Mb(e,t,n,r,i,a){let o=new go,s=_(388817^Math.floor(t.s)),c=t.side===`left`?-1:1,l=0;for(let u=0;u<n;u++){let n=.6+u*Db;for(let d=0;d<r;d++){let r=-t.length/2+d*Ob,f=l_(e.track,t.s+r),p=Math.max(4,t.distance),m=c*(e.track.barrierDistance(f.index)+p+u*Eb),h=f.point.x+f.right.x*m,g=f.point.z+f.right.z*m;o.position.set(h,Hv(e.track,h,g,f.index).y+n,g),o.updateMatrix(),a.setMatrixAt(l,o.matrix),a.setColorAt(l,new q(vb(i,Math.floor(s()*i.length)))),l++}}a.instanceMatrix.needsUpdate=!0,a.instanceColor&&(a.instanceColor.needsUpdate=!0)}var Nb=8,Pb=15,Fb=15;function Ib(e,t){let n=Tb(`dressing-pit-complex`),r=t.side===`left`?-1:1,i={geometries:[],materials:[],textures:[]};return Lb(e,t,t.color??hb.concrete,r,n,i),Rb(e,t,r,n,i),t.roof===`wing`?Bb(e,t,r,n,i):zb(e,t,r,n,i),Vb(e,t,r,n,i),{group:n,disposables:i}}function Lb(e,t,n,r,i,a){let o=new Y(Pb,Nb,Fb),s=new X({color:n,roughness:.8}),c=new Y(.4,Nb*.55,Fb*.92),l=new X({color:hb.glassBlue,roughness:.15,metalness:.4,emissive:hb.glassEmissive});a.geometries.push(o,c),a.materials.push(s,l);let u=Math.max(1,Math.round(t.length/Fb));for(let n=0;n<u;n++){let a=-t.length/2+(n+.5)*(t.length/u),d=bb(e.track,t.s+a,t.side,t.distance),f=new J(o,s);f.castShadow=!0,f.receiveShadow=!0,xb(f,d.position,d.forward,Nb/2,t.rotationDeg),i.add(f);let p=new J(c,l);p.receiveShadow=!0,xb(p,Cb(d,r,-15/2-.25),d.forward,Nb*.5,t.rotationDeg),i.add(p)}}function Rb(e,t,n,r,i){let a=new Y(.15,Nb*.6,t.length/t.garages-.6),o=new X({vertexColors:!0,roughness:.6,metalness:.2}),s=new _c(a,o,t.garages),c=new go;for(let r=0;r<t.garages;r++){let i=-t.length/2+(r+.5)*(t.length/t.garages),a=bb(e.track,t.s+i,t.side,t.distance),o=Cb(a,n,7.6);c.position.copy(o),c.position.y+=Nb*.3,py(c,c.position,a.forward),c.updateMatrix(),s.setMatrixAt(r,c.matrix),s.setColorAt(r,new q(r%2==0?15263978:13684948))}s.instanceMatrix.needsUpdate=!0,s.instanceColor&&(s.instanceColor.needsUpdate=!0),r.add(s),i.geometries.push(a),i.materials.push(o)}function zb(e,t,n,r,i){let a=new Y(16.5,.4,15.4),o=new X({color:hb.roofDark,roughness:.6}),s=new Y(16.5,1,.1);i.geometries.push(a,s),i.materials.push(o);let c=Math.max(1,Math.round(t.length/Fb));for(let i=0;i<c;i++){let l=-t.length/2+(i+.5)*(t.length/c),u=bb(e.track,t.s+l,t.side,t.distance),d=new J(a,o);d.castShadow=!0,xb(d,u.position,u.forward,Nb,t.rotationDeg),r.add(d);let f=new J(s,o);xb(f,Cb(u,n,-15/2),u.forward,8.7,t.rotationDeg),r.add(f)}}function Bb(e,t,n,r,i){let a=new Y(4.5,.25,t.length/9+.4),o=new X({color:15001322,roughness:.35,metalness:.2});for(let i=0;i<9;i++){let s=(i+.5)/9-.5,c=s*t.length,l=bb(e.track,t.s+c,t.side,t.distance),u=new J(a,o);u.castShadow=!0;let d=Math.cos(s*Math.PI*.9);xb(u,Cb(l,n,Pb*.5+d*3.5),l.forward,9.2+d*2.2,t.rotationDeg),u.rotateZ(n*s*.5),r.add(u)}i.geometries.push(a),i.materials.push(o)}function Vb(e,t,n,r,i){let a=bb(e.track,t.s+t.length*.42,t.side,t.distance),o=Cb(a,n,-1.5),s=t.towerHeight*.78,c=new $c(1,1.3,s,12),l=new X({color:13093584,roughness:.6,metalness:.1}),u=new J(c,l);u.castShadow=!0,u.receiveShadow=!0,xb(u,o,a.forward,s/2,t.rotationDeg),r.add(u);let d=t.towerHeight-s,f=new Y(4.2,d,4.2),p=new X({color:hb.glassBlue,roughness:.2,metalness:.3,emissive:hb.glassEmissive}),m=new J(f,p);m.castShadow=!0,xb(m,o,a.forward,s+d/2,t.rotationDeg),r.add(m);let h=new $c(2.6,2.6,.25,12),g=new X({color:3815999,roughness:.6}),_=new J(h,g);_.castShadow=!0,xb(_,o,a.forward,t.towerHeight+.15,t.rotationDeg),r.add(_),i.geometries.push(c,f,h),i.materials.push(l,p,g)}var Hb=[14210767,13223096,14474460];function Ub(e,t){let n=Tb(`dressing-paddock`),r=bb(e.track,t.s,t.side,t.distance),i=t.side===`left`?-1:1,a=_(39441^Math.floor(t.s)),o=new Y(1,1,1),s=new X({vertexColors:!0,roughness:.85}),c=new _c(o,s,t.blocks);c.castShadow=!0,c.receiveShadow=!0;let l=new go;for(let n=0;n<t.blocks;n++){let o=(a()-.5)*t.spread,s=i*t.spread*.35*a(),u=8+a()*10,d=8+a()*10,f=4+a()*5,p=Cb(r,i,s).addScaledVector(r.forward,o),m=Hv(e.track,p.x,p.z,r.index).y;l.position.set(p.x,m+f/2,p.z),l.rotation.set(0,a()*Math.PI*2,0),l.scale.set(u,f,d),l.updateMatrix(),c.setMatrixAt(n,l.matrix),c.setColorAt(n,new q(Hb[n%Hb.length]))}return c.instanceMatrix.needsUpdate=!0,c.instanceColor&&(c.instanceColor.needsUpdate=!0),n.add(c),{group:n,disposables:{geometries:[o],materials:[s],textures:[]}}}var Wb=24,Gb=20;function Kb(e,t){let n=Tb(`dressing-ferris-wheel`),r=bb(e.track,t.s,t.side,t.distance),i=t.radius,a=i*1.15,o={geometries:[],materials:[],textures:[]},s=new X({color:3356218,roughness:.6,metalness:.4}),c=Jb(i,a,s);Sb(c.group,r,0,t.rotationDeg),n.add(c.group),o.geometries.push(...c.geometries),o.materials.push(s);let l=qb(i,a);Sb(l.group,r,0,t.rotationDeg),n.add(l.group),o.geometries.push(...l.geometries),o.materials.push(...l.materials);let{spokes:u,spokeGeo:d,spokeMat:f}=Xb(r,i,a,t.rotationDeg);n.add(u),o.geometries.push(d),o.materials.push(f);let{gondolas:p,gondolaGeo:m,gondolaMat:h}=Zb(r,i,a,t.rotationDeg);return n.add(p),o.geometries.push(m),o.materials.push(h),{group:n,disposables:o}}function qb(e,t){let n=Tb(`wheel-body`),r=new il(e,Math.min(.4,e*.015),8,40),i=new X({color:14241642,roughness:.4,metalness:.3}),a=new J(r,i);a.castShadow=!0,a.position.y=t,n.add(a);let o=new $c(1.1,1.1,1.2,12),s=new X({color:4869458,roughness:.5,metalness:.5}),c=new J(o,s);return c.rotation.x=Math.PI/2,c.position.y=t,c.castShadow=!0,n.add(c),{group:n,geometries:[r,o],materials:[i,s]}}function Jb(e,t,n){let r=Tb(`wheel-support`),i=[],a=.45;for(let o of[-1,1]){for(let s of[-1.4,1.4]){let c=Yb(new U(o*e*.62,0,s),new U(o*e*.06,t*.94,s*.25),a,n);i.push(c.geometry),r.add(c.mesh)}let s=Yb(new U(o*e*.62,0,-1.4).lerp(new U(o*e*.06,t*.94,-.35),.5),new U(o*e*.62,0,1.4).lerp(new U(o*e*.06,t*.94,.35),.5),a*.8,n);i.push(s.geometry),r.add(s.mesh)}return{group:r,geometries:i}}function Yb(e,t,n,r){let i=t.clone().sub(e),a=new Y(n,i.length(),n),o=new J(a,r);return o.castShadow=!0,o.position.copy(e).add(t).multiplyScalar(.5),o.quaternion.setFromUnitVectors(new U(0,1,0),i.normalize()),{mesh:o,geometry:a}}function Xb(e,t,n,r){let i=new $c(.05,.05,t*.94,5),a=new X({color:12041410,roughness:.5,metalness:.5}),o=new _c(i,a,Gb),s=Tb(`hub`);Sb(s,e,n,r);let c=new go;for(let e=0;e<Gb;e++){let n=e/Gb*Math.PI*2;c.position.set(Math.cos(n)*t*.94/2,Math.sin(n)*t*.94/2,0),c.rotation.set(0,0,n-Math.PI/2),c.updateMatrix(),o.setMatrixAt(e,c.matrix)}return o.instanceMatrix.needsUpdate=!0,s.add(o),{spokes:s,spokeGeo:i,spokeMat:a}}function Zb(e,t,n,r){let i=new Y(.9,1.1,.9),a=new X({vertexColors:!0,roughness:.5,metalness:.1}),o=new _c(i,a,Wb),s=Tb(`gondolas`);Sb(s,e,n,r);let c=new go;for(let e=0;e<Wb;e++){let n=e/Wb*Math.PI*2;c.position.set(Math.cos(n)*t,Math.sin(n)*t,.5),c.updateMatrix(),o.setMatrixAt(e,c.matrix),o.setColorAt(e,new q(vb(gb,e)))}return o.instanceMatrix.needsUpdate=!0,o.instanceColor&&(o.instanceColor.needsUpdate=!0),s.add(o),{gondolas:s,gondolaGeo:i,gondolaMat:a}}function Qb(e,t){let n=Tb(`dressing-bull-statue`),r=bb(e.track,t.s,t.side,t.distance),i={geometries:[],materials:[],textures:[]},a=new J(new $c(10,14,t.hillHeight,10),new X({color:hb.hillGreenLush,roughness:1,flatShading:!0}));Sb(a,r,t.hillHeight/2,t.rotationDeg),n.add(a),i.geometries.push(a.geometry),i.materials.push(a.material);let o=new X({color:hb.plinthGrey,roughness:.8}),s=new J(new Y(4,1.4,4),o);Sb(s,r,t.hillHeight+.7,t.rotationDeg),n.add(s),i.geometries.push(s.geometry);let c=new X({color:hb.bullBlack,roughness:.85}),l=$b(c);return Sb(l.group,r,t.hillHeight+1.4,t.rotationDeg),n.add(l.group),i.materials.push(o,c),i.geometries.push(...l.geometries),{group:n,disposables:i}}function $b(e){let t=new _o,n=new Y(3.6,1.8,1.4),r=new J(n,e);r.position.y=1.4;let i=new Y(1.1,1,1.1),a=new J(i,e);a.position.set(2,1.9,0);let o=new Y(1.8,.18,.18),s=new J(o,e);s.position.set(2.5,2.5,0);let c=new Y(.3,1.4,.3);for(let[n,r]of[[-1.3,.5],[-1.3,-.5],[1.2,.5],[1.2,-.5]]){let i=new J(c,e);i.position.set(n,.7,r),t.add(i)}return t.add(r,a,s),t.traverse(e=>{e instanceof J&&(e.castShadow=!0,e.receiveShadow=!0)}),{group:t,geometries:[n,i,o,c]}}function ex(e,t){let n=Tb(`dressing-mountain-cone`),r=bb(e.track,t.s,t.side,t.distance),i=new el(t.radius,t.height,9,4),a=new X({color:hb.rockGrey,roughness:1,flatShading:!0}),o=new J(i,a);Sb(o,r,t.height/2,t.rotationDeg),n.add(o);let s=t.height*(t.snowLine??.3),c=new el(t.radius*(s/t.height),s,9,2),l=new X({color:hb.snowWhite,roughness:.9,flatShading:!0}),u=new J(c,l);return Sb(u,r,t.height-s/2,t.rotationDeg),n.add(u),{group:n,disposables:{geometries:[i,c],materials:[a,l],textures:[]}}}function tx(e,t){let n=Tb(`dressing-ridge-line`),r=bb(e.track,t.s,t.side,t.distance),i=_(7534^Math.floor(t.s)),a=new el(t.length/t.peaks,t.height,6,1),o=new X({color:hb.rockGrey,roughness:1,flatShading:!0}),s=new X({color:hb.hillGreenLush,roughness:1,flatShading:!0});for(let e=0;e<t.peaks;e++){let c=((t.peaks<=1?.5:e/(t.peaks-1))-.5)*t.length,l=.75+i()*.5,u=new J(a,e%2==0?o:s);Sb(u,r,t.height*l/2,t.rotationDeg),u.position.addScaledVector(r.forward,c),u.position.addScaledVector(r.right,(i()-.5)*(t.length/t.peaks)*.6),u.scale.set(1+i()*.4,l,1+i()*.4),u.rotateY(i()*Math.PI*2),n.add(u)}return{group:n,disposables:{geometries:[a],materials:[o,s],textures:[]}}}function nx(e,t){let n=Tb(`dressing-rolling-hills`),r=bb(e.track,t.s,t.side,t.distance),i=_(2755^Math.floor(t.s)),a=new el(t.length*.4,t.height,7,1);a.scale(1,.4,1);let o=new X({color:hb.hillGreenDry,roughness:1,flatShading:!0});for(let e=0;e<4;e++){let s=new J(a,o),c=(e/3-.5)*t.length;Sb(s,r,t.height*.15,t.rotationDeg),s.position.addScaledVector(r.forward,c),s.scale.setScalar(.7+i()*.6),n.add(s)}let s=rx(r,t,i);return n.add(s.group),{group:n,disposables:{geometries:[a,s.trunkGeo,s.canopyGeo],materials:[o,s.trunkMat,s.canopyMat],textures:[]}}}function rx(e,t,n){let r=Tb(`oaks`),i=new el(.25,2,5),a=new el(2.2,1.6,8),o=new X({color:5981746,roughness:1}),s=new X({color:8032074,roughness:.95,flatShading:!0}),c=new _c(i,o,t.oaks),l=new _c(a,s,t.oaks),u=new go;for(let r=0;r<t.oaks;r++){let i=(n()-.5)*t.length,a=(n()-.5)*t.length*.6;u.position.copy(e.position).addScaledVector(e.forward,i).addScaledVector(e.right,a);let o=.8+n()*.7;u.position.y+=1*o,u.scale.setScalar(o),u.updateMatrix(),c.setMatrixAt(r,u.matrix),u.position.y+=1.6*o,u.updateMatrix(),l.setMatrixAt(r,u.matrix)}return c.instanceMatrix.needsUpdate=!0,l.instanceMatrix.needsUpdate=!0,r.add(c,l),{group:r,trunkGeo:i,canopyGeo:a,trunkMat:o,canopyMat:s}}function ix(e,t){let n=Tb(`dressing-city-skyline`),r=bb(e.track,t.s,t.side,t.distance),i=t.side===`left`?-1:1,a=_(19479^Math.floor(t.s)),o=new Y(1,1,1),s=new X({vertexColors:!0,roughness:.7,metalness:.05}),c=new _c(o,s,t.towers),l=new go;for(let e=0;e<t.towers;e++){let n=(a()-.5)*t.length,o=i*(a()*t.length*.25),s=12+a()*14,u=t.maxHeight*(.35+a()*.65);l.position.copy(r.position).addScaledVector(r.forward,n).addScaledVector(r.right,o),l.position.y+=u/2,l.scale.set(s,u,s),l.rotation.y=a()*Math.PI*.1,l.updateMatrix(),c.setMatrixAt(e,l.matrix);let d=a()<.5?hb.cityConcrete:hb.cityGlass;c.setColorAt(e,new q(d).multiplyScalar(.85+a()*.3))}return c.instanceMatrix.needsUpdate=!0,c.instanceColor&&(c.instanceColor.needsUpdate=!0),n.add(c),{group:n,disposables:{geometries:[o],materials:[s],textures:[]}}}function ax(e,t){let n=Tb(`dressing-bridge`),{track:r}=e,i=wb(r,t.s),a=r.barrierDistance(i.index)+2,o=new Y(.5,t.clearance,.5),s=new X({color:3093046,roughness:.6,metalness:.4});for(let e of[-1,1]){let r=new J(o,s);r.castShadow=!0,xb(r,i.position.clone().addScaledVector(i.right,e*a),i.forward,t.clearance/2,t.rotationDeg),n.add(r)}let c=new Y(a*2+1,.4,2.4),l=new X({color:14181407,roughness:.5,metalness:.2}),u=new J(c,l);u.castShadow=!0,xb(u,i.position,i.forward,t.clearance,t.rotationDeg),n.add(u);let d=new Y(a*2+1,1.6,.15),f=new X({color:10133670,roughness:.5,metalness:.5});for(let e of[-1.1,1.1]){let r=new J(d,f);r.castShadow=!0,xb(r,i.position.clone(),i.forward,t.clearance+1,t.rotationDeg),r.translateZ(e),n.add(r)}return{group:n,disposables:{geometries:[o,c,d],materials:[s,l,f],textures:[]}}}function ox(e,t){let n=Tb(`dressing-marshal-post`),r=bb(e.track,t.s,t.side,t.distance),i=new Y(2.6,2.2,2),a=new X({color:14998960,roughness:.85}),o=new J(i,a);o.castShadow=!0,o.receiveShadow=!0,Sb(o,r,1.1,t.rotationDeg),n.add(o);let s=new Y(3,.2,2.4),c=new X({color:14181407,roughness:.7}),l=new J(s,c);l.castShadow=!0,Sb(l,r,2.3,t.rotationDeg),n.add(l);let u=new $c(.04,.04,3.2,5),d=new X({color:13619151,roughness:.6}),f=new J(u,d);Sb(f,r,1.6,t.rotationDeg),f.position.addScaledVector(r.right,1.6),n.add(f);let p=new tl(.7,.5),m=new X({color:14267180,side:2,roughness:.8}),h=new J(p,m);return Sb(h,r,3,t.rotationDeg),h.position.addScaledVector(r.right,1.6),n.add(h),{group:n,disposables:{geometries:[i,s,u,p],materials:[a,c,d,m],textures:[]}}}function sx(e,t){let n=Tb(`dressing-camera-tower`),r=bb(e.track,t.s,t.side,t.distance),i=new $c(.18,.28,t.height,4),a=new X({color:3356219,roughness:.6,metalness:.4}),o=new J(i,a);o.castShadow=!0,Sb(o,r,t.height/2,t.rotationDeg),n.add(o);let s=new Y(2.4,.2,2.4),c=new X({color:2895667,roughness:.7}),l=new J(s,c);l.castShadow=!0,Sb(l,r,t.height,t.rotationDeg),n.add(l);let u=new rl(.5,10,8),d=new X({color:1118740,roughness:.3,metalness:.5}),f=new J(u,d);return f.castShadow=!0,Sb(f,r,t.height+.6,t.rotationDeg),n.add(f),{group:n,disposables:{geometries:[i,s,u],materials:[a,c,d],textures:[]}}}var cx=4;function lx(e,t){let n=Tb(`dressing-apex-board`),r=bb(e.track,t.s,t.side,t.distance),i=new Y(4.5,1.6,.08),a=w_(`APEX`,{width:720,height:256,bg:`#101418`,fg:`#ffffff`,fontPx:150}),o=new X({map:a,side:2,roughness:.6}),s=new J(i,o);return s.castShadow=!0,Sb(s,r,2.4,t.rotationDeg),n.add(s),{group:n,disposables:{geometries:[i],materials:[o],textures:[a]}}}function ux(e,t){let n=Tb(`dressing-ad-board-run`),{track:r}=e,i=t.side===`both`?[`left`,`right`]:[t.side],a=fx(r.deltaS(t.sStart,t.sEnd),r.length),o=Math.max(1,Math.floor(a/t.spacing)),s=new Y(1.9,.9,.06),c=new X({vertexColors:!0,roughness:.7}),l=new _c(s,c,o*i.length),u=new go,d=0;for(let e of i)for(let n=0;n<o;n++){let i=l_(r,t.sStart+n*t.spacing),a=(e===`right`?1:-1)*(r.barrierDistance(i.index)+Math.max(cx,t.distance));u.position.set(i.point.x+i.right.x*a,i.point.y+.6,i.point.z+i.right.z*a),py(u,u.position,i.forward),u.updateMatrix(),l.setMatrixAt(d,u.matrix),l.setColorAt(d,new q(vb(t.colors.length?t.colors:gb,d))),d++}return l.instanceMatrix.needsUpdate=!0,l.instanceColor&&(l.instanceColor.needsUpdate=!0),n.add(l),{group:n,disposables:{geometries:[s],materials:[c],textures:[]}}}function dx(e,t){let n=Tb(`dressing-flag-row`),{track:r}=e,i=t.side===`both`?[`left`,`right`]:[t.side],a=fx(r.deltaS(t.sStart,t.sEnd),r.length),o=Math.max(1,Math.floor(a/t.spacing)),s=new $c(.045,.045,4.6,6),c=new X({color:13619151,roughness:.6,metalness:.3}),l=new _c(s,c,o*i.length),u=new tl(1.1,.7),d=new X({vertexColors:!0,side:2,roughness:.8}),f=new _c(u,d,o*i.length),p=new go,m=0;for(let e of i)for(let n=0;n<o;n++){let i=l_(r,t.sStart+n*t.spacing),a=(e===`right`?1:-1)*(r.barrierDistance(i.index)+Math.max(cx,t.distance)),o=i.point.clone().addScaledVector(i.right,a);p.position.set(o.x,o.y+2.3,o.z),p.updateMatrix(),l.setMatrixAt(m,p.matrix),p.position.set(o.x,o.y+4,o.z),py(p,p.position,i.forward),p.updateMatrix(),f.setMatrixAt(m,p.matrix),f.setColorAt(m,new q(vb(gb,m))),m++}return l.instanceMatrix.needsUpdate=!0,f.instanceMatrix.needsUpdate=!0,f.instanceColor&&(f.instanceColor.needsUpdate=!0),n.add(l,f),{group:n,disposables:{geometries:[s,u],materials:[c,d],textures:[]}}}function fx(e,t){return e>=0?e:e+t}function px(e,t){let n=Tb(`dressing-helipad`),r=bb(e.track,t.s,t.side,t.distance),i=new $c(9,9,.15,24),a=w_(`H`,{width:256,height:256,bg:`#2b2f33`,fg:`#ffd23f`,fontPx:190}),o=new X({map:a,roughness:.8}),s=new J(i,o);return s.receiveShadow=!0,Sb(s,r,.08,t.rotationDeg),n.add(s),{group:n,disposables:{geometries:[i],materials:[o],textures:[a]}}}function mx(e,t){let n=Tb(`dressing-car-park`),r=bb(e.track,t.s,t.side,t.distance),i=t.cols*3,a=t.rows*5.5,o=new Y(i,.1,a),s=new X({color:4803664,roughness:.95}),c=new J(o,s);c.receiveShadow=!0,Sb(c,r,.05,t.rotationDeg),n.add(c);let l=hx(r,t,i,a);return n.add(l.mesh),{group:n,disposables:{geometries:[o,l.geo],materials:[s,l.mat],textures:[]}}}function hx(e,t,n,r){let i=_(31793^Math.floor(t.s)),a=new Y(1.8,1.3,4.2),o=new X({vertexColors:!0,roughness:.4,metalness:.3,side:2}),s=new _c(a,o,t.rows*t.cols);s.castShadow=!0;let c=new go,l=0;for(let a=0;a<t.rows;a++)for(let o=0;o<t.cols;o++){if(i()<.25)continue;let u=-r/2+(a+.5)*(r/t.rows),d=-n/2+(o+.5)*(n/t.cols);c.position.copy(e.position).addScaledVector(e.forward,u).addScaledVector(e.right,d),c.position.y+=.7,c.rotation.set(0,i()*.2,0),c.updateMatrix(),s.setMatrixAt(l,c.matrix),s.setColorAt(l,new q().setHSL(i(),.2,.4+i()*.3)),l++}return s.count=l,s.instanceMatrix.needsUpdate=!0,s.instanceColor&&(s.instanceColor.needsUpdate=!0),{mesh:s,geo:a,mat:o}}var gx=4;function _x(e,t){let n=Tb(`dressing-forest-belt`),{track:r}=e,i=_(16142^Math.floor(t.sStart)),a=t.side===`both`?[`left`,`right`]:[t.side],o=r.deltaS(t.sStart,t.sEnd),s=o>=0?o:o+r.length,c=6/Math.max(.2,t.density),l=Math.max(1,Math.floor(s/c)),u=l*a.length*2,d=new $c(.2,.28,2.6,6),f=new el(1.5,t.tall?6:3.4,7),p=new X({color:5061418,roughness:1}),m=new X({vertexColors:!0,roughness:.95}),h=new _c(d,p,u),g=new _c(f,m,u);h.castShadow=!0,g.castShadow=!0;let v=0,y=new go;for(let e of a)for(let n=0;n<2;n++)for(let a=0;a<l;a++){let o=l_(r,t.sStart+a/l*s+i()*c*.4),u=(e===`left`?-1:1)*(r.barrierDistance(o.index)+Math.max(gx,t.distance)+n*5),d=o.point.x+o.right.x*u,f=o.point.z+o.right.z*u,p=Hv(r,d,f,o.index).y,m=r.query(new U(d,p,f),null);if(Math.abs(m.lateral)<r.barrierDistance(m.index)+4)continue;let _=.8+i()*.6;vx(h,g,y,v,d,p,f,_,i()),v++}return h.count=v,g.count=v,h.instanceMatrix.needsUpdate=!0,g.instanceMatrix.needsUpdate=!0,g.instanceColor&&(g.instanceColor.needsUpdate=!0),n.add(h,g),{group:n,disposables:{geometries:[d,f],materials:[p,m],textures:[]}}}function vx(e,t,n,r,i,a,o,s,c){n.position.set(i,a+1.3*s,o),n.rotation.set(0,c*Math.PI*2,0),n.scale.setScalar(s),n.updateMatrix(),e.setMatrixAt(r,n.matrix),n.position.y=a+4.3*s,n.updateMatrix(),t.setMatrixAt(r,n.matrix),t.setColorAt(r,new q().setHSL(.3+c*.06,.4,.22+c*.1))}var yx=4;function bx(e,t){let n=Tb(`dressing-gravel-trap`),{track:r}=e,i=(t.side===`both`?[`left`,`right`]:[t.side]).map(e=>xx(r,t,e)),a=i.length>1?Cm(i):i[0];if(i.length>1)for(let e of i)e.dispose();let o=new X({color:hb.gravelBeige,roughness:1}),s=new J(a,o);return s.receiveShadow=!0,n.add(s),{group:n,disposables:{geometries:[a],materials:[o],textures:[]}}}function xx(e,t,n){let r=e.deltaS(t.sStart,t.sEnd),i=r>=0?r:r+e.length,a=Math.max(2,Math.floor(i/8)),o=n===`right`?1:-1,s=Math.max(yx,t.distance),c=s+t.width,l=[],u=[];for(let n=0;n<=a;n++){let r=l_(e,t.sStart+n/a*i);for(let t of[s,c]){let i=o*(e.barrierDistance(r.index)+t),c=r.point.x+r.right.x*i,d=r.point.z+r.right.z*i,f=Hv(e,c,d,r.index).y+.02;l.push(c,f,d),u.push(n/a,t===s?0:1)}}let d=[];for(let e=0;e<a;e++){let t=e*2,n=t+1,r=t+2,i=t+3;d.push(t,r,n,n,r,i)}let f=new bs;return f.setAttribute(`position`,new cs(l,3)),f.setAttribute(`uv`,new cs(u,2)),f.setIndex(d),f.computeVertexNormals(),f}function Sx(e,t){let n=new _o;n.name=`dressing`;let r=n_(),i=mb(e.id);if(!i)return{group:n,disposables:r};let a={track:e,options:t},o=i.startRotationM??0,s=e.length,c=e=>Math.abs(e)<=300||o===0?e:((e-o)%s+s)%s;for(let t of i.landmarks){let i={...t,s:c(t.s)},o=Cx(a,i);i.kind!==`bridge`&&vy(e,o.group)||(n.add(o.group),r_(r,o.disposables))}for(let e of i.regions){let t=wx(a,Math.abs(e.sStart)<=300&&Math.abs(e.sEnd)<=300?e:{...e,sStart:c(e.sStart),sEnd:c(e.sEnd)});n.add(t.group),r_(r,t.disposables)}return{group:n,disposables:r}}function Cx(e,t){switch(t.kind){case`grandstand`:return Ab(e,t);case`pitComplex`:return Ib(e,t);case`paddock`:return Ub(e,t);case`ferrisWheel`:return Kb(e,t);case`bullStatue`:return Qb(e,t);case`mountainCone`:return ex(e,t);case`ridgeLine`:return tx(e,t);case`rollingHills`:return nx(e,t);case`citySkyline`:return ix(e,t);case`bridge`:return ax(e,t);case`marshalPost`:return ox(e,t);case`cameraTower`:return sx(e,t);case`apexBoard`:return lx(e,t);case`helipad`:return px(e,t);case`carPark`:return mx(e,t);default:return Tx(t)}}function wx(e,t){switch(t.kind){case`forestBelt`:return _x(e,t);case`adBoardRun`:return ux(e,t);case`flagRow`:return dx(e,t);case`gravelTrap`:return bx(e,t);default:return Tx(t)}}function Tx(e){throw Error(`unhandled dressing kind: ${JSON.stringify(e)}`)}var Ex=.3,Dx=.04,Ox=6;function kx(e,t){let n=e.points.length,r=e.speed[(t+Ox)%n]-e.speed[t];return r<-1?[.9,.1,.1]:r>1?[.2,.85,.95]:[.9,.85,.15]}function Ax(e,t){let n=a_(e),r=[],i=[];for(let a=0;a<t.points.length;a++){let o=t.points[a],s=e.rights[a],c=n[a]/8,l=kx(t,a);r.push({pos:o.clone().addScaledVector(s,-.3).setY(o.y+Dx),v:c,color:l}),i.push({pos:o.clone().addScaledVector(s,Ex).setY(o.y+Dx),v:c,color:l})}let a=o_(r,i,!0,!0),o=new Ps({vertexColors:!0,transparent:!0,opacity:.75,blending:2,depthWrite:!1,side:2}),s=new J(a,o);return s.name=`racing-line`,s.visible=!1,{mesh:s,disposables:{geometries:[a],materials:[o],textures:[]}}}var jx=.08;function Mx(e){let t=1/0,n=-1/0,r=1/0,i=-1/0;for(let a of e.points)t=Math.min(t,a.x),n=Math.max(n,a.x),r=Math.min(r,a.z),i=Math.max(i,a.z);let a=Math.max(1e-6,n-t),o=Math.max(1e-6,i-r),s=1-2*jx,c=s/Math.max(a,o),l=a*c,u=o*c,d=jx+(s-l)/2,f=jx+(s-u)/2,p=(e,n)=>[d+(e-t)*c,f+(n-r)*c];return{outline:e.points.map(e=>p(e.x,e.z)),project:p}}var Nx=260;function Px(e,t){let n=t_(t.quality),r=N_(n.textureSize),i=n_();r_(i,{geometries:[],materials:[],textures:r.all});let a=new _o;a.name=`track-scene`;let o=U_(e,r,t.racingLine),s=$_(e),c=iv(e,r),l=Dv(e,r,n),u=qv(e,r),d=ey(e),f=fy(e,n.treeCount),p=fb(e,t),m=Sx(e,t);a.add(o.group,s.mesh,...c.meshes,l.group,u.mesh,d.group,f.group,p.group,m.group),r_(i,o.disposables,s.disposables,c.disposables,l.disposables,u.disposables,d.disposables,f.disposables,p.disposables,m.disposables);let h=null;if(t.racingLine){let n=Ax(e,t.racingLine);h=n.mesh,a.add(n.mesh),r_(i,n.disposables)}return{group:a,roadMeshes:o.roadMeshes,racingLineMesh:h,disposables:i,setStartLights:p.setStartLights,animatedFlags:p.animatedFlags,lodBoards:p.lodBoards}}function Fx(e,t){let n=Px(e,t),r=Mx(e);n.group.updateMatrixWorld(!0);let i=new Vo().setFromObject(n.group),a=n.animatedFlags.map(e=>Rx(e)),o=0;return{group:n.group,roadMeshes:n.roadMeshes,setRacingLineVisible:e=>{n.racingLineMesh&&(n.racingLineMesh.visible=e)},recolorRacingLine:(e,t,r)=>{let i=n.racingLineMesh;if(!i)return;let a=i.geometry.getAttribute(`color`),o=a.count/6;for(let n=0;n<t;n++){let t=((e+n)%o+o)%o,[i,s,c]=r(t);for(let e=0;e<6;e++)a.setXYZ(t*6+e,i,s,c)}a.needsUpdate=!0},setStartLights:n.setStartLights,update:(e,t)=>{o+=e;for(let e of a)e(o);for(let e of n.lodBoards)e.visible=e.position.distanceTo(t)<Nx},minimap:r,bounds:i,dispose:()=>{for(let e of n.disposables.geometries)e.dispose();for(let e of n.disposables.materials)e.dispose();for(let e of n.disposables.textures)e.dispose()}}}var Ix=3.2,Lx=.18;function Rx(e){let t=e.geometry.attributes.position,n=Float32Array.from({length:t.count},(e,n)=>t.getX(n));return r=>{for(let e=0;e<t.count;e++){let i=n[e];t.setZ(e,Math.sin(i*3+r*Ix)*Lx*(i+.7))}t.needsUpdate=!0,e.geometry.computeVertexNormals()}}var zx=30,Bx=14,Vx=class{carCount;frames=[];accumulator=0;spins;constructor(e){this.carCount=e,this.spins=new Float32Array(e*4)}update(e,t){for(let n=0;n<e.length;n++)for(let r=0;r<4;r++)this.spins[n*4+r]+=e[n].wheels[r].omega*t;this.accumulator+=t;let n=1/zx;if(this.accumulator<n||(this.accumulator-=n,this.frames.length>72e3))return;let r=new Float32Array(this.carCount*Bx);for(let t=0;t<e.length;t++){let n=e[t],i=t*Bx;r[i]=n.pos.x,r[i+1]=n.pos.y,r[i+2]=n.pos.z,r[i+3]=n.quat.x,r[i+4]=n.quat.y,r[i+5]=n.quat.z,r[i+6]=n.quat.w;for(let e=0;e<4;e++)r[i+7+e]=this.spins[t*4+e];r[i+11]=n.steerAngle,r[i+12]=n.controls.brake,r[i+13]=n.rpm}this.frames.push(r)}finish(){return new Hx(this.frames,this.carCount)}},Hx=class{frames;carCount;time=0;speed=1;playing=!0;states=[];qa=new xa;qb=new xa;constructor(e,t){this.frames=e,this.carCount=t;for(let e=0;e<t;e++)this.states.push({pos:new U,quat:new xa,spins:[0,0,0,0],steer:0,brake:0,rpm:0})}get duration(){return this.frames.length/zx}seek(e){this.time=Math.max(0,Math.min(this.duration,e)),this.sample()}update(e){this.playing&&(this.time+=e*this.speed),this.time>=this.duration&&(this.time=this.duration,this.playing=!1),this.time<0&&(this.time=0),this.sample()}sample(){if(!this.frames.length)return;let e=this.time*zx,t=Math.min(this.frames.length-1,Math.floor(e)),n=Math.min(this.frames.length-1,t+1),r=e-t,i=this.frames[t],a=this.frames[n];for(let e=0;e<this.carCount;e++){let t=e*Bx,n=this.states[e];n.pos.set(Ux(i[t],a[t],r),Ux(i[t+1],a[t+1],r),Ux(i[t+2],a[t+2],r)),this.qa.set(i[t+3],i[t+4],i[t+5],i[t+6]),this.qb.set(a[t+3],a[t+4],a[t+5],a[t+6]),n.quat.copy(this.qa).slerp(this.qb,r);for(let e=0;e<4;e++)n.spins[e]=Ux(i[t+7+e],a[t+7+e],r);n.steer=Ux(i[t+11],a[t+11],r),n.brake=Ux(i[t+12],a[t+12],r),n.rpm=Ux(i[t+13],a[t+13],r)}}},Ux=(e,t,n)=>e+(t-e)*n,Wx=class{track;camera;cams=[];current=0;look=new U;tmp=new U;fov=40;lastHint=0;constructor(e,t){this.track=e,this.camera=t;let n=Math.round(220/e.spacing);for(let t=0;t<e.n;t+=n){let r=e.curvatures[t],i=Math.abs(r)>.003?-Math.sign(r):t%(2*n)==0?1:-1,a=e.points[t].clone().addScaledVector(e.rights[t],i*(e.barrierDistance(t)+6));a.y+=5+Math.random()*3,this.cams.push({pos:a,index:t})}}reset(){this.current=0,this.lastHint=0}update(e,t){let n=this.track.nearestIndex(e,this.lastHint);this.lastHint=n;let r=this.current,i=1/0;for(let e=0;e<this.cams.length;e++){let t=h(this.cams[e].index-n,this.track.n)*this.track.spacing;t<i&&t<260&&(i=t,r=e)}r!==this.current&&(this.current=r,this.look.copy(e));let a=this.cams[this.current];this.camera.position.copy(a.pos),this.look.lerp(e,1-Math.exp(-t/.12));let o=this.tmp.subVectors(e,a.pos).length(),s=Math.max(14,Math.min(55,1400/Math.max(20,o)));this.fov=m(this.fov,s,.4,t),this.camera.fov=this.fov,this.camera.updateProjectionMatrix(),this.camera.lookAt(this.look)}};function Gx(){return{speedKmh:0,rpm:0,redlineRpm:8e3,gear:0,throttle:0,brake:0,position:1,totalCars:1,lap:1,totalLaps:1,currentLapMs:0,lastLapMs:null,bestLapMs:null,deltaToBestMs:null,sectorTimes:[null,null,null],gapAheadMs:null,gapBehindMs:null,countdown:null,message:null,finished:!1,offTrack:!1,abs:!1,tcs:!1,carProgress:[],standings:[],wrongWay:!1,invalidLap:!1}}var Kx=class e{track;config;trackScene;renderer;audio;session;group=new _o;visuals=[];skids=new Kg;smoke=new Jg;rain=null;wind=new U(2,0,1);camera;hud=Gx();audioStates=[];prevGear=[];rel=new U;camForward=new U;camRight=new U;focus=new U;finishHandled=!1;startLightsShown=-1;recorder;replay=null;director=null;replayCamera=`tv`;replaySubject=0;constructor(e,t,n,r,i,a,o,s,c){this.track=e,this.config=t,this.trackScene=n,this.renderer=o,this.audio=s,this.session=new Wg(e,t,r,i,a,c),this.camera=new $g(o.camera),this.recorder=new Vx(r.length);for(let e of n.roadMeshes)if(e.receiveShadow=!0,t.weather===`rain`){let t=e.material;t.roughness!==void 0&&(t.roughness=.32),t.envMapIntensity!==void 0&&(t.envMapIntensity=1.4)}this.group.add(n.group,this.skids.mesh,this.smoke.points),t.weather===`rain`&&(this.rain=new Zg,this.group.add(this.rain.points))}static async load(t,n,r,i,a,o,s,c,l){l(.1,`Preparing racing line`),await qx();let u=new qh(t);l(.2,`Building circuit`),await qx();let d=Fx(t,{quality:c,timeOfDay:n.timeOfDay,racingLine:u});l(.45,`Placing the grid`),await qx();let f=new e(t,n,d,r,i,a,o,s,u),p=[...new Map(r.map(e=>[e.spec.id,e.spec])).values()],m=0;await Promise.all(p.map(async e=>{await kh(e),m++,l(.5+.4*m/p.length,`Loading ${e.name}`)}));for(let e of f.session.participants){let t=new Mh(await kh(e.entry.spec),e.entry.tuning.color,e.entry.isPlayer);t.setNight(n.timeOfDay===`night`),n.timeOfDay===`night`&&e.entry.isPlayer&&t.enableHeadlamps(e.entry.spec),f.visuals.push(t),f.group.add(t.root),f.audioStates.push(f.audioStateFor(e.entry.spec,e.entry.isPlayer,f.audioStates.length)),f.prevGear.push(1)}return l(.95,`Lights out soon`),await qx(),f.camera.snap(),f}audioStateFor(e,t,n){return{id:n,rpm:e.idleRpm,redlineRpm:e.redlineRpm,throttle:0,gear:1,skid:0,speed:0,relX:0,relY:0,relZ:0,isPlayer:t,shifting:!1,onGrass:!1,onCurb:!1,engine:e.engine}}setRacingLineVisible(e){this.trackScene.setRacingLineVisible(e)}update(e,t,n){let r=this.session;r.update(e,t);let i=r.vehicles;!r.paused&&r.state!==`countdown`&&this.recorder.update(i,e);for(let t=0;t<i.length;t++)this.visuals[t].update(i[t],e);this.skids.update(i),this.smoke.updateFromVehicles(i,e);let a=r.player.vehicle;this.camera.lookBack=t.lookBack,this.camera.update(a,e),this.renderer.updateShadowTarget(a.pos),this.trackScene.update(e,this.renderer.camera.position),this.updateDrivingLine(),this.rain?.update(e,this.renderer.camera.position,this.wind),this.updateStartLights(),this.feedAudio(e),this.rumble(n,e),r.hud(this.hud)}static RED=[.95,.12,.1];static YELLOW=[.95,.85,.15];static BLUE=[.2,.6,1];static DIM=[.35,.35,.4];updateDrivingLine(){let t=this.session.player.vehicle,n=this.session.line,r=n.speed.length,i=t.tyres.mu*.97,a=Math.sqrt(i*.9/1.38),o=Math.abs(t.speed),s=t.query.index-20;this.trackScene.recolorRacingLine(s,220,t=>{if(((t-s)%r+r)%r<20)return e.DIM;let i=n.speed[t]*a;return o>i*1.04?e.RED:o<i*.94?e.BLUE:e.YELLOW})}updateStartLights(){let e=this.session,t=e.state===`countdown`?Math.min(5,Math.max(0,5-Math.ceil(e.countdown))):-1;t!==this.startLightsShown&&(this.startLightsShown=t,this.trackScene.setStartLights(t),t>0&&t<5&&this.audio.playUi(`countdown`),t===-1&&e.state===`racing`&&e.simTime<1&&this.audio.playUi(`go`))}feedAudio(e){let t=this.renderer.camera;t.getWorldDirection(this.camForward),this.camRight.crossVectors(this.camForward,t.up).normalize();let n=this.session.vehicles;for(let e=0;e<n.length;e++){let r=n[e],i=this.audioStates[e];i.rpm=r.rpm,i.throttle=r.controls.throttle,i.gear=r.gear,i.speed=Math.abs(r.speed),i.skid=Math.max(...r.wheels.map(e=>e.skid)),i.onGrass=r.offTrackWheels>=2,i.onCurb=r.wheels.some(e=>e.surface===`curb`),i.shifting=r.drivetrain.shiftTimer>0||this.prevGear[e]!==r.gear,this.prevGear[e]=r.gear,this.rel.subVectors(r.pos,t.position),i.relX=this.rel.dot(this.camRight),i.relY=this.rel.y,i.relZ=-this.rel.dot(this.camForward)}this.audio.updateCars(this.audioStates,e);for(let e of this.session.collisionEvents){let n=e.a.spec===this.session.player.vehicle.spec?e.a:e.b;this.rel.subVectors(n.pos,t.position),this.audio.playCollision(Math.min(1,e.impulse/6e3),this.rel.dot(this.camRight),-this.rel.dot(this.camForward))}this.session.collisionEvents.length=0;let r=this.session.player.vehicle;r.wallContact>.5&&this.audio.playWallScrape(Math.min(1,r.wallContact/8))}rumbleTimer=0;rumble(e,t){let n=this.session.player.vehicle;this.rumbleTimer-=t,!(this.rumbleTimer>0)&&(n.wallContact>1?(e.rumble(Math.min(1,n.wallContact/6),.6,180),this.rumbleTimer=.18):n.offTrackWheels>=2&&Math.abs(n.speed)>5?(e.rumble(.15,.45,120),this.rumbleTimer=.12):n.wheels.some(e=>e.surface===`curb`)&&Math.abs(n.speed)>8&&(e.rumble(.05,.35,90),this.rumbleTimer=.1))}autopilot=null;applyAutopilot(e){let t=this.session.player;this.autopilot||=new Pg(t.vehicle,this.session.line,.97,4242),this.autopilot.update(1/60,this.session.vehicles,e),e.steerIsDirect=!1}startReplay(){this.replay=this.recorder.finish(),this.replay.seek(0),this.replay.playing=!0,this.replay.speed=1,this.director=new Wx(this.track,this.renderer.camera),this.replaySubject=this.session.participants.indexOf(this.session.player),this.replayCamera=`tv`,this.camera.snap()}updateReplay(e){let t=this.replay;if(!t||!this.director)return;t.update(e);let n=this.session.participants;for(let e=0;e<n.length;e++){let r=t.states[e],i=n[e].entry.spec;this.visuals[e].applyState(r.pos,r.quat,r.spins,r.steer,r.brake,i.cgHeightM,i.wheelRadiusM);let a=this.audioStates[e];a.rpm=r.rpm,a.throttle=r.brake>.1?0:.6,a.speed=0,a.skid=0,a.shifting=!1}let r=t.states[this.replaySubject];if(this.replayCamera===`tv`)this.director.update(r.pos,e);else{let t=n[this.replaySubject].vehicle;t.pos.copy(r.pos),t.quat.copy(r.quat),t.updateAxes(),this.camera.update(t,e)}this.renderer.updateShadowTarget(r.pos),this.trackScene.update(e,this.renderer.camera.position),this.feedAudio(e)}get playerFinished(){return this.session.player.finished}consumeFinish(){return this.session.state===`finished`&&!this.finishHandled&&(this.finishHandled=!0,!0)}focusPoint(){return this.focus.copy(this.session.player.vehicle.pos)}dispose(){this.trackScene.dispose();for(let e of this.visuals)e.dispose();this.skids.mesh.geometry.dispose(),this.smoke.points.geometry.dispose()}},qx=()=>new Promise(e=>document.hidden?setTimeout(e,0):requestAnimationFrame(()=>e())),Jx=[`K. Tanaka`,`L. Moreau`,`S. Okafor`,`M. Rossi`,`A. Lindqvist`,`J. Carter`,`R. Silva`,`H. Weber`,`T. Nakamura`,`E. Novak`,`D. Kowalski`,`P. Fischer`,`N. Haddad`,`V. Petrov`,`C. Dubois`,`B. Larsen`,`F. Alonso-Ruiz`,`G. Mbeki`,`I. Sato`,`O. Brennan`,`Y. Chen`,`W. Schmidt`,`Z. Costa`,`M. Kimura`],Yx={easy:[.8,.87],normal:[.87,.93],hard:[.92,.97],expert:[.96,1.01]},Xx=[`N100`,`N200`,`N300`,`N500`,`Gr.4`,`Gr.3`,`Gr.1`];function Zx(e){let t=Yn.filter(t=>t.carClass===e);if(t.length>=2)return t;let n=Xx.indexOf(e),r=Yn.filter(e=>Math.abs(Xx.indexOf(e.carClass)-n)<=1);return r.length?r:Yn}function Qx(e){let t=Yn.map(e=>({c:e,pp:ye(e,be(e))})),n=t.filter(t=>Math.abs(t.pp-e)<=Math.max(60,e*.14)).map(e=>e.c);return n.length>=2?n:t.sort((t,n)=>Math.abs(t.pp-e)-Math.abs(n.pp-e)).slice(0,3).map(e=>e.c)}function $x(e,t,n,r){let i=_(eS(e.trackId+e.laps+e.opponents+e.difficulty)),a=[],o=ye(n,t.tuning),s=e.opponentClass?Zx(e.opponentClass):Qx(o),[c,l]=Yx[e.difficulty],u=[...Jx].sort(()=>i()-.5),d=e.mode===`race`?e.opponents:0;for(let e=0;e<d;e++){let t=s[Math.floor(i()*s.length)],n=be(t);n.color=t.colors[Math.floor(i()*t.colors.length)];let r=Math.max(0,o-ye(t,n))/Math.max(300,o),d=c+i()*(l-c)+r*.25;a.push({spec:t,tuning:n,name:u[e%u.length],isPlayer:!1,skill:d})}return a.push({spec:n,tuning:t.tuning,name:r,isPlayer:!0,skill:1}),a}function eS(e){let t=2166136261;for(let n=0;n<e.length;n++)t=Math.imul(t^e.charCodeAt(n),16777619);return t>>>0}var tS=new class{store=new tr;input;renderer;audio;ui;showroomView;economy;tracksIndex=[];screen=`title`;race=null;lastConfig=null;lastTime=performance.now();loading=!1;constructor(e,t){this.input=new at(this.save.inputMappings),this.renderer=new Sm(e,this.save.settings.graphics),this.audio=Vn(),this.audio.setSettings(this.save.settings.audio),this.showroomView=new Ph(this.renderer),this.renderer.scene.add(this.showroomView.group),this.economy=new or(this.save),this.ui=bt(this,t),this.applyInputSettings()}get save(){return this.store.data}async boot(){try{let e=await fetch(`/play/apex-turismo/tracks/index.json`);this.tracksIndex=e.ok?await e.json():[]}catch{this.tracksIndex=[]}this.showScreen(`title`),this.scheduleFrame()}autopilot=!1;debugAdvance(e){if(!this.race)return;let t=Math.round(e*60);for(let e=0;e<t;e++){this.input.update(1/60);let e=this.input.state;this.autopilot&&this.race.applyAutopilot(e),this.race.update(1/60,e,this.input),this.race.consumeFinish()&&this.onRaceFinished()}this.ui.updateHud(this.race.hud)}stats={frame:0,sim:0,render:0,ui:0,fps:0};frame(){let e=performance.now(),t=Math.min(.1,(e-this.lastTime)/1e3);this.lastTime=e;let n=performance.now();this.frameBody(t);let r=performance.now();this.renderer.render();let i=performance.now();this.stats.render=this.stats.render*.9+(i-r)*.1,this.stats.frame=this.stats.frame*.9+(i-n)*.1,this.stats.fps=this.stats.fps*.95+(t>0?1/t:0)*.05,this.scheduleFrame()}scheduleFrame(){document.hidden?window.setTimeout(()=>this.frame(),16):requestAnimationFrame(()=>this.frame())}frameBody(e){this.input.update(e);let t=this.input.state;if(this.race&&this.screen===`replay`)t.camera&&this.replayControl(`camera`),(t.pause||t.menuBack)&&this.exitReplay(),this.race.updateReplay(e),this.ui.handleInput(t);else if(this.race&&this.screen===`race`){t.pause&&this.togglePause(),t.camera&&this.cycleCamera(),t.reset&&this.race.session.player.vehicle.resetToTrack();let n=performance.now();this.autopilot&&this.race.applyAutopilot(t),this.race.update(e,t,this.input);let r=performance.now();this.ui.updateHud(this.race.hud),this.stats.sim=this.stats.sim*.9+(r-n)*.1,this.stats.ui=this.stats.ui*.9+(performance.now()-r)*.1,this.race.consumeFinish()&&this.onRaceFinished()}else this.race&&this.screen===`pause`&&t.pause?this.resumeRace():this.ui.handleInput(t);this.showroomView.group.visible&&this.showroomView.update(e)}showScreen(e,t){this.screen=e,this.ui.showScreen(e,t);let n=e!==`race`&&e!==`pause`&&e!==`loading`&&e!==`results`;this.audio.setMenuMusic(n||e===`results`),this.audio.setRaceActive(e===`race`)}currentScreen(){return this.screen}cars(){return Yn}carById(e){return Xn(e)}tracks(){return this.tracksIndex}events(){return F.filter(e=>this.tracksIndex.some(t=>t.id===e.trackId))}eventUnlocked(e){let t=Ae(e);return!t||!t.requires||!!this.save.completedEvents[t.requires]}performancePoints(e,t){return ye(e,t)}peakPowerKw(e,t){return ve(e,[1,1.08,1.17,1.28][t.powerStage])}upgrades(){return rr(this.ownedCarSpec(this.store.selected))}ownedCarSpec(e){return Xn(e.specId)}bestLap(e,t){return this.store.bestLap(e,t)}buyCar(e,t){let n=this.economy.buyCar(e,t);return n?this.audio.playUi(`error`):(this.store.save(),this.audio.playUi(`buy`),this.ui.refresh()),n}sellCar(e){let t=this.economy.sellCar(e);return t||(this.store.save(),this.ui.refresh()),t}selectCar(e){this.save.garage[e]&&(this.save.selectedCar=e,this.store.save())}buyUpgrade(e,t,n){let r=this.economy.buyUpgrade(e,t,n);return r?this.audio.playUi(`error`):(this.store.save(),this.audio.playUi(`buy`),this.ui.refresh()),r}setTuning(e,t){let n=this.save.garage[e];n&&(Object.assign(n.tuning,t),this.store.save(),t.color&&this.showroomView.show(this.ownedCarSpec(n),n.tuning.color))}updateSettings(e){let t=this.save.settings;Object.assign(t,e),e.graphics&&(t.graphics={...t.graphics,...e.graphics},this.renderer.applySettings(t.graphics),this.race?.camera.setBaseFov(t.graphics.fov)),e.audio&&(t.audio={...t.audio,...e.audio},this.audio.setSettings(t.audio)),e.assists&&(t.assists={...t.assists,...e.assists}),t.unlimitedCredits&&(this.save.credits=ir),this.race&&(this.race.session.player.vehicle.assists=t.assists,this.race.session.player.vehicle.transmission=t.transmission,this.race.setRacingLineVisible(t.assists.racingLine)),this.applyInputSettings(),this.store.save()}applyInputSettings(){let e=this.save.settings;this.input.steeringSensitivity=e.steeringSensitivity,this.input.wheelRotationDeg=e.wheelRotationDeg,this.input.setForceFeedback(e.wheelForceFeedback>.05)}setCameraMode(e){this.save.settings.cameraMode=e,this.race&&(this.race.camera.mode=e,this.race.camera.snap()),this.store.save()}cameraMode(){return this.race?this.race.camera.mode:this.save.settings.cameraMode}cycleCamera(){this.race&&(this.save.settings.cameraMode=this.race.camera.cycle(),this.store.save())}inputDevices(){return this.input.devices()}captureBinding(){return this.input.captureBinding()}cancelCapture(){this.input.cancelCapture()}inputMappings(){return this.save.inputMappings}setBinding(e,t,n,r){let i=this.save.inputMappings[e]??{deviceId:e,deviceType:t,bindings:{}};i.deviceType=t,i.bindings[n]=r,this.save.inputMappings[e]=i,this.input.setMappings(this.save.inputMappings),this.store.save()}clearMapping(e){delete this.save.inputMappings[e],this.input.setMappings(this.save.inputMappings),this.store.save()}resetSave(){this.store.reset(),this.ui.refresh()}playUiSound(e){e===`confirm`&&this.screen===`title`&&this.audio.resume(),this.audio.playUi(e)}showroom(e,t){this.showroomView.show(e?Xn(e):null,t)}startEvent(e){let t=Ae(e);if(!t)return`That event is not available.`;if(!this.eventUnlocked(e))return`Finish the previous event in this series first.`;let n=this.store.selected,r=this.ownedCarSpec(n);if(!t.allowedClasses.includes(r.carClass))return`The ${r.name} is a ${r.carClass} car. This event is for ${t.allowedClasses.join(`, `)} cars.`;let i=ye(r,n.tuning);return t.ppLimit!==null&&i>t.ppLimit?`Your car is ${i} PP but this event allows up to ${t.ppLimit} PP. Fit softer tyres or remove upgrades in the Tuning Shop.`:(this.startRace({mode:`race`,trackId:t.trackId,laps:t.laps,opponents:t.opponents,difficulty:t.difficulty,timeOfDay:t.timeOfDay,weather:`clear`,playerCarId:String(this.save.selectedCar),opponentClass:t.opponentClass,eventId:t.id,rollingStart:!1,transmission:this.save.settings.transmission}),null)}startRace(e){this.loading||(this.lastConfig=e,this.loadRace(e))}async loadRace(e){this.loading=!0,this.disposeRace(),this.showroomView.show(null),this.showScreen(`loading`,{trackName:this.tracksIndex.find(t=>t.id===e.trackId)?.name??e.trackId}),this.ui.setLoading(.02,`Loading circuit data`);try{let t=new Ih(await Kh(e.trackId)),n=this.store.selected,r=$x(e,n,this.ownedCarSpec(n),this.save.driverName),i=this.save.settings;this.renderer.setLighting(e.timeOfDay,e.weather);let a=await Kx.load(t,e,r,i.assists,e.transmission,this.renderer,this.audio,i.graphics.quality,(e,t)=>this.ui.setLoading(e,t));this.race=a,a.camera.mode=i.cameraMode,a.camera.setBaseFov(i.graphics.fov),a.setRacingLineVisible(i.assists.racingLine),this.renderer.scene.add(a.group),this.audio.setRaceAmbience(!0),this.showScreen(`race`)}catch(e){console.error(e),this.ui.showToast(`The circuit could not be loaded. Please try another track.`),this.showScreen(`home`)}finally{this.loading=!1}}onRaceFinished(){if(!this.race)return;let e=this.race.session.results(),t=this.race.config,n=this.store.selected;if(e.bestLapMs!==null&&(e.newRecord=this.store.recordLap(t.trackId,n.specId,e.bestLapMs)),t.mode===`race`){let n=e.creditsEarned;if(t.eventId){let r=Ae(t.eventId);if(r){let t=e.playerPosition;n=t<=3?r.payoutCr[t-1]:Math.round(r.payoutCr[2]*.25);let i=this.save.completedEvents[r.id];this.save.completedEvents[r.id]={bestPosition:Math.min(i?.bestPosition??99,t),count:(i?.count??0)+1}}}e.creditsEarned=n,this.save.credits+=n,this.save.totalRaces+=1}n.odometerM+=this.race.session.player.distance,this.save.totalDistanceM+=this.race.session.player.distance,this.store.save(),window.setTimeout(()=>{this.race&&(this.screen=`results`,this.ui.showResults(e),this.audio.setRaceActive(!1),this.audio.setMenuMusic(!0))},2500)}quitToHome(){this.disposeRace(),this.renderer.setLighting(`noon`,`clear`),this.showScreen(`home`)}restartRace(){this.lastConfig&&this.startRace(this.lastConfig)}resumeRace(){this.race&&(this.race.session.paused=!1,this.showScreen(`race`))}togglePause(){this.race&&(this.screen===`race`?(this.race.session.paused=!0,this.showScreen(`pause`)):this.resumeRace())}disposeRace(){this.race&&(this.renderer.scene.remove(this.race.group),this.race.dispose(),this.race=null,this.audio.setRaceAmbience(!1))}startReplay(){this.race&&(this.race.startReplay(),this.audio.setRaceActive(!0),this.showScreen(`replay`))}exitReplay(){this.race&&(this.screen=`results`,this.ui.showResults(this.race.session.results()),this.audio.setRaceActive(!1),this.audio.setMenuMusic(!0))}replayControl(e){let t=this.race?.replay;if(!t||!this.race)return;let n=[.25,.5,1,2,4],r=n.indexOf(t.speed);e===`toggle`?t.playing=!t.playing:e===`faster`?t.speed=n[Math.min(n.length-1,r+1)]:e===`slower`?t.speed=n[Math.max(0,r-1)]:e===`restart`?(t.seek(0),t.playing=!0):e===`camera`?this.race.replayCamera=this.race.replayCamera===`tv`?`chase`:`tv`:e===`nextCar`&&(this.race.replaySubject=(this.race.replaySubject+1)%this.race.session.participants.length)}replayState(){let e=this.race?.replay,t=this.race?this.race.session.participants[this.race.replaySubject].entry.name:``;return{timeS:e?.time??0,durationS:e?.duration??0,playing:e?.playing??!1,speed:e?.speed??1,camera:this.race?.replayCamera===`chase`?`Chase`:`TV`,subject:t}}trackOutline(){return this.race?this.race.trackScene.minimap.outline:[]}minimapPoint(e,t){if(!this.race)return[0,0];let n=this.race.track,r=n.indexAt(e*n.length),i=n.points[r],a=n.rights[r];return this.race.trackScene.minimap.project(i.x+a.x*t,i.z+a.z*t)}loadedTrackName(){return this.race?.track.name??``}}(document.getElementById(`game`),document.getElementById(`ui`));window.apex=tS,tS.boot();