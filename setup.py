from setuptools import setup, find_packages

setup(
    name="exoObserver",
    version="0.1",
    packages=find_packages(),  # Trouve automatiquement le package 'exoObserver'
    entry_points={
        "console_scripts": [
            "exoObserver=exoObserver.main:main",  # Point d'entrée vers la fonction main()
        ],
    },
    install_requires=[],  # Listez ici vos dépendances si nécessaire
)
