declare module "aws-query-decoder" {
  /**
   * @param {string} query  Raw AWS Query Protocol encoded body string.
   * @example decode("Action=GetQueueUrl&QueueName=MyQueue")
   */
  export function decode(query: string): Record<string, any>;
}
