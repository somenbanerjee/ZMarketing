const conn = require("../config/database");

const findByMemberCode = async (memberCode) => {
  try {
    const query =
      "SELECT COUNT(member_id) AS member_count FROM `member` WHERE `member_code` = ?";
    const [rows] = await conn.execute(query, [memberCode]);
    return rows;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  findByMemberCode,
};
