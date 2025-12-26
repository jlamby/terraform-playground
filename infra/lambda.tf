resource "aws_iam_role" "lambda_role" {
  name = "lambda-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = {
        Service = "lambda.amazonaws.com"
      }
    }]
  })
}

resource "aws_lambda_function" "playground-lambda" {
  function_name = "playground-lambda"
  runtime       = "nodejs22.x"
  handler       = "handler.handler"

  role = aws_iam_role.lambda_role.arn

  filename         = "${path.module}/lambda.zip"
  source_code_hash = filebase64sha256("${path.module}/lambda.zip")

  environment {
    variables = {
      DYNAMODB_ENDPOINT = "http://host.docker.internal:4566"
      REGION            = "us-east-1"
    }
  }
}
