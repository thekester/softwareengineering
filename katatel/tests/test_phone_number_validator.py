import pytest
import sys
import os

# Ajouter le dossier parent au PYTHONPATH
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
from phone_validator import FrenchPhoneNumberValidator

@pytest.fixture
def validator():
    return FrenchPhoneNumberValidator

def test_valid_numbers(validator):
    valid_numbers = [
        "0123456789",
        "01 23 45 67 89",
        "+33 1 23 45 67 89",
        "+33123456789",
        "0033 1 23 45 67 89",
        "0033123456789",
    ]
    for number in valid_numbers:
        assert validator.is_valid(number), f"Le numéro {number} devrait être valide."

def test_invalid_numbers(validator):
    invalid_numbers = [
        "012345678",        # Trop court
        "01234567890",      # Trop long
        "1123456789",       # Ne commence pas par 0 ou indicatif +33/0033
        "+33 12345678",     # Trop court après indicatif
        "+33 12345678901",  # Trop long
        "0033 12345678901", # Trop long
        "0A23456789",       # Caractère non valide
        "+44 1234567890",   # Indicatif incorrect pour la France
    ]
    for number in invalid_numbers:
        assert not validator.is_valid(number), f"Le numéro {number} ne devrait pas être valide."
