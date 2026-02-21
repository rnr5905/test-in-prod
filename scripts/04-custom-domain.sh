#!/bin/bash
# ============================================
# Map Custom Domain to Cloud Run
# ============================================
# After deployment, use these commands to
# map your custom domain (e.g., test-in-prod.com)

# Configuration
REGION="asia-south1"
SERVICE_NAME="testinprod-website"
# DOMAIN="test-in-prod.com"  # Uncomment and set your domain

echo "🌐 Custom Domain Setup for Cloud Run"
echo "======================================"

# --------------------------------------------
# Step 1: Verify domain ownership (one-time)
# --------------------------------------------
echo ""
echo "1️⃣  First, verify your domain ownership:"
echo "   gcloud domains verify YOUR_DOMAIN"
echo ""

# --------------------------------------------
# Step 2: Map domain to Cloud Run service
# --------------------------------------------
echo "2️⃣  Map domain to your service:"
echo "   gcloud beta run domain-mappings create \\"
echo "     --service ${SERVICE_NAME} \\"
echo "     --domain YOUR_DOMAIN \\"
echo "     --region ${REGION}"
echo ""

# --------------------------------------------
# Step 3: Get DNS records to configure
# --------------------------------------------
echo "3️⃣  Get DNS records (after mapping):"
echo "   gcloud beta run domain-mappings describe \\"
echo "     --domain YOUR_DOMAIN \\"
echo "     --region ${REGION}"
echo ""

# --------------------------------------------
# Step 4: Add DNS records at your registrar
# --------------------------------------------
echo "4️⃣  Add these DNS records at your domain registrar:"
echo "   - Type: A or CNAME (as shown in step 3)"
echo "   - Wait for SSL certificate provisioning (~15 mins)"
echo ""

# ============================================
# Quick Commands (replace YOUR_DOMAIN):
# ============================================
# 
# # Verify domain
# gcloud domains verify test-in-prod.com
#
# # Map domain
# gcloud beta run domain-mappings create \
#   --service testinprod-website \
#   --domain test-in-prod.com \
#   --region asia-south1
#
# # Check mapping status
# gcloud beta run domain-mappings describe \
#   --domain test-in-prod.com \
#   --region asia-south1
#
# # List all domain mappings
# gcloud beta run domain-mappings list --region asia-south1
