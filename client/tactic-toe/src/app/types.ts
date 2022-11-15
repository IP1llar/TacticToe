export interface response {
  'statusCode': number,
  'message' : string
}

export interface dataResponse extends response {
  'data' : any
}
