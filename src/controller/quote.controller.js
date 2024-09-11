const respFormat = require("../utils/response/respFormat");

class QuoteController {
  getAll = async (req, resp) => {
    try {
      const quotes = await quoteServices.getAll();
      resp.status(200);

      if (!esIsEmpty(quotes)) {
        resp.send(respFormat(quotes, `${quotes?.length} quotes found`, true));
      } else {
        resp.status(202);
        resp.send(respFormat(null, ` quotes not found`, true));
      }
    } catch (error) {
      resp.status(202);

      resp.send(respFormat(null, ` quotes not found`, true));
    }
  };

  getOne = async (req, resp) => {
    const quote = await quoteServices.getOne(req?.params?.id);
    try {
      resp.status(200);

      if (!esIsEmpty(quote)) {
        resp.send(respFormat(quote, "quote not found", true));
      }
    } catch (error) {
      console.log("Get quotes, Error ", error);
      resp.status(202);

      resp.send(respFormat(null, "quotes not found", false));
    }
  };

  add = async (quote) => {
    try {
      const quote = await quoteServices.addOne(req.body);
      resp.status(200);

      if (!esIsEmpty(quote)) {
        resp.send(respFormat(quote, "quote Update  failed", true));
      }
    } catch (error) {
      resp.send(respFormat(null, "quotes Update failed", false));
    }
  };
  updateOne = async (req, resp) => {
    try {
      const quote = await quoteServices.updateOne(req.body);
      resp.status(200);

      if (!esIsEmpty(quote)) {
        resp.send(respFormat(quote, "quote Update  failed", true));
      }
    } catch (error) {
      resp.send(respFormat(null, "quotes Update failed", false));
    }
  };

  deleteOne = async (req, resp) => {
    try {
      const deleteResp = await quoteServices.deleteOne(req?.params?.id);
      resp.status(200);

      if (!esIsEmpty(deleteResp)) {
        resp.send(respFormat(deleteResp, "quote Delete/Remove  failed", true));
      }
    } catch (error) {
      resp.send(respFormat(null, "quote  Delete/Remove failed", false));
    }
  };
}

const quoteController = new QuoteController();

module.exports = quoteController;
