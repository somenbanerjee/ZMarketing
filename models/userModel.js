const conn = require("../config/database");
const { singleObject } = require("../util/helpers");

const findByMemberCode = async (memberCode) => {
  try {
    const query = "SELECT * FROM `member` WHERE `member_code` = ?";
    const [rows] = await conn.execute(query, [memberCode]);
    return rows.length > 0 ? singleObject(rows) : null;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  findByMemberCode,
};
