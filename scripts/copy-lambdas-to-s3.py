import boto3
from botocore.exceptions import NoCredentialsError
import sys
import os

ACCESS_KEY, SECRET_KEY = sys.argv[1:]
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


def upload_folder(origin,destination):
    try:
        files = os.listdir(origin)
        print(files)
        response = True
        for file in files:

            current_full_path = '{}/{}'.format(origin, file)
            current_relative_full_path = '{}/{}'.format(origin, file).replace('../dist/','')
            next_full_path = '{}{}/{}'.format(destination,origin.replace('../dist/',''), file)
            if (os.path.isfile(current_full_path)):
                response = response and upload_to_aws(current_full_path, 'lambda-bodies-s3', next_full_path)
            else:
                response = response and upload_folder(current_full_path, destination)
        return response
    except Exception as e:
        print(e)

print(os.getcwd())
# uploaded = upload_to_aws('../dist/zip/lambdas.zip', 'lambda-bodies-s3', 'lambdas.zip')
uploaded = upload_folder('../dist/lambdas', '')
print(uploaded)
if(not uploaded):
    exit(1)