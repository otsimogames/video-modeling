#!/bin/sh

if [ "$1" = "login" ];then
    export OTSIMOCTL_DISCOVERY_ENV="staging"
    export OTSIMOCTL_DISCOVERY=services.otsimo.xyz:30862
    otsimoctl login
    exit
fi

npm run build
cd public
gversion=$(jq .version --raw-output otsimo.json)
gname=$(jq .unique_name --raw-output otsimo.json)


if [ "$1" = "staging" ];then
    export OTSIMOCTL_DISCOVERY_ENV="staging"
    export OTSIMOCTL_DISCOVERY=services.otsimo.xyz:30862
fi

otsimoctl game publish
otsimoctl game change-state $gname $gversion waiting
otsimoctl game change-state $gname $gversion validated
otsimoctl game change-state $gname $gversion production
