/* ------------------------ SECTION Code of module. ----------------------- */
module.exports = async (keyv, message) => {
    return message.reply(await keyv.get("rooms"));
};
/* -------------------------------- !SECTION -------------------------------- */
