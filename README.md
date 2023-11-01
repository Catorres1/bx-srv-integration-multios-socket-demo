# Baseline repo with following branches and environments

## development

## staging

## production

NODE VERSION 18 LTS 

gh secret set -f=".env.qa" -e="staging" --repo=Blue-Express/bx-prdr-integration-multios-emission
gh secret set -f=".env.dev" -e="development" --repo=Blue-Express/bx-prdr-integration-multios-emission
gh secret set -f=".env.prod" -e="production" --repo=Blue-Express/bx-prdr-integration-multios-emission
[update] time to deploy x6
LOCAL DEPLOY
