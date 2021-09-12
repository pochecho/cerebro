import os
import shutil
import sys


NODE_MODULES_FOLDER = '../app/node_modules'
DIST_FOLDER = '../dist/lambdas/node_modules'
PACKAGE_FILE = '../app/package.json'
DIST_PACKAGE = '../dist/lambdas/package.json'


try:
    os.mkdir(DIST_FOLDER)
except :
    pass
force = sys.argv == 2
def add_node_modules(origin,destination):
    try:
        files = os.listdir(origin)
        for file in files:
            current_full_path = '{}/{}'.format(origin, file)
            next_full_path = '{}{}/{}'.format(destination,origin.replace(NODE_MODULES_FOLDER,''), file)
            if (os.path.isfile(current_full_path)):
                shutil.copyfile(current_full_path,next_full_path)
            else:
                try:
                    os.mkdir(next_full_path)
                except :
                    pass
                add_node_modules(current_full_path, destination)
    except Exception as e:
        print(e)

def add_package():
    shutil.copyfile(PACKAGE_FILE,DIST_PACKAGE)
if(force):
    add_node_modules(NODE_MODULES_FOLDER,DIST_FOLDER)
add_package()