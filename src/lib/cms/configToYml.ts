import YAML from 'yaml'
import fs from 'fs'
import path from 'path'
import config from './config'

const __dirname = path.resolve()
const configDisclaimer = '# This file is generated\n# Only edit the config.ts file\n\n'
const configString = `${configDisclaimer}${YAML.stringify(config)}`

fs.writeFile(path.resolve(__dirname, 'static', 'admin', 'config.yml'), configString, (err) => {
  if (err) {
    console.log(err)
  } else {
    console.log('✔ Generated the config.yml')
  }
})
