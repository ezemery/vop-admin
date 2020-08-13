module.exports = {
  '*.{js,jsx}': ['eslint --fix', 'prettier --write', 'prettier --check'],
  '*.{md,mdx,css,yaml,yml}': ['prettier --write', 'prettier --check'],
};
