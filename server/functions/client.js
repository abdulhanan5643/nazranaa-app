var moment = require("moment");
const axios = require("axios");
const Client = require("../models/client");
const today = moment(new Date());

const registerClient = async (new_client) => {
  if (new_client) {
    const result = await Client.find({
      first_name: new_client.first_name,
      last_name: new_client.last_name,
      phone_number: new_client.phone_number,
      active: true,
    });
    if (result.length) {
      return { message: "Client already registered!" };
    } else {
      const client = new Client({
        first_name: new_client.first_name,
        last_name: new_client.last_name,
        date: new_client.date,
        form: new_client.form,
        phone_number: new_client.phone_number,
        video: new_client.video,
        friends_allowed: new_client.friends_allowed,
        active: true,
      });
      await client.save();
      await axios.post(
        "https://hook.us1.make.com/3rnexgldhroepr6hatva8rt8ufek6uev",
        {
          name: new_client.first_name + " " + new_client.last_name,
          date: new_client.date,
          form: new_client.form,
        }
      );
      return { message: "Client added successfully!" };
    }
  }
};

const getDetails = async (id) => {
  if (id) {
    const client = await Client.findById(id);
    return client;
  } else {
    return { message: "Something went wrong!" };
  }
};

const archieveClient = async (id) => {
  if (id) {
    try {
      const client = await Client.findById(id);
      client.active = false;
      await client.save();
    } catch (err) {
      return err;
    }
  } else {
    try {
      const result = await Client.find({
        active: true,
      });
      const clients = result.filter(async (client) => {
        if (moment(today).isAfter(client.date.toISOString())) {
          client.active = false;
          await client.save();
          return client;
        }
      });
      return clients;
    } catch (err) {
      return err;
    }
  }
};

const verifyClient = async (client) => {
  const result = await Client.find({
    first_name: client.first_name,
    last_name: client.last_name,
    phone_number: client.phone_number,
    active: true,
  });
  return result.length
    ? {
        success: true,
        client: result,
      }
    : {
        success: false,
        client: {},
      };
};

const getAllClients = async () => {
  const result = await Client.find({ active: true });
  return result.length
    ? {
        success: true,
        client: result,
      }
    : {
        success: false,
        client: [],
      };
};

module.exports = {
  registerClient,
  verifyClient,
  getAllClients,
  archieveClient,
  getDetails,
};
