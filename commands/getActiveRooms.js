/* ------------------------ SECTION Code of function. ----------------------- */
module.exports = async (keyv, message) => {
    return message.reply(await keyv.get("rooms"));
};
/* -------------------------------- !SECTION -------------------------------- */
