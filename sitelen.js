module.exports = (canvas, text, { font, fontColor, fontSize }) => {
    const lines = text.split("\n");
    const ctx = canvas.getContext("2d");
    ctx.font = `${fontSize}px ${font}`;

    const metrics = ctx.measureText(text);
    const fontHeight =
        metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent;

    const line1Metrics = ctx.measureText(lines[0]);
    const line1Ascent = line1Metrics.actualBoundingBoxAscent;
    const line1Height =
        line1Metrics.actualBoundingBoxAscent +
        line1Metrics.fontBoundingBoxDescent;

    const strokeWidth = (fontSize / 133) * 5 * 2.25;
    const padding = 2 * strokeWidth;

    canvas.width =
        Math.max(lines.map((x) => ctx.measureText(x).width)) + padding;
    canvas.height = fontHeight * (lines.length - 1) + line1Height + padding;

    ctx.font = `${fontSize}px ${font}`;
    ctx.fillStyle = fontColor;
    ctx.strokeStyle = "#36393f";
    ctx.lineWidth = strokeWidth;
    ctx.lineJoin = "round";

    lines.forEach((line, i) => {
        let x = strokeWidth;
        let y = fontHeight * i + padding + line1Ascent;
        ctx.strokeText(line, x, y);
        ctx.fillText(line, x, y);
    });
};
