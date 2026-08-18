import fs from 'fs';
import path from 'path';

// The built CSS filename contains a content hash that changes every build,
// so pick up whatever `dist/assets/index-*.css` is currently present.
const cssDir = 'dist/assets';
const cssFile = fs.readdirSync(cssDir).find((f) => /^index-.*\.css$/.test(f));
const css = fs.readFileSync(path.join(cssDir, cssFile), 'utf8');

// Match every hashed `._float_…` class rule block, e.g. ._float_hos3s_4{…}
const re = /\._float_[a-z0-9]+_\d+\{[^}]*\}/g;
let m;
while ((m = re.exec(css)) !== null) {
  console.log(m[0]);
}

