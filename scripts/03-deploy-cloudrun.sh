#!/bin/bash
# ============================================
# Deploy to Cloud Run
# ============================================
# Deploys the Docker image to Cloud Run.
# Serverless, auto-scaling, pay-per-request.

# Configuration
PROJECT_ID="enduring-fold-485615-t0"
REGION="asia-south1"
REPO="testinprod"
IMAGE_NAME="testinprod-website"
SERVICE_NAME="testinprod-website"

# Get version from argument or use default
VERSION=${1:-"v1.0.0"}

# Full image path
IMAGE_PATH="${REGION}-docker.pkg.dev/${PROJECT_ID}/${REPO}/${IMAGE_NAME}:${VERSION}"

echo "🚀 Deploying to Cloud Run..."
echo "   Service: ${SERVICE_NAME}"
echo "   Image:   ${IMAGE_PATH}"
echo "   Region:  ${REGION}"
echo ""

# --------------------------------------------
# Deploy to Cloud Run
# --------------------------------------------
gcloud run deploy ${SERVICE_NAME} \
  --image ${IMAGE_PATH} \
  --platform managed \
  --region ${REGION} \
  --allow-unauthenticated \
  --port 80 \
  --memory 256Mi \
  --cpu 1 \
  --min-instances 0 \
  --max-instances 10

echo ""
echo "✅ Deployment complete!"

# --------------------------------------------
# Get the service URL
# --------------------------------------------
echo ""
echo "🌐 Service URL:"
gcloud run services describe ${SERVICE_NAME} \
  --region ${REGION} \
  --format="value(status.url)"

# ============================================
# Usage:
# ============================================
# Deploy default version (v1.0.0):
#   ./03-deploy-cloudrun.sh
#
# Deploy specific version:
#   ./03-deploy-cloudrun.sh v1.0.1
#
# ============================================
# Cloud Run Pricing (Free Tier):
# ============================================
# - 2 million requests/month FREE
# - 360,000 GB-seconds FREE
# - 180,000 vCPU-seconds FREE
# - Scales to zero when no traffic
