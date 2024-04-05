const Rcon = require("rcon");
const {config} = require("dotenv");

config()

exports.access = async (nickname) => {
    const client = new Rcon(process.env.ip, process.env.port, process.env.password);

    await client.on('auth', function() {
      client.send(`whitelist add ${nickname}`);
    }).on('error', function(err) {
        console.log("Error: " + err);
    }).on('end', function() {
        console.log("Connection closed");
    });

    client.connect();

    return;
}

exports.privilegeMonth = async (privilege, nickname) => {
    const client = new Rcon(process.env.ip, process.env.port, process.env.password);

    await client.on('auth', function() {
      client.send(`lp user ${nickname} parent addtemp ${privilege} 1month`);
    }).on('error', function(err) {
        console.log("Error: " + err);
    }).on('end', function() {
        console.log("Connection closed");
    });

    client.connect();

    return;
}

exports.privilegeYear = async (privilege, nickname) => {
    const client = new Rcon(process.env.ip, process.env.port, process.env.password);

    await client.on('auth', function() {
      client.send(`lp user ${nickname} parent addtemp ${privilege} 1y`);
    }).on('error', function(err) {
        console.log("Error: " + err);
    }).on('end', function() {
        console.log("Connection closed");
    });

    client.connect();

    return;
}

exports.unban = async (nickname) => {
    const client = new Rcon(process.env.ip, process.env.port, process.env.password);

    await client.on('auth', function() {
      client.send(`pardon ${nickname}`);
    }).on('error', function(err) {
        console.log("Error: " + err);
    }).on('end', function() {
        console.log("Connection closed");
    });

    client.connect();

    res.send("Succesfull!")

    return;
}