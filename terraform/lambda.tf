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

resource "aws_lambda_function" "rsvp_lambda" {
  filename         = "../rsvp-handler.zip"
  function_name    = "rsvp_handler_wedding"
  role             = "${aws_iam_role.iam_for_rsvp_lambda.arn}"
  handler          = "index.handler"

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