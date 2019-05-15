data "terraform_remote_state" "network" {
  backend = "s3"
  config {
    bucket = "dschau-terraform-state-misc"
    key    = "network/wedding.tfstate"
    region = "us-east-1"
  }
}
