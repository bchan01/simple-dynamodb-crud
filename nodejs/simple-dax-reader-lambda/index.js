const AmazonDaxClient = require('amazon-dax-client');
var AWS = require("aws-sdk");

// let ddbClient = new AWS.DynamoDB.DocumentClient()
const dax_cluster = process.env.DAX_CLUSTER;
let dax = new AmazonDaxClient({endpoints: [dax_cluster], region: 'us-east-1'})
const client = new AWS.DynamoDB.DocumentClient({service: dax });

const get_item = (client, params) => {
    return new Promise(function (resolve, reject) {
        client.get(params, function(err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    })
}

exports.handler = async (event) => {
    const params = {
        TableName: "Movies",
        Key:{
            "year": event['year'],
            "title":  event['title']
        }   
    };
    const startTime = new Date().getTime();
    const res = await get_item(client, params);
    const endTime = new Date().getTime();
    console.log(`Search: ${JSON.stringify(event, null, 4)}`);
    console.log(`Result: ${JSON.stringify(res, null, 4)}`);
    console.log(`\tTotal time: ${(endTime - startTime)} ms`);

    const response = {
        statusCode: 200,
        body: JSON.stringify(res),
    };
    return response;
}



