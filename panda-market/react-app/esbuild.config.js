import esbuild from 'esbuild';

esbuild.build({
  sourcemap: true,
  logLevel: 'info',
  platform: 'browser',
  entryPoints: ['src/index.js'],
  bundle: true,
  minify: true,
  outfile: 'dist/esb-bundle.js',
  write: true,
  loader: {
    '.js': 'jsx',
    '.svg': 'file',
    '.jpg': 'file',
    '.jpeg': 'file',
    '.png': 'file',
  },
  define: { 'process.env.NODE_ENV': '"production"' },
  jsxFactory: 'React.createElement',
  jsxFragment: 'React.Fragment',
  inject: ['./react-shim.js'], // 자동 주입 파일 추가
  // Other options...
})
.catch(() => process.exit(1));