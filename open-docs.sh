#!/bin/bash

# Open the documentation hub in the default browser
open docs-hub.html 2>/dev/null || xdg-open docs-hub.html 2>/dev/null || start docs-hub.html 2>/dev/null

echo "📚 Documentation Hub opened in your browser!"
echo ""
echo "If it didn't open automatically, navigate to:"
echo "file://$(pwd)/docs-hub.html"
