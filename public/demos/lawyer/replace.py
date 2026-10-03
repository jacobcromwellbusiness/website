import os
import glob

directory = '.'
html_files = glob.glob(os.path.join(directory, '*.html'))

replacements = [
    ("Pro Auto Care", "Smith Legal Group"),
    ("Auto Repair", "Legal Services"),
    ("auto repair", "legal services"),
    ("Mechanic", "Attorney"),
    ("mechanic", "attorney"),
    ("garage", "law firm"),
    ("vehicles", "cases"),
    ("driving experience", "legal situation"),
    ("car", "case"),
    ("rides", "rights"),
    ("From breaky faucets to major sewer line repairs", "From simple contracts to major corporate litigation"),
    ("Complete Overhauls", "Corporate Litigation"),
    ("General Repairs", "General Counsel"),
    ("Performance Upgrades", "Contract Review"),
    ("Oil Changes", "Legal Consultations"),
    ("Brake Repairs", "Dispute Resolution"),
    ("Wheel Alignments", "Estate Planning"),
    ("repairs, installations, and emergency services", "consultations, contract drafting, and urgent legal matters"),
    ("repairs", "legal cases"),
    ("repair", "case"),
    ("Repairs", "Cases"),
    ("Repair", "Case"),
    ("dr_auto repair_logo.webp", "law_office_logo.webp"),
    ("dr_legal services_logo.webp", "law_office_logo.webp"),
    ("Full arch restorations crafted for comfort, aesthetics, and optimal chewing function.", "Comprehensive representation for corporate disputes and complex litigation."),
    ("Seamlessly replace missing cases while preserving your natural ones.", "Expert legal advice for your everyday business and personal needs."),
    ("Seamlessly replace missing vehicles while preserving your natural ones.", "Expert legal advice for your everyday business and personal needs."),
    ("Experience unmatched stability and confidence with implant-retained solutions.", "Thorough contract review to protect your interests and minimize risk."),
    ("Restore the fit and comfort of your cases as your suspension naturally settles.", "Professional guidance and advice to navigate your legal challenges."),
    ("Restore the fit and comfort of your legal cases as your suspension naturally settles.", "Professional guidance and advice to navigate your legal challenges."),
    ("Restore the fit and comfort of your repairs as your suspension naturally settles.", "Professional guidance and advice to navigate your legal challenges."),
    ("Fast and reliable cases for cracked, broken, or damaged cases.", "Effective strategies to resolve disputes and avoid costly litigation."),
    ("Fast and reliable legal cases for cracked, broken, or damaged legal cases.", "Effective strategies to resolve disputes and avoid costly litigation."),
    ("Fast and reliable repairs for cracked, broken, or damaged repairs.", "Effective strategies to resolve disputes and avoid costly litigation."),
    ("Precision adjustments to eliminate sore spots and improve overall comfort.", "Comprehensive estate planning to secure your family's future."),
    ("Matt Smith completely changed my legal situation. My new Contract Review fit perfectly, and I can finally take my case to the track!", "Smith Legal Group completely changed my legal situation. Their team handled my corporate litigation perfectly, and I finally have peace of mind!"),
    ("Matt Smith completely changed my driving experience. My new performance upgrades fit perfectly, and I can finally take my car to the track!", "Smith Legal Group completely changed my legal situation. Their team handled my corporate litigation perfectly, and I finally have peace of mind!"),
    ("I dropped my partial case and cracked it right before a family wedding. They got me in immediately and cased it the same day. You can't even tell it was broken!", "I had an urgent legal matter come up right before a major business deal. They got me in immediately and resolved it the same day. Incredible service!"),
    ("I dropped my partial legal case and cracked it right before a family wedding. They got me in immediately and caseed it the same day. You can't even tell it was broken!", "I had an urgent legal matter come up right before a major business deal. They got me in immediately and resolved it the same day. Incredible service!"),
    ("I dropped my partial auto repair and cracked it right before a family wedding. They got me in immediately and repaired it the same day. You can't even tell it was broken!", "I had an urgent legal matter come up right before a major business deal. They got me in immediately and resolved it the same day. Incredible service!"),
    ("After years of uncomfortable cases, the reline service here made them fit like new. I highly recommend their law firm to anyone needing adjustments. Outstanding service.", "After dealing with complicated legal issues for years, their estate planning services put my mind at ease. I highly recommend their law firm to anyone needing legal guidance."),
    ("After years of uncomfortable legal cases, the reline service here made them fit like new. I highly recommend their law firm to anyone needing adjustments. Outstanding service.", "After dealing with complicated legal issues for years, their estate planning services put my mind at ease. I highly recommend their law firm to anyone needing legal guidance."),
    ("After years of uncomfortable repairs, the reline service here made them fit like new. I highly recommend their garage to anyone needing adjustments. Outstanding service.", "After dealing with complicated legal issues for years, their estate planning services put my mind at ease. I highly recommend their law firm to anyone needing legal guidance."),
    ("Auto Repair Reline", "Estate Planning"),
    ("Emergency Case", "Urgent Legal Matter"),
    ("Emergency Repair", "Urgent Legal Matter"),
    ("Auto Repair Case", "Legal Services"),
    ("auto repair-relines", "estate-planning"),
    ("auto repair-cases", "dispute-resolution"),
    ("auto repair-adjustments", "estate-planning"),
    ("partial-cases", "general-counsel"),
    ("complete-cases", "corporate-litigation"),
    ("implant-cases", "contract-review"),
    ("fa-wrench", "fa-scale-balanced"),
    ("fa-car", "fa-briefcase"),
    ("fa-gauge-high", "fa-file-signature"),
    ("fa-oil-can", "fa-comments"),
    ("fa-sliders", "fa-scroll"),
    ("fa-wrench", "fa-gavel"),
    ("Auto Repair Tips", "Legal Tips"),
    ("Pro Auto Care's", "Smith Legal Group's"),
    ("Dr. Auto Repair", "John Smith, Esq."),
    ("Auto Repair", "Legal"),
    ("auto repair", "legal"),
    ("auto_repair", "legal_services")
]

for filepath in html_files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    for old, new in replacements:
        content = content.replace(old, new)
        
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
        
print('Replacements complete.')
