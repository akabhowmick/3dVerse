// One-off image-conversion script: run manually via
//   node scripts/convert-images.mjs product
//   node scripts/convert-images.mjs hero
// Not part of the build or CI -- a build-time tool only.
//
// Converts PNG/JPG assets to WebP, resizing to a sane max dimension for
// their actual on-page display size, and writes the .webp file alongside
// the original (same directory, same basename) so only the file extension
// changes in import statements.

import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const TARGETS = {
  product: {
    dir: "src/assets/ProductImages",
    maxDimension: 800,
    maxKB: 200,
  },
  hero: {
    dir: "src/assets/Main/Hero",
    maxDimension: 1600,
    maxKB: 350,
  },
};

const target = process.argv[2];
if (!target || !TARGETS[target]) {
  console.error(`Usage: node scripts/convert-images.mjs <${Object.keys(TARGETS).join("|")}>`);
  process.exit(1);
}

const { dir, maxDimension, maxKB } = TARGETS[target];
const maxBytes = maxKB * 1024;

const files = fs
  .globSync(path.join(dir, "**/*.{png,jpg,jpeg,PNG,JPG,JPEG}"))
  .sort();

if (files.length === 0) {
  console.log(`No PNG/JPG files found under ${dir}`);
  process.exit(0);
}

const rows = [];

for (const inputPath of files) {
  const originalBytes = fs.statSync(inputPath).size;
  const outputPath = inputPath.replace(/\.(png|jpg|jpeg)$/i, ".webp");

  let quality = 80;
  let outputBuffer;
  do {
    outputBuffer = await sharp(inputPath)
      .resize({ width: maxDimension, height: maxDimension, fit: "inside", withoutEnlargement: true })
      .webp({ quality })
      .toBuffer();
    quality -= 10;
  } while (outputBuffer.length > maxBytes && quality >= 60);

  fs.writeFileSync(outputPath, outputBuffer);

  const overBudget = outputBuffer.length > maxBytes;
  rows.push({
    file: path.relative(process.cwd(), inputPath),
    originalKB: Math.round(originalBytes / 1024),
    newKB: Math.round(outputBuffer.length / 1024),
    reduction: `${Math.round((1 - outputBuffer.length / originalBytes) * 100)}%`,
    warning: overBudget ? `STILL OVER ${maxKB}KB TARGET` : "",
  });
}

console.table(rows);
