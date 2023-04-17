aws configure set aws_access_key_id "$AWS_KEY"
aws configure set aws_secret_access_key "$AWS_SECRET"
aws ecr get-login-password --region $AWS_DEFAULT_REGION | docker login --username AWS --password-stdin $AWS_ACCOUNT.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com
docker image prune -a -f
docker pull "$DOCKER_REGISTRY"roxfarma-appservicios