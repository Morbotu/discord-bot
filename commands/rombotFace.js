const readimage = require("readimage");
const fs = require("fs");
const filedata = fs.readFileSync("./animations/face.jpg");

function imageToMessage(readimage, fs, filedata) {
    var faceMessage = "";
    readimage(filedata, function (err, image) {
        if (err) {
            console.log("failed to read the image");
            console.log(err);
        }
        for (let i = 0; i < image.height; i++) {
            for (let j = 0; j < image.width * 4; j += 4) {
                let r = image.frames[0].data[j + i * image.width * 4];
                let g = image.frames[0].data[j + i * image.width * 4 + 1];
                let b = image.frames[0].data[j + i * image.width * 4 + 2];
                if (r === 0 && g === 0 && b === 0)
                    faceMessage = faceMessage.concat(":black_large_square:");
                if (r === 255 && g === 255 && b === 0)
                    faceMessage = faceMessage.concat(":yellow_square:");
            }
            faceMessage = faceMessage.concat("\n");
        }
    });
    return faceMessage;
}

module.exports = async (message) => {
    var channel = message.channel;
    channel.send(imageToMessage(readimage, fs, filedata));
};
