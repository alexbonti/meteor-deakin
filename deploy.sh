#!/bin/bash
echo "starting travis"
echo $kad >> ~/.ssh/kad
chmod 600 ~/.ssh/kad
cat ~/.ssh/kad
scp -i ~/.ssh/kad -o stricthostkeychecking=no -r . root@kad.sl.cloud9.ibm.com:/home/kaduser/kad-cliniviz2d

