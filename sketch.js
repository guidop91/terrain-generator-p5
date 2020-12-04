let columns;
let rows;
let scale = 20;
let terrain = [];
let w, h;
let flying = 0;

function setup() {
  createCanvas(1000, 600, WEBGL);
  w = 1500;
  h = 1000;
  columns = w / scale;
  rows = h / scale;
}

function draw() {
  generateTerrain(flying);
  flying -= 0.1
  background(51);
  rotateX(PI / 3);
  fill(128, 255, 128, 220);
  stroke(61, 41, 20)
  // A canvas with WEBGL starts out with cursor on the center, reposition to top-left corner
  translate(-w / 2, -h / 2);
  for (let y = 0; y < rows - 1; y++) {
    beginShape(TRIANGLE_STRIP);
    for (let x = 0; x < columns; x++) {
      vertex(x * scale, y * scale, terrain[x][y] * scale);
      vertex(x * scale, (y + 1) * scale, terrain[x][y+1] * scale);
    }
    endShape();
  }
}

function generateTerrain(yOff) {
  for (let y = 0; y < rows; y++) {
    let xOff = 0;
    for (let x = 0; x < columns; x++) {
      if (!terrain[x]) terrain[x] = [];
      terrain[x][y] = map(noise(xOff, yOff), 0, 1, -8, 8);
      xOff += 0.1
    }
    yOff += 0.1
  }
}
