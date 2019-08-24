variable lambda_name {
  default = "rsvp_handler_wedding"
}

resource "aws_iam_role" "iam_for_rsvp_lambda" {
  name = "iam_for_rsvp_lambda"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}

resource "aws_cloudwatch_log_group" "lambda_rsvp_log_group" {
  name              = "/aws/lambda/${var.lambda_name}"
  retention_in_days = 14
}

resource "aws_iam_policy" "lambda_rsvp_logging_policy" {
  name = "rsvp_lamba_logging_policy"
  path = "/"
  description = "IAM policy for logging from the RSVP Lambda"

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Resource": "arn:aws:logs:*:*:*",
      "Effect": "Allow"
    }
  ]
}
EOF
}

resource "aws_iam_role_policy_attachment" "lambda_rsvp_logs" {
  role = "${aws_iam_role.iam_for_rsvp_lambda.name}"
  policy_arn = "${aws_iam_policy.lambda_rsvp_logging_policy.arn}"
}

resource "aws_lambda_function" "rsvp_lambda" {
  filename         = "../rsvp-handler.zip"
  function_name    = "${var.lambda_name}"
  role             = "${aws_iam_role.iam_for_rsvp_lambda.arn}"
  handler          = "index.handler"
  timeout          = "10"

  depends_on    = ["aws_iam_role_policy_attachment.lambda_rsvp_logs", "aws_cloudwatch_log_group.lambda_rsvp_log_group"]


  source_code_hash = "${filebase64sha256("../rsvp-handler.zip")}"
  runtime          = "nodejs8.10"

  environment {
    variables = {
      PRIVATE_KEY = "${var.private_key}"
      CLIENT_EMAIL = "${var.client_email}"
      LOG_LEVEL = "${var.log_level}"
      SPREADSHEET_ID = "${var.spreadsheet_id}"
    }
  }
}

resource "aws_lambda_permission" "api-gateway" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = "${aws_lambda_function.rsvp_lambda.arn}"
  principal     = "apigateway.amazonaws.com"

  # The /*/* portion grants access from any method on any resource
  # within the API Gateway "REST API".
  source_arn = "${aws_api_gateway_deployment.maggieanddustin-api.execution_arn}/*/*"
}