provider "aws" {
  region  = "us-east-1"
  version = "~> 2.7"
}

terraform {
  backend "s3" {
    bucket = "dschau-terraform-state-misc"
    key    = "network/wedding.tfstate"
    region = "us-east-1"
  }
}

