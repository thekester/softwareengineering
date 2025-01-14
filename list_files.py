import os

# Fonction pour parcourir les fichiers et exclure certains répertoires
def list_files_excluding_dirs(root_dir, excluded_dirs, excluded_files):
    file_data = []
    for dirpath, dirnames, filenames in os.walk(root_dir):
        # Exclure les répertoires spécifiés
        dirnames[:] = [d for d in dirnames if d not in excluded_dirs]
        
        for filename in filenames:
            if filename.lower() in [f.lower() for f in excluded_files]:
                continue
            filepath = os.path.join(dirpath, filename)
            try:
                with open(filepath, 'r', encoding='utf-8') as file:
                    content = file.read()
                    file_data.append({
                        'name': filename,
                        'path': filepath,
                        'content': content
                    })
            except Exception as e:
                print(f"Erreur en lisant le fichier {filepath}: {e}")
    return file_data

# Répertoire de départ
root_directory = '.'  # Changez ce chemin si nécessaire
excluded_directories = ['node_modules', '__pycache__', '.pytest_cache', '.git', 'data']
excluded_files = ['package-lock.json']

# Obtenir les fichiers
files = list_files_excluding_dirs(root_directory, excluded_directories, excluded_files)

# Nettoyer le fichier avant d'écrire (facultatif, 'w' le fait déjà)
output_file = "file_contents.txt"
if os.path.exists(output_file):
    os.remove(output_file)

# Sauvegarder les résultats dans un fichier
with open(output_file, 'w', encoding='utf-8') as outfile:
    for file_info in files:
        outfile.write(f"Nom : {file_info['name']}\n")
        outfile.write(f"Chemin : {file_info['path']}\n")
        outfile.write(f"Contenu :\n{file_info['content']}\n")
        outfile.write("-" * 40 + "\n")

print(f"Les résultats ont été sauvegardés dans {output_file}")
