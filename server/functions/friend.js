const Friend = require("../models/friend");
const Client = require("../models/client");
const axios = require("axios");
const moment = require("moment");

const registerFriend = async (new_friend) => {
  if (new_friend) {
    if (new_friend.measurements.height2) {
      const height = parseInt(new_friend.measurements.height1) * 12;
      const height2 = parseInt(new_friend.measurements.height2) + height;
      new_friend.measurements.height = height2;
    }
    if (
      await checkDuplicate(new_friend.email, new_friend.reference_client_id)
    ) {
      return {
        error: true,
        message:
          "An entry with this email address is already submitted, if you are aware of that and still want to submit, then please use another email address",
      };
    } else {
      const friend = new Friend(new_friend);
      await friend.save();
      const client = await Client.findById(new_friend.reference_client_id);
      console.log(client);
      try {
        await axios.post(
          "https://hook.us1.make.com/1drv4ri0bhcxv9f2fkp2sirc3ki1t1jt",
          {
            name: client.first_name + " " + client.last_name,
            date: moment(client.date).format("YYYY-MM-DD"),
          }
        );
      } catch (err) {
        console.log(err);
      }
    }
  }
};

const checkFriendLimit = async (id) => {
  if (id) {
    const { friends_allowed } = await Client.findById(id);
    const friends = await Friend.find({ reference_client_id: id });
    if (friends.length < friends_allowed) {
      return { limitExceeded: false, message: "Friend can register." };
    } else {
      return {
        limitExceeded: true,
        message: "Limit for friends registration reached.",
      };
    }
  }
};

const checkDuplicate = async (email, id) => {
  if (email && id) {
    const result = await Friend.find({ email: email, reference_client_id: id });
    return result.length;
  }
};

const getFriend = async (id) => {
  if (id) {
    const result = await Friend.find({ reference_client_id: id });
    return result;
  }
};

module.exports = {
  registerFriend,
  getFriend,
  checkFriendLimit,
};
