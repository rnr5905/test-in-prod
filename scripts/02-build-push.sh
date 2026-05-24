#!/bin/bash
# ============================================
# Build and Push Docker Image
# ============================================
# Uses Cloud Build to build the Docker image
# directly in GCP (no local Docker needed).

# Configuration
PROJECT_ID="enduring-fold-485615-t0"
REGION="asia-east1"
REPO="cloud-run-source-deploy"
IMAGE_NAME="testinprod-website"

# Get version from argument or use default
VERSION=${1:-"latest"}

# Full image path
IMAGE_PATH="${REGION}-docker.pkg.dev/${PROJECT_ID}/${REPO}/${IMAGE_NAME}:${VERSION}"

echo "🏗️  Building and pushing image..."
echo "   Image: ${IMAGE_PATH}"
echo ""

# Navigate to project directory
# --------------------------------------------
cd "$(dirname "$0")/.."

# --------------------------------------------
# Build and push using Cloud Build
# --------------------------------------------
gcloud builds submit --tag ${IMAGE_PATH}

# --------------------------------------------
# Get the image digest (SHA)
# --------------------------------------------
echo ""
echo "📦 Image details:"
gcloud artifacts docker images describe ${IMAGE_PATH} --format="value(image_summary.digest)"

echo ""
echo "✅ Build complete!"
echo "   To deploy, run: ./03-deploy-cloudrun.sh ${VERSION}"

# ============================================
# Usage Examples:
# ============================================
# Build with version tag:
#   ./02-build-push.sh v1.0.0
#
# Build with timestamp:
#   ./02-build-push.sh v1.0.0-$(date +%Y%m%d%H%M%S)
#
# Build with git commit:
#   ./02-build-push.sh $(git rev-parse --short HEAD)
