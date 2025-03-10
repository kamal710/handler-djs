const chalk = require('chalk');
const fs = require('fs');
const {
    readdirSync
} = fs;
const client = require('../index');

//SLASH COMMANDS
console.log(chalk.blue.bold('SLASH COMMANDS 🟢'))
readdirSync('./slashCommands').forEach(async (dir) => {
    const commands = readdirSync(`./slashCommands/${dir}/`).filter((file) =>
        file.endsWith(".js")
    );

    commands.map(async cmd => {
        let file = require(`../slashCommands/${dir}/${cmd}`);

        let name = file.name || "No command name.";
        let des = file.description || "No Description";

        const data = {
            name,
            description: des
        };
        
        let option = name == "No command name." ? '❌' : '✅';

        if (option == '✅') {
            setTimeout(async () => {
                client.slash_commands.set(name, {
                    ...data,
                    run: file.run
                });

                await client.guilds.cache.get('801843417154846720').commands.create(data);
            }, 2500);
        }

        console.log(`Loaded Slash Command ${option} | ${name}`);
    });
});

console.log('-'.repeat(30));