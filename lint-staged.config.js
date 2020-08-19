module.exports = {
  'src/*.{js,jsx,ts,tsx}': ['eslint --fix', 'prettier --write', 'prettier --check'],
  '*.{md,mdx,css,yaml,yml}': ['prettier --write', 'prettier --check'],
};
