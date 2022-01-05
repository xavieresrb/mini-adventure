function drawBitMapCenteredWithRotation(bitMap, atX, atY, angle) {
  canvasContext.save();
  canvasContext.translate(atX, atY);
  canvasContext.rotate(angle);
  canvasContext.drawImage(bitMap, (-1 * bitMap.width) / 2, (-1 * bitMap.height) / 2);
  canvasContext.restore();
}

function colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor) {
  canvasContext.fillStyle = fillColor;
  canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
}

function colorCircle(centerX, centerY, radius, fillColor) {
  canvasContext.fillStyle = fillColor;
  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
  canvasContext.fill();
}

function colorText(words, textX, textY, fillColor) {
  canvasContext.fillStyle = fillColor;
  canvasContext.fillText(words, textX, textY);
}
