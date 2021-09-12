import os
import shutil
import sys
from zipfile import ZipFile



NODE_MODULES_FOLDER = '../app/node_modules'
DIST_FOLDER = '../dist/lambdas'
DIST_NODE_MODULES_FOLDER = '../dist/lambdas/node_modules'
ZIP_FOLDER = '../dist/zip'
PACKAGE_FILE = '../app/package.json'
DIST_PACKAGE = '../dist/lambdas/package.json'


try:
    os.mkdir(DIST_NODE_MODULES_FOLDER)
except :
    pass

try:
    os.mkdir(ZIP_FOLDER)
except :
    pass
force = sys.argv == 2

def add_node_modules(z,path):
    try:
        files = os.listdir(path)
        for file in files:
            new_path = '{}/{}'.format(path,file)
            if (os.path.isfile(new_path)):
                z.write(path,new_path.replace('../app','lambdas'))
            else:
                add_node_modules(z,new_path)
    except Exception as e:
        print(e)
        z.write(path)
def zip_lambdas():
    with ZipFile('{}/lambdas.zip'.format(ZIP_FOLDER), 'w') as z:
        copy_folder(DIST_FOLDER,'', z.write )
        add_node_modules(z,NODE_MODULES_FOLDER)   
def copy_folder(origin,destination, callback=None):
    try:
        files = os.listdir(origin)
        for file in files:
            current_full_path = '{}/{}'.format(origin, file)
            current_relative_full_path = '{}/{}'.format(origin, file).replace('../dist/','')
            next_full_path = '{}{}/{}'.format(destination,origin.replace(NODE_MODULES_FOLDER,''), file)
            if (os.path.isfile(current_full_path)):
                if(callback != None):
                    callback(current_full_path,current_relative_full_path)
                else:
                    shutil.copyfile(current_full_path,next_full_path)
            else:
                try:
                    if(callback == None):
                        os.mkdir(next_full_path)
                except :
                    pass
                copy_folder(current_full_path, destination, callback)
    except Exception as e:
        print(e)

def add_package():
    shutil.copyfile(PACKAGE_FILE,DIST_PACKAGE)
# if(force):
#     copy_folder(NODE_MODULES_FOLDER,DIST_NODE_MODULES_FOLDER)
add_package()
zip_lambdas()