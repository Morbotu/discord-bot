module.exports = async (message) => {
    var channel = message.channel;
    var faceMessage = await channel.send(
        ":black_large_square:".repeat(12) +
            "\n" +
            ":black_large_square:".repeat(2) +
            ":yellow_square:" +
            ":black_large_square:".repeat(6) +
            ":yellow_square:" +
            ":black_large_square:".repeat(2) +
            "\n" +
            ":black_large_square:".repeat(12) +
            "\n" +
            ":black_large_square:".repeat(12) +
            "\n" +
            ":black_large_square:".repeat(12) +
            "\n" +
            ":black_large_square:".repeat(2) +
            ":yellow_square:" +
            ":black_large_square:".repeat(6) +
            ":yellow_square:" +
            ":black_large_square:".repeat(2) +
            "\n" +
            ":black_large_square:".repeat(3) +
            ":yellow_square:".repeat(6) +
            ":black_large_square:".repeat(3) +
            "\n" +
            ":black_large_square:".repeat(12)
    );
    setTimeout(function () {
        faceMessage.edit(
            ":black_large_square:".repeat(12) +
                "\n" +
                ":black_large_square:".repeat(2) +
                ":yellow_square:" +
                ":black_large_square:".repeat(6) +
                ":yellow_square:" +
                ":black_large_square:".repeat(2) +
                "\n" +
                ":black_large_square:".repeat(12) +
                "\n" +
                ":black_large_square:".repeat(5) +
                ":yellow_square:".repeat(2) +
                ":black_large_square:".repeat(5) +
                "\n" +
                ":black_large_square:".repeat(4) +
                ":yellow_square:" +
                ":black_large_square:".repeat(2) +
                ":yellow_square:" +
                ":black_large_square:".repeat(4) +
                "\n" +
                ":black_large_square:".repeat(4) +
                ":yellow_square:" +
                ":black_large_square:".repeat(2) +
                ":yellow_square:" +
                ":black_large_square:".repeat(4) +
                "\n" +
                ":black_large_square:".repeat(5) +
                ":yellow_square:".repeat(2) +
                ":black_large_square:".repeat(5) +
                "\n" +
                ":black_large_square:".repeat(12)
        );
    }, 1000);
};
