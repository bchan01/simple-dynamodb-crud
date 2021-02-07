# DynamoDB DAX Reader Lambda Function #


## References: ##

* AwS SDK: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.NodeJs.html
* Creating DAX: 
    * https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DAX.html
    * https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DAX.create-cluster.cli.html
    * https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DAX.client.html


## Creating DynamoDB Movies Table and load data ##


## Create DAX Cluster ##

* IAM Service Role for DAX Cluster
* Security Group to allow connection to DAX cluster
* Create DAX Cluster


## Create Lambda Function ##

* IAM Role for Lambda Function (policy for accessing DAX and DDB)
