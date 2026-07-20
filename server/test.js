const dns = require("dns");

dns.resolveSrv(
  "_mongodb._tcp.restaurant-cluster.fhhunro.mongodb.net",
  (err, addresses) => {
    console.log(err);
    console.log(addresses);
  }
);