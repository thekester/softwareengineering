import re

class FrenchPhoneNumberValidator:
    # Expression régulière pour valider un numéro de téléphone français
    # Accepte les formats : 0X XX XX XX XX, +33 X XX XX XX XX, 0033 X XX XX XX XX, sans espaces ou avec espaces
    PHONE_REGEX = re.compile(
        r'^(?:(?:\+33|0033)[\s]?|0)([1-9])(?:[\s]?\d{2}){4}$'
    )

    @classmethod
    def is_valid(cls, phone_number: str) -> bool:
        """
        Vérifie si le numéro de téléphone fourni est un numéro français valide.
        """
        # Supprimer les espaces superflus en début et fin de chaîne
        phone_number = phone_number.strip()
        return bool(cls.PHONE_REGEX.match(phone_number))
