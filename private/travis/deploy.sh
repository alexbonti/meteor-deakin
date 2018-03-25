#!/usr/bin/env bash

echo "Starting deployment to SoftLayer"
# MeteorJS Demo Application

echo "Create tar ball and copy to target server"
rm -rf node_modules
tar --exclude=*.tar* -cf cliniviz.tar .
ls -la
scp -o StrictHostKeyChecking=no cliniviz.tar kaduser@kad.sl.cloud9.ibm.com:/home/kaduser/cliniviz.tar

echo "Stop and delete old app"
ssh -o StrictHostKeyChecking=no kaduser@kad.sl.cloud9.ibm.com 'sudo stop kad-cliniviz2'
echo "Old app stopped"
ssh -o StrictHostKeyChecking=no kaduser@kad.sl.cloud9.ibm.com 'cd /home/kaduser/cliniviz && rm -rf *'
echo "Old app deleted"

echo "Extract tar and copy packages, release and version"
ssh -o StrictHostKeyChecking=no kaduser@kad.sl.cloud9.ibm.com 'cd /home/kaduser && mkdir kad-cliniviz'
ssh -o StrictHostKeyChecking=no kaduser@kad.sl.cloud9.ibm.com 'cd /home/kaduser && tar -xvf cliniviz.tar -C kad-cliniviz'
scp -o StrictHostKeyChecking=no .meteor/packages kaduser@kad.sl.cloud9.ibm.com:/home/kaduser/kad-cliniviz/.meteor/
scp -o StrictHostKeyChecking=no .meteor/release kaduser@kad.sl.cloud9.ibm.com:/home/kaduser/kad-cliniviz/.meteor/
scp -o StrictHostKeyChecking=no .meteor/versions kaduser@kad.sl.cloud9.ibm.com:/home/kaduser/kad-cliniviz/.meteor/

echo "Install npm packages and start app"
ssh -o StrictHostKeyChecking=no kaduser@kad.sl.cloud9.ibm.com 'cd /home/kaduser/kad-cliniviz && meteor npm install'
ssh -o StrictHostKeyChecking=no kaduser@kad.sl.cloud9.ibm.com 'sudo start kad-cliniviz2'
ssh -o StrictHostKeyChecking=no kaduser@kad.sl.cloud9.ibm.com 'cd /home/kaduser && rm cliniviz.tar'


exit 0;