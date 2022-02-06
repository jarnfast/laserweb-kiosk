#!/usr/bin/env bash

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

SERVEPORT=${LWKSERVE_PORT:-4000}

if ! command -v serve > /dev/null; then
    echo '"serve"' not found, please install it by running:
    echo npm install -g serve
    exit 1
fi

function create-config-js {
    local prefix='LWK_'
    eval 'local vars=(${!'"$prefix"'@})'
    echo 'window.__RUNTIME_ENVIRONMENT__ = {'
    
    for v in "${vars[@]}"; do
        echo "  ${v}": '"'"${!v}"'"',
    done
    echo '};'
}

pushd "${SCRIPT_DIR}" > /dev/null
mkdir -p build
echo Writing runtime-environment.js:
create-config-js | tee build/runtime-environment.js

echo Serving LaserWeb-Kiosk on "$SERVEPORT"
serve -s build -l $SERVEPORT
popd > /dev/null