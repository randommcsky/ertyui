const Command = require('../../structures/Command.js');
const { MessageEmbed } = require('discord.js');

/**
 * Class to give money to members
 *
 * @class AddMoney
 * @extends {Command}
 */
class AddMoney extends Command {
    /**
     * Creates an instance of AddMoney
     *
     * @param {string} file
     */
    constructor(file) {
        super(file);
    }

    /**
     * Give money to a member
     *
     * @param {Message} message
     * @param {string[]} args
     */
    async run(message, args) {
        let amount = Number(args.pop());

        if (!Number.isInteger(amount) || amount <= 0) {
            message.reply(bot.lang.invalidArguments);

            return;
        }

        let member = message.mentions.members.first() || message.member;

        if (!member) {
            message.reply(bot.lang.cantFindUser);

            return;
        }

        member.giveMoney(amount);

        let { addMoney: format } = bot.lang,
            embed = new MessageEmbed()
                .setTitle(format.title)
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setThumbnail(member.user.displayAvatarURL())
                .setColor(bot.consts.COLOR.ADDMONEY_EMBED)
                .addFields(
                    {
                        name: format.amount.name,
                        value: amount,
                        inline: true
                    },
                    {
                        name: format.balance.name,
                        value: member.info.money,
                        inline: true
                    }
                );

        message.channel.send(embed);
    }
}

module.exports = AddMoney;
