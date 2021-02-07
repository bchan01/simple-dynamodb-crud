const AmazonDaxClient = require('amazon-dax-client');
var AWS = require("aws-sdk");

const region = 'us-east-1';
AWS.config.update({
  region: region
});

const dax_cluster = process.env.DAX_CLUSTER;
let dax = new AmazonDaxClient({endpoints: [dax_cluster], region: region})
const daxClient = new AWS.DynamoDB.DocumentClient({service: dax });
const ddbClient = new AWS.DynamoDB.DocumentClient();

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
/**
 * 
 * @param {*} event (year, title, dax: true|false)
 */
exports.handler = async (event) => {
    const params = {
        TableName: "Movies",
        Key:{
            "year": event['year'],
            "title":  event['title']
        }   
    };
    const startTime = new Date().getTime();
    let dataClient = ddbClient;
    if (event['dax'] === true) {
        console.log('CONNECT TO DAX');
        dataClient = daxClient;
    } else {
        console.log('CONNECT TO DDB');
        dataClient = ddbClient;
    }
    const res = await get_item(dataClient, params);
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



