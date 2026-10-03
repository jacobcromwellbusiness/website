import os
import glob
import re

directory = r'c:\Users\JacobCromwell\OneDrive - Atlantic Digital Safety\Documents\Client Files\Jacob Cromwell\Updated Site - Copy\public\demos\dentures'
html_files = glob.glob(os.path.join(directory, '*.html'))

replacements = {
    # Names
    'NB Plumber Joe': 'NB Denture Clinic',
    'Plumber Joe': 'NB Dentures',
    'Joe': 'Dr. Smith',
    
    # Capitalized Terms
    'Plumbing Service': 'Denture Service',
    'Plumbing Services': 'Denture Services',
    'Plumbing': 'Denture',
    'Plumbers': 'Denturists',
    'Plumber': 'Denturist',
    
    # Lowercase Terms
    'plumbing service': 'denture service',
    'plumbing services': 'denture services',
    'plumbing': 'denture',
    'plumbers': 'denturists',
    'plumber': 'denturist',
    
    # Contextual Words
    'pipes': 'dentures',
    'pipe': 'denture',
    'leaks': 'breaks',
    'leak': 'break',
    'clogs': 'discomfort',
    'clog': 'discomfort',
    'drains': 'gums',
    'drain': 'gum',
    'water heater': 'implant',
    'water pressure': 'bite alignment',
    'water': 'smile',
    'faucets': 'crowns',
    'faucet': 'crown',
    'toilets': 'bridges',
    'toilet': 'bridge',
    'sewer': 'jaw',
    
    # Actions
    'unclog': 'repair',
    'burst': 'cracked',
    
    # Specific Phrases
    'Emergency 24/7 Plumbing Service': 'Emergency Denture Repair',
    'commercial and residential': 'partial and complete',
    
    # Colors
    '#F97316': '#0EA5E9', # Orange to Sky Blue
    'rgba(249, 115, 22, 0.3)': 'rgba(14, 165, 233, 0.3)',
    
    # Icons (FontAwesome)
    'fa-wrench': 'fa-tooth',
    'fa-droplet': 'fa-teeth',
    'fa-faucet': 'fa-teeth-open',
    'fa-toilet': 'fa-chair',
    'fa-shower': 'fa-tooth',
    'fa-screwdriver-wrench': 'fa-stethoscope',
    'fa-hammer': 'fa-clipboard-check',
    'fa-truck-fast': 'fa-truck-medical',
    'fa-pipe': 'fa-syringe',
}

# Image URL Replacement Regex (assuming there are unsplash images or specific image URLs)
# E.g. https://images.unsplash.com/photo-X -> a medical one
# Let's just do a blanket replacement for common plumbing images to dental images
image_replacements = {
    'photo-1607472586893-edb57cb31311': 'photo-1606811841689-23dfddce3e95', # plumber -> dentist chair
    'photo-1504328345606-18bbc8c9d7d1': 'photo-1598256989800-ef6252990002', # wrench -> dental tools
    'photo-1584622650111-993a426fbf0a': 'photo-1588776814546-1ffcf47267a5', # sink -> smile
    'photo-1634731872855-467406a44596': 'photo-1609840114035-3c981b782dfe', # pipes -> dentures
}

for file_path in html_files:
    with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    
    original_content = content
    
    # Word replacements
    for old, new in replacements.items():
        content = content.replace(old, new)
        
    # Image replacements
    for old, new in image_replacements.items():
        content = content.replace(old, new)
        
    if content != original_content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {os.path.basename(file_path)}")
print("Done!")
