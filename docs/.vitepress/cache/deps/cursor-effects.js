import "./chunk-BUSYA2B4.js";

// node_modules/cursor-effects/dist/esm.js
function t(t2) {
  let e2, n2, i2, o2, s2 = t2 && t2.emoji || "🤪", h2 = t2 && t2.element, c2 = h2 || document.body, l2 = window.innerWidth, a2 = window.innerHeight, r2 = { x: l2 / 2, y: l2 / 2 }, d2 = [];
  const u = window.matchMedia("(prefers-reduced-motion: reduce)");
  function A() {
    if (u.matches) return console.log("This browser has prefers reduced motion turned on, so the cursor did not init"), false;
    e2 = document.createElement("canvas"), n2 = e2.getContext("2d"), e2.style.top = "0px", e2.style.left = "0px", e2.style.pointerEvents = "none", h2 ? (e2.style.position = "absolute", c2.appendChild(e2), e2.width = c2.clientWidth, e2.height = c2.clientHeight) : (e2.style.position = "fixed", document.body.appendChild(e2), e2.width = l2, e2.height = a2), n2.font = "16px serif", n2.textBaseline = "middle", n2.textAlign = "center";
    let t3 = n2.measureText(s2), i3 = document.createElement("canvas"), r3 = i3.getContext("2d");
    i3.width = t3.width, i3.height = 2 * t3.actualBoundingBoxAscent, r3.textAlign = "center", r3.font = "16px serif", r3.textBaseline = "middle", r3.fillText(s2, i3.width / 2, t3.actualBoundingBoxAscent), o2 = i3;
    let A2 = 0;
    for (A2 = 0; A2 < 7; A2++) d2[A2] = new x(o2);
    c2.addEventListener("mousemove", f), c2.addEventListener("touchmove", g, { passive: true }), c2.addEventListener("touchstart", g, { passive: true }), window.addEventListener("resize", m), p();
  }
  function m(t3) {
    l2 = window.innerWidth, a2 = window.innerHeight, h2 ? (e2.width = c2.clientWidth, e2.height = c2.clientHeight) : (e2.width = l2, e2.height = a2);
  }
  function g(t3) {
    if (t3.touches.length > 0) if (h2) {
      const e3 = c2.getBoundingClientRect();
      r2.x = t3.touches[0].clientX - e3.left, r2.y = t3.touches[0].clientY - e3.top;
    } else r2.x = t3.touches[0].clientX, r2.y = t3.touches[0].clientY;
  }
  function f(t3) {
    if (h2) {
      const e3 = c2.getBoundingClientRect();
      r2.x = t3.clientX - e3.left, r2.y = t3.clientY - e3.top;
    } else r2.x = t3.clientX, r2.y = t3.clientY;
  }
  function p() {
    !function() {
      e2.width = e2.width, d2[0].position.x = r2.x, d2[0].position.y = r2.y;
      for (let t3 = 1; t3 < 7; t3++) {
        let i3 = new v(0, 0);
        t3 > 0 && w(t3 - 1, t3, i3), t3 < 6 && w(t3 + 1, t3, i3);
        let o3, s3, h3 = new v(10 * -d2[t3].velocity.x, 10 * -d2[t3].velocity.y), c3 = new v((i3.X + h3.X) / 1, (i3.Y + h3.Y) / 1 + 50);
        d2[t3].velocity.x += 0.01 * c3.X, d2[t3].velocity.y += 0.01 * c3.Y, Math.abs(d2[t3].velocity.x) < 0.1 && Math.abs(d2[t3].velocity.y) < 0.1 && Math.abs(c3.X) < 0.1 && Math.abs(c3.Y) < 0.1 && (d2[t3].velocity.x = 0, d2[t3].velocity.y = 0), d2[t3].position.x += d2[t3].velocity.x, d2[t3].position.y += d2[t3].velocity.y, o3 = e2.clientHeight, s3 = e2.clientWidth, d2[t3].position.y >= o3 - 11 - 1 && (d2[t3].velocity.y > 0 && (d2[t3].velocity.y = 0.7 * -d2[t3].velocity.y), d2[t3].position.y = o3 - 11 - 1), d2[t3].position.x >= s3 - 11 && (d2[t3].velocity.x > 0 && (d2[t3].velocity.x = 0.7 * -d2[t3].velocity.x), d2[t3].position.x = s3 - 11 - 1), d2[t3].position.x < 0 && (d2[t3].velocity.x < 0 && (d2[t3].velocity.x = 0.7 * -d2[t3].velocity.x), d2[t3].position.x = 0), d2[t3].draw(n2);
      }
    }(), i2 = requestAnimationFrame(p);
  }
  function y() {
    e2.remove(), cancelAnimationFrame(i2), c2.removeEventListener("mousemove", f), c2.removeEventListener("touchmove", g), c2.removeEventListener("touchstart", g), window.addEventListener("resize", m);
  }
  function v(t3, e3) {
    this.X = t3, this.Y = e3;
  }
  function w(t3, e3, n3) {
    let i3 = d2[t3].position.x - d2[e3].position.x, o3 = d2[t3].position.y - d2[e3].position.y, s3 = Math.sqrt(i3 * i3 + o3 * o3);
    if (s3 > 10) {
      let t4 = 10 * (s3 - 10);
      n3.X += i3 / s3 * t4, n3.Y += o3 / s3 * t4;
    }
  }
  function x(t3) {
    this.position = { x: r2.x, y: r2.y }, this.velocity = { x: 0, y: 0 }, this.canv = t3, this.draw = function(t4) {
      t4.drawImage(this.canv, this.position.x - this.canv.width / 2, this.position.y - this.canv.height / 2, this.canv.width, this.canv.height);
    };
  }
  return u.onchange = () => {
    u.matches ? y() : A();
  }, A(), { destroy: y };
}
function e(t2) {
  let e2 = t2 && t2.colors || ["#D61C59", "#E7D84B", "#1B8798"], n2 = t2 && t2.element, i2 = n2 || document.body, o2 = window.innerWidth, s2 = window.innerHeight;
  const h2 = { x: o2 / 2, y: o2 / 2 }, c2 = { x: o2 / 2, y: o2 / 2 }, l2 = [], a2 = [];
  let r2, d2, u;
  const A = window.matchMedia("(prefers-reduced-motion: reduce)");
  function m() {
    if (A.matches) return console.log("This browser has prefers reduced motion turned on, so the cursor did not init"), false;
    r2 = document.createElement("canvas"), d2 = r2.getContext("2d"), r2.style.top = "0px", r2.style.left = "0px", r2.style.pointerEvents = "none", n2 ? (r2.style.position = "absolute", i2.appendChild(r2), r2.width = i2.clientWidth, r2.height = i2.clientHeight) : (r2.style.position = "fixed", i2.appendChild(r2), r2.width = o2, r2.height = s2), d2.font = "21px serif", d2.textBaseline = "middle", d2.textAlign = "center", e2.forEach((t3) => {
      let e3 = d2.measureText("*"), n3 = document.createElement("canvas"), i3 = n3.getContext("2d");
      n3.width = e3.width, n3.height = e3.actualBoundingBoxAscent + e3.actualBoundingBoxDescent, i3.fillStyle = t3, i3.textAlign = "center", i3.font = "21px serif", i3.textBaseline = "middle", i3.fillText("*", n3.width / 2, e3.actualBoundingBoxAscent), a2.push(n3);
    }), i2.addEventListener("mousemove", p), i2.addEventListener("touchmove", f, { passive: true }), i2.addEventListener("touchstart", f, { passive: true }), window.addEventListener("resize", g), v();
  }
  function g(t3) {
    o2 = window.innerWidth, s2 = window.innerHeight, n2 ? (r2.width = i2.clientWidth, r2.height = i2.clientHeight) : (r2.width = o2, r2.height = s2);
  }
  function f(t3) {
    if (t3.touches.length > 0) for (let e3 = 0; e3 < t3.touches.length; e3++) y(t3.touches[e3].clientX, t3.touches[e3].clientY, a2[Math.floor(Math.random() * a2.length)]);
  }
  function p(t3) {
    window.requestAnimationFrame(() => {
      if (n2) {
        const e3 = i2.getBoundingClientRect();
        h2.x = t3.clientX - e3.left, h2.y = t3.clientY - e3.top;
      } else h2.x = t3.clientX, h2.y = t3.clientY;
      Math.hypot(h2.x - c2.x, h2.y - c2.y) > 1.5 && (y(h2.x, h2.y, a2[Math.floor(Math.random() * e2.length)]), c2.x = h2.x, c2.y = h2.y);
    });
  }
  function y(t3, e3, n3) {
    l2.push(new x(t3, e3, n3));
  }
  function v() {
    !function() {
      if (0 != l2.length) {
        d2.clearRect(0, 0, o2, s2);
        for (let t3 = 0; t3 < l2.length; t3++) l2[t3].update(d2);
        for (let t3 = l2.length - 1; t3 >= 0; t3--) l2[t3].lifeSpan < 0 && l2.splice(t3, 1);
        0 == l2.length && d2.clearRect(0, 0, o2, s2);
      }
    }(), u = requestAnimationFrame(v);
  }
  function w() {
    r2.remove(), cancelAnimationFrame(u), i2.removeEventListener("mousemove", p), i2.removeEventListener("touchmove", f), i2.removeEventListener("touchstart", f), window.addEventListener("resize", g);
  }
  function x(t3, e3, n3) {
    const i3 = Math.floor(30 * Math.random() + 60);
    this.initialLifeSpan = i3, this.lifeSpan = i3, this.velocity = { x: (Math.random() < 0.5 ? -1 : 1) * (Math.random() / 2), y: 0.7 * Math.random() + 0.9 }, this.position = { x: t3, y: e3 }, this.canv = n3, this.update = function(t4) {
      this.position.x += this.velocity.x, this.position.y += this.velocity.y, this.lifeSpan--, this.velocity.y += 0.02;
      const e4 = Math.max(this.lifeSpan / this.initialLifeSpan, 0);
      t4.drawImage(this.canv, this.position.x - this.canv.width / 2 * e4, this.position.y - this.canv.height / 2, this.canv.width * e4, this.canv.height * e4);
    };
  }
  return A.onchange = () => {
    A.matches ? w() : m();
  }, m(), { destroy: w };
}
function n(t2) {
  let e2, n2, i2, o2 = t2 && t2.element, s2 = o2 || document.body, h2 = ["❄️"], c2 = window.innerWidth, l2 = window.innerHeight, a2 = { x: c2 / 2, y: c2 / 2 }, r2 = [], d2 = [];
  const u = window.matchMedia("(prefers-reduced-motion: reduce)");
  function A() {
    if (u.matches) return console.log("This browser has prefers reduced motion turned on, so the cursor did not init"), false;
    e2 = document.createElement("canvas"), n2 = e2.getContext("2d"), e2.style.top = "0px", e2.style.left = "0px", e2.style.pointerEvents = "none", o2 ? (e2.style.position = "absolute", s2.appendChild(e2), e2.width = s2.clientWidth, e2.height = s2.clientHeight) : (e2.style.position = "fixed", document.body.appendChild(e2), e2.width = c2, e2.height = l2), n2.font = "12px serif", n2.textBaseline = "middle", n2.textAlign = "center", h2.forEach((t3) => {
      let e3 = n2.measureText(t3), i3 = document.createElement("canvas"), o3 = i3.getContext("2d");
      i3.width = e3.width, i3.height = 2 * e3.actualBoundingBoxAscent, o3.textAlign = "center", o3.font = "12px serif", o3.textBaseline = "middle", o3.fillText(t3, i3.width / 2, e3.actualBoundingBoxAscent), d2.push(i3);
    }), s2.addEventListener("mousemove", f), s2.addEventListener("touchmove", g, { passive: true }), s2.addEventListener("touchstart", g, { passive: true }), window.addEventListener("resize", m), y();
  }
  function m(t3) {
    c2 = window.innerWidth, l2 = window.innerHeight, o2 ? (e2.width = s2.clientWidth, e2.height = s2.clientHeight) : (e2.width = c2, e2.height = l2);
  }
  function g(t3) {
    if (t3.touches.length > 0) for (let e3 = 0; e3 < t3.touches.length; e3++) p(t3.touches[e3].clientX, t3.touches[e3].clientY, d2[Math.floor(Math.random() * d2.length)]);
  }
  function f(t3) {
    if (o2) {
      const e3 = s2.getBoundingClientRect();
      a2.x = t3.clientX - e3.left, a2.y = t3.clientY - e3.top;
    } else a2.x = t3.clientX, a2.y = t3.clientY;
    p(a2.x, a2.y, d2[Math.floor(Math.random() * h2.length)]);
  }
  function p(t3, e3, n3) {
    r2.push(new w(t3, e3, n3));
  }
  function y() {
    !function() {
      if (0 != r2.length) {
        n2.clearRect(0, 0, c2, l2);
        for (let t3 = 0; t3 < r2.length; t3++) r2[t3].update(n2);
        for (let t3 = r2.length - 1; t3 >= 0; t3--) r2[t3].lifeSpan < 0 && r2.splice(t3, 1);
        0 == r2.length && n2.clearRect(0, 0, c2, l2);
      }
    }(), i2 = requestAnimationFrame(y);
  }
  function v() {
    e2.remove(), cancelAnimationFrame(i2), s2.removeEventListener("mousemove", f), s2.removeEventListener("touchmove", g), s2.removeEventListener("touchstart", g), window.addEventListener("resize", m);
  }
  function w(t3, e3, n3) {
    const i3 = Math.floor(60 * Math.random() + 80);
    this.initialLifeSpan = i3, this.lifeSpan = i3, this.velocity = { x: (Math.random() < 0.5 ? -1 : 1) * (Math.random() / 2), y: 1 + Math.random() }, this.position = { x: t3, y: e3 }, this.canv = n3, this.update = function(t4) {
      this.position.x += this.velocity.x, this.position.y += this.velocity.y, this.lifeSpan--, this.velocity.x += 2 * (Math.random() < 0.5 ? -1 : 1) / 75, this.velocity.y -= Math.random() / 300;
      const e4 = Math.max(this.lifeSpan / this.initialLifeSpan, 0), n4 = 0.0174533 * (2 * this.lifeSpan);
      t4.translate(this.position.x, this.position.y), t4.rotate(n4), t4.drawImage(this.canv, -this.canv.width / 2 * e4, -this.canv.height / 2, this.canv.width * e4, this.canv.height * e4), t4.rotate(-n4), t4.translate(-this.position.x, -this.position.y);
    };
  }
  return u.onchange = () => {
    u.matches ? v() : A();
  }, A(), { destroy: v };
}
function i(t2) {
  let e2 = t2 && t2.element, n2 = e2 || document.body, i2 = (t2 == null ? void 0 : t2.characters) || ["h", "e", "l", "l", "o"];
  const o2 = (t2 == null ? void 0 : t2.colors) || ["#6622CC", "#A755C2", "#B07C9E", "#B59194", "#D2A1B8"];
  let s2, h2, c2, l2 = (t2 == null ? void 0 : t2.cursorOffset) || { x: 0, y: 0 }, a2 = window.innerWidth, r2 = window.innerHeight, d2 = { x: a2 / 2, y: a2 / 2 }, u = [], A = (t2 == null ? void 0 : t2.font) || "15px serif", m = (t2 == null ? void 0 : t2.characterLifeSpanFunction) || function() {
    return Math.floor(60 * Math.random() + 80);
  }, g = (t2 == null ? void 0 : t2.initialCharacterVelocityFunction) || function() {
    return { x: (Math.random() < 0.5 ? -1 : 1) * Math.random() * 5, y: (Math.random() < 0.5 ? -1 : 1) * Math.random() * 5 };
  }, f = (t2 == null ? void 0 : t2.characterVelocityChangeFunctions) || { x_func: function(t3, e3) {
    return (Math.random() < 0.5 ? -1 : 1) / 30;
  }, y_func: function(t3, e3) {
    return (Math.random() < 0.5 ? -1 : 1) / 15;
  } }, p = (t2 == null ? void 0 : t2.characterScalingFunction) || function(t3, e3) {
    let n3 = e3 - t3;
    return Math.max(n3 / e3 * 2, 0);
  }, y = (t2 == null ? void 0 : t2.characterNewRotationDegreesFunction) || function(t3, e3) {
    return (e3 - t3) / 5;
  }, v = [];
  const w = window.matchMedia("(prefers-reduced-motion: reduce)");
  function x() {
    if (w.matches) return console.log("This browser has prefers reduced motion turned on, so the cursor did not init"), false;
    s2 = document.createElement("canvas"), h2 = s2.getContext("2d"), s2.style.top = "0px", s2.style.left = "0px", s2.style.pointerEvents = "none", e2 ? (s2.style.position = "absolute", n2.appendChild(s2), s2.width = n2.clientWidth, s2.height = n2.clientHeight) : (s2.style.position = "fixed", document.body.appendChild(s2), s2.width = a2, s2.height = r2), h2.font = A, h2.textBaseline = "middle", h2.textAlign = "center", i2.forEach((t3) => {
      let e3 = h2.measureText(t3), n3 = document.createElement("canvas"), i3 = n3.getContext("2d");
      n3.width = e3.width, n3.height = 2.5 * e3.actualBoundingBoxAscent, i3.textAlign = "center", i3.font = A, i3.textBaseline = "middle";
      var s3 = o2[Math.floor(Math.random() * o2.length)];
      i3.fillStyle = s3, i3.fillText(t3, n3.width / 2, e3.actualBoundingBoxAscent), v.push(n3);
    }), n2.addEventListener("mousemove", L), n2.addEventListener("touchmove", M, { passive: true }), n2.addEventListener("touchstart", M, { passive: true }), window.addEventListener("resize", E), B();
  }
  function E(t3) {
    a2 = window.innerWidth, r2 = window.innerHeight, e2 ? (s2.width = n2.clientWidth, s2.height = n2.clientHeight) : (s2.width = a2, s2.height = r2);
  }
  function M(t3) {
    if (t3.touches.length > 0) for (let e3 = 0; e3 < t3.touches.length; e3++) C(t3.touches[e3].clientX, t3.touches[e3].clientY, v[Math.floor(Math.random() * v.length)]);
  }
  function L(t3) {
    if (e2) {
      const e3 = n2.getBoundingClientRect();
      d2.x = t3.clientX - e3.left, d2.y = t3.clientY - e3.top;
    } else d2.x = t3.clientX, d2.y = t3.clientY;
    C(d2.x, d2.y, v[Math.floor(Math.random() * i2.length)]);
  }
  function C(t3, e3, n3) {
    u.push(new R(t3, e3, n3));
  }
  function B() {
    !function() {
      if (0 != u.length) {
        h2.clearRect(0, 0, a2, r2);
        for (let t3 = 0; t3 < u.length; t3++) u[t3].update(h2);
        for (let t3 = u.length - 1; t3 >= 0; t3--) u[t3].lifeSpan < 0 && u.splice(t3, 1);
        0 == u.length && h2.clearRect(0, 0, a2, r2);
      }
    }(), c2 = requestAnimationFrame(B);
  }
  function S() {
    s2.remove(), cancelAnimationFrame(c2), n2.removeEventListener("mousemove", L), n2.removeEventListener("touchmove", M), n2.removeEventListener("touchstart", M), window.addEventListener("resize", E);
  }
  function R(t3, e3, n3) {
    const i3 = m();
    this.rotationSign = Math.random() < 0.5 ? -1 : 1, this.age = 0, this.initialLifeSpan = i3, this.lifeSpan = i3, this.velocity = g(), this.position = { x: t3 + l2.x, y: e3 + l2.y }, this.canv = n3, this.update = function(t4) {
      this.position.x += this.velocity.x, this.position.y += this.velocity.y, this.lifeSpan--, this.age++, this.velocity.x += f.x_func(this.age, this.initialLifeSpan), this.velocity.y += f.y_func(this.age, this.initialLifeSpan);
      const e4 = p(this.age, this.initialLifeSpan), n4 = 0.0174533 * (this.rotationSign * y(this.age, this.initialLifeSpan));
      t4.translate(this.position.x, this.position.y), t4.rotate(n4), t4.drawImage(this.canv, -this.canv.width / 2 * e4, -this.canv.height / 2, this.canv.width * e4, this.canv.height * e4), t4.rotate(-n4), t4.translate(-this.position.x, -this.position.y);
    };
  }
  return w.onchange = () => {
    w.matches ? S() : x();
  }, x(), { destroy: S };
}
function o(t2) {
  let e2, n2, i2, o2 = t2 && t2.element, s2 = o2 || document.body, h2 = window.innerWidth, c2 = window.innerHeight, l2 = { x: h2 / 2, y: h2 / 2 }, a2 = [];
  const r2 = (t2 == null ? void 0 : t2.particles) || 15, d2 = (t2 == null ? void 0 : t2.rate) || 0.4, u = (t2 == null ? void 0 : t2.baseImageSrc) || "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAATCAYAAACk9eypAAAAAXNSR0IArs4c6QAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAhGVYSWZNTQAqAAAACAAFARIAAwAAAAEAAQAAARoABQAAAAEAAABKARsABQAAAAEAAABSASgAAwAAAAEAAgAAh2kABAAAAAEAAABaAAAAAAAAAEgAAAABAAAASAAAAAEAA6ABAAMAAAABAAEAAKACAAQAAAABAAAADKADAAQAAAABAAAAEwAAAAAChpcNAAAACXBIWXMAAAsTAAALEwEAmpwYAAABWWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS40LjAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyI+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgpMwidZAAABqElEQVQoFY3SPUvDQBgH8BREpRHExYiDgmLFl6WC+AYmWeyLg4i7buJX8DMpOujgyxGvUYeCgzhUQUSKKLUS0+ZyptXh8Z5Ti621ekPyJHl+uftfomhaf9Ei5JyxXKfynyEA6EYcLHpwyflT958GAQ7DTABNHd8EbtDbEH2BD5QEQmi2mM8P/Iq+A0SzszEg+3sPjDnDdVEtQKQbMUidHD3xVzf6A9UDEmEm+8h9KTqTVUjT+vB53aHrCbAPiceYq1dQI1Aqv4EhMll0jzv+Y0yiRgCnLRSYyDQHVoqUXe4uKL9l+L7GXC4vkMhE6eW/AOJs9k583ORDUyXMZ8F5SVHVVnllmPNKSFagAJ5DofaqGXw/gHBYg51dIldkmknY3tguv3jOtHR4+MqAzaraJXbEhqHhcQlwGSOi5pytVQHZLN5s0WNe8HPrLYlFsO20RPHkImxsbmHdLJFI76th7Z4SeuF53hTeFLvhRCJRCTKZKxgdnRDbW+iozFJbBMw14/ElwGYc0egMBMFzT21f5Rog33Z7dX02GBm7WV5ZfT5Nn5bE3zuCDe9UxdTpNvK+5AAAAABJRU5ErkJggg==";
  let A = false, m = new Image();
  m.src = u;
  const g = window.matchMedia("(prefers-reduced-motion: reduce)");
  function f() {
    if (g.matches) return console.log("This browser has prefers reduced motion turned on, so the cursor did not init"), false;
    e2 = document.createElement("canvas"), n2 = e2.getContext("2d"), e2.style.top = "0px", e2.style.left = "0px", e2.style.pointerEvents = "none", o2 ? (e2.style.position = "absolute", s2.appendChild(e2), e2.width = s2.clientWidth, e2.height = s2.clientHeight) : (e2.style.position = "fixed", document.body.appendChild(e2), e2.width = h2, e2.height = c2), s2.addEventListener("mousemove", y), window.addEventListener("resize", p), v();
  }
  function p(t3) {
    h2 = window.innerWidth, c2 = window.innerHeight, o2 ? (e2.width = s2.clientWidth, e2.height = s2.clientHeight) : (e2.width = h2, e2.height = c2);
  }
  function y(t3) {
    if (o2) {
      const e4 = s2.getBoundingClientRect();
      l2.x = t3.clientX - e4.left, l2.y = t3.clientY - e4.top;
    } else l2.x = t3.clientX, l2.y = t3.clientY;
    if (false === A) {
      A = true;
      for (let t4 = 0; t4 < r2; t4++) e3 = l2.x, n3 = l2.y, i3 = m, a2.push(new x(e3, n3, i3));
    }
    var e3, n3, i3;
  }
  function v() {
    !function() {
      n2.clearRect(0, 0, h2, c2);
      let t3 = l2.x, e3 = l2.y;
      a2.forEach(function(i3, o3, s3) {
        let h3 = s3[o3 + 1] || s3[0];
        i3.position.x = t3, i3.position.y = e3, i3.move(n2), t3 += (h3.position.x - i3.position.x) * d2, e3 += (h3.position.y - i3.position.y) * d2;
      });
    }(), i2 = requestAnimationFrame(v);
  }
  function w() {
    e2.remove(), cancelAnimationFrame(i2), s2.removeEventListener("mousemove", y), window.addEventListener("resize", p);
  }
  function x(t3, e3, n3) {
    this.position = { x: t3, y: e3 }, this.image = n3, this.move = function(t4) {
      t4.drawImage(this.image, this.position.x, this.position.y);
    };
  }
  return g.onchange = () => {
    g.matches ? w() : f();
  }, f(), { destroy: w };
}
function s(t2) {
  let e2, n2, i2 = t2 && t2.element, o2 = i2 || document.body, s2 = window.innerWidth, h2 = window.innerHeight, c2 = { x: s2 / 2, y: s2 / 2 }, l2 = new function(t3, e3, n3, i3) {
    this.position = { x: t3, y: e3 }, this.width = n3, this.lag = i3, this.moveTowards = function(t4, e4, n4) {
      this.position.x += (t4 - this.position.x) / this.lag, this.position.y += (e4 - this.position.y) / this.lag, n4.fillStyle = a2, n4.beginPath(), n4.arc(this.position.x, this.position.y, this.width, 0, 2 * Math.PI), n4.fill(), n4.closePath();
    };
  }(s2 / 2, h2 / 2, 10, 10), a2 = (t2 == null ? void 0 : t2.color) || "#323232a6";
  const r2 = window.matchMedia("(prefers-reduced-motion: reduce)");
  function d2() {
    if (r2.matches) return console.log("This browser has prefers reduced motion turned on, so the cursor did not init"), false;
    e2 = document.createElement("canvas"), n2 = e2.getContext("2d"), e2.style.top = "0px", e2.style.left = "0px", e2.style.pointerEvents = "none", i2 ? (e2.style.position = "absolute", o2.appendChild(e2), e2.width = o2.clientWidth, e2.height = o2.clientHeight) : (e2.style.position = "fixed", document.body.appendChild(e2), e2.width = s2, e2.height = h2), o2.addEventListener("mousemove", A), window.addEventListener("resize", u), m();
  }
  function u(t3) {
    s2 = window.innerWidth, h2 = window.innerHeight, i2 ? (e2.width = o2.clientWidth, e2.height = o2.clientHeight) : (e2.width = s2, e2.height = h2);
  }
  function A(t3) {
    if (i2) {
      const e3 = o2.getBoundingClientRect();
      c2.x = t3.clientX - e3.left, c2.y = t3.clientY - e3.top;
    } else c2.x = t3.clientX, c2.y = t3.clientY;
  }
  function m() {
    n2.clearRect(0, 0, s2, h2), l2.moveTowards(c2.x, c2.y, n2), requestAnimationFrame(m);
  }
  function g() {
    e2.remove(), cancelAnimationFrame(m), o2.removeEventListener("mousemove", A), window.addEventListener("resize", u);
  }
  return r2.onchange = () => {
    r2.matches ? g() : d2();
  }, d2(), { destroy: g };
}
function h(t2) {
  let e2, n2, i2, o2 = t2 && t2.element, s2 = o2 || document.body, h2 = window.innerWidth, c2 = window.innerHeight, l2 = { x: h2 / 2, y: h2 / 2 }, a2 = [], r2 = [];
  const d2 = window.matchMedia("(prefers-reduced-motion: reduce)");
  function u() {
    if (d2.matches) return console.log("This browser has prefers reduced motion turned on, so the cursor did not init"), false;
    e2 = document.createElement("canvas"), n2 = e2.getContext("2d"), e2.style.top = "0px", e2.style.left = "0px", e2.style.pointerEvents = "none", o2 ? (e2.style.position = "absolute", s2.appendChild(e2), e2.width = s2.clientWidth, e2.height = s2.clientHeight) : (e2.style.position = "fixed", document.body.appendChild(e2), e2.width = h2, e2.height = c2), s2.addEventListener("mousemove", g), s2.addEventListener("touchmove", m, { passive: true }), s2.addEventListener("touchstart", m, { passive: true }), window.addEventListener("resize", A), p();
  }
  function A(t3) {
    h2 = window.innerWidth, c2 = window.innerHeight, o2 ? (e2.width = s2.clientWidth, e2.height = s2.clientHeight) : (e2.width = h2, e2.height = c2);
  }
  function m(t3) {
    if (t3.touches.length > 0) for (let e3 = 0; e3 < t3.touches.length; e3++) f(t3.touches[e3].clientX, t3.touches[e3].clientY, r2[Math.floor(Math.random() * r2.length)]);
  }
  function g(t3) {
    if (o2) {
      const e3 = s2.getBoundingClientRect();
      l2.x = t3.clientX - e3.left, l2.y = t3.clientY - e3.top;
    } else l2.x = t3.clientX, l2.y = t3.clientY;
    f(l2.x, l2.y);
  }
  function f(t3, e3, n3) {
    a2.push(new v(t3, e3, n3));
  }
  function p() {
    !function() {
      if (0 != a2.length) {
        n2.clearRect(0, 0, h2, c2);
        for (let t3 = 0; t3 < a2.length; t3++) a2[t3].update(n2);
        for (let t3 = a2.length - 1; t3 >= 0; t3--) a2[t3].lifeSpan < 0 && a2.splice(t3, 1);
        0 == a2.length && n2.clearRect(0, 0, h2, c2);
      }
    }(), i2 = requestAnimationFrame(p);
  }
  function y() {
    e2.remove(), cancelAnimationFrame(i2), s2.removeEventListener("mousemove", g), s2.removeEventListener("touchmove", m), s2.removeEventListener("touchstart", m), window.addEventListener("resize", A);
  }
  function v(t3, e3, n3) {
    const i3 = Math.floor(60 * Math.random() + 60);
    this.initialLifeSpan = i3, this.lifeSpan = i3, this.velocity = { x: (Math.random() < 0.5 ? -1 : 1) * (Math.random() / 10), y: -1 * Math.random() - 0.4 }, this.position = { x: t3, y: e3 }, this.canv = n3, this.baseDimension = 4, this.update = function(t4) {
      this.position.x += this.velocity.x, this.position.y += this.velocity.y, this.velocity.x += 2 * (Math.random() < 0.5 ? -1 : 1) / 75, this.velocity.y -= Math.random() / 600, this.lifeSpan--;
      const e4 = 0.2 + (this.initialLifeSpan - this.lifeSpan) / this.initialLifeSpan;
      t4.fillStyle = "#e6f1f7", t4.strokeStyle = "#3a92c5", t4.beginPath(), t4.arc(this.position.x - this.baseDimension / 2 * e4, this.position.y - this.baseDimension / 2, this.baseDimension * e4, 0, 2 * Math.PI), t4.stroke(), t4.fill(), t4.closePath();
    };
  }
  return d2.onchange = () => {
    d2.matches ? y() : u();
  }, u(), { destroy: y };
}
function c(t2) {
  const e2 = t2 && t2.emoji || ["😀", "😂", "😆", "😊"];
  let n2 = t2 && t2.element, i2 = n2 || document.body, o2 = window.innerWidth, s2 = window.innerHeight;
  const h2 = { x: o2 / 2, y: o2 / 2 }, c2 = { x: o2 / 2, y: o2 / 2 };
  let l2 = 0;
  const a2 = [], r2 = [];
  let d2, u, A;
  const m = window.matchMedia("(prefers-reduced-motion: reduce)");
  function g() {
    if (m.matches) return console.log("This browser has prefers reduced motion turned on, so the cursor did not init"), false;
    d2 = document.createElement("canvas"), u = d2.getContext("2d"), d2.style.top = "0px", d2.style.left = "0px", d2.style.pointerEvents = "none", n2 ? (d2.style.position = "absolute", i2.appendChild(d2), d2.width = i2.clientWidth, d2.height = i2.clientHeight) : (d2.style.position = "fixed", document.body.appendChild(d2), d2.width = o2, d2.height = s2), u.font = "21px serif", u.textBaseline = "middle", u.textAlign = "center", e2.forEach((t3) => {
      let e3 = u.measureText(t3), n3 = document.createElement("canvas"), i3 = n3.getContext("2d");
      n3.width = e3.width, n3.height = 2 * e3.actualBoundingBoxAscent, i3.textAlign = "center", i3.font = "21px serif", i3.textBaseline = "middle", i3.fillText(t3, n3.width / 2, e3.actualBoundingBoxAscent), r2.push(n3);
    }), i2.addEventListener("mousemove", y, { passive: true }), i2.addEventListener("touchmove", p, { passive: true }), i2.addEventListener("touchstart", p, { passive: true }), window.addEventListener("resize", f), w();
  }
  function f(t3) {
    o2 = window.innerWidth, s2 = window.innerHeight, n2 ? (d2.width = i2.clientWidth, d2.height = i2.clientHeight) : (d2.width = o2, d2.height = s2);
  }
  function p(t3) {
    if (t3.touches.length > 0) for (let e3 = 0; e3 < t3.touches.length; e3++) v(t3.touches[e3].clientX, t3.touches[e3].clientY, r2[Math.floor(Math.random() * r2.length)]);
  }
  function y(t3) {
    t3.timeStamp - l2 < 16 || window.requestAnimationFrame(() => {
      if (n2) {
        const e3 = i2.getBoundingClientRect();
        h2.x = t3.clientX - e3.left, h2.y = t3.clientY - e3.top;
      } else h2.x = t3.clientX, h2.y = t3.clientY;
      Math.hypot(h2.x - c2.x, h2.y - c2.y) > 1 && (v(h2.x, h2.y, r2[Math.floor(Math.random() * e2.length)]), c2.x = h2.x, c2.y = h2.y, l2 = t3.timeStamp);
    });
  }
  function v(t3, e3, n3) {
    a2.push(new E(t3, e3, n3));
  }
  function w() {
    !function() {
      if (0 != a2.length) {
        u.clearRect(0, 0, o2, s2);
        for (let t3 = 0; t3 < a2.length; t3++) a2[t3].update(u);
        for (let t3 = a2.length - 1; t3 >= 0; t3--) a2[t3].lifeSpan < 0 && a2.splice(t3, 1);
        0 == a2.length && u.clearRect(0, 0, o2, s2);
      }
    }(), A = requestAnimationFrame(w);
  }
  function x() {
    d2.remove(), cancelAnimationFrame(A), i2.removeEventListener("mousemove", y), i2.removeEventListener("touchmove", p), i2.removeEventListener("touchstart", p), window.addEventListener("resize", f);
  }
  function E(t3, e3, n3) {
    const i3 = Math.floor(60 * Math.random() + 80);
    this.initialLifeSpan = i3, this.lifeSpan = i3, this.velocity = { x: (Math.random() < 0.5 ? -1 : 1) * (Math.random() / 2), y: 0.4 * Math.random() + 0.8 }, this.position = { x: t3, y: e3 }, this.canv = n3, this.update = function(t4) {
      this.position.x += this.velocity.x, this.position.y += this.velocity.y, this.lifeSpan--, this.velocity.y += 0.05;
      const e4 = Math.max(this.lifeSpan / this.initialLifeSpan, 0);
      t4.drawImage(this.canv, this.position.x - this.canv.width / 2 * e4, this.position.y - this.canv.height / 2, this.canv.width * e4, this.canv.height * e4);
    };
  }
  return m.onchange = () => {
    m.matches ? x() : g();
  }, g(), { destroy: x };
}
function l(t2) {
  let e2 = t2 && t2.element, n2 = e2 || document.body, i2 = t2 && t2.randomDelay, o2 = t2 && t2.minDelay || 5, s2 = t2 && t2.maxDelay || 50;
  const h2 = t2 && t2.lifeSpan || 40;
  let c2, l2, a2, r2 = window.innerWidth, d2 = window.innerHeight, u = { x: r2 / 2, y: r2 / 2 }, A = [], m = new Image();
  t2 && t2.image ? m.src = t2.image : m.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAATCAYAAACk9eypAAAAAXNSR0IArs4c6QAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAhGVYSWZNTQAqAAAACAAFARIAAwAAAAEAAQAAARoABQAAAAEAAABKARsABQAAAAEAAABSASgAAwAAAAEAAgAAh2kABAAAAAEAAABaAAAAAAAAAEgAAAABAAAASAAAAAEAA6ABAAMAAAABAAEAAKACAAQAAAABAAAADKADAAQAAAABAAAAEwAAAAAChpcNAAAACXBIWXMAAAsTAAALEwEAmpwYAAABWWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS40LjAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyI+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgpMwidZAAABqElEQVQoFY3SPUvDQBgH8BREpRHExYiDgmLFl6WC+AYmWeyLg4i7buJX8DMpOujgyxGvUYeCgzhUQUSKKLUS0+ZyptXh8Z5Ti621ekPyJHl+uftfomhaf9Ei5JyxXKfynyEA6EYcLHpwyflT958GAQ7DTABNHd8EbtDbEH2BD5QEQmi2mM8P/Iq+A0SzszEg+3sPjDnDdVEtQKQbMUidHD3xVzf6A9UDEmEm+8h9KTqTVUjT+vB53aHrCbAPiceYq1dQI1Aqv4EhMll0jzv+Y0yiRgCnLRSYyDQHVoqUXe4uKL9l+L7GXC4vkMhE6eW/AOJs9k583ORDUyXMZ8F5SVHVVnllmPNKSFagAJ5DofaqGXw/gHBYg51dIldkmknY3tguv3jOtHR4+MqAzaraJXbEhqHhcQlwGSOi5pytVQHZLN5s0WNe8HPrLYlFsO20RPHkImxsbmHdLJFI76th7Z4SeuF53hTeFLvhRCJRCTKZKxgdnRDbW+iozFJbBMw14/ElwGYc0egMBMFzT21f5Rog33Z7dX02GBm7WV5ZfT5Nn5bE3zuCDe9UxdTpNvK+5AAAAABJRU5ErkJggg==";
  const g = window.matchMedia("(prefers-reduced-motion: reduce)");
  function f() {
    if (g.matches) return console.log("This browser has prefers reduced motion turned on, so the cursor did not init"), false;
    c2 = document.createElement("canvas"), l2 = c2.getContext("2d"), c2.style.top = "0px", c2.style.left = "0px", c2.style.pointerEvents = "none", e2 ? (c2.style.position = "absolute", n2.appendChild(c2), c2.width = n2.clientWidth, c2.height = n2.clientHeight) : (c2.style.position = "fixed", document.body.appendChild(c2), c2.width = r2, c2.height = d2), n2.addEventListener("mousemove", E), n2.addEventListener("touchmove", y, { passive: true }), n2.addEventListener("touchstart", y, { passive: true }), window.addEventListener("resize", p), L();
  }
  function p(t3) {
    r2 = window.innerWidth, d2 = window.innerHeight, e2 ? (c2.width = n2.clientWidth, c2.height = n2.clientHeight) : (c2.width = r2, c2.height = d2);
  }
  function y(t3) {
    if (t3.touches.length > 0) for (let e3 = 0; e3 < t3.touches.length; e3++) M(t3.touches[e3].clientX, t3.touches[e3].clientY, m);
  }
  g.onchange = () => {
    g.matches ? C() : f();
  };
  let v = () => Math.floor(Math.random() * (s2 - o2 + 1)) + o2, w = Date.now(), x = v();
  function E(t3) {
    if (i2) {
      if (w + x > Date.now()) return;
      w = Date.now(), x = v();
    }
    if (e2) {
      const e3 = n2.getBoundingClientRect();
      u.x = t3.clientX - e3.left, u.y = t3.clientY - e3.top;
    } else u.x = t3.clientX, u.y = t3.clientY;
    M(u.x, u.y, m);
  }
  function M(t3, e3, n3) {
    A.push(new B(t3, e3, n3));
  }
  function L() {
    !function() {
      if (0 != A.length) {
        l2.clearRect(0, 0, r2, d2);
        for (let t3 = 0; t3 < A.length; t3++) A[t3].update(l2);
        for (let t3 = A.length - 1; t3 >= 0; t3--) A[t3].lifeSpan < 0 && A.splice(t3, 1);
        0 == A.length && l2.clearRect(0, 0, r2, d2);
      }
    }(), a2 = requestAnimationFrame(L);
  }
  function C() {
    c2.remove(), cancelAnimationFrame(a2), n2.removeEventListener("mousemove", E), n2.removeEventListener("touchmove", y), n2.removeEventListener("touchstart", y), window.addEventListener("resize", p);
  }
  function B(t3, e3, n3) {
    this.initialLifeSpan = h2, this.lifeSpan = h2, this.position = { x: t3, y: e3 }, this.image = n3, this.update = function(t4) {
      this.lifeSpan--;
      const e4 = Math.max(this.lifeSpan / this.initialLifeSpan, 0);
      t4.globalAlpha = e4, t4.drawImage(this.image, this.position.x, this.position.y);
    };
  }
  return f(), { destroy: C };
}
function a(t2) {
  let e2, n2, i2, o2 = t2 && t2.element, s2 = o2 || document.body, h2 = window.innerWidth, c2 = window.innerHeight, l2 = { x: h2 / 2, y: h2 / 2 }, a2 = [];
  const r2 = (t2 == null ? void 0 : t2.length) || 20, d2 = (t2 == null ? void 0 : t2.colors) || ["#FE0000", "#FD8C00", "#FFE500", "#119F0B", "#0644B3", "#C22EDC"], u = (t2 == null ? void 0 : t2.size) || 3;
  let A = false;
  const m = window.matchMedia("(prefers-reduced-motion: reduce)");
  function g() {
    if (m.matches) return console.log("This browser has prefers reduced motion turned on, so the cursor did not init"), false;
    e2 = document.createElement("canvas"), n2 = e2.getContext("2d"), e2.style.top = "0px", e2.style.left = "0px", e2.style.pointerEvents = "none", o2 ? (e2.style.position = "absolute", s2.appendChild(e2), e2.width = s2.clientWidth, e2.height = s2.clientHeight) : (e2.style.position = "fixed", document.body.appendChild(e2), e2.width = h2, e2.height = c2), s2.addEventListener("mousemove", p), window.addEventListener("resize", f), y();
  }
  function f(t3) {
    h2 = window.innerWidth, c2 = window.innerHeight, o2 ? (e2.width = s2.clientWidth, e2.height = s2.clientHeight) : (e2.width = h2, e2.height = c2);
  }
  function p(t3) {
    if (o2) {
      const e4 = s2.getBoundingClientRect();
      l2.x = t3.clientX - e4.left, l2.y = t3.clientY - e4.top;
    } else l2.x = t3.clientX, l2.y = t3.clientY;
    if (false === A) {
      A = true;
      for (let t4 = 0; t4 < r2; t4++) e3 = l2.x, n3 = l2.y, void 0, a2.push(new w(e3, n3));
    }
    var e3, n3;
  }
  function y() {
    !function() {
      n2.clearRect(0, 0, h2, c2), n2.lineJoin = "round";
      let t3 = [], e3 = l2.x, i3 = l2.y;
      a2.forEach(function(n3, o3, s3) {
        let h3 = s3[o3 + 1] || s3[0];
        n3.position.x = e3, n3.position.y = i3, t3.push({ x: e3, y: i3 }), e3 += 0.4 * (h3.position.x - n3.position.x), i3 += 0.4 * (h3.position.y - n3.position.y);
      }), d2.forEach((e4, i4) => {
        n2.beginPath(), n2.strokeStyle = e4, t3.length && n2.moveTo(t3[0].x, t3[0].y + i4 * (u - 1)), t3.forEach((t4, e5) => {
          0 !== e5 && n2.lineTo(t4.x, t4.y + i4 * u);
        }), n2.lineWidth = u, n2.lineCap = "round", n2.stroke();
      });
    }(), i2 = requestAnimationFrame(y);
  }
  function v() {
    e2.remove(), cancelAnimationFrame(i2), s2.removeEventListener("mousemove", p), window.addEventListener("resize", f);
  }
  function w(t3, e3) {
    this.position = { x: t3, y: e3 };
  }
  return m.onchange = () => {
    m.matches ? v() : g();
  }, g(), { destroy: v };
}
function r(t2) {
  let e2, n2, i2, o2 = t2 && t2.element, s2 = o2 || document.body, h2 = window.innerWidth, c2 = window.innerHeight, l2 = { x: h2 / 2, y: h2 / 2 };
  const a2 = t2 && t2.dateColor || "blue", r2 = t2 && t2.faceColor || "black", d2 = t2 && t2.secondsColor || "red", u = t2 && t2.minutesColor || "black", A = t2 && t2.hoursColor || "black", m = 0.4, g = t2 && t2.theDays || ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"], f = t2 && t2.theMonths || ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
  let p = /* @__PURE__ */ new Date(), y = p.getDate(), v = p.getYear() + 1900;
  const w = (" " + g[p.getDay()] + " " + y + " " + f[p.getMonth()] + " " + v).split(""), x = ["3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "1", "2"], E = x.length, M = ["•", "•", "•"], L = ["•", "•", "•", "•"], C = ["•", "•", "•", "•", "•"], B = 360 / E, S = 360 / w.length, R = 45 / 6.5, b = [], Y = [], W = [], H = [], I = [], X = [], D = [], T = [], F = [];
  var z = parseInt(w.length + E + M.length + L.length + C.length) + 1;
  const P = window.matchMedia("(prefers-reduced-motion: reduce)");
  function J() {
    if (P.matches) return console.log("This browser has prefers reduced motion turned on, so the cursor did not init"), false;
    e2 = document.createElement("canvas"), n2 = e2.getContext("2d"), e2.style.top = "0px", e2.style.left = "0px", e2.style.pointerEvents = "none", o2 ? (e2.style.position = "absolute", s2.appendChild(e2), e2.width = s2.clientWidth, e2.height = s2.clientHeight) : (e2.style.position = "fixed", document.body.appendChild(e2), e2.width = h2, e2.height = c2), n2.font = "10px sans-serif", n2.textAlign = "center", n2.textBaseline = "middle";
    for (let t3 = 0; t3 < z; t3++) b[t3] = 0, Y[t3] = 0, W[t3] = 0, H[t3] = 0;
    for (let t3 = 0; t3 < w.length; t3++) F[t3] = { color: a2, value: w[t3] };
    for (let t3 = 0; t3 < x.length; t3++) T[t3] = { color: r2, value: x[t3] };
    for (let t3 = 0; t3 < M.length; t3++) D[t3] = { color: A, value: M[t3] };
    for (let t3 = 0; t3 < L.length; t3++) X[t3] = { color: u, value: L[t3] };
    for (let t3 = 0; t3 < C.length; t3++) I[t3] = { color: d2, value: C[t3] };
    s2.addEventListener("mousemove", Z), s2.addEventListener("touchmove", Q, { passive: true }), s2.addEventListener("touchstart", Q, { passive: true }), window.addEventListener("resize", U), k();
  }
  function U(t3) {
    h2 = window.innerWidth, c2 = window.innerHeight, o2 ? (e2.width = s2.clientWidth, e2.height = s2.clientHeight) : (e2.width = h2, e2.height = c2);
  }
  function Q(t3) {
    if (t3.touches.length > 0) if (o2) {
      const e3 = s2.getBoundingClientRect();
      l2.x = t3.touches[0].clientX - e3.left, l2.y = t3.touches[0].clientY - e3.top;
    } else l2.x = t3.touches[0].clientX, l2.y = t3.touches[0].clientY;
  }
  function Z(t3) {
    if (o2) {
      const e3 = s2.getBoundingClientRect();
      l2.x = t3.clientX - e3.left, l2.y = t3.clientY - e3.top;
    } else l2.x = t3.clientX, l2.y = t3.clientY;
  }
  function k() {
    !function() {
      W[0] = Math.round(b[0] += (l2.y - b[0]) * m), H[0] = Math.round(Y[0] += (l2.x - Y[0]) * m);
      for (let t3 = 1; t3 < z; t3++) W[t3] = Math.round(b[t3] += (W[t3 - 1] - b[t3]) * m), H[t3] = Math.round(Y[t3] += (H[t3 - 1] - Y[t3]) * m), b[t3 - 1] >= c2 - 80 && (b[t3 - 1] = c2 - 80), Y[t3 - 1] >= h2 - 80 && (Y[t3 - 1] = h2 - 80);
    }(), function() {
      n2.clearRect(0, 0, h2, c2);
      const t3 = /* @__PURE__ */ new Date(), e3 = t3.getSeconds(), i3 = Math.PI * (e3 - 15) / 30, o3 = t3.getMinutes(), s3 = Math.PI * (o3 - 15) / 30, l3 = t3.getHours(), a3 = Math.PI * (l3 - 3) / 6 + Math.PI * parseInt(t3.getMinutes()) / 360;
      for (let t4 = 0; t4 < F.length; t4++) F[t4].y = b[t4] + 67.5 * Math.sin(-i3 + t4 * S * Math.PI / 180), F[t4].x = Y[t4] + 67.5 * Math.cos(-i3 + t4 * S * Math.PI / 180), n2.fillStyle = F[t4].color, n2.fillText(F[t4].value, F[t4].x, F[t4].y);
      for (let t4 = 0; t4 < T.length; t4++) T[t4].y = b[F.length + t4] + 45 * Math.sin(t4 * B * Math.PI / 180), T[t4].x = Y[F.length + t4] + 45 * Math.cos(t4 * B * Math.PI / 180), n2.fillStyle = T[t4].color, n2.fillText(T[t4].value, T[t4].x, T[t4].y);
      for (let t4 = 0; t4 < D.length; t4++) D[t4].y = b[F.length + E + t4] + 0 + t4 * R * Math.sin(a3), D[t4].x = Y[F.length + E + t4] + 0 + t4 * R * Math.cos(a3), n2.fillStyle = D[t4].color, n2.fillText(D[t4].value, D[t4].x, D[t4].y);
      for (let t4 = 0; t4 < X.length; t4++) X[t4].y = b[F.length + E + D.length + t4] + 0 + t4 * R * Math.sin(s3), X[t4].x = Y[F.length + E + D.length + t4] + 0 + t4 * R * Math.cos(s3), n2.fillStyle = X[t4].color, n2.fillText(X[t4].value, X[t4].x, X[t4].y);
      for (let t4 = 0; t4 < I.length; t4++) I[t4].y = b[F.length + E + D.length + X.length + t4] + 0 + t4 * R * Math.sin(i3), I[t4].x = Y[F.length + E + D.length + X.length + t4] + 0 + t4 * R * Math.cos(i3), n2.fillStyle = I[t4].color, n2.fillText(I[t4].value, I[t4].x, I[t4].y);
    }(), i2 = requestAnimationFrame(k);
  }
  function N() {
    e2.remove(), cancelAnimationFrame(i2), s2.removeEventListener("mousemove", Z), s2.removeEventListener("touchmove", Q), s2.removeEventListener("touchstart", Q), window.addEventListener("resize", U);
  }
  return P.onchange = () => {
    P.matches ? N() : J();
  }, J(), { destroy: N };
}
function d(t2) {
  let e2, n2, i2, o2 = t2 || {}, s2 = t2 && t2.element, h2 = s2 || document.body, c2 = o2.text ? " " + t2.text : " Your Text Here", l2 = (t2 == null ? void 0 : t2.color) || "#000000", a2 = o2.font || "monospace", r2 = o2.textSize || 12, d2 = r2 + "px " + a2, u = o2.gap || r2 + 2, A = 0, m = [], g = window.innerWidth, f = window.innerHeight, p = { x: g / 2, y: g / 2 };
  m = Array.from(c2).map((t3) => ({ letter: t3, x: g / 2, y: g / 2 })), t2 == null ? void 0 : t2.size;
  const y = window.matchMedia("(prefers-reduced-motion: reduce)");
  function v() {
    if (y.matches) return console.log("This browser has prefers reduced motion turned on, so the cursor did not init"), false;
    e2 = document.createElement("canvas"), n2 = e2.getContext("2d"), e2.style.top = "0px", e2.style.left = "0px", e2.style.pointerEvents = "none", s2 ? (e2.style.position = "absolute", h2.appendChild(e2), e2.width = h2.clientWidth, e2.height = h2.clientHeight) : (e2.style.position = "fixed", document.body.appendChild(e2), e2.width = g, e2.height = f), h2.addEventListener("mousemove", x), window.addEventListener("resize", w), E();
  }
  function w(t3) {
    g = window.innerWidth, f = window.innerHeight, s2 ? (e2.width = h2.clientWidth, e2.height = h2.clientHeight) : (e2.width = g, e2.height = f);
  }
  function x(t3) {
    if (s2) {
      const e3 = h2.getBoundingClientRect();
      p.x = t3.clientX - e3.left, p.y = t3.clientY - e3.top;
    } else p.x = t3.clientX, p.y = t3.clientY;
  }
  function E() {
    !function() {
      n2.clearRect(0, 0, g, f), A += 0.15;
      let t3 = 2 * Math.cos(A), e3 = 5 * Math.sin(A);
      for (let t4 = m.length - 1; t4 > 0; t4--) m[t4].x = m[t4 - 1].x + u, m[t4].y = m[t4 - 1].y, n2.fillStyle = l2, n2.font = d2, n2.fillText(m[t4].letter, m[t4].x, m[t4].y);
      let i3 = m[0].x, o3 = m[0].y;
      i3 += (p.x - i3) / 5 + t3 + 2, o3 += (p.y - o3) / 5 + e3, m[0].x = i3, m[0].y = o3;
    }(), i2 = requestAnimationFrame(E);
  }
  function M() {
    e2.remove(), cancelAnimationFrame(i2), h2.removeEventListener("mousemove", x), window.addEventListener("resize", w);
  }
  return y.onchange = () => {
    y.matches ? M() : v();
  }, v(), { destroy: M };
}
export {
  h as bubbleCursor,
  i as characterCursor,
  r as clockCursor,
  c as emojiCursor,
  e as fairyDustCursor,
  s as followingDotCursor,
  l as ghostCursor,
  a as rainbowCursor,
  n as snowflakeCursor,
  t as springyEmojiCursor,
  d as textFlag,
  o as trailingCursor
};
//# sourceMappingURL=cursor-effects.js.map
