pipeline {
agent any
environment {
AWS_ACCESS_KEY_ID = credentials('aws-access-key-id')
AWS_SECRET_ACCESS_KEY = credentials('aws-secret-access-key')
AWS_S3_FOLDER = 'ando-jenkins-test'
ARTIFACT_NAME = 'united-pwa'
AWS_S3_BUCKET = 'elasticbeanstalk-ap-southeast-3-581077646510'
AWS_EB_APP_NAME = 'ando-test-server'
AWS_EB_ENVIRONMENT = 'ando-test-server'
AWS_EB_APP_VERSION = "ando-test-server-${BUILD_ID}"
}
stages {
stage('Build') {
steps {
echo 'Building EB App..'
}
}
stage('Test') {
steps {
echo 'No Testing Applied Yet ..'
}
}
stage('Publish') {
steps {
sh 'zip -r $ARTIFACT_NAME-$AWS_EB_APP_VERSION.zip ./ -x Jenkinsfile -x README.md -x united-pwa-ando-test-server-*'
}
post {
success {
// archiveArtifacts 'pdaja-cmd-app.zip'
sh 'aws configure set region ap-southeast-3'
sh 'aws s3 cp ./$ARTIFACT_NAME-$AWS_EB_APP_VERSION.zip
s3://$AWS_S3_BUCKET/$AWS_S3_FOLDER/$ARTIFACT_NAME-$AWS_EB_APP_VERSION.zip'
sh 'aws elasticbeanstalk create-application-version
--application-name $AWS_EB_APP_NAME --version-label $AWS_EB_APP_VERSION
--source-bundle
S3Bucket=$AWS_S3_BUCKET,S3Key=$AWS_S3_FOLDER/$ARTIFACT_NAME-$AWS_EB_APP_VERSION.zip'
sh 'aws elasticbeanstalk update-environment --application-name
$AWS_EB_APP_NAME --environment-name $AWS_EB_ENVIRONMENT --version-label
$AWS_EB_APP_VERSION'
// sh 'sudo rm -rf $ARTIFACT_NAME-$AWS_EB_APP_VERSION.zip'
}
}
}
}
}
