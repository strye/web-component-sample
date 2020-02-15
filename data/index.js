const expanses = require("./expanses.json"),
explorations = require("./explorations.json");
aspirations = require("./aspirations.json");
activities = require("./activities.json");
inquiries = require("./inquiries.json");
momentos = require("./momentos.json");
users = require("./users.json");

const getTable = (name) => {
    switch (name) {
        case "expanses": return expanses;
        case "explorations": return explorations;
        case "aspirations": return aspirations;
        case "activities": return activities;
        case "inquiries": return inquiries;
        case "momentos": return momentos;
        case "users": return users;
        default: return null;
    }
}

module.exports.Version = "0.0.1"

module.exports.Expanses = expanses;
module.exports.Explorations = explorations;
module.exports.Aspirations = aspirations;
module.exports.Activities = activities;
module.exports.Inquiries = inquiries;
module.exports.Momentos = momentos;
module.exports.Users = users;


module.exports.getAll = (table) => {
    return getTable(table);
}

module.exports.getByParentId = (table, field, value) => {
    let tbl = getTable(table);
    var results = [];
    tbl.forEach(function(row) {
        if (row[field] === value) { results.push(row); }
    });
    return results;
}

