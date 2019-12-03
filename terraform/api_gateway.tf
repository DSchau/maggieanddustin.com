resource "aws_api_gateway_rest_api" "maggieanddustin-api" {
  name        = "MaggieAndDustinAPI"
  description = "A REST API for maggieanddustin.com"
}

resource "aws_api_gateway_resource" "proxy" {
  rest_api_id = aws_api_gateway_rest_api.maggieanddustin-api.id
  parent_id   = aws_api_gateway_rest_api.maggieanddustin-api.root_resource_id
  path_part   = "{proxy+}"
}

resource "aws_api_gateway_method" "proxy" {
  rest_api_id   = aws_api_gateway_rest_api.maggieanddustin-api.id
  resource_id   = aws_api_gateway_resource.proxy.id
  http_method   = "ANY"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "lambda" {
  rest_api_id = aws_api_gateway_rest_api.maggieanddustin-api.id
  resource_id = aws_api_gateway_method.proxy.resource_id
  http_method = aws_api_gateway_method.proxy.http_method

  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.rsvp_lambda.invoke_arn
}

resource "aws_api_gateway_method" "proxy_root" {
  rest_api_id   = aws_api_gateway_rest_api.maggieanddustin-api.id
  resource_id   = aws_api_gateway_rest_api.maggieanddustin-api.root_resource_id
  http_method   = "ANY"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "lambda_root" {
  rest_api_id = aws_api_gateway_rest_api.maggieanddustin-api.id
  resource_id = aws_api_gateway_method.proxy_root.resource_id
  http_method = aws_api_gateway_method.proxy_root.http_method

  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.rsvp_lambda.invoke_arn
}

resource "aws_api_gateway_deployment" "maggieanddustin-api" {
  depends_on = [
    aws_api_gateway_integration.lambda,
    aws_api_gateway_integration.lambda_root,
  ]

  rest_api_id = aws_api_gateway_rest_api.maggieanddustin-api.id
  stage_name  = var.environment
}

output "base_url" {
  value = aws_api_gateway_deployment.maggieanddustin-api.invoke_url
}

