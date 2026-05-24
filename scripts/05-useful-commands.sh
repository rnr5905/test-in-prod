#!/bin/bash
# ============================================
# Useful GCP Commands
# ============================================
# Quick reference for common operations

echo "📋 GCP Quick Reference Commands"
echo "================================"

# --------------------------------------------
# View deployed services
# --------------------------------------------
echo ""
echo "🔍 List Cloud Run services:"
echo "   gcloud run services list --region asia-south1"

# --------------------------------------------
# View service details
# --------------------------------------------
echo ""
echo "📊 Describe a service:"
echo "   gcloud run services describe testinprod-website --region asia-south1"

# --------------------------------------------
# View logs
# --------------------------------------------
echo ""
echo "📜 View logs:"
echo "   gcloud run services logs read testinprod-website --region asia-south1"

# --------------------------------------------
# List images in Artifact Registry
# --------------------------------------------
echo ""
echo "🐳 List Docker images:"
echo "   gcloud artifacts docker images list asia-east1-docker.pkg.dev/enduring-fold-485615-t0/cloud-run-source-deploy"

# --------------------------------------------
# Delete a service (careful!)
# --------------------------------------------
echo ""
echo "🗑️  Delete a service:"
echo "   gcloud run services delete testinprod-website --region asia-east1"

# --------------------------------------------
# Check billing
# --------------------------------------------
echo ""
echo "💰 Check billing:"
echo "   https://console.cloud.google.com/billing"

# ============================================
# Artifact Registry URLs:
# ============================================
# Console: https://console.cloud.google.com/artifacts/docker/enduring-fold-485615-t0/asia-east1/cloud-run-source-deploy
#
# Image Path: asia-east1-docker.pkg.dev/enduring-fold-485615-t0/cloud-run-source-deploy/testinprod-website
