const AWS = require("aws-sdk");
const { response } = require("express");

const BUCKET = "ungrezi-blog";
const REGION = "ap-south-1";

const ACCESS_KEY = "AKIAILYZAGMYIPSLM7WQ"; //Remove from here and Store in env
const SECRET_KEY = "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"; //Remove from here Store in env

AWS.config.update({
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_KEY,
  region: REGION,
});

const s3 = new AWS.S3();

function deleteObjects(keys){
    let objects= new Set()
    for(i of keys){
        objects.add({Key:i});
    }

    objects = Array.from(objects);

    var deleteParam = {
        Bucket: BUCKET,
        Delete: {
            Objects: objects
        }
    }; 

    return s3.deleteObjects(deleteParam).promise();
}

function upload(file, filename,filetype) {
  return s3
    .putObject({
      Bucket: BUCKET,
      Body: file,
      Key: filename,
      ContentType:filetype
    })
    .promise()
    .then((response) => {
      return `https://${BUCKET}.s3.${REGION}.amazonaws.com/${filename}`
    })
    .catch((err) => {
      return new Error(err);
    });
};

exports.upload = upload;
exports.deleteObjects = deleteObjects;