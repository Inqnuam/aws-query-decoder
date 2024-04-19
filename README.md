# AWS Query Protocol Decoder

> Converts a string encoded with AWS Query Protocol into JS Object.

## Install

```bash
npm i aws-query-decoder
```

## Usage example:

```js
const { decode } = require("aws-query-decoder");
// import { decode } from "aws-query-decoder";

const rawBody = `Action=SendMessageBatch&SendMessageBatchRequestEntry.1.Id=test_msg_001&SendMessageBatchRequestEntry.1.MessageBody=test%20message%20body%201&SendMessageBatchRequestEntry.2.Id=test_msg_002&SendMessageBatchRequestEntry.2.MessageBody=test%20message%20body%202&SendMessageBatchRequestEntry.2.DelaySeconds=60&SendMessageBatchRequestEntry.2.MessageAttribute.1.Name=test_attribute_name_1&SendMessageBatchRequestEntry.2.MessageAttribute.1.Value.StringValue=test_attribute_value_1&SendMessageBatchRequestEntry.2.MessageAttribute.1.Value.DataType=String`;

const SendMessageBatch = decode(rawBody);
```

### output

```json
{
  "Action": "SendMessageBatch",
  "SendMessageBatchRequestEntry": [
    { "Id": "test_msg_001", "MessageBody": "test message body 1" },
    {
      "Id": "test_msg_002",
      "MessageBody": "test message body 2",
      "DelaySeconds": "60",
      "MessageAttribute": [
        {
          "Name": "test_attribute_name_1",
          "Value": {
            "DataType": "String",
            "StringValue": "test_attribute_value_1"
          }
        }
      ]
    }
  ]
}
```
