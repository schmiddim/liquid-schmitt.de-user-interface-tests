#!/bin/bash

USER=npm
su $USER  -c "npm run test:add-to-basket >/tmp/test-result.log 2>&1"   
RESULT=$?

if [ $RESULT -ne 0 ]
then
	cat /tmp/test-result.log
fi