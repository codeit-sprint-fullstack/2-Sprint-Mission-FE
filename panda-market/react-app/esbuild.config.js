import esbuild from 'esbuild';

// Get the page name from the command line arguments
let pageName = process.argv[2];
let dirName = `${pageName}/`;

if (!pageName) {
  console.log('Default is index[.jsx]');
  pageName = 'index';
  dirName = '';
}

esbuild.build({
  sourcemap: true,
  logLevel: 'info',
  platform: 'browser',
  entryPoints: [`src/${pageName}.jsx`],
  bundle: true,
  minify: false,
  outfile: `dist/${dirName}esb-bundle.js`,
  write: true,
  loader: {
    '.js': 'jsx',
    '.svg': 'file',
    '.jpg': 'file',
    '.jpeg': 'file',
    '.png': 'file',
  },
  jsx: 'automatic',
  define: { 'process.env.NODE_ENV': '"production"' },
  jsxFactory: 'React.createElement',
  jsxFragment: 'React.Fragment',
  inject: ['./react-shim.js'], // 자동 주입 파일 추가
  // Other options...
})
.catch(() => process.exit(1));