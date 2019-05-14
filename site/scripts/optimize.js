const sharp = require(`sharp`)
const glob = require(`glob`)
const fs = require(`fs-extra`)

const MAX_WIDTH = 1800
const QUALITY = 70

const matches = glob.sync(`content/images/**/*.{png,jpg,jpeg}`)

Promise.all(
  matches.map(async match => {
    const stream = sharp(match)
    const info = await stream.metadata()
    if (info.width < MAX_WIDTH) {
      return
    }
    const optimizedName = match.replace(
      /(\..+)$/,
      (_, ext) => `-optimized${ext}`
    )
    await stream
      .resize(MAX_WIDTH)
      .jpeg({ quality: QUALITY })
      .toFile(optimizedName)
    return fs.rename(optimizedName, match)
  })
)
