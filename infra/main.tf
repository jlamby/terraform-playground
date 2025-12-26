resource "aws_s3_bucket" "playground_bucket" {
  bucket = "playground-bucket"
}

resource "aws_dynamodb_table" "playground_items" {
  name         = "playground-items"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "id"

  attribute {
    name = "id"
    type = "S"
  }
}
