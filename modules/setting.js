const fs = require('fs');
const welcome_default = { "welcomeCh":null, "welcomeMessage":"まずはルールを見よう!", "welcome":false };
exports.restore = () => {
    const data = JSON.parse(fs.readFileSync('./config.json', 'utf-8'));
    const data_map = new Map(Object.entries(data));
    // リセット
    Object.entries(welcome_default).forEach(([key, value]) => {
        data_map.set(key, value)
    });
    fs.writeFileSync('./config.json',JSON.stringify(Object.fromEntries(data_map),null,2));
}

exports.change_setting = (key, value) => {
    const data = JSON.parse(fs.readFileSync('./config.json', 'utf-8'));
    const data_map = new Map(Object.entries(data));
    data_map.set(key, value)
    fs.writeFileSync('./config.json',JSON.stringify(Object.fromEntries(data_map),null,2));
}