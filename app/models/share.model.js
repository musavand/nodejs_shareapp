const sql = require("./db.js");
// constructor
const Share = function(share) {
  this.sharecode = share.sharecode;  
  this.lastprice = share.lastprice;  
};
Share.create = (newShare, result) => {
  sql.query("INSERT INTO t_share SET ?", newShare, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created share: ", { id: res.insertId, ...newShare });
    result(null, { id: res.insertId, ...newShare });
  });
};
Share.findById = (id, result) => {
  sql.query(`SELECT * FROM t_share WHERE shareid = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found share: ", res[0]);
      result(null, res[0]);
      return;
    }
    // not found Share with the id
    result({ kind: "not_found" }, null);
  });
};
Share.getAll = (shareCode, result) => {
  let query = "SELECT * FROM t_share";
  if (shareCode) {
    query += ` WHERE shareCode LIKE '%${shareCode}%'`;
  }
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("t_share: ", res);
    result(null, res);
  });
};
//UpdatePrice
Share.UpdatePrice = (sharecode, lastprice, result) => {
  console.log(sharecode);
  sql.query(
    "UPDATE t_share SET lastprice = ? WHERE sharecode = ? ",
    [lastprice,sharecode],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // not found Share with the id
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("updated share  price: ", { id: sharecode,lastprice });
      result(null, { id: sharecode, lastprice });
    }
  );
};
Share.updateById = (id, share, result) => {
  sql.query(
    "UPDATE t_share SET sharename = ? WHERE shareid = ?",
    [share.sharename, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // not found Share with the id
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("updated share: ", { id: id, ...share });
      result(null, { id: id, ...share });
    }
  );
};
Share.remove = (id, result) => {
  sql.query("DELETE FROM t_share WHERE shareid = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      // not found Share with the id
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("deleted share with id: ", id);
    result(null, res);
  });
};
Share.removeAll = result => {
  sql.query("DELETE FROM t_share", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log(`deleted ${res.affectedRows} t_share`);
    result(null, res);
  });
};
module.exports = Share;