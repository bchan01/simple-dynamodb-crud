# Lambda Functio to compare DynamoDB Access directly and through DAX

```
Sample Input for direct DDB Read:

{
  "year": 2012,
  "title": "The Dark Knight Rises",
  "dax": false
}

Sample Input for DAX:

{
  "year": 2012,
  "title": "The Dark Knight Rises",
  "dax": true
}

```

## References

* AwS SDK: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.NodeJs.html
* Creating DAX 
    * https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DAX.html
    * https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DAX.create-cluster.cli.html
    * https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DAX.client.html
* DynamoDB VPC Endpoint
    * https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/vpc-endpoints-dynamodb.html
    * https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/vpc-endpoints-dynamodb-tutorial.html

## Creating DynamoDB Movies Table and load data

* cd ../crud
* npm install
* node create_table.js
* node load_date.js

## Create DAX Cluster ##

* IAM Service Role for DAX Cluster
* Security Group to allow connection to DAX cluster at port 8111
* Create DAX Cluster


## Create Lambda Function ##

* IAM Role for Lambda Function (policy for accessing DAX and DDB)


### DAX Setup ###


## Create DynamoDB VPC Endpoint ##
This is needed for Lambda in VPC to access DDB

```
aws ec2 create-vpc-endpoint --vpc-id <VPC ID> --service-name com.amazonaws.us-east-1.dynamodb --route-table-ids <ROUTE TABLE ID>

# Cleanup VPC Endpoints
aws ec2 describe-vpc-endpoints
aws ec2 delete-vpc-endpoints --vpc-endpoint-ids <VpcEndpointId RETURNED ABOVE>

```