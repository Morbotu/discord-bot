const readimage = require("readimage");
const fs = require("fs");
const filedata = fs.readFileSync("./animations/animation.gif");

function imageToMessage(readimage, fs, filedata, frame) {
    var gif;
    readimage(filedata, function (err, image) {
        if (err) {
            console.log("failed to read the image");
            console.log(err);
        }
        gif = image;
    });
    if (frame === gif.frames.length) return "done";
    var faceMessage = "";
    for (let i = 0; i < gif.height; i++) {
        for (let j = 0; j < gif.width * 4; j += 4) {
            let r = gif.frames[frame].data[j + i * gif.width * 4];
            let g = gif.frames[frame].data[j + i * gif.width * 4 + 1];
            let b = gif.frames[frame].data[j + i * gif.width * 4 + 2];
            if (r === 0 && g === 0 && b === 0)
                faceMessage = faceMessage.concat(":black_large_square:");
            if (r === 255 && g === 255 && b === 0)
                faceMessage = faceMessage.concat(":yellow_square:");
        }
        faceMessage = faceMessage.concat("\n");
    }
    return faceMessage;
}

module.exports = async (message) => {
    var channel = message.channel;
    var faceMessageInstance = await channel.send(imageToMessage(readimage, fs, filedata, 0));
    var frame = 1;
    var interval = setInterval(async () => {
        let text = imageToMessage(readimage, fs, filedata, frame);
        if (text === "done") return clearInterval(interval);
        await faceMessageInstance.edit(text);
        frame++;
    }, 1000);
};
