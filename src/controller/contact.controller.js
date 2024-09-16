const contactServices = require("../services/contact.services");
const { esIsEmpty } = require("../utils/esHelper");
const respFormat = require("../utils/response/respFormat");

class ContactController {
  getAll = async (req, resp) => {
    try {
      const contacts = await contactServices.getAll();
      resp.status(200);

      if (!esIsEmpty(contacts)) {
        resp.send(
          respFormat(contacts, `${contacts?.length} contacts found`, true)
        );
      } else {
        resp.status(202);
        resp.send(respFormat(null, ` contacts not found`, true));
      }
    } catch (error) {
      resp.status(202);

      resp.send(respFormat(null, ` contacts not found`, true));
    }
  };

  getOne = async (req, resp) => {
    const contact = await contactServices.getOne(req?.params?.id);
    try {
      resp.status(200);

      if (!esIsEmpty(contact)) {
        resp.send(respFormat(contact, "contact not found", true));
      }
    } catch (error) {
      console.log("Get contact, Error ", error);
      resp.status(202);

      resp.send(respFormat(null, "contact not found", false));
    }
  };

  add = async (req, resp) => {
    try {
      const contact = await contactServices.addOne(req.body);
      resp.status(200);

      if (!esIsEmpty(contact)) {
        resp.send(
          respFormat(
            contact,
            "Thanks for reaching out!We’re thrilled to hear from you. Our inbox can’t wait to get your messages, so talk to us any time you like.",
            true
          )
        );
      }
    } catch (error) {
      console.log("Contact Add Error ", error);
      resp.send(respFormat(null, "contacts Add failed", false));
    }
  };
  updateOne = async (req, resp) => {
    try {
      const contact = await contactServices.updateOne(req.body);
      resp.status(200);

      if (!esIsEmpty(contact)) {
        resp.send(respFormat(contact, "contact Update  failed", true));
      }
    } catch (error) {
      resp.send(respFormat(null, "contacts Update failed", false));
    }
  };

  deleteOne = async (req, resp) => {
    try {
      const deleteResp = await contactServices.deleteOne(req?.params?.id);
      resp.status(200);

      if (!esIsEmpty(deleteResp)) {
        resp.send(
          respFormat(deleteResp, "contact Delete/Remove  failed", true)
        );
      }
    } catch (error) {
      resp.send(respFormat(null, "contact  Delete/Remove failed", false));
    }
  };
}

const contactController = new ContactController();

module.exports = contactController;
