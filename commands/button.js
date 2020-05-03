module.exports = message => {
    // return message.guild.roles.create({
    //     data: {
    //       name: 'Super Cool People',
    //       color: 'BLUE',
    //     },
    //     reason: 'we needed a role for Super Cool People',
    //   })
    //     .then(console.log)
    //     .catch(console.error);
    let scpID = message.guild.roles.cache.find(role => role.name === "Super Cool People");
    message.member.roles.remove(scpID);
}