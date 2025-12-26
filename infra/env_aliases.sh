aws-local() {
    aws --endpoint-url=http://localhost:4566 --profile localstack "$@"
}
