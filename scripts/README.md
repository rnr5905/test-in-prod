# Test in Prod - Deployment Commands

This folder contains all deployment-related commands and scripts for the Test in Prod landing page.

## Files

| File | Description |
|------|-------------|
| `01-gcp-auth.sh` | GCP authentication commands |
| `02-build-push.sh` | Build and push Docker image to Artifact Registry |
| `03-deploy-cloudrun.sh` | Deploy to Cloud Run |
| `04-custom-domain.sh` | Map custom domain to Cloud Run |

## Quick Reference

**Project ID:** `enduring-fold-485615-t0`  
**Region:** `asia-south1`  
**Image:** `asia-south1-docker.pkg.dev/enduring-fold-485615-t0/testinprod/testinprod-website`

## Current Deployment

- **Image Tag:** `v1.0.0`
- **Image SHA:** `sha256:089a8cc97e6148fc4ed10e0146f13692e1ffe4afe85779030194222d1b00f8c5`
