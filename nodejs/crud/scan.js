/*
Scans the entire Movies table, which contains approximately 5,000 items. 
The scan specifies the optional filter to retrieve only the movies from the 1950s 
(approximately 100 items), and discard all of the others.
Note: filter is applied only after the entire table has been scanned.
*/

var AWS = require("aws-sdk");

AWS.config.update({
    region: "ue-east-1"
});

var docClient = new AWS.DynamoDB.DocumentClient();


// ProjectionExpression specifies the attributes you want in the scan result
// FilterExpression specifies a condition that returns only items that satisfy the condition. All other items are discarded.
var params = {
    TableName: "Movies",
    ProjectionExpression: "#yr, title, info.rating",
    FilterExpression: "#yr between :start_yr and :end_yr",  // attributes to include in scan result
    ExpressionAttributeNames: {
        "#yr": "year",
    },
    ExpressionAttributeValues: {
         ":start_yr": 1950,
         ":end_yr": 1959 
    }
};

console.log("Scanning Movies table.");
docClient.scan(params, onScan);

function onScan(err, data) {
    if (err) {
        console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        // print all the movies
        console.log("Scan succeeded.");
        data.Items.forEach(function(movie) {
           console.log(
                movie.year + ": ",
                movie.title, "- rating:", movie.info.rating);
        });

        // continue scanning if we have more movies, because
        // scan can retrieve a maximum of 1MB of data
        if (typeof data.LastEvaluatedKey != "undefined") {
            console.log("Scanning for more...");
            params.ExclusiveStartKey = data.LastEvaluatedKey;
            docClient.scan(params, onScan);
        }
    }
}