import sharp from 'sharp';

const TARGET_LONG = 2400;
const QUALITY = 82;

export async function compressImage(srcPath, destPath) {
  const img = sharp(srcPath, { failOn: 'none' });
  const meta = await img.metadata();
  const w = meta.width ?? 0, h = meta.height ?? 0;
  const long = Math.max(w, h);
  const pipeline = long > TARGET_LONG
    ? img.resize({
        width: w >= h ? TARGET_LONG : null,
        height: h > w ? TARGET_LONG : null,
        fit: 'inside',
        withoutEnlargement: true,
      })
    : img;
  await pipeline.jpeg({ quality: QUALITY, mozjpeg: true }).toFile(destPath);
}
