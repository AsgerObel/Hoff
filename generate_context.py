import os

output_file = 'project_codebase.txt'
valid_extensions = ['.ts', '.tsx', '.css', '.html', '.json', '.js', '.md']
ignored_dirs = ['node_modules', '.git', 'dist', 'build', '.cursor', 'assets']
ignored_files = ['package-lock.json', 'project_codebase.txt']

with open(output_file, 'w', encoding='utf-8') as outfile:
    outfile.write(f"PROJECT CONTEXT DUMP\n")
    outfile.write("====================\n\n")
    
    for root, dirs, files in os.walk('.'):
        # Fjern ignorerede mapper fra scanningen
        dirs[:] = [d for d in dirs if d not in ignored_dirs]
        
        for file in files:
            if file in ignored_files:
                continue
                
            _, ext = os.path.splitext(file)
            if ext in valid_extensions:
                filepath = os.path.join(root, file)
                
                outfile.write(f"\n\n{'='*50}\n")
                outfile.write(f"FILE: {filepath}\n")
                outfile.write(f"{'='*50}\n\n")
                
                try:
                    with open(filepath, 'r', encoding='utf-8') as infile:
                        outfile.write(infile.read())
                except Exception as e:
                    outfile.write(f"[Could not read file: {e}]")

print(f"Done! Created {output_file}")

