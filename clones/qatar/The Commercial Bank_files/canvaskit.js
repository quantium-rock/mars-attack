var CanvasKitInit = (() => {
  var _scriptDir =
    typeof document !== "undefined" && document.currentScript
      ? document.currentScript.src
      : undefined;
  if (typeof __filename !== "undefined") _scriptDir = _scriptDir || __filename;
  return function (CanvasKitInit) {
    CanvasKitInit = CanvasKitInit || {};

    null;
    var w;
    w || (w = typeof CanvasKitInit !== "undefined" ? CanvasKitInit : {});
    var aa, ea;
    w.ready = new Promise(function (a, b) {
      aa = a;
      ea = b;
    });
    (function (a) {
      a.Vd = a.Vd || [];
      a.Vd.push(function () {
        a.MakeSWCanvasSurface = function (b) {
          var d = b;
          if ("CANVAS" !== d.tagName && ((d = document.getElementById(b)), !d))
            throw "Canvas with id " + b + " was not found";
          if ((b = a.MakeSurface(d.width, d.height))) b.Nd = d;
          return b;
        };
        a.MakeCanvasSurface || (a.MakeCanvasSurface = a.MakeSWCanvasSurface);
        a.MakeSurface = function (b, d) {
          var f = {
              width: b,
              height: d,
              colorType: a.ColorType.RGBA_8888,
              alphaType: a.AlphaType.Unpremul,
              colorSpace: a.ColorSpace.SRGB,
            },
            h = b * d * 4,
            m = a._malloc(h);
          if ((f = a.Surface._makeRasterDirect(f, m, 4 * b)))
            (f.Nd = null),
              (f.Ef = b),
              (f.Af = d),
              (f.Cf = h),
              (f.$e = m),
              f.getCanvas().clear(a.TRANSPARENT);
          return f;
        };
        a.MakeRasterDirectSurface = function (b, d, f) {
          return a.Surface._makeRasterDirect(b, d.byteOffset, f);
        };
        a.Surface.prototype.flush = function (b) {
          a.Od(this.Md);
          this._flush();
          if (this.Nd) {
            var d = new Uint8ClampedArray(a.HEAPU8.buffer, this.$e, this.Cf);
            d = new ImageData(d, this.Ef, this.Af);
            b
              ? this.Nd.getContext("2d").putImageData(
                  d,
                  0,
                  0,
                  b[0],
                  b[1],
                  b[2] - b[0],
                  b[3] - b[1]
                )
              : this.Nd.getContext("2d").putImageData(d, 0, 0);
          }
        };
        a.Surface.prototype.dispose = function () {
          this.$e && a._free(this.$e);
          this.delete();
        };
        a.Od = a.Od || function () {};
        a.df =
          a.df ||
          function () {
            return null;
          };
      });
    })(w);
    (function (a) {
      a.Vd = a.Vd || [];
      a.Vd.push(function () {
        function b(n, q, v) {
          return n && n.hasOwnProperty(q) ? n[q] : v;
        }
        function d(n) {
          var q = fa(ha);
          ha[q] = n;
          return q;
        }
        function f(n) {
          return (
            n.naturalHeight || n.videoHeight || n.displayHeight || n.height
          );
        }
        function h(n) {
          return n.naturalWidth || n.videoWidth || n.displayWidth || n.width;
        }
        function m(n, q, v, D) {
          n.bindTexture(n.TEXTURE_2D, q);
          D ||
            v.alphaType !== a.AlphaType.Premul ||
            n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !0);
          return q;
        }
        function u(n, q, v) {
          v ||
            q.alphaType !== a.AlphaType.Premul ||
            n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !1);
          n.bindTexture(n.TEXTURE_2D, null);
        }
        a.GetWebGLContext = function (n, q) {
          if (!n) throw "null canvas passed into makeWebGLContext";
          var v = {
            alpha: b(q, "alpha", 1),
            depth: b(q, "depth", 1),
            stencil: b(q, "stencil", 8),
            antialias: b(q, "antialias", 0),
            premultipliedAlpha: b(q, "premultipliedAlpha", 1),
            preserveDrawingBuffer: b(q, "preserveDrawingBuffer", 0),
            preferLowPowerToHighPerformance: b(
              q,
              "preferLowPowerToHighPerformance",
              0
            ),
            failIfMajorPerformanceCaveat: b(
              q,
              "failIfMajorPerformanceCaveat",
              0
            ),
            enableExtensionsByDefault: b(q, "enableExtensionsByDefault", 1),
            explicitSwapControl: b(q, "explicitSwapControl", 0),
            renderViaOffscreenBackBuffer: b(
              q,
              "renderViaOffscreenBackBuffer",
              0
            ),
          };
          v.majorVersion =
            q && q.majorVersion
              ? q.majorVersion
              : "undefined" !== typeof WebGL2RenderingContext
              ? 2
              : 1;
          if (v.explicitSwapControl)
            throw "explicitSwapControl is not supported";
          n = ka(n, v);
          if (!n) return 0;
          ma(n);
          x.ge.getExtension("WEBGL_debug_renderer_info");
          return n;
        };
        a.deleteContext = function (n) {
          x === na[n] && (x = null);
          "object" == typeof JSEvents && JSEvents.ug(na[n].ge.canvas);
          na[n] && na[n].ge.canvas && (na[n].ge.canvas.yf = void 0);
          na[n] = null;
        };
        a._setTextureCleanup({
          deleteTexture: function (n, q) {
            var v = ha[q];
            v && na[n].ge.deleteTexture(v);
            ha[q] = null;
          },
        });
        a.MakeWebGLContext = function (n) {
          if (!this.Od(n)) return null;
          var q = this._MakeGrContext();
          if (!q) return null;
          q.Md = n;
          var v = q.delete.bind(q);
          q["delete"] = function () {
            a.Od(this.Md);
            v();
          }.bind(q);
          return (x.ef = q);
        };
        a.MakeGrContext = a.MakeWebGLContext;
        a.GrDirectContext.prototype.getResourceCacheLimitBytes = function () {
          a.Od(this.Md);
          this._getResourceCacheLimitBytes();
        };
        a.GrDirectContext.prototype.getResourceCacheUsageBytes = function () {
          a.Od(this.Md);
          this._getResourceCacheUsageBytes();
        };
        a.GrDirectContext.prototype.releaseResourcesAndAbandonContext =
          function () {
            a.Od(this.Md);
            this._releaseResourcesAndAbandonContext();
          };
        a.GrDirectContext.prototype.setResourceCacheLimitBytes = function (n) {
          a.Od(this.Md);
          this._setResourceCacheLimitBytes(n);
        };
        a.MakeOnScreenGLSurface = function (n, q, v, D) {
          if (!this.Od(n.Md)) return null;
          q = this._MakeOnScreenGLSurface(n, q, v, D);
          if (!q) return null;
          q.Md = n.Md;
          return q;
        };
        a.MakeRenderTarget = function () {
          var n = arguments[0];
          if (!this.Od(n.Md)) return null;
          if (3 === arguments.length) {
            var q = this._MakeRenderTargetWH(n, arguments[1], arguments[2]);
            if (!q) return null;
          } else if (2 === arguments.length) {
            if (((q = this._MakeRenderTargetII(n, arguments[1])), !q))
              return null;
          } else return null;
          q.Md = n.Md;
          return q;
        };
        a.MakeWebGLCanvasSurface = function (n, q, v) {
          q = q || null;
          var D = n,
            I =
              "undefined" !== typeof OffscreenCanvas &&
              D instanceof OffscreenCanvas;
          if (
            !(
              ("undefined" !== typeof HTMLCanvasElement &&
                D instanceof HTMLCanvasElement) ||
              I ||
              ((D = document.getElementById(n)), D)
            )
          )
            throw "Canvas with id " + n + " was not found";
          n = this.GetWebGLContext(D, v);
          if (!n || 0 > n) throw "failed to create webgl context: err " + n;
          n = this.MakeWebGLContext(n);
          q = this.MakeOnScreenGLSurface(n, D.width, D.height, q);
          return q
            ? q
            : ((q = D.cloneNode(!0)),
              D.parentNode.replaceChild(q, D),
              q.classList.add("ck-replaced"),
              a.MakeSWCanvasSurface(q));
        };
        a.MakeCanvasSurface = a.MakeWebGLCanvasSurface;
        a.Surface.prototype.makeImageFromTexture = function (n, q) {
          a.Od(this.Md);
          n = d(n);
          if ((q = this._makeImageFromTexture(this.Md, n, q))) q.Le = n;
          return q;
        };
        a.Surface.prototype.makeImageFromTextureSource = function (n, q, v) {
          q ||
            (q = {
              height: f(n),
              width: h(n),
              colorType: a.ColorType.RGBA_8888,
              alphaType: v ? a.AlphaType.Premul : a.AlphaType.Unpremul,
            });
          q.colorSpace || (q.colorSpace = a.ColorSpace.SRGB);
          a.Od(this.Md);
          var D = x.ge;
          v = m(D, D.createTexture(), q, v);
          2 === x.version
            ? D.texImage2D(
                D.TEXTURE_2D,
                0,
                D.RGBA,
                q.width,
                q.height,
                0,
                D.RGBA,
                D.UNSIGNED_BYTE,
                n
              )
            : D.texImage2D(D.TEXTURE_2D, 0, D.RGBA, D.RGBA, D.UNSIGNED_BYTE, n);
          u(D, q);
          return this.makeImageFromTexture(v, q);
        };
        a.Surface.prototype.updateTextureFromSource = function (n, q, v) {
          if (n.Le) {
            a.Od(this.Md);
            var D = n.getImageInfo(),
              I = x.ge,
              M = m(I, ha[n.Le], D, v);
            2 === x.version
              ? I.texImage2D(
                  I.TEXTURE_2D,
                  0,
                  I.RGBA,
                  h(q),
                  f(q),
                  0,
                  I.RGBA,
                  I.UNSIGNED_BYTE,
                  q
                )
              : I.texImage2D(
                  I.TEXTURE_2D,
                  0,
                  I.RGBA,
                  I.RGBA,
                  I.UNSIGNED_BYTE,
                  q
                );
            u(I, D, v);
            this._resetContext();
            ha[n.Le] = null;
            n.Le = d(M);
            D.colorSpace = n.getColorSpace();
            q = this._makeImageFromTexture(this.Md, n.Le, D);
            v = n.Ld.Td;
            I = n.Ld.$d;
            n.Ld.Td = q.Ld.Td;
            n.Ld.$d = q.Ld.$d;
            q.Ld.Td = v;
            q.Ld.$d = I;
            q.delete();
            D.colorSpace.delete();
          }
        };
        a.MakeLazyImageFromTextureSource = function (n, q, v) {
          q ||
            (q = {
              height: f(n),
              width: h(n),
              colorType: a.ColorType.RGBA_8888,
              alphaType: v ? a.AlphaType.Premul : a.AlphaType.Unpremul,
            });
          q.colorSpace || (q.colorSpace = a.ColorSpace.SRGB);
          var D = {
            makeTexture: function () {
              var I = x,
                M = I.ge,
                z = m(M, M.createTexture(), q, v);
              2 === I.version
                ? M.texImage2D(
                    M.TEXTURE_2D,
                    0,
                    M.RGBA,
                    q.width,
                    q.height,
                    0,
                    M.RGBA,
                    M.UNSIGNED_BYTE,
                    n
                  )
                : M.texImage2D(
                    M.TEXTURE_2D,
                    0,
                    M.RGBA,
                    M.RGBA,
                    M.UNSIGNED_BYTE,
                    n
                  );
              u(M, q, v);
              return d(z);
            },
            freeSrc: function () {},
          };
          "VideoFrame" === n.constructor.name &&
            (D.freeSrc = function () {
              n.close();
            });
          return a.Image._makeFromGenerator(q, D);
        };
        a.Od = function (n) {
          return n ? ma(n) : !1;
        };
        a.df = function () {
          return x && x.ef && !x.ef.isDeleted() ? x.ef : null;
        };
      });
    })(w);
    (function (a) {
      function b(e, c, g, l, r) {
        for (var y = 0; y < e.length; y++)
          c[y * g + ((y * r + l + g) % g)] = e[y];
        return c;
      }
      function d(e) {
        for (var c = e * e, g = Array(c); c--; )
          g[c] = 0 === c % (e + 1) ? 1 : 0;
        return g;
      }
      function f(e) {
        return e ? e.constructor === Float32Array && 4 === e.length : !1;
      }
      function h(e) {
        return (
          ((n(255 * e[3]) << 24) |
            (n(255 * e[0]) << 16) |
            (n(255 * e[1]) << 8) |
            (n(255 * e[2]) << 0)) >>>
          0
        );
      }
      function m(e) {
        if (e && e._ck) return e;
        if (e instanceof Float32Array) {
          for (
            var c = Math.floor(e.length / 4), g = new Uint32Array(c), l = 0;
            l < c;
            l++
          )
            g[l] = h(e.slice(4 * l, 4 * (l + 1)));
          return g;
        }
        if (e instanceof Uint32Array) return e;
        if (e instanceof Array && e[0] instanceof Float32Array) return e.map(h);
      }
      function u(e) {
        if (void 0 === e) return 1;
        var c = parseFloat(e);
        return e && -1 !== e.indexOf("%") ? c / 100 : c;
      }
      function n(e) {
        return Math.round(Math.max(0, Math.min(e || 0, 255)));
      }
      function q(e, c) {
        (c && c._ck) || a._free(e);
      }
      function v(e, c, g) {
        if (!e || !e.length) return V;
        if (e && e._ck) return e.byteOffset;
        var l = a[c].BYTES_PER_ELEMENT;
        g || (g = a._malloc(e.length * l));
        a[c].set(e, g / l);
        return g;
      }
      function D(e) {
        var c = { ce: V, count: e.length, colorType: a.ColorType.RGBA_F32 };
        if (e instanceof Float32Array)
          (c.ce = v(e, "HEAPF32")), (c.count = e.length / 4);
        else if (e instanceof Uint32Array)
          (c.ce = v(e, "HEAPU32")), (c.colorType = a.ColorType.RGBA_8888);
        else if (e instanceof Array) {
          if (e && e.length) {
            for (
              var g = a._malloc(16 * e.length), l = 0, r = g / 4, y = 0;
              y < e.length;
              y++
            )
              for (var C = 0; 4 > C; C++) (a.HEAPF32[r + l] = e[y][C]), l++;
            e = g;
          } else e = V;
          c.ce = e;
        } else
          throw (
            "Invalid argument to copyFlexibleColorArray, Not a color array " +
            typeof e
          );
        return c;
      }
      function I(e) {
        if (!e) return V;
        var c = Ub.toTypedArray();
        if (e.length) {
          if (6 === e.length || 9 === e.length)
            return (
              v(e, "HEAPF32", Oa),
              6 === e.length && a.HEAPF32.set(yd, 6 + Oa / 4),
              Oa
            );
          if (16 === e.length)
            return (
              (c[0] = e[0]),
              (c[1] = e[1]),
              (c[2] = e[3]),
              (c[3] = e[4]),
              (c[4] = e[5]),
              (c[5] = e[7]),
              (c[6] = e[12]),
              (c[7] = e[13]),
              (c[8] = e[15]),
              Oa
            );
          throw "invalid matrix size";
        }
        if (void 0 === e.m11) throw "invalid matrix argument";
        c[0] = e.m11;
        c[1] = e.m21;
        c[2] = e.m41;
        c[3] = e.m12;
        c[4] = e.m22;
        c[5] = e.m42;
        c[6] = e.m14;
        c[7] = e.m24;
        c[8] = e.m44;
        return Oa;
      }
      function M(e) {
        if (!e) return V;
        var c = Vb.toTypedArray();
        if (e.length) {
          if (16 !== e.length && 6 !== e.length && 9 !== e.length)
            throw "invalid matrix size";
          if (16 === e.length) return v(e, "HEAPF32", ab);
          c.fill(0);
          c[0] = e[0];
          c[1] = e[1];
          c[3] = e[2];
          c[4] = e[3];
          c[5] = e[4];
          c[7] = e[5];
          c[10] = 1;
          c[12] = e[6];
          c[13] = e[7];
          c[15] = e[8];
          6 === e.length && ((c[12] = 0), (c[13] = 0), (c[15] = 1));
          return ab;
        }
        if (void 0 === e.m11) throw "invalid matrix argument";
        c[0] = e.m11;
        c[1] = e.m21;
        c[2] = e.m31;
        c[3] = e.m41;
        c[4] = e.m12;
        c[5] = e.m22;
        c[6] = e.m32;
        c[7] = e.m42;
        c[8] = e.m13;
        c[9] = e.m23;
        c[10] = e.m33;
        c[11] = e.m43;
        c[12] = e.m14;
        c[13] = e.m24;
        c[14] = e.m34;
        c[15] = e.m44;
        return ab;
      }
      function z(e, c) {
        return v(e, "HEAPF32", c || Ua);
      }
      function N(e, c, g, l) {
        var r = Wb.toTypedArray();
        r[0] = e;
        r[1] = c;
        r[2] = g;
        r[3] = l;
        return Ua;
      }
      function T(e) {
        for (var c = new Float32Array(4), g = 0; 4 > g; g++)
          c[g] = a.HEAPF32[e / 4 + g];
        return c;
      }
      function U(e, c) {
        return v(e, "HEAPF32", c || ja);
      }
      function ra(e, c) {
        return v(e, "HEAPF32", c || Xb);
      }
      function va() {
        for (var e = 0, c = 0; c < arguments.length - 1; c += 2)
          e += arguments[c] * arguments[c + 1];
        return e;
      }
      function gb(e, c, g) {
        for (var l = Array(e.length), r = 0; r < g; r++)
          for (var y = 0; y < g; y++) {
            for (var C = 0, J = 0; J < g; J++) C += e[g * r + J] * c[g * J + y];
            l[r * g + y] = C;
          }
        return l;
      }
      function hb(e, c) {
        for (var g = gb(c[0], c[1], e), l = 2; l < c.length; )
          (g = gb(g, c[l], e)), l++;
        return g;
      }
      a.Color = function (e, c, g, l) {
        void 0 === l && (l = 1);
        return a.Color4f(n(e) / 255, n(c) / 255, n(g) / 255, l);
      };
      a.ColorAsInt = function (e, c, g, l) {
        void 0 === l && (l = 255);
        return (
          ((n(l) << 24) |
            (n(e) << 16) |
            (n(c) << 8) |
            ((n(g) << 0) & 268435455)) >>>
          0
        );
      };
      a.Color4f = function (e, c, g, l) {
        void 0 === l && (l = 1);
        return Float32Array.of(e, c, g, l);
      };
      Object.defineProperty(a, "TRANSPARENT", {
        get: function () {
          return a.Color4f(0, 0, 0, 0);
        },
      });
      Object.defineProperty(a, "BLACK", {
        get: function () {
          return a.Color4f(0, 0, 0, 1);
        },
      });
      Object.defineProperty(a, "WHITE", {
        get: function () {
          return a.Color4f(1, 1, 1, 1);
        },
      });
      Object.defineProperty(a, "RED", {
        get: function () {
          return a.Color4f(1, 0, 0, 1);
        },
      });
      Object.defineProperty(a, "GREEN", {
        get: function () {
          return a.Color4f(0, 1, 0, 1);
        },
      });
      Object.defineProperty(a, "BLUE", {
        get: function () {
          return a.Color4f(0, 0, 1, 1);
        },
      });
      Object.defineProperty(a, "YELLOW", {
        get: function () {
          return a.Color4f(1, 1, 0, 1);
        },
      });
      Object.defineProperty(a, "CYAN", {
        get: function () {
          return a.Color4f(0, 1, 1, 1);
        },
      });
      Object.defineProperty(a, "MAGENTA", {
        get: function () {
          return a.Color4f(1, 0, 1, 1);
        },
      });
      a.getColorComponents = function (e) {
        return [
          Math.floor(255 * e[0]),
          Math.floor(255 * e[1]),
          Math.floor(255 * e[2]),
          e[3],
        ];
      };
      a.parseColorString = function (e, c) {
        e = e.toLowerCase();
        if (e.startsWith("#")) {
          c = 255;
          switch (e.length) {
            case 9:
              c = parseInt(e.slice(7, 9), 16);
            case 7:
              var g = parseInt(e.slice(1, 3), 16);
              var l = parseInt(e.slice(3, 5), 16);
              var r = parseInt(e.slice(5, 7), 16);
              break;
            case 5:
              c = 17 * parseInt(e.slice(4, 5), 16);
            case 4:
              (g = 17 * parseInt(e.slice(1, 2), 16)),
                (l = 17 * parseInt(e.slice(2, 3), 16)),
                (r = 17 * parseInt(e.slice(3, 4), 16));
          }
          return a.Color(g, l, r, c / 255);
        }
        return e.startsWith("rgba")
          ? ((e = e.slice(5, -1)),
            (e = e.split(",")),
            a.Color(+e[0], +e[1], +e[2], u(e[3])))
          : e.startsWith("rgb")
          ? ((e = e.slice(4, -1)),
            (e = e.split(",")),
            a.Color(+e[0], +e[1], +e[2], u(e[3])))
          : e.startsWith("gray(") ||
            e.startsWith("hsl") ||
            !c ||
            ((e = c[e]), void 0 === e)
          ? a.BLACK
          : e;
      };
      a.multiplyByAlpha = function (e, c) {
        e = e.slice();
        e[3] = Math.max(0, Math.min(e[3] * c, 1));
        return e;
      };
      a.Malloc = function (e, c) {
        var g = a._malloc(c * e.BYTES_PER_ELEMENT);
        return {
          _ck: !0,
          length: c,
          byteOffset: g,
          re: null,
          subarray: function (l, r) {
            l = this.toTypedArray().subarray(l, r);
            l._ck = !0;
            return l;
          },
          toTypedArray: function () {
            if (this.re && this.re.length) return this.re;
            this.re = new e(a.HEAPU8.buffer, g, c);
            this.re._ck = !0;
            return this.re;
          },
        };
      };
      a.Free = function (e) {
        a._free(e.byteOffset);
        e.byteOffset = V;
        e.toTypedArray = null;
        e.re = null;
      };
      var Oa = V,
        Ub,
        ab = V,
        Vb,
        Ua = V,
        Wb,
        Ha,
        ja = V,
        Cc,
        Pa = V,
        Dc,
        Yb = V,
        Ec,
        Zb = V,
        $b,
        xb = V,
        Fc,
        Xb = V,
        Gc,
        Hc = V,
        yd = Float32Array.of(0, 0, 1),
        V = 0;
      a.onRuntimeInitialized = function () {
        function e(c, g, l, r, y, C, J) {
          C ||
            ((C = 4 * r.width),
            r.colorType === a.ColorType.RGBA_F16
              ? (C *= 2)
              : r.colorType === a.ColorType.RGBA_F32 && (C *= 4));
          var Q = C * r.height;
          var O = y ? y.byteOffset : a._malloc(Q);
          if (
            J ? !c._readPixels(r, O, C, g, l, J) : !c._readPixels(r, O, C, g, l)
          )
            return y || a._free(O), null;
          if (y) return y.toTypedArray();
          switch (r.colorType) {
            case a.ColorType.RGBA_8888:
            case a.ColorType.RGBA_F16:
              c = new Uint8Array(a.HEAPU8.buffer, O, Q).slice();
              break;
            case a.ColorType.RGBA_F32:
              c = new Float32Array(a.HEAPU8.buffer, O, Q).slice();
              break;
            default:
              return null;
          }
          a._free(O);
          return c;
        }
        Wb = a.Malloc(Float32Array, 4);
        Ua = Wb.byteOffset;
        Vb = a.Malloc(Float32Array, 16);
        ab = Vb.byteOffset;
        Ub = a.Malloc(Float32Array, 9);
        Oa = Ub.byteOffset;
        Fc = a.Malloc(Float32Array, 12);
        Xb = Fc.byteOffset;
        Gc = a.Malloc(Float32Array, 12);
        Hc = Gc.byteOffset;
        Ha = a.Malloc(Float32Array, 4);
        ja = Ha.byteOffset;
        Cc = a.Malloc(Float32Array, 4);
        Pa = Cc.byteOffset;
        Dc = a.Malloc(Float32Array, 3);
        Yb = Dc.byteOffset;
        Ec = a.Malloc(Float32Array, 3);
        Zb = Ec.byteOffset;
        $b = a.Malloc(Int32Array, 4);
        xb = $b.byteOffset;
        a.ColorSpace.SRGB = a.ColorSpace._MakeSRGB();
        a.ColorSpace.DISPLAY_P3 = a.ColorSpace._MakeDisplayP3();
        a.ColorSpace.ADOBE_RGB = a.ColorSpace._MakeAdobeRGB();
        a.GlyphRunFlags = { IsWhiteSpace: a._GlyphRunFlags_isWhiteSpace };
        a.Path.MakeFromCmds = function (c) {
          var g = v(c, "HEAPF32"),
            l = a.Path._MakeFromCmds(g, c.length);
          q(g, c);
          return l;
        };
        a.Path.MakeFromVerbsPointsWeights = function (c, g, l) {
          var r = v(c, "HEAPU8"),
            y = v(g, "HEAPF32"),
            C = v(l, "HEAPF32"),
            J = a.Path._MakeFromVerbsPointsWeights(
              r,
              c.length,
              y,
              g.length,
              C,
              (l && l.length) || 0
            );
          q(r, c);
          q(y, g);
          q(C, l);
          return J;
        };
        a.Path.prototype.addArc = function (c, g, l) {
          c = U(c);
          this._addArc(c, g, l);
          return this;
        };
        a.Path.prototype.addCircle = function (c, g, l, r) {
          this._addCircle(c, g, l, !!r);
          return this;
        };
        a.Path.prototype.addOval = function (c, g, l) {
          void 0 === l && (l = 1);
          c = U(c);
          this._addOval(c, !!g, l);
          return this;
        };
        a.Path.prototype.addPath = function () {
          var c = Array.prototype.slice.call(arguments),
            g = c[0],
            l = !1;
          "boolean" === typeof c[c.length - 1] && (l = c.pop());
          if (1 === c.length) this._addPath(g, 1, 0, 0, 0, 1, 0, 0, 0, 1, l);
          else if (2 === c.length)
            (c = c[1]),
              this._addPath(
                g,
                c[0],
                c[1],
                c[2],
                c[3],
                c[4],
                c[5],
                c[6] || 0,
                c[7] || 0,
                c[8] || 1,
                l
              );
          else if (7 === c.length || 10 === c.length)
            this._addPath(
              g,
              c[1],
              c[2],
              c[3],
              c[4],
              c[5],
              c[6],
              c[7] || 0,
              c[8] || 0,
              c[9] || 1,
              l
            );
          else return null;
          return this;
        };
        a.Path.prototype.addPoly = function (c, g) {
          var l = v(c, "HEAPF32");
          this._addPoly(l, c.length / 2, g);
          q(l, c);
          return this;
        };
        a.Path.prototype.addRect = function (c, g) {
          c = U(c);
          this._addRect(c, !!g);
          return this;
        };
        a.Path.prototype.addRRect = function (c, g) {
          c = ra(c);
          this._addRRect(c, !!g);
          return this;
        };
        a.Path.prototype.addVerbsPointsWeights = function (c, g, l) {
          var r = v(c, "HEAPU8"),
            y = v(g, "HEAPF32"),
            C = v(l, "HEAPF32");
          this._addVerbsPointsWeights(
            r,
            c.length,
            y,
            g.length,
            C,
            (l && l.length) || 0
          );
          q(r, c);
          q(y, g);
          q(C, l);
        };
        a.Path.prototype.arc = function (c, g, l, r, y, C) {
          c = a.LTRBRect(c - l, g - l, c + l, g + l);
          y = ((y - r) / Math.PI) * 180 - 360 * !!C;
          C = new a.Path();
          C.addArc(c, (r / Math.PI) * 180, y);
          this.addPath(C, !0);
          C.delete();
          return this;
        };
        a.Path.prototype.arcToOval = function (c, g, l, r) {
          c = U(c);
          this._arcToOval(c, g, l, r);
          return this;
        };
        a.Path.prototype.arcToRotated = function (c, g, l, r, y, C, J) {
          this._arcToRotated(c, g, l, !!r, !!y, C, J);
          return this;
        };
        a.Path.prototype.arcToTangent = function (c, g, l, r, y) {
          this._arcToTangent(c, g, l, r, y);
          return this;
        };
        a.Path.prototype.close = function () {
          this._close();
          return this;
        };
        a.Path.prototype.conicTo = function (c, g, l, r, y) {
          this._conicTo(c, g, l, r, y);
          return this;
        };
        a.Path.prototype.computeTightBounds = function (c) {
          this._computeTightBounds(ja);
          var g = Ha.toTypedArray();
          return c ? (c.set(g), c) : g.slice();
        };
        a.Path.prototype.cubicTo = function (c, g, l, r, y, C) {
          this._cubicTo(c, g, l, r, y, C);
          return this;
        };
        a.Path.prototype.dash = function (c, g, l) {
          return this._dash(c, g, l) ? this : null;
        };
        a.Path.prototype.getBounds = function (c) {
          this._getBounds(ja);
          var g = Ha.toTypedArray();
          return c ? (c.set(g), c) : g.slice();
        };
        a.Path.prototype.lineTo = function (c, g) {
          this._lineTo(c, g);
          return this;
        };
        a.Path.prototype.moveTo = function (c, g) {
          this._moveTo(c, g);
          return this;
        };
        a.Path.prototype.offset = function (c, g) {
          this._transform(1, 0, c, 0, 1, g, 0, 0, 1);
          return this;
        };
        a.Path.prototype.quadTo = function (c, g, l, r) {
          this._quadTo(c, g, l, r);
          return this;
        };
        a.Path.prototype.rArcTo = function (c, g, l, r, y, C, J) {
          this._rArcTo(c, g, l, r, y, C, J);
          return this;
        };
        a.Path.prototype.rConicTo = function (c, g, l, r, y) {
          this._rConicTo(c, g, l, r, y);
          return this;
        };
        a.Path.prototype.rCubicTo = function (c, g, l, r, y, C) {
          this._rCubicTo(c, g, l, r, y, C);
          return this;
        };
        a.Path.prototype.rLineTo = function (c, g) {
          this._rLineTo(c, g);
          return this;
        };
        a.Path.prototype.rMoveTo = function (c, g) {
          this._rMoveTo(c, g);
          return this;
        };
        a.Path.prototype.rQuadTo = function (c, g, l, r) {
          this._rQuadTo(c, g, l, r);
          return this;
        };
        a.Path.prototype.stroke = function (c) {
          c = c || {};
          c.width = c.width || 1;
          c.miter_limit = c.miter_limit || 4;
          c.cap = c.cap || a.StrokeCap.Butt;
          c.join = c.join || a.StrokeJoin.Miter;
          c.precision = c.precision || 1;
          return this._stroke(c) ? this : null;
        };
        a.Path.prototype.transform = function () {
          if (1 === arguments.length) {
            var c = arguments[0];
            this._transform(
              c[0],
              c[1],
              c[2],
              c[3],
              c[4],
              c[5],
              c[6] || 0,
              c[7] || 0,
              c[8] || 1
            );
          } else if (6 === arguments.length || 9 === arguments.length)
            (c = arguments),
              this._transform(
                c[0],
                c[1],
                c[2],
                c[3],
                c[4],
                c[5],
                c[6] || 0,
                c[7] || 0,
                c[8] || 1
              );
          else
            throw (
              "transform expected to take 1 or 9 arguments. Got " +
              arguments.length
            );
          return this;
        };
        a.Path.prototype.trim = function (c, g, l) {
          return this._trim(c, g, !!l) ? this : null;
        };
        a.Image.prototype.makeShaderCubic = function (c, g, l, r, y) {
          y = I(y);
          return this._makeShaderCubic(c, g, l, r, y);
        };
        a.Image.prototype.makeShaderOptions = function (c, g, l, r, y) {
          y = I(y);
          return this._makeShaderOptions(c, g, l, r, y);
        };
        a.Image.prototype.readPixels = function (c, g, l, r, y) {
          var C = a.df();
          return e(this, c, g, l, r, y, C);
        };
        a.Canvas.prototype.clear = function (c) {
          a.Od(this.Md);
          c = z(c);
          this._clear(c);
        };
        a.Canvas.prototype.clipRRect = function (c, g, l) {
          a.Od(this.Md);
          c = ra(c);
          this._clipRRect(c, g, l);
        };
        a.Canvas.prototype.clipRect = function (c, g, l) {
          a.Od(this.Md);
          c = U(c);
          this._clipRect(c, g, l);
        };
        a.Canvas.prototype.concat = function (c) {
          a.Od(this.Md);
          c = M(c);
          this._concat(c);
        };
        a.Canvas.prototype.drawArc = function (c, g, l, r, y) {
          a.Od(this.Md);
          c = U(c);
          this._drawArc(c, g, l, r, y);
        };
        a.Canvas.prototype.drawAtlas = function (c, g, l, r, y, C, J) {
          if (c && r && g && l && g.length === l.length) {
            a.Od(this.Md);
            y || (y = a.BlendMode.SrcOver);
            var Q = v(g, "HEAPF32"),
              O = v(l, "HEAPF32"),
              W = l.length / 4,
              t = v(m(C), "HEAPU32");
            if (J && "B" in J && "C" in J)
              this._drawAtlasCubic(c, O, Q, t, W, y, J.B, J.C, r);
            else {
              let F = a.FilterMode.Linear,
                P = a.MipmapMode.None;
              J && ((F = J.filter), "mipmap" in J && (P = J.mipmap));
              this._drawAtlasOptions(c, O, Q, t, W, y, F, P, r);
            }
            q(Q, g);
            q(O, l);
            q(t, C);
          }
        };
        a.Canvas.prototype.drawCircle = function (c, g, l, r) {
          a.Od(this.Md);
          this._drawCircle(c, g, l, r);
        };
        a.Canvas.prototype.drawColor = function (c, g) {
          a.Od(this.Md);
          c = z(c);
          void 0 !== g ? this._drawColor(c, g) : this._drawColor(c);
        };
        a.Canvas.prototype.drawColorInt = function (c, g) {
          a.Od(this.Md);
          this._drawColorInt(c, g || a.BlendMode.SrcOver);
        };
        a.Canvas.prototype.drawColorComponents = function (c, g, l, r, y) {
          a.Od(this.Md);
          c = N(c, g, l, r);
          void 0 !== y ? this._drawColor(c, y) : this._drawColor(c);
        };
        a.Canvas.prototype.drawDRRect = function (c, g, l) {
          a.Od(this.Md);
          c = ra(c, Xb);
          g = ra(g, Hc);
          this._drawDRRect(c, g, l);
        };
        a.Canvas.prototype.drawImage = function (c, g, l, r) {
          a.Od(this.Md);
          this._drawImage(c, g, l, r || null);
        };
        a.Canvas.prototype.drawImageCubic = function (c, g, l, r, y, C) {
          a.Od(this.Md);
          this._drawImageCubic(c, g, l, r, y, C || null);
        };
        a.Canvas.prototype.drawImageOptions = function (c, g, l, r, y, C) {
          a.Od(this.Md);
          this._drawImageOptions(c, g, l, r, y, C || null);
        };
        a.Canvas.prototype.drawImageNine = function (c, g, l, r, y) {
          a.Od(this.Md);
          g = v(g, "HEAP32", xb);
          l = U(l);
          this._drawImageNine(c, g, l, r, y || null);
        };
        a.Canvas.prototype.drawImageRect = function (c, g, l, r, y) {
          a.Od(this.Md);
          U(g, ja);
          U(l, Pa);
          this._drawImageRect(c, ja, Pa, r, !!y);
        };
        a.Canvas.prototype.drawImageRectCubic = function (c, g, l, r, y, C) {
          a.Od(this.Md);
          U(g, ja);
          U(l, Pa);
          this._drawImageRectCubic(c, ja, Pa, r, y, C || null);
        };
        a.Canvas.prototype.drawImageRectOptions = function (c, g, l, r, y, C) {
          a.Od(this.Md);
          U(g, ja);
          U(l, Pa);
          this._drawImageRectOptions(c, ja, Pa, r, y, C || null);
        };
        a.Canvas.prototype.drawLine = function (c, g, l, r, y) {
          a.Od(this.Md);
          this._drawLine(c, g, l, r, y);
        };
        a.Canvas.prototype.drawOval = function (c, g) {
          a.Od(this.Md);
          c = U(c);
          this._drawOval(c, g);
        };
        a.Canvas.prototype.drawPaint = function (c) {
          a.Od(this.Md);
          this._drawPaint(c);
        };
        a.Canvas.prototype.drawParagraph = function (c, g, l) {
          a.Od(this.Md);
          this._drawParagraph(c, g, l);
        };
        a.Canvas.prototype.drawPatch = function (c, g, l, r, y) {
          if (24 > c.length) throw "Need 12 cubic points";
          if (g && 4 > g.length) throw "Need 4 colors";
          if (l && 8 > l.length) throw "Need 4 shader coordinates";
          a.Od(this.Md);
          const C = v(c, "HEAPF32"),
            J = g ? v(m(g), "HEAPU32") : V,
            Q = l ? v(l, "HEAPF32") : V;
          r || (r = a.BlendMode.Modulate);
          this._drawPatch(C, J, Q, r, y);
          q(Q, l);
          q(J, g);
          q(C, c);
        };
        a.Canvas.prototype.drawPath = function (c, g) {
          a.Od(this.Md);
          this._drawPath(c, g);
        };
        a.Canvas.prototype.drawPicture = function (c) {
          a.Od(this.Md);
          this._drawPicture(c);
        };
        a.Canvas.prototype.drawPoints = function (c, g, l) {
          a.Od(this.Md);
          var r = v(g, "HEAPF32");
          this._drawPoints(c, r, g.length / 2, l);
          q(r, g);
        };
        a.Canvas.prototype.drawRRect = function (c, g) {
          a.Od(this.Md);
          c = ra(c);
          this._drawRRect(c, g);
        };
        a.Canvas.prototype.drawRect = function (c, g) {
          a.Od(this.Md);
          c = U(c);
          this._drawRect(c, g);
        };
        a.Canvas.prototype.drawRect4f = function (c, g, l, r, y) {
          a.Od(this.Md);
          this._drawRect4f(c, g, l, r, y);
        };
        a.Canvas.prototype.drawShadow = function (c, g, l, r, y, C, J) {
          a.Od(this.Md);
          var Q = v(y, "HEAPF32"),
            O = v(C, "HEAPF32");
          g = v(g, "HEAPF32", Yb);
          l = v(l, "HEAPF32", Zb);
          this._drawShadow(c, g, l, r, Q, O, J);
          q(Q, y);
          q(O, C);
        };
        a.getShadowLocalBounds = function (c, g, l, r, y, C, J) {
          c = I(c);
          l = v(l, "HEAPF32", Yb);
          r = v(r, "HEAPF32", Zb);
          if (!this._getShadowLocalBounds(c, g, l, r, y, C, ja)) return null;
          g = Ha.toTypedArray();
          return J ? (J.set(g), J) : g.slice();
        };
        a.Canvas.prototype.drawTextBlob = function (c, g, l, r) {
          a.Od(this.Md);
          this._drawTextBlob(c, g, l, r);
        };
        a.Canvas.prototype.drawVertices = function (c, g, l) {
          a.Od(this.Md);
          this._drawVertices(c, g, l);
        };
        a.Canvas.prototype.getDeviceClipBounds = function (c) {
          this._getDeviceClipBounds(xb);
          var g = $b.toTypedArray();
          c ? c.set(g) : (c = g.slice());
          return c;
        };
        a.Canvas.prototype.getLocalToDevice = function () {
          this._getLocalToDevice(ab);
          for (var c = ab, g = Array(16), l = 0; 16 > l; l++)
            g[l] = a.HEAPF32[c / 4 + l];
          return g;
        };
        a.Canvas.prototype.getTotalMatrix = function () {
          this._getTotalMatrix(Oa);
          for (var c = Array(9), g = 0; 9 > g; g++)
            c[g] = a.HEAPF32[Oa / 4 + g];
          return c;
        };
        a.Canvas.prototype.makeSurface = function (c) {
          c = this._makeSurface(c);
          c.Md = this.Md;
          return c;
        };
        a.Canvas.prototype.readPixels = function (c, g, l, r, y) {
          a.Od(this.Md);
          return e(this, c, g, l, r, y);
        };
        a.Canvas.prototype.saveLayer = function (c, g, l, r) {
          g = U(g);
          return this._saveLayer(c || null, g, l || null, r || 0);
        };
        a.Canvas.prototype.writePixels = function (c, g, l, r, y, C, J, Q) {
          if (c.byteLength % (g * l))
            throw "pixels length must be a multiple of the srcWidth * srcHeight";
          a.Od(this.Md);
          var O = c.byteLength / (g * l);
          C = C || a.AlphaType.Unpremul;
          J = J || a.ColorType.RGBA_8888;
          Q = Q || a.ColorSpace.SRGB;
          var W = O * g;
          O = v(c, "HEAPU8");
          g = this._writePixels(
            { width: g, height: l, colorType: J, alphaType: C, colorSpace: Q },
            O,
            W,
            r,
            y
          );
          q(O, c);
          return g;
        };
        a.ColorFilter.MakeBlend = function (c, g, l) {
          c = z(c);
          l = l || a.ColorSpace.SRGB;
          return a.ColorFilter._MakeBlend(c, g, l);
        };
        a.ColorFilter.MakeMatrix = function (c) {
          if (!c || 20 !== c.length) throw "invalid color matrix";
          var g = v(c, "HEAPF32"),
            l = a.ColorFilter._makeMatrix(g);
          q(g, c);
          return l;
        };
        a.ContourMeasure.prototype.getPosTan = function (c, g) {
          this._getPosTan(c, ja);
          c = Ha.toTypedArray();
          return g ? (g.set(c), g) : c.slice();
        };
        a.ImageFilter.MakeDropShadow = function (c, g, l, r, y, C) {
          y = z(y, Ua);
          return a.ImageFilter._MakeDropShadow(c, g, l, r, y, C);
        };
        a.ImageFilter.MakeDropShadowOnly = function (c, g, l, r, y, C) {
          y = z(y, Ua);
          return a.ImageFilter._MakeDropShadowOnly(c, g, l, r, y, C);
        };
        a.ImageFilter.MakeImage = function (c, g, l, r) {
          l = U(l, ja);
          r = U(r, Pa);
          if ("B" in g && "C" in g)
            return a.ImageFilter._MakeImageCubic(c, g.B, g.C, l, r);
          const y = g.filter;
          let C = a.MipmapMode.None;
          "mipmap" in g && (C = g.mipmap);
          return a.ImageFilter._MakeImageOptions(c, y, C, l, r);
        };
        a.ImageFilter.MakeMatrixTransform = function (c, g, l) {
          c = I(c);
          if ("B" in g && "C" in g)
            return a.ImageFilter._MakeMatrixTransformCubic(c, g.B, g.C, l);
          const r = g.filter;
          let y = a.MipmapMode.None;
          "mipmap" in g && (y = g.mipmap);
          return a.ImageFilter._MakeMatrixTransformOptions(c, r, y, l);
        };
        a.Paint.prototype.getColor = function () {
          this._getColor(Ua);
          return T(Ua);
        };
        a.Paint.prototype.setColor = function (c, g) {
          g = g || null;
          c = z(c);
          this._setColor(c, g);
        };
        a.Paint.prototype.setColorComponents = function (c, g, l, r, y) {
          y = y || null;
          c = N(c, g, l, r);
          this._setColor(c, y);
        };
        a.Path.prototype.getPoint = function (c, g) {
          this._getPoint(c, ja);
          c = Ha.toTypedArray();
          return g ? ((g[0] = c[0]), (g[1] = c[1]), g) : c.slice(0, 2);
        };
        a.Picture.prototype.makeShader = function (c, g, l, r, y) {
          r = I(r);
          y = U(y);
          return this._makeShader(c, g, l, r, y);
        };
        a.PictureRecorder.prototype.beginRecording = function (c) {
          c = U(c);
          return this._beginRecording(c);
        };
        a.Surface.prototype.getCanvas = function () {
          var c = this._getCanvas();
          c.Md = this.Md;
          return c;
        };
        a.Surface.prototype.makeImageSnapshot = function (c) {
          a.Od(this.Md);
          c = v(c, "HEAP32", xb);
          return this._makeImageSnapshot(c);
        };
        a.Surface.prototype.makeSurface = function (c) {
          a.Od(this.Md);
          c = this._makeSurface(c);
          c.Md = this.Md;
          return c;
        };
        a.Surface.prototype.Df = function (c, g) {
          this.He || (this.He = this.getCanvas());
          requestAnimationFrame(
            function () {
              a.Od(this.Md);
              c(this.He);
              this.flush(g);
            }.bind(this)
          );
        };
        a.Surface.prototype.requestAnimationFrame ||
          (a.Surface.prototype.requestAnimationFrame = a.Surface.prototype.Df);
        a.Surface.prototype.zf = function (c, g) {
          this.He || (this.He = this.getCanvas());
          requestAnimationFrame(
            function () {
              a.Od(this.Md);
              c(this.He);
              this.flush(g);
              this.dispose();
            }.bind(this)
          );
        };
        a.Surface.prototype.drawOnce ||
          (a.Surface.prototype.drawOnce = a.Surface.prototype.zf);
        a.PathEffect.MakeDash = function (c, g) {
          g || (g = 0);
          if (!c.length || 1 === c.length % 2)
            throw "Intervals array must have even length";
          var l = v(c, "HEAPF32");
          g = a.PathEffect._MakeDash(l, c.length, g);
          q(l, c);
          return g;
        };
        a.PathEffect.MakeLine2D = function (c, g) {
          g = I(g);
          return a.PathEffect._MakeLine2D(c, g);
        };
        a.PathEffect.MakePath2D = function (c, g) {
          c = I(c);
          return a.PathEffect._MakePath2D(c, g);
        };
        a.Shader.MakeColor = function (c, g) {
          g = g || null;
          c = z(c);
          return a.Shader._MakeColor(c, g);
        };
        a.Shader.Blend = a.Shader.MakeBlend;
        a.Shader.Color = a.Shader.MakeColor;
        a.Shader.MakeLinearGradient = function (c, g, l, r, y, C, J, Q) {
          Q = Q || null;
          var O = D(l),
            W = v(r, "HEAPF32");
          J = J || 0;
          C = I(C);
          var t = Ha.toTypedArray();
          t.set(c);
          t.set(g, 2);
          c = a.Shader._MakeLinearGradient(
            ja,
            O.ce,
            O.colorType,
            W,
            O.count,
            y,
            J,
            C,
            Q
          );
          q(O.ce, l);
          r && q(W, r);
          return c;
        };
        a.Shader.MakeRadialGradient = function (c, g, l, r, y, C, J, Q) {
          Q = Q || null;
          var O = D(l),
            W = v(r, "HEAPF32");
          J = J || 0;
          C = I(C);
          c = a.Shader._MakeRadialGradient(
            c[0],
            c[1],
            g,
            O.ce,
            O.colorType,
            W,
            O.count,
            y,
            J,
            C,
            Q
          );
          q(O.ce, l);
          r && q(W, r);
          return c;
        };
        a.Shader.MakeSweepGradient = function (c, g, l, r, y, C, J, Q, O, W) {
          W = W || null;
          var t = D(l),
            F = v(r, "HEAPF32");
          J = J || 0;
          Q = Q || 0;
          O = O || 360;
          C = I(C);
          c = a.Shader._MakeSweepGradient(
            c,
            g,
            t.ce,
            t.colorType,
            F,
            t.count,
            y,
            Q,
            O,
            J,
            C,
            W
          );
          q(t.ce, l);
          r && q(F, r);
          return c;
        };
        a.Shader.MakeTwoPointConicalGradient = function (
          c,
          g,
          l,
          r,
          y,
          C,
          J,
          Q,
          O,
          W
        ) {
          W = W || null;
          var t = D(y),
            F = v(C, "HEAPF32");
          O = O || 0;
          Q = I(Q);
          var P = Ha.toTypedArray();
          P.set(c);
          P.set(l, 2);
          c = a.Shader._MakeTwoPointConicalGradient(
            ja,
            g,
            r,
            t.ce,
            t.colorType,
            F,
            t.count,
            J,
            O,
            Q,
            W
          );
          q(t.ce, y);
          C && q(F, C);
          return c;
        };
        a.Vertices.prototype.bounds = function (c) {
          this._bounds(ja);
          var g = Ha.toTypedArray();
          return c ? (c.set(g), c) : g.slice();
        };
        a.Vd &&
          a.Vd.forEach(function (c) {
            c();
          });
      };
      a.computeTonalColors = function (e) {
        var c = v(e.ambient, "HEAPF32"),
          g = v(e.spot, "HEAPF32");
        this._computeTonalColors(c, g);
        var l = { ambient: T(c), spot: T(g) };
        q(c, e.ambient);
        q(g, e.spot);
        return l;
      };
      a.LTRBRect = function (e, c, g, l) {
        return Float32Array.of(e, c, g, l);
      };
      a.XYWHRect = function (e, c, g, l) {
        return Float32Array.of(e, c, e + g, c + l);
      };
      a.LTRBiRect = function (e, c, g, l) {
        return Int32Array.of(e, c, g, l);
      };
      a.XYWHiRect = function (e, c, g, l) {
        return Int32Array.of(e, c, e + g, c + l);
      };
      a.RRectXY = function (e, c, g) {
        return Float32Array.of(e[0], e[1], e[2], e[3], c, g, c, g, c, g, c, g);
      };
      a.MakeAnimatedImageFromEncoded = function (e) {
        e = new Uint8Array(e);
        var c = a._malloc(e.byteLength);
        a.HEAPU8.set(e, c);
        return (e = a._decodeAnimatedImage(c, e.byteLength)) ? e : null;
      };
      a.MakeImageFromEncoded = function (e) {
        e = new Uint8Array(e);
        var c = a._malloc(e.byteLength);
        a.HEAPU8.set(e, c);
        return (e = a._decodeImage(c, e.byteLength)) ? e : null;
      };
      var ib = null;
      a.MakeImageFromCanvasImageSource = function (e) {
        var c = e.width,
          g = e.height;
        ib || (ib = document.createElement("canvas"));
        ib.width = c;
        ib.height = g;
        var l = ib.getContext("2d", { wg: !0 });
        l.drawImage(e, 0, 0);
        e = l.getImageData(0, 0, c, g);
        return a.MakeImage(
          {
            width: c,
            height: g,
            alphaType: a.AlphaType.Unpremul,
            colorType: a.ColorType.RGBA_8888,
            colorSpace: a.ColorSpace.SRGB,
          },
          e.data,
          4 * c
        );
      };
      a.MakeImage = function (e, c, g) {
        var l = a._malloc(c.length);
        a.HEAPU8.set(c, l);
        return a._MakeImage(e, l, c.length, g);
      };
      a.MakeVertices = function (e, c, g, l, r, y) {
        var C = (r && r.length) || 0,
          J = 0;
        g && g.length && (J |= 1);
        l && l.length && (J |= 2);
        void 0 === y || y || (J |= 4);
        e = new a._VerticesBuilder(e, c.length / 2, C, J);
        v(c, "HEAPF32", e.positions());
        e.texCoords() && v(g, "HEAPF32", e.texCoords());
        e.colors() && v(m(l), "HEAPU32", e.colors());
        e.indices() && v(r, "HEAPU16", e.indices());
        return e.detach();
      };
      a.Matrix = {};
      a.Matrix.identity = function () {
        return d(3);
      };
      a.Matrix.invert = function (e) {
        var c =
          e[0] * e[4] * e[8] +
          e[1] * e[5] * e[6] +
          e[2] * e[3] * e[7] -
          e[2] * e[4] * e[6] -
          e[1] * e[3] * e[8] -
          e[0] * e[5] * e[7];
        return c
          ? [
              (e[4] * e[8] - e[5] * e[7]) / c,
              (e[2] * e[7] - e[1] * e[8]) / c,
              (e[1] * e[5] - e[2] * e[4]) / c,
              (e[5] * e[6] - e[3] * e[8]) / c,
              (e[0] * e[8] - e[2] * e[6]) / c,
              (e[2] * e[3] - e[0] * e[5]) / c,
              (e[3] * e[7] - e[4] * e[6]) / c,
              (e[1] * e[6] - e[0] * e[7]) / c,
              (e[0] * e[4] - e[1] * e[3]) / c,
            ]
          : null;
      };
      a.Matrix.mapPoints = function (e, c) {
        for (var g = 0; g < c.length; g += 2) {
          var l = c[g],
            r = c[g + 1],
            y = e[6] * l + e[7] * r + e[8],
            C = e[3] * l + e[4] * r + e[5];
          c[g] = (e[0] * l + e[1] * r + e[2]) / y;
          c[g + 1] = C / y;
        }
        return c;
      };
      a.Matrix.multiply = function () {
        return hb(3, arguments);
      };
      a.Matrix.rotated = function (e, c, g) {
        c = c || 0;
        g = g || 0;
        var l = Math.sin(e);
        e = Math.cos(e);
        return [e, -l, va(l, g, 1 - e, c), l, e, va(-l, c, 1 - e, g), 0, 0, 1];
      };
      a.Matrix.scaled = function (e, c, g, l) {
        g = g || 0;
        l = l || 0;
        var r = b([e, c], d(3), 3, 0, 1);
        return b([g - e * g, l - c * l], r, 3, 2, 0);
      };
      a.Matrix.skewed = function (e, c, g, l) {
        g = g || 0;
        l = l || 0;
        var r = b([e, c], d(3), 3, 1, -1);
        return b([-e * g, -c * l], r, 3, 2, 0);
      };
      a.Matrix.translated = function (e, c) {
        return b(arguments, d(3), 3, 2, 0);
      };
      a.Vector = {};
      a.Vector.dot = function (e, c) {
        return e
          .map(function (g, l) {
            return g * c[l];
          })
          .reduce(function (g, l) {
            return g + l;
          });
      };
      a.Vector.lengthSquared = function (e) {
        return a.Vector.dot(e, e);
      };
      a.Vector.length = function (e) {
        return Math.sqrt(a.Vector.lengthSquared(e));
      };
      a.Vector.mulScalar = function (e, c) {
        return e.map(function (g) {
          return g * c;
        });
      };
      a.Vector.add = function (e, c) {
        return e.map(function (g, l) {
          return g + c[l];
        });
      };
      a.Vector.sub = function (e, c) {
        return e.map(function (g, l) {
          return g - c[l];
        });
      };
      a.Vector.dist = function (e, c) {
        return a.Vector.length(a.Vector.sub(e, c));
      };
      a.Vector.normalize = function (e) {
        return a.Vector.mulScalar(e, 1 / a.Vector.length(e));
      };
      a.Vector.cross = function (e, c) {
        return [
          e[1] * c[2] - e[2] * c[1],
          e[2] * c[0] - e[0] * c[2],
          e[0] * c[1] - e[1] * c[0],
        ];
      };
      a.M44 = {};
      a.M44.identity = function () {
        return d(4);
      };
      a.M44.translated = function (e) {
        return b(e, d(4), 4, 3, 0);
      };
      a.M44.scaled = function (e) {
        return b(e, d(4), 4, 0, 1);
      };
      a.M44.rotated = function (e, c) {
        return a.M44.rotatedUnitSinCos(
          a.Vector.normalize(e),
          Math.sin(c),
          Math.cos(c)
        );
      };
      a.M44.rotatedUnitSinCos = function (e, c, g) {
        var l = e[0],
          r = e[1];
        e = e[2];
        var y = 1 - g;
        return [
          y * l * l + g,
          y * l * r - c * e,
          y * l * e + c * r,
          0,
          y * l * r + c * e,
          y * r * r + g,
          y * r * e - c * l,
          0,
          y * l * e - c * r,
          y * r * e + c * l,
          y * e * e + g,
          0,
          0,
          0,
          0,
          1,
        ];
      };
      a.M44.lookat = function (e, c, g) {
        c = a.Vector.normalize(a.Vector.sub(c, e));
        g = a.Vector.normalize(g);
        g = a.Vector.normalize(a.Vector.cross(c, g));
        var l = a.M44.identity();
        b(g, l, 4, 0, 0);
        b(a.Vector.cross(g, c), l, 4, 1, 0);
        b(a.Vector.mulScalar(c, -1), l, 4, 2, 0);
        b(e, l, 4, 3, 0);
        e = a.M44.invert(l);
        return null === e ? a.M44.identity() : e;
      };
      a.M44.perspective = function (e, c, g) {
        var l = 1 / (c - e);
        g /= 2;
        g = Math.cos(g) / Math.sin(g);
        return [
          g,
          0,
          0,
          0,
          0,
          g,
          0,
          0,
          0,
          0,
          (c + e) * l,
          2 * c * e * l,
          0,
          0,
          -1,
          1,
        ];
      };
      a.M44.rc = function (e, c, g) {
        return e[4 * c + g];
      };
      a.M44.multiply = function () {
        return hb(4, arguments);
      };
      a.M44.invert = function (e) {
        var c = e[0],
          g = e[4],
          l = e[8],
          r = e[12],
          y = e[1],
          C = e[5],
          J = e[9],
          Q = e[13],
          O = e[2],
          W = e[6],
          t = e[10],
          F = e[14],
          P = e[3],
          X = e[7],
          ia = e[11];
        e = e[15];
        var la = c * C - g * y,
          qa = c * J - l * y,
          sa = c * Q - r * y,
          ba = g * J - l * C,
          H = g * Q - r * C,
          k = l * Q - r * J,
          p = O * X - W * P,
          A = O * ia - t * P,
          B = O * e - F * P,
          E = W * ia - t * X,
          G = W * e - F * X,
          L = t * e - F * ia,
          ca = la * L - qa * G + sa * E + ba * B - H * A + k * p,
          da = 1 / ca;
        if (0 === ca || Infinity === da) return null;
        la *= da;
        qa *= da;
        sa *= da;
        ba *= da;
        H *= da;
        k *= da;
        p *= da;
        A *= da;
        B *= da;
        E *= da;
        G *= da;
        L *= da;
        c = [
          C * L - J * G + Q * E,
          J * B - y * L - Q * A,
          y * G - C * B + Q * p,
          C * A - y * E - J * p,
          l * G - g * L - r * E,
          c * L - l * B + r * A,
          g * B - c * G - r * p,
          c * E - g * A + l * p,
          X * k - ia * H + e * ba,
          ia * sa - P * k - e * qa,
          P * H - X * sa + e * la,
          X * qa - P * ba - ia * la,
          t * H - W * k - F * ba,
          O * k - t * sa + F * qa,
          W * sa - O * H - F * la,
          O * ba - W * qa + t * la,
        ];
        return c.every(function (Ia) {
          return !isNaN(Ia) && Infinity !== Ia && -Infinity !== Ia;
        })
          ? c
          : null;
      };
      a.M44.transpose = function (e) {
        return [
          e[0],
          e[4],
          e[8],
          e[12],
          e[1],
          e[5],
          e[9],
          e[13],
          e[2],
          e[6],
          e[10],
          e[14],
          e[3],
          e[7],
          e[11],
          e[15],
        ];
      };
      a.M44.mustInvert = function (e) {
        e = a.M44.invert(e);
        if (null === e) throw "Matrix not invertible";
        return e;
      };
      a.M44.setupCamera = function (e, c, g) {
        var l = a.M44.lookat(g.eye, g.coa, g.up);
        g = a.M44.perspective(g.near, g.far, g.angle);
        c = [(e[2] - e[0]) / 2, (e[3] - e[1]) / 2, c];
        e = a.M44.multiply(
          a.M44.translated([(e[0] + e[2]) / 2, (e[1] + e[3]) / 2, 0]),
          a.M44.scaled(c)
        );
        return a.M44.multiply(e, g, l, a.M44.mustInvert(e));
      };
      a.ColorMatrix = {};
      a.ColorMatrix.identity = function () {
        var e = new Float32Array(20);
        e[0] = 1;
        e[6] = 1;
        e[12] = 1;
        e[18] = 1;
        return e;
      };
      a.ColorMatrix.scaled = function (e, c, g, l) {
        var r = new Float32Array(20);
        r[0] = e;
        r[6] = c;
        r[12] = g;
        r[18] = l;
        return r;
      };
      var zd = [
        [6, 7, 11, 12],
        [0, 10, 2, 12],
        [0, 1, 5, 6],
      ];
      a.ColorMatrix.rotated = function (e, c, g) {
        var l = a.ColorMatrix.identity();
        e = zd[e];
        l[e[0]] = g;
        l[e[1]] = c;
        l[e[2]] = -c;
        l[e[3]] = g;
        return l;
      };
      a.ColorMatrix.postTranslate = function (e, c, g, l, r) {
        e[4] += c;
        e[9] += g;
        e[14] += l;
        e[19] += r;
        return e;
      };
      a.ColorMatrix.concat = function (e, c) {
        for (var g = new Float32Array(20), l = 0, r = 0; 20 > r; r += 5) {
          for (var y = 0; 4 > y; y++)
            g[l++] =
              e[r] * c[y] +
              e[r + 1] * c[y + 5] +
              e[r + 2] * c[y + 10] +
              e[r + 3] * c[y + 15];
          g[l++] =
            e[r] * c[4] +
            e[r + 1] * c[9] +
            e[r + 2] * c[14] +
            e[r + 3] * c[19] +
            e[r + 4];
        }
        return g;
      };
      (function (e) {
        e.Vd = e.Vd || [];
        e.Vd.push(function () {
          function c(t) {
            if (!t || !t.length) return [];
            for (var F = [], P = 0; P < t.length; P += 5) {
              var X = e.LTRBRect(t[P], t[P + 1], t[P + 2], t[P + 3]);
              X.direction =
                0 === t[P + 4] ? e.TextDirection.RTL : e.TextDirection.LTR;
              F.push(X);
            }
            e._free(t.byteOffset);
            return F;
          }
          function g(t) {
            t = t || {};
            void 0 === t.weight && (t.weight = e.FontWeight.Normal);
            t.width = t.width || e.FontWidth.Normal;
            t.slant = t.slant || e.FontSlant.Upright;
            return t;
          }
          function l(t) {
            if (!t || !t.length) return V;
            for (var F = [], P = 0; P < t.length; P++) {
              var X = r(t[P]);
              F.push(X);
            }
            return v(F, "HEAPU32");
          }
          function r(t) {
            if (J[t]) return J[t];
            var F = oa(t) + 1,
              P = e._malloc(F);
            pa(t, K, P, F);
            return (J[t] = P);
          }
          function y(t) {
            t._colorPtr = z(t.color);
            t._foregroundColorPtr = V;
            t._backgroundColorPtr = V;
            t._decorationColorPtr = V;
            t.foregroundColor &&
              (t._foregroundColorPtr = z(t.foregroundColor, Q));
            t.backgroundColor &&
              (t._backgroundColorPtr = z(t.backgroundColor, O));
            t.decorationColor &&
              (t._decorationColorPtr = z(t.decorationColor, W));
            Array.isArray(t.fontFamilies) && t.fontFamilies.length
              ? ((t._fontFamiliesPtr = l(t.fontFamilies)),
                (t._fontFamiliesLen = t.fontFamilies.length))
              : ((t._fontFamiliesPtr = V), (t._fontFamiliesLen = 0));
            if (t.locale) {
              var F = t.locale;
              t._localePtr = r(F);
              t._localeLen = oa(F) + 1;
            } else (t._localePtr = V), (t._localeLen = 0);
            if (Array.isArray(t.shadows) && t.shadows.length) {
              F = t.shadows;
              var P = F.map(function (ba) {
                  return ba.color || e.BLACK;
                }),
                X = F.map(function (ba) {
                  return ba.blurRadius || 0;
                });
              t._shadowLen = F.length;
              for (
                var ia = e._malloc(8 * F.length), la = ia / 4, qa = 0;
                qa < F.length;
                qa++
              ) {
                var sa = F[qa].offset || [0, 0];
                e.HEAPF32[la] = sa[0];
                e.HEAPF32[la + 1] = sa[1];
                la += 2;
              }
              t._shadowColorsPtr = D(P).ce;
              t._shadowOffsetsPtr = ia;
              t._shadowBlurRadiiPtr = v(X, "HEAPF32");
            } else (t._shadowLen = 0), (t._shadowColorsPtr = V), (t._shadowOffsetsPtr = V), (t._shadowBlurRadiiPtr = V);
            Array.isArray(t.fontFeatures) && t.fontFeatures.length
              ? ((F = t.fontFeatures),
                (P = F.map(function (ba) {
                  return ba.name;
                })),
                (X = F.map(function (ba) {
                  return ba.value;
                })),
                (t._fontFeatureLen = F.length),
                (t._fontFeatureNamesPtr = l(P)),
                (t._fontFeatureValuesPtr = v(X, "HEAPU32")))
              : ((t._fontFeatureLen = 0),
                (t._fontFeatureNamesPtr = V),
                (t._fontFeatureValuesPtr = V));
            Array.isArray(t.fontVariations) && t.fontVariations.length
              ? ((F = t.fontVariations),
                (P = F.map(function (ba) {
                  return ba.axis;
                })),
                (X = F.map(function (ba) {
                  return ba.value;
                })),
                (t._fontVariationLen = F.length),
                (t._fontVariationAxesPtr = l(P)),
                (t._fontVariationValuesPtr = v(X, "HEAPF32")))
              : ((t._fontVariationLen = 0),
                (t._fontVariationAxesPtr = V),
                (t._fontVariationValuesPtr = V));
          }
          function C(t) {
            e._free(t._fontFamiliesPtr);
            e._free(t._shadowColorsPtr);
            e._free(t._shadowOffsetsPtr);
            e._free(t._shadowBlurRadiiPtr);
            e._free(t._fontFeatureNamesPtr);
            e._free(t._fontFeatureValuesPtr);
          }
          e.Paragraph.prototype.getRectsForRange = function (t, F, P, X) {
            t = this._getRectsForRange(t, F, P, X);
            return c(t);
          };
          e.Paragraph.prototype.getRectsForPlaceholders = function () {
            var t = this._getRectsForPlaceholders();
            return c(t);
          };
          e.TypefaceFontProvider.prototype.registerFont = function (t, F) {
            t = e.Typeface.MakeFreeTypeFaceFromData(t);
            if (!t) return null;
            F = r(F);
            this._registerFont(t, F);
          };
          e.ParagraphStyle = function (t) {
            t.disableHinting = t.disableHinting || !1;
            if (t.ellipsis) {
              var F = t.ellipsis;
              t._ellipsisPtr = r(F);
              t._ellipsisLen = oa(F) + 1;
            } else (t._ellipsisPtr = V), (t._ellipsisLen = 0);
            null == t.heightMultiplier && (t.heightMultiplier = -1);
            t.maxLines = t.maxLines || 0;
            t.replaceTabCharacters = t.replaceTabCharacters || !1;
            F = (F = t.strutStyle) || {};
            F.strutEnabled = F.strutEnabled || !1;
            F.strutEnabled &&
            Array.isArray(F.fontFamilies) &&
            F.fontFamilies.length
              ? ((F._fontFamiliesPtr = l(F.fontFamilies)),
                (F._fontFamiliesLen = F.fontFamilies.length))
              : ((F._fontFamiliesPtr = V), (F._fontFamiliesLen = 0));
            F.fontStyle = g(F.fontStyle);
            null == F.fontSize && (F.fontSize = -1);
            null == F.heightMultiplier && (F.heightMultiplier = -1);
            F.halfLeading = F.halfLeading || !1;
            F.leading = F.leading || 0;
            F.forceStrutHeight = F.forceStrutHeight || !1;
            t.strutStyle = F;
            t.textAlign = t.textAlign || e.TextAlign.Start;
            t.textDirection = t.textDirection || e.TextDirection.LTR;
            t.textHeightBehavior =
              t.textHeightBehavior || e.TextHeightBehavior.All;
            t.textStyle = e.TextStyle(t.textStyle);
            return t;
          };
          e.TextStyle = function (t) {
            t.color || (t.color = e.BLACK);
            t.decoration = t.decoration || 0;
            t.decorationThickness = t.decorationThickness || 0;
            t.decorationStyle = t.decorationStyle || e.DecorationStyle.Solid;
            t.textBaseline = t.textBaseline || e.TextBaseline.Alphabetic;
            null == t.fontSize && (t.fontSize = -1);
            t.letterSpacing = t.letterSpacing || 0;
            t.wordSpacing = t.wordSpacing || 0;
            null == t.heightMultiplier && (t.heightMultiplier = -1);
            t.halfLeading = t.halfLeading || !1;
            t.fontStyle = g(t.fontStyle);
            return t;
          };
          var J = {},
            Q = e._malloc(16),
            O = e._malloc(16),
            W = e._malloc(16);
          e.ParagraphBuilder.Make = function (t, F) {
            y(t.textStyle);
            F = e.ParagraphBuilder._Make(t, F);
            C(t.textStyle);
            return F;
          };
          e.ParagraphBuilder.MakeFromFontProvider = function (t, F) {
            y(t.textStyle);
            F = e.ParagraphBuilder._MakeFromFontProvider(t, F);
            C(t.textStyle);
            return F;
          };
          e.ParagraphBuilder.ShapeText = function (t, F, P) {
            let X = 0;
            for (const ia of F) X += ia.length;
            if (X !== t.length)
              throw "Accumulated block lengths must equal text.length";
            return e.ParagraphBuilder._ShapeText(t, F, P);
          };
          e.ParagraphBuilder.prototype.pushStyle = function (t) {
            y(t);
            this._pushStyle(t);
            C(t);
          };
          e.ParagraphBuilder.prototype.pushPaintStyle = function (t, F, P) {
            y(t);
            this._pushPaintStyle(t, F, P);
            C(t);
          };
          e.ParagraphBuilder.prototype.addPlaceholder = function (
            t,
            F,
            P,
            X,
            ia
          ) {
            P = P || e.PlaceholderAlignment.Baseline;
            X = X || e.TextBaseline.Alphabetic;
            this._addPlaceholder(t || 0, F || 0, P, X, ia || 0);
          };
          e.ParagraphBuilder.prototype.buildWithClientInfo = function (
            t,
            F,
            P,
            X
          ) {
            var ia = v(t, "HEAPU32"),
              la = v(F, "HEAPU32"),
              qa = v(P, "HEAPU32"),
              sa = v(X, "HEAPU32"),
              ba = this._buildWithClientInfo(
                ia,
                (t && t.length) || 0,
                la,
                (F && F.length) || 0,
                qa,
                (P && P.length) || 0,
                sa,
                (X && X.length) || 0
              );
            q(ia, t);
            q(la, F);
            q(qa, P);
            q(sa, X);
            return ba;
          };
        });
      })(w);
      a.Vd = a.Vd || [];
      a.Vd.push(function () {
        a.Path.prototype.op = function (e, c) {
          return this._op(e, c) ? this : null;
        };
        a.Path.prototype.simplify = function () {
          return this._simplify() ? this : null;
        };
      });
      a.Vd = a.Vd || [];
      a.Vd.push(function () {
        a.Canvas.prototype.drawText = function (e, c, g, l, r) {
          var y = oa(e),
            C = a._malloc(y + 1);
          pa(e, K, C, y + 1);
          this._drawSimpleText(C, y, c, g, r, l);
          a._free(C);
        };
        a.Canvas.prototype.drawGlyphs = function (e, c, g, l, r, y) {
          if (!(2 * e.length <= c.length))
            throw "Not enough positions for the array of gyphs";
          a.Od(this.Md);
          const C = v(e, "HEAPU16"),
            J = v(c, "HEAPF32");
          this._drawGlyphs(e.length, C, J, g, l, r, y);
          q(J, c);
          q(C, e);
        };
        a.Font.prototype.getGlyphBounds = function (e, c, g) {
          var l = v(e, "HEAPU16"),
            r = a._malloc(16 * e.length);
          this._getGlyphWidthBounds(l, e.length, V, r, c || null);
          c = new Float32Array(a.HEAPU8.buffer, r, 4 * e.length);
          q(l, e);
          if (g) return g.set(c), a._free(r), g;
          e = Float32Array.from(c);
          a._free(r);
          return e;
        };
        a.Font.prototype.getGlyphIDs = function (e, c, g) {
          c || (c = e.length);
          var l = oa(e) + 1,
            r = a._malloc(l);
          pa(e, K, r, l);
          e = a._malloc(2 * c);
          c = this._getGlyphIDs(r, l - 1, c, e);
          a._free(r);
          if (0 > c) return a._free(e), null;
          r = new Uint16Array(a.HEAPU8.buffer, e, c);
          if (g) return g.set(r), a._free(e), g;
          g = Uint16Array.from(r);
          a._free(e);
          return g;
        };
        a.Font.prototype.getGlyphIntercepts = function (e, c, g, l) {
          var r = v(e, "HEAPU16"),
            y = v(c, "HEAPF32");
          return this._getGlyphIntercepts(
            r,
            e.length,
            !(e && e._ck),
            y,
            c.length,
            !(c && c._ck),
            g,
            l
          );
        };
        a.Font.prototype.getGlyphWidths = function (e, c, g) {
          var l = v(e, "HEAPU16"),
            r = a._malloc(4 * e.length);
          this._getGlyphWidthBounds(l, e.length, r, V, c || null);
          c = new Float32Array(a.HEAPU8.buffer, r, e.length);
          q(l, e);
          if (g) return g.set(c), a._free(r), g;
          e = Float32Array.from(c);
          a._free(r);
          return e;
        };
        a.FontMgr.FromData = function () {
          if (!arguments.length) return null;
          var e = arguments;
          1 === e.length && Array.isArray(e[0]) && (e = arguments[0]);
          if (!e.length) return null;
          for (var c = [], g = [], l = 0; l < e.length; l++) {
            var r = new Uint8Array(e[l]),
              y = v(r, "HEAPU8");
            c.push(y);
            g.push(r.byteLength);
          }
          c = v(c, "HEAPU32");
          g = v(g, "HEAPU32");
          e = a.FontMgr._fromData(c, g, e.length);
          a._free(c);
          a._free(g);
          return e;
        };
        a.Typeface.MakeFreeTypeFaceFromData = function (e) {
          e = new Uint8Array(e);
          var c = v(e, "HEAPU8");
          return (e = a.Typeface._MakeFreeTypeFaceFromData(c, e.byteLength))
            ? e
            : null;
        };
        a.Typeface.prototype.getGlyphIDs = function (e, c, g) {
          c || (c = e.length);
          var l = oa(e) + 1,
            r = a._malloc(l);
          pa(e, K, r, l);
          e = a._malloc(2 * c);
          c = this._getGlyphIDs(r, l - 1, c, e);
          a._free(r);
          if (0 > c) return a._free(e), null;
          r = new Uint16Array(a.HEAPU8.buffer, e, c);
          if (g) return g.set(r), a._free(e), g;
          g = Uint16Array.from(r);
          a._free(e);
          return g;
        };
        a.TextBlob.MakeOnPath = function (e, c, g, l) {
          if (e && e.length && c && c.countPoints()) {
            if (1 === c.countPoints()) return this.MakeFromText(e, g);
            l || (l = 0);
            var r = g.getGlyphIDs(e);
            r = g.getGlyphWidths(r);
            var y = [];
            c = new a.ContourMeasureIter(c, !1, 1);
            for (
              var C = c.next(), J = new Float32Array(4), Q = 0;
              Q < e.length && C;
              Q++
            ) {
              var O = r[Q];
              l += O / 2;
              if (l > C.length()) {
                C.delete();
                C = c.next();
                if (!C) {
                  e = e.substring(0, Q);
                  break;
                }
                l = O / 2;
              }
              C.getPosTan(l, J);
              var W = J[2],
                t = J[3];
              y.push(W, t, J[0] - (O / 2) * W, J[1] - (O / 2) * t);
              l += O / 2;
            }
            e = this.MakeFromRSXform(e, y, g);
            C && C.delete();
            c.delete();
            return e;
          }
        };
        a.TextBlob.MakeFromRSXform = function (e, c, g) {
          var l = oa(e) + 1,
            r = a._malloc(l);
          pa(e, K, r, l);
          e = v(c, "HEAPF32");
          g = a.TextBlob._MakeFromRSXform(r, l - 1, e, g);
          a._free(r);
          return g ? g : null;
        };
        a.TextBlob.MakeFromRSXformGlyphs = function (e, c, g) {
          var l = v(e, "HEAPU16");
          c = v(c, "HEAPF32");
          g = a.TextBlob._MakeFromRSXformGlyphs(l, 2 * e.length, c, g);
          q(l, e);
          return g ? g : null;
        };
        a.TextBlob.MakeFromGlyphs = function (e, c) {
          var g = v(e, "HEAPU16");
          c = a.TextBlob._MakeFromGlyphs(g, 2 * e.length, c);
          q(g, e);
          return c ? c : null;
        };
        a.TextBlob.MakeFromText = function (e, c) {
          var g = oa(e) + 1,
            l = a._malloc(g);
          pa(e, K, l, g);
          e = a.TextBlob._MakeFromText(l, g - 1, c);
          a._free(l);
          return e ? e : null;
        };
        a.MallocGlyphIDs = function (e) {
          return a.Malloc(Uint16Array, e);
        };
      });
      a.Vd = a.Vd || [];
      a.Vd.push(function () {
        a.MakePicture = function (e) {
          e = new Uint8Array(e);
          var c = a._malloc(e.byteLength);
          a.HEAPU8.set(e, c);
          return (e = a._MakePicture(c, e.byteLength)) ? e : null;
        };
      });
      (function () {
        function e(H) {
          for (var k = 0; k < H.length; k++)
            if (void 0 !== H[k] && !Number.isFinite(H[k])) return !1;
          return !0;
        }
        function c(H) {
          var k = a.getColorComponents(H);
          H = k[0];
          var p = k[1],
            A = k[2];
          k = k[3];
          if (1 === k)
            return (
              (H = H.toString(16).toLowerCase()),
              (p = p.toString(16).toLowerCase()),
              (A = A.toString(16).toLowerCase()),
              (H = 1 === H.length ? "0" + H : H),
              (p = 1 === p.length ? "0" + p : p),
              (A = 1 === A.length ? "0" + A : A),
              "#" + H + p + A
            );
          k = 0 === k || 1 === k ? k : k.toFixed(8);
          return "rgba(" + H + ", " + p + ", " + A + ", " + k + ")";
        }
        function g(H) {
          return a.parseColorString(H, qa);
        }
        function l(H) {
          H = sa.exec(H);
          if (!H) return null;
          var k = parseFloat(H[4]),
            p = 16;
          switch (H[5]) {
            case "em":
            case "rem":
              p = 16 * k;
              break;
            case "pt":
              p = (4 * k) / 3;
              break;
            case "px":
              p = k;
              break;
            case "pc":
              p = 16 * k;
              break;
            case "in":
              p = 96 * k;
              break;
            case "cm":
              p = (96 * k) / 2.54;
              break;
            case "mm":
              p = (96 / 25.4) * k;
              break;
            case "q":
              p = (96 / 25.4 / 4) * k;
              break;
            case "%":
              p = (16 / 75) * k;
          }
          return {
            style: H[1],
            variant: H[2],
            weight: H[3],
            sizePx: p,
            family: H[6].trim(),
          };
        }
        function r(H) {
          this.Nd = H;
          this.Qd = new a.Paint();
          this.Qd.setAntiAlias(!0);
          this.Qd.setStrokeMiter(10);
          this.Qd.setStrokeCap(a.StrokeCap.Butt);
          this.Qd.setStrokeJoin(a.StrokeJoin.Miter);
          this.Qe = "10px monospace";
          this.ne = new a.Font(null, 10);
          this.ne.setSubpixel(!0);
          this.be = this.he = a.BLACK;
          this.we = 0;
          this.Je = a.TRANSPARENT;
          this.ye = this.xe = 0;
          this.Ke = this.ke = 1;
          this.Ie = 0;
          this.ve = [];
          this.Pd = a.BlendMode.SrcOver;
          this.Qd.setStrokeWidth(this.Ke);
          this.Qd.setBlendMode(this.Pd);
          this.Sd = new a.Path();
          this.Ud = a.Matrix.identity();
          this.mf = [];
          this.Ce = [];
          this.me = function () {
            this.Sd.delete();
            this.Qd.delete();
            this.ne.delete();
            this.Ce.forEach(function (k) {
              k.me();
            });
          };
          Object.defineProperty(this, "currentTransform", {
            enumerable: !0,
            get: function () {
              return {
                a: this.Ud[0],
                c: this.Ud[1],
                e: this.Ud[2],
                b: this.Ud[3],
                d: this.Ud[4],
                f: this.Ud[5],
              };
            },
            set: function (k) {
              k.a && this.setTransform(k.a, k.b, k.c, k.d, k.e, k.f);
            },
          });
          Object.defineProperty(this, "fillStyle", {
            enumerable: !0,
            get: function () {
              return f(this.be) ? c(this.be) : this.be;
            },
            set: function (k) {
              "string" === typeof k ? (this.be = g(k)) : k.ue && (this.be = k);
            },
          });
          Object.defineProperty(this, "font", {
            enumerable: !0,
            get: function () {
              return this.Qe;
            },
            set: function (k) {
              var p = l(k),
                A = p.family;
              p.typeface = ba[A]
                ? ba[A][
                    (p.style || "normal") +
                      "|" +
                      (p.variant || "normal") +
                      "|" +
                      (p.weight || "normal")
                  ] || ba[A]["*"]
                : null;
              p &&
                (this.ne.setSize(p.sizePx),
                this.ne.setTypeface(p.typeface),
                (this.Qe = k));
            },
          });
          Object.defineProperty(this, "globalAlpha", {
            enumerable: !0,
            get: function () {
              return this.ke;
            },
            set: function (k) {
              !isFinite(k) || 0 > k || 1 < k || (this.ke = k);
            },
          });
          Object.defineProperty(this, "globalCompositeOperation", {
            enumerable: !0,
            get: function () {
              switch (this.Pd) {
                case a.BlendMode.SrcOver:
                  return "source-over";
                case a.BlendMode.DstOver:
                  return "destination-over";
                case a.BlendMode.Src:
                  return "copy";
                case a.BlendMode.Dst:
                  return "destination";
                case a.BlendMode.Clear:
                  return "clear";
                case a.BlendMode.SrcIn:
                  return "source-in";
                case a.BlendMode.DstIn:
                  return "destination-in";
                case a.BlendMode.SrcOut:
                  return "source-out";
                case a.BlendMode.DstOut:
                  return "destination-out";
                case a.BlendMode.SrcATop:
                  return "source-atop";
                case a.BlendMode.DstATop:
                  return "destination-atop";
                case a.BlendMode.Xor:
                  return "xor";
                case a.BlendMode.Plus:
                  return "lighter";
                case a.BlendMode.Multiply:
                  return "multiply";
                case a.BlendMode.Screen:
                  return "screen";
                case a.BlendMode.Overlay:
                  return "overlay";
                case a.BlendMode.Darken:
                  return "darken";
                case a.BlendMode.Lighten:
                  return "lighten";
                case a.BlendMode.ColorDodge:
                  return "color-dodge";
                case a.BlendMode.ColorBurn:
                  return "color-burn";
                case a.BlendMode.HardLight:
                  return "hard-light";
                case a.BlendMode.SoftLight:
                  return "soft-light";
                case a.BlendMode.Difference:
                  return "difference";
                case a.BlendMode.Exclusion:
                  return "exclusion";
                case a.BlendMode.Hue:
                  return "hue";
                case a.BlendMode.Saturation:
                  return "saturation";
                case a.BlendMode.Color:
                  return "color";
                case a.BlendMode.Luminosity:
                  return "luminosity";
              }
            },
            set: function (k) {
              switch (k) {
                case "source-over":
                  this.Pd = a.BlendMode.SrcOver;
                  break;
                case "destination-over":
                  this.Pd = a.BlendMode.DstOver;
                  break;
                case "copy":
                  this.Pd = a.BlendMode.Src;
                  break;
                case "destination":
                  this.Pd = a.BlendMode.Dst;
                  break;
                case "clear":
                  this.Pd = a.BlendMode.Clear;
                  break;
                case "source-in":
                  this.Pd = a.BlendMode.SrcIn;
                  break;
                case "destination-in":
                  this.Pd = a.BlendMode.DstIn;
                  break;
                case "source-out":
                  this.Pd = a.BlendMode.SrcOut;
                  break;
                case "destination-out":
                  this.Pd = a.BlendMode.DstOut;
                  break;
                case "source-atop":
                  this.Pd = a.BlendMode.SrcATop;
                  break;
                case "destination-atop":
                  this.Pd = a.BlendMode.DstATop;
                  break;
                case "xor":
                  this.Pd = a.BlendMode.Xor;
                  break;
                case "lighter":
                  this.Pd = a.BlendMode.Plus;
                  break;
                case "plus-lighter":
                  this.Pd = a.BlendMode.Plus;
                  break;
                case "plus-darker":
                  throw "plus-darker is not supported";
                case "multiply":
                  this.Pd = a.BlendMode.Multiply;
                  break;
                case "screen":
                  this.Pd = a.BlendMode.Screen;
                  break;
                case "overlay":
                  this.Pd = a.BlendMode.Overlay;
                  break;
                case "darken":
                  this.Pd = a.BlendMode.Darken;
                  break;
                case "lighten":
                  this.Pd = a.BlendMode.Lighten;
                  break;
                case "color-dodge":
                  this.Pd = a.BlendMode.ColorDodge;
                  break;
                case "color-burn":
                  this.Pd = a.BlendMode.ColorBurn;
                  break;
                case "hard-light":
                  this.Pd = a.BlendMode.HardLight;
                  break;
                case "soft-light":
                  this.Pd = a.BlendMode.SoftLight;
                  break;
                case "difference":
                  this.Pd = a.BlendMode.Difference;
                  break;
                case "exclusion":
                  this.Pd = a.BlendMode.Exclusion;
                  break;
                case "hue":
                  this.Pd = a.BlendMode.Hue;
                  break;
                case "saturation":
                  this.Pd = a.BlendMode.Saturation;
                  break;
                case "color":
                  this.Pd = a.BlendMode.Color;
                  break;
                case "luminosity":
                  this.Pd = a.BlendMode.Luminosity;
                  break;
                default:
                  return;
              }
              this.Qd.setBlendMode(this.Pd);
            },
          });
          Object.defineProperty(this, "imageSmoothingEnabled", {
            enumerable: !0,
            get: function () {
              return !0;
            },
            set: function () {},
          });
          Object.defineProperty(this, "imageSmoothingQuality", {
            enumerable: !0,
            get: function () {
              return "high";
            },
            set: function () {},
          });
          Object.defineProperty(this, "lineCap", {
            enumerable: !0,
            get: function () {
              switch (this.Qd.getStrokeCap()) {
                case a.StrokeCap.Butt:
                  return "butt";
                case a.StrokeCap.Round:
                  return "round";
                case a.StrokeCap.Square:
                  return "square";
              }
            },
            set: function (k) {
              switch (k) {
                case "butt":
                  this.Qd.setStrokeCap(a.StrokeCap.Butt);
                  break;
                case "round":
                  this.Qd.setStrokeCap(a.StrokeCap.Round);
                  break;
                case "square":
                  this.Qd.setStrokeCap(a.StrokeCap.Square);
              }
            },
          });
          Object.defineProperty(this, "lineDashOffset", {
            enumerable: !0,
            get: function () {
              return this.Ie;
            },
            set: function (k) {
              isFinite(k) && (this.Ie = k);
            },
          });
          Object.defineProperty(this, "lineJoin", {
            enumerable: !0,
            get: function () {
              switch (this.Qd.getStrokeJoin()) {
                case a.StrokeJoin.Miter:
                  return "miter";
                case a.StrokeJoin.Round:
                  return "round";
                case a.StrokeJoin.Bevel:
                  return "bevel";
              }
            },
            set: function (k) {
              switch (k) {
                case "miter":
                  this.Qd.setStrokeJoin(a.StrokeJoin.Miter);
                  break;
                case "round":
                  this.Qd.setStrokeJoin(a.StrokeJoin.Round);
                  break;
                case "bevel":
                  this.Qd.setStrokeJoin(a.StrokeJoin.Bevel);
              }
            },
          });
          Object.defineProperty(this, "lineWidth", {
            enumerable: !0,
            get: function () {
              return this.Qd.getStrokeWidth();
            },
            set: function (k) {
              0 >= k || !k || ((this.Ke = k), this.Qd.setStrokeWidth(k));
            },
          });
          Object.defineProperty(this, "miterLimit", {
            enumerable: !0,
            get: function () {
              return this.Qd.getStrokeMiter();
            },
            set: function (k) {
              0 >= k || !k || this.Qd.setStrokeMiter(k);
            },
          });
          Object.defineProperty(this, "shadowBlur", {
            enumerable: !0,
            get: function () {
              return this.we;
            },
            set: function (k) {
              0 > k || !isFinite(k) || (this.we = k);
            },
          });
          Object.defineProperty(this, "shadowColor", {
            enumerable: !0,
            get: function () {
              return c(this.Je);
            },
            set: function (k) {
              this.Je = g(k);
            },
          });
          Object.defineProperty(this, "shadowOffsetX", {
            enumerable: !0,
            get: function () {
              return this.xe;
            },
            set: function (k) {
              isFinite(k) && (this.xe = k);
            },
          });
          Object.defineProperty(this, "shadowOffsetY", {
            enumerable: !0,
            get: function () {
              return this.ye;
            },
            set: function (k) {
              isFinite(k) && (this.ye = k);
            },
          });
          Object.defineProperty(this, "strokeStyle", {
            enumerable: !0,
            get: function () {
              return c(this.he);
            },
            set: function (k) {
              "string" === typeof k ? (this.he = g(k)) : k.ue && (this.he = k);
            },
          });
          this.arc = function (k, p, A, B, E, G) {
            F(this.Sd, k, p, A, A, 0, B, E, G);
          };
          this.arcTo = function (k, p, A, B, E) {
            O(this.Sd, k, p, A, B, E);
          };
          this.beginPath = function () {
            this.Sd.delete();
            this.Sd = new a.Path();
          };
          this.bezierCurveTo = function (k, p, A, B, E, G) {
            var L = this.Sd;
            e([k, p, A, B, E, G]) &&
              (L.isEmpty() && L.moveTo(k, p), L.cubicTo(k, p, A, B, E, G));
          };
          this.clearRect = function (k, p, A, B) {
            this.Qd.setStyle(a.PaintStyle.Fill);
            this.Qd.setBlendMode(a.BlendMode.Clear);
            this.Nd.drawRect(a.XYWHRect(k, p, A, B), this.Qd);
            this.Qd.setBlendMode(this.Pd);
          };
          this.clip = function (k, p) {
            "string" === typeof k
              ? ((p = k), (k = this.Sd))
              : k && k.Ze && (k = k.Wd);
            k || (k = this.Sd);
            k = k.copy();
            p && "evenodd" === p.toLowerCase()
              ? k.setFillType(a.FillType.EvenOdd)
              : k.setFillType(a.FillType.Winding);
            this.Nd.clipPath(k, a.ClipOp.Intersect, !0);
            k.delete();
          };
          this.closePath = function () {
            W(this.Sd);
          };
          this.createImageData = function () {
            if (1 === arguments.length) {
              var k = arguments[0];
              return new J(
                new Uint8ClampedArray(4 * k.width * k.height),
                k.width,
                k.height
              );
            }
            if (2 === arguments.length) {
              k = arguments[0];
              var p = arguments[1];
              return new J(new Uint8ClampedArray(4 * k * p), k, p);
            }
            throw (
              "createImageData expects 1 or 2 arguments, got " +
              arguments.length
            );
          };
          this.createLinearGradient = function (k, p, A, B) {
            if (e(arguments)) {
              var E = new Q(k, p, A, B);
              this.Ce.push(E);
              return E;
            }
          };
          this.createPattern = function (k, p) {
            k = new ia(k, p);
            this.Ce.push(k);
            return k;
          };
          this.createRadialGradient = function (k, p, A, B, E, G) {
            if (e(arguments)) {
              var L = new la(k, p, A, B, E, G);
              this.Ce.push(L);
              return L;
            }
          };
          this.drawImage = function (k) {
            k instanceof C && (k = k.tf());
            var p = this.Pe();
            if (3 === arguments.length || 5 === arguments.length)
              var A = a.XYWHRect(
                  arguments[1],
                  arguments[2],
                  arguments[3] || k.width(),
                  arguments[4] || k.height()
                ),
                B = a.XYWHRect(0, 0, k.width(), k.height());
            else if (9 === arguments.length)
              (A = a.XYWHRect(
                arguments[5],
                arguments[6],
                arguments[7],
                arguments[8]
              )),
                (B = a.XYWHRect(
                  arguments[1],
                  arguments[2],
                  arguments[3],
                  arguments[4]
                ));
            else
              throw (
                "invalid number of args for drawImage, need 3, 5, or 9; got " +
                arguments.length
              );
            this.Nd.drawImageRect(k, B, A, p, !1);
            p.dispose();
          };
          this.ellipse = function (k, p, A, B, E, G, L, ca) {
            F(this.Sd, k, p, A, B, E, G, L, ca);
          };
          this.Pe = function () {
            var k = this.Qd.copy();
            k.setStyle(a.PaintStyle.Fill);
            if (f(this.be)) {
              var p = a.multiplyByAlpha(this.be, this.ke);
              k.setColor(p);
            } else
              (p = this.be.ue(this.Ud)),
                k.setColor(a.Color(0, 0, 0, this.ke)),
                k.setShader(p);
            k.dispose = function () {
              this.delete();
            };
            return k;
          };
          this.fill = function (k, p) {
            "string" === typeof k
              ? ((p = k), (k = this.Sd))
              : k && k.Ze && (k = k.Wd);
            if ("evenodd" === p) this.Sd.setFillType(a.FillType.EvenOdd);
            else {
              if ("nonzero" !== p && p) throw "invalid fill rule";
              this.Sd.setFillType(a.FillType.Winding);
            }
            k || (k = this.Sd);
            p = this.Pe();
            var A = this.ze(p);
            A &&
              (this.Nd.save(),
              this.se(),
              this.Nd.drawPath(k, A),
              this.Nd.restore(),
              A.dispose());
            this.Nd.drawPath(k, p);
            p.dispose();
          };
          this.fillRect = function (k, p, A, B) {
            var E = this.Pe(),
              G = this.ze(E);
            G &&
              (this.Nd.save(),
              this.se(),
              this.Nd.drawRect(a.XYWHRect(k, p, A, B), G),
              this.Nd.restore(),
              G.dispose());
            this.Nd.drawRect(a.XYWHRect(k, p, A, B), E);
            E.dispose();
          };
          this.fillText = function (k, p, A) {
            var B = this.Pe();
            k = a.TextBlob.MakeFromText(k, this.ne);
            var E = this.ze(B);
            E &&
              (this.Nd.save(),
              this.se(),
              this.Nd.drawTextBlob(k, p, A, E),
              this.Nd.restore(),
              E.dispose());
            this.Nd.drawTextBlob(k, p, A, B);
            k.delete();
            B.dispose();
          };
          this.getImageData = function (k, p, A, B) {
            return (k = this.Nd.readPixels(k, p, {
              width: A,
              height: B,
              colorType: a.ColorType.RGBA_8888,
              alphaType: a.AlphaType.Unpremul,
              colorSpace: a.ColorSpace.SRGB,
            }))
              ? new J(new Uint8ClampedArray(k.buffer), A, B)
              : null;
          };
          this.getLineDash = function () {
            return this.ve.slice();
          };
          this.nf = function (k) {
            var p = a.Matrix.invert(this.Ud);
            a.Matrix.mapPoints(p, k);
            return k;
          };
          this.isPointInPath = function (k, p, A) {
            var B = arguments;
            if (3 === B.length) var E = this.Sd;
            else if (4 === B.length)
              (E = B[0]), (k = B[1]), (p = B[2]), (A = B[3]);
            else throw "invalid arg count, need 3 or 4, got " + B.length;
            if (!isFinite(k) || !isFinite(p)) return !1;
            A = A || "nonzero";
            if ("nonzero" !== A && "evenodd" !== A) return !1;
            B = this.nf([k, p]);
            k = B[0];
            p = B[1];
            E.setFillType(
              "nonzero" === A ? a.FillType.Winding : a.FillType.EvenOdd
            );
            return E.contains(k, p);
          };
          this.isPointInStroke = function (k, p) {
            var A = arguments;
            if (2 === A.length) var B = this.Sd;
            else if (3 === A.length) (B = A[0]), (k = A[1]), (p = A[2]);
            else throw "invalid arg count, need 2 or 3, got " + A.length;
            if (!isFinite(k) || !isFinite(p)) return !1;
            A = this.nf([k, p]);
            k = A[0];
            p = A[1];
            B = B.copy();
            B.setFillType(a.FillType.Winding);
            B.stroke({
              width: this.lineWidth,
              miter_limit: this.miterLimit,
              cap: this.Qd.getStrokeCap(),
              join: this.Qd.getStrokeJoin(),
              precision: 0.3,
            });
            A = B.contains(k, p);
            B.delete();
            return A;
          };
          this.lineTo = function (k, p) {
            P(this.Sd, k, p);
          };
          this.measureText = function (k) {
            k = this.ne.getGlyphIDs(k);
            k = this.ne.getGlyphWidths(k);
            let p = 0;
            for (const A of k) p += A;
            return { width: p };
          };
          this.moveTo = function (k, p) {
            var A = this.Sd;
            e([k, p]) && A.moveTo(k, p);
          };
          this.putImageData = function (k, p, A, B, E, G, L) {
            if (e([p, A, B, E, G, L]))
              if (void 0 === B)
                this.Nd.writePixels(k.data, k.width, k.height, p, A);
              else if (
                ((B = B || 0),
                (E = E || 0),
                (G = G || k.width),
                (L = L || k.height),
                0 > G && ((B += G), (G = Math.abs(G))),
                0 > L && ((E += L), (L = Math.abs(L))),
                0 > B && ((G += B), (B = 0)),
                0 > E && ((L += E), (E = 0)),
                !(0 >= G || 0 >= L))
              ) {
                k = a.MakeImage(
                  {
                    width: k.width,
                    height: k.height,
                    alphaType: a.AlphaType.Unpremul,
                    colorType: a.ColorType.RGBA_8888,
                    colorSpace: a.ColorSpace.SRGB,
                  },
                  k.data,
                  4 * k.width
                );
                var ca = a.XYWHRect(B, E, G, L);
                p = a.XYWHRect(p + B, A + E, G, L);
                A = a.Matrix.invert(this.Ud);
                this.Nd.save();
                this.Nd.concat(A);
                this.Nd.drawImageRect(k, ca, p, null, !1);
                this.Nd.restore();
                k.delete();
              }
          };
          this.quadraticCurveTo = function (k, p, A, B) {
            var E = this.Sd;
            e([k, p, A, B]) &&
              (E.isEmpty() && E.moveTo(k, p), E.quadTo(k, p, A, B));
          };
          this.rect = function (k, p, A, B) {
            var E = this.Sd;
            k = a.XYWHRect(k, p, A, B);
            e(k) && E.addRect(k);
          };
          this.resetTransform = function () {
            this.Sd.transform(this.Ud);
            var k = a.Matrix.invert(this.Ud);
            this.Nd.concat(k);
            this.Ud = this.Nd.getTotalMatrix();
          };
          this.restore = function () {
            var k = this.mf.pop();
            if (k) {
              var p = a.Matrix.multiply(this.Ud, a.Matrix.invert(k.Gf));
              this.Sd.transform(p);
              this.Qd.delete();
              this.Qd = k.$f;
              this.ve = k.Yf;
              this.Ke = k.mg;
              this.he = k.lg;
              this.be = k.fs;
              this.xe = k.jg;
              this.ye = k.kg;
              this.we = k.dg;
              this.Je = k.ig;
              this.ke = k.Nf;
              this.Pd = k.Of;
              this.Ie = k.Zf;
              this.Qe = k.Mf;
              this.Nd.restore();
              this.Ud = this.Nd.getTotalMatrix();
            }
          };
          this.rotate = function (k) {
            if (isFinite(k)) {
              var p = a.Matrix.rotated(-k);
              this.Sd.transform(p);
              this.Nd.rotate((k / Math.PI) * 180, 0, 0);
              this.Ud = this.Nd.getTotalMatrix();
            }
          };
          this.save = function () {
            if (this.be.te) {
              var k = this.be.te();
              this.Ce.push(k);
            } else k = this.be;
            if (this.he.te) {
              var p = this.he.te();
              this.Ce.push(p);
            } else p = this.he;
            this.mf.push({
              Gf: this.Ud.slice(),
              Yf: this.ve.slice(),
              mg: this.Ke,
              lg: p,
              fs: k,
              jg: this.xe,
              kg: this.ye,
              dg: this.we,
              ig: this.Je,
              Nf: this.ke,
              Zf: this.Ie,
              Of: this.Pd,
              $f: this.Qd.copy(),
              Mf: this.Qe,
            });
            this.Nd.save();
          };
          this.scale = function (k, p) {
            if (e(arguments)) {
              var A = a.Matrix.scaled(1 / k, 1 / p);
              this.Sd.transform(A);
              this.Nd.scale(k, p);
              this.Ud = this.Nd.getTotalMatrix();
            }
          };
          this.setLineDash = function (k) {
            for (var p = 0; p < k.length; p++)
              if (!isFinite(k[p]) || 0 > k[p]) return;
            1 === k.length % 2 && Array.prototype.push.apply(k, k);
            this.ve = k;
          };
          this.setTransform = function (k, p, A, B, E, G) {
            e(arguments) &&
              (this.resetTransform(), this.transform(k, p, A, B, E, G));
          };
          this.se = function () {
            var k = a.Matrix.invert(this.Ud);
            this.Nd.concat(k);
            this.Nd.concat(a.Matrix.translated(this.xe, this.ye));
            this.Nd.concat(this.Ud);
          };
          this.ze = function (k) {
            var p = a.multiplyByAlpha(this.Je, this.ke);
            if (!a.getColorComponents(p)[3] || !(this.we || this.ye || this.xe))
              return null;
            k = k.copy();
            k.setColor(p);
            var A = a.MaskFilter.MakeBlur(a.BlurStyle.Normal, this.we / 2, !1);
            k.setMaskFilter(A);
            k.dispose = function () {
              A.delete();
              this.delete();
            };
            return k;
          };
          this.af = function () {
            var k = this.Qd.copy();
            k.setStyle(a.PaintStyle.Stroke);
            if (f(this.he)) {
              var p = a.multiplyByAlpha(this.he, this.ke);
              k.setColor(p);
            } else
              (p = this.he.ue(this.Ud)),
                k.setColor(a.Color(0, 0, 0, this.ke)),
                k.setShader(p);
            k.setStrokeWidth(this.Ke);
            if (this.ve.length) {
              var A = a.PathEffect.MakeDash(this.ve, this.Ie);
              k.setPathEffect(A);
            }
            k.dispose = function () {
              A && A.delete();
              this.delete();
            };
            return k;
          };
          this.stroke = function (k) {
            k = k ? k.Wd : this.Sd;
            var p = this.af(),
              A = this.ze(p);
            A &&
              (this.Nd.save(),
              this.se(),
              this.Nd.drawPath(k, A),
              this.Nd.restore(),
              A.dispose());
            this.Nd.drawPath(k, p);
            p.dispose();
          };
          this.strokeRect = function (k, p, A, B) {
            var E = this.af(),
              G = this.ze(E);
            G &&
              (this.Nd.save(),
              this.se(),
              this.Nd.drawRect(a.XYWHRect(k, p, A, B), G),
              this.Nd.restore(),
              G.dispose());
            this.Nd.drawRect(a.XYWHRect(k, p, A, B), E);
            E.dispose();
          };
          this.strokeText = function (k, p, A) {
            var B = this.af();
            k = a.TextBlob.MakeFromText(k, this.ne);
            var E = this.ze(B);
            E &&
              (this.Nd.save(),
              this.se(),
              this.Nd.drawTextBlob(k, p, A, E),
              this.Nd.restore(),
              E.dispose());
            this.Nd.drawTextBlob(k, p, A, B);
            k.delete();
            B.dispose();
          };
          this.translate = function (k, p) {
            if (e(arguments)) {
              var A = a.Matrix.translated(-k, -p);
              this.Sd.transform(A);
              this.Nd.translate(k, p);
              this.Ud = this.Nd.getTotalMatrix();
            }
          };
          this.transform = function (k, p, A, B, E, G) {
            k = [k, A, E, p, B, G, 0, 0, 1];
            p = a.Matrix.invert(k);
            this.Sd.transform(p);
            this.Nd.concat(k);
            this.Ud = this.Nd.getTotalMatrix();
          };
          this.addHitRegion = function () {};
          this.clearHitRegions = function () {};
          this.drawFocusIfNeeded = function () {};
          this.removeHitRegion = function () {};
          this.scrollPathIntoView = function () {};
          Object.defineProperty(this, "canvas", { value: null, writable: !1 });
        }
        function y(H) {
          this.bf = H;
          this.Md = new r(H.getCanvas());
          this.Re = [];
          this.decodeImage = function (k) {
            k = a.MakeImageFromEncoded(k);
            if (!k) throw "Invalid input";
            this.Re.push(k);
            return new C(k);
          };
          this.loadFont = function (k, p) {
            k = a.Typeface.MakeFreeTypeFaceFromData(k);
            if (!k) return null;
            this.Re.push(k);
            var A =
              (p.style || "normal") +
              "|" +
              (p.variant || "normal") +
              "|" +
              (p.weight || "normal");
            p = p.family;
            ba[p] || (ba[p] = { "*": k });
            ba[p][A] = k;
          };
          this.makePath2D = function (k) {
            k = new X(k);
            this.Re.push(k.Wd);
            return k;
          };
          this.getContext = function (k) {
            return "2d" === k ? this.Md : null;
          };
          this.toDataURL = function (k, p) {
            this.bf.flush();
            var A = this.bf.makeImageSnapshot();
            if (A) {
              k = k || "image/png";
              var B = a.ImageFormat.PNG;
              "image/jpeg" === k && (B = a.ImageFormat.JPEG);
              if ((p = A.encodeToBytes(B, p || 0.92))) {
                A.delete();
                k = "data:" + k + ";base64,";
                if ("undefined" !== typeof Buffer)
                  p = Buffer.from(p).toString("base64");
                else {
                  A = 0;
                  B = p.length;
                  for (var E = "", G; A < B; )
                    (G = p.slice(A, Math.min(A + 32768, B))),
                      (E += String.fromCharCode.apply(null, G)),
                      (A += 32768);
                  p = btoa(E);
                }
                return k + p;
              }
            }
          };
          this.dispose = function () {
            this.Md.me();
            this.Re.forEach(function (k) {
              k.delete();
            });
            this.bf.dispose();
          };
        }
        function C(H) {
          this.width = H.width();
          this.height = H.height();
          this.naturalWidth = this.width;
          this.naturalHeight = this.height;
          this.tf = function () {
            return H;
          };
        }
        function J(H, k, p) {
          if (!k || 0 === p)
            throw "invalid dimensions, width and height must be non-zero";
          if (H.length % 4) throw "arr must be a multiple of 4";
          p = p || H.length / (4 * k);
          Object.defineProperty(this, "data", { value: H, writable: !1 });
          Object.defineProperty(this, "height", { value: p, writable: !1 });
          Object.defineProperty(this, "width", { value: k, writable: !1 });
        }
        function Q(H, k, p, A) {
          this.Yd = null;
          this.de = [];
          this.ae = [];
          this.addColorStop = function (B, E) {
            if (0 > B || 1 < B || !isFinite(B))
              throw "offset must be between 0 and 1 inclusively";
            E = g(E);
            var G = this.ae.indexOf(B);
            if (-1 !== G) this.de[G] = E;
            else {
              for (G = 0; G < this.ae.length && !(this.ae[G] > B); G++);
              this.ae.splice(G, 0, B);
              this.de.splice(G, 0, E);
            }
          };
          this.te = function () {
            var B = new Q(H, k, p, A);
            B.de = this.de.slice();
            B.ae = this.ae.slice();
            return B;
          };
          this.me = function () {
            this.Yd && (this.Yd.delete(), (this.Yd = null));
          };
          this.ue = function (B) {
            var E = [H, k, p, A];
            a.Matrix.mapPoints(B, E);
            B = E[0];
            var G = E[1],
              L = E[2];
            E = E[3];
            this.me();
            return (this.Yd = a.Shader.MakeLinearGradient(
              [B, G],
              [L, E],
              this.de,
              this.ae,
              a.TileMode.Clamp
            ));
          };
        }
        function O(H, k, p, A, B, E) {
          if (e([k, p, A, B, E])) {
            if (0 > E) throw "radii cannot be negative";
            H.isEmpty() && H.moveTo(k, p);
            H.arcToTangent(k, p, A, B, E);
          }
        }
        function W(H) {
          if (!H.isEmpty()) {
            var k = H.getBounds();
            (k[3] - k[1] || k[2] - k[0]) && H.close();
          }
        }
        function t(H, k, p, A, B, E, G) {
          G = ((G - E) / Math.PI) * 180;
          E = (E / Math.PI) * 180;
          k = a.LTRBRect(k - A, p - B, k + A, p + B);
          1e-5 > Math.abs(Math.abs(G) - 360)
            ? ((p = G / 2),
              H.arcToOval(k, E, p, !1),
              H.arcToOval(k, E + p, p, !1))
            : H.arcToOval(k, E, G, !1);
        }
        function F(H, k, p, A, B, E, G, L, ca) {
          if (e([k, p, A, B, E, G, L])) {
            if (0 > A || 0 > B) throw "radii cannot be negative";
            var da = 2 * Math.PI,
              Ia = G % da;
            0 > Ia && (Ia += da);
            var bb = Ia - G;
            G = Ia;
            L += bb;
            !ca && L - G >= da
              ? (L = G + da)
              : ca && G - L >= da
              ? (L = G - da)
              : !ca && G > L
              ? (L = G + (da - ((G - L) % da)))
              : ca && G < L && (L = G - (da - ((L - G) % da)));
            E
              ? ((ca = a.Matrix.rotated(E, k, p)),
                (E = a.Matrix.rotated(-E, k, p)),
                H.transform(E),
                t(H, k, p, A, B, G, L),
                H.transform(ca))
              : t(H, k, p, A, B, G, L);
          }
        }
        function P(H, k, p) {
          e([k, p]) && (H.isEmpty() && H.moveTo(k, p), H.lineTo(k, p));
        }
        function X(H) {
          this.Wd = null;
          this.Wd =
            "string" === typeof H
              ? a.Path.MakeFromSVGString(H)
              : H && H.Ze
              ? H.Wd.copy()
              : new a.Path();
          this.Ze = function () {
            return this.Wd;
          };
          this.addPath = function (k, p) {
            p || (p = { a: 1, c: 0, e: 0, b: 0, d: 1, f: 0 });
            this.Wd.addPath(k.Wd, [p.a, p.c, p.e, p.b, p.d, p.f]);
          };
          this.arc = function (k, p, A, B, E, G) {
            F(this.Wd, k, p, A, A, 0, B, E, G);
          };
          this.arcTo = function (k, p, A, B, E) {
            O(this.Wd, k, p, A, B, E);
          };
          this.bezierCurveTo = function (k, p, A, B, E, G) {
            var L = this.Wd;
            e([k, p, A, B, E, G]) &&
              (L.isEmpty() && L.moveTo(k, p), L.cubicTo(k, p, A, B, E, G));
          };
          this.closePath = function () {
            W(this.Wd);
          };
          this.ellipse = function (k, p, A, B, E, G, L, ca) {
            F(this.Wd, k, p, A, B, E, G, L, ca);
          };
          this.lineTo = function (k, p) {
            P(this.Wd, k, p);
          };
          this.moveTo = function (k, p) {
            var A = this.Wd;
            e([k, p]) && A.moveTo(k, p);
          };
          this.quadraticCurveTo = function (k, p, A, B) {
            var E = this.Wd;
            e([k, p, A, B]) &&
              (E.isEmpty() && E.moveTo(k, p), E.quadTo(k, p, A, B));
          };
          this.rect = function (k, p, A, B) {
            var E = this.Wd;
            k = a.XYWHRect(k, p, A, B);
            e(k) && E.addRect(k);
          };
        }
        function ia(H, k) {
          this.Yd = null;
          H instanceof C && (H = H.tf());
          this.Bf = H;
          this._transform = a.Matrix.identity();
          "" === k && (k = "repeat");
          switch (k) {
            case "repeat-x":
              this.Ae = a.TileMode.Repeat;
              this.Be = a.TileMode.Decal;
              break;
            case "repeat-y":
              this.Ae = a.TileMode.Decal;
              this.Be = a.TileMode.Repeat;
              break;
            case "repeat":
              this.Be = this.Ae = a.TileMode.Repeat;
              break;
            case "no-repeat":
              this.Be = this.Ae = a.TileMode.Decal;
              break;
            default:
              throw "invalid repetition mode " + k;
          }
          this.setTransform = function (p) {
            p = [p.a, p.c, p.e, p.b, p.d, p.f, 0, 0, 1];
            e(p) && (this._transform = p);
          };
          this.te = function () {
            var p = new ia();
            p.Ae = this.Ae;
            p.Be = this.Be;
            return p;
          };
          this.me = function () {
            this.Yd && (this.Yd.delete(), (this.Yd = null));
          };
          this.ue = function () {
            this.me();
            return (this.Yd = this.Bf.makeShaderCubic(
              this.Ae,
              this.Be,
              1 / 3,
              1 / 3,
              this._transform
            ));
          };
        }
        function la(H, k, p, A, B, E) {
          this.Yd = null;
          this.de = [];
          this.ae = [];
          this.addColorStop = function (G, L) {
            if (0 > G || 1 < G || !isFinite(G))
              throw "offset must be between 0 and 1 inclusively";
            L = g(L);
            var ca = this.ae.indexOf(G);
            if (-1 !== ca) this.de[ca] = L;
            else {
              for (ca = 0; ca < this.ae.length && !(this.ae[ca] > G); ca++);
              this.ae.splice(ca, 0, G);
              this.de.splice(ca, 0, L);
            }
          };
          this.te = function () {
            var G = new la(H, k, p, A, B, E);
            G.de = this.de.slice();
            G.ae = this.ae.slice();
            return G;
          };
          this.me = function () {
            this.Yd && (this.Yd.delete(), (this.Yd = null));
          };
          this.ue = function (G) {
            var L = [H, k, A, B];
            a.Matrix.mapPoints(G, L);
            var ca = L[0],
              da = L[1],
              Ia = L[2];
            L = L[3];
            var bb = (Math.abs(G[0]) + Math.abs(G[4])) / 2;
            G = p * bb;
            bb *= E;
            this.me();
            return (this.Yd = a.Shader.MakeTwoPointConicalGradient(
              [ca, da],
              G,
              [Ia, L],
              bb,
              this.de,
              this.ae,
              a.TileMode.Clamp
            ));
          };
        }
        a._testing = {};
        var qa = {
          aliceblue: Float32Array.of(0.941, 0.973, 1, 1),
          antiquewhite: Float32Array.of(0.98, 0.922, 0.843, 1),
          aqua: Float32Array.of(0, 1, 1, 1),
          aquamarine: Float32Array.of(0.498, 1, 0.831, 1),
          azure: Float32Array.of(0.941, 1, 1, 1),
          beige: Float32Array.of(0.961, 0.961, 0.863, 1),
          bisque: Float32Array.of(1, 0.894, 0.769, 1),
          black: Float32Array.of(0, 0, 0, 1),
          blanchedalmond: Float32Array.of(1, 0.922, 0.804, 1),
          blue: Float32Array.of(0, 0, 1, 1),
          blueviolet: Float32Array.of(0.541, 0.169, 0.886, 1),
          brown: Float32Array.of(0.647, 0.165, 0.165, 1),
          burlywood: Float32Array.of(0.871, 0.722, 0.529, 1),
          cadetblue: Float32Array.of(0.373, 0.62, 0.627, 1),
          chartreuse: Float32Array.of(0.498, 1, 0, 1),
          chocolate: Float32Array.of(0.824, 0.412, 0.118, 1),
          coral: Float32Array.of(1, 0.498, 0.314, 1),
          cornflowerblue: Float32Array.of(0.392, 0.584, 0.929, 1),
          cornsilk: Float32Array.of(1, 0.973, 0.863, 1),
          crimson: Float32Array.of(0.863, 0.078, 0.235, 1),
          cyan: Float32Array.of(0, 1, 1, 1),
          darkblue: Float32Array.of(0, 0, 0.545, 1),
          darkcyan: Float32Array.of(0, 0.545, 0.545, 1),
          darkgoldenrod: Float32Array.of(0.722, 0.525, 0.043, 1),
          darkgray: Float32Array.of(0.663, 0.663, 0.663, 1),
          darkgreen: Float32Array.of(0, 0.392, 0, 1),
          darkgrey: Float32Array.of(0.663, 0.663, 0.663, 1),
          darkkhaki: Float32Array.of(0.741, 0.718, 0.42, 1),
          darkmagenta: Float32Array.of(0.545, 0, 0.545, 1),
          darkolivegreen: Float32Array.of(0.333, 0.42, 0.184, 1),
          darkorange: Float32Array.of(1, 0.549, 0, 1),
          darkorchid: Float32Array.of(0.6, 0.196, 0.8, 1),
          darkred: Float32Array.of(0.545, 0, 0, 1),
          darksalmon: Float32Array.of(0.914, 0.588, 0.478, 1),
          darkseagreen: Float32Array.of(0.561, 0.737, 0.561, 1),
          darkslateblue: Float32Array.of(0.282, 0.239, 0.545, 1),
          darkslategray: Float32Array.of(0.184, 0.31, 0.31, 1),
          darkslategrey: Float32Array.of(0.184, 0.31, 0.31, 1),
          darkturquoise: Float32Array.of(0, 0.808, 0.82, 1),
          darkviolet: Float32Array.of(0.58, 0, 0.827, 1),
          deeppink: Float32Array.of(1, 0.078, 0.576, 1),
          deepskyblue: Float32Array.of(0, 0.749, 1, 1),
          dimgray: Float32Array.of(0.412, 0.412, 0.412, 1),
          dimgrey: Float32Array.of(0.412, 0.412, 0.412, 1),
          dodgerblue: Float32Array.of(0.118, 0.565, 1, 1),
          firebrick: Float32Array.of(0.698, 0.133, 0.133, 1),
          floralwhite: Float32Array.of(1, 0.98, 0.941, 1),
          forestgreen: Float32Array.of(0.133, 0.545, 0.133, 1),
          fuchsia: Float32Array.of(1, 0, 1, 1),
          gainsboro: Float32Array.of(0.863, 0.863, 0.863, 1),
          ghostwhite: Float32Array.of(0.973, 0.973, 1, 1),
          gold: Float32Array.of(1, 0.843, 0, 1),
          goldenrod: Float32Array.of(0.855, 0.647, 0.125, 1),
          gray: Float32Array.of(0.502, 0.502, 0.502, 1),
          green: Float32Array.of(0, 0.502, 0, 1),
          greenyellow: Float32Array.of(0.678, 1, 0.184, 1),
          grey: Float32Array.of(0.502, 0.502, 0.502, 1),
          honeydew: Float32Array.of(0.941, 1, 0.941, 1),
          hotpink: Float32Array.of(1, 0.412, 0.706, 1),
          indianred: Float32Array.of(0.804, 0.361, 0.361, 1),
          indigo: Float32Array.of(0.294, 0, 0.51, 1),
          ivory: Float32Array.of(1, 1, 0.941, 1),
          khaki: Float32Array.of(0.941, 0.902, 0.549, 1),
          lavender: Float32Array.of(0.902, 0.902, 0.98, 1),
          lavenderblush: Float32Array.of(1, 0.941, 0.961, 1),
          lawngreen: Float32Array.of(0.486, 0.988, 0, 1),
          lemonchiffon: Float32Array.of(1, 0.98, 0.804, 1),
          lightblue: Float32Array.of(0.678, 0.847, 0.902, 1),
          lightcoral: Float32Array.of(0.941, 0.502, 0.502, 1),
          lightcyan: Float32Array.of(0.878, 1, 1, 1),
          lightgoldenrodyellow: Float32Array.of(0.98, 0.98, 0.824, 1),
          lightgray: Float32Array.of(0.827, 0.827, 0.827, 1),
          lightgreen: Float32Array.of(0.565, 0.933, 0.565, 1),
          lightgrey: Float32Array.of(0.827, 0.827, 0.827, 1),
          lightpink: Float32Array.of(1, 0.714, 0.757, 1),
          lightsalmon: Float32Array.of(1, 0.627, 0.478, 1),
          lightseagreen: Float32Array.of(0.125, 0.698, 0.667, 1),
          lightskyblue: Float32Array.of(0.529, 0.808, 0.98, 1),
          lightslategray: Float32Array.of(0.467, 0.533, 0.6, 1),
          lightslategrey: Float32Array.of(0.467, 0.533, 0.6, 1),
          lightsteelblue: Float32Array.of(0.69, 0.769, 0.871, 1),
          lightyellow: Float32Array.of(1, 1, 0.878, 1),
          lime: Float32Array.of(0, 1, 0, 1),
          limegreen: Float32Array.of(0.196, 0.804, 0.196, 1),
          linen: Float32Array.of(0.98, 0.941, 0.902, 1),
          magenta: Float32Array.of(1, 0, 1, 1),
          maroon: Float32Array.of(0.502, 0, 0, 1),
          mediumaquamarine: Float32Array.of(0.4, 0.804, 0.667, 1),
          mediumblue: Float32Array.of(0, 0, 0.804, 1),
          mediumorchid: Float32Array.of(0.729, 0.333, 0.827, 1),
          mediumpurple: Float32Array.of(0.576, 0.439, 0.859, 1),
          mediumseagreen: Float32Array.of(0.235, 0.702, 0.443, 1),
          mediumslateblue: Float32Array.of(0.482, 0.408, 0.933, 1),
          mediumspringgreen: Float32Array.of(0, 0.98, 0.604, 1),
          mediumturquoise: Float32Array.of(0.282, 0.82, 0.8, 1),
          mediumvioletred: Float32Array.of(0.78, 0.082, 0.522, 1),
          midnightblue: Float32Array.of(0.098, 0.098, 0.439, 1),
          mintcream: Float32Array.of(0.961, 1, 0.98, 1),
          mistyrose: Float32Array.of(1, 0.894, 0.882, 1),
          moccasin: Float32Array.of(1, 0.894, 0.71, 1),
          navajowhite: Float32Array.of(1, 0.871, 0.678, 1),
          navy: Float32Array.of(0, 0, 0.502, 1),
          oldlace: Float32Array.of(0.992, 0.961, 0.902, 1),
          olive: Float32Array.of(0.502, 0.502, 0, 1),
          olivedrab: Float32Array.of(0.42, 0.557, 0.137, 1),
          orange: Float32Array.of(1, 0.647, 0, 1),
          orangered: Float32Array.of(1, 0.271, 0, 1),
          orchid: Float32Array.of(0.855, 0.439, 0.839, 1),
          palegoldenrod: Float32Array.of(0.933, 0.91, 0.667, 1),
          palegreen: Float32Array.of(0.596, 0.984, 0.596, 1),
          paleturquoise: Float32Array.of(0.686, 0.933, 0.933, 1),
          palevioletred: Float32Array.of(0.859, 0.439, 0.576, 1),
          papayawhip: Float32Array.of(1, 0.937, 0.835, 1),
          peachpuff: Float32Array.of(1, 0.855, 0.725, 1),
          peru: Float32Array.of(0.804, 0.522, 0.247, 1),
          pink: Float32Array.of(1, 0.753, 0.796, 1),
          plum: Float32Array.of(0.867, 0.627, 0.867, 1),
          powderblue: Float32Array.of(0.69, 0.878, 0.902, 1),
          purple: Float32Array.of(0.502, 0, 0.502, 1),
          rebeccapurple: Float32Array.of(0.4, 0.2, 0.6, 1),
          red: Float32Array.of(1, 0, 0, 1),
          rosybrown: Float32Array.of(0.737, 0.561, 0.561, 1),
          royalblue: Float32Array.of(0.255, 0.412, 0.882, 1),
          saddlebrown: Float32Array.of(0.545, 0.271, 0.075, 1),
          salmon: Float32Array.of(0.98, 0.502, 0.447, 1),
          sandybrown: Float32Array.of(0.957, 0.643, 0.376, 1),
          seagreen: Float32Array.of(0.18, 0.545, 0.341, 1),
          seashell: Float32Array.of(1, 0.961, 0.933, 1),
          sienna: Float32Array.of(0.627, 0.322, 0.176, 1),
          silver: Float32Array.of(0.753, 0.753, 0.753, 1),
          skyblue: Float32Array.of(0.529, 0.808, 0.922, 1),
          slateblue: Float32Array.of(0.416, 0.353, 0.804, 1),
          slategray: Float32Array.of(0.439, 0.502, 0.565, 1),
          slategrey: Float32Array.of(0.439, 0.502, 0.565, 1),
          snow: Float32Array.of(1, 0.98, 0.98, 1),
          springgreen: Float32Array.of(0, 1, 0.498, 1),
          steelblue: Float32Array.of(0.275, 0.51, 0.706, 1),
          tan: Float32Array.of(0.824, 0.706, 0.549, 1),
          teal: Float32Array.of(0, 0.502, 0.502, 1),
          thistle: Float32Array.of(0.847, 0.749, 0.847, 1),
          tomato: Float32Array.of(1, 0.388, 0.278, 1),
          transparent: Float32Array.of(0, 0, 0, 0),
          turquoise: Float32Array.of(0.251, 0.878, 0.816, 1),
          violet: Float32Array.of(0.933, 0.51, 0.933, 1),
          wheat: Float32Array.of(0.961, 0.871, 0.702, 1),
          white: Float32Array.of(1, 1, 1, 1),
          whitesmoke: Float32Array.of(0.961, 0.961, 0.961, 1),
          yellow: Float32Array.of(1, 1, 0, 1),
          yellowgreen: Float32Array.of(0.604, 0.804, 0.196, 1),
        };
        a._testing.parseColor = g;
        a._testing.colorToString = c;
        var sa = RegExp(
            "(italic|oblique|normal|)\\s*(small-caps|normal|)\\s*(bold|bolder|lighter|[1-9]00|normal|)\\s*([\\d\\.]+)(px|pt|pc|in|cm|mm|%|em|ex|ch|rem|q)(.+)"
          ),
          ba = { "Noto Mono": { "*": null }, monospace: { "*": null } };
        a._testing.parseFontString = l;
        a.MakeCanvas = function (H, k) {
          return (H = a.MakeSurface(H, k)) ? new y(H) : null;
        };
        a.ImageData = function () {
          if (2 === arguments.length) {
            var H = arguments[0],
              k = arguments[1];
            return new J(new Uint8ClampedArray(4 * H * k), H, k);
          }
          if (3 === arguments.length) {
            var p = arguments[0];
            if (p.prototype.constructor !== Uint8ClampedArray)
              throw "bytes must be given as a Uint8ClampedArray";
            H = arguments[1];
            k = arguments[2];
            if (p % 4) throw "bytes must be given in a multiple of 4";
            if (p % H) throw "bytes must divide evenly by width";
            if (k && k !== p / (4 * H)) throw "invalid height given";
            return new J(p, H, p / (4 * H));
          }
          throw (
            "invalid number of arguments - takes 2 or 3, saw " +
            arguments.length
          );
        };
      })();
    })(w);
    var ta = Object.assign({}, w),
      ua = "./this.program",
      wa = (a, b) => {
        throw b;
      },
      xa = "object" == typeof window,
      ya = "function" == typeof importScripts,
      za =
        "object" == typeof process &&
        "object" == typeof process.versions &&
        "string" == typeof process.versions.node,
      Aa = "",
      Ba,
      Ca,
      Da,
      fs,
      Ea,
      Fa;
    if (za)
      (Aa = ya ? require("path").dirname(Aa) + "/" : __dirname + "/"),
        (Fa = () => {
          Ea || ((fs = require("fs")), (Ea = require("path")));
        }),
        (Ba = function (a, b) {
          Fa();
          a = Ea.normalize(a);
          return fs.readFileSync(a, b ? void 0 : "utf8");
        }),
        (Da = (a) => {
          a = Ba(a, !0);
          a.buffer || (a = new Uint8Array(a));
          return a;
        }),
        (Ca = (a, b, d) => {
          Fa();
          a = Ea.normalize(a);
          fs.readFile(a, function (f, h) {
            f ? d(f) : b(h.buffer);
          });
        }),
        1 < process.argv.length && (ua = process.argv[1].replace(/\\/g, "/")),
        process.argv.slice(2),
        process.on("unhandledRejection", function (a) {
          throw a;
        }),
        (wa = (a, b) => {
          if (noExitRuntime) throw ((process.exitCode = a), b);
          b instanceof Ga || Ja("exiting due to exception: " + b);
          process.exit(a);
        }),
        (w.inspect = function () {
          return "[Emscripten Module object]";
        });
    else if (xa || ya)
      ya
        ? (Aa = self.location.href)
        : "undefined" != typeof document &&
          document.currentScript &&
          (Aa = document.currentScript.src),
        _scriptDir && (Aa = _scriptDir),
        0 !== Aa.indexOf("blob:")
          ? (Aa = Aa.substr(0, Aa.replace(/[?#].*/, "").lastIndexOf("/") + 1))
          : (Aa = ""),
        (Ba = (a) => {
          var b = new XMLHttpRequest();
          b.open("GET", a, !1);
          b.send(null);
          return b.responseText;
        }),
        ya &&
          (Da = (a) => {
            var b = new XMLHttpRequest();
            b.open("GET", a, !1);
            b.responseType = "arraybuffer";
            b.send(null);
            return new Uint8Array(b.response);
          }),
        (Ca = (a, b, d) => {
          var f = new XMLHttpRequest();
          f.open("GET", a, !0);
          f.responseType = "arraybuffer";
          f.onload = () => {
            200 == f.status || (0 == f.status && f.response)
              ? b(f.response)
              : d();
          };
          f.onerror = d;
          f.send(null);
        });
    var Ka = w.print || console.log.bind(console),
      Ja = w.printErr || console.warn.bind(console);
    Object.assign(w, ta);
    ta = null;
    w.thisProgram && (ua = w.thisProgram);
    w.quit && (wa = w.quit);
    var La = 0,
      Ma;
    w.wasmBinary && (Ma = w.wasmBinary);
    var noExitRuntime = w.noExitRuntime || !0;
    "object" != typeof WebAssembly && Na("no native wasm support detected");
    var Qa,
      Ra = !1,
      Sa = "undefined" != typeof TextDecoder ? new TextDecoder("utf8") : void 0;
    function Ta(a, b, d) {
      var f = b + d;
      for (d = b; a[d] && !(d >= f); ) ++d;
      if (16 < d - b && a.buffer && Sa) return Sa.decode(a.subarray(b, d));
      for (f = ""; b < d; ) {
        var h = a[b++];
        if (h & 128) {
          var m = a[b++] & 63;
          if (192 == (h & 224)) f += String.fromCharCode(((h & 31) << 6) | m);
          else {
            var u = a[b++] & 63;
            h =
              224 == (h & 240)
                ? ((h & 15) << 12) | (m << 6) | u
                : ((h & 7) << 18) | (m << 12) | (u << 6) | (a[b++] & 63);
            65536 > h
              ? (f += String.fromCharCode(h))
              : ((h -= 65536),
                (f += String.fromCharCode(
                  55296 | (h >> 10),
                  56320 | (h & 1023)
                )));
          }
        } else f += String.fromCharCode(h);
      }
      return f;
    }
    function Va(a, b) {
      return a ? Ta(K, a, b) : "";
    }
    function pa(a, b, d, f) {
      if (!(0 < f)) return 0;
      var h = d;
      f = d + f - 1;
      for (var m = 0; m < a.length; ++m) {
        var u = a.charCodeAt(m);
        if (55296 <= u && 57343 >= u) {
          var n = a.charCodeAt(++m);
          u = (65536 + ((u & 1023) << 10)) | (n & 1023);
        }
        if (127 >= u) {
          if (d >= f) break;
          b[d++] = u;
        } else {
          if (2047 >= u) {
            if (d + 1 >= f) break;
            b[d++] = 192 | (u >> 6);
          } else {
            if (65535 >= u) {
              if (d + 2 >= f) break;
              b[d++] = 224 | (u >> 12);
            } else {
              if (d + 3 >= f) break;
              b[d++] = 240 | (u >> 18);
              b[d++] = 128 | ((u >> 12) & 63);
            }
            b[d++] = 128 | ((u >> 6) & 63);
          }
          b[d++] = 128 | (u & 63);
        }
      }
      b[d] = 0;
      return d - h;
    }
    function oa(a) {
      for (var b = 0, d = 0; d < a.length; ++d) {
        var f = a.charCodeAt(d);
        55296 <= f &&
          57343 >= f &&
          (f = (65536 + ((f & 1023) << 10)) | (a.charCodeAt(++d) & 1023));
        127 >= f ? ++b : (b = 2047 >= f ? b + 2 : 65535 >= f ? b + 3 : b + 4);
      }
      return b;
    }
    var Wa =
      "undefined" != typeof TextDecoder ? new TextDecoder("utf-16le") : void 0;
    function Xa(a, b) {
      var d = a >> 1;
      for (var f = d + b / 2; !(d >= f) && Ya[d]; ) ++d;
      d <<= 1;
      if (32 < d - a && Wa) return Wa.decode(K.subarray(a, d));
      d = "";
      for (f = 0; !(f >= b / 2); ++f) {
        var h = Za[(a + 2 * f) >> 1];
        if (0 == h) break;
        d += String.fromCharCode(h);
      }
      return d;
    }
    function $a(a, b, d) {
      void 0 === d && (d = 2147483647);
      if (2 > d) return 0;
      d -= 2;
      var f = b;
      d = d < 2 * a.length ? d / 2 : a.length;
      for (var h = 0; h < d; ++h) (Za[b >> 1] = a.charCodeAt(h)), (b += 2);
      Za[b >> 1] = 0;
      return b - f;
    }
    function cb(a) {
      return 2 * a.length;
    }
    function db(a, b) {
      for (var d = 0, f = ""; !(d >= b / 4); ) {
        var h = R[(a + 4 * d) >> 2];
        if (0 == h) break;
        ++d;
        65536 <= h
          ? ((h -= 65536),
            (f += String.fromCharCode(55296 | (h >> 10), 56320 | (h & 1023))))
          : (f += String.fromCharCode(h));
      }
      return f;
    }
    function eb(a, b, d) {
      void 0 === d && (d = 2147483647);
      if (4 > d) return 0;
      var f = b;
      d = f + d - 4;
      for (var h = 0; h < a.length; ++h) {
        var m = a.charCodeAt(h);
        if (55296 <= m && 57343 >= m) {
          var u = a.charCodeAt(++h);
          m = (65536 + ((m & 1023) << 10)) | (u & 1023);
        }
        R[b >> 2] = m;
        b += 4;
        if (b + 4 > d) break;
      }
      R[b >> 2] = 0;
      return b - f;
    }
    function fb(a) {
      for (var b = 0, d = 0; d < a.length; ++d) {
        var f = a.charCodeAt(d);
        55296 <= f && 57343 >= f && ++d;
        b += 4;
      }
      return b;
    }
    var jb, kb, K, Za, Ya, R, lb, S, mb;
    function nb() {
      var a = Qa.buffer;
      jb = a;
      w.HEAP8 = kb = new Int8Array(a);
      w.HEAP16 = Za = new Int16Array(a);
      w.HEAP32 = R = new Int32Array(a);
      w.HEAPU8 = K = new Uint8Array(a);
      w.HEAPU16 = Ya = new Uint16Array(a);
      w.HEAPU32 = lb = new Uint32Array(a);
      w.HEAPF32 = S = new Float32Array(a);
      w.HEAPF64 = mb = new Float64Array(a);
    }
    var ob,
      pb = [],
      qb = [],
      rb = [];
    function sb() {
      var a = w.preRun.shift();
      pb.unshift(a);
    }
    var tb = 0,
      ub = null,
      vb = null;
    function Na(a) {
      if (w.onAbort) w.onAbort(a);
      a = "Aborted(" + a + ")";
      Ja(a);
      Ra = !0;
      a = new WebAssembly.RuntimeError(
        a + ". Build with -sASSERTIONS for more info."
      );
      ea(a);
      throw a;
    }
    function wb() {
      return yb.startsWith("data:application/octet-stream;base64,");
    }
    var yb;
    yb = "canvaskit.wasm";
    if (!wb()) {
      var zb = yb;
      yb = w.locateFile ? w.locateFile(zb, Aa) : Aa + zb;
    }
    function Ab() {
      var a = yb;
      try {
        if (a == yb && Ma) return new Uint8Array(Ma);
        if (Da) return Da(a);
        throw "both async and sync fetching of the wasm failed";
      } catch (b) {
        Na(b);
      }
    }
    function Bb() {
      if (!Ma && (xa || ya)) {
        if ("function" == typeof fetch && !yb.startsWith("file://"))
          return fetch(yb, { credentials: "same-origin" })
            .then(function (a) {
              if (!a.ok)
                throw "failed to load wasm binary file at '" + yb + "'";
              return a.arrayBuffer();
            })
            .catch(function () {
              return Ab();
            });
        if (Ca)
          return new Promise(function (a, b) {
            Ca(
              yb,
              function (d) {
                a(new Uint8Array(d));
              },
              b
            );
          });
      }
      return Promise.resolve().then(function () {
        return Ab();
      });
    }
    function Cb(a) {
      for (; 0 < a.length; ) a.shift()(w);
    }
    function Db(a) {
      return ob.get(a);
    }
    var Eb = {};
    function Fb(a) {
      for (; a.length; ) {
        var b = a.pop();
        a.pop()(b);
      }
    }
    function Gb(a) {
      return this.fromWireType(R[a >> 2]);
    }
    var Hb = {},
      Ib = {},
      Jb = {};
    function Kb(a) {
      if (void 0 === a) return "_unknown";
      a = a.replace(/[^a-zA-Z0-9_]/g, "$");
      var b = a.charCodeAt(0);
      return 48 <= b && 57 >= b ? "_" + a : a;
    }
    function Lb(a, b) {
      a = Kb(a);
      return function () {
        null;
        return b.apply(this, arguments);
      };
    }
    function Mb(a) {
      var b = Error,
        d = Lb(a, function (f) {
          this.name = a;
          this.message = f;
          f = Error(f).stack;
          void 0 !== f &&
            (this.stack =
              this.toString() + "\n" + f.replace(/^Error(:[^\n]*)?\n/, ""));
        });
      d.prototype = Object.create(b.prototype);
      d.prototype.constructor = d;
      d.prototype.toString = function () {
        return void 0 === this.message
          ? this.name
          : this.name + ": " + this.message;
      };
      return d;
    }
    var Nb = void 0;
    function Ob(a) {
      throw new Nb(a);
    }
    function Pb(a, b, d) {
      function f(n) {
        n = d(n);
        n.length !== a.length && Ob("Mismatched type converter count");
        for (var q = 0; q < a.length; ++q) Qb(a[q], n[q]);
      }
      a.forEach(function (n) {
        Jb[n] = b;
      });
      var h = Array(b.length),
        m = [],
        u = 0;
      b.forEach((n, q) => {
        Ib.hasOwnProperty(n)
          ? (h[q] = Ib[n])
          : (m.push(n),
            Hb.hasOwnProperty(n) || (Hb[n] = []),
            Hb[n].push(() => {
              h[q] = Ib[n];
              ++u;
              u === m.length && f(h);
            }));
      });
      0 === m.length && f(h);
    }
    function Rb(a) {
      switch (a) {
        case 1:
          return 0;
        case 2:
          return 1;
        case 4:
          return 2;
        case 8:
          return 3;
        default:
          throw new TypeError("Unknown type size: " + a);
      }
    }
    var Sb = void 0;
    function Tb(a) {
      for (var b = ""; K[a]; ) b += Sb[K[a++]];
      return b;
    }
    var ac = void 0;
    function Y(a) {
      throw new ac(a);
    }
    function Qb(a, b, d = {}) {
      if (!("argPackAdvance" in b))
        throw new TypeError(
          "registerType registeredInstance requires argPackAdvance"
        );
      var f = b.name;
      a || Y('type "' + f + '" must have a positive integer typeid pointer');
      if (Ib.hasOwnProperty(a)) {
        if (d.Vf) return;
        Y("Cannot register type '" + f + "' twice");
      }
      Ib[a] = b;
      delete Jb[a];
      Hb.hasOwnProperty(a) &&
        ((b = Hb[a]), delete Hb[a], b.forEach((h) => h()));
    }
    function bc(a) {
      Y(a.Ld.Xd.Rd.name + " instance already deleted");
    }
    var cc = !1;
    function dc() {}
    function ec(a) {
      --a.count.value;
      0 === a.count.value && (a.$d ? a.fe.le(a.$d) : a.Xd.Rd.le(a.Td));
    }
    function fc(a, b, d) {
      if (b === d) return a;
      if (void 0 === d.ie) return null;
      a = fc(a, b, d.ie);
      return null === a ? null : d.Jf(a);
    }
    var gc = {},
      hc = [];
    function ic() {
      for (; hc.length; ) {
        var a = hc.pop();
        a.Ld.Fe = !1;
        a["delete"]();
      }
    }
    var jc = void 0,
      kc = {};
    function lc(a, b) {
      for (void 0 === b && Y("ptr should not be undefined"); a.ie; )
        (b = a.Oe(b)), (a = a.ie);
      return kc[b];
    }
    function mc(a, b) {
      (b.Xd && b.Td) || Ob("makeClassHandle requires ptr and ptrType");
      !!b.fe !== !!b.$d &&
        Ob("Both smartPtrType and smartPtr must be specified");
      b.count = { value: 1 };
      return nc(Object.create(a, { Ld: { value: b } }));
    }
    function nc(a) {
      if ("undefined" === typeof FinalizationRegistry)
        return (nc = (b) => b), a;
      cc = new FinalizationRegistry((b) => {
        ec(b.Ld);
      });
      nc = (b) => {
        var d = b.Ld;
        d.$d && cc.register(b, { Ld: d }, b);
        return b;
      };
      dc = (b) => {
        cc.unregister(b);
      };
      return nc(a);
    }
    function oc() {}
    function pc(a, b, d) {
      if (void 0 === a[b].Zd) {
        var f = a[b];
        a[b] = function () {
          a[b].Zd.hasOwnProperty(arguments.length) ||
            Y(
              "Function '" +
                d +
                "' called with an invalid number of arguments (" +
                arguments.length +
                ") - expects one of (" +
                a[b].Zd +
                ")!"
            );
          return a[b].Zd[arguments.length].apply(this, arguments);
        };
        a[b].Zd = [];
        a[b].Zd[f.De] = f;
      }
    }
    function qc(a, b, d) {
      w.hasOwnProperty(a)
        ? ((void 0 === d || (void 0 !== w[a].Zd && void 0 !== w[a].Zd[d])) &&
            Y("Cannot register public name '" + a + "' twice"),
          pc(w, a, a),
          w.hasOwnProperty(d) &&
            Y(
              "Cannot register multiple overloads of a function with the same number of arguments (" +
                d +
                ")!"
            ),
          (w[a].Zd[d] = b))
        : ((w[a] = b), void 0 !== d && (w[a].tg = d));
    }
    function rc(a, b, d, f, h, m, u, n) {
      this.name = a;
      this.constructor = b;
      this.Ge = d;
      this.le = f;
      this.ie = h;
      this.Pf = m;
      this.Oe = u;
      this.Jf = n;
      this.bg = [];
    }
    function sc(a, b, d) {
      for (; b !== d; )
        b.Oe ||
          Y(
            "Expected null or instance of " +
              d.name +
              ", got an instance of " +
              b.name
          ),
          (a = b.Oe(a)),
          (b = b.ie);
      return a;
    }
    function tc(a, b) {
      if (null === b)
        return this.ff && Y("null is not a valid " + this.name), 0;
      b.Ld || Y('Cannot pass "' + uc(b) + '" as a ' + this.name);
      b.Ld.Td ||
        Y("Cannot pass deleted object as a pointer of type " + this.name);
      return sc(b.Ld.Td, b.Ld.Xd.Rd, this.Rd);
    }
    function vc(a, b) {
      if (null === b) {
        this.ff && Y("null is not a valid " + this.name);
        if (this.Te) {
          var d = this.gf();
          null !== a && a.push(this.le, d);
          return d;
        }
        return 0;
      }
      b.Ld || Y('Cannot pass "' + uc(b) + '" as a ' + this.name);
      b.Ld.Td ||
        Y("Cannot pass deleted object as a pointer of type " + this.name);
      !this.Se &&
        b.Ld.Xd.Se &&
        Y(
          "Cannot convert argument of type " +
            (b.Ld.fe ? b.Ld.fe.name : b.Ld.Xd.name) +
            " to parameter type " +
            this.name
        );
      d = sc(b.Ld.Td, b.Ld.Xd.Rd, this.Rd);
      if (this.Te)
        switch (
          (void 0 === b.Ld.$d &&
            Y("Passing raw pointer to smart pointer is illegal"),
          this.hg)
        ) {
          case 0:
            b.Ld.fe === this
              ? (d = b.Ld.$d)
              : Y(
                  "Cannot convert argument of type " +
                    (b.Ld.fe ? b.Ld.fe.name : b.Ld.Xd.name) +
                    " to parameter type " +
                    this.name
                );
            break;
          case 1:
            d = b.Ld.$d;
            break;
          case 2:
            if (b.Ld.fe === this) d = b.Ld.$d;
            else {
              var f = b.clone();
              d = this.cg(
                d,
                wc(function () {
                  f["delete"]();
                })
              );
              null !== a && a.push(this.le, d);
            }
            break;
          default:
            Y("Unsupporting sharing policy");
        }
      return d;
    }
    function xc(a, b) {
      if (null === b)
        return this.ff && Y("null is not a valid " + this.name), 0;
      b.Ld || Y('Cannot pass "' + uc(b) + '" as a ' + this.name);
      b.Ld.Td ||
        Y("Cannot pass deleted object as a pointer of type " + this.name);
      b.Ld.Xd.Se &&
        Y(
          "Cannot convert argument of type " +
            b.Ld.Xd.name +
            " to parameter type " +
            this.name
        );
      return sc(b.Ld.Td, b.Ld.Xd.Rd, this.Rd);
    }
    function yc(a, b, d, f, h, m, u, n, q, v, D) {
      this.name = a;
      this.Rd = b;
      this.ff = d;
      this.Se = f;
      this.Te = h;
      this.ag = m;
      this.hg = u;
      this.vf = n;
      this.gf = q;
      this.cg = v;
      this.le = D;
      h || void 0 !== b.ie
        ? (this.toWireType = vc)
        : ((this.toWireType = f ? tc : xc), (this.ee = null));
    }
    function zc(a, b, d) {
      w.hasOwnProperty(a) || Ob("Replacing nonexistant public symbol");
      void 0 !== w[a].Zd && void 0 !== d
        ? (w[a].Zd[d] = b)
        : ((w[a] = b), (w[a].De = d));
    }
    function Ac(a, b) {
      var d = [];
      return function () {
        d.length = 0;
        Object.assign(d, arguments);
        if (a.includes("j")) {
          var f = w["dynCall_" + a];
          f = d && d.length ? f.apply(null, [b].concat(d)) : f.call(null, b);
        } else f = Db(b).apply(null, d);
        return f;
      };
    }
    function Bc(a, b) {
      a = Tb(a);
      var d = a.includes("j") ? Ac(a, b) : Db(b);
      "function" != typeof d &&
        Y("unknown function pointer with signature " + a + ": " + b);
      return d;
    }
    var Ic = void 0;
    function Jc(a) {
      a = Kc(a);
      var b = Tb(a);
      Lc(a);
      return b;
    }
    function Mc(a, b) {
      function d(m) {
        h[m] || Ib[m] || (Jb[m] ? Jb[m].forEach(d) : (f.push(m), (h[m] = !0)));
      }
      var f = [],
        h = {};
      b.forEach(d);
      throw new Ic(a + ": " + f.map(Jc).join([", "]));
    }
    function Nc(a, b, d, f, h) {
      var m = b.length;
      2 > m &&
        Y(
          "argTypes array size mismatch! Must at least get return value and 'this' types!"
        );
      var u = null !== b[1] && null !== d,
        n = !1;
      for (d = 1; d < b.length; ++d)
        if (null !== b[d] && void 0 === b[d].ee) {
          n = !0;
          break;
        }
      var q = "void" !== b[0].name,
        v = m - 2,
        D = Array(v),
        I = [],
        M = [];
      return function () {
        arguments.length !== v &&
          Y(
            "function " +
              a +
              " called with " +
              arguments.length +
              " arguments, expected " +
              v +
              " args!"
          );
        M.length = 0;
        I.length = u ? 2 : 1;
        I[0] = h;
        if (u) {
          var z = b[1].toWireType(M, this);
          I[1] = z;
        }
        for (var N = 0; N < v; ++N)
          (D[N] = b[N + 2].toWireType(M, arguments[N])), I.push(D[N]);
        N = f.apply(null, I);
        if (n) Fb(M);
        else
          for (var T = u ? 1 : 2; T < b.length; T++) {
            var U = 1 === T ? z : D[T - 2];
            null !== b[T].ee && b[T].ee(U);
          }
        z = q ? b[0].fromWireType(N) : void 0;
        return z;
      };
    }
    function Oc(a, b) {
      for (var d = [], f = 0; f < a; f++) d.push(lb[(b + 4 * f) >> 2]);
      return d;
    }
    var Pc = [],
      Qc = [
        {},
        { value: void 0 },
        { value: null },
        { value: !0 },
        { value: !1 },
      ];
    function Rc(a) {
      4 < a && 0 === --Qc[a].hf && ((Qc[a] = void 0), Pc.push(a));
    }
    var Sc = (a) => {
        a || Y("Cannot use deleted val. handle = " + a);
        return Qc[a].value;
      },
      wc = (a) => {
        switch (a) {
          case void 0:
            return 1;
          case null:
            return 2;
          case !0:
            return 3;
          case !1:
            return 4;
          default:
            var b = Pc.length ? Pc.pop() : Qc.length;
            Qc[b] = { hf: 1, value: a };
            return b;
        }
      };
    function Tc(a, b, d) {
      switch (b) {
        case 0:
          return function (f) {
            return this.fromWireType((d ? kb : K)[f]);
          };
        case 1:
          return function (f) {
            return this.fromWireType((d ? Za : Ya)[f >> 1]);
          };
        case 2:
          return function (f) {
            return this.fromWireType((d ? R : lb)[f >> 2]);
          };
        default:
          throw new TypeError("Unknown integer type: " + a);
      }
    }
    function Uc(a, b) {
      var d = Ib[a];
      void 0 === d && Y(b + " has unknown type " + Jc(a));
      return d;
    }
    function uc(a) {
      if (null === a) return "null";
      var b = typeof a;
      return "object" === b || "array" === b || "function" === b
        ? a.toString()
        : "" + a;
    }
    function Vc(a, b) {
      switch (b) {
        case 2:
          return function (d) {
            return this.fromWireType(S[d >> 2]);
          };
        case 3:
          return function (d) {
            return this.fromWireType(mb[d >> 3]);
          };
        default:
          throw new TypeError("Unknown float type: " + a);
      }
    }
    function Wc(a, b, d) {
      switch (b) {
        case 0:
          return d
            ? function (f) {
                return kb[f];
              }
            : function (f) {
                return K[f];
              };
        case 1:
          return d
            ? function (f) {
                return Za[f >> 1];
              }
            : function (f) {
                return Ya[f >> 1];
              };
        case 2:
          return d
            ? function (f) {
                return R[f >> 2];
              }
            : function (f) {
                return lb[f >> 2];
              };
        default:
          throw new TypeError("Unknown integer type: " + a);
      }
    }
    var Xc = {};
    function Yc(a) {
      var b = Xc[a];
      return void 0 === b ? Tb(a) : b;
    }
    var Zc = [];
    function $c() {
      function a(b) {
        b.$$$embind_global$$$ = b;
        var d =
          "object" == typeof $$$embind_global$$$ && b.$$$embind_global$$$ == b;
        d || delete b.$$$embind_global$$$;
        return d;
      }
      if ("object" == typeof globalThis) return globalThis;
      if ("object" == typeof $$$embind_global$$$) return $$$embind_global$$$;
      "object" == typeof global && a(global)
        ? ($$$embind_global$$$ = global)
        : "object" == typeof self && a(self) && ($$$embind_global$$$ = self);
      if ("object" == typeof $$$embind_global$$$) return $$$embind_global$$$;
      throw Error("unable to get global object.");
    }
    function ad(a) {
      var b = Zc.length;
      Zc.push(a);
      return b;
    }
    function bd(a, b) {
      for (var d = Array(a), f = 0; f < a; ++f)
        d[f] = Uc(lb[(b + 4 * f) >> 2], "parameter " + f);
      return d;
    }
    var cd = [];
    function dd(a) {
      var b = Array(a + 1);
      return function (d, f, h) {
        b[0] = d;
        for (var m = 0; m < a; ++m) {
          var u = Uc(lb[(f + 4 * m) >> 2], "parameter " + m);
          b[m + 1] = u.readValueFromPointer(h);
          h += u.argPackAdvance;
        }
        d = new (d.bind.apply(d, b))();
        return wc(d);
      };
    }
    var ed = {},
      fd;
    fd = za
      ? () => {
          var a = process.hrtime();
          return 1e3 * a[0] + a[1] / 1e6;
        }
      : () => performance.now();
    function gd(a) {
      var b = a.getExtension("ANGLE_instanced_arrays");
      b &&
        ((a.vertexAttribDivisor = function (d, f) {
          b.vertexAttribDivisorANGLE(d, f);
        }),
        (a.drawArraysInstanced = function (d, f, h, m) {
          b.drawArraysInstancedANGLE(d, f, h, m);
        }),
        (a.drawElementsInstanced = function (d, f, h, m, u) {
          b.drawElementsInstancedANGLE(d, f, h, m, u);
        }));
    }
    function hd(a) {
      var b = a.getExtension("OES_vertex_array_object");
      b &&
        ((a.createVertexArray = function () {
          return b.createVertexArrayOES();
        }),
        (a.deleteVertexArray = function (d) {
          b.deleteVertexArrayOES(d);
        }),
        (a.bindVertexArray = function (d) {
          b.bindVertexArrayOES(d);
        }),
        (a.isVertexArray = function (d) {
          return b.isVertexArrayOES(d);
        }));
    }
    function jd(a) {
      var b = a.getExtension("WEBGL_draw_buffers");
      b &&
        (a.drawBuffers = function (d, f) {
          b.drawBuffersWEBGL(d, f);
        });
    }
    var kd = 1,
      ld = [],
      md = [],
      nd = [],
      od = [],
      ha = [],
      pd = [],
      qd = [],
      na = [],
      rd = [],
      sd = [],
      td = {},
      ud = {},
      vd = 4;
    function wd(a) {
      xd || (xd = a);
    }
    function fa(a) {
      for (var b = kd++, d = a.length; d < b; d++) a[d] = null;
      return b;
    }
    function ka(a, b) {
      a.lf ||
        ((a.lf = a.getContext),
        (a.getContext = function (f, h) {
          h = a.lf(f, h);
          return ("webgl" == f) == h instanceof WebGLRenderingContext
            ? h
            : null;
        }));
      var d =
        1 < b.majorVersion
          ? a.getContext("webgl2", b)
          : a.getContext("webgl", b);
      return d ? Ad(d, b) : 0;
    }
    function Ad(a, b) {
      var d = fa(na),
        f = { Uf: d, attributes: b, version: b.majorVersion, ge: a };
      a.canvas && (a.canvas.yf = f);
      na[d] = f;
      ("undefined" == typeof b.Kf || b.Kf) && Bd(f);
      return d;
    }
    function ma(a) {
      x = na[a];
      w.rg = Z = x && x.ge;
      return !(a && !Z);
    }
    function Bd(a) {
      a || (a = x);
      if (!a.Wf) {
        a.Wf = !0;
        var b = a.ge;
        gd(b);
        hd(b);
        jd(b);
        b.qf = b.getExtension("WEBGL_draw_instanced_base_vertex_base_instance");
        b.uf = b.getExtension(
          "WEBGL_multi_draw_instanced_base_vertex_base_instance"
        );
        2 <= a.version &&
          (b.rf = b.getExtension("EXT_disjoint_timer_query_webgl2"));
        if (2 > a.version || !b.rf)
          b.rf = b.getExtension("EXT_disjoint_timer_query");
        b.sg = b.getExtension("WEBGL_multi_draw");
        (b.getSupportedExtensions() || []).forEach(function (d) {
          d.includes("lose_context") ||
            d.includes("debug") ||
            b.getExtension(d);
        });
      }
    }
    var x,
      xd,
      Cd = [];
    function Dd(a, b, d, f) {
      for (var h = 0; h < a; h++) {
        var m = Z[d](),
          u = m && fa(f);
        m ? ((m.name = u), (f[u] = m)) : wd(1282);
        R[(b + 4 * h) >> 2] = u;
      }
    }
    function Ed(a, b, d) {
      if (b) {
        var f = void 0;
        switch (a) {
          case 36346:
            f = 1;
            break;
          case 36344:
            0 != d && 1 != d && wd(1280);
            return;
          case 34814:
          case 36345:
            f = 0;
            break;
          case 34466:
            var h = Z.getParameter(34467);
            f = h ? h.length : 0;
            break;
          case 33309:
            if (2 > x.version) {
              wd(1282);
              return;
            }
            f = 2 * (Z.getSupportedExtensions() || []).length;
            break;
          case 33307:
          case 33308:
            if (2 > x.version) {
              wd(1280);
              return;
            }
            f = 33307 == a ? 3 : 0;
        }
        if (void 0 === f)
          switch (((h = Z.getParameter(a)), typeof h)) {
            case "number":
              f = h;
              break;
            case "boolean":
              f = h ? 1 : 0;
              break;
            case "string":
              wd(1280);
              return;
            case "object":
              if (null === h)
                switch (a) {
                  case 34964:
                  case 35725:
                  case 34965:
                  case 36006:
                  case 36007:
                  case 32873:
                  case 34229:
                  case 36662:
                  case 36663:
                  case 35053:
                  case 35055:
                  case 36010:
                  case 35097:
                  case 35869:
                  case 32874:
                  case 36389:
                  case 35983:
                  case 35368:
                  case 34068:
                    f = 0;
                    break;
                  default:
                    wd(1280);
                    return;
                }
              else {
                if (
                  h instanceof Float32Array ||
                  h instanceof Uint32Array ||
                  h instanceof Int32Array ||
                  h instanceof Array
                ) {
                  for (a = 0; a < h.length; ++a)
                    switch (d) {
                      case 0:
                        R[(b + 4 * a) >> 2] = h[a];
                        break;
                      case 2:
                        S[(b + 4 * a) >> 2] = h[a];
                        break;
                      case 4:
                        kb[(b + a) >> 0] = h[a] ? 1 : 0;
                    }
                  return;
                }
                try {
                  f = h.name | 0;
                } catch (m) {
                  wd(1280);
                  Ja(
                    "GL_INVALID_ENUM in glGet" +
                      d +
                      "v: Unknown object returned from WebGL getParameter(" +
                      a +
                      ")! (error: " +
                      m +
                      ")"
                  );
                  return;
                }
              }
              break;
            default:
              wd(1280);
              Ja(
                "GL_INVALID_ENUM in glGet" +
                  d +
                  "v: Native code calling glGet" +
                  d +
                  "v(" +
                  a +
                  ") and it returns " +
                  h +
                  " of type " +
                  typeof h +
                  "!"
              );
              return;
          }
        switch (d) {
          case 1:
            d = f;
            lb[b >> 2] = d;
            lb[(b + 4) >> 2] = (d - lb[b >> 2]) / 4294967296;
            break;
          case 0:
            R[b >> 2] = f;
            break;
          case 2:
            S[b >> 2] = f;
            break;
          case 4:
            kb[b >> 0] = f ? 1 : 0;
        }
      } else wd(1281);
    }
    function Fd(a) {
      var b = oa(a) + 1,
        d = Gd(b);
      pa(a, K, d, b);
      return d;
    }
    function Hd(a) {
      return "]" == a.slice(-1) && a.lastIndexOf("[");
    }
    function Id(a) {
      a -= 5120;
      return 0 == a
        ? kb
        : 1 == a
        ? K
        : 2 == a
        ? Za
        : 4 == a
        ? R
        : 6 == a
        ? S
        : 5 == a || 28922 == a || 28520 == a || 30779 == a || 30782 == a
        ? lb
        : Ya;
    }
    function Jd(a, b, d, f, h) {
      a = Id(a);
      var m = 31 - Math.clz32(a.BYTES_PER_ELEMENT),
        u = vd;
      return a.subarray(
        h >> m,
        (h +
          f *
            ((d *
              ({
                5: 3,
                6: 4,
                8: 2,
                29502: 3,
                29504: 4,
                26917: 2,
                26918: 2,
                29846: 3,
                29847: 4,
              }[b - 6402] || 1) *
              (1 << m) +
              u -
              1) &
              -u)) >>
          m
      );
    }
    function Kd(a) {
      var b = Z.Hf;
      if (b) {
        var d = b.Ne[a];
        "number" == typeof d &&
          (b.Ne[a] = d =
            Z.getUniformLocation(b, b.wf[a] + (0 < d ? "[" + d + "]" : "")));
        return d;
      }
      wd(1282);
    }
    var Ld = [],
      Md = [],
      Nd = {};
    function Od() {
      if (!Pd) {
        var a = {
            USER: "web_user",
            LOGNAME: "web_user",
            PATH: "/",
            PWD: "/",
            HOME: "/home/web_user",
            LANG:
              (
                ("object" == typeof navigator &&
                  navigator.languages &&
                  navigator.languages[0]) ||
                "C"
              ).replace("-", "_") + ".UTF-8",
            _: ua || "./this.program",
          },
          b;
        for (b in Nd) void 0 === Nd[b] ? delete a[b] : (a[b] = Nd[b]);
        var d = [];
        for (b in a) d.push(b + "=" + a[b]);
        Pd = d;
      }
      return Pd;
    }
    var Pd,
      Qd = [null, [], []];
    function Rd(a) {
      return 0 === a % 4 && (0 !== a % 100 || 0 === a % 400);
    }
    var Sd = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
      Td = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    function Ud(a, b, d, f) {
      function h(z, N, T) {
        for (z = "number" == typeof z ? z.toString() : z || ""; z.length < N; )
          z = T[0] + z;
        return z;
      }
      function m(z, N) {
        return h(z, N, "0");
      }
      function u(z, N) {
        function T(ra) {
          return 0 > ra ? -1 : 0 < ra ? 1 : 0;
        }
        var U;
        0 === (U = T(z.getFullYear() - N.getFullYear())) &&
          0 === (U = T(z.getMonth() - N.getMonth())) &&
          (U = T(z.getDate() - N.getDate()));
        return U;
      }
      function n(z) {
        switch (z.getDay()) {
          case 0:
            return new Date(z.getFullYear() - 1, 11, 29);
          case 1:
            return z;
          case 2:
            return new Date(z.getFullYear(), 0, 3);
          case 3:
            return new Date(z.getFullYear(), 0, 2);
          case 4:
            return new Date(z.getFullYear(), 0, 1);
          case 5:
            return new Date(z.getFullYear() - 1, 11, 31);
          case 6:
            return new Date(z.getFullYear() - 1, 11, 30);
        }
      }
      function q(z) {
        var N = z.pe;
        for (z = new Date(new Date(z.qe + 1900, 0, 1).getTime()); 0 < N; ) {
          var T = z.getMonth(),
            U = (Rd(z.getFullYear()) ? Sd : Td)[T];
          if (N > U - z.getDate())
            (N -= U - z.getDate() + 1),
              z.setDate(1),
              11 > T
                ? z.setMonth(T + 1)
                : (z.setMonth(0), z.setFullYear(z.getFullYear() + 1));
          else {
            z.setDate(z.getDate() + N);
            break;
          }
        }
        T = new Date(z.getFullYear() + 1, 0, 4);
        N = n(new Date(z.getFullYear(), 0, 4));
        T = n(T);
        return 0 >= u(N, z)
          ? 0 >= u(T, z)
            ? z.getFullYear() + 1
            : z.getFullYear()
          : z.getFullYear() - 1;
      }
      var v = R[(f + 40) >> 2];
      f = {
        pg: R[f >> 2],
        og: R[(f + 4) >> 2],
        Xe: R[(f + 8) >> 2],
        jf: R[(f + 12) >> 2],
        Ye: R[(f + 16) >> 2],
        qe: R[(f + 20) >> 2],
        je: R[(f + 24) >> 2],
        pe: R[(f + 28) >> 2],
        vg: R[(f + 32) >> 2],
        ng: R[(f + 36) >> 2],
        qg: v ? Va(v) : "",
      };
      d = Va(d);
      v = {
        "%c": "%a %b %d %H:%M:%S %Y",
        "%D": "%m/%d/%y",
        "%F": "%Y-%m-%d",
        "%h": "%b",
        "%r": "%I:%M:%S %p",
        "%R": "%H:%M",
        "%T": "%H:%M:%S",
        "%x": "%m/%d/%y",
        "%X": "%H:%M:%S",
        "%Ec": "%c",
        "%EC": "%C",
        "%Ex": "%m/%d/%y",
        "%EX": "%H:%M:%S",
        "%Ey": "%y",
        "%EY": "%Y",
        "%Od": "%d",
        "%Oe": "%e",
        "%OH": "%H",
        "%OI": "%I",
        "%Om": "%m",
        "%OM": "%M",
        "%OS": "%S",
        "%Ou": "%u",
        "%OU": "%U",
        "%OV": "%V",
        "%Ow": "%w",
        "%OW": "%W",
        "%Oy": "%y",
      };
      for (var D in v) d = d.replace(new RegExp(D, "g"), v[D]);
      var I = "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(
          " "
        ),
        M =
          "January February March April May June July August September October November December".split(
            " "
          );
      v = {
        "%a": function (z) {
          return I[z.je].substring(0, 3);
        },
        "%A": function (z) {
          return I[z.je];
        },
        "%b": function (z) {
          return M[z.Ye].substring(0, 3);
        },
        "%B": function (z) {
          return M[z.Ye];
        },
        "%C": function (z) {
          return m(((z.qe + 1900) / 100) | 0, 2);
        },
        "%d": function (z) {
          return m(z.jf, 2);
        },
        "%e": function (z) {
          return h(z.jf, 2, " ");
        },
        "%g": function (z) {
          return q(z).toString().substring(2);
        },
        "%G": function (z) {
          return q(z);
        },
        "%H": function (z) {
          return m(z.Xe, 2);
        },
        "%I": function (z) {
          z = z.Xe;
          0 == z ? (z = 12) : 12 < z && (z -= 12);
          return m(z, 2);
        },
        "%j": function (z) {
          for (
            var N = 0, T = 0;
            T <= z.Ye - 1;
            N += (Rd(z.qe + 1900) ? Sd : Td)[T++]
          );
          return m(z.jf + N, 3);
        },
        "%m": function (z) {
          return m(z.Ye + 1, 2);
        },
        "%M": function (z) {
          return m(z.og, 2);
        },
        "%n": function () {
          return "\n";
        },
        "%p": function (z) {
          return 0 <= z.Xe && 12 > z.Xe ? "AM" : "PM";
        },
        "%S": function (z) {
          return m(z.pg, 2);
        },
        "%t": function () {
          return "\t";
        },
        "%u": function (z) {
          return z.je || 7;
        },
        "%U": function (z) {
          return m(Math.floor((z.pe + 7 - z.je) / 7), 2);
        },
        "%V": function (z) {
          var N = Math.floor((z.pe + 7 - ((z.je + 6) % 7)) / 7);
          2 >= (z.je + 371 - z.pe - 2) % 7 && N++;
          if (N)
            53 == N &&
              ((T = (z.je + 371 - z.pe) % 7),
              4 == T || (3 == T && Rd(z.qe)) || (N = 1));
          else {
            N = 52;
            var T = (z.je + 7 - z.pe - 1) % 7;
            (4 == T || (5 == T && Rd((z.qe % 400) - 1))) && N++;
          }
          return m(N, 2);
        },
        "%w": function (z) {
          return z.je;
        },
        "%W": function (z) {
          return m(Math.floor((z.pe + 7 - ((z.je + 6) % 7)) / 7), 2);
        },
        "%y": function (z) {
          return (z.qe + 1900).toString().substring(2);
        },
        "%Y": function (z) {
          return z.qe + 1900;
        },
        "%z": function (z) {
          z = z.ng;
          var N = 0 <= z;
          z = Math.abs(z) / 60;
          return (
            (N ? "+" : "-") +
            String("0000" + ((z / 60) * 100 + (z % 60))).slice(-4)
          );
        },
        "%Z": function (z) {
          return z.qg;
        },
        "%%": function () {
          return "%";
        },
      };
      d = d.replace(/%%/g, "\x00\x00");
      for (D in v)
        d.includes(D) && (d = d.replace(new RegExp(D, "g"), v[D](f)));
      d = d.replace(/\0\0/g, "%");
      D = Vd(d);
      if (D.length > b) return 0;
      kb.set(D, a);
      return D.length - 1;
    }
    Nb = w.InternalError = Mb("InternalError");
    for (var Wd = Array(256), Xd = 0; 256 > Xd; ++Xd)
      Wd[Xd] = String.fromCharCode(Xd);
    Sb = Wd;
    ac = w.BindingError = Mb("BindingError");
    oc.prototype.isAliasOf = function (a) {
      if (!(this instanceof oc && a instanceof oc)) return !1;
      var b = this.Ld.Xd.Rd,
        d = this.Ld.Td,
        f = a.Ld.Xd.Rd;
      for (a = a.Ld.Td; b.ie; ) (d = b.Oe(d)), (b = b.ie);
      for (; f.ie; ) (a = f.Oe(a)), (f = f.ie);
      return b === f && d === a;
    };
    oc.prototype.clone = function () {
      this.Ld.Td || bc(this);
      if (this.Ld.Me) return (this.Ld.count.value += 1), this;
      var a = nc,
        b = Object,
        d = b.create,
        f = Object.getPrototypeOf(this),
        h = this.Ld;
      a = a(
        d.call(b, f, {
          Ld: {
            value: {
              count: h.count,
              Fe: h.Fe,
              Me: h.Me,
              Td: h.Td,
              Xd: h.Xd,
              $d: h.$d,
              fe: h.fe,
            },
          },
        })
      );
      a.Ld.count.value += 1;
      a.Ld.Fe = !1;
      return a;
    };
    oc.prototype["delete"] = function () {
      this.Ld.Td || bc(this);
      this.Ld.Fe && !this.Ld.Me && Y("Object already scheduled for deletion");
      dc(this);
      ec(this.Ld);
      this.Ld.Me || ((this.Ld.$d = void 0), (this.Ld.Td = void 0));
    };
    oc.prototype.isDeleted = function () {
      return !this.Ld.Td;
    };
    oc.prototype.deleteLater = function () {
      this.Ld.Td || bc(this);
      this.Ld.Fe && !this.Ld.Me && Y("Object already scheduled for deletion");
      hc.push(this);
      1 === hc.length && jc && jc(ic);
      this.Ld.Fe = !0;
      return this;
    };
    w.getInheritedInstanceCount = function () {
      return Object.keys(kc).length;
    };
    w.getLiveInheritedInstances = function () {
      var a = [],
        b;
      for (b in kc) kc.hasOwnProperty(b) && a.push(kc[b]);
      return a;
    };
    w.flushPendingDeletes = ic;
    w.setDelayFunction = function (a) {
      jc = a;
      hc.length && jc && jc(ic);
    };
    yc.prototype.Qf = function (a) {
      this.vf && (a = this.vf(a));
      return a;
    };
    yc.prototype.pf = function (a) {
      this.le && this.le(a);
    };
    yc.prototype.argPackAdvance = 8;
    yc.prototype.readValueFromPointer = Gb;
    yc.prototype.deleteObject = function (a) {
      if (null !== a) a["delete"]();
    };
    yc.prototype.fromWireType = function (a) {
      function b() {
        return this.Te
          ? mc(this.Rd.Ge, { Xd: this.ag, Td: d, fe: this, $d: a })
          : mc(this.Rd.Ge, { Xd: this, Td: a });
      }
      var d = this.Qf(a);
      if (!d) return this.pf(a), null;
      var f = lc(this.Rd, d);
      if (void 0 !== f) {
        if (0 === f.Ld.count.value)
          return (f.Ld.Td = d), (f.Ld.$d = a), f.clone();
        f = f.clone();
        this.pf(a);
        return f;
      }
      f = this.Rd.Pf(d);
      f = gc[f];
      if (!f) return b.call(this);
      f = this.Se ? f.Ff : f.pointerType;
      var h = fc(d, this.Rd, f.Rd);
      return null === h
        ? b.call(this)
        : this.Te
        ? mc(f.Rd.Ge, { Xd: f, Td: h, fe: this, $d: a })
        : mc(f.Rd.Ge, { Xd: f, Td: h });
    };
    Ic = w.UnboundTypeError = Mb("UnboundTypeError");
    w.count_emval_handles = function () {
      for (var a = 0, b = 5; b < Qc.length; ++b) void 0 !== Qc[b] && ++a;
      return a;
    };
    w.get_first_emval = function () {
      for (var a = 5; a < Qc.length; ++a) if (void 0 !== Qc[a]) return Qc[a];
      return null;
    };
    for (var Z, Yd = 0; 32 > Yd; ++Yd) Cd.push(Array(Yd));
    var Zd = new Float32Array(288);
    for (Yd = 0; 288 > Yd; ++Yd) Ld[Yd] = Zd.subarray(0, Yd + 1);
    var $d = new Int32Array(288);
    for (Yd = 0; 288 > Yd; ++Yd) Md[Yd] = $d.subarray(0, Yd + 1);
    function Vd(a) {
      var b = Array(oa(a) + 1);
      pa(a, b, 0, b.length);
      return b;
    }
    var pe = {
      U: function () {
        return 0;
      },
      Bb: function () {},
      Db: function () {
        return 0;
      },
      yb: function () {},
      zb: function () {},
      V: function () {},
      Ab: function () {},
      D: function (a) {
        var b = Eb[a];
        delete Eb[a];
        var d = b.gf,
          f = b.le,
          h = b.sf,
          m = h.map((u) => u.Tf).concat(h.map((u) => u.fg));
        Pb([a], m, (u) => {
          var n = {};
          h.forEach((q, v) => {
            var D = u[v],
              I = q.Rf,
              M = q.Sf,
              z = u[v + h.length],
              N = q.eg,
              T = q.gg;
            n[q.Lf] = {
              read: (U) => D.fromWireType(I(M, U)),
              write: (U, ra) => {
                var va = [];
                N(T, U, z.toWireType(va, ra));
                Fb(va);
              },
            };
          });
          return [
            {
              name: b.name,
              fromWireType: function (q) {
                var v = {},
                  D;
                for (D in n) v[D] = n[D].read(q);
                f(q);
                return v;
              },
              toWireType: function (q, v) {
                for (var D in n)
                  if (!(D in v))
                    throw new TypeError('Missing field:  "' + D + '"');
                var I = d();
                for (D in n) n[D].write(I, v[D]);
                null !== q && q.push(f, I);
                return I;
              },
              argPackAdvance: 8,
              readValueFromPointer: Gb,
              ee: f,
            },
          ];
        });
      },
      qb: function () {},
      Hb: function (a, b, d, f, h) {
        var m = Rb(d);
        b = Tb(b);
        Qb(a, {
          name: b,
          fromWireType: function (u) {
            return !!u;
          },
          toWireType: function (u, n) {
            return n ? f : h;
          },
          argPackAdvance: 8,
          readValueFromPointer: function (u) {
            if (1 === d) var n = kb;
            else if (2 === d) n = Za;
            else if (4 === d) n = R;
            else throw new TypeError("Unknown boolean type size: " + b);
            return this.fromWireType(n[u >> m]);
          },
          ee: null,
        });
      },
      o: function (a, b, d, f, h, m, u, n, q, v, D, I, M) {
        D = Tb(D);
        m = Bc(h, m);
        n && (n = Bc(u, n));
        v && (v = Bc(q, v));
        M = Bc(I, M);
        var z = Kb(D);
        qc(z, function () {
          Mc("Cannot construct " + D + " due to unbound types", [f]);
        });
        Pb([a, b, d], f ? [f] : [], function (N) {
          N = N[0];
          if (f) {
            var T = N.Rd;
            var U = T.Ge;
          } else U = oc.prototype;
          N = Lb(z, function () {
            if (Object.getPrototypeOf(this) !== ra)
              throw new ac("Use 'new' to construct " + D);
            if (void 0 === va.oe)
              throw new ac(D + " has no accessible constructor");
            var hb = va.oe[arguments.length];
            if (void 0 === hb)
              throw new ac(
                "Tried to invoke ctor of " +
                  D +
                  " with invalid number of parameters (" +
                  arguments.length +
                  ") - expected (" +
                  Object.keys(va.oe).toString() +
                  ") parameters instead!"
              );
            return hb.apply(this, arguments);
          });
          var ra = Object.create(U, { constructor: { value: N } });
          N.prototype = ra;
          var va = new rc(D, N, ra, M, T, m, n, v);
          T = new yc(D, va, !0, !1, !1);
          U = new yc(D + "*", va, !1, !1, !1);
          var gb = new yc(D + " const*", va, !1, !0, !1);
          gc[a] = { pointerType: U, Ff: gb };
          zc(z, N);
          return [T, U, gb];
        });
      },
      h: function (a, b, d, f, h, m, u) {
        var n = Oc(d, f);
        b = Tb(b);
        m = Bc(h, m);
        Pb([], [a], function (q) {
          function v() {
            Mc("Cannot call " + D + " due to unbound types", n);
          }
          q = q[0];
          var D = q.name + "." + b;
          b.startsWith("@@") && (b = Symbol[b.substring(2)]);
          var I = q.Rd.constructor;
          void 0 === I[b]
            ? ((v.De = d - 1), (I[b] = v))
            : (pc(I, b, D), (I[b].Zd[d - 1] = v));
          Pb([], n, function (M) {
            M = [M[0], null].concat(M.slice(1));
            M = Nc(D, M, null, m, u);
            void 0 === I[b].Zd
              ? ((M.De = d - 1), (I[b] = M))
              : (I[b].Zd[d - 1] = M);
            return [];
          });
          return [];
        });
      },
      z: function (a, b, d, f, h, m) {
        0 < b || Na();
        var u = Oc(b, d);
        h = Bc(f, h);
        Pb([], [a], function (n) {
          n = n[0];
          var q = "constructor " + n.name;
          void 0 === n.Rd.oe && (n.Rd.oe = []);
          if (void 0 !== n.Rd.oe[b - 1])
            throw new ac(
              "Cannot register multiple constructors with identical number of parameters (" +
                (b - 1) +
                ") for class '" +
                n.name +
                "'! Overload resolution is currently only performed using the parameter count, not actual type info!"
            );
          n.Rd.oe[b - 1] = () => {
            Mc("Cannot construct " + n.name + " due to unbound types", u);
          };
          Pb([], u, function (v) {
            v.splice(1, 0, null);
            n.Rd.oe[b - 1] = Nc(q, v, null, h, m);
            return [];
          });
          return [];
        });
      },
      b: function (a, b, d, f, h, m, u, n) {
        var q = Oc(d, f);
        b = Tb(b);
        m = Bc(h, m);
        Pb([], [a], function (v) {
          function D() {
            Mc("Cannot call " + I + " due to unbound types", q);
          }
          v = v[0];
          var I = v.name + "." + b;
          b.startsWith("@@") && (b = Symbol[b.substring(2)]);
          n && v.Rd.bg.push(b);
          var M = v.Rd.Ge,
            z = M[b];
          void 0 === z ||
          (void 0 === z.Zd && z.className !== v.name && z.De === d - 2)
            ? ((D.De = d - 2), (D.className = v.name), (M[b] = D))
            : (pc(M, b, I), (M[b].Zd[d - 2] = D));
          Pb([], q, function (N) {
            N = Nc(I, N, v, m, u);
            void 0 === M[b].Zd
              ? ((N.De = d - 2), (M[b] = N))
              : (M[b].Zd[d - 2] = N);
            return [];
          });
          return [];
        });
      },
      t: function (a, b, d) {
        a = Tb(a);
        Pb([], [b], function (f) {
          f = f[0];
          w[a] = f.fromWireType(d);
          return [];
        });
      },
      Gb: function (a, b) {
        b = Tb(b);
        Qb(a, {
          name: b,
          fromWireType: function (d) {
            var f = Sc(d);
            Rc(d);
            return f;
          },
          toWireType: function (d, f) {
            return wc(f);
          },
          argPackAdvance: 8,
          readValueFromPointer: Gb,
          ee: null,
        });
      },
      n: function (a, b, d, f) {
        function h() {}
        d = Rb(d);
        b = Tb(b);
        h.values = {};
        Qb(a, {
          name: b,
          constructor: h,
          fromWireType: function (m) {
            return this.constructor.values[m];
          },
          toWireType: function (m, u) {
            return u.value;
          },
          argPackAdvance: 8,
          readValueFromPointer: Tc(b, d, f),
          ee: null,
        });
        qc(b, h);
      },
      e: function (a, b, d) {
        var f = Uc(a, "enum");
        b = Tb(b);
        a = f.constructor;
        f = Object.create(f.constructor.prototype, {
          value: { value: d },
          constructor: { value: Lb(f.name + "_" + b, function () {}) },
        });
        a.values[d] = f;
        a[b] = f;
      },
      Y: function (a, b, d) {
        d = Rb(d);
        b = Tb(b);
        Qb(a, {
          name: b,
          fromWireType: function (f) {
            return f;
          },
          toWireType: function (f, h) {
            return h;
          },
          argPackAdvance: 8,
          readValueFromPointer: Vc(b, d),
          ee: null,
        });
      },
      y: function (a, b, d, f, h, m) {
        var u = Oc(b, d);
        a = Tb(a);
        h = Bc(f, h);
        qc(
          a,
          function () {
            Mc("Cannot call " + a + " due to unbound types", u);
          },
          b - 1
        );
        Pb([], u, function (n) {
          n = [n[0], null].concat(n.slice(1));
          zc(a, Nc(a, n, null, h, m), b - 1);
          return [];
        });
      },
      B: function (a, b, d, f, h) {
        b = Tb(b);
        -1 === h && (h = 4294967295);
        h = Rb(d);
        var m = (n) => n;
        if (0 === f) {
          var u = 32 - 8 * d;
          m = (n) => (n << u) >>> u;
        }
        d = b.includes("unsigned")
          ? function (n, q) {
              return q >>> 0;
            }
          : function (n, q) {
              return q;
            };
        Qb(a, {
          name: b,
          fromWireType: m,
          toWireType: d,
          argPackAdvance: 8,
          readValueFromPointer: Wc(b, h, 0 !== f),
          ee: null,
        });
      },
      u: function (a, b, d) {
        function f(m) {
          m >>= 2;
          var u = lb;
          return new h(jb, u[m + 1], u[m]);
        }
        var h = [
          Int8Array,
          Uint8Array,
          Int16Array,
          Uint16Array,
          Int32Array,
          Uint32Array,
          Float32Array,
          Float64Array,
        ][b];
        d = Tb(d);
        Qb(
          a,
          {
            name: d,
            fromWireType: f,
            argPackAdvance: 8,
            readValueFromPointer: f,
          },
          { Vf: !0 }
        );
      },
      v: function (a, b, d, f, h, m, u, n, q, v, D, I) {
        d = Tb(d);
        m = Bc(h, m);
        n = Bc(u, n);
        v = Bc(q, v);
        I = Bc(D, I);
        Pb([a], [b], function (M) {
          M = M[0];
          return [new yc(d, M.Rd, !1, !1, !0, M, f, m, n, v, I)];
        });
      },
      X: function (a, b) {
        b = Tb(b);
        var d = "std::string" === b;
        Qb(a, {
          name: b,
          fromWireType: function (f) {
            var h = lb[f >> 2],
              m = f + 4;
            if (d)
              for (var u = m, n = 0; n <= h; ++n) {
                var q = m + n;
                if (n == h || 0 == K[q]) {
                  u = Va(u, q - u);
                  if (void 0 === v) var v = u;
                  else (v += String.fromCharCode(0)), (v += u);
                  u = q + 1;
                }
              }
            else {
              v = Array(h);
              for (n = 0; n < h; ++n) v[n] = String.fromCharCode(K[m + n]);
              v = v.join("");
            }
            Lc(f);
            return v;
          },
          toWireType: function (f, h) {
            h instanceof ArrayBuffer && (h = new Uint8Array(h));
            var m = "string" == typeof h;
            m ||
              h instanceof Uint8Array ||
              h instanceof Uint8ClampedArray ||
              h instanceof Int8Array ||
              Y("Cannot pass non-string to std::string");
            var u = d && m ? oa(h) : h.length;
            var n = Gd(4 + u + 1),
              q = n + 4;
            lb[n >> 2] = u;
            if (d && m) pa(h, K, q, u + 1);
            else if (m)
              for (m = 0; m < u; ++m) {
                var v = h.charCodeAt(m);
                255 < v &&
                  (Lc(q),
                  Y("String has UTF-16 code units that do not fit in 8 bits"));
                K[q + m] = v;
              }
            else for (m = 0; m < u; ++m) K[q + m] = h[m];
            null !== f && f.push(Lc, n);
            return n;
          },
          argPackAdvance: 8,
          readValueFromPointer: Gb,
          ee: function (f) {
            Lc(f);
          },
        });
      },
      P: function (a, b, d) {
        d = Tb(d);
        if (2 === b) {
          var f = Xa;
          var h = $a;
          var m = cb;
          var u = () => Ya;
          var n = 1;
        } else
          4 === b && ((f = db), (h = eb), (m = fb), (u = () => lb), (n = 2));
        Qb(a, {
          name: d,
          fromWireType: function (q) {
            for (
              var v = lb[q >> 2], D = u(), I, M = q + 4, z = 0;
              z <= v;
              ++z
            ) {
              var N = q + 4 + z * b;
              if (z == v || 0 == D[N >> n])
                (M = f(M, N - M)),
                  void 0 === I
                    ? (I = M)
                    : ((I += String.fromCharCode(0)), (I += M)),
                  (M = N + b);
            }
            Lc(q);
            return I;
          },
          toWireType: function (q, v) {
            "string" != typeof v &&
              Y("Cannot pass non-string to C++ string type " + d);
            var D = m(v),
              I = Gd(4 + D + b);
            lb[I >> 2] = D >> n;
            h(v, I + 4, D + b);
            null !== q && q.push(Lc, I);
            return I;
          },
          argPackAdvance: 8,
          readValueFromPointer: Gb,
          ee: function (q) {
            Lc(q);
          },
        });
      },
      E: function (a, b, d, f, h, m) {
        Eb[a] = { name: Tb(b), gf: Bc(d, f), le: Bc(h, m), sf: [] };
      },
      g: function (a, b, d, f, h, m, u, n, q, v) {
        Eb[a].sf.push({
          Lf: Tb(b),
          Tf: d,
          Rf: Bc(f, h),
          Sf: m,
          fg: u,
          eg: Bc(n, q),
          gg: v,
        });
      },
      Ib: function (a, b) {
        b = Tb(b);
        Qb(a, {
          Xf: !0,
          name: b,
          argPackAdvance: 0,
          fromWireType: function () {},
          toWireType: function () {},
        });
      },
      Fb: function () {
        return !0;
      },
      sb: function () {
        throw Infinity;
      },
      I: function (a, b, d) {
        a = Sc(a);
        b = Uc(b, "emval::as");
        var f = [],
          h = wc(f);
        lb[d >> 2] = h;
        return b.toWireType(f, a);
      },
      $: function (a, b, d, f, h) {
        a = Zc[a];
        b = Sc(b);
        d = Yc(d);
        var m = [];
        lb[f >> 2] = wc(m);
        return a(b, d, m, h);
      },
      C: function (a, b, d, f) {
        a = Zc[a];
        b = Sc(b);
        d = Yc(d);
        a(b, d, null, f);
      },
      f: Rc,
      L: function (a) {
        if (0 === a) return wc($c());
        a = Yc(a);
        return wc($c()[a]);
      },
      A: function (a, b) {
        var d = bd(a, b),
          f = d[0];
        b =
          f.name +
          "_$" +
          d
            .slice(1)
            .map(function (u) {
              return u.name;
            })
            .join("_") +
          "$";
        var h = cd[b];
        if (void 0 !== h) return h;
        var m = Array(a - 1);
        h = ad((u, n, q, v) => {
          for (var D = 0, I = 0; I < a - 1; ++I)
            (m[I] = d[I + 1].readValueFromPointer(v + D)),
              (D += d[I + 1].argPackAdvance);
          u = u[n].apply(u, m);
          for (I = 0; I < a - 1; ++I) d[I + 1].If && d[I + 1].If(m[I]);
          if (!f.Xf) return f.toWireType(q, u);
        });
        return (cd[b] = h);
      },
      H: function (a, b) {
        a = Sc(a);
        b = Sc(b);
        return wc(a[b]);
      },
      r: function (a) {
        4 < a && (Qc[a].hf += 1);
      },
      K: function (a, b, d, f) {
        a = Sc(a);
        var h = ed[b];
        h || ((h = dd(b)), (ed[b] = h));
        return h(a, d, f);
      },
      N: function () {
        return wc([]);
      },
      i: function (a) {
        return wc(Yc(a));
      },
      G: function () {
        return wc({});
      },
      mb: function (a) {
        a = Sc(a);
        return !a;
      },
      F: function (a) {
        var b = Sc(a);
        Fb(b);
        Rc(a);
      },
      l: function (a, b, d) {
        a = Sc(a);
        b = Sc(b);
        d = Sc(d);
        a[b] = d;
      },
      j: function (a, b) {
        a = Uc(a, "_emval_take_value");
        a = a.readValueFromPointer(b);
        return wc(a);
      },
      ub: function () {
        return -52;
      },
      vb: function () {},
      a: function () {
        Na("");
      },
      Eb: fd,
      bd: function (a) {
        Z.activeTexture(a);
      },
      cd: function (a, b) {
        Z.attachShader(md[a], pd[b]);
      },
      ca: function (a, b, d) {
        Z.bindAttribLocation(md[a], b, Va(d));
      },
      da: function (a, b) {
        35051 == a ? (Z.cf = b) : 35052 == a && (Z.Ee = b);
        Z.bindBuffer(a, ld[b]);
      },
      ba: function (a, b) {
        Z.bindFramebuffer(a, nd[b]);
      },
      fc: function (a, b) {
        Z.bindRenderbuffer(a, od[b]);
      },
      Rb: function (a, b) {
        Z.bindSampler(a, rd[b]);
      },
      ea: function (a, b) {
        Z.bindTexture(a, ha[b]);
      },
      Cc: function (a) {
        Z.bindVertexArray(qd[a]);
      },
      xc: function (a) {
        Z.bindVertexArray(qd[a]);
      },
      fa: function (a, b, d, f) {
        Z.blendColor(a, b, d, f);
      },
      ga: function (a) {
        Z.blendEquation(a);
      },
      ha: function (a, b) {
        Z.blendFunc(a, b);
      },
      $b: function (a, b, d, f, h, m, u, n, q, v) {
        Z.blitFramebuffer(a, b, d, f, h, m, u, n, q, v);
      },
      ia: function (a, b, d, f) {
        2 <= x.version
          ? d && b
            ? Z.bufferData(a, K, f, d, b)
            : Z.bufferData(a, b, f)
          : Z.bufferData(a, d ? K.subarray(d, d + b) : b, f);
      },
      ja: function (a, b, d, f) {
        2 <= x.version
          ? d && Z.bufferSubData(a, b, K, f, d)
          : Z.bufferSubData(a, b, K.subarray(f, f + d));
      },
      gc: function (a) {
        return Z.checkFramebufferStatus(a);
      },
      S: function (a) {
        Z.clear(a);
      },
      aa: function (a, b, d, f) {
        Z.clearColor(a, b, d, f);
      },
      W: function (a) {
        Z.clearStencil(a);
      },
      kb: function (a, b, d, f) {
        return Z.clientWaitSync(sd[a], b, (d >>> 0) + 4294967296 * f);
      },
      ka: function (a, b, d, f) {
        Z.colorMask(!!a, !!b, !!d, !!f);
      },
      la: function (a) {
        Z.compileShader(pd[a]);
      },
      ma: function (a, b, d, f, h, m, u, n) {
        2 <= x.version
          ? Z.Ee || !u
            ? Z.compressedTexImage2D(a, b, d, f, h, m, u, n)
            : Z.compressedTexImage2D(a, b, d, f, h, m, K, n, u)
          : Z.compressedTexImage2D(
              a,
              b,
              d,
              f,
              h,
              m,
              n ? K.subarray(n, n + u) : null
            );
      },
      na: function (a, b, d, f, h, m, u, n, q) {
        2 <= x.version
          ? Z.Ee || !n
            ? Z.compressedTexSubImage2D(a, b, d, f, h, m, u, n, q)
            : Z.compressedTexSubImage2D(a, b, d, f, h, m, u, K, q, n)
          : Z.compressedTexSubImage2D(
              a,
              b,
              d,
              f,
              h,
              m,
              u,
              q ? K.subarray(q, q + n) : null
            );
      },
      Zb: function (a, b, d, f, h) {
        Z.copyBufferSubData(a, b, d, f, h);
      },
      oa: function (a, b, d, f, h, m, u, n) {
        Z.copyTexSubImage2D(a, b, d, f, h, m, u, n);
      },
      pa: function () {
        var a = fa(md),
          b = Z.createProgram();
        b.name = a;
        b.We = b.Ue = b.Ve = 0;
        b.kf = 1;
        md[a] = b;
        return a;
      },
      qa: function (a) {
        var b = fa(pd);
        pd[b] = Z.createShader(a);
        return b;
      },
      ra: function (a) {
        Z.cullFace(a);
      },
      sa: function (a, b) {
        for (var d = 0; d < a; d++) {
          var f = R[(b + 4 * d) >> 2],
            h = ld[f];
          h &&
            (Z.deleteBuffer(h),
            (h.name = 0),
            (ld[f] = null),
            f == Z.cf && (Z.cf = 0),
            f == Z.Ee && (Z.Ee = 0));
        }
      },
      hc: function (a, b) {
        for (var d = 0; d < a; ++d) {
          var f = R[(b + 4 * d) >> 2],
            h = nd[f];
          h && (Z.deleteFramebuffer(h), (h.name = 0), (nd[f] = null));
        }
      },
      ta: function (a) {
        if (a) {
          var b = md[a];
          b ? (Z.deleteProgram(b), (b.name = 0), (md[a] = null)) : wd(1281);
        }
      },
      ic: function (a, b) {
        for (var d = 0; d < a; d++) {
          var f = R[(b + 4 * d) >> 2],
            h = od[f];
          h && (Z.deleteRenderbuffer(h), (h.name = 0), (od[f] = null));
        }
      },
      Sb: function (a, b) {
        for (var d = 0; d < a; d++) {
          var f = R[(b + 4 * d) >> 2],
            h = rd[f];
          h && (Z.deleteSampler(h), (h.name = 0), (rd[f] = null));
        }
      },
      ua: function (a) {
        if (a) {
          var b = pd[a];
          b ? (Z.deleteShader(b), (pd[a] = null)) : wd(1281);
        }
      },
      _b: function (a) {
        if (a) {
          var b = sd[a];
          b ? (Z.deleteSync(b), (b.name = 0), (sd[a] = null)) : wd(1281);
        }
      },
      va: function (a, b) {
        for (var d = 0; d < a; d++) {
          var f = R[(b + 4 * d) >> 2],
            h = ha[f];
          h && (Z.deleteTexture(h), (h.name = 0), (ha[f] = null));
        }
      },
      Dc: function (a, b) {
        for (var d = 0; d < a; d++) {
          var f = R[(b + 4 * d) >> 2];
          Z.deleteVertexArray(qd[f]);
          qd[f] = null;
        }
      },
      yc: function (a, b) {
        for (var d = 0; d < a; d++) {
          var f = R[(b + 4 * d) >> 2];
          Z.deleteVertexArray(qd[f]);
          qd[f] = null;
        }
      },
      wa: function (a) {
        Z.depthMask(!!a);
      },
      xa: function (a) {
        Z.disable(a);
      },
      ya: function (a) {
        Z.disableVertexAttribArray(a);
      },
      za: function (a, b, d) {
        Z.drawArrays(a, b, d);
      },
      Ac: function (a, b, d, f) {
        Z.drawArraysInstanced(a, b, d, f);
      },
      vc: function (a, b, d, f, h) {
        Z.qf.drawArraysInstancedBaseInstanceWEBGL(a, b, d, f, h);
      },
      tc: function (a, b) {
        for (var d = Cd[a], f = 0; f < a; f++) d[f] = R[(b + 4 * f) >> 2];
        Z.drawBuffers(d);
      },
      Aa: function (a, b, d, f) {
        Z.drawElements(a, b, d, f);
      },
      Bc: function (a, b, d, f, h) {
        Z.drawElementsInstanced(a, b, d, f, h);
      },
      wc: function (a, b, d, f, h, m, u) {
        Z.qf.drawElementsInstancedBaseVertexBaseInstanceWEBGL(
          a,
          b,
          d,
          f,
          h,
          m,
          u
        );
      },
      nc: function (a, b, d, f, h, m) {
        Z.drawElements(a, f, h, m);
      },
      Ba: function (a) {
        Z.enable(a);
      },
      Ca: function (a) {
        Z.enableVertexAttribArray(a);
      },
      Xb: function (a, b) {
        return (a = Z.fenceSync(a, b))
          ? ((b = fa(sd)), (a.name = b), (sd[b] = a), b)
          : 0;
      },
      Da: function () {
        Z.finish();
      },
      Ea: function () {
        Z.flush();
      },
      jc: function (a, b, d, f) {
        Z.framebufferRenderbuffer(a, b, d, od[f]);
      },
      kc: function (a, b, d, f, h) {
        Z.framebufferTexture2D(a, b, d, ha[f], h);
      },
      Fa: function (a) {
        Z.frontFace(a);
      },
      Ga: function (a, b) {
        Dd(a, b, "createBuffer", ld);
      },
      lc: function (a, b) {
        Dd(a, b, "createFramebuffer", nd);
      },
      mc: function (a, b) {
        Dd(a, b, "createRenderbuffer", od);
      },
      Tb: function (a, b) {
        Dd(a, b, "createSampler", rd);
      },
      Ha: function (a, b) {
        Dd(a, b, "createTexture", ha);
      },
      Ec: function (a, b) {
        Dd(a, b, "createVertexArray", qd);
      },
      zc: function (a, b) {
        Dd(a, b, "createVertexArray", qd);
      },
      bc: function (a) {
        Z.generateMipmap(a);
      },
      Ia: function (a, b, d) {
        d ? (R[d >> 2] = Z.getBufferParameter(a, b)) : wd(1281);
      },
      Ja: function () {
        var a = Z.getError() || xd;
        xd = 0;
        return a;
      },
      Ka: function (a, b) {
        Ed(a, b, 2);
      },
      cc: function (a, b, d, f) {
        a = Z.getFramebufferAttachmentParameter(a, b, d);
        if (a instanceof WebGLRenderbuffer || a instanceof WebGLTexture)
          a = a.name | 0;
        R[f >> 2] = a;
      },
      M: function (a, b) {
        Ed(a, b, 0);
      },
      La: function (a, b, d, f) {
        a = Z.getProgramInfoLog(md[a]);
        null === a && (a = "(unknown error)");
        b = 0 < b && f ? pa(a, K, f, b) : 0;
        d && (R[d >> 2] = b);
      },
      Ma: function (a, b, d) {
        if (d)
          if (a >= kd) wd(1281);
          else if (((a = md[a]), 35716 == b))
            (a = Z.getProgramInfoLog(a)),
              null === a && (a = "(unknown error)"),
              (R[d >> 2] = a.length + 1);
          else if (35719 == b) {
            if (!a.We)
              for (b = 0; b < Z.getProgramParameter(a, 35718); ++b)
                a.We = Math.max(a.We, Z.getActiveUniform(a, b).name.length + 1);
            R[d >> 2] = a.We;
          } else if (35722 == b) {
            if (!a.Ue)
              for (b = 0; b < Z.getProgramParameter(a, 35721); ++b)
                a.Ue = Math.max(a.Ue, Z.getActiveAttrib(a, b).name.length + 1);
            R[d >> 2] = a.Ue;
          } else if (35381 == b) {
            if (!a.Ve)
              for (b = 0; b < Z.getProgramParameter(a, 35382); ++b)
                a.Ve = Math.max(
                  a.Ve,
                  Z.getActiveUniformBlockName(a, b).length + 1
                );
            R[d >> 2] = a.Ve;
          } else R[d >> 2] = Z.getProgramParameter(a, b);
        else wd(1281);
      },
      dc: function (a, b, d) {
        d ? (R[d >> 2] = Z.getRenderbufferParameter(a, b)) : wd(1281);
      },
      Na: function (a, b, d, f) {
        a = Z.getShaderInfoLog(pd[a]);
        null === a && (a = "(unknown error)");
        b = 0 < b && f ? pa(a, K, f, b) : 0;
        d && (R[d >> 2] = b);
      },
      Ob: function (a, b, d, f) {
        a = Z.getShaderPrecisionFormat(a, b);
        R[d >> 2] = a.rangeMin;
        R[(d + 4) >> 2] = a.rangeMax;
        R[f >> 2] = a.precision;
      },
      Oa: function (a, b, d) {
        d
          ? 35716 == b
            ? ((a = Z.getShaderInfoLog(pd[a])),
              null === a && (a = "(unknown error)"),
              (R[d >> 2] = a ? a.length + 1 : 0))
            : 35720 == b
            ? ((a = Z.getShaderSource(pd[a])),
              (R[d >> 2] = a ? a.length + 1 : 0))
            : (R[d >> 2] = Z.getShaderParameter(pd[a], b))
          : wd(1281);
      },
      R: function (a) {
        var b = td[a];
        if (!b) {
          switch (a) {
            case 7939:
              b = Z.getSupportedExtensions() || [];
              b = b.concat(
                b.map(function (f) {
                  return "GL_" + f;
                })
              );
              b = Fd(b.join(" "));
              break;
            case 7936:
            case 7937:
            case 37445:
            case 37446:
              (b = Z.getParameter(a)) || wd(1280);
              b = b && Fd(b);
              break;
            case 7938:
              b = Z.getParameter(7938);
              b =
                2 <= x.version
                  ? "OpenGL ES 3.0 (" + b + ")"
                  : "OpenGL ES 2.0 (" + b + ")";
              b = Fd(b);
              break;
            case 35724:
              b = Z.getParameter(35724);
              var d = b.match(/^WebGL GLSL ES ([0-9]\.[0-9][0-9]?)(?:$| .*)/);
              null !== d &&
                (3 == d[1].length && (d[1] += "0"),
                (b = "OpenGL ES GLSL ES " + d[1] + " (" + b + ")"));
              b = Fd(b);
              break;
            default:
              wd(1280);
          }
          td[a] = b;
        }
        return b;
      },
      jb: function (a, b) {
        if (2 > x.version) return wd(1282), 0;
        var d = ud[a];
        if (d) return 0 > b || b >= d.length ? (wd(1281), 0) : d[b];
        switch (a) {
          case 7939:
            return (
              (d = Z.getSupportedExtensions() || []),
              (d = d.concat(
                d.map(function (f) {
                  return "GL_" + f;
                })
              )),
              (d = d.map(function (f) {
                return Fd(f);
              })),
              (d = ud[a] = d),
              0 > b || b >= d.length ? (wd(1281), 0) : d[b]
            );
          default:
            return wd(1280), 0;
        }
      },
      Pa: function (a, b) {
        b = Va(b);
        if ((a = md[a])) {
          var d = a,
            f = d.Ne,
            h = d.xf,
            m;
          if (!f)
            for (
              d.Ne = f = {}, d.wf = {}, m = 0;
              m < Z.getProgramParameter(d, 35718);
              ++m
            ) {
              var u = Z.getActiveUniform(d, m);
              var n = u.name;
              u = u.size;
              var q = Hd(n);
              q = 0 < q ? n.slice(0, q) : n;
              var v = d.kf;
              d.kf += u;
              h[q] = [u, v];
              for (n = 0; n < u; ++n) (f[v] = n), (d.wf[v++] = q);
            }
          d = a.Ne;
          f = 0;
          h = b;
          m = Hd(b);
          0 < m && ((f = parseInt(b.slice(m + 1)) >>> 0), (h = b.slice(0, m)));
          if (
            (h = a.xf[h]) &&
            f < h[0] &&
            ((f += h[1]), (d[f] = d[f] || Z.getUniformLocation(a, b)))
          )
            return f;
        } else wd(1281);
        return -1;
      },
      Pb: function (a, b, d) {
        for (var f = Cd[b], h = 0; h < b; h++) f[h] = R[(d + 4 * h) >> 2];
        Z.invalidateFramebuffer(a, f);
      },
      Qb: function (a, b, d, f, h, m, u) {
        for (var n = Cd[b], q = 0; q < b; q++) n[q] = R[(d + 4 * q) >> 2];
        Z.invalidateSubFramebuffer(a, n, f, h, m, u);
      },
      Yb: function (a) {
        return Z.isSync(sd[a]);
      },
      Qa: function (a) {
        return (a = ha[a]) ? Z.isTexture(a) : 0;
      },
      Ra: function (a) {
        Z.lineWidth(a);
      },
      Sa: function (a) {
        a = md[a];
        Z.linkProgram(a);
        a.Ne = 0;
        a.xf = {};
      },
      rc: function (a, b, d, f, h, m) {
        Z.uf.multiDrawArraysInstancedBaseInstanceWEBGL(
          a,
          R,
          b >> 2,
          R,
          d >> 2,
          R,
          f >> 2,
          lb,
          h >> 2,
          m
        );
      },
      sc: function (a, b, d, f, h, m, u, n) {
        Z.uf.multiDrawElementsInstancedBaseVertexBaseInstanceWEBGL(
          a,
          R,
          b >> 2,
          d,
          R,
          f >> 2,
          R,
          h >> 2,
          R,
          m >> 2,
          lb,
          u >> 2,
          n
        );
      },
      Ta: function (a, b) {
        3317 == a && (vd = b);
        Z.pixelStorei(a, b);
      },
      uc: function (a) {
        Z.readBuffer(a);
      },
      Ua: function (a, b, d, f, h, m, u) {
        if (2 <= x.version)
          if (Z.cf) Z.readPixels(a, b, d, f, h, m, u);
          else {
            var n = Id(m);
            Z.readPixels(
              a,
              b,
              d,
              f,
              h,
              m,
              n,
              u >> (31 - Math.clz32(n.BYTES_PER_ELEMENT))
            );
          }
        else
          (u = Jd(m, h, d, f, u))
            ? Z.readPixels(a, b, d, f, h, m, u)
            : wd(1280);
      },
      ec: function (a, b, d, f) {
        Z.renderbufferStorage(a, b, d, f);
      },
      ac: function (a, b, d, f, h) {
        Z.renderbufferStorageMultisample(a, b, d, f, h);
      },
      Ub: function (a, b, d) {
        Z.samplerParameterf(rd[a], b, d);
      },
      Vb: function (a, b, d) {
        Z.samplerParameteri(rd[a], b, d);
      },
      Wb: function (a, b, d) {
        Z.samplerParameteri(rd[a], b, R[d >> 2]);
      },
      Va: function (a, b, d, f) {
        Z.scissor(a, b, d, f);
      },
      Wa: function (a, b, d, f) {
        for (var h = "", m = 0; m < b; ++m) {
          var u = f ? R[(f + 4 * m) >> 2] : -1;
          h += Va(R[(d + 4 * m) >> 2], 0 > u ? void 0 : u);
        }
        Z.shaderSource(pd[a], h);
      },
      Xa: function (a, b, d) {
        Z.stencilFunc(a, b, d);
      },
      Ya: function (a, b, d, f) {
        Z.stencilFuncSeparate(a, b, d, f);
      },
      Za: function (a) {
        Z.stencilMask(a);
      },
      _a: function (a, b) {
        Z.stencilMaskSeparate(a, b);
      },
      $a: function (a, b, d) {
        Z.stencilOp(a, b, d);
      },
      ab: function (a, b, d, f) {
        Z.stencilOpSeparate(a, b, d, f);
      },
      bb: function (a, b, d, f, h, m, u, n, q) {
        if (2 <= x.version)
          if (Z.Ee) Z.texImage2D(a, b, d, f, h, m, u, n, q);
          else if (q) {
            var v = Id(n);
            Z.texImage2D(
              a,
              b,
              d,
              f,
              h,
              m,
              u,
              n,
              v,
              q >> (31 - Math.clz32(v.BYTES_PER_ELEMENT))
            );
          } else Z.texImage2D(a, b, d, f, h, m, u, n, null);
        else Z.texImage2D(a, b, d, f, h, m, u, n, q ? Jd(n, u, f, h, q) : null);
      },
      cb: function (a, b, d) {
        Z.texParameterf(a, b, d);
      },
      db: function (a, b, d) {
        Z.texParameterf(a, b, S[d >> 2]);
      },
      eb: function (a, b, d) {
        Z.texParameteri(a, b, d);
      },
      fb: function (a, b, d) {
        Z.texParameteri(a, b, R[d >> 2]);
      },
      oc: function (a, b, d, f, h) {
        Z.texStorage2D(a, b, d, f, h);
      },
      gb: function (a, b, d, f, h, m, u, n, q) {
        if (2 <= x.version)
          if (Z.Ee) Z.texSubImage2D(a, b, d, f, h, m, u, n, q);
          else if (q) {
            var v = Id(n);
            Z.texSubImage2D(
              a,
              b,
              d,
              f,
              h,
              m,
              u,
              n,
              v,
              q >> (31 - Math.clz32(v.BYTES_PER_ELEMENT))
            );
          } else Z.texSubImage2D(a, b, d, f, h, m, u, n, null);
        else
          (v = null),
            q && (v = Jd(n, u, h, m, q)),
            Z.texSubImage2D(a, b, d, f, h, m, u, n, v);
      },
      hb: function (a, b) {
        Z.uniform1f(Kd(a), b);
      },
      ib: function (a, b, d) {
        if (2 <= x.version) b && Z.uniform1fv(Kd(a), S, d >> 2, b);
        else {
          if (288 >= b)
            for (var f = Ld[b - 1], h = 0; h < b; ++h)
              f[h] = S[(d + 4 * h) >> 2];
          else f = S.subarray(d >> 2, (d + 4 * b) >> 2);
          Z.uniform1fv(Kd(a), f);
        }
      },
      Zc: function (a, b) {
        Z.uniform1i(Kd(a), b);
      },
      _c: function (a, b, d) {
        if (2 <= x.version) b && Z.uniform1iv(Kd(a), R, d >> 2, b);
        else {
          if (288 >= b)
            for (var f = Md[b - 1], h = 0; h < b; ++h)
              f[h] = R[(d + 4 * h) >> 2];
          else f = R.subarray(d >> 2, (d + 4 * b) >> 2);
          Z.uniform1iv(Kd(a), f);
        }
      },
      $c: function (a, b, d) {
        Z.uniform2f(Kd(a), b, d);
      },
      ad: function (a, b, d) {
        if (2 <= x.version) b && Z.uniform2fv(Kd(a), S, d >> 2, 2 * b);
        else {
          if (144 >= b)
            for (var f = Ld[2 * b - 1], h = 0; h < 2 * b; h += 2)
              (f[h] = S[(d + 4 * h) >> 2]),
                (f[h + 1] = S[(d + (4 * h + 4)) >> 2]);
          else f = S.subarray(d >> 2, (d + 8 * b) >> 2);
          Z.uniform2fv(Kd(a), f);
        }
      },
      Yc: function (a, b, d) {
        Z.uniform2i(Kd(a), b, d);
      },
      Xc: function (a, b, d) {
        if (2 <= x.version) b && Z.uniform2iv(Kd(a), R, d >> 2, 2 * b);
        else {
          if (144 >= b)
            for (var f = Md[2 * b - 1], h = 0; h < 2 * b; h += 2)
              (f[h] = R[(d + 4 * h) >> 2]),
                (f[h + 1] = R[(d + (4 * h + 4)) >> 2]);
          else f = R.subarray(d >> 2, (d + 8 * b) >> 2);
          Z.uniform2iv(Kd(a), f);
        }
      },
      Wc: function (a, b, d, f) {
        Z.uniform3f(Kd(a), b, d, f);
      },
      Vc: function (a, b, d) {
        if (2 <= x.version) b && Z.uniform3fv(Kd(a), S, d >> 2, 3 * b);
        else {
          if (96 >= b)
            for (var f = Ld[3 * b - 1], h = 0; h < 3 * b; h += 3)
              (f[h] = S[(d + 4 * h) >> 2]),
                (f[h + 1] = S[(d + (4 * h + 4)) >> 2]),
                (f[h + 2] = S[(d + (4 * h + 8)) >> 2]);
          else f = S.subarray(d >> 2, (d + 12 * b) >> 2);
          Z.uniform3fv(Kd(a), f);
        }
      },
      Uc: function (a, b, d, f) {
        Z.uniform3i(Kd(a), b, d, f);
      },
      Tc: function (a, b, d) {
        if (2 <= x.version) b && Z.uniform3iv(Kd(a), R, d >> 2, 3 * b);
        else {
          if (96 >= b)
            for (var f = Md[3 * b - 1], h = 0; h < 3 * b; h += 3)
              (f[h] = R[(d + 4 * h) >> 2]),
                (f[h + 1] = R[(d + (4 * h + 4)) >> 2]),
                (f[h + 2] = R[(d + (4 * h + 8)) >> 2]);
          else f = R.subarray(d >> 2, (d + 12 * b) >> 2);
          Z.uniform3iv(Kd(a), f);
        }
      },
      Sc: function (a, b, d, f, h) {
        Z.uniform4f(Kd(a), b, d, f, h);
      },
      Rc: function (a, b, d) {
        if (2 <= x.version) b && Z.uniform4fv(Kd(a), S, d >> 2, 4 * b);
        else {
          if (72 >= b) {
            var f = Ld[4 * b - 1],
              h = S;
            d >>= 2;
            for (var m = 0; m < 4 * b; m += 4) {
              var u = d + m;
              f[m] = h[u];
              f[m + 1] = h[u + 1];
              f[m + 2] = h[u + 2];
              f[m + 3] = h[u + 3];
            }
          } else f = S.subarray(d >> 2, (d + 16 * b) >> 2);
          Z.uniform4fv(Kd(a), f);
        }
      },
      Fc: function (a, b, d, f, h) {
        Z.uniform4i(Kd(a), b, d, f, h);
      },
      Gc: function (a, b, d) {
        if (2 <= x.version) b && Z.uniform4iv(Kd(a), R, d >> 2, 4 * b);
        else {
          if (72 >= b)
            for (var f = Md[4 * b - 1], h = 0; h < 4 * b; h += 4)
              (f[h] = R[(d + 4 * h) >> 2]),
                (f[h + 1] = R[(d + (4 * h + 4)) >> 2]),
                (f[h + 2] = R[(d + (4 * h + 8)) >> 2]),
                (f[h + 3] = R[(d + (4 * h + 12)) >> 2]);
          else f = R.subarray(d >> 2, (d + 16 * b) >> 2);
          Z.uniform4iv(Kd(a), f);
        }
      },
      Hc: function (a, b, d, f) {
        if (2 <= x.version)
          b && Z.uniformMatrix2fv(Kd(a), !!d, S, f >> 2, 4 * b);
        else {
          if (72 >= b)
            for (var h = Ld[4 * b - 1], m = 0; m < 4 * b; m += 4)
              (h[m] = S[(f + 4 * m) >> 2]),
                (h[m + 1] = S[(f + (4 * m + 4)) >> 2]),
                (h[m + 2] = S[(f + (4 * m + 8)) >> 2]),
                (h[m + 3] = S[(f + (4 * m + 12)) >> 2]);
          else h = S.subarray(f >> 2, (f + 16 * b) >> 2);
          Z.uniformMatrix2fv(Kd(a), !!d, h);
        }
      },
      Ic: function (a, b, d, f) {
        if (2 <= x.version)
          b && Z.uniformMatrix3fv(Kd(a), !!d, S, f >> 2, 9 * b);
        else {
          if (32 >= b)
            for (var h = Ld[9 * b - 1], m = 0; m < 9 * b; m += 9)
              (h[m] = S[(f + 4 * m) >> 2]),
                (h[m + 1] = S[(f + (4 * m + 4)) >> 2]),
                (h[m + 2] = S[(f + (4 * m + 8)) >> 2]),
                (h[m + 3] = S[(f + (4 * m + 12)) >> 2]),
                (h[m + 4] = S[(f + (4 * m + 16)) >> 2]),
                (h[m + 5] = S[(f + (4 * m + 20)) >> 2]),
                (h[m + 6] = S[(f + (4 * m + 24)) >> 2]),
                (h[m + 7] = S[(f + (4 * m + 28)) >> 2]),
                (h[m + 8] = S[(f + (4 * m + 32)) >> 2]);
          else h = S.subarray(f >> 2, (f + 36 * b) >> 2);
          Z.uniformMatrix3fv(Kd(a), !!d, h);
        }
      },
      Jc: function (a, b, d, f) {
        if (2 <= x.version)
          b && Z.uniformMatrix4fv(Kd(a), !!d, S, f >> 2, 16 * b);
        else {
          if (18 >= b) {
            var h = Ld[16 * b - 1],
              m = S;
            f >>= 2;
            for (var u = 0; u < 16 * b; u += 16) {
              var n = f + u;
              h[u] = m[n];
              h[u + 1] = m[n + 1];
              h[u + 2] = m[n + 2];
              h[u + 3] = m[n + 3];
              h[u + 4] = m[n + 4];
              h[u + 5] = m[n + 5];
              h[u + 6] = m[n + 6];
              h[u + 7] = m[n + 7];
              h[u + 8] = m[n + 8];
              h[u + 9] = m[n + 9];
              h[u + 10] = m[n + 10];
              h[u + 11] = m[n + 11];
              h[u + 12] = m[n + 12];
              h[u + 13] = m[n + 13];
              h[u + 14] = m[n + 14];
              h[u + 15] = m[n + 15];
            }
          } else h = S.subarray(f >> 2, (f + 64 * b) >> 2);
          Z.uniformMatrix4fv(Kd(a), !!d, h);
        }
      },
      Kc: function (a) {
        a = md[a];
        Z.useProgram(a);
        Z.Hf = a;
      },
      Lc: function (a, b) {
        Z.vertexAttrib1f(a, b);
      },
      Mc: function (a, b) {
        Z.vertexAttrib2f(a, S[b >> 2], S[(b + 4) >> 2]);
      },
      Nc: function (a, b) {
        Z.vertexAttrib3f(a, S[b >> 2], S[(b + 4) >> 2], S[(b + 8) >> 2]);
      },
      Oc: function (a, b) {
        Z.vertexAttrib4f(
          a,
          S[b >> 2],
          S[(b + 4) >> 2],
          S[(b + 8) >> 2],
          S[(b + 12) >> 2]
        );
      },
      pc: function (a, b) {
        Z.vertexAttribDivisor(a, b);
      },
      qc: function (a, b, d, f, h) {
        Z.vertexAttribIPointer(a, b, d, f, h);
      },
      Pc: function (a, b, d, f, h, m) {
        Z.vertexAttribPointer(a, b, d, !!f, h, m);
      },
      Qc: function (a, b, d, f) {
        Z.viewport(a, b, d, f);
      },
      lb: function (a, b, d, f) {
        Z.waitSync(sd[a], b, (d >>> 0) + 4294967296 * f);
      },
      tb: function (a) {
        var b = K.length;
        a >>>= 0;
        if (2147483648 < a) return !1;
        for (var d = 1; 4 >= d; d *= 2) {
          var f = b * (1 + 0.2 / d);
          f = Math.min(f, a + 100663296);
          var h = Math;
          f = Math.max(a, f);
          h = h.min.call(h, 2147483648, f + ((65536 - (f % 65536)) % 65536));
          a: {
            try {
              Qa.grow((h - jb.byteLength + 65535) >>> 16);
              nb();
              var m = 1;
              break a;
            } catch (u) {}
            m = void 0;
          }
          if (m) return !0;
        }
        return !1;
      },
      nb: function () {
        return x ? x.Uf : 0;
      },
      wb: function (a, b) {
        var d = 0;
        Od().forEach(function (f, h) {
          var m = b + d;
          h = lb[(a + 4 * h) >> 2] = m;
          for (m = 0; m < f.length; ++m) kb[h++ >> 0] = f.charCodeAt(m);
          kb[h >> 0] = 0;
          d += f.length + 1;
        });
        return 0;
      },
      xb: function (a, b) {
        var d = Od();
        lb[a >> 2] = d.length;
        var f = 0;
        d.forEach(function (h) {
          f += h.length + 1;
        });
        lb[b >> 2] = f;
        return 0;
      },
      Jb: function (a) {
        if (!noExitRuntime) {
          if (w.onExit) w.onExit(a);
          Ra = !0;
        }
        wa(a, new Ga(a));
      },
      O: function () {
        return 52;
      },
      ob: function () {
        return 52;
      },
      Cb: function () {
        return 52;
      },
      pb: function () {
        return 70;
      },
      T: function (a, b, d, f) {
        for (var h = 0, m = 0; m < d; m++) {
          var u = lb[b >> 2],
            n = lb[(b + 4) >> 2];
          b += 8;
          for (var q = 0; q < n; q++) {
            var v = K[u + q],
              D = Qd[a];
            0 === v || 10 === v
              ? ((1 === a ? Ka : Ja)(Ta(D, 0)), (D.length = 0))
              : D.push(v);
          }
          h += n;
        }
        lb[f >> 2] = h;
        return 0;
      },
      c: function () {
        return La;
      },
      m: ae,
      s: be,
      k: ce,
      J: de,
      Nb: ee,
      _: fe,
      Z: ge,
      Q: he,
      p: ie,
      x: je,
      q: ke,
      w: le,
      Mb: me,
      Kb: ne,
      Lb: oe,
      d: function (a) {
        La = a;
      },
      rb: function (a, b, d, f) {
        return Ud(a, b, d, f);
      },
    };
    (function () {
      function a(h) {
        w.asm = h.exports;
        Qa = w.asm.dd;
        nb();
        ob = w.asm.fd;
        qb.unshift(w.asm.ed);
        tb--;
        w.monitorRunDependencies && w.monitorRunDependencies(tb);
        0 == tb &&
          (null !== ub && (clearInterval(ub), (ub = null)),
          vb && ((h = vb), (vb = null), h()));
      }
      function b(h) {
        a(h.instance);
      }
      function d(h) {
        return Bb()
          .then(function (m) {
            return WebAssembly.instantiate(m, f);
          })
          .then(function (m) {
            return m;
          })
          .then(h, function (m) {
            Ja("failed to asynchronously prepare wasm: " + m);
            Na(m);
          });
      }
      var f = { a: pe };
      tb++;
      w.monitorRunDependencies && w.monitorRunDependencies(tb);
      if (w.instantiateWasm)
        try {
          return w.instantiateWasm(f, a);
        } catch (h) {
          return (
            Ja("Module.instantiateWasm callback failed with error: " + h), !1
          );
        }
      (function () {
        return Ma ||
          "function" != typeof WebAssembly.instantiateStreaming ||
          wb() ||
          yb.startsWith("file://") ||
          za ||
          "function" != typeof fetch
          ? d(b)
          : fetch(yb, { credentials: "same-origin" }).then(function (h) {
              return WebAssembly.instantiateStreaming(h, f).then(
                b,
                function (m) {
                  Ja("wasm streaming compile failed: " + m);
                  Ja("falling back to ArrayBuffer instantiation");
                  return d(b);
                }
              );
            });
      })().catch(ea);
      return {};
    })();
    w.___wasm_call_ctors = function () {
      return (w.___wasm_call_ctors = w.asm.ed).apply(null, arguments);
    };
    var Lc = (w._free = function () {
        return (Lc = w._free = w.asm.gd).apply(null, arguments);
      }),
      Gd = (w._malloc = function () {
        return (Gd = w._malloc = w.asm.hd).apply(null, arguments);
      }),
      Kc = (w.___getTypeName = function () {
        return (Kc = w.___getTypeName = w.asm.id).apply(null, arguments);
      });
    w.___embind_register_native_and_builtin_types = function () {
      return (w.___embind_register_native_and_builtin_types = w.asm.jd).apply(
        null,
        arguments
      );
    };
    var qe = (w._setThrew = function () {
        return (qe = w._setThrew = w.asm.kd).apply(null, arguments);
      }),
      re = (w.stackSave = function () {
        return (re = w.stackSave = w.asm.ld).apply(null, arguments);
      }),
      se = (w.stackRestore = function () {
        return (se = w.stackRestore = w.asm.md).apply(null, arguments);
      });
    w.dynCall_viji = function () {
      return (w.dynCall_viji = w.asm.nd).apply(null, arguments);
    };
    w.dynCall_vijiii = function () {
      return (w.dynCall_vijiii = w.asm.od).apply(null, arguments);
    };
    w.dynCall_viiiiij = function () {
      return (w.dynCall_viiiiij = w.asm.pd).apply(null, arguments);
    };
    w.dynCall_jiiiijiiiii = function () {
      return (w.dynCall_jiiiijiiiii = w.asm.qd).apply(null, arguments);
    };
    w.dynCall_viiij = function () {
      return (w.dynCall_viiij = w.asm.rd).apply(null, arguments);
    };
    w.dynCall_jii = function () {
      return (w.dynCall_jii = w.asm.sd).apply(null, arguments);
    };
    w.dynCall_vij = function () {
      return (w.dynCall_vij = w.asm.td).apply(null, arguments);
    };
    w.dynCall_iiij = function () {
      return (w.dynCall_iiij = w.asm.ud).apply(null, arguments);
    };
    w.dynCall_iiiij = function () {
      return (w.dynCall_iiiij = w.asm.vd).apply(null, arguments);
    };
    w.dynCall_viij = function () {
      return (w.dynCall_viij = w.asm.wd).apply(null, arguments);
    };
    w.dynCall_ji = function () {
      return (w.dynCall_ji = w.asm.xd).apply(null, arguments);
    };
    w.dynCall_iij = function () {
      return (w.dynCall_iij = w.asm.yd).apply(null, arguments);
    };
    w.dynCall_jiiiiii = function () {
      return (w.dynCall_jiiiiii = w.asm.zd).apply(null, arguments);
    };
    w.dynCall_jiiiiji = function () {
      return (w.dynCall_jiiiiji = w.asm.Ad).apply(null, arguments);
    };
    w.dynCall_iijj = function () {
      return (w.dynCall_iijj = w.asm.Bd).apply(null, arguments);
    };
    w.dynCall_iiiji = function () {
      return (w.dynCall_iiiji = w.asm.Cd).apply(null, arguments);
    };
    w.dynCall_iiji = function () {
      return (w.dynCall_iiji = w.asm.Dd).apply(null, arguments);
    };
    w.dynCall_iijjiii = function () {
      return (w.dynCall_iijjiii = w.asm.Ed).apply(null, arguments);
    };
    w.dynCall_vijjjii = function () {
      return (w.dynCall_vijjjii = w.asm.Fd).apply(null, arguments);
    };
    w.dynCall_jiji = function () {
      return (w.dynCall_jiji = w.asm.Gd).apply(null, arguments);
    };
    w.dynCall_viijii = function () {
      return (w.dynCall_viijii = w.asm.Hd).apply(null, arguments);
    };
    w.dynCall_iiiiij = function () {
      return (w.dynCall_iiiiij = w.asm.Id).apply(null, arguments);
    };
    w.dynCall_iiiiijj = function () {
      return (w.dynCall_iiiiijj = w.asm.Jd).apply(null, arguments);
    };
    w.dynCall_iiiiiijj = function () {
      return (w.dynCall_iiiiiijj = w.asm.Kd).apply(null, arguments);
    };
    function ae(a, b) {
      var d = re();
      try {
        return Db(a)(b);
      } catch (f) {
        se(d);
        if (f !== f + 0) throw f;
        qe(1, 0);
      }
    }
    function be(a, b, d) {
      var f = re();
      try {
        return Db(a)(b, d);
      } catch (h) {
        se(f);
        if (h !== h + 0) throw h;
        qe(1, 0);
      }
    }
    function ke(a, b, d, f) {
      var h = re();
      try {
        Db(a)(b, d, f);
      } catch (m) {
        se(h);
        if (m !== m + 0) throw m;
        qe(1, 0);
      }
    }
    function ce(a, b, d, f) {
      var h = re();
      try {
        return Db(a)(b, d, f);
      } catch (m) {
        se(h);
        if (m !== m + 0) throw m;
        qe(1, 0);
      }
    }
    function ie(a, b) {
      var d = re();
      try {
        Db(a)(b);
      } catch (f) {
        se(d);
        if (f !== f + 0) throw f;
        qe(1, 0);
      }
    }
    function ee(a, b, d, f, h, m) {
      var u = re();
      try {
        return Db(a)(b, d, f, h, m);
      } catch (n) {
        se(u);
        if (n !== n + 0) throw n;
        qe(1, 0);
      }
    }
    function le(a, b, d, f, h) {
      var m = re();
      try {
        Db(a)(b, d, f, h);
      } catch (u) {
        se(m);
        if (u !== u + 0) throw u;
        qe(1, 0);
      }
    }
    function fe(a, b, d, f, h, m, u) {
      var n = re();
      try {
        return Db(a)(b, d, f, h, m, u);
      } catch (q) {
        se(n);
        if (q !== q + 0) throw q;
        qe(1, 0);
      }
    }
    function de(a, b, d, f, h) {
      var m = re();
      try {
        return Db(a)(b, d, f, h);
      } catch (u) {
        se(m);
        if (u !== u + 0) throw u;
        qe(1, 0);
      }
    }
    function je(a, b, d) {
      var f = re();
      try {
        Db(a)(b, d);
      } catch (h) {
        se(f);
        if (h !== h + 0) throw h;
        qe(1, 0);
      }
    }
    function he(a) {
      var b = re();
      try {
        Db(a)();
      } catch (d) {
        se(b);
        if (d !== d + 0) throw d;
        qe(1, 0);
      }
    }
    function me(a, b, d, f, h, m) {
      var u = re();
      try {
        Db(a)(b, d, f, h, m);
      } catch (n) {
        se(u);
        if (n !== n + 0) throw n;
        qe(1, 0);
      }
    }
    function oe(a, b, d, f, h, m, u, n, q, v) {
      var D = re();
      try {
        Db(a)(b, d, f, h, m, u, n, q, v);
      } catch (I) {
        se(D);
        if (I !== I + 0) throw I;
        qe(1, 0);
      }
    }
    function ne(a, b, d, f, h, m, u) {
      var n = re();
      try {
        Db(a)(b, d, f, h, m, u);
      } catch (q) {
        se(n);
        if (q !== q + 0) throw q;
        qe(1, 0);
      }
    }
    function ge(a, b, d, f, h, m, u, n, q, v) {
      var D = re();
      try {
        return Db(a)(b, d, f, h, m, u, n, q, v);
      } catch (I) {
        se(D);
        if (I !== I + 0) throw I;
        qe(1, 0);
      }
    }
    var te;
    function Ga(a) {
      this.name = "ExitStatus";
      this.message = "Program terminated with exit(" + a + ")";
      this.status = a;
    }
    vb = function ue() {
      te || ve();
      te || (vb = ue);
    };
    function ve() {
      function a() {
        if (!te && ((te = !0), (w.calledRun = !0), !Ra)) {
          Cb(qb);
          aa(w);
          if (w.onRuntimeInitialized) w.onRuntimeInitialized();
          if (w.postRun)
            for (
              "function" == typeof w.postRun && (w.postRun = [w.postRun]);
              w.postRun.length;

            ) {
              var b = w.postRun.shift();
              rb.unshift(b);
            }
          Cb(rb);
        }
      }
      if (!(0 < tb)) {
        if (w.preRun)
          for (
            "function" == typeof w.preRun && (w.preRun = [w.preRun]);
            w.preRun.length;

          )
            sb();
        Cb(pb);
        0 < tb ||
          (w.setStatus
            ? (w.setStatus("Running..."),
              setTimeout(function () {
                setTimeout(function () {
                  w.setStatus("");
                }, 1);
                a();
              }, 1))
            : a());
      }
    }
    w.run = ve;
    if (w.preInit)
      for (
        "function" == typeof w.preInit && (w.preInit = [w.preInit]);
        0 < w.preInit.length;

      )
        w.preInit.pop()();
    ve();

    return CanvasKitInit.ready;
  };
})();
if (typeof exports === "object" && typeof module === "object")
  module.exports = CanvasKitInit;
else if (typeof define === "function" && define["amd"])
  define([], function () {
    return CanvasKitInit;
  });
else if (typeof exports === "object") exports["CanvasKitInit"] = CanvasKitInit;
