import boto3
from botocore.exceptions import NoCredentialsError
import sys
import os

ACCESS_KEY, SECRET_KEY = sys.argv[1:]
ACCESS_KEY = 'AKIA3OHRIFT3FHBVHBWW'
SECRET_KEY = '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'
print(ACCESS_KEY, SECRET_KEY)
def upload_to_aws(local_file, bucket, s3_file):
    s3 = boto3.client('s3', aws_access_key_id=ACCESS_KEY, aws_secret_access_key=SECRET_KEY)

    try:
        s3.upload_file(local_file, bucket, s3_file)
        print("Upload Successful")
        return True
    except FileNotFoundError as e:
        print("The file was not found", e)
        return False
    except NoCredentialsError:
        print("Credentials not available")
        return False

print(os.getcwd())
uploaded = upload_to_aws('../dis/zip/lambas.zip', 'lambda-bodies-s3', 'lambdas.zip')
if(not uploaded):
    exit(1)