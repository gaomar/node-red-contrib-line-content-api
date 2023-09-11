module.exports = (RED) => {
  const main = function (config) {
    const axiosBase = require('axios');
    RED.nodes.createNode(this, config);
    this.MessageId = config.MessageId || "";
    this.MessageIdType = config.MessageIdType || "str";
    this.AccessToken = config.AccessToken || "";
    this.output = config.output || "";
    const node = this;

    const axios = axiosBase.create({
      baseURL: `https://api-data.line.me/v2/bot/message`,
      headers: {
        'Authorization': `Bearer ${node.AccessToken}`
      }
    });

    let targetMessageId;

    const getContent = async () => {
      try {
        const res = await axios.get(`/${targetMessageId}/content`, {
           responseType: "arraybuffer"
        });
        if (node.output === 'binary') {
          return Buffer.from(res.data);
        } else {
          return Buffer.from(res.data).toString('base64');
        }
      } catch (error) {
        console.log(error);
        return Promise.resolve(null);
      }

    }

    const handleEvent = async (event) => {
      if (targetMessageId.length == 0) targetMessageId = event.message.id;
      return Promise.resolve(await getContent());
    }

    node.on("input", async (msg) => {
      node.status({ fill: "green", shape: "dot", text: "処理中..." });

      RED.util.evaluateNodeProperty(
        node.MessageId,
        node.MessageIdType,
        node,
        msg,
        (err, value) => {
          if (err) {
            return;
          } else {
            targetMessageId = value;
          }
        }
      );

      if (typeof msg.line === "undefined") msg.line = [];
      if (msg.line.length == 0) {
        msg.payload = await getContent();
        node.status({});
        node.send(msg);
      } else {
        Promise
          .all(msg.line.events.map(handleEvent))
          .then(result => {
            msg.payload = result[0];
            node.status({});
            node.send(msg)
          }).catch(error => {
            console.log(error);
            if (error.response) {
              node.status({
                fill: "red",
                shape: "dot",
                text: `${error.response.status}, ${JSON.stringify(
                  error.response.data.error.message
                )}`,
              });
              msg.payload = `${error.response.status}, ${JSON.stringify(
                error.response.data.error.message
              )}`;
            } else {
              node.status({
                fill: "red",
                shape: "dot",
                text: `${error.type}, ${error.message}`,
              });
              msg.payload = `${error.type}, ${error.message}`;
            }
            node.error(error);
          });
      }
    });
  };

  RED.nodes.registerType("line-content", main);
};
