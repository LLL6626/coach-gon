"""Genera index.html a partir de src.html y del plan en datos.

Uso: python3 build.py
Para cambiar el plan, edita plan_media_maraton.json y vuelve a ejecutar.
Al publicar una versión nueva, sube APP_VERSION (src.html) y VERSION (sw.js).
"""
import json
from pathlib import Path

here = Path(__file__).parent
plan = json.loads((here / "plan_media_maraton.json").read_text(encoding="utf-8"))
src = (here / "src.html").read_text(encoding="utf-8")
assert "/*PLAN_JSON*/" in src
out = src.replace("/*PLAN_JSON*/", json.dumps(plan, ensure_ascii=False, separators=(",", ":")))
(here / "index.html").write_text(out, encoding="utf-8")
print("index.html generado:", len(out) // 1024, "KB")
