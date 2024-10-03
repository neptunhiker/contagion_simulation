class Virus:
    def __init__(self, name: str, description: str, contagion_probability: float, 
                 mean_recovery_time: int, sd_recovery_time: int, death_probability: float, 
                 incubation_period: int) -> None:
        self.name = name
        self.description = description
        self.contagion_probability = contagion_probability
        self.mean_recovery_time = mean_recovery_time
        self.sd_recovery_time = sd_recovery_time
        self.death_probability = death_probability
        self.incubation_period = incubation_period  # in days

    def update_probabilities(self, contagion=None, recovery=None, death=None):
        """Update contagion, recovery, or death probabilities."""
        if contagion is not None:
            self.contagion_probability = contagion
        if recovery is not None:
            self.recovery_probability = recovery
        if death is not None:
            self.death_probability = death

    def display_info(self):
        """Display detailed information about the virus."""
        info = (f"Virus Name: {self.name}\n"
                f"Description: {self.description}\n"
                f"Contagion Probability: {self.contagion_probability}\n"
                f"Recovery Probability: {self.recovery_probability}\n"
                f"Death Probability: {self.death_probability}\n"
                f"Incubation Period: {self.incubation_period} days\n"
        )
        print(info)

    def serialize(self):
        """Serialize the virus object to a dictionary."""
        return {
            'name': self.name,
            'description': self.description,
            'contagion_probability': self.contagion_probability,
            'recovery_probability': self.recovery_probability,
            'death_probability': self.death_probability,
            'incubation_period': self.incubation_period,
        }
        
    def __str__(self):
        return f"{self.name}: {self.description}"