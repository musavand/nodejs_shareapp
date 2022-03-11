const sql = require("./db.js");
// constructor
const UserPortfolio = function(userportfolio) {
  this.userid = userportfolio.userid;  
  this.shareid = userportfolio.shareid; 
  this.qty = userportfolio.qty; 
};
//mode for sale=S and for Buy=B
UserPortfolio.Buy_Sale = (userid, shareid,qty,mode, result) => {
  
  sql.query(`SELECT userportfolioid,qty FROM T_UserPortfolio WHERE userid = ${userid}   and  shareid=${shareid}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
     var newQTY=0;
     var  userQTY=res[0].qty;
     var  userPortfolioID=res[0].userportfolioid;
      if(mode=="S"  &&  userQTY<qty)
      {
        console.log("user equity is not enought for Sale: ", err);
        result(err, null);
        return;
      }
      else  if (mode=="B")
      { 
        newQTY=userQTY+qty;
      }
      else
      {
        newQTY=userQTY-qty;
      }

      const userportfolio = new UserPortfolio({
        userid: userid,
        shareid: shareid,
        qty: newQTY,
      });
      UserPortfolio.updateById(userPortfolioID,userportfolio);
      console.log("do trading : ", { id: userPortfolioID, ...userportfolio });
      result(null, { id: userPortfolioID, ...userportfolio });
    }
    // not found UserPortfolio with the id
    result({ kind: "user can not trade because share is not " }, null);
  });
  
  };

UserPortfolio.create = (newUserPortfolio, result) => {
  sql.query("INSERT INTO T_UserPortfolio SET ?", newUserPortfolio, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created user portfolio: ", { id: res.insertId, ...newUserPortfolio });
    result(null, { id: res.insertId, ...newUserPortfolio });
  });
};
UserPortfolio.findById = (id, result) => {
  sql.query(`SELECT * FROM T_UserPortfolio WHERE userportfolioid = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found userportfolio: ", res[0]);
      result(null, res[0]);
      return;
    }
    // not found UserPortfolio with the id
    result({ kind: "not_found" }, null);
  });
};
UserPortfolio.getAll = (userName, result) => {
  let query = "SELECT * FROM T_UserPortfolio";
  if (userName) {
    query += ` WHERE userID LIKE '%${userID}%'`;
  }
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("T_UserPortfolio: ", res);
    result(null, res);
  });
};
UserPortfolio.updateById = (id, userportfolio, result) => {
  sql.query(
    "UPDATE T_UserPortfolio SET qty = ? WHERE userportfolioid = ?",
    [userportfolio.qty, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // not found UserPortfolio with the id
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("updated userportfolio: ", { id: id, ...user });
      result(null, { id: id, ...user });
    }
  );
};
UserPortfolio.remove = (id, result) => {
  sql.query("DELETE FROM T_UserPortfolio WHERE userportfolioid = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      // not found UserPortfolio with the id
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("deleted userportfolio with id: ", id);
    result(null, res);
  });
};
UserPortfolio.removeAll = result => {
  sql.query("DELETE FROM T_UserPortfolio", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log(`deleted ${res.affectedRows} T_UserPortfolio`);
    result(null, res);
  });
};
module.exports = UserPortfolio;