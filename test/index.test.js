// @ts-check
const { describe, it } = require("node:test");
const assert = require("node:assert");
const { decode } = require("../src");

const simplyQueryAws = "Action=DeleteMessage";
const simplyQueryJs = { Action: "DeleteMessage" };

const sendMessageBatchAws = [
  "Action=SendMessageBatch",
  "SendMessageBatchRequestEntry.1.Id=test_msg_001",
  "SendMessageBatchRequestEntry.1.MessageBody=test%20message%20body%201",
  "SendMessageBatchRequestEntry.2.Id=test_msg_002",
  "SendMessageBatchRequestEntry.2.MessageBody=test%20message%20body%202",
  "SendMessageBatchRequestEntry.2.DelaySeconds=60",
  "SendMessageBatchRequestEntry.2.MessageAttribute.1.Name=test_attribute_name_1",
  "SendMessageBatchRequestEntry.2.MessageAttribute.2.Value.DataType=Number",
  "SendMessageBatchRequestEntry.2.MessageAttribute.1.Value.StringValue=test_attribute_value_1",
  "SendMessageBatchRequestEntry.2.MessageAttribute.2.Name=test_attribute_name_2",
  "SendMessageBatchRequestEntry.2.MessageAttribute.1.Value.DataType=String",
  "SendMessageBatchRequestEntry.2.MessageAttribute.2.Value.StringValue=test_attribute_value_2",
].join("&");

const sendMessageBatchJs = {
  Action: "SendMessageBatch",
  SendMessageBatchRequestEntry: [
    { Id: "test_msg_001", MessageBody: "test message body 1" },
    {
      Id: "test_msg_002",
      MessageBody: "test message body 2",
      DelaySeconds: "60",
      MessageAttribute: [
        { Name: "test_attribute_name_1", Value: { DataType: "String", StringValue: "test_attribute_value_1" } },
        { Name: "test_attribute_name_2", Value: { DataType: "Number", StringValue: "test_attribute_value_2" } },
      ],
    },
  ],
};

const simpleArrayAws = ["Items.1=Item.1", "Items.2=Item.2", "Items.3=Item.3"].join("&");
const simpleArrayJs = { Items: ["Item.1", "Item.2", "Item.3"] };

describe("Test decoder", () => {
  it("simple query", () => {
    assert.deepStrictEqual(decode(simplyQueryAws), simplyQueryJs);
  });

  it("simple array", () => {
    assert.deepStrictEqual(decode(simpleArrayAws), simpleArrayJs);
  });

  it("complexe query", () => {
    assert.deepStrictEqual(decode(sendMessageBatchAws), sendMessageBatchJs);
  });
});
