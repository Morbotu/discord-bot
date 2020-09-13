# Discord-bot

Hello this is my discord bot. In quarantine I was really bored so I made this. It is a discord bot with a few functions I liked to made. The bot isn't open for public use. I only use it for a server with my friends. However, I still wanted to share to code with other people. Maybe someone can learn something from it.

---

## Table of content

-   [Tools used](#tools-used)
-   [Commands](#commands)
-   [TODO](#todo)

---

## Tools used

-   npm [<img width="16px" alt="npm" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJcAAAA7CAMAAABBn+jeAAAAY1BMVEX////LODfJJyXpu7rJLCvhmprKNDPswsLQVFPIHRzIIyHw0dHHExH89/fz2dn78vLSXl7jpaX25OTNQ0LagIDFAADekZDuyMjOSknotbXin5/IGRfbhobYe3rlq6v57OzVbGzok7qmAAABRklEQVRoge3ZbVPCMAwH8HWEjuJQdPLgUPD7f0pPmuCZGtPeubO3y//d0jT7wQt2dI2rM81/A4SYqyzmKkv1Lmi1TNHJA9wF+4UW3ANLrfEFYTCqM3n2wFztodESYuf6Tmvc9LEz3KszeQ4td3VVuDpzmctcP7keMBvVxTtlVzKTCgWuVR8+sxtVF5y+d8quNXYu8PqyC7HwlO/a+rjwqLqG2AnUKbsczry5cGYod4G5zGUuc5nLXOaak8vBNaE21+vzNW80ohYXj7nMZa6ZupLzL/qfdi52NT27W+K6/dKR64KF5PzLH1cstDBQwUuuLd/qpZnJAhXo+uiZy3meZMFJrkHdqs1MC+Xn0eJz+09jLnNN6oLsqC6fP0tNs8yO9L6jG5D1PuYP08I/+y854ReWvPWh+lmfMUXIJeXrSWouc5lrVq4PWiQ8IeB9anoAAAAASUVORK5CYII=" />](https://www.npmjs.com/)
-   Nodejs [<img width="16px" alt="Nodejs" src="https://nodejs.org/static/images/favicons/favicon.ico" />](https://nodejs.org/)
-   Visual Studio Code [<img width="16px" alt="Visual Studio Code" src="https://code.visualstudio.com/favicon.ico" />](https://code.visualstudio.com/)
-   Discordjs [<img width="16px" alt="discordjs" src="https://discord.js.org/favicon.ico" />](https://discord.js.org/#/)
-   Keyv [<img width="16px" alt="keyv" src="https://rawgit.com/lukechilds/keyv/master/media/logo.svg" />](https://www.npmjs.com/package/keyv)
-   Rookout [<img width="45px" alt="Rookout" src="https://assets-global.website-files.com/5d792a228fd93fd1036cdd67/5db1b13d383b8ff22038a7cd_Rookout_logo_horizontal_1%402x.png" />](https://www.rookout.com)

---

## Commands

The program reads message from discord as commands. Here is a list of all the commands with a explanation of how they work.

-   [button.js](commands/button.js)
    : This program is inspired by a game on the hermitcraft server. The goal is to get the highest rank. You get a higher rank be pressing sending `R!button press` in discord if the button is on the rank you want. If you use `R!button look` you can see the rank the button on. It will look like this: ![picture](images/buttonInterface.png) Red is of course the highest rank. To start and restart the button use `R!button start`. Each rank has a color so everyone in chat can see which rank you've got. However, make sure that you set the color off the other roles to standard or prioritize the rank roles over the other roles.
-   [duel.js](commands/duel.js)
    : I saw that a lot of discord bots had a duel game, so my bot would have one too. It turned out that it was not as easy as it looked like. However, I made it work and I'm quite proud of how it turned out.
-   [help.js](commands/help.js)
    : help.js is just a command where you can get information about the different commands available to the user.
-   [rombotFace.js](commands/rombotFace.js)
    : This command is still a work in progress. I was bored again so I tried to convert a gif into a message of emojis. I also made it animate by editing the message every second. To activate it type `R!rombot`.
-   [sayHello.js](commands/sayHello.js)
    : sayHello.js is very simple. All it does is sending reply to everybody who says `hello`, `hallo` or `goedendag` (the last two are dutch greeting). I use it to test if the bot is online.

---

## TODO

-   [ ] Change [rombotFace.js](commands/rombotFace.js), so everyone can make a gif and convert it into emojis.
-   [ ] Make a part in help.js for instructions about [rombotFace.js](commands/rombotFace.js).
-   [ ] Make a few math functions just like most virtual assistance have.
