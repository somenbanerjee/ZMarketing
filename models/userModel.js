const conn = require("../config/database");
const { singleObject, uniqueNumber } = require("../util/helpers");

const findByMemberCode = async (memberCode) => {
  try {
    const query = "SELECT * FROM `member` WHERE `member_code` = ?";
    const [rows] = await conn.execute(query, [memberCode]);
    return rows.length > 0 ? singleObject(rows) : null;
  } catch (err) {
    throw err;
  }
};

const getNewMemberCode = async () => {
  try {
    do {
      const randomNumber = uniqueNumber();
      var memberCode = process.env.PREFIX + randomNumber;
      const query = "SELECT member_code FROM `member` WHERE `member_code` = ?";
      const [rows] = await conn.execute(query, [memberCode]);
      var num = rows.length;
    } while (num);
    return memberCode;
  } catch (err) {
    throw err;
  }
};

const create = async (data) => {
  try {
    const query =
      "INSERT INTO `member`(`member_code`, `password`, `intro_id`, `intro_level`, `intro_tree`, `name`, `mobile`, `email`, `pan`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

    const row = await conn.execute(query, [
      data.memberCode,
      data.password,
      data.introducerId,
      data.introducerLevel,
      data.introducerTree,
      data.name,
      data.mobile,
      data.email,
      data.pan,
    ]);
    return singleObject(row).insertId;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  findByMemberCode,
  getNewMemberCode,
  create,
};
