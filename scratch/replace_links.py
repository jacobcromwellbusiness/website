import os
import glob

directory = r'c:\Users\JacobCromwell\OneDrive - Atlantic Digital Safety\Documents\Client Files\Jacob Cromwell\Updated Site - Copy\public\demos\plumbers'
html_files = glob.glob(os.path.join(directory, '*.html'))

replacements = {
    'https://nbplumberjoe.org/home': 'index.html',
    'https://nbplumberjoe.org/about': 'about.html',
    'https://nbplumberjoe.org/services': 'services.html',
    'https://nbplumberjoe.org/contact': 'contact.html',
    'https://nbplumberjoe.org/tips': 'tips.html',
    'https://nbplumberjoe.org/team': 'team.html',
    'https://nbplumberjoe.org/guarantee': 'guarantee.html',
    'https://nbplumberjoe.org/terms': 'terms.html',
    'https://nbplumberjoe.org/privacy': 'privacy.html',
    'https://nbplumberjoe.org': 'index.html', # fallback
}

for file_path in html_files:
    with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    
    original_content = content
    for old, new in replacements.items():
        # Replace absolute links that might have a trailing slash or hash
        content = content.replace(f'{old}/', new)
        content = content.replace(f'{old}#', f'{new}#')
        content = content.replace(old, new)
        
    if content != original_content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {os.path.basename(file_path)}")
print("Done!")
