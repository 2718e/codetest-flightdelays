const Bundler = require('parcel-bundler')
const Path = require('path')

async function makeParcelBundler() {
  const clientEntryPoint = Path.join(__dirname, './client/index.html')
  const options = {}
  const bundler = new Bundler(clientEntryPoint, options)   
  return bundler
}

module.exports = { makeParcelBundler }