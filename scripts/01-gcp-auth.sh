#!/bin/bash
# ============================================
# GCP Authentication Commands
# ============================================
# Use these commands to authenticate with GCP
# and switch to the correct project.

# --------------------------------------------
# 1. Login to GCP (opens browser)
# --------------------------------------------
# gcloud auth login

# --------------------------------------------
# 2. Login without browser (use auth code)
# --------------------------------------------
# Unset company credentials first if needed:
unset GOOGLE_APPLICATION_CREDENTIALS
gcloud auth login --no-launch-browser

# --------------------------------------------
# 3. List authenticated accounts
# --------------------------------------------
# gcloud auth list

# --------------------------------------------
# 4. Switch to personal project
# --------------------------------------------
gcloud config set project enduring-fold-485615-t0

# --------------------------------------------
# 5. Verify current project
# --------------------------------------------
gcloud config get-value project

echo "✅ Authenticated and set to project: enduring-fold-485615-t0"
